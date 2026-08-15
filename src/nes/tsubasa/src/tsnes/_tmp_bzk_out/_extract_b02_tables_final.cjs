// 从 prg-bank-02.ts 提取所有 bank02 数据表（精确字节）
const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'rom-data', 'prg-bank-02.ts');
const text = fs.readFileSync(file, 'utf8');

// 解析数组（去掉 const 声明与结尾分号）
const m = text.match(/=\s*\[([\s\S]*?)\];/);
if (!m) { console.error('PARSE FAIL'); process.exit(1); }
const nums = m[1].split(',').map(s => parseInt(s.trim(), 16));
console.log('array length =', nums.length, '(expected 8192)');

// 数组索引 = cpuAddr - 0xA000
function slice(cpuAddr, len, name) {
  const off = cpuAddr - 0xA000;
  const data = nums.slice(off, off + len);
  const hex = data.map(v => '0x' + v.toString(16).padStart(2, '0')).join(', ');
  console.log(`\n===== ${name} ($${cpuAddr.toString(16)}, ${len}B) =====`);
  console.log(hex);
  // 同时输出分组便于阅读
  for (let i = 0; i < data.length; i += 8) {
    const chunk = data.slice(i, i + 8).map(v => v.toString(16).padStart(2, '0')).join(' ');
    console.log(`  +${i.toString(16).padStart(3,'0')}: ${chunk}`);
  }
}

slice(0xAADF, 64, 'AADF-scroll');
slice(0xAB1F, 16, 'AB1F-password');
slice(0xAA47, 46, 'AA47-fieldtiles');
slice(0xAA75, 26, 'AA75-fieldclass');
slice(0xAA97, 72, 'AA97-ppubuf-table');
slice(0xA773, 8, 'A773-misc');
