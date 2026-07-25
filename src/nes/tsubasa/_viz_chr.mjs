/**
 * CHR bank visualizer: extract CHR-ROM from rom.nes and decode as NES 2bpp tiles
 * Each CHR bank = 8KB = 512 tiles (16 bytes each)
 * Renders at 3 widths per bank:
 *   32 tiles wide = NES screen grid (good for title/background banks)
 *    8 tiles wide = 2×2 sprite groups
 *    4 tiles wide = 4×4 sprite groups (good for character portrait banks)
 *
 * Usage: node _viz_chr.mjs
 */

import { readFileSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { deflateSync } from 'zlib';

const ROM_PATH = './rom.nes';
const OUT_DIR = './_viz_chr';

// NES palette (approximate RGB)
const NES_PAL = [
  [0x62,0x62,0x62], [0x00,0x1F,0x7A], [0x1D,0x0E,0x90], [0x3E,0x0B,0x80], // 00-03
  [0x56,0x04,0x60], [0x5F,0x00,0x34], [0x55,0x00,0x0C], [0x40,0x08,0x00], // 04-07
  [0x26,0x1E,0x00], [0x0D,0x32,0x00], [0x00,0x3A,0x00], [0x00,0x33,0x0A], // 08-0B
  [0x00,0x26,0x3A], [0x00,0x00,0x00], [0x00,0x00,0x00], [0x00,0x00,0x00], // 0C-0F
  [0xA9,0xA9,0xA9], [0x0E,0x4E,0xC3], [0x46,0x30,0xE2], [0x74,0x1B,0xCD], // 10-13
  [0x93,0x0F,0xA6], [0x9D,0x08,0x6A], [0x91,0x06,0x28], [0x6F,0x1C,0x00], // 14-17
  [0x4E,0x3B,0x00], [0x2B,0x55,0x00], [0x0E,0x63,0x00], [0x00,0x5B,0x1F], // 18-1B
  [0x00,0x4A,0x6D], [0x00,0x00,0x00], [0x00,0x00,0x00], [0x00,0x00,0x00], // 1C-1F
  [0xFC,0xFC,0xFC], [0x45,0x95,0xFF], [0x84,0x74,0xFF], [0xB8,0x5A,0xFF], // 20-23
  [0xDA,0x4A,0xF0], [0xE5,0x42,0xAF], [0xDD,0x46,0x62], [0xBB,0x5E,0x1C], // 24-27
  [0x94,0x7E,0x00], [0x6A,0x9C,0x00], [0x3F,0xAD,0x00], [0x1E,0xA4,0x48], // 28-2B
  [0x00,0x90,0x9E], [0x00,0x00,0x00], [0x00,0x00,0x00], [0x00,0x00,0x00], // 2C-2F
  [0xFC,0xFC,0xFC], [0xA4,0xCE,0xFF], [0xC9,0xBE,0xFF], [0xDD,0xB3,0xFF], // 30-33
  [0xEE,0xAB,0xFF], [0xF2,0xA9,0xDF], [0xF1,0xAA,0xAA], [0xE3,0xB5,0x8C], // 34-37
  [0xCF,0xC0,0x75], [0xBA,0xCF,0x71], [0x9D,0xD6,0x7C], [0x88,0xD2,0x95], // 38-3B
  [0x79,0xCC,0xCE], [0x00,0x00,0x00], [0x00,0x00,0x00], [0x00,0x00,0x00], // 3C-3F
];

const GRAY_PAL = [[0,0,0],[85,85,85],[170,170,170],[255,255,255]];

// ========== PNG encoder ==========

function crc32(buf) {
  const table = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    table[n] = c;
  }
  let c = -1;
  for (let i = 0; i < buf.length; i++) c = table[(c ^ buf[i]) & 0xFF] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
}

function pngChunk(type, data) {
  const typeBytes = Buffer.from(type, 'ascii');
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const crcInput = Buffer.concat([typeBytes, data]);
  const crcVal = Buffer.alloc(4);
  crcVal.writeUInt32BE(crc32(crcInput), 0);
  return Buffer.concat([len, typeBytes, data, crcVal]);
}

function makePNG_RGB(width, height, r, g, b) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; ihdr[9] = 2; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  const rawRows = [];
  for (let y = 0; y < height; y++) {
    rawRows.push(0);
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      rawRows.push(r[idx], g[idx], b[idx]);
    }
  }
  const idatData = deflateSync(Buffer.from(rawRows));
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  return Buffer.concat([sig, pngChunk('IHDR', ihdr), pngChunk('IDAT', idatData), pngChunk('IEND', Buffer.alloc(0))]);
}

// ========== NES 2bpp tile decoder ==========

