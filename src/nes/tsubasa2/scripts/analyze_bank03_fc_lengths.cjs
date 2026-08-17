const fs = require('fs');
const path = require('path');

const BANK_SIZE = 8192;

// 从 TypeScript 文件直接解析字节数组
function loadBankFromTS(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const match = content.match(/=\s*\[([\s\S]*?)\];/m);
  if (!match) throw new Error('Cannot parse: ' + filePath);
  const bytesMatch = match[1].match(/0x[0-9A-Fa-f]{2}/g);
  if (!bytesMatch) throw new Error('No hex bytes found');
  return bytesMatch.map(b => parseInt(b, 16));
}

const romDataDir = path.join(__dirname, '..', 'rom-data');
const data = loadBankFromTS(path.join(romDataDir, 'prg-bank-03.ts'));

// 按 $FC 切分
const records = [];
let start = 0;
for (let i = 0; i < data.length; i++) {
  if (data[i] === 0xFC) {
    if (i > start) {
      records.push({
        offset: start,
        len: i - start,
        data: data.slice(start, i),
      });
    }
    start = i + 1;
  }
}
if (start < data.length) {
  records.push({
    offset: start,
    len: data.length - start,
    data: data.slice(start),
  });
}

// 长度分布
const dist = {};
for (const r of records) {
  dist[r.len] = (dist[r.len] || 0) + 1;
}

const sortedLens = Object.entries(dist)
  .map(([len, count]) => ({ len: parseInt(len, 10), count }))
  .sort((a, b) => b.count - a.count);

console.log('Bank 03 $FC 分隔统计:');
console.log('  总字节: ' + BANK_SIZE);
console.log('  $FC 数量: ' + data.filter(b => b === 0xFC).length);
console.log('  总记录数: ' + records.length);
console.log('  平均长度: ' + Math.round(records.reduce((a, r) => a + r.len, 0) / records.length));
console.log('  最短: ' + Math.min(...records.map(r => r.len)));
console.log('  最长: ' + Math.max(...records.map(r => r.len)));
console.log('\n长度分布 (Top 20):');
console.log('长度\t次数\t累计');
let acc = 0;
for (const item of sortedLens.slice(0, 20)) {
  acc += item.count;
  console.log(item.len + 'B\t' + item.count + '\t' + acc);
}

// 样本
console.log('\n前 20 条记录样本:');
for (let i = 0; i < Math.min(20, records.length); i++) {
  const r = records[i];
  const hex = r.data.slice(0, 8).map(b => b.toString(16).padStart(2, '0').toUpperCase()).join(' ');
  console.log('  [$' + r.offset.toString(16).toUpperCase() + '] len=' + r.len + '  head=' + hex);
}
