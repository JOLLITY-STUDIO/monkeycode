// 临时脚本: ROM 原始字节 dump 最终批
const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
let out = '';
function dump(romBase, addr, len, label) {
  const arr = [];
  for (let i = 0; i < len; i++) arr.push(rom[romBase + (addr - 0x8000) + i].toString(16).padStart(2, '0').toUpperCase());
  out += `${label} [$${addr.toString(16).toUpperCase()}] ${len}B:\n`;
  for (let i = 0; i < arr.length; i += 16) out += '  ' + arr.slice(i, i + 16).join(' ') + '\n';
}
const B28 = 0x10 + 28 * 0x2000;
const B20 = 0x10 + 20 * 0x2000;
dump(B28, 0x818E, 0x80, 'b28 $818E');
dump(B28, 0x8199, 0x60, 'b28 $8199');
dump(B28, 0x8A9D, 0x40, 'b28 $8A9D');
dump(B28, 0xBAB2, 0x40, 'b28 $BAB2');
dump(B28, 0x9E4E, 0x40, 'b28 $9E4E');
dump(B28, 0x8604, 0x10, 'b28 $8604');
dump(B28, 0x86B5, 0x10, 'b28 $86B5');
dump(B28, 0x87C3, 0x10, 'b28 $87C3');
dump(B28, 0x8BBE, 0x10, 'b28 $8BBE');
dump(B28, 0x8B9E, 0x10, 'b28 $8B9E');
dump(B28, 0x8E1B, 0x10, 'b28 $8E1B');
dump(B28, 0x8C84, 72, 'b28 $8C84 table(32)');
dump(B28, 0x868E, 0x22, 'b28 $868E-$86AF');
dump(B28, 0x8ADE, 0x30, 'b28 $8ADE-$8B0D');
dump(B28, 0x8B0B, 0x20, 'b28 $8B0B-$8B2A');
dump(B28, 0x8933, 0x30, 'b28 $8933 full');
dump(B28, 0x8A20, 0x20, 'b28 $8A20-$8A3F');
dump(B28, 0x8D41, 0x18, 'b28 $8D41-$8D58');
dump(B28, 0x8CC7, 0x40, 'b28 $8CC7-$8D06');
dump(B28, 0x895E, 0x20, 'b28 $895E-$897D');
dump(B20, 0x8968, 0x40, 'b20 $8968 ptr tbl');
dump(B20, 0x88E4, 0x10, 'b20 $88E4');
dump(B20, 0x88DA, 0x10, 'b20 $88DA');
dump(B20, 0x88DF, 0x10, 'b20 $88DF');
fs.writeFileSync('_tmp_tables_out.txt', out);
console.log('done');
