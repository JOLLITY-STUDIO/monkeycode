/**
 * 完整解析开场动画脚本 0x19f1a4
 * 1. 深入分析 cmd 0x37 (资源加载) 的参数格式
 * 2. 深入分析 cmd 0x02 (复杂命令) 的参数格式
 * 3. 完整解析脚本，提取所有资源引用
 * 4. 查找资源数据位置
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
function addrW(w) { return ((w | 0xFFFF0000) >>> 0); }

// ============================================================
// 1. 深入分析 cmd 0x37 (0x17640) 的完整代码
// ============================================================
console.log('=== 1. cmd 0x37 (0x17640) 完整反汇编 ===\n');

function disasmCmd(addr, maxInstrs, label) {
  if (label) console.log(`\n--- ${label} ---`);
  let pc = addr;
  for (let i = 0; i < maxInstrs; i++) {
    const w = rw(pc);
    let size = 2;
    let mn = '';

    if (w === 0x4E75) mn = 'RTS';
    else if (w === 0x4E71) mn = 'NOP';
    else if (w === 0x4EF9) { mn = `JMP 0x${rl(pc+2).toString(16)}`; size = 6; }
    else if (w === 0x4EB9) { mn = `JSR 0x${rl(pc+2).toString(16)}`; size = 6; }
    else if (w === 0x4EBA) { mn = `JSR (PC,d16) → 0x${(pc+2+sx16(rw(pc+2))).toString(16)}`; size = 4; }
    else if ((w & 0xFF00) === 0x6100) { mn = `BSR.W 0x${(pc+2+sx16(rw(pc+2))).toString(16)}`; size = 4; }
    else if ((w & 0xF000) === 0x6100 && (w&0xFF)) { mn = `BSR.S 0x${(pc+2+((w&0xFF)>127?(w&0xFF)-256:(w&0xFF))).toString(16)}`; }
    else if ((w & 0xFF00) === 0x6000) { mn = `BRA.W 0x${(pc+2+sx16(rw(pc+2))).toString(16)}`; size = 4; }
    else if ((w & 0xF000) === 0x6000 && (w&0xFF)) { mn = `BRA.S 0x${(pc+2+((w&0xFF)>127?(w&0xFF)-256:(w&0xFF))).toString(16)}`; }
    else if ((w & 0xFF00) === 0x6700) { mn = `BEQ.W 0x${(pc+2+sx16(rw(pc+2))).toString(16)}`; size = 4; }
    else if ((w & 0xF000) === 0x6700 && (w&0xFF)) { mn = `BEQ.S 0x${(pc+2+((w&0xFF)>127?(w&0xFF)-256:(w&0xFF))).toString(16)}`; }
    else if ((w & 0xFF00) === 0x6600) { mn = `BNE.W 0x${(pc+2+sx16(rw(pc+2))).toString(16)}`; size = 4; }
    else if ((w & 0xF000) === 0x6600 && (w&0xFF)) { mn = `BNE.S 0x${(pc+2+((w&0xFF)>127?(w&0xFF)-256:(w&0xFF))).toString(16)}`; }
    else if ((w & 0xFF00) === 0x6500) { mn = `BCS.W 0x${(pc+2+sx16(rw(pc+2))).toString(16)}`; size = 4; }
    else if ((w & 0xFF00) === 0x6400) { mn = `BCC.W 0x${(pc+2+sx16(rw(pc+2))).toString(16)}`; size = 4; }
    // MOVE #imm, (xxx).W 和 (xxx).L
    else if (w === 0x11FC) { mn = `MOVE.B #0x${(rw(pc+2)&0xFF).toString(16)}, (0x${addrW(rw(pc+4)).toString(16)}.W)`; size = 6; }
    else if (w === 0x13FC) { mn = `MOVE.B #0x${(rw(pc+2)&0xFF).toString(16)}, (0x${rl(pc+4).toString(16)}).L`; size = 8; }
    else if (w === 0x31FC) { mn = `MOVE.W #0x${rw(pc+2).toString(16)}, (0x${addrW(rw(pc+4)).toString(16)}.W)`; size = 6; }
    else if (w === 0x33FC) { mn = `MOVE.W #0x${rw(pc+2).toString(16)}, (0x${rl(pc+4).toString(16)}).L`; size = 8; }
    else if (w === 0x21FC) { mn = `MOVE.L #0x${rl(pc+2).toString(16)}, (0x${addrW(rw(pc+6)).toString(16)}.W)`; size = 8; }
    else if (w === 0x23FC) { mn = `MOVE.L #0x${rl(pc+2).toString(16)}, (0x${rl(pc+6).toString(16)}).L`; size = 10; }
    // MOVE #imm, Dn
    else if ((w & 0xF1FF) === 0x003C) { mn = `MOVE.B #0x${(rw(pc+2)&0xFF).toString(16)}, D${(w>>9)&7}`; size = 4; }
    else if ((w & 0xF1FF) === 0x303C) { mn = `MOVE.W #0x${rw(pc+2).toString(16)}, D${(w>>9)&7}`; size = 4; }
    else if ((w & 0xF1FF) === 0x203C) { mn = `MOVE.L #0x${rl(pc+2).toString(16)}, D${(w>>9)&7}`; size = 6; }
    // MOVEQ
    else if ((w & 0xF100) === 0x7000) { const v = w & 0xFF; mn = `MOVEQ #${v>127?v-256:v}, D${(w>>9)&7}`; }
    // MOVE from (xxx).L
    else if ((w & 0xF1F8) === 0x3039) { mn = `MOVE.W (0x${rl(pc+2).toString(16)}).L, D${(w>>9)&7}`; size = 6; }
    else if ((w & 0xF1F8) === 0x1039) { mn = `MOVE.B (0x${rl(pc+2).toString(16)}).L, D${(w>>9)&7}`; size = 6; }
    else if ((w & 0xF1F8) === 0x2039) { mn = `MOVE.L (0x${rl(pc+2).toString(16)}).L, D${(w>>9)&7}`; size = 6; }
    else if ((w & 0xF1F8) === 0x2079) { mn = `MOVEA.L (0x${rl(pc+2).toString(16)}).L, A${(w>>9)&7}`; size = 6; }
    else if ((w & 0xF1F8) === 0x2279) { mn = `MOVEA.L (0x${rl(pc+2).toString(16)}).L, A${(w>>9)&7}`; size = 6; }
    else if ((w & 0xF1F8) === 0x2679) { mn = `MOVEA.L (0x${rl(pc+2).toString(16)}).L, A${(w>>9)&7}`; size = 6; }
    // MOVE from (xxx).W
    else if ((w & 0xF1F8) === 0x3038) { mn = `MOVE.W (0x${addrW(rw(pc+2)).toString(16)}.W), D${(w>>9)&7}`; size = 4; }
    else if ((w & 0xF1F8) === 0x1038) { mn = `MOVE.B (0x${addrW(rw(pc+2)).toString(16)}.W), D${(w>>9)&7}`; size = 4; }
    else if ((w & 0xF1F8) === 0x2038) { mn = `MOVE.L (0x${addrW(rw(pc+2)).toString(16)}.W), D${(w>>9)&7}`; size = 4; }
    else if ((w & 0xF1F8) === 0x2078) { mn = `MOVEA.L (0x${addrW(rw(pc+2)).toString(16)}.W), A${(w>>9)&7}`; size = 4; }
    // MOVE to (xxx).L
    else if ((w & 0xF1F8) === 0x3139) { mn = `MOVE.W D${(w>>9)&7}, (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if ((w & 0xF1F8) === 0x1139) { mn = `MOVE.B D${(w>>9)&7}, (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if ((w & 0xF1F8) === 0x23C0) { mn = `MOVE.L D${(w>>9)&7}, (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if ((w & 0xFFF8) === 0x23C8) { mn = `MOVE.L A${w&7}, (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    // MOVE to (xxx).W
    else if ((w & 0xF1F8) === 0x3138) { mn = `MOVE.W D${(w>>9)&7}, (0x${addrW(rw(pc+2)).toString(16)}.W)`; size = 4; }
    else if ((w & 0xF1F8) === 0x1138) { mn = `MOVE.B D${(w>>9)&7}, (0x${addrW(rw(pc+2)).toString(16)}.W)`; size = 4; }
    else if ((w & 0xF1F8) === 0x2138) { mn = `MOVE.L D${(w>>9)&7}, (0x${addrW(rw(pc+2)).toString(16)}.W)`; size = 4; }
    else if ((w & 0xFFF8) === 0x21C8) { mn = `MOVE.L A${w&7}, (0x${addrW(rw(pc+2)).toString(16)}.W)`; size = 4; }
    // LEA
    else if ((w & 0xF1FF) === 0x41F9) { mn = `LEA 0x${rl(pc+2).toString(16)}, A${(w>>9)&7}`; size = 6; }
    else if ((w & 0xF1FF) === 0x41F8) { mn = `LEA 0x${addrW(rw(pc+2)).toString(16)}.W, A${(w>>9)&7}`; size = 4; }
    else if ((w & 0xF1F8) === 0x41E8) { const d=sx16(rw(pc+2)); mn = `LEA ${d>=0?'+':''}${d}(A${w&7}), A${(w>>9)&7}`; size = 4; }
    else if ((w & 0xF1C0) === 0x41D0) { mn = `LEA (A${w&7}), A${(w>>9)&7}`; }
    // CLR
    else if (w === 0x42B9) { mn = `CLR.L (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if (w === 0x4279) { mn = `CLR.W (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if (w === 0x4239) { mn = `CLR.B (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if (w === 0x42B8) { mn = `CLR.L (0x${addrW(rw(pc+2)).toString(16)}.W)`; size = 4; }
    else if (w === 0x4278) { mn = `CLR.W (0x${addrW(rw(pc+2)).toString(16)}.W)`; size = 4; }
    else if (w === 0x4238) { mn = `CLR.B (0x${addrW(rw(pc+2)).toString(16)}.W)`; size = 4; }
    // TST
    else if (w === 0x4A79) { mn = `TST.W (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if (w === 0x4A39) { mn = `TST.B (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if (w === 0x4A78) { mn = `TST.W (0x${addrW(rw(pc+2)).toString(16)}.W)`; size = 4; }
    else if (w === 0x4A38) { mn = `TST.B (0x${addrW(rw(pc+2)).toString(16)}.W)`; size = 4; }
    else if ((w & 0xF1F8) === 0x4A40) { mn = `TST.W D${w&7}`; }
    else if ((w & 0xF1F8) === 0x4A00) { mn = `TST.B D${w&7}`; }
    // CMPI
    else if ((w & 0xF1F0) === 0x0C40) { mn = `CMPI.W #0x${rw(pc+2).toString(16)}, D${(w>>9)&7}`; size = 4; }
    else if ((w & 0xF1F0) === 0x0C00) { mn = `CMPI.B #0x${(rw(pc+2)&0xFF).toString(16)}, D${(w>>9)&7}`; size = 4; }
    else if ((w & 0xF1F0) === 0x0C80) { mn = `CMPI.L #0x${rl(pc+2).toString(16)}, D${(w>>9)&7}`; size = 6; }
    else if ((w & 0xF1F8) === 0x0C79) { mn = `CMPI.W #0x${rw(pc+2).toString(16)}, (0x${rl(pc+4).toString(16)}).L`; size = 8; }
    else if ((w & 0xF1F8) === 0x0C39) { mn = `CMPI.B #0x${(rw(pc+2)&0xFF).toString(16)}, (0x${rl(pc+4).toString(16)}).L`; size = 8; }
    else if ((w & 0xF1F8) === 0x0C78) { mn = `CMPI.W #0x${rw(pc+2).toString(16)}, (0x${addrW(rw(pc+4)).toString(16)}.W)`; size = 6; }
    else if ((w & 0xF1F8) === 0x0C38) { mn = `CMPI.B #0x${(rw(pc+2)&0xFF).toString(16)}, (0x${addrW(rw(pc+4)).toString(16)}.W)`; size = 6; }
    // BTST/BCHG/BCLR/BSET
    else if ((w & 0xF1F8) === 0x0800) { mn = `BTST #${rw(pc+2)}, D${(w>>9)&7}`; size = 4; }
    else if ((w & 0xF1FF) === 0x0839) { mn = `BTST #${rw(pc+2)}, (0x${rl(pc+4).toString(16)}).L`; size = 8; }
    else if ((w & 0xF1FF) === 0x0838) { mn = `BTST #${rw(pc+2)}, (0x${addrW(rw(pc+4)).toString(16)}.W)`; size = 6; }
    else if ((w & 0xF1C0) === 0x0100) { mn = `BTST D${(w>>9)&7}, D${w&7}`; }
    else if ((w & 0xF1C0) === 0x0140) { mn = `BCHG D${(w>>9)&7}, (A${w&7})`; }
    else if ((w & 0xF1C0) === 0x0180) { mn = `BCHG D${(w>>9)&7}, (A${w&7})+`; }
    else if ((w & 0xF1C0) === 0x0880) { mn = `BCLR D${(w>>9)&7}, (A${w&7})+`; }
    // MOVE.B/W/L (An), Dn / (An)+, Dn / d16(An), Dn
    else if ((w & 0xF1C0) === 0x1010) { mn = `MOVE.B (A${w&7}), D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x1018) { mn = `MOVE.B (A${w&7})+, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x1028) { const d=sx16(rw(pc+2)); mn = `MOVE.B ${d>=0?'+':''}${d}(A${w&7}), D${(w>>9)&7}`; size = 4; }
    else if ((w & 0xF1C0) === 0x3010) { mn = `MOVE.W (A${w&7}), D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x3018) { mn = `MOVE.W (A${w&7})+, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x3028) { const d=sx16(rw(pc+2)); mn = `MOVE.W ${d>=0?'+':''}${d}(A${w&7}), D${(w>>9)&7}`; size = 4; }
    else if ((w & 0xF1C0) === 0x2010) { mn = `MOVE.L (A${w&7}), D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x2018) { mn = `MOVE.L (A${w&7})+, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x2028) { const d=sx16(rw(pc+2)); mn = `MOVE.L ${d>=0?'+':''}${d}(A${w&7}), D${(w>>9)&7}`; size = 4; }
    // MOVE.B/W/L Dn, (An) / d16(An)
    else if ((w & 0xF1C0) === 0x1080) { mn = `MOVE.B D${(w>>9)&7}, (A${w&7})`; }
    else if ((w & 0xF1C0) === 0x3080) { mn = `MOVE.W D${(w>>9)&7}, (A${w&7})`; }
    else if ((w & 0xF1C0) === 0x2080) { mn = `MOVE.L D${(w>>9)&7}, (A${w&7})`; }
    else if ((w & 0xF1C0) === 0x3128) { const d=sx16(rw(pc+2)); mn = `MOVE.W D${(w>>9)&7}, ${d>=0?'+':''}${d}(A${w&7})`; size = 4; }
    else if ((w & 0xF1C0) === 0x2128) { const d=sx16(rw(pc+2)); mn = `MOVE.L D${(w>>9)&7}, ${d>=0?'+':''}${d}(A${w&7})`; size = 4; }
    // MOVE Dn, Dn
    else if ((w & 0xF1C0) === 0x3000) { mn = `MOVE.W D${w&7}, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x2000) { mn = `MOVE.L D${w&7}, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x1000) { mn = `MOVE.B D${w&7}, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x2040) { mn = `MOVEA.L D${w&7}, A${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x3040) { mn = `MOVEA.W D${w&7}, A${(w>>9)&7}`; }
    // ADD/SUB/MULU/DIV/CMP
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
    else if ((w & 0xF1C0) === 0xB048) { mn = `CMPA.W D${w&7}, A${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0xB0C0) { mn = `CMPA.L D${w&7}, A${(w>>9)&7}`; }
    // ADDA
    else if ((w & 0xF1C0) === 0xD0C0) { mn = `ADDA.W D${w&7}, A${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0xD1C0) { mn = `ADDA.L D${w&7}, A${(w>>9)&7}`; }
    else if (w === 0xD0F9) { mn = `ADDA.W (0x${rl(pc+2).toString(16)}).L, A0`; size = 6; }
    else if (w === 0xD1F9) { mn = `ADDA.L (0x${rl(pc+2).toString(16)}).L, A0`; size = 6; }
    // ADDQ/SUBQ
    else if ((w & 0xF1F8) === 0x5340) { mn = `SUBQ.W #1, D${(w>>9)&7}`; }
    else if ((w & 0xF1F8) === 0x5140) { mn = `ADDQ.W #1, D${(w>>9)&7}`; }
    else if ((w & 0xF1F8) === 0x5240) { mn = `ADDQ.W #1, D${(w>>9)&7}`; }
    else if ((w & 0xF1F0) === 0x5000) { const q=(w>>9)&7; mn = `ADDQ #${q||8}, D${w&7}`; }
    else if ((w & 0xF1F0) === 0x5300) { const q=(w>>9)&7; mn = `SUBQ #${q||8}, D${w&7}`; }
    else if ((w & 0xF1F0) === 0x5100) { const q=(w>>9)&7; mn = `SUBQ #${q||8}, D${w&7}`; }
    // DBRA
    else if ((w & 0xF1F8) === 0x51C8) { mn = `DBRA D${w&7}, 0x${(pc+2+sx16(rw(pc+2))).toString(16)}`; size = 4; }
    else if ((w & 0xF1F8) === 0x51C0) { mn = `DBF D${w&7}, 0x${(pc+2+sx16(rw(pc+2))).toString(16)}`; size = 4; }
    // Shifts
    else if ((w & 0xF1F8) === 0xE008) { mn = `LSR.W #${(w>>9)&7||8}, D${w&7}`; }
    else if ((w & 0xF1F8) === 0xE018) { mn = `LSL.W #${(w>>9)&7||8}, D${w&7}`; }
    else if ((w & 0xF1F8) === 0xE000) { mn = `ASR.W #${(w>>9)&7||8}, D${w&7}`; }
    else if ((w & 0xF1F8) === 0xE010) { mn = `ASL.W #${(w>>9)&7||8}, D${w&7}`; }
    else if ((w & 0xF1F8) === 0x4840) { mn = `SWAP D${w&7}`; }
    else if ((w & 0xF1F8) === 0x4880) { mn = `EXT.W D${w&7}`; }
    else if ((w & 0xF1C0) === 0xE048) { mn = `LSR.W D${w&7}, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0xE058) { mn = `LSL.W D${w&7}, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0xE040) { mn = `ASR.W D${w&7}, D${(w>>9)&7}`; }
    // MOVEM
    else if (w === 0x48E7) { mn = `MOVEM.L regs, -(A7) [0x${rw(pc+2).toString(16)}]`; size = 4; }
    else if (w === 0x4CDF) { mn = `MOVEM.L (A7)+, regs [0x${rw(pc+2).toString(16)}]`; size = 4; }
    else if ((w & 0xF1F8) === 0x48D0) { mn = `MOVEM.L regs, (A${w&7}) [0x${rw(pc+2).toString(16)}]`; size = 4; }
    // JMP (An)
    else if ((w & 0xFFF8) === 0x4ED0) mn = `JMP (A${w&7})`;
    // MOVEA.L (d8(An,Xn),An)
    else if ((w & 0xF1C0) === 0x2070) { const ext=rw(pc+2); const idxr=(ext>>12)&7; const idxs=(ext&0x8000)?'L':'W'; const an=w&7; const dn=(w>>9)&7; const idxType=(ext&0x800)?'A':'D'; mn = `MOVEA.L (${idxType}${idxr}.${idxs}, A${an}), A${dn}`; size = 4; }
    else { mn = `.word 0x${w.toString(16).padStart(4,'0')}`; }

    console.log(`  0x${pc.toString(16).padStart(6,'0')}: ${mn}`);
    if (w === 0x4E75 || w === 0x4EF9) break;
    pc += size;
  }
  return pc;
}

disasmCmd(0x17640, 40, 'cmd 0x37 (0x17640) 资源加载');

// ============================================================
// 2. 分析 0x11C44 (资源查找函数)
// ============================================================
disasmCmd(0x11C44, 30, '0x11C44 资源查找函数');

// ============================================================
// 3. 分析 0x177A2 和 0x17776 (资源加载子函数)
// ============================================================
disasmCmd(0x177A2, 30, '0x177A2 资源加载子函数A');
disasmCmd(0x17776, 30, '0x17776 资源加载子函数B');

// ============================================================
// 4. 分析 cmd 0x02 (0x159FC) 的参数格式
// ============================================================
disasmCmd(0x159FC, 40, 'cmd 0x02 (0x159FC) 复杂命令');

// ============================================================
// 5. 分析 0x17C4A (cmd 0x02 调用的子函数)
// ============================================================
disasmCmd(0x17C4A, 30, '0x17C4A (cmd 0x02 子函数)');

// ============================================================
// 6. 完整解析脚本 0x19f1a4
// ============================================================
console.log('\n=== 6. 完整解析脚本 0x19f1a4 ===\n');

// 命令总字节数 (0xFFFFAA2C 的值)
const cmdSizes = {
  0x00: 4,   // 4B total (1+3 params)
  0x02: 8,   // 8B total (1+7 params)
  0x04: 0,   // 特殊: 直接修改 A0
  0x06: 0,   // 特殊: 直接修改 A0
  0x07: 0,   // 特殊: 直接修改 A0
  0x08: 4,   // 4B total
  0x0c: 4,   // 4B total
  0x0d: 4,   // 4B total
  0x12: 4,   // 4B total
  0x16: 0,   // 特殊: 直接修改 A0
  0x17: 0,   // 特殊: 直接修改 A0
  0x37: 4,   // 4B total
  0xff: 1,   // YIELD
};

// 对于特殊命令 (size=0), 需要根据后续分析确定大小
// 暂时假设它们消耗 1 字节 (只有命令字节)
const cmdSpecialSize = {
  0x04: 2,   // 假设 2B (1+1)
  0x06: 2,   // 假设 2B
  0x07: 2,   // 假设 2B
  0x16: 1,   // 假设 1B
  0x17: 2,   // 假设 2B (1+1)
};

let pos = 0x19f1a4;
let cmdIdx = 0;
const scriptEnd = 0x19f800; // 限制范围
const commands = [];

while (cmdIdx < 200 && pos < scriptEnd) {
  const cmd = rb(pos);
  
  if (cmd === 0xff) {
    console.log(`  [${cmdIdx.toString().padStart(3)}] 0x${pos.toString(16)}: YIELD (0xFF)`);
    commands.push({ addr: pos, cmd: 0xff, size: 1, params: [] });
    pos += 1;
    cmdIdx++;
    continue;
  }
  
  let size = cmdSizes[cmd];
  if (size === undefined) {
    // 尝试特殊命令
    if (cmdSpecialSize[cmd] !== undefined) {
      size = cmdSpecialSize[cmd];
    } else {
      console.log(`  [${cmdIdx.toString().padStart(3)}] 0x${pos.toString(16)}: UNKNOWN cmd=0x${cmd.toString(16)}`);
      break;
    }
  }
  
  if (size === 0) {
    // 特殊命令，使用 cmdSpecialSize
    size = cmdSpecialSize[cmd] || 1;
  }
  
  const params = [];
  for (let i = 1; i < size; i++) {
    params.push(rb(pos + i));
  }
  
  const paramStr = params.map(p => '0x' + p.toString(16).padStart(2, '0')).join(' ');
  console.log(`  [${cmdIdx.toString().padStart(3)}] 0x${pos.toString(16)}: cmd=0x${cmd.toString(16).padStart(2,'0')} params=[${paramStr}] (${size}B)`);
  
  commands.push({ addr: pos, cmd, size, params });
  pos += size;
  cmdIdx++;
}

// ============================================================
// 7. 提取所有 cmd 0x37 的资源引用
// ============================================================
console.log('\n=== 7. cmd 0x37 资源引用 ===\n');

const resourceRefs = [];
for (const c of commands) {
  if (c.cmd === 0x37) {
    // 参数格式: [byte0, byte1, byte2]
    // 可能是: resourceID (byte0), 目标 (byte1), 标志 (byte2)
    // 或者: 24位值
    const p = c.params;
    console.log(`  0x${c.addr.toString(16)}: params=[${p.map(x=>'0x'+x.toString(16).padStart(2,'0')).join(' ')}]`);
    console.log(`    可能的资源ID: 0x${p[0].toString(16)} (${p[0]})`);
    console.log(`    24位值: 0x${((p[0]<<16)|(p[1]<<8)|p[2]).toString(16)}`);
    resourceRefs.push({ addr: c.addr, id: p[0], raw: p });
  }
}

// ============================================================
// 8. 查找资源数据
// ============================================================
console.log('\n=== 8. 查找资源数据 ===\n');

// 资源指针表在 0xB06B4 (从之前的分析)
// 资源 ID 0x8001 对应 entry 0
// 所以资源 ID 0x15 (21) 对应 entry 21?
// 或者资源 ID 0x2a (42) 对应 entry 42?

console.log('资源指针表 0xB06B4 (前 64 entries):');
for (let i = 0; i < 64; i++) {
  const ptr = rl(0xB06B4 + i * 4);
  if (ptr !== 0 && ptr < rom.length) {
    console.log(`  [${i}] 0x${(0xB06B4 + i * 4).toString(16)}: → 0x${ptr.toString(16)}`);
  }
}

// 查找资源 0x15, 0x2a-0x2f
console.log('\n特定资源查找:');
const targetIds = [0x15, 0x2a, 0x2b, 0x2c, 0x2d, 0x2e, 0x2f];
for (const id of targetIds) {
  const ptr = rl(0xB06B4 + id * 4);
  console.log(`  资源 0x${id.toString(16)}: ptr=0x${ptr.toString(16)}`);
  if (ptr > 0 && ptr < rom.length) {
    // 显示前 32 字节
    let hex = '';
    for (let i = 0; i < 32; i++) {
      hex += rb(ptr + i).toString(16).padStart(2, '0') + ' ';
    }
    console.log(`    数据: ${hex}`);
  }
}
