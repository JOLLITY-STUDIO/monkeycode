// 分析 bank 12 对 bank 31 的引用 (直接读 hex 文件)
const fs = require('fs');
const path = require('path');

// 读取 bank 12 的 .ts 文件，提取数组
const file = fs.readFileSync(path.join(__dirname, 'mini-audio/rom-data/prg-bank-12.ts'), 'utf-8');
// 提取数组内容
const match = file.match(/=\s*\[([\s\S]*?)\];/);
if (!match) { console.log('No array found'); process.exit(1); }
const arr = match[1].split(',').map(s => parseInt(s.trim(), 16)).filter(x => !isNaN(x));

console.log('Bank12 $8000 first 64 bytes:');
console.log(arr.slice(0, 64).map(x => x.toString(16).padStart(2, '0')).join(' '));

// 搜索 Bank 12 中对 Bank 31 的引用
let refs = [];
for (let i = 0; i < arr.length; i++) {
  const b = arr[i];
  if (b === 0x20 && i + 2 < arr.length) { // JSR
    const addr = arr[i + 1] | (arr[i + 2] << 8);
    if (addr >= 0xE000 && addr <= 0xFFEF) refs.push({ off: i, type: 'JSR', addr });
  }
  if (b === 0x4C && i + 2 < arr.length) { // JMP
    const addr = arr[i + 1] | (arr[i + 2] << 8);
    if (addr >= 0xE000 && addr <= 0xFFEF) refs.push({ off: i, type: 'JMP', addr });
  }
  if (b === 0xAD && i + 2 < arr.length) { // LDA abs
    const addr = arr[i + 1] | (arr[i + 2] << 8);
    if (addr >= 0xE000 && addr <= 0xFD0F) refs.push({ off: i, type: 'LDA', addr });
  }
}
console.log('\nBank 12 references to Bank31 ($E000-$FFFF):');
const seen = new Set();
for (const r of refs) {
  const key = `${r.type}_${r.addr.toString(16)}`;
  if (!seen.has(key)) {
    seen.add(key);
    console.log(`  $${(0x8000+r.off).toString(16).toUpperCase()}: ${r.type} $${r.addr.toString(16).toUpperCase()}`);
  }
}
console.log(`\nTotal unique refs: ${seen.size}`);
