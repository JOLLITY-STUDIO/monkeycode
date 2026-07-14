/**
 * 精确分析:
 * 1. 验证 0xC930 处的实际字节 (确认指令编码)
 * 2. 反汇编 0x14E56 (0xFF 命令的 return address)
 * 3. 反汇编 0xCA00 (开场动画 task function)
 * 4. 反汇编 0xCA32 (BNE 目标)
 * 5. 反汇编 0x11C44 (0xFF 处理器调用的函数)
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROM_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_68K-gens-rom-dump.bin');
const rom = fs.readFileSync(ROM_PATH);

function rb(o) { return rom[o] & 0xff; }
function rw(o) { return ((rom[o] & 0xff) << 8) | (rom[o + 1] & 0xff); }
function rl(o) { return (((rom[o] & 0xff) << 24) | ((rom[o + 1] & 0xff) << 16) | ((rom[o + 2] & 0xff) << 8) | (rom[o + 3] & 0xff)) >>> 0; }
function sx16(v) { return v > 0x7FFF ? v - 0x10000 : v; }

// 增强反汇编器
function disasm(addr, length, label) {
  if (label) console.log(`\n--- ${label} ---`);
  let pc = addr;
  const end = addr + length;
  while (pc < end) {
    const w = rw(pc);
    let size = 2;
    let mn = '';
    
    if (w === 0x4E75) mn = 'RTS';
    else if (w === 0x4E71) mn = 'NOP';
    else if (w === 0x4EF9) { mn = `JMP 0x${rl(pc+2).toString(16)}`; size = 6; }
    else if (w === 0x4EB9) { mn = `JSR 0x${rl(pc+2).toString(16)}`; size = 6; }
    else if (w === 0x4EBA) { mn = `JSR (PC,d16) → 0x${(pc+2+sx16(rw(pc+2))).toString(16)}`; size = 4; }
    else if (w === 0x4EB8) { mn = `JSR 0x${rw(pc+2).toString(16)}.W`; size = 4; }
    else if (w === 0x4EF8) { mn = `JMP 0x${rw(pc+2).toString(16)}.W`; size = 4; }
    else if (w === 0x4ED0) mn = `JMP (A0)`;
    else if (w === 0x4ED1) mn = `JMP (A1)`;
    else if (w === 0x4ED2) mn = `JMP (A2)`;
    else if ((w & 0xFFF8) === 0x4ED0) mn = `JMP (A${w&7})`;
    // Bcc
    else if ((w & 0xFF00) === 0x6100) { mn = `BSR.W 0x${(pc+2+sx16(rw(pc+2))).toString(16)}`; size = 4; }
    else if ((w & 0xFF00) === 0x6000) { mn = `BRA.W 0x${(pc+2+sx16(rw(pc+2))).toString(16)}`; size = 4; }
    else if ((w & 0xFF00) === 0x6700) { mn = `BEQ.W 0x${(pc+2+sx16(rw(pc+2))).toString(16)}`; size = 4; }
    else if ((w & 0xFF00) === 0x6600) { mn = `BNE.W 0x${(pc+2+sx16(rw(pc+2))).toString(16)}`; size = 4; }
    else if ((w & 0xFF00) === 0x6500) { mn = `BCS.W 0x${(pc+2+sx16(rw(pc+2))).toString(16)}`; size = 4; }
    else if ((w & 0xFF00) === 0x6400) { mn = `BCC.W 0x${(pc+2+sx16(rw(pc+2))).toString(16)}`; size = 4; }
    else if ((w & 0xF000) === 0x6000 && (w&0xFF)) { mn = `BRA.S 0x${(pc+2+((w&0xFF)>127?(w&0xFF)-256:(w&0xFF))).toString(16)}`; }
    else if ((w & 0xF000) === 0x6100 && (w&0xFF)) { mn = `BSR.S 0x${(pc+2+((w&0xFF)>127?(w&0xFF)-256:(w&0xFF))).toString(16)}`; }
    else if ((w & 0xF000) === 0x6700 && (w&0xFF)) { mn = `BEQ.S 0x${(pc+2+((w&0xFF)>127?(w&0xFF)-256:(w&0xFF))).toString(16)}`; }
    else if ((w & 0xF000) === 0x6600 && (w&0xFF)) { mn = `BNE.S 0x${(pc+2+((w&0xFF)>127?(w&0xFF)-256:(w&0xFF))).toString(16)}`; }
    else if ((w & 0xF000) === 0x6500 && (w&0xFF)) { mn = `BCS.S 0x${(pc+2+((w&0xFF)>127?(w&0xFF)-256:(w&0xFF))).toString(16)}`; }
    else if ((w & 0xF000) === 0x6400 && (w&0xFF)) { mn = `BCC.S 0x${(pc+2+((w&0xFF)>127?(w&0xFF)-256:(w&0xFF))).toString(16)}`; }
    // MOVE #imm, (xxx).L
    else if (w === 0x33FC) { mn = `MOVE.B #0x${(rw(pc+2)&0xFF).toString(16)}, (0x${rl(pc+4).toString(16)}).L`; size = 8; }
    else if (w === 0x31FC) { mn = `MOVE.W #0x${rw(pc+2).toString(16)}, (0x${rl(pc+4).toString(16)}).L`; size = 8; }
    else if (w === 0x23FC) { mn = `MOVE.L #0x${rl(pc+2).toString(16)}, (0x${rl(pc+6).toString(16)}).L`; size = 10; }
    else if (w === 0x21FC) { mn = `MOVE.L #0x${rl(pc+2).toString(16)}, (0x${rl(pc+6).toString(16)}).L`; size = 10; }
    else if (w === 0x11FC) { mn = `MOVE.B #0x${(rw(pc+2)&0xFF).toString(16)}, (0x${rl(pc+4).toString(16)}).L`; size = 8; }
    // MOVE #imm, Dn
    else if ((w & 0xF1F8) === 0x303C) { mn = `MOVE.W #0x${rw(pc+2).toString(16)}, D${(w>>9)&7}`; size = 4; }
    else if ((w & 0xF1F8) === 0x203C) { mn = `MOVE.L #0x${rl(pc+2).toString(16)}, D${(w>>9)&7}`; size = 6; }
    else if ((w & 0xF1F8) === 0x103C) { mn = `MOVE.B #0x${(rw(pc+2)&0xFF).toString(16)}, D${(w>>9)&7}`; size = 4; }
    // MOVEQ
    else if ((w & 0xF100) === 0x7000) { const v = w & 0xFF; mn = `MOVEQ #${v>127?v-256:v}, D${(w>>9)&7}`; }
    // MOVE from (xxx).L
    else if ((w & 0xF1F8) === 0x3039) { mn = `MOVE.W (0x${rl(pc+2).toString(16)}).L, D${(w>>9)&7}`; size = 6; }
    else if ((w & 0xF1F8) === 0x1039) { mn = `MOVE.B (0x${rl(pc+2).toString(16)}).L, D${(w>>9)&7}`; size = 6; }
    else if ((w & 0xF1F8) === 0x2039) { mn = `MOVE.L (0x${rl(pc+2).toString(16)}).L, D${(w>>9)&7}`; size = 6; }
    else if ((w & 0xF1F8) === 0x2079) { mn = `MOVEA.L (0x${rl(pc+2).toString(16)}).L, A${(w>>9)&7}`; size = 6; }
    else if ((w & 0xF1F8) === 0x2279) { mn = `MOVEA.L (0x${rl(pc+2).toString(16)}).L, A${(w>>9)&7}`; size = 6; }
    else if ((w & 0xF1F8) === 0x3038) { mn = `MOVE.W (0x${rw(pc+2).toString(16)}.W), D${(w>>9)&7}`; size = 4; }
    else if ((w & 0xF1F8) === 0x1038) { mn = `MOVE.B (0x${rw(pc+2).toString(16)}.W), D${(w>>9)&7}`; size = 4; }
    // MOVE to (xxx).L
    else if ((w & 0xF1F8) === 0x3139) { mn = `MOVE.W D${(w>>9)&7}, (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if ((w & 0xF1F8) === 0x1139) { mn = `MOVE.B D${(w>>9)&7}, (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if ((w & 0xF1F8) === 0x23C0) { mn = `MOVE.L D${(w>>9)&7}, (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if ((w & 0xFFF8) === 0x23C8) { mn = `MOVE.L A${w&7}, (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    // MOVE to (xxx).W
    else if ((w & 0xF1C0) === 0x31C0) { const addr = rw(pc+2); mn = `MOVE.W D${(w>>9)&7}, (0x${addr.toString(16)}.W)`; size = 4; }
    else if ((w & 0xF1C0) === 0x33C0) { const addr = rw(pc+2); mn = `MOVE.B D${(w>>9)&7}, (0x${(addr|0xFFFF0000).toString(16)}.W)`; size = 4; }
    // LEA
    else if ((w & 0xF1FF) === 0x41F9) { mn = `LEA 0x${rl(pc+2).toString(16)}, A${(w>>9)&7}`; size = 6; }
    else if ((w & 0xF1FF) === 0x41F8) { mn = `LEA 0x${rw(pc+2).toString(16)}.W, A${(w>>9)&7}`; size = 4; }
    else if ((w & 0xF1F8) === 0x41E8) { const d=sx16(rw(pc+2)); mn = `LEA ${d>=0?'+':''}${d}(A${w&7}), A${(w>>9)&7}`; size = 4; }
    else if ((w & 0xF1C0) === 0x41D0) { mn = `LEA (A${w&7}), A${(w>>9)&7}`; }
    // CLR/TST
    else if (w === 0x4279) { mn = `CLR.W (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if (w === 0x4239) { mn = `CLR.B (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if (w === 0x42B9) { mn = `CLR.L (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if (w === 0x4A79) { mn = `TST.W (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if (w === 0x4A39) { mn = `TST.B (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if ((w & 0xF1F8) === 0x4A40) { mn = `TST.W D${w&7}`; }
    // CMPI
    else if ((w & 0xF1F0) === 0x0C40) { mn = `CMPI.W #0x${rw(pc+2).toString(16)}, D${(w>>9)&7}`; size = 4; }
    else if ((w & 0xF1F0) === 0x0C00) { mn = `CMPI.B #0x${(rw(pc+2)&0xFF).toString(16)}, D${(w>>9)&7}`; size = 4; }
    else if ((w & 0xF1F0) === 0x0C80) { mn = `CMPI.L #0x${rl(pc+2).toString(16)}, D${(w>>9)&7}`; size = 6; }
    // BTST
    else if ((w & 0xF1F8) === 0x0800) { mn = `BTST #${rw(pc+2)}, D${(w>>9)&7}`; size = 4; }
    else if ((w & 0xF1FF) === 0x0839) { mn = `BTST #${rw(pc+2)}, (0x${rl(pc+4).toString(16)}).L`; size = 8; }
    // BCHG/BCLR/BSET Dn, Ea
    else if ((w & 0xF1C0) === 0x0140) { mn = `BCHG D${(w>>9)&7}, (A${w&7})`; }
    else if ((w & 0xF1C0) === 0x0180) { mn = `BCHG D${(w>>9)&7}, (A${w&7})+`; }
    else if ((w & 0xF1C0) === 0x01C0) { mn = `BCHG D${(w>>9)&7}, (xxx).L`; size = 6; }
    else if ((w & 0xF1C0) === 0x0100) { mn = `BTST D${(w>>9)&7}, D${w&7}`; }
    else if ((w & 0xF1C0) === 0x0110) { mn = `BTST D${(w>>9)&7}, (A${w&7})`; }
    // MOVE.B (An), Dn / MOVE.B (An)+, Dn
    else if ((w & 0xF1C0) === 0x1010) { mn = `MOVE.B (A${w&7}), D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x1018) { mn = `MOVE.B (A${w&7})+, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x1028) { const d=sx16(rw(pc+2)); mn = `MOVE.B ${d>=0?'+':''}${d}(A${w&7}), D${(w>>9)&7}`; size = 4; }
    else if ((w & 0xF1C0) === 0x1030) { mn = `MOVE.B (A${w&7}, D${(w>>9)&7}.W), D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x3010) { mn = `MOVE.W (A${w&7}), D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x3018) { mn = `MOVE.W (A${w&7})+, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x3028) { const d=sx16(rw(pc+2)); mn = `MOVE.W ${d>=0?'+':''}${d}(A${w&7}), D${(w>>9)&7}`; size = 4; }
    else if ((w & 0xF1C0) === 0x2010) { mn = `MOVE.L (A${w&7}), D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x2018) { mn = `MOVE.L (A${w&7})+, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x2028) { const d=sx16(rw(pc+2)); mn = `MOVE.L ${d>=0?'+':''}${d}(A${w&7}), D${(w>>9)&7}`; size = 4; }
    // MOVE.B Dn, (An)
    else if ((w & 0xF1C0) === 0x1080) { mn = `MOVE.B D${(w>>9)&7}, (A${w&7})`; }
    else if ((w & 0xF1C0) === 0x10C0) { mn = `MOVE.B D${(w>>9)&7}, (xxx).L`; size = 6; }
    // MOVE.W Dn, Dn
    else if ((w & 0xF1C0) === 0x3000) { mn = `MOVE.W D${w&7}, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x2000) { mn = `MOVE.L D${w&7}, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x1000) { mn = `MOVE.B D${w&7}, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x2040) { mn = `MOVEA.L D${w&7}, A${(w>>9)&7}`; }
    // ADD/SUB/MULU
    else if ((w & 0xF1C0) === 0xD040) { mn = `ADD.W D${w&7}, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0xD000) { mn = `ADD.B D${w&7}, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0xD080) { mn = `ADD.L D${w&7}, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x9040) { mn = `SUB.W D${w&7}, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x9000) { mn = `SUB.B D${w&7}, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x9080) { mn = `SUB.L D${w&7}, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0xC040) { mn = `MULU.W D${w&7}, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0xC340) { mn = `MULS.W D${w&7}, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x8040) { mn = `DIVU.W D${w&7}, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x8140) { mn = `DIVS.W D${w&7}, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0xB040) { mn = `CMP.W D${w&7}, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0xB000) { mn = `CMP.B D${w&7}, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0xB080) { mn = `CMP.L D${w&7}, D${(w>>9)&7}`; }
    // CMP.W (xxx).W, Dn
    else if ((w & 0xF1C0) === 0xB078) { const a = rw(pc+2); mn = `CMP.W (0x${(a|0xFFFF0000).toString(16)}.W), D${(w>>9)&7}`; size = 4; }
    // ADDQ/SUBQ
    else if ((w & 0xF1F8) === 0x5340) { mn = `SUBQ.W #1, D${(w>>9)&7}`; }
    else if ((w & 0xF1F8) === 0x5140) { mn = `ADDQ.W #1, D${(w>>9)&7}`; }
    else if ((w & 0xF1F8) === 0x5240) { mn = `ADDQ.W #1, D${(w>>9)&7}`; }
    else if ((w & 0xF1F8) === 0x5040) { mn = `ADDQ.W #8, D${(w>>9)&7}`; }
    else if ((w & 0xF1F0) === 0x5000) { const q=(w>>9)&7; mn = `ADDQ.W #${q||8}, D${w&7}`; }
    else if ((w & 0xF1F0) === 0x5300) { const q=(w>>9)&7; mn = `SUBQ.W #${q||8}, D${w&7}`; }
    // DBRA
    else if ((w & 0xF1F8) === 0x51C8) { mn = `DBRA D${w&7}, 0x${(pc+2+sx16(rw(pc+2))).toString(16)}`; size = 4; }
    else if ((w & 0xF1F8) === 0x51C0) { mn = `DBF D${w&7}, 0x${(pc+2+sx16(rw(pc+2))).toString(16)}`; size = 4; }
    // Shifts
    else if ((w & 0xF1F8) === 0xE008) { mn = `LSR.W #${(w>>9)&7||8}, D${w&7}`; }
    else if ((w & 0xF1F8) === 0xE018) { mn = `LSL.W #${(w>>9)&7||8}, D${w&7}`; }
    else if ((w & 0xF1F8) === 0xE000) { mn = `ASR.W #${(w>>9)&7||8}, D${w&7}`; }
    else if ((w & 0xF1F8) === 0xE010) { mn = `ASL.W #${(w>>9)&7||8}, D${w&7}`; }
    else if ((w & 0xF1C0) === 0xE048) { mn = `LSR.W D${w&7}, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0xE0B8) { mn = `LSL.W D${w&7}, D${(w>>9)&7}`; }
    else if ((w & 0xF1F8) === 0x4840) { mn = `SWAP D${w&7}`; }
    // MOVEM
    else if (w === 0x48E7) { mn = `MOVEM.L regs, -(A7) [0x${rw(pc+2).toString(16)}]`; size = 4; }
    else if (w === 0x4CDF) { mn = `MOVEM.L (A7)+, regs [0x${rw(pc+2).toString(16)}]`; size = 4; }
    else if (w === 0x4879) { mn = `MOVEM.L regs, (0x${rl(pc+2).toString(16)}).L [0x${rw(pc+6).toString(16)}]`; size = 8; }
    else { mn = `.word 0x${w.toString(16).padStart(4,'0')}`; }
    
    console.log(`  0x${pc.toString(16).padStart(6,'0')}: ${mn}`);
    if (w === 0x4E75) break;
    pc += size;
  }
}

// 1. 验证 0xC930 处的实际字节
console.log('=== 1. 验证 0xC930 处的实际字节 ===\n');
console.log('0xC930 原始字节:');
for (let i = 0; i < 16; i++) {
  console.log(`  0x${(0xC930+i).toString(16)}: 0x${rb(0xC930+i).toString(16).padStart(2,'0')}`);
}
console.log(`\n0xC930 word = 0x${rw(0xC930).toString(16)}`);
console.log(`0xC932 long = 0x${rl(0xC932).toString(16)} (immediate)`);
console.log(`0xC936 long = 0x${rl(0xC936).toString(16)} (address)`);

if (rw(0xC930) === 0x23FC || rw(0xC930) === 0x21FC) {
  console.log(`\n→ MOVE.L #0x${rl(0xC932).toString(16)}, (0x${rl(0xC936).toString(16)}).L`);
  console.log(`  immediate = 0x${rl(0xC932).toString(16)} (即 0xC93A, 下一个函数地址)`);
  console.log(`  address   = 0x${rl(0xC936).toString(16)}`);
  if (rl(0xC936) === 0xFFFF8004) {
    console.log(`  → 写入 taskFuncPtr (0xFFFF8004) = 0xC93A`);
  }
} else if (rw(0xC930) === 0x203C) {
  console.log(`\n→ MOVE.L #0x${rl(0xC932).toString(16)}, D0`);
  console.log(`  下一条指令在 0xC936`);
}

// 2. 反汇编 0x14E56 (0xFF 命令的 return address)
disasm(0x14E56, 128, '0x14E56 (0xFF 命令的 return address)');

// 3. 反汇编 0xCA00 (开场动画 task function)
disasm(0xCA00, 128, '0xCA00 (开场动画 task function)');

// 4. 反汇编 0xCA32 (BNE 目标)
disasm(0xCA32, 96, '0xCA32 (BNE 目标)');

// 5. 反汇编 0x11C44 (0xFF 处理器调用的函数)
disasm(0x11C44, 128, '0x11C44 (0xFF 处理器调用的函数)');

// 6. 检查 0xFFFF8004 处的写入 (taskFuncPtr)
console.log('\n=== 6. 搜索写入 0xFFFF8004 (taskFuncPtr) ===\n');
for (let i = 0; i < rom.length - 10; i++) {
  if (rw(i) === 0x23FC && rl(i+6) === 0xFFFF8004) {
    console.log(`  ROM 0x${i.toString(16)}: MOVE.L #0x${rl(i+2).toString(16)}, (0xFFFF8004).L`);
  } else if (rw(i) === 0x21FC && rl(i+6) === 0xFFFF8004) {
    console.log(`  ROM 0x${i.toString(16)}: MOVE.L #0x${rl(i+2).toString(16)}, (0xFFFF8004).L`);
  }
}
