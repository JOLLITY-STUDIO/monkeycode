// 从 bank_02.asm 提取 handler 段（带 CDL flag）
const fs = require('fs');
const path = require('path');

const asmPath = path.join(__dirname, '_tmp_bzk_out', 'bank_02.asm');
const lines = fs.readFileSync(asmPath, 'utf8').split(/\r?\n/);

function parseLine(line) {
  const t = line.trim().split(/\s+/);
  if (t.length < 8) return null;
  const m = t[7].match(/^01:([0-9A-Fa-f]{4}):$/);
  if (!m) return null;
  return { flag: t[0], asm: parseInt(m[1], 16), rest: t.slice(8).join(' ') };
}

const entries = lines.map(parseLine).filter(Boolean);

let out = '';
for (const e of entries) {
  if (e.asm >= 0xA4C0 - 0x2000 && e.asm <= 0xA854 - 0x2000) {
    out += `${e.flag === 'C' ? 'C' : '-'} $${(e.asm + 0x2000).toString(16).toUpperCase()}: ${e.rest}\n`;
  }
}
fs.writeFileSync(path.join(__dirname, '_tmp_bzk_out', '_sec_A4C0_flagged.txt'), out);
console.log(out.split('\n').filter(Boolean).length, 'lines');
