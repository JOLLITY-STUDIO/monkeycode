/**
 * 完整解码 16 个动画命令处理器
 * 目标: 确定每个命令消耗多少参数字节
 * 
 * 关键: 0x157F6 字节码解释器循环
 *   0x157F6: JSR 0xFE2A (帧推进)
 *   0x15826: MOVE.B (A0)+, D0  ← 读命令字节
 *   0x15828: CMPI.B #0xFF, D0
 *   0x1582C: BEQ.W 0x1593C
 *   0x15830: ADD.W D0, D0
 *   0x15832: ADD.W D0, D0
 *   0x15834: JMP 0x15838(PC, D0.W)
 * 
 * 跳转表 0x15838: 16 个 BRA.W
 *   [0] → 0x15952  [1] → 0x159D6  [2] → 0x159FC  [3] → 0x15B2E
 *   [4] → 0x15B58  [5] → 0x15B94  [6] → 0x15BD0  [7] → 0x15C0E
 *   [8] → 0x15C4C  [9] → 0x15C7E  [10] → 0x15CBC [11] → 0x15CFA
 *   [12] → 0x15D2C [13] → 0x15D78 [14] → 0x15E76 [15] → 0x15F90
 * 
 * 跟踪 (A0)+ 的次数即可知道参数消耗
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

// 完整反汇编器 - 返回指令列表
function disasmInstr(pc) {
  const w = rw(pc);
  let size = 2;
  let mnemonic = '';
  let readsA0 = false;  // 是否读取 (A0)+
  let writesA0 = false; // 是否修改 A0
  
  if (w === 0x4E75) { mnemonic = 'RTS'; }
  else if (w === 0x4EF9) { mnemonic = `JMP 0x${rl(pc+2).toString(16)}`; size = 6; }
  else if (w === 0x4EB9) { mnemonic = `JSR 0x${rl(pc+2).toString(16)}`; size = 6; }
  else if (w === 0x4EBA) { const o = rw(pc+2); const t = pc + 2 + (o > 0x7FFF ? o - 0x10000 : o); mnemonic = `JSR (PC,d16) -> 0x${t.toString(16)}`; size = 4; }
  else if ((w & 0xFF00) === 0x6100) { const o = rw(pc+2); const t = pc + 2 + (o > 0x7FFF ? o - 0x10000 : o); mnemonic = `BSR.W 0x${t.toString(16)}`; size = 4; }
  else if ((w & 0xFF00) === 0x6000) { const o = rw(pc+2); const t = pc + 2 + (o > 0x7FFF ? o - 0x10000 : o); mnemonic = `BRA.W 0x${t.toString(16)}`; size = 4; }
  else if ((w & 0xFF00) === 0x6700) { const o = rw(pc+2); const t = pc + 2 + (o > 0x7FFF ? o - 0x10000 : o); mnemonic = `BEQ.W 0x${t.toString(16)}`; size = 4; }
  else if ((w & 0xFF00) === 0x6600) { const o = rw(pc+2); const t = pc + 2 + (o > 0x7FFF ? o - 0x10000 : o); mnemonic = `BNE.W 0x${t.toString(16)}`; size = 4; }
  else if ((w & 0xFF00) === 0x6500) { const o = rw(pc+2); const t = pc + 2 + (o > 0x7FFF ? o - 0x10000 : o); mnemonic = `BCS.W 0x${t.toString(16)}`; size = 4; }
  else if ((w & 0xFF00) === 0x6400) { const o = rw(pc+2); const t = pc + 2 + (o > 0x7FFF ? o - 0x10000 : o); mnemonic = `BCC.W 0x${t.toString(16)}`; size = 4; }
  else if ((w & 0xFF00) === 0x61 && (w & 0xFF) !== 0 && (w & 0xFF) !== 0xFF) { const o = w & 0xFF; const t = pc + 2 + (o > 127 ? o - 256 : o); mnemonic = `BSR.S 0x${t.toString(16)}`; }
  else if ((w & 0xFF00) === 0x60 && (w & 0xFF) !== 0 && (w & 0xFF) !== 0xFF) { const o = w & 0xFF; const t = pc + 2 + (o > 127 ? o - 256 : o); mnemonic = `BRA.S 0x${t.toString(16)}`; }
  else if ((w & 0xFF00) === 0x67 && (w & 0xFF) !== 0 && (w & 0xFF) !== 0xFF) { const o = w & 0xFF; const t = pc + 2 + (o > 127 ? o - 256 : o); mnemonic = `BEQ.S 0x${t.toString(16)}`; }
  else if ((w & 0xFF00) === 0x66 && (w & 0xFF) !== 0 && (w & 0xFF) !== 0xFF) { const o = w & 0xFF; const t = pc + 2 + (o > 127 ? o - 256 : o); mnemonic = `BNE.S 0x${t.toString(16)}`; }
  else if ((w & 0xF100) === 0x7000) { const r = (w>>9)&7; const v = w & 0xFF; mnemonic = `MOVEQ #0x${v.toString(16)}, D${r}`; }
  else if ((w & 0xF1F0) === 0x0C40) { const r=(w>>9)&7; mnemonic = `CMPI.W #0x${rw(pc+2).toString(16)}, D${r}`; size = 4; }
  else if ((w & 0xF1F0) === 0x0C00) { const r=(w>>9)&7; mnemonic = `CMPI.B #0x${rw(pc+2).toString(16)}, D${r}`; size = 4; }
  else if (w === 0x31FC) { mnemonic = `MOVE.W #0x${rw(pc+2).toString(16)}, (0x${rl(pc+4).toString(16)}).L`; size = 8; }
  else if (w === 0x23FC) { mnemonic = `MOVE.L #0x${rl(pc+2).toString(16)}, (0x${rl(pc+6).toString(16)}).L`; size = 10; }
  else if (w === 0x21FC) { mnemonic = `MOVE.L #0x${rl(pc+2).toString(16)}, (0x${rl(pc+6).toString(16)}).L`; size = 10; }
  else if (w === 0x11FC) { mnemonic = `MOVE.B #0x${rw(pc+2).toString(16)}, (0x${rl(pc+4).toString(16)}).L`; size = 8; }
  else if ((w & 0xF1F0) === 0x303C) { const r=(w>>9)&7; mnemonic = `MOVE.W #0x${rw(pc+2).toString(16)}, D${r}`; size = 4; }
  else if ((w & 0xF1F0) === 0x103C) { const r=(w>>9)&7; mnemonic = `MOVE.B #0x${rw(pc+2).toString(16)}, D${r}`; size = 4; }
  else if ((w & 0xF1F8) === 0x3039) { const r=(w>>9)&7; mnemonic = `MOVE.W (0x${rl(pc+2).toString(16)}).L, D${r}`; size = 6; }
  else if ((w & 0xF1F8) === 0x1039) { const r=(w>>9)&7; mnemonic = `MOVE.B (0x${rl(pc+2).toString(16)}).L, D${r}`; size = 6; }
  else if ((w & 0xF1F8) === 0x2039) { const r=(w>>9)&7; mnemonic = `MOVE.L (0x${rl(pc+2).toString(16)}).L, D${r}`; size = 6; }
  else if ((w & 0xF1F8) === 0x3139) { const r=(w>>9)&7; mnemonic = `MOVE.W D${r}, (0x${rl(pc+2).toString(16)}).L`; size = 6; }
  else if ((w & 0xF1F8) === 0x1139) { const r=(w>>9)&7; mnemonic = `MOVE.B D${r}, (0x${rl(pc+2).toString(16)}).L`; size = 6; }
  else if ((w & 0xF1F8) === 0x2139) { const r=(w>>9)&7; mnemonic = `MOVE.L D${r}, (0x${rl(pc+2).toString(16)}).L`; size = 6; }
  else if ((w & 0xF1FF) === 0x41F9) { const r=(w>>9)&7; mnemonic = `LEA 0x${rl(pc+2).toString(16)}, A${r}`; size = 6; }
  else if ((w & 0xF1FF) === 0x41E9) { const r=(w>>9)&7; const o = rw(pc+2); const sd = o > 0x7FFF ? o - 0x10000 : o; mnemonic = `LEA ${sd>=0?'+':''}${sd}(A${w&7}), A${r}`; size = 4; }
  else if ((w & 0xF1F8) === 0x2079) { const r=(w>>9)&7; mnemonic = `MOVEA.L (0x${rl(pc+2).toString(16)}).L, A${r}`; size = 6; }
  else if ((w & 0xF1F8) === 0x2279) { const r=(w>>9)&7; mnemonic = `MOVEA.L (0x${rl(pc+2).toString(16)}).L, A${r}`; size = 6; }
  else if ((w & 0xF1F8) === 0x2679) { const r=(w>>9)&7; mnemonic = `MOVEA.L (0x${rl(pc+2).toString(16)}).L, A${r}`; size = 6; }
  else if (w === 0x4279) { mnemonic = `CLR.W (0x${rl(pc+2).toString(16)}).L`; size = 6; }
  else if (w === 0x4239) { mnemonic = `CLR.B (0x${rl(pc+2).toString(16)}).L`; size = 6; }
  else if (w === 0x4278) { mnemonic = `CLR.W (0x${rw(pc+2).toString(16)}).W`; size = 4; }
  else if (w === 0x4A79) { mnemonic = `TST.W (0x${rl(pc+2).toString(16)}).L`; size = 6; }
  else if (w === 0x4A39) { mnemonic = `TST.B (0x${rl(pc+2).toString(16)}).L`; size = 6; }
  else if (w === 0x4A78) { mnemonic = `TST.W (0x${rw(pc+2).toString(16)}).W`; size = 4; }
  else if (w === 0x48E7) { mnemonic = `MOVEM.L regs, -(A7) [0x${rw(pc+2).toString(16)}]`; size = 4; }
  else if (w === 0x4CDF) { mnemonic = `MOVEM.L (A7)+, regs [0x${rw(pc+2).toString(16)}]`; size = 4; }
  else if ((w & 0xF1F8) === 0x51C8) { const r=w&7; const o=rw(pc+2); const t = pc + 2 + (o > 0x7FFF ? o - 0x10000 : o); mnemonic = `DBRA D${r}, 0x${t.toString(16)}`; size = 4; }
  else if ((w & 0xF1F8) === 0x5340) { const r=(w>>9)&7; mnemonic = `SUBQ.W #1, D${r}`; }
  else if ((w & 0xF1F8) === 0x5140) { const r=(w>>9)&7; mnemonic = `ADDQ.W #1, D${r}`; }
  else if ((w & 0xF1F8) === 0x5380) { const r=(w>>9)&7; mnemonic = `SUBQ.L #1, D${r}`; }
  else if ((w & 0xF1F8) === 0x5180) { const r=(w>>9)&7; mnemonic = `ADDQ.L #1, D${r}`; }
  else if ((w & 0xF1C0) === 0xD0C0) { const r=(w>>9)&7; const s=w&0x3F; mnemonic = `ADD.W D${s&7}, D${r}`; }
  else if ((w & 0xF1C0) === 0x3000) { const r=(w>>9)&7; const s=w&7; mnemonic = `MOVE.W D${s}, D${r}`; }
  else if ((w & 0xF1C0) === 0x1000) { const r=(w>>9)&7; const s=w&7; mnemonic = `MOVE.B D${s}, D${r}`; }
  else if ((w & 0xF1C0) === 0x3028) { const r=(w>>9)&7; const a=w&7; const disp = rw(pc+2); const sd = disp > 0x7FFF ? disp - 0x10000 : disp; mnemonic = `MOVE.W ${sd>=0?'+':''}${sd}(A${a}), D${r}`; size = 4; }
  else if ((w & 0xF1C0) === 0x3128) { const r=(w>>9)&7; const a=w&7; const disp = rw(pc+2); const sd = disp > 0x7FFF ? disp - 0x10000 : disp; mnemonic = `MOVE.W D${r}, ${sd>=0?'+':''}${sd}(A${a})`; size = 4; }
  else if ((w & 0xF1C0) === 0x1010) { const r=(w>>9)&7; const a=w&7; mnemonic = `MOVE.B (A${a}), D${r}`; }
  // (A0)+ 后增量寻址
  else if ((w & 0xF1C0) === 0x1018) { const r=(w>>9)&7; const a=w&7; mnemonic = `MOVE.B (A${a})+, D${r}`; readsA0 = (a === 0); writesA0 = (a === 0); }
  else if ((w & 0xF1C0) === 0x3018) { const r=(w>>9)&7; const a=w&7; mnemonic = `MOVE.W (A${a})+, D${r}`; readsA0 = (a === 0); writesA0 = (a === 0); }
  else if ((w & 0xF1C0) === 0x2018) { const r=(w>>9)&7; const a=w&7; mnemonic = `MOVE.L (A${a})+, D${r}`; readsA0 = (a === 0); writesA0 = (a === 0); }
  else if ((w & 0xF1C0) === 0x3010) { const r=(w>>9)&7; const a=w&7; mnemonic = `MOVE.W (A${a}), D${r}`; }
  else if ((w & 0xF1C0) === 0x3810) { const r=(w>>9)&7; const a=w&7; mnemonic = `MOVE.W (A${a}), A${r}`; }
  else if ((w & 0xF1C0) === 0x2010) { const r=(w>>9)&7; const a=w&7; mnemonic = `MOVE.L (A${a}), D${r}`; }
  else if ((w & 0xF1C0) === 0x2810) { const r=(w>>9)&7; const a=w&7; mnemonic = `MOVEA.L (A${a}), A${r}`; }
  else if ((w & 0xF1C0) === 0x1110) { const r=(w>>9)&7; const a=w&7; mnemonic = `MOVE.B (A${a}), D${r}`; }
  else if (w === 0x4E71) { mnemonic = 'NOP'; }
  else if (w === 0x0839) { const bit=rw(pc+2); const dst=rl(pc+4); mnemonic = `BTST #${bit}, 0x${dst.toString(16)}`; size = 8; }
  else if (w === 0x08C0) { const bit=w&0xFF; const r=(w>>9)&7; mnemonic = `BSET #${bit}, D${r}`; }
  else if (w === 0x0039) { const bit=rw(pc+2); const dst=rl(pc+4); const v=rw(pc+8); mnemonic = `ORI.W #0x${v.toString(16)}, 0x${dst.toString(16)}`; size = 10; }
  else if (w === 0x0040) { const r=(w>>9)&7; mnemonic = `ORI.W #0x${rw(pc+2).toString(16)}, D${r}`; size = 4; }
  else if ((w & 0xF1F0) === 0xE140) { const r=(w>>9)&7; const s=w&7; mnemonic = `LSL.W D${s}, D${r}`; }
  else if ((w & 0xF1F0) === 0xE050) { const r=(w>>9)&7; const s=w&7; mnemonic = `ROR.W D${s}, D${r}`; }
  else if ((w & 0xF1F0) === 0xE048) { const r=(w>>9)&7; const c=(w>>9)&7; mnemonic = `LSR.W #${(w>>9)&7}, D${r}`; }
  else { mnemonic = `.word 0x${w.toString(16).padStart(4,'0')}`; }
  
  return { addr: pc, size, mnemonic, readsA0, writesA0 };
}

function disasmRange(start, maxLen, maxInstrs = 50) {
  const instrs = [];
  let pc = start;
  let count = 0;
  while (pc < start + maxLen && count < maxInstrs) {
    const i = disasmInstr(pc);
    instrs.push(i);
    pc += i.size;
    count++;
    // 在 RTS 或 BRA 后停止 (假设命令处理器结构)
    if (i.mnemonic === 'RTS' || i.mnemonic.startsWith('BRA.W 0x15') || i.mnemonic.startsWith('BRA.S 0x15')) {
      // 检查是否跳回主循环
      if (i.mnemonic === 'RTS' || i.mnemonic.includes('0x157f6') || i.mnemonic.includes('0x15826') || i.mnemonic.includes('0x1582c')) break;
    }
    // 跳转到 0x157F6 (循环顶部) 时停止
    if (i.mnemonic.includes('0x157f6') || i.mnemonic.includes('0x1582c') || i.mnemonic.includes('0x1593c')) break;
  }
  return instrs;
}

const cmdHandlers = [
  0x15952, 0x159D6, 0x159FC, 0x15B2E,
  0x15B58, 0x15B94, 0x15BD0, 0x15C0E,
  0x15C4C, 0x15C7E, 0x15CBC, 0x15CFA,
  0x15D2C, 0x15D78, 0x15E76, 0x15F90
];

console.log('=== 解码 16 个动画命令处理器 ===\n');
const cmdSummary = [];

for (let i = 0; i < 16; i++) {
  const start = cmdHandlers[i];
  console.log(`\n--- cmd ${i} @ 0x${start.toString(16)} ---`);
  const instrs = disasmRange(start, 256, 80);
  let a0ReadCount = 0;
  for (const ins of instrs) {
    console.log(`  0x${ins.addr.toString(16).padStart(6,'0')}: ${ins.mnemonic}`);
    if (ins.readsA0) {
      a0ReadCount++;
      console.log(`         ^^^ 读取 (A0)+ [参数字节 #${a0ReadCount}]`);
    }
  }
  cmdSummary.push({ cmd: i, addr: start, a0ReadCount, instrCount: instrs.length });
}

console.log('\n\n=== 命令参数消耗总结 ===');
console.log('cmd | addr    | (A0)+ reads | instr count');
console.log('----+---------+-------------+------------');
for (const s of cmdSummary) {
  console.log(` ${s.cmd.toString().padStart(2)} | 0x${s.addr.toString(16).padStart(5,'0')} | ${s.a0ReadCount.toString().padStart(11)} | ${s.instrCount.toString().padStart(10)}`);
}

// 现在尝试解析脚本
console.log('\n\n=== 使用参数消耗重新解析脚本 ===');
// 从 find-opening10: A0 路径
// A0 = 0x18011A, A0+0x14 = 0x18012E
// *0x18012E = 0x18D5F2
// *0x18D5F2 = 0x18D60A
const scriptStart = 0x18D60A;
console.log(`脚本起始: 0x${scriptStart.toString(16)}`);

// 但是这可能是 32 位指针 (双重解引用)
// 让我检查 0x18D5F2 处是什么
console.log(`\nROM 0x18D5F2 处数据:`);
for (let i = 0; i < 32; i++) {
  console.log(`  0x${(0x18D5F2 + i).toString(16)}: 0x${rb(0x18D5F2 + i).toString(16).padStart(2,'0')}`);
}

// 实际脚本数据可能在 *0x18D60A
const innerPtr = rl(0x18D60A);
console.log(`\n*0x18D60A = 0x${innerPtr.toString(16)}`);
if (innerPtr < 0xFF0000) {
  console.log(`(ROM 地址 - 实际脚本数据)`);
  console.log(`\nROM 0x${innerPtr.toString(16)} 处脚本 (前 64B):`);
  for (let i = 0; i < 64; i += 16) {
    let hex = '';
    let ascii = '';
    for (let j = 0; j < 16; j++) {
      const b = rb(innerPtr + i + j);
      hex += b.toString(16).padStart(2, '0') + ' ';
      ascii += (b >= 0x20 && b < 0x7F) ? String.fromCharCode(b) : '.';
    }
    console.log(`  0x${(innerPtr + i).toString(16)}: ${hex} ${ascii}`);
  }
  
  // 解析命令
  console.log(`\n命令解析 (从 0x${innerPtr.toString(16)} 开始):`);
  let pos = innerPtr;
  let cmdIdx = 0;
  while (cmdIdx < 50) {
    const cmd = rb(pos);
    if (cmd === 0xFF) {
      console.log(`  [${cmdIdx}] 0x${pos.toString(16)}: END (0xFF)`);
      break;
    }
    if (cmd > 15) {
      console.log(`  [${cmdIdx}] 0x${pos.toString(16)}: INVALID cmd=${cmd}`);
      break;
    }
    const summary = cmdSummary[cmd];
    let line = `  [${cmdIdx}] 0x${pos.toString(16)}: cmd=${cmd} (${summary.a0ReadCount} params)`;
    const params = [];
    for (let p = 0; p < summary.a0ReadCount; p++) {
      params.push(rb(pos + 1 + p));
    }
    if (params.length > 0) {
      line += ` params=[${params.map(p => '0x' + p.toString(16).padStart(2,'0')).join(', ')}]`;
    }
    console.log(line);
    pos += 1 + summary.a0ReadCount;
    cmdIdx++;
  }
}
