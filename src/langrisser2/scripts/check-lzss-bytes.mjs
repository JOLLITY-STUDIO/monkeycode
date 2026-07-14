
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rom = fs.readFileSync(path.join(__dirname, '../20260713/Langrisser II (Japan)_68K-gens-rom-dump.bin'));

// 读取 0x9E46 - 0x9E70 的原始机器码
console.log('=== ROM 0x9E46-0x9E70 机器码 ===');
for (let addr = 0x9E46; addr < 0x9E70; addr += 2) {
  const w = ((rom[addr] << 8) | rom[addr+1]);
  console.log(`  0x${addr.toString(16)}: ${rom[addr].toString(16).padStart(2,'0')} ${rom[addr+1].toString(16).padStart(2,'0')}  (0x${w.toString(16).padStart(4,'0')})`);
}

// 重点检查 0x9E48 处的指令
console.log('\n=== 0x9E48 指令解码 ===');
const b0 = rom[0x9E48];
const b1 = rom[0x9E49];
console.log(`字节: ${b0.toString(16)} ${b1.toString(16)}`);

// 68K 指令解码
// 0x48 = 01001 000 → 可能是 PEA, MOVEM
// 完整 word: 0x4843 = 0100 1000 0100 0011
// bit 15-12: 0100 = 4
// bit 11-9: 001 = special op
// bit 8: 0 
// → 0100 1000 = 0x48 → PEA (Push Effective Address)
// effective address mode: bit 5-3 = 010, bit 2-0 = 011 → (A3)
// 所以 0x4843 = PEA (A3), 不是 PEA D3!

console.log(`0x4843: bit15-12=${(0x4843>>12)&0xF}, bit11-9=${(0x4843>>9)&0x7}, bit8=${(0x4843>>8)&0x1}`);
console.log(`  → PEA 指令, effective address mode=${(b1>>3)&0x7}, reg=${b1&0x7}`);
console.log(`  → mode=010 (An), reg=011 (A3) → PEA (A3)`);

// 同样检查 0x9E58
console.log('\n=== 0x9E58 指令解码 ===');
const c0 = rom[0x9E58];
const c1 = rom[0x9E59];
console.log(`字节: ${c0.toString(16)} ${c1.toString(16)}`);
console.log(`0x${((c0<<8)|c1).toString(16)}: mode=${(c1>>3)&0x7}, reg=${c1&0x7}`);
if (c0 === 0x48) {
  console.log(`  → PEA (A${c1&0x7})`);
}

// 检查 A3 在函数中的用途
console.log('\n=== A3 寄存器追踪 ===');
// 函数开头: movem.l a6/a5/a4/a3/a2/a1/a0/d7/d6/d5,-(a7)
// A3 被保存但未在函数内初始化
// 它可能是一个传入参数

// 让我看看调用者 (FUN_000099fa) 怎么调用 Type 3 handler
// loc_0099FA:
//   move.l a0, -(a7)   ; 保存 a0
//   moveq  #0, d0       ; d0 = 0
//   move.b (a0)+, d0    ; d0 = 类型码
//   add.w  d0, d0       ; d0 *= 2
//   ...
//   跳转到 handler

// handler 的参数:
// A0 = 资源数据 (类型码之后的第一个字节, 因为 (a0)+ 已递增)
// A1 = 输出缓冲区 (0xFF1000)
// D0 = 类型码 * 2

// A3 不在参数中... 它可能是调用者的某个寄存器

// 实际上, pea (a3) 会把 A3 的值压栈, 后面可能会有对应的 (a7)+ 来读取
// 或者... 也许 pea (a3) 只是用来在栈上分配空间, 后面会被覆盖?

// 让我看看整个 LZSS 函数的栈使用
// 函数开头: movem.l a6/a5/a4/a3/a2/a1/a0/d7/d6/d5,-(a7) → 9个寄存器 = 36字节
// 0x9E0A: move.w d7, -(a7) → 2字节 (保存解压大小)
// 0x9E48: pea (a3) → 4字节
// 0x9E58: pea (a3) → 4字节
// 每次循环压 8 字节? 这会导致栈溢出!

// 除非... 这些 pea 实际上不是 PEA, 或者有对应的出栈

// 让我检查 0x9E4A 处的 btst 指令
console.log('\n=== 0x9E4A 指令解码 ===');
const d0 = rom[0x9E4A];
const d1 = rom[0x9E4B];
console.log(`字节: ${d0.toString(16)} ${d1.toString(16)}`);
// BTST 格式: 0000 1xxx xxxx xxxx
// 或: BTST #n, Dn → 0000 1000 0EEE 0sss (EEE=immediate, sss=register)
if ((d0 & 0xF8) === 0x08) {
  console.log(`  → BTST 指令`);
  // 0x08 0x00 = BTST #0, D0? 不对
  // 实际: 08 00 0010 = BTST #16, D3?
  // BTST 格式: 0000 1000 00EE EESSS
  // EEE = immediate encoding of bit number
  // SSS = register
  // 但 16-bit immediate 需要扩展字...
  
  // 0x0830 = 0000 1000 0011 0000
  // EEE = 001, SSS = 000 → BTST D1, D0? 不对
  
  // 让我看完整的机器码
  console.log(`  原始word: 0x${((d0<<8)|d1).toString(16)}`);
  
  // BTST #imm, Dn 格式: 0000 1000 0011 0nnn
  // 然后跟着一个 immediate word (16-bit bit number)
  // 所以如果 0x9E4A 是 0838 (BTST #imm, D0), 则 0x9E4C-0x9E4D 是 bit number
  if (d0 === 0x08 && (d1 & 0xF8) === 0x38) {
    const reg = d1 & 0x07;
    const immWord = (rom[0x9E4C] << 8) | rom[0x9E4D];
    console.log(`  → BTST #${immWord}, D${reg}`);
  }
}

// 直接打印 0x9E46-0x9E70 完整字节
console.log('\n=== 0x9E46-0x9E70 完整机器码 ===');
const bytes = [];
for (let i = 0x9E46; i < 0x9E70; i++) {
  bytes.push(rom[i].toString(16).padStart(2, '0'));
}
// 每行 8 字节
for (let row = 0; row < bytes.length; row += 8) {
  const addr = 0x9E46 + row;
  console.log(`  0x${addr.toString(16)}: ${bytes.slice(row, row+8).join(' ')}`);
}
