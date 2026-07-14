/**
 * 分析 Plane A 中引用了多少种不同的 tile，以及它们的形状分布
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

const BASE = 0xC000;

function read16(addr: number): number {
  return (vram[(addr + 1) & 0xFFFF] << 8) | vram[addr & 0xFFFF];
}

// 行主序解码，返回 1-bit mask
function decTileMask(tileIdx: number): bigint {
  let mask = 0n;
  const offset = tileIdx * 32;
  for (let y = 0; y < 8; y++) {
    const rowOffset = offset + y * 4;
    const p0 = vram[rowOffset];
    const p1 = vram[rowOffset + 1];
    const p2 = vram[rowOffset + 2];
    const p3 = vram[rowOffset + 3];
    const row = p0 | p1 | p2 | p3;
    for (let x = 0; x < 8; x++) {
      if (row & (1 << (7 - x))) {
        mask |= 1n << BigInt(y * 8 + x);
      }
    }
  }
  return mask;
}

// 收集 Plane A 中所有引用的 tile
const tileSet = new Set<number>();
const tileCount = new Map<number, number>();

for (let ty = 0; ty < 32; ty++) {
  for (let tx = 0; tx < 40; tx++) {
    const word = read16(BASE + (ty * 64 + tx) * 2);
    const tileIdx = word & 0x7FF;
    if (tileIdx > 0) {
      tileSet.add(tileIdx);
      tileCount.set(tileIdx, (tileCount.get(tileIdx) || 0) + 1);
    }
  }
}

console.log(`Plane A 共引用 ${tileSet.size} 种不同的 tile`);
console.log(`总非空 tile 数量: ${[...tileCount.values()].reduce((a,b) => a+b, 0)}`);

// 分析这些 tile 的形状：有多少是"竖线"型的（每列要么全满要么全空）
let verticalLineTiles = 0;
let mixedTiles = 0;
let horizontalLineTiles = 0;

const tileList = [...tileSet].sort((a, b) => a - b);

for (const idx of tileList) {
  const mask = decTileMask(idx);
  // 检查是不是每列都是统一的（全 0 或全 1）
  let allColsUniform = true;
  for (let x = 0; x < 8; x++) {
    let colVal = -1;
    for (let y = 0; y < 8; y++) {
      const bit = (mask >> BigInt(y * 8 + x)) & 1n;
      if (colVal === -1) {
        colVal = Number(bit);
      } else if (colVal !== Number(bit)) {
        allColsUniform = false;
        break;
      }
    }
    if (!allColsUniform) break;
  }
  if (allColsUniform) verticalLineTiles++;
  
  // 检查是不是每行都是统一的（横线型）
  let allRowsUniform = true;
  for (let y = 0; y < 8; y++) {
    let rowVal = -1;
    for (let x = 0; x < 8; x++) {
      const bit = (mask >> BigInt(y * 8 + x)) & 1n;
      if (rowVal === -1) {
        rowVal = Number(bit);
      } else if (rowVal !== Number(bit)) {
        allRowsUniform = false;
        break;
      }
    }
    if (!allRowsUniform) break;
  }
  if (allRowsUniform) horizontalLineTiles++;
  if (!allColsUniform && !allRowsUniform) mixedTiles++;
}

console.log(`\n形状分析:`);
console.log(`  竖线型（每列统一）: ${verticalLineTiles} / ${tileSet.size}`);
console.log(`  横线型（每行统一）: ${horizontalLineTiles} / ${tileSet.size}`);
console.log(`  混合型（横竖都有变化）: ${mixedTiles} / ${tileSet.size}`);

// 画一些典型 tile 的样例
const samplesPerRow = 16;
const tileSize = 10;
const rows = Math.ceil(tileList.length / samplesPerRow);
const canvas = createCanvas(
  samplesPerRow * (tileSize * 8 + 4) + 10,
  rows * (tileSize * 8 + 16) + 10
);
const ctx = canvas.getContext('2d');
ctx.fillStyle = '#1a1a2e';
ctx.fillRect(0, 0, canvas.width, canvas.height);

for (let i = 0; i < tileList.length; i++) {
  const col = i % samplesPerRow;
  const row = Math.floor(i / samplesPerRow);
  const x = 10 + col * (tileSize * 8 + 4);
  const y = 10 + row * (tileSize * 8 + 16);
  
  const idx = tileList[i];
  const mask = decTileMask(idx);
  
  ctx.fillStyle = '#000066';
  ctx.fillRect(x, y, tileSize * 8, tileSize * 8);
  
  for (let py = 0; py < 8; py++) {
    for (let px = 0; px < 8; px++) {
      if (mask & (1n << BigInt(py * 8 + px))) {
        ctx.fillStyle = '#ffcc33';
        ctx.fillRect(x + px * tileSize, y + py * tileSize, tileSize, tileSize);
      }
    }
  }
  
  ctx.fillStyle = 'white';
  ctx.font = '9px monospace';
  ctx.fillText(`${idx}(${tileCount.get(idx)})`, x, y + tileSize * 8 + 10);
}

const outPath = resolve(OUT_DIR, 'plane-a-tiles-sheet.png');
writeFileSync(outPath, canvas.toBuffer('image/png'));
console.log(`\nTile 图集: ${outPath}`);

// 也看看 tile 0-31 的前 32 个 tile（通常是系统 tile）
console.log(`\n前 32 个 tile 的形状:`);
for (let i = 0; i < 32; i++) {
  const mask = decTileMask(i);
  let nz = 0;
  for (let j = 0; j < 64; j++) {
    if (mask & (1n << BigInt(j))) nz++;
  }
  console.log(`  tile ${i}: ${nz}/64 非零像素`);
}
