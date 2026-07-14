/**
 * 深入分析:
 * 1. 直接读取 case bit7 原始字节
 * 2. 反汇编 0x11C44 (资源查找函数)
 * 3. 分析脚本数据格式 (8字节结构)
 * 4. 反汇编 0x14DA6 (动画状态机主入口)
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
function signExtend16(v) { return v > 0x7FFF ? v - 0x10000 : v; }

// ============================================================
// 1. 读取 case bit7 原始字节
// ============================================================
console.log('=== 1. case bit7 (0x14E26) 原始字节 ===\n');
console.log('0x14E26 处 64 字节:');
for (let i = 0; i < 64; i += 16) {
  let hex = '';
  for (let j = 0; j < 16; j++) {
    hex += rb(0x14E26 + i + j).toString(16).padStart(2, '0') + ' ';
  }
  console.log(`  0x${(0x14E26 + i).toString(16)}: ${hex}`);
}

// 手工反汇编 case bit7
console.log('\n手工反汇编 case bit7:');
// 从 find-opening8 的分析:
// 0x14E26: case bit7 设置 A0
// 让我逐字节分析
let pc = 0x14E26;
for (let i = 0; i < 20; i++) {
  const w = rw(pc);
  console.log(`  0x${pc.toString(16)}: word=0x${w.toString(16).padStart(4,'0')} bytes=[${rb(pc).toString(16).padStart(2,'0')},${rb(pc+1).toString(16).padStart(2,'0')}]`);
  pc += 2;
}

// ============================================================
// 2. 反汇编 0x14DA6 (动画状态机主入口)
// ============================================================
console.log('\n=== 2. 反汇编 0x14DA6 (动画状态机) ===\n');

function disasm68k(addr, length, label = '') {
  if (label) console.log(`\n--- ${label} ---`);
  let pc = addr;
  let count = 0;
  while (pc < addr + length && count < 60) {
    const w = rw(pc);
    let size = 2;
    let mn = '';
    
    // 基础指令
    if (w === 0x4E75) { mn = 'RTS'; }
    else if (w === 0x4E71) { mn = 'NOP'; }
    else if (w === 0x4EF9) { mn = `JMP 0x${rl(pc+2).toString(16)}`; size = 6; }
    else if (w === 0x4EB9) { mn = `JSR 0x${rl(pc+2).toString(16)}`; size = 6; }
    else if (w === 0x4EBA) { const o = signExtend16(rw(pc+2)); mn = `JSR (PC,d16) -> 0x${(pc+2+o).toString(16)}`; size = 4; }
    else if ((w & 0xF000) === 0x6000) {
      const cond = (w >> 8) & 0xF;
      const condNames = ['RA','F','HI','LS','CC','CS','NE','EQ','VC','VS','PL','MI','GE','LT','GT','LE'];
      const lowByte = w & 0xFF;
      if (lowByte === 0) {
        const o = signExtend16(rw(pc+2));
        mn = `B${condNames[cond]}.W 0x${(pc+2+o).toString(16)}`;
        size = 4;
      } else {
        const o = lowByte > 127 ? lowByte - 256 : lowByte;
        mn = `B${condNames[cond]}.S 0x${(pc+2+o).toString(16)}`;
      }
    }
    else if ((w & 0xF100) === 0x7000) { mn = `MOVEQ #0x${(w&0xFF).toString(16)}, D${(w>>9)&7}`; }
    // MOVE.B #imm, (xxx).L
    else if (w === 0x11FC) { mn = `MOVE.B #0x${rw(pc+2).toString(16)}, (0x${rl(pc+4).toString(16)}).L`; size = 8; }
    // MOVE.W #imm, (xxx).L
    else if (w === 0x31FC) { mn = `MOVE.W #0x${rw(pc+2).toString(16)}, (0x${rl(pc+4).toString(16)}).L`; size = 8; }
    // MOVE.L #imm, (xxx).L
    else if (w === 0x21FC) { mn = `MOVE.L #0x${rl(pc+2).toString(16)}, (0x${rl(pc+6).toString(16)}).L`; size = 10; }
    // MOVE.L An, (xxx).L
    else if ((w & 0xF1F8) === 0x23C0 || (w & 0xF1F8) === 0x21C0) {
      const r = (w >> 9) & 7;
      const op = (w & 0x0100) ? 'MOVEA' : 'MOVE';
      mn = `MOVE.L A${r}, (0x${rl(pc+2).toString(16)}).L`;
      size = 6;
    }
    // MOVE.L Dn, (xxx).L  
    else if ((w & 0xF1F8) === 0x21C0) { mn = `MOVE.L D${(w>>9)&7}, (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    // MOVE.L (xxx).L, An (MOVEA)
    else if ((w & 0xF1F8) === 0x2079) { mn = `MOVEA.L (0x${rl(pc+2).toString(16)}).L, A${(w>>9)&7}`; size = 6; }
    else if ((w & 0xF1F8) === 0x2279) { mn = `MOVEA.L (0x${rl(pc+2).toString(16)}).L, A${(w>>9)&7}`; size = 6; }
    else if ((w & 0xF1F8) === 0x2679) { mn = `MOVEA.L (0x${rl(pc+2).toString(16)}).L, A${(w>>9)&7}`; size = 6; }
    // MOVE.W (xxx).L, Dn
    else if ((w & 0xF1F8) === 0x3039) { mn = `MOVE.W (0x${rl(pc+2).toString(16)}).L, D${(w>>9)&7}`; size = 6; }
    else if ((w & 0xF1F8) === 0x1039) { mn = `MOVE.B (0x${rl(pc+2).toString(16)}).L, D${(w>>9)&7}`; size = 6; }
    else if ((w & 0xF1F8) === 0x2039) { mn = `MOVE.L (0x${rl(pc+2).toString(16)}).L, D${(w>>9)&7}`; size = 6; }
    // MOVE.B/W Dn, (xxx).L
    else if ((w & 0xF1F8) === 0x1139) { mn = `MOVE.B D${(w>>9)&7}, (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if ((w & 0xF1F8) === 0x3139) { mn = `MOVE.W D${(w>>9)&7}, (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    // CLR
    else if (w === 0x4279) { mn = `CLR.W (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if (w === 0x4239) { mn = `CLR.B (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    // TST
    else if (w === 0x4A79) { mn = `TST.W (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if (w === 0x4A39) { mn = `TST.B (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    // BTST #bit, (xxx).L
    else if (w === 0x0839) { mn = `BTST #${rw(pc+2)}, (0x${rl(pc+4).toString(16)}).L`; size = 8; }
    // LEA
    else if ((w & 0xF1FF) === 0x41F9) { mn = `LEA 0x${rl(pc+2).toString(16)}, A${(w>>9)&7}`; size = 6; }
    else if ((w & 0xF1FF) === 0x41F8) { mn = `LEA 0x${rw(pc+2).toString(16)}.W, A${(w>>9)&7}`; size = 4; }
    else if ((w & 0xF1FF) === 0x41E9) { const o = signExtend16(rw(pc+2)); mn = `LEA ${o>=0?'+':''}${o}(A${w&7}), A${(w>>9)&7}`; size = 4; }
    // MOVEA.L (An), An
    else if ((w & 0xF1C0) === 0x2050) { mn = `MOVEA.L (A${w&7}), A${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x2250) { mn = `MOVEA.L (A${w&7}), A${(w>>9)&7}`; }
    // MOVE.L (An)+, Dn
    else if ((w & 0xF1C0) === 0x2018) { mn = `MOVE.L (A${w&7})+, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x3018) { mn = `MOVE.W (A${w&7})+, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x1018) { mn = `MOVE.B (A${w&7})+, D${(w>>9)&7}`; }
    // MOVE.B (An), Dn
    else if ((w & 0xF1C0) === 0x1010) { mn = `MOVE.B (A${w&7}), D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x3010) { mn = `MOVE.W (A${w&7}), D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x2010) { mn = `MOVE.L (A${w&7}), D${(w>>9)&7}`; }
    // MOVE.L (d16,An), Dn
    else if ((w & 0xF1C0) === 0x2028) { const d = signExtend16(rw(pc+2)); mn = `MOVE.L ${d>=0?'+':''}${d}(A${w&7}), D${(w>>9)&7}`; size = 4; }
    else if ((w & 0xF1C0) === 0x3028) { const d = signExtend16(rw(pc+2)); mn = `MOVE.W ${d>=0?'+':''}${d}(A${w&7}), D${(w>>9)&7}`; size = 4; }
    else if ((w & 0xF1C0) === 0x1028) { const d = signExtend16(rw(pc+2)); mn = `MOVE.B ${d>=0?'+':''}${d}(A${w&7}), D${(w>>9)&7}`; size = 4; }
    // MOVEA.L (d16,An), An
    else if ((w & 0xF1C0) === 0x2228) { const d = signExtend16(rw(pc+2)); mn = `MOVEA.L ${d>=0?'+':''}${d}(A${w&7}), A${(w>>9)&7}`; size = 4; }
    else if ((w & 0xF1C0) === 0x2628) { const d = signExtend16(rw(pc+2)); mn = `MOVEA.L ${d>=0?'+':''}${d}(A${w&7}), A${(w>>9)&7}`; size = 4; }
    // MOVE.L (An, Xn)
    else if ((w & 0xF1C0) === 0x2070) { mn = `MOVEA.L (A${w&7}, Xn), A${(w>>9)&7}`; }
    // MOVEA.L (d16,An), An (LEA 变种)
    else if ((w & 0xF1C0) === 0x2070) { mn = `MOVEA.L (A${w&7}, Xn), A${(w>>9)&7}`; }
    // MOVE.L An, (An)
    else if ((w & 0xF1C0) === 0x2080) { mn = `MOVE.L A${w&7}, (A${(w>>9)&7})`; }
    // CMPI
    else if ((w & 0xF1F0) === 0x0C40) { mn = `CMPI.W #0x${rw(pc+2).toString(16)}, D${(w>>9)&7}`; size = 4; }
    else if ((w & 0xF1F0) === 0x0C00) { mn = `CMPI.B #0x${rw(pc+2).toString(16)}, D${(w>>9)&7}`; size = 4; }
    // MOVE.W Dn, Dn
    else if ((w & 0xF1C0) === 0x3000) { mn = `MOVE.W D${w&7}, D${(w>>9)&7}`; }
    else if ((w & 0xF1C0) === 0x1000) { mn = `MOVE.B D${w&7}, D${(w>>9)&7}`; }
    // ADDQ/SUBQ
    else if ((w & 0xF100) === 0x5000) {
      const data = (w >> 9) & 7;
      const imm = data === 0 ? 8 : data;
      const sz = (w >> 6) & 3;
      const sizeNames = { 1: 'B', 2: 'W', 3: 'L' };
      const mode = (w >> 3) & 7;
      const reg = w & 7;
      let dstStr = `mode${mode}r${reg}`;
      if (mode === 0) dstStr = `D${reg}`;
      else if (mode === 1) dstStr = `A${reg}`;
      else if (mode === 2) dstStr = `(A${reg})`;
      else if (mode === 5) { const d = signExtend16(rw(pc+2)); dstStr = `${d>=0?'+':''}${d}(A${reg})`; size = 4; }
      mn = `ADDQ.${sizeNames[sz]||'?'} #${imm}, ${dstStr}`;
    }
    else if ((w & 0xF100) === 0x4000 && (w & 0xF0C0) !== 0x40C0) {
      const data = (w >> 9) & 7;
      const imm = data === 0 ? 8 : data;
      const sz = (w >> 6) & 3;
      const sizeNames = { 1: 'B', 2: 'W', 3: 'L' };
      mn = `SUBQ.${sizeNames[sz]||'?'} #${imm}, ...`;
    }
    // JMP (d16,PC,Xn) - 用于跳转表
    else if (w === 0x4EFB) { mn = `JMP (d16,PC,Xn) [disp=0x${rw(pc+2).toString(16)}]`; size = 4; }
    else { mn = `.word 0x${w.toString(16).padStart(4,'0')}`; }
    
    console.log(`  0x${pc.toString(16).padStart(6,'0')}: ${mn}`);
    pc += size;
    count++;
    if (mn === 'RTS') break;
  }
}

disasm68k(0x14DA6, 256, '0x14DA6 动画状态机');

// ============================================================
// 3. 反汇编 0x11C44 (资源查找函数)
// ============================================================
disasm68k(0x11C44, 128, '0x11C44 资源查找');

// ============================================================
// 4. 分析脚本数据格式
// ============================================================
console.log('\n=== 4. 分析脚本数据格式 (8字节结构) ===\n');

// 从 0x184182 (条目 0 的第一个脚本)
console.log('条目 0 的脚本 (0x184182):');
let pos = 0x184182;
for (let i = 0; i < 8; i++) {
  const b0 = rb(pos);
  const b1 = rb(pos + 1);
  const b2 = rb(pos + 2);
  const b3 = rb(pos + 3);
  const ptr = rl(pos + 4);
  console.log(`  0x${pos.toString(16)}: ${b0.toString(16).padStart(2,'0')} ${b1.toString(16).padStart(2,'0')} ${b2.toString(16).padStart(2,'0')} ${b3.toString(16).padStart(2,'0')} | ptr=0x${ptr.toString(16)}`);
  if (b3 !== 0xFF) {
    console.log(`    (b3 != 0xFF, 格式可能不同)`);
  }
  pos += 8;
  if (b0 === 0xFF && b1 === 0xFF) break;
}

console.log('\n条目 5 的脚本 (0x18D60A):');
pos = 0x18D60A;
for (let i = 0; i < 8; i++) {
  const b0 = rb(pos);
  const b1 = rb(pos + 1);
  const b2 = rb(pos + 2);
  const b3 = rb(pos + 3);
  const ptr = rl(pos + 4);
  console.log(`  0x${pos.toString(16)}: ${b0.toString(16).padStart(2,'0')} ${b1.toString(16).padStart(2,'0')} ${b2.toString(16).padStart(2,'0')} ${b3.toString(16).padStart(2,'0')} | ptr=0x${ptr.toString(16)}`);
  pos += 8;
  if (b0 === 0xFF && b1 === 0xFF) break;
}

// ============================================================
// 5. 检查指针指向的数据
// ============================================================
console.log('\n=== 5. 检查指针指向的数据 ===\n');

// 从条目 0 的第一个条目: ptr=0x00184414
const samplePtrs = [0x184414, 0x18443E, 0x18446C, 0x1844AA];
for (const ptr of samplePtrs) {
  console.log(`\n0x${ptr.toString(16)} 处数据 (前 32B):`);
  for (let i = 0; i < 32; i += 16) {
    let hex = '';
    for (let j = 0; j < 16; j++) {
      hex += rb(ptr + i + j).toString(16).padStart(2, '0') + ' ';
    }
    console.log(`  0x${(ptr + i).toString(16)}: ${hex}`);
  }
}

// 从条目 5: 0x18D964, 0x18DA24
const samplePtrs5 = [0x18D964, 0x18DA24];
for (const ptr of samplePtrs5) {
  console.log(`\n0x${ptr.toString(16)} 处数据 (前 32B):`);
  for (let i = 0; i < 32; i += 16) {
    let hex = '';
    for (let j = 0; j < 16; j++) {
      hex += rb(ptr + i + j).toString(16).padStart(2, '0') + ' ';
    }
    console.log(`  0x${(ptr + i).toString(16)}: ${hex}`);
  }
}

// ============================================================
// 6. 反汇编 0x157F6 (字节码解释器主循环)
// ============================================================
disasm68k(0x157F6, 128, '0x157F6 字节码解释器');
