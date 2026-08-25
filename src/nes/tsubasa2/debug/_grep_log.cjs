const fs = require('fs');
const path = require('path');
const logPath = path.resolve(__dirname, '../docs/roms/Captain Tsubasa II - Super Striker (Japan).log');
const lines = fs.readFileSync(logPath, 'utf8').split('\n');

// 场景 0 关键地址（CPU $A4C1-$A55B 区，bank 是 R7 的 bank2）
const targets = [
  'A4C1:', 'A4C4:', 'A4C6:', 'A4C9:', 'A4CB:', 'A4CD:', 'A4D0:', 'A4D2:', 'A4D5:',
  'A4D8:', 'A4DA:', 'A4DC:', 'A4DE:', 'A4E0:', 'A4E3:', 'A4E5:', 'A4E7:', 'A4E9:',
  'A4EC:', 'A4EE:', 'A4F0:', 'A4F2:', 'A4F4:', 'A4F6:', 'A4F9:', 'A4FC:',
  'A4FF:', 'A501:', 'A504:', 'A506:', 'A508:', 'A50A:', 'A50C:', 'A50D:', 'A50F:',
  'A511:', 'A513:', 'A515:', 'A517:', 'A51A:', 'A51C:', 'A51E:', 'A520:', 'A522:',
  'A525:', 'A527:', 'A52A:', 'A52C:', 'A52E:', 'A530:', 'A532:', 'A534:', 'A536:',
  'A538:', 'A53B:', 'A53E:', 'A541:', 'A543:', 'A545:', 'A547:', 'A549:', 'A54B:',
  'A54D:', 'A54F:', 'A552:', 'A554:', 'A557:', 'A559:',
];

const hit = new Map(); // addr -> 首次行/次数
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  for (const t of targets) {
    // 匹配 $XX:A4C1: 形式
    if (line.includes(':' + t)) {
      if (!hit.has(t)) {
        // 打印首次出现的上下文
        console.log('=== first hit ' + t + ' @ line ' + (i + 1));
        for (let j = Math.max(0, i - 3); j <= Math.min(lines.length - 1, i + 3); j++) console.log(lines[j]);
        console.log();
      }
      hit.set(t, (hit.get(t) || 0) + 1);
    }
  }
}
console.log('===== hit counts =====');
for (const [k, v] of [...hit.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
  console.log(k, v);
}