function decodeTile(data, offset) {
  const pixels = new Uint8Array(64);
  for (let row = 0; row < 8; row++) {
    let lo = data[offset + row];
    let hi = data[offset + row + 8];
    for (let col = 0; col < 8; col++) {
      const bit = 7 - col;
      pixels[row * 8 + col] = ((lo >> bit) & 1) | (((hi >> bit) & 1) << 1);
    }
  }
  return pixels;
}

// ========== Bank render (custom tilesW) ==========

function renderCHRBank(chrData, palette, tilesW) {
  const tilesH = Math.ceil(512 / tilesW);
  const W = tilesW * 8, H = tilesH * 8;
  const r = new Uint8Array(W * H);
  const g = new Uint8Array(W * H);
  const b = new Uint8Array(W * H);

  for (let tileIdx = 0; tileIdx < 512; tileIdx++) {
    const tilePixels = decodeTile(chrData, tileIdx * 16);
    const tx = tileIdx % tilesW;
    const ty = Math.floor(tileIdx / tilesW);

    for (let py = 0; py < 8; py++) {
      for (let px = 0; px < 8; px++) {
        const colorIdx = tilePixels[py * 8 + px];
        const [cr, cg, cb] = palette[colorIdx];
        const idx = (ty * 8 + py) * W + (tx * 8 + px);
        r[idx] = cr; g[idx] = cg; b[idx] = cb;
      }
    }
  }
  return { r, g, b, W, H };
}

// ========== NES 8×16 sprite mode: every 2 tiles stack vertically ==========
function renderCHRBank_8x16(chrData, palette) {
  const SPRITES_PER_ROW = 8; // 8 sprites (each 8×16) per row = 64px wide
  const SPRITE_COUNT = 256;  // 512 tiles / 2
  const rows = Math.ceil(SPRITE_COUNT / SPRITES_PER_ROW); // 32 rows
  const W = SPRITES_PER_ROW * 8;
  const H = rows * 16;
  const r = new Uint8Array(W * H);
  const g = new Uint8Array(W * H);
  const b = new Uint8Array(W * H);
  for (let si = 0; si < SPRITE_COUNT; si++) {
    const sx = (si % SPRITES_PER_ROW) * 8;
    const sy = Math.floor(si / SPRITES_PER_ROW) * 16;
    // top tile
    const topPx = decodeTile(chrData, si * 2 * 16);
    for (let py = 0; py < 8; py++) {
      for (let px = 0; px < 8; px++) {
        const colorIdx = topPx[py * 8 + px];
        const [cr, cg, cb] = palette[colorIdx];
        const idx = (sy + py) * W + (sx + px);
        r[idx] = cr; g[idx] = cg; b[idx] = cb;
      }
    }
    // bottom tile
    const botPx = decodeTile(chrData, (si * 2 + 1) * 16);
    for (let py = 0; py < 8; py++) {
      for (let px = 0; px < 8; px++) {
        const colorIdx = botPx[py * 8 + px];
        const [cr, cg, cb] = palette[colorIdx];
        const idx = (sy + 8 + py) * W + (sx + px);
        r[idx] = cr; g[idx] = cg; b[idx] = cb;
      }
    }
  }
  return { r, g, b, W, H };
}

// ========== Sprite group view: 4×4 tiles = 32×32 px cells ==========
// Takes 512 tiles, arranges them as groups of 4×4 tiles
function renderCHRBank_grouped(chrData, palette, groupW, groupH) {
  const tilesPerGroup = groupW * groupH; // e.g. 4×4=16
  const numGroups = Math.floor(512 / tilesPerGroup); // e.g. 32 groups
  const GROUPS_PER_ROW = 8;
  const groupsH = Math.ceil(numGroups / GROUPS_PER_ROW);
  const W = GROUPS_PER_ROW * groupW * 8;
  const H = groupsH * groupH * 8;
  const r = new Uint8Array(W * H);
  const g = new Uint8Array(W * H);
  const b = new Uint8Array(W * H);
  for (let gi = 0; gi < numGroups; gi++) {
    const gRow = Math.floor(gi / GROUPS_PER_ROW);
    const gCol = gi % GROUPS_PER_ROW;
    const baseX = gCol * groupW * 8;
    const baseY = gRow * groupH * 8;
    for (let ty = 0; ty < groupH; ty++) {
      for (let tx = 0; tx < groupW; tx++) {
        const tileIdx = gi * tilesPerGroup + ty * groupW + tx;
        if (tileIdx >= 512) continue;
        const tilePixels = decodeTile(chrData, tileIdx * 16);
        // skip blank tiles (all zeros)
        let hasData = false;
        for (let i = 0; i < 64; i++) { if (tilePixels[i] !== 0) { hasData = true; break; } }
        if (!hasData) continue;
        for (let py = 0; py < 8; py++) {
          for (let px = 0; px < 8; px++) {
            const colorIdx = tilePixels[py * 8 + px];
            const [cr, cg, cb] = palette[colorIdx];
            const idx = (baseY + ty * 8 + py) * W + (baseX + tx * 8 + px);
            r[idx] = cr; g[idx] = cg; b[idx] = cb;
          }
        }
      }
    }
  }
  return { r, g, b, W, H };
}

