/**
 * 深度反汇编 0xC92C 任务函数链, 查找开场动画调用路径
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

// 更完整的 68K 反汇编器
function disasm(addr, length, label = '') {
  if (label) console.log(`\n--- ${label} ---`);
  let pc = addr;
  while (pc < addr + length) {
    const startPc = pc;
    const w = rw(pc);
    let line = `0x${pc.toString(16).padStart(6, '0')}: `;
    let size = 2;
    let mnemonic = '';
    
    // RTS
    if (w === 0x4E75) { mnemonic = 'RTS'; }
    // JMP / JSR absolute
    else if (w === 0x4EF9) { mnemonic = `JMP 0x${rl(pc+2).toString(16)}`; size = 6; }
    else if (w === 0x4EB9) { mnemonic = `JSR 0x${rl(pc+2).toString(16)}`; size = 6; }
    // JMP / JSR (abs.w)
    else if (w === 0x4EF8) { mnemonic = `JMP 0x${rw(pc+2).toString(16).padStart(4,'0')}`; size = 4; }
    else if (w === 0x4EB8) { mnemonic = `JSR 0x${rw(pc+2).toString(16).padStart(4,'0')}`; size = 4; }
    // JSR (PC, d16) - 0x4EBA
    else if (w === 0x4EBA) { 
      const o = rw(pc+2); const t = pc + 4 + (o > 32767 ? o - 65536 : o);
      mnemonic = `JSR (PC,d16) → 0x${t.toString(16)}`; size = 4; 
    }
    else if (w === 0x4EFA) { 
      const o = rw(pc+2); const t = pc + 4 + (o > 32767 ? o - 65536 : o);
      mnemonic = `JMP (PC,d16) → 0x${t.toString(16)}`; size = 4; 
    }
    // BSR.W / BRA.W / BEQ.W / BNE.W
    else if ((w & 0xFF00) === 0x6100) { const o = rw(pc+2); const t = pc + 4 + (o > 32767 ? o - 65536 : o); mnemonic = `BSR.W 0x${t.toString(16)}`; size = 4; }
    else if ((w & 0xFF00) === 0x6000) { const o = rw(pc+2); const t = pc + 4 + (o > 32767 ? o - 65536 : o); mnemonic = `BRA.W 0x${t.toString(16)}`; size = 4; }
    else if ((w & 0xFF00) === 0x6700) { const o = rw(pc+2); const t = pc + 4 + (o > 32767 ? o - 65536 : o); mnemonic = `BEQ.W 0x${t.toString(16)}`; size = 4; }
    else if ((w & 0xFF00) === 0x6600) { const o = rw(pc+2); const t = pc + 4 + (o > 32767 ? o - 65536 : o); mnemonic = `BNE.W 0x${t.toString(16)}`; size = 4; }
    else if ((w & 0xFF00) === 0x6500) { const o = rw(pc+2); const t = pc + 4 + (o > 32767 ? o - 65536 : o); mnemonic = `BCS.W 0x${t.toString(16)}`; size = 4; }
    else if ((w & 0xFF00) === 0x6400) { const o = rw(pc+2); const t = pc + 4 + (o > 32767 ? o - 65536 : o); mnemonic = `BCC.W 0x${t.toString(16)}`; size = 4; }
    else if ((w & 0xFF00) === 0x6300) { const o = rw(pc+2); const t = pc + 4 + (o > 32767 ? o - 65536 : o); mnemonic = `BLT.W 0x${t.toString(16)}`; size = 4; }
    else if ((w & 0xFF00) === 0x6200) { const o = rw(pc+2); const t = pc + 4 + (o > 32767 ? o - 65536 : o); mnemonic = `BHI.W 0x${t.toString(16)}`; size = 4; }
    else if ((w & 0xFF00) === 0x6F00) { const o = rw(pc+2); const t = pc + 4 + (o > 32767 ? o - 65536 : o); mnemonic = `BLE.W 0x${t.toString(16)}`; size = 4; }
    else if ((w & 0xFF00) === 0x6C00) { const o = rw(pc+2); const t = pc + 4 + (o > 32767 ? o - 65536 : o); mnemonic = `BGE.W 0x${t.toString(16)}`; size = 4; }
    else if ((w & 0xFF00) === 0x6D00) { const o = rw(pc+2); const t = pc + 4 + (o > 32767 ? o - 65536 : o); mnemonic = `BLT.W 0x${t.toString(16)}`; size = 4; }
    // BSR.S / BRA.S / BEQ.S / BNE.S (8-bit offset, non-zero)
    else if ((w & 0xFF00) === 0x61 && (w & 0xFF) !== 0 && (w & 0xFF) !== 0xFF) { const o = w & 0xFF; const t = pc + 2 + (o > 127 ? o - 256 : o); mnemonic = `BSR.S 0x${t.toString(16)}`; }
    else if ((w & 0xFF00) === 0x60 && (w & 0xFF) !== 0 && (w & 0xFF) !== 0xFF) { const o = w & 0xFF; const t = pc + 2 + (o > 127 ? o - 256 : o); mnemonic = `BRA.S 0x${t.toString(16)}`; }
    else if ((w & 0xFF00) === 0x67 && (w & 0xFF) !== 0 && (w & 0xFF) !== 0xFF) { const o = w & 0xFF; const t = pc + 2 + (o > 127 ? o - 256 : o); mnemonic = `BEQ.S 0x${t.toString(16)}`; }
    else if ((w & 0xFF00) === 0x66 && (w & 0xFF) !== 0 && (w & 0xFF) !== 0xFF) { const o = w & 0xFF; const t = pc + 2 + (o > 127 ? o - 256 : o); mnemonic = `BNE.S 0x${t.toString(16)}`; }
    else if ((w & 0xFF00) === 0x64 && (w & 0xFF) !== 0 && (w & 0xFF) !== 0xFF) { const o = w & 0xFF; const t = pc + 2 + (o > 127 ? o - 256 : o); mnemonic = `BCC.S 0x${t.toString(16)}`; }
    else if ((w & 0xFF00) === 0x65 && (w & 0xFF) !== 0 && (w & 0xFF) !== 0xFF) { const o = w & 0xFF; const t = pc + 2 + (o > 127 ? o - 256 : o); mnemonic = `BCS.S 0x${t.toString(16)}`; }
    else if ((w & 0xFF00) === 0x6B && (w & 0xFF) !== 0 && (w & 0xFF) !== 0xFF) { const o = w & 0xFF; const t = pc + 2 + (o > 127 ? o - 256 : o); mnemonic = `BMI.S 0x${t.toString(16)}`; }
    else if ((w & 0xFF00) === 0x6A && (w & 0xFF) !== 0 && (w & 0xFF) !== 0xFF) { const o = w & 0xFF; const t = pc + 2 + (o > 127 ? o - 256 : o); mnemonic = `BPL.S 0x${t.toString(16)}`; }
    // MOVEQ
    else if ((w & 0xF100) === 0x7000) { const r = (w>>9)&7; const v = w & 0xFF; mnemonic = `MOVEQ #0x${v.toString(16)}${v >= 0x80 ? ` (=${v-256})` : ''}, D${r}`; }
    // CMPI
    else if ((w & 0xF1F8) === 0x0C40) { const r=(w>>9)&7; mnemonic = `CMPI.W #0x${rw(pc+2).toString(16)}, D${r}`; size = 4; }
    else if ((w & 0xF1F8) === 0x0C00) { const r=(w>>9)&7; mnemonic = `CMPI.B #0x${rw(pc+2).toString(16)}, D${r}`; size = 4; }
    else if ((w & 0xF1F8) === 0x0C80) { const r=(w>>9)&7; mnemonic = `CMPI.L #0x${rl(pc+2).toString(16)}, D${r}`; size = 6; }
    else if ((w & 0xF1C0) === 0x0C78) { const r=(w>>9)&7; mnemonic = `CMPI.W #0x${rw(pc+2).toString(16)}, (0x${rw(pc+4).toString(16).padStart(4,'0')}).W`; size = 6; }
    else if ((w & 0xF1C0) === 0x0C79) { const r=(w>>9)&7; mnemonic = `CMPI.W #0x${rw(pc+2).toString(16)}, (0x${rl(pc+4).toString(16)}).L`; size = 8; }
    // MOVE.W #imm, (abs).L
    else if (w === 0x31FC) { mnemonic = `MOVE.W #0x${rw(pc+2).toString(16)}, (0x${rl(pc+4).toString(16)}).L`; size = 8; }
    else if (w === 0x33FC) { mnemonic = `MOVE.W #0x${rw(pc+2).toString(16)}, (0x${rl(pc+4).toString(16)}).L`; size = 8; }
    else if (w === 0x23FC) { mnemonic = `MOVE.L #0x${rl(pc+2).toString(16)}, (0x${rl(pc+6).toString(16)}).L`; size = 10; }
    else if (w === 0x11FC) { mnemonic = `MOVE.B #0x${rw(pc+2).toString(16)}, (0x${rl(pc+4).toString(16)}).L`; size = 8; }
    else if (w === 0x13FC) { mnemonic = `MOVE.B #0x${rw(pc+2).toString(16)}, (0x${rl(pc+4).toString(16)}).L`; size = 8; }
    // MOVE.W #imm, Dn
    else if ((w & 0xF1F0) === 0x303C) { const r=(w>>9)&7; mnemonic = `MOVE.W #0x${rw(pc+2).toString(16)}, D${r}`; size = 4; }
    else if ((w & 0xF1F0) === 0x323C) { const r=(w>>9)&7; mnemonic = `MOVE.W #0x${rw(pc+2).toString(16)}, D${r}`; size = 4; }
    else if ((w & 0xF1F0) === 0x203C) { const r=(w>>9)&7; mnemonic = `MOVE.L #0x${rl(pc+2).toString(16)}, D${r}`; size = 6; }
    // MOVE.W (abs).L, Dn  - 0x3X39
    else if ((w & 0xF1F8) === 0x3039) { const r=(w>>9)&7; mnemonic = `MOVE.W (0x${rl(pc+2).toString(16)}).L, D${r}`; size = 6; }
    else if ((w & 0xF1F8) === 0x2039) { const r=(w>>9)&7; mnemonic = `MOVE.L (0x${rl(pc+2).toString(16)}).L, D${r}`; size = 6; }
    else if ((w & 0xF1F8) === 0x1039) { const r=(w>>9)&7; mnemonic = `MOVE.B (0x${rl(pc+2).toString(16)}).L, D${r}`; size = 6; }
    // MOVE.W (abs).W
    else if ((w & 0xF1F8) === 0x3038) { const r=(w>>9)&7; mnemonic = `MOVE.W (0x${rw(pc+2).toString(16).padStart(4,'0')}).W, D${r}`; size = 4; }
    else if ((w & 0xF1F8) === 0x2038) { const r=(w>>9)&7; mnemonic = `MOVE.L (0x${rw(pc+2).toString(16).padStart(4,'0')}).W, D${r}`; size = 4; }
    // LEA
    else if ((w & 0xF1FF) === 0x41F9) { const r=(w>>9)&7; mnemonic = `LEA 0x${rl(pc+2).toString(16)}, A${r}`; size = 6; }
    else if ((w & 0xF1FF) === 0x41F8) { const r=(w>>9)&7; mnemonic = `LEA (0x${rw(pc+2).toString(16).padStart(4,'0')}).W, A${r}`; size = 4; }
    else if ((w & 0xF1FF) === 0x41FA) { const r=(w>>9)&7; const o = rw(pc+2); const t = pc + 2 + (o > 32767 ? o - 65536 : o); mnemonic = `LEA (PC,d16) → 0x${t.toString(16)}, A${r}`; size = 4; }
    else if ((w & 0xF1C0) === 0x41C0) { const r=(w>>9)&7; const m = w & 0x3F; mnemonic = `LEA (mode${m.toString(16)}), A${r}`; }
    // MOVEA.L
    else if ((w & 0xF1F8) === 0x2079) { const r=(w>>9)&7; mnemonic = `MOVEA.L (0x${rl(pc+2).toString(16)}).L, A${r}`; size = 6; }
    else if ((w & 0xF1F8) === 0x2078) { const r=(w>>9)&7; mnemonic = `MOVEA.L (0x${rw(pc+2).toString(16).padStart(4,'0')}).W, A${r}`; size = 4; }
    // CLR
    else if (w === 0x4279) { mnemonic = `CLR.W (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if (w === 0x4239) { mnemonic = `CLR.B (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if (w === 0x42B9) { mnemonic = `CLR.L (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if ((w & 0xF1F8) === 0x4280) { const r=(w>>9)&7; mnemonic = `CLR.W D${r}`; }
    else if ((w & 0xF1F8) === 0x4180) { const r=(w>>9)&7; mnemonic = `CLR.L D${r}`; }
    // TST
    else if (w === 0x4A79) { mnemonic = `TST.W (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if (w === 0x4A39) { mnemonic = `TST.B (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if (w === 0x4AB9) { mnemonic = `TST.L (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if ((w & 0xF1F8) === 0x4A80) { const r=(w>>9)&7; mnemonic = `TST.W D${r}`; }
    // MOVEM
    else if (w === 0x48E7) { mnemonic = `MOVEM.L D0-D7/A0-A6, -(A7) [0x${rw(pc+2).toString(16)}]`; size = 4; }
    else if (w === 0x4CDF) { mnemonic = `MOVEM.L (A7)+, D0-D7/A0-A6 [0x${rw(pc+2).toString(16)}]`; size = 4; }
    else if ((w & 0xFFFF) === 0x48D7 || (w & 0xFFFF) === 0x48D6) { mnemonic = `MOVEM regs, -(A7)`; size = 4; }
    // DBRA
    else if ((w & 0xF1F8) === 0x51C8) { const r=w&7; const o=rw(pc+2); const t = pc + 2 + (o > 32767 ? o - 65536 : o); mnemonic = `DBRA D${r}, 0x${t.toString(16)}`; size = 4; }
    else if ((w & 0xF1F8) === 0x50C8) { const r=w&7; const o=rw(pc+2); const t = pc + 2 + (o > 32767 ? o - 65536 : o); mnemonic = `DBT D${r}, 0x${t.toString(16)}`; size = 4; }
    // SUBQ / ADDQ
    else if ((w & 0xF1F8) === 0x5340) { const r=(w>>9)&7; mnemonic = `SUBQ.W #1, D${r}`; }
    else if ((w & 0xF1F8) === 0x5348) { const r=(w>>9)&7; mnemonic = `SUBQ.W #1, A${r}`; }
    else if ((w & 0xF1F8) === 0x5140) { const r=(w>>9)&7; mnemonic = `ADDQ.W #1, D${r}`; }
    else if ((w & 0xF1F8) === 0x5148) { const r=(w>>9)&7; mnemonic = `ADDQ.W #1, A${r}`; }
    else if ((w & 0xF1F0) === 0x5340) { const r=(w>>9)&7; const m = w & 0x3F; mnemonic = `SUBQ.W #1, (mode${m.toString(16)})`; }
    else if ((w & 0xF1F0) === 0x5140) { const r=(w>>9)&7; const m = w & 0x3F; mnemonic = `ADDQ.W #1, (mode${m.toString(16)})`; }
    // ADD.W Dn, Dn
    else if ((w & 0xF1C0) === 0xD0C0) { const r=(w>>9)&7; const s=w&0x3F; mnemonic = `ADD.W D${s&7}, D${r}`; }
    else if ((w & 0xF1C0) === 0xD1C0) { const r=(w>>9)&7; const s=w&0x3F; mnemonic = `ADD.L D${s&7}, D${r}`; }
    else if ((w & 0xF1C0) === 0x90C0) { const r=(w>>9)&7; const s=w&0x3F; mnemonic = `SUB.W D${s&7}, D${r}`; }
    // LSL/LSR
    else if ((w & 0xF1F8) === 0xE048) { const r=(w>>9)&7; mnemonic = `LSR.W #1, D${r}`; }
    else if ((w & 0xF1F8) === 0xE049) { const r=(w>>9)&7; mnemonic = `LSR.W #1, D${r}`; }
    else if ((w & 0xF1F8) === 0xE140) { const r=(w>>9)&7; mnemonic = `LSL.W #1, D${r}`; }
    else if ((w & 0xF1F0) === 0xE140) { const r=(w>>9)&7; const c = (w>>6)&7; mnemonic = `LSL.W #${c}, D${r}`; }
    else if ((w & 0xF1F0) === 0xE040) { const r=(w>>9)&7; const c = (w>>6)&7; mnemonic = `LSR.W #${c}, D${r}`; }
    // BTST
    else if (w === 0x0839) { const bit=rw(pc+2); const dst=rl(pc+4); mnemonic = `BTST #${bit}, (0x${dst.toString(16)}).L`; size = 8; }
    else if (w === 0x0838) { const bit=rw(pc+2); const dst=rw(pc+4); mnemonic = `BTST #${bit}, (0x${dst.toString(16).padStart(4,'0')}).W`; size = 6; }
    else if ((w & 0xF1FF) === 0x0800) { const r=(w>>9)&7; const bit=rw(pc+2); mnemonic = `BTST #${bit}, D${r}`; size = 4; }
    // MOVE.W d16(An), Dn
    else if ((w & 0xF1C0) === 0x3028) { const r=(w>>9)&7; const a=w&7; const o=(int8)=>rw(pc+2); const off = (w & 0x38) === 0x28 ? (rw(pc+2) << 16 >> 16) : 0; 
      // d16(An)
      const disp = rw(pc+2); const sd = disp > 32767 ? disp - 65536 : disp;
      mnemonic = `MOVE.W ${sd>=0?'+':''}${sd}(A${a}), D${r}`; size = 4; 
    }
    else if ((w & 0xF1C0) === 0x2028) { const r=(w>>9)&7; const a=w&7; const disp = rw(pc+2); const sd = disp > 32767 ? disp - 65536 : disp;
      mnemonic = `MOVE.L ${sd>=0?'+':''}${sd}(A${a}), D${r}`; size = 4; 
    }
    else if ((w & 0xF1C0) === 0x1028) { const r=(w>>9)&7; const a=w&7; const disp = rw(pc+2); const sd = disp > 32767 ? disp - 65536 : disp;
      mnemonic = `MOVE.B ${sd>=0?'+':''}${sd}(A${a}), D${r}`; size = 4; 
    }
    else if ((w & 0xF1C0) === 0x3128) { const r=(w>>9)&7; const a=w&7; const disp = rw(pc+2); const sd = disp > 32767 ? disp - 65536 : disp;
      mnemonic = `MOVE.W D${r}, ${sd>=0?'+':''}${sd}(A${a})`; size = 4; 
    }
    else if ((w & 0xF1C0) === 0x2128) { const r=(w>>9)&7; const a=w&7; const disp = rw(pc+2); const sd = disp > 32767 ? disp - 65536 : disp;
      mnemonic = `MOVE.B D${r}, ${sd>=0?'+':''}${sd}(A${a})`; size = 4; 
    }
    // MOVE.W (An), Dn
    else if ((w & 0xF1C0) === 0x3010) { const r=(w>>9)&7; const a=w&7; mnemonic = `MOVE.W (A${a}), D${r}`; }
    else if ((w & 0xF1C0) === 0x2010) { const r=(w>>9)&7; const a=w&7; mnemonic = `MOVE.L (A${a}), D${r}`; }
    else if ((w & 0xF1C0) === 0x1010) { const r=(w>>9)&7; const a=w&7; mnemonic = `MOVE.B (A${a}), D${r}`; }
    // MOVE.W (An, Dn.W), Dn  - 0x30 30 + (r<<9) | (0<<3) | a  -> 0x3030+r*0x200+a
    else if ((w & 0xF1C0) === 0x3030) { const r=(w>>9)&7; const a=w&7; mnemonic = `MOVE.W (A${a}, D0.W), D${r}`; }
    else if ((w & 0xF1C0) === 0x3230) { const r=(w>>9)&7; const a=w&7; mnemonic = `MOVE.W (A${a}, D1.W), D${r}`; }
    else if ((w & 0xF1C0) === 0x3430) { const r=(w>>9)&7; const a=w&7; mnemonic = `MOVE.W (A${a}, D2.W), D${r}`; }
    else if ((w & 0xF1C0) === 0x3630) { const r=(w>>9)&7; const a=w&7; mnemonic = `MOVE.W (A${a}, D3.W), D${r}`; }
    // MOVEA.W
    else if ((w & 0xF1C0) === 0x3040) { const r=(w>>9)&7; const a=w&7; mnemonic = `MOVEA.W D${a}, A${r}`; }
    else if ((w & 0xF1C0) === 0x3050) { const r=(w>>9)&7; const a=w&7; mnemonic = `MOVEA.W A${a}, A${r}`; }
    else if ((w & 0xF1C0) === 0x3070) { const r=(w>>9)&7; const a=w&7; mnemonic = `MOVEA.W (A${a}), A${r}`; }
    // MOVE.W Dn, Dn
    else if ((w & 0xF1C0) === 0x3000) { const r=(w>>9)&7; const s=w&7; mnemonic = `MOVE.W D${s}, D${r}`; }
    else if ((w & 0xF1C0) === 0x2000) { const r=(w>>9)&7; const s=w&7; mnemonic = `MOVE.L D${s}, D${r}`; }
    else if ((w & 0xF1C0) === 0x1000) { const r=(w>>9)&7; const s=w&7; mnemonic = `MOVE.B D${s}, D${r}`; }
    // MOVE.W Dn, (abs).L  - 0x3X80+ doesn't match, use 31C0
    else if ((w & 0xF1C0) === 0x31C0) { const r=(w>>9)&7; const m=w&0x3F; mnemonic = `MOVE.W D${r}, (mode${m.toString(16)})`; }
    // AND.W Dn, Dn
    else if ((w & 0xF1C0) === 0xC0C0) { const r=(w>>9)&7; const s=w&7; mnemonic = `AND.W D${s}, D${r}`; }
    else if ((w & 0xF1C0) === 0x80C0) { const r=(w>>9)&7; const s=w&7; mnemonic = `OR.W D${s}, D${r}`; }
    else if ((w & 0xF1C0) === 0xE0C0) { const r=(w>>9)&7; const s=w&7; mnemonic = `ASR.W D${s}, D${r}`; }
    else if ((w & 0xF1C0) === 0xE1C0) { const r=(w>>9)&7; const s=w&7; mnemonic = `ASL.W D${s}, D${r}`; }
    else if ((w & 0xF1C0) === 0xE2C0) { const r=(w>>9)&7; const s=w&7; mnemonic = `LSR.W D${s}, D${r}`; }
    else if ((w & 0xF1C0) === 0xE3C0) { const r=(w>>9)&7; const s=w&7; mnemonic = `LSL.W D${s}, D${r}`; }
    // ANDI #imm
    else if (w === 0x0279) { mnemonic = `ANDI.W #0x${rw(pc+2).toString(16)}, (0x${rl(pc+4).toString(16)}).L`; size = 8; }
    else if (w === 0x0679) { mnemonic = `ADDI.W #0x${rw(pc+2).toString(16)}, (0x${rl(pc+4).toString(16)}).L`; size = 8; }
    else if (w === 0x0479) { mnemonic = `SUBI.W #0x${rw(pc+2).toString(16)}, (0x${rl(pc+4).toString(16)}).L`; size = 8; }
    else if (w === 0x0039) { mnemonic = `ORI #0x${rw(pc+2).toString(16)}, (0x${rl(pc+4).toString(16)}).L`; size = 8; }
    // NOP / RESET
    else if (w === 0x4E71) { mnemonic = 'NOP'; }
    else if (w === 0x4E70) { mnemonic = 'RESET'; }
    else if (w === 0x4E72) { mnemonic = `STOP #0x${rw(pc+2).toString(16)}`; size = 4; }
    // MOVE.W SR
    else if (w === 0x40C0) { mnemonic = 'MOVE.W SR, D0'; }
    else if (w === 0x46FC) { mnemonic = `MOVE.W #0x${rw(pc+2).toString(16)}, SR`; size = 4; }
    else if ((w & 0xFFF8) === 0x40C0) { const r = w&7; mnemonic = `MOVE.W SR, D${r}`; }
    // dbCC with display
    else { mnemonic = `.word 0x${w.toString(16).padStart(4,'0')}`; }
    
    console.log(`  ${line}${mnemonic}`);
    pc += size;
  }
}

// 把 8 位带符号
function int8(v) { return v & 0x80 ? v - 256 : v; }

// === 主分析 ===
console.log('=== 1. 0xC92C 默认任务函数 (开场动画入口候选) ===');
disasm(0xC92C, 96, '0xC92C 默认任务函数');

console.log('\n=== 2. 0xC93A 下一阶段任务 ===');
disasm(0xC93A, 128, '0xC93A');

console.log('\n=== 3. 0xC9A0 任务调度核心 ===');
disasm(0xC9A0, 192, '0xC9A0');

console.log('\n=== 4. 0xCA34 开场动画路径 ===');
disasm(0xCA34, 192, '0xCA34');

console.log('\n=== 5. 0xC914 FUN 调用路径 ===');
disasm(0xC914, 32, '0xC914');

console.log('\n=== 6. 0xCA00-0xCB00 完整开场动画代码块 ===');
disasm(0xCA00, 256, '0xCA00-0xCB00');

console.log('\n=== 7. 搜索任务函数指针表 ===');
// DAT_ffff8004 = 当前任务函数指针, 查找所有写入 0xFFFF8004 的地方
console.log('搜索 MOVEA.L #addr, 0xFFFF8004 或 MOVE.L #addr, 0xFFFF8004:');
for (let i = 0; i < rom.length - 10; i++) {
  if (rw(i) === 0x21FC && rl(i+6) === 0xFFFF8004) {
    const val = rl(i+2);
    console.log(`  ROM 0x${i.toString(16)}: MOVE.L #0x${val.toString(16)}, (0xFFFF8004).L`);
  }
}
console.log('\n搜索 LEA 0xXXXX, An + MOVE.L An, 0xFFFF8004 模式:');
// 简单点: 找所有引用 0xFFFF8004 的代码
for (let i = 0; i < rom.length - 4; i++) {
  if (rl(i) === 0xFFFF8004) {
    // 前后查看
    const prev2 = rw(i-2);
    const prev4 = rw(i-4);
    if (prev2 === 0x21FC || prev2 === 0x23FC || prev2 === 0x2EBC || prev2 === 0x2EF9) {
      // skip, already found
    } else {
      console.log(`  ROM 0x${i.toString(16)}: 引用 0xFFFF8004, 上下文: 0x${rw(i-4).toString(16)} 0x${rw(i-2).toString(16)} ...`);
    }
  }
}

console.log('\n=== 8. 任务函数指针列表 ===');
// 找出所有可能的 task function addresses (写到 0xFFFF8004 的值)
console.log('已知任务函数地址:');
const taskFuncs = [0xC92C, 0xC93A, 0xC9A0, 0xCA34];
for (const a of taskFuncs) {
  console.log(`  0x${a.toString(16)}`);
}
