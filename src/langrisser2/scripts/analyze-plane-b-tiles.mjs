import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createCanvas } from 'canvas';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..', '..');
const DATA_DIR = join(ROOT, 'src/langrisser2/20260713');

const VRAM_PATH = join(DATA_DIR, 'Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');
const vram = new Uint8Array(readFileSync(VRAM_PATH));

const PLANE_A_BASE = 0xC000;
const PLANE_B_BASE = 0xE000;
const COLS = 40;
const ROWS = 28;

function readNametableEntry(base, tx, ty) {
  const addr = base + (ty * 64 + tx) * 2;
  const lo = vram[addr];
  const hi = vram[addr + 1];
  const word = (hi << 8) | lo;
  return {
    priority: (word >> 15) & 1,
    palette: (word >> 13) & 3,
    hflip: (word >> 12) & 1,
    vflip: (word >> 11) & 1,
    tileIdx: word & 0x7FF,
    word
  };
}

// 收集 Plane B 使用的所有 tile 索引
const planeBTiles = new Set();
const planeAEntries = [];
const planeBEntries = [];

for (let ty = 0; ty < ROWS; ty++) {
  for (let tx = 0; tx < COLS; tx++) {
    const a = readNametableEntry(PLANE_A_BASE, tx, ty);
    const b = readNametableEntry(PLANE_B_BASE, tx, ty);
    if (a.word !== 0) planeAEntries.push({ tx, ty, ...a });
    if (b.word !== 0) {
      planeBEntries.push({ tx, ty, ...b });
      planeBTiles.add(b.tileIdx);
    }
  }
}

console.log(`Plane A 条目: ${planeAEntries.length}`);
console.log(`Plane B 条目: ${planeBEntries.length}`);
console.log(`Plane B 使用不同 tile 数: ${planeBTiles.size}`);

// 分析 Plane B 在屏幕上的位置分布
console.log('\n=== Plane B 屏幕位置分布 ===');
const screenMap = new Array(ROWS * COLS).fill(0);
for (const e of planeBEntries) {
  screenMap[e.ty * COLS + e.tx] = e.tileIdx;
}

// 输出 ASCII art (每8个字符一组)
console.log('Plane B nametable (tile idx, 0=空):');
for (let ty = 0; ty < ROWS; ty++) {
  let line = '';
  for (let tx = 0; tx < COLS; tx++) {
    const t = screenMap[ty * COLS + tx];
    if (t === 0) line += '....';
    else if (t < 500) line += 'B';
    else line += 'X';
  }
  console.log(`Y${ty.toString().padStart(2,'0')}: ${line}`);
}

// 检查 Plane B 使用的几个 tile 的实际像素
console.log('\n=== Plane B tile 像素分析 ===');

function decodeTileRowMajor(tileIdx) {
  const offset = tileIdx * 32;
  const pixels = new Uint8Array(64);
  for (let y = 0; y < 8; y++) {
    const rowOffset = offset + y * 4;
    const p0 = vram[rowOffset], p1 = vram[rowOffset + 1];
    const p2 = vram[rowOffset + 2], p3 = vram[rowOffset + 3];
    for (let x = 0; x < 8; x++) {
      const bit = 7 - x;
      pixels[y * 8 + x] = ((p0 >> bit) & 1) | (((p1 >> bit) & 1) << 1) | (((p2 >> bit) & 1) << 2) | (((p3 >> bit) & 1) << 3);
    }
  }
  return pixels;
}

function decodeTilePlaneMajor(tileIdx) {
  const offset = tileIdx * 32;
  const pixels = new Uint8Array(64);
  for (let y = 0; y < 8; y++) {
    const p0 = vram[offset + y];
    const p1 = vram[offset + y + 8];
    const p2 = vram[offset + y + 16];
    const p3 = vram[offset + y + 24];
    for (let x = 0; x < 8; x++) {
      const bit = 7 - x;
      pixels[y * 8 + x] = ((p0 >> bit) & 1) | (((p1 >> bit) & 1) << 1) | (((p2 >> bit) & 1) << 2) | (((p3 >> bit) & 1) << 3);
    }
  }
  return pixels;
}

