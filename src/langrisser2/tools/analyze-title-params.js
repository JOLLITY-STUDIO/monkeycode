/**
 * 分析标题画面参数表 (0x05DF40)
 * FUN_0000c93a 设置 DAT_ffff95a2 = 0x05DF40
 *
 * 这个表可能包含:
 *   - 资源 ID 列表
 *   - 目标 VRAM 地址
 *   - 显示参数
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

const ADDR = 0x05DF40;

console.log('=== 标题画面参数表分析 (0x05DF40) ===\n');

// 先打印 256 字节的 hex dump
console.log('Hex dump (256 bytes):');
for (let row = 0; row < 16; row++) {
  const off = ADDR + row * 16;
  let hex = '';
  let ascii = '';
  for (let col = 0; col < 16; col++) {
    const b = r8(off + col);
    hex += b.toString(16).padStart(2, '0').toUpperCase() + ' ';
    ascii += (b >= 32 && b < 127) ? String.fromCharCode(b) : '.';
  }
  console.log(`  0x${off.toString(16).padStart(6, '0')}: ${hex} |${ascii}|`);
}
console.log('');

// 尝试解释为 32-bit 指针表
console.log('解释为 32-bit 大端指针:');
for (let i = 0; i < 32; i++) {
  const off = ADDR + i * 4;
  const ptr = r32(off);
  const inRom = ptr >= 0 && ptr < romData.length;
  const mark = inRom ? '(ROM内)' : '';
  console.log(`  [${i}] 0x${ptr.toString(16).padStart(8, '0')} ${mark}`);
}
console.log('');

// 尝试解释为 16-bit 字表
console.log('解释为 16-bit 大端字:');
for (let i = 0; i < 32; i++) {
  const off = ADDR + i * 2;
  const val = r16(off);
  console.log(`  [${i}] 0x${val.toString(16).padStart(4, '0')} = ${val}`);
}
console.log('');

// 看看 DAT_ffff95a2 附近还有什么相关地址
// 根据 FUN_0000c93a:
//   0x05DF40 → DAT_ffff95a2
//   0x0002 → DAT_ffff95a6
//   0x000F → DAT_ffff95a8
console.log('=== 相关变量 ===');
console.log('DAT_ffff95a2 (指针) = 0x05DF40');
console.log('DAT_ffff95a6 (word) = 0x0002');
console.log('DAT_ffff95a8 (word) = 0x000F');
console.log('');

// 看看 0x05DF40 附近的函数引用
// 搜索所有引用 0x05DF40 的地方
console.log('=== 搜索引用 0x05DF40 的代码 ===');

const refs = [];
for (let i = 0; i < romData.length - 4; i += 2) {
  // LEA (0x05DF40).L, An = 0x4nF9 xxxxxxxx
  if (r16(i) === 0x41F9 && r32(i + 2) === 0x05DF40) {
    refs.push({ addr: i, type: 'LEA (05DF40).L, A0' });
  }
  if (r16(i) === 0x43F9 && r32(i + 2) === 0x05DF40) {
    refs.push({ addr: i, type: 'LEA (05DF40).L, A1' });
  }
  // MOVE.L #05DF40, xxx
  if (r16(i) === 0x23FC && r32(i + 2) === 0x05DF40) {
    refs.push({ addr: i, type: 'MOVE.L #05DF40, (abs).L' });
  }
}

console.log(`找到 ${refs.length} 个引用:\n`);
for (const ref of refs) {
  console.log(`  [0x${ref.addr.toString(16).padStart(6, '0')}] ${ref.type}`);
}

console.log('\n=== 分析完成 ===');
