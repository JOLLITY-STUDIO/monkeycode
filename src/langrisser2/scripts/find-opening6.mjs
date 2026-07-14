/**
 * 验证 BSR.W 偏移计算, 反汇编关键函数
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

// 打印原始字节
function hexdump(addr, length) {
  for (let i = 0; i < length; i += 16) {
    let hex = '';
    for (let j = 0; j < 16 && i + j < length; j++) {
      hex += rb(addr + i + j).toString(16).padStart(2, '0') + ' ';
    }
    console.log(`  0x${(addr + i).toString(16)}: ${hex}`);
  }
}

console.log('=== 1. 验证 0xCA50 处的 BSR.W 字节 ===');
hexdump(0xCA50, 32);

console.log('\n=== 2. 计算正确的 BSR.W 目标 ===');
// 68K BSR.W: PC = addr + 2, target = PC + signed_offset
const bsr1_offset = rw(0xCA52);
const bsr1_signed = bsr1_offset > 0x7FFF ? bsr1_offset - 0x10000 : bsr1_offset;
const bsr1_target_correct = 0xCA52 + bsr1_signed;  // PC + offset
const bsr1_target_mine = 0xCA50 + 4 + bsr1_signed;  // my (wrong?) formula
console.log(`0xCA50 BSR.W: bytes=${rw(0xCA50).toString(16)} ${rw(0xCA52).toString(16)}`);
console.log(`  offset=0x${bsr1_offset.toString(16)} signed=${bsr1_signed}`);
console.log(`  correct (PC+2+offset): 0x${bsr1_target_correct.toString(16)}`);
console.log(`  my disasm (PC+4+offset): 0x${bsr1_target_mine.toString(16)}`);

const bsr2_offset = rw(0xCA56);
const bsr2_signed = bsr2_offset > 0x7FFF ? bsr2_offset - 0x10000 : bsr2_offset;
const bsr2_target_correct = 0xCA56 + bsr2_signed;
console.log(`\n0xCA54 BSR.W: bytes=${rw(0xCA54).toString(16)} ${rw(0xCA56).toString(16)}`);
console.log(`  offset=0x${bsr2_offset.toString(16)} signed=${bsr2_signed}`);
console.log(`  correct (PC+2+offset): 0x${bsr2_target_correct.toString(16)}`);

// 关键问题: 0xCA50 BSR.W 跳到 0x9172 还是 0x19172 还是 0x9174 还是 0x19174?
// 验证: 0x19022 是否是实际调用目标
console.log(`\n验证目标 0x19022 是否合理:`);
console.log(`  0xCA56 + 0x65CC = 0x${(0xCA56 + 0x65CC).toString(16)} (应为 0x19022)`);
console.log(`  实际 offset=0x${bsr2_offset.toString(16)}, 计算=0x${bsr2_target_correct.toString(16)}`);

// 重新反汇编关键函数 (使用正确公式)
function disasmCorrect(addr, length, label = '') {
  if (label) console.log(`\n--- ${label} ---`);
  let pc = addr;
  while (pc < addr + length) {
    const w = rw(pc);
    let line = `0x${pc.toString(16).padStart(6, '0')}: `;
    let size = 2;
    let mnemonic = '';
    
    if (w === 0x4E75) { mnemonic = 'RTS'; }
    else if (w === 0x4EF9) { mnemonic = `JMP 0x${rl(pc+2).toString(16)}`; size = 6; }
    else if (w === 0x4EB9) { mnemonic = `JSR 0x${rl(pc+2).toString(16)}`; size = 6; }
    else if (w === 0x4EF8) { mnemonic = `JMP 0x${rw(pc+2).toString(16).padStart(4,'0')}`; size = 4; }
    else if (w === 0x4EB8) { mnemonic = `JSR 0x${rw(pc+2).toString(16).padStart(4,'0')}`; size = 4; }
    else if (w === 0x4EBA) { 
      const o = rw(pc+2); const t = pc + 2 + (o > 0x7FFF ? o - 0x10000 : o);
      mnemonic = `JSR (PC,d16) → 0x${t.toString(16)}`; size = 4; 
    }
    else if (w === 0x4EFA) { 
      const o = rw(pc+2); const t = pc + 2 + (o > 0x7FFF ? o - 0x10000 : o);
      mnemonic = `JMP (PC,d16) → 0x${t.toString(16)}`; size = 4; 
    }
    // BSR.W / BRA.W / BEQ.W / BNE.W - 使用 PC+2 公式
    else if ((w & 0xFF00) === 0x6100) { 
      const o = rw(pc+2); const t = pc + 2 + (o > 0x7FFF ? o - 0x10000 : o);
      mnemonic = `BSR.W 0x${t.toString(16)}`; size = 4; 
    }
    else if ((w & 0xFF00) === 0x6000) { 
      const o = rw(pc+2); const t = pc + 2 + (o > 0x7FFF ? o - 0x10000 : o);
      mnemonic = `BRA.W 0x${t.toString(16)}`; size = 4; 
    }
    else if ((w & 0xFF00) === 0x6700) { 
      const o = rw(pc+2); const t = pc + 2 + (o > 0x7FFF ? o - 0x10000 : o);
      mnemonic = `BEQ.W 0x${t.toString(16)}`; size = 4; 
    }
    else if ((w & 0xFF00) === 0x6600) { 
      const o = rw(pc+2); const t = pc + 2 + (o > 0x7FFF ? o - 0x10000 : o);
      mnemonic = `BNE.W 0x${t.toString(16)}`; size = 4; 
    }
    // BSR.S (8-bit)
    else if ((w & 0xFF00) === 0x61 && (w & 0xFF) !== 0 && (w & 0xFF) !== 0xFF) { 
      const o = w & 0xFF; const t = pc + 2 + (o > 127 ? o - 256 : o);
      mnemonic = `BSR.S 0x${t.toString(16)}`; 
    }
    else if ((w & 0xFF00) === 0x60 && (w & 0xFF) !== 0 && (w & 0xFF) !== 0xFF) { 
      const o = w & 0xFF; const t = pc + 2 + (o > 127 ? o - 256 : o);
      mnemonic = `BRA.S 0x${t.toString(16)}`; 
    }
    else if ((w & 0xFF00) === 0x67 && (w & 0xFF) !== 0 && (w & 0xFF) !== 0xFF) { 
      const o = w & 0xFF; const t = pc + 2 + (o > 127 ? o - 256 : o);
      mnemonic = `BEQ.S 0x${t.toString(16)}`; 
    }
    else if ((w & 0xFF00) === 0x66 && (w & 0xFF) !== 0 && (w & 0xFF) !== 0xFF) { 
      const o = w & 0xFF; const t = pc + 2 + (o > 127 ? o - 256 : o);
      mnemonic = `BNE.S 0x${t.toString(16)}`; 
    }
    else if ((w & 0xF100) === 0x7000) { const r = (w>>9)&7; const v = w & 0xFF; mnemonic = `MOVEQ #0x${v.toString(16)}, D${r}`; }
    else if ((w & 0xF1F8) === 0x0C40) { const r=(w>>9)&7; mnemonic = `CMPI.W #0x${rw(pc+2).toString(16)}, D${r}`; size = 4; }
    else if ((w & 0xF1F8) === 0x0C00) { const r=(w>>9)&7; mnemonic = `CMPI.B #0x${rw(pc+2).toString(16)}, D${r}`; size = 4; }
    else if (w === 0x31FC) { mnemonic = `MOVE.W #0x${rw(pc+2).toString(16)}, (0x${rl(pc+4).toString(16)}).L`; size = 8; }
    else if (w === 0x33FC) { mnemonic = `MOVE.W #0x${rw(pc+2).toString(16)}, (0x${rl(pc+4).toString(16)}).L`; size = 8; }
    else if (w === 0x23FC) { mnemonic = `MOVE.L #0x${rl(pc+2).toString(16)}, (0x${rl(pc+6).toString(16)}).L`; size = 10; }
    else if (w === 0x11FC) { mnemonic = `MOVE.B #0x${rw(pc+2).toString(16)}, (0x${rl(pc+4).toString(16)}).L`; size = 8; }
    else if ((w & 0xF1F0) === 0x303C) { const r=(w>>9)&7; mnemonic = `MOVE.W #0x${rw(pc+2).toString(16)}, D${r}`; size = 4; }
    else if ((w & 0xF1F8) === 0x3039) { const r=(w>>9)&7; mnemonic = `MOVE.W (0x${rl(pc+2).toString(16)}).L, D${r}`; size = 6; }
    else if ((w & 0xF1F8) === 0x2039) { const r=(w>>9)&7; mnemonic = `MOVE.L (0x${rl(pc+2).toString(16)}).L, D${r}`; size = 6; }
    else if ((w & 0xF1F8) === 0x1039) { const r=(w>>9)&7; mnemonic = `MOVE.B (0x${rl(pc+2).toString(16)}).L, D${r}`; size = 6; }
    else if ((w & 0xF1F8) === 0x3038) { const r=(w>>9)&7; mnemonic = `MOVE.W (0x${rw(pc+2).toString(16).padStart(4,'0')}).W, D${r}`; size = 4; }
    else if ((w & 0xF1FF) === 0x41F9) { const r=(w>>9)&7; mnemonic = `LEA 0x${rl(pc+2).toString(16)}, A${r}`; size = 6; }
    else if ((w & 0xF1FF) === 0x41F8) { const r=(w>>9)&7; mnemonic = `LEA (0x${rw(pc+2).toString(16).padStart(4,'0')}).W, A${r}`; size = 4; }
    else if ((w & 0xF1FF) === 0x41FA) { const r=(w>>9)&7; const o = rw(pc+2); const t = pc + 2 + (o > 0x7FFF ? o - 0x10000 : o); mnemonic = `LEA (PC,d16) → 0x${t.toString(16)}, A${r}`; size = 4; }
    else if ((w & 0xF1F8) === 0x2079) { const r=(w>>9)&7; mnemonic = `MOVEA.L (0x${rl(pc+2).toString(16)}).L, A${r}`; size = 6; }
    else if (w === 0x4279) { mnemonic = `CLR.W (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if (w === 0x4239) { mnemonic = `CLR.B (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if (w === 0x42B9) { mnemonic = `CLR.L (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if (w === 0x4A79) { mnemonic = `TST.W (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if (w === 0x4A39) { mnemonic = `TST.B (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if (w === 0x48E7) { mnemonic = `MOVEM.L regs, -(A7) [0x${rw(pc+2).toString(16)}]`; size = 4; }
    else if (w === 0x4CDF) { mnemonic = `MOVEM.L (A7)+, regs [0x${rw(pc+2).toString(16)}]`; size = 4; }
    else if ((w & 0xF1F8) === 0x51C8) { const r=w&7; const o=rw(pc+2); const t = pc + 2 + (o > 0x7FFF ? o - 0x10000 : o); mnemonic = `DBRA D${r}, 0x${t.toString(16)}`; size = 4; }
    else if ((w & 0xF1F8) === 0x5340) { const r=(w>>9)&7; mnemonic = `SUBQ.W #1, D${r}`; }
    else if ((w & 0xF1F8) === 0x5140) { const r=(w>>9)&7; mnemonic = `ADDQ.W #1, D${r}`; }
    else if ((w & 0xF1C0) === 0xD0C0) { const r=(w>>9)&7; const s=w&0x3F; mnemonic = `ADD.W D${s&7}, D${r}`; }
    else if ((w & 0xF1C0) === 0x3000) { const r=(w>>9)&7; const s=w&7; mnemonic = `MOVE.W D${s}, D${r}`; }
    else { mnemonic = `.word 0x${w.toString(16).padStart(4,'0')}`; }
    
    console.log(`  ${line}${mnemonic}`);
    pc += size;
  }
}

console.log('\n=== 3. 重新反汇编 0xCA34 开场动画路径 (修正 BSR.W) ===');
disasmCorrect(0xCA34, 80, '0xCA34 开场动画路径');

console.log('\n=== 4. 反汇编 0x9172 (BSR.W 实际目标) ===');
disasmCorrect(0x9172, 64, '0x9172 (BSR.W from 0xCA50)');

console.log('\n=== 5. 反汇编 0x19022 区域 (用户期望的跳转表) ===');
disasmCorrect(0x19022, 64, '0x19022');

console.log('\n=== 6. 反汇编 0x9174 (其他可能目标) ===');
disasmCorrect(0x9174, 32, '0x9174');

console.log('\n=== 7. 反汇编 0x19174 区域 (用户期望的另一个跳转表) ===');
disasmCorrect(0x19174, 64, '0x19174');

console.log('\n=== 8. 反汇编 0x9EC4 (场景初始化) ===');
disasmCorrect(0x9EC4, 128, '0x9EC4 场景初始化');

console.log('\n=== 9. 反汇编 0x14D5E (动画状态设置) ===');
disasmCorrect(0x14D5E, 128, '0x14D5E 动画状态设置');

console.log('\n=== 10. 反汇编 0x11E3A (场景特定数据) ===');
disasmCorrect(0x11E3A, 96, '0x11E3A 场景特定数据');
