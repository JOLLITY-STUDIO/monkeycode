/**
 * 查找 0x5E040 RAM 表的初始化代码 (资源描述符源)
 *
 * 0xFAF8 从 0x5E040 读取数据建立索引表写到 0x510C0
 * 0x5E040 应该是资源 ID → ROM 地址的映射表
 *
 * 任务:
 * 1. 搜索对 0xFF5E040 的所有引用 (LEA/MOVEA)
 * 2. 搜索对 0xFF510C0 的所有引用 (写入目标)
 * 3. 反汇编 0x116D4 (0x115A6 调用)
 * 4. 反汇编 0x11420 (0x110A8 调用)
 * 5. 反汇编 0xA1F6 (0xA78C 调用, 实际资源加载)
 * 6. 搜索 ROM 中的静态资源指针表 (0x8000+offset 模式)
 * 7. 检查 0xB06B4 资源指针表
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
    else if (w === 0x4E73) mn = 'RTE';
    else if (w === 0x4EF9) { mn = `JMP 0x${rl(pc+2).toString(16)}`; size = 6; }
    else if (w === 0x4EB9) { mn = `JSR 0x${rl(pc+2).toString(16)}`; size = 6; }
    else if (w === 0x4EBA) { mn = `JSR (PC,d16) → 0x${(pc+2+sx16(rw(pc+2))).toString(16)}`; size = 4; }
    else if (w === 0x4EB8) { mn = `JSR 0x${rw(pc+2).toString(16)}.W`; size = 4; }
    else if (w === 0x4EF8) { mn = `JMP 0x${rw(pc+2).toString(16)}.W`; size = 4; }
    else if ((w & 0xFFF8) === 0x4ED0) mn = `JMP (A${w&7})`;
    else if ((w & 0xFF00) === 0x6100) { mn = `BSR.W 0x${(pc+2+sx16(rw(pc+2))).toString(16)}`; size = 4; }
    else if ((w & 0xFF00) === 0x6000) { mn = `BRA.W 0x${(pc+2+sx16(rw(pc+2))).toString(16)}`; size = 4; }
    else if ((w & 0xFF00) === 0x6700) { mn = `BEQ.W 0x${(pc+2+sx16(rw(pc+2))).toString(16)}`; size = 4; }
    else if ((w & 0xFF00) === 0x6600) { mn = `BNE.W 0x${(pc+2+sx16(rw(pc+2))).toString(16)}`; size = 4; }
    else if ((w & 0xF000) === 0x6000 && (w&0xFF)) { mn = `BRA.S 0x${(pc+2+((w&0xFF)>127?(w&0xFF)-256:(w&0xFF))).toString(16)}`; }
    else if ((w & 0xF000) === 0x6100 && (w&0xFF)) { mn = `BSR.S 0x${(pc+2+((w&0xFF)>127?(w&0xFF)-256:(w&0xFF))).toString(16)}`; }
    else if ((w & 0xF000) === 0x6700 && (w&0xFF)) { mn = `BEQ.S 0x${(pc+2+((w&0xFF)>127?(w&0xFF)-256:(w&0xFF))).toString(16)}`; }
    else if ((w & 0xF000) === 0x6600 && (w&0xFF)) { mn = `BNE.S 0x${(pc+2+((w&0xFF)>127?(w&0xFF)-256:(w&0xFF))).toString(16)}`; }
    // MOVE #imm
    else if (w === 0x11FC) { mn = `MOVE.B #0x${(rw(pc+2)&0xFF).toString(16)}, (0x${addrW(rw(pc+4)).toString(16)}.W)`; size = 6; }
    else if (w === 0x13FC) { mn = `MOVE.B #0x${(rw(pc+2)&0xFF).toString(16)}, (0x${rl(pc+4).toString(16)}).L`; size = 8; }
    else if (w === 0x31FC) { mn = `MOVE.W #0x${rw(pc+2).toString(16)}, (0x${addrW(rw(pc+4)).toString(16)}.W)`; size = 6; }
    else if (w === 0x33FC) { mn = `MOVE.W #0x${rw(pc+2).toString(16)}, (0x${rl(pc+4).toString(16)}).L`; size = 8; }
    else if (w === 0x21FC) { mn = `MOVE.L #0x${rl(pc+2).toString(16)}, (0x${addrW(rw(pc+6)).toString(16)}.W)`; size = 8; }
    else if (w === 0x23FC) { mn = `MOVE.L #0x${rl(pc+2).toString(16)}, (0x${rl(pc+6).toString(16)}).L`; size = 10; }
    else if ((w & 0xF1FF) === 0x003C) { mn = `MOVE.B #0x${(rw(pc+2)&0xFF).toString(16)}, D${(w>>9)&7}`; size = 4; }
    else if ((w & 0xF1FF) === 0x303C) { mn = `MOVE.W #0x${rw(pc+2).toString(16)}, D${(w>>9)&7}`; size = 4; }
    else if ((w & 0xF1FF) === 0x203C) { mn = `MOVE.L #0x${rl(pc+2).toString(16)}, D${(w>>9)&7}`; size = 6; }
    else if ((w & 0xF100) === 0x7000) { const v = w & 0xFF; mn = `MOVEQ #${v>127?v-256:v}, D${(w>>9)&7}`; }
    // LEA — MUST check (xxx).L before (xxx).W
    else if ((w & 0xF1FF) === 0x41F9) { mn = `LEA 0x${rl(pc+2).toString(16)}, A${(w>>9)&7}`; size = 6; }
    else if ((w & 0xF1FF) === 0x41F8) { mn = `LEA 0x${addrW(rw(pc+2)).toString(16)}.W, A${(w>>9)&7}`; size = 4; }
    else if ((w & 0xF1F8) === 0x41E8) { const d=sx16(rw(pc+2)); mn = `LEA ${d>=0?'+':''}${d}(A${w&7}), A${(w>>9)&7}`; size = 4; }
    else if ((w & 0xF1C0) === 0x41D0) { mn = `LEA (A${w&7}), A${(w>>9)&7}`; }
    // MOVEA — MUST check (xxx).L before (xxx).W
    else if ((w & 0xF1FF) === 0x2079) { mn = `MOVEA.L (0x${rl(pc+2).toString(16)}).L, A${(w>>9)&7}`; size = 6; }
    else if ((w & 0xF1FF) === 0x2279) { mn = `MOVEA.L (0x${rl(pc+2).toString(16)}).L, A${(w>>9)&7}`; size = 6; }
    else if ((w & 0xF1FF) === 0x2039) { mn = `MOVE.L (0x${rl(pc+2).toString(16)}).L, D${(w>>9)&7}`; size = 6; }
    else if ((w & 0xF1FF) === 0x3039) { mn = `MOVE.W (0x${rl(pc+2).toString(16)}).L, D${(w>>9)&7}`; size = 6; }
    else if ((w & 0xF1FF) === 0x1039) { mn = `MOVE.B (0x${rl(pc+2).toString(16)}).L, D${(w>>9)&7}`; size = 6; }
    else if ((w & 0xF1F8) === 0x2078) { mn = `MOVEA.L (0x${addrW(rw(pc+2)).toString(16)}.W), A${(w>>9)&7}`; size = 4; }
    else if ((w & 0xF1F8) === 0x2278) { mn = `MOVEA.L (0x${addrW(rw(pc+2)).toString(16)}.W), A${(w>>9)&7}`; size = 4; }
    else if ((w & 0xF1F8) === 0x2038) { mn = `MOVE.L (0x${addrW(rw(pc+2)).toString(16)}.W), D${(w>>9)&7}`; size = 4; }
    else if ((w & 0xF1F8) === 0x3038) { mn = `MOVE.W (0x${addrW(rw(pc+2)).toString(16)}.W), D${(w>>9)&7}`; size = 4; }
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
    else if ((w & 0xF1F8) === 0x0C78) { mn = `CMPI.W #0x${rw(pc+2).toString(16)}, (0x${addrW(rw(pc+4)).toString(16)}.W)`; size = 6; }
    // BTST
    else if ((w & 0xF1F8) === 0x0800) { mn = `BTST #${rw(pc+2)}, D${(w>>9)&7}`; size = 4; }
    else if ((w & 0xF1FF) === 0x0839) { mn = `BTST #${rw(pc+2)}, (0x${rl(pc+4).toString(16)}).L`; size = 8; }
    else if ((w & 0xF1FF) === 0x0838) { mn = `BTST #${rw(pc+2)}, (0x${addrW(rw(pc+4)).toString(16)}.W)`; size = 6; }
    else if ((w & 0xF1C0) === 0x0100) { mn = `BTST D${(w>>9)&7}, D${w&7}`; }
    // MOVE (An), Dn
    else if ((w & 0xF1C0) === 0x1010) { mn = `MOVE.B (A${w&7}), D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x1018) { mn = `MOVE.B (A${w&7})+, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x1028) { const d=sx16(rw(pc+2)); mn = `MOVE.B ${d>=0?'+':''}${d}(A${w&7}), D${(w>>9)&7}`; size = 4; }
    else if ((w & 0xF1C0) === 0x3010) { mn = `MOVE.W (A${w&7}), D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x3018) { mn = `MOVE.W (A${w&7})+, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x3028) { const d=sx16(rw(pc+2)); mn = `MOVE.W ${d>=0?'+':''}${d}(A${w&7}), D${(w>>9)&7}`; size = 4; }
    else if ((w & 0xF1C0) === 0x2010) { mn = `MOVE.L (A${w&7}), D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x2018) { mn = `MOVE.L (A${w&7})+, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x2028) { const d=sx16(rw(pc+2)); mn = `MOVE.L ${d>=0?'+':''}${d}(A${w&7}), D${(w>>9)&7}`; size = 4; }
    // MOVE Dn, (An)
    else if ((w & 0xF1C0) === 0x1080) { mn = `MOVE.B D${(w>>9)&7}, (A${w&7})`; }
    else if ((w & 0xF1C0) === 0x3080) { mn = `MOVE.W D${(w>>9)&7}, (A${w&7})`; }
    else if ((w & 0xF1C0) === 0x2080) { mn = `MOVE.L D${(w>>9)&7}, (A${w&7})`; }
    else if ((w & 0xF1C0) === 0x3128) { const d=sx16(rw(pc+2)); mn = `MOVE.W D${(w>>9)&7}, ${d>=0?'+':''}${d}(A${w&7})`; size = 4; }
    else if ((w & 0xF1C0) === 0x1128) { const d=sx16(rw(pc+2)); mn = `MOVE.B D${(w>>9)&7}, ${d>=0?'+':''}${d}(A${w&7})`; size = 4; }
    else if ((w & 0xF1C0) === 0x2128) { const d=sx16(rw(pc+2)); mn = `MOVE.L D${(w>>9)&7}, ${d>=0?'+':''}${d}(A${w&7})`; size = 4; }
    // MOVE Dn, Dn
    else if ((w & 0xF1C0) === 0x3000) { mn = `MOVE.W D${w&7}, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x2000) { mn = `MOVE.L D${w&7}, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x1000) { mn = `MOVE.B D${w&7}, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x2040) { mn = `MOVEA.L D${w&7}, A${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x3040) { mn = `MOVEA.W D${w&7}, A${(w>>9)&7}`; }
    // ADD/SUB/CMP
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
    else if ((w & 0xF1F8) === 0xD1F9) { mn = `ADDA.L (0x${rl(pc+2).toString(16)}).L, A${(w>>9)&7}`; size = 6; }
    else if ((w & 0xF1F8) === 0xD0F9) { mn = `ADDA.W (0x${rl(pc+2).toString(16)}).L, A${(w>>9)&7}`; size = 6; }
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
    // MOVEM
    else if (w === 0x48E7) { mn = `MOVEM.L regs, -(A7) [0x${rw(pc+2).toString(16)}]`; size = 4; }
    else if (w === 0x4CDF) { mn = `MOVEM.L (A7)+, regs [0x${rw(pc+2).toString(16)}]`; size = 4; }
    else { mn = `.word 0x${w.toString(16).padStart(4,'0')}`; }

    console.log(`  0x${pc.toString(16).padStart(6,'0')}: ${mn}`);
    if (w === 0x4E75) break;
    pc += size;
  }
}

// ============================================================
// 1. 搜索对 0xFF5E040 的所有引用 (LEA/MOVEA)
// ============================================================
console.log('=== 1. 搜索 0xFF5E040 引用 ===\n');

const ref5E040 = [];
for (let i = 0; i < rom.length - 6; i++) {
  // LEA 0xFF5E040, An = 0x41F9 0x00FF5E40
  // MOVEA.L 0xFF5E040, An = 0x2079 0x00FF5E40
  // MOVEA.L 0xFF5E040, An (with size=.L) — also 0x2279
  if (rb(i) === 0x00 && rb(i+1) === 0xFF && rb(i+2) === 0x5E && rb(i+3) === 0x40) {
    const prevW = rw(i - 2);
    let instr = '';
    if (prevW === 0x41F9) instr = `LEA 0xFF5E040, A${(prevW>>9)&7}`;
    else if (prevW === 0x2079) instr = `MOVEA.L (0xFF5E040).L, A${(prevW>>9)&7}`;
    else if (prevW === 0x2279) instr = `MOVEA.L (0xFF5E040).L, A${(prevW>>9)&7}`;
    else if ((prevW & 0xF1F8) === 0x2079) instr = `MOVEA.L (0xFF5E040).L, A${(prevW>>9)&7}`;
    else if ((prevW & 0xF1F8) === 0x3039) instr = `MOVE.W (0xFF5E040).L, D${(prevW>>9)&7}`;
    else if ((prevW & 0xF1F8) === 0x2039) instr = `MOVE.L (0xFF5E040).L, D${(prevW>>9)&7}`;
    else if ((prevW & 0xF1F8) === 0x1039) instr = `MOVE.B (0xFF5E040).L, D${(prevW>>9)&7}`;
    else if ((prevW & 0xFFF8) === 0x23C8) instr = `MOVE.L A${prevW&7}, (0xFF5E040).L`;
    else if (prevW === 0x4A79) instr = `TST.W (0xFF5E040).L`;
    else instr = `(prev=0x${prevW.toString(16)})`;
    ref5E040.push({ addr: i - 2, instr });
  }
}

console.log(`找到 ${ref5E040.length} 处 0xFF5E040 引用:`);
for (const r of ref5E040) {
  console.log(`  0x${r.addr.toString(16)}: ${r.instr}`);
}

// ============================================================
// 2. 搜索对 0xFF510C0 的所有引用 (0xFAF8 写入目标)
// ============================================================
console.log('\n=== 2. 搜索 0xFF510C0 引用 ===\n');

const ref510C0 = [];
for (let i = 0; i < rom.length - 6; i++) {
  if (rb(i) === 0x00 && rb(i+1) === 0xFF && rb(i+2) === 0x51 && rb(i+3) === 0x0C) {
    // 也检查 0x00FF510C
    if (rb(i+4) !== 0x0 && rb(i+4) !== 0xC0) {
      // 跳过部分匹配
    }
    const prevW = rw(i - 2);
    let instr = '';
    if (prevW === 0x41F9) instr = `LEA 0xFF510C0, A${(prevW>>9)&7}`;
    else if ((prevW & 0xF1FF) === 0x2079) instr = `MOVEA.L (0xFF510C0).L, A${(prevW>>9)&7}`;
    else if ((prevW & 0xF1F8) === 0x3039) instr = `MOVE.W (0xFF510C0).L, D${(prevW>>9)&7}`;
    else if ((prevW & 0xF1F8) === 0x3139) instr = `MOVE.W D${(prevW>>9)&7}, (0xFF510C0).L`;
    else if ((prevW & 0xF1F8) === 0x2139) instr = `MOVE.L D${(prevW>>9)&7}, (0xFF510C0).L`;
    else instr = `(prev=0x${prevW.toString(16)})`;
    ref510C0.push({ addr: i - 2, instr });
  }
}

console.log(`找到 ${ref510C0.length} 处 0xFF510C0 引用:`);
for (const r of ref510C0) {
  console.log(`  0x${r.addr.toString(16)}: ${r.instr}`);
}

// ============================================================
// 3. 反汇编 0x116D4 (0x115A6 调用)
// ============================================================
disasm(0x116D4, 300, '0x116D4 (0x115A6 调用)');

// ============================================================
// 4. 反汇编 0x11420 (0x110A8 调用)
// ============================================================
disasm(0x11420, 300, '0x11420 (0x110A8 调用)');

// ============================================================
// 5. 反汇编 0xA1F6 (0xA78C 调用, 实际资源加载)
// ============================================================
disasm(0xA1F6, 400, '0xA1F6 (实际资源加载核心)');

// ============================================================
// 6. 检查 0xB06B4 资源指针表
// ============================================================
console.log('\n=== 6. 检查 0xB06B4 资源指针表 ===\n');

// 显示前 256 字节
for (let i = 0; i < 256; i += 16) {
  let hex = '';
  for (let j = 0; j < 16; j++) {
    hex += rb(0xB06B4 + i + j).toString(16).padStart(2, '0') + ' ';
  }
  console.log(`  0x${(0xB06B4 + i).toString(16)}: ${hex}`);
}

// 解析为 4 字节指针表
console.log('\n解析为 4 字节指针表:');
for (let i = 0; i < 30; i++) {
  const ptr = rl(0xB06B4 + i * 4);
  if (ptr === 0 || ptr === 0xFFFFFFFF) {
    console.log(`  [${i}] 0x${ptr.toString(16)} - 结束`);
    break;
  }
  console.log(`  [${i}] 0x${ptr.toString(16)}`);
}

// ============================================================
// 7. 搜索 ROM 中以 0x8000 模式开头的资源指针表
// ============================================================
console.log('\n=== 7. 搜索 0x8000+offset 模式的资源表 ===\n');

// 0xFAF8 从 0x5E040 读取, 写入 0x8000+offset 到 0x510C0
// 0x5E040 可能直接存储了 ROM 地址 (4 字节指针)
// 或者 0x5E040 存储了 word 偏移

// 假设 0x5E040 存储了 232 个 4 字节 ROM 指针
// 那么 0x5E040 表的大小 = 232 * 4 = 928 字节
// 检查 RAM 0xFF5E040 - 0xFF5E3E0 范围

// 但 0x5E040 也可能存储在 ROM 中 (启动时复制到 RAM)
// 搜索 ROM 中的 4 字节指针表

// 先看 0x5E040 周围的 RAM 数据
// 由于没有 RAM dump, 搜索 ROM 中可能的资源指针表

// 搜索连续的 ROM 地址 (0x000000-0x1FFFFF) 作为 4 字节指针表
console.log('搜索连续 ROM 地址作为 4 字节指针表...');
const candidates = [];
for (let i = 0x10000; i < rom.length - 100; i += 2) {
  // 检查前 4 个指针是否都指向 ROM 范围
  const p0 = rl(i);
  const p1 = rl(i + 4);
  const p2 = rl(i + 8);
  const p3 = rl(i + 12);
  
  if (p0 > 0x100 && p0 < rom.length &&
      p1 > 0x100 && p1 < rom.length &&
      p2 > 0x100 && p2 < rom.length &&
      p3 > 0x100 && p3 < rom.length) {
    // 检查是否递增
    if (p1 > p0 && p2 > p1 && p3 > p2) {
      candidates.push({ addr: i, ptrs: [p0, p1, p2, p3] });
    }
  }
}

console.log(`找到 ${candidates.length} 个候选位置`);
for (const c of candidates.slice(0, 20)) {
  console.log(`  0x${c.addr.toString(16)}: [0x${c.ptrs[0].toString(16)}, 0x${c.ptrs[1].toString(16)}, 0x${c.ptrs[2].toString(16)}, 0x${c.ptrs[3].toString(16)}]`);
}

// ============================================================
// 8. 反汇编 0xC7EC (0xC9A0 调用, 在开场动画入口前)
// ============================================================
disasm(0xC7EC, 200, '0xC7EC (0xC9A0 调用)');

// ============================================================
// 9. 检查 ROM 0x9A00-0x9A20 (已知资源加载相关区域)
// ============================================================
console.log('\n=== 9. 0x9A00-0x9A20 原始字节 ===\n');
for (let i = 0; i < 32; i += 2) {
  const w = rw(0x9A00 + i);
  console.log(`  0x${(0x9A00 + i).toString(16)}: 0x${w.toString(16).padStart(4,'0')}`);
}

// ============================================================
// 10. 反汇编 0xC7AE (0xCC4E 调用)
// ============================================================
disasm(0xC7AE, 200, '0xC7AE (0xCC4E 调用)');

// ============================================================
// 11. 搜索 LEA 0xFF603C, An 指令
// ============================================================
console.log('\n=== 11. 搜索 LEA 0xFF603C, An ===\n');

const ref603C = [];
for (let i = 0; i < rom.length - 6; i++) {
  // LEA 0xFF603C, An = 0x41F9 0x00FF603C
  if (rb(i) === 0x00 && rb(i+1) === 0xFF && rb(i+2) === 0x60 && rb(i+3) === 0x3C) {
    const prevW = rw(i - 2);
    let instr = '';
    if (prevW === 0x41F9) instr = `LEA 0xFF603C, A${(prevW>>9)&7}`;
    else if ((prevW & 0xF1FF) === 0x2079) instr = `MOVEA.L (0xFF603C).L, A${(prevW>>9)&7}`;
    else instr = `(prev=0x${prevW.toString(16)})`;
    ref603C.push({ addr: i - 2, instr });
  }
}

console.log(`找到 ${ref603C.length} 处 0xFF603C 引用:`);
for (const r of ref603C) {
  console.log(`  0x${r.addr.toString(16)}: ${r.instr}`);
}

// ============================================================
// 12. 反汇编 0xDA40 (0xD49E 调用)
// ============================================================
disasm(0xDA40, 200, '0xDA40 (0xD49E 调用)');