// 取几个有代表性的 Plane B tile
const sampleTiles = [472, 480, 500, 600, 668];
for (const t of sampleTiles) {
  console.log(`\n--- Tile ${t} (VRAM 0x${(t*32).toString(16)}) ---`);
  const offset = t * 32;
  console.log(`原始字节 (前32): ${Array.from(vram.slice(offset, offset + 32)).map(b => b.toString(16).padStart(2,'0')).join(' ')}`);

  const rm = decodeTileRowMajor(t);
  const pm = decodeTilePlaneMajor(t);

  // 统计非零像素
  let rmNonZero = 0, pmNonZero = 0;
  for (let i = 0; i < 64; i++) {
    if (rm[i] !== 0) rmNonZero++;
    if (pm[i] !== 0) pmNonZero++;
  }
  console.log(`行主序: ${rmNonZero}/64 非零像素`);
  console.log(`平面主序: ${pmNonZero}/64 非零像素`);

  // ASCII 显示
  console.log('行主序:');
  for (let y = 0; y < 8; y++) {
    let line = '';
    for (let x = 0; x < 8; x++) {
      const v = rm[y * 8 + x];
      line += v === 0 ? '.' : v.toString(16);
    }
    console.log(`  ${line}`);
  }
  console.log('平面主序:');
  for (let y = 0; y < 8; y++) {
    let line = '';
    for (let x = 0; x < 8; x++) {
      const v = pm[y * 8 + x];
      line += v === 0 ? '.' : v.toString(16);
    }
    console.log(`  ${line}`);
  }
}

// 重要：检查 Plane A 用的 tile 0-442 是否有些是 Plane B 也用的
const planeATiles = new Set();
for (const e of planeAEntries) planeATiles.add(e.tileIdx);
console.log(`\n=== Plane A/B tile 重叠 ===`);
console.log(`Plane A tiles: ${planeATiles.size} 个不同`);
console.log(`Plane B tiles: ${planeBTiles.size} 个不同`);
let overlap = 0;
for (const t of planeBTiles) if (planeATiles.has(t)) overlap++;
console.log(`重叠: ${overlap} 个`);

// 检查 Plane B nametable 是否可能是 sprite 或其他类型的数据
// 因为 Plane B 的 tile 索引 472-668 在 VRAM 中可能不是真正的 tile 数据
console.log('\n=== 检查 Plane B tile 472-668 是否是有效 tile 数据 ===');
// tile 472-668 对应 VRAM 0x3B00-0x5380
// 这个区域应该有 (668-472+1) * 32 = 6304 字节的 tile 数据
let nonZeroInTileBRegion = 0;
for (let i = 472 * 32; i < 669 * 32; i++) {
  if (vram[i] !== 0) nonZeroInTileBRegion++;
}
console.log(`VRAM 0x${(472*32).toString(16)}-0x${(669*32).toString(16)} (Plane B tiles): ${nonZeroInTileBRegion} 非零字节 (共 ${(669-472)*32})`);

// 检查 dump 中是否有更高地址的 tile 数据 (比如 0x9E00 开始的大块)
console.log(`\n=== 检查 0x9E00-0xB500 大块数据 (5888字节, ${5888/32} tiles) ===`);
console.log(`对应 tile 索引: 0x9E00/32 = ${0x9E00/32} - 0xB500/32 = ${0xB500/32}`);
// 这块数据是 tile 800-1456

// 检查 Plane B 的 nametable 内容是否其实指向这个区域
// 但 Plane B 的 tile 索引是 472-668，VRAM 地址是 0x3B00-0x5380
// 可能 nametable 条目读取有误？

// 重新检查 Plane B 的 nametable 读取方式
console.log('\n=== 检查 Plane B nametable 读取的另一种可能性 ===');
// 假设 Plane B 的 nametable 起始地址不是 0xE000
// 让我们检查附近的地址
for (const testAddr of [0xD800, 0xDC00, 0xDE000, 0xE000, 0xE200, 0xE400, 0xE800, 0xEA00, 0xEC00, 0xEE00, 0xF000]) {
  let cnt = 0;
  let palStats = [0,0,0,0];
  for (let ty = 0; ty < ROWS; ty++) {
    for (let tx = 0; tx < COLS; tx++) {
      const addr = testAddr + (ty * 64 + tx) * 2;
      if (addr + 1 >= vram.length) break;
      const lo = vram[addr], hi = vram[addr + 1];
      const word = (hi << 8) | lo;
      if (word === 0) continue;
      cnt++;
      palStats[(word >> 13) & 3]++;
    }
  }
  console.log(`0x${testAddr.toString(16)}: ${cnt} 非空, pal=${palStats.join(',')}`);
}
