/**
 * 标题画面完整资源分析
 *
 * 通过追踪 FUN_0000c914 -> FUN_0000c9a0 -> FUN_0000ca00 任务链
 * 找出所有加载的资源，目标地址，以及调色板设置
 *
 * 方法:
 *   1. 在 ROM 中搜索所有 JSR 0x99b2 (资源加载函数) 的调用
 *   2. 筛选标题画面任务链附近的调用
 *   3. 提取 D0 (资源ID) 和 A1 (目标地址) 参数
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

// ============================================================
// 资源指针表 (ROM 0x000B0000)
// ============================================================
const RESOURCE_TABLE = 0x000B0000;
const RESOURCE_COUNT = 0xE8; // 232 个资源

function getResourceOffset(index) {
  if (index < 0 || index >= RESOURCE_COUNT) return -1;
  return r32(RESOURCE_TABLE + index * 4);
}

// ============================================================
// 搜索所有 JSR 0x99b2 调用
// ============================================================

function findAll99b2Calls() {
  const calls = [];
  
  for (let i = 0; i < romData.length - 6; i += 2) {
    // JSR ($000099b2).L = 0x4eb9 0000 99b2
    if (r16(i) === 0x4eb9 && r32(i + 2) === 0x000099b2) {
      calls.push({
        callAddr: i,
        contextAddr: i - 20 // 回溯 20 字节找参数
      });
    }
  }
  
  return calls;
}

// ============================================================
// 回溯提取 D0 和 A1 参数
// ============================================================

function extractParams(callAddr) {
  let d0 = null;     // 资源 ID
  let a1 = null;     // 目标地址
  let a1IsD0 = false; // A1 = D0 (资源 ID << 1 或什么的)
  
  // 回溯 40 字节
  for (let back = 2; back <= 40; back += 2) {
    const addr = callAddr - back;
    if (addr < 0) break;
    
    const op = r16(addr);
    
    // MOVE.L #imm, D0 = 0x203c xxxxxxxx
    if ((op & 0xfff8) === 0x203c && d0 === null) {
      d0 = r32(addr + 2);
      back += 4; // 跳过 32-bit 立即数
      continue;
    }
    
    // MOVE.W #imm, D0 = 0x303c xxxx
    if ((op & 0xfff8) === 0x303c && d0 === null) {
      d0 = r16(addr + 2);
      back += 2;
      continue;
    }
    
    // LEA (xxx).L, A1 = 0x43f9 xxxxxxxx
    if ((op & 0xfff8) === 0x43f8 && a1 === null) {
      a1 = r32(addr + 2);
      back += 4;
      continue;
    }
    
    // MOVE.L D0, D1 = 0x2200 (如果有这个，说明 D1 = D0)
    // MOVE.L Dn, An = 0x2240-0x227f (MOVEA.L Dn, An)
    if ((op & 0xffc0) === 0x2240 && a1 === null) {
      // MOVEA.L Dn, A1
      const srcReg = op & 7;
      if (srcReg === 0) {
        a1IsD0 = true;
      }
      continue;
    }
    
    // 找到设置 D0 或 A1 的指令就停止回溯
    if (d0 !== null && a1 !== null) break;
  }
  
  return { d0, a1, a1IsD0 };
}

// ============================================================
// 主程序
// ============================================================

console.log('=== 标题画面资源分析 ===\n');

// 1. 列出所有资源指针
console.log('资源指针表 (0x000B0000):');
for (let i = 0; i < RESOURCE_COUNT; i++) {
  const offset = getResourceOffset(i);
  if (offset > 0 && offset < romData.length) {
    // 计算资源大小 (下一个指针 - 当前指针)
    const nextOffset = i < RESOURCE_COUNT - 1 ? getResourceOffset(i + 1) : romData.length;
    const size = nextOffset - offset;
    
    // 检测压缩格式
    const header = r8(offset);
    let format = 'unknown';
    if (header === 0x00 || header === 0x01) format = 'LZSS';
    else if (header === 0x02 || header === 0x03) format = 'Nibble RLE';
    else if (header === 0xFF) format = 'Uncompressed';
    
    // 只显示非零大小的资源
    if (size > 0 && size < 0x100000) {
      console.log(`  [${i.toString().padStart(3, '0')}] 0x${offset.toString(16).padStart(6, '0')} - ${size.toString().padStart(6, ' ')}B  ${format}`);
    }
  }
}
console.log('');

// 2. 找出所有 JSR 0x99b2 调用
const allCalls = findAll99b2Calls();
console.log(`找到 ${allCalls.length} 个 JSR 0x99b2 调用\n`);

// 3. 筛选标题画面附近的调用 (0xC000 - 0xD000 范围)
console.log('标题画面区域 (0xC000-0xD000) 的资源加载调用:');
const titleCalls = allCalls.filter(c => c.callAddr >= 0xC000 && c.callAddr < 0xD000);

for (const call of titleCalls) {
  const params = extractParams(call.callAddr);
  console.log(`  [0x${call.callAddr.toString(16).padStart(6, '0')}] ` +
    `D0=${params.d0 !== null ? '0x' + params.d0.toString(16).padStart(4, '0') : '?'} ` +
    `A1=${params.a1 !== null ? '0x' + params.a1.toString(16).padStart(6, '0') : (params.a1IsD0 ? '=D0' : '?')}`);
  
  // 如果 D0 是资源 ID，解析一下
  if (params.d0 !== null && params.d0 >= 0x8000) {
    const index = (params.d0 - 0x8000) >> 1;
    const offset = getResourceOffset(index);
    const nextOffset = index < RESOURCE_COUNT - 1 ? getResourceOffset(index + 1) : romData.length;
    const size = nextOffset - offset;
    console.log(`         → 资源 ID 0x${params.d0.toString(16)} = entry ${index}, offset 0x${offset.toString(16)}, size ${size}B`);
  }
}
console.log('');

// 4. 找出 FUN_00010abe, FUN_00010fde 等调用的资源
console.log('=== FUN_00010abe 等函数内部的资源加载 ===\n');

const funcAddrs = [0x10abe, 0x10fde, 0x1105c, 0x110a8];

for (const funcAddr of funcAddrs) {
  console.log(`FUN_000${funcAddr.toString(16).toUpperCase()} 内的 JSR 0x99b2:`);
  
  const funcCalls = allCalls.filter(c => c.callAddr >= funcAddr && c.callAddr < funcAddr + 0x200);
  
  if (funcCalls.length === 0) {
    console.log('  (无)');
  }
  
  for (const call of funcCalls) {
    const params = extractParams(call.callAddr);
    console.log(`  [0x${call.callAddr.toString(16).padStart(6, '0')}] ` +
      `D0=${params.d0 !== null ? '0x' + params.d0.toString(16).padStart(4, '0') : '?'} ` +
      `A1=${params.a1 !== null ? '0x' + params.a1.toString(16).padStart(6, '0') : (params.a1IsD0 ? '=D0' : '?')}`);
    
    if (params.d0 !== null && params.d0 >= 0x8000) {
      const index = (params.d0 - 0x8000) >> 1;
      const offset = getResourceOffset(index);
      const nextOffset = index < RESOURCE_COUNT - 1 ? getResourceOffset(index + 1) : romData.length;
      const size = nextOffset - offset;
      console.log(`         → entry ${index}, offset 0x${offset.toString(16)}, size ${size}B`);
    }
  }
  console.log('');
}

// 5. 看看 FUN_0000a78c 是什么 (可能是调色板加载函数)
console.log('=== 分析 FUN_0000a78c (可能是调色板加载) ===\n');
console.log('FUN_0000a78c 地址: 0x0000A78C');
console.log('(可能是 CRAM 加载函数)');

// 看看调用 FUN_0000a78c 的地方
console.log('\n搜索调用 FUN_0000a78c 的地方:');
const a78cCalls = [];
for (let i = 0; i < romData.length - 6; i += 2) {
  if (r16(i) === 0x4eb9 && r32(i + 2) === 0x0000a78c) {
    a78cCalls.push(i);
  }
}
console.log(`找到 ${a78cCalls.length} 个调用`);
for (const addr of a78cCalls.slice(0, 20)) {
  console.log(`  0x${addr.toString(16).padStart(6, '0')}`);
}

console.log('\n=== 分析完成 ===');
