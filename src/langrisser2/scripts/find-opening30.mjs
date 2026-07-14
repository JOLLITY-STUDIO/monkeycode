/**
 * 深入分析:
 * 1. 检查 cmd 0x02 参数中的 ROM 地址 (0x19f782 等)
 * 2. 搜索谁初始化 0xFF603C 表 (资源描述表)
 * 3. 搜索谁写入 0xFF603C
 * 4. 分析 0x11D7A (处理 0xFF603C 表的函数)
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
// 1. 检查 cmd 0x02 参数中的 ROM 地址
// ============================================================
console.log('=== 1. cmd 0x02 参数中的 ROM 地址 ===\n');

const cmd02Addrs = [
  { addr: 0x19f1c6, params: [0x0a, 0x19, 0x01, 0x00, 0x19, 0xf7, 0x82] },
  { addr: 0x19f1ce, params: [0x01, 0x01, 0x01, 0x00, 0x19, 0xf7, 0xa6] },
  { addr: 0x19f1f6, params: [0x15, 0x57, 0x01, 0x00, 0x19, 0xf7, 0xce] },
  { addr: 0x19f1fe, params: [0x07, 0x21, 0x01, 0x00, 0x19, 0xf7, 0xf4] },
  { addr: 0x19f206, params: [0x15, 0x57, 0x01, 0x00, 0x19, 0xf8, 0x0e] },
  { addr: 0x19f20e, params: [0x01, 0x01, 0x01, 0x00, 0x19, 0xf8, 0x72] },
  { addr: 0x19f216, params: [0x15, 0x57, 0x01, 0x00, 0x19, 0xf8, 0x94] },
];

for (const c of cmd02Addrs) {
  // 参数格式可能是: byte0, word1, long_addr
  // byte0 = 某个 ID
  // byte1-2 = 16位值
  // byte3-6 = 32位 ROM 地址 (big-endian)
  const id = c.params[0];
  const w1 = (c.params[1] << 8) | c.params[2];
  const addr = (c.params[3] << 24) | (c.params[4] << 16) | (c.params[5] << 8) | c.params[6];
  
  console.log(`  0x${c.addr.toString(16)}: id=0x${id.toString(16)} w1=0x${w1.toString(16)} addr=0x${addr.toString(16)}`);
  
  if (addr > 0 && addr < rom.length) {
    // 显示该地址处的数据
    let hex = '';
    for (let i = 0; i < 32; i++) {
      hex += rb(addr + i).toString(16).padStart(2, '0') + ' ';
    }
    console.log(`    数据: ${hex}`);
  }
}

// ============================================================
// 2. 搜索写入 0xFF603C 的代码
// ============================================================
console.log('\n=== 2. 搜索写入 0xFF603C 的代码 ===\n');

// 搜索 MOVE.L #imm, (0xFF603C).L 和 MOVEA.L 0xFF603C, An
// 0xFF603C 作为目标地址
for (let i = 0; i < rom.length - 8; i++) {
  const w = rw(i);
  // LEA 0xFF603C, An
  if ((w & 0xF1FF) === 0x41F9 && rl(i + 2) === 0xFF603C) {
    console.log(`  ROM 0x${i.toString(16)}: LEA 0xFF603C, A${(w>>9)&7}`);
  }
  // MOVE.L #imm, (0xFF603C).L
  if (w === 0x23FC && rl(i + 6) === 0xFF603C) {
    console.log(`  ROM 0x${i.toString(16)}: MOVE.L #0x${rl(i+2).toString(16)}, (0xFF603C).L`);
  }
}

// ============================================================
// 3. 分析 0x11D7A (处理 0xFF603C 表的函数)
// ============================================================
console.log('\n=== 3. 0x11D7A 反汇编 ===\n');

function disasm(addr, maxInstrs, label) {
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
    else if (w === 0x31FC) { mn = `MOVE.W #0x${rw(pc+2).toString(16)}, (0x${addrW(rw(pc+4)).toString(16)}.W)`; size = 6; }
    else if (w === 0x33FC) { mn = `MOVE.W #0x${rw(pc+2).toString(16)}, (0x${rl(pc+4).toString(16)}).L`; size = 8; }
    else if (w === 0x21FC) { mn = `MOVE.L #0x${rl(pc+2).toString(16)}, (0x${addrW(rw(pc+6)).toString(16)}.W)`; size = 8; }
    else if (w === 0x23FC) { mn = `MOVE.L #0x${rl(pc+2).toString(16)}, (0x${rl(pc+6).toString(16)}).L`; size = 10; }
    else if ((w & 0xF1FF) === 0x303C) { mn = `MOVE.W #0x${rw(pc+2).toString(16)}, D${(w>>9)&7}`; size = 4; }
    else if ((w & 0xF1FF) === 0x203C) { mn = `MOVE.L #0x${rl(pc+2).toString(16)}, D${(w>>9)&7}`; size = 6; }
    else if ((w & 0xF100) === 0x7000) { const v = w & 0xFF; mn = `MOVEQ #${v>127?v-256:v}, D${(w>>9)&7}`; }
    else if ((w & 0xF1F8) === 0x3039) { mn = `MOVE.W (0x${rl(pc+2).toString(16)}).L, D${(w>>9)&7}`; size = 6; }
    else if ((w & 0xF1F8) === 0x1039) { mn = `MOVE.B (0x${rl(pc+2).toString(16)}).L, D${(w>>9)&7}`; size = 6; }
    else if ((w & 0xF1F8) === 0x2039) { mn = `MOVE.L (0x${rl(pc+2).toString(16)}).L, D${(w>>9)&7}`; size = 6; }
    else if ((w & 0xF1F8) === 0x2079) { mn = `MOVEA.L (0x${rl(pc+2).toString(16)}).L, A${(w>>9)&7}`; size = 6; }
    else if ((w & 0xF1F8) === 0x2279) { mn = `MOVEA.L (0x${rl(pc+2).toString(16)}).L, A${(w>>9)&7}`; size = 6; }
    else if ((w & 0xF1F8) === 0x3038) { mn = `MOVE.W (0x${addrW(rw(pc+2)).toString(16)}.W), D${(w>>9)&7}`; size = 4; }
    else if ((w & 0xF1F8) === 0x2078) { mn = `MOVEA.L (0x${addrW(rw(pc+2)).toString(16)}.W), A${(w>>9)&7}`; size = 4; }
    else if ((w & 0xF1F8) === 0x3139) { mn = `MOVE.W D${(w>>9)&7}, (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if ((w & 0xF1F8) === 0x1139) { mn = `MOVE.B D${(w>>9)&7}, (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if ((w & 0xF1F8) === 0x3138) { mn = `MOVE.W D${(w>>9)&7}, (0x${addrW(rw(pc+2)).toString(16)}.W)`; size = 4; }
    else if ((w & 0xF1F8) === 0x1138) { mn = `MOVE.B D${(w>>9)&7}, (0x${addrW(rw(pc+2)).toString(16)}.W)`; size = 4; }
    else if ((w & 0xFFF8) === 0x23C8) { mn = `MOVE.L A${w&7}, (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if ((w & 0xFFF8) === 0x21C8) { mn = `MOVE.L A${w&7}, (0x${addrW(rw(pc+2)).toString(16)}.W)`; size = 4; }
    else if ((w & 0xF1FF) === 0x41F9) { mn = `LEA 0x${rl(pc+2).toString(16)}, A${(w>>9)&7}`; size = 6; }
    else if ((w & 0xF1FF) === 0x41F8) { mn = `LEA 0x${addrW(rw(pc+2)).toString(16)}.W, A${(w>>9)&7}`; size = 4; }
    else if ((w & 0xF1F8) === 0x41E8) { const d=sx16(rw(pc+2)); mn = `LEA ${d>=0?'+':''}${d}(A${w&7}), A${(w>>9)&7}`; size = 4; }
    else if ((w & 0xF1C0) === 0x41D0) { mn = `LEA (A${w&7}), A${(w>>9)&7}`; }
    else if (w === 0x4279) { mn = `CLR.W (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if (w === 0x4239) { mn = `CLR.B (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if (w === 0x4278) { mn = `CLR.W (0x${addrW(rw(pc+2)).toString(16)}.W)`; size = 4; }
    else if (w === 0x4238) { mn = `CLR.B (0x${addrW(rw(pc+2)).toString(16)}.W)`; size = 4; }
    else if (w === 0x42B9) { mn = `CLR.L (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if (w === 0x4A79) { mn = `TST.W (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if (w === 0x4A39) { mn = `TST.B (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if (w === 0x4A78) { mn = `TST.W (0x${addrW(rw(pc+2)).toString(16)}.W)`; size = 4; }
    else if (w === 0x4A38) { mn = `TST.B (0x${addrW(rw(pc+2)).toString(16)}.W)`; size = 4; }
    else if ((w & 0xF1F8) === 0x4A40) { mn = `TST.W D${w&7}`; }
    else if ((w & 0xF1F8) === 0x4A00) { mn = `TST.B D${w&7}`; }
    else if ((w & 0xF1F0) === 0x0C40) { mn = `CMPI.W #0x${rw(pc+2).toString(16)}, D${(w>>9)&7}`; size = 4; }
    else if ((w & 0xF1F0) === 0x0C00) { mn = `CMPI.B #0x${(rw(pc+2)&0xFF).toString(16)}, D${(w>>9)&7}`; size = 4; }
    else if ((w & 0xF1F0) === 0x0C80) { mn = `CMPI.L #0x${rl(pc+2).toString(16)}, D${(w>>9)&7}`; size = 6; }
    else if ((w & 0xF1F8) === 0x0800) { mn = `BTST #${rw(pc+2)}, D${(w>>9)&7}`; size = 4; }
    else if ((w & 0xF1FF) === 0x0839) { mn = `BTST #${rw(pc+2)}, (0x${rl(pc+4).toString(16)}).L`; size = 8; }
    else if ((w & 0xF1C0) === 0x0140) { mn = `BCHG D${(w>>9)&7}, (A${w&7})`; }
    else if ((w & 0xF1C0) === 0x1010) { mn = `MOVE.B (A${w&7}), D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x1018) { mn = `MOVE.B (A${w&7})+, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x1028) { const d=sx16(rw(pc+2)); mn = `MOVE.B ${d>=0?'+':''}${d}(A${w&7}), D${(w>>9)&7}`; size = 4; }
    else if ((w & 0xF1C0) === 0x3010) { mn = `MOVE.W (A${w&7}), D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x3018) { mn = `MOVE.W (A${w&7})+, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x3028) { const d=sx16(rw(pc+2)); mn = `MOVE.W ${d>=0?'+':''}${d}(A${w&7}), D${(w>>9)&7}`; size = 4; }
    else if ((w & 0xF1C0) === 0x2010) { mn = `MOVE.L (A${w&7}), D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x2018) { mn = `MOVE.L (A${w&7})+, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x2028) { const d=sx16(rw(pc+2)); mn = `MOVE.L ${d>=0?'+':''}${d}(A${w&7}), D${(w>>9)&7}`; size = 4; }
    else if ((w & 0xF1C0) === 0x1080) { mn = `MOVE.B D${(w>>9)&7}, (A${w&7})`; }
    else if ((w & 0xF1C0) === 0x3080) { mn = `MOVE.W D${(w>>9)&7}, (A${w&7})`; }
    else if ((w & 0xF1C0) === 0x2080) { mn = `MOVE.L D${(w>>9)&7}, (A${w&7})`; }
    else if ((w & 0xF1C0) === 0x3128) { const d=sx16(rw(pc+2)); mn = `MOVE.W D${(w>>9)&7}, ${d>=0?'+':''}${d}(A${w&7})`; size = 4; }
    else if ((w & 0xF1C0) === 0x2128) { const d=sx16(rw(pc+2)); mn = `MOVE.L D${(w>>9)&7}, ${d>=0?'+':''}${d}(A${w&7})`; size = 4; }
    else if ((w & 0xF1C0) === 0x3000) { mn = `MOVE.W D${w&7}, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x2000) { mn = `MOVE.L D${w&7}, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x1000) { mn = `MOVE.B D${w&7}, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x2040) { mn = `MOVEA.L D${w&7}, A${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x3040) { mn = `MOVEA.W D${w&7}, A${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0xD040) { mn = `ADD.W D${w&7}, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0xD000) { mn = `ADD.B D${w&7}, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0xD080) { mn = `ADD.L D${w&7}, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x9040) { mn = `SUB.W D${w&7}, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x9080) { mn = `SUB.L D${w&7}, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0xB040) { mn = `CMP.W D${w&7}, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0xB080) { mn = `CMP.L D${w&7}, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0xD0C0) { mn = `ADDA.W D${w&7}, A${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0xD1C0) { mn = `ADDA.L D${w&7}, A${(w>>9)&7}`; }
    else if (w === 0xD0F9) { mn = `ADDA.W (0x${rl(pc+2).toString(16)}).L, A0`; size = 6; }
    else if (w === 0xD1F9) { mn = `ADDA.L (0x${rl(pc+2).toString(16)}).L, A0`; size = 6; }
    else if ((w & 0xF1F8) === 0x5340) { mn = `SUBQ.W #1, D${(w>>9)&7}`; }
    else if ((w & 0xF1F8) === 0x5140) { mn = `ADDQ.W #1, D${(w>>9)&7}`; }
    else if ((w & 0xF1F8) === 0x5240) { mn = `ADDQ.W #1, D${(w>>9)&7}`; }
    else if ((w & 0xF1F0) === 0x5000) { const q=(w>>9)&7; mn = `ADDQ #${q||8}, D${w&7}`; }
    else if ((w & 0xF1F0) === 0x5300) { const q=(w>>9)&7; mn = `SUBQ #${q||8}, D${w&7}`; }
    else if ((w & 0xF1F0) === 0x5100) { const q=(w>>9)&7; mn = `SUBQ #${q||8}, D${w&7}`; }
    else if ((w & 0xF1F8) === 0x51C8) { mn = `DBRA D${w&7}, 0x${(pc+2+sx16(rw(pc+2))).toString(16)}`; size = 4; }
    else if ((w & 0xF1F8) === 0x51C0) { mn = `DBF D${w&7}, 0x${(pc+2+sx16(rw(pc+2))).toString(16)}`; size = 4; }
    else if ((w & 0xF1F8) === 0xE008) { mn = `LSR.W #${(w>>9)&7||8}, D${w&7}`; }
    else if ((w & 0xF1F8) === 0xE018) { mn = `LSL.W #${(w>>9)&7||8}, D${w&7}`; }
    else if ((w & 0xF1F8) === 0xE000) { mn = `ASR.W #${(w>>9)&7||8}, D${w&7}`; }
    else if ((w & 0xF1F8) === 0xE010) { mn = `ASL.W #${(w>>9)&7||8}, D${w&7}`; }
    else if ((w & 0xF1F8) === 0x4840) { mn = `SWAP D${w&7}`; }
    else if ((w & 0xF1F8) === 0x4880) { mn = `EXT.W D${w&7}`; }
    else if (w === 0x48E7) { mn = `MOVEM.L regs, -(A7) [0x${rw(pc+2).toString(16)}]`; size = 4; }
    else if (w === 0x4CDF) { mn = `MOVEM.L (A7)+, regs [0x${rw(pc+2).toString(16)}]`; size = 4; }
    else if ((w & 0xF1C0) === 0x2070) { const ext=rw(pc+2); const idxr=(ext>>12)&7; const idxs=(ext&0x8000)?'L':'W'; const an=w&7; const dn=(w>>9)&7; const idxType=(ext&0x800)?'A':'D'; mn = `MOVEA.L (${idxType}${idxr}.${idxs}, A${an}), A${dn}`; size = 4; }
    else if ((w & 0xFFF8) === 0x4ED0) mn = `JMP (A${w&7})`;
    else if ((w & 0xF1C0) === 0xC040) { mn = `MULU.W D${w&7}, D${(w>>9)&7}`; }
    else { mn = `.word 0x${w.toString(16).padStart(4,'0')}`; }

    console.log(`  0x${pc.toString(16).padStart(6,'0')}: ${mn}`);
    if (w === 0x4E75 || w === 0x4EF9) break;
    pc += size;
  }
  return pc;
}

disasm(0x11D7A, 40, '0x11D7A (处理 0xFF603C 表)');

// ============================================================
// 4. 分析 0x11812 (资源查找)
// ============================================================
disasm(0x11812, 40, '0x11812 (资源查找)');

// ============================================================
// 5. 检查 0x19f782 处的数据 (cmd 0x02 引用的地址)
// ============================================================
console.log('\n=== 5. 0x19f782 处的数据 ===\n');

for (const c of cmd02Addrs) {
  const addr = (c.params[3] << 24) | (c.params[4] << 16) | (c.params[5] << 8) | c.params[6];
  if (addr > 0 && addr < rom.length) {
    console.log(`\n地址 0x${addr.toString(16)} (被 cmd 0x02 @ 0x${c.addr.toString(16)} 引用):`);
    for (let i = 0; i < 64; i += 16) {
      let hex = '';
      let ascii = '';
      for (let j = 0; j < 16; j++) {
        const b = rb(addr + i + j);
        hex += b.toString(16).padStart(2, '0') + ' ';
        ascii += (b >= 0x20 && b < 0x7F) ? String.fromCharCode(b) : '.';
      }
      console.log(`  0x${(addr + i).toString(16)}: ${hex} ${ascii}`);
    }
  }
}

// ============================================================
// 6. 检查 0x5DF40 处的数据 (场景参数指针指向的地址)
// ============================================================
console.log('\n=== 6. 0x5DF40 处的数据 (场景参数) ===\n');

for (let i = 0; i < 128; i += 16) {
  let hex = '';
  for (let j = 0; j < 16; j++) {
    hex += rb(0x5DF40 + i + j).toString(16).padStart(2, '0') + ' ';
  }
  console.log(`  0x${(0x5DF40 + i).toString(16)}: ${hex}`);
}

// ============================================================
// 7. 检查资源指针表 0x19efa2 的结构 (sceneIndex=14 的场景数据)
// ============================================================
console.log('\n=== 7. 0x19efa2 场景数据结构 ===\n');

console.log('0x19efa2 处的 8 个 long 指针:');
for (let i = 0; i < 8; i++) {
  const ptr = rl(0x19efa2 + i * 4);
  console.log(`  [+0x${(i*4).toString(16).padStart(2,'0')}] 0x${(0x19efa2 + i*4).toString(16)}: 0x${ptr.toString(16)}`);
  if (ptr > 0 && ptr < rom.length && ptr > 0x10000) {
    // 显示指针指向的数据
    let hex = '';
    for (let j = 0; j < 16; j++) {
      hex += rb(ptr + j).toString(16).padStart(2, '0') + ' ';
    }
    console.log(`         → 数据: ${hex}`);
  }
}
