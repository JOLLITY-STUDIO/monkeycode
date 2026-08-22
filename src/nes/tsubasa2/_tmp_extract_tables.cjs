// 临时脚本: dump bank28 深嵌套目标段
const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const HEADER = 0x10;
function readByte(bank, addr) {
  return rom[HEADER + bank * 0x2000 + (addr - 0x8000)];
}
function dump(bank, addr, len) {
  const arr = [];
  for (let i = 0; i < len; i++) arr.push(readByte(bank, addr + i).toString(16).toUpperCase().padStart(2, '0'));
  return arr.join(' ');
}
const segs = [
  [0x8710, 0x30, '$8710 表4目标+$8732'],
  [0x8A3F, 0x30, '$8A3F sub875D 后续'],
  [0x8ADE, 0x40, '$8ADE 属性计算'],
  [0x8B0B, 0x40, '$8B0B 坐标计算'],
  [0x87C7, 0x90, '$87C7 sub875D 表1 + 目标'],
  [0x8855, 0xB0, '$8855-$88FD sub875D 目标'],
  [0x85B5, 0x30, '$85B5 阵型特殊路径'],
  [0x8A62, 0x40, '$8A62 属性指针查询'],
];
let out = [];
for (const [a, len, label] of segs) {
  out.push(`$${a.toString(16).toUpperCase()} ${label}:`);
  out.push('  ' + dump(28, a, len));
}
fs.writeFileSync('_tmp_tables_out.txt', out.join('\n'));
console.log('done');
