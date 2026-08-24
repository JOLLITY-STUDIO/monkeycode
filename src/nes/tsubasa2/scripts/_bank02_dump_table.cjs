// 扫描 bank02 $8A20-? 全部 .byte 数据并按段分隔
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'src', 'asm', 'bank02');

// 重建与 _extract_bank02.cjs 同样的逻辑：从 _full.s 的注释 + .byte 重建字节流
const src = fs.readFileSync(path.join(dir, '_full.s'), 'utf8');
const ls = src.split(/\r?\n/);

const bytes = new Map();
let pendingAddr = null;
let lastMatchedAddr = null;

for (let i = 0; i < ls.length; i++) {
  const line = ls[i].trim();
  // 注释地址行
  const am = line.match(/^;\s*\$([0-9A-F]{4})$/i);
  if (am) {
    pendingAddr = parseInt(am[1], 16);
    lastMatchedAddr = pendingAddr;
    continue;
  }
  // .byte 行
  const bm = line.match(/^\.byte\s+(.+?)(?:;\s*\$[0-9A-F]{4})?$/i);
  if (bm && pendingAddr != null) {
    const vals = bm[1].split(',').map((s) => parseInt(s.trim().replace('$', ''), 16));
    for (const v of vals) {
      bytes.set(pendingAddr, v & 0xff);
      pendingAddr++;
    }
    pendingAddr = null;
  }
}

// dump 区间 $8A20-$8AFF 全部byte
const sections = [
  [0x8a20, 0x8a2f, 'START_8A20_direction_inline?'],
  [0x8a30, 0x8a5f, 'POSSIBLE_TABLE_AREA'],
  [0x8a60, 0x8a8f, 'POSSIBLE_TABLE_AREA'],
  [0x8a90, 0x8abf, 'POSSIBLE_TABLE_AREA'],
  [0x8ac0, 0x8aff, 'POSSIBLE_TABLE_AREA'],
];

for (const [start, end, label] of sections) {
  console.log('=== ' + label + ' $' + start.toString(16).toUpperCase() + '-$' + end.toString(16).toUpperCase() + ' ===');
  for (let a = start; a <= end; a++) {
    const b = bytes.get(a);
    if (b !== undefined) process.stdout.write(((b < 0x10 ? '0' : '') + b.toString(16).toUpperCase()) + ' ');
    else process.stdout.write('.. ');
    if ((a - start + 1) % 16 === 0) process.stdout.write('\n');
  }
  process.stdout.write('\n\n');
}

// 列出所有 bank02 "数据" 区（从 $8A20 起）
console.log('--- lastAddr with byte data: 0x' + Math.max(...bytes.keys()).toString(16));
console.log('--- lastAddr lower bound 0x8a20: count=' + [...bytes.keys()].filter(a => a >= 0x8a20 && a <= 0xbfff).length);
