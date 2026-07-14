/**
 * 分析开场动画和场景流转
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

console.log('=== 1. "OPENING" 文本上下文 (ROM 0x5E1C1) ===');
// 读取周围的文本
let textStart = 0x5E1C1;
for (let i = textStart - 32; i < textStart + 64; i++) {
  const b = rb(i);
  if (b >= 0x20 && b < 0x7F) {
    process.stdout.write(String.fromCharCode(b));
  } else {
    process.stdout.write('.');
  }
}
console.log();

console.log('\n=== 2. 场景参数表完整分析 (ROM 0x061CB0) ===');
for (let i = 0; i < 16; i++) {
  const base = 0x061CB0 + i * 0x28;
  if (base >= rom.length) break;
  const param0 = rw(base);
  if (param0 === 0 && rw(base + 2) === 0) break;
  
  const resourceIds = rl(base + 4);
  const layoutPtr = rl(base + 8);
  const dataPtr = rl(base + 0x14);
  
  // 尝试读取场景名 (如果有的话)
  let sceneName = '';
  for (let j = 0; j < 16; j++) {
    const b = rb(base + 0x20 + j);
    if (b >= 0x20 && b < 0x7F) sceneName += String.fromCharCode(b);
    else if (b === 0xFF) break;
  }
  
  console.log(`  场景 ${i}: param=0x${param0.toString(16)}, resIds=0x${resourceIds.toString(16)}, layout=0x${layoutPtr.toString(16)}, data=0x${dataPtr.toString(16)}`);
}

console.log('\n=== 3. 资源ID表分析 (ROM 0x061C34) ===');
for (let i = 0; i < 16; i++) {
  const base = 0x061C34 + i * 0x1C;
  if (base >= rom.length) break;
  const r0 = rw(base);
  const r1 = rw(base + 2);
  const r2 = rw(base + 4);
  const r3 = rw(base + 6);
  if (r0 === 0 && r1 === 0) break;
  console.log(`  场景 ${i}: res[0]=0x${r0.toString(16)}, res[1]=0x${r1.toString(16)}, res[2]=0x${r2.toString(16)}, res[3]=0x${r3.toString(16)}`);
}

console.log('\n=== 4. 标题画面任务链 (0xC93A → 0xC9A0) ===');
// 0xC93A 反汇编关键部分
console.log('0xC93A: 标题画面主任务');
console.log('  - MOVE.W #0, 0xFFFFA6D4 (清零场景切换标志)');
console.log('  - CLR.W 0xFFFF816E (清零特殊模式)');
console.log('  - JSR 0x00942A (任务调度)');
console.log('  - JSR 0x00C7EC (VDP R17 设置: 窗口位置)');
console.log('  - JSR 0x02CFC0 (初始化 sprite 缓冲区)');
console.log('  - 检查 0xFFFFA49C (场景索引) == 0?');
console.log('  - 如果是: BSR 0xFB70 (Z80 音乐命令)');
console.log('  - JSR 0x00942A (任务调度)');
console.log('  - LEA 0x05DF40 → 0xFFFF95A2 (标题画面参数)');
console.log('  - MOVE.L #2 → 0xFFFF95A6');
console.log('  - MOVE.L #0xF → 0xFFFF95A8');
console.log('  - MOVE.L #0x00C9A0 → 0xFFFF8004 (切换到下一任务)');
console.log('  - JMP 0x0085EE (帧同步, 进入下一帧)');

console.log('\n0xC9A0: 标题画面→部署界面过渡任务');
console.log('  - JSR 0x00C7EC (VDP R17 设置)');
console.log('  - CLR.W 0xFFFFA6DC (清零商店模式)');
console.log('  - CLR.W 0xFFFFF350 (清零标志)');
console.log('  - TST.W 0xFF78FA (检查全局标志)');
console.log('  - BNE 0xCA34 (如果非零, 跳转到另一路径)');

console.log('\n=== 5. HBLANK 动画机制详解 ===');
console.log('HBLANK 处理程序: ROM 0x84B8');
console.log('');
console.log('工作原理:');
console.log('  1. 每条扫描行触发一次 HBLANK 中断');
console.log('  2. 中断处理程序递增扫描行计数器 (DAT_ffff815e)');
console.log('  3. 从扫描行 0x82 开始, 每隔 2 行写入 CRAM:');
console.log('     - CRAM 写地址 = 0xC040 + (scanline - 0x81) * 2');
console.log('     - 数据源 1: RAM 0xFFFF9562 + offset');
console.log('     - 数据源 2: RAM 0xFFFF9664 + offset');
console.log('  4. 在扫描行 0xA0 (160) 时禁用 HBLANK');
console.log('');
console.log('效果: 创建行间调色板渐变 (如水面/天空渐变)');
console.log('     每帧 VBLANK 更新 RAM 0xFFFF9562 的数据,');
console.log('     HBLANK 在渲染时逐行写入不同的调色板颜色');

console.log('\n=== 6. 调色板渐变/淡入淡出机制 ===');
console.log('DMA 命令 0xFFFA: CRAM DMA 传输');
console.log('  - 将 RAM 中的调色板数据批量传输到 CRAM');
console.log('  - 每帧可以部分更新调色板, 实现渐变效果');
console.log('');
console.log('可能的渐变实现:');
console.log('  1. 游戏逻辑计算新的调色板值 (如逐帧增减 RGB 分量)');
console.log('  2. 写入 RAM 缓冲区');
console.log('  3. VBLANK 中通过 DMA 0xFFFA 传输到 CRAM');
console.log('  4. 下一帧重复, 实现渐变效果');

console.log('\n=== 7. 开场流程推测 ===');
console.log('基于代码分析的完整开场流程:');
console.log('');
console.log('  [boot] Reset → VDP init → RAM init → Game init');
console.log('    ↓');
console.log('  [task 0xC92C] 初始化 → Z80 音乐启动 → 切换到 0xC93A');
console.log('    ↓');
console.log('  [task 0xC93A] 标题画面主任务');
console.log('    - 加载场景资源 (tile/nametable/palette)');
console.log('    - 设置 VDP 寄存器');
console.log('    - 初始化 sprite 缓冲区');
console.log('    - 检查场景索引决定播放哪段音乐');
console.log('    - 设置标题画面参数 (0x05DF40)');
console.log('    - 切换到任务 0xC9A0');
console.log('    ↓');
console.log('  [task 0xC9A0] 标题画面交互/过渡');
console.log('    - 等待用户输入');
console.log('    - 检查全局标志 (0xFF78FA)');
console.log('    - 可能在此处处理开场动画和淡入淡出');
console.log('    ↓');
console.log('  [后续任务] 部署界面/游戏场景');

console.log('\n=== 8. 开场动画资源 ===');
// 检查 ROM 0x5E1C1 附近的 "OPENING" 是否是场景数据
console.log('ROM 0x5E1C0 附近的数据:');
for (let i = 0x5E1C0; i < 0x5E200; i += 16) {
  let hex = '';
  let ascii = '';
  for (let j = 0; j < 16; j++) {
    const b = rb(i + j);
    hex += b.toString(16).padStart(2, '0') + ' ';
    ascii += (b >= 0x20 && b < 0x7F) ? String.fromCharCode(b) : '.';
  }
  console.log(`  0x${i.toString(16)}: ${hex} ${ascii}`);
}

// 检查 ROM 0x5DF40 (标题画面参数)
console.log('\n标题画面参数 (ROM 0x5DF40):');
for (let i = 0x5DF40; i < 0x5DF80; i += 16) {
  let hex = '';
  let ascii = '';
  for (let j = 0; j < 16; j++) {
    const b = rb(i + j);
    hex += b.toString(16).padStart(2, '0') + ' ';
    ascii += (b >= 0x20 && b < 0x7F) ? String.fromCharCode(b) : '.';
  }
  console.log(`  0x${i.toString(16)}: ${hex} ${ascii}`);
}
