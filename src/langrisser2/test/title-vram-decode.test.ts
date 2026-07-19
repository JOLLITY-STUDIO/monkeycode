/**
 * 单元测试: 标题画面花屏修复验证
 * 
 * 验证四项修复:
 * 1. Vram.readWordLE() 小端序字节读取
 * 2. Cram.toRGBA() Genesis 9-bit RGB 颜色提取
 * 3. Cram.getRGBA() 背景色索引正确性
 * 4. VdpChip.planeBAddr 地址计算
 * 
 * 运行: npx tsx test/title-vram-decode.test.ts
 */

import { Vram } from '../game/vdp/Vram';
import { Cram } from '../game/vdp/Cram';
import { VdpChip } from '../game/vdp/VdpChip';

let passed = 0;
let failed = 0;

function assert(condition: boolean, msg: string): void {
  if (condition) {
    passed++;
  } else {
    failed++;
    console.error(`  FAIL: ${msg}`);
  }
}

function assertEquals<T>(actual: T, expected: T, msg: string): void {
  if (actual === expected) {
    passed++;
  } else {
    failed++;
    console.error(`  FAIL: ${msg}\n    expected: ${expected}\n    actual:   ${actual}`);
  }
}

// ================================================================
// Test 1: Vram.readWordLE — 小端序字节读取
// ================================================================
console.log('\n=== Test 1: Vram.readWordLE() 小端序 ===');

{
  const vram = new Vram();
  
  // 模拟标题画面 nametable 数据: [lo, hi] 字节对
  // 第一个 entry: 字节 [4, 16] → Genesis word 0x1004 (tileIdx=4, palette=0)
  const raw = vram.getRawData();
  raw[0xC000] = 4;   // lo
  raw[0xC001] = 16;  // hi
  raw[0xC002] = 11;  // lo
  raw[0xC003] = 16;  // hi  → Genesis word 0x100B (tileIdx=11, palette=0)

  const word1 = vram.readWordLE(0xC000);
  const word2 = vram.readWordLE(0xC002);
  
  assertEquals(word1, 0x1004, 'readWordLE([4,16]) → 0x1004');
  assertEquals(word2, 0x100B, 'readWordLE([11,16]) → 0x100B');
  
  // 验证 Plane entry 解析结果
  const tileIdx1 = word1 & 0x07FF;
  const tileIdx2 = word2 & 0x07FF;
  assertEquals(tileIdx1, 4, 'Entry 1 tile index = 4');
  assertEquals(tileIdx2, 11, 'Entry 2 tile index = 11');
  
  const palette1 = (word1 >> 13) & 0x03;
  const palette2 = (word2 >> 13) & 0x03;
  assertEquals(palette1, 0, 'Entry 1 palette = 0');
  assertEquals(palette2, 0, 'Entry 2 palette = 0');

  // 对比例: readWord (大端序) 应该返回不同值
  const bigWord = vram.readWord(0xC000);
  assertEquals(bigWord, 0x0410, 'readWord([4,16]) 大端序 → 0x0410 (原始字节序)');
  
  // 确认 readWordLE ≠ readWord (修复前两者相同, 修复后不同)
  const wordLE = vram.readWordLE(0xC000);
  const wordBE = vram.readWord(0xC000);
  assert(wordLE !== wordBE, 'readWordLE ≠ readWord (修复后两者应有区别)');
}

// 测试 Plane B nametable 读取
{
  const vram = new Vram();
  const raw = vram.getRawData();
  
  // Plane B entry: 字节 [228, 105] → little-endian word = (105<<8)|228 = 0x69E4
  raw[0xE000] = 228;  // lo
  raw[0xE001] = 105;  // hi
  
  const word = vram.readWordLE(0xE000);
  assertEquals(word, 0x69E4, 'readWordLE([228,105]) → 0x69E4');
  
  const tileIdx = word & 0x07FF;
  assertEquals(tileIdx, 0x01E4, 'Plane B entry tile index = 0x01E4');
}

