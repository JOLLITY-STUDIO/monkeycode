// 提取 Misaki 23B (跨 bank28/bank29)
const fs = require('fs');
const path = require('path');

function loadBank(n) {
  const src = path.join(__dirname, 'rom-data', `prg-bank-${String(n).padStart(2, '0')}.ts`);
  const text = fs.readFileSync(src, 'utf8');
  const bytes = [];
  const re = /0x([0-9A-Fa-f]{2})/g;
  let m;
  while ((m = re.exec(text)) !== null) bytes.push(parseInt(m[1], 16));
  return bytes;
}

const b28 = loadBank(28);
const b29 = loadBank(29);

function hex(bytes) {
  return bytes.map(v => v.toString(16).padStart(2, '0').toUpperCase()).join(' ');
}

// Misaki: 线性 0x39FFE = bank28 off 0x1FFE 起 23B
const misaki = [...b28.slice(0x1FFE, 0x2000), ...b29.slice(0, 0x15)];
console.log('Misaki 23B:', hex(misaki));

// 验证相邻: Tsubasa 尾部 / Nitta 头部
console.log('bank28 off 0x1FD0-0x2000:', hex(b28.slice(0x1FD0, 0x2000)));
console.log('bank29 off 0x0000-0x0030:', hex(b29.slice(0, 0x30)));
