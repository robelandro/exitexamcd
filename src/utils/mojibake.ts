type EncodeParams = {
  plainText: string;
  minCp?: number;
  maxCp?: number;
};

function encodeUtf8(s: string): string {
  return unescape(encodeURIComponent(s));
}

function decodeUtf8(s: string): string {
  return decodeURIComponent(escape(s));
}

export function mojibakeEncode(params: EncodeParams): string {
  let { plainText, minCp = 0x100, maxCp = 0x30ff } = params;
  if (maxCp < minCp) {
    maxCp = minCp + 255;
  }
  const minCpDiv = Math.floor(minCp / 256);
  const maxCpDiv = Math.floor(maxCp / 256);

  const plain = encodeUtf8(plainText);
  let encoded = "";
  for (let i = 0; i < plain.length; i++) {
    encoded += String.fromCharCode(
      plain.charCodeAt(i) +
        256 * (Math.floor(Math.random() * (maxCpDiv - minCpDiv + 1)) + minCpDiv)
    );
  }
  return encoded;
}

export function mojibakeDecode(encodedText: string): string {
  let plain = "";
  for (let i = 0; i < encodedText.length; i++) {
    plain += String.fromCharCode(encodedText.charCodeAt(i) % 256);
  }
  return decodeUtf8(plain);
}
