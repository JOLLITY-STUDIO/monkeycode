// 验证能力值地址: 指南值 - 0x10 = 线性偏移
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

const banks = {};
for (let i = 0; i < 32; i++) banks[i] = loadBank(i);

function hex(bytes) {
  return bytes.map(v => v.toString(16).padStart(2, '0').toUpperCase()).join(' ');
}

// 指南: 名字 -> [CPU地址, 指南文件值]
const entries = [
  ['Tsubasa', 0x9FE6, 0x039FF6, 23],
  ['Misaki', 0x9FFE, 0x03A00E, 23],
  ['Nitta', 0xA016, 0x03A026, 23],
  ['Ishizaki', 0xA11E, 0x03A12E, 23],
  ['Kazuo&Masao', 0xA136, 0x03A146, 23],
  ['Sano', 0xA14E, 0x03A15E, 23],
  ['Hyuga', 0xA166, 0x03A176, 23],
  ['Souta', 0xA17E, 0x03A18E, 23],
  ['Jitou', 0xA196, 0x03A1A6, 23],
  ['Matsuyama', 0xA1AE, 0x03A1BE, 23],
  ['Sawada', 0xA1DE, 0x03A1EE, 23],
  ['Misugi', 0xA1F6, 0x03A206, 23],
  ['Morisaki GK', 0xAE8E, 0x03AE9E, 8],
  ['Wakashimazu GK', 0xAE96, 0x03AEA6, 8],
  ['Wakabayashi GK', 0xAE9E, 0x03AEAE, 8],
];

for (const [name, cpu, fileVal, size] of entries) {
  const linear = fileVal - 0x10;
  const bank = Math.floor(linear / 0x2000);
  const off = linear % 0x2000;
  const data = banks[bank].slice(off, off + size);
  if (data.length !== size) {
    console.log(`${name}: OUT OF RANGE bank=${bank} off=0x${off.toString(16)}`);
    continue;
  }
  const big = data.filter(v => v > 0x40).length;
  console.log(`${name} bank=${bank} off=0x${off.toString(16).toUpperCase()} [${data.length}B big>0x40:${big}] ${hex(data)}`);
}
