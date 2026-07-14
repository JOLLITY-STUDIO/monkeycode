/**
 * 关键验证:
 * 1. 读取 0x1592C 的实际字节 (循环返回点)
 * 2. 确认 0xFFFFAA2C 的作用 (是否包括命令字节)
 * 3. 反汇编 cmd 21 (0x16302)
 * 4. 用正确的参数字节数解析脚本 0x19f1a4
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

// 1. 读取 0x1592C 的原始字节
console.log('=== 1. 0x1592C 原始字节 ===\n');
for (let i = 0; i < 32; i += 2) {
  const w = rw(0x1592C + i);
  console.log(`  0x${(0x1592C + i).toString(16)}: 0x${w.toString(16).padStart(4,'0')}`);
}

// 2. 读取 0x15804-0x15840 的原始字节 (循环入口)
console.log('\n=== 2. 0x157F6-0x15840 原始字节 (循环入口) ===\n');
for (let i = 0; i < 0x4A; i += 2) {
  const w = rw(0x157F6 + i);
  console.log(`  0x${(0x157F6 + i).toString(16)}: 0x${w.toString(16).padStart(4,'0')}`);
}

// 3. 反汇编 0x1592C
console.log('\n=== 3. 反汇编 0x1592C ===\n');
let pc = 0x1592C;
for (let i = 0; i < 8; i++) {
  const w = rw(pc);
  let size = 2;
  let mn = '';
  
  if (w === 0x4E75) mn = 'RTS';
  else if (w === 0x4EF9) { mn = `JMP 0x${rl(pc+2).toString(16)}`; size = 6; }
  else if (w === 0x4EB9) { mn = `JSR 0x${rl(pc+2).toString(16)}`; size = 6; }
  else if ((w & 0xFF00) === 0x6000) { mn = `BRA.W 0x${(pc+2+sx16(rw(pc+2))).toString(16)}`; size = 4; }
  else if ((w & 0xF000) === 0x6000 && (w&0xFF)) { mn = `BRA.S 0x${(pc+2+((w&0xFF)>127?(w&0xFF)-256:(w&0xFF))).toString(16)}`; }
  // MOVEA.L (xxx).L, An
  else if ((w & 0xF1F8) === 0x2079) { mn = `MOVEA.L (0x${rl(pc+2).toString(16)}).L, A${(w>>9)&7}`; size = 6; }
  else if ((w & 0xF1F8) === 0x2078) { mn = `MOVEA.L (0x${addrW(rw(pc+2)).toString(16)}.W), A${(w>>9)&7}`; size = 4; }
  // ADDA.W (xxx).L, An
  else if ((w & 0xF1F8) === 0xD1F9) { mn = `ADDA.L (0x${rl(pc+2).toString(16)}).L, A${(w>>9)&7}`; size = 6; }
  else if ((w & 0xF1F8) === 0xD0F9) { mn = `ADDA.W (0x${rl(pc+2).toString(16)}).L, A${(w>>9)&7}`; size = 6; }
  else if ((w & 0xF1F8) === 0xD1F8) { mn = `ADDA.L (0x${addrW(rw(pc+2)).toString(16)}.W), A${(w>>9)&7}`; size = 4; }
  else if ((w & 0xF1F8) === 0xD0F8) { mn = `ADDA.W (0x${addrW(rw(pc+2)).toString(16)}.W), A${(w>>9)&7}`; size = 4; }
  // ADDA.W Dn, An
  else if ((w & 0xF1C0) === 0xD0C0) { mn = `ADDA.W D${w&7}, A${(w>>9)&7}`; }
  else if ((w & 0xF1C0) === 0xD1C0) { mn = `ADDA.L D${w&7}, A${(w>>9)&7}`; }
  // MOVE.L An, (xxx).L
  else if ((w & 0xFFF8) === 0x23C8) { mn = `MOVE.L A${w&7}, (0x${rl(pc+2).toString(16)}).L`; size = 6; }
  else if ((w & 0xFFF8) === 0x21C8) { mn = `MOVE.L A${w&7}, (0x${addrW(rw(pc+2)).toString(16)}.W)`; size = 4; }
  // MOVEA.L (A0,D0.W), A0
  else if ((w & 0xF1C0) === 0x2070) { const ext=rw(pc+2); const idxr=(ext>>12)&7; const idxs=(ext&0x8000)?'L':'W'; const an=w&7; const dn=(w>>9)&7; const idxType=(ext&0x800)?'A':'D'; mn = `MOVEA.L (${idxType}${idxr}.${idxs}, A${an}), A${dn}`; size = 4; }
  else { mn = `.word 0x${w.toString(16).padStart(4,'0')}`; }
  
  console.log(`  0x${pc.toString(16)}: ${mn}`);
  if (w === 0x4E75) break;
  pc += size;
}

// 4. 反汇编 0x15804-0x15840 (循环入口)
console.log('\n=== 4. 反汇编 0x157F6-0x15840 (循环入口) ===\n');
pc = 0x157F6;
for (let i = 0; i < 20; i++) {
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
  // MOVE.W #imm, (xxx).L
  else if (w === 0x31FC) { mn = `MOVE.W #0x${rw(pc+2).toString(16)}, (0x${rl(pc+4).toString(16)}).L`; size = 8; }
  // MOVE.W (xxx).L, Dn
  else if ((w & 0xF1F8) === 0x3039) { mn = `MOVE.W (0x${rl(pc+2).toString(16)}).L, D${(w>>9)&7}`; size = 6; }
  else if ((w & 0xF1F8) === 0x2079) { mn = `MOVEA.L (0x${rl(pc+2).toString(16)}).L, A${(w>>9)&7}`; size = 6; }
  else if ((w & 0xF1F8) === 0x2279) { mn = `MOVEA.L (0x${rl(pc+2).toString(16)}).L, A${(w>>9)&7}`; size = 6; }
  // MOVE.L An, (xxx).L
  else if ((w & 0xFFF8) === 0x23C8) { mn = `MOVE.L A${w&7}, (0x${rl(pc+2).toString(16)}).L`; size = 6; }
  // MOVE.L (xxx).L, (xxx).L
  else if (w === 0x23F9) { mn = `MOVE.L (0x${rl(pc+2).toString(16)}).L, (0x${rl(pc+6).toString(16)}).L`; size = 10; }
  else if ((w & 0xF1FF) === 0x23F9) { mn = `MOVE.L (0x${rl(pc+2).toString(16)}).L, (0x${rl(pc+6).toString(16)}).L`; size = 10; }
  // MOVEQ
  else if ((w & 0xF100) === 0x7000) { const v = w & 0xFF; mn = `MOVEQ #${v>127?v-256:v}, D${(w>>9)&7}`; }
  // MOVE.B (A0)+, D0
  else if ((w & 0xF1C0) === 0x1018) { mn = `MOVE.B (A${w&7})+, D${(w>>9)&7}`; }
  else if ((w & 0xF1C0) === 0x3018) { mn = `MOVE.W (A${w&7})+, D${(w>>9)&7}`; }
  // CMPI.B
  else if ((w & 0xF1F0) === 0x0C00) { mn = `CMPI.B #0x${(rw(pc+2)&0xFF).toString(16)}, D${(w>>9)&7}`; size = 4; }
  else if ((w & 0xF1F0) === 0x0C40) { mn = `CMPI.W #0x${rw(pc+2).toString(16)}, D${(w>>9)&7}`; size = 4; }
  // BEQ
  else if ((w & 0xFF00) === 0x6700) { mn = `BEQ.W 0x${(pc+2+sx16(rw(pc+2))).toString(16)}`; size = 4; }
  else if ((w & 0xF000) === 0x6700 && (w&0xFF)) { mn = `BEQ.S 0x${(pc+2+((w&0xFF)>127?(w&0xFF)-256:(w&0xFF))).toString(16)}`; }
  // ADD.W D0, D0
  else if ((w & 0xF1C0) === 0xD040) { mn = `ADD.W D${w&7}, D${(w>>9)&7}`; }
  // JMP (PC, D0.W)
  else if (w === 0x4EFB) { mn = `JMP (PC, D0.W) → 0x${(pc+2+rw(pc+2)).toString(16)}`; size = 4; }
  else { mn = `.word 0x${w.toString(16).padStart(4,'0')}`; }
  
  console.log(`  0x${pc.toString(16)}: ${mn}`);
  if (w === 0x4E75) break;
  pc += size;
}

// 5. 反汇编 cmd 21 (0x16302)
console.log('\n=== 5. 反汇编 cmd 21 (0x16302) ===\n');
pc = 0x16302;
for (let i = 0; i < 30; i++) {
  const w = rw(pc);
  let size = 2;
  let mn = '';
  
  if (w === 0x4E75) mn = 'RTS';
  else if (w === 0x31FC) { mn = `MOVE.W #0x${rw(pc+2).toString(16)}, (0x${rl(pc+4).toString(16)}).L`; size = 8; }
  else if (w === 0x21FC) { mn = `MOVE.L #0x${rl(pc+2).toString(16)}, (0x${addrW(rw(pc+6)).toString(16)}.W)`; size = 8; }
  else if (w === 0x23FC) { mn = `MOVE.L #0x${rl(pc+2).toString(16)}, (0x${rl(pc+6).toString(16)}).L`; size = 10; }
  else if (w === 0x11FC) { mn = `MOVE.B #0x${(rw(pc+2)&0xFF).toString(16)}, (0x${addrW(rw(pc+4)).toString(16)}.W)`; size = 6; }
  else if ((w & 0xF1F8) === 0x4279) { mn = `CLR.W (0x${rl(pc+2).toString(16)}).L`; size = 6; }
  else if (w === 0x4278) { mn = `CLR.W (0x${addrW(rw(pc+2)).toString(16)}.W)`; size = 4; }
  else if (w === 0x4238) { mn = `CLR.B (0x${addrW(rw(pc+2)).toString(16)}.W)`; size = 4; }
  else if ((w & 0xF1F8) === 0x42B9) { mn = `CLR.L (0x${rl(pc+2).toString(16)}).L`; size = 6; }
  else if ((w & 0xF100) === 0x7000) { const v = w & 0xFF; mn = `MOVEQ #${v>127?v-256:v}, D${(w>>9)&7}`; }
  else if ((w & 0xF1F8) === 0x3039) { mn = `MOVE.W (0x${rl(pc+2).toString(16)}).L, D${(w>>9)&7}`; size = 6; }
  else if ((w & 0xF1F8) === 0x3038) { mn = `MOVE.W (0x${addrW(rw(pc+2)).toString(16)}.W), D${(w>>9)&7}`; size = 4; }
  else if ((w & 0xF1F8) === 0x1038) { mn = `MOVE.B (0x${addrW(rw(pc+2)).toString(16)}.W), D${(w>>9)&7}`; size = 4; }
  else if ((w & 0xF1F8) === 0x3138) { mn = `MOVE.W D${(w>>9)&7}, (0x${addrW(rw(pc+2)).toString(16)}.W)`; size = 4; }
  else if ((w & 0xF1F8) === 0x1138) { mn = `MOVE.B D${(w>>9)&7}, (0x${addrW(rw(pc+2)).toString(16)}.W)`; size = 4; }
  else if ((w & 0xF1F8) === 0x3139) { mn = `MOVE.W D${(w>>9)&7}, (0x${rl(pc+2).toString(16)}).L`; size = 6; }
  else if ((w & 0xF1F8) === 0x1139) { mn = `MOVE.B D${(w>>9)&7}, (0x${rl(pc+2).toString(16)}).L`; size = 6; }
  else if ((w & 0xFFF8) === 0x21C8) { mn = `MOVE.L A${w&7}, (0x${addrW(rw(pc+2)).toString(16)}.W)`; size = 4; }
  else if ((w & 0xFFF8) === 0x23C8) { mn = `MOVE.L A${w&7}, (0x${rl(pc+2).toString(16)}).L`; size = 6; }
  else if ((w & 0xF1FF) === 0x41F9) { mn = `LEA 0x${rl(pc+2).toString(16)}, A${(w>>9)&7}`; size = 6; }
  else if ((w & 0xF1FF) === 0x41F8) { mn = `LEA 0x${addrW(rw(pc+2)).toString(16)}.W, A${(w>>9)&7}`; size = 4; }
  else if ((w & 0xF1F8) === 0x41E8) { const d=sx16(rw(pc+2)); mn = `LEA ${d>=0?'+':''}${d}(A${w&7}), A${(w>>9)&7}`; size = 4; }
  else if ((w & 0xF1C0) === 0x41D0) { mn = `LEA (A${w&7}), A${(w>>9)&7}`; }
  else if ((w & 0xF1C0) === 0x2070) { const ext=rw(pc+2); const idxr=(ext>>12)&7; const idxs=(ext&0x8000)?'L':'W'; const an=w&7; const dn=(w>>9)&7; const idxType=(ext&0x800)?'A':'D'; mn = `MOVEA.L (${idxType}${idxr}.${idxs}, A${an}), A${dn}`; size = 4; }
  else if ((w & 0xF1C0) === 0x2078) { mn = `MOVEA.L (0x${addrW(rw(pc+2)).toString(16)}.W), A${(w>>9)&7}`; size = 4; }
  else if ((w & 0xF1C0) === 0x2079) { mn = `MOVEA.L (0x${rl(pc+2).toString(16)}).L, A${(w>>9)&7}`; size = 6; }
  else if (w === 0x4EB9) { mn = `JSR 0x${rl(pc+2).toString(16)}`; size = 6; }
  else if ((w & 0xFF00) === 0x6100) { mn = `BSR.W 0x${(pc+2+sx16(rw(pc+2))).toString(16)}`; size = 4; }
  else if ((w & 0xFF00) === 0x6000) { mn = `BRA.W 0x${(pc+2+sx16(rw(pc+2))).toString(16)}`; size = 4; }
  else if ((w & 0xFF00) === 0x6700) { mn = `BEQ.W 0x${(pc+2+sx16(rw(pc+2))).toString(16)}`; size = 4; }
  else if ((w & 0xFF00) === 0x6600) { mn = `BNE.W 0x${(pc+2+sx16(rw(pc+2))).toString(16)}`; size = 4; }
  else if ((w & 0xF000) === 0x6000 && (w&0xFF)) { mn = `BRA.S 0x${(pc+2+((w&0xFF)>127?(w&0xFF)-256:(w&0xFF))).toString(16)}`; }
  else if ((w & 0xF1C0) === 0x1018) { mn = `MOVE.B (A${w&7})+, D${(w>>9)&7}`; }
  else if ((w & 0xF1C0) === 0x3018) { mn = `MOVE.W (A${w&7})+, D${(w>>9)&7}`; }
  else if ((w & 0xF1C0) === 0x1010) { mn = `MOVE.B (A${w&7}), D${(w>>9)&7}`; }
  else if ((w & 0xF1C0) === 0x3010) { mn = `MOVE.W (A${w&7}), D${(w>>9)&7}`; }
  else if ((w & 0xF1C0) === 0x1028) { const d=sx16(rw(pc+2)); mn = `MOVE.B ${d>=0?'+':''}${d}(A${w&7}), D${(w>>9)&7}`; size = 4; }
  else if ((w & 0xF1C0) === 0x3028) { const d=sx16(rw(pc+2)); mn = `MOVE.W ${d>=0?'+':''}${d}(A${w&7}), D${(w>>9)&7}`; size = 4; }
  else if ((w & 0xF1C0) === 0x1080) { mn = `MOVE.B D${(w>>9)&7}, (A${w&7})`; }
  else if ((w & 0xF1C0) === 0x3080) { mn = `MOVE.W D${(w>>9)&7}, (A${w&7})`; }
  else if ((w & 0xF1C0) === 0x3128) { const d=sx16(rw(pc+2)); mn = `MOVE.W D${(w>>9)&7}, ${d>=0?'+':''}${d}(A${w&7})`; size = 4; }
  else if ((w & 0xF1C0) === 0x1000) { mn = `MOVE.B D${w&7}, D${(w>>9)&7}`; }
  else if ((w & 0xF1C0) === 0x3000) { mn = `MOVE.W D${w&7}, D${(w>>9)&7}`; }
  else if ((w & 0xF1F0) === 0x0C00) { mn = `CMPI.B #0x${(rw(pc+2)&0xFF).toString(16)}, D${(w>>9)&7}`; size = 4; }
  else if ((w & 0xF1F0) === 0x0C40) { mn = `CMPI.W #0x${rw(pc+2).toString(16)}, D${(w>>9)&7}`; size = 4; }
  else if ((w & 0xF1F8) === 0x4A40) { mn = `TST.W D${w&7}`; }
  else if ((w & 0xF1F8) === 0x4A00) { mn = `TST.B D${w&7}`; }
  else if ((w & 0xF1F8) === 0x5240) { mn = `ADDQ.W #1, D${(w>>9)&7}`; }
  else if ((w & 0xF1F8) === 0x5340) { mn = `ADDQ.W #1, D${(w>>9)&7}`; }
  else if ((w & 0xF1F0) === 0x5000) { const q=(w>>9)&7; mn = `ADDQ #${q||8}, D${w&7}`; }
  else if ((w & 0xF1F0) === 0x5300) { const q=(w>>9)&7; mn = `SUBQ #${q||8}, D${w&7}`; }
  else if ((w & 0xF1C0) === 0xD040) { mn = `ADD.W D${w&7}, D${(w>>9)&7}`; }
  else if ((w & 0xF1C0) === 0x9040) { mn = `SUB.W D${w&7}, D${(w>>9)&7}`; }
  else if ((w & 0xF1C0) === 0xB040) { mn = `CMP.W D${w&7}, D${(w>>9)&7}`; }
  else if ((w & 0xF1F8) === 0x51C8) { mn = `DBRA D${w&7}, 0x${(pc+2+sx16(rw(pc+2))).toString(16)}`; size = 4; }
  else if ((w & 0xF1F8) === 0xE008) { mn = `LSR.W #${(w>>9)&7||8}, D${w&7}`; }
  else if ((w & 0xF1F8) === 0xE018) { mn = `LSL.W #${(w>>9)&7||8}, D${w&7}`; }
  else if ((w & 0xF1F8) === 0x4840) { mn = `SWAP D${w&7}`; }
  else if (w === 0x48E7) { mn = `MOVEM.L regs, -(A7) [0x${rw(pc+2).toString(16)}]`; size = 4; }
  else if (w === 0x4CDF) { mn = `MOVEM.L (A7)+, regs [0x${rw(pc+2).toString(16)}]`; size = 4; }
  else if ((w & 0xFFF8) === 0x4ED0) mn = `JMP (A${w&7})`;
  else { mn = `.word 0x${w.toString(16).padStart(4,'0')}`; }
  
  console.log(`  0x${pc.toString(16)}: ${mn}`);
  if (w === 0x4E75) break;
  pc += size;
}

// 6. 基于分析, 尝试解析脚本
// 假设 0xFFFFAA2C 是 A0 增加的字节数 (包括命令字节)
// 即: 命令总字节数 = 0xFFFFAA2C
// 参数字节数 = 0xFFFFAA2C - 1

console.log('\n=== 6. 解析脚本 (假设 0xFFFFAA2C = 命令总字节数) ===\n');

// 已知命令的总字节数 (从 0xFFFFAA2C 设置推断)
const cmdSizes = {
  0x00: 4,  // 0xFFFFAA2C = 4
  0x02: 8,  // 0xFFFFAA2C = 8
  0x04: 0,  // 直接修改 A0 (特殊)
  0x06: 0,  // 直接修改 A0 (特殊)
  0x07: 0,  // 直接修改 A0 (特殊)
  0x08: 4,  // 0xFFFFAA2C = 4
  0x0c: 4,  // 0xFFFFAA2C = 4
  0x0d: 4,  // 0xFFFFAA2C = 4
  0x12: 4,  // 0xFFFFAA2C = 4
  0x16: 0,  // 直接修改 A0 (特殊)
  0x17: 0,  // 直接修改 A0 (特殊)
  0x37: 4,  // 0xFFFFAA2C = 4
  0xff: 1,  // YIELD (只消耗命令字节)
};

let pos = 0x19f1a4;
let cmdIdx = 0;
while (cmdIdx < 100 && pos < 0x19f400) {
  const cmd = rb(pos);
  if (cmd === 0xff) {
    console.log(`  [${cmdIdx}] 0x${pos.toString(16)}: YIELD (0xFF)`);
    pos += 1;
    cmdIdx++;
    continue;
  }
  
  const size = cmdSizes[cmd];
  if (size === undefined) {
    console.log(`  [${cmdIdx}] 0x${pos.toString(16)}: UNKNOWN cmd=0x${cmd.toString(16)}`);
    break;
  }
  
  if (size === 0) {
    // 特殊命令，直接修改 A0，无法确定大小
    console.log(`  [${cmdIdx}] 0x${pos.toString(16)}: cmd=0x${cmd.toString(16)} (特殊, 直接修改A0)`);
    break;
  }
  
  let params = '';
  for (let i = 1; i < size; i++) {
    params += rb(pos + i).toString(16).padStart(2, '0') + ' ';
  }
  console.log(`  [${cmdIdx}] 0x${pos.toString(16)}: cmd=0x${cmd.toString(16)} params=[${params.trim()}] (${size}B)`);
  pos += size;
  cmdIdx++;
}

// 7. 也尝试假设 0xFFFFAA2C = 参数字节数 (不包括命令字节)
console.log('\n=== 7. 解析脚本 (假设 0xFFFFAA2C = 参数字节数, 不包括命令) ===\n');

const cmdParamSizes = {
  0x00: 4,  // 0xFFFFAA2C = 4
  0x02: 8,  // 0xFFFFAA2C = 8
  0x08: 4,  // 0xFFFFAA2C = 4
  0x0c: 4,  // 0xFFFFAA2C = 4
  0x0d: 4,  // 0xFFFFAA2C = 4
  0x12: 4,  // 0xFFFFAA2C = 4
  0x37: 4,  // 0xFFFFAA2C = 4
  0xff: 0,  // YIELD (只消耗命令字节)
};

pos = 0x19f1a4;
cmdIdx = 0;
while (cmdIdx < 100 && pos < 0x19f400) {
  const cmd = rb(pos);
  if (cmd === 0xff) {
    console.log(`  [${cmdIdx}] 0x${pos.toString(16)}: YIELD (0xFF)`);
    pos += 1;
    cmdIdx++;
    continue;
  }
  
  const paramSize = cmdParamSizes[cmd];
  if (paramSize === undefined) {
    console.log(`  [${cmdIdx}] 0x${pos.toString(16)}: UNKNOWN cmd=0x${cmd.toString(16)}`);
    break;
  }
  
  let params = '';
  for (let i = 0; i < paramSize; i++) {
    params += rb(pos + 1 + i).toString(16).padStart(2, '0') + ' ';
  }
  console.log(`  [${cmdIdx}] 0x${pos.toString(16)}: cmd=0x${cmd.toString(16)} params=[${params.trim()}] (${1+paramSize}B)`);
  pos += 1 + paramSize;
  cmdIdx++;
}
