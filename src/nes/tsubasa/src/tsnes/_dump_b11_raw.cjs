// 打印 bank11 PRG 原始字节
const PRG = require('./rom-data/prg-bank-11.js');
const hex = (a, n) => {
  const arr = [];
  for (let i = 0; i < n; i++) arr.push(PRG[a + i].toString(16).padStart(2, '0'));
  return arr.join(' ');
};
console.log('81A7: ' + hex(0x81A7 - 0x8000, 0x30));
console.log('824D: ' + hex(0x824D - 0x8000, 0x33));
