/**
 * 搜索 ROM 中所有调用 FUN_000099b2 的地方
 * 并回溯 D0 (资源ID) 和 A1 (目标地址) 参数
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

console.log('=== 搜索所有 JSR 0x99b2 调用 ===\n');

const calls = [];

// 搜索 JSR (绝对长) 0x4EB9 000099B2
for (let i = 0; i < rom.length - 6; i++) {
  if (rom[i] === 0x4E && rom[i + 1] === 0xB9 &&
      rom[i + 2] === 0x00 && rom[i + 3] === 0x00 &&
      rom[i + 4] === 0x99 && rom[i + 5] === 0xB2) {
    calls.push({ addr: i, type: 'JSR.L' });
  }
}

console.log(`找到 ${calls.length} 个 JSR 0x99b2 调用\n`);

// 对每个调用，回溯找 D0 和 A1 的设置
for (const call of calls) {
  const { d0, a1, d0Info, a1Info } = backtrackParams(call.addr);

  console.log(`[0x${call.addr.toString(16).padStart(6, '0')}] JSR FUN_000099b2`);
  console.log(`    D0 = ${d0 !== null ? '0x' + d0.toString(16).padStart(4, '0') : '?'}  (${d0Info})`);
  console.log(`    A1 = ${a1 !== null ? '0x' + a1.toString(16).padStart(4, '0') : '?'}  (${a1Info})`);

  // 如果 D0 看起来像资源ID (0x8xxx)，计算 entry 索引
  if (d0 !== null && (d0 & 0x8000)) {
    const shift = d0 & 0x3F;
    const entry = (d0 & 0x7FFF) >> shift;
    const ptr = readLong(0x000B0000 + entry * 4);
    const typeByte = ptr < rom.length ? rom[ptr] : -1;
    let typeName = '?';
    let size = 0;
    if (typeByte === 1) typeName = 'Nibble RLE';
    else if (typeByte === 3) typeName = 'LZSS';
    else if (typeByte >= 0) typeName = `Type ${typeByte}`;
    if (typeByte >= 0 && ptr + 2 < rom.length) {
      size = (rom[ptr + 1] << 8) | rom[ptr + 2];
    }
    console.log(`    → 资源ID=0x${d0.toString(16)} → entry ${entry} → 0x${ptr.toString(16)} (${typeName}, ${size}B)`);
  }
  console.log('');
}

/**
 * 回溯参数设置
 */
function backtrackParams(callAddr) {
  let d0 = null;
  let a1 = null;
  let d0Info = '未找到';
  let a1Info = '未找到';

  // 回溯最多 100 字节
  let off = callAddr - 2;
  let steps = 0;
  const maxSteps = 60;

  while (off > callAddr - 120 && steps < maxSteps && (d0 === null || a1 === null)) {
    const op0 = rom[off];
    const op1 = rom[off + 1];
    const opcode = (op0 << 8) | op1;

    let instLen = 2;

    // MOVE.W #xxx, D0  0x303C
    if (op0 === 0x30 && op1 === 0x3C) {
      if (d0 === null) {
        d0 = readWord(off + 2);
        d0Info = `MOVE.W #0x${d0.toString(16)}, D0 @ 0x${off.toString(16)}`;
      }
      instLen = 4;
    }
    // MOVE.L #xxx, D0  0x203C
    else if (op0 === 0x20 && op1 === 0x3C) {
      if (d0 === null) {
        d0 = readLong(off + 2) & 0xFFFF; // 只看低16位
        d0Info = `MOVE.L #..., D0 (low=0x${d0.toString(16)}) @ 0x${off.toString(16)}`;
      }
      instLen = 6;
    }
    // MOVE.W #xxx, D1  0x323C (可能后面会 MOVE.W D1,A1)
    // 先不找了
    // LEA (xxx).L, A1  0x43F9
    else if (op0 === 0x43 && op1 === 0xF9) {
      if (a1 === null) {
        a1 = readLong(off + 2) & 0xFFFF;
        a1Info = `LEA #0x${a1.toString(16)}, A1 @ 0x${off.toString(16)}`;
      }
      instLen = 6;
    }
    // LEA (PC, d16), A1  0x43FA
    else if (op0 === 0x43 && op1 === 0xFA) {
      if (a1 === null) {
        const disp = readWord(off + 2);
        const target = off + 2 + (disp & 0x8000 ? disp - 0x10000 : disp);
        a1 = target & 0xFFFF;
        a1Info = `LEA (PC, ${disp}), A1 → 0x${a1.toString(16)} @ 0x${off.toString(16)}`;
      }
      instLen = 4;
    }
    // MOVE.W D1, A1  0x3241
    else if (op0 === 0x32 && op1 === 0x41) {
      if (a1 === null) {
        a1Info = `MOVE.W D1, A1 @ 0x${off.toString(16)} (D1 值未知)`;
      }
      instLen = 2;
    }
    // MOVE.L A1, D1  0x2209 - 不对
    // 找 D1 的设置，因为 FUN_0000c914 里是 MOVE.W D4, A1 (0xC91C 是 327C
    // 等等，0xC91C: 32 7C 00 00 → MOVE.W #0, A1? 不对，327C 不是 MOVE.W
    // 让我再看看...

    off -= instLen;
    steps++;
  }

  return { d0, a1, d0Info, a1Info };
}

console.log('=== 搜索完成 ===');
