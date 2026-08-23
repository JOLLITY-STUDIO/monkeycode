const fs = require('fs');
const root = 'd:/studio/github/monkeycode/src/nes/tsubasa2';
// 在 asm/bank00 下找含 "; $9148" 的文件
for (const f of fs.readdirSync(root + '/asm/bank00')) {
  if (!f.endsWith('.s')) continue;
  const c = fs.readFileSync(root + '/asm/bank00/' + f, 'utf8');
  if (c.includes('; $9148') || c.includes('; $94C1')) {
    console.log('HIT: ' + f);
  }
}
// 也全 asm 找
function walk(d) {
  let fs2 = [];
  for (const f of fs.readdirSync(d)) {
    const p = d + '/' + f;
    const s = fs.statSync(p);
    if (s.isDirectory()) fs2 = fs2.concat(walk(p));
    else if (f.endsWith('.s')) fs2.push(p);
  }
  return fs2;
}
for (const p of walk(root + '/asm')) {
  const c = fs.readFileSync(p, 'utf8');
  if (c.includes('; $9148')) console.log('ASM: ' + p);
}
