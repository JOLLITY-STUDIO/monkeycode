const fs = require('fs');
const path = require('path');
const file = path.join(process.cwd(), 'src', 'game', 'data', 'prg-bank-02.ts');
const src = fs.readFileSync(file, 'utf8');
const m = src.match(/\[([\s\S]*?)\];/);
const nums = m[1].match(/0x[0-9A-F]+|\d+/gi).map(x => parseInt(x, 16));
const out = [];

function dump(cpuStart, len, name) {
  const idx = cpuStart - 0xA000;
  const bytes = nums.slice(idx, idx + len);
  out.push('### ' + name + ' @ CPU $' + cpuStart.toString(16) + ' (index ' + idx + ') len ' + bytes.length);
  out.push('[' + bytes.join(', ') + ']');
  out.push('');
}

dump(0xAA47, 0x4E, 'AA47 sceneTile table (78 bytes)');
dump(0xAA75, 0x22, 'AA75 sceneTile aux table');
dump(0xAB1F, 0x10, 'AB1F oamSlot fix table');
fs.writeFileSync(path.join(process.cwd(), '_dump02_out.txt'), out.join('\n'), 'utf8');
