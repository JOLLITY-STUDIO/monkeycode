// 验证球队阵容 + 特殊技能: 指南值 - 0x10 = 线性偏移
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

function byteAt(fileVal) {
  const linear = fileVal - 0x10;
  const bank = Math.floor(linear / 0x2000);
  const off = linear % 0x2000;
  const b = banks[bank][off];
  return { bank, off, val: b };
}

// 1. 我方阵容: 指南 $AA47-$AA51 圣保罗 (11人)
console.log('=== 圣保罗阵容 (指南 10,09,0A,01,0B...) ===');
const saoAddr = [0x04A57, 0x04A58, 0x04A59, 0x04A5A, 0x04A5B, 0x04A5C, 0x04A5D, 0x04A5E, 0x04A5F, 0x04A60, 0x04A61];
for (const a of saoAddr) {
  const r = byteAt(a);
  console.log(`指南 ${a.toString(16).padStart(6, '0').toUpperCase()} -> bank${r.bank} off 0x${r.off.toString(16).toUpperCase()} = 0x${r.val.toString(16).toUpperCase()} (${r.val})`);
}

console.log('\n=== 巴西 Corinthians (指南值 10, 09) ===');
for (const a of [0x03BB1A, 0x03BB1C]) {
  const r = byteAt(a);
  console.log(`指南 ${a.toString(16).padStart(6, '0').toUpperCase()} -> bank${r.bank} off 0x${r.off.toString(16).toUpperCase()} = 0x${r.val.toString(16).toUpperCase()} (${r.val})`);
}

console.log('\n=== 日本队 (指南 09,11,06,10,08,07,02,04,03,05,01) ===');
const jpnAddr = [0x03BBE0, 0x03BBE2, 0x03BBE4, 0x03BBE6, 0x03BBE8, 0x03BBEA, 0x03BBEC, 0x03BBEE, 0x03BBF0, 0x03BBF2, 0x03BBF4];
for (const a of jpnAddr) {
  const r = byteAt(a);
  console.log(`指南 ${a.toString(16).padStart(6, '0').toUpperCase()} = 0x${r.val.toString(16).toUpperCase()} (${r.val})`);
}

console.log('\n=== 特殊技能 Taki/Kisugi/Sorimachi (指南 Shot=8F07, Pass=8F09...) ===');
// CPU $8F07 窗口偏移 0xF07; 指南值 038F17 -> 线性 0x38F17-0x10 = 0x38F07 = bank28 off 0xF07
const spOff = 0xF07;
console.log('[bank28 off 0xF07 起 14B]', hex(banks[28].slice(spOff, spOff + 14)));

console.log('\n=== 特殊技能 Souta (指南 $8F87 起) ===');
// CPU $8F87 -> 窗口偏移 0xF87 = bank28 off 0xF87
console.log('[bank28 off 0xF87 起 14B]', hex(banks[28].slice(0xF87, 0xF87 + 14)));

console.log('\n=== 特殊技能 Napoleon (指南 $920B 起) ===');
// CPU $920B -> 窗口偏移 0x120B = bank28 off 0x120B
console.log('[bank28 off 0x120B 起 14B]', hex(banks[28].slice(0x120B, 0x120B + 14)));

console.log('\n=== Tsubasa 特殊技能 (指南 $8F17 起) ===');
console.log('[bank28 off 0xF17 起 14B]', hex(banks[28].slice(0xF17, 0xF17 + 14)));

console.log('\n=== Ishizaki 特殊技能 (指南 $8F33 起) ===');
console.log('[bank28 off 0xF33 起 14B]', hex(banks[28].slice(0xF33, 0xF33 + 14)));

// 完整 dump 0xF00-0xFE0 看结构
console.log('\n=== bank28 0xF00-0xF60 完整 dump ===');
for (let i = 0; i < 0x60; i += 16) {
  console.log(`0x${(0xF00 + i).toString(16).toUpperCase()} ${hex(banks[28].slice(0xF00 + i, 0xF00 + i + 16))}`);
}