// ================================================================
// Test 2: Cram.toRGBA — Genesis 9-bit RGB 颜色提取
// ================================================================
console.log('\n=== Test 2: Cram.toRGBA() 颜色提取 ===');

{
  // game-old CRAM 格式: byte0 = B2B1B0 G2G1G0 R2R1, byte1 bit7 = R0
  // R = (word & 0x03) | ((word >> 13) & 0x04)
  // G = (word >> 2) & 0x07
  // B = (word >> 5) & 0x07
  //
  // 纯红: R=7, G=0, B=0 → word = 0x8003 (R0R1=11 in low 2 bits, R2=1 in bit15)
  const red = Cram.toRGBA(0x8003);
  assertEquals(red.r, 255, 'Red: R channel max');
  assertEquals(red.g, 0, 'Red: G channel = 0');
  assertEquals(red.b, 0, 'Red: B channel = 0');

  // 纯绿: R=0, G=7, B=0 → word = 0x001C (G at bits 2-4)
  const green = Cram.toRGBA(0x001C);
  assertEquals(green.r, 0, 'Green: R channel = 0');
  assertEquals(green.g, 255, 'Green: G channel max');
  assertEquals(green.b, 0, 'Green: B channel = 0');

  // 纯蓝: R=0, G=0, B=7 → word = 0x00E0 (B at bits 5-7)
  const blue = Cram.toRGBA(0x00E0);
  assertEquals(blue.r, 0, 'Blue: R channel = 0');
  assertEquals(blue.g, 0, 'Blue: G channel = 0');
  assertEquals(blue.b, 255, 'Blue: B channel max');

  // 白色: R=7, G=7, B=7 → word = 0x80FF
  const white = Cram.toRGBA(0x80FF);
  assertEquals(white.r, 255, 'White: R = 255');
  assertEquals(white.g, 255, 'White: G = 255');
  assertEquals(white.b, 255, 'White: B = 255');

  // 黑色: R=0, G=0, B=0 → 0x0000
  const black = Cram.toRGBA(0x0000);
  assertEquals(black.r, 0, 'Black: R = 0');
  assertEquals(black.g, 0, 'Black: G = 0');
  assertEquals(black.b, 0, 'Black: B = 0');
  
  // 填充位 (bit8-14, 即 byte1 的低 7 位) 不影响颜色
  const withPadding = Cram.toRGBA(0x7F00); // R=0, G=0, B=0, padding bits set
  assertEquals(withPadding.r, 0, 'Padding bits: R = 0');
  assertEquals(withPadding.g, 0, 'Padding bits: G = 0');
  assertEquals(withPadding.b, 0, 'Padding bits: B = 0');

  // 半红色: R=4, G=0, B=0 → word = 0x8000 (R2=1 in bit15, R0R1=00)
  const halfRed = Cram.toRGBA(0x8000);
  assertEquals(halfRed.r, 146, 'Half Red: R = 146 (4→8bit expansion)');
  assertEquals(halfRed.g, 0, 'Half Red: G = 0');
  assertEquals(halfRed.b, 0, 'Half Red: B = 0');
}

// 测试 CRAM 内部存储和加载
{
  const cram = new Cram();
  
  // 标题画面 CRAM 第一个颜色: 字节 [64, 0] → little-endian word = (0<<8)|64 = 0x0040
  // game-old 格式: R=0, G=0, B=2 (B 在 bit5-7, 0x0040 的 bit5=1)
  cram.setColor(0, 0x0040);
  const color = cram.getColor(0);
  assertEquals(color, 0x0040, 'CRAM color 0 = 0x0040');
  
  const rgba = Cram.toRGBA(color);
  assertEquals(rgba.r, 0, 'CRAM[0]: R = 0');
  assertEquals(rgba.g, 0, 'CRAM[0]: G = 0');
  assertEquals(rgba.b, (2 << 5) | (2 << 2) | (2 >> 1), 'CRAM[0]: B = 2→8bit');
}

