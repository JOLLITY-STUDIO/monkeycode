/**
 * gen_thumbs.cjs —— 从 src/data/puzzles.ts 的 ROM 解法位图生成选择页缩略图 PNG
 * 输出: assets/thumbs/{id}.png （16x16 格放大 4 倍 = 64x64，黑白）
 * 用途: 选择界面还原原版 Picross DS 的拼图缩略图
 */
const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, "src", "data", "puzzles.ts");
const OUT = path.join(ROOT, "assets", "thumbs");

// ---- PNG 编码（标准库实现，仅需 zlib）----
const CRC_TABLE = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();
function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const td = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(td));
  return Buffer.concat([len, td, crc]);
}
function encodePng(rgba, w, h) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // RGBA
  const stride = w * 4;
  const raw = Buffer.alloc((stride + 1) * h);
  for (let y = 0; y < h; y++) {
    raw[y * (stride + 1)] = 0;
    rgba.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  }
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", zlib.deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

// ---- 解析 puzzles.ts ----
const text = fs.readFileSync(SRC, "utf8");
const blocks = text.split(/\n\s*\{/).slice(1);
const puzzles = [];
for (const b of blocks) {
  const id = /id:\s*(\d+)/.exec(b);
  const w = /width:\s*(\d+)/.exec(b);
  const h = /height:\s*(\d+)/.exec(b);
  const hex = /solutionHex:\s*"([0-9A-Fa-f]+)"/.exec(b);
  if (!id || !w || !h || !hex) continue;
  puzzles.push({ id: +id[1], w: +w[1], h: +h[1], hex: hex[1] });
}
console.log(`parsed ${puzzles.length} puzzles`);

fs.mkdirSync(OUT, { recursive: true });
const SCALE = 4;
for (const p of puzzles) {
  const { w, h, hex } = p;
  const bits = Buffer.from(hex, "hex");
  const cells = [];
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const byte = bits[((y * w + x) >> 3)];
      const bit = (byte >> (7 - ((y * w + x) & 7))) & 1;
      cells.push(bit);
    }
  }
  const px = Buffer.alloc(w * SCALE * h * SCALE * 4);
  for (let y = 0; y < h * SCALE; y++) {
    for (let x = 0; x < w * SCALE; x++) {
      const c = cells[((y / SCALE) | 0) * w + ((x / SCALE) | 0)];
      const o = (y * w * SCALE + x) * 4;
      if (c) {
        px[o] = 0x11; px[o + 1] = 0x11; px[o + 2] = 0x11; px[o + 3] = 0xff; // 黑
      } else {
        px[o] = 0xff; px[o + 1] = 0xff; px[o + 2] = 0xff; px[o + 3] = 0xff; // 白
      }
    }
  }
  fs.writeFileSync(path.join(OUT, `${p.id}.png`), encodePng(px, w * SCALE, h * SCALE));
}
console.log(`written ${puzzles.length} thumbs -> ${OUT}`);
