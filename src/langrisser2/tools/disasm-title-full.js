/**
 * 从 FUN_0000c92c 开始的完整反汇编
 * 手动分析任务链结构
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url).replace(/^\//, ''));
const root = path.resolve(__dirname, '..');

const romPath = path.resolve(root, '20260713/Langrisser II (Japan)_68K-gens-rom-dump.bin');
const romData = new Uint8Array(fs.readFileSync(romPath));

function readByte(off) { return romData[off] & 0xff; }
function readWord(off) { return ((romData[off] & 0xff) << 8) | (romData[off + 1] & 0xff); }
function readLong(off) {
  return (
    ((romData[off] & 0xff) << 24) |
    ((romData[off + 1] & 0xff) << 16) |
    ((romData[off + 2] & 0xff) << 8) |
    (romData[off + 3] & 0xff)
  );
}

const START = 0xC92C;
const END = 0xCD00;

console.log('=== FUN_0000c92c - 0xCD00 反汇编 ===\n');

let pc = START;

while (pc < END) {
  const op = readWord(pc);
  const opHex = op.toString(16).padStart(4, '0').toUpperCase();
  const pcHex = pc.toString(16).padStart(6, '0');

  let disasm = '';
  let size = 2;

  // NOP
  if (op === 0x4E71) {
    disasm = 'NOP';
    size = 2;
  }
  // RTS
  else if (op === 0x4E75) {
    disasm = 'RTS';
    size = 2;
  }
  // RTE
  else if (op === 0x4E73) {
    disasm = 'RTE';
    size = 2;
  }
  // JSR (abs).L
  else if (op === 0x4EB9) {
    const target = readLong(pc + 2);
    disasm = `JSR 0x${target.toString(16).padStart(8, '0')}`;
    size = 6;
  }
  // JMP (abs).L
  else if (op === 0x4EF9) {
    const target = readLong(pc + 2);
    disasm = `JMP 0x${target.toString(16).padStart(8, '0')}`;
    size = 6;
  }
  // BSR.W
  else if (op === 0x6100) {
    const offset = readWord(pc + 2);
    const target = pc + 2 + offset;
    disasm = `BSR.W 0x${target.toString(16).padStart(6, '0')}  ; offset=${offset.toString(16)}`;
    size = 4;
  }
  // BSR.S
  else if ((op & 0xFF00) === 0x6100 && (op & 0x00FF) !== 0) {
    const offset = op & 0xFF;
    const signed = offset > 127 ? offset - 256 : offset;
    const target = pc + 2 + signed;
    disasm = `BSR.S 0x${target.toString(16).padStart(6, '0')}`;
    size = 2;
  }
  // BRA.S
  else if ((op & 0xFF00) === 0x6000 && (op & 0x00FF) !== 0) {
    const offset = op & 0xFF;
    const signed = offset > 127 ? offset - 256 : offset;
    const target = pc + 2 + signed;
    disasm = `BRA.S 0x${target.toString(16).padStart(6, '0')}`;
    size = 2;
  }
  // MOVE.W #imm, Dn
  else if ((op & 0xF1FF) === 0x303C) {
    const reg = (op >> 9) & 7;
    const imm = readWord(pc + 2);
    disasm = `MOVE.W #0x${imm.toString(16).padStart(4, '0')}, D${reg}`;
    size = 4;
  }
  // MOVE.L #imm, Dn
  else if ((op & 0xF1FF) === 0x203C) {
    const reg = (op >> 9) & 7;
    const imm = readLong(pc + 2);
    disasm = `MOVE.L #0x${imm.toString(16).padStart(8, '0')}, D${reg}`;
    size = 6;
  }
  // MOVEQ #imm, Dn
  else if ((op & 0xF1C0) === 0x7000) {
    const reg = (op >> 9) & 7;
    const imm = op & 0xFF;
    const signed = imm > 127 ? imm - 256 : imm;
    disasm = `MOVEQ #${signed}, D${reg}`;
    size = 2;
  }
  // LEA (abs).L, An
  else if ((op & 0xF1FF) === 0x41F9) {
    const reg = (op >> 9) & 7;
    const addr = readLong(pc + 2);
    disasm = `LEA 0x${addr.toString(16).padStart(8, '0')}, A${reg}`;
    size = 6;
  }
  // MOVEM.L regs, -(A7)
  else if (op === 0x48E7) {
    const mask = readWord(pc + 2);
    disasm = `MOVEM.L D0/A0, -(A7) ; mask=0x${mask.toString(16)}`;
    size = 4;
  }
  // MOVEM.L (A7)+, regs
  else if (op === 0x4CDF) {
    const mask = readWord(pc + 2);
    disasm = `MOVEM.L (A7)+, D0/A0 ; mask=0x${mask.toString(16)}`;
    size = 4;
  }
  // MOVE.L #imm, (abs).L
  else if (op === 0x23FC) {
    const imm = readLong(pc + 2);
    const dest = readLong(pc + 6);
    disasm = `MOVE.L #0x${imm.toString(16).padStart(8, '0')}, (0x${dest.toString(16).padStart(8, '0')}).L`;
    if (dest === 0xFFFF8004) {
      disasm += '  ; ★ 任务切换';
    }
    size = 10;
  }
  // MOVE.W #imm, (abs).L
  else if (op === 0x33FC) {
    const imm = readWord(pc + 2);
    const dest = readLong(pc + 4);
    disasm = `MOVE.W #0x${imm.toString(16).padStart(4, '0')}, (0x${dest.toString(16).padStart(8, '0')}).L`;
    size = 8;
  }
  // MOVE.B #imm, (abs).L
  else if (op === 0x13FC) {
    const imm = readByte(pc + 2);
    const dest = readLong(pc + 3);
    disasm = `MOVE.B #0x${imm.toString(16).padStart(2, '0')}, (0x${dest.toString(16).padStart(8, '0')}).L`;
    size = 7;
  }
  // TST.W Dn
  else if ((op & 0xF1C0) === 0x4A00) {
    const reg = (op >> 9) & 7;
    disasm = `TST.W D${reg}`;
    size = 2;
  }
  // TST.B (abs).L
  else if (op === 0x4A79) {
    const addr = readLong(pc + 2);
    disasm = `TST.B (0x${addr.toString(16).padStart(8, '0')}).L`;
    size = 6;
  }
  // BNE.S
  else if ((op & 0xFF00) === 0x6600) {
    const offset = op & 0xFF;
    const signed = offset > 127 ? offset - 256 : offset;
    const target = pc + 2 + signed;
    disasm = `BNE.S 0x${target.toString(16).padStart(6, '0')}`;
    size = 2;
  }
  // BEQ.S
  else if ((op & 0xFF00) === 0x6700) {
    const offset = op & 0xFF;
    const signed = offset > 127 ? offset - 256 : offset;
    const target = pc + 2 + signed;
    disasm = `BEQ.S 0x${target.toString(16).padStart(6, '0')}`;
    size = 2;
  }
  // BGT.S
  else if ((op & 0xFF00) === 0x6E00) {
    const offset = op & 0xFF;
    const signed = offset > 127 ? offset - 256 : offset;
    const target = pc + 2 + signed;
    disasm = `BGT.S 0x${target.toString(16).padStart(6, '0')}`;
    size = 2;
  }
  // BRA.W
  else if (op === 0x6000) {
    const offset = readWord(pc + 2);
    const target = pc + 2 + offset;
    disasm = `BRA.W 0x${target.toString(16).padStart(6, '0')}`;
    size = 4;
  }
  // BNE.W
  else if (op === 0x6600) {
    const offset = readWord(pc + 2);
    const target = pc + 2 + offset;
    disasm = `BNE.W 0x${target.toString(16).padStart(6, '0')}`;
    size = 4;
  }
  // BEQ.W
  else if (op === 0x6700) {
    const offset = readWord(pc + 2);
    const target = pc + 2 + offset;
    disasm = `BEQ.W 0x${target.toString(16).padStart(6, '0')}`;
    size = 4;
  }
  // CLR.W (abs).L
  else if (op === 0x4279) {
    const addr = readLong(pc + 2);
    disasm = `CLR.W (0x${addr.toString(16).padStart(8, '0')}).L`;
    size = 6;
  }
  // CLR.B (abs).L
  else if (op === 0x4239) {
    const addr = readLong(pc + 2);
    disasm = `CLR.B (0x${addr.toString(16).padStart(8, '0')}).L`;
    size = 6;
  }
  // 默认
  else {
    disasm = `??? (0x${opHex})`;
    size = 2;
  }

  // 打印机器码
  let hexStr = '';
  for (let i = 0; i < size; i++) {
    hexStr += readByte(pc + i).toString(16).padStart(2, '0').toUpperCase() + ' ';
  }
  hexStr = hexStr.padEnd(24, ' ');

  // 标记函数入口
  let mark = '      ';
  if (pc === START) mark = '▶ START ';

  console.log(`${mark}${pcHex}: ${hexStr} ${disasm}`);

  pc += size;
}

console.log('\n=== 反汇编完成 ===');
