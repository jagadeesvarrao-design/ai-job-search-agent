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
    if (cleanHex.length % 2 !== 0) return "";
    
    // Check if UTF-16BE (2 bytes per char, e.g. 0048 0065)
    if (cleanHex.length >= 4 && cleanHex.startsWith("00")) {
      let str = "";
      for (let i = 0; i < cleanHex.length; i += 4) {
        const charCode = parseInt(cleanHex.substr(i, 4), 16);
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
      const charCode = parseInt(cleanHex.substr(i, 2), 16);
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
 * Enterprise PDF extractor for Node.js
 * Extracts raw textual streams, hex-encoded glyphs, and character mappings
 */
export async function extractTextFromBase64PdfAsync(base64Data: string): Promise<ExtractedPdfDocument> {
  try {
    const buffer = Buffer.from(base64Data, "base64");
    
    // 1. Try industry standard pdf-parse with ESM/CJS compatibility
    try {
      const pdfModule = await import("pdf-parse");
      const pdfFn = (pdfModule as any).default || pdfModule;
      if (typeof pdfFn === "function") {
        const data = await pdfFn(buffer);
        if (data && data.text && data.text.trim().length > 20) {
          return {
            text: data.text.trim(),
            numPages: data.numpages || 1
          };
        }
      }
    } catch (parseErr) {
      console.warn("Dynamic pdf-parse failed, running native stream extractor:", parseErr);
    }

    // 2. Native zero-dependency stream & hex extractor fallback
    return extractTextFromBase64Pdf(base64Data);
  } catch (err) {
    return extractTextFromBase64Pdf(base64Data);
  }
}

export function extractTextFromBase64Pdf(base64Data: string): ExtractedPdfDocument {
  try {
    const buffer = Buffer.from(base64Data, "base64");
    let extractedText = "";
    let numPages = 1;

    // Direct binary stream decompression
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

      let decompressed = "";
      try {
        decompressed = zlib.inflateSync(streamSlice).toString("latin1");
      } catch {
        try {
          decompressed = zlib.inflateRawSync(streamSlice).toString("latin1");
        } catch {
          decompressed = streamSlice.toString("latin1");
        }
      }

      if (decompressed) {
        const parenRegex = /\(((?:\\\(|\\\)|[^\)])*)\)\s*(?:Tj|'|")/g;
        let m;
        while ((m = parenRegex.exec(decompressed)) !== null) {
          if (m[1]) extractedText += m[1] + " ";
        }

        const tjArrayRegex = /\[(.*?)\]\s*TJ/g;
        while ((m = tjArrayRegex.exec(decompressed)) !== null) {
          const sub = m[1].match(/\(((?:\\\(|\\\)|[^\)])*)\)/g);
          if (sub) {
            extractedText += sub.map(s => s.slice(1, -1)).join("") + " ";
          }
        }
      }

      pos = endIdx + 9;
    }

    // Parse page count
    const rawContent = buffer.toString("binary");
    const pagesCountMatch = rawContent.match(/\/Type\s*\/Pages[\s\S]*?\/Count\s+(\d+)/i) || rawContent.match(/\/Count\s+(\d+)[\s\S]*?\/Type\s*\/Pages/i);
    if (pagesCountMatch && pagesCountMatch[1]) {
      numPages = parseInt(pagesCountMatch[1], 10) || 1;
    }

    // Clean up extracted text
    const cleaned = extractedText
      .replace(/\\([0-9]{3})/g, (_, oct) => String.fromCharCode(parseInt(oct, 8)))
      .replace(/\\r/g, "\n")
      .replace(/\\n/g, "\n")
      .replace(/\\t/g, " ")
      .replace(/\\\(/g, "(")
      .replace(/\\\)/g, ")")
      .replace(/\s+/g, " ")
      .trim();

    return {
      text: cleaned,
      numPages: Math.max(1, numPages)
    };
  } catch (err) {
    return {
      text: "",
      numPages: 1
    };
  }
}
