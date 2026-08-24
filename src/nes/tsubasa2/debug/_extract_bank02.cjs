// 从 bank02/_full.s 重建 bank02 字节流（按地址注释），提取场景15/16 数据表
const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, '..', 'src', 'asm', 'bank02', '_full.s'), 'utf8');
const lines = src.split(/\r?\n/);

const bytes = new Map(); // addr → byte
let pendingAddr = null;

// 只处理 .byte 行（数据区），代码区跳过（opcode 无法从助记符重建）
for (const raw of lines) {
  const line = raw.trim();
  // 注释行: ; $ABCD
  const am = line.match(/^;\s*\$([0-9A-F]{4})$/i);
  if (am) {
    pendingAddr = parseInt(am[1], 16);
    continue;
  }
  // .byte 行（可能带行尾注释）
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

function dump(start, end, label) {
  console.log('=== ' + label + ' $' + start.toString(16).toUpperCase() + '-$' + end.toString(16).toUpperCase() + ' ===');
  let row = '';
  let rowAddr = start;
  for (let a = start; a <= end; a++) {
    const b = bytes.get(a);
    if (b === undefined) { row += '?? '; } else { row += b.toString(16).toUpperCase().padStart(2, '0') + ' '; }
    if ((a - start + 1) % 16 === 0) { console.log('$' + rowAddr.toString(16).toUpperCase() + ': ' + row); row = ''; rowAddr = a + 1; }
  }
  if (row) console.log('$' + rowAddr.toString(16).toUpperCase() + ': ' + row);
  console.log('');
}

dump(0x8a97, 0x8aff, 'SCENE15 AA97 TABLE');
