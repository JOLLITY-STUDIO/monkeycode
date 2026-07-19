/**
 * 资源解压系统验证 — 使用真实 ROM 数据测试 LZSS/NibbleRLE/Bitplane
 *
 * 验证内容:
 *  1. 资源指针表结构 (ROM $0B0000)
 *  2. LZSS 解压 (CompressType 0x03) — 对应 game/resource/Lzss.ts
 *  3. NibbleRLE 解压 (CompressType 0x01) — 对应 game/resource/NibbleRle.ts
 *  4. Bitplane 解压 (CompressType 0x02) — 对应 game/resource/Bitplane.ts
 *  5. RomProgram.decompressResource() 资源 ID 查找
 *  6. 资源 ID $8001 (title screen tiles) 解压验证
 *
 * 数据源: 20260713/Langrisser II (Japan).md
 *
 * 运行: node test/decompress.test.cjs
 */

'use strict';

const fs = require('fs');
const path = require('path');

// ============================================================
// 数据加载
// ============================================================
const ROM_PATH = path.join(__dirname, '..', '20260713', 'Langrisser II (Japan).md');
let rom;
try {
  rom = fs.readFileSync(ROM_PATH);
  console.log(`ROM 加载: ${rom.length} 字节`);
} catch (e) {
  console.error(`无法加载 ROM: ${ROM_PATH}`);
  console.error(`请确认 ROM 文件存在。`);
  process.exit(2);
}

// ============================================================
// 工具函数
// ============================================================
function read8(addr)  { return rom[addr]; }
function read16(addr) { return (rom[addr] << 8) | rom[addr + 1]; }
function read32(addr) { return ((rom[addr] << 24) | (rom[addr + 1] << 16) | (rom[addr + 2] << 8) | rom[addr + 3]) >>> 0; }
function h(v, pad)    { return v.toString(16).padStart(pad || 4, '0').toUpperCase(); }

// ============================================================
// 常量
// ============================================================
const RES_PTR_TABLE = 0x0B0000;
// 解压类型码 (来自 game/core/types.ts: CompressType)
const COMP_NIBBLE_RLE = 0x01;
const COMP_BITPLANE    = 0x02;
const COMP_LZSS        = 0x03;

// ============================================================
// LZSS 解压 (匹配 game/resource/Lzss.ts 修复后的逻辑)
//
// ROM 资源格式:
//   资源指针 → [type:1B] [outSize:2B big-endian] [LZSS stream...]
//   decompressResource() 在 ptr+1 (outSize 位置) 调用
//
// ★ 修复: offset=0 不是结束标记, 是自引用重复前一字节;
//   解压在 dst 达到 expectedSize 时自然停止
// ============================================================
function decompressLZSS(srcAddr, dstBuffer, dstOffset) {
  let src = srcAddr;
  let dst = dstOffset || 0;

  // ★ 格式: [解压后大小:2B big-endian] [LZSS 压缩流]
  const expectedSize = read16(src);
  src += 2;

  // LZSS 解压循环 — 以 expectedSize 为终止条件
  while (dst - (dstOffset || 0) < expectedSize) {
    if (src >= rom.length) break;
    const flags = read8(src);
    src++;

    for (let bit = 0; bit < 8; bit++) {
      if (dst - (dstOffset || 0) >= expectedSize) break;

      if ((flags >> bit) & 1) {
        // bit=1 → literal byte
        if (src >= rom.length) break;
        dstBuffer[dst] = read8(src);
        src++;
        dst++;
      } else {
        // bit=0 → back-reference
        if (src >= rom.length) break;
        const b0 = read8(src); src++;
        if (src >= rom.length) break;
        const b1 = read8(src); src++;

        const offset = ((b1 & 0x0F) << 8) | b0;
        let length = (b1 >> 4) + 3; // MIN_MATCH = 3

        if (offset === 0) {
          // ★ offset=0 → 自引用: 重复前一个字节
          const repeatByte = dst > 0 ? dstBuffer[dst - 1] : 0;
          for (let i = 0; i < length && dst - (dstOffset || 0) < expectedSize; i++) {
            dstBuffer[dst] = repeatByte;
            dst++;
          }
        } else {
          const srcPos = dst - offset;
          for (let i = 0; i < length && dst - (dstOffset || 0) < expectedSize; i++) {
            if (srcPos + i < dst) {
              dstBuffer[dst] = dstBuffer[srcPos + i];
            } else {
              dstBuffer[dst] = 0;
            }
            dst++;
          }
        }
      }
    }
  }
  return dst - (dstOffset || 0);
}

