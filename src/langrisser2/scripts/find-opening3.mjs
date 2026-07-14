/**
 * 追踪开场动画的完整加载链
 * 1. 分析 0x9EC4 场景初始化函数
 * 2. 分析 0xCA34 开场路径的完整任务链
 * 3. 提取开场动画的所有资源帧
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

function disasm(addr, length) {
  let pc = addr;
  const end = addr + length;
  while (pc < end) {
    const w = rw(pc);
    let line = `0x${pc.toString(16).padStart(6, '0')}: `;
    let size = 2;
    
    if (w === 0x4E75) { line += 'RTS'; }
    else if (w === 0x4EF9) { line += `JMP 0x${rl(pc+2).toString(16)}`; size = 6; }
    else if (w === 0x4EB9) { line += `JSR 0x${rl(pc+2).toString(16)}`; size = 6; }
    else if (w === 0x6100) { line += `BSR.W 0x${(pc+4+rw(pc+2)).toString(16)}`; size = 4; }
    else if ((w & 0xFF00) === 0x6100 && (w & 0xFF) !== 0 && (w & 0xFF) !== 0xFF) { 
      const off = w & 0xFF; line += `BSR.S 0x${(pc+2+(off>127?off-256:off)).toString(16)}`; 
    }
    else if (w === 0x6600) { line += `BNE.W 0x${(pc+4+(rw(pc+2)>32767?rw(pc+2)-65536:rw(pc+2))).toString(16)}`; size = 4; }
    else if (w === 0x6700) { line += `BEQ.W 0x${(pc+4+(rw(pc+2)>32767?rw(pc+2)-65536:rw(pc+2))).toString(16)}`; size = 4; }
    else if (w === 0x6000) { line += `BRA.W 0x${(pc+4+(rw(pc+2)>32767?rw(pc+2)-65536:rw(pc+2))).toString(16)}`; size = 4; }
    else if ((w & 0xFF00) === 0x6000) { 
      const off = w & 0xFF; line += `BRA.S 0x${(pc+2+(off>127?off-256:off)).toString(16)}`; 
    }
    else if ((w & 0xFF00) === 0x6700 && (w & 0xFF) !== 0) { 
      const off = w & 0xFF; line += `BEQ.S 0x${(pc+2+(off>127?off-256:off)).toString(16)}`; 
    }
    else if ((w & 0xFF00) === 0x6600 && (w & 0xFF) !== 0) { 
      const off = w & 0xFF; line += `BNE.S 0x${(pc+2+(off>127?off-256:off)).toString(16)}`; 
    }
    else if ((w & 0xF1F0) === 0x0C40) { 
      const reg = (w >> 9) & 7; const imm = rw(pc+2);
      line += `CMPI.W #0x${imm.toString(16)}, D${reg}`; size = 4; 
    }
    else if ((w & 0xF1F0) === 0x0C00) { 
      const reg = (w >> 9) & 7; const imm = rw(pc+2);
      line += `CMPI.B #0x${imm.toString(16)}, D${reg}`; size = 4; 
    }
    else if ((w & 0xF100) === 0x7000) {
      const reg = (w >> 9) & 7; const imm = w & 0xFF;
      line += `MOVEQ #0x${imm.toString(16)}, D${reg}`;
    }
    else if ((w & 0xF1F8) === 0x3039) {
      const reg = (w >> 9) & 7; const src = rl(pc+2);
      line += `MOVE.W 0x${src.toString(16)}, D${reg}`; size = 6;
    }
    else if ((w & 0xF1F8) === 0x3038) {
      const reg = (w >> 9) & 7; const src = rw(pc+2);
      line += `MOVE.W 0x${src.toString(16).padStart(4,'0')}, D${reg}`; size = 4;
    }
    else if (w === 0x31FC) { 
      const imm = rw(pc+2); const dst = rl(pc+4);
      line += `MOVE.W #0x${imm.toString(16)}, 0x${dst.toString(16)}`; size = 8;
    }
    else if (w === 0x21FC) { 
      const imm = rl(pc+2); const dst = rl(pc+6);
      line += `MOVE.L #0x${imm.toString(16)}, 0x${dst.toString(16)}`; size = 10;
    }
    else if (w === 0x33FC) { 
      const imm = rw(pc+2); const dst = rl(pc+4);
      line += `MOVE.W #0x${imm.toString(16)}, 0x${dst.toString(16)}`; size = 8;
    }
    else if (w === 0x11FC) { 
      const imm = rw(pc+2); const dst = rl(pc+4);
      line += `MOVE.B #0x${imm.toString(16)}, 0x${dst.toString(16)}`; size = 8;
    }
    else if ((w & 0xF1FF) === 0x41F9) {
      const reg = (w >> 9) & 7; const target = rl(pc+2);
      line += `LEA 0x${target.toString(16)}, A${reg}`; size = 6;
    }
    else if (w === 0x4A79) { line += `TST.W 0x${rl(pc+2).toString(16)}`; size = 6; }
    else if (w === 0x4279) { line += `CLR.W 0x${rl(pc+2).toString(16)}`; size = 6; }
    else if (w === 0x4239) { line += `CLR.B 0x${rl(pc+2).toString(16)}`; size = 6; }
    else if (w === 0x48E7) { line += `MOVEM.L regs, -(A7) mask=0x${rw(pc+2).toString(16)}`; size = 4; }
    else if (w === 0x4CDF) { line += `MOVEM.L (A7)+, regs mask=0x${rw(pc+2).toString(16)}`; size = 4; }
    else if ((w & 0xF1C0) === 0x41C0) {
      const reg = (w >> 9) & 7; line += `LEA (An), A${reg}`;
    }
    else if ((w & 0xF1F8) === 0x2070 || (w & 0xF1F8) === 0x2078) {
      const reg = (w >> 9) & 7;
      line += `MOVEA.L (d16,An), A${reg}`; size = 2;
    }
    else if ((w & 0xF1FF) === 0x2271) {
      const reg = (w >> 9) & 7;
      line += `MOVEA.L (d16,An), A${reg}`;
    }
    else if ((w & 0xF1C0) === 0xD0C0) {
      const reg = (w >> 9) & 7; const ea = w & 0x3F;
      line += `ADD.W D${ea}, D${reg}`;
    }
    else if (w === 0x5340) { line += `SUBQ.W #1, D0`; }
    else if ((w & 0xF1F8) === 0x5340) {
      const reg = (w >> 9) & 7; line += `SUBQ.W #1, D${reg}`;
    }
    else if (w === 0x51C8) {
      const reg = w & 7; const off = rw(pc+2);
      line += `DBRA D${reg}, 0x${(pc+4+(off>32767?off-65536:off)).toString(16)}`; size = 4;
    }
    else if (w === 0x4EBA) {
      const off = rw(pc+2); const t = pc + 2 + 2 + (off > 32767 ? off - 65536 : off);
      line += `JSR (PC, d16) → 0x${t.toString(16)}`; size = 4;
    }
    else { line += `.word 0x${w.toString(16)}`; }
    
    console.log(`  ${line}`);
    pc += size;
  }
}

console.log('=== 1. 0x9EC4 场景初始化函数 (完整反汇编) ===');
disasm(0x9EC4, 128);

console.log('\n=== 2. 0xCC50 场景设置函数 (完整反汇编) ===');
disasm(0xCC50, 96);

console.log('\n=== 3. 分析 0xC81A (设置 0xFF78FA = 0xFFFF) ===');
disasm(0xC800, 64);

console.log('\n=== 4. 0xCA34 完整反汇编 (开场动画路径) ===');
disasm(0xCA34, 192);

console.log('\n=== 5. 场景 0 的资源数据分析 ===');
// 场景 0: resIds=0x62220, layout=0x62544, data=0x62f80
const scene0ResIds = 0x62220;
const scene0Layout = 0x62544;
const scene0Data = 0x62F80;

console.log(`场景 0 资源ID表 (0x${scene0ResIds.toString(16)}):`);
for (let i = 0; i < 8; i++) {
  const id = rw(scene0ResIds + i * 2);
  if (id === 0 || id === 0xFFFF) break;
  console.log(`  res[${i}]: 0x${id.toString(16)} (DMA=${!!(id & 0x8000)}, idx=${id & 0x7FFF})`);
}

console.log(`\n场景 0 布局数据 (0x${scene0Layout.toString(16)}, 前 64 字节):`);
for (let i = 0; i < 64; i += 16) {
  let hex = '';
  for (let j = 0; j < 16; j++) hex += rb(scene0Layout + i + j).toString(16).padStart(2, '0') + ' ';
  console.log(`  0x${(scene0Layout + i).toString(16)}: ${hex}`);
}

console.log(`\n场景 0 数据指针 (0x${scene0Data.toString(16)}, 前 64 字节):`);
for (let i = 0; i < 64; i += 16) {
  let hex = '';
  for (let j = 0; j < 16; j++) hex += rb(scene0Data + i + j).toString(16).padStart(2, '0') + ' ';
  console.log(`  0x${(scene0Data + i).toString(16)}: ${hex}`);
}

console.log('\n=== 6. 分析 0x1B221 (首个 OPENING1 tag 使用) ===');
disasm(0x1B210, 64);

console.log('\n=== 7. 分析 0x1C0D9 (首个 OPENING2 tag 使用) ===');
disasm(0x1C0C0, 64);

console.log('\n=== 8. 提取开场动画所有资源 ===');
// 从任务链分析, 开场动画加载的资源:
// 0xCA68: resource 0x8001 (Entry 1) → VRAM 0
// 场景 0 资源: 0x8003, 0x8008, 0x8003, 0x800c
// 但场景 0 可能是标题画面, 不是开场动画

// 检查 0x9EC4 中读取的场景索引
// DAT_ffffa49c 初始值 = 1 (在 FUN_0000c80c 中设置)
// 但 0xFF78FA = 0xFFFF 时走不同路径

console.log('场景索引 (DAT_ffffa49c) 初始值: 1');
console.log('0xFF78FA 初始值: 0xFFFF (在 0xC81A 设置)');
console.log('');
console.log('当 0xFF78FA != 0 时:');
console.log('  0xCA34 路径:');
console.log('  - 设置 0xFFFFA4A0 = 0x10001');
console.log('  - JSR 0x9EC4 (场景初始化, 使用场景索引 1)');
console.log('  - 加载资源 0x8001 → VRAM 0');
console.log('  - JSR 0x14D5E (可能是开场动画播放)');
console.log('  - BSR 0x19174 (可能是帧序列控制)');
console.log('  - BSR 0x19022 (可能是调色板渐变)');

// 分析 0x14D5E
console.log('\n=== 9. 分析 0x14D5E (开场动画播放?) ===');
disasm(0x14D5E, 96);

// 分析 0x19174
console.log('\n=== 10. 分析 0x19174 (帧序列控制?) ===');
disasm(0x19174, 64);

// 分析 0x19022
console.log('\n=== 11. 分析 0x19022 (调色板渐变?) ===');
disasm(0x19022, 64);

// 分析 0x11E3A
console.log('\n=== 12. 分析 0x11E3A ===');
disasm(0x11E3A, 64);

// 分析 0x10AEE
console.log('\n=== 13. 分析 0x10AEE ===');
disasm(0x10AEE, 64);

// 提取 Entry 1 (资源 0x8001) 的 tile 数据并渲染
console.log('\n=== 14. 渲染 Entry 1 (开场动画第一帧?) ===');
const entry1Data = decompressLZSS(rl(0x0B0000 + 1 * 4));
console.log(`Entry 1: ${entry1Data.length}B (${entry1Data.length / 32} tiles)`);

// 渲染前几个 tile 的 ASCII art
for (let t = 0; t < 4; t++) {
  console.log(`\nTile ${t}:`);
  for (let y = 0; y < 8; y++) {
    let row = '';
    for (let x = 0; x < 8; x++) {
      const rowBase = t * 32 + y * 4;
      const p0 = entry1Data[rowBase];
      const p1 = entry1Data[rowBase + 1];
      const p2 = entry1Data[rowBase + 2];
      const p3 = entry1Data[rowBase + 3];
      const bit = 7 - x;
      const pixel =
        ((p0 >> bit) & 1) |
        ((p1 >> bit) & 1) << 1 |
        ((p2 >> bit) & 1) << 2 |
        ((p3 >> bit) & 1) << 3;
      row += pixel ? pixel.toString(16).toUpperCase() : '.';
    }
    console.log(row);
  }
}
