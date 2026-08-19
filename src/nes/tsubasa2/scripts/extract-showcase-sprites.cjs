/**
 * 提取 Bank31 $E93D 演出精灵表数据 → showcase-sprites-data.json
 *
 * 输入: src/game/data/prg-bank-31.ts (CPU $E000-$FFFF 窗口)
 * 输出: tmp-showcase-sprites.json (调试用)
 *
 * $E9DA 表 = 18 个 16bit LE 指针, 每个指向演出精灵数据块:
 *   [x_lo, x_hi, attr, tiles...]
 *   attr: bit0-1 = 行数, bit2-7 = 每行精灵数
 *   tiles: 每行以 $FE 终止; 不足行数补 0
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'src', 'game', 'data', 'prg-bank-31.ts');
const OUT = path.join(ROOT, 'tmp-showcase-sprites.json');

const text = fs.readFileSync(SRC, 'utf8');
const m = text.match(/=\s*\[([\s\S]*)\]/);
if (!m) { console.error('未找到数组'); process.exit(1); }
const nums = m[1].match(/0x[0-9A-Fa-f]+|\b\d+\b/g).map(s => Number(s));
if (nums.length < 0x2000) { console.error('数组过短: ' + nums.length); process.exit(1); }

const b = (addr) => nums[addr - 0xE000] ?? 0;
const u16 = (addr) => b(addr) | (b(addr + 1) << 8);

// ── $E9DA 指针表 (18 项) ──
const ptrs = [];
for (let i = 0; i < 18; i++) ptrs.push(u16(0xE9DA + i * 2));
console.log('$E9DA 指针表:', ptrs.map(p => '$' + p.toString(16).toUpperCase()));

// ── 每个数据块 ──
function decodeBlock(p) {
  const xLo = b(p), xHi = b(p + 1);
  const attr = b(p + 2);
  const rows = attr & 0x03;
  const perRow = attr >> 2;
  let off = p + 3;
  const tiles = [];
  for (let r = 0; r < rows; r++) {
    const row = [];
    while (row.length < perRow) {
      const t = b(off++);
      if (t === 0xfe) break;      // 行终止
      if (t === 0x00 && row.length === 0) { off--; break; } // 空行
      row.push(t);
    }
    tiles.push(row);
  }
  return { addr: '$' + p.toString(16).toUpperCase(), xLo, xHi, rows, perRow, tiles };
}

const blocks = ptrs.map(decodeBlock);
const result = { ptrs, blocks };
fs.writeFileSync(OUT, JSON.stringify(result, null, 1), 'utf8');
console.log('写入', OUT);
for (const blk of blocks) {
  console.log(`  ${blk.addr}: xLo=${blk.xLo.toString(16)} xHi=${blk.xHi.toString(16)} rows=${blk.rows} perRow=${blk.perRow} tiles=${JSON.stringify(blk.tiles)}`);
}
