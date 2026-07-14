/**
 * 关键发现: 0x1592c 处的循环代码:
 *   MOVEA.L (0xFFFFAA28).L, A0   ← 重新读取脚本指针
 *   ADDA.L (0xFFFFAA2C).L, A0    ← 加上偏移量!
 *   BRA.W 0x15804                ← 跳回循环
 *
 * 这意味着 0xFFFFAA2C 是"下一条命令的偏移量"
 * 每个命令处理器需要设置 0xFFFFAA2C 来控制 A0 前进多少
 *
 * 本脚本:
 * 1. 搜索所有写入 0xFFFFAA2C 的位置
 * 2. 重新反汇编 16 个命令处理器,关注 0xFFFFAA2C 的写入
 * 3. 用正确的偏移量重新解析脚本数据
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
// 1. 搜索所有写入 0xFFFFAA2C 的指令
// ============================================================
console.log('=== 1. 搜索所有写入 0xFFFFAA2C ===\n');

// MOVE.W #imm, (0xFFFFAA2C).L = 0x31FC imm 0xFFFF 0xAA2C (8 字节)
console.log('搜索 MOVE.W #imm, (0xFFFFAA2C).L (0x31FC ...):');
for (let i = 0; i < rom.length - 8; i++) {
  if (rw(i) === 0x31FC && rl(i + 4) === 0xFFFFAA2C) {
    const imm = rw(i + 2);
    console.log(`  ROM 0x${i.toString(16)}: MOVE.W #0x${imm.toString(16)}, (0xFFFFAA2C).L`);
  }
}

// MOVE.W Dn, (0xFFFFAA2C).L = 0x31C0|reg 0xFFFF 0xAA2C (6 字节)
// 实际编码: 0x31C0 + (reg<<9), 但 0x31F8 + reg 是 Dn → (xxx).L
// 让我用正确的模式: (w & 0xF1F8) === 0x3139 是 Dn → (xxx).L
console.log('\n搜索 MOVE.W Dn, (0xFFFFAA2C).L:');
for (let i = 0; i < rom.length - 6; i++) {
  const w = rw(i);
  if ((w & 0xF1F8) === 0x3139 && rl(i + 2) === 0xFFFFAA2C) {
    const reg = (w >> 9) & 7;
    console.log(`  ROM 0x${i.toString(16)}: MOVE.W D${reg}, (0xFFFFAA2C).L`);
  }
}

// MOVE.L #imm, (0xFFFFAA2C).L = 0x23FC imm(4B) 0xFFFF 0xAA2C (10 字节)
console.log('\n搜索 MOVE.L #imm, (0xFFFFAA2C).L:');
for (let i = 0; i < rom.length - 10; i++) {
  if (rw(i) === 0x23FC && rl(i + 6) === 0xFFFFAA2C) {
    const imm = rl(i + 2);
    console.log(`  ROM 0x${i.toString(16)}: MOVE.L #0x${imm.toString(16)}, (0xFFFFAA2C).L`);
  }
}

// CLR.W (0xFFFFAA2C).L = 0x4279 0xFFFF 0xAA2C (6 字节)
console.log('\n搜索 CLR.W (0xFFFFAA2C).L:');
for (let i = 0; i < rom.length - 6; i++) {
  if (rw(i) === 0x4279 && rl(i + 2) === 0xFFFFAA2C) {
    console.log(`  ROM 0x${i.toString(16)}: CLR.W (0xFFFFAA2C).L`);
  }
}

// SUBQ.W #n, (0xFFFFAA2C).L = 0x5379 0xFFFF 0xAA2C (6 字节)
console.log('\n搜索 SUBQ/ADDQ.W (0xFFFFAA2C).L:');
for (let i = 0; i < rom.length - 6; i++) {
  const w = rw(i);
  if ((w & 0xF1F8) === 0x5379 && rl(i + 2) === 0xFFFFAA2C) {
    const q = (w >> 9) & 7;
    console.log(`  ROM 0x${i.toString(16)}: SUBQ.W #${q}, (0xFFFFAA2C).L`);
  }
  if ((w & 0xF1F8) === 0x5179 && rl(i + 2) === 0xFFFFAA2C) {
    const q = (w >> 9) & 7;
    console.log(`  ROM 0x${i.toString(16)}: ADDQ.W #${q}, (0xFFFFAA2C).L`);
  }
}

// ============================================================
// 2. 重新反汇编跳转表 0x15838 的所有 16 个命令处理器
//    关注 0xFFFFAA2C 的写入
// ============================================================
console.log('\n=== 2. 重新解析跳转表 0x15838 ===\n');

const jumpTable = 0x15838;
const targets = [];
for (let i = 0; i < 16; i++) {
  const addr = jumpTable + i * 4;
  const w = rw(addr);
  if (w === 0x6000) {
    const offset = signExtend16(rw(addr + 2));
    const target = addr + 2 + offset;
    targets.push(target);
    console.log(`  cmd ${i}: BRA.W 0x${target.toString(16)}`);
  } else {
    console.log(`  cmd ${i}: .word 0x${w.toString(16)} (非跳转)`);
    targets.push(null);
  }
}

// ============================================================
// 3. 简单反汇编每个命令处理器,搜索 0xFFFFAA2C 引用
// ============================================================
console.log('\n=== 3. 每个命令处理器中的 0xFFFFAA2C 引用 ===\n');

function disasmAndFindRefs(startAddr, maxLen, cmdIdx) {
  let pc = startAddr;
  const end = startAddr + maxLen;
  const refs = [];
  
  while (pc < end) {
    const w = rw(pc);
    let size = 2;
    let mn = '';
    let hasAA2C = false;
    
    // 检查所有可能涉及 0xFFFFAA2C 的指令
    // MOVE.W #imm, (xxx).L = 0x31FC
    if (w === 0x31FC) {
      const imm = rw(pc + 2);
      const dst = rl(pc + 4);
      mn = `MOVE.W #0x${imm.toString(16)}, (0x${dst.toString(16)}).L`;
      size = 8;
      if (dst === 0xFFFFAA2C) hasAA2C = true;
    }
    // MOVE.W Dn, (xxx).L
    else if ((w & 0xF1F8) === 0x3139) {
      const reg = (w >> 9) & 7;
      const dst = rl(pc + 2);
      mn = `MOVE.W D${reg}, (0x${dst.toString(16)}).L`;
      size = 6;
      if (dst === 0xFFFFAA2C) hasAA2C = true;
    }
    // CLR.W (xxx).L
    else if (w === 0x4279) {
      const dst = rl(pc + 2);
      mn = `CLR.W (0x${dst.toString(16)}).L`;
      size = 6;
      if (dst === 0xFFFFAA2C) hasAA2C = true;
    }
    // MOVEA.L (xxx).L, An
    else if ((w & 0xF1F8) === 0x2079) {
      const reg = (w >> 9) & 7;
      const src = rl(pc + 2);
      mn = `MOVEA.L (0x${src.toString(16)}).L, A${reg}`;
      size = 6;
    }
    // MOVE.L (xxx).L, Dn
    else if ((w & 0xF1F8) === 0x2039) {
      const reg = (w >> 9) & 7;
      const src = rl(pc + 2);
      mn = `MOVE.L (0x${src.toString(16)}).L, D${reg}`;
      size = 6;
    }
    // MOVE.L An, (xxx).L
    else if (w === 0x23C8 || w === 0x23C9 || w === 0x23CA || w === 0x23CB ||
             w === 0x23CC || w === 0x23CD || w === 0x23CE || w === 0x23CF) {
      const reg = w & 7;
      const dst = rl(pc + 2);
      mn = `MOVE.L A${reg}, (0x${dst.toString(16)}).L`;
      size = 6;
    }
    // MOVE.L #imm, (xxx).L = 0x23FC
    else if (w === 0x23FC) {
      const imm = rl(pc + 2);
      const dst = rl(pc + 6);
      mn = `MOVE.L #0x${imm.toString(16)}, (0x${dst.toString(16)}).L`;
      size = 10;
    }
    // MOVE.B (An)+, Dn
    else if ((w & 0xF1C0) === 0x1018) {
      const reg = (w >> 9) & 7;
      const an = w & 7;
      mn = `MOVE.B (A${an})+, D${reg}`;
    }
    // MOVE.B (An), Dn
    else if ((w & 0xF1C0) === 0x1010) {
      const reg = (w >> 9) & 7;
      const an = w & 7;
      mn = `MOVE.B (A${an}), D${reg}`;
    }
    // LEA d16(An), An
    else if ((w & 0xF1F8) === 0x41E8) {
      const reg = (w >> 9) & 7;
      const an = w & 7;
      const disp = signExtend16(rw(pc + 2));
      mn = `LEA ${disp >= 0 ? '+' : ''}${disp}(A${an}), A${reg}`;
      size = 4;
    }
    // LEA (xxx).L, An
    else if ((w & 0xF1FF) === 0x41F9) {
      const reg = (w >> 9) & 7;
      const dst = rl(pc + 2);
      mn = `LEA 0x${dst.toString(16)}, A${reg}`;
      size = 6;
    }
    // BRA.W
    else if ((w & 0xFF00) === 0x6000) {
      const o = signExtend16(rw(pc + 2));
      mn = `BRA.W 0x${(pc + 2 + o).toString(16)}`;
      size = 4;
    }
    // BRA.S
    else if ((w & 0xF000) === 0x6000 && (w & 0xFF) !== 0) {
      const o = (w & 0xFF) > 127 ? (w & 0xFF) - 256 : (w & 0xFF);
      mn = `BRA.S 0x${(pc + 2 + o).toString(16)}`;
    }
    // BSR.W
    else if ((w & 0xFF00) === 0x6100) {
      const o = signExtend16(rw(pc + 2));
      mn = `BSR.W 0x${(pc + 2 + o).toString(16)}`;
      size = 4;
    }
    // JSR (xxx).L
    else if (w === 0x4EB9) {
      mn = `JSR 0x${rl(pc + 2).toString(16)}`;
      size = 6;
    }
    // RTS
    else if (w === 0x4E75) {
      mn = 'RTS';
    }
    // JMP (xxx).L
    else if (w === 0x4EF9) {
      mn = `JMP 0x${rl(pc + 2).toString(16)}`;
      size = 6;
    }
    // MOVEQ #imm, Dn
    else if ((w & 0xF100) === 0x7000) {
      const reg = (w >> 9) & 7;
      const v = w & 0xFF;
      mn = `MOVEQ #0x${v.toString(16)}, D${reg}`;
    }
    // ADD.W Dn, Dn
    else if ((w & 0xF1C0) === 0xD040) {
      const reg = (w >> 9) & 7;
      const s = w & 7;
      mn = `ADD.W D${s}, D${reg}`;
    }
    // BTST #n, Dn
    else if ((w & 0xF1F8) === 0x0800) {
      const reg = (w >> 9) & 7;
      const bit = rw(pc + 2);
      mn = `BTST #${bit}, D${reg}`;
      size = 4;
    }
    // BNE.W
    else if ((w & 0xFF00) === 0x6600) {
      const o = signExtend16(rw(pc + 2));
      mn = `BNE.W 0x${(pc + 2 + o).toString(16)}`;
      size = 4;
    }
    // BEQ.W
    else if ((w & 0xFF00) === 0x6700) {
      const o = signExtend16(rw(pc + 2));
      mn = `BEQ.W 0x${(pc + 2 + o).toString(16)}`;
      size = 4;
    }
    else {
      mn = `.word 0x${w.toString(16)}`;
    }
    
    const marker = hasAA2C ? ' ★ 0xFFFFAA2C' : '';
    console.log(`    0x${pc.toString(16)}: ${mn}${marker}`);
    if (hasAA2C) refs.push({ addr: pc, mn });
    
    // 遇到 BRA.W/RTS/JMP 就结束(命令处理器边界)
    if (w === 0x4E75 || w === 0x4EF9 || (w & 0xFF00) === 0x6000) break;
    
    pc += size;
  }
  
  return refs;
}

for (let i = 0; i < 16; i++) {
  if (!targets[i]) continue;
  console.log(`\n--- cmd ${i} (0x${targets[i].toString(16)}) ---`);
  const refs = disasmAndFindRefs(targets[i], 64, i);
  if (refs.length === 0) {
    console.log(`  (无 0xFFFFAA2C 写入)`);
  }
}

// ============================================================
// 4. 用正确的偏移量重新解析脚本
// ============================================================
console.log('\n=== 4. 重新解析脚本数据 ===\n');

// 根据上面的分析,每个命令的 0xFFFFAA2C 值:
// cmd 0: MOVE.W #0x4, (0xFFFFAA2C).L → 偏移 4
// cmd 1: MOVE.W #0x2, (0xFFFFAA2C).L → 偏移 2
// cmd 2: MOVE.W #0x8, (0xFFFFAA2C).L → 偏移 8
// cmd 3: MOVE.W #0x2, (0xFFFFAA2C).L → 偏移 2
// cmd 11: MOVE.W #0x4, (0xFFFFAA2C).L → 偏移 4
// cmd 12: MOVE.W #0x4, (0xFFFFAA2C).L → 偏移 4
// cmd 13: MOVE.W #0x4, (0xFFFFAA2C).L → 偏移 4
// cmd 14: MOVE.W #0x2, (0xFFFFAA2C).L → 偏移 2
// 其他: 未知,需要分析

console.log('脚本数据 (0x18D60A, 前 256B):');
for (let i = 0; i < 256; i += 16) {
  const addr = 0x18D60A + i;
  let hex = '';
  for (let j = 0; j < 16; j++) {
    hex += rb(addr + j).toString(16).padStart(2, '0') + ' ';
  }
  console.log(`  0x${addr.toString(16)}: ${hex}`);
}

// 检查 0xFFFFAA2C 的初始值
// case bit7 设置 0xFFFFAA28 但没有设置 0xFFFFAA2C
// 0xFFFFAA2C 可能在其他地方初始化

// 搜索 CLR.W (0xFFFFAA2C).L 或 MOVE.W #0, (0xFFFFAA2C).L
console.log('\n搜索 0xFFFFAA2C 初始化 (CLR 或 MOVE #0):');
for (let i = 0; i < rom.length - 8; i++) {
  const w = rw(i);
  if (w === 0x4279 && rl(i + 2) === 0xFFFFAA2C) {
    console.log(`  ROM 0x${i.toString(16)}: CLR.W (0xFFFFAA2C).L`);
  }
  if (w === 0x31FC && rw(i + 2) === 0 && rl(i + 4) === 0xFFFFAA2C) {
    console.log(`  ROM 0x${i.toString(16)}: MOVE.W #0, (0xFFFFAA2C).L`);
  }
}

// ============================================================
// 5. 检查 cmd 15 的处理 (BRA.W 0x1592c)
// ============================================================
console.log('\n=== 5. 检查 cmd 15 (BRA.W 0x1592c) ===\n');

// cmd 15 直接跳到 0x1592c,不写 0xFFFFAA2C
// 这意味着它使用上次的 0xFFFFAA2C 值
// 如果第一个命令是 cmd 15,0xFFFFAA2C 可能是未初始化的

// 但是,case bit7 在跳转到字节码解释器之前,可能设置了 0xFFFFAA2C
// 让我检查 case bit7 和字节码解释器入口之间的代码

console.log('字节码解释器入口 0x157F6-0x15840:');
let pc2 = 0x157F6;
while (pc2 < 0x15840) {
  const w = rw(pc2);
  let size = 2;
  let mn = '';
  
  if (w === 0x4EB9) { mn = `JSR 0x${rl(pc2 + 2).toString(16)}`; size = 6; }
  else if ((w & 0xF1F8) === 0x2079) {
    const reg = (w >> 9) & 7;
    const src = rl(pc2 + 2);
    mn = `MOVEA.L (0x${src.toString(16)}).L, A${reg}`;
    size = 6;
  }
  else if (w === 0x31FC) {
    const imm = rw(pc2 + 2);
    const dst = rl(pc2 + 4);
    mn = `MOVE.W #0x${imm.toString(16)}, (0x${dst.toString(16)}).L`;
    size = 8;
    if (dst === 0xFFFFAA2C) mn += ' ★';
  }
  else if ((w & 0xF1F8) === 0x3139) {
    const reg = (w >> 9) & 7;
    const dst = rl(pc2 + 2);
    mn = `MOVE.W D${reg}, (0x${dst.toString(16)}).L`;
    size = 6;
    if (dst === 0xFFFFAA2C) mn += ' ★';
  }
  else if (w === 0x23C8 || (w & 0xFFF8) === 0x23C8) {
    const reg = w & 7;
    const dst = rl(pc2 + 2);
    mn = `MOVE.L A${reg}, (0x${dst.toString(16)}).L`;
    size = 6;
  }
  else if ((w & 0xF100) === 0x7000) {
    const reg = (w >> 9) & 7;
    const v = w & 0xFF;
    mn = `MOVEQ #0x${v.toString(16)}, D${reg}`;
  }
  else if ((w & 0xF1C0) === 0x1018) {
    const reg = (w >> 9) & 7;
    const an = w & 7;
    mn = `MOVE.B (A${an})+, D${reg}`;
  }
  else if ((w & 0xF1F0) === 0x0C40) {
    const reg = (w >> 9) & 7;
    mn = `CMPI.W #0x${rw(pc2 + 2).toString(16)}, D${reg}`;
    size = 4;
  }
  else if ((w & 0xFF00) === 0x6700) {
    const o = signExtend16(rw(pc2 + 2));
    mn = `BEQ.W 0x${(pc2 + 2 + o).toString(16)}`;
    size = 4;
  }
  else if ((w & 0xF1C0) === 0xD040) {
    const reg = (w >> 9) & 7;
    const s = w & 7;
    mn = `ADD.W D${s}, D${reg}`;
  }
  else if (w === 0x4EFB) {
    mn = `JMP 0x${(pc2 + 2 + signExtend16(rw(pc2 + 2))).toString(16)}(PC,d16)`; 
    size = 4;
  }
  // JMP (PC, D0.W) = 0x4EFB 0x0000... 实际是 0x4EFB 0x0000
  // 但实际编码可能是 0x4EFB 0x00...
  else if (w === 0x4EFB) {
    mn = `JMP (PC, ...)`; size = 4;
  }
  else { mn = `.word 0x${w.toString(16)}`; }
  
  console.log(`  0x${pc2.toString(16)}: ${mn}`);
  pc2 += size;
}

// ============================================================
// 6. 检查 0x15804 处的代码 (BRA.W 0x15804 的目标)
// ============================================================
console.log('\n=== 6. 0x15804 处代码 (循环入口) ===\n');
console.log('0x15804 附近的代码:');
let pc3 = 0x15804;
while (pc3 < 0x15840) {
  const w = rw(pc3);
  let size = 2;
  let mn = '';
  
  if ((w & 0xF1F8) === 0x2079) {
    const reg = (w >> 9) & 7;
    const src = rl(pc3 + 2);
    mn = `MOVEA.L (0x${src.toString(16)}).L, A${reg}`;
    size = 6;
  }
  else if (w === 0x31FC) {
    const imm = rw(pc3 + 2);
    const dst = rl(pc3 + 4);
    mn = `MOVE.W #0x${imm.toString(16)}, (0x${dst.toString(16)}).L`;
    size = 8;
  }
  else if ((w & 0xF1F8) === 0x3139) {
    const reg = (w >> 9) & 7;
    const dst = rl(pc3 + 2);
    mn = `MOVE.W D${reg}, (0x${dst.toString(16)}).L`;
    size = 6;
  }
  else if ((w & 0xF100) === 0x7000) {
    const reg = (w >> 9) & 7;
    const v = w & 0xFF;
    mn = `MOVEQ #0x${v.toString(16)}, D${reg}`;
  }
  else if ((w & 0xF1C0) === 0x1018) {
    const reg = (w >> 9) & 7;
    const an = w & 7;
    mn = `MOVE.B (A${an})+, D${reg}`;
  }
  else if ((w & 0xF1F0) === 0x0C40) {
    const reg = (w >> 9) & 7;
    mn = `CMPI.W #0x${rw(pc3 + 2).toString(16)}, D${reg}`;
    size = 4;
  }
  else if ((w & 0xFF00) === 0x6700) {
    const o = signExtend16(rw(pc3 + 2));
    mn = `BEQ.W 0x${(pc3 + 2 + o).toString(16)}`;
    size = 4;
  }
  else if ((w & 0xFF00) === 0x6000) {
    const o = signExtend16(rw(pc3 + 2));
    mn = `BRA.W 0x${(pc3 + 2 + o).toString(16)}`;
    size = 4;
  }
  else if ((w & 0xF1C0) === 0xD040) {
    const reg = (w >> 9) & 7;
    const s = w & 7;
    mn = `ADD.W D${s}, D${reg}`;
  }
  else if (w === 0x4EFB) {
    const ext = rw(pc3 + 2);
    mn = `JMP (PC, D${ext & 7}.W)`;
    size = 4;
  }
  else if (w === 0x4E75) mn = 'RTS';
  else { mn = `.word 0x${w.toString(16)}`; }
  
  console.log(`  0x${pc3.toString(16)}: ${mn}`);
  pc3 += size;
}
