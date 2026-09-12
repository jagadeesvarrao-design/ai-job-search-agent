import zlib from "zlib";

export interface ExtractedPdfDocument {
  text: string;
  numPages: number;
}

/**
 * Decode PDF hex string e.g. <00480065006C006C006F> or <48656C6C6F>
 */
function decodePdfHexString(hex: string): string {
  try {
    const cleanHex = hex.replace(/[^0-9A-Fa-f]/g, "");
    if (!cleanHex || cleanHex.length % 2 !== 0) return "";

    // Check if UTF-16BE (2 bytes per char, e.g. 0048 0065)
    if (cleanHex.length >= 4 && cleanHex.startsWith("00")) {
      let str = "";
      for (let i = 0; i < cleanHex.length; i += 4) {
        const charCode = parseInt(cleanHex.substring(i, i + 4), 16);
        if (charCode >= 32 && charCode <= 126) {
          str += String.fromCharCode(charCode);
        } else if (charCode === 10 || charCode === 13 || charCode === 9) {
          str += " ";
        }
      }
      return str;
    }

    // Standard 1-byte hex
    let str = "";
    for (let i = 0; i < cleanHex.length; i += 2) {
      const charCode = parseInt(cleanHex.substring(i, i + 2), 16);
      if (charCode >= 32 && charCode <= 126) {
        str += String.fromCharCode(charCode);
      } else if (charCode === 10 || charCode === 13 || charCode === 9) {
        str += " ";
      }
    }
    return str;
  } catch {
    return "";
  }
}

/**
 * Parse text operators from a raw PDF content stream (uncompressed or decompressed)
 */
function extractTextFromStreamString(content: string): string {
  let extracted = "";

  // 1. Text chunks inside parentheses: (Text) Tj, (Text) ', (Text) "
  const parenTjRegex = /\(((?:\\\(|\\\)|[^\)])*)\)\s*(?:Tj|'|")/g;
  let m: RegExpExecArray | null;
  while ((m = parenTjRegex.exec(content)) !== null) {
    if (m[1]) {
      extracted += m[1] + " ";
    }
  }

  // 2. Text array chunks: [(T) 10 (e) 10 (x) 10 (t)] TJ
  const tjArrayRegex = /\[(.*?)\]\s*TJ/g;
  while ((m = tjArrayRegex.exec(content)) !== null) {
    const arrayBody = m[1];
    const subParen = /\(((?:\\\(|\\\)|[^\)])*)\)/g;
    let sm: RegExpExecArray | null;
    while ((sm = subParen.exec(arrayBody)) !== null) {
      if (sm[1]) {
        extracted += sm[1] + "";
      }
    }
    // Also check for hex strings in TJ: [<0048> 10 <0065>] TJ
    const subHex = /<([0-9A-Fa-f]+)>/g;
    while ((sm = subHex.exec(arrayBody)) !== null) {
      if (sm[1]) {
        extracted += decodePdfHexString(sm[1]) + "";
      }
    }
    extracted += " ";
  }

  // 3. Hex string operators: <48656C6C6F> Tj
  const hexTjRegex = /<([0-9A-Fa-f]+)>\s*(?:Tj|'|")/g;
  while ((m = hexTjRegex.exec(content)) !== null) {
    if (m[1]) {
      extracted += decodePdfHexString(m[1]) + " ";
    }
  }

  // 4. BT ... ET blocks without standard Tj / TJ
  if (!extracted || extracted.trim().length < 10) {
    const btEtRegex = /BT([\s\S]*?)ET/g;
    while ((m = btEtRegex.exec(content)) !== null) {
      const block = m[1];
      const directMatches = block.match(/\(((?:\\\(|\\\)|[^\)])*)\)/g);
      if (directMatches) {
        for (const item of directMatches) {
          extracted += item.slice(1, -1) + " ";
        }
      }
    }
  }

  return extracted;
}

/**
 * Clean and format raw extracted text
 */
function cleanExtractedText(raw: string): string {
  return raw
    .replace(/\\([0-7]{1,3})/g, (_, oct) => String.fromCharCode(parseInt(oct, 8)))
    .replace(/\\r/g, "\n")
    .replace(/\\n/g, "\n")
    .replace(/\\t/g, " ")
    .replace(/\\\(/g, "(")
    .replace(/\\\)/g, ")")
    .replace(/\\\\/g, "\\")
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, " ")
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s*\n/g, "\n")
    .trim();
}

