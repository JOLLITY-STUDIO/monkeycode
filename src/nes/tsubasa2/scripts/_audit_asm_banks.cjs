/**
 * 扫描 _tmp_bzk_out/bank_XX/ 的 asm 头部物理地址范围 → 物理 bank 号
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../_tmp_bzk_out');
const dirs = fs.readdirSync(ROOT).filter((d) => /^bank_\w+$/.test(d)).sort((a, b) => {
  const na = parseInt(a.split('_')[1], 16), nb = parseInt(b.split('_')[1], 16);
  return na - nb;
});

for (const d of dirs) {
  const folder = path.join(ROOT, d);
  const files = fs.readdirSync(folder).filter((f) => f.endsWith('.asm')).sort();
  if (files.length === 0) { console.log(`${d.padEnd(10)} no asm`); continue; }
  const first = fs.readFileSync(path.join(folder, files[0]), 'utf8');
  const m = /0x([0-9A-Fa-f]{6})[-–]0x([0-9A-Fa-f]{6})/.exec(first);
  if (!m) { console.log(`${d.padEnd(10)} no range header: ${first.split('\n')[2] || ''}`); continue; }
  const start = parseInt(m[1], 16);
  const end = parseInt(m[2], 16);
  const physBank = (start - 0x10) / 0x2000;
  console.log(`${d.padEnd(10)} 0x${start.toString(16)}-0x${end.toString(16)}  → 物理 bank ${physBank} (0x${physBank.toString(16)})`);
}
