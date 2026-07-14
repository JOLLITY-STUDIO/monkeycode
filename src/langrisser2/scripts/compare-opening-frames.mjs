/**
 * 比较两帧开场动画 VRAM dump 的差异
 *
 * - ANIATION-2: 第一帧
 * - SOMETIMES: 第二帧 (不同时间点)
 *
 * 分析:
 * 1. 哪些区域变化 (tile pattern vs nametable vs sprite)
 * 2. nametable 变化的模式 (滚动? 帧切换?)
 * 3. sprite 表的变化
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const VRAM1_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_VRAM-openNING-ANIATION-2.ram');
const VRAM2_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_VRAM-openNING-ANIATION-SOMETIMES.ram');

const vram1 = fs.readFileSync(VRAM1_PATH);
const vram2 = fs.readFileSync(VRAM2_PATH);

console.log('=== 两帧 VRAM dump 差异分析 ===\n');
console.log(`VRAM1 (ANIATION-2): ${vram1.length} 字节`);
console.log(`VRAM2 (SOMETIMES): ${vram2.length} 字节\n`);

// ============================================================
// 1. 总体差异
// ============================================================
let totalDiff = 0;
const diffByRegion = new Map();
const regions = [
  { name: 'Tile patterns 0x0000-0x7FFF', start: 0x0000, end: 0x8000 },
  { name: 'Empty 0x8000-0x9FFF', start: 0x8000, end: 0xA000 },
  { name: 'Plane A nametable 0xA000-0xAFFF', start: 0xA000, end: 0xB000 },
  { name: 'Tile patterns 0xB000-0xBFFF', start: 0xB000, end: 0xC000 },
  { name: 'Empty 0xC000-0xEFFF', start: 0xC000, end: 0xF000 },
  { name: 'Sprite table 0xF000-0xFFFF', start: 0xF000, end: 0x10000 },
];

console.log('--- 1. 各区域差异 ---');
for (const region of regions) {
  let diff = 0;
  for (let i = region.start; i < region.end; i++) {
    if (vram1[i] !== vram2[i]) diff++;
  }
  const pct = (diff / (region.end - region.start) * 100).toFixed(1);
  console.log(`  ${region.name}: ${diff} 字节不同 (${pct}%)`);
  diffByRegion.set(region.name, diff);
  totalDiff += diff;
}
console.log(`  总差异: ${totalDiff} 字节`);

// ============================================================
// 2. Plane A nametable 详细差异
// ============================================================
console.log('\n--- 2. Plane A nametable (0xA000) 差异详情 ---');
const PLANE_A_BASE = 0xA000;
let nametableDiffCount = 0;
const diffEntries = [];
for (let i = 0; i < 2048; i++) {
  const addr = PLANE_A_BASE + i * 2;
  const w1 = (vram1[addr + 1] << 8) | vram1[addr];
  const w2 = (vram2[addr + 1] << 8) | vram2[addr];
  if (w1 !== w2) {
    nametableDiffCount++;
    const x = i % 64;
    const y = Math.floor(i / 64);
    const tile1 = w1 & 0x07FF;
    const tile2 = w2 & 0x07FF;
    const pal1 = (w1 >> 13) & 0x03;
    const pal2 = (w2 >> 13) & 0x03;
    diffEntries.push({ x, y, tile1, tile2, pal1, pal2, w1, w2 });
  }
}
console.log(`  nametable 条目差异: ${nametableDiffCount}/2048`);
// 显示前 30 个差异
for (const d of diffEntries.slice(0, 30)) {
  console.log(`  (${d.x.toString().padStart(2)},${d.y.toString().padStart(2)}) tile: 0x${d.tile1.toString(16)} → 0x${d.tile2.toString(16)} | pal: ${d.pal1}→${d.pal2} | word: 0x${d.w1.toString(16)} → 0x${d.w2.toString(16)}`);
}

// ============================================================
// 3. nametable 差异分布
// ============================================================
console.log('\n--- 3. nametable 差异按行分布 ---');
const diffByRow = new Map();
for (const d of diffEntries) {
  diffByRow.set(d.y, (diffByRow.get(d.y) || 0) + 1);
}
const sortedRows = Array.from(diffByRow.entries()).sort((a, b) => a[0] - b[0]);
for (const [y, count] of sortedRows) {
  console.log(`  行 ${y.toString().padStart(2)}: ${count} 个差异`);
}

console.log('\n--- 4. nametable 差异按列分布 ---');
const diffByCol = new Map();
for (const d of diffEntries) {
  diffByCol.set(d.x, (diffByCol.get(d.x) || 0) + 1);
}
const sortedCols = Array.from(diffByCol.entries()).sort((a, b) => a[0] - b[0]);
// 只显示有差异的列
for (const [x, count] of sortedCols) {
  if (count > 0) {
    console.log(`  列 ${x.toString().padStart(2)}: ${count} 个差异`);
  }
}

// ============================================================
// 5. tile 数据差异 (0x0000-0x7FFF)
// ============================================================
console.log('\n--- 5. Tile pattern 差异 (0x0000-0x7FFF) ---');
const tileDiff = new Map();
for (let t = 0; t < 1024; t++) {
  const base = t * 32;
  let diff = false;
  for (let i = 0; i < 32; i++) {
    if (vram1[base + i] !== vram2[base + i]) {
      diff = true;
      break;
    }
  }
  if (diff) {
    let diffBytes = 0;
    for (let i = 0; i < 32; i++) {
      if (vram1[base + i] !== vram2[base + i]) diffBytes++;
    }
    tileDiff.set(t, diffBytes);
  }
}
console.log(`  tile 差异数: ${tileDiff.size}/1024`);
const tileDiffList = Array.from(tileDiff.entries()).sort((a, b) => a[0] - b[0]);
for (const [t, count] of tileDiffList.slice(0, 30)) {
  console.log(`  Tile ${t.toString().padStart(4)} (0x${t.toString(16).padStart(3, '0')}): ${count}/32 字节不同`);
}

// ============================================================
// 6. Sprite 表差异 (0xF000-0xFFFF)
// ============================================================
console.log('\n--- 6. Sprite 表差异 (0xF000-0xFFFF) ---');
const SPRITE_BASE = 0xF000;
const spriteDiff = [];
for (let i = 0; i < 80; i++) {
  // 每个 sprite 8 字节, 80 个 sprite 最大
  const base = SPRITE_BASE + i * 8;
  if (base + 8 > 0x10000) break;
  let diff = false;
  for (let j = 0; j < 8; j++) {
    if (vram1[base + j] !== vram2[base + j]) {
      diff = true;
      break;
    }
  }
  if (diff) {
    // 解析 sprite
    const y1 = vram1[base];
    const y2 = vram2[base];
    const link1 = vram1[base + 1];
    const link2 = vram2[base + 1];
    const tile1 = (vram1[base + 2] << 8) | vram1[base + 3];
    const tile2 = (vram2[base + 2] << 8) | vram2[base + 3];
    const x1 = (vram1[base + 6] << 8) | vram1[base + 7];
    const x2 = (vram2[base + 6] << 8) | vram2[base + 7];
    spriteDiff.push({ idx: i, y1, y2, link1, link2, tile1, tile2, x1, x2 });
  }
}
console.log(`  sprite 差异数: ${spriteDiff.length}`);
for (const s of spriteDiff.slice(0, 20)) {
  console.log(`  Sprite[${s.idx}] Y: ${s.y1}→${s.y2} | Tile: 0x${s.tile1.toString(16)}→0x${s.tile2.toString(16)} | X: ${s.x1}→${s.x2} | Link: ${s.link1}→${s.link2}`);
}

// ============================================================
// 7. 第一帧的 sprite 表内容
// ============================================================
console.log('\n--- 7. 第一帧 sprite 表内容 (前 20 个有效 sprite) ---');
let validCount = 0;
for (let i = 0; i < 80 && validCount < 20; i++) {
  const base = SPRITE_BASE + i * 8;
  if (base + 8 > 0x10000) break;
  const y = vram1[base];
  const link = vram1[base + 1];
  const tile = (vram1[base + 2] << 8) | vram1[base + 3];
  const x = (vram1[base + 6] << 8) | vram1[base + 7];
  // 跳过空 sprite (Y=0, tile=0)
  if (y === 0 && tile === 0 && x === 0) continue;
  console.log(`  [${i.toString().padStart(2)}] Y=${y.toString().padStart(3)} X=${x.toString().padStart(4)} Tile=0x${tile.toString(16).padStart(4, '0')} Link=${link}`);
  validCount++;
}

console.log('\n=== 完成 ===');
