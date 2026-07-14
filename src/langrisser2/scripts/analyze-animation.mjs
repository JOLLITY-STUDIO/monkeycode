/**
 * 分析游戏动画机制:
 * 1. 任务函数指针链 (场景状态机)
 * 2. HBLANK 中断中的 CRAM 写入 (行间调色板动画)
 * 3. 调色板渐变/淡入淡出
 * 4. 开场动画资源
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROM_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_68K-gens-rom-dump.bin');
const rom = fs.readFileSync(ROM_PATH);

function readByte(o) { return rom[o] & 0xff; }
function readWord(o) { return ((rom[o] & 0xff) << 8) | (rom[o + 1] & 0xff); }
function readLong(o) { return ((rom[o] & 0xff) << 24) | ((rom[o + 1] & 0xff) << 16) | ((rom[o + 2] & 0xff) << 8) | (rom[o + 3] & 0xff); }

console.log('=== 1. 任务函数指针链分析 ===');
console.log('初始任务: 0x0000C92C');

// 读取 0xC92C 处的代码
console.log('\n--- ROM 0xC92C 代码 (任务调度入口) ---');
for (let i = 0; i < 32; i++) {
  const addr = 0xC92C + i;
  const b = readByte(addr);
  process.stdout.write(b.toString(16).padStart(2, '0') + ' ');
  if ((i + 1) % 16 === 0) console.log();
}

// 搜索所有 DAT_ffff8004 赋值 (任务切换点)
console.log('\n=== 2. 场景切换点 (JSR FUN_000085ee 调用) ===');
// FUN_000085ee 的机器码是 4EB9 0000 85EE (JSR absolute)
// 或者 61xx (BSR)
// 搜索 0x4E B9 00 00 85 EE 模式
const taskSwitches = [];
for (let i = 0; i < rom.length - 6; i++) {
  if (readWord(i) === 0x4EB9 && readLong(i + 2) === 0x000085EE) {
    // 找到 JSR FUN_000085ee, 查看前面的 MOVE.L #addr, DAT_ffff8004
    // 模式: 2x79 00 FF 80 04 [addr] 或 23 FC [addr] 00 FF 80 04
    for (let j = Math.max(0, i - 20); j < i; j++) {
      // MOVE.L #imm, (abs).l: 23 FC [4B addr] [4B dest]
      if (readWord(j) === 0x23FC && readLong(j + 6) === 0x00FF8004) {
        const taskAddr = readLong(j + 2);
        taskSwitches.push({ jsrAddr: i, taskAddr, moveAddr: j });
        break;
      }
      // MOVEQ #x, D0; MOVE.L D0, (abs).l
      // LEA xx(PC), An; MOVE.L An, (abs).l
    }
  }
}

console.log('场景切换地址:');
for (const t of taskSwitches) {
  console.log(`  ROM 0x${t.jsrAddr.toString(16)}: → 任务 0x${t.taskAddr.toString(16)} (MOVE.L at 0x${t.moveAddr.toString(16)})`);
}

console.log('\n=== 3. HBLANK 中断中的 CRAM 写入 ===');
console.log('HBLANK 处理程序: ROM 0x84B8');
console.log('关键代码分析:');
console.log('  DAT_ffff815e = 扫描行计数器');
console.log('  从扫描行 0x82 开始, 每2行写一次 CRAM');
console.log('  CRAM 数据源: RAM 0xFFFF9562, RAM 0xFFFF9664');
console.log('  写入地址: CRAM 0x40+ (调色板2的某些颜色)');

console.log('\n--- HBLANK 代码 (0x84B8) ---');
for (let i = 0; i < 64; i++) {
  const addr = 0x84B8 + i;
  const b = readByte(addr);
  process.stdout.write(b.toString(16).padStart(2, '0') + ' ');
  if ((i + 1) % 16 === 0) console.log();
}

console.log('\n=== 4. CRAM DMA 命令分析 ===');
// 搜索 CRAM DMA 命令 (0xFFFA)
console.log('搜索 ROM 中的 CRAM DMA 命令模式 (0xFFFA):');
let cramDmaCount = 0;
for (let i = 0; i < rom.length - 10; i++) {
  if (readWord(i) === 0xFFFA) {
    cramDmaCount++;
    if (cramDmaCount <= 10) {
      const target = readWord(i + 2);
      const source = readLong(i + 4);
      const length = readWord(i + 8);
      console.log(`  ROM 0x${i.toString(16)}: cmd=0xFFFA, target=0x${target.toString(16)}, source=0x${source.toString(16)}, len=${length}`);
    }
  }
}
console.log(`总 CRAM DMA 命令: ${cramDmaCount}`);

console.log('\n=== 5. 搜索调色板渐变/淡入淡出代码 ===');
// 搜索 CRAM 写入模式 (VDP_DATA 写入 CRAM 地址)
// 模式: 设置 CRAM 写地址 (0xC000 + addr << 8 | 0x03) 然后写数据
console.log('搜索 VDP CRAM 地址设置指令 (0x8F00-0x8FFF range):');
// MOVE.W #0x8Cxx, VDP_CTRL 或 MOVE.W #(0xC0<<8 | addr), VDP_CTRL

// 更直接的方法: 搜索 RAM 0xFFFF9562 区域的使用
console.log('\n=== 6. 场景参数表分析 ===');
// 场景参数表 ROM 0x061CB0
console.log('场景参数表 (ROM 0x061CB0):');
for (let i = 0; i < 8; i++) {
  const base = 0x061CB0 + i * 0x28;
  const param0 = readWord(base);
  const param1 = readWord(base + 2);
  const resourceIds = readLong(base + 4);
  const layoutPtr = readLong(base + 8);
  const dataPtr = readLong(base + 0x14);
  console.log(`  场景 ${i}: param0=0x${param0.toString(16)}, resIds=0x${resourceIds.toString(16)}, layout=0x${layoutPtr.toString(16)}, data=0x${dataPtr.toString(16)}`);
}

console.log('\n=== 7. 搜索 Sega Logo / Opening 相关资源 ===');
// 搜索可能的 Sega logo tile 数据
// Sega logo 通常在 ROM 早期位置
console.log('ROM 头部信息:');
console.log(`  0x100: "${rom.slice(0x100, 0x110).toString('ascii')}"`);
console.log(`  0x110: "${rom.slice(0x110, 0x120).toString('ascii')}"`);

// 搜索资源指针表中的前几个条目
console.log('\n资源指针表 (ROM 0x0B0000):');
for (let i = 0; i < 20; i++) {
  const ptr = readLong(0x0B0000 + i * 4);
  if (ptr > 0 && ptr < rom.length) {
    // 检查是否是 LZSS 压缩数据
    const flag = readByte(ptr);
    const size = readWord(ptr + 1);
    console.log(`  Entry ${i}: 0x${ptr.toString(16)}, flag=0x${flag.toString(16)}, decompSize=${size}`);
  }
}
