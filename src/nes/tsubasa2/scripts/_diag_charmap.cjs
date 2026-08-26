// 1) bank18-data.ts 中 0x94/0x95 上下文
// 2) CharMap register 调用点
const fs = require('fs');
console.log('=== bank18-data.ts 0x94/0x95 上下文 ===');
const s = fs.readFileSync('src/game/prg/data/scene/bank18-data.ts', 'utf8');
const lines = s.split('\n');
for (let i = 0; i < lines.length; i++) {
  if (/0x94|0x95/.test(lines[i])) {
    console.log((i + 1) + ': ' + lines.slice(Math.max(0, i - 3), i + 4).join('\n'));
    console.log('---');
  }
}
console.log('=== CharMap 注册调用点 ===');
const walk = (d) => {
  let r = [];
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = d + '/' + e.name;
    if (e.isDirectory()) r = r.concat(walk(p));
    else if (/\.ts$/.test(e.name)) r.push(p);
  }
  return r;
};
for (const f of walk('src/game')) {
  const c = fs.readFileSync(f, 'utf8');
  if (/registerTable|charMap\.register|\.register\(/.test(c) && /CharMap|charMap/.test(c)) {
    const ls = c.split('\n');
    ls.forEach((l, idx) => {
      if (/registerTable|\.register\(/.test(l)) console.log(f + ':' + (idx + 1) + ': ' + l.trim().slice(0, 120));
    });
  }
}