/**
 * Enterprise multi-modal PDF text and layout extractor
 */
export function extractTextFromBase64Pdf(base64Data: string): ExtractedPdfDocument {
  try {
    const cleanBase64 = (base64Data || "").replace(/^data:application\/pdf;base64,/, "").trim();
    const buffer = Buffer.from(cleanBase64, "base64");
    if (!buffer || buffer.length === 0) {
      return { text: "", numPages: 1 };
    }

    let extractedText = "";
    let numPages = 1;

    // Detect page count from PDF trailer/catalog
    const rawContent = buffer.toString("binary");
    const pagesCountMatch = 
      rawContent.match(/\/Type\s*\/Pages[\s\S]*?\/Count\s+(\d+)/i) || 
      rawContent.match(/\/Count\s+(\d+)[\s\S]*?\/Type\s*\/Pages/i) ||
      rawContent.match(/\/Count\s+(\d+)/i);
      
    if (pagesCountMatch && pagesCountMatch[1]) {
      const parsedPages = parseInt(pagesCountMatch[1], 10);
      if (!isNaN(parsedPages) && parsedPages > 0) {
        numPages = parsedPages;
      }
    }

    // Also count '/Page' objects as secondary check
    const pageObjects = rawContent.match(/\/Type\s*\/Page\b/g);
    if (pageObjects && pageObjects.length > numPages) {
      numPages = pageObjects.length;
    }

    // Direct stream extraction (both compressed & uncompressed)
    let pos = 0;
    const streamMarker = Buffer.from("stream");
    const endStreamMarker = Buffer.from("endstream");

    while (pos < buffer.length) {
      const startIdx = buffer.indexOf(streamMarker, pos);
      if (startIdx === -1) break;

      let dataStart = startIdx + 6;
      if (buffer[dataStart] === 0x0d && buffer[dataStart + 1] === 0x0a) {
        dataStart += 2;
      } else if (buffer[dataStart] === 0x0a || buffer[dataStart] === 0x0d) {
        dataStart += 1;
      }

      const endIdx = buffer.indexOf(endStreamMarker, dataStart);
      if (endIdx === -1) break;

      let dataEnd = endIdx;
      if (buffer[dataEnd - 1] === 0x0a) dataEnd--;
      if (buffer[dataEnd - 1] === 0x0d) dataEnd--;

      const streamSlice = buffer.subarray(dataStart, dataEnd);

      // Attempt 1: Decompress zlib stream with 2MB bounds (Zip Bomb / Decompression Bomb protection)
      let streamString = "";
      try {
        streamString = zlib.inflateSync(streamSlice, { maxOutputLength: 2 * 1024 * 1024 }).toString("latin1");
      } catch {
        try {
          streamString = zlib.inflateRawSync(streamSlice, { maxOutputLength: 2 * 1024 * 1024 }).toString("latin1");
        } catch {
          // Uncompressed raw stream
          streamString = streamSlice.toString("latin1");
        }
      }

      if (streamString) {
        const chunk = extractTextFromStreamString(streamString);
        if (chunk) {
          extractedText += chunk + "\n";
        }
      }

      pos = endIdx + 9;
    }

    // If stream parsing was sparse, also scan uncompressed global rawContent
    if (extractedText.trim().length < 50) {
      const globalChunk = extractTextFromStreamString(rawContent);
      if (globalChunk.length > extractedText.length) {
        extractedText += " " + globalChunk;
      }
    }

    const cleaned = cleanExtractedText(extractedText);
    return {
      text: cleaned,
      numPages: Math.max(1, numPages)
    };
  } catch (err) {
    console.error("PDF Extraction error:", err);
    return {
      text: "",
      numPages: 1
    };
  }
}

/**
 * Async wrapper for PDF extraction with high resilience
 */
export async function extractTextFromBase64PdfAsync(base64Data: string): Promise<ExtractedPdfDocument> {
  return extractTextFromBase64Pdf(base64Data);
}
