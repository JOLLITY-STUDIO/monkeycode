/**
 * 手动反汇编标题画面关键函数
 * 直接输出 hex 和简单的指令识别
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
    for (let col = 0; col < 16; col++) {
      const b = r8(off + col);
      hex += b.toString(16).padStart(2, '0').toUpperCase() + ' ';
    }
    lines.push(`  ${off.toString(16).padStart(6, '0')}: ${hex}`);
  }
  return lines.join('\n');
}

console.log('=== FUN_0000c914 详细 hex ===\n');
console.log(hexDump(0xc914, 32));
console.log('');

console.log('=== FUN_0000c9a0 详细 hex ===\n');
console.log(hexDump(0xc9a0, 128));
console.log('');

console.log('=== FUN_0000ca00 详细 hex ===\n');
console.log(hexDump(0xca00, 128));
console.log('');

// 手动分析 FUN_0000c914
console.log('=== FUN_0000c914 手动分析 ===\n');

// 0xc914: 48e7 8040 = MOVEM.L D7/A6, -(A7)  -- 保存寄存器
// 0xc918: 2004       = MOVE.L D4, D0           -- D0 = D4 (资源ID?)
// 0xc91a: 323c 8001 = MOVE.W #$8001, D1        -- D1 = 0x8001
// 0xc91e: 4eb9 0000 99b2 = JSR $000099B2      -- 调用 LoadResource
// 0xc924: 4cdf 8040 = MOVEM.L (A7)+, D7/A6    -- 恢复寄存器
// 0xc928: 4e75       = RTS

console.log('FUN_0000c914:');
console.log('  0xc914: MOVEM.L D7/A6, -(A7)  ; 保存寄存器');
console.log('  0xc918: MOVE.L D4, D0         ; D0 = D4 (参数传入)');
console.log('  0xc91a: MOVE.W #$8001, D1     ; D1 = 0x8001 (资源ID基准?)');
console.log('  0xc920: JSR $000099B2         ; 调用资源加载函数');
console.log('  0xc926: MOVEM.L (A7)+, D7/A6  ; 恢复寄存器');
console.log('  0xc92a: RTS');
console.log('');
console.log('注意: 这是从我们的简易反汇编推断的，可能不完全准确');
console.log('');

// 看看 FUN_000099b2 的前几条指令
console.log('=== FUN_000099b2 开头 (LoadResource) ===\n');
console.log(hexDump(0x99b2, 64));
console.log('');

// 看看 FUN_0000ca68
console.log('=== FUN_0000ca68 详细 hex ===\n');
console.log(hexDump(0xca68, 64));
console.log('');

// FUN_0000ca68 分析:
// 0xca68: 2004       = MOVE.L D4, D0
// 0xca6a: 303c 8001 = MOVE.W #$8001, D0  -- 等等，这不对
// 让我重新数...

// ca68: 2004       = MOVE.L D4, D0
// ca6a: 7201       = MOVEQ #1, D1
// ca6c: 4eb9 000099b2 = JSR $99b2
// ...

console.log('=== FUN_0000ca68 手动分析 ===\n');
console.log('  ca68: 2004        MOVE.L D4, D0');
console.log('  ca6a: 7201        MOVEQ #1, D1');
console.log('  ca6c: 4eb9 000099b2 JSR $99b2');
console.log('  ca72: 21fc 0000 ca8a ... MOVE.L #$0000CA8A, ($FFFF8004).L ?');
console.log('');

// 搜索调色板数据 - 0x05DF40 附近
console.log('=== 0x05DF40 附近数据 (可能是调色板) ===\n');
console.log(hexDump(0x05df40, 256));
console.log('');

// 从 0x05DF40 开始的前 192 字节是 0 (可能是未使用的调色板)
// 从 0x05DFC0 开始是 0EEE (白色)
// 但这可能是默认值，实际调色板可能在别处

// 搜索一些常见的调色板模式
// 比如 0000 (黑色), 0EEE (白色), 000E (蓝色) 等的组合
console.log('=== 搜索包含彩色数据的区域 ===\n');

// 在 0x05DF40 前后搜索
// 看看 0x05E000 之后
console.log('0x05E100 - 0x05E300:');
console.log(hexDump(0x05e100, 512));
