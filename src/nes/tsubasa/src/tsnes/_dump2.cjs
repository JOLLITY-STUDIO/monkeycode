// 详细 dump 关键区域
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

const ROM_DIR = path.join(__dirname, 'rom-data');
const b12 = extractArray(path.join(ROM_DIR, 'prg-bank-12.ts'));
const b13 = extractArray(path.join(ROM_DIR, 'prg-bank-13.ts'));
const b14 = extractArray(path.join(ROM_DIR, 'prg-bank-14.ts'));
const b15 = extractArray(path.join(ROM_DIR, 'prg-bank-15.ts'));

const hex2 = n => '0x' + n.toString(16).toUpperCase().padStart(2, '0');

// bank 12 固定窗口 $8000-$9FFF，可切换 $A000-$BFFF 默认 bank12 视作 b12（但 SID 语义下用对应 bank）
function dumpBank12(start, len, label) {
  console.log(`\n=== bank12 ${label} 0x${start.toString(16)}-0x${(start + len - 1).toString(16)} ===`);
  let line = '';
  for (let i = 0; i < len; i++) {
    const v = b12[start + i];
    line += hex2(v) + ' ';
    if ((i + 1) % 16 === 0) { console.log(`0x${(start + i - 15).toString(16).toUpperCase().padStart(4, '0')}: ${line}`); line = ''; }
  }
  if (line) console.log(`0x${(start + len - (len % 16 || 16)).toString(16).toUpperCase().padStart(4, '0')}: ${line}`);
}

// dump bank13 的 $8000-$9FFF 段（真实 bank13 数据，注意：NES 上 $8000-$9FFF 固定 bank12！
// 所以 SID 的 track 在 $8000-$9FFF 是 bank12 的数据，这里 dump 的是 bank13 的字节数组）
function dumpB13(start, len, label) {
  console.log(`\n=== bank13[0x${start.toString(16)}] ${label} ===`);
  let line = '';
  for (let i = 0; i < len; i++) {
    const v = b13[start + i];
    line += hex2(v) + ' ';
    if ((i + 1) % 16 === 0) { console.log(`0x${(start + i - 15).toString(16).toUpperCase().padStart(4, '0')}: ${line}`); line = ''; }
  }
  if (line) console.log(line);
}

// 0x30 空洞区域（bank12）
dumpBank12(0x0E20, 0xC0, '0x8E20-0x8EDF');

// 0x35 区域：initPtr 0x8FAD 在 bank12（固定窗口）
dumpBank12(0x0F80, 0x60, '0x8F80-0x8FDF');

// 0x8E94 跳转目标（bank12）
dumpBank12(0x0E80, 0x40, '0x8E80-0x8EBF');
