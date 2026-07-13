/**
 * 列出所有 JSR 0x99b2 调用及其资源详情
 * 然后我们可以从中找出标题画面相关的资源
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ArrayBufferRomReader, decompressLZSS, decompressNibbleRLE, RESOURCE_POINTER_TABLE_BASE } from '../dist/game/hw/resource.js';

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

console.log('=== 所有 JSR 0x99b2 调用详情 ===\n');

const allCalls = [];
for (let i = 0; i < romData.length - 6; i++) {
  if (romData[i] === 0x4E && romData[i + 1] === 0xB9) {
    const target = readLong(i + 2);
    if (target === 0x000099b2) {
      let d0 = null;
      let a1 = null;
      for (let back = i - 2; back > i - 160 && back >= 0; ) {
        const bop = readWord(back);
        if (bop === 0x303C && d0 === null) {
          d0 = readWord(back + 2);
        } else if (bop === 0x203C && d0 === null) {
          d0 = readLong(back + 2) & 0xFFFF;
        } else if (bop === 0x43F9 && a1 === null) {
          a1 = readLong(back + 2) & 0xFFFF;
        }
        back -= 2;
        if (d0 !== null && a1 !== null) break;
      }
      allCalls.push({ addr: i, d0, a1 });
    }
  }
}

console.log(`共找到 ${allCalls.length} 个调用\n`);
console.log('  # | 调用地址  | 资源ID  | VDP目标 | Entry | 类型 | 算法      | 大小  | Tiles | 区域');
console.log('----+-----------+---------+---------+-------+------+-----------+-------+-------+------');

const titleCalls = [];
let idx = 0;

for (const call of allCalls) {
  idx++;
  const d0 = call.d0 || 0;
  const a1 = call.a1 || 0;

  let entry = -1;
  let typeByte = -1;
  let algorithm = '-';
  let size = 0;

  if (d0 & 0x8000) {
    const shift = d0 & 0x3F;
    entry = (d0 & 0x7FFF) >> shift;

    try {
      const ptr = readLong(RESOURCE_POINTER_TABLE_BASE + entry * 4);
      typeByte = rom.readByte(ptr);

      if (typeByte === 3) {
        const result = decompressLZSS(rom, ptr);
        algorithm = 'LZSS';
        size = result.size;
      } else if (typeByte === 1) {
        const result = decompressNibbleRLE(rom, ptr);
        algorithm = 'NibbleRLE';
        size = result.size;
      } else {
        algorithm = `Type ${typeByte}`;
        size = rom.readWord(ptr + 1);
      }
    } catch (e) {
      algorithm = 'ERROR';
    }
  }

  const tiles = Math.floor(size / 32);

  // 判断区域
  let region = '';
  if (call.addr >= 0xC800 && call.addr <= 0xCC00) {
    region = '标题画面';
    titleCalls.push(call);
  } else if (call.addr >= 0x8000 && call.addr < 0xC800) {
    region = '系统/初始化';
  } else if (call.addr >= 0xCC00 && call.addr < 0x10000) {
    region = '部署界面';
  } else if (call.addr >= 0x10000 && call.addr < 0x18000) {
    region = '场景系统';
  } else if (call.addr >= 0x18000) {
    region = '战斗系统';
  } else {
    region = '其他';
  }

  const d0Str = d0 !== null ? '0x' + d0.toString(16).padStart(4, '0') : '?';
  const a1Str = a1 !== null ? '0x' + a1.toString(16).padStart(4, '0') : '?';
  const entryStr = entry >= 0 ? String(entry) : '?';
  const typeStr = typeByte >= 0 ? String(typeByte) : '?';

  console.log(
    `${String(idx).padStart(3)} | ` +
    `0x${call.addr.toString(16).padStart(6, '0')} | ` +
    `${d0Str.padEnd(7)} | ` +
    `${a1Str.padEnd(7)} | ` +
    `${entryStr.padEnd(5)} | ` +
    `${typeStr.padEnd(4)} | ` +
    `${algorithm.padEnd(9)} | ` +
    `${String(size).padEnd(5)} | ` +
    `${String(tiles).padEnd(5)} | ` +
    region
  );
}

console.log('\n\n=== 标题画面区域的调用 ===\n');
console.log(`共 ${titleCalls.length} 个:\n`);
for (const call of titleCalls) {
  console.log(`  0x${call.addr.toString(16).padStart(6, '0')}: ` +
    `D0=0x${(call.d0 || 0).toString(16).padStart(4, '0')}  ` +
    `A1=0x${(call.a1 || 0).toString(16).padStart(4, '0')}`);
}

console.log('\n=== 分析完成 ===');
