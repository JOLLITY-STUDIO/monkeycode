/**
 * 最终正确渲染 - 标题画面
 *
 * 关键修正:
 *   - nametable 字节序: LITTLE-ENDIAN (非 big-endian!)
 *     证据: LE读取 tile索引256-383连续，BE读取索引193/449/705跳跃
 *   - CRAM 字节序: LITTLE-ENDIAN
 *     证据: LE下颜色[3]=rgb(216,180,108)浅黄，BE下全是红色调
 *
 * 确认参数:
 *   - nametable地址: 0xC000 (R2=0x30 影子寄存器确认)
 *   - 显示模式: 320x224 (H40 + V28)
 *   - nametable尺寸: 64列 x 32行
 *   - tile索引: word & 0x7FF (11位)
 *   - 调色板: (word >> 13) & 3
 *   - 优先级: (word >> 15) & 1
 *   - H翻转: bit12, V翻转: bit11
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createCanvas } from 'canvas';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..', '..');
const DATA_DIR = join(ROOT, 'src/langrisser2/20260713');

const VRAM_PATH = join(DATA_DIR, 'Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');
const CRAM_PATH = join(DATA_DIR, 'Langrisser II (Japan)_CRAM-TITILE-SCEEN.ram');
const OUT_PATH  = join(DATA_DIR, 'output/title-render-correct.png');

// ============================================================
// 加载数据
// ============================================================
const vram = new Uint8Array(readFileSync(VRAM_PATH));
const cram = new Uint8Array(readFileSync(CRAM_PATH));
console.log('VRAM:', vram.length, 'bytes, CRAM:', cram.length, 'bytes');

// ============================================================
// CRAM 解码 (little-endian)
// ============================================================
// Genesis CRAM 颜色格式 (9-bit BGR):
//   bit8-6 = Blue, bit5-3 = Green, bit2-0 = Red
//   每通道3位 (0-7), 乘以36映射到0-252

function cramWordLE(i) {
  // little-endian: 低字节在前
  return (cram[i * 2 + 1] << 8) | cram[i * 2];
}

function cramWordToRgb(word) {
  const r = (word & 0x07) * 36;
  const g = ((word >> 3) & 0x07) * 36;
  const b = ((word >> 6) & 0x07) * 36;
  return { r, g, b };
}

const palette = [];
for (let i = 0; i < 64; i++) {
  palette.push(cramWordToRgb(cramWordLE(i)));
}

console.log('\n--- CRAM 调色板 (little-endian) ---');
console.log('Palette 0 (背景):');
for (let i = 0; i < 16; i++) {
  const c = palette[i];
  console.log(`  [${i}] rgb(${c.r},${c.g},${c.b}) word=0x${cramWordLE(i).toString(16).padStart(4,'0')}`);
}
console.log('Palette 2 (nametable引用):');
for (let i = 32; i < 48; i++) {
  const c = palette[i];
  console.log(`  [${i}] rgb(${c.r},${c.g},${c.b}) word=0x${cramWordLE(i).toString(16).padStart(4,'0')}`);
}

// ============================================================
// Tile 解码 (4bpp 位平面格式)
// ============================================================
// 每个 tile 32字节 = 8行 × 4字节/行
// 4个位平面: 每行4个字节对应4个位平面，水平扫描8像素
// 像素颜色索引 = p0 | p1<<1 | p2<<2 | p3<<3

function decodeTile(tileIdx) {
  const offset = tileIdx * 32;
  const pixels = new Uint8Array(64); // 8x8
  for (let y = 0; y < 8; y++) {
    const rowOff = offset + y * 4;
    for (let x = 0; x < 8; x++) {
      const bit = 7 - x;
      const p0 = (vram[rowOff + 0] >> bit) & 1;
      const p1 = (vram[rowOff + 1] >> bit) & 1;
      const p2 = (vram[rowOff + 2] >> bit) & 1;
      const p3 = (vram[rowOff + 3] >> bit) & 1;
      pixels[y * 8 + x] = p0 | (p1 << 1) | (p2 << 2) | (p3 << 3);
    }
  }
  return pixels;
}

// 预解码所有tile
const tileCache = new Array(2048);
for (let i = 0; i < 2048; i++) {
  tileCache[i] = decodeTile(i);
}

// ============================================================
// nametable 解析 (little-endian)
// ============================================================
function readNametableEntry(planeBase, tx, ty) {
  const addr = planeBase + (ty * 64 + tx) * 2;
  const lo = vram[addr];        // 低字节在前
  const hi = vram[addr + 1];
  const word = (hi << 8) | lo;  // little-endian 组合
  return {
    priority: (word >> 15) & 1,
    palette:  (word >> 13) & 3,
    hflip:    (word >> 12) & 1,
    vflip:    (word >> 11) & 1,
    tileIdx:  word & 0x7FF,
    word,
    addr
  };
}

// ============================================================
// 渲染 Plane A
// ============================================================
const PLANE_A_BASE = 0xC000; // R2=0x30 → 0xC000
const DISPLAY_W = 320;
const DISPLAY_H = 224;
const COLS = 40; // H40
const ROWS = 28; // V28

function renderPlane() {
  const canvas = createCanvas(DISPLAY_W, DISPLAY_H);
  const ctx = canvas.getContext('2d');
  const imgData = ctx.createImageData(DISPLAY_W, DISPLAY_H);
  const data = imgData.data;

  let entryCount = 0;
  let nonZeroTileCount = 0;

  for (let ty = 0; ty < ROWS; ty++) {
    for (let tx = 0; tx < COLS; tx++) {
      const entry = readNametableEntry(PLANE_A_BASE, tx, ty);
      
      if (entry.word === 0) {
        // 空条目，画背景色
        const bg = palette[0];
        for (let py = 0; py < 8; py++) {
          for (let px = 0; px < 8; px++) {
            const ox = tx * 8 + px;
            const oy = ty * 8 + py;
            const di = (oy * DISPLAY_W + ox) * 4;
            data[di] = bg.r; data[di+1] = bg.g; data[di+2] = bg.b; data[di+3] = 255;
          }
        }
        continue;
      }

      entryCount++;
      const tilePixels = tileCache[entry.tileIdx] || tileCache[0];
      const palBase = entry.palette * 16;

      // 检查tile是否有数据
      let tileHasData = false;
      for (let i = 0; i < 64; i++) {
        if (tilePixels[i] !== 0) { tileHasData = true; break; }
      }
      if (tileHasData) nonZeroTileCount++;

      for (let py = 0; py < 8; py++) {
        for (let px = 0; px < 8; px++) {
          const srcX = entry.hflip ? (7 - px) : px;
          const srcY = entry.vflip ? (7 - py) : py;
          const colorIdx = tilePixels[srcY * 8 + srcX];
          const palIdx = palBase + colorIdx;
          const color = palette[palIdx] || palette[0];

          const ox = tx * 8 + px;
          const oy = ty * 8 + py;
          const di = (oy * DISPLAY_W + ox) * 4;
          data[di] = color.r; data[di+1] = color.g; data[di+2] = color.b; data[di+3] = 255;
        }
      }
    }
  }

  ctx.putImageData(imgData, 0, 0);
  console.log(`\n渲染统计: ${entryCount} 个非空nametable条目, ${nonZeroTileCount} 个有数据的tile`);
  return canvas;
}

// ============================================================
// 渲染并保存
// ============================================================
console.log('\n--- 渲染标题画面 (LE nametable + LE CRAM) ---');
const canvas = renderPlane();

// 加边框和标签
const labeled = createCanvas(DISPLAY_W + 20, DISPLAY_H + 40);
const lctx = labeled.getContext('2d');
lctx.fillStyle = '#000';
lctx.fillRect(0, 0, labeled.width, labeled.height);
lctx.fillStyle = '#0f0';
lctx.font = '14px monospace';
lctx.fillText('Title Screen - LE nametable + LE CRAM (320x224)', 10, 20);
lctx.drawImage(canvas, 10, 30);

writeFileSync(OUT_PATH, labeled.toBuffer('image/png'));
console.log(`\n✅ 输出: ${OUT_PATH}`);

// ============================================================
// 额外: 输出调色板可视化
// ============================================================
const palCanvas = createCanvas(64 * 4, 16 * 8 + 20);
const pctx = palCanvas.getContext('2d');
pctx.fillStyle = '#000';
pctx.fillRect(0, 0, palCanvas.width, palCanvas.height);
pctx.fillStyle = '#fff';
pctx.font = '10px monospace';
pctx.fillText('Palette (4 palettes x 16 colors, little-endian CRAM)', 4, 12);

for (let pal = 0; pal < 4; pal++) {
  for (let i = 0; i < 16; i++) {
    const idx = pal * 16 + i;
    const c = palette[idx];
    pctx.fillStyle = `rgb(${c.r},${c.g},${c.b})`;
    pctx.fillRect(i * 16, 20 + pal * 16, 16, 16);
    pctx.fillStyle = '#fff';
    pctx.font = '6px monospace';
    pctx.fillText(`${i}`, i * 16 + 2, 20 + pal * 16 + 8);
  }
}
const PAL_OUT = join(DATA_DIR, 'output/palette-le.png');
writeFileSync(PAL_OUT, palCanvas.toBuffer('image/png'));
console.log(`✅ 调色板: ${PAL_OUT}`);
