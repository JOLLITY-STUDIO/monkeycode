// Export NES CHR banks as PNG sprite sheets
// Usage: node export_chr_png.cjs [path/to/rom.nes] [output-dir]
// Defaults: src/nes/tsubasa/romdata/Captain Tsubasa II - Super Striker (Japan).nes
//           src/nes/tsubasa/data/chr_png/

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const ROOT = path.resolve(__dirname, '..');
const ROM_DEFAULT = path.join(ROOT, 'romdata', 'Captain Tsubasa II - Super Striker (Japan).nes');
const OUT_DEFAULT = path.join(__dirname, 'chr_png');
const CHR_JSON = path.join(__dirname, 'chrBanks.json');

const ROM = process.argv[2] || ROM_DEFAULT;
const OUT = process.argv[3] || OUT_DEFAULT;

fs.mkdirSync(OUT, { recursive: true });

let rom = null;
let chrData = {}; // index -> Uint8Array
let chrBanks = 0;
let sourceName = '';

const H = 16, B = 16384;

function toU8(v) {
  if (v instanceof Uint8Array) return v;
  if (Array.isArray(v)) return new Uint8Array(v);
  if (v && typeof v === 'object' && Array.isArray(v.data)) return new Uint8Array(v.data);
  return new Uint8Array(0);
}

function loadChrBanksJSON() {
  if (!fs.existsSync(CHR_JSON)) return false;
  const j = JSON.parse(fs.readFileSync(CHR_JSON, 'utf8'));
  chrData = {};
  for (const k of Object.keys(j)) {
    const m = k.match(/^bank_(\d+)$/i);
    if (m) {
      const idx = parseInt(m[1], 10);
      const u8 = toU8(j[k]);
      if (u8.length >= 16) chrData[idx] = u8;
    }
  }
  const ids = Object.keys(chrData).map(Number).sort((a, b) => a - b);
  if (ids.length === 0) return false;
  chrBanks = ids.length;
  sourceName = CHR_JSON;
  return true;
}

function loadFromROM() {
  if (!fs.existsSync(ROM)) {
    console.error('ROM not found:', ROM);
    process.exit(1);
  }
  rom = fs.readFileSync(ROM);
  const prgBanks = Math.floor((rom.length - H) / B);
  const chrOff = H + prgBanks * B;
  const chrSize = rom.length - chrOff;
  chrBanks = Math.floor(chrSize / 8192);
  sourceName = ROM;
  return chrOff;
}

let chrOff = 0;
if (ROM.endsWith('.json')) {
  if (!loadChrBanksJSON()) {
    console.error('Failed to load CHR banks from', ROM);
    process.exit(1);
  }
} else {
  chrOff = loadFromROM();
  if (chrBanks === 0) {
    console.log('ROM has no CHR-ROM; trying chrBanks.json ...');
    if (!loadChrBanksJSON()) {
      console.error('No CHR data found in ROM or chrBanks.json');
      process.exit(1);
    }
    rom = null;
    chrOff = 0;
  }
}

console.log(`Source: ${sourceName}`);
console.log(`CHR banks: ${chrBanks}`);

// 3x5 pixel font for hex digits (bitmask rows, MSB left)
const FONT3X5 = {
  0: [0b111, 0b101, 0b101, 0b101, 0b111],
  1: [0b010, 0b110, 0b010, 0b010, 0b111],
  2: [0b111, 0b001, 0b111, 0b100, 0b111],
  3: [0b111, 0b001, 0b111, 0b001, 0b111],
  4: [0b101, 0b101, 0b111, 0b001, 0b001],
  5: [0b111, 0b100, 0b111, 0b001, 0b111],
  6: [0b111, 0b100, 0b111, 0b101, 0b111],
  7: [0b111, 0b001, 0b001, 0b001, 0b001],
  8: [0b111, 0b101, 0b111, 0b101, 0b111],
  9: [0b111, 0b101, 0b111, 0b001, 0b001],
  A: [0b111, 0b101, 0b111, 0b101, 0b101],
  B: [0b110, 0b101, 0b110, 0b101, 0b110],
  C: [0b111, 0b100, 0b100, 0b100, 0b111],
  D: [0b110, 0b101, 0b101, 0b101, 0b110],
  E: [0b111, 0b100, 0b111, 0b100, 0b111],
  F: [0b111, 0b100, 0b111, 0b100, 0b100],
};

function drawChar(img, w, h, x, y, ch, color) {
  const rows = FONT3X5[ch];
  if (!rows) return;
  for (let r = 0; r < 5; r++) {
    const row = rows[r];
    for (let c = 0; c < 3; c++) {
      if ((row >> (2 - c)) & 1) {
        const ix = x + c;
        const iy = y + r;
        if (ix >= 0 && ix < w && iy >= 0 && iy < h) img[iy * w + ix] = color;
      }
    }
  }
}

function getTileData(bank, t) {
  if (rom) {
    const bs = chrOff + bank * 8192;
    return rom.subarray(bs + t * 16, bs + t * 16 + 16);
  }
  const data = chrData[bank];
  if (!data) return null;
  const off = t * 16;
  if (off + 16 > data.length) return null;
  return data.subarray(off, off + 16);
}

