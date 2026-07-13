/**
 * 分析标题画面参数表 (ROM 0x05DF40)
 *
 * execution-trace.md 记录:
 *   FUN_0000c93a 中 LEA 0x05DF40 → DAT_ffff95a2 (标题画面参数指针)
 *
 * 这个参数表应该包含标题画面需要加载的所有资源信息
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url).replace(/^\//, ''));
const root = path.resolve(__dirname, '..');

const romPath = path.resolve(root, '20260713/Langrisser II (Japan)_68K-gens-rom-dump.bin');
const rom = new Uint8Array(fs.readFileSync(romPath));

function readByte(off) { return rom[off] & 0xff; }
function readWord(off) { return ((rom[off] & 0xff) << 8) | (rom[off + 1] & 0xff); }
function readLong(off) {
  return (
    ((rom[off] & 0xff) << 24) |
    ((rom[off + 1] & 0xff) << 16) |
    ((rom[off + 2] & 0xff) << 8) |
    (rom[off + 3] & 0xff)
  );
}

function hexDump(start, length, label = '') {
  console.log(`\n--- ${label} (0x${start.toString(16)} - 0x${(start + length).toString(16)}) ---`);
  for (let i = 0; i < length; i += 16) {
    const addr = (start + i).toString(16).padStart(6, '0');
    const bytes = [];
    const chars = [];
    for (let j = 0; j < 16 && i + j < length; j++) {
      const b = readByte(start + i + j);
      bytes.push(b.toString(16).padStart(2, '0'));
      chars.push(b >= 32 && b < 127 ? String.fromCharCode(b) : '.');
    }
    console.log(`  ${addr}: ${bytes.join(' ').padEnd(48)} ${chars.join('')}`);
  }
}

console.log('=== 标题画面参数表分析 ===\n');

// 1. 查看 ROM 0x05DF40 附近的数据
hexDump(0x05DF00, 256, 'ROM 0x05DF00 (标题画面参数表附近)');

// 2. 看看 FUN_0000c93a 到 FUN_0000c9a0 之间的代码
//    已知: FUN_0000c93a 设置 DAT_ffff95a2 = 0x05DF40
//    然后设置 DAT_ffff95a6 = 2, DAT_ffff95a8 = 0xF
//    最后设置 DAT_ffff8004 = FUN_0000c9a0 (下一任务)

console.log('\n=== FUN_0000c9a0 调用的函数 ===');
console.log('从反汇编结果看，FUN_0000c9a0 调用了:');
console.log('  0xC9A0: JSR 0xC7EC     (VDP 寄存器设置)');
console.log('  0xC9C2: JSR 0xC914     (加载资源 0x8001)');
console.log('  0xC9C8: JSR 0x10ABE    (? )');
console.log('  0xC9CE: JSR 0x10FDE    (? )');
console.log('  0xC9D4: JSR 0x1105C    (? )');
console.log('  0xC9DA: JSR 0x110A8    (? )');
console.log('  0xC9E0: BSR 0xCC4E     (? )');
console.log('  ...');

// 3. 让我们看看 FUN_0000c9a0 后续的代码，找更多资源加载
//    先把 FUN_0000c9a0 到 0xCA80 都 hex dump 出来
hexDump(0xC9A0, 200, 'FUN_0000c9a0 (机器码)');

// 4. 搜索 FUN_0000c9a0 周围所有 0x4EB9 (JSR.L) 指令
console.log('\n=== FUN_0000c9a0 附近的 JSR.L 调用 ===');
for (let i = 0xC9A0; i < 0xCB00; i++) {
  if (rom[i] === 0x4E && rom[i + 1] === 0xB9) {
    const target = readLong(i + 2);
    console.log(`  [0x${i.toString(16).padStart(6, '0')}] JSR 0x${target.toString(16).padStart(8, '0')}`);
  }
}

// 5. 让我们看看 DAT_ffff95a2 (参数表指针) 指向的 0x05DF40 结构
//    既然 FUN_0000c93a 设置了 DAT_ffff95a2=0x05DF40, DAT_ffff95a6=2, DAT_ffff95a8=0xF
//    0x95a6=2 和 0x95a8=0xF 可能是资源数量之类的参数
console.log('\n=== 参数表结构推测 ===');
console.log('DAT_ffff95a2 = 0x05DF40 (参数表指针)');
console.log('DAT_ffff95a6 = 0x0002 (参数1)');
console.log('DAT_ffff95a8 = 0x000F (参数2 = 15)');
console.log('');

// 把参数表按 4 字节一组打印出来，看看是不是指针
console.log('参数表 0x05DF40 按 long 解析:');
for (let i = 0; i < 64; i += 4) {
  const addr = 0x05DF40 + i;
  const val = readLong(addr);
  // 判断是不是 ROM 指针 (0x000xxxxx 范围)
  let note = '';
  if (val >= 0x00000000 && val <= 0x001FFFFF && val !== 0) {
    note = '  ← ROM 指针?';
  }
  console.log(`  [0x${addr.toString(16)}] 0x${val.toString(16).padStart(8, '0')}${note}`);
}

console.log('\n=== 分析完成 ===');