// ============================================================
// NibbleRLE 解压 (复制 game/resource/NibbleRle.ts 核心算法)
// ============================================================
function decompressNibbleRLE(srcAddr, dstBuffer, dstOffset) {
  let src = srcAddr;
  let dst = dstOffset || 0;

  const initialCount = read8(src);
  src++;

  let counter = initialCount;

  while (true) {
    if (counter === 0xFF) break;

    const cmdByte = read8(src);
    src++;

    const hi = (cmdByte >> 4) & 0x0F;
    const lo = cmdByte & 0x0F;
    const run = lo === 0 ? 16 : lo;

    if (hi === 0x00) {
      // 直接复制 run bytes
      for (let i = 0; i < run && counter > 0; i++) {
        if (dst < dstBuffer.length) dstBuffer[dst] = read8(src);
        src++;
        dst++;
        counter--;
      }
    } else if (hi >= 0x01 && hi <= 0x07) {
      // RLE: 读 1 byte → repeat
      const dataByte = read8(src);
      src++;
      const nibLo = dataByte & 0x0F;
      const nibHi = (dataByte >> 4) & 0x0F;
      for (let i = 0; i < run && counter > 0; i++) {
        if (dst < dstBuffer.length) dstBuffer[dst] = (nibHi << 4) | nibLo;
        dst++;
        counter--;
      }
    } else {
      // hi >= 8: 读 run bytes 直接写入
      for (let i = 0; i < run && counter > 0; i++) {
        if (dst < dstBuffer.length) dstBuffer[dst] = read8(src);
        src++;
        dst++;
        counter--;
      }
    }

    if (counter <= 0) {
      const nextCounter = read8(src);
      src++;
      if (nextCounter === 0xFF) break;
      counter = nextCounter;
    }
  }
  return dst - dstOffset;
}

// ============================================================
// Bitplane 解压 (复制 game/resource/Bitplane.ts 核心算法)
// ============================================================
function decompressBitplane(srcAddr, dstBuffer, dstOffset, planeCount) {
  let src = srcAddr;
  let dst = dstOffset || 0;
  const planes = planeCount || 4;

  // 读取每个 plane 的 size
  const planeSizes = [];
  for (let p = 0; p < planes; p++) {
    planeSizes.push(read16(src));
    src += 2;
  }

  // 解压每个 plane
  for (let p = 0; p < planes; p++) {
    const planeSize = planeSizes[p];
    const planeStart = src;

    let pos = 0;
    while (pos < planeSize && src < rom.length) {
      const cmd = read8(src);
      src++;
      const isRLE = (cmd & 0x80) !== 0;
      const run = (cmd & 0x7F) + 1;

      if (isRLE) {
        // RLE: 读取 value 重复 run 次
        src++; // skip the value byte
        pos += run;
      } else {
        // 直接: 复制 run bytes
        src += run;
        pos += run;
      }
    }

    src = planeStart + planeSize; // 跳到下一个 plane
  }

  // 返回解压后大小 (plane data 重组后)
  return 0; // 暂时返回 0, 因为 bitplane 重组逻辑未完全实现
}

// ============================================================
// RomProgram.decompressResource() 简化版
// ============================================================
function decompressResource(resId, destAddr) {
  const index = resId & 0x0FFF;
  const ptrAddr = RES_PTR_TABLE + index * 4;
  const ptr = read32(ptrAddr);

  if (ptr === 0 || ptr < 0xB0000 || ptr >= rom.length) {
    console.log(`  资源 index=${index} ptr=0x${h(ptr)} → 无效`);
    return 0;
  }

  const typeByte = read8(ptr);
  const compressedDataAddr = ptr + 1;

  // 用 64KB 缓冲区 (足够容纳任何解压资源)
  const buffer = new Uint8Array(0x10000);
  let outSize = 0;

  switch (typeByte) {
    case COMP_LZSS:
      outSize = decompressLZSS(compressedDataAddr, buffer, 0);
      break;
    case COMP_NIBBLE_RLE:
      outSize = decompressNibbleRLE(compressedDataAddr, buffer, 0);
      break;
    case COMP_BITPLANE:
      outSize = decompressBitplane(compressedDataAddr, buffer, 0);
      break;
    default:
      console.log(`  未知压缩类型: 0x${typeByte.toString(16)}`);
      return 0;
  }

  // 复制到目标 RAM 缓冲区
  if (destAddr !== undefined) {
    // (在实际使用中, 数据写入 destAddr)
  }

  return outSize;
}

// ============================================================
// 测试框架
// ============================================================
let passed = 0;
let failed = 0;
const failures = [];

function assert(condition, label) {
  if (condition) { passed++; return true; }
  else { failed++; failures.push(label); console.log(`  ✗ ${label}`); return false; }
}

// ============================================================
// 测试用例
// ============================================================

console.log('═══════════════════════════════════════════');
console.log('  资源解压系统测试 — Langrisser II ROM');
console.log('═══════════════════════════════════════════\n');