// ========== Generic sprite sheet: assemble tiles into WxH sprites ==========
// order: 'row' = row-major inside each sprite, 'col' = column-major inside each sprite
function renderSpriteSheet(chrData, palette, spriteW, spriteH, order = 'row') {
  const tilesPerSprite = spriteW * spriteH;
  const spriteCount = Math.floor(512 / tilesPerSprite);
  const spritesPerRow = 8;
  const sheetRows = Math.ceil(spriteCount / spritesPerRow);
  const W = spritesPerRow * spriteW * 8;
  const H = sheetRows * spriteH * 8;
  const r = new Uint8Array(W * H).fill(40);
  const g = new Uint8Array(W * H).fill(40);
  const b = new Uint8Array(W * H).fill(40);

  for (let si = 0; si < spriteCount; si++) {
    const sCol = si % spritesPerRow;
    const sRow = Math.floor(si / spritesPerRow);
    const baseX = sCol * spriteW * 8;
    const baseY = sRow * spriteH * 8;
    const baseTile = si * tilesPerSprite;

    for (let ty = 0; ty < spriteH; ty++) {
      for (let tx = 0; tx < spriteW; tx++) {
        const tileOffset = (order === 'col'
          ? baseTile + tx * spriteH + ty
          : baseTile + ty * spriteW + tx) * 16;
        const tilePixels = decodeTile(chrData, tileOffset);
        for (let py = 0; py < 8; py++) {
          for (let px = 0; px < 8; px++) {
            const colorIdx = tilePixels[py * 8 + px];
            const [cr, cg, cb] = palette[colorIdx];
            const idx = (baseY + ty * 8 + py) * W + (baseX + tx * 8 + px);
            r[idx] = cr; g[idx] = cg; b[idx] = cb;
          }
        }
      }
    }
  }
  return { r, g, b, W, H };
}

// ========== Main ==========

