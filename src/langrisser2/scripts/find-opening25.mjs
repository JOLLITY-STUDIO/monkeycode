/**
 * 深入分析开场动画:
 * 1. 修正 MOVEA.L (A0,D0.W) 等 indexed 模式
 * 2. 分析 0x14DA6 状态机各 case 跳转目标
 * 3. 读取 scenarioIndex=15 的脚本数据 (0x19f1a4)
 * 4. 检查资源指针表内容
 * 5. 分析 0x99B2 (资源加载核心)
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

// 改进版反汇编器，支持 indexed 寻址模式
function disasm(addr, length, label) {
  if (label) console.log(`\n--- ${label} ---`);
  let pc = addr;
  const end = addr + length;
  while (pc < end) {
    const w = rw(pc);
    let size = 2;
    let mn = '';
    
    // JMP/JSR
    if (w === 0x4E75) mn = 'RTS';
    else if (w === 0x4E71) mn = 'NOP';
    else if (w === 0x4E73) mn = 'RTE';
    else if (w === 0x4EF9) { mn = `JMP 0x${rl(pc+2).toString(16)}`; size = 6; }
    else if (w === 0x4EB9) { mn = `JSR 0x${rl(pc+2).toString(16)}`; size = 6; }
    else if (w === 0x4EBA) { mn = `JSR (PC,d16) → 0x${(pc+2+sx16(rw(pc+2))).toString(16)}`; size = 4; }
    else if (w === 0x4EB8) { mn = `JSR 0x${rw(pc+2).toString(16)}.W`; size = 4; }
    else if (w === 0x4EF8) { mn = `JMP 0x${rw(pc+2).toString(16)}.W`; size = 4; }
    else if ((w & 0xFFF8) === 0x4ED0) mn = `JMP (A${w&7})`;
    // BSR/BRA/Bcc
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
    else if ((w & 0xF1C0) === 0x41C0) { mn = `LEA (A${w&7})+, A${(w>>9)&7}`; }
    // CLR
    else if (w === 0x42B9) { mn = `CLR.L (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if (w === 0x4279) { mn = `CLR.W (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if (w === 0x4239) { mn = `CLR.B (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if (w === 0x42B8) { mn = `CLR.L (0x${addrW(rw(pc+2)).toString(16)}.W)`; size = 4; }
    else if (w === 0x4278) { mn = `CLR.W (0x${addrW(rw(pc+2)).toString(16)}.W)`; size = 4; }
    else if (w === 0x4238) { mn = `CLR.B (0x${addrW(rw(pc+2)).toString(16)}.W)`; size = 4; }
    else if ((w & 0xF1F8) === 0x4218) mn = `CLR.L (A${w&7})+`;
    else if ((w & 0xF1F8) === 0x4250) mn = `CLR.L (A${w&7})`;
    else if ((w & 0xF1F8) === 0x4290) { const d=sx16(rw(pc+2)); mn = `CLR.L ${d>=0?'+':''}${d}(A${w&7})`; size = 4; }
    else if ((w & 0xF1F8) === 0x4258) mn = `CLR.W (A${w&7})+`;
    else if ((w & 0xF1F8) === 0x4210) mn = `CLR.B (A${w&7})`;
    else if ((w & 0xF1F8) === 0x4250) mn = `CLR.W (A${w&7})`;
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
    // BTST/BCHG/BCLR/BSET 静态位号
    else if ((w & 0xF1F8) === 0x0800) { mn = `BTST #${rw(pc+2)}, D${(w>>9)&7}`; size = 4; }
    else if ((w & 0xF1FF) === 0x0839) { mn = `BTST #${rw(pc+2)}, (0x${rl(pc+4).toString(16)}).L`; size = 8; }
    else if ((w & 0xF1FF) === 0x0838) { mn = `BTST #${rw(pc+2)}, (0x${addrW(rw(pc+4)).toString(16)}.W)`; size = 6; }
    else if ((w & 0xF1FF) === 0x0830) { mn = `BTST #${rw(pc+2)}, (A${w&7})`; size = 4; }
    else if ((w & 0xF1FF) === 0x08B9) { mn = `BCLR #${rw(pc+2)}, (0x${rl(pc+4).toString(16)}).L`; size = 8; }
    else if ((w & 0xF1FF) === 0x08B8) { mn = `BCLR #${rw(pc+2)}, (0x${addrW(rw(pc+4)).toString(16)}.W)`; size = 6; }
    else if ((w & 0xF1C0) === 0x0880) { mn = `BCLR #${rw(pc+2)}, (A${w&7})`; size = 4; }
    else if ((w & 0xF1FF) === 0x08F9) { mn = `BSET #${rw(pc+2)}, (0x${rl(pc+4).toString(16)}).L`; size = 8; }
    else if ((w & 0xF1FF) === 0x08F8) { mn = `BSET #${rw(pc+2)}, (0x${addrW(rw(pc+4)).toString(16)}.W)`; size = 6; }
    else if ((w & 0xF1FF) === 0x08F0) { mn = `BSET #${rw(pc+2)}, (A${w&7})`; size = 4; }
    // BTST/BCHG 动态位号 (Dn)
    else if ((w & 0xF1C0) === 0x0100) { mn = `BTST D${(w>>9)&7}, D${w&7}`; }
    else if ((w & 0xF1C0) === 0x0140) { mn = `BTST D${(w>>9)&7}, (A${w&7})`; }
    else if ((w & 0xF1C0) === 0x0150) { mn = `BCHG D${(w>>9)&7}, (A${w&7})`; }
    else if ((w & 0xF1C0) === 0x0180) { mn = `BCHG D${(w>>9)&7}, D${w&7}`; }
    else if ((w & 0xF1C0) === 0x0880) { mn = `BCLR D${(w>>9)&7}, D${w&7}`; }
    else if ((w & 0xF1C0) === 0x08C0) { mn = `BCLR D${(w>>9)&7}, (A${w&7})`; }
    else if ((w & 0xF1C0) === 0x0980) { mn = `BCLR D${(w>>9)&7}, D${w&7}`; }
    // MOVE.B/W/L (An), Dn / (An)+, Dn / d16(An), Dn / d8(An,Xn), Dn
    else if ((w & 0xF1C0) === 0x1010) { mn = `MOVE.B (A${w&7}), D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x1018) { mn = `MOVE.B (A${w&7})+, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x1028) { const d=sx16(rw(pc+2)); mn = `MOVE.B ${d>=0?'+':''}${d}(A${w&7}), D${(w>>9)&7}`; size = 4; }
    else if ((w & 0xF1C0) === 0x1030) { mn = `MOVE.B (A${w&7}, D${(w>>9)&7}.W), D${(w>>9)&7} [indexed]`; }
    else if ((w & 0xF1C0) === 0x3010) { mn = `MOVE.W (A${w&7}), D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x3018) { mn = `MOVE.W (A${w&7})+, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x3028) { const d=sx16(rw(pc+2)); mn = `MOVE.W ${d>=0?'+':''}${d}(A${w&7}), D${(w>>9)&7}`; size = 4; }
    else if ((w & 0xF1C0) === 0x3030) { const ext=rw(pc+2); const idxr=(ext>>12)&7; const idxs=(ext&0x8000)?'L':'W'; const an=w&7; mn = `MOVE.W (${ext&0x800?'A'+idxr:'D'+idxr}.${idxs}, A${an}), D${(w>>9)&7}`; size = 4; }
    else if ((w & 0xF1C0) === 0x2010) { mn = `MOVE.L (A${w&7}), D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x2018) { mn = `MOVE.L (A${w&7})+, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x2028) { const d=sx16(rw(pc+2)); mn = `MOVE.L ${d>=0?'+':''}${d}(A${w&7}), D${(w>>9)&7}`; size = 4; }
    else if ((w & 0xF1C0) === 0x2030) { const ext=rw(pc+2); const idxr=(ext>>12)&7; const idxs=(ext&0x8000)?'L':'W'; const an=w&7; mn = `MOVE.L (D${idxr}.${idxs}, A${an}), D${(w>>9)&7}`; size = 4; }
    // MOVE.B/W/L Dn, (An) / d16(An) / (An)+
    else if ((w & 0xF1C0) === 0x1080) { mn = `MOVE.B D${(w>>9)&7}, (A${w&7})`; }
    else if ((w & 0xF1C0) === 0x3080) { mn = `MOVE.W D${(w>>9)&7}, (A${w&7})`; }
    else if ((w & 0xF1C0) === 0x2080) { mn = `MOVE.L D${(w>>9)&7}, (A${w&7})`; }
    else if ((w & 0xF1C0) === 0x3128) { const d=sx16(rw(pc+2)); mn = `MOVE.W D${(w>>9)&7}, ${d>=0?'+':''}${d}(A${w&7})`; size = 4; }
    else if ((w & 0xF1C0) === 0x2128) { const d=sx16(rw(pc+2)); mn = `MOVE.L D${(w>>9)&7}, ${d>=0?'+':''}${d}(A${w&7})`; size = 4; }
    else if ((w & 0xF1C0) === 0x1028) { const d=sx16(rw(pc+2)); mn = `MOVE.B ${d>=0?'+':''}${d}(A${w&7}), D${(w>>9)&7}`; size = 4; }
    // MOVE.B/W/L (An)+, An-  (movea with postincrement)
    else if ((w & 0xF1C0) === 0x2018) mn = `MOVE.L (A${w&7})+, D${(w>>9)&7}`;
    else if ((w & 0xF1C0) === 0x2040) { mn = `MOVEA.L D${w&7}, A${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x3040) { mn = `MOVEA.W D${w&7}, A${(w>>9)&7}`; }
    // MOVEA.L (d8(An,Xn)), An  - 关键! MOVEA.L (A0,D0.W), A0
    else if ((w & 0xF1C0) === 0x2070) { const ext=rw(pc+2); const idxr=(ext>>12)&7; const idxs=(ext&0x8000)?'L':'W'; const an=w&7; const dn=(w>>9)&7; mn = `MOVEA.L (${ext&0x800?'A'+idxr:'D'+idxr}.${idxs}, A${an}), A${dn}`; size = 4; }
    else if ((w & 0xF1C0) === 0x2070) { const ext=rw(pc+2); const idxr=(ext>>12)&7; const idxs=(ext&0x8000)?'L':'W'; const an=w&7; const dn=(w>>9)&7; mn = `MOVEA.L (D${idxr}.${idxs}, A${an}), A${dn}`; size = 4; }
    // MOVE Dn, Dn
    else if ((w & 0xF1C0) === 0x3000) { mn = `MOVE.W D${w&7}, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x2000) { mn = `MOVE.L D${w&7}, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x1000) { mn = `MOVE.B D${w&7}, D${(w>>9)&7}`; }
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
    else if ((w & 0xF1F8) === 0xD0C0) mn = `ADDA.W D${w&7}, A${(w>>9)&7}`;
    // ADDQ/SUBQ
    else if ((w & 0xF1F8) === 0x5340) { mn = `SUBQ.W #1, D${(w>>9)&7}`; }
    else if ((w & 0xF1F8) === 0x5140) { mn = `SUBQ.W #1, D${(w>>9)&7}`; }
    else if ((w & 0xF1F8) === 0x5240) { mn = `ADDQ.W #1, D${(w>>9)&7}`; }
    else if ((w & 0xF1F0) === 0x5000) { const q=(w>>9)&7; mn = `ADDQ #${q||8}, D${w&7}`; }
    else if ((w & 0xF1F0) === 0x5300) { const q=(w>>9)&7; mn = `SUBQ #${q||8}, D${w&7}`; }
    else if ((w & 0xF1F0) === 0x5100) { const q=(w>>9)&7; mn = `SUBQ #${q||8}, D${w&7}`; }
    else if ((w & 0xF1F0) === 0x50C0) { const q=(w>>9)&7; const an=w&7; mn = `ADDQ #${q||8}, (A${an})`; }
    else if ((w & 0xF1F0) === 0x50C8) { const q=(w>>9)&7; const an=w&7; mn = `Scc D${an}`; }
    else if ((w & 0xF1F0) === 0x53C0) { const q=(w>>9)&7; const an=w&7; mn = `SUBQ #${q||8}, (A${an})`; }
    else if ((w & 0xF1F0) === 0x5180) { const q=(w>>9)&7; const an=w&7; mn = `SUBQ.L #${q||8}, A${an}`; }
    else if ((w & 0xF1F0) === 0x5080) { const q=(w>>9)&7; const an=w&7; mn = `ADDQ.L #${q||8}, A${an}`; }
    else if ((w & 0xF1F8) === 0x5DC0) { const q=(w>>9)&7; const an=w&7; mn = `ADDQ.L #${q||8}, A${an}`; }
    else if ((w & 0xF1F8) === 0x59C0) { const q=(w>>9)&7; const an=w&7; mn = `SUBQ.L #${q||8}, A${an}`; }
    // ADDA.W Dn, An  (0xD0C0 already handled above)
    else if ((w & 0xF1C0) === 0xD0C0) { const s=w&7; const dn=(w>>9)&7; mn = `ADDA.W D${s}, A${dn}`; }
    // ADDA.L (A0)+, A1  (0xD1D8)
    else if ((w & 0xFFF8) === 0xD1D8) mn = `ADDA.L (A0)+, A1`;
    else if ((w & 0xFFF8) === 0xD1D0) mn = `ADDA.L (A${w&3})+, A1`;
    // DBcc
    else if ((w & 0xF1F8) === 0x51C8) { mn = `DBRA D${w&7}, 0x${(pc+2+sx16(rw(pc+2))).toString(16)}`; size = 4; }
    else if ((w & 0xF1F8) === 0x51C0) { mn = `DBF D${w&7}, 0x${(pc+2+sx16(rw(pc+2))).toString(16)}`; size = 4; }
    // Shifts
    else if ((w & 0xF1F8) === 0xE008) { mn = `LSR.W #${(w>>9)&7||8}, D${w&7}`; }
    else if ((w & 0xF1F8) === 0xE018) { mn = `LSL.W #${(w>>9)&7||8}, D${w&7}`; }
    else if ((w & 0xF1F8) === 0xE000) { mn = `ASR.W #${(w>>9)&7||8}, D${w&7}`; }
    else if ((w & 0xF1F8) === 0xE010) { mn = `ASL.W #${(w>>9)&7||8}, D${w&7}`; }
    else if ((w & 0xF1F8) === 0xE048) { mn = `LSR.L #${(w>>9)&7||8}, D${w&7}`; }
    else if ((w & 0xF1F8) === 0xE058) { mn = `LSL.L #${(w>>9)&7||8}, D${w&7}`; }
    else if ((w & 0xF1F8) === 0xE0B8) { mn = `LSL.L D${w&7}, D${(w>>9)&7}`; }
    else if ((w & 0xF1F8) === 0x4840) { mn = `SWAP D${w&7}`; }
    else if ((w & 0xF1F8) === 0x4880) { mn = `EXT.W D${w&7}`; }
    else if ((w & 0xF1F8) === 0x48C0) { mn = `EXT.L D${w&7}`; }
    // MOVEM
    else if (w === 0x48E7) { mn = `MOVEM.L regs, -(A7) [0x${rw(pc+2).toString(16)}]`; size = 4; }
    else if (w === 0x4CDF) { mn = `MOVEM.L (A7)+, regs [0x${rw(pc+2).toString(16)}]`; size = 4; }
    // 0x4Axx negations
    else if ((w & 0xF1F8) === 0x4400) { mn = `NEG.W D${w&7}`; }
    else if ((w & 0xF1F8) === 0x4000) { mn = `NEGX.W D${w&7}`; }
    else if ((w & 0xF1F8) === 0x4600) { mn = `NOT.W D${w&7}`; }
    // AND/OR/EOR
    else if ((w & 0xF1C0) === 0xC040) { mn = `AND.W D${w&7}, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x8040) { mn = `OR.W D${w&7}, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0xB040) { mn = `EOR.W D${w&7}, D${(w>>9)&7}`; }
    else { mn = `.word 0x${w.toString(16).padStart(4,'0')}`; }
    
    console.log(`  0x${pc.toString(16).padStart(6,'0')}: ${mn}`);
    if (w === 0x4E75) break;
    pc += size;
  }
}

// 1. 重新反汇编 0x14DA6 状态机
disasm(0x14DA6, 160, '0x14DA6 动画状态机 (修正版)');

// 2. 反汇编状态机各 case 跳转目标
const cases = [
  { addr: 0x14E26, name: 'case bit7 (YIELD return)' },
  { addr: 0x1564A, name: 'case bit6' },
  { addr: 0x14E68, name: 'case bit0' },
  { addr: 0x14F42, name: 'case bit1' },
  { addr: 0x15082, name: 'case bit2' },
  { addr: 0x151F0, name: 'case bit5' },
  { addr: 0x152F0, name: 'case bit3' },
  { addr: 0x155B0, name: 'case bit4' },
];
for (const c of cases) {
  disasm(c.addr, 80, c.name);
}

// 3. 检查 scenarioIndex=15 的脚本数据 (0x19f1a4)
console.log('\n--- scenarioIndex=15 脚本数据 (0x19f1a4) ---');
for (let i = 0; i < 256; i += 16) {
  let hex = '';
  for (let j = 0; j < 16; j++) hex += rb(0x19f1a4 + i + j).toString(16).padStart(2, '0') + ' ';
  console.log(`  0x${(0x19f1a4 + i).toString(16)}: ${hex}`);
}

// 4. 读取资源指针表 0x19efa2 的所有指针
console.log('\n--- 资源指针表 (0x19efa2) ---');
const tableAddr = 0x19efa2;
for (let i = 0; i < 32; i += 4) {
  const ptr = rl(tableAddr + i);
  console.log(`  +0x${i.toString(16).padStart(2,'0')}: 0x${ptr.toString(16)}`);
  // 如果指针指向 ROM, 显示前 32 字节
  if (ptr < 0xFF0000 && ptr > 0x100) {
    let hex = '';
    for (let j = 0; j < 32; j++) hex += rb(ptr + j).toString(16).padStart(2, '0') + ' ';
    console.log(`    数据: ${hex}`);
  }
}

// 5. 反汇编 0x99B2 (资源加载核心)
disasm(0x99B2, 128, '0x99B2 资源加载核心');

// 6. 反汇编 0x11D7A (0xCA9E 调用)
disasm(0x11D7A, 64, '0x11D7A (0xCA9E 调用)');

// 7. 反汇编 0x11812 (0xCABC 调用, 资源查找)
disasm(0x11812, 128, '0x11812 资源查找');

// 8. 反汇编 0xCC4E (0xCAAC 调用)
disasm(0xCC4E, 80, '0xCC4E (0xCAAC 调用)');

// 9. 检查 0xFFFFA49C 的写入 (场景索引变量)
console.log('\n--- 搜索写入 0xFFFFA49C 的代码 ---');
const A49C = 0xFFFFA49C >>> 0;
for (let i = 0; i < rom.length - 8; i++) {
  const w = rw(i);
  // MOVE.W #imm, (0xFFFFA49C).L
  if (w === 0x31FC && rl(i+4) === A49C) {
    console.log(`  ROM 0x${i.toString(16)}: MOVE.W #0x${rw(i+2).toString(16)}, (0xFFFFA49C).L`);
  }
  // MOVE.W Dn, (0xFFFFA49C).L
  if ((w & 0xF1F8) === 0x3139 && rl(i+2) === A49C) {
    console.log(`  ROM 0x${i.toString(16)}: MOVE.W D${(w>>9)&7}, (0xFFFFA49C).L`);
  }
  // MOVE.W #imm, (0xFFFFA49C.W)
  if (w === 0x31FC && rw(i+4) === 0xA49C) {
    console.log(`  ROM 0x${i.toString(16)}: MOVE.W #0x${rw(i+2).toString(16)}, (0xFFFFA49C.W)`);
  }
}

// 10. 检查 0xFFFFA6D4 的写入 (0xC93A 中第一个操作)
console.log('\n--- 搜索写入 0xFFFFA6D4 的代码 ---');
const A6D4 = 0xFFFFA6D4 >>> 0;
for (let i = 0; i < rom.length - 8; i++) {
  const w = rw(i);
  if (w === 0x31FC && rl(i+4) === A6D4) {
    console.log(`  ROM 0x${i.toString(16)}: MOVE.W #0x${rw(i+2).toString(16)}, (0xFFFFA6D4).L`);
  }
  if (w === 0x11FC && rl(i+4) === A6D4) {
    console.log(`  ROM 0x${i.toString(16)}: MOVE.B #0x${(rw(i+2)&0xFF).toString(16)}, (0xFFFFA6D4).L`);
  }
}
