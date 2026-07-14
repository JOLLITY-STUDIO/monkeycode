/**
 * 深入分析动画机制:
 * 1. 解析任务函数 0xC92C → 0xC93A 的调用链
 * 2. 搜索 VSRAM (滚动) 写入
 * 3. 搜索 CRAM 渐变/淡入淡出
 * 4. 搜索开场动画序列
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROM_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_68K-gens-rom-dump.bin');
const RAM_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_68K-gens-ram-dump.ram');

const rom = fs.readFileSync(ROM_PATH);
let ram = null;
try { ram = fs.readFileSync(RAM_PATH); } catch(e) { console.log('RAM dump not found'); }

function rb(o) { return rom[o] & 0xff; }
function rw(o) { return ((rom[o] & 0xff) << 8) | (rom[o + 1] & 0xff); }
function rl(o) { return ((rom[o] & 0xff) << 24) | ((rom[o + 1] & 0xff) << 16) | ((rom[o + 2] & 0xff) << 8) | (rom[o + 3] & 0xff); }

function disasm68k(addr, length) {
  const results = [];
  let pc = addr;
  while (pc < addr + length) {
    const w = rw(pc);
    let line = `0x${pc.toString(16).padStart(6, '0')}: `;
    let size = 2;
    
    // BSR.W
    if (w === 0x6100) {
      const offset = rw(pc + 2);
      const target = pc + 2 + 2 + offset;
      line += `BSR.W 0x${target.toString(16)}`;
      size = 4;
    }
    // BSR.S
    else if ((w & 0xFF00) === 0x6100 && (w & 0xFF) !== 0 && (w & 0xFF) !== 0xFF) {
      const offset = (w & 0xFF);
      const target = pc + 2 + (offset > 127 ? offset - 256 : offset);
      line += `BSR.S 0x${target.toString(16)}`;
      size = 2;
    }
    // RTS
    else if (w === 0x4E75) {
      line += 'RTS';
      size = 2;
    }
    // JMP (abs)
    else if (w === 0x4EF9) {
      const target = rl(pc + 2);
      line += `JMP 0x${target.toString(16)}`;
      size = 6;
    }
    // JSR (abs)
    else if (w === 0x4EB9) {
      const target = rl(pc + 2);
      line += `JSR 0x${target.toString(16)}`;
      size = 6;
    }
    // MOVE.L #imm, (abs).L
    else if (w === 0x21FC) {
      const imm = rl(pc + 2);
      const dst = rl(pc + 6);
      line += `MOVE.L #0x${imm.toString(16)}, 0x${dst.toString(16)}`;
      size = 10;
    }
    // MOVE.W #imm, (abs).L
    else if (w === 0x31FC) {
      const imm = rw(pc + 2);
      const dst = rl(pc + 4);
      line += `MOVE.W #0x${imm.toString(16)}, 0x${dst.toString(16)}`;
      size = 8;
    }
    // LEA (abs), An
    else if ((w & 0xF1FF) === 0x41F9) {
      const reg = (w >> 9) & 7;
      const target = rl(pc + 2);
      line += `LEA 0x${target.toString(16)}, A${reg}`;
      size = 6;
    }
    // MOVE.L (abs), An / MOVEA.L (abs), An
    else if ((w & 0xF1FF) === 0x207C) {
      const reg = (w >> 9) & 7;
      const target = rl(pc + 2);
      line += `MOVEA.L #0x${target.toString(16)}, A${reg}`;
      size = 6;
    }
    // MOVE.W #imm, Dn
    else if ((w & 0xF1F0) === 0x303C) {
      const reg = (w >> 9) & 7;
      const imm = rw(pc + 2);
      line += `MOVE.W #0x${imm.toString(16)}, D${reg}`;
      size = 4;
    }
    // MOVEQ #imm, Dn
    else if ((w & 0xF100) === 0x7000) {
      const reg = (w >> 9) & 7;
      const imm = w & 0xFF;
      line += `MOVEQ #${imm}, D${reg}`;
      size = 2;
    }
    // CMP.W #imm, Dn
    else if ((w & 0xF1F0) === 0x0C40 || (w & 0xF1FF) === 0x0C40) {
      const reg = (w >> 9) & 7;
      const imm = rw(pc + 2);
      line += `CMP.W #0x${imm.toString(16)}, D${reg}`;
      size = 4;
    }
    // DBRA Dn, offset
    else if ((w & 0xF1F8) === 0x50C8) {
      const reg = w & 7;
      const offset = rw(pc + 2);
      const target = pc + 2 + 2 + (offset > 32767 ? offset - 65536 : offset);
      line += `DBRA D${reg}, 0x${target.toString(16)}`;
      size = 4;
    }
    // BRA.W
    else if (w === 0x6000) {
      const offset = rw(pc + 2);
      const target = pc + 2 + 2 + (offset > 32767 ? offset - 65536 : offset);
      line += `BRA.W 0x${target.toString(16)}`;
      size = 4;
    }
    // BRA.S
    else if ((w & 0xFF00) === 0x6000) {
      const offset = w & 0xFF;
      const target = pc + 2 + (offset > 127 ? offset - 256 : offset);
      line += `BRA.S 0x${target.toString(16)}`;
      size = 2;
    }
    // BEQ.W
    else if (w === 0x6700) {
      const offset = rw(pc + 2);
      const target = pc + 2 + 2 + (offset > 32767 ? offset - 65536 : offset);
      line += `BEQ.W 0x${target.toString(16)}`;
      size = 4;
    }
    // BNE.W
    else if (w === 0x6600) {
      const offset = rw(pc + 2);
      const target = pc + 2 + 2 + (offset > 32767 ? offset - 65536 : offset);
      line += `BNE.W 0x${target.toString(16)}`;
      size = 4;
    }
    // MOVEM.L
    else if (w === 0x48E7 || w === 0x4CDF) {
      const mask = rw(pc + 2);
      line += `${w === 0x48E7 ? 'MOVEM.L regs, -(A7)' : 'MOVEM.L (A7)+, regs'} mask=0x${mask.toString(16)}`;
      size = 4;
    }
    // AND.W #imm, (abs)
    else if (w === 0x0279) {
      const imm = rw(pc + 2);
      const dst = rl(pc + 4);
      line += `AND.W #0x${imm.toString(16)}, 0x${dst.toString(16)}`;
      size = 8;
    }
    // OR.W #imm, (abs)
    else if (w === 0x0079) {
      const imm = rw(pc + 2);
      const dst = rl(pc + 4);
      line += `OR.W #0x${imm.toString(16)}, 0x${dst.toString(16)}`;
      size = 8;
    }
    // TST.W (abs)
    else if (w === 0x4A79) {
      const dst = rl(pc + 2);
      line += `TST.W 0x${dst.toString(16)}`;
      size = 6;
    }
    // MOVE.W (abs), Dn
    else if ((w & 0xF1F8) === 0x3039) {
      const reg = (w >> 9) & 7;
      const src = rl(pc + 2);
      line += `MOVE.W 0x${src.toString(16)}, D${reg}`;
      size = 6;
    }
    else {
      line += `.word 0x${w.toString(16)}`;
      size = 2;
    }
    
    results.push(line);
    pc += size;
  }
  return results;
}

console.log('=== 1. 任务函数 0xC92C 反汇编 ===');
const task1 = disasm68k(0xC92C, 64);
for (const line of task1) console.log(`  ${line}`);

console.log('\n=== 2. 任务函数 0xC93A 反汇编 (标题画面主任务) ===');
const task2 = disasm68k(0xC93A, 128);
for (const line of task2) console.log(`  ${line}`);

console.log('\n=== 3. 搜索 VSRAM 写入 (滚动动画) ===');
// VSRAM DMA 命令 (0xFFFB)
let vsramCount = 0;
for (let i = 0; i < rom.length - 2; i++) {
  if (rw(i) === 0xFFFB) {
    vsramCount++;
    if (vsramCount <= 5) {
      console.log(`  ROM 0x${i.toString(16)}: VSRAM DMA command`);
    }
  }
}
console.log(`  总 VSRAM DMA 命令: ${vsramCount}`);

// 搜索 VDP 滚动寄存器写入 (R9 = HScroll, R10 = VScroll)
// 或者直接写 VSRAM: VDP addr 0x40xx (VSRAM write)
console.log('\n=== 4. 搜索调色板渐变代码 ===');
// 搜索对 RAM 0xFFFF9562 区域的写入 (HBLANK CRAM 数据源)
// 搜索 MOVE.W Dn, (0xFFFF95xx) 模式

console.log('\n=== 5. 分析 RAM dump (如果有) ===');
if (ram) {
  console.log(`RAM dump 大小: ${ram.length}B`);
  
  // 读取任务函数指针
  const taskPtr = (ram[0x8004] << 24) | (ram[0x8005] << 16) | (ram[0x8006] << 8) | ram[0x8007];
  console.log(`当前任务函数指针 (0xFFFF8004): 0x${taskPtr.toString(16)}`);
  
  // 读取帧计数器
  const frameCount = (ram[0x815C] << 8) | ram[0x815D];
  console.log(`帧计数器 (0xFFFF815C): ${frameCount}`);
  
  // HBLANK 标志
  const hblankFlag = ram[0x8160];
  console.log(`HBLANK 启用标志 (0xFFFF8160): ${hblankFlag}`);
  
  // 场景索引
  const sceneIdx = ram[0xA49C];
  console.log(`场景索引 (0xFFFFA49C): ${sceneIdx}`);
  
  // 读取 HBLANK CRAM 数据源 (0xFFFF9562)
  console.log('\nHBLANK CRAM 数据源 (0xFFFF9562, 32 bytes):');
  for (let i = 0; i < 32; i += 2) {
    const w = (ram[0x9562 + i] << 8) | ram[0x9563 + i];
    process.stdout.write(`0x${w.toString(16).padStart(4, '0')} `);
    if ((i + 2) % 16 === 0) console.log();
  }
  
  // 读取 0xFFFF9664 区域 (第二个 CRAM 数据源)
  console.log('\nHBLANK CRAM 数据源2 (0xFFFF9664, 32 bytes):');
  for (let i = 0; i < 32; i += 2) {
    const w = (ram[0x9664 + i] << 8) | ram[0x9665 + i];
    process.stdout.write(`0x${w.toString(16).padStart(4, '0')} `);
    if ((i + 2) % 16 === 0) console.log();
  }
  
  // 滚动状态 (0xFFFF9F26)
  console.log('\n滚动状态 (0xFFFF9F26, 16 bytes):');
  for (let i = 0; i < 16; i++) {
    process.stdout.write(`0x${ram[0x9F26 + i].toString(16).padStart(2, '0')} `);
  }
  
  // VDP 寄存器状态 (0xFFFF81A9)
  console.log(`\nVDP 寄存器状态 (0xFFFF81A9): 0x${ram[0x81A9].toString(16)}`);
}

console.log('\n=== 6. 搜索 ROM 中的 "SEGA" 或开场文本 ===');
// 搜索可能的 SEGA logo 或开场文字
const searchTexts = ['SEGA', 'OPENING', 'TITLE', 'PRESS', 'START'];
for (const text of searchTexts) {
  const buf = Buffer.from(text, 'ascii');
  let found = false;
  for (let i = 0; i < rom.length - buf.length; i++) {
    if (rom[i] === buf[0]) {
      let match = true;
      for (let j = 1; j < buf.length; j++) {
        if (rom[i + j] !== buf[j]) { match = false; break; }
      }
      if (match) {
        console.log(`  "${text}" found at ROM 0x${i.toString(16)}`);
        found = true;
        break;
      }
    }
  }
  if (!found) console.log(`  "${text}" not found in ROM`);
}
