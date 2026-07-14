/**
 * 深度分析动画状态机: 0x14D90 switch cases
 * 和 0x87C0 (读取动画参数的函数)
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

function disasm(addr, length, label = '') {
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
    else if (w === 0x4EBA) { const o = rw(pc+2); const t = pc + 2 + (o > 0x7FFF ? o - 0x10000 : o); mnemonic = `JSR (PC,d16) → 0x${t.toString(16)}`; size = 4; }
    else if (w === 0x4EFA) { const o = rw(pc+2); const t = pc + 2 + (o > 0x7FFF ? o - 0x10000 : o); mnemonic = `JMP (PC,d16) → 0x${t.toString(16)}`; size = 4; }
    else if ((w & 0xFF00) === 0x6100) { const o = rw(pc+2); const t = pc + 2 + (o > 0x7FFF ? o - 0x10000 : o); mnemonic = `BSR.W 0x${t.toString(16)}`; size = 4; }
    else if ((w & 0xFF00) === 0x6000) { const o = rw(pc+2); const t = pc + 2 + (o > 0x7FFF ? o - 0x10000 : o); mnemonic = `BRA.W 0x${t.toString(16)}`; size = 4; }
    else if ((w & 0xFF00) === 0x6700) { const o = rw(pc+2); const t = pc + 2 + (o > 0x7FFF ? o - 0x10000 : o); mnemonic = `BEQ.W 0x${t.toString(16)}`; size = 4; }
    else if ((w & 0xFF00) === 0x6600) { const o = rw(pc+2); const t = pc + 2 + (o > 0x7FFF ? o - 0x10000 : o); mnemonic = `BNE.W 0x${t.toString(16)}`; size = 4; }
    else if ((w & 0xFF00) === 0x6500) { const o = rw(pc+2); const t = pc + 2 + (o > 0x7FFF ? o - 0x10000 : o); mnemonic = `BCS.W 0x${t.toString(16)}`; size = 4; }
    else if ((w & 0xFF00) === 0x6400) { const o = rw(pc+2); const t = pc + 2 + (o > 0x7FFF ? o - 0x10000 : o); mnemonic = `BCC.W 0x${t.toString(16)}`; size = 4; }
    else if ((w & 0xFF00) === 0x6300) { const o = rw(pc+2); const t = pc + 2 + (o > 0x7FFF ? o - 0x10000 : o); mnemonic = `BLT.W 0x${t.toString(16)}`; size = 4; }
    else if ((w & 0xFF00) === 0x6C00) { const o = rw(pc+2); const t = pc + 2 + (o > 0x7FFF ? o - 0x10000 : o); mnemonic = `BGE.W 0x${t.toString(16)}`; size = 4; }
    else if ((w & 0xFF00) === 0x6D00) { const o = rw(pc+2); const t = pc + 2 + (o > 0x7FFF ? o - 0x10000 : o); mnemonic = `BLT.W 0x${t.toString(16)}`; size = 4; }
    else if ((w & 0xFF00) === 0x6200) { const o = rw(pc+2); const t = pc + 2 + (o > 0x7FFF ? o - 0x10000 : o); mnemonic = `BHI.W 0x${t.toString(16)}`; size = 4; }
    else if ((w & 0xFF00) === 0x6F00) { const o = rw(pc+2); const t = pc + 2 + (o > 0x7FFF ? o - 0x10000 : o); mnemonic = `BLE.W 0x${t.toString(16)}`; size = 4; }
    else if ((w & 0xFF00) === 0x61 && (w & 0xFF) !== 0 && (w & 0xFF) !== 0xFF) { const o = w & 0xFF; const t = pc + 2 + (o > 127 ? o - 256 : o); mnemonic = `BSR.S 0x${t.toString(16)}`; }
    else if ((w & 0xFF00) === 0x60 && (w & 0xFF) !== 0 && (w & 0xFF) !== 0xFF) { const o = w & 0xFF; const t = pc + 2 + (o > 127 ? o - 256 : o); mnemonic = `BRA.S 0x${t.toString(16)}`; }
    else if ((w & 0xFF00) === 0x67 && (w & 0xFF) !== 0 && (w & 0xFF) !== 0xFF) { const o = w & 0xFF; const t = pc + 2 + (o > 127 ? o - 256 : o); mnemonic = `BEQ.S 0x${t.toString(16)}`; }
    else if ((w & 0xFF00) === 0x66 && (w & 0xFF) !== 0 && (w & 0xFF) !== 0xFF) { const o = w & 0xFF; const t = pc + 2 + (o > 127 ? o - 256 : o); mnemonic = `BNE.S 0x${t.toString(16)}`; }
    else if ((w & 0xFF00) === 0x64 && (w & 0xFF) !== 0 && (w & 0xFF) !== 0xFF) { const o = w & 0xFF; const t = pc + 2 + (o > 127 ? o - 256 : o); mnemonic = `BCC.S 0x${t.toString(16)}`; }
    else if ((w & 0xFF00) === 0x65 && (w & 0xFF) !== 0 && (w & 0xFF) !== 0xFF) { const o = w & 0xFF; const t = pc + 2 + (o > 127 ? o - 256 : o); mnemonic = `BCS.S 0x${t.toString(16)}`; }
    else if ((w & 0xF100) === 0x7000) { const r = (w>>9)&7; const v = w & 0xFF; mnemonic = `MOVEQ #0x${v.toString(16)}${v>=0x80?` (=${v-256})`:''}, D${r}`; }
    else if ((w & 0xF1F8) === 0x0C40) { const r=(w>>9)&7; mnemonic = `CMPI.W #0x${rw(pc+2).toString(16)}, D${r}`; size = 4; }
    else if ((w & 0xF1F8) === 0x0C00) { const r=(w>>9)&7; mnemonic = `CMPI.B #0x${rw(pc+2).toString(16)}, D${r}`; size = 4; }
    else if (w === 0x31FC) { mnemonic = `MOVE.W #0x${rw(pc+2).toString(16)}, (0x${rl(pc+4).toString(16)}).L`; size = 8; }
    else if (w === 0x33FC) { mnemonic = `MOVE.W #0x${rw(pc+2).toString(16)}, (0x${rl(pc+4).toString(16)}).L`; size = 8; }
    else if (w === 0x23FC) { mnemonic = `MOVE.L #0x${rl(pc+2).toString(16)}, (0x${rl(pc+6).toString(16)}).L`; size = 10; }
    else if (w === 0x21FC) { mnemonic = `MOVE.L #0x${rl(pc+2).toString(16)}, (0x${rl(pc+6).toString(16)}).L`; size = 10; }
    else if (w === 0x11FC) { mnemonic = `MOVE.B #0x${rw(pc+2).toString(16)}, (0x${rl(pc+4).toString(16)}).L`; size = 8; }
    else if (w === 0x13FC) { mnemonic = `MOVE.B #0x${rw(pc+2).toString(16)}, (0x${rl(pc+4).toString(16)}).L`; size = 8; }
    else if ((w & 0xF1F0) === 0x303C) { const r=(w>>9)&7; mnemonic = `MOVE.W #0x${rw(pc+2).toString(16)}, D${r}`; size = 4; }
    else if ((w & 0xF1F0) === 0x323C) { const r=(w>>9)&7; mnemonic = `MOVE.W #0x${rw(pc+2).toString(16)}, D${r}`; size = 4; }
    else if ((w & 0xF1F8) === 0x3039) { const r=(w>>9)&7; mnemonic = `MOVE.W (0x${rl(pc+2).toString(16)}).L, D${r}`; size = 6; }
    else if ((w & 0xF1F8) === 0x1039) { const r=(w>>9)&7; mnemonic = `MOVE.B (0x${rl(pc+2).toString(16)}).L, D${r}`; size = 6; }
    else if ((w & 0xF1F8) === 0x2039) { const r=(w>>9)&7; mnemonic = `MOVE.L (0x${rl(pc+2).toString(16)}).L, D${r}`; size = 6; }
    else if ((w & 0xF1F8) === 0x3139) { const r=(w>>9)&7; mnemonic = `MOVE.W D${r}, (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if ((w & 0xF1F8) === 0x1139) { const r=(w>>9)&7; mnemonic = `MOVE.B D${r}, (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if ((w & 0xF1FF) === 0x41F9) { const r=(w>>9)&7; mnemonic = `LEA 0x${rl(pc+2).toString(16)}, A${r}`; size = 6; }
    else if ((w & 0xF1FF) === 0x41F8) { const r=(w>>9)&7; mnemonic = `LEA (0x${rw(pc+2).toString(16).padStart(4,'0')}).W, A${r}`; size = 4; }
    else if ((w & 0xF1FF) === 0x41FA) { const r=(w>>9)&7; const o = rw(pc+2); const t = pc + 2 + (o > 0x7FFF ? o - 0x10000 : o); mnemonic = `LEA (PC,d16) → 0x${t.toString(16)}, A${r}`; size = 4; }
    else if ((w & 0xF1F8) === 0x2079) { const r=(w>>9)&7; mnemonic = `MOVEA.L (0x${rl(pc+2).toString(16)}).L, A${r}`; size = 6; }
    else if ((w & 0xF1F8) === 0x2279) { const r=(w>>9)&7; mnemonic = `MOVEA.L (0x${rl(pc+2).toString(16)}).L, A${r}`; size = 6; }
    else if ((w & 0xF1F8) === 0x2379) { const r=(w>>9)&7; mnemonic = `MOVEA.L (0x${rl(pc+2).toString(16)}).L, A${r}`; size = 6; }
    else if ((w & 0xF1F8) === 0x2679) { const r=(w>>9)&7; mnemonic = `MOVEA.L (0x${rl(pc+2).toString(16)}).L, A${r}`; size = 6; }
    else if ((w & 0xF1F8) === 0x2779) { const r=(w>>9)&7; mnemonic = `MOVEA.L (0x${rl(pc+2).toString(16)}).L, A${r}`; size = 6; }
    else if (w === 0x4279) { mnemonic = `CLR.W (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if (w === 0x4239) { mnemonic = `CLR.B (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if (w === 0x42B9) { mnemonic = `CLR.L (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if (w === 0x4A79) { mnemonic = `TST.W (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if (w === 0x4A39) { mnemonic = `TST.B (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if (w === 0x0C39) { mnemonic = `CMPI.B #0x${rw(pc+2).toString(16)}, (0x${rl(pc+4).toString(16)}).L`; size = 8; }
    else if (w === 0x0C79) { mnemonic = `CMPI.W #0x${rw(pc+2).toString(16)}, (0x${rl(pc+4).toString(16)}).L`; size = 8; }
    else if (w === 0x0839) { const bit=rw(pc+2); const dst=rl(pc+4); mnemonic = `BTST #${bit}, (0x${dst.toString(16)}).L`; size = 8; }
    else if ((w & 0xFFFF) === 0x0838) { const bit=rw(pc+2); const dst=rw(pc+4); mnemonic = `BTST #${bit}, (0x${dst.toString(16).padStart(4,'0')}).W`; size = 6; }
    else if (w === 0x48E7) { mnemonic = `MOVEM.L regs, -(A7) [0x${rw(pc+2).toString(16)}]`; size = 4; }
    else if (w === 0x4CDF) { mnemonic = `MOVEM.L (A7)+, regs [0x${rw(pc+2).toString(16)}]`; size = 4; }
    else if ((w & 0xF1F8) === 0x51C8) { const r=w&7; const o=rw(pc+2); const t = pc + 2 + (o > 0x7FFF ? o - 0x10000 : o); mnemonic = `DBRA D${r}, 0x${t.toString(16)}`; size = 4; }
    else if ((w & 0xF1F8) === 0x5340) { const r=(w>>9)&7; mnemonic = `SUBQ.W #1, D${r}`; }
    else if ((w & 0xF1F8) === 0x5140) { const r=(w>>9)&7; mnemonic = `ADDQ.W #1, D${r}`; }
    else if ((w & 0xF1F8) === 0x5348) { const r=(w>>9)&7; mnemonic = `SUBQ.W #1, A${r}`; }
    else if ((w & 0xF1F8) === 0x5148) { const r=(w>>9)&7; mnemonic = `ADDQ.W #1, A${r}`; }
    else if ((w & 0xF1C0) === 0xD0C0) { const r=(w>>9)&7; const s=w&0x3F; mnemonic = `ADD.W D${s&7}, D${r}`; }
    else if ((w & 0xF1C0) === 0x90C0) { const r=(w>>9)&7; const s=w&0x3F; mnemonic = `SUB.W D${s&7}, D${r}`; }
    else if ((w & 0xF1C0) === 0x3000) { const r=(w>>9)&7; const s=w&7; mnemonic = `MOVE.W D${s}, D${r}`; }
    else if ((w & 0xF1C0) === 0x2000) { const r=(w>>9)&7; const s=w&7; mnemonic = `MOVE.L D${s}, D${r}`; }
    else if ((w & 0xF1C0) === 0x1000) { const r=(w>>9)&7; const s=w&7; mnemonic = `MOVE.B D${s}, D${r}`; }
    else if ((w & 0xF1C0) === 0x3028) { const r=(w>>9)&7; const a=w&7; const disp = rw(pc+2); const sd = disp > 0x7FFF ? disp - 0x10000 : disp; mnemonic = `MOVE.W ${sd>=0?'+':''}${sd}(A${a}), D${r}`; size = 4; }
    else if ((w & 0xF1C0) === 0x3128) { const r=(w>>9)&7; const a=w&7; const disp = rw(pc+2); const sd = disp > 0x7FFF ? disp - 0x10000 : disp; mnemonic = `MOVE.W D${r}, ${sd>=0?'+':''}${sd}(A${a})`; size = 4; }
    else if ((w & 0xF1C0) === 0x1028) { const r=(w>>9)&7; const a=w&7; const disp = rw(pc+2); const sd = disp > 0x7FFF ? disp - 0x10000 : disp; mnemonic = `MOVE.B ${sd>=0?'+':''}${sd}(A${a}), D${r}`; size = 4; }
    else if ((w & 0xF1C0) === 0x1128) { const r=(w>>9)&7; const a=w&7; const disp = rw(pc+2); const sd = disp > 0x7FFF ? disp - 0x10000 : disp; mnemonic = `MOVE.B D${r}, ${sd>=0?'+':''}${sd}(A${a})`; size = 4; }
    else if ((w & 0xF1C0) === 0x3010) { const r=(w>>9)&7; const a=w&7; mnemonic = `MOVE.W (A${a}), D${r}`; }
    else if ((w & 0xF1C0) === 0x3110) { const r=(w>>9)&7; const a=w&7; mnemonic = `MOVE.W D${r}, (A${a})`; }
    else if ((w & 0xF1C0) === 0x1010) { const r=(w>>9)&7; const a=w&7; mnemonic = `MOVE.B (A${a}), D${r}`; }
    else if ((w & 0xF1C0) === 0x1110) { const r=(w>>9)&7; const a=w&7; mnemonic = `MOVE.B D${r}, (A${a})`; }
    else if ((w & 0xF1C0) === 0x7000) { const r=(w>>9)&7; const v = w & 0xFF; mnemonic = `MOVEQ #0x${v.toString(16)}, D${r}`; }
    else if ((w & 0xF1C0) === 0x3030) { const r=(w>>9)&7; const a=w&7; const idx=(w>>6)&1; mnemonic = `MOVE.W (A${a}, D${idx}.W), D${r}`; size = 2; }
    else if ((w & 0xF1C0) === 0x2030) { const r=(w>>9)&7; const a=w&7; const idx=(w>>6)&1; mnemonic = `MOVE.L (A${a}, D${idx}.W), D${r}`; size = 2; }
    else if ((w & 0xF1C0) === 0xE040) { const r=(w>>9)&7; const c=(w>>6)&7; mnemonic = `LSR.W #${c}, D${r}`; }
    else if ((w & 0xF1C0) === 0xE140) { const r=(w>>9)&7; const c=(w>>6)&7; mnemonic = `LSL.W #${c}, D${r}`; }
    else if ((w & 0xF1C0) === 0xE048) { const r=(w>>9)&7; const c=(w>>6)&7; mnemonic = `LSR.W #${c}, D${r}`; }
    else if ((w & 0xF1C0) === 0xE840) { const r=(w>>9)&7; const c=(w>>6)&7; mnemonic = `ASR.W #${c}, D${r}`; }
    else if ((w & 0xF1C0) === 0xE940) { const r=(w>>9)&7; const c=(w>>6)&7; mnemonic = `ASL.W #${c}, D${r}`; }
    else if ((w & 0xF1C0) === 0xC0C0) { const r=(w>>9)&7; const s=w&0x3F; mnemonic = `AND.W D${s&7}, D${r}`; }
    else if ((w & 0xF1C0) === 0x80C0) { const r=(w>>9)&7; const s=w&0x3F; mnemonic = `OR.W D${s&7}, D${r}`; }
    else if (w === 0x4E71) { mnemonic = 'NOP'; }
    else if (w === 0x4E70) { mnemonic = 'RESET'; }
    else if (w === 0x46FC) { mnemonic = `MOVE.W #0x${rw(pc+2).toString(16)}, SR`; size = 4; }
    else if (w === 0x40E7) { mnemonic = 'MOVE.W SR, -(A7)'; }
    else if (w === 0x46E7) { mnemonic = 'MOVE.W SR, -(A7)?'; }
    else { mnemonic = `.word 0x${w.toString(16).padStart(4,'0')}`; }
    
    console.log(`  ${line}${mnemonic}`);
    pc += size;
  }
}

// 反汇编 0x14D90 完整 switch 语句
console.log('=== 1. 0x14D90 完整 switch (动画状态机) ===');
disasm(0x14D90, 384, '0x14D90 动画状态机');

console.log('\n=== 2. case 0x14E26 (bit 7 set) ===');
disasm(0x14E26, 64, 'case bit7');

console.log('\n=== 3. case 0x14E68 (bit 0 set) ===');
disasm(0x14E68, 128, 'case bit0');

console.log('\n=== 4. case 0x14F42 (bit 1 set) ===');
disasm(0x14F42, 128, 'case bit1');

console.log('\n=== 5. case 0x15082 (bit 2 set) ===');
disasm(0x15082, 128, 'case bit2');

console.log('\n=== 6. case 0x151F0 (bit 5 set) ===');
disasm(0x151F0, 64, 'case bit5');

console.log('\n=== 7. case 0x152F0 (bit 3 set) ===');
disasm(0x152F0, 64, 'case bit3');

console.log('\n=== 8. case 0x155B0 (bit 4 set) ===');
disasm(0x155B0, 64, 'case bit4');

console.log('\n=== 9. case 0x1564A (bit 6 set) ===');
disasm(0x1564A, 128, 'case bit6');

// 反汇编 0x87C0 - 读取 0xFFFFA4A6 的函数
console.log('\n=== 10. 0x87C0 (读取动画参数的函数) ===');
disasm(0x87C0, 128, '0x87C0');

// 反汇编 0x23AB2 附近
console.log('\n=== 11. 0x23AA0 附近 (另一个读取 0xFFFFA4A6 的地方) ===');
disasm(0x23AA0, 64, '0x23AA0');
