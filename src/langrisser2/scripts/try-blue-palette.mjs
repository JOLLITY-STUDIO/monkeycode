/**
 * 尝试让 pal2 使用 CRAM 中蓝色调颜色的区域
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createCanvas } from 'canvas';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..', '..');
const CRAM_PATH = join(ROOT, 'src/langrisser2/20260713/Langrisser II (Japan)_CRAM-TITILE-SCEEN.ram');
const VRAM_PATH = join(ROOT, 'src/langrisser2/20260713/Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');

const cram = new Uint8Array(readFileSync(CRAM_PATH));
const vram = new Uint8Array(readFileSync(VRAM_PATH));

// LE+BGR 解码
function decodeCRAM(i) {
  const word = (cram[i * 2 + 1] << 8) | cram[i * 2];
  return {
    r: ((word >> 0) & 7) * 36,
    g: ((word >> 3) & 7) * 36,
    b: ((word >> 6) & 7) * 36,
  };
}

// ============================================================
// 分析 CRAM 中哪些位置有蓝色调颜色
// ============================================================
console.log('=== CRAM 蓝色调颜色分析 ===');
const bluePositions = [];
for (let i = 0; i < 64; i++) {
  const c = decodeCRAM(i);
  if (c.b > c.r && c.b > c.g && c.b > 36) {
    bluePositions.push(i);
    console.log(`  CRAM[${i}] = rgb(${c.r},${c.g},${c.b})`);
  }
}

// ============================================================
// 尝试让 pal2 从不同位置开始，找到最佳匹配
// ============================================================
console.log('\n=== 尝试不同的 pal2 起始位置 ===');

function decodeTile(tileIdx) {
  const offset = tileIdx * 32;
  const pixels = new Uint8Array(64);
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

function readNametableEntry(tx, ty) {
  const addr = 0xC000 + (ty * 64 + tx) * 2;
  const lo = vram[addr];
  const hi = vram[addr + 1];
  const word = (hi << 8) | lo;
  return {
    palette: (word >> 13) & 3,
    hflip:   (word >> 12) & 1,
    vflip:   (word >> 11) & 1,
    tileIdx: word & 0x7FF,
  };
}

// 获取标题区域使用的颜色索引
const usedColorIndices = new Set();
for (let ty = 8; ty < 12; ty++) {
  for (let tx = 6; tx < 34; tx++) {
    const e = readNametableEntry(tx, ty);
    const tile = decodeTile(e.tileIdx);
    for (let i = 0; i < 64; i++) {
      usedColorIndices.add(tile[i]);
    }
  }
}
console.log(`标题区域使用的颜色索引: ${Array.from(usedColorIndices).sort((a,b) => a-b)}`);

// ============================================================
// 穷举 pal2 起始位置
// ============================================================
function renderWithOffset(offset, name) {
  const PAL_OFFSETS = [0, 16, offset, 48];
  
  const canvas = createCanvas(320, 224);
  const ctx = canvas.getContext('2d');
  const imgData = ctx.createImageData(320, 224);
  const data = imgData.data;

  const tileCache = new Array(2048);
  for (let i = 0; i < 2048; i++) tileCache[i] = decodeTile(i);

  for (let ty = 0; ty < 28; ty++) {
    for (let tx = 0; tx < 40; tx++) {
      const e = readNametableEntry(tx, ty);
      const tp = tileCache[e.tileIdx] || tileCache[0];
      for (let py = 0; py < 8; py++) {
        for (let px = 0; px < 8; px++) {
          const srcX = e.hflip ? (7 - px) : px;
          const srcY = e.vflip ? (7 - py) : py;
          const ci = tp[srcY * 8 + srcX];
          const c = decodeCRAM(PAL_OFFSETS[e.palette] + ci);
          const di = ((ty * 8 + py) * 320 + (tx * 8 + px)) * 4;
          data[di] = c.r; data[di+1] = c.g; data[di+2] = c.b; data[di+3] = 255;
        }
      }
    }
  }
  ctx.putImageData(imgData, 0, 0);
  
  const OUT_PATH = join(ROOT, `src/langrisser2/20260713/output/title-pal2-${name}.png`);
  writeFileSync(OUT_PATH, canvas.toBuffer('image/png'));
  console.log(`✅ pal2偏移=${offset}: ${OUT_PATH}`);
}

// 尝试蓝色区域附近的位置
for (const pos of bluePositions) {
  renderWithOffset(pos, `cram${pos}`);
}

// 也尝试一些其他位置
for (let i = 0; i < 64; i += 4) {
  if (!bluePositions.includes(i)) {
    renderWithOffset(i, `cram${i}`);
  }
}

// ============================================================
// 尝试完全不同的映射方式：每个颜色索引使用不同的CRAM位置
// pal2[N] = CRAM[lookup[N]]
// ============================================================
console.log('\n=== 尝试自定义颜色映射 ===');

// 根据截图颜色反向推导映射
// 标题区域颜色索引0 = rgb(0,0,72) = CRAM[4]
// 标题区域其他颜色索引应该是蓝色调

// 让我们看看 CRAM 中所有蓝色调的颜色
const blueColors = [];
for (let i = 0; i < 64; i++) {
  const c = decodeCRAM(i);
  if (c.b > c.r && c.b > c.g && c.b > 36) {
    blueColors.push({ idx: i, ...c });
  }
}

console.log('蓝色调颜色列表:');
blueColors.sort((a, b) => b.b - a.b);
for (const c of blueColors) {
  console.log(`  CRAM[${c.idx}] = rgb(${c.r},${c.g},${c.b})`);
}

// 如果 pal2[0] = CRAM[4] = rgb(0,0,72)
// pal2[1] 应该是更深的蓝色，可能是 CRAM[1] = rgb(0,0,216) (BE+RGB)
// 但 BE+RGB 的解码方式不同

// 让我尝试使用 BE+RGB 解码方式
function decodeCRAM_BE_RGB(i) {
  const word = (cram[i * 2 + 1] << 8) | cram[i * 2];
  return {
    r: ((word >> 14) & 7) * 36,
    g: ((word >> 11) & 7) * 36,
    b: ((word >> 8) & 7) * 36,
  };
}

console.log('\nBE+RGB 解码方式:');
console.log('调色板2 (CRAM[32-47]):');
for (let i = 32; i < 48; i++) {
  const c = decodeCRAM_BE_RGB(i);
  console.log(`  pal2[${i-32}] (CRAM[${i}]) = rgb(${c.r},${c.g},${c.b})`);
}

// 使用 BE+RGB 方式渲染
function renderBE_RGB() {
  const canvas = createCanvas(320, 224);
  const ctx = canvas.getContext('2d');
  const imgData = ctx.createImageData(320, 224);
  const data = imgData.data;

  const tileCache = new Array(2048);
  for (let i = 0; i < 2048; i++) tileCache[i] = decodeTile(i);

  for (let ty = 0; ty < 28; ty++) {
    for (let tx = 0; tx < 40; tx++) {
      const e = readNametableEntry(tx, ty);
      const tp = tileCache[e.tileIdx] || tileCache[0];
      const palBase = e.palette * 16;
      for (let py = 0; py < 8; py++) {
        for (let px = 0; px < 8; px++) {
          const srcX = e.hflip ? (7 - px) : px;
          const srcY = e.vflip ? (7 - py) : py;
          const ci = tp[srcY * 8 + srcX];
          const c = decodeCRAM_BE_RGB(palBase + ci);
          const di = ((ty * 8 + py) * 320 + (tx * 8 + px)) * 4;
          data[di] = c.r; data[di+1] = c.g; data[di+2] = c.b; data[di+3] = 255;
        }
      }
    }
  }
  ctx.putImageData(imgData, 0, 0);
  
  const OUT_PATH = join(ROOT, 'src/langrisser2/20260713/output/title-be-rgb.png');
  writeFileSync(OUT_PATH, canvas.toBuffer('image/png'));
  console.log(`\n✅ 输出: ${OUT_PATH}`);
}

renderBE_RGB();
