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
    
    // 1. Try industry standard pdf-parse
    try {
      const pdfParse = (await import("pdf-parse")).default;
      const data = await pdfParse(buffer);
      if (data && data.text && data.text.trim().length > 30) {
        return {
          text: data.text.trim(),
          numPages: data.numpages || 1
        };
      }
    } catch (parseErr) {
      // Fall through to multi-strategy native extractor
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
    const rawContent = buffer.toString("binary");
    let extractedText = "";

    // Parse page count from PDF root dictionary /Count <n>
    let numPages = 1;
    const pagesCountMatch = rawContent.match(/\/Type\s*\/Pages[\s\S]*?\/Count\s+(\d+)/i) || rawContent.match(/\/Count\s+(\d+)[\s\S]*?\/Type\s*\/Pages/i);
    if (pagesCountMatch && pagesCountMatch[1]) {
      numPages = parseInt(pagesCountMatch[1], 10) || 1;
    }

    // Search for FlateDecode compressed streams
    const streamRegex = /stream[\r\n]+([\s\S]*?)[\r\n]+endstream/g;
    let match;

    while ((match = streamRegex.exec(rawContent)) !== null) {
      const streamBytes = Buffer.from(match[1], "binary");
      try {
        const decompressed = zlib.inflateSync(streamBytes).toString("latin1");
        
        // A. Extract Parentheses Strings: (Hello) Tj or [(Hello) 10 (World)] TJ
        const parenRegex = /\((.*?)\)\s*Tj|\[(.*?)\]\s*TJ/g;
        let parenMatch;
        while ((parenMatch = parenRegex.exec(decompressed)) !== null) {
          if (parenMatch[1]) {
            extractedText += parenMatch[1] + " ";
          } else if (parenMatch[2]) {
            const subMatches = parenMatch[2].match(/\((.*?)\)/g);
            if (subMatches) {
              extractedText += subMatches.map(s => s.slice(1, -1)).join("") + " ";
            }
          }
        }

        // B. Extract Hex-Encoded Strings: <00480065> Tj or [<0048> 10 <0065>] TJ
        const hexRegex = /<([0-9A-Fa-f\s]+)>\s*Tj|\[([^\]]*?)\]\s*TJ/g;
        let hexMatch;
        while ((hexMatch = hexRegex.exec(decompressed)) !== null) {
          if (hexMatch[1]) {
            const decoded = decodePdfHexString(hexMatch[1]);
            if (decoded) extractedText += decoded + " ";
          } else if (hexMatch[2]) {
            const subHexes = hexMatch[2].match(/<([0-9A-Fa-f\s]+)>/g);
            if (subHexes) {
              for (const sh of subHexes) {
                const decoded = decodePdfHexString(sh.slice(1, -1));
                if (decoded) extractedText += decoded + " ";
              }
            }
          }
        }

        // C. Extract direct readable words in decompressed stream
        const readableRuns = decompressed.match(/[A-Za-z0-9._%+-]{3,}/g);
        if (readableRuns && readableRuns.length > 5) {
          extractedText += readableRuns.join(" ") + " ";
        }
      } catch (inflateErr) {
        // Uncompressed stream - extract printable words
        const plainWords = match[1].match(/[A-Za-z0-9._%+-]{3,}/g);
        if (plainWords && plainWords.length > 5) {
          extractedText += plainWords.join(" ") + " ";
        }
      }
    }

    // Clean up extracted text
    const cleaned = extractedText
      .replace(/\\([0-9]{3})/g, (_, oct) => String.fromCharCode(parseInt(oct, 8)))
      .replace(/\\r/g, "\n")
      .replace(/\\n/g, "\n")
      .replace(/\\t/g, " ")
      .replace(/\\\(/g, "(")
      .replace(/\\\)/g, ")")
      .replace(/\\\\/g, "\\")
      .replace(/\s+/g, " ")
      .trim();

    if (cleaned.length < 50) {
      // Direct raw ASCII buffer scan
      const asciiStrings = buffer.toString("ascii").match(/[A-Za-z0-9._%+-]{3,}/g) || [];
      return {
        text: asciiStrings.join(" ").slice(0, 15000),
        numPages
      };
    }

    return {
      text: cleaned.slice(0, 15000),
      numPages
    };
  } catch (err) {
    return {
      text: "",
      numPages: 1
    };
  }
}
