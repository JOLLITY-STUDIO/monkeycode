// 在所有 bank asm 中搜索 $0079/$007B/$007C-$008D/$008E/$008F/$0090/$0044 的读写位置
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..', 'src', 'asm');
function walk(dir, out) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.s') && !e.name.startsWith('_')) out.push(p);
  }
  return out;
}
const files = walk(root, []);
const addrs = ['007C', '007D', '007E', '007F', '0080', '0081', '008E', '008F', '0090', '0091', '0079', '007B', '0078'];
const found = new Map();
for (const f of files) {
  const lines = fs.readFileSync(f, 'utf8').split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    for (const a of addrs) {
      const m = lines[i].match(new RegExp(`\\$00${a}|\\$${a}`, 'i'));
      if (m && /STA|LDA|LDY|LDX|STX|STY|INC|DEC|CMP|ADC|SBC|AND|ORA|EOR|BIT|ASL|LSR|ROL|ROR/.test(lines[i])) {
        const key = f.replace(root, '').split(path.sep)[1] || '';
        if (!found.has(a)) found.set(a, []);
        found.get(a).push(`${key}:${lines[i].replace(/\s+/g, ' ').trim()}`);
      }
    }
  }
}
for (const a of addrs) {
  console.log(`\n=== $${a} ===`);
  const list = found.get(a) || [];
  for (const l of list.slice(0, 40)) console.log('  ' + l);
  if (list.length === 0) console.log('  (none)');
}
