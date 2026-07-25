import { readFileSync, mkdirSync, writeFileSync } from 'fs';
import { deflateSync, crc32 } from 'zlib';
import NES from './src/jsnes/src/nes.js';

const ROM = new Uint8Array(readFileSync('rom.nes'));
const nes = new NES({ onFrame: () => {}, emulateSound: false });
nes.loadROM(ROM);

const getMem = () => nes.cpu.mem;

// Run boot
for (let i = 0; i < 30; i++) nes.frame();

// Wait for scene 0
let scene = getMem()[0x26];
if (scene !== 0) {
  for (let i = 0; i < 600; i++) {
    nes.frame();
    scene = getMem()[0x26];
    if (scene === 0) break;
  }
}
console.log('Scene:', scene);

// Capture first frame of scene 0
nes.frame();

const ppu = nes.ppu;

// VRAM (2KB)
const vram = Array.from(ppu.vramMem);

// Palette (32 bytes)
const pal = [...ppu.imgPalette, ...ppu.sprPalette];

// OAM
const oam = Array.from(ppu.spriteMem);

// Ctrl / mask
const ctrl = (ppu.f_nmiOnVblank ? 0x80 : 0) |
  (ppu.f_spriteSize ? 0x20 : 0) |
  (ppu.f_bgPatternTable ? 0x10 : 0) |
  (ppu.f_spPatternTable ? 0x08 : 0) |
  (ppu.f_addrInc ? 0x04 : 0) |
  (ppu.f_nTblAddress & 0x03);
const mask = (ppu.f_color << 5) | (ppu.f_spVisibility << 4) | (ppu.f_bgVisibility << 3) |
  (ppu.f_spClipping << 2) | (ppu.f_bgClipping << 1) | ppu.f_dispType;

console.log('ctrl:', ctrl.toString(16), 'mask:', mask.toString(16));
console.log('bgTbl:', ppu.f_bgPatternTable ? '$1000' : '$0000');
console.log('sprTbl:', ppu.f_spPatternTable ? '$1000' : '$0000');
console.log('sprSize:', ppu.f_spriteSize ? '8x16' : '8x8');
console.log('VRAM nz:', vram.filter(x => x !== 0).length);

// Read pattern tables through PPU? jsnes exposes ptTile array
const pt0 = [];
const pt1 = [];
for (let t = 0; t < 256; t++) {
  const tile0 = ppu.ptTile[t];
  const tile1 = ppu.ptTile[t + 256];
  for (let row = 0; row < 8; row++) {
    pt0.push(tile0 ? tile0[row] : 0);
  }
  for (let row = 0; row < 8; row++) {
    pt1.push(tile1 ? tile1[row] : 0);
  }
}

// CHR-ROM: read full CHR from ROM
const PO = 16;
const chrOff = PO + 262144;
const chr = Array.from(ROM.slice(chrOff, chrOff + 32 * 4096));

// Decode a CHR tile (raw bitplanes -> 64 palette indices, Uint8Array)
function decodeChrTile(chrData, offset) {
  const pix = new Uint8Array(64);
  for (let row = 0; row < 8; row++) {
    const lo = chrData[offset + row];
    const hi = chrData[offset + row + 8];
    for (let col = 0; col < 8; col++) {
      const bit = 7 - col;
      pix[row * 8 + col] = ((lo >> bit) & 1) | (((hi >> bit) & 1) << 1);
    }
  }
  return pix;
}

function findBankMatches(ptTiles, label) {
  console.log(`\n${label} vs CHR banks:`);
  for (let b = 0; b < 32; b++) {
    let matches = 0;
    for (let t = 0; t < 256; t++) {
      const jsPix = ptTiles[t]?.pix;
      const chrPix = decodeChrTile(chr, b * 4096 + t * 16);
      let same = true;
      for (let i = 0; i < 64; i++) {
        if ((jsPix ? jsPix[i] : 0) !== chrPix[i]) { same = false; break; }
      }
      if (same) matches++;
    }
    if (matches > 10) console.log(`  CHR bank ${b}: ${matches}/256 tiles match`);
  }
}

// Render pattern tables from jsnes ptTile to PNG for visual comparison
function renderPt(tiles, label) {
  const cols = 16, rows = 16;
  const w = cols * 8, h = rows * 8;
  const buf = new Uint32Array(w * h);
  const colors = [0xFF000000, 0xFFFF0000, 0xFF00FF00, 0xFF0000FF];
  for (let t = 0; t < 256; t++) {
    const tx = t % cols, ty = Math.floor(t / cols);
    const tile = tiles[t];
    const pix = tile ? tile.pix : null;
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        const ci = pix ? pix[y * 8 + x] : 0;
        const px = tx * 8 + x, py = ty * 8 + y;
        buf[py * w + px] = colors[ci] ?? 0xFF000000;
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

const pt0Tiles = [], pt1Tiles = [];
for (let t = 0; t < 256; t++) {
  pt0Tiles.push(ppu.ptTile[t]);
  pt1Tiles.push(ppu.ptTile[t + 256]);
}

findBankMatches(pt0Tiles, 'PT0');
findBankMatches(pt1Tiles, 'PT1');

// Flatten PT tile pixel data: 256 tiles × 64 pixels each, palette index 0-3
function flattenPT(ptTiles) {
  const flat = [];
  for (let t = 0; t < 256; t++) {
    const tile = ptTiles[t];
    const pix = tile ? tile.pix : new Array(64).fill(0);
    for (let i = 0; i < 64; i++) flat.push(pix[i] ?? 0);
  }
  return flat;
}

mkdirSync('test_output/capture', { recursive: true });
writeFileSync('test_output/capture/pt0_jsnes.png', encodePNG(renderPt(pt0Tiles, 'PT0'), 128, 128));
writeFileSync('test_output/capture/pt1_jsnes.png', encodePNG(renderPt(pt1Tiles, 'PT1'), 128, 128));
writeFileSync('test_output/capture/ppu_state.json', JSON.stringify({
  ctrl, mask,
  vram, palette: pal, oam,
  pt0: flattenPT(pt0Tiles),
  pt1: flattenPT(pt1Tiles),
}, null, 2));

console.log('\nSaved to test_output/capture/');
