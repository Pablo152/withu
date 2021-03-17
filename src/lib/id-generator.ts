// str byteToHex(uint8 byte)
//   converts a single byte to a hex string
function byteToHex(byte: any): string {
  return ("0" + byte.toString(16)).slice(-2);
}

// str generateId(int len);
//   len - must be an even number (default: 40)
export default function generateId(len = 40): string {
  const arr = new Uint8Array(len / 2);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, byteToHex).join("");
}
