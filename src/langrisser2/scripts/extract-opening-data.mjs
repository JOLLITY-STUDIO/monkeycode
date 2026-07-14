/**
 * 提取开场动画数据并渲染测试
 *
 * VRAM 布局 (从 dump 分析):
 * - 0x0000-0x7FFF: Tile patterns (1024 tiles)
 * - 0xA000-0xAFFF: Plane A nametable (R2=0x28)
 * - 0xB000-0xBFFF: 更多 tile patterns (tiles 1408-1535)
 * - 0xF000-0xFFFF: Sprite attribute table (R5=0x78)
 *
 * Plane B 可能未使用 (0xC000 为空)
 *
 * CRAM dump 全为零, 暂时使用标题画面 CRAM 作为参考
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const VRAM_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_VRAM-openNING-ANIATION-2.ram');
const CRAM_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_CRAM-TITILE-SCEEN.ram');
const OUT_DIR = path.join(__dirname, '../20260713/output');

const vram = fs.readFileSync(VRAM_PATH);
const cram = fs.readFileSync(CRAM_PATH);

// ============================================================
// VDP 参数 (开场动画配置)
// ============================================================
const PLANE_A_BASE = 0xA000;  // R2 = 0x28
const PLANE_B_BASE = 0xC000;  // R4 = 0x06 (空)
const SPRITE_TABLE = 0xF000;  // R5 = 0x78
const DISPLAY_W = 320;        // H40
const DISPLAY_H = 224;        // V28

// ============================================================
// CRAM 颜色解码 (little-endian, RGB 3-bit)
// ============================================================
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

// ============================================================
// Tile 解码 (4bpp, 8rows × 4planes)
// ============================================================
function decodeTile(tileIndex) {
  const base = (tileIndex & 0x7FF) * 32;
  const pixels = new Uint8Array(64); // 8×8
  for (let y = 0; y < 8; y++) {
    const rb = base + y * 4;
    const p0 = vram[rb];
    const p1 = vram[rb + 1];
    const p2 = vram[rb + 2];
    const p3 = vram[rb + 3];
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

// ============================================================
// Nametable 条目解析 (little-endian)
// ============================================================
function parseNameTableEntry(addr) {
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

// ============================================================
// 渲染 Plane
// ============================================================
function renderPlane(
  planeBase,
  scrollX,
  scrollY,
  output,
  priorityFilter = -1,
) {
  const planeWidthTiles = 64;
  const planeHeightTiles = 32;
  const planeWidthPixels = planeWidthTiles * 8;
  const planeHeightPixels = planeHeightTiles * 8;

  const sx = ((scrollX % planeWidthPixels) + planeWidthPixels) % planeWidthPixels;
  const sy = ((scrollY % planeHeightPixels) + planeHeightPixels) % planeHeightPixels;

  const startTileX = Math.floor(sx / 8);
  const startTileY = Math.floor(sy / 8);
  const startPixelX = sx % 8;
  const startPixelY = sy % 8;

  const tilesPerRow = Math.ceil((DISPLAY_W + startPixelX) / 8) + 1;
  const tilesPerCol = Math.ceil((DISPLAY_H + startPixelY) / 8) + 1;

  // Tile cache
  const tileCache = new Map();
  function getTile(idx) {
    if (idx === 0) return new Uint8Array(64);
    let cached = tileCache.get(idx);
    if (!cached) {
      cached = decodeTile(idx);
      tileCache.set(idx, cached);
    }
    return cached;
  }

  for (let ty = 0; ty < tilesPerCol; ty++) {
    for (let tx = 0; tx < tilesPerRow; tx++) {
      const ntX = (startTileX + tx) % planeWidthTiles;
      const ntY = (startTileY + ty) % planeHeightTiles;

      const entryAddr = planeBase + (ntY * planeWidthTiles + ntX) * 2;
      const entry = parseNameTableEntry(entryAddr);

      if (priorityFilter !== -1 && entry.priority !== priorityFilter) continue;
      if (entry.tileIndex === 0) continue;

      const tilePixels = getTile(entry.tileIndex);
      const palBase = entry.palette * 16;

      const tileScreenX = tx * 8 - startPixelX;
      const tileScreenY = ty * 8 - startPixelY;

      for (let py = 0; py < 8; py++) {
        const screenY = tileScreenY + py;
        if (screenY < 0 || screenY >= DISPLAY_H) continue;

        const srcY = entry.vFlip ? (7 - py) : py;

        for (let px = 0; px < 8; px++) {
          const screenX = tileScreenX + px;
          if (screenX < 0 || screenX >= DISPLAY_W) continue;

          const srcX = entry.hFlip ? (7 - px) : px;
          const pixelValue = tilePixels[srcY * 8 + srcX];
          if (pixelValue === 0) continue; // 透明

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
}

// ============================================================
// 背景色填充
// ============================================================
function fillBackground(output, colorIdx) {
  const cramValue = readCRAM(colorIdx);
  const [r, g, b] = cramToRGB(cramValue);
  for (let i = 0; i < output.length; i += 4) {
    output[i] = r;
    output[i + 1] = g;
    output[i + 2] = b;
    output[i + 3] = 255;
  }
}

// ============================================================
// 渲染并保存 PPM
// ============================================================
function savePPM(filename, data, width, height) {
  const header = `P6\n${width} ${height}\n255\n`;
  const headerBuf = Buffer.from(header, 'ascii');
  const rgbData = Buffer.alloc(width * height * 3);
  for (let i = 0; i < width * height; i++) {
    rgbData[i * 3] = data[i * 4];
    rgbData[i * 3 + 1] = data[i * 4 + 1];
    rgbData[i * 3 + 2] = data[i * 4 + 2];
  }
  const outPath = path.join(OUT_DIR, filename);
  fs.writeFileSync(outPath, Buffer.concat([headerBuf, rgbData]));
  console.log(`  保存: ${outPath}`);
}

// ============================================================
// 主渲染
// ============================================================
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

console.log('=== 开场动画渲染 ===\n');

// 1. 分析 nametable 条目
console.log('--- Plane A nametable 分析 (0xA000) ---');
let entryCount = 0;
let nonZeroTiles = 0;
const paletteUsage = new Map();
const priorityUsage = new Map();
for (let i = 0; i < 2048; i++) {
  const entry = parseNameTableEntry(PLANE_A_BASE + i * 2);
  if (entry.tileIndex !== 0) {
    entryCount++;
    nonZeroTiles++;
    paletteUsage.set(entry.palette, (paletteUsage.get(entry.palette) || 0) + 1);
    priorityUsage.set(entry.priority, (priorityUsage.get(entry.priority) || 0) + 1);
  }
}
console.log(`  非空条目: ${nonZeroTiles}/2048`);
console.log(`  调色板使用:`, Array.from(paletteUsage.entries()));
console.log(`  优先级使用:`, Array.from(priorityUsage.entries()));

// 2. 渲染 Plane A
const output = new Uint8Array(DISPLAY_W * DISPLAY_H * 4);

// 先填充背景色 (CRAM[0] = 黑色)
fillBackground(output, 0);

// 渲染 Plane A 低优先级
renderPlane(PLANE_A_BASE, 0, 0, output, 0);
// 渲染 Plane A 高优先级
renderPlane(PLANE_A_BASE, 0, 0, output, 1);

savePPM('opening-aniation-frame1.ppm', output, DISPLAY_W, DISPLAY_H);

// 3. 统计渲染结果
let nonBlackPixels = 0;
const colorStats = new Map();
for (let i = 0; i < DISPLAY_W * DISPLAY_H; i++) {
  const r = output[i * 4];
  const g = output[i * 4 + 1];
  const b = output[i * 4 + 2];
  if (r > 0 || g > 0 || b > 0) nonBlackPixels++;
  const key = `${r},${g},${b}`;
  colorStats.set(key, (colorStats.get(key) || 0) + 1);
}
console.log(`\n--- 渲染统计 ---`);
console.log(`  非黑像素: ${nonBlackPixels}/${DISPLAY_W * DISPLAY_H} (${(nonBlackPixels / (DISPLAY_W * DISPLAY_H) * 100).toFixed(1)}%)`);
console.log(`  唯一颜色数: ${colorStats.size}`);
console.log(`  前 10 颜色:`);
const sortedColors = Array.from(colorStats.entries()).sort((a, b) => b[1] - a[1]);
for (const [color, count] of sortedColors.slice(0, 10)) {
  console.log(`    rgb(${color}): ${count} 像素`);
}

// 4. 也渲染第二帧 (SOMETIMES dump)
const VRAM2_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_VRAM-openNING-ANIATION-SOMETIMES.ram');
const vram2 = fs.readFileSync(VRAM2_PATH);

// 用 vram2 重新渲染
const vramOrig = vram;
// 替换 vram 内容 (hack: 直接修改 buffer)
for (let i = 0; i < vram.length; i++) {
  vram[i] = vram2[i];
}

const output2 = new Uint8Array(DISPLAY_W * DISPLAY_H * 4);
fillBackground(output2, 0);
renderPlane(PLANE_A_BASE, 0, 0, output2, 0);
renderPlane(PLANE_A_BASE, 0, 0, output2, 1);
savePPM('opening-aniation-frame2.ppm', output2, DISPLAY_W, DISPLAY_H);

// 恢复 vram
for (let i = 0; i < vram.length; i++) {
  vram[i] = vramOrig[i];
}

console.log('\n=== 完成 ===');
