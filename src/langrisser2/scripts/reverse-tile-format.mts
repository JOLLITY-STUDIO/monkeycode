/**
 * 从截图中提取一个独特的 8x8 tile，然后在 VRAM 中搜索匹配的位模式
 * 从而反推出正确的 tile 编码格式
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createCanvas } from 'canvas';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const OUT_DIR = resolve(ROOT, 'output');
mkdirSync(OUT_DIR, { recursive: true });

const vram = new Uint8Array(
  readFileSync(resolve(ROOT, '20260713/Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram'))
);

// 加载截图
const bmpBuf = readFileSync(resolve(ROOT, 'screenshots/Langrisser II (Japan)_034.bmp'));
function parseBMP(buffer: Buffer): { w: number; h: number; data: Uint8Array } {
  const w = buffer.readInt32LE(0x12);
  const h = buffer.readInt32LE(0x16);
  const dataOffset = buffer.readUInt32LE(0x0A);
  const absH = Math.abs(h);
  const data = new Uint8Array(w * absH * 4);
  const rowSize = Math.ceil((w * 3) / 4) * 4;
  for (let y = 0; y < absH; y++) {
    const srcY = h > 0 ? (absH - 1 - y) : y;
    const srcOff = dataOffset + srcY * rowSize;
    const dstOff = y * w * 4;
    for (let x = 0; x < w; x++) {
      const s = srcOff + x * 3;
      const d = dstOff + x * 4;
      data[d] = buffer[s + 2];
      data[d + 1] = buffer[s + 1];
      data[d + 2] = buffer[s];
      data[d + 3] = 255;
    }
  }
  return { w, h: absH, data };
}
const { w: SW, h: SH, data: shot } = parseBMP(bmpBuf);

// 提取截图中的 1-bit 掩码 (非背景 = 1)
function isBg(r: number, g: number, b: number): boolean {
  return r < 30 && g < 30 && b > 40;
}

const shotMask = new Uint8Array(SW * SH);
for (let i = 0; i < SW * SH; i++) {
  const r = shot[i * 4];
  const g = shot[i * 4 + 1];
  const b = shot[i * 4 + 2];
  shotMask[i] = isBg(r, g, b) ? 0 : 1;
}

// 从截图标题区域提取一个 tile (找一个有特征的)
// 标题大约在 y=50-150, x=30-290
function getTileMask(sx: number, sy: number): Uint8Array {
  const m = new Uint8Array(64);
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      m[y * 8 + x] = shotMask[(sy + y) * SW + (sx + x)];
    }
  }
  return m;
}

// 找一个特征丰富的 tile 位置
// 找一个非零像素约 20-40 的 tile（既有内容又不太满）
let bestNZ = 0;
let bestX = 0, bestY = 0;
let bestScore = 0;
for (let ty = 48; ty < 160; ty += 8) {
  for (let tx = 16; tx < 304; tx += 8) {
    const m = getTileMask(tx, ty);
    let nz = 0;
    m.forEach(v => v && nz++);
    // 找 25-45 个非零像素的，并且行列分布均匀
    if (nz >= 20 && nz <= 48) {
      // 计算行列分布方差，越均匀越好
      const rowNZ = new Array(8).fill(0);
      const colNZ = new Array(8).fill(0);
      for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
          if (m[y * 8 + x]) {
            rowNZ[y]++;
            colNZ[x]++;
          }
        }
      }
      const rowVar = rowNZ.reduce((s, v) => s + Math.abs(v - nz / 8), 0);
      const colVar = colNZ.reduce((s, v) => s + Math.abs(v - nz / 8), 0);
      const score = rowVar + colVar; // 方差越大越有特征
      if (score > bestScore) {
        bestScore = score;
        bestNZ = nz;
        bestX = tx;
        bestY = ty;
      }
    }
  }
}

const TEST_TILE_X = bestX;
const TEST_TILE_Y = bestY;

console.log(`找到特征 tile 位置: (${TEST_TILE_X}, ${TEST_TILE_Y}), 非零像素: ${bestNZ}`);

const targetMask = getTileMask(TEST_TILE_X, TEST_TILE_Y);

console.log('目标 tile 掩码 (从截图提取):');
for (let y = 0; y < 8; y++) {
  let line = '  ';
  for (let x = 0; x < 8; x++) {
    line += targetMask[y * 8 + x] ? '█' : '·';
  }
  console.log(line);
}
let nz = 0;
targetMask.forEach(v => v && nz++);
console.log(`  非零像素: ${nz}/64`);

// ========================================
// 在 VRAM 中搜索匹配的 tile
// 尝试多种解码格式，看哪种格式在 VRAM 中能找到匹配的 tile
// ========================================

type Decoder = (idx: number) => Uint8Array;

// 各种解码格式
const decoders: { name: string; decode: Decoder }[] = [];

// 行主序
function decRow(p0: number, p1: number, p2: number, p3: number, bit7Left: boolean): Decoder {
  const order = [p0, p1, p2, p3];
  return (idx: number) => {
    const off = idx * 32;
    const out = new Uint8Array(64);
    for (let y = 0; y < 8; y++) {
      const base = off + y * 4;
      const bytes = order.map(i => vram[base + i]);
      for (let x = 0; x < 8; x++) {
        const bit = bit7Left ? (7 - x) : x;
        const b = bytes.map(b => (b >> bit) & 1);
        out[y * 8 + x] = b[0] | (b[1] << 1) | (b[2] << 2) | (b[3] << 3);
      }
    }
    return out;
  };
}

// 列主序
function decCol(p0: number, p1: number, p2: number, p3: number, bit7Top: boolean): Decoder {
  const order = [p0, p1, p2, p3];
  return (idx: number) => {
    const off = idx * 32;
    const out = new Uint8Array(64);
    for (let x = 0; x < 8; x++) {
      const base = off + x * 4;
      const bytes = order.map(i => vram[base + i]);
      for (let y = 0; y < 8; y++) {
        const bit = bit7Top ? (7 - y) : y;
        const b = bytes.map(b => (b >> bit) & 1);
        out[y * 8 + x] = b[0] | (b[1] << 1) | (b[2] << 2) | (b[3] << 3);
      }
    }
    return out;
  };
}

// 平面主序
function decPlane(bit7Left: boolean): Decoder {
  return (idx: number) => {
    const off = idx * 32;
    const out = new Uint8Array(64);
    for (let y = 0; y < 8; y++) {
      const p0 = vram[off + y];
      const p1 = vram[off + 8 + y];
      const p2 = vram[off + 16 + y];
      const p3 = vram[off + 24 + y];
      for (let x = 0; x < 8; x++) {
        const bit = bit7Left ? (7 - x) : x;
        const b0 = (p0 >> bit) & 1;
        const b1 = (p1 >> bit) & 1;
        const b2 = (p2 >> bit) & 1;
        const b3 = (p3 >> bit) & 1;
        out[y * 8 + x] = b0 | (b1 << 1) | (b2 << 2) | (b3 << 3);
      }
    }
    return out;
  };
}

// 2bpp 行主序（前 16 字节是 2bpp，后 16 字节也是？）
// 不对，4bpp 就是 4 个位平面

// 生成各种格式
// 行主序: 24 种 (4! 种字节排列 × 2 种 bit 顺序)
const perms = [
  [0, 1, 2, 3], [0, 1, 3, 2], [0, 2, 1, 3], [0, 2, 3, 1], [0, 3, 1, 2], [0, 3, 2, 1],
  [1, 0, 2, 3], [1, 0, 3, 2], [1, 2, 0, 3], [1, 2, 3, 0], [1, 3, 0, 2], [1, 3, 2, 0],
  [2, 0, 1, 3], [2, 0, 3, 1], [2, 1, 0, 3], [2, 1, 3, 0], [2, 3, 0, 1], [2, 3, 1, 0],
  [3, 0, 1, 2], [3, 0, 2, 1], [3, 1, 0, 2], [3, 1, 2, 0], [3, 2, 0, 1], [3, 2, 1, 0],
];

for (const p of perms) {
  for (const bit7 of [true, false]) {
    decoders.push({
      name: `行_${p.join('')}_bit7=${bit7}`,
      decode: decRow(p[0], p[1], p[2], p[3], bit7)
    });
  }
}

for (const p of perms) {
  for (const bit7 of [true, false]) {
    decoders.push({
      name: `列_${p.join('')}_bit7=${bit7}`,
      decode: decCol(p[0], p[1], p[2], p[3], bit7)
    });
  }
}

decoders.push({ name: '平面_bit7=true', decode: decPlane(true) });
decoders.push({ name: '平面_bit7=false', decode: decPlane(false) });

// 对于每种格式，在 VRAM 中找最匹配的 tile
console.log(`\n在 ${Math.floor(vram.length / 32)} 个 tile 中搜索...`);
console.log(`共 ${decoders.length} 种解码格式\n`);

interface MatchResult {
  name: string;
  bestTile: number;
  bestMatch: number;
}

const results: MatchResult[] = [];

for (const { name, decode } of decoders) {
  let bestTile = 0;
  let bestMatch = 0;
  for (let t = 0; t < Math.floor(vram.length / 32); t++) {
    const tile = decode(t);
    let match = 0;
    for (let i = 0; i < 64; i++) {
      const a = targetMask[i];
      const b = tile[i] !== 0 ? 1 : 0;
      if (a === b) match++;
    }
    if (match > bestMatch) {
      bestMatch = match;
      bestTile = t;
    }
    if (match === 64) break; // 完美匹配，提前退出
  }
  results.push({ name, bestTile, bestMatch });
}

// 按匹配度排序
results.sort((a, b) => b.bestMatch - a.bestMatch);

console.log('=== 匹配度 Top 20 ===');
for (let i = 0; i < 20 && i < results.length; i++) {
  const r = results[i];
  const pct = (r.bestMatch / 64 * 100).toFixed(1);
  console.log(`${String(i + 1).padStart(2)}. ${r.name.padEnd(22)} tile=${String(r.bestTile).padStart(4)} match=${r.bestMatch}/64 (${pct}%)`);
}

// 分类统计
const rowBest = results.find(r => r.name.startsWith('行_'));
const colBest = results.find(r => r.name.startsWith('列_'));
const planeBest = results.find(r => r.name.startsWith('平面'));
console.log(`\n分类最佳:`);
console.log(`  行主序最佳: ${rowBest?.bestMatch}/64 tile=${rowBest?.bestTile}`);
console.log(`  列主序最佳: ${colBest?.bestMatch}/64 tile=${colBest?.bestTile}`);
console.log(`  平面主序最佳: ${planeBest?.bestMatch}/64 tile=${planeBest?.bestTile}`);

// 画出 Top 8 的匹配结果
const canvas = createCanvas(100 + 9 * 40, 300);
const ctx = canvas.getContext('2d');
ctx.fillStyle = '#111';
ctx.fillRect(0, 0, canvas.width, canvas.height);

// 画目标
ctx.fillStyle = 'white';
ctx.font = '12px sans-serif';
ctx.fillText('目标', 10, 15);
for (let y = 0; y < 8; y++) {
  for (let x = 0; x < 8; x++) {
    if (targetMask[y * 8 + x]) {
      ctx.fillStyle = 'gold';
      ctx.fillRect(10 + x * 4, 25 + y * 4, 4, 4);
    }
  }
}

// 画 Top 8
for (let i = 0; i < 8 && i < results.length; i++) {
  const r = results[i];
  const x = 90 + i * 45;
  ctx.fillStyle = 'white';
  ctx.fillText(`#${i + 1}`, x, 15);
  ctx.fillStyle = '#888';
  ctx.font = '10px sans-serif';
  ctx.fillText(`t${r.bestTile}`, x, 65);
  ctx.font = '12px sans-serif';

  // 找对应 decoder
  const dec = decoders.find(d => d.name === r.name)!;
  const tile = dec.decode(r.bestTile);
  for (let y = 0; y < 8; y++) {
    for (let px = 0; px < 8; px++) {
      if (tile[y * 8 + px] !== 0) {
        const hue = (tile[y * 8 + px] * 40) % 360;
        ctx.fillStyle = `hsl(${hue}, 80%, 60%)`;
        ctx.fillRect(x + px * 4, 25 + y * 4, 4, 4);
      }
    }
  }

  // 标签
  ctx.fillStyle = '#aaa';
  ctx.font = '9px monospace';
  const shortName = r.name.substring(0, 12);
  ctx.fillText(shortName, x - 2, 75);
  const pct = (r.bestMatch / 64 * 100).toFixed(0) + '%';
  ctx.fillText(pct, x + 10, 88);
}

const outPath = resolve(OUT_DIR, 'tile-pattern-match.png');
writeFileSync(outPath, canvas.toBuffer('image/png'));
console.log(`\n匹配可视化: ${outPath}`);
