/* Reads intrinsic sizes of WebP files so templates can cap how far an image is enlarged. */
const fs = require("fs");
const path = require("path");

function webpSize(file) {
  const b = fs.readFileSync(file);
  const chunk = b.toString("ascii", 12, 16);
  if (chunk === "VP8 ") return { w: b.readUInt16LE(26) & 0x3fff, h: b.readUInt16LE(28) & 0x3fff };
  if (chunk === "VP8L") {
    const bits = b.readUInt32LE(21);
    return { w: (bits & 0x3fff) + 1, h: ((bits >> 14) & 0x3fff) + 1 };
  }
  if (chunk === "VP8X") return { w: 1 + b.readUIntLE(24, 3), h: 1 + b.readUIntLE(27, 3) };
  throw new Error(`Unrecognised WebP: ${file}`);
}

const cache = {};
function size(dir, id) {
  const key = `${dir}/${id}`;
  if (!cache[key]) cache[key] = webpSize(path.join(dir, `${id}.webp`));
  return cache[key];
}

module.exports = { size };
