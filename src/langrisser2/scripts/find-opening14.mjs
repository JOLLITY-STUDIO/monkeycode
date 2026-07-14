/**
 * 深入分析:
 * 1. 搜索 0xFFFFAA10-AA20 区域所有引用
 * 2. 反汇编 case bit7 (0x14E26) 完整代码
 * 3. 搜索通过 An 间接写入 0xFFFFAA11 的代码
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
// 1. 搜索 0xFFFFAA00-AAFF 范围所有引用
// ============================================================
console.log('=== 1. 搜索 0xFFFFAA00-AAFF 范围所有引用 ===\n');

const aaRefs = [];
for (let i = 0; i < rom.length - 4; i++) {
  const addr = rl(i);
  if ((addr & 0xFFFFFF00) === 0xFFFFAA00) {
    aaRefs.push({ romAddr: i, targetAddr: addr });
  }
}
console.log(`找到 ${aaRefs.length} 处引用 0xFFFFAA00-AAFF:`);
for (const r of aaRefs) {
  console.log(`  ROM 0x${r.romAddr.toString(16)} → 0x${r.targetAddr.toString(16)}`);
}

// ============================================================
// 2. 反汇编 case bit7 (0x14E26)
// ============================================================
console.log('\n=== 2. 反汇编 case bit7 (0x14E26) ===\n');

function disasmSimple(addr, length) {
  let pc = addr;
  let count = 0;
  while (pc < addr + length && count < 80) {
    const w = rw(pc);
    let size = 2;
    let mn = '';
    
    // 常见指令
    if (w === 0x4E75) { mn = 'RTS'; }
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
    else if ((w & 0xF1C0) === 0x41C0) {
      // LEA
      const dstReg = (w >> 9) & 7;
      const srcMode = (w >> 3) & 7;
      const srcReg = w & 7;
      let srcStr = '';
      let extra = 0;
      if (srcMode === 7 && srcReg === 1) { srcStr = `0x${rl(pc+2).toString(16)}.L`; extra = 4; }
      else if (srcMode === 7 && srcReg === 0) { srcStr = `0x${rw(pc+2).toString(16)}.W`; extra = 2; }
      else if (srcMode === 5) { const d = signExtend16(rw(pc+2)); srcStr = `${d>=0?'+':''}${d}(A${srcReg})`; extra = 2; }
      else if (srcMode === 2) { srcStr = `(A${srcReg})`; }
      else if (srcMode === 3) { srcStr = `(A${srcReg})+`; }
      else if (srcMode === 4) { srcStr = `-(A${srcReg})`; }
      else if (srcMode === 6) { srcStr = `d8(A${srcReg},Xn)`; extra = 2; }
      else { srcStr = `mode${srcMode}r${srcReg}`; }
      mn = `LEA ${srcStr}, A${dstReg}`;
      size = 2 + extra;
    }
    else if ((w & 0xFF00) === 0x4200) {
      // CLR
      const sz = (w >> 6) & 3;
      const sizeNames = { 1: 'B', 2: 'W', 3: 'L' };
      const mode = (w >> 3) & 7;
      const reg = w & 7;
      let dstStr = '';
      let extra = 0;
      if (mode === 7 && reg === 1) { dstStr = `0x${rl(pc+2).toString(16)}.L`; extra = 4; }
      else if (mode === 7 && reg === 0) { dstStr = `0x${rw(pc+2).toString(16)}.W`; extra = 2; }
      else if (mode === 0) { dstStr = `D${reg}`; }
      else if (mode === 5) { const d = signExtend16(rw(pc+2)); dstStr = `${d>=0?'+':''}${d}(A${reg})`; extra = 2; }
      else if (mode === 2) { dstStr = `(A${reg})`; }
      else { dstStr = `mode${mode}r${reg}`; }
      mn = `CLR.${sizeNames[sz]||'?'} ${dstStr}`;
      size = 2 + extra;
    }
    else if (w === 0x11FC) { mn = `MOVE.B #0x${rw(pc+2).toString(16)}, (0x${rl(pc+4).toString(16)}).L`; size = 8; }
    else if (w === 0x31FC) { mn = `MOVE.W #0x${rw(pc+2).toString(16)}, (0x${rl(pc+4).toString(16)}).L`; size = 8; }
    else if (w === 0x21FC) { mn = `MOVE.L #0x${rl(pc+2).toString(16)}, (0x${rl(pc+6).toString(16)}).L`; size = 10; }
    else if ((w & 0xF1F8) === 0x2079) { mn = `MOVEA.L (0x${rl(pc+2).toString(16)}).L, A${(w>>9)&7}`; size = 6; }
    else if ((w & 0xF1F8) === 0x2279) { mn = `MOVEA.L (0x${rl(pc+2).toString(16)}).L, A${(w>>9)&7}`; size = 6; }
    else if ((w & 0xF1F8) === 0x2679) { mn = `MOVEA.L (0x${rl(pc+2).toString(16)}).L, A${(w>>9)&7}`; size = 6; }
    else if ((w & 0xF1F8) === 0x3039) { mn = `MOVE.W (0x${rl(pc+2).toString(16)}).L, D${(w>>9)&7}`; size = 6; }
    else if ((w & 0xF1F8) === 0x1039) { mn = `MOVE.B (0x${rl(pc+2).toString(16)}).L, D${(w>>9)&7}`; size = 6; }
    else if ((w & 0xF1F8) === 0x2039) { mn = `MOVE.L (0x${rl(pc+2).toString(16)}).L, D${(w>>9)&7}`; size = 6; }
    else if ((w & 0xF1F8) === 0x3139) { mn = `MOVE.W D${(w>>9)&7}, (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if ((w & 0xF1F8) === 0x1139) { mn = `MOVE.B D${(w>>9)&7}, (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if ((w & 0xF1F8) === 0x2139) { mn = `MOVE.L D${(w>>9)&7}, (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if ((w & 0xF1C0) === 0x3018) { const r = (w>>9)&7; const a = w&7; mn = `MOVE.W (A${a})+, D${r}`; }
    else if ((w & 0xF1C0) === 0x1018) { const r = (w>>9)&7; const a = w&7; mn = `MOVE.B (A${a})+, D${r}`; }
    else if ((w & 0xF1C0) === 0x2018) { const r = (w>>9)&7; const a = w&7; mn = `MOVE.L (A${a})+, D${r}`; }
    else if ((w & 0xF1C0) === 0x2050) { const r = (w>>9)&7; const a = w&7; mn = `MOVEA.L (A${a}), A${r}`; }
    else if ((w & 0xF1C0) === 0x2250) { const r = (w>>9)&7; const a = w&7; mn = `MOVEA.L (A${a}), A${r}`; }
    else if ((w & 0xF1C0) === 0x2010) { const r = (w>>9)&7; const a = w&7; mn = `MOVE.L (A${a}), D${r}`; }
    else if ((w & 0xF1C0) === 0x3010) { const r = (w>>9)&7; const a = w&7; mn = `MOVE.W (A${a}), D${r}`; }
    else if ((w & 0xF1C0) === 0x1010) { const r = (w>>9)&7; const a = w&7; mn = `MOVE.B (A${a}), D${r}`; }
    else if ((w & 0xF1C0) === 0x3028) { const r=(w>>9)&7; const a=w&7; const d=signExtend16(rw(pc+2)); mn = `MOVE.W ${d>=0?'+':''}${d}(A${a}), D${r}`; size = 4; }
    else if ((w & 0xF1C0) === 0x1028) { const r=(w>>9)&7; const a=w&7; const d=signExtend16(rw(pc+2)); mn = `MOVE.B ${d>=0?'+':''}${d}(A${a}), D${r}`; size = 4; }
    else if ((w & 0xF1C0) === 0x7000) { mn = `MOVEQ #0x${(w&0xFF).toString(16)}, D${(w>>9)&7}`; }
    else if ((w & 0xF1F0) === 0x0C40) { mn = `CMPI.W #0x${rw(pc+2).toString(16)}, D${(w>>9)&7}`; size = 4; }
    else if ((w & 0xF1F0) === 0x0C00) { mn = `CMPI.B #0x${rw(pc+2).toString(16)}, D${(w>>9)&7}`; size = 4; }
    else if ((w & 0xF1F8) === 0x4A39) { mn = `TST.B (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if ((w & 0xF1F8) === 0x4A79) { mn = `TST.W (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if (w === 0x0839) { const bit=rw(pc+2); const dst=rl(pc+4); mn = `BTST #${bit}, 0x${dst.toString(16)}`; size = 8; }
    else if ((w & 0xFFC0) === 0x08C0) { const r=(w>>9)&7; const mode=(w>>3)&7; const reg=w&7; mn = `BSET D${r}, mode${mode}r${reg}`; }
    else { mn = `.word 0x${w.toString(16)}`; }
    
    console.log(`  0x${pc.toString(16).padStart(6,'0')}: ${mn}`);
    pc += size;
    count++;
    if (mn === 'RTS') break;
    if (mn.startsWith('BRA.W') && (mn.includes('0x1592c') || mn.includes('0x157f6'))) break;
  }
}

console.log('--- case bit7 (0x14E26) ---');
disasmSimple(0x14E26, 256);

// ============================================================
// 3. 查看 0xFFFFAA28 写入 (动画脚本指针存储位置)
// ============================================================
console.log('\n=== 3. 查看 0xFFFFAA28 引用 ===\n');
console.log('搜索 0xFFFFAA28 引用:');
for (let i = 0; i < rom.length - 4; i++) {
  if (rl(i) === 0xFFFFAA28) {
    const prevWord = rw(i - 2);
    let ctx = '';
    if (prevWord === 0x21FC) ctx = `MOVE.L #0x${rl(i-4).toString(16)}, (0xFFFFAA28).L`;
    else if ((prevWord & 0xF1F8) === 0x2139) ctx = `MOVE.L D${(prevWord>>9)&7}, (0xFFFFAA28).L`;
    else if ((prevWord & 0xF1F8) === 0x23C0 + 0) ctx = `MOVE.L An, (0xFFFFAA28).L`;
    else if ((prevWord & 0xF1FF) === 0x41F9) ctx = `LEA 0xFFFFAA28, A${(prevWord>>9)&7}`;
    else ctx = `word=0x${prevWord.toString(16)}`;
    console.log(`  ROM 0x${(i-2).toString(16)}: ${ctx}`);
  }
}

// ============================================================
// 4. 查看 0xFFFFAA10-AA40 所有引用
// ============================================================
console.log('\n=== 4. 查看 0xFFFFAA10-AA40 所有引用 ===\n');
for (let target = 0xFFFFAA10; target <= 0xFFFFAA40; target += 2) {
  const refs = [];
  for (let i = 0; i < rom.length - 4; i++) {
    if (rl(i) === target) {
      refs.push(i);
    }
  }
  if (refs.length > 0) {
    console.log(`0x${target.toString(16)} (${refs.length} 处):`);
    for (const r of refs) {
      const prevWord = rw(r - 2);
      console.log(`  ROM 0x${(r-2).toString(16)}: prev=0x${prevWord.toString(16)}`);
    }
  }
}

// ============================================================
// 5. 检查 0x18D60A 处数据的其他解释
// ============================================================
console.log('\n=== 5. 检查 0x18D5F2 处的指针表结构 ===\n');

// 0x18D5F2 是 *(0x18012E) = 0x18D5F2
// 0x18D5F2 处的第一个 longword 是 0x18D60A
// 但这可能是一个指针数组的开始

console.log('0x18D5F2 处数据 (指针数组?):');
for (let i = 0; i < 16; i++) {
  const ptr = rl(0x18D5F2 + i * 4);
  console.log(`  [${i}] 0x${(0x18D5F2 + i * 4).toString(16)}: 0x${ptr.toString(16)}`);
}

// 如果 0x18D5F2 是指针数组, 那么 0x18D60A 是第一个指针指向的脚本
const scriptPtr = rl(0x18D5F2);
console.log(`\n第一个指针: 0x${scriptPtr.toString(16)}`);
console.log(`0x${scriptPtr.toString(16)} 处数据 (前 64B):`);
for (let i = 0; i < 64; i += 16) {
  let hex = '';
  for (let j = 0; j < 16; j++) {
    hex += rb(scriptPtr + i + j).toString(16).padStart(2, '0') + ' ';
  }
  console.log(`  0x${(scriptPtr + i).toString(16)}: ${hex}`);
}

// ============================================================
// 6. 尝试另一个指针表条目
// ============================================================
console.log('\n=== 6. 尝试其他指针表条目 ===\n');

// 0x18011A 指针表条目 0: 0x18416A
for (let entry = 0; entry < 4; entry++) {
  const ptr = rl(0x18011A + entry * 4);
  console.log(`\n条目 ${entry}: 0x${ptr.toString(16)}`);
  console.log(`  0x${ptr.toString(16)} 处数据 (前 32B):`);
  for (let i = 0; i < 32; i += 16) {
    let hex = '';
    for (let j = 0; j < 16; j++) {
      hex += rb(ptr + i + j).toString(16).padStart(2, '0') + ' ';
    }
    console.log(`    0x${(ptr + i).toString(16)}: ${hex}`);
  }
  // 如果这是一个指针
  const innerPtr = rl(ptr);
  if (innerPtr < 0x200000) {
    console.log(`  *(0x${ptr.toString(16)}) = 0x${innerPtr.toString(16)}`);
    console.log(`  0x${innerPtr.toString(16)} 处数据 (前 32B):`);
    for (let i = 0; i < 32; i += 16) {
      let hex = '';
      for (let j = 0; j < 16; j++) {
        hex += rb(innerPtr + i + j).toString(16).padStart(2, '0') + ' ';
      }
      console.log(`    0x${(innerPtr + i).toString(16)}: ${hex}`);
    }
  }
}