// --- 1. 资源指针表结构 ---
console.log('[1] 资源指针表 (ROM $0B0000):');

testPtrTable: {
  assert(RES_PTR_TABLE === 0x0B0000, '资源表基址 = $0B0000');

  // Entry 0
  const e0ptr = read32(RES_PTR_TABLE + 0);
  assert(e0ptr >= 0xB0000 && e0ptr < rom.length, `entry 0: $${h(e0ptr)}`);

  // Entry 1
  const e1ptr = read32(RES_PTR_TABLE + 4);
  assert(e1ptr >= 0xB0000 && e1ptr < rom.length, `entry 1: $${h(e1ptr)}`);

  // Entry 1 类型
  const e1type = read8(e1ptr);
  console.log(`    entry 1 type=0x${e1type.toString(16)} at $${h(e1ptr)}`);

  // Entry 2
  const e2ptr = read32(RES_PTR_TABLE + 8);
  assert(e2ptr >= 0xB0000 && e2ptr < rom.length, `entry 2: $${h(e2ptr)}`);

  // 前 100 个资源的类型分布
  let lzssCount = 0, nrleCount = 0, bpCount = 0, otherCount = 0;
  for (let i = 0; i < 100; i++) {
    const p = read32(RES_PTR_TABLE + i * 4);
    if (p > 0 && p < rom.length) {
      const t = read8(p);
      if (t === COMP_LZSS) lzssCount++;
      else if (t === COMP_NIBBLE_RLE) nrleCount++;
      else if (t === COMP_BITPLANE) bpCount++;
      else otherCount++;
    }
  }
  console.log(`    前 100 条目: LZSS=${lzssCount} NibbleRLE=${nrleCount} Bitplane=${bpCount} 其他=${otherCount}`);
  assert(lzssCount > 0 || nrleCount > 0 || bpCount > 0, '至少有一些已知类型');
}

// --- 2. LZSS 解压 ---
console.log('\n[2] LZSS 解压 (TYPE 0x03):');

testLzssDecompress: {
  // 找一个 LZSS 资源
  let lzssPtr = 0;
  for (let i = 0; i < 200; i++) {
    const p = read32(RES_PTR_TABLE + i * 4);
    if (p > 0 && p < rom.length && read8(p) === COMP_LZSS) {
      lzssPtr = p;
      break;
    }
  }

  if (lzssPtr > 0) {
    console.log(`    测试资源: $${h(lzssPtr)} type=LZSS`);

    const buffer = new Uint8Array(0x10000);
    const size = decompressLZSS(lzssPtr + 1, buffer, 0);
    console.log(`    解压大小: ${size} 字节`);

    assert(size > 0, `LZSS 解压大小 > 0 (${size})`);
    assert(size < buffer.length, `LZSS 解压 < 64KB (${size})`);

    // 验证解压数据非全零
    let allZero = true;
    for (let i = 0; i < Math.min(size, 100); i++) {
      if (buffer[i] !== 0) { allZero = false; break; }
    }
    assert(!allZero, '解压数据非全零 (前100字节)');
  } else {
    console.log('    未找到 LZSS 资源 (跳过)');
  }
}

// --- 3. 资源 $8001 (标题画面 tiles) 解压 ---
console.log('\n[3] ★ 资源 $8001 (标题画面 tiles, ROM $C91E):');

testResource8001: {
  // ROM $C91E 调用 loadResource($8001), 对应 index=1
  const resId = 0x8001;
  const index = resId & 0x0FFF;
  assert(index === 1, '资源 $8001 → index=1');

  const ptr = read32(RES_PTR_TABLE + index * 4);
  console.log(`    指针: $${h(ptr)}`);

  if (ptr > 0 && ptr < rom.length) {
    const typeByte = read8(ptr);
    console.log(`    类型: 0x${typeByte.toString(16)}`);

    // 尝试验证该资源确实存在于压缩图形区
    const inGfxRegion = (ptr >= 0xB8000 && ptr <= 0x1DBFFF);
    console.log(`    在压缩图形区 (0xB8000-0x1DBFFF): ${inGfxRegion}`);

    // 解压
    const size = decompressResource(resId);
    console.log(`    解压大小: ${size} 字节`);

    if (size === 0 || size === 1) {
      console.log(`    ⚠ 警告: 资源 $8001 解压大小异常! 标题画面将显示空白 (当前观察到的症状)`);
      // 这将解释为什么用户看到空白屏幕
    }
    assert(size > 1, `资源 $8001 解压应大于 1 字节 (实际=${size})`);

    // 如果是 LZSS, 打印压缩数据头几字节
    if (typeByte === COMP_LZSS) {
      const dataStart = ptr + 1;
      const header = [];
      for (let i = 0; i < Math.min(16, rom.length - dataStart); i++) {
        header.push(h(read8(dataStart + i), 2));
      }
      console.log(`    压缩头: ${header.join(' ')}`);
    }
  } else {
    console.log('    资源指针无效 (跳过)');
  }
}

