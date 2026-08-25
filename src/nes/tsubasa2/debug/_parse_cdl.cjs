// 解析 FCEUX CDL：识别 code/data 区域，聚焦 f380 动画场景用到的 bank
const fs = require('fs');
const path = require('path');
const DIR = path.join(__dirname, '..', 'docs', 'roms', 'aftertecmo');
const cdl = fs.readFileSync(path.join(DIR, 'Captain Tsubasa II - Super Striker (Japan)-tsubasa1045.cdl'));
console.log('cdl size', cdl.length);
// FCEUX CDL 新格式: 16 字节 romname + 65536 * 4 bytes (每个地址 4 字节)
// 检查
for (let header = 0; header <= 32; header++) {
  const rest = cdl.length - header;
  if (rest % 65536 === 0 && [1, 2, 3, 4, 6].includes(rest / 65536)) {
    console.log('possible header', header, 'per-addr bytes', rest / 65536);
  }
}
