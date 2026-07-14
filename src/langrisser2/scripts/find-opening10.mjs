/**
 * 解析开场动画脚本数据
 * 
 * 关键发现:
 * - 0x14D90 是动画状态机入口
 * - 0x157F6 是字节码解释器,从 A0 读取命令字节 (0-15)
 * - 跳转表在 0x15838, 16 个条目
 * - A0 由 0x14DC0 设置: LEA 0x18011A, A0
 * - case bit7: A0 = *(*(A0 + 0x14))
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

console.log('=== 1. 验证 A0 来源: ROM 0x18011A ===');
// 0x14DC0: LEA 0x18011A, A0
console.log(`ROM 0x18011A 处数据 (前 64B):`);
for (let i = 0; i < 64; i += 16) {
  let hex = '';
  for (let j = 0; j < 16; j++) {
    hex += rb(0x18011A + i + j).toString(16).padStart(2, '0') + ' ';
  }
  console.log(`  0x${(0x18011A + i).toString(16)}: ${hex}`);
}

console.log('\n=== 2. case bit7 路径: A0+0x14 → 间接指针 ===');
// A0 = 0x18011A, A0+0x14 = 0x18012E
const indirectAddr = 0x18011A + 0x14;
console.log(`A0+0x14 = 0x${indirectAddr.toString(16)}`);
console.log(`ROM 0x${indirectAddr.toString(16)} 处 4 字节指针: 0x${rl(indirectAddr).toString(16)}`);

// A0 = *0x18012E
const scriptPtr = rl(indirectAddr);
console.log(`动画脚本指针: 0x${scriptPtr.toString(16)}`);

// 这个指针可能指向 RAM 或 ROM
if (scriptPtr < 0xFF0000) {
  // ROM 地址
  console.log(`(ROM 地址)`);
  console.log(`\nROM 0x${scriptPtr.toString(16)} 处动画脚本 (前 128B):`);
  for (let i = 0; i < 128; i += 16) {
    let hex = '';
    let ascii = '';
    for (let j = 0; j < 16; j++) {
      const b = rb(scriptPtr + i + j);
      hex += b.toString(16).padStart(2, '0') + ' ';
      ascii += (b >= 0x20 && b < 0x7F) ? String.fromCharCode(b) : '.';
    }
    console.log(`  0x${(scriptPtr + i).toString(16)}: ${hex} ${ascii}`);
  }
  
  // 解析为动画命令序列
  console.log(`\n动画命令序列 (从 0x${scriptPtr.toString(16)} 开始):`);
  let pos = scriptPtr;
  let cmdCount = 0;
  while (cmdCount < 64) {
    const cmd = rb(pos);
    if (cmd === 0xFF) {
      console.log(`  [${cmdCount}] 0x${pos.toString(16)}: 0xFF (END)`);
      break;
    }
    console.log(`  [${cmdCount}] 0x${pos.toString(16)}: cmd=${cmd}`);
    pos++;
    cmdCount++;
  }
} else {
  console.log(`(RAM 地址 - 需要运行时数据)`);
}

console.log('\n=== 3. 跳转表 0x15838 完整解析 ===');
const jumpTable = 0x15838;
const targets = [];
for (let i = 0; i < 16; i++) {
  const addr = jumpTable + i * 4;
  const w = rw(addr);
  if (w === 0x6000) {
    const offset = rw(addr + 2);
    const target = addr + 2 + (offset > 0x7FFF ? offset - 0x10000 : offset);
    targets.push(target);
    console.log(`  [${i}] 0x${addr.toString(16)}: BRA.W 0x${target.toString(16)}`);
  } else {
    console.log(`  [${i}] 0x${addr.toString(16)}: .word 0x${w.toString(16)} (非跳转)`);
    targets.push(null);
  }
}

console.log('\n=== 4. 反汇编每个跳转目标 (前 32 字节) ===');
function disasm(addr, length, label = '') {
  if (label) console.log(`\n--- ${label} ---`);
  let pc = addr;
  while (pc < addr + length) {
    const w = rw(pc);
    let line = `  0x${pc.toString(16).padStart(6, '0')}: `;
    let size = 2;
    let mnemonic = '';
    
    if (w === 0x4E75) { mnemonic = 'RTS'; }
    else if (w === 0x4EF9) { mnemonic = `JMP 0x${rl(pc+2).toString(16)}`; size = 6; }
    else if (w === 0x4EB9) { mnemonic = `JSR 0x${rl(pc+2).toString(16)}`; size = 6; }
    else if (w === 0x4EBA) { const o = rw(pc+2); const t = pc + 2 + (o > 0x7FFF ? o - 0x10000 : o); mnemonic = `JSR (PC,d16) → 0x${t.toString(16)}`; size = 4; }
    else if ((w & 0xFF00) === 0x6100) { const o = rw(pc+2); const t = pc + 2 + (o > 0x7FFF ? o - 0x10000 : o); mnemonic = `BSR.W 0x${t.toString(16)}`; size = 4; }
    else if ((w & 0xFF00) === 0x6000) { const o = rw(pc+2); const t = pc + 2 + (o > 0x7FFF ? o - 0x10000 : o); mnemonic = `BRA.W 0x${t.toString(16)}`; size = 4; }
    else if ((w & 0xFF00) === 0x6700) { const o = rw(pc+2); const t = pc + 2 + (o > 0x7FFF ? o - 0x10000 : o); mnemonic = `BEQ.W 0x${t.toString(16)}`; size = 4; }
    else if ((w & 0xFF00) === 0x6600) { const o = rw(pc+2); const t = pc + 2 + (o > 0x7FFF ? o - 0x10000 : o); mnemonic = `BNE.W 0x${t.toString(16)}`; size = 4; }
    else if ((w & 0xFF00) === 0x61 && (w & 0xFF) !== 0 && (w & 0xFF) !== 0xFF) { const o = w & 0xFF; const t = pc + 2 + (o > 127 ? o - 256 : o); mnemonic = `BSR.S 0x${t.toString(16)}`; }
    else if ((w & 0xFF00) === 0x60 && (w & 0xFF) !== 0 && (w & 0xFF) !== 0xFF) { const o = w & 0xFF; const t = pc + 2 + (o > 127 ? o - 256 : o); mnemonic = `BRA.S 0x${t.toString(16)}`; }
    else if ((w & 0xF100) === 0x7000) { const r = (w>>9)&7; const v = w & 0xFF; mnemonic = `MOVEQ #0x${v.toString(16)}, D${r}`; }
    else if ((w & 0xF1F8) === 0x0C40) { const r=(w>>9)&7; mnemonic = `CMPI.W #0x${rw(pc+2).toString(16)}, D${r}`; size = 4; }
    else if (w === 0x31FC) { mnemonic = `MOVE.W #0x${rw(pc+2).toString(16)}, (0x${rl(pc+4).toString(16)}).L`; size = 8; }
    else if (w === 0x23FC) { mnemonic = `MOVE.L #0x${rl(pc+2).toString(16)}, (0x${rl(pc+6).toString(16)}).L`; size = 10; }
    else if (w === 0x21FC) { mnemonic = `MOVE.L #0x${rl(pc+2).toString(16)}, (0x${rl(pc+6).toString(16)}).L`; size = 10; }
    else if (w === 0x11FC) { mnemonic = `MOVE.B #0x${rw(pc+2).toString(16)}, (0x${rl(pc+4).toString(16)}).L`; size = 8; }
    else if ((w & 0xF1F0) === 0x303C) { const r=(w>>9)&7; mnemonic = `MOVE.W #0x${rw(pc+2).toString(16)}, D${r}`; size = 4; }
    else if ((w & 0xF1F8) === 0x3039) { const r=(w>>9)&7; mnemonic = `MOVE.W (0x${rl(pc+2).toString(16)}).L, D${r}`; size = 6; }
    else if ((w & 0xF1F8) === 0x1039) { const r=(w>>9)&7; mnemonic = `MOVE.B (0x${rl(pc+2).toString(16)}).L, D${r}`; size = 6; }
    else if ((w & 0xF1F8) === 0x2039) { const r=(w>>9)&7; mnemonic = `MOVE.L (0x${rl(pc+2).toString(16)}).L, D${r}`; size = 6; }
    else if ((w & 0xF1F8) === 0x3139) { const r=(w>>9)&7; mnemonic = `MOVE.W D${r}, (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if ((w & 0xF1F8) === 0x1139) { const r=(w>>9)&7; mnemonic = `MOVE.B D${r}, (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if ((w & 0xF1FF) === 0x41F9) { const r=(w>>9)&7; mnemonic = `LEA 0x${rl(pc+2).toString(16)}, A${r}`; size = 6; }
    else if ((w & 0xF1F8) === 0x2079) { const r=(w>>9)&7; mnemonic = `MOVEA.L (0x${rl(pc+2).toString(16)}).L, A${r}`; size = 6; }
    else if (w === 0x4279) { mnemonic = `CLR.W (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if (w === 0x4239) { mnemonic = `CLR.B (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if (w === 0x4A79) { mnemonic = `TST.W (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if (w === 0x4A39) { mnemonic = `TST.B (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if (w === 0x48E7) { mnemonic = `MOVEM.L regs, -(A7) [0x${rw(pc+2).toString(16)}]`; size = 4; }
    else if (w === 0x4CDF) { mnemonic = `MOVEM.L (A7)+, regs [0x${rw(pc+2).toString(16)}]`; size = 4; }
    else if ((w & 0xF1F8) === 0x51C8) { const r=w&7; const o=rw(pc+2); const t = pc + 2 + (o > 0x7FFF ? o - 0x10000 : o); mnemonic = `DBRA D${r}, 0x${t.toString(16)}`; size = 4; }
    else if ((w & 0xF1F8) === 0x5340) { const r=(w>>9)&7; mnemonic = `SUBQ.W #1, D${r}`; }
    else if ((w & 0xF1F8) === 0x5140) { const r=(w>>9)&7; mnemonic = `ADDQ.W #1, D${r}`; }
    else if ((w & 0xF1C0) === 0xD0C0) { const r=(w>>9)&7; const s=w&0x3F; mnemonic = `ADD.W D${s&7}, D${r}`; }
    else if ((w & 0xF1C0) === 0x3000) { const r=(w>>9)&7; const s=w&7; mnemonic = `MOVE.W D${s}, D${r}`; }
    else if ((w & 0xF1C0) === 0x3028) { const r=(w>>9)&7; const a=w&7; const disp = rw(pc+2); const sd = disp > 0x7FFF ? disp - 0x10000 : disp; mnemonic = `MOVE.W ${sd>=0?'+':''}${sd}(A${a}), D${r}`; size = 4; }
    else if ((w & 0xF1C0) === 0x3128) { const r=(w>>9)&7; const a=w&7; const disp = rw(pc+2); const sd = disp > 0x7FFF ? disp - 0x10000 : disp; mnemonic = `MOVE.W D${r}, ${sd>=0?'+':''}${sd}(A${a})`; size = 4; }
    else if ((w & 0xF1C0) === 0x1010) { const r=(w>>9)&7; const a=w&7; mnemonic = `MOVE.B (A${a}), D${r}`; }
    else if (w === 0x4E71) { mnemonic = 'NOP'; }
    else { mnemonic = `.word 0x${w.toString(16).padStart(4,'0')}`; }
    
    console.log(`${line}${mnemonic}`);
    pc += size;
  }
}

// 反汇编前 8 个跳转目标 (关键动画命令)
for (let i = 0; i < 8; i++) {
  if (targets[i]) {
    disasm(targets[i], 48, `cmd ${i} → 0x${targets[i].toString(16)}`);
  }
}

// 反汇编 0xFE2A (动画帧推进函数)
console.log('\n=== 5. 反汇编 0xFE2A (动画帧推进函数) ===');
disasm(0xFE2A, 64, '0xFE2A 帧推进');
