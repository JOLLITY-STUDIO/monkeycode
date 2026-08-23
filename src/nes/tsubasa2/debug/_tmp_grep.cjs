const fs = require('fs');
const root = 'd:/studio/github/monkeycode/src/nes/tsubasa2';
const c = fs.readFileSync(root + '/asm/bank00/code_sub.s', 'utf8');
const lines = c.split('\n');
function findAddr(addr) {
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('; $' + addr)) return i;
  }
  return -1;
}
function dump(addr, n, label) {
  const i = findAddr(addr);
  console.log('===== ' + label + ' ($' + addr + ') at line ' + (i + 1) + ' =====');
  if (i < 0) { console.log('NOT FOUND'); return; }
  console.log(lines.slice(i, i + n).join('\n'));
}
dump('91F3', 40, '91F3 场景段推进(用户提到的 9201 起点)');
dump('94C1', 50, 'NT 写入循环');
dump('974A', 25, '读场景数据 2B');
dump('975B', 25, '读场景数据 2B 2');
dump('978B', 8, '32B 模板');
