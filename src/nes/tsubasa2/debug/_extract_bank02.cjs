/**
 * _extract_bank02.cjs — 从 ROM 提取 bank02/bank00 数据表（v2）
 *
 * 目标表：
 *   1. Scene15 的 $AA97 表（NT 填充流记录 [flags, addrLo, count]）— CPU $AA97 = PRG 0x4A97
 *   2. Scene16 的 $A677 段（$FC=252 字节，$A767 拷到 $03E8）— CPU $A677 = PRG 0x4677
 *   3. Scene16 的 $A67B 段（$FC=252 字节，$86F9 拷到 $0460）— CPU $A67B = PRG 0x467B
 *   4. bank00 $8A14 tile 映射表（$88CA 用，tile $A0-$FF → 实际 tile）— CPU $8A14 = PRG 0x0A14
 */
const fs = require('fs');
const path = require('path');

const ROM = path.join(__dirname, '..', 'docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const buf = fs.readFileSync(ROM);
const prgSize = buf[4] * 0x4000;
const prgStart = 16;
console.log(`PRG size: 0x${prgSize.toString(16)}, CHR size: 0x${(buf[5] * 0x2000).toString(16)}`);

const hex = (arr) => Array.from(arr).map(b => '0x' + b.toString(16).padStart(2, '0')).join(', ');

// Scene15 表: CPU $AA97 → PRG 0x4A97（11 条记录 = 33 字节，遇 bit7=1 停；取 96 保险）
const o15 = prgStart + 0x4a97;
console.log(`\n=== Scene15 $AA97 table (96 bytes) ===`);
console.log(hex(buf.subarray(o15, o15 + 96)));

// Scene16 $A677 段 252 字节
const o677 = prgStart + 0x4677;
console.log(`\n=== Scene16 $A677 block (252 bytes) ===`);
console.log(hex(buf.subarray(o677, o677 + 252)));

// Scene16 $A67B 段 252 字节
const o67b = prgStart + 0x467b;
console.log(`\n=== Scene16 $A67B block (252 bytes) ===`);
console.log(hex(buf.subarray(o67b, o67b + 252)));

// bank00 $8A14 tile 映射表（$88CA 查表，tile $A0-$FF → 值）
const o8a14 = prgStart + 0x0a14;
console.log(`\n=== bank00 $8A14 tile map (256 bytes) ===`);
console.log(hex(buf.subarray(o8a14, o8a14 + 256)));

// bank00 $8AF7 CHR config pointer table? 验证 bank00 内容: $8A06 填零例程（CPU $8A06 = PRG 0x0A06）
const o8a06 = prgStart + 0x0a06;
console.log(`\n=== bank00 $8A06 verify (expect 84 88 e0 48 ...) ===`);
console.log(hex(buf.subarray(o8a06, o8a06 + 24)));
