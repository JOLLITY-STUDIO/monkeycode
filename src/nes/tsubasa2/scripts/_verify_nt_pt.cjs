/**
 * 验证第一个画面的 NT 和 PT 数据正确性
 * 对照 asm 原始数据与 TS 数据表
 */
const fs = require('fs');
const path = require('path');

const asmRoot = 'd:\\studio\\github\\monkeycode\\src\\nes\\tsubasa2\\src\\asm';

function extractBytes(filePath) {
  if (!fs.existsSync(filePath)) return [];
  const content = fs.readFileSync(filePath, 'utf8');
  const bytes = [];
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed.startsWith('.byte')) continue;
    const matches = trimmed.match(/\$([0-9A-Fa-f]{2})/g);
    if (matches) for (const m of matches) bytes.push(parseInt(m.slice(1), 16));
  }
  return bytes;
}

// 1. bank06 场景表 $BF00（场景 0 的 19 字节）
const b06tables = extractBytes(path.join(asmRoot, 'bank06', 'data_tables.s'));
console.log('bank06 data_tables total:', b06tables.length, 'bytes');

// 场景表从 $BF00 开始，bank06 .org $8000，所以偏移 = $BF00-$8000 = $3F00
// 但 data_tables.s 可能不是从 $8000 开始，需要查找
// 先打印前 100 字节看结构
console.log('bank06 data_tables first 100:', b06tables.slice(0, 100).map(b => b.toString(16).padStart(2,'0')).join(' '));

// 2. bank08 pattern 表 $A000+tile*17
const b08tables = extractBytes(path.join(asmRoot, 'bank08', 'data_tables.s'));
console.log('\nbank08 data_tables total:', b08tables.length, 'bytes');
console.log('bank08 first 50:', b08tables.slice(0, 50).map(b => b.toString(16).padStart(2,'0')).join(' '));

// 3. bank02 code_data.s（场景 3 tile 索引可能在这里）
const b02data = extractBytes(path.join(asmRoot, 'bank02', 'code_data.s'));
console.log('\nbank02 code_data total:', b02data.length, 'bytes');
console.log('bank02 code_data first 50:', b02data.slice(0, 50).map(b => b.toString(16).padStart(2,'0')).join(' '));

// 4. bank02 code_sub.s（$84C1 场景 0 逻辑）
const b02sub = fs.readFileSync(path.join(asmRoot, 'bank02', 'code_sub.s'), 'utf8');
const lines = b02sub.split(/\r?\n/);
console.log('\n=== bank02 code_sub.s 场景 0 相关 ($84C1-$8559) ===');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].match(/\$84[C-F]/) || lines[i].match(/\$85[0-5]/)) {
    console.log((i+1) + ': ' + lines[i].trim());
  }
}

// 5. bank00 $9EA2 渐显表
const b00sub = extractBytes(path.join(asmRoot, 'bank00', 'code_sub.s'));
console.log('\nbank00 code_sub total:', b00sub.length, 'bytes');
// $9EA2 在 code_sub.s 中的位置需要查找
console.log('bank00 code_sub first 20:', b00sub.slice(0, 20).map(b => b.toString(16).padStart(2,'0')).join(' '));
