/**
 * 反汇编 FUN_0000c7ec - 显示初始化
 * 看看它是否加载了标题画面资源
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

function s16(v) { return v > 0x7fff ? v - 0x10000 : v; }
function s8(v) { return v > 0x7f ? v - 0x100 : v; }

// 分析函数: 从 start 开始，遇到 RTS 结束
function analyzeFunction(start, name) {
  console.log(`\n═══ ${name} (0x${start.toString(16).padStart(8, '0')}) ═══`);

  const jsrCalls = [];
  const moveTo8004 = [];
  let pc = start;
  let end = start + 512; // 先假设最大 512 字节

  while (pc < start + 2048 && pc < romData.length) {
    const op = r16(pc);
    const opHex = op.toString(16).padStart(4, '0').toUpperCase();
    const pcHex = pc.toString(16).padStart(6, '0');

    let disasm = '';
    let size = 2;

    // RTS
    if (op === 0x4E75) {
      disasm = 'RTS';
      end = pc;
      console.log(`${pcHex}: ${disasm}`);
      break;
    }
    // JMP (abs).L
    else if (op === 0x4EF9) {
      const t = r32(pc + 2);
      disasm = `JMP 0x${t.toString(16).padStart(8, '0')}`;
      end = pc;
      size = 6;
      console.log(`${pcHex}: ${disasm}`);
      break;
    }
    // JSR (abs).L
    else if (op === 0x4EB9) {
      const t = r32(pc + 2);
      disasm = `JSR FUN_0x${t.toString(16).padStart(8, '0')}`;
      jsrCalls.push({ addr: pc, target: t });
      size = 6;
    }
    // BSR.W
    else if (op === 0x6100) {
      const off = s16(r16(pc + 2));
      const t = pc + 2 + off;
      disasm = `BSR.W FUN_0x${t.toString(16).padStart(8, '0')}`;
      jsrCalls.push({ addr: pc, target: t, type: 'BSR.W' });
      size = 4;
    }
    // BSR.S
    else if ((op & 0xFF00) === 0x6100 && (op & 0x00FF) !== 0) {
      const off = s8(op & 0xFF);
      const t = pc + 2 + off;
      disasm = `BSR.S FUN_0x${t.toString(16).padStart(8, '0')}`;
      jsrCalls.push({ addr: pc, target: t, type: 'BSR.S' });
      size = 2;
    }
    // MOVE.L #imm, (d16, A1) = 0x21FC
    else if (op === 0x21FC) {
      const imm = r32(pc + 2);
      const d16 = s16(r16(pc + 6));
      if (d16 === 0x8004) {
        disasm = `MOVE.L #0x${imm.toString(16).padStart(8, '0')}, (0x8004,A1)  ★任务切换→FUN_0x${imm.toString(16).padStart(8, '0')}`;
        moveTo8004.push({ addr: pc, value: imm });
      } else {
        disasm = `MOVE.L #0x${imm.toString(16).padStart(8, '0')}, (0x${(d16 & 0xffff).toString(16).padStart(4, '0')},A1)`;
      }
      size = 8;
    }
    // MOVE.W #imm, (abs).L
    else if (op === 0x33FC) {
      const imm = r16(pc + 2);
      const dest = r32(pc + 4);
      disasm = `MOVE.W #0x${imm.toString(16).padStart(4, '0')}, (0x${dest.toString(16).padStart(8, '0')}).L`;
      size = 8;
    }
    // MOVE.L #imm, Dn
    else if ((op & 0xF1FF) === 0x203C) {
      const reg = (op >> 9) & 7;
      const imm = r32(pc + 2);
      disasm = `MOVE.L #0x${imm.toString(16).padStart(8, '0')}, D${reg}`;
      size = 6;
    }
    // MOVE.W #imm, Dn
    else if ((op & 0xF1FF) === 0x303C) {
      const reg = (op >> 9) & 7;
      const imm = r16(pc + 2);
      disasm = `MOVE.W #0x${imm.toString(16).padStart(4, '0')}, D${reg}`;
      size = 4;
    }
    // LEA (abs).L, An
    else if ((op & 0xF1FF) === 0x41F9) {
      const reg = (op >> 9) & 7;
      const addr = r32(pc + 2);
      disasm = `LEA (0x${addr.toString(16).padStart(8, '0')}).L, A${reg}`;
      size = 6;
    }
    // MOVEM
    else if (op === 0x48E7) { disasm = 'MOVEM.L ..., -(A7)'; size = 4; }
    else if (op === 0x4CDF) { disasm = 'MOVEM.L (A7)+, ...'; size = 4; }
    // CLR
    else if (op === 0x4279) { disasm = `CLR.W (0x${r32(pc + 2).toString(16).padStart(8, '0')}).L`; size = 6; }
    else if (op === 0x4239) { disasm = `CLR.B (0x${r32(pc + 2).toString(16).padStart(8, '0')}).L`; size = 6; }
    else if (op === 0x4278) {
      const a = r16(pc + 2);
      disasm = `CLR.W (0x${(s16(a) >>> 0).toString(16).padStart(8, '0')}).W`;
      size = 4;
    }
    // TST
    else if (op === 0x4A79) { disasm = `TST.B (0x${r32(pc + 2).toString(16).padStart(8, '0')}).L`; size = 6; }
    // CMPI.B #imm, (abs).L
    else if (op === 0x0C79) {
      const imm = r16(pc + 2);
      const addr = r32(pc + 4);
      disasm = `CMPI.B #0x${imm.toString(16).padStart(2, '0')}, (0x${addr.toString(16).padStart(8, '0')}).L`;
      size = 8;
    }
    // 分支
    else if ((op & 0xFF00) === 0x6600 && (op & 0xFF) !== 0) { disasm = 'BNE.S'; size = 2; }
    else if (op === 0x6600) { disasm = 'BNE.W'; size = 4; }
    else if ((op & 0xFF00) === 0x6700 && (op & 0xFF) !== 0) { disasm = 'BEQ.S'; size = 2; }
    else if (op === 0x6700) { disasm = 'BEQ.W'; size = 4; }
    else if ((op & 0xFF00) === 0x6000 && (op & 0xFF) !== 0) { disasm = 'BRA.S'; size = 2; }
    else if (op === 0x6000) { disasm = 'BRA.W'; size = 4; }
    // MOVEQ
    else if ((op & 0xF1C0) === 0x7000) {
      const reg = (op >> 9) & 7;
      const imm = op & 0xFF;
      disasm = `MOVEQ #${s8(imm)}, D${reg}`;
      size = 2;
    }
    else {
      disasm = `dc.w 0x${opHex}`;
      size = 2;
    }

    let hexStr = '';
    for (let i = 0; i < size; i++) hexStr += r8(pc + i).toString(16).padStart(2, '0').toUpperCase() + ' ';
    hexStr = hexStr.padEnd(28, ' ');

    // 只打印 JSR 和重要指令
    // if (disasm.startsWith('JSR') || disasm.startsWith('BSR') ||
    //     disasm.includes('任务切换') || disasm === 'RTS' ||
    //     disasm.startsWith('JMP')) {
      console.log(`${pcHex}: ${hexStr} ${disasm}`);
    // }

    pc += size;
  }

  console.log(`\n函数大小: ${end - start} 字节`);
  console.log(`JSR/BSR 调用 ${jsrCalls.length} 个:`);
  for (const c of jsrCalls) {
    console.log(`  [0x${c.addr.toString(16).padStart(6, '0')}] ${c.type || 'JSR'} FUN_0x${c.target.toString(16).padStart(8, '0')}`);
  }
  if (moveTo8004.length > 0) {
    console.log(`任务切换 ${moveTo8004.length} 个:`);
    for (const m of moveTo8004) {
      console.log(`  [0x${m.addr.toString(16).padStart(6, '0')}] → FUN_0x${m.value.toString(16).padStart(8, '0')}`);
    }
  }

  return { jsrCalls, moveTo8004, end };
}

console.log('=== 标题画面资源加载链分析 ===\n');

// 分析关键函数
analyzeFunction(0xC7EC, 'FUN_0000c7ec - 显示初始化');
analyzeFunction(0x9EC4, 'FUN_00009ec4 - 地图加载');
analyzeFunction(0xC914, 'FUN_0000c914 - 场景加载辅助');

console.log('\n=== 分析完成 ===');
