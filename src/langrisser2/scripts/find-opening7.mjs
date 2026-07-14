/**
 * 搜索动画帧更新逻辑 - 查找谁读取/写入 0xFFFFA5AE 标志
 * 和 0xFFFFA5F2 动画状态缓冲
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

// 搜索引用特定 RAM 地址的代码
function searchRAMRef(ramAddr, label) {
  console.log(`\n=== 搜索引用 0x${ramAddr.toString(16)} (${label}) ===`);
  
  // 搜索 (abs).L 形式
  for (let i = 0; i < rom.length - 8; i++) {
    if (rl(i) === ramAddr) {
      // 上下文分析
      const prev2 = rw(i-2);
      const prev4 = rw(i-4);
      let ctx = '';
      let ctxAddr = i - 4;
      
      // 检查常见模式
      if ((prev2 & 0xF1F8) === 0x3039) { ctx = `MOVE.W (0x${ramAddr.toString(16)}).L, D${(prev2>>9)&7}`; ctxAddr = i - 2; }
      else if ((prev2 & 0xF1F8) === 0x1039) { ctx = `MOVE.B (0x${ramAddr.toString(16)}).L, D${(prev2>>9)&7}`; ctxAddr = i - 2; }
      else if ((prev2 & 0xF1F8) === 0x2039) { ctx = `MOVE.L (0x${ramAddr.toString(16)}).L, D${(prev2>>9)&7}`; ctxAddr = i - 2; }
      else if (prev2 === 0x4A39) { ctx = `TST.B (0x${ramAddr.toString(16)}).L`; ctxAddr = i - 2; }
      else if (prev2 === 0x4A79) { ctx = `TST.W (0x${ramAddr.toString(16)}).L`; ctxAddr = i - 2; }
      else if (prev2 === 0x4239) { ctx = `CLR.B (0x${ramAddr.toString(16)}).L`; ctxAddr = i - 2; }
      else if (prev2 === 0x4279) { ctx = `CLR.W (0x${ramAddr.toString(16)}).L`; ctxAddr = i - 2; }
      else if (prev2 === 0x0C39 || (prev2 & 0xFFF8) === 0x0C38) {
        const val = rw(i+4);
        ctx = `CMPI.B #0x${val.toString(16)}, (0x${ramAddr.toString(16)}).L`;
        ctxAddr = i - 2;
      }
      else if ((prev2 & 0xF1F8) === 0x1139) { ctx = `MOVE.B D${(prev2>>9)&7}, (0x${ramAddr.toString(16)}).L`; ctxAddr = i - 2; }
      else if ((prev2 & 0xF1F8) === 0x3139) { ctx = `MOVE.W D${(prev2>>9)&7}, (0x${ramAddr.toString(16)}).L`; ctxAddr = i - 2; }
      else if (prev2 === 0x11FC) {
        const val = rw(i-4);
        ctx = `MOVE.B #0x${val.toString(16)}, (0x${ramAddr.toString(16)}).L`;
        ctxAddr = i - 6;
      }
      else if (prev2 === 0x31FC) {
        const val = rw(i-4);
        ctx = `MOVE.W #0x${val.toString(16)}, (0x${ramAddr.toString(16)}).L`;
        ctxAddr = i - 6;
      }
      else if ((prev2 & 0xF1FF) === 0x41F9) {
        // LEA 0xXXXX, An - 但 LEA 的目标地址在 i+2 处 (4字节)
        // 这里 rl(i) 是 LEA 的目标, 所以 prev2 是 LEA opcode
        // 但 LEA An 后面会紧跟其他操作
        ctx = `LEA 0x${ramAddr.toString(16)}, A${(prev2>>9)&7}`;
        ctxAddr = i - 2;
      }
      
      if (ctx) {
        console.log(`  ROM 0x${ctxAddr.toString(16)}: ${ctx}`);
      }
    }
  }
  
  // 搜索 (abs).W 形式 - 只有低 16 位
  const low16 = ramAddr & 0xFFFF;
  for (let i = 0; i < rom.length - 6; i++) {
    if (rw(i) === low16 && (i === 0 || rom[i-1] !== 0xFF)) {
      const prev2 = rw(i-2);
      let ctx = '';
      let ctxAddr = i - 2;
      
      if ((prev2 & 0xF1F8) === 0x3038) { ctx = `MOVE.W (0x${low16.toString(16)}).W, D${(prev2>>9)&7}`; }
      else if ((prev2 & 0xF1F8) === 0x1038) { ctx = `MOVE.B (0x${low16.toString(16)}).W, D${(prev2>>9)&7}`; }
      else if (prev2 === 0x4A38) { ctx = `TST.B (0x${low16.toString(16)}).W`; }
      else if (prev2 === 0x4A78) { ctx = `TST.W (0x${low16.toString(16)}).W`; }
      
      if (ctx) {
        // 验证这是 (abs).W 而不是 (abs).L 的一部分
        const prev4 = rw(i-4);
        if (prev4 !== 0xFFFF && prev4 !== 0xFF) {
          console.log(`  ROM 0x${ctxAddr.toString(16)}: ${ctx} (abs.W)`);
        }
      }
    }
  }
}

// 关键 RAM 地址
searchRAMRef(0xFFFFA5AE, '动画激活标志 (0xCA50 BSR.W 0x9172 设置)');
searchRAMRef(0xFFFFA5F2, '动画状态缓冲 (0x14D5E 清零 32B)');
searchRAMRef(0xFFFFA4A6, '动画参数1 (0xCA9E 设置)');
searchRAMRef(0xFFFFA4A7, '动画参数2 (0xCA9E 设置)');

// 搜索 0xFFFF95A2 (场景参数指针, 在 0xC93A 设置为 0x0005DF40)
searchRAMRef(0xFFFF95A2, '场景参数指针 (0xC93A 设置)');

console.log('\n=== 检查 ROM 0x0005DF40 处的场景参数数据 ===');
// 场景参数指针指向 ROM 0x05DF40
console.log('ROM 0x05DF40 处数据 (前 128B):');
for (let i = 0; i < 128; i += 16) {
  let hex = '';
  let ascii = '';
  for (let j = 0; j < 16; j++) {
    const b = rb(0x05DF40 + i + j);
    hex += b.toString(16).padStart(2, '0') + ' ';
    ascii += (b >= 0x20 && b < 0x7F) ? String.fromCharCode(b) : '.';
  }
  console.log(`  0x${(0x05DF40 + i).toString(16)}: ${hex} ${ascii}`);
}

// 0x14D5E 中提到 LEA 0xFFFFAE4C, A0 - 这个地址存储动画相关数据
console.log('\n=== 0x14D5E 中的 0xFFFFAE4C 引用 ===');
searchRAMRef(0xFFFFAE4C, '动画状态指针 (0x14D5E 设置)');

// 检查 0x14D5E 之后的代码, 可能有动画帧序列
console.log('\n=== 反汇编 0x14D90 (0x14D5E 之后的函数) ===');
function disasmSimple(addr, length, label = '') {
  if (label) console.log(`\n--- ${label} ---`);
  let pc = addr;
  while (pc < addr + length) {
    const w = rw(pc);
    let line = `0x${pc.toString(16).padStart(6, '0')}: `;
    let size = 2;
    let mnemonic = '';
    
    if (w === 0x4E75) { mnemonic = 'RTS'; }
    else if (w === 0x4EF9) { mnemonic = `JMP 0x${rl(pc+2).toString(16)}`; size = 6; }
    else if (w === 0x4EB9) { mnemonic = `JSR 0x${rl(pc+2).toString(16)}`; size = 6; }
    else if (w === 0x4EBA) { const o = rw(pc+2); const t = pc + 2 + (o > 0x7FFF ? o - 0x10000 : o); mnemonic = `JSR (PC,d16) → 0x${t.toString(16)}`; size = 4; }
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
    else if ((w & 0xF1F8) === 0x0C40) { const r=(w>>9)&7; mnemonic = `CMPI.W #0x${rw(pc+2).toString(16)}, D${r}`; size = 4; }
    else if ((w & 0xF1F8) === 0x0C00) { const r=(w>>9)&7; mnemonic = `CMPI.B #0x${rw(pc+2).toString(16)}, D${r}`; size = 4; }
    else if (w === 0x31FC) { mnemonic = `MOVE.W #0x${rw(pc+2).toString(16)}, (0x${rl(pc+4).toString(16)}).L`; size = 8; }
    else if (w === 0x23FC) { mnemonic = `MOVE.L #0x${rl(pc+2).toString(16)}, (0x${rl(pc+6).toString(16)}).L`; size = 10; }
    else if (w === 0x11FC) { mnemonic = `MOVE.B #0x${rw(pc+2).toString(16)}, (0x${rl(pc+4).toString(16)}).L`; size = 8; }
    else if ((w & 0xF1F0) === 0x303C) { const r=(w>>9)&7; mnemonic = `MOVE.W #0x${rw(pc+2).toString(16)}, D${r}`; size = 4; }
    else if ((w & 0xF1F8) === 0x3039) { const r=(w>>9)&7; mnemonic = `MOVE.W (0x${rl(pc+2).toString(16)}).L, D${r}`; size = 6; }
    else if ((w & 0xF1F8) === 0x1039) { const r=(w>>9)&7; mnemonic = `MOVE.B (0x${rl(pc+2).toString(16)}).L, D${r}`; size = 6; }
    else if ((w & 0xF1F8) === 0x2039) { const r=(w>>9)&7; mnemonic = `MOVE.L (0x${rl(pc+2).toString(16)}).L, D${r}`; size = 6; }
    else if ((w & 0xF1F8) === 0x3139) { const r=(w>>9)&7; mnemonic = `MOVE.W D${r}, (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if ((w & 0xF1F8) === 0x1139) { const r=(w>>9)&7; mnemonic = `MOVE.B D${r}, (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if ((w & 0xF1FF) === 0x41F9) { const r=(w>>9)&7; mnemonic = `LEA 0x${rl(pc+2).toString(16)}, A${r}`; size = 6; }
    else if ((w & 0xF1FF) === 0x41F8) { const r=(w>>9)&7; mnemonic = `LEA (0x${rw(pc+2).toString(16).padStart(4,'0')}).W, A${r}`; size = 4; }
    else if ((w & 0xF1F8) === 0x2079) { const r=(w>>9)&7; mnemonic = `MOVEA.L (0x${rl(pc+2).toString(16)}).L, A${r}`; size = 6; }
    else if ((w & 0xF1F8) === 0x2279) { const r=(w>>9)&7; mnemonic = `MOVEA.L (0x${rl(pc+2).toString(16)}).L, A${r}`; size = 6; }
    else if (w === 0x4279) { mnemonic = `CLR.W (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if (w === 0x4239) { mnemonic = `CLR.B (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if (w === 0x42B9) { mnemonic = `CLR.L (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if (w === 0x4A79) { mnemonic = `TST.W (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if (w === 0x4A39) { mnemonic = `TST.B (0x${rl(pc+2).toString(16)}).L`; size = 6; }
    else if (w === 0x0C39) { mnemonic = `CMPI.B #0x${rw(pc+2).toString(16)}, (0x${rl(pc+4).toString(16)}).L`; size = 8; }
    else if (w === 0x0C79) { mnemonic = `CMPI.W #0x${rw(pc+2).toString(16)}, (0x${rl(pc+4).toString(16)}).L`; size = 8; }
    else if (w === 0x48E7) { mnemonic = `MOVEM.L regs, -(A7) [0x${rw(pc+2).toString(16)}]`; size = 4; }
    else if (w === 0x4CDF) { mnemonic = `MOVEM.L (A7)+, regs [0x${rw(pc+2).toString(16)}]`; size = 4; }
    else if ((w & 0xF1F8) === 0x51C8) { const r=w&7; const o=rw(pc+2); const t = pc + 2 + (o > 0x7FFF ? o - 0x10000 : o); mnemonic = `DBRA D${r}, 0x${t.toString(16)}`; size = 4; }
    else if ((w & 0xF1F8) === 0x5340) { const r=(w>>9)&7; mnemonic = `SUBQ.W #1, D${r}`; }
    else if ((w & 0xF1F8) === 0x5140) { const r=(w>>9)&7; mnemonic = `ADDQ.W #1, D${r}`; }
    else if ((w & 0xF1C0) === 0xD0C0) { const r=(w>>9)&7; const s=w&0x3F; mnemonic = `ADD.W D${s&7}, D${r}`; }
    else if ((w & 0xF1C0) === 0x3000) { const r=(w>>9)&7; const s=w&7; mnemonic = `MOVE.W D${s}, D${r}`; }
    else if ((w & 0xF1C0) === 0x3028) { const r=(w>>9)&7; const a=w&7; const disp = rw(pc+2); const sd = disp > 0x7FFF ? disp - 0x10000 : disp; mnemonic = `MOVE.W ${sd>=0?'+':''}${sd}(A${a}), D${r}`; size = 4; }
    else if ((w & 0xF1C0) === 0x3128) { const r=(w>>9)&7; const a=w&7; const disp = rw(pc+2); const sd = disp > 0x7FFF ? disp - 0x10000 : disp; mnemonic = `MOVE.W D${r}, ${sd>=0?'+':''}${sd}(A${a})`; size = 4; }
    else if ((w & 0xF1C0) === 0x3010) { const r=(w>>9)&7; const a=w&7; mnemonic = `MOVE.W (A${a}), D${r}`; }
    else if ((w & 0xF1C0) === 0x3110) { const r=(w>>9)&7; const a=w&7; mnemonic = `MOVE.W D${r}, (A${a})`; }
    else if (w === 0x4E71) { mnemonic = 'NOP'; }
    else { mnemonic = `.word 0x${w.toString(16).padStart(4,'0')}`; }
    
    console.log(`  ${line}${mnemonic}`);
    pc += size;
  }
}

disasmSimple(0x14D90, 192, '0x14D90');
