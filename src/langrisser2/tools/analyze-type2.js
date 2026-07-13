/**
 * 分析 Type 2 资源格式
 * 从 ROM 机器码和 Ghidra 反编译推导
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url).replace(/^\//, ''));
const root = path.resolve(__dirname, '..');

const romPath = path.resolve(root, '20260713/Langrisser II (Japan)_68K-gens-rom-dump.bin');
const rom = new Uint8Array(fs.readFileSync(romPath));

function r8(off) { return rom[off & 0xFFFFF]; }
function r16(off) { return (r8(off) << 8) | r8(off + 1); }
function r32(off) { return (r8(off) << 24) | (r8(off + 1) << 16) | (r8(off + 2) << 8) | r8(off + 3); }

console.log('=== Type 2 资源头部分析 ===\n');

// 看几个 Type 2 资源的头部
const type2Entries = [];
for (let entry = 0; entry < 256; entry++) {
  const ptr = r32(0x000B0000 + entry * 4);
  if (ptr === 0 || ptr >= rom.length) continue;
  const typeByte = r8(ptr);
  if (typeByte === 2) {
    const size = r16(ptr + 1);
    type2Entries.push({ entry, ptr, size });
    if (type2Entries.length <= 5) {
      console.log(`Entry ${entry} @ 0x${ptr.toString(16)}: size=${size}`);
      // dump 头部 32 字节
      let hex = '';
      for (let i = 0; i < 32; i++) {
        hex += r8(ptr + i).toString(16).padStart(2, '0') + ' ';
      }
      console.log(`  头部: ${hex}`);
      
      // Type 2 头部分析:
      // byte[0] = 0x02 (类型码)
      // 但 Ghidra 说 *in_A0 & 0x7f, 而且 A0 在 FUN_000099fa 中已 +1
      // 所以实际 A0 指向 byte[1], 读取的是 byte[1] & 0x7f
      // 等等, 不对 - A0 在 JSR 前被递增(跳过类型码)
      // 但在 RTS 前从 D7 恢复, 所以 handler 内 A0 指向类型码之后
      // 也就是说 handler 读取的第一个字节是 byte[1]
      
      // 从 Ghidra: uVar24 = *in_A0 & 0x7f;
      // in_A0 指向 byte[1] (类型码之后)
      const b1 = r8(ptr + 1);
      const b2 = r8(ptr + 2);
      const w1 = r16(ptr + 1);
      
      console.log(`  byte[1] = 0x${b1.toString(16)} (b1 & 0x7f = ${b1 & 0x7f}, b1 & 0x80 = ${b1 & 0x80 ? '1 (调用FUN_00009cfc)' : '0'})`);
      console.log(`  byte[1-2] as word = 0x${w1.toString(16)} = ${w1}`);
      console.log(`  → uVar24 = ${b1 & 0x7f} (planes-1 = ${b1 & 0x7f}), planes = ${(b1 & 0x7f) + 1}`);
      console.log(`  → 如果 byte[1] 高位=0: pbVar27 = byte[4], *(short*)(byte[2-3]) = ${r16(ptr + 2)}`);
      console.log('');
    }
  }
}

console.log(`共找到 ${type2Entries.length} 个 Type 2 资源\n`);

// 看看 Type 2 的头部更仔细
// 从 Ghidra 代码:
// uVar24 = *in_A0 & 0x7f;  // in_A0 = ptr+1 (跳过类型码)
// sVar17 = uVar24 - 1;     // sVar17 = planes - 2
// if ((char)*in_A0 < '\0') // 如果 byte[1] 的 bit7 = 1
//   uVar19 = FUN_00009cfc();  // 调用另一个函数
// else {
//   pbVar27 = in_A0 + 3;    // pbVar27 = ptr + 4 (跳过 类型码 + byte[1] + word[2-3])
//   pbVar1 = pbVar27 + *(short*)(in_A0 + 1);  // pbVar1 = ptr + 4 + word[2-3]
//   sVar25 = *(short*)(in_A0 + 1) * uVar24;   // sVar25 = word[2-3] * planes
//   ...
// }

// 所以 Type 2 格式:
// byte[0]: 类型码 (0x02)
// byte[1]: planes 参数 (& 0x7f = planes, & 0x80 = 压缩标志)
// byte[2-3]: 某种大小/偏移 (16-bit big-endian)
// byte[4+]: 数据

// 如果 bit7=0:
//   pbVar27 = byte[4] (数据起始)
//   pbVar1 = byte[4] + word[2-3] (另一个数据指针)
//   sVar25 = word[2-3] * planes

// 让我看看 entry 112 (0x80e1 指向的资源, 33026B)
console.log('=== Entry 112 (0x80e1 → 标题画面背景?) ===\n');
const e112ptr = r32(0x000B0000 + 112 * 4);
console.log(`Entry 112 @ 0x${e112ptr.toString(16)}`);
let hex = '';
for (let i = 0; i < 64; i++) {
  hex += r8(e112ptr + i).toString(16).padStart(2, '0') + ' ';
  if ((i + 1) % 16 === 0) { console.log(`  +${i.toString(16).padStart(2, '0')}: ${hex}`); hex = ''; }
}

const b1 = r8(e112ptr + 1);
const w23 = r16(e112ptr + 2);
console.log(`\n  byte[1] = 0x${b1.toString(16)} → planes = ${b1 & 0x7f}, compressed = ${b1 & 0x80 ? 'yes' : 'no'}`);
console.log(`  word[2-3] = ${w23} (0x${w23.toString(16)})`);
console.log(`  sVar25 = ${w23} * ${b1 & 0x7f} = ${w23 * (b1 & 0x7f)}`);

// 看看 FUN_00009cfc
console.log('\n=== FUN_00009cfc (Type 2 压缩分支) ===\n');
// 从 ROM 0x9CFC 开始反汇编
