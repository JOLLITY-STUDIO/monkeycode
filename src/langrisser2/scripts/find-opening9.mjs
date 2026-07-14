/**
 * 搜索谁写入 0xFFFFAA11 (动画控制字节) 和相关地址
 * 并分析 0x14E26 (bit7 case) 的完整逻辑
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

// 搜索写入特定 RAM 地址的代码
function searchWrites(ramAddr, label) {
  console.log(`\n=== 搜索写入 0x${ramAddr.toString(16)} (${label}) ===`);
  let found = 0;
  
  for (let i = 0; i < rom.length - 8; i++) {
    const w = rw(i);
    let writeInstr = '';
    let writeAddr = i;
    let writeVal = null;
    
    // MOVE.B #imm, (abs).L
    if (w === 0x11FC && rl(i+4) === ramAddr) {
      writeInstr = `MOVE.B #0x${rw(i+2).toString(16)}, (0x${ramAddr.toString(16)}).L`;
      writeVal = rw(i+2);
    }
    // MOVE.W #imm, (abs).L
    else if (w === 0x31FC && rl(i+4) === ramAddr) {
      writeInstr = `MOVE.W #0x${rw(i+2).toString(16)}, (0x${ramAddr.toString(16)}).L`;
      writeVal = rw(i+2);
    }
    else if (w === 0x13FC && rl(i+4) === ramAddr) {
      writeInstr = `MOVE.B #0x${rw(i+2).toString(16)}, (0x${ramAddr.toString(16)}).L`;
      writeVal = rw(i+2);
    }
    // MOVE.B Dn, (abs).L
    else if ((w & 0xF1F8) === 0x1139 && rl(i+2) === ramAddr) {
      const r = (w>>9)&7;
      writeInstr = `MOVE.B D${r}, (0x${ramAddr.toString(16)}).L`;
    }
    else if ((w & 0xF1F8) === 0x3139 && rl(i+2) === ramAddr) {
      const r = (w>>9)&7;
      writeInstr = `MOVE.W D${r}, (0x${ramAddr.toString(16)}).L`;
    }
    // MOVE.L #imm, (abs).L
    else if (w === 0x21FC && rl(i+6) === ramAddr) {
      writeInstr = `MOVE.L #0x${rl(i+2).toString(16)}, (0x${ramAddr.toString(16)}).L`;
      writeVal = rl(i+2);
    }
    // CLR.B / CLR.W
    else if (w === 0x4239 && rl(i+2) === ramAddr) {
      writeInstr = `CLR.B (0x${ramAddr.toString(16)}).L`;
      writeVal = 0;
    }
    else if (w === 0x4279 && rl(i+2) === ramAddr) {
      writeInstr = `CLR.W (0x${ramAddr.toString(16)}).L`;
      writeVal = 0;
    }
    // ORI #imm, (abs).L - 设置 bit
    else if (w === 0x0039 && rl(i+4) === ramAddr) {
      writeInstr = `ORI #0x${rw(i+2).toString(16)}, (0x${ramAddr.toString(16)}).L`;
      writeVal = rw(i+2);
    }
    // BSET #bit, (abs).L - 设置单个 bit
    else if (w === 0x08C0 + 0x39 && rl(i+4) === ramAddr) { // BSET #imm, (abs).L = 0x08C0 | mode
      // 0x08C0 is BSET Dn,...; 0x08C0-0x08FF? Actually 0x08C0 is BSET Dn,(mode)
      // For 0x0838/0x0839 static bit: 0x0838 (abs.W), 0x0839 (abs.L)
      // skip - handled separately
    }
    else if (w === 0x0839 && rl(i+4) === ramAddr) {
      // Static bit BSET: 0x0839 bit, addr.L
      // Actually 0x0839 is BTST not BSET
      // BSET #imm, (abs).L = 0x08C0 + 0x39? No.
      // Let me check: 0x08C0 = BSET Dn, ... (no static bit version with abs.L?)
      // Actually 68K: 0x08C0-0x08FF = BSET/CMP2, not what we want
      // For BSET #imm: 0x0838 (abs.W) bit, 0x0839 (abs.L) bit - but these are BTST
      // Actually: 
      // 0x0838 = BTST #imm, (abs).W
      // 0x0839 = BTST #imm, (abs).L  
      // 0x08C0 = BSET Dn, ...
      // 0x08F8 = BSET #imm, (abs).W
      // 0x08F9 = BSET #imm, (abs).L
    }
    else if (w === 0x08F9 && rl(i+4) === ramAddr) {
      const bit = rw(i+2);
      writeInstr = `BSET #${bit}, (0x${ramAddr.toString(16)}).L`;
      writeVal = `bit${bit}`;
    }
    else if (w === 0x08F8 && rw(i+4) === ramAddr) {
      const bit = rw(i+2);
      writeInstr = `BSET #${bit}, (0x${rw(i+4).toString(16).padStart(4,'0')}).W`;
      writeVal = `bit${bit}`;
    }
    // BCLR #imm, (abs).L
    else if (w === 0x08B9 && rl(i+4) === ramAddr) {
      const bit = rw(i+2);
      writeInstr = `BCLR #${bit}, (0x${ramAddr.toString(16)}).L`;
      writeVal = `clear bit${bit}`;
    }
    
    if (writeInstr) {
      console.log(`  ROM 0x${writeAddr.toString(16)}: ${writeInstr}`);
      found++;
    }
  }
  
  // 也搜索 (abs).W 形式 (只有低 16 位匹配)
  const low16 = ramAddr & 0xFFFF;
  for (let i = 0; i < rom.length - 6; i++) {
    const w = rw(i);
    let writeInstr = '';
    let writeAddr = i;
    
    // 跳过 (abs).L 形式 (前 2 字节是 0xFFFF)
    if (i >= 2 && rw(i-2) === 0xFFFF) continue;
    
    if (w === 0x11F8 && rw(i+4) === low16) {
      writeInstr = `MOVE.B #0x${rw(i+2).toString(16)}, (0x${low16.toString(16).padStart(4,'0')}).W`;
    }
    else if (w === 0x31F8 && rw(i+4) === low16) {
      writeInstr = `MOVE.W #0x${rw(i+2).toString(16)}, (0x${low16.toString(16).padStart(4,'0')}).W`;
    }
    else if ((w & 0xF1F8) === 0x1138 && rw(i+2) === low16) {
      const r = (w>>9)&7;
      writeInstr = `MOVE.B D${r}, (0x${low16.toString(16).padStart(4,'0')}).W`;
    }
    else if (w === 0x4238 && rw(i+2) === low16) {
      writeInstr = `CLR.B (0x${low16.toString(16).padStart(4,'0')}).W`;
    }
    
    if (writeInstr) {
      console.log(`  ROM 0x${writeAddr.toString(16)}: ${writeInstr} (abs.W)`);
      found++;
    }
  }
  
  if (found === 0) console.log('  (未找到)');
}

// 搜索关键 RAM 地址
searchWrites(0xFFFFAA11, '动画控制字节 (bit0-7 控制 case)');
searchWrites(0xFFFFAA40, '动画任务 ID (0x14D90 设置为 0xC)');
searchWrites(0xFFFFAA12, '动画参数1 (case bit7 设置)');
searchWrites(0xFFFFAA28, '动画回调指针 (0x14E32 设置)');
searchWrites(0xFFFFAA1E, '动画参数 (case bit0 设置)');

// 搜索读取 0xFFFFAA11
console.log('\n=== 搜索读取 0xFFFFAA11 ===');
for (let i = 0; i < rom.length - 8; i++) {
  if (rl(i) === 0xFFFFAA11) {
    const prev2 = rw(i-2);
    let instr = '';
    if ((prev2 & 0xF1F8) === 0x1039) instr = `MOVE.B D${(prev2>>9)&7}`;
    else if ((prev2 & 0xF1F8) === 0x3039) instr = `MOVE.W D${(prev2>>9)&7}`;
    else if (prev2 === 0x4A39) instr = 'TST.B';
    else if (prev2 === 0x4A79) instr = 'TST.W';
    else if (prev2 === 0x0839) instr = `BTST #${rw(i-4)}`;
    else if (prev2 === 0x08B9) instr = `BCLR #${rw(i-4)}`;
    else if (prev2 === 0x08F9) instr = `BSET #${rw(i-4)}`;
    console.log(`  ROM 0x${(i-2).toString(16)}: ${instr} (0xFFFFAA11).L`);
  }
}

// 反汇编 0x89C4 (动画状态机调用的函数)
console.log('\n=== 反汇编 0x89C4 ===');
function disasm(addr, length, label = '') {
  if (label) console.log(`\n--- ${label} ---`);
  let pc = addr;
  while (pc < addr + length) {
    const w = rw(pc);
    let line = `0x${pc.toString(16).padStart(6, '0')}: `;
    let size = 2;
    let mnemonic = '';
    
    if (w === 0x4E75) { mnemonic = 'RTS'; }
    else if (w === 0x4EB9) { mnemonic = `JSR 0x${rl(pc+2).toString(16)}`; size = 6; }
    else if (w === 0x4EF9) { mnemonic = `JMP 0x${rl(pc+2).toString(16)}`; size = 6; }
    else if (w === 0x4EBA) { const o = rw(pc+2); const t = pc + 2 + (o > 0x7FFF ? o - 0x10000 : o); mnemonic = `JSR (PC,d16) → 0x${t.toString(16)}`; size = 4; }
    else if ((w & 0xFF00) === 0x6100) { const o = rw(pc+2); const t = pc + 2 + (o > 0x7FFF ? o - 0x10000 : o); mnemonic = `BSR.W 0x${t.toString(16)}`; size = 4; }
    else if ((w & 0xFF00) === 0x6000) { const o = rw(pc+2); const t = pc + 2 + (o > 0x7FFF ? o - 0x10000 : o); mnemonic = `BRA.W 0x${t.toString(16)}`; size = 4; }
    else if ((w & 0xFF00) === 0x6700) { const o = rw(pc+2); const t = pc + 2 + (o > 0x7FFF ? o - 0x10000 : o); mnemonic = `BEQ.W 0x${t.toString(16)}`; size = 4; }
    else if ((w & 0xFF00) === 0x6600) { const o = rw(pc+2); const t = pc + 2 + (o > 0x7FFF ? o - 0x10000 : o); mnemonic = `BNE.W 0x${t.toString(16)}`; size = 4; }
    else if ((w & 0xFF00) === 0x61 && (w & 0xFF) !== 0 && (w & 0xFF) !== 0xFF) { const o = w & 0xFF; const t = pc + 2 + (o > 127 ? o - 256 : o); mnemonic = `BSR.S 0x${t.toString(16)}`; }
    else if ((w & 0xFF00) === 0x60 && (w & 0xFF) !== 0 && (w & 0xFF) !== 0xFF) { const o = w & 0xFF; const t = pc + 2 + (o > 127 ? o - 256 : o); mnemonic = `BRA.S 0x${t.toString(16)}`; }
    else if ((w & 0xFF00) === 0x67 && (w & 0xFF) !== 0 && (w & 0xFF) !== 0xFF) { const o = w & 0xFF; const t = pc + 2 + (o > 127 ? o - 256 : o); mnemonic = `BEQ.S 0x${t.toString(16)}`; }
    else if ((w & 0xFF00) === 0x66 && (w & 0xFF) !== 0 && (w & 0xFF) !== 0xFF) { const o = w & 0xFF; const t = pc + 2 + (o > 127 ? o - 256 : o); mnemonic = `BNE.S 0x${t.toString(16)}`; }
    else if ((w & 0xF100) === 0x7000) { const r = (w>>9)&7; const v = w & 0xFF; mnemonic = `MOVEQ #0x${v.toString(16)}, D${r}`; }
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
    else if ((w & 0xF1FF) === 0x41F8) { const r=(w>>9)&7; mnemonic = `LEA (0x${rw(pc+2).toString(16).padStart(4,'0')}).W, A${r}`; size = 4; }
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
    else if (w === 0x4E71) { mnemonic = 'NOP'; }
    else { mnemonic = `.word 0x${w.toString(16).padStart(4,'0')}`; }
    
    console.log(`  ${line}${mnemonic}`);
    pc += size;
  }
}

disasm(0x89C4, 96, '0x89C4');
disasm(0x899A, 64, '0x899A');

// 反汇编 0x14E26 (case bit7) 完整
console.log('\n=== 反汇编 0x14E26-0x14E68 (case bit7 完整) ===');
disasm(0x14E26, 64, '0x14E26 case bit7');

// 反汇编 0x1564A (case bit6)
console.log('\n=== 反汇编 0x1564A-0x15780 (case bit6) ===');
disasm(0x1564A, 256, '0x1564A case bit6');

// 反汇编 0x157F6 (case bit7 跳转目标)
console.log('\n=== 反汇编 0x157F6 ===');
disasm(0x157F6, 128, '0x157F6');
