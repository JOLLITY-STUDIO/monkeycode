import { readFileSync, mkdirSync, writeFileSync } from 'fs';
import { deflateSync, crc32 } from 'zlib';

const rom = readFileSync('rom.nes');
const PO = 16;
const chrOff = PO + 262144;

const NES_PAL = [
  0xFF000000, 0xFFFF0000, 0xFF00FF00, 0xFF0000FF,
  0xFFFFFF00, 0xFFFF00FF, 0xFF00FFFF, 0xFFFFFFFF,
];

function decodeTile(chrData, offset) {
  const pixels = new Uint8Array(64);
  for (let row = 0; row < 8; row++) {
    const lo = chrData[offset + row];
    const hi = chrData[offset + row + 8];
    for (let col = 0; col < 8; col++) {
      const bit = 7 - col;
      const c = ((lo >> bit) & 1) | (((hi >> bit) & 1) << 1);
      pixels[row * 8 + col] = c;
    }
  }
  return pixels;
}

function renderBank(bankIdx) {
  // 16x16 grid of 8x8 tiles = 128x128
  const cols = 16, rows = 16;
  const w = cols * 8, h = rows * 8;
  const buf = new Uint32Array(w * h);
  const off = bankIdx * 4096;
  for (let t = 0; t < 256; t++) {
    const tx = t % cols, ty = Math.floor(t / cols);
    const tile = decodeTile(rom, chrOff + off + t * 16);
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        const ci = tile[y * 8 + x];
        const px = tx * 8 + x;
        const py = ty * 8 + y;
        buf[py * w + px] = NES_PAL[ci] ?? 0xFF000000;
      }
    }
  }
  return buf;
}

function encodePNG(buf, w, h) {
  const sl = 1 + w * 3;
  const raw = Buffer.allocUnsafe(h * sl);
  for (let y = 0; y < h; y++) {
    raw[y * sl] = 0;
    for (let x = 0; x < w; x++) {
      const c = buf[y * w + x];
      const p = y * sl + 1 + x * 3;
      raw[p] = (c >>> 16) & 0xFF;
      raw[p + 1] = (c >>> 8) & 0xFF;
      raw[p + 2] = c & 0xFF;
    }
  }
  const comp = deflateSync(raw);
  const ihdr = Buffer.allocUnsafe(13);
  ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8; ihdr[9] = 2; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  const makeChunk = (type, data) => {
    const tb = Buffer.from(type, 'ascii');
    return Buffer.concat([uint32be(data.length), tb, data, uint32be(crc32(Buffer.concat([tb, data])) >>> 0)]);
  };
  const uint32be = (v) => { const b = Buffer.allocUnsafe(4); b.writeUInt32BE(v); return b; };
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    makeChunk('IHDR', ihdr),
    makeChunk('IDAT', comp),
    makeChunk('IEND', Buffer.alloc(0)),
  ]);
}

mkdirSync('test_output/chr_banks', { recursive: true });
for (let b = 0; b < 32; b++) {
  const buf = renderBank(b);
  writeFileSync(`test_output/chr_banks/chr_${String(b).padStart(2,'0')}.png`, encodePNG(buf, 128, 128));
}
console.log('Saved 32 CHR bank previews to test_output/chr_banks/');
