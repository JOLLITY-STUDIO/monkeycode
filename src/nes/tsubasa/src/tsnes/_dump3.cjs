// dump bank12 引擎代码 0x320-0x3D0 和 0x35 数据解读
const fs = require('fs');
const path = require('path');

function extractArray(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const match = content.match(/=\s*\[([\s\S]*?)\];/);
  if (!match) return [];
  const hexPattern = /0x([0-9A-Fa-f]{2})/g;
  const vals = [];
  let m;
  while ((m = hexPattern.exec(match[1])) !== null) vals.push(parseInt(m[1], 16));
  return vals;
}

const b12 = extractArray(path.join(__dirname, 'rom-data', 'prg-bank-12.ts'));
const b13 = extractArray(path.join(__dirname, 'rom-data', 'prg-bank-13.ts'));

const hex2 = n => '0x' + n.toString(16).toUpperCase().padStart(2, '0');
const hex4 = n => '0x' + n.toString(16).toUpperCase().padStart(4, '0');

function dump(arr, start, len, label) {
  console.log(`\n=== ${label} 0x${start.toString(16).toUpperCase()}-0x${(start + len - 1).toString(16).toUpperCase()} ===`);
  let line = '';
  for (let i = 0; i < len; i++) {
    line += hex2(arr[start + i]) + ' ';
    if ((i + 1) % 16 === 0) { console.log(hex4(start + i - 15) + ': ' + line); line = ''; }
  }
  if (line) console.log(hex4(start + len - (len % 16 || 16)) + ': ' + line);
}

// $8349 引擎 init 代码（bank12 array offset 0x349）
dump(b12, 0x340, 0x60, 'bank12 $8340-$839F');
dump(b12, 0x3A0, 0x40, 'bank12 $83A0-$83DF');

// 0x35: initPtr 0x8FAD 在 bank12（$8000-$9FFF 固定窗口）
// 前面 dump 已见。重新精确 dump 0x8FAD-0x8FC6
dump(b12, 0xFAD, 0x1A, 'bank12 $8FAD-$8FC6 (SID 0x35 init+track)');

// 0x8E94 跳转目标
dump(b12, 0xE8C, 0x10, 'bank12 $8E8C-$8E9B (0x35 跳转目标)');

// bank13 内 0x35 的真实数据？0x35 是 bank13 的 SID，但 track 都在 $8000-$9FFF (bank12)。
// 检查 bank13 0xFAD 区域是否也有类似数据
dump(b13, 0xF80, 0x40, 'bank13 $8F80-$8FBF');
