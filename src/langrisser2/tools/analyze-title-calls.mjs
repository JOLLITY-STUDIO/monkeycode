/**
 * 分析标题画面任务函数 FUN_0000c93a 的调用链
 *
 * 从机器码提取 JSR 指令 (0x4EB9 + 4字节绝对地址)
 * 找出标题画面调用了哪些函数, 顺藤摸瓜找到数据加载点
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const rom = fs.readFileSync(path.join(root, '20260713', 'Langrisser II (Japan).md'));

// FUN_0000c93a: 标题画面任务函数
// 从 0xC93A 开始扫描, 找 JSR (4EB9) 和 JMP (4EF9) 指令
console.log('=== FUN_0000c93a 调用链分析 ===\n');

const funcStart = 0xC93A;
const funcEnd = 0xCA00; // 大致范围

console.log('函数机器码:');
for (let i = funcStart; i < funcEnd && i < funcStart + 256; i += 16) {
  let hex = '';
  let asc = '';
  for (let j = 0; j < 16 && i + j < funcEnd; j++) {
    const b = rom[i + j];
    hex += b.toString(16).padStart(2, '0') + ' ';
    asc += (b >= 0x20 && b <= 0x7E) ? String.fromCharCode(b) : '.';
  }
  console.log('  ' + i.toString(16).padStart(6, '0') + ': ' + hex.padEnd(48) + ' |' + asc + '|');
}

// 扫描 JSR (4EB9) 和 JMP (4EF9) 指令
console.log('\n调用指令:');
for (let i = funcStart; i < funcEnd - 5; i++) {
  if (rom[i] === 0x4E && (rom[i+1] === 0xB9 || rom[i+1] === 0xF9)) {
    const target = (rom[i+2] << 24) | (rom[i+3] << 16) | (rom[i+4] << 8) | rom[i+5];
    const targetLo = target & 0xFFFFFF;
    const op = rom[i+1] === 0xB9 ? 'JSR' : 'JMP';
    console.log('  ' + i.toString(16).padStart(6, '0') + ': ' + op + ' 0x' + targetLo.toString(16).toUpperCase().padStart(6, '0'));
  }
  // MOVE.L #imm,addr (0x33FC) - 立即数到地址
  if (rom[i] === 0x33 && rom[i+1] === 0xFC) {
    const imm = (rom[i+2] << 8) | rom[i+3];
    const addr = (rom[i+4] << 24) | (rom[i+5] << 16) | (rom[i+6] << 8) | rom[i+7];
    const addrLo = addr & 0xFFFFFF;
    console.log('  ' + i.toString(16).padStart(6, '0') + ': MOVE.L #0x' + imm.toString(16).toUpperCase().padStart(4, '0') + ',0x' + addrLo.toString(16).toUpperCase().padStart(6, '0'));
  }
  // MOVE.W #imm,addr (0x33C0 | reg) - 实际是 0x33FC 的 word 版本? 不对
  // LEA (0x41F9) + 4字节地址
  if (rom[i] === 0x41 && rom[i+1] === 0xF9) {
    const target = (rom[i+2] << 24) | (rom[i+3] << 16) | (rom[i+4] << 8) | rom[i+5];
    const targetLo = target & 0xFFFFFF;
    console.log('  ' + i.toString(16).padStart(6, '0') + ': LEA 0x' + targetLo.toString(16).toUpperCase().padStart(6, '0') + ',A0');
  }
}

// ============================================================
// 现在看看标题画面调用的几个关键函数
// ============================================================

// 从上面的分析, 我们看到:
//   0xC940: JSR 0x0000942a  (任务调度器)
//   0xC946: JSR 0x0000c7ec
//   0xC94C: JSR 0x0002cfc0
//   0xC962: JSR 0x0000942a  (再次调度)
//   0xC96A: JSR 0x0002cfc0

// 0x0002cfc0 看起来是个重要函数 (被调用两次)
// 0x0000c7ec 也很重要 (标题画面初始化)
console.log('\n=== FUN_0000c7ec (标题画面初始化?) ===');
for (let i = 0xC7EC; i < 0xC93A; i += 16) {
  let hex = '';
  for (let j = 0; j < 16 && i + j < 0xC93A; j++) {
    hex += rom[i + j].toString(16).padStart(2, '0') + ' ';
  }
  console.log('  ' + i.toString(16).padStart(6, '0') + ': ' + hex);
}

console.log('\n=== FUN_0000c7ec 调用指令 ===');
for (let i = 0xC7EC; i < 0xC93A - 5; i++) {
  if (rom[i] === 0x4E && (rom[i+1] === 0xB9 || rom[i+1] === 0xF9)) {
    const target = (rom[i+2] << 24) | (rom[i+3] << 16) | (rom[i+4] << 8) | rom[i+5];
    const targetLo = target & 0xFFFFFF;
    const op = rom[i+1] === 0xB9 ? 'JSR' : 'JMP';
    console.log('  ' + i.toString(16).padStart(6, '0') + ': ' + op + ' 0x' + targetLo.toString(16).toUpperCase().padStart(6, '0'));
  }
  if (rom[i] === 0x41 && rom[i+1] === 0xF9) {
    const target = (rom[i+2] << 24) | (rom[i+3] << 16) | (rom[i+4] << 8) | rom[i+5];
    const targetLo = target & 0xFFFFFF;
    console.log('  ' + i.toString(16).padStart(6, '0') + ': LEA 0x' + targetLo.toString(16).toUpperCase().padStart(6, '0') + ',A0');
  }
  // MOVE.L #imm,addr (33FC) 可能是 DMA 命令
  if (rom[i] === 0x33 && rom[i+1] === 0xFC) {
    const imm = (rom[i+2] << 8) | rom[i+3];
    const addr = (rom[i+4] << 24) | (rom[i+5] << 16) | (rom[i+6] << 8) | rom[i+7];
    const addrLo = addr & 0xFFFFFF;
    console.log('  ' + i.toString(16).padStart(6, '0') + ': MOVE.L #0x' + imm.toString(16).toUpperCase().padStart(4, '0') + ',0x' + addrLo.toString(16).toUpperCase().padStart(6, '0'));
  }
}

// 0x0002cfc0 - 可能是渲染相关
console.log('\n=== FUN_0002cfc0 (渲染相关?) 前 128 字节 ===');
for (let i = 0x2CFC0; i < 0x2CFC0 + 128; i += 16) {
  let hex = '';
  for (let j = 0; j < 16; j++) {
    hex += rom[i + j].toString(16).padStart(2, '0') + ' ';
  }
  console.log('  ' + i.toString(16).padStart(6, '0') + ': ' + hex);
}
