/**
 * 极简 PNG 编码器 — 零依赖 (只用 Node.js 内置 zlib)
 * 输出 8-bit 索引色 PNG (color type 3)
 */

import { deflateSync } from 'zlib';

// ── CRC32 ──────────────────────────────────────────────
const crcTable = new Int32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1;
  crcTable[n] = c;
}

function crc32(buf) {
  let c = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) c = crcTable[(c ^ buf[i]) & 0xFF] ^ (c >>> 8);
  return (c ^ 0xFFFFFFFF) >>> 0;
}

// ── Chunk builder ──────────────────────────────────────
function chunk(type, data) {
  const typeBytes = Buffer.from(type, 'ascii');
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const crcInput = Buffer.concat([typeBytes, data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(crcInput));
  return Buffer.concat([len, typeBytes, data, crc]);
}

/**
 * 生成 8-bit 索引色 PNG
 *
 * @param {number}      w         image width (pixels)
 * @param {number}      h         image height (pixels)
 * @param {number[][]}  palette   [[r,g,b], ...] up to 256 colors
 * @param {Uint8Array}  indices   row-major, w×h bytes, each 0-255 palette index
 * @returns {Buffer} PNG file buffer
 */
export function encodePNG(w, h, palette, indices) {
  // ── IHDR ─────────────────────────────────────────────
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8;   // bit depth
  ihdr[9] = 3;   // color type = indexed
  ihdr[10] = 0;  // compression
  ihdr[11] = 0;  // filter
  ihdr[12] = 0;  // interlace

  // ── PLTE ─────────────────────────────────────────────
  const plteData = Buffer.alloc(palette.length * 3);
  for (let i = 0; i < palette.length; i++) {
    plteData[i * 3]     = palette[i][0];
    plteData[i * 3 + 1] = palette[i][1];
    plteData[i * 3 + 2] = palette[i][2];
  }

  // ── IDAT (raw pixels, filter=0 per row) ──────────────
  const raw = Buffer.alloc(h * (1 + w)); // 1 filter byte per row
  for (let y = 0; y < h; y++) {
    raw[y * (1 + w)] = 0; // filter type 0 (None)
    for (let x = 0; x < w; x++) {
      raw[y * (1 + w) + 1 + x] = indices[y * w + x];
    }
  }
  const compressed = deflateSync(raw);

  // ── Assemble ─────────────────────────────────────────
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  return Buffer.concat([
    signature,
    chunk('IHDR', ihdr),
    chunk('PLTE', plteData),
    chunk('IDAT', compressed),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}
