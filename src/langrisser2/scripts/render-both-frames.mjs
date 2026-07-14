/**
 * 分别渲染两帧开场动画并统计
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const VRAM1_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_VRAM-openNING-ANIATION-2.ram');
const VRAM2_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_VRAM-openNING-ANIATION-SOMETIMES.ram');
const CRAM_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_CRAM-TITILE-SCEEN.ram');
const OUT_DIR = path.join(__dirname, '../20260713/output');

const cram = fs.readFileSync(CRAM_PATH);

const PLANE_A_BASE = 0xA000;
const DISPLAY_W = 320;
const DISPLAY_H = 224;

function cramToRGB(word) {
  const r = (word & 0x07) * 36;
  const g = ((word >> 3) & 0x07) * 36;
  const b = ((word >> 6) & 0x07) * 36;
  return [r, g, b];
}

function readCRAM(index) {
  const off = (index & 0x3F) * 2;
  return (cram[off + 1] << 8) | cram[off];
}

function decodeTile(vram, tileIndex) {
  const base = (tileIndex & 0x7FF) * 32;
  const pixels = new Uint8Array(64);
  for (let y = 0; y < 8; y++) {
    const rb = base + y * 4;
    const p0 = vram[rb], p1 = vram[rb + 1], p2 = vram[rb + 2], p3 = vram[rb + 3];
    for (let x = 0; x < 8; x++) {
      const bit = 7 - x;
      pixels[y * 8 + x] =
        ((p0 >> bit) & 1) |
        (((p1 >> bit) & 1) << 1) |
        (((p2 >> bit) & 1) << 2) |
        (((p3 >> bit) & 1) << 3);
    }
  }
  return pixels;
}

function parseNameTableEntry(vram, addr) {
  const lo = vram[addr & 0xFFFF];
  const hi = vram[(addr + 1) & 0xFFFF];
  const word = (hi << 8) | lo;
  return {
    tileIndex: word & 0x07FF,
    hFlip: !!(word & 0x1000),
    vFlip: !!(word & 0x0800),
    palette: (word >> 13) & 0x03,
    priority: (word >> 15) & 0x01,
  };
}

function renderFrame(vram, outName) {
  const output = new Uint8Array(DISPLAY_W * DISPLAY_H * 4);
  // 背景色 = CRAM[0]
  const bgColor = readCRAM(0);
  const [br, bg, bb] = cramToRGB(bgColor);
  for (let i = 0; i < output.length; i += 4) {
    output[i] = br;
    output[i + 1] = bg;
    output[i + 2] = bb;
    output[i + 3] = 255;
  }

  const tileCache = new Map();
  function getTile(idx) {
    if (idx === 0) return new Uint8Array(64);
    let cached = tileCache.get(idx);
    if (!cached) {
      cached = decodeTile(vram, idx);
      tileCache.set(idx, cached);
    }
    return cached;
  }

  // nametable 统计
  const paletteUsage = new Map();
  const priorityUsage = new Map();
  const tileUsage = new Set();
  for (let i = 0; i < 2048; i++) {
    const entry = parseNameTableEntry(vram, PLANE_A_BASE + i * 2);
    if (entry.tileIndex !== 0) {
      paletteUsage.set(entry.palette, (paletteUsage.get(entry.palette) || 0) + 1);
      priorityUsage.set(entry.priority, (priorityUsage.get(entry.priority) || 0) + 1);
      tileUsage.add(entry.tileIndex);
    }
  }

  // 渲染
  for (let ty = 0; ty < 28 + 1; ty++) {
    for (let tx = 0; tx < 40 + 1; tx++) {
      const ntX = tx % 64;
      const ntY = ty % 32;
      const entryAddr = PLANE_A_BASE + (ntY * 64 + ntX) * 2;
      const entry = parseNameTableEntry(vram, entryAddr);
      if (entry.tileIndex === 0) continue;

      const tilePixels = getTile(entry.tileIndex);
      const palBase = entry.palette * 16;

      for (let py = 0; py < 8; py++) {
        const screenY = ty * 8 + py;
        if (screenY >= DISPLAY_H) continue;
        const srcY = entry.vFlip ? (7 - py) : py;
        for (let px = 0; px < 8; px++) {
          const screenX = tx * 8 + px;
          if (screenX >= DISPLAY_W) continue;
          const srcX = entry.hFlip ? (7 - px) : px;
          const pixelValue = tilePixels[srcY * 8 + srcX];
          if (pixelValue === 0) continue;
          const colorIdx = palBase + pixelValue;
          const cramValue = readCRAM(colorIdx);
          const [r, g, b] = cramToRGB(cramValue);
          const outIdx = (screenY * DISPLAY_W + screenX) * 4;
          output[outIdx] = r;
          output[outIdx + 1] = g;
          output[outIdx + 2] = b;
          output[outIdx + 3] = 255;
        }
      }
    }
  }

  // 保存
  const header = `P6\n${DISPLAY_W} ${DISPLAY_H}\n255\n`;
  const headerBuf = Buffer.from(header, 'ascii');
  const rgbData = Buffer.alloc(DISPLAY_W * DISPLAY_H * 3);
  for (let i = 0; i < DISPLAY_W * DISPLAY_H; i++) {
    rgbData[i * 3] = output[i * 4];
    rgbData[i * 3 + 1] = output[i * 4 + 1];
    rgbData[i * 3 + 2] = output[i * 4 + 2];
  }
  const outPath = path.join(OUT_DIR, outName);
  fs.writeFileSync(outPath, Buffer.concat([headerBuf, rgbData]));

  // 颜色统计
  const colorStats = new Map();
  let nonBlackPixels = 0;
  for (let i = 0; i < DISPLAY_W * DISPLAY_H; i++) {
    const r = output[i * 4];
    const g = output[i * 4 + 1];
    const b = output[i * 4 + 2];
    if (r > 0 || g > 0 || b > 0) nonBlackPixels++;
    const key = `${r},${g},${b}`;
    colorStats.set(key, (colorStats.get(key) || 0) + 1);
  }

  return {
    outPath,
    paletteUsage,
    priorityUsage,
    tileUsageCount: tileUsage.size,
    colorStats,
    nonBlackPixels,
    maxTileIndex: Math.max(...tileUsage),
  };
}

// ============================================================
// 渲染第一帧
// ============================================================
console.log('=== 第一帧 (ANIATION-2) ===\n');
const vram1 = fs.readFileSync(VRAM1_PATH);
const r1 = renderFrame(vram1, 'opening-frame1-detail.ppm');
console.log(`  输出: ${r1.outPath}`);
console.log(`  非空 tile 索引数: ${r1.tileUsageCount}, 最大索引: ${r1.maxTileIndex}`);
console.log(`  调色板使用: ${Array.from(r1.paletteUsage.entries()).map(([p, c]) => `pal${p}=${c}`).join(', ')}`);
console.log(`  优先级使用: ${Array.from(r1.priorityUsage.entries()).map(([p, c]) => `pri${p}=${c}`).join(', ')}`);
console.log(`  非黑像素: ${r1.nonBlackPixels}/${DISPLAY_W * DISPLAY_H} (${(r1.nonBlackPixels / (DISPLAY_W * DISPLAY_H) * 100).toFixed(1)}%)`);
console.log(`  唯一颜色数: ${r1.colorStats.size}`);
console.log(`  前 10 颜色:`);
const sorted1 = Array.from(r1.colorStats.entries()).sort((a, b) => b[1] - a[1]);
for (const [color, count] of sorted1.slice(0, 10)) {
  console.log(`    rgb(${color}): ${count} 像素`);
}

// ============================================================
// 渲染第二帧
// ============================================================
console.log('\n=== 第二帧 (SOMETIMES) ===\n');
const vram2 = fs.readFileSync(VRAM2_PATH);
const r2 = renderFrame(vram2, 'opening-frame2-detail.ppm');
console.log(`  输出: ${r2.outPath}`);
console.log(`  非空 tile 索引数: ${r2.tileUsageCount}, 最大索引: ${r2.maxTileIndex}`);
console.log(`  调色板使用: ${Array.from(r2.paletteUsage.entries()).map(([p, c]) => `pal${p}=${c}`).join(', ')}`);
console.log(`  优先级使用: ${Array.from(r2.priorityUsage.entries()).map(([p, c]) => `pri${p}=${c}`).join(', ')}`);
console.log(`  非黑像素: ${r2.nonBlackPixels}/${DISPLAY_W * DISPLAY_H} (${(r2.nonBlackPixels / (DISPLAY_W * DISPLAY_H) * 100).toFixed(1)}%)`);
console.log(`  唯一颜色数: ${r2.colorStats.size}`);
console.log(`  前 10 颜色:`);
const sorted2 = Array.from(r2.colorStats.entries()).sort((a, b) => b[1] - a[1]);
for (const [color, count] of sorted2.slice(0, 10)) {
  console.log(`    rgb(${color}): ${count} 像素`);
}

// ============================================================
// 渲染 sprite 层 (第二帧)
// ============================================================
console.log('\n=== 第二帧 sprite 表内容 ===\n');
const SPRITE_BASE = 0xF000;
let validCount = 0;
for (let i = 0; i < 80 && validCount < 30; i++) {
  const base = SPRITE_BASE + i * 8;
  if (base + 8 > 0x10000) break;
  const y = vram2[base];
  const link = vram2[base + 1];
  const tileAttr = (vram2[base + 2] << 8) | vram2[base + 3];
  const x = (vram2[base + 6] << 8) | vram2[base + 7];
  if (y === 0 && tileAttr === 0 && x === 0) continue;
  // 解析 sprite 属性
  const tileIdx = tileAttr & 0x07FF;
  const hflip = !!(tileAttr & 0x0800);
  const vflip = !!(tileAttr & 0x1000);
  const pal = (tileAttr >> 13) & 0x03;
  const pri = (tileAttr >> 15) & 0x01;
  // X 坐标: bit15-8 是高字节, 实际 X 是 9 位 (0-511)
  // 但 320 像素显示下, X 范围 0-447 (有 128 像素 overflow)
  const xPos = x & 0x1FF; // 9 位
  const yPos = y & 0x1FF; // 9 位, 但实际 y 是 8 位
  console.log(`  [${i.toString().padStart(2)}] X=${xPos.toString().padStart(3)} Y=${yPos.toString().padStart(3)} Tile=0x${tileIdx.toString(16).padStart(3, '0')} Pal=${pal} Pri=${pri} HF=${hflip?1:0} VF=${vflip?1:0} Link=${link} (raw: 0x${x.toString(16)} 0x${y.toString(16)})`);
  validCount++;
}

console.log('\n=== 完成 ===');
