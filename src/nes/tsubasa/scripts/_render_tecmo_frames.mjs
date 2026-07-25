/**
 * 渲染 TECMO logo 開場動畫每一幀為 PNG
 * 從 rom.nes 讀取:
 *   - PRG bank 03: nametable (960B) + attribute table (64B)
 *   - CHR bank 15: tiles (4KB, 256 × 16B)
 *   - PRG bank 06: BG palette (16B)
 *
 * 動畫: 380 幀
 *   0-14:   FADE_IN  亮度 0→15
 *   15-364: DISPLAY  全亮
 *   365-379: FADE_OUT 亮度 15→0
 *
 * 執行: node scripts/_render_tecmo_frames.mjs
 * 輸出: test_output/tecmo_frames/*.png
 */
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { deflateSync, crc32 } from 'node:zlib';

const CWD = process.cwd();
const rom = readFileSync(join(CWD, 'rom.nes'));
const PO = 16; // iNES header

// ── Nametable + attributes + PT1 tiles from jsnes VRAM capture ──
const ppuState = JSON.parse(readFileSync(join(CWD, 'test_output', 'capture', 'ppu_state.json'), 'utf8'));
const nt = new Uint8Array(ppuState.vram.slice(0, 960));    // 30×32 tile indices
const at = new Uint8Array(ppuState.vram.slice(960, 1024)); // 64 attribute bytes

// ── PT tile pixel data (pick based on ctrl bit4: 0=$0000=pt0, 1=$1000=pt1) ──
const usePT1 = (ppuState.ctrl >> 4) & 1;
const ptFlat = usePT1 ? ppuState.pt1 : ppuState.pt0;
console.log(`BG uses ${usePT1 ? '$1000 (PT1)' : '$0000 (PT0)'}`);

// ── BG palette: use ppu_state palette indices ──
const bgPalSrc = ppuState.palette.slice(0, 16);

// NES_PAL removed — using live ppu_state palette (ARGB) instead

// ═══════════════ 常數 ═══════════════
const SCREEN_W = 256;
const SCREEN_H = 240;
const NT_COLS = 32;
const NT_ROWS = 30;

const FADE_IN   = 0;
const DISPLAY   = 380;
const FADE_OUT  = 0;
const TOTAL     = FADE_IN + DISPLAY + FADE_OUT; // 380

// ═══════════════ 亮度衰減 (ARGB palette) ═══════════════
function buildBrightnessRamp(srcPalARGB) {
  const ramp = Array.from({ length: 16 }, (_, level) => {
    const row = new Array(16);
    for (let i = 0; i < 16; i++) {
      const argb = srcPalARGB[i] ?? 0;
      const r = (argb >> 16) & 0xFF;
      const g = (argb >> 8) & 0xFF;
      const b = (argb >> 0) & 0xFF;
      const scale = level / 15;
      const nr = Math.round(r * scale);
      const ng = Math.round(g * scale);
      const nb = Math.round(b * scale);
      row[i] = 0xFF000000 | (nr << 16) | (ng << 8) | nb;
    }
    return row;
  });
  return ramp;
}

const BR_RAMP = buildBrightnessRamp(bgPalSrc);

/** 幀數 → 亮度 (0-15) */
function frameToBrightness(f) {
  if (f < FADE_IN) return Math.floor(f);
  if (f < FADE_IN + DISPLAY) return 15;
  return TOTAL - 1 - f;
}

// ═══════════════ Tile 解碼 (from ppu_state PT flat pixel data) ═══════════════
function decodeTile(buf8, tileIdx) {
  const off = tileIdx * 64;
  for (let i = 0; i < 64; i++) {
    buf8[i] = ptFlat[off + i] ?? 0;
  }
}

// ═══════════════ Attribute → palette index ═══════════════
// NES attribute byte layout: (tl<<6)|(tr<<4)|(bl<<2)|br
function getAttrPal(atByte, localX, localY) {
  const quad = ((localY & 2) << 1) | (localX & 2);
  return (atByte >> quad) & 3;
}

