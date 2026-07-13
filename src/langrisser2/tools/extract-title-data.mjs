/**
 * 标题画面 VRAM/CRAM 数据提取
 *
 * 直接从 RAM dump 提取标题画面运行时的 VDP 状态
 * 不用模拟器跑, 纯静态分析
 *
 * 数据源:
 *   - Langrisser II (Japan)_68K-gens-ram-dump.ram (标题画面状态)
 *   - Langrisser II (Japan).md (原 ROM)
 *   - ghidra-decompile.c (反编译代码, 确认地址)
 *   - execution-trace.md (执行流程追踪)
 *
 * Gens 模拟器 RAM dump 格式 (68K 地址空间):
 *   0xFF0000 - 0xFFFFFF  64KB RAM (M68K 主内存)
 *   0xC00000 - 0xC0001F  VDP 寄存器 (但通常不包含在 dump 里)
 *   VRAM/CRAM/VSRAM 通常不直接在 68K 地址空间, 但 Gens dump 可能包含
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

// 读取 RAM dump
const ramPath = path.join(root, '20260713', 'Langrisser II (Japan)_68K-gens-ram-dump.ram');
const ram = fs.readFileSync(ramPath);
console.log('RAM dump 大小:', ram.length, '字节 (0x' + ram.length.toString(16) + ')');
console.log('RAM 范围: 0x' + (0xFF0000).toString(16) + ' - 0x' + (0xFF0000 + ram.length - 1).toString(16).toUpperCase());

// 读取 ROM dump
const romPath = path.join(root, '20260713', 'Langrisser II (Japan).md');
const rom = fs.readFileSync(romPath);
console.log('ROM 大小:', rom.length, '字节');

// ============================================================
// 分析 RAM dump 里的 VDP 相关数据
// ============================================================

// Gens RAM dump 通常只包含 68K 主内存 (0xFF0000-0xFFFFFF = 64KB)
// 但有些版本会扩展包含 VRAM/CRAM
// 先检查 dump 大小
if (ram.length > 0x10000) {
  console.log('\n=== RAM dump 包含扩展数据 ===');
  console.log('主内存: 0x0000-0xFFFF (64KB)');
  console.log('扩展数据: 0x10000-0x' + (ram.length - 1).toString(16));

  // 看看扩展数据是什么
  // Gens 格式: 通常 VRAM 紧跟在 64KB RAM 后
  // 偏移 0x10000 开始可能是 VRAM (64KB)
  const extStart = 0x10000;
  console.log('\n扩展数据前 64 字节:');
  for (let i = 0; i < 64; i += 16) {
    let hex = '';
    for (let j = 0; j < 16; j++) {
      hex += ram[extStart + i + j].toString(16).padStart(2, '0') + ' ';
    }
    console.log('  ' + (extStart + i).toString(16).padStart(6, '0') + ': ' + hex);
  }
}

// ============================================================
// 从 ROM 找标题画面相关数据
// ============================================================

// execution-trace.md 记录:
//   Reset: 0xC92C → FUN_0000c92c
//   标题画面: 0xC93A → FUN_0000c93a (任务函数)
//   游戏开始: 0xC9A0 → 部署界面
//   DMA 队列: FUN_00008a6c
//   VDP 寄存器配置: ROM 0x80B2 (24 字节)

// 1. 验证 ROM 0x80B2 的 VDP 寄存器配置
console.log('\n=== ROM 0x80B2: VDP 寄存器初始配置 (24 字节) ===');
const vdpInitRegs = Array.from(rom.slice(0x80B2, 0x80B2 + 24));
console.log('  ' + vdpInitRegs.map(b => '0x' + b.toString(16).padStart(2, '0').toUpperCase()).join(' '));

// 2. 从 RAM dump 找 VDP 寄存器运行时值
// Gens 把 VDP 寄存器存在 RAM dump 的特定偏移
// 通常在 0xFF0000+某偏移
// execution-trace.md 记录的关键地址:
//   DAT_ffff8004: 任务函数指针
//   DAT_ffff8010: 任务队列
//   DAT_ffff81cc: DMA 命令队列
//   DAT_ffff95a2: 标题画面参数指针 (值=0x05DF40)

console.log('\n=== RAM dump 关键地址 (标题画面状态) ===');

// DAT_ffff8004: 任务函数指针 (应在 RAM 偏移 0x8004)
const taskPtr = (ram[0x8004] << 24) | (ram[0x8005] << 16) | (ram[0x8006] << 8) | ram[0x8007];
console.log('  DAT_ffff8004 (任务指针): 0x' + taskPtr.toString(16).toUpperCase());

// DAT_ffff95a2: 标题画面参数指针 (应在 RAM 偏移 0x95a2)
const titleParam = (ram[0x95a2] << 24) | (ram[0x95a3] << 16) | (ram[0x95a4] << 8) | ram[0x95a5];
console.log('  DAT_ffff95a2 (标题画面参数): 0x' + titleParam.toString(16).toUpperCase());

// DAT_ffff81cc: DMA 队列 (应在 RAM 偏移 0x81cc)
console.log('  DAT_ffff81cc (DMA队列) 前 32 字节:');
for (let i = 0; i < 32; i += 16) {
  let hex = '';
  for (let j = 0; j < 16; j++) {
    hex += ram[0x81cc + i + j].toString(16).padStart(2, '0') + ' ';
  }
  console.log('    ' + (0x81cc + i).toString(16).padStart(4, '0') + ': ' + hex);
}

// 3. 从 ROM 找标题画面任务函数 FUN_0000c93a
// 看看它引用了哪些 ROM 地址 (可能是 tile/nametable/palette 数据)
console.log('\n=== ROM 0xC93A: 标题画面任务函数 FUN_0000c93a ===');
// 先看前 64 字节的机器码
for (let i = 0; i < 64; i += 16) {
  let hex = '';
  for (let j = 0; j < 16; j++) {
    hex += rom[0xC93A + i + j].toString(16).padStart(2, '0') + ' ';
  }
  console.log('  ' + (0xC93A + i).toString(16).padStart(6, '0') + ': ' + hex);
}
