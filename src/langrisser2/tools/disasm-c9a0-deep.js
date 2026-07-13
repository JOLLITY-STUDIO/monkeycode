/**
 * 深度反汇编 FUN_0000c9a0 (0xC9A0 - 0xCC00)
 *
 * 逐指令解码，找出所有资源加载调用 (JSR 0x99b2) 及其参数
 * 同时识别 CRAM 写入、VDP 寄存器设置等操作
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ArrayBufferRomReader, loadResource, decompressLZSS, decompressNibbleRLE, RESOURCE_POINTER_TABLE_BASE } from '../dist/game/hw/resource.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url).replace(/^\//, ''));
const root = path.resolve(__dirname, '..');

const romPath = path.resolve(root, '20260713/Langrisser II (Japan)_68K-gens-rom-dump.bin');
const romData = new Uint8Array(fs.readFileSync(romPath));
const rom = new ArrayBufferRomReader(romData);

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

const START = 0xC9A0;
const END = 0xCC00;

console.log('=== FUN_0000c9a0 深度反汇编 ===\n');

// ============================================================
// 简单的 68K 反汇编器 (只处理我们关心的指令)
// ============================================================

let pc = START;
const calls = [];
const cramWrites = [];

while (pc < END) {
  const op = readWord(pc);
  const opStr = op.toString(16).padStart(4, '0').toUpperCase();

  // JSR (xxx).L  4EB9 xxxxxxxx
  if (op === 0x4EB9) {
    const target = readLong(pc + 2);
    const targetStr = target.toString(16).padStart(8, '0');
    console.log(`[${pc.toString(16).padStart(6, '0')}] JSR 0x${targetStr}  4EB9 ${targetStr}`);

    if (target === 0x000099b2) {
      // 资源加载调用，回溯参数
      let d0 = null;
      let a1 = null;
      for (let back = pc - 2; back > pc - 128; ) {
        const bop = readWord(back);
        if (bop === 0x303C && d0 === null) { // MOVE.W #xxx, D0
          d0 = readWord(back + 2);
        } else if (bop === 0x203C && d0 === null) { // MOVE.L #xxx, D0
          d0 = readLong(back + 2) & 0xFFFF;
        } else if (bop === 0x43F9 && a1 === null) { // LEA #xxx.L, A1
          a1 = readLong(back + 2) & 0xFFFF;
        }
        back -= 2;
        if (d0 !== null && a1 !== null) break;
      }
      calls.push({ addr: pc, d0, a1 });
    }
    pc += 6;
    continue;
  }

  // BSR.W  6100 xxxx
  if ((op & 0xFF00) === 0x6100) {
    const offset = readWord(pc + 2);
    const target = pc + 2 + offset;
    console.log(`[${pc.toString(16).padStart(6, '0')}] BSR.W 0x${target.toString(16).padStart(6, '0')}  6100 ${offset.toString(16).padStart(4, '0')}`);
    pc += 4;
    continue;
  }

  // BSR.S  61xx
  if ((op & 0xFF00) === 0x6100 && (op & 0x00FF) !== 0x00) {
    const offset = op & 0xFF;
    const signedOffset = offset > 127 ? offset - 256 : offset;
    const target = pc + 2 + signedOffset;
    console.log(`[${pc.toString(16).padStart(6, '0')}] BSR.S 0x${target.toString(16).padStart(6, '0')}  61${offset.toString(16).padStart(2, '0')}`);
    pc += 2;
    continue;
  }

  // MOVE.W #xxx, Dn  3n3C
  if ((op & 0xF1FF) === 0x303C) {
    const reg = (op >> 9) & 7;
    const imm = readWord(pc + 2);
    console.log(`[${pc.toString(16).padStart(6, '0')}] MOVE.W #0x${imm.toString(16).padStart(4, '0')}, D${reg}  3${reg}3C ${imm.toString(16).padStart(4, '0')}`);
    pc += 4;
    continue;
  }

  // MOVE.L #xxx, Dn  2n3C
  if ((op & 0xF1FF) === 0x203C) {
    const reg = (op >> 9) & 7;
    const imm = readLong(pc + 2);
    console.log(`[${pc.toString(16).padStart(6, '0')}] MOVE.L #0x${imm.toString(16).padStart(8, '0')}, D${reg}  2${reg}3C ${imm.toString(16).padStart(8, '0')}`);
    pc += 6;
    continue;
  }

  // LEA (xxx).L, An  4nF9
  if ((op & 0xF1FF) === 0x41F9) {
    const reg = (op >> 9) & 7;
    const addr = readLong(pc + 2);
    console.log(`[${pc.toString(16).padStart(6, '0')}] LEA 0x${addr.toString(16).padStart(8, '0')}, A${reg}  4${reg}F9 ${addr.toString(16).padStart(8, '0')}`);
    pc += 6;
    continue;
  }

  // MOVE.W Dn, (xxx).L  3nF9
  if ((op & 0xF1FF) === 0x30F9) {
    const reg = (op >> 9) & 7;
    const addr = readLong(pc + 2);
    console.log(`[${pc.toString(16).padStart(6, '0')}] MOVE.W D${reg}, (0x${addr.toString(16).padStart(8, '0')}).L  3${reg}F9 ${addr.toString(16).padStart(8, '0')}`);
    // 检查是不是写 VDP 数据端口 (0xC00004)
    if ((addr & 0xFFFFFF) === 0xC00004) {
      // 可能是 CRAM/VRAM 写入，往前找 VDP 控制端口写入
      cramWrites.push({ addr: pc, dataReg: reg });
    }
    pc += 6;
    continue;
  }

  // MOVEM.L  48E7 / 4CDF
  if (op === 0x48E7 || op === 0x4CDF) {
    const mask = readWord(pc + 2);
    const dir = op === 0x48E7 ? '-(A7)' : '(A7)+';
    console.log(`[${pc.toString(16).padStart(6, '0')}] MOVEM.L ${dir}, ${mask.toString(16).padStart(4, '0')}  ${opStr} ${mask.toString(16).padStart(4, '0')}`);
    pc += 4;
    continue;
  }

  // RTS  4E75
  if (op === 0x4E75) {
    console.log(`[${pc.toString(16).padStart(6, '0')}] RTS  4E75`);
    pc += 2;
    continue;
  }

  // 其他指令，只打印原始 hex
  console.log(`[${pc.toString(16).padStart(6, '0')}] ???  ${opStr}`);
  pc += 2;
}

// ============================================================
// 汇总资源加载调用
// ============================================================
console.log('\n\n=== 资源加载调用汇总 (JSR 0x99b2) ===\n');
console.log(`共找到 ${calls.length} 个调用:\n`);

for (const call of calls) {
  const d0 = call.d0 || 0;
  const a1 = call.a1 || 0;

  let entryInfo = '';
  let sizeInfo = '';
  let typeInfo = '';

  if (d0 & 0x8000) {
    const shift = d0 & 0x3F;
    const entry = (d0 & 0x7FFF) >> shift;
    entryInfo = `entry ${entry}`;

    try {
      const ptr = readLong(RESOURCE_POINTER_TABLE_BASE + entry * 4);
      const typeByte = rom.readByte(ptr);
      typeInfo = `type=${typeByte}`;

      let result;
      if (typeByte === 3) {
        result = decompressLZSS(rom, ptr);
        typeInfo += ' (LZSS)';
      } else if (typeByte === 1) {
        result = decompressNibbleRLE(rom, ptr);
        typeInfo += ' (NibbleRLE)';
      }
      if (result) {
        sizeInfo = `${result.size}B (${(result.size / 32).toFixed(0)} tiles)`;
      }
    } catch (e) {
      typeInfo = 'error';
    }
  }

  console.log(`  [0x${call.addr.toString(16).padStart(6, '0')}] ` +
    `D0=0x${d0.toString(16).padStart(4, '0')}  ` +
    `A1=0x${a1.toString(16).padStart(4, '0')}  ` +
    `${entryInfo}  ${typeInfo}  ${sizeInfo}`);
}

console.log('\n=== 分析完成 ===');
