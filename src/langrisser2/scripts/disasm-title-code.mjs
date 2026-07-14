/**
 * 反汇编标题画面相关代码区域 (0xC800 - 0xCC00)
 * 重点分析:
 *   FUN_0000c80c - 游戏主初始化
 *   FUN_0000c914 - 加载资源 0x8001
 *   FUN_0000c93a - 标题画面主任务
 *   FUN_0000ca00 - 调色板加载 + sprite 设置
 *   FUN_0000ca68 - 再次加载资源 0x8001
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROM_PATH = path.join(__dirname, '..', '20260713', 'Langrisser II (Japan) (v1.2-gens-rom-dump_68K.bin');

const rom = fs.readFileSync(ROM_PATH);

function readByte(off) { return rom[off] & 0xff; }
function readWord(off) { return ((rom[off] & 0xff) << 8) | (rom[off + 1] & 0xff); }
function readLong(off) {
  return ((rom[off] & 0xff) << 24) | ((rom[off + 1] & 0xff) << 16) |
         ((rom[off + 2] & 0xff) << 8) | (rom[off + 3] & 0xff);
}

// 简易 68K 反汇编器 (只识别常用指令)
function disassemble(startAddr, length) {
  const lines = [];
  let pc = startAddr;
  const end = startAddr + length;

  while (pc < end) {
    const op = readWord(pc);
    let mnemonic = '';
    let operands = '';
    let size = 2;

    // 常用指令识别
    if (op === 0x4E75) {
      mnemonic = 'RTS';
    } else if (op === 0x4EB9) {
      // JSR xxxxxx.L
      const addr = readLong(pc + 2);
      mnemonic = 'JSR';
      operands = `$${addr.toString(16).padStart(8, '0')}`;
      size = 6;
    } else if (op === 0x4EF9) {
      // JMP xxxxxx.L
      const addr = readLong(pc + 2);
      mnemonic = 'JMP';
      operands = `$${addr.toString(16).padStart(8, '0')}`;
      size = 6;
    } else if ((op & 0xFF00) === 0x6100) {
      // BSR.W
      const offset = readWord(pc + 2);
      const target = pc + 4 + (offset > 0x7fff ? offset - 0x10000 : offset);
      mnemonic = 'BSR.W';
      operands = `$${target.toString(16).padStart(6, '0')}`;
      size = 4;
    } else if ((op & 0xFF00) === 0x6000) {
      // BRA.W
      const offset = readWord(pc + 2);
      const target = pc + 4 + (offset > 0x7fff ? offset - 0x10000 : offset);
      mnemonic = 'BRA.W';
      operands = `$${target.toString(16).padStart(6, '0')}`;
      size = 4;
    } else if ((op & 0xF000) === 0x6000 && (op & 0x0F00) !== 0x0100) {
      // Bcc.B (各种条件分支)
      const cc = (op >> 8) & 0x0F;
      const offset = op & 0xFF;
      const target = pc + 2 + (offset > 0x7f ? offset - 0x100 : offset);
      const ccNames = ['BRA', 'BSR', 'BHI', 'BLS', 'BCC', 'BCS', 'BNE', 'BEQ',
                       'BVC', 'BVS', 'BPL', 'BMI', 'BGE', 'BLT', 'BGT', 'BLE'];
      mnemonic = ccNames[cc];
      operands = `$${target.toString(16).padStart(6, '0')}`;
      size = 2;
    } else if (op === 0x303C) {
      // MOVE.W #imm, D0
      const imm = readWord(pc + 2);
      mnemonic = 'MOVE.W';
      operands = `#$${imm.toString(16).padStart(4, '0')}, D0`;
      size = 4;
    } else if (op === 0x323C) {
      // MOVE.W #imm, D1
      const imm = readWord(pc + 2);
      mnemonic = 'MOVE.W';
      operands = `#$${imm.toString(16).padStart(4, '0')}, D1`;
      size = 4;
    } else if (op === 0x203C) {
      // MOVE.L #imm, D0
      const imm = readLong(pc + 2);
      mnemonic = 'MOVE.L';
      operands = `#$${imm.toString(16).padStart(8, '0')}, D0`;
      size = 6;
    } else if (op === 0x21FC) {
      // MOVE.L #imm, (addr).L
      const imm = readLong(pc + 2);
      const addr = readWord(pc + 6); // 不对, 应该是 16-bit 地址
      // 实际是 MOVE.L #xxxx, $yyyy.W (21FC xxxx xxxx yyyy)
      // 或者 MOVE.L #xxxx, (yyyy).L
      // 让我重新处理: 21FC 是 MOVE.L #imm, <ea>
      // 对于绝对地址模式: 0x21FC + 32-bit imm + 16-bit addr (short) or 32-bit (long)
      // 我们假设是 16-bit 绝对地址
      // 不对, 21FC 的格式是:
      // 21FC xxxx xxxx yyyy → MOVE.L #$xxxxxx, $yyyy.W
      // 所以 imm 是 pc+2 的 longword, addr 是 pc+6 的 word
      // 但这样 size = 2+4+2 = 8
      const immVal = readLong(pc + 2);
      const absAddr = readWord(pc + 6);
      mnemonic = 'MOVE.L';
      operands = `#$${immVal.toString(16).padStart(8, '0')}, $${absAddr.toString(16).padStart(4, '0')}.W`;
      size = 8;
    } else if (op === 0x31FC) {
      // MOVE.W #imm, (addr).W
      const imm = readWord(pc + 2);
      const addr = readWord(pc + 4);
      mnemonic = 'MOVE.W';
      operands = `#$${imm.toString(16).padStart(4, '0')}, $${addr.toString(16).padStart(4, '0')}.W`;
      size = 6;
    } else if (op === 0x48E7) {
      // MOVEM.L register_list, -(A7)
      const regList = readWord(pc + 2);
      mnemonic = 'MOVEM.L';
      operands = `<reglist_${regList.toString(16)}>, -(A7)`;
      size = 4;
    } else if (op === 0x4CDF) {
      // MOVEM.L (A7)+, register_list
      const regList = readWord(pc + 2);
      mnemonic = 'MOVEM.L';
      operands = `(A7)+, <reglist_${regList.toString(16)}>`;
      size = 4;
    } else if (op === 0x4279) {
      // CLR.L (addr).L
      const addr = readWord(pc + 2);
      mnemonic = 'CLR.L';
      operands = `$${addr.toString(16).padStart(4, '0')}.W`;
      size = 4;
    } else if (op === 0x4278) {
      // CLR.W (addr).W
      const addr = readWord(pc + 2);
      mnemonic = 'CLR.W';
      operands = `$${addr.toString(16).padStart(4, '0')}.W`;
      size = 4;
    } else if (op === 0x4238) {
      // CLR.B (addr).W
      const addr = readWord(pc + 2);
      mnemonic = 'CLR.B';
      operands = `$${addr.toString(16).padStart(4, '0')}.W`;
      size = 4;
    } else if ((op & 0xF000) === 0x7000) {
      // MOVEQ #imm, Dn
      const reg = (op >> 9) & 0x07;
      const imm = op & 0xFF;
      const signedImm = imm > 0x7F ? imm - 0x100 : imm;
      mnemonic = 'MOVEQ';
      operands = `#${signedImm}, D${reg}`;
      size = 2;
    } else if (op === 0x0C79) {
      // CMP.W #imm, (addr).L
      const imm = readWord(pc + 2);
      const addr = readWord(pc + 4);
      mnemonic = 'CMP.W';
      operands = `#$${imm.toString(16).padStart(4, '0')}, $${addr.toString(16).padStart(4, '0')}.W`;
      size = 6;
    } else if (op === 0x6600) {
      // BNE.W
      const offset = readWord(pc + 2);
      const target = pc + 4 + (offset > 0x7fff ? offset - 0x10000 : offset);
      mnemonic = 'BNE.W';
      operands = `$${target.toString(16).padStart(6, '0')}`;
      size = 4;
    } else {
      mnemonic = 'DC.W';
      operands = `$${op.toString(16).padStart(4, '0')}`;
    }

    const addrHex = pc.toString(16).padStart(6, '0');
    let hexBytes = '';
    for (let i = 0; i < size; i++) {
      hexBytes += readByte(pc + i).toString(16).padStart(2, '0');
    }
    hexBytes = hexBytes.padEnd(16, ' ');

    lines.push(`  ${addrHex}: ${hexBytes} ${mnemonic.padEnd(10)} ${operands}`);
    pc += size;
  }

  return lines;
}

console.log('=== FUN_0000c80c (游戏主初始化) ===\n');
console.log(disassemble(0x0000C80C, 200).join('\n'));

console.log('\n\n=== FUN_0000c914 (加载资源 0x8001) ===\n');
console.log(disassemble(0x0000C914, 64).join('\n'));

console.log('\n\n=== FUN_0000c93a (标题画面主任务) ===\n');
console.log(disassemble(0x0000C930, 200).join('\n'));

console.log('\n\n=== FUN_0000c9a0 (标题画面子任务) ===\n');
console.log(disassemble(0x0000C9A0, 200).join('\n'));

console.log('\n\n=== FUN_0000ca00 (调色板+sprite设置) ===\n');
console.log(disassemble(0x0000CA00, 200).join('\n'));

console.log('\n\n=== FUN_0000ca68 (再次加载资源) ===\n');
console.log(disassemble(0x0000CA68, 128).join('\n'));
