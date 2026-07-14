/**
 * 分析标题画面初始化代码调用链
 * 从 FUN_0000c80c (游戏主初始化) 开始追踪
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

// 简单反汇编: 查找 JSR/JMP 到资源加载函数 (0x99B2) 的地方
// 这样可以找到哪些地方调用了资源加载

console.log('=== 搜索调用 LoadResource (0x99B2) 的位置 ===\n');

const target = 0x000099b2;
const calls = [];

for (let i = 0; i < rom.length - 6; i += 2) {
  const op = readWord(i);
  // JSR $xxxxxx  (4EB9 xxxxxx)
  if (op === 0x4EB9) {
    const addr = readLong(i + 2);
    if (addr === target) {
      calls.push({ addr: i, type: 'JSR', target: addr });
    }
  }
  // BSR.W $xxxx (6100 xxxx)
  if (op === 0x6100) {
    const offset = readWord(i + 2);
    const targetAddr = i + 4 + (offset > 0x7fff ? offset - 0x10000 : offset);
    if (targetAddr === target) {
      calls.push({ addr: i, type: 'BSR.W', target: targetAddr });
    }
  }
}

console.log(`找到 ${calls.length} 处调用 LoadResource (0x99B2):`);
for (const c of calls.slice(0, 50)) {
  // 读取调用前的几个 word，看看 D0 被设置成什么 (资源 ID)
  let d0Value = null;
  for (let j = c.addr - 16; j < c.addr; j += 2) {
    if (j < 0) continue;
    const op2 = readWord(j);
    // MOVE.W #$xxxx, D0 (303C xxxx)
    if (op2 === 0x303C) {
      d0Value = readWord(j + 2);
      break;
    }
  }
  const d0Str = d0Value !== null ? `D0=0x${d0Value.toString(16)}` : 'D0=?';
  console.log(`  0x${c.addr.toString(16).padStart(6, '0')}: ${c.type} 0x${c.target.toString(16).padStart(6, '0')} (${d0Str})`);
}

// 特别关注 0xC800 - 0xCB00 区域 (标题画面附近)
console.log('\n=== 0xC800 - 0xCB00 区域的 LoadResource 调用 ===\n');

const titleCalls = calls.filter(c => c.addr >= 0x0000C800 && c.addr <= 0x0000CB00);
for (const c of titleCalls) {
  // 反汇编调用前后的代码
  console.log(`--- 0x${c.addr.toString(16).padStart(6, '0')} 附近代码 ---`);
  for (let j = c.addr - 32; j < c.addr + 16; j += 2) {
    if (j < 0) continue;
    const op = readWord(j);
    const marker = j === c.addr ? '→' : ' ';
    console.log(`${marker} 0x${j.toString(16).padStart(6, '0')}: ${op.toString(16).padStart(4, '0')}`);
  }
  console.log('');
}

// 搜索 0x8001 (资源 ID) 被加载的位置
console.log('=== 搜索 MOVE.W #$8001, D0 的位置 ===\n');

for (let i = 0; i < rom.length - 4; i += 2) {
  const op = readWord(i);
  if (op === 0x303C) { // MOVE.W #imm, D0
    const imm = readWord(i + 2);
    if (imm === 0x8001) {
      console.log(`  0x${i.toString(16).padStart(6, '0')}: MOVE.W #$8001, D0`);
      // 显示附近代码
      for (let j = i - 8; j < i + 16; j += 2) {
        if (j < 0) continue;
        const op2 = readWord(j);
        const marker = j === i ? '→' : ' ';
        console.log(`  ${marker} 0x${j.toString(16).padStart(6, '0')}: ${op2.toString(16).padStart(4, '0')}`);
      }
      console.log('');
    }
  }
}