// ================================================================
// Test 4: Cram.getRGBA — 背景色索引正确性
// ================================================================
console.log('\n=== Test 4: Cram.getRGBA() 背景色索引 ===');

{
  const cram = new Cram();
  
  // 设置 CRAM[0] 为背景色 (蓝色): 0x00E0 → R=0, G=0, B=7
  cram.setColor(0, 0x00E0);
  // 设置 CRAM[5] 为红色 (用于 palette 0 color 5): 0x8003
  cram.setColor(5, 0x8003);
  // 设置 CRAM[63] 为绿色 (作为另一个背景色候选): 0x001C
  cram.setColor(63, 0x001C);
  
  // 默认背景色索引为 0
  const rgbaDefaultBg = cram.getRGBA(0, 0);
  assertEquals(rgbaDefaultBg.r, 0, 'Default bg: R = 0');
  assertEquals(rgbaDefaultBg.g, 0, 'Default bg: G = 0');
  assertEquals(rgbaDefaultBg.b, 255, 'Default bg: B = 255');
  
  // 切换背景色索引到 63
  cram.setBackgroundColorIndex(63);
  const rgbaChangedBg = cram.getRGBA(0, 0);
  assertEquals(rgbaChangedBg.r, 0, 'Changed bg to idx 63: R = 0');
  assertEquals(rgbaChangedBg.g, 255, 'Changed bg to idx 63: G = 255');
  assertEquals(rgbaChangedBg.b, 0, 'Changed bg to idx 63: B = 0');
  
  // colorIndex 非 0 时使用指定调色板/颜色
  const rgbaColor5 = cram.getRGBA(0, 5);
  assertEquals(rgbaColor5.r, 255, 'Palette 0 color 5: R = 255');
  assertEquals(rgbaColor5.g, 0, 'Palette 0 color 5: G = 0');
  assertEquals(rgbaColor5.b, 0, 'Palette 0 color 5: B = 0');
  
  // 验证 VdpChip 写 reg $07 会同步背景色索引
  const vdp = new VdpChip();
  vdp.cram.setColor(7, 0x001C); // CRAM[7] 绿色
  vdp.writeRegister(0x07, 7);   // 背景色索引 = 7
  assertEquals(vdp.cram.getBackgroundColorIndex(), 7, 'VDP reg $07=7 → bgIdx=7');
  const rgbaFromReg = vdp.cram.getRGBA(0, 0);
  assertEquals(rgbaFromReg.g, 255, 'VDP reg $07 背景色正确应用');
}

// ================================================================
// Test 3: VdpChip.planeBAddr — Genesis 规格地址计算
// ================================================================
console.log('\n=== Test 3: VdpChip.planeBAddr 地址计算 ===');

{
  const vdp = new VdpChip();
  
  // 设置 reg $04 = 0x07 (标题画面值)
  vdp.writeRegister(0x04, 0x07);
  
  // 正确: 0x07 * 0x2000 = 0xE000
  assertEquals(vdp.planeBAddr, 0xE000, 'planeBAddr(reg[4]=0x07) = 0xE000');
  
  // Plane A 不变: reg $02 = 0x30 → 0x30 * 0x400 = 0xC000
  vdp.writeRegister(0x02, 0x30);
  assertEquals(vdp.planeAAddr, 0xC000, 'planeAAddr(reg[2]=0x30) = 0xC000');
  
  // 边界测试: reg[4]=0 → 0
  vdp.writeRegister(0x04, 0x00);
  assertEquals(vdp.planeBAddr, 0x0000, 'planeBAddr(reg[4]=0) = 0');
  
  // reg[4]=1 → 0x2000
  vdp.writeRegister(0x04, 0x01);
  assertEquals(vdp.planeBAddr, 0x2000, 'planeBAddr(reg[4]=1) = 0x2000');
  
  // reg[4]=3 → 0x6000 (3 bit 有效)
  vdp.writeRegister(0x04, 0x03);
  assertEquals(vdp.planeBAddr, 0x6000, 'planeBAddr(reg[4]=3) = 0x6000');
  
  // reg[4]=7 → 0xE000 (max 3-bit)
  vdp.writeRegister(0x04, 0x07);
  assertEquals(vdp.planeBAddr, 0xE000, 'planeBAddr(reg[4]=7) = 0xE000');
}

