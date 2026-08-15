// 验证指南地址映射: 尝试几种 bank/偏移组合, 判断哪组数据合理
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

function plausibleStats(bytes) {
  // 能力值应该是 0-29 左右的小值, 不应出现大量 0x4C(JMP) 等代码字节
  const big = bytes.filter(v => v > 0x40).length;
  return `big>0x40:${big}/${bytes.length}`;
}

console.log('=== Tsubasa 能力值 (23B) 各候选 ===');
// 假设1: bank03 偏移 0x1FF6 (=CPU $9FF6-0x8000)
console.log('[bank03 off 0x1FF6]', hex(banks[3].slice(0x1FF6, 0x1FF6 + 23)), plausibleStats(banks[3].slice(0x1FF6, 0x1FF6 + 23)));
// 假设2: bank03 偏移 0x1FE6 (=CPU $9FE6-0x8000)
console.log('[bank03 off 0x1FE6]', hex(banks[3].slice(0x1FE6, 0x1FE6 + 23)), plausibleStats(banks[3].slice(0x1FE6, 0x1FE6 + 23)));
// 假设3: bank03 偏移 0x3FE6? 超范围
// 假设4: bank 12 (0x30000/0x2000) 偏移 0x1FE6
console.log('[bank12 off 0x1FE6]', hex(banks[12].slice(0x1FE6, 0x1FE6 + 23)), plausibleStats(banks[12].slice(0x1FE6, 0x1FE6 + 23)));
// 假设5: 整个 ROM 线性偏移 0x39FE6 => bank 28 偏移 0x1FE6
console.log('[bank28 off 0x1FE6]', hex(banks[28].slice(0x1FE6, 0x1FE6 + 23)), plausibleStats(banks[28].slice(0x1FE6, 0x1FE6 + 23)));
// 假设6: 指南格式 = bank 03 + (CPU地址-0x8000+0x10)? 0x9FF6-0x8000=0x1FF6, 已试

console.log('\n=== Hyuga 能力值 (23B) 各候选 ===');
// CPU $A166 → bank03 偏移 0x176
console.log('[bank03 off 0x176]', hex(banks[3].slice(0x176, 0x176 + 23)), plausibleStats(banks[3].slice(0x176, 0x176 + 23)));
console.log('[bank03 off 0x166]', hex(banks[3].slice(0x166, 0x166 + 23)), plausibleStats(banks[3].slice(0x166, 0x166 + 23)));
// 0x3A176 线性 → 0x3A176 = 0x2000*29 + 0x176 → bank 29
console.log('[bank29 off 0x176]', hex(banks[29].slice(0x176, 0x176 + 23)), plausibleStats(banks[29].slice(0x176, 0x176 + 23)));

console.log('\n=== 圣保罗阵容 (11B) 候选 ===');
// CPU $AA47 → bank00 偏移 0xA47 ($A000窗口)
console.log('[bank00 off 0xA47]', hex(banks[0].slice(0xA47, 0xA47 + 11)));
// bank00 偏移 0xA57 (+0x10)
console.log('[bank00 off 0xA57]', hex(banks[0].slice(0xA57, 0xA57 + 11)));
// 0x04A57 线性 → bank 2 偏移 0xA57
console.log('[bank02 off 0xA57]', hex(banks[2].slice(0xA57, 0xA57 + 11)));
console.log('[bank02 off 0xA47]', hex(banks[2].slice(0xA47, 0xA47 + 11)));

console.log('\n=== Taki/Kisugi/Sorimachi 特殊技能 (14B, 2字节/项) 候选 ===');
// CPU $8F07 → bank03 偏移 0xF07
console.log('[bank03 off 0xF07]', hex(banks[3].slice(0xF07, 0xF07 + 14)));
console.log('[bank03 off 0xF17]', hex(banks[3].slice(0xF17, 0xF17 + 14)));
// 0x38F17 线性 → bank 28 偏移 0xF17
console.log('[bank28 off 0xF17]', hex(banks[28].slice(0xF17, 0xF17 + 14)));

console.log('\n=== Napoleon 特殊技能 (14B) 候选 ===');
// CPU $920B → bank03 偏移 0x120B
console.log('[bank03 off 0x120B]', hex(banks[3].slice(0x120B, 0x120B + 14)));
console.log('[bank03 off 0x121B]', hex(banks[3].slice(0x121B, 0x121B + 14)));
// 0x3921B 线性 → bank 28 偏移 0x121B
console.log('[bank28 off 0x121B]', hex(banks[28].slice(0x121B, 0x121B + 14)));

console.log('\n=== 巴西俱乐部阵容 (03BB1A 起) 候选 ===');
// CPU $BB1A → bank03 偏移 0x1B1A
console.log('[bank03 off 0x1B1A]', hex(banks[3].slice(0x1B1A, 0x1B1A + 32)));
// 0x3BB1A 线性 → bank 29 偏移 0x1B1A
console.log('[bank29 off 0x1B1A]', hex(banks[29].slice(0x1B1A, 0x1B1A + 32)));
