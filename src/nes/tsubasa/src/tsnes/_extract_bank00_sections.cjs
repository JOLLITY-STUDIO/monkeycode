// 从 bank_00.asm 提取 $9DEE / $9B28 / $98E8 / $9A71 / $9B07 等
const fs = require('fs');
const path = require('path');

const asmPath = path.join(__dirname, '_tmp_bzk_out', 'bank_00.asm');
const lines = fs.readFileSync(asmPath, 'utf8').split(/\r?\n/);

function parseLine(line) {
  const t = line.trim().split(/\s+/);
  if (t.length < 8) return null;
  const m = t[7].match(/^00:([0-9A-Fa-f]{4}):$/);
  if (!m) return null;
  return { flag: t[0], asm: parseInt(m[1], 16), rest: t.slice(8).join(' ') };
}

const entries = lines.map(parseLine).filter(Boolean);

function section(from, to) {
  let out = '';
  for (const e of entries) {
    if (e.asm >= from && e.asm <= to) {
      out += `${e.flag === 'C' ? 'C' : '-'} $${e.asm.toString(16).toUpperCase()}: ${e.rest}\n`;
    }
  }
  return out;
}

const sections = [
  ['9DEE', 0x9DEE, 0x9E36],
  ['9B28', 0x9B28, 0x9B60],
  ['98E8', 0x98E8, 0x992C],
  ['9A71', 0x9A71, 0x9A31],
  ['9B07', 0x9B07, 0x9B11],
  ['88FB', 0x88FB, 0x890C],
  ['890C', 0x890C, 0x8920],
  ['8464', 0x8464, 0x84C1],
  ['C4B9', 0xC4B9, 0xC4D0],
];

for (const [name, from, to] of sections) {
  const out = section(from, to);
  fs.writeFileSync(path.join(__dirname, '_tmp_bzk_out', `_sec00_${name}.txt`), out);
  console.log(`${name}: ${out.split('\n').filter(Boolean).length} lines`);
}
