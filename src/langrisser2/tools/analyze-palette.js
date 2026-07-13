/**
 * 分析 FUN_0000a78c - 可能是 CRAM/调色板加载函数
 * 以及它在标题画面中的调用
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url).replace(/^\//, ''));
const root = path.resolve(__dirname, '..');

const romPath = path.resolve(root, '20260713/Langrisser II (Japan)_68K-gens-rom-dump.bin');
const romData = new Uint8Array(fs.readFileSync(romPath));

function r8(off) { return romData[off] & 0xff; }
function r16(off) { return ((romData[off] & 0xff) << 8) | (romData[off + 1] & 0xff); }
function r32(off) {
  return (
    ((romData[off] & 0xff) << 24) |
    ((romData[off + 1] & 0xff) << 16) |
    ((romData[off + 2] & 0xff) << 8) |
    (romData[off + 3] & 0xff)
  );
}

function hexDump(start, length) {
  const lines = [];
  for (let row = 0; row < length; row += 16) {
    const off = start + row;
    let hex = '';
    let ascii = '';
    for (let col = 0; col < 16; col++) {
      const b = r8(off + col);
      hex += b.toString(16).padStart(2, '0').toUpperCase() + ' ';
      ascii += (b >= 32 && b < 127) ? String.fromCharCode(b) : '.';
    }
    lines.push(`  ${off.toString(16).padStart(6, '0')}: ${hex} |${ascii}|`);
  }
  return lines.join('\n');
}

console.log('=== FUN_0000ca28 周围代码 (调用 FUN_0000a78c) ===\n');
console.log(hexDump(0xca00, 128));
console.log('');

// 手动分析 ca00-ca30:
// ca00: 7001       MOVEQ #1, D0
// ca02: 4eb9 0001 1c44  JSR $00011C44
// ca08: 6700 00de  BEQ.S $cae8? 不对，6700 是 BEQ.W?
// 等等，让我仔细数...

// ca00: 70 01          = MOVEQ #1, D0
// ca02: 4E B9 00 01 1C 44 = JSR $00011C44
// ca08: 67 00 00 DE    = BEQ.B $cae8? 不对，67 是 BEQ，00DE 是偏移?

console.log('手动分析 FUN_0000ca00:');
console.log('  ca00: 7001          MOVEQ #1, D0');
console.log('  ca02: 4eb9 00011c44 JSR $00011C44');
console.log('  ca08: 6700 00de     BEQ.W $cae8');
console.log('  ca0c: 21c0 a8d0     MOVE.L D0, ($FFFFA8D0).L');
console.log('  ca10: 4eb9 00011812 JSR $00011812');
console.log('  ca16: 6700 00d0     BEQ.W $cae8');
console.log('  ca1a: 2040          MOVE.L D0, D0  (不对, 2040 是 MOVEA.L D0, A0?)');
console.log('  ca1c: 7800          MOVEQ #0, D4? 不对，78xx 是 MOVEQ?');
console.log('');

// 让我看看 FUN_0000a78c 本身
console.log('=== FUN_0000a78c (可能是 CRAM 写入函数) ===\n');
console.log(hexDump(0xa78c, 96));
console.log('');

// 另外，看看 RAM dump 中 0xffffa8d0 附近的值
// 这可能是调色板数据指针

console.log('=== 搜索标题画面调色板数据 ===\n');

// 标题画面应该有:
// - 蓝色背景 (天空)
// - 金色 "LANGRESSER" 或 "梦幻模拟战" 文字
// - 一些装饰性颜色

// 让我在 ROM 中搜索一些可能是调色板的数据
// Genesis 调色板格式: 每色 2 字节, 0x0RGB (4 位每通道)
// 常见颜色:
//   黑色: 0x0000
//   白色: 0x0EEE
//   蓝色: 0x000E, 0x004E, 0x008E, 0x00CE
//   金色: 0x0EE0, 0x0EC0, 0x0EA0, 0x0E80

// 在 0x05DF40 附近我们看到了一些数据
// 让我们看看 0x05DF40 前后更大范围

console.log('0x05DC00 - 0x05E000 区域:');
console.log(hexDump(0x05dc00, 256));
console.log('');
console.log(hexDump(0x05dd00, 256));
console.log('');
console.log(hexDump(0x05de00, 256));
console.log('');

// 另外，让我看看 FUN_0000c9a0 调用的几个子函数
// FUN_00010abe, FUN_00010fde, FUN_0001105c, FUN_000110a8
// 这些可能是设置不同层的资源的

console.log('=== FUN_00010abe 开头 ===\n');
console.log(hexDump(0x10abe, 64));
console.log('');

console.log('=== FUN_00010fde 开头 ===\n');
console.log(hexDump(0x10fde, 64));
console.log('');

console.log('=== FUN_0001105c 开头 ===\n');
console.log(hexDump(0x1105c, 64));
console.log('');

console.log('=== FUN_000110a8 开头 ===\n');
console.log(hexDump(0x110a8, 64));
