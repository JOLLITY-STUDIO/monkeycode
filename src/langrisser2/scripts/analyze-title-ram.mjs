
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const RAM_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_68K-ram-in-title-page.ram');
const VRAM_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');

const ram = fs.readFileSync(RAM_PATH);
const vram = fs.readFileSync(VRAM_PATH);

console.log(`RAM size: ${ram.length} bytes (${(ram.length/1024).toFixed(1)} KB)`);
console.log(`VRAM size: ${vram.length} bytes\n`);

// RAM 映射: 64KB RAM at 0xFF0000-0xFFFFFF
// 即 RAM[0] = 0xFF0000, RAM[0xFFFF] = 0xFFFFFF

function readRAM(addr) {
  const offset = addr & 0xFFFF;
  return ram[offset];
}

function readRAMWord(addr) {
  const offset = addr & 0xFFFF;
  return (ram[offset] << 8) | ram[offset + 1]; // 大端?
}

function readRAMLong(addr) {
  const offset = addr & 0xFFFF;
  return (ram[offset] << 24) | (ram[offset + 1] << 16) | 
         (ram[offset + 2] << 8) | ram[offset + 3];
}

// 查看解压缓冲区 0xFF1000
console.log('=== 解压缓冲区 0xFF1000 ===');
const decompressBuf = 0xFF1000;
console.log('前256字节:');
for (let row = 0; row < 16; row++) {
  const addr = decompressBuf + row * 16;
  const off = addr & 0xFFFF;
  let hex = '';
  for (let i = 0; i < 16; i++) {
    hex += ram[off + i].toString(16).padStart(2, '0') + ' ';
  }
  console.log(`  ${addr.toString(16).padStart(6, '0')}: ${hex}`);
}

// 看看 VRAM 前256字节对比
console.log('\n=== VRAM 0x0000 前256字节 ===');
for (let row = 0; row < 16; row++) {
  const addr = row * 16;
  let hex = '';
  for (let i = 0; i < 16; i++) {
    hex += vram[addr + i].toString(16).padStart(2, '0') + ' ';
  }
  console.log(`  ${addr.toString(16).padStart(4, '0')}: ${hex}`);
}

// 查看 DMA 队列 $FFFF81C4
console.log('\n=== DMA 队列 0xFFFF81C4 ===');
const dmaQueuePtr = readRAMLong(0xFFFF81C4);
console.log(`队列指针: 0x${dmaQueuePtr.toString(16)}`);

// 队列起始
let queuePos = 0xFFFF81C8; // 队列起始 (指针存在81C4)
console.log('队列内容:');
for (let i = 0; i < 32; i++) {
  const off = queuePos & 0xFFFF;
  const w = (ram[off] << 8) | ram[off + 1];
  console.log(`  +${(i*2).toString(16).padStart(2,'0')}: 0x${w.toString(16).padStart(4,'0')}`);
  queuePos += 2;
}

// 查看 0xFFFF95A2 - 标题画面参数指针
console.log('\n=== 标题画面参数指针 0xFFFF95A2 ===');
const titleParamPtr = readRAMLong(0xFFFF95A2);
console.log(`参数指针: 0x${titleParamPtr.toString(16)}`);

if (titleParamPtr >= 0xFF0000 && titleParamPtr < 0xFFFFFF) {
  console.log('参数内容:');
  const off = titleParamPtr & 0xFFFF;
  for (let row = 0; row < 8; row++) {
    let hex = '';
    for (let i = 0; i < 16; i++) {
      const addr = off + row * 16 + i;
      if (addr < ram.length) {
        hex += ram[addr].toString(16).padStart(2, '0') + ' ';
      }
    }
    console.log(`  +${(row*16).toString(16).padStart(2,'0')}: ${hex}`);
  }
}

// 查看场景索引 0xFFFFA49C
console.log('\n=== 场景索引 0xFFFFA49C ===');
const sceneIndex = readRAMWord(0xFFFFA49C);
console.log(`场景索引: ${sceneIndex}`);

// 查看任务队列 $FFFF8004
console.log('\n=== 当前任务 0xFFFF8004 ===');
const currentTask = readRAMLong(0xFFFF8004);
console.log(`任务指针: 0x${currentTask.toString(16)}`);

// 看看资源指针表有没有被复制到RAM
console.log('\n=== 检查 RAM 中是否有资源指针表 ===');
// 找连续的非零 long
let tableCandidates = [];
for (let off = 0; off < ram.length - 16; off += 4) {
  // 检查是否有4个连续的非零 long，且值都在 0xB0000-0x1FFFFF 范围
  let valid = true;
  for (let i = 0; i < 4; i++) {
    const val = (ram[off + i*4] << 24) | (ram[off + i*4 + 1] << 16) | 
                (ram[off + i*4 + 2] << 8) | ram[off + i*4 + 3];
    if (val < 0xB0000 || val > 0x200000) {
      valid = false;
      break;
    }
  }
  if (valid) {
    tableCandidates.push(0xFF0000 + off);
    if (tableCandidates.length >= 5) break;
  }
}
console.log(`候选位置: ${tableCandidates.map(a => '0x' + a.toString(16)).join(', ')}`);

// 查看 0xFFFFA5CC 区域 - execution-trace.md 提到的区域
console.log('\n=== 0xFFFFA5CC 区域 (场景数据表) ===');
const a5cc = 0xFFFFA5CC;
const a5ccOff = a5cc & 0xFFFF;
for (let row = 0; row < 16; row++) {
  let hex = '';
  for (let i = 0; i < 16; i++) {
    const addr = a5ccOff + row * 16 + i;
    if (addr < ram.length) {
      hex += ram[addr].toString(16).padStart(2, '0') + ' ';
    }
  }
  console.log(`  ${(a5cc + row*16).toString(16).padStart(6, '0')}: ${hex}`);
}

// 查看 0x618E8 - 初始化代码提到的数据表
console.log('\n=== ROM 数据表 0x0618E8 (参考执行追踪) ===');
// 这个在ROM里，不是RAM
// 但我们可以看看 RAM 中 0xFxxx 区域的有趣数据

// 找调色板数据 (CRAM-like patterns)
console.log('\n=== RAM 中查找调色板特征 ===');
// 调色板特征: 连续的 16-bit 值，每个值只有低9位有效 (0x0000-0x01FF)
let paletteCandidates = [];
for (let off = 0; off < ram.length - 64; off += 2) {
  let looksLikePalette = true;
  for (let i = 0; i < 16; i++) {
    const val = (ram[off + i*2] << 8) | ram[off + i*2 + 1];
    if ((val & 0xFE00) !== 0) { // 高7位应为0
      looksLikePalette = false;
      break;
    }
  }
  if (looksLikePalette) {
    paletteCandidates.push(0xFF0000 + off);
    if (paletteCandidates.length >= 10) break;
  }
}
console.log(`调色板候选: ${paletteCandidates.map(a => '0x' + a.toString(16)).join(', ')}`);
