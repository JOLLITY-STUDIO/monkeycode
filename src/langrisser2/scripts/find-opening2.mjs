/**
 * 深入分析开场动画:
 * 1. 追踪 tag 0x2A/0x2B 的使用 (OPENING1/OPENING2)
 * 2. 分析 0xCA34 路径 (flag 0xFF78FA != 0 时的开场流程)
 * 3. 提取开场动画资源
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROM_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_68K-gens-rom-dump.bin');
const rom = fs.readFileSync(ROM_PATH);

function rb(o) { return rom[o] & 0xff; }
function rw(o) { return ((rom[o] & 0xff) << 8) | (rom[o + 1] & 0xff); }
function rl(o) { return ((rom[o] & 0xff) << 24) | ((rom[o + 1] & 0xff) << 16) | ((rom[o + 2] & 0xff) << 8) | (rom[o + 3] & 0xff); }

function decompressLZSS(resourceAddr) {
  const decompressedSize = rw(resourceAddr + 1);
  const compressedDataStart = resourceAddr + 3;
  const window = new Uint8Array(0x1000).fill(0x20);
  let windowPos = 0x0fee;
  let remaining = decompressedSize;
  const output = new Uint8Array(decompressedSize);
  let outputPos = 0;
  let compressedPos = compressedDataStart;
  while (remaining > 0) {
    const flagByte = rb(compressedPos++);
    for (let bit = 0; bit < 8 && remaining > 0; bit++) {
      const isLiteral = (flagByte >> bit) & 1;
      if (isLiteral) {
        const byte = rb(compressedPos++);
        window[windowPos] = byte;
        output[outputPos++] = byte;
        windowPos = (windowPos + 1) & 0xfff;
        remaining--;
      } else {
        const b1 = rb(compressedPos++);
        const b2 = rb(compressedPos++);
        let matchOffset = (b1 | ((b2 & 0xf0) << 4)) & 0xfff;
        const matchLength = (b2 & 0x0f) + 2;
        for (let i = 0; i < matchLength && remaining > 0; i++) {
          const byte = window[matchOffset];
          window[windowPos] = byte;
          output[outputPos++] = byte;
          matchOffset = (matchOffset + 1) & 0xfff;
          windowPos = (windowPos + 1) & 0xfff;
          remaining--;
        }
      }
    }
  }
  return output;
}

console.log('=== 1. 搜索 tag 0x2A/0x2B (OPENING1/2) 的使用 ===');
// 搜索 MOVEQ #0x2A, Dn 或 MOVE.B #0x2A
// MOVEQ #imm, Dn: 0x70xx where xx = 0x2A | (reg << 9)
for (let i = 0; i < rom.length - 2; i++) {
  const w = rw(i);
  // MOVEQ #0x2A, Dn: 0x702A | (reg << 9)
  if ((w & 0xF1FF) === 0x702A) {
    const reg = (w >> 9) & 7;
    console.log(`  ROM 0x${i.toString(16)}: MOVEQ #0x2A, D${reg} (OPENING1 tag)`);
  }
  // MOVEQ #0x2B, Dn: 0x702B | (reg << 9)
  if ((w & 0xF1FF) === 0x702B) {
    const reg = (w >> 9) & 7;
    console.log(`  ROM 0x${i.toString(16)}: MOVEQ #0x2B, D${reg} (OPENING2 tag)`);
  }
}

// 也搜索 CMPI.B #0x2A 和 CMPI.B #0x2B
for (let i = 0; i < rom.length - 4; i++) {
  const w = rw(i);
  // CMPI.B #imm, Dn: 0x0C00 | (reg << 9)
  if ((w & 0xF1F0) === 0x0C00) {
    const imm = rw(i + 2);
    if (imm === 0x2A) {
      const reg = (w >> 9) & 7;
      console.log(`  ROM 0x${i.toString(16)}: CMPI.B #0x2A, D${reg} (OPENING1 compare)`);
    }
    if (imm === 0x2B) {
      const reg = (w >> 9) & 7;
      console.log(`  ROM 0x${i.toString(16)}: CMPI.B #0x2B, D${reg} (OPENING2 compare)`);
    }
  }
  // CMPI.W #imm, Dn: 0x0C40 | (reg << 9)
  if ((w & 0xF1F0) === 0x0C40) {
    const imm = rw(i + 2);
    if (imm === 0x2A) {
      const reg = (w >> 9) & 7;
      console.log(`  ROM 0x${i.toString(16)}: CMPI.W #0x2A, D${reg} (OPENING1 compare)`);
    }
    if (imm === 0x2B) {
      const reg = (w >> 9) & 7;
      console.log(`  ROM 0x${i.toString(16)}: CMPI.W #0x2B, D${reg} (OPENING2 compare)`);
    }
  }
}

console.log('\n=== 2. 分析 0xFB5C/0xFB70 (Z80 音乐命令) ===');
// 这些函数在任务 0xC92C 中被调用
// 可能用 tag 作为参数发送给 Z80
for (let addr of [0xFB5C, 0xFB70]) {
  console.log(`\n--- 0x${addr.toString(16)} ---`);
  for (let i = 0; i < 32; i++) {
    const b = rb(addr + i);
    process.stdout.write(b.toString(16).padStart(2, '0') + ' ');
    if ((i + 1) % 16 === 0) console.log();
  }
}

// 搜索 MOVE.B #0x2A, (addr) 或 MOVE.W #0x2A, (addr)
// 标签可能被写入 RAM 某个地址来触发场景切换
console.log('\n=== 3. 搜索 MOVE.W #0x2A/#0x2B 写入 RAM ===');
for (let i = 0; i < rom.length - 8; i++) {
  const w = rw(i);
  // MOVE.W #imm, (abs).L: 0x33FC [2B imm] [4B addr]
  if (w === 0x33FC) {
    const imm = rw(i + 2);
    if (imm === 0x2A || imm === 0x2B) {
      const dst = rl(i + 4);
      console.log(`  ROM 0x${i.toString(16)}: MOVE.W #0x${imm.toString(16)}, 0x${dst.toString(16)}`);
    }
  }
  // MOVE.B #imm, (abs).L: 0x11FC [2B imm] [4B addr]
  if (w === 0x11FC) {
    const imm = rw(i + 2);
    if (imm === 0x2A || imm === 0x2B) {
      const dst = rl(i + 4);
      console.log(`  ROM 0x${i.toString(16)}: MOVE.B #0x${imm.toString(16)}, 0x${dst.toString(16)}`);
    }
  }
}

console.log('\n=== 4. 分析任务链 0xCA34 (开场动画路径) ===');
// 当 0xFF78FA != 0 时走这条路
// 这可能是 skipTitle 标志或首次启动标志
console.log('任务 0xCA34:');
console.log('  0xCA32: MOVE.L #0x10001, 0xFFFFA4A0 (设置标志)');
console.log('  0xCA3E: JSR 0x9EC4 (场景初始化)');
console.log('  0xCA40: JSR 0x11E3A (未知)');
console.log('  0xCA46: BSR 0x10AEE (未知)');
console.log('  0xCA4A: JSR 0x14D5E (未知)');
console.log('  0xCA50: BSR 0x19174 (未知)');
console.log('  0xCA54: BSR 0x19022 (未知)');
console.log('  0xCA58: JSR 0xC7AE (VDP设置)');
console.log('  0xCA5E: → 切换到任务 0xCA68');
console.log('  0xCA68: 加载资源 0x8001 → VRAM 0');
console.log('  0xCA76: → 切换到任务 0xCA8A');
console.log('  0xCA8A: → 切换到任务 0xCA9E (等待帧)');
console.log('  0xCA9E: JSR 0x11D7A (场景逻辑)');
console.log('  0xCAA4: MOVE.W #1, 0xFFFFA5F0 (设置标志)');
console.log('  0xCAAC: BSR 0xCC50 (场景设置)');

console.log('\n=== 5. 提取开场动画资源 ===');
// 资源 0x8001 = index 1 → ROM 0x0B0A84
console.log('资源 0x8001 (Entry 1):');
const ptr1 = rl(0x0B0000 + 1 * 4);
console.log(`  指针: 0x${ptr1.toString(16)}`);
const data1 = decompressLZSS(ptr1);
console.log(`  解压大小: ${data1.length}B (${data1.length / 32} tiles)`);

// 资源 0x8002 = index 2 → 可能是开场动画帧
console.log('\n资源 0x8002 (Entry 2):');
const ptr2 = rl(0x0B0000 + 2 * 4);
console.log(`  指针: 0x${ptr2.toString(16)}`);
const data2 = decompressLZSS(ptr2);
console.log(`  解压大小: ${data2.length}B (${data2.length / 32} tiles)`);

// 资源 0x8000 = index 0
console.log('\n资源 0x8000 (Entry 0):');
const ptr0 = rl(0x0B0000 + 0 * 4);
console.log(`  指针: 0x${ptr0.toString(16)}`);
const data0 = decompressLZSS(ptr0);
console.log(`  解压大小: ${data0.length}B (${data0.length / 32} tiles)`);

// 检查更多资源
console.log('\n=== 6. 所有资源概览 (Entry 0-30) ===');
for (let i = 0; i < 30; i++) {
  const ptr = rl(0x0B0000 + i * 4);
  if (ptr === 0 || ptr >= rom.length) break;
  const flag = rb(ptr);
  if (flag === 3) {
    const size = rw(ptr + 1);
    console.log(`  Entry ${i}: 0x${ptr.toString(16)}, LZSS, decompSize=${size}B (${size / 32} tiles)`);
  } else if (flag === 1) {
    const size = rw(ptr + 1);
    console.log(`  Entry ${i}: 0x${ptr.toString(16)}, RLE, decompSize=${size}B`);
  } else {
    console.log(`  Entry ${i}: 0x${ptr.toString(16)}, type=${flag}`);
  }
}

console.log('\n=== 7. 分析 0x9EC4 (场景初始化函数) ===');
console.log('ROM 0x9EC4 代码:');
for (let i = 0; i < 64; i++) {
  const addr = 0x9EC4 + i;
  const b = rb(addr);
  process.stdout.write(b.toString(16).padStart(2, '0') + ' ');
  if ((i + 1) % 16 === 0) console.log();
}

console.log('\n=== 8. 分析 0xCC50 (场景设置函数) ===');
console.log('ROM 0xCC50 代码:');
for (let i = 0; i < 64; i++) {
  const addr = 0xCC50 + i;
  const b = rb(addr);
  process.stdout.write(b.toString(16).padStart(2, '0') + ' ');
  if ((i + 1) % 16 === 0) console.log();
}

console.log('\n=== 9. 搜索 0xFF78FA 标志的设置位置 ===');
// 这个标志决定走标题画面还是开场动画
// 搜索 MOVE.W #xx, 0xFF78FA
for (let i = 0; i < rom.length - 8; i++) {
  const w = rw(i);
  if (w === 0x33FC || w === 0x31FC) {
    const imm = rw(i + 2);
    const dst = rl(i + 4);
    if (dst === 0xFF78FA) {
      console.log(`  ROM 0x${i.toString(16)}: MOVE.W #0x${imm.toString(16)}, 0xFF78FA`);
    }
  }
  // MOVEQ #x, Dn; MOVE.W Dn, (abs)
  // CLR.W (abs): 0x4279
  if (w === 0x4279) {
    const dst = rl(i + 2);
    if (dst === 0xFF78FA) {
      console.log(`  ROM 0x${i.toString(16)}: CLR.W 0xFF78FA (清零=走标题画面)`);
    }
  }
}

console.log('\n=== 10. 分析 0xC92C (初始任务) 中的 BSR 0xFB5C ===');
// 0xC92C: 61 00 32 2C → BSR.W target
// target = 0xC92C + 2 + 2 + 0x322C = 0xFB52
// 实际上 0x6100 322C → offset = 0x322C
// target = 0xC930 + 0x322C = 0xFB5C
console.log('0xC92C 调用 BSR.W → 0xFB5C');
console.log('0xC964 调用 BSR.W → 0xFB70');
console.log('这些可能是 Z80 音乐命令发送函数');

// 分析 0xFB5C
console.log('\n0xFB5C 代码 (Z80命令发送):');
let pc = 0xFB5C;
for (let i = 0; i < 48; i++) {
  const b = rb(pc + i);
  process.stdout.write(b.toString(16).padStart(2, '0') + ' ');
  if ((i + 1) % 16 === 0) console.log();
}

// 分析 0xFB70
console.log('\n0xFB70 代码 (Z80命令发送):');
pc = 0xFB70;
for (let i = 0; i < 48; i++) {
  const b = rb(pc + i);
  process.stdout.write(b.toString(16).padStart(2, '0') + ' ');
  if ((i + 1) % 16 === 0) console.log();
}

console.log('\n=== 11. 检查 Entry 0 (1568B = 49 tiles) ===');
// Entry 0: 1568B, 49 tiles (7x7)
// 这可能是 Sega Logo 或第一帧开场动画
console.log('Entry 0 数据 (前 128 字节):');
for (let i = 0; i < 128; i++) {
  process.stdout.write(data0[i].toString(16).padStart(2, '0') + ' ');
  if ((i + 1) % 16 === 0) console.log();
}

// 解码 Entry 0 的第一个 tile
console.log('\nEntry 0 Tile 0 (8x8):');
for (let y = 0; y < 8; y++) {
  let row = '';
  for (let x = 0; x < 8; x++) {
    const rowBase = y * 4;
    const p0 = data0[rowBase];
    const p1 = data0[rowBase + 1];
    const p2 = data0[rowBase + 2];
    const p3 = data0[rowBase + 3];
    const bit = 7 - x;
    const pixel =
      ((p0 >> bit) & 1) |
      ((p1 >> bit) & 1) << 1 |
      ((p2 >> bit) & 1) << 2 |
      ((p3 >> bit) & 1) << 3;
    row += pixel ? pixel.toString(16) : '.';
  }
  console.log(row);
}