function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  const rom = readFileSync(ROM_PATH);
  const chrCount = rom[5];
  const prgSize = rom[4] * 16384;
  const chrOffset = 16 + prgSize;

  const chrBanks = [];
  for (let i = 0; i < chrCount; i++) {
    chrBanks.push(rom.slice(chrOffset + i * 8192, chrOffset + i * 8192 + 8192));
  }

  const widths = [
    { name: '32w', tilesW: 32, label: 'NES screen (32-wide)' },
    { name: '16w', tilesW: 16, label: '16-wide' },
    { name: '08w', tilesW: 8, label: '2×2 sprite (8-wide)' },
    { name: '04w', tilesW: 4, label: '4×4 sprite (4-wide)' },
    { name: '02w', tilesW: 2, label: '16×16 char (2-wide)' },
  ];

  const spriteModes = [
    { name: 'spr16x16r', w: 2, h: 2, order: 'row', label: '16×16 row-major' },
    { name: 'spr16x16c', w: 2, h: 2, order: 'col', label: '16×16 col-major' },
    { name: 'spr32x32r', w: 4, h: 4, order: 'row', label: '32×32 row-major' },
    { name: 'spr32x32c', w: 4, h: 4, order: 'col', label: '32×32 col-major' },
    { name: 'spr16x32r', w: 2, h: 4, order: 'row', label: '16×32 row-major' },
    { name: 'spr16x32c', w: 2, h: 4, order: 'col', label: '16×32 col-major' },
    { name: 'spr32x16r', w: 4, h: 2, order: 'row', label: '32×16 row-major' },
    { name: 'spr32x16c', w: 4, h: 2, order: 'col', label: '32×16 col-major' },
  ];

  // ===== Per-bank: widths + 8x16 + grouped + sprite sheets =====
  const sizes = {}; // cache image sizes for HTML
  for (let i = 0; i < chrCount; i++) {
    const bKey = String(i).padStart(2, '0');
    for (const w of widths) {
      const key = `bank_${bKey}_${w.name}`;
      const { r, g, b, W, H } = renderCHRBank(chrBanks[i], GRAY_PAL, w.tilesW);
      sizes[key] = { W, H };
      writeFileSync(join(OUT_DIR, `chr_bank_${bKey}_${w.name}.png`), makePNG_RGB(W, H, r, g, b));
    }
    // 8×16 sprite mode (vertical pairs)
    {
      const key = `bank_${bKey}_8x16`;
      const s8x16 = renderCHRBank_8x16(chrBanks[i], GRAY_PAL);
      sizes[key] = { W: s8x16.W, H: s8x16.H };
      writeFileSync(join(OUT_DIR, `chr_bank_${bKey}_8x16.png`), makePNG_RGB(s8x16.W, s8x16.H, s8x16.r, s8x16.g, s8x16.b));
    }
    // grouped view: 4×4 tile groups
    {
      const key = `bank_${bKey}_grp4x4`;
      const g4 = renderCHRBank_grouped(chrBanks[i], GRAY_PAL, 4, 4);
      sizes[key] = { W: g4.W, H: g4.H };
      writeFileSync(join(OUT_DIR, `chr_bank_${bKey}_grp4x4.png`), makePNG_RGB(g4.W, g4.H, g4.r, g4.g, g4.b));
    }
    // sprite sheets with row/col major tile ordering
    for (const mode of spriteModes) {
      const key = `bank_${bKey}_${mode.name}`;
      const ss = renderSpriteSheet(chrBanks[i], GRAY_PAL, mode.w, mode.h, mode.order);
      sizes[key] = { W: ss.W, H: ss.H };
      writeFileSync(join(OUT_DIR, `chr_bank_${bKey}_${mode.name}.png`), makePNG_RGB(ss.W, ss.H, ss.r, ss.g, ss.b));
    }
    console.log(`  bank_${bKey} ✓`);
  }

  // ===== HTML page =====
  let html = `<!DOCTYPE html><html><head><meta charset="utf-8">
<title>CHR Bank Visualizer (multi-width)</title>
<style>
  body { background:#111; color:#ccc; font:14px monospace; padding:10px; }
  h2 { color:#fff; margin: 20px 0 8px; }
  .row { display:flex; flex-wrap:wrap; align-items:flex-start; gap:8px; margin-bottom:16px; }
  .item { text-align:center; }
  .item img { image-rendering:pixelated; border:1px solid #333; display:block; }
  .item .label { font-size:11px; margin-top:3px; color:#888; }
</style></head><body>
<h2>CHR Banks — multi-width + 8×16 sprite views</h2>
<p style="font-size:12px;color:#888">Width=32 → NES screen /  Width=8 → 2×2 /  Width=4 → 4×4 /  8×16 → vertical sprite pairs</p>
`;

  for (const w of widths) {
    html += `<h3>Width = ${w.tilesW} (${w.label})</h3><div class="row">`;
    for (let i = 0; i < chrCount; i++) {
      const bKey = String(i).padStart(2, '0');
      const key = `bank_${bKey}_${w.name}`;
      const { W, H } = sizes[key];
      html += `<div class="item"><img src="chr_bank_${bKey}_${w.name}.png" style="width:${W * 2}px;height:${H * 2}px"><div class="label">bank_${bKey}</div></div>\n`;
    }
    html += `</div>`;
  }

  // 8×16 sprite view
  html += `<h3>8×16 sprite mode (every 2 tiles stacked vertically)</h3><div class="row">`;
  for (let i = 0; i < chrCount; i++) {
    const bKey = String(i).padStart(2, '0');
    const { W, H } = sizes[`bank_${bKey}_8x16`];
    html += `<div class="item"><img src="chr_bank_${bKey}_8x16.png" style="width:${W * 2}px;height:${H * 2}px"><div class="label">bank_${bKey}</div></div>\n`;
  }
  html += `</div>`;

  // Grouped view
  html += `<h3>Grouped: 4×4 tile cells (32×32 px) — character portraits</h3><div class="row">`;
  for (let i = 0; i < chrCount; i++) {
    const bKey = String(i).padStart(2, '0');
    const { W, H } = sizes[`bank_${bKey}_grp4x4`];
    html += `<div class="item"><img src="chr_bank_${bKey}_grp4x4.png" style="width:${W * 2}px;height:${H * 2}px"><div class="label">bank_${bKey}</div></div>\n`;
  }
  html += `</div>`;

  // Sprite sheets
  for (const mode of spriteModes) {
    html += `<h3>${mode.label} (sprite ${mode.w * 8}×${mode.h * 8}px)</h3><div class="row">`;
    for (let i = 0; i < chrCount; i++) {
      const bKey = String(i).padStart(2, '0');
      const { W, H } = sizes[`bank_${bKey}_${mode.name}`];
      html += `<div class="item"><img src="chr_bank_${bKey}_${mode.name}.png" style="width:${W * 2}px;height:${H * 2}px"><div class="label">bank_${bKey}</div></div>\n`;
    }
    html += `</div>`;
  }

  html += `</body></html>`;
  writeFileSync(join(OUT_DIR, 'index.html'), html);

  console.log(`\nDone! Open _viz_chr/index.html`);
  console.log(`Widths + 8x16 + grouped + sprite sheets per bank`);
}

main();
