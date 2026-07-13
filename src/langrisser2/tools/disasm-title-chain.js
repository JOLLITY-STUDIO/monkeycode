/**
 * 深度反汇编标题画面任务链
 * 从 FUN_0000c914 开始，追踪完整的标题画面初始化流程
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

/**
 * 简单的 68K 反汇编器 (只处理常见指令)
 */
function disasm(addr, size) {
  const lines = [];
  let pc = addr;
  const end = addr + size;
  
  while (pc < end) {
    const op = r16(pc);
    let mnemonic = '';
    let operands = '';
    let instrSize = 2;
    
    // MOVEM.L (An)+, RegList = 0x4cd9
    if ((op & 0xfff8) === 0x4cd8) {
      const regList = r16(pc + 2);
      const regs = [];
      for (let i = 0; i < 8; i++) if (regList & (1 << i)) regs.push(`D${7 - i}`);
      for (let i = 0; i < 8; i++) if (regList & (1 << (i + 8))) regs.push(`A${7 - i}`);
      mnemonic = 'MOVEM.L';
      operands = `(${regs.join('/')}),(${op & 7})+`;
      instrSize = 4;
    }
    // MOVEM.L RegList, -(An) = 0x48d0
    else if ((op & 0xfff8) === 0x48d0) {
      const regList = r16(pc + 2);
      const regs = [];
      for (let i = 0; i < 8; i++) if (regList & (1 << i)) regs.push(`D${7 - i}`);
      for (let i = 0; i < 8; i++) if (regList & (1 << (i + 8))) regs.push(`A${7 - i}`);
      mnemonic = 'MOVEM.L';
      operands = `-(${op & 7}),(${regs.join('/')})`;
      instrSize = 4;
    }
    // MOVE.W Dn, Dn = 0x3000-0x3fff
    else if ((op & 0xf000) === 0x3000 && (op & 0x00c0) === 0x0000) {
      const src = op & 7;
      const dst = (op >> 9) & 7;
      const size = (op >> 12) & 3;
      const sizeStr = size === 1 ? '.B' : size === 2 ? '.W' : '.L';
      mnemonic = `MOVE${sizeStr}`;
      operands = `D${src}, D${dst}`;
    }
    // MOVE.L #imm, Dn = 0x203c ...
    else if ((op & 0xfff8) === 0x203c) {
      const reg = (op >> 9) & 7;
      const imm = r32(pc + 2);
      mnemonic = 'MOVE.L';
      operands = `#$${imm.toString(16).toUpperCase()}, D${reg}`;
      instrSize = 6;
    }
    // MOVE.W #imm, Dn = 0x303c ...
    else if ((op & 0xfff8) === 0x303c) {
      const reg = (op >> 9) & 7;
      const imm = r16(pc + 2);
      mnemonic = 'MOVE.W';
      operands = `#$${imm.toString(16).toUpperCase()}, D${reg}`;
      instrSize = 4;
    }
    // LEA (xxx).L, An = 0x41f9 xxxxxxxx
    else if ((op & 0xfff8) === 0x41f8) {
      const reg = (op >> 9) & 7;
      const addrVal = r32(pc + 2);
      mnemonic = 'LEA';
      operands = `($${addrVal.toString(16).padStart(8, '0').toUpperCase()}).L, A${reg}`;
      instrSize = 6;
    }
    // JSR (xxx).L = 0x4eb9 xxxxxxxx
    else if (op === 0x4eb9) {
      const target = r32(pc + 2);
      mnemonic = 'JSR';
      operands = `$${target.toString(16).padStart(8, '0').toUpperCase()}`;
      instrSize = 6;
    }
    // JMP (xxx).L = 0x4ef9 xxxxxxxx
    else if (op === 0x4ef9) {
      const target = r32(pc + 2);
      mnemonic = 'JMP';
      operands = `$${target.toString(16).padStart(8, '0').toUpperCase()}`;
      instrSize = 6;
    }
    // RTS = 0x4e75
    else if (op === 0x4e75) {
      mnemonic = 'RTS';
    }
    // NOP = 0x4e71
    else if (op === 0x4e71) {
      mnemonic = 'NOP';
    }
    // BRA.S = 0x60xx
    else if ((op & 0xff00) === 0x6000) {
      const disp = (op & 0xff) - ((op & 0x80) ? 0x100 : 0);
      mnemonic = 'BRA.S';
      operands = `$${(pc + 2 + disp).toString(16).toUpperCase()}`;
    }
    // BSR.S = 0x61xx
    else if ((op & 0xff00) === 0x6100) {
      const disp = (op & 0xff) - ((op & 0x80) ? 0x100 : 0);
      mnemonic = 'BSR.S';
      operands = `$${(pc + 2 + disp).toString(16).toUpperCase()}`;
    }
    // TST.W Dn = 0x4a00-0x4a07
    else if ((op & 0xfff8) === 0x4a00) {
      mnemonic = 'TST.W';
      operands = `D${op & 7}`;
    }
    // TST.L Dn = 0x4a80-0x4a87
    else if ((op & 0xfff8) === 0x4a80) {
      mnemonic = 'TST.L';
      operands = `D${op & 7}`;
    }
    // BEQ.S / BNE.S etc
    else if ((op & 0xf000) === 0x6000 && (op & 0x0f00) !== 0x0000 && (op & 0x0f00) !== 0x0100) {
      const cc = (op >> 8) & 0xf;
      const disp = op & 0xff;
      const dispSigned = disp - ((disp & 0x80) ? 0x100 : 0);
      const ccNames = ['','','HI','LS','CC','CS','NE','EQ','VC','VS','PL','MI','GE','LT','GT','LE'];
      mnemonic = `B${ccNames[cc] || cc.toString(16)}.S`;
      operands = `$${(pc + 2 + dispSigned).toString(16).toUpperCase()}`;
    }
    // CLR.W Dn = 0x4240-0x4247
    else if ((op & 0xfff8) === 0x4240) {
      mnemonic = 'CLR.W';
      operands = `D${op & 7}`;
    }
    // CLR.L Dn = 0x4280-0x4287
    else if ((op & 0xfff8) === 0x4280) {
      mnemonic = 'CLR.L';
      operands = `D${op & 7}`;
    }
    // ADDQ.W #n, Dn = 0x5040-0x5747
    else if ((op & 0xf1f8) === 0x5040) {
      const data = ((op >> 9) & 7) || 8;
      mnemonic = 'ADDQ.W';
      operands = `#${data}, D${op & 7}`;
    }
    // DBF Dn, label = 0x51c8 xxxx
    else if ((op & 0xfff8) === 0x51c8) {
      const reg = op & 7;
      const disp = r16(pc + 2);
      const dispSigned = disp - ((disp & 0x8000) ? 0x10000 : 0);
      mnemonic = 'DBF';
      operands = `D${reg}, $${(pc + 2 + dispSigned).toString(16).toUpperCase()}`;
      instrSize = 4;
    }
    // MOVE.W Dn, (xxx).L = 0x33c0 xxxxxxxx
    else if ((op & 0xfff8) === 0x33c0) {
      const reg = (op >> 9) & 7;
      const dest = r32(pc + 2);
      mnemonic = 'MOVE.W';
      operands = `D${reg}, ($${dest.toString(16).padStart(8, '0').toUpperCase()}).L`;
      instrSize = 6;
    }
    // MOVE.L Dn, (xxx).L = 0x23c0 xxxxxxxx
    else if ((op & 0xfff8) === 0x23c0) {
      const reg = (op >> 9) & 7;
      const dest = r32(pc + 2);
      mnemonic = 'MOVE.L';
      operands = `D${reg}, ($${dest.toString(16).padStart(8, '0').toUpperCase()}).L`;
      instrSize = 6;
    }
    // MOVE.W (xxx).L, Dn = 0x3039... wait no, MOVE.W (abs).L, Dn = 0x3039
    else if ((op & 0xfff8) === 0x3039) {
      const reg = (op >> 9) & 7;
      const src = r32(pc + 2);
      mnemonic = 'MOVE.W';
      operands = `($${src.toString(16).padStart(8, '0').toUpperCase()}).L, D${reg}`;
      instrSize = 6;
    }
    // MOVE.L (xxx).L, Dn = 0x2039 xxxxxxxx
    else if ((op & 0xfff8) === 0x2039) {
      const reg = (op >> 9) & 7;
      const src = r32(pc + 2);
      mnemonic = 'MOVE.L';
      operands = `($${src.toString(16).padStart(8, '0').toUpperCase()}).L, D${reg}`;
      instrSize = 6;
    }
    // LSR.W #n, Dn = 0xe048
    else if ((op & 0xf1f8) === 0xe048) {
      const count = (op >> 9) & 7;
      const reg = op & 7;
      mnemonic = 'LSR.W';
      operands = `#${count || 8}, D${reg}`;
    }
    // LSR.L #n, Dn = 0xe288
    else if ((op & 0xf1f8) === 0xe288) {
      const count = (op >> 9) & 7;
      const reg = op & 7;
      mnemonic = 'LSR.L';
      operands = `#${count || 8}, D${reg}`;
    }
    // ASL.W #n, Dn = 0xe148
    else if ((op & 0xf1f8) === 0xe148) {
      const count = (op >> 9) & 7;
      const reg = op & 7;
      mnemonic = 'ASL.W';
      operands = `#${count || 8}, D${reg}`;
    }
    // ASL.L #n, Dn = 0xe388
    else if ((op & 0xf1f8) === 0xe388) {
      const count = (op >> 9) & 7;
      const reg = op & 7;
      mnemonic = 'ASL.L';
      operands = `#${count || 8}, D${reg}`;
    }
    else {
      mnemonic = 'DC.W';
      operands = `$${op.toString(16).padStart(4, '0').toUpperCase()}`;
    }
    
    lines.push({
      addr: pc,
      op,
      mnemonic,
      operands,
      size: instrSize
    });
    
    pc += instrSize;
  }
  
  return lines;
}

