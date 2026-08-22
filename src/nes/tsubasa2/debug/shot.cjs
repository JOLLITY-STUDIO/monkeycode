/**
 * shot.cjs — tsnes 渲染指定帧为 PNG
 * 用法: node debug/shot.cjs <帧号> <输出png>
 *   例: node debug/shot.cjs 30 debug/f30.png
 */
const fs = require('fs');
const zlib = require('zlib');
const tsnes = require('../../tsnes/_build/index.js');

const frameNo = parseInt(process.argv[2] || '30', 10);
const outFile = process.argv[3] || 'debug/shot.png';

const romPath = 'docs/roms/Captain Tsubasa II - Super Striker (Japan).nes';
const rom = fs.readFileSync(romPath);
const nes = new tsnes.NES({ emulateSound: false });
nes.loadROM(rom);

for (let f = 0; f < frameNo; f++) nes.frame();

const ppu = nes.ppu;
const vm = ppu.vramMem;

// ── 调色板 → RGB (NES NTSC) ──
const NES_RGB = [
  0x525252, 0xB40000, 0xA00000, 0xB1003D, 0x740069, 0x00005B, 0x00005F, 0x001840,
  0x002F10, 0x084A08, 0x006700, 0x124200, 0x6D2800, 0x000000, 0x000000, 0x000000,
  0xC4D5E7, 0xFF4000, 0xDC0E22, 0xFF476B, 0xD7009F, 0x680AD7, 0x0019BC, 0x0054B1,
  0x006A5B, 0x008C03, 0x00AB00, 0x2C8800, 0xA47200, 0x000000, 0x000000, 0x000000,
  0xF8F8F8, 0xFFAB3C, 0xFF7981, 0xFF5BC5, 0xFF48F2, 0xDF49FF, 0x476DFF, 0x00B4F7,
  0x00E0FF, 0x00E375, 0x03F42B, 0x78B82E, 0xE5E218, 0x787878, 0x000000, 0x000000,
  0xFFFFFF, 0xFFF2BE, 0xF8B8B8, 0xF8B8D8, 0xFFB6FF, 0xFFC3FF, 0xC7D1FF, 0x9ADAFF,
  0x88EDF8, 0x83FFDD, 0xB8F8B8, 0xF5F8AC, 0xFFFFB0, 0xF8D8F8, 0x000000, 0x000000,
];

const W = 256, H = 240;
const img = Buffer.alloc(W * H * 3);

// BG 图案表基址 (0x0000 或 0x1000)
const bgBase = ppu.f_bgPatternTable ? 0x1000 : 0x0000;
const sprBase = ppu.f_spPatternTable ? 0x1000 : 0x0000;

// ── 背景 ──
for (let ty = 0; ty < 30; ty++) {
  for (let tx = 0; tx < 32; tx++) {
    const tile = vm[0x2000 + ty * 32 + tx];
    // 属性: 16x16 块
    const attrByte = vm[0x23C0 + Math.floor(ty / 4) * 8 + Math.floor(tx / 4)];
    const q = (Math.floor(tx % 4 / 2)) | ((Math.floor(ty % 4 / 2)) << 1);
    const palIdx = (attrByte >> (q * 2)) & 3;
    const palBase = 0x3F00 + palIdx * 4;
    // 8x8 像素
    for (let py = 0; py < 8; py++) {
      const p0 = vm[bgBase + tile * 16 + py];
      const p1 = vm[bgBase + tile * 16 + py + 8];
      for (let px = 0; px < 8; px++) {
        const bit = 7 - px;
        const c = ((p1 >> bit) & 1) * 2 + ((p0 >> bit) & 1);
        const nesColor = c === 0 ? vm[0x3F00] : vm[palBase + c];
        const rgb = NES_RGB[nesColor & 0x3F] ?? 0;
        const dx = tx * 8 + px;
        const dy = ty * 8 + py;
        const o = (dy * W + dx) * 3;
        if (dx < W && dy < H) {
          img[o] = (rgb >> 16) & 0xFF;
          img[o + 1] = (rgb >> 8) & 0xFF;
          img[o + 2] = rgb & 0xFF;
        }
      }
    }
  }
}

// ── 精灵 (OAM) ──
const oam = ppu.spriteMem; // 256 字节
for (let i = 0; i < 64; i++) {
  const y = oam[i * 4];
  const tile = oam[i * 4 + 1];
  const attr = oam[i * 4 + 2];
  const x = oam[i * 4 + 3];
  if (y >= 0xF8 || x >= 0xF8) continue; // 隐藏
  const palIdx = (attr & 3) + 4; // 精灵调色板 $3F10+
  const palBase = 0x3F10 + palIdx * 4;
  const flipH = (attr & 0x40) !== 0;
  const flipV = (attr & 0x80) !== 0;
  const spr8 = ppu.f_spriteSize ? 16 : 8; // 8x8 或 8x16
  for (let py = 0; py < 8; py++) {
    const srcY = flipV ? 7 - py : py;
    const p0 = vm[sprBase + tile * 16 + srcY];
    const p1 = vm[sprBase + tile * 16 + srcY + 8];
    for (let px = 0; px < 8; px++) {
      const srcX = flipH ? px : 7 - px;
      const c = ((p1 >> srcX) & 1) * 2 + ((p0 >> srcX) & 1);
      if (c === 0) continue; // 透明
      const nesColor = vm[palBase + c];
      const rgb = NES_RGB[nesColor & 0x3F] ?? 0;
      const dx = x + px;
      const dy = y + py;
      const o = (dy * W + dx) * 3;
      if (dx < W && dy < H) {
        img[o] = (rgb >> 16) & 0xFF;
        img[o + 1] = (rgb >> 8) & 0xFF;
        img[o + 2] = rgb & 0xFF;
      }
    }
  }
}

// ── PNG 编码 ──
function crc32(buf) {
  let c;
  const table = [];
  for (let n = 0; n < 256; n++) {
    c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c >>> 0;
  }
  let crc = 0xFFFFFFFF;
  for (const b of buf) crc = table[(crc ^ b) & 0xFF] ^ (crc >>> 8);
  return (crc ^ 0xFFFFFFFF) >>> 0;
}
function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const td = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(td));
  return Buffer.concat([len, td, crc]);
}
const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(W, 0);
ihdr.writeUInt32BE(H, 4);
ihdr[8] = 8; // bit depth
ihdr[9] = 2; // RGB
const raw = Buffer.alloc(H * (1 + W * 3));
for (let y = 0; y < H; y++) {
  raw[y * (1 + W * 3)] = 0; // filter none
  img.copy(raw, y * (1 + W * 3) + 1, y * W * 3, (y + 1) * W * 3);
}
const png = Buffer.concat([
  Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]),
  chunk('IHDR', ihdr),
  chunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
  chunk('IEND', Buffer.alloc(0)),
]);
fs.writeFileSync(outFile, png);
console.log(`frame ${frameNo} → ${outFile} (${png.length} bytes)`);
console.log(`NT0 非零: ${countNonZero(vm.slice(0x2000, 0x23C0))}, pal: ${Array.from(vm.slice(0x3F00, 0x3F20)).map(b => b.toString(16).padStart(2, '0')).join(' ')}`);
console.log(`OAM 精灵: ${countOam(oam)}`);

function countNonZero(buf) {
  let n = 0;
  for (const b of buf) if (b !== 0) n++;
  return n;
}
function countOam(oam) {
  let n = 0;
  for (let i = 0; i < 64; i++) if (oam[i * 4] < 0xF8) n++;
  return n;
}
