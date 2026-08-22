const fs = require('fs');
function walk(dir, out) {
  for (const f of fs.readdirSync(dir)) {
    const p = dir + '/' + f;
    const st = fs.statSync(p);
    if (st.isDirectory()) { if (f !== 'node_modules' && f !== '_build') walk(p, out); }
    else if (/\.(ts|js)$/.test(f)) out.push(p);
  }
  return out;
}
const files = walk('src', []);
const pats = [/0x0f\s*,\s*0x0f\s*,\s*0x0f\s*,\s*0x0f\s*,\s*0x0f/, /palTable/, /curTable/, /0xRRGGBB/, /NES_PALETTE/i, /PALETTE_2C02/i];
for (const f of files) {
  const s = fs.readFileSync(f, 'utf8');
  for (const p of pats) {
    if (p.test(s)) { console.log(f + '  <== ' + p); break; }
  }
}
// 打印 nes-ram.ts 的 PaletteColor 定义
try {
  const s = fs.readFileSync('src/core/nes-ram.ts', 'utf8');
  const i = s.indexOf('PaletteColor');
  console.log('\n--- nes-ram.ts PaletteColor context ---');
  console.log(s.slice(Math.max(0, i - 200), i + 400));
} catch (e) { console.log(e.message); }