// ================================================================
// Test 5: VRAM 标题画面数据布局 (模拟真实场景)
// ================================================================
console.log('\n=== Test 4: 模拟标题画面 VRAM 布局 ===');

{
  const vram = new Vram();
  const raw = vram.getRawData();

  // 模拟 Plane A nametable 数据写入 (VRAM $C000)
  // TITLE_NAMETABLE_A 前几个字节: [4,16,  4,16,  4,16,  14,32,  11,16,  29,48, ...]
  const nametableA = new Uint8Array([
    4, 16, 4, 16, 4, 16, 14, 32, 11, 16, 29, 48, 4, 16, 14, 32,
    4, 16, 4, 16, 4, 16, 4, 16, 4, 16, 4, 16, 11, 16, 4, 16,
    21, 32, 6, 16, 12, 48, 4, 16, 12, 48, 4, 16, 12, 48, 14, 32,
  ]);
  vram.writeBytes(0xC000, nametableA);

  // 读取并验证 tile 索引
  const entries: number[] = [];
  for (let i = 0; i < 10; i++) {
    const word = vram.readWordLE(0xC000 + i * 2);
    entries.push(word & 0x07FF);
  }

  // 预期 tileIdx (从 TITLE_NAMETABLE_A 数据推导):
  // [4,16] → 0x1004 → tileIdx=4
  // [4,16] → tileIdx=4
  // [4,16] → tileIdx=4
  // [14,32] → (32<<8)|14=0x200E → tileIdx=14
  // [11,16] → (16<<8)|11=0x100B → tileIdx=11
  // [29,48] → (48<<8)|29=0x301D → tileIdx=29
  // [4,16] → tileIdx=4
  // [14,32] → tileIdx=14
  // [4,16] → tileIdx=4
  // [4,16] → tileIdx=4
  const expectedIdxs = [4, 4, 4, 14, 11, 29, 4, 14, 4, 4];
  for (let i = 0; i < 10; i++) {
    assertEquals(entries[i], expectedIdxs[i], `PlaneA entry[${i}] tileIdx = ${expectedIdxs[i]}`);
  }

  // 验证 tile 索引范围均在有效范围内 (0-2047)
  let maxTileIdx = 0;
  for (let i = 0; i < 1024 && i * 2 + 1 < nametableA.length; i++) {
    const word = vram.readWordLE(0xC000 + i * 2);
    // 跳过终止标记 0xFFFF
    if ((word & 0xFFFF) === 0xFFFF) break;
    const idx = word & 0x07FF;
    if (idx > maxTileIdx) maxTileIdx = idx;
    if (idx >= 2048) {
      console.error(`  Invalid tileIdx at entry ${i}: ${idx}`);
    }
  }
  console.log(`  PlaneA 最大 tile 索引: ${maxTileIdx}`);
  assert(maxTileIdx < 2048, 'PlaneA 所有 tile 索引在有效范围 (0-2047)');
}

// ================================================================
// 结果
// ================================================================
console.log(`\n${'='.repeat(60)}`);
console.log(`测试结果: ${passed} 通过, ${failed} 失败, ${passed + failed} 总计`);
if (failed > 0) {
  console.log(`❌ 有 ${failed} 项测试失败!`);
  process.exit(1);
} else {
  console.log('✅ 全部测试通过!');
}
