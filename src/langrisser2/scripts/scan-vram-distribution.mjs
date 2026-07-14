/**
 * VRAM 数据分布扫描
 *
 * 问题: nametable little-endian读取得到 tile 256,257,258... 连续
 *      但 VRAM 0x2000 (tile 256) 处全零
 *
 * 目标: 找出VRAM中数据真实分布，确定tile数据和nametable的真实位置
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..', '..');
const VRAM_PATH = join(ROOT, 'src/langrisser2/20260713/Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');

const vram = new Uint8Array(readFileSync(VRAM_PATH));
console.log('VRAM size:', vram.length);

// ============================================================
// 1. 扫描非零32字节tile块（按32字节对齐）
// ============================================================
console.log('\n=== 1. 扫描非零32字节tile块 ===');
const tileBlocks = [];
for (let tileIdx = 0; tileIdx < 2048; tileIdx++) {
  const off = tileIdx * 32;
  let nonzero = 0;
  for (let i = 0; i < 32; i++) {
    if (vram[off + i] !== 0) nonzero++;
  }
  if (nonzero > 0) {
    tileBlocks.push({ tileIdx, off, nonzero });
  }
}
console.log(`非零tile块总数: ${tileBlocks.length} / 2048`);
console.log(`非零tile索引范围: ${tileBlocks[0]?.tileIdx} - ${tileBlocks[tileBlocks.length-1]?.tileIdx}`);

// 找连续区间
const ranges = [];
let rangeStart = tileBlocks[0]?.tileIdx;
let rangeEnd = rangeStart;
for (let i = 1; i < tileBlocks.length; i++) {
  if (tileBlocks[i].tileIdx === rangeEnd + 1) {
    rangeEnd = tileBlocks[i].tileIdx;
  } else {
    ranges.push([rangeStart, rangeEnd]);
    rangeStart = tileBlocks[i].tileIdx;
    rangeEnd = rangeStart;
  }
}
ranges.push([rangeStart, rangeEnd]);
console.log(`\n连续tile区间 (前20个):`);
ranges.slice(0, 20).forEach(([s, e]) => {
  console.log(`  tile ${s}-${e} (${e-s+1} tiles, VRAM 0x${(s*32).toString(16)}-0x${((e+1)*32-1).toString(16)})`);
});
console.log(`总区间数: ${ranges.length}`);

// ============================================================
// 2. 找最大的连续tile块（很可能是主要图像数据）
// ============================================================
console.log('\n=== 2. 最大的连续tile块 ===');
const sortedRanges = ranges.map(([s, e]) => ({ start: s, end: e, count: e-s+1 }))
                            .sort((a, b) => b.count - a.count);
sortedRanges.slice(0, 10).forEach(r => {
  console.log(`  tile ${r.start}-${r.end} (${r.count} tiles, VRAM 0x${(r.start*32).toString(16)}-0x${((r.end+1)*32-1).toString(16)})`);
});

// ============================================================
// 3. 检查 tile 256 区域和它附近
// ============================================================
console.log('\n=== 3. tile 256 附近数据 (VRAM 0x1800-0x2800) ===');
let lastNonzeroTile = -1;
for (let t = 200; t < 320; t++) {
  const off = t * 32;
  let nz = 0;
  for (let i = 0; i < 32; i++) if (vram[off+i] !== 0) nz++;
  if (nz > 0) {
    if (lastNonzeroTile !== t - 1) console.log('  ---');
    console.log(`  tile ${t} (0x${off.toString(16)}): ${nz}/32 nonzero, first: ${vram[off].toString(16)} ${vram[off+1].toString(16)} ${vram[off+2].toString(16)} ${vram[off+3].toString(16)}`);
    lastNonzeroTile = t;
  }
}

// ============================================================
// 4. 检查 nametable 区域 0xC000 的 little-endian 读取
// ============================================================
console.log('\n=== 4. nametable @ 0xC000 (little-endian) 前30个非零条目 ===');
let count = 0;
for (let ty = 0; ty < 32 && count < 30; ty++) {
  for (let tx = 0; tx < 64 && count < 30; tx++) {
    const addr = 0xC000 + (ty * 64 + tx) * 2;
    const hi = vram[addr];
    const lo = vram[addr + 1];
    if (hi === 0 && lo === 0) continue;
    
    // big-endian
    const wordBE = (hi << 8) | lo;
    const tileBE = wordBE & 0x7FF;
    const palBE = (wordBE >> 13) & 3;
    
    // little-endian
    const wordLE = (lo << 8) | hi;
    const tileLE = wordLE & 0x7FF;
    const palLE = (wordLE >> 13) & 3;
    const prioLE = (wordLE >> 15) & 1;
    
    // 检查tile数据是否存在
    const tileBEExists = tileBlocks.some(b => b.tileIdx === tileBE);
    const tileLEExists = tileBlocks.some(b => b.tileIdx === tileLE);
    
    console.log(`  [tx=${tx},ty=${ty}] addr=0x${addr.toString(16)} bytes=[${hi.toString(16).padStart(2,'0')},${lo.toString(16).padStart(2,'0')}]`);
    console.log(`    BE: word=0x${wordBE.toString(16).padStart(4,'0')} tile=${tileBE} pal=${palBE} ${tileBEExists?'✓':'✗'}`);
    console.log(`    LE: word=0x${wordLE.toString(16).padStart(4,'0')} tile=${tileLE} pal=${palLE} prio=${prioLE} ${tileLEExists?'✓':'✗'}`);
    count++;
  }
}

// ============================================================
// 5. 检查整个VRAM中可能的其他nametable位置
// ============================================================
console.log('\n=== 5. 搜索其他可能的nametable位置 ===');
// nametable特征: 64x32 entries = 4096 bytes = 0x1000
// 找出哪些0x1000大小的块有大量非零数据
console.log('每0x1000字节的非零率:');
for (let base = 0; base < 0x10000; base += 0x1000) {
  let nz = 0;
  for (let i = 0; i < 0x1000; i++) {
    if (vram[base + i] !== 0) nz++;
  }
  const pct = (nz / 0x1000 * 100).toFixed(1);
  if (nz > 0) console.log(`  0x${base.toString(16).padStart(4,'0')}-0x${(base+0xFFF).toString(16).padStart(4,'0')}: ${nz}/4096 (${pct}%)`);
}

// ============================================================
// 6. 关键测试: 如果tile数据是按word-swap存储的
// ============================================================
console.log('\n=== 6. 测试 VRAM word-swap 假设 ===');
// 如果VRAM dump是按word存储但字节序反了，那读取时要swap每2字节
// 测试: tile 256 @ dump 0x2000 全零，swap后还是全零
// 但 tile 257 @ dump 0x2020 呢?
for (let t = 256; t < 270; t++) {
  const off = t * 32;
  let nzOrig = 0, nzSwap = 0;
  for (let i = 0; i < 32; i++) {
    if (vram[off + i] !== 0) nzOrig++;
  }
  // swap version
  for (let i = 0; i < 32; i += 2) {
    if (vram[off + i + 1] !== 0 || vram[off + i] !== 0) nzSwap++;
  }
  if (nzOrig > 0 || nzSwap > 0) {
    console.log(`  tile ${t} (0x${off.toString(16)}): orig=${nzOrig}/32 swap_pairs=${nzSwap}/16`);
  }
}
