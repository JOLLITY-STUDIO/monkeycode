/**
 * 分析文字区域 nametable 条目
 * 用户反馈: logo轮廓可见，但下方按钮/copyright文字看不清
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..', '..');
const VRAM_PATH = join(ROOT, 'src/langrisser2/20260713/Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');
const vram = new Uint8Array(readFileSync(VRAM_PATH));

console.log('=== 文字区域 nametable 扫描 (ty=16-27) ===\n');

// 统计每个ty行的非零条目数
for (let ty = 0; ty < 28; ty++) {
  let nonzero = 0;
  let tiles = new Set();
  let palettes = new Set();
  for (let tx = 0; tx < 40; tx++) {
    const addr = 0xC000 + (ty * 64 + tx) * 2;
    const lo = vram[addr];
    const hi = vram[addr + 1];
    if (lo === 0 && hi === 0) continue;
    const word = (hi << 8) | lo;
    nonzero++;
    tiles.add(word & 0x7FF);
    palettes.add((word >> 13) & 3);
  }
  if (nonzero > 0) {
    console.log(`ty=${ty}: ${nonzero}个非零条目, ${tiles.size}个不同tile, 调色板=[${[...palettes].join(',')}]`);
    if (nonzero > 0 && nonzero < 30) {
      // 打印每个条目
      for (let tx = 0; tx < 40; tx++) {
        const addr = 0xC000 + (ty * 64 + tx) * 2;
        const lo = vram[addr];
        const hi = vram[addr + 1];
        if (lo === 0 && hi === 0) continue;
        const word = (hi << 8) | lo;
        const tile = word & 0x7FF;
        const pal = (word >> 13) & 3;
        const hflip = (word >> 12) & 1;
        const vflip = (word >> 11) & 1;
        const prio = (word >> 15) & 1;
        console.log(`  tx=${tx}: tile=${tile} pal=${pal} h=${hflip} v=${vflip} p=${prio}`);
      }
    }
  }
}

// ============================================================
// 重点检查: 找到所有不同的调色板使用情况
// ============================================================
console.log('\n=== 各调色板使用统计 ===');
const palStats = {};
for (let ty = 0; ty < 28; ty++) {
  for (let tx = 0; tx < 40; tx++) {
    const addr = 0xC000 + (ty * 64 + tx) * 2;
    const lo = vram[addr];
    const hi = vram[addr + 1];
    if (lo === 0 && hi === 0) continue;
    const word = (hi << 8) | lo;
    const pal = (word >> 13) & 3;
    const tile = word & 0x7FF;
    if (!palStats[pal]) palStats[pal] = { count: 0, tiles: new Set(), tyRange: [27, 0] };
    palStats[pal].count++;
    palStats[pal].tiles.add(tile);
    if (ty < palStats[pal].tyRange[0]) palStats[pal].tyRange[0] = ty;
    if (ty > palStats[pal].tyRange[1]) palStats[pal].tyRange[1] = ty;
  }
}

for (const [pal, s] of Object.entries(palStats)) {
  console.log(`调色板 ${pal}: ${s.count}条目, ${s.tiles.size}个不同tile, ty范围=${s.tyRange[0]}-${s.tyRange[1]}`);
  console.log(`  tile索引: ${[...s.tiles].sort((a,b)=>a-b).slice(0,20).join(', ')}${s.tiles.size > 20 ? '...' : ''}`);
}

// ============================================================
// 检查: 是否有 tile 索引 >= 512 的 (可能在不同的VRAM区域)
// ============================================================
console.log('\n=== tile 索引分布 ===');
const tileDist = { '0-127': 0, '128-255': 0, '256-383': 0, '384-511': 0, '512-767': 0, '768-1023': 0, '1024-2047': 0 };
for (let ty = 0; ty < 28; ty++) {
  for (let tx = 0; tx < 40; tx++) {
    const addr = 0xC000 + (ty * 64 + tx) * 2;
    const lo = vram[addr];
    const hi = vram[addr + 1];
    if (lo === 0 && hi === 0) continue;
    const word = (hi << 8) | lo;
    const tile = word & 0x7FF;
    if (tile < 128) tileDist['0-127']++;
    else if (tile < 256) tileDist['128-255']++;
    else if (tile < 384) tileDist['256-383']++;
    else if (tile < 512) tileDist['384-511']++;
    else if (tile < 768) tileDist['512-767']++;
    else if (tile < 1024) tileDist['768-1023']++;
    else tileDist['1024-2047']++;
  }
}
for (const [range, count] of Object.entries(tileDist)) {
  console.log(`  ${range}: ${count}个条目`);
}

// ============================================================
// 检查: 每个调色板的前几个颜色
// ============================================================
console.log('\n=== 各调色板颜色 (CRAM little-endian) ===');
const CRAM_PATH = join(ROOT, 'src/langrisser2/20260713/Langrisser II (Japan)_CRAM-TITILE-SCEEN.ram');
const cram = new Uint8Array(readFileSync(CRAM_PATH));

for (let pal = 0; pal < 4; pal++) {
  console.log(`调色板 ${pal}:`);
  for (let i = 0; i < 16; i++) {
    const idx = pal * 16 + i;
    const word = (cram[idx * 2 + 1] << 8) | cram[idx * 2];
    const r = (word & 7) * 36;
    const g = ((word >> 3) & 7) * 36;
    const b = ((word >> 6) & 7) * 36;
    const hex = '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
    console.log(`  [${i.toString(16)}] rgb(${r},${g},${b}) ${hex} word=0x${word.toString(16).padStart(4, '0')}`);
  }
}
