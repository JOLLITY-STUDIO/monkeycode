// 提取 bank_30.asm 固定区子程序实际实现
const fs = require('fs');
const t = fs.readFileSync('_tmp_bzk_out/bank_30.asm', 'utf8');
const lines = t.split(/\r?\n/);
const targets = ['CB99', 'CD7C', 'CAF7', 'CB0F', 'CD3C', 'CBC2', 'CE08', 'CC46', 'CCD2', 'CF72'];
const idx = {};
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(/0F:([0-9A-F]{4}):/);
  if (m && targets.includes(m[1]) && !(m[1] in idx)) idx[m[1]] = i;
}
console.log('entries:', Object.keys(idx).map(k => `${k}@${idx[k]+1}`).join(' '));
const out = [];
for (const k of targets) {
  if (!(k in idx)) { out.push(`--- ${k}: NOT FOUND`); continue; }
  let start = idx[k];
  let end = start;
  for (let i = start + 1; i < Math.min(lines.length, start + 120); i++) {
    const m = lines[i].match(/0F:([0-9A-F]{4}):/);
    if (m) end = i;
    if (i - start > 80 && m && /(RTS|JMP)/.test(lines[i])) break;
  }
  out.push(`\n===== ${k} @line ${start+1}-${end+1} =====`);
  out.push(lines.slice(start, end + 1).join('\n'));
}
fs.writeFileSync('_b30_fixed_out.txt', out.join('\n'));
console.log('written _b30_fixed_out.txt');
