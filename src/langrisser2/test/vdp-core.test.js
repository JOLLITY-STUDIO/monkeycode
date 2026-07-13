/**
 * VDP 核心逻辑测试
 *
 * 验证内容:
 *   1. VDP 初始化 (寄存器初始值来自 ROM 0x80B2)
 *   2. VRAM 基址计算 (Plane A/B/Sprite)
 *   3. Tile 4bpp 解码
 *   4. Nametable 条目解析
 *
 * 数据源: execution-trace.md "第一部分附录: VDP 硬件结构与初始配置"
 *
 * 运行: node --experimental-vm-modules test/vdp-core.test.js
 * 或:    node test/vdp-core.test.js (CommonJS 兼容)
 */

import assert from 'assert';
import { pathToFileURL } from 'url';
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname.replace(/^\//, ''));
const root = path.resolve(__dirname, '..');

// 用 pathToFileURL 加载 ESM 模块 (Windows 兼容)
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

console.log('=== VDP 核心逻辑测试 ===\n');

const { VDP, VDP_INIT_REGS, planeABase, planeBBase, spriteTableBase } =
  await loadModule('dist/game/hw/vdp/vdp.js');

const { decodeTile, tileAddress, TILE_BYTES } =
  await loadModule('dist/game/hw/vdp/tile.js');

const { parseNameTableEntry } =
  await loadModule('dist/game/hw/vdp/plane.js');

// ============================================================
// VDP 寄存器初始值 (ROM 0x80B2)
// ============================================================
console.log('VDP 寄存器初始值 (ROM 0x80B2):');

await test('应有 24 个寄存器', () => {
  assert.strictEqual(VDP_INIT_REGS.length, 24);
});

await test('R0 = 0x04', () => {
  assert.strictEqual(VDP_INIT_REGS[0], 0x04);
});

await test('R2 = 0x30 (Plane A)', () => {
  assert.strictEqual(VDP_INIT_REGS[2], 0x30);
});

await test('R4 = 0x07 (Plane B)', () => {
  assert.strictEqual(VDP_INIT_REGS[4], 0x07);
});

await test('R5 = 0x6C (Sprite表)', () => {
  assert.strictEqual(VDP_INIT_REGS[5], 0x6C);
});

// ============================================================
// 基址计算
// ============================================================
console.log('\nVRAM 基址计算:');

await test('Plane A: R2=0x30 → 0xC000', () => {
  assert.strictEqual(planeABase(0x30), 0xC000);
});

await test('Plane B: R4=0x07 → 0xE000', () => {
  assert.strictEqual(planeBBase(0x07), 0xE000);
});

await test('Sprite: R5=0x6C → 0xD800', () => {
  assert.strictEqual(spriteTableBase(0x6C), 0xD800);
});

// ============================================================
// VDP 类
// ============================================================
console.log('\nVDP 类:');

await test('reset 加载初始寄存器', () => {
  const vdp = new VDP();
  vdp.reset();
  assert.strictEqual(vdp.regs[0], 0x04);
  assert.strictEqual(vdp.regs[2], 0x30);
});

await test('VRAM 读写', () => {
  const vdp = new VDP();
  vdp.reset();
  vdp.writeVRAM(0x1000, 0xAB);
  vdp.writeVRAM(0x1001, 0xCD);
  assert.strictEqual(vdp.readVRAM(0x1000), 0xAB);
  assert.strictEqual(vdp.readVRAMWord(0x1000), 0xABCD);
});

await test('CRAM 读写', () => {
  const vdp = new VDP();
  vdp.reset();
  vdp.writeCRAM(0, 0x0EEE);
  assert.strictEqual(vdp.readCRAM(0), 0x0EEE);
});

await test('H40 模式 = 320×224', () => {
  const vdp = new VDP();
  vdp.reset();
  assert.strictEqual(vdp.width, 320);
  assert.strictEqual(vdp.height, 224);
});

// ============================================================
// Tile 解码
// ============================================================
console.log('\nTile 4bpp 解码:');

await test('tile 地址 = index * 32', () => {
  assert.strictEqual(tileAddress(0), 0);
  assert.strictEqual(tileAddress(1), 32);
});

await test('全零 tile → 全零像素', () => {
  const vdp = new VDP();
  vdp.reset();
  const output = new Uint8Array(64);
  decodeTile(vdp.vram, 0, output, 0);
  for (let i = 0; i < 64; i++) {
    assert.strictEqual(output[i], 0);
  }
});

await test('全 FF tile → 全 15 像素', () => {
  const vdp = new VDP();
  vdp.reset();
  for (let i = 0; i < TILE_BYTES; i++) {
    vdp.writeVRAM(i, 0xFF);
  }
  const output = new Uint8Array(64);
  decodeTile(vdp.vram, 0, output, 0);
  for (let i = 0; i < 64; i++) {
    assert.strictEqual(output[i], 15);
  }
});

await test('单像素: plane0=0x80 → 像素(0,0)=1', () => {
  const vdp = new VDP();
  vdp.reset();
  vdp.writeVRAM(0, 0x80);
  const output = new Uint8Array(64);
  decodeTile(vdp.vram, 0, output, 0);
  assert.strictEqual(output[0], 1);
  assert.strictEqual(output[1], 0);
});

// ============================================================
// Nametable 解析
// ============================================================
console.log('\nNametable 条目解析:');

await test('基本: word=0x0001 → tile=1, palette=0', () => {
  const vdp = new VDP();
  vdp.reset();
  vdp.writeVRAM(0xC000, 0x00);
  vdp.writeVRAM(0xC001, 0x01);
  const entry = parseNameTableEntry(vdp.vram, 0xC000);
  assert.strictEqual(entry.tileIndex, 1);
  assert.strictEqual(entry.palette, 0);
  assert.strictEqual(entry.hFlip, false);
  assert.strictEqual(entry.priority, 0);
});

await test('优先级+调色板: word=0xE001', () => {
  const vdp = new VDP();
  vdp.reset();
  vdp.writeVRAM(0xC000, 0xE0);
  vdp.writeVRAM(0xC001, 0x01);
  const entry = parseNameTableEntry(vdp.vram, 0xC000);
  assert.strictEqual(entry.priority, 1);
  assert.strictEqual(entry.palette, 3);
  assert.strictEqual(entry.tileIndex, 1);
});

await test('H翻转: word=0x0801', () => {
  const vdp = new VDP();
  vdp.reset();
  vdp.writeVRAM(0xC000, 0x08);
  vdp.writeVRAM(0xC001, 0x01);
  const entry = parseNameTableEntry(vdp.vram, 0xC000);
  assert.strictEqual(entry.hFlip, true);
  assert.strictEqual(entry.tileIndex, 1);
});

// ============================================================
// 结果
// ============================================================
console.log('\n=== 测试结果 ===');
console.log(`通过: ${passed}, 失败: ${failed}`);
if (failed > 0) {
  process.exit(1);
}
