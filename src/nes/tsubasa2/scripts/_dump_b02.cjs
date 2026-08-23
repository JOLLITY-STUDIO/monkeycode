// 临时脚本：按地址段 dump bank02 asm 源码（合并各文件），用后删除
const fs = require('fs');
const path = require('path');
const dir = 'd:/studio/github/monkeycode/src/nes/tsubasa2/src/asm/bank02';
const ranges = process.argv.slice(2).map(a => {
  const [s, e] = a.split('-').map(x => parseInt(x, 16));
  return [s, e];
});
// 收集所有行并按地址排序
const lines = [];
for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.s'))) {
  const ls = fs.readFileSync(path.join(dir, f), 'latin1').split(/\r?\n/);
  ls.forEach((ln, i) => {
    const m = ln.match(/;\s*\$([0-9A-F]{4})/i);
    if (m) lines.push({ addr: parseInt(m[1], 16), src: f + ':' + (i + 1), text: ln });
  });
}
lines.sort((a, b) => a.addr - b.addr);
for (const l of lines) {
  for (const [s, e] of ranges) {
    if (l.addr >= s && l.addr <= e) console.log(l.text.trim());
  }
}
