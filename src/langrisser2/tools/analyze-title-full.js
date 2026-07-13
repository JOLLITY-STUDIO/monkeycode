/**
 * 全面分析标题画面资源
 *
 * 1. 搜索所有 JSR 0x99b2 调用中，调用者在 0xC800-0xCC00 范围内的
 * 2. 搜索 FUN_0000c9a0 - 0xCC00 中所有写 VDP 端口的指令
 * 3. 识别 CRAM 加载、tile 加载、nametable 加载
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

console.log('=== 标题画面资源全面分析 ===\n');

// ============================================================
// 1. 搜索 ROM 中所有 JSR 0x99b2 调用
// ============================================================
console.log('1. 所有 JSR 0x99b2 调用 (D0=资源ID, A1=VDP目标):\n');

const allCalls = [];
for (let i = 0; i < romData.length - 6; i++) {
  if (romData[i] === 0x4E && romData[i + 1] === 0xB9) {
    const target = readLong(i + 2);
    if (target === 0x000099b2) {
      // 回溯 D0 和 A1
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

// 筛选标题画面区域 (0xC800 - 0xCC00)
const titleCalls = allCalls.filter(c => c.addr >= 0xC800 && c.addr <= 0xCC00);

console.log(`   共找到 ${allCalls.length} 个调用，其中 ${titleCalls.length} 个在标题画面区域 (0xC800-0xCC00):\n`);

for (const call of titleCalls) {
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

  console.log(`   [0x${call.addr.toString(16).padStart(6, '0')}] ` +
    `D0=0x${d0.toString(16).padStart(4, '0')}  ` +
    `A1=0x${a1.toString(16).padStart(4, '0')}  ` +
    `${entryInfo}  ${typeInfo}  ${sizeInfo}`);
}

// ============================================================
// 2. 找出标题画面相关函数中调用的所有函数
// ============================================================
console.log('\n\n2. FUN_0000c9a0 - 0xCB00 调用的所有函数:\n');

const calledFuncs = new Map();
for (let i = 0xC9A0; i < 0xCB00; i++) {
  if (romData[i] === 0x4E && romData[i + 1] === 0xB9) {
    const target = readLong(i + 2);
    if (!calledFuncs.has(target)) {
      calledFuncs.set(target, []);
    }
    calledFuncs.get(target).push(i);
  }
}

for (const [target, addrs] of calledFuncs.entries()) {
  const addrList = addrs.map(a => '0x' + a.toString(16).padStart(6, '0')).join(', ');
  console.log(`   0x${target.toString(16).padStart(8, '0')}  (${addrs.length} calls: ${addrList})`);
}

// ============================================================
// 3. 搜索 VDP 控制端口写入 (0xC00004)
// ============================================================
console.log('\n\n3. 标题画面代码中的 VDP 端口写入:\n');

// 搜索 MOVE.W #xxx, (0xC00004).L  (33FC xxxx 00C0 0004)
// 以及 MOVE.W Dn, (0xC00004).L    (3nF9 00C0 0004)
const vdpWrites = [];
for (let i = 0xC9A0; i < 0xCC00; i++) {
  // MOVE.W #imm, (0xC00004).L  → 33FC xxxx 00C0 0004
  if (romData[i] === 0x33 && romData[i + 1] === 0xFC) {
    const imm = readWord(i + 2);
    const addr = readLong(i + 4);
    if (addr === 0x00C00004) {
      vdpWrites.push({ addr: i, type: 'CTRL_IMM', value: imm });
    }
    i += 7;
    continue;
  }
  // MOVE.W Dn, (0xC00004).L  → 3nF9 00C0 0004
  if ((romData[i] & 0xF1) === 0x30 && romData[i + 1] === 0xF9) {
    const reg = (romData[i] >> 1) & 7;
    const addr = readLong(i + 2);
    if (addr === 0x00C00004) {
      vdpWrites.push({ addr: i, type: 'CTRL_REG', reg });
    }
    i += 5;
    continue;
  }
}

console.log(`   找到 ${vdpWrites.length} 个 VDP 控制端口写入:\n`);
for (const w of vdpWrites) {
  if (w.type === 'CTRL_IMM') {
    const val = w.value;
    // 判断是寄存器设置还是地址设置
    let desc = '';
    if (val & 0x8000) {
      const regNum = (val >> 8) & 0x1F;
      const regVal = val & 0xFF;
      desc = `VDP 寄存器 R${regNum} = 0x${regVal.toString(16).padStart(2, '0')}`;
    } else {
      const cd = (val >> 14) & 3;
      const addr = val & 0x3FFF;
      const typeMap = ['VRAM', '', 'CRAM', 'VSRAM'];
      desc = `VDP 地址设置: ${typeMap[cd]} 0x${addr.toString(16).padStart(4, '0')} (${val.toString(16)})`;
    }
    console.log(`   [0x${w.addr.toString(16).padStart(6, '0')}] MOVE.W #0x${w.value.toString(16).padStart(4, '0')}, (VDP_CTRL).L  ; ${desc}`);
  } else {
    console.log(`   [0x${w.addr.toString(16).padStart(6, '0')}] MOVE.W D${w.reg}, (VDP_CTRL).L`);
  }
}

// ============================================================
// 4. 搜索 CRAM 相关的设置
// ============================================================
console.log('\n\n4. CRAM 写入模式检测:\n');

// 找连续的: VDP_CTRL 设置 CRAM 地址，然后 VDP_DATA 写入颜色
// VDP_DATA = 0xC00000
for (let i = 0xC9A0; i < 0xCC00; i++) {
  if (romData[i] === 0x33 && romData[i + 1] === 0xFC) {
    const imm = readWord(i + 2);
    const addr = readLong(i + 4);
    if (addr === 0x00C00004 && (imm & 0xC000) === 0xC000) {
      // CRAM 地址设置
      const cramAddr = imm & 0x3FFF;
      console.log(`   [0x${i.toString(16).padStart(6, '0')}] CRAM 地址设置: 0x${cramAddr.toString(16)} (${imm.toString(16)})`);

      // 往后找 VDP_DATA 写入 (0xC00000)
      for (let j = i + 8; j < i + 64; j++) {
        if (romData[j] === 0x33 && romData[j + 1] === 0xFC) {
          const dataImm = readWord(j + 2);
          const dataAddr = readLong(j + 4);
          if (dataAddr === 0x00C00000) {
            console.log(`     → [0x${j.toString(16).padStart(6, '0')}] VDP_DATA = 0x${dataImm.toString(16).padStart(4, '0')} (颜色: R=${(dataImm>>1)&0xE} G=${(dataImm>>5)&0xE} B=${(dataImm>>9)&0xE})`);
          }
        }
      }
    }
  }
}

console.log('\n=== 分析完成 ===');
