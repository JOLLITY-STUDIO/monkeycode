// 核验 bank29 关键消费地址内容
const path = require('path');
const file = path.join(__dirname, 'rom-data', 'prg-bank-29.ts');
const src = require('fs').readFileSync(file, 'utf8');
const m = src.match(/const PRG_BANK_29[\s\S]*?=\s*\[([\s\S]*?)\];/);
if (!m) { console.error('NO MATCH'); process.exit(1); }
const bytes = m[1].split(',').map(s => parseInt(s.trim(), 16)).filter(n => !isNaN(n));
console.log('total:', bytes.length);

const addrs = [0xBA1C, 0xBA4C, 0xBA90, 0xBB2E, 0xBC48, 0xBC58, 0xBCD1, 0xBCF3, 0xBD64, 0xBDA8, 0xBB10, 0xBB1A, 0xBB24];
for (const a of addrs) {
  const off = a - 0xA000;
  const row = [];
  for (let i = 0; i < 16; i++) row.push(bytes[off + i] !== undefined ? bytes[off + i].toString(16).padStart(2, '0') : '??');
  console.log('$' + a.toString(16).toUpperCase() + ' (off ' + off.toString(16) + '): ' + row.join(' '));
}
