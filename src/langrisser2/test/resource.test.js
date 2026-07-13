/**
 * 资源解压系统测试
 *
 * 验证内容:
 *   1. 资源指针表查找 (FUN_00009a0e)
 *   2. LZSS 解压 (FUN_00009dfe, type 3)
 *   3. Nibble RLE 解压 (FUN_00009a38, type 1)
 *   4. 通用资源加载 (FUN_000099b2)
 *
 * 数据源: ROM dump + execution-trace.md "资源加载系统完整分析"
 *
 * 运行: node --experimental-vm-modules test/resource.test.js
 */

import assert from 'assert';
import { pathToFileURL } from 'url';
import path from 'path';
import fs from 'fs';

const __dirname = path.dirname(new URL(import.meta.url).pathname.replace(/^\//, ''));
const root = path.resolve(__dirname, '..');

async function loadModule(relPath) {
  const absPath = path.resolve(root, relPath);
  return import(pathToFileURL(absPath).href);
}

let passed = 0;
let failed = 0;

function test(name, fn) {
  return Promise.resolve().then(fn).then(
    () => { console.log('  ✓ ' + name); passed++; },
    (err) => { console.log('  ✗ ' + name + '\n    ' + err.message); failed++; }
  );
}

// 加载 ROM dump
const romPath = path.resolve(root, '20260713/Langrisser II (Japan)_68K-gens-rom-dump.bin');
const romData = new Uint8Array(fs.readFileSync(romPath));

const {
  ArrayBufferRomReader,
  resolveResourcePointer,
  decompressLZSS,
  decompressNibbleRLE,
  dispatchByType,
  loadResource,
  RESOURCE_POINTER_TABLE_BASE,
  ResourceType,
} = await loadModule('dist/game/hw/resource.js');

const rom = new ArrayBufferRomReader(romData);

console.log('=== 资源解压系统测试 ===\n');

// ============================================================
// 1. 资源指针表
// ============================================================
console.log('资源指针表 (ROM 0x000B0000):');

await test('entry 0 指针 = 0x000B06B4', () => {
  const ptr = rom.readLong(RESOURCE_POINTER_TABLE_BASE + 0);
  assert.strictEqual(ptr, 0x000b06b4);
});

await test('entry 1 指针 = 0x000B0A84', () => {
  const ptr = rom.readLong(RESOURCE_POINTER_TABLE_BASE + 4);
  assert.strictEqual(ptr, 0x000b0a84);
});

// ============================================================
// 2. resolveResourcePointer (FUN_00009a0e)
// ============================================================
console.log('\n资源指针查找 (FUN_00009a0e):');

await test('资源ID 1 (D0=0x8001) → entry 0 → 0x000B06B4', () => {
  const ptr = resolveResourcePointer(rom, 0x0001, 0x8001);
  assert.strictEqual(ptr, 0x000b06b4);
});

await test('资源ID 2 (D0=0x8002) → shift=2 → entry 0 → 0x000B06B4', () => {
  // D2 = 0x8002, 移位计数 = 0x8002 & 0x3F = 2
  // D0 = 0x0002 >> 2 = 0 → entry 0
  // 资源ID编码: 低6位是移位量, 高位是索引左移后的值
  const ptr = resolveResourcePointer(rom, 0x0002, 0x8002);
  assert.strictEqual(ptr, 0x000b06b4);
});

await test('资源ID 0x0040 (D0=0x8040) → shift=0 → entry 0x40', () => {
  // D2 = 0x8040, 移位计数 = 0x40 & 0x3F = 0
  // D0 = 0x0040 >> 0 = 0x40 → entry 0x40 (字节偏移 0x100)
  // entry 0x40 = 0x000B0000 + 0x40 * 4 = 0x000B0100
  const expected = rom.readLong(RESOURCE_POINTER_TABLE_BASE + 0x40 * 4);
  const ptr = resolveResourcePointer(rom, 0x0040, 0x8040);
  assert.strictEqual(ptr, expected);
});

// ============================================================
// 3. LZSS 解压 (FUN_00009dfe, type 3)
// ============================================================
console.log('\nLZSS 解压 (FUN_00009dfe, type 3):');

await test('entry 0 首字节 = 0x03 (LZSS 类型码)', () => {
  const typeCode = rom.readByte(0x000b06b4);
  assert.strictEqual(typeCode, 0x03);
});

await test('entry 0 解压大小 = 1568 字节 (0x0620)', () => {
  const size = rom.readWord(0x000b06b4 + 1);
  assert.strictEqual(size, 0x0620);
  assert.strictEqual(size, 1568);
});

await test('LZSS 解压 entry 0 → 1568 字节', () => {
  const result = decompressLZSS(rom, 0x000b06b4);
  assert.strictEqual(result.size, 1568);
  assert.strictEqual(result.data.length, 1568);
  assert.strictEqual(result.type, ResourceType.LZSS);
});

await test('LZSS 解压后数据非全零', () => {
  const result = decompressLZSS(rom, 0x000b06b4);
  let allZero = true;
  for (let i = 0; i < result.data.length; i++) {
    if (result.data[i] !== 0) { allZero = false; break; }
  }
  assert.strictEqual(allZero, false, '解压后数据不应全为零');
});

await test('LZSS 解压后数据非全 0x20', () => {
  const result = decompressLZSS(rom, 0x000b06b4);
  let allSpace = true;
  for (let i = 0; i < result.data.length; i++) {
    if (result.data[i] !== 0x20) { allSpace = false; break; }
  }
  assert.strictEqual(allSpace, false, '解压后数据不应全为空格');
});

// 验证 LZSS 解压的前几个字节
await test('LZSS 解压首字节 = 0x00 (来自 flag bit0 literal)', () => {
  const result = decompressLZSS(rom, 0x000b06b4);
  assert.strictEqual(result.data[0], 0x00);
});

// ============================================================
// 4. dispatchByType (FUN_000099fa)
// ============================================================
console.log('\n类型分发 (FUN_000099fa):');

await test('entry 0 通过 dispatchByType 解压 → 1568 字节', () => {
  const result = dispatchByType(rom, 0x000b06b4);
  assert.strictEqual(result.size, 1568);
  assert.strictEqual(result.type, ResourceType.LZSS);
});

// ============================================================
// 5. loadResource (FUN_000099b2)
// ============================================================
console.log('\n通用资源加载 (FUN_000099b2):');

await test('loadResource D0=0x8001 → 1568 字节, DMA 开启', () => {
  const result = loadResource(rom, 0x8001);
  assert.strictEqual(result.size, 1568);
  assert.strictEqual(result.dmaEnabled, true);
});

await test('loadResource D0=0x0001 → 1568 字节, DMA 关闭', () => {
  const result = loadResource(rom, 0x0001);
  assert.strictEqual(result.size, 1568);
  assert.strictEqual(result.dmaEnabled, false);
});

// ============================================================
// 6. Nibble RLE 解压 (FUN_00009a38, type 1) - 简单自测试
// ============================================================
console.log('\nNibble RLE 解压 (FUN_00009a38, type 1) - 自测试:');

// 构造简单的 Nibble RLE 测试数据
// 类型码 0x01, 大小 = 4 字节 (2 个 word = 8 个 nibble)
// 压缩数据: nibble 序列 0,1,2,3,4,5,6,7 (无 RLE)
// 字节序列: 0x01 0x23 0x45 0x67 → nibbles: 0,1,2,3,4,5,6,7
// 输出 2 个 word: 0x0123, 0x4567
await test('Nibble RLE - 无 RLE 的简单序列', () => {
  const testRomData = new Uint8Array([
    0x01,       // 类型码
    0x00, 0x04, // 解压大小 = 4 字节
    0x01, 0x23, // nibbles: 0,1,2,3
    0x45, 0x67, // nibbles: 4,5,6,7
  ]);
  const testRom = new ArrayBufferRomReader(testRomData);
  const result = decompressNibbleRLE(testRom, 0);

  assert.strictEqual(result.size, 4);
  assert.strictEqual(result.type, ResourceType.NIBBLE_RLE);
  assert.strictEqual(result.data[0], 0x01); // word 0 高字节
  assert.strictEqual(result.data[1], 0x23); // word 0 低字节
  assert.strictEqual(result.data[2], 0x45); // word 1 高字节
  assert.strictEqual(result.data[3], 0x67); // word 1 低字节
});

// 测试 RLE: nibble 序列 0,0,0,0,1,2 (4 个 0 + 1 + 2)
// RLE 表示: 0, 0, 2 (nibble 0, 然后 RLE count=2 → 额外 3 个 0, 共 4 个 0)
// 然后 1, 2
// 字节序列:
//   字节 0: 0x00 (nibble 0,0) → 第一个 0 是普通, 第二个 0 触发 RLE
//   字节 1: 0x21 (nibble 2,1) → count=2, 然后 nibble 1
//   字节 2: 0x2? → nibble 2, 然后需要填充
// 等一下，让我重新推导...
//
// nibble 序列: [0] [0] [count=2] [1] [2] [?] [?] [?]
// 输出: 0, 0, 0, 0, 1, 2, ?, ? (共 8 nibbles = 2 words = 4 bytes)
//
// 不对，RLE 规则: 当前 nibble == 上一个 nibble 时，下一个 nibble 是 count
// 输出 count+1 个额外重复，总共 count+2 个
// count=2 → 额外 3 个，总共 4 个 0
//
// 压缩 nibble 流: 0, 0, 2, 1, 2, x, x, x (8 nibbles)
// 字节打包: 0x00 (0,0), 0x21 (2,1), 0x2x (2,x) → 只有 6 个 nibble
// 需要 8 个 nibble = 4 字节输出 = 2 words
//
// 让我构造更简单的测试: 输出 4 个相同的 nibble (0x0F)
// 输出 nibble 流: F, F, F, F, F, F, F, F (8 个 F)
// 压缩: F, F, 5 (count=5 → 额外 6 个，共 8 个 F)
// 压缩 nibble 流: F, F, 5, x, x, x, x, x
// 字节: 0xFF (F,F), 0x5x (5,x)
// 不对，只有 3 个 nibble...
//
// 让我简化: 输出 4 字节 = 8 nibbles = 2 words
// 测试数据: 全 F 输出
// 压缩: F, F, 5 (额外 6 个 F，总共 8 个 F)
// 压缩 nibble 流: F, F, 5 → 只有 3 个 nibble，但输出 8 个 nibble
// 字节: 0xFF (F,F), 0x5? (5,?) → 第 4 个 nibble 是什么？
//
// 实际上 RLE 后的 count 会消费一个 nibble，然后输出 count+1 个 nibble
// 所以从输入消费 2 个 nibble (标记 + count)，输出 count+1 个 nibble
//
// 让我做一个更简单的测试: 输出 2 字节 = 4 nibbles = 1 word
// 输出: 0, 0, 0, 0 (4 个 0)
// 压缩: 0, 0, 1 (额外 2 个 0，总共 4 个 0)
// 压缩 nibble 流: 0, 0, 1 → 3 个 nibble
// 字节: 0x00 (0,0), 0x1? (1,?) → 但我们只需要前 3 个 nibble
//
// 算了，先测简单无 RLE 的情况，后面再补 RLE 测试

await test('Nibble RLE - RLE 重复测试', () => {
  // 测试 RLE 算法基本逻辑
  // 构造: 全 F 的 word 0 + 0123 的 word 1
  // word 0 = 0xFFFF (4 个 F), word 1 = 0x0123
  //
  // RLE 编码:
  //   第 1 个 nibble: F (普通)
  //   第 2 个 nibble: F (触发 RLE, 不输出)
  //   count = 2 (RLE 输出 3 个 F)
  //   总共 F: 1 + 3 = 4 ✓
  //
  // 压缩 nibble 流: F, F, 2, 0, 1, 2, 3 (7 个 nibble)
  // 字节:
  //   byte 0: 0xFF (F, F)
  //   byte 1: 0x20 (2, 0)
  //   byte 2: 0x12 (1, 2)
  //   byte 3: 0x30 (3, 0)
  //
  // 注意: RLE 后 bVar3 不变 (仍是 true), 所以下一个普通 nibble
  // 从 bVar2 = !bVar3 = false 开始 (低 nibble)

  const testRomData = new Uint8Array([
    0x01,       // 类型码
    0x00, 0x04, // 解压大小 = 4 字节
    0xFF,       // 字节 0
    0x20,       // 字节 1
    0x12,       // 字节 2
    0x30,       // 字节 3
  ]);
  const testRom = new ArrayBufferRomReader(testRomData);
  const result = decompressNibbleRLE(testRom, 0);

  assert.strictEqual(result.size, 4);
  assert.strictEqual(result.data[0], 0xFF); // word 0 高字节
  assert.strictEqual(result.data[1], 0xFF); // word 0 低字节
  assert.strictEqual(result.data[2], 0x01); // word 1 高字节
  assert.strictEqual(result.data[3], 0x23); // word 1 低字节
});

// ============================================================
// 7. 真实 ROM 中的 Nibble RLE 资源
// ============================================================
console.log('\n真实 ROM 资源验证:');

// 查找 type 1 资源进行验证
// entry 1 → 0x000B0A84, 检查其类型
await test('entry 1 (0x000B0A84) 类型码检查', () => {
  const typeCode = rom.readByte(0x000b0a84);
  // 不确定类型，先打印出来
  console.log('    (info) entry 1 type = 0x' + typeCode.toString(16));
  assert.ok(typeCode >= 0 && typeCode <= 4, '类型码应在 0-4 之间');
});

// 测试 entry 1 如果是 type 1 或 type 3
await test('entry 1 dispatchByType 不抛异常', () => {
  const typeCode = rom.readByte(0x000b0a84);
  if (typeCode === 1 || typeCode === 3) {
    const result = dispatchByType(rom, 0x000b0a84);
    assert.ok(result.size > 0, '解压后大小应大于 0');
    console.log('    (info) entry 1 size = ' + result.size + ' bytes, type = ' + result.type);
  } else {
    console.log('    (info) entry 1 type = ' + typeCode + ', 跳过 (未实现)');
  }
});

// ============================================================
// 总结
// ============================================================
console.log('\n=== 测试结果 ===');
console.log(`通过: ${passed}, 失败: ${failed}`);

if (failed > 0) {
  process.exit(1);
}