function renderBank(bank) {
  const scale = 16;
  const grid = 1;
  const tilesX = 16, tilesY = 16;
  const pw = 8 * scale, ph = 8 * scale;
  const W = tilesX * pw + (tilesX - 1) * grid;
  const Himg = tilesY * ph + (tilesY - 1) * grid;
  const img = new Uint8Array(W * Himg);
  img.fill(11); // #0b

  for (let ty = 0; ty < tilesY; ty++) {
    for (let tx = 0; tx < tilesX; tx++) {
      const t = ty * 16 + tx;
      const td = getTileData(bank, t);
      if (!td) continue;
      const px = tx * (pw + grid);
      const py = ty * (ph + grid);
      for (let y = 0; y < 8; y++) {
        const p0 = td[y];
        const p1 = td[y + 8];
        for (let x = 0; x < 8; x++) {
          const bit = 1 << (7 - x);
          const c = ((p0 & bit) ? 1 : 0) + ((p1 & bit) ? 2 : 0);
          const v = [0, 96, 176, 255][c];
          const ix = px + x * scale;
          const iy = py + y * scale;
          for (let dy = 0; dy < scale; dy++) {
            for (let dx = 0; dx < scale; dx++) {
              img[(iy + dy) * W + (ix + dx)] = v;
            }
          }
        }
      }
      const hex = t.toString(16).toUpperCase().padStart(2, '0');
      const txX = px + pw - 8;
      const txY = py + ph - 7;
      drawChar(img, W, Himg, txX, txY, hex[0], 255);
      drawChar(img, W, Himg, txX + 4, txY, hex[1], 255);
    }
  }
  // grid lines
  for (let i = 0; i <= tilesX; i++) {
    const x = i * (pw + grid) - 1;
    if (x < 0 || x >= W) continue;
    for (let y = 0; y < Himg; y++) img[y * W + x] = 37;
  }
  for (let i = 0; i <= tilesY; i++) {
    const y = i * (ph + grid) - 1;
    if (y < 0 || y >= Himg) continue;
    for (let x = 0; x < W; x++) img[y * W + x] = 37;
  }
  return { width: W, height: Himg, data: img };
}

function writePNG(filepath, width, height, pixels) {
  const chunks = [];
  const signature = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 0; // grayscale
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const rows = [];
  const filterByte = Buffer.from([0]);
  for (let y = 0; y < height; y++) {
    rows.push(filterByte);
    rows.push(Buffer.from(pixels.subarray(y * width, (y + 1) * width)));
  }
  const raw = Buffer.concat(rows);
  const idat = zlib.deflateSync(raw, { level: 9 });
  const iend = Buffer.alloc(0);

  chunks.push(signature, chunk('IHDR', ihdr), chunk('IDAT', idat), chunk('IEND', iend));
  fs.writeFileSync(filepath, Buffer.concat(chunks));
}

const crcTable = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    t[n] = c;
  }
  return t;
})();

function crc32(buf) {
  let c = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xFF] ^ (c >>> 8);
  }
  return c ^ 0xFFFFFFFF;
}

function chunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const combined = Buffer.concat([typeBuf, data]);
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(combined), 0);
  return Buffer.concat([len, combined, crc]);
}

for (let b = 0; b < chrBanks; b++) {
  const { width, height, data } = renderBank(b);
  const outPath = path.join(OUT, `chr_bank_${b}.png`);
  writePNG(outPath, width, height, data);
  console.log(`  -> ${outPath}  (${width}x${height})`);
}

const DEFAULT_KANA = {
  0: '０', 1: '１', 2: '２', 3: '３', 4: '４', 5: '５', 6: '６', 7: '７', 8: '８', 9: '９',
  10: 'あ', 11: 'い', 12: 'う', 13: 'え', 14: 'お', 15: 'か', 16: 'き', 17: 'く', 18: 'け', 19: 'こ',
  20: 'さ', 21: 'し', 22: 'す', 23: 'せ', 24: 'そ', 25: 'た', 26: 'ち', 27: 'つ', 28: 'て', 29: 'と',
  30: 'な', 31: 'に', 32: 'ぬ', 33: 'ね', 34: 'の', 35: 'は', 36: 'ひ', 37: 'ふ', 38: 'へ', 39: 'ほ',
  40: 'ま', 41: 'み', 42: 'む', 43: 'め', 44: 'も', 45: 'や', 46: 'ゆ', 47: 'よ',
  48: 'ら', 49: 'り', 50: 'る', 51: 'れ', 52: 'ろ', 53: 'わ', 54: 'を', 55: 'ん',
  56: 'ア', 57: 'イ', 58: 'ウ', 59: 'エ', 60: 'オ', 61: 'カ', 62: 'キ', 63: 'ク', 64: 'ケ', 65: 'コ',
  66: 'サ', 67: 'シ', 68: 'ス', 69: 'セ', 70: 'ソ', 71: 'タ', 72: 'チ', 73: 'ツ', 74: 'テ', 75: 'ト',
  76: 'ナ', 77: 'ニ', 78: 'ヌ', 79: 'ネ', 80: 'ノ', 81: 'ハ', 82: 'ヒ', 83: 'フ', 84: 'へ', 85: 'ホ',
  86: 'マ', 87: 'ミ', 88: 'ム', 89: 'メ', 90: 'モ',
};

fs.writeFileSync(path.join(OUT, 'default_kana_map.json'), JSON.stringify(DEFAULT_KANA, null, 2));
console.log(`  -> ${path.join(OUT, 'default_kana_map.json')}`);
console.log('Done.');