// --- 4. NibbleRLE 解压 ---
console.log('\n[4] NibbleRLE 解压 (TYPE 0x01):');

testNibbleRLE: {
  let nrlePtr = 0;
  for (let i = 0; i < 300; i++) {
    const p = read32(RES_PTR_TABLE + i * 4);
    if (p > 0 && p < rom.length && read8(p) === COMP_NIBBLE_RLE) {
      nrlePtr = p;
      break;
    }
  }

  if (nrlePtr > 0) {
    console.log(`    测试资源: $${h(nrlePtr)} type=NibbleRLE`);

    const buffer = new Uint8Array(0x10000);
    const size = decompressNibbleRLE(nrlePtr + 1, buffer, 0);
    console.log(`    解压大小: ${size} 字节`);

    assert(size > 0, `NibbleRLE 解压大小 > 0 (${size})`);
  } else {
    console.log('    未找到 NibbleRLE 资源 (跳过)');
  }
}

// --- 5. 资源 ID 编码验证 ---
console.log('\n[5] 资源 ID 编码:');

testResourceIdEncoding: {
  // ROM $8000 系列资源: 高 4 bits = type hint, 低 12 bits = index
  assert((0x8001 & 0x0FFF) === 1, '$8001 → low 12 bits = 1');
  assert((0x8002 & 0x0FFF) === 2, '$8002 → low 12 bits = 2');
  assert((0x8040 & 0x0FFF) === 0x40, '$8040 → low 12 bits = 64');
  assert((0x8100 & 0x0FFF) === 0x100, '$8100 → low 12 bits = 256');

  // 验证 index=0 和 index=1 的资源不会冲突
  const i0 = read32(RES_PTR_TABLE + 0);
  const i1 = read32(RES_PTR_TABLE + 4);
  assert(i0 !== i1, 'index 0 != index 1');
}

// --- 6. 随机抽样验证 ---
console.log('\n[6] 随机抽样 — 前 50 项资源:');

testSample: {
  let decompressed = 0;
  let noData = 0;
  for (let i = 0; i < 50; i++) {
    const p = read32(RES_PTR_TABLE + i * 4);
    if (p === 0 || p >= rom.length) { noData++; continue; }

    const t = read8(p);
    if (t === COMP_LZSS || t === COMP_NIBBLE_RLE) {
      const sz = decompressResource(i | 0x8000);
      if (sz > 0) decompressed++;
    }
  }
  console.log(`    成功解压: ${decompressed} 项`);
  assert(decompressed > 0, '至少有一些资源可正常解压');
}

// --- 7. Bitplane 类型检查 ---
console.log('\n[7] Bitplane 资源 (TYPE 0x02):');

testBitplane: {
  let bpCount = 0;
  let firstBpPtr = 0;
  for (let i = 0; i < 500; i++) {
    const p = read32(RES_PTR_TABLE + i * 4);
    if (p > 0 && p < rom.length && read8(p) === COMP_BITPLANE) {
      bpCount++;
      if (firstBpPtr === 0) firstBpPtr = p;
    }
  }
  console.log(`    Bitplane 资源数: ${bpCount}`);
  if (firstBpPtr > 0) {
    console.log(`    第一个: $${h(firstBpPtr)}`);
    // 检查 bitplane 数据头 (plane sizes)
    const sizes = [];
    for (let p = 0; p < 4; p++) {
      sizes.push(read16(firstBpPtr + 1 + p * 2));
    }
    console.log(`    Plane sizes: ${sizes.map(s => h(s)).join(', ')}`);
  }
}

// ============================================================
// 总结
// ============================================================
const total = passed + failed;
console.log(`\n═══════════════════════════════════════════`);
console.log(`  资源解压测试: ${passed}/${total} 通过${failed > 0 ? `, ${failed} 失败` : ''}`);
console.log(`═══════════════════════════════════════════`);

if (failures.length > 0) {
  console.log('\n失败详情:');
  failures.forEach(f => console.log(`  - ${f}`));
}

if (passed === total) {
  console.log(`\n  ✓ 全部 ${total} 个测试通过`);
} else {
  console.log(`\n  ⚠ ${failed} 个测试不通过 — 可能导致运行时显示空白屏幕`);
  console.log(`\n  常见问题:`);
  console.log(`  - 资源 index 映射错误: decompressResource() 使用 (resId & 0x0FFF)`);
  console.log(`  - LZSS 第一字节检查 (0xFF) 可能不适用于所有资源`);
  console.log(`  - Bitplane 解压尚未完全实现 (返回 0)`);
}

process.exit(failed > 0 ? 1 : 0);