console.log('=== 标题画面任务链反汇编 ===\n');

// FUN_0000c914
console.log('--- FUN_0000c914 (标题画面任务1: 加载资源) ---');
const lines1 = disasm(0xc914, 0x20);
for (const l of lines1) {
  console.log(`  $${l.addr.toString(16).padStart(6, '0')}: ${l.mnemonic.padEnd(10)} ${l.operands}`);
}
console.log('');

// FUN_0000c92c
console.log('--- FUN_0000c92c (标题画面任务2) ---');
const lines2 = disasm(0xc92c, 0x20);
for (const l of lines2) {
  console.log(`  $${l.addr.toString(16).padStart(6, '0')}: ${l.mnemonic.padEnd(10)} ${l.operands}`);
}
console.log('');

// FUN_0000c93a
console.log('--- FUN_0000c93a (标题画面任务3: 设置参数) ---');
const lines3 = disasm(0xc93a, 0x80);
for (const l of lines3) {
  console.log(`  $${l.addr.toString(16).padStart(6, '0')}: ${l.mnemonic.padEnd(10)} ${l.operands}`);
}
console.log('');

// FUN_0000c9a0
console.log('--- FUN_0000c9a0 (标题画面任务4) ---');
const lines4 = disasm(0xc9a0, 0x100);
for (const l of lines4) {
  console.log(`  $${l.addr.toString(16).padStart(6, '0')}: ${l.mnemonic.padEnd(10)} ${l.operands}`);
}
console.log('');
