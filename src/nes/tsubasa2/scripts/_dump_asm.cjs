// 临时脚本：输出指定地址段的 asm 源码，用后删除
const fs = require('fs');
const path = require('path');
const file = 'd:/studio/github/monkeycode/src/nes/tsubasa2/src/asm/bank00/_full.s';
const ranges = process.argv.slice(2).map(a => {
  const [s, e] = a.split('-').map(x => parseInt(x, 16));
  return [s, e];
});
const lines = fs.readFileSync(file, 'latin1').split(/\r?\n/);
let current = 0;
let inRange = false;
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(/;\s*\$([0-9A-F]{4})/i);
  if (m) current = parseInt(m[1], 16);
  let hit = false;
  for (const [s, e] of ranges) {
    if (current >= s && current <= e) { hit = true; break; }
  }
  if (hit) console.log((i + 1) + ': ' + lines[i]);
}