// ═══════════════ 渲染一幀 ═══════════════
function renderFrame(frameNum) {
  const b = frameToBrightness(frameNum);
  const darkPal = BR_RAMP[b]; // 16 ARGB values, darkened

  const screen = new Uint32Array(SCREEN_W * SCREEN_H);
  const tilePx = new Uint8Array(64); // reusable tile decode buffer

  for (let ty = 0; ty < NT_ROWS; ty++) {
    for (let tx = 0; tx < NT_COLS; tx++) {
      const tileIdx = nt[ty * NT_COLS + tx];
      if (tileIdx === 0) continue;

      // palette from attribute table
      const ax = tx >> 2;
      const ay = ty >> 2;
      const attrByte = at[ay * 8 + ax] ?? 0;
      const palIdx = getAttrPal(attrByte, tx, ty);
      const palOff = palIdx * 4;

      // decode tile
      decodeTile(tilePx, tileIdx);

      // blit 8×8
      const dx = tx * 8;
      const dy = ty * 8;
      for (let py = 0; py < 8; py++) {
        const sy = dy + py;
        if (sy < 0 || sy >= SCREEN_H) continue;
        const rowOff = sy * SCREEN_W;
        const srcOff = py * 8;
        for (let px = 0; px < 8; px++) {
          const sx = dx + px;
          if (sx < 0 || sx >= SCREEN_W) continue;
          const ci = tilePx[srcOff + px];
          if (ci === 0) {
            // color 0 = universal background (palette[0], already ARGB)
            screen[rowOff + sx] = darkPal[0] ?? 0xFF000000;
          } else {
            // color 1-3, already ARGB
            screen[rowOff + sx] = darkPal[palOff + ci] ?? 0xFF000000;
          }
        }
      }
    }
  }

  return screen;
}

// ═══════════════ PNG 編碼 ═══════════════
// Minimal PNG encoder: RGB (color type 2), 8-bit depth, no filter

function crc32_buf(data) {
  // node:zlib's crc32 returns the CRC, but we need it unsigned
  return crc32(data) >>> 0;
}

function uint32be(v) {
  const b = Buffer.allocUnsafe(4);
  b.writeUInt32BE(v);
  return b;
}

function makeChunk(type, data) {
  const typeBytes = Buffer.from(type, 'ascii');
  const lenBytes = uint32be(data.length);
  const crcInput = Buffer.concat([typeBytes, data]);
  const crcBytes = uint32be(crc32_buf(crcInput));
  return Buffer.concat([lenBytes, typeBytes, data, crcBytes]);
}

function encodePNG(screen /* Uint32Array */) {
  // Build raw scanlines: filter byte 0 + RGB triplets
  const scanlineLen = 1 + SCREEN_W * 3;
  const raw = Buffer.allocUnsafe(SCREEN_H * scanlineLen);
  for (let y = 0; y < SCREEN_H; y++) {
    const rowOff = y * SCREEN_W;
    const outOff = y * scanlineLen;
    raw[outOff] = 0; // filter: none
    for (let x = 0; x < SCREEN_W; x++) {
      const argb = screen[rowOff + x];
      const rgbOff = outOff + 1 + x * 3;
      raw[rgbOff]     = (argb >>> 16) & 0xFF; // R
      raw[rgbOff + 1] = (argb >>> 8) & 0xFF;  // G
      raw[rgbOff + 2] = argb & 0xFF;          // B
    }
  }

  // Deflate
  const compressed = deflateSync(raw);

  // Build PNG
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  const ihdrData = Buffer.allocUnsafe(13);
  let off = 0;
  ihdrData.writeUInt32BE(SCREEN_W, off);  off += 4;
  ihdrData.writeUInt32BE(SCREEN_H, off);  off += 4;
  ihdrData[off++] = 8;   // bit depth
  ihdrData[off++] = 2;   // color type: RGB
  ihdrData[off++] = 0;   // compression
  ihdrData[off++] = 0;   // filter
  ihdrData[off++] = 0;   // interlace

  const ihdr = makeChunk('IHDR', ihdrData);
  const idat = makeChunk('IDAT', compressed);
  const iend = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([sig, ihdr, idat, iend]);
}

// ═══════════════ MAIN ═══════════════
const OUT_DIR = join(CWD, 'test_output', 'tecmo_render');
mkdirSync(OUT_DIR, { recursive: true });

console.log(`Rendering ${TOTAL} frames...`);

for (let f = 0; f < TOTAL; f++) {
  const brightness = frameToBrightness(f);
  const screen = renderFrame(f);
  const png = encodePNG(screen);
  const fname = `frame_${String(f).padStart(3, '0')}.png`;
  writeFileSync(join(OUT_DIR, fname), png);
  if (f % 20 === 0 || f === TOTAL - 1) {
    const phase = f < FADE_IN ? 'FADE_IN' : f < FADE_IN + DISPLAY ? 'DISPLAY' : 'FADE_OUT';
    console.log(`  [${String(f).padStart(3,'0')}/${TOTAL}] ${phase} brightness=${brightness}`);
  }
}

console.log(`\nDone! ${TOTAL} PNGs saved to ${OUT_DIR}`);
