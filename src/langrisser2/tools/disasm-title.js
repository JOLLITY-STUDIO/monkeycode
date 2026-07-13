/**
 * 反汇编指定地址范围的 68K 代码
 *
 * 重点搜索:
 *   - JSR/BSR 到 FUN_000099b2 的调用
 *   - MOVE #xxx, D0 (资源ID)
 *   - LEA/MOVE #xxx, A1 (VDP目标地址)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url).replace(/^\//, ''));
const root = path.resolve(__dirname, '..');

const romPath = path.resolve(root, '20260713/Langrisser II (Japan)_68K-gens-rom-dump.bin');
const rom = new Uint8Array(fs.readFileSync(romPath));

function readWord(off) {
  return (rom[off] << 8) | rom[off + 1];
}

function readLong(off) {
  return (
    (rom[off] << 24) |
    (rom[off + 1] << 16) |
    (rom[off + 2] << 8) |
    rom[off + 3]
  );
}

/**
 * 简单反汇编一段代码
 */
function disassemble(startAddr, endAddr) {
  console.log(`\n反汇编 0x${startAddr.toString(16)} - 0x${endAddr.toString(16)}:`);
  console.log('-' .repeat(60));

  let off = startAddr;
  while (off < endAddr) {
    const opcode = readWord(off);
    let mnemonic = '';
    let operands = '';
    let size = 2;

    // NOP  0x4E71
    if (opcode === 0x4E71) {
      mnemonic = 'NOP';
    }
    // RTS  0x4E75
    else if (opcode === 0x4E75) {
      mnemonic = 'RTS';
    }
    // RTE  0x4E73
    else if (opcode === 0x4E73) {
      mnemonic = 'RTE';
    }
    // MOVEM.L reglist, -(A7)  0x48E7 xxxx
    else if (opcode === 0x48E7) {
      const reglist = readWord(off + 2);
      mnemonic = 'MOVEM.L';
      operands = `reglist_${reglist.toString(16)}, -(A7)`;
      size = 4;
    }
    // MOVEM.L (A7)+, reglist  0x4CDF xxxx
    else if (opcode === 0x4CDF) {
      const reglist = readWord(off + 2);
      mnemonic = 'MOVEM.L';
      operands = `(A7)+, reglist_${reglist.toString(16)}`;
      size = 4;
    }
    // MOVE.W #xxx, Dn  0x303C+...  (D0-D7)
    else if ((opcode & 0xF1FF) === 0x303C) {
      const reg = (opcode >> 9) & 7;
      const imm = readWord(off + 2);
      mnemonic = 'MOVE.W';
      operands = `#0x${imm.toString(16)}, D${reg}`;
      size = 4;
    }
    // MOVE.L #xxx, Dn  0x203C+...
    else if ((opcode & 0xF1FF) === 0x203C) {
      const reg = (opcode >> 9) & 7;
      const imm = readLong(off + 2);
      mnemonic = 'MOVE.L';
      operands = `#0x${imm.toString(16)}, D${reg}`;
      size = 6;
    }
    // MOVE.W #xxx, An  0x3C3C+...  (不对，应该是 LEA)
    // LEA #xxx.L, An  0x41F9 xxxxxxxx  (A0-A7)
    else if ((opcode & 0xF1FF) === 0x41F9) {
      const reg = (opcode >> 9) & 7;
      const addr = readLong(off + 2);
      mnemonic = 'LEA';
      operands = `#0x${addr.toString(16)}, A${reg}`;
      size = 6;
    }
    // LEA (PC, d16), An  0x41FA xxxx
    else if ((opcode & 0xF1FF) === 0x41FA) {
      const reg = (opcode >> 9) & 7;
      const disp = readWord(off + 2);
      const target = off + 2 + (disp & 0x8000 ? disp - 0x10000 : disp);
      mnemonic = 'LEA';
      operands = `(PC, ${disp >= 0 ? '+' : ''}${disp}), A${reg}  [0x${target.toString(16)}]`;
      size = 4;
    }
    // JSR (xxx).L  0x4EB9 xxxxxxxx
    else if (opcode === 0x4EB9) {
      const target = readLong(off + 2);
      mnemonic = 'JSR';
      operands = `0x${target.toString(16)}`;
      if (target === 0x000099b2) {
        operands += '  <-- FUN_000099b2 (资源加载!)';
      }
      size = 6;
    }
    // JMP (xxx).L  0x4EF9 xxxxxxxx
    else if (opcode === 0x4EF9) {
      const target = readLong(off + 2);
      mnemonic = 'JMP';
      operands = `0x${target.toString(16)}`;
      size = 6;
    }
    // BSR.W  0x6100 xxxx
    else if (opcode === 0x6100) {
      const disp = readWord(off + 2);
      const target = off + 2 + (disp & 0x8000 ? disp - 0x10000 : disp);
      mnemonic = 'BSR.W';
      operands = `0x${target.toString(16)}`;
      size = 4;
    }
    // BSR.B  0x61xx
    else if ((opcode & 0xFF00) === 0x6100 && (opcode & 0x00FF) !== 0) {
      const disp = opcode & 0xFF;
      const target = off + 2 + (disp & 0x80 ? disp - 0x100 : disp);
      mnemonic = 'BSR.B';
      operands = `0x${target.toString(16)}`;
      size = 2;
    }
    // BRA.W  0x6000 xxxx
    else if (opcode === 0x6000) {
      const disp = readWord(off + 2);
      const target = off + 2 + (disp & 0x8000 ? disp - 0x10000 : disp);
      mnemonic = 'BRA.W';
      operands = `0x${target.toString(16)}`;
      size = 4;
    }
    // BRA.B  0x60xx
    else if ((opcode & 0xFF00) === 0x6000 && (opcode & 0x00FF) !== 0) {
      const disp = opcode & 0xFF;
      const target = off + 2 + (disp & 0x80 ? disp - 0x100 : disp);
      mnemonic = 'BRA.B';
      operands = `0x${target.toString(16)}`;
      size = 2;
    }
    // MOVE.W Dn, Dn  0x3000+...
    else if ((opcode & 0xF1C0) === 0x3000 && (opcode & 0x0030) === 0x0000) {
      const dst = (opcode >> 9) & 7;
      const src = opcode & 7;
      mnemonic = 'MOVE.W';
      operands = `D${src}, D${dst}`;
      size = 2;
    }
    // MOVE.L Dn, Dn  0x2000+...
    else if ((opcode & 0xF1C0) === 0x2000 && (opcode & 0x0030) === 0x0000) {
      const dst = (opcode >> 9) & 7;
      const src = opcode & 7;
      mnemonic = 'MOVE.L';
      operands = `D${src}, D${dst}`;
      size = 2;
    }
    // MOVE.W Dn, An  0x3040+...
    else if ((opcode & 0xF1C0) === 0x3040) {
      const dst = (opcode >> 9) & 7;
      const src = opcode & 7;
      mnemonic = 'MOVE.W';
      operands = `D${src}, A${dst}`;
      size = 2;
    }
    // TST.W Dn  0x4A40+...
    else if ((opcode & 0xFFC0) === 0x4A40) {
      const reg = opcode & 7;
      mnemonic = 'TST.W';
      operands = `D${reg}`;
      size = 2;
    }
    // TST.L Dn  0x4A80+...
    else if ((opcode & 0xFFC0) === 0x4A80) {
      const reg = opcode & 7;
      mnemonic = 'TST.L';
      operands = `D${reg}`;
      size = 2;
    }
    // BPL  0x6Axx
    else if ((opcode & 0xFF00) === 0x6A00) {
      const disp = opcode & 0xFF;
      const target = off + 2 + (disp & 0x80 ? disp - 0x100 : disp);
      mnemonic = 'BPL.B';
      operands = `0x${target.toString(16)}`;
      size = 2;
    }
    // BMI  0x6Bxx
    else if ((opcode & 0xFF00) === 0x6B00) {
      const disp = opcode & 0xFF;
      const target = off + 2 + (disp & 0x80 ? disp - 0x100 : disp);
      mnemonic = 'BMI.B';
      operands = `0x${target.toString(16)}`;
      size = 2;
    }
    // BNE  0x66xx
    else if ((opcode & 0xFF00) === 0x6600) {
      const disp = opcode & 0xFF;
      const target = off + 2 + (disp & 0x80 ? disp - 0x100 : disp);
      mnemonic = 'BNE.B';
      operands = `0x${target.toString(16)}`;
      size = 2;
    }
    // BEQ  0x67xx
    else if ((opcode & 0xFF00) === 0x6700) {
      const disp = opcode & 0xFF;
      const target = off + 2 + (disp & 0x80 ? disp - 0x100 : disp);
      mnemonic = 'BEQ.B';
      operands = `0x${target.toString(16)}`;
      size = 2;
    }
    // CLR.W Dn  0x4240+...
    else if ((opcode & 0xFFC0) === 0x4240) {
      const reg = opcode & 7;
      mnemonic = 'CLR.W';
      operands = `D${reg}`;
      size = 2;
    }
    // CLR.L Dn  0x4280+...
    else if ((opcode & 0xFFC0) === 0x4280) {
      const reg = opcode & 7;
      mnemonic = 'CLR.L';
      operands = `D${reg}`;
      size = 2;
    }
    // MOVE.W Dn, (An)  0x3080+...
    else if ((opcode & 0xF1C0) === 0x3080) {
      const dst = (opcode >> 9) & 7;
      const src = opcode & 7;
      mnemonic = 'MOVE.W';
      operands = `D${src}, (A${dst})`;
      size = 2;
    }
    // MOVE.L Dn, (An)+  0x2098+...
    else if ((opcode & 0xF1C0) === 0x2098) {
      const dst = (opcode >> 9) & 7;
      const src = opcode & 7;
      mnemonic = 'MOVE.L';
      operands = `D${src}, (A${dst})+`;
      size = 2;
    }
    // MOVE.W Dn, (An)+  0x3098+...
    else if ((opcode & 0xF1C0) === 0x3098) {
      const dst = (opcode >> 9) & 7;
      const src = opcode & 7;
      mnemonic = 'MOVE.W';
      operands = `D${src}, (A${dst})+`;
      size = 2;
    }
    // MOVE.L #xxx, (xxx).L  0x23FC xxxxxxxx xxxx ... 不对
    // MOVE.L #xxx, (Dn, xxx) ... 太多模式了
    // 简化: 对于未知指令，显示原始字节
    else {
      mnemonic = 'DC.W';
      operands = `0x${opcode.toString(16).padStart(4, '0')}`;
      size = 2;
    }

    const addrStr = off.toString(16).padStart(6, '0');
    let bytesStr = '';
    for (let i = 0; i < size; i++) {
      bytesStr += rom[off + i].toString(16).padStart(2, '0') + ' ';
    }
    bytesStr = bytesStr.padEnd(14, ' ');

    console.log(`  ${addrStr}:  ${bytesStr} ${mnemonic.padEnd(10)} ${operands}`);

    off += size;
  }
}

// ============================================================
// 反汇编关键函数
// ============================================================

console.log('=== 标题画面关键函数反汇编 ===');

// FUN_0000c914 - 已知的资源加载函数
disassemble(0xC914, 0xC92C);

// FUN_0000c92c - 默认任务
disassemble(0xC92C, 0xC980);

// FUN_0000c93a 附近 - 标题画面主任务 (可能从 0xC93A 开始，也可能更早)
// 让我们扩大范围
disassemble(0xC930, 0xC9C0);

// FUN_0000c9a0 - 下一任务
disassemble(0xC9A0, 0xCA20);

// FUN_0000c80c - 游戏主初始化
disassemble(0xC80C, 0xC914);

console.log('\n=== 反汇编完成 ===');
