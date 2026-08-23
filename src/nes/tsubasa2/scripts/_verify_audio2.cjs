// 临时：验证 $8BDA 入口表（$8349 使用）的 BGM/SE 数据格式
const fs = require('fs');
const path = require('path');

const rom = fs.readFileSync(path.join(__dirname, '..', 'docs', 'roms', 'Captain Tsubasa II - Super Striker (Japan).nes'));
const prg = rom.slice(16);
const bank = (n) => prg.slice(n * 0x2000, (n + 1) * 0x2000);
const b7 = bank(7), b12 = bank(12), b13 = bank(13), b14 = bank(14), b15 = bank(15);
const b12b = (a) => b12[a - 0x8000];
const b12u16 = (a) => b12b(a) | (b12b(a + 1) << 8);
const hex = (arr, off, n) => Array.from(arr.slice(off, off + n)).map((v) => v.toString(16).padStart(2, '0')).join(' ');

// $8BDA 表（100 条）→ 请求 ID (id) → 指针
console.log('=== $8BDA 表：BGM 请求 ID ($03-$30) ===');
for (const id of [0x03, 0x04, 0x05, 0x06, 0x07, 0x10, 0x20, 0x30]) {
  const idx = (id - 1) * 2;
  const p = b12u16(0x8bda + idx);
  // BGM → bank7 窗口
  const data = [];
  for (let i = 0; i < 12; i++) data.push(b7[p - 0x8000 + i]);
  console.log(`req $${id.toString(16)} → $${p.toString(16)} (bank7[0x${(p-0x8000).toString(16)}]): ${data.map(v=>v.toString(16).padStart(2,'0')).join(' ')}`);
}

console.log('\n=== $8BDA 表：SE 请求 ID ($32-$43 → bank13, $44-$50 → bank14, $51-$5B → bank15, $5C-$71 → 当前) ===');
for (const id of [0x32, 0x33, 0x34, 0x44, 0x51]) {
  const idx = (id - 1) * 2;
  const p = b12u16(0x8bda + idx);
  const wb = id < 0x44 ? b13 : id < 0x51 ? b14 : id < 0x5c ? b15 : b13;
  const data = [];
  for (let i = 0; i < 16; i++) data.push(wb[p - 0x8000 + i]);
  console.log(`req $${id.toString(16)} → $${p.toString(16)}: ${data.map(v=>v.toString(16).padStart(2,'0')).join(' ')}`);
}

// 通道描述符解码（假设格式 [ch, ptrLo, ptrHi] 组）
console.log('\n=== 解码尝试：BGM req $03（bank7） ===');
const p3 = b12u16(0x8bda + 2 * 2);
console.log(`入口 $${p3.toString(16)}: ${hex(b7, p3 - 0x8000, 24)}`);
console.log(`byte0=$${b7[p3-0x8000].toString(16)} bit7=${(b7[p3-0x8000]>>7)&1}`);

console.log('\n=== 解码尝试：SE req $33（bank13） ===');
const p33 = b12u16(0x8bda + (0x33 - 1) * 2);
console.log(`入口 $${p33.toString(16)}: ${hex(b13, p33 - 0x8000, 24)}`);
console.log(`byte0=$${b13[p33-0x8000].toString(16)} bit7=${(b13[p33-0x8000]>>7)&1}`);

// $8754 表（opcode 0x00 音符流表）
console.log('\n=== $8754 表（前 12 条） ===');
for (let i = 0; i < 12; i++) console.log(`[${i}] = $${b12u16(0x8754 + i * 2).toString(16)}`);

// $8798 BGM 表（前 8 条）
console.log('\n=== $8798 表（前 8 条） ===');
for (let i = 0; i < 8; i++) console.log(`[${i}] = $${b12u16(0x8798 + i * 2).toString(16)}`);
