// 验证我方三组阵容 + 完整特殊技能区
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

// 我方阵容: bank02 off 0xA47 起
console.log('=== 我方阵容 bank02 0xA47-0xAB0 ===');
for (let i = 0xA47; i < 0xA90; i += 16) {
  console.log(`0x${i.toString(16).toUpperCase()} ${hex(banks[2].slice(i, i + 16))}`);
}

console.log('\n=== 特殊技能区 bank28 0xF00-0x1000 完整 dump ===');
const b = banks[28];
for (let i = 0xF00; i < 0x1000; i += 16) {
  console.log(`0x${i.toString(16).toUpperCase()} ${hex(b.slice(i, i + 16))}`);
}

console.log('\n=== 特殊技能区 bank28 0x1200-0x1300 (Napoleon $920B 区域) ===');
for (let i = 0x1200; i < 0x1300; i += 16) {
  console.log(`0x${i.toString(16).toUpperCase()} ${hex(b.slice(i, i + 16))}`);
}

// 提取各角色特殊技能 (14B/角色)
console.log('\n=== 各角色特殊技能提取 (14B: Shot/Pass/Dribble/1-2/Block/Tackle/PassCut x2B) ===');
const roles = [
  ['Taki/Kisugi/Sorimachi', 0x8F07],
  ['Tsubasa', 0x8F17],
  ['Ishizaki', 0x8F33],
  ['Souta', 0x8F87],
  ['Jitou', 0x8F95],
  ['Napoleon', 0x920B],
];
for (const [name, cpuAddr] of roles) {
  const off = cpuAddr - 0x8000;
  console.log(`${name} (CPU $${cpuAddr.toString(16).toUpperCase()}, off 0x${off.toString(16).toUpperCase()}) ${hex(b.slice(off, off + 14))}`);
}
