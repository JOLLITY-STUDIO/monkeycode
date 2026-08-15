// 提取 bank28 数据表（按 CPU 地址）
const fs = require('fs');
const s = fs.readFileSync('rom-data/prg-bank-28.ts', 'utf8');
const m = s.match(/=\s*\[([\s\S]*?)\];/);
const b = m[1].split(',').map(x => parseInt(x.trim(), 16)).filter(n => !isNaN(n));
const d = (off) => b[off] !== undefined ? '0x' + b[off].toString(16).padStart(2, '0') : '--';
const cpu2off = (cpu) => cpu - 0x8000;
// 需要查看的表（CPU 地址）
const tables = {
  '818E': [0x818E, 12],
  '8199': [0x8199, 4],
  '8206': [0x8206, 24],
  '824C': [0x824C, 12],
  '82C0': [0x82C0, 12],
  '8604': [0x8604, 10],
  '86B5': [0x86B5, 10],
  '87C3': [0x87C3, 10],
  '89AF': [0x89AF, 4],
  '8A9D': [0x8A9D, 4],
  '8B9E': [0x8B9E, 34],
  '8BBA': [0x8BBA, 6],
  '8BBE': [0x8BBE, 8],
  '8E1B': [0x8E1B, 8],
  '9460': [0x9460, 64],
  '9554': [0x9554, 64],
  '959E': [0x959E, 64],
  '9E4E': [0x9E4E, 24],
  'BAB2': [0xBAB2, 16],
};
for (const [name, [cpu, len]] of Object.entries(tables)) {
  const off = cpu2off(cpu);
  console.log('=== $' + name + ' (' + len + 'B) ===');
  const vals = [];
  for (let i = 0; i < len; i++) vals.push(d(off + i));
  console.log(vals.join(' '));
}
