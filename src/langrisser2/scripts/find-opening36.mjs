/**
 * 深入分析资源加载机制
 *
 * 关键发现:
 * - 0x11AC0: 处理 0xFF603C 表 (检查 byte[1]==0x20 的条目)
 * - 0xCC4E: 加载资源 0x8001 (标题画面 tile)
 * - 0x99B2: 写资源请求到 0xFFFF81C4 缓冲区
 * - 0x11C44: 在 0xFF603C 表中查找资源 (byte[1]==匹配)
 *
 * 目标:
 * 1. 反汇编 0xFAF8 (按索引查找资源的核心函数)
 * 2. 反汇编 0xA78C (实际加载资源数据)
 * 3. 反汇编 0x10ABE (可能初始化 0xFF603C 表)
 * 4. 反汇编 0x177A2, 0x17776 (cmd 0x37 调用的加载函数)
 * 5. 搜索写入 byte[1]=0x20 到 0xFF603C 的代码
 * 6. 查找资源描述符静态表 (ID + ROM 地址)
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
    else if ((w & 0xFF00) === 0x6500) { mn = `BCS.W 0x${(pc+2+sx16(rw(pc+2))).toString(16)}`; size = 4; }
    else if ((w & 0xFF00) === 0x6400) { mn = `BCC.W 0x${(pc+2+sx16(rw(pc+2))).toString(16)}`; size = 4; }
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
    // MOVE from (xxx).L — MUST check before (xxx).W
    else if ((w & 0xF1FF) === 0x2079) { mn = `MOVEA.L (0x${rl(pc+2).toString(16)}).L, A${(w>>9)&7}`; size = 6; }
    else if ((w & 0xF1FF) === 0x2279) { mn = `MOVEA.L (0x${rl(pc+2).toString(16)}).L, A${(w>>9)&7}`; size = 6; }
    else if ((w & 0xF1FF) === 0x2039) { mn = `MOVE.L (0x${rl(pc+2).toString(16)}).L, D${(w>>9)&7}`; size = 6; }
    else if ((w & 0xF1FF) === 0x3039) { mn = `MOVE.W (0x${rl(pc+2).toString(16)}).L, D${(w>>9)&7}`; size = 6; }
    else if ((w & 0xF1FF) === 0x1039) { mn = `MOVE.B (0x${rl(pc+2).toString(16)}).L, D${(w>>9)&7}`; size = 6; }
    else if ((w & 0xF1F8) === 0x2078) { mn = `MOVEA.L (0x${addrW(rw(pc+2)).toString(16)}.W), A${(w>>9)&7}`; size = 4; }
    else if ((w & 0xF1F8) === 0x2278) { mn = `MOVEA.L (0x${addrW(rw(pc+2)).toString(16)}.W), A${(w>>9)&7}`; size = 4; }
    else if ((w & 0xF1F8) === 0x2038) { mn = `MOVE.L (0x${addrW(rw(pc+2)).toString(16)}.W), D${(w>>9)&7}`; size = 4; }
    else if ((w & 0xF1F8) === 0x3038) { mn = `MOVE.W (0x${addrW(rw(pc+2)).toString(16)}.W), D${(w>>9)&7}`; size = 4; }
    else if ((w & 0xF1F8) === 0x1038) { mn = `MOVE.B (0x${addrW(rw(pc+2)).toString(16)}.W), D${(w>>9)&7}`; size = 4; }
    // MOVE to (xxx).L
    else if ((w & 0xF1F8) === 0x3139) { mn = `MOVE.W D${(w>>9)&7}, (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if ((w & 0xF1F8) === 0x1139) { mn = `MOVE.B D${(w>>9)&7}, (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if ((w & 0xF1F8) === 0x2139) { mn = `MOVE.L D${(w>>9)&7}, (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if ((w & 0xF1F8) === 0x23C0) { mn = `MOVE.L D${(w>>9)&7}, (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if ((w & 0xFFF8) === 0x23C8) { mn = `MOVE.L A${w&7}, (0x${rl(pc+2).toString(16)}).L`; size = 6; }
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
    else if ((w & 0xF1F8) === 0x0C78) { mn = `CMPI.W #0x${rw(pc+2).toString(16)}, (0x${addrW(rw(pc+4)).toString(16)}.W)`; size = 6; }
    else if ((w & 0xF1F8) === 0x0C39) { mn = `CMPI.B #0x${(rw(pc+2)&0xFF).toString(16)}, (0x${rl(pc+4).toString(16)}).L`; size = 8; }
    else if ((w & 0xF1F8) === 0x0C38) { mn = `CMPI.B #0x${(rw(pc+2)&0xFF).toString(16)}, (0x${addrW(rw(pc+4)).toString(16)}.W)`; size = 6; }
    // BTST
    else if ((w & 0xF1F8) === 0x0800) { mn = `BTST #${rw(pc+2)}, D${(w>>9)&7}`; size = 4; }
    else if ((w & 0xF1FF) === 0x0839) { mn = `BTST #${rw(pc+2)}, (0x${rl(pc+4).toString(16)}).L`; size = 8; }
    else if ((w & 0xF1FF) === 0x0838) { mn = `BTST #${rw(pc+2)}, (0x${addrW(rw(pc+4)).toString(16)}.W)`; size = 6; }
    else if ((w & 0xF1C0) === 0x0100) { mn = `BTST D${(w>>9)&7}, D${w&7}`; }
    else if ((w & 0xF1C0) === 0x0140) { mn = `BCHG D${(w>>9)&7}, D${w&7}`; }
    else if ((w & 0xF1C0) === 0x0180) { mn = `BCLR D${(w>>9)&7}, D${w&7}`; }
    else if ((w & 0xF1C0) === 0x01C0) { mn = `BSET D${(w>>9)&7}, D${w&7}`; }
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
    // ADD/SUB/CMP/MULU
    else if ((w & 0xF1C0) === 0xD040) { mn = `ADD.W D${w&7}, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0xD000) { mn = `ADD.B D${w&7}, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0xD080) { mn = `ADD.L D${w&7}, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x9040) { mn = `SUB.W D${w&7}, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x9000) { mn = `SUB.B D${w&7}, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x9080) { mn = `SUB.L D${w&7}, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0xB040) { mn = `CMP.W D${w&7}, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0xB080) { mn = `CMP.L D${w&7}, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0xC040) { mn = `MULU.W D${w&7}, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0xC340) { mn = `MULS.W D${w&7}, D${(w>>9)&7}`; }
    // ADDA
    else if ((w & 0xF1C0) === 0xD0C0) { mn = `ADDA.W D${w&7}, A${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0xD1C0) { mn = `ADDA.L D${w&7}, A${(w>>9)&7}`; }
    else if ((w & 0xF1FF) === 0xD1F9) { mn = `ADDA.L (0x${rl(pc+2).toString(16)}).L, A${(w>>9)&7}`; size = 6; }
    else if ((w & 0xF1FF) === 0xD0F9) { mn = `ADDA.W (0x${rl(pc+2).toString(16)}).L, A${(w>>9)&7}`; size = 6; }
    else if ((w & 0xF1F8) === 0xD1F8) { mn = `ADDA.L (0x${addrW(rw(pc+2)).toString(16)}.W), A${(w>>9)&7}`; size = 4; }
    else if ((w & 0xF1F8) === 0xD0F8) { mn = `ADDA.W (0x${addrW(rw(pc+2)).toString(16)}.W), A${(w>>9)&7}`; size = 4; }
    // ADDQ/SUBQ
    else if ((w & 0xF1F8) === 0x5340) { mn = `SUBQ.W #1, D${(w>>9)&7}`; }
    else if ((w & 0xF1F8) === 0x5240) { mn = `ADDQ.W #1, D${(w>>9)&7}`; }
    else if ((w & 0xF1F0) === 0x5000) { const q=(w>>9)&7; mn = `ADDQ #${q||8}, D${w&7}`; }
    else if ((w & 0xF1F0) === 0x5300) { const q=(w>>9)&7; mn = `SUBQ #${q||8}, D${w&7}`; }
    else if ((w & 0xF1F8) === 0x5188) { mn = `SUBQ.L #1, A${(w>>9)&7}`; }
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
    else if (w === 0x48D0) { mn = `MOVEM.L regs, (A${w&7}) [0x${rw(pc+2).toString(16)}]`; size = 4; }
    // indexed addressing
    else if ((w & 0xF1C0) === 0x2070) { const ext=rw(pc+2); const idxr=(ext>>12)&7; const idxs=(ext&0x8000)?'L':'W'; const an=w&7; const dn=(w>>9)&7; const idxType=(ext&0x800)?'A':'D'; mn = `MOVEA.L (${idxType}${idxr}.${idxs}, A${an}), A${dn}`; size = 4; }
    else if ((w & 0xF1C0) === 0x2030) { const ext=rw(pc+2); const idxr=(ext>>12)&7; const idxs=(ext&0x8000)?'L':'W'; const an=w&7; const dn=(w>>9)&7; const idxType=(ext&0x800)?'A':'D'; mn = `MOVE.L (${idxType}${idxr}.${idxs}, A${an}), D${dn}`; size = 4; }
    else if (w === 0x4EFB) { mn = `JMP (PC, D0.W) → 0x${(pc+2+rw(pc+2)).toString(16)}`; size = 4; }
    // ANDI
    else if (w === 0x0240) { mn = `ANDI.W #0x${rw(pc+2).toString(16)}, D${(w>>9)&7}`; size = 4; }
    else if (w === 0x0241) { mn = `ANDI.B #0x${rw(pc+2).toString(16)}, D${(w>>9)&7}`; size = 4; }
    // ORI
    else if (w === 0x0040) { mn = `ORI.W #0x${rw(pc+2).toString(16)}, D${(w>>9)&7}`; size = 4; }
    // MOVE.W d16(An), d16(An)
    else if ((w & 0xF1C0) === 0x3028) { const d=sx16(rw(pc+2)); mn = `MOVE.W ${d>=0?'+':''}${d}(A${w&7}), D${(w>>9)&7}`; size = 4; }
    else { mn = `.word 0x${w.toString(16).padStart(4,'0')}`; }
    
    console.log(`  0x${pc.toString(16).padStart(6,'0')}: ${mn}`);
    if (w === 0x4E75) break;
    pc += size;
  }
}

// ============================================================
// 1. 反汇编 0xFAF8 (按索引查找资源)
// ============================================================
disasm(0xFAF8, 300, '0xFAF8 按索引查找资源');

// ============================================================
// 2. 反汇编 0xA78C (实际加载资源数据)
// ============================================================
disasm(0xA78C, 300, '0xA78C 加载资源数据');

// ============================================================
// 3. 反汇编 0x10ABE (可能初始化资源表)
// ============================================================
disasm(0x10ABE, 200, '0x10ABE (可能初始化资源表)');

// ============================================================
// 4. 反汇编 0x10FDE
// ============================================================
disasm(0x10FDE, 200, '0x10FDE');

// ============================================================
// 5. 反汇编 0x1105C
// ============================================================
disasm(0x1105C, 200, '0x1105C');

// ============================================================
// 6. 反汇编 0x110A8
// ============================================================
disasm(0x110A8, 200, '0x110A8');

// ============================================================
// 7. 反汇编 0x177A2 (cmd 0x37 加载函数 1)
// ============================================================
disasm(0x177A2, 200, '0x177A2 cmd 0x37 加载函数 1');

// ============================================================
// 8. 反汇编 0x17776 (cmd 0x37 加载函数 2)
// ============================================================
disasm(0x17776, 200, '0x17776 cmd 0x37 加载函数 2');

// ============================================================
// 9. 反汇编 0x115A6 (0x11AC0 调用的资源加载)
// ============================================================
disasm(0x115A6, 300, '0x115A6 (0x11AC0 调用的资源加载)');

// ============================================================
// 10. 搜索 MOVE.B #0x20 到 (An) 的指令 (设置 byte[1]=0x20)
// ============================================================
console.log('\n=== 搜索 MOVE.B #0x20, 1(An) 指令 ===\n');

// MOVE.B #0x20, d8(An) = 0x117C | d8 | An
// 实际编码: 1 1 S S DDD MMM mmm rrr
// MOVE.B #imm, d8(An): opcode = 0x11FC (imm to (xxx).L) 不对
// MOVE.B #imm, d8(An): 0x117C 0x00XX 其中 XX 是 d8
// 格式: 0x117C | d16(An) | imm8
// 不对, MOVE.B #imm, d8(An) 不存在直接形式
// 应该是: MOVEQ #0x20, Dn; MOVE.B Dn, 1(An)
// 或者: MOVE.B #0x20, (xxx).W/L

// 搜索 0x117C 模式 (MOVE.B Dn, d16(An))
// 0x117C: 0001 0001 0111 1100 → D0, d16(A0)? 不对
// MOVE.B Dn, d16(An): opcode = 1 0 0 SSS DDD MMM mmm rrr
// S=0 (byte), D=Dn, MMM=101 (d16(An)), mrr=An
// MOVE.B D0, d16(A0) = 0x1080 | (0<<9) | (5<<3) | 0 = 0x10A8? 不对

// 实际: MOVE.B Dn, d16(An) = 0x10A8 (D0, d16(A0))? 
// 让我用正确编码:
// MOVE.B Dn, d16(An) = (1<<13) | (0<<12) | (Dn<<9) | (5<<3) | An = 0x1000 | (Dn<<9) | 0x28 | An
// 不对, 让我重新看:
// MOVE指令格式: 00 ss DDD MMM mmm rrr
// s=00 (byte), D=source Dn, MMM=destination mode
// MOVE.B D0, d16(A0): D=000 (D0), MMM=101 (d16(An)), mrr=000 (A0)
// = 0x1028 (0001 0000 0010 1000)? 不对
// 实际 0x10A8 = 0001 0000 1010 1000 = s=00, D=000 (D0), MMM=101 (d16(An)), mrr=000 (A0) → 对!

// 搜索 MOVE.B D0, 1(A0) 或类似: 0x10A8 0x0001
// 但这里 D0 可能已经包含 0x20
// 或者搜索: MOVE.B #0x20, 1(An) 直接形式不存在
// 搜索: MOVEQ #0x20, Dn 后面跟 MOVE.B Dn, 1(An)

// 简单方法: 搜索包含 0x20 和偏移 1 的 MOVE.B Dn, d16(An) 模式
// MOVE.B Dn, 1(An) 编码: 0x10A8 | (Dn<<9) | 0x28 | An, ext = 0x0001
// 模式: (w & 0xF1F8) === 0x10A8 (byte, d16(An), 任何Dn和An)

const writeMatches = [];
for (let i = 0; i < rom.length - 4; i++) {
  const w = rw(i);
  // MOVE.B Dn, d16(An) = 0x10A8 基础
  if ((w & 0xF1F8) === 0x10A8) {
    const ext = rw(i + 2);
    if (ext === 0x0001) {
      // 写入 offset 1
      const dn = (w >> 9) & 7;
      const an = w & 7;
      writeMatches.push({ addr: i, dn, an });
    }
  }
}

console.log(`找到 ${writeMatches.length} 处 MOVE.B Dn, 1(An) 指令`);
for (const m of writeMatches.slice(0, 20)) {
  console.log(`  0x${m.addr.toString(16)}: MOVE.B D${m.dn}, 1(A${m.an})`);
}

// ============================================================
// 11. 反汇编 0xD49E (开场动画 taskFuncPtr)
// ============================================================
disasm(0xD49E, 300, '0xD49E (开场动画 taskFuncPtr, 0xCC44 设置)');

// ============================================================
// 12. 反汇编 0xCAE8 (0xCA00 失败跳转目标)
// ============================================================
disasm(0xCAE8, 200, '0xCAE8 (资源查找失败跳转)');
