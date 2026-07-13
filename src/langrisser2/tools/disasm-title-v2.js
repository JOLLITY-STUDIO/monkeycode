/**
 * 修正的 68K 反汇编器
 * 分析标题画面任务链
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url).replace(/^\//, ''));
const root = path.resolve(__dirname, '..');

const romPath = path.resolve(root, '20260713/Langrisser II (Japan)_68K-gens-rom-dump.bin');
const romData = new Uint8Array(fs.readFileSync(romPath));

function r8(off) { return romData[off] & 0xff; }
function r16(off) { return ((romData[off] & 0xff) << 8) | (romData[off + 1] & 0xff); }
function r32(off) {
  return (
    ((romData[off] & 0xff) << 24) |
    ((romData[off + 1] & 0xff) << 16) |
    ((romData[off + 2] & 0xff) << 8) |
    (romData[off + 3] & 0xff)
  );
}

function signExt16(v) { return v > 0x7fff ? v - 0x10000 : v; }
function signExt8(v) { return v > 0x7f ? v - 0x100 : v; }

const START = 0xC92C;
const END = 0xCE00;

console.log('=== FUN_0000c92c - FUN_0000ce00 反汇编 ===\n');

const functionStarts = new Set();
functionStarts.add(START);

// 第一遍: 找出所有函数入口
let pc = START;
while (pc < END) {
  const op = r16(pc);

  // JSR (abs).L
  if (op === 0x4EB9) {
    const target = r32(pc + 2);
    if (target >= START && target < END) {
      functionStarts.add(target);
    }
    pc += 6;
    continue;
  }
  // BSR.W
  if (op === 0x6100) {
    const offset = signExt16(r16(pc + 2));
    const target = pc + 2 + offset;
    if (target >= START && target < END) {
      functionStarts.add(target);
    }
    pc += 4;
    continue;
  }
  // BSR.S
  if ((op & 0xFF00) === 0x6100 && (op & 0x00FF) !== 0) {
    const offset = signExt8(op & 0xFF);
    const target = pc + 2 + offset;
    if (target >= START && target < END) {
      functionStarts.add(target);
    }
    pc += 2;
    continue;
  }

  pc += 2;
}

console.log(`找到 ${functionStarts.size} 个函数入口:`);
const sortedFuncs = Array.from(functionStarts).sort((a, b) => a - b);
for (const f of sortedFuncs) {
  console.log(`  FUN_0x${f.toString(16).padStart(8, '0')}`);
}
console.log('');

// 第二遍: 反汇编
pc = START;
let currentFunc = START;

while (pc < END) {
  if (functionStarts.has(pc)) {
    currentFunc = pc;
    console.log(`\n─── FUN_0x${pc.toString(16).padStart(8, '0')} ───`);
  }

  const op = r16(pc);
  const opHex = op.toString(16).padStart(4, '0').toUpperCase();
  const pcHex = pc.toString(16).padStart(6, '0');

  let disasm = '';
  let size = 2;

  // ===== 控制流 =====
  if (op === 0x4E75) { disasm = 'RTS'; size = 2; }
  else if (op === 0x4E73) { disasm = 'RTE'; size = 2; }
  else if (op === 0x4E71) { disasm = 'NOP'; size = 2; }
  else if (op === 0x4EB9) {
    const t = r32(pc + 2);
    disasm = `JSR FUN_0x${t.toString(16).padStart(8, '0')}`;
    size = 6;
  }
  else if (op === 0x4EF9) {
    const t = r32(pc + 2);
    disasm = `JMP 0x${t.toString(16).padStart(8, '0')}`;
    size = 6;
  }
  else if (op === 0x6100) {
    const off = signExt16(r16(pc + 2));
    const t = pc + 2 + off;
    disasm = `BSR.W FUN_0x${t.toString(16).padStart(8, '0')}`;
    size = 4;
  }
  else if ((op & 0xFF00) === 0x6100) {
    const off = signExt8(op & 0xFF);
    const t = pc + 2 + off;
    disasm = `BSR.S FUN_0x${t.toString(16).padStart(8, '0')}`;
    size = 2;
  }

  // ===== 分支 =====
  else if ((op & 0xFF00) === 0x6000 && (op & 0xFF) !== 0) {
    const off = signExt8(op & 0xFF);
    const t = pc + 2 + off;
    disasm = `BRA.S 0x${t.toString(16).padStart(6, '0')}`;
    size = 2;
  }
  else if (op === 0x6000) {
    const off = signExt16(r16(pc + 2));
    const t = pc + 2 + off;
    disasm = `BRA.W 0x${t.toString(16).padStart(6, '0')}`;
    size = 4;
  }
  else if ((op & 0xFF00) === 0x6600 && (op & 0xFF) !== 0) {
    const off = signExt8(op & 0xFF);
    const t = pc + 2 + off;
    disasm = `BNE.S 0x${t.toString(16).padStart(6, '0')}`;
    size = 2;
  }
  else if (op === 0x6600) {
    const off = signExt16(r16(pc + 2));
    const t = pc + 2 + off;
    disasm = `BNE.W 0x${t.toString(16).padStart(6, '0')}`;
    size = 4;
  }
  else if ((op & 0xFF00) === 0x6700 && (op & 0xFF) !== 0) {
    const off = signExt8(op & 0xFF);
    const t = pc + 2 + off;
    disasm = `BEQ.S 0x${t.toString(16).padStart(6, '0')}`;
    size = 2;
  }
  else if (op === 0x6700) {
    const off = signExt16(r16(pc + 2));
    const t = pc + 2 + off;
    disasm = `BEQ.W 0x${t.toString(16).padStart(6, '0')}`;
    size = 4;
  }
  else if ((op & 0xFF00) === 0x6E00 && (op & 0xFF) !== 0) {
    const off = signExt8(op & 0xFF);
    const t = pc + 2 + off;
    disasm = `BGT.S 0x${t.toString(16).padStart(6, '0')}`;
    size = 2;
  }
  else if ((op & 0xFF00) === 0x6D00 && (op & 0xFF) !== 0) {
    const off = signExt8(op & 0xFF);
    const t = pc + 2 + off;
    disasm = `BLE.S 0x${t.toString(16).padStart(6, '0')}`;
    size = 2;
  }
  else if ((op & 0xFF00) === 0x6200 && (op & 0xFF) !== 0) {
    const off = signExt8(op & 0xFF);
    const t = pc + 2 + off;
    disasm = `BHI.S 0x${t.toString(16).padStart(6, '0')}`;
    size = 2;
  }
  else if ((op & 0xFF00) === 0x6300 && (op & 0xFF) !== 0) {
    const off = signExt8(op & 0xFF);
    const t = pc + 2 + off;
    disasm = `BLS.S 0x${t.toString(16).padStart(6, '0')}`;
    size = 2;
  }
  else if ((op & 0xFF00) === 0x6400 && (op & 0xFF) !== 0) {
    const off = signExt8(op & 0xFF);
    const t = pc + 2 + off;
    disasm = `BCC.S 0x${t.toString(16).padStart(6, '0')}`;
    size = 2;
  }
  else if ((op & 0xFF00) === 0x6500 && (op & 0xFF) !== 0) {
    const off = signExt8(op & 0xFF);
    const t = pc + 2 + off;
    disasm = `BCS.S 0x${t.toString(16).padStart(6, '0')}`;
    size = 2;
  }

  // ===== MOVE 立即数 =====
  else if ((op & 0xF1FF) === 0x303C) {
    const reg = (op >> 9) & 7;
    const imm = r16(pc + 2);
    disasm = `MOVE.W #0x${imm.toString(16).padStart(4, '0')}, D${reg}`;
    size = 4;
  }
  else if ((op & 0xF1FF) === 0x203C) {
    const reg = (op >> 9) & 7;
    const imm = r32(pc + 2);
    disasm = `MOVE.L #0x${imm.toString(16).padStart(8, '0')}, D${reg}`;
    size = 6;
  }
  else if ((op & 0xF1C0) === 0x7000) {
    const reg = (op >> 9) & 7;
    const imm = op & 0xFF;
    const s = imm > 127 ? imm - 256 : imm;
    disasm = `MOVEQ #${s}, D${reg}`;
    size = 2;
  }

  // MOVE.L #imm, (abs).L = 0x23FC
  else if (op === 0x23FC) {
    const imm = r32(pc + 2);
    const dest = r32(pc + 6);
    disasm = `MOVE.L #0x${imm.toString(16).padStart(8, '0')}, (0x${dest.toString(16).padStart(8, '0')}).L`;
    if (dest === 0xFFFF8004) disasm += '  ★任务切换';
    size = 10;
  }
  // MOVE.W #imm, (abs).L = 0x33FC
  else if (op === 0x33FC) {
    const imm = r16(pc + 2);
    const dest = r32(pc + 4);
    disasm = `MOVE.W #0x${imm.toString(16).padStart(4, '0')}, (0x${dest.toString(16).padStart(8, '0')}).L`;
    size = 8;
  }
  // MOVE.B #imm, (abs).L = 0x13FC
  else if (op === 0x13FC) {
    const imm = r8(pc + 2);
    const dest = r32(pc + 3);
    disasm = `MOVE.B #0x${imm.toString(16).padStart(2, '0')}, (0x${dest.toString(16).padStart(8, '0')}).L`;
    size = 7;
  }

  // MOVE.L #imm, (d16, An) = 0x21FC + reg
  else if ((op & 0xF1FF) === 0x20FC && (op & 0x0E00) !== 0) {
    const areg = (op >> 9) & 7;
    const imm = r32(pc + 2);
    const d16 = signExt16(r16(pc + 6));
    disasm = `MOVE.L #0x${imm.toString(16).padStart(8, '0')}, (0x${(d16 & 0xffff).toString(16).padStart(4, '0')}, A${areg})`;
    size = 8;
  }
  // MOVE.W #imm, (d16, An) = 0x31FC + reg
  else if ((op & 0xF1FF) === 0x30FC && (op & 0x0E00) !== 0) {
    const areg = (op >> 9) & 7;
    const imm = r16(pc + 2);
    const d16 = signExt16(r16(pc + 4));
    disasm = `MOVE.W #0x${imm.toString(16).padStart(4, '0')}, (0x${(d16 & 0xffff).toString(16).padStart(4, '0')}, A${areg})`;
    size = 6;
  }
  // MOVE.B #imm, (d16, An) = 0x11FC + reg
  else if ((op & 0xF1FF) === 0x10FC && (op & 0x0E00) !== 0) {
    const areg = (op >> 9) & 7;
    const imm = r8(pc + 2);
    const d16 = signExt16(r16(pc + 3));
    disasm = `MOVE.B #0x${imm.toString(16).padStart(2, '0')}, (0x${(d16 & 0xffff).toString(16).padStart(4, '0')}, A${areg})`;
    size = 5;
  }

  // ===== LEA =====
  else if ((op & 0xF1FF) === 0x41F9) {
    const reg = (op >> 9) & 7;
    const addr = r32(pc + 2);
    disasm = `LEA (0x${addr.toString(16).padStart(8, '0')}).L, A${reg}`;
    size = 6;
  }

  // ===== MOVEM =====
  else if (op === 0x48E7) {
    const mask = r16(pc + 2);
    const regs = [];
    for (let i = 0; i < 8; i++) if (mask & (1 << i)) regs.push(`D${i}`);
    for (let i = 0; i < 8; i++) if (mask & (1 << (i + 8))) regs.push(`A${i}`);
    disasm = `MOVEM.L ${regs.join('/')}, -(A7)`;
    size = 4;
  }
  else if (op === 0x4CDF) {
    const mask = r16(pc + 2);
    const regs = [];
    for (let i = 0; i < 8; i++) if (mask & (1 << i)) regs.push(`D${i}`);
    for (let i = 0; i < 8; i++) if (mask & (1 << (i + 8))) regs.push(`A${i}`);
    disasm = `MOVEM.L (A7)+, ${regs.join('/')}`;
    size = 4;
  }

  // ===== CLR =====
  else if (op === 0x4279) {
    const addr = r32(pc + 2);
    disasm = `CLR.W (0x${addr.toString(16).padStart(8, '0')}).L`;
    size = 6;
  }
  else if (op === 0x4239) {
    const addr = r32(pc + 2);
    disasm = `CLR.B (0x${addr.toString(16).padStart(8, '0')}).L`;
    size = 6;
  }
  else if (op === 0x4278) {
    const addr = r16(pc + 2);
    const saddr = signExt16(addr);
    disasm = `CLR.W (0x${(saddr >>> 0).toString(16).padStart(8, '0')}).W`;
    size = 4;
  }
  else if (op === 0x4238) {
    const addr = r16(pc + 2);
    const saddr = signExt16(addr);
    disasm = `CLR.B (0x${(saddr >>> 0).toString(16).padStart(8, '0')}).W`;
    size = 4;
  }
  // CLR.L
  else if (op === 0x42B9) {
    const addr = r32(pc + 2);
    disasm = `CLR.L (0x${addr.toString(16).padStart(8, '0')}).L`;
    size = 6;
  }

  // ===== TST =====
  else if ((op & 0xF1C0) === 0x4A00) {
    const reg = (op >> 9) & 7;
    disasm = `TST.W D${reg}`;
    size = 2;
  }
  else if (op === 0x4A79) {
    const addr = r32(pc + 2);
    disasm = `TST.B (0x${addr.toString(16).padStart(8, '0')}).L`;
    size = 6;
  }

  // ===== CMPI =====
  else if (op === 0x0C79) {
    const imm = r16(pc + 2);
    const addr = r32(pc + 4);
    disasm = `CMPI.B #0x${imm.toString(16).padStart(2, '0')}, (0x${addr.toString(16).padStart(8, '0')}).L`;
    size = 8;
  }

  // ===== 默认 =====
  else {
    disasm = `dc.w 0x${opHex}`;
    size = 2;
  }

  // 输出
  let hexStr = '';
  for (let i = 0; i < size; i++) {
    hexStr += r8(pc + i).toString(16).padStart(2, '0').toUpperCase() + ' ';
  }
  hexStr = hexStr.padEnd(28, ' ');

  console.log(`${pcHex}: ${hexStr} ${disasm}`);

  pc += size;
}

console.log('\n=== 反汇编完成 ===');
