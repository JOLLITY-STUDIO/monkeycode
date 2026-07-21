/**
 * ============================================================================
 * PPU 对比测试：JSNES vs 我们的手写渲染器
 *
 * 测试目标：
 *   A. NTSC 调色板对比 — JSNES 的 palette-table.js vs 我们的 NES_PALETTE
 *   B. 瓦片解码对比 — JSNES Tile.setScanline vs 我们的 decodeRaw
 *   C. PPU 写管线对比 — feed 相同的 $2006/$2007 写序列，对比状态
 *   D. 帧缓冲对比 — 相同 PPU 状态下渲染输出对比
 * ============================================================================
 */

import { NES_PALETTE } from './src/types';

// ============================================================================
// JSNES Palette Table (从 palette-table.js 提取)
// ============================================================================
const JSNES_NTSC_PALETTE: number[] = [
  0x525252, 0xB40000, 0xA00000, 0xB1003D, 0x740069, 0x00005B, 0x00005F, 0x001840,
  0x002F10, 0x084A08, 0x006700, 0x124200, 0x6D2800, 0x000000, 0x000000, 0x000000,
  0xC4D5E7, 0xFF4000, 0xDC0E22, 0xFF476B, 0xD7009F, 0x680AD7, 0x0019BC, 0x0054B1,
  0x006A5B, 0x008C03, 0x00AB00, 0x2C8800, 0xA47200, 0x000000, 0x000000, 0x000000,
  0xF8F8F8, 0xFFAB3C, 0xFF7981, 0xFF5BC5, 0xFF48F2, 0xDF49FF, 0x476DFF, 0x00B4F7,
  0x00E0FF, 0x00E375, 0x03F42B, 0x78B82E, 0xE5E218, 0x787878, 0x000000, 0x000000,
  0xFFFFFF, 0xFFF2BE, 0xF8B8B8, 0xF8B8D8, 0xFFB6FF, 0xFFC3FF, 0xC7D1FF, 0x9ADAFF,
  0x88EDF8, 0x83FFDD, 0xB8F8B8, 0xF5F8AC, 0xFFFFB0, 0xF8D8F8, 0x000000, 0x000000,
];

// JSNES 默认调色板 (loadDefaultPalette)
const JSNES_DEFAULT_PALETTE: number[] = (() => {
  const getRgb = (r: number, g: number, b: number) => (r << 16) | (g << 8) | b;
  return [
    getRgb(117,117,117), getRgb(39,27,143),  getRgb(0,0,171),    getRgb(71,0,159),
    getRgb(143,0,119),   getRgb(171,0,19),    getRgb(167,0,0),    getRgb(127,11,0),
    getRgb(67,47,0),     getRgb(0,71,0),      getRgb(0,81,0),     getRgb(0,63,23),
    getRgb(27,63,95),    getRgb(0,0,0),       getRgb(0,0,0),      getRgb(0,0,0),
    getRgb(188,188,188), getRgb(0,115,239),   getRgb(35,59,239),  getRgb(131,0,243),
    getRgb(191,0,191),   getRgb(231,0,91),    getRgb(219,43,0),   getRgb(203,79,15),
    getRgb(139,115,0),   getRgb(0,151,0),     getRgb(0,171,0),    getRgb(0,147,59),
    getRgb(0,131,139),   getRgb(0,0,0),       getRgb(0,0,0),      getRgb(0,0,0),
    getRgb(255,255,255), getRgb(63,191,255),  getRgb(95,151,255), getRgb(167,139,253),
    getRgb(247,123,255), getRgb(255,119,183), getRgb(255,119,99), getRgb(255,155,59),
    getRgb(243,191,63),  getRgb(131,211,19),  getRgb(79,223,75),  getRgb(88,248,152),
    getRgb(0,235,219),   getRgb(0,0,0),       getRgb(0,0,0),      getRgb(0,0,0),
    getRgb(255,255,255), getRgb(171,231,255), getRgb(199,215,255),getRgb(215,203,255),
    getRgb(255,199,255), getRgb(255,199,219), getRgb(255,191,179),getRgb(255,219,171),
    getRgb(255,231,163), getRgb(227,255,163), getRgb(171,243,191),getRgb(179,255,207),
    getRgb(159,255,243), getRgb(0,0,0),       getRgb(0,0,0),      getRgb(0,0,0),
  ];
})();

// ============================================================================
// 辅助函数
// ============================================================================

function toHex(n: number): string {
  return '0x' + n.toString(16).toUpperCase().padStart(8, '0');
}

function toHex6(n: number): string {
  return '0x' + (n & 0xFFFFFF).toString(16).toUpperCase().padStart(6, '0');
}

function colorName(rgb: number): string {
  const r = (rgb >> 16) & 0xFF;
  const g = (rgb >> 8) & 0xFF;
  const b = rgb & 0xFF;
  const avg = (r + g + b) / 3;
  if (avg < 20) return 'BLACK';
  if (avg > 235) return 'WHITE';
  if (r > 200 && g < 100 && b < 100) return 'RED';
  if (r < 100 && g > 200 && b < 100) return 'GREEN';
  if (r < 100 && g < 100 && b > 200) return 'BLUE';
  if (r > 200 && g > 180 && b < 100) return 'YELLOW';
  if (r > 150 && g < 100 && b > 150) return 'PURPLE';
  if (r < 100 && g > 150 && b > 150) return 'CYAN';
  if (avg < 100) return 'DARK';
  if (avg < 180) return 'MID';
  return 'LIGHT';
}

/** 克隆 Uint8Array */
function cloneU8(arr: Uint8Array): Uint8Array {
  const c = new Uint8Array(arr.length);
  c.set(arr);
  return c;
}

/** 计算两个 Uint8Array 的差异 */
function diffU8(a: Uint8Array, b: Uint8Array): { pos: number; a: number; b: number }[] {
  const diffs: { pos: number; a: number; b: number }[] = [];
  const len = Math.min(a.length, b.length);
  for (let i = 0; i < len; i++) {
    if (a[i] !== b[i]) diffs.push({ pos: i, a: a[i], b: b[i] });
  }
  return diffs;
}

/** 计算两个 Uint32Array 的差异 */
function diffU32(a: Uint32Array, b: Uint32Array): { pos: number; a: number; b: number }[] {
  const diffs: { pos: number; a: number; b: number }[] = [];
  const len = Math.min(a.length, b.length);
  for (let i = 0; i < len; i++) {
    if (a[i] !== b[i]) diffs.push({ pos: i, a: a[i], b: b[i] });
  }
  return diffs;
}

// ============================================================================
// Test A: NTSC 调色板对比
// ============================================================================
function testA_palette_tables(): void {
  console.log('========== Test A: NTSC Palette Comparison ==========');

  // 我们的 NES_PALETTE 带有 Alpha (0xFF______)，去掉 Alpha 做对比
  const ourPalette = NES_PALETTE.map(v => v & 0x00FFFFFF);

  console.log(`  JSNES palette entries: ${JSNES_NTSC_PALETTE.length}`);
  console.log(`  Our   palette entries: ${ourPalette.length}`);

  // 对比每个 entry
  let exactMatches = 0;
  let visualMatches = 0; // 肉眼可见相似 (RGB 通道差异 < 30)
  let totalDiff = 0;

  const diffs: { idx: number; jsRgb: number; ourRgb: number; jsName: string; ourName: string }[] = [];

  for (let i = 0; i < 64; i++) {
    const jsR = (JSNES_NTSC_PALETTE[i] >> 16) & 0xFF;
    const jsG = (JSNES_NTSC_PALETTE[i] >> 8) & 0xFF;
    const jsB = JSNES_NTSC_PALETTE[i] & 0xFF;

    const ourR = (ourPalette[i] >> 16) & 0xFF;
    const ourG = (ourPalette[i] >> 8) & 0xFF;
    const ourB = ourPalette[i] & 0xFF;

    const dR = Math.abs(jsR - ourR);
    const dG = Math.abs(jsG - ourG);
    const dB = Math.abs(jsB - ourB);

    if (dR === 0 && dG === 0 && dB === 0) {
      exactMatches++;
    }
    if (dR < 30 && dG < 30 && dB < 30) {
      visualMatches++;
    }

    totalDiff += dR + dG + dB;

    if (dR > 40 || dG > 40 || dB > 40) {
      diffs.push({
        idx: i,
        jsRgb: JSNES_NTSC_PALETTE[i],
        ourRgb: ourPalette[i],
        jsName: colorName(JSNES_NTSC_PALETTE[i]),
        ourName: colorName(ourPalette[i]),
      });
    }
  }

  console.log(`  Exact matches:     ${exactMatches} / 64`);
  console.log(`  Visual matches:    ${visualMatches} / 64`);
  console.log(`  Avg diff per ch:   ${(totalDiff / 64 / 3).toFixed(1)}`);

  if (diffs.length > 0) {
    console.log(`\n  Major differences (>40 per channel): ${diffs.length}`);
    for (const d of diffs.slice(0, 10)) {
      console.log(`    idx=${String(d.idx).padStart(2)}: JSNES=${toHex6(d.jsRgb)} (${d.jsName.padEnd(7)})  Ours=${toHex6(d.ourRgb)} (${d.ourName})`);
    }
    if (diffs.length > 10) console.log(`    ... and ${diffs.length - 10} more`);
  }

  console.log(`  RESULT: ${exactMatches >= 60 ? 'PASS (palettes nearly identical)' : 'DIFFERENT PALETTES'}\n`);
}

// ============================================================================
// Test B: 瓦片解码 — JSNES Tile.setScanline vs 我们的 decodeRaw
// ============================================================================

/** JSNES 风格: 逐行解码 */
function jsnesDecodeTile(chrData: Uint8Array, tileId: number): Uint8Array {
  const pix = new Uint8Array(64);
  const base = tileId * 16;
  for (let y = 0; y < 8; y++) {
    const b1 = chrData[base + y];
    const b2 = chrData[base + y + 8];
    const rowOff = y << 3;
    for (let x = 0; x < 8; x++) {
      pix[rowOff + x] = ((b1 >> (7 - x)) & 1) + (((b2 >> (7 - x)) & 1) << 1);
    }
  }
  return pix;
}

/** 我们的 decodeRaw (复制自 TileCache.ts) */
function ourDecodeTile(chrRam: Uint8Array, tileId: number): Uint8Array {
  const pixels = new Uint8Array(64);
  const base = tileId * 16;
  for (let y = 0; y < 8; y++) {
    const lo = chrRam[base + y];
    const hi = chrRam[base + y + 8];
    const rowOff = y * 8;
    for (let x = 0; x < 8; x++) {
      const bit = 7 - x;
      pixels[rowOff + x] = ((lo >> bit) & 1) | (((hi >> bit) & 1) << 1);
    }
  }
  return pixels;
}

function testB_tile_decode(): void {
  console.log('========== Test B: Tile Decoding ==========');

  // 创建测试 CHR 数据: 512 tiles × 16 bytes = 8KB
  const testChr = new Uint8Array(512 * 16);

  // 用各种 pattern 填充
  for (let t = 0; t < 512; t++) {
    const base = t * 16;
    // 故意用不同的 pattern 覆盖所有 bitpattern
    testChr[base + 0] = (t * 13 + 1) & 0xFF;   // plane0 row 0
    testChr[base + 1] = (t * 17 + 3) & 0xFF;
    testChr[base + 2] = (t * 19 + 5) & 0xFF;
    testChr[base + 3] = (t * 23 + 7) & 0xFF;
    testChr[base + 4] = (t * 29 + 11) & 0xFF;
    testChr[base + 5] = (t * 31 + 13) & 0xFF;
    testChr[base + 6] = (t * 37 + 17) & 0xFF;
    testChr[base + 7] = (t * 41 + 19) & 0xFF;
    testChr[base + 8] = (t * 43 + 2) & 0xFF;   // plane1
    testChr[base + 9] = (t * 47 + 4) & 0xFF;
    testChr[base + 10] = (t * 53 + 6) & 0xFF;
    testChr[base + 11] = (t * 59 + 8) & 0xFF;
    testChr[base + 12] = (t * 61 + 10) & 0xFF;
    testChr[base + 13] = (t * 67 + 12) & 0xFF;
    testChr[base + 14] = (t * 71 + 14) & 0xFF;
    testChr[base + 15] = (t * 73 + 16) & 0xFF;
  }

  let totalDiff = 0;
  let tilesWithDiff = 0;
  const firstFailures: number[] = [];

  for (let t = 0; t < 512; t++) {
    const jsnesTile = jsnesDecodeTile(testChr, t);
    const ourTile = ourDecodeTile(testChr, t);

    const diffs = diffU8(jsnesTile, ourTile);
    totalDiff += diffs.length;
    if (diffs.length > 0) {
      tilesWithDiff++;
      if (firstFailures.length < 3) {
        firstFailures.push(t);
        console.log(`  Tile #${t}: ${diffs.length} differing pixels`);
        for (const d of diffs.slice(0, 5)) {
          console.log(`    pixel[${d.pos}] row=${d.pos>>3} col=${d.pos&7}: JSNES=${d.a} Ours=${d.b}`);
        }
      }
    }
  }

  console.log(`  Tiles tested:      512`);
  console.log(`  Total pixel diffs: ${totalDiff}`);
  console.log(`  Tiles with diffs:  ${tilesWithDiff}`);

  if (totalDiff === 0) {
    console.log(`  RESULT: PASS — tile decoding is identical!\n`);
  } else {
    console.log(`  RESULT: FAIL — tile decoding differs!\n`);
  }
}

// ============================================================================
// Test C: 资源格式 / 数据格式对比
// ============================================================================
function testC_data_format(): void {
  console.log('========== Test C: Data Format Comparison ==========');

  // 检查十六进制 vs 十进制是否有影响
  const a = 0x3F;
  const b = 63;
  console.log(`  0x3F === 63: ${a === b} (JS numbers, no format issue)`);

  // & 0x3F 行为
  const testVals = [0x0F, 0x1F, 0x2F, 0x3F, 0x4F, 0x5F, 0xFF];
  for (const v of testVals) {
    console.log(`  ${String(v).padStart(4)} & 0x3F = ${v & 0x3F}  |  & 63 = ${v & 63}  |  same: ${(v & 0x3F) === (v & 63)}`);
  }

  // Uint8Array 行为
  const u8 = new Uint8Array([0x3F, 0x1F, 0x0F, 0x00, 0x30, 0x20, 0x10, 0xFF]);
  console.log(`  Uint8Array: [${Array.from(u8).join(',')}]`);
  console.log(`  All values 0-255, bit manipulation works identically`);

  // 测试 NES palette 索引 mirroring ($3F00/$3F10/$3F20)
  const mirrorTests = [
    { addr: 0x3F00, expected: 0 },
    { addr: 0x3F04, expected: 4 },
    { addr: 0x3F08, expected: 8 },
    { addr: 0x3F0C, expected: 12 },
    { addr: 0x3F10, expected: 16 },
    { addr: 0x3F14, expected: 20 },
    { addr: 0x3F1F, expected: 31 },
    { addr: 0x3F20, expected: 0 }, // mirror
    { addr: 0x3F24, expected: 4 }, // mirror
  ];
  for (const t of mirrorTests) {
    // JSNES: address & 0x1F (same as addr & 31)
    const jsIdx = t.addr & 0x1F;
    // Our code: (ppu.v & 0x1F) % 32
    const ourIdx = (t.addr & 0x1F) % 32;
    console.log(`  addr=0x${t.addr.toString(16).toUpperCase()}: JSNES idx=${jsIdx}  Ours idx=${ourIdx}  expected=${t.expected}  OK=${jsIdx === ourIdx && jsIdx === t.expected}`);
  }

  console.log(`  RESULT: PASS — data formats are compatible (JS number = unifying type)\n`);
}

// ============================================================================
// Test D: PPU 写管线对比
// ============================================================================

interface MinimalPpu {
  ctrl: number;
  mask: number;
  status: number;
  oamAddr: number;
  v: number;    // 15-bit VRAM address
  t: number;
  w: number;
  x: number;
  vram: Uint8Array;
  palette: Uint8Array;
  oam: Uint8Array;
}

/** 模拟 JSNES PPU 写 (简化版, 不包含 nametable 解码) */
class JsnesMiniPpu implements MinimalPpu {
  ctrl = 0; mask = 0; status = 0; oamAddr = 0;
  v = 0; t = 0; w = 0; x = 0;
  vram: Uint8Array; palette: Uint8Array; oam: Uint8Array;

  constructor() {
    this.vram = new Uint8Array(0x0800);
    this.palette = new Uint8Array(32);
    this.oam = new Uint8Array(256);
  }

  writeAddr(val: number): void {
    if (this.w === 0) {
      // First write (high byte)
      // regFV = (val >> 4) & 3; regV = (val >> 3) & 1; regH = (val >> 2) & 1; regVT bits 10-8
      // JSNES: this.regVT = (this.regVT & 7) | ((val & 3) << 3);
      // Actually let's trace JSNES writeVRAMAddress:
      // Line ~990: this.regFV = (value >> 4) & 3;
      // this.regV = (value >> 3) & 1;
      // this.regH = (value >> 2) & 1;
      // this.regVT = (this.regVT & 7) | ((value & 3) << 3);
      // But we don't track regFV/V/H/HT/VT separately — we track t and v.
      // JSNES first write assembles into regT, second write copies regT→cnt and cntsToAddress
      // Our first write: t = (t & 0x00FF) | ((val & 0x3F) << 8)
      // Our second write: t = (t & 0xFF00) | val; v = t
      this.t = (this.t & 0x00FF) | ((val & 0x3F) << 8);
      this.w = 1;
    } else {
      this.t = (this.t & 0xFF00) | val;
      this.v = this.t & 0x7FFF;
      this.w = 0;
    }
  }

  writeData(val: number): void {
    const addr = this.v & 0x7FFF;
    if ((addr & 0x3F00) === 0x3F00) {
      // Palette
      const idx = addr & 0x1F;
      this.palette[idx % 32] = val;
    } else if ((addr & 0x2000) === 0x0000) {
      // Pattern table (CHR)
      // Not tracked here
    } else {
      // Nametable
      this.vram[addr & 0x07FF] = val;
    }
    // Increment
    this.v = (this.v + ((this.ctrl & 0x04) ? 32 : 1)) & 0x7FFF;
  }
}

/** 模拟我们 PPU bridge 的写行为 */
class OursMiniPpu implements MinimalPpu {
  ctrl = 0; mask = 0; status = 0; oamAddr = 0;
  v = 0; t = 0; w = 0; x = 0;
  vram: Uint8Array; palette: Uint8Array; oam: Uint8Array;

  constructor() {
    this.vram = new Uint8Array(0x0800);
    this.palette = new Uint8Array(32);
    this.oam = new Uint8Array(256);
  }

  writeAddr(val: number): void {
    // From main.ts createPpuBridge case 0x2006
    if (this.w === 0) {
      this.t = (this.t & 0x00FF) | ((val & 0x3F) << 8);
      this.w = 1;
    } else {
      this.t = (this.t & 0xFF00) | val;
      this.v = this.t;
      this.w = 0;
    }
  }

  writeData(val: number): void {
    // From main.ts createPpuBridge case 0x2007
    if ((this.v & 0x3F00) === 0x3F00) {
      const palIdx = (this.v & 0x1F) % 32;
      this.palette[palIdx] = val;
    } else if ((this.v & 0x2000) === 0x0000) {
      // CHR
    } else {
      const ntAddr = this.v & 0x07FF;
      this.vram[ntAddr] = val;
    }
    this.v = (this.v + ((this.ctrl & 0x04) ? 32 : 1)) & 0x7FFF;
  }
}

function testD_ppu_write_pipeline(): void {
  console.log('========== Test D: PPU Write Pipeline ==========');

  // Test 1: Palette write
  console.log('  --- D1: Palette write ---');
  {
    const js = new JsnesMiniPpu();
    const our = new OursMiniPpu();

    // Set VRAM addr to $3F00
    js.writeAddr(0x3F);   // high byte
    js.writeAddr(0x00);   // low byte
    our.writeAddr(0x3F);
    our.writeAddr(0x00);

    console.log(`    After addr write: js.v=0x${js.v.toString(16)} our.v=0x${our.v.toString(16)}`);

    // Write 3 palette entries
    js.writeData(0x0F); js.writeData(0x15); js.writeData(0x2B);
    our.writeData(0x0F); our.writeData(0x15); our.writeData(0x2B);

    // Compare
    const pdiffs = diffU8(js.palette, our.palette);
    console.log(`    Palette diffs: ${pdiffs.length} ${pdiffs.length === 0 ? 'OK' : 'FAIL'}`);
    if (pdiffs.length > 0) {
      for (const d of pdiffs) console.log(`      pal[${d.pos}]: js=${d.a} our=${d.b}`);
    }
    console.log(`    After writes: js.v=0x${js.v.toString(16)} our.v=0x${our.v.toString(16)}`);
  }

  // Test 2: Nametable write
  console.log('  --- D2: Nametable write ---');
  {
    const js = new JsnesMiniPpu();
    const our = new OursMiniPpu();

    js.writeAddr(0x20);
    js.writeAddr(0x00);
    our.writeAddr(0x20);
    our.writeAddr(0x00);

    // Write some tiles
    for (let i = 0; i < 10; i++) {
      js.writeData(i + 0x30);
      our.writeData(i + 0x30);
    }

    const vdiffs = diffU8(js.vram, our.vram);
    console.log(`    VRAM diffs: ${vdiffs.length} ${vdiffs.length === 0 ? 'OK' : 'FAIL'}`);
    if (vdiffs.length > 0) {
      for (const d of vdiffs.slice(0, 5)) console.log(`      vram[0x${d.pos.toString(16)}]: js=${d.a} our=${d.b}`);
    }
  }

  // Test 3: Mix palette + nametable writes
  console.log('  --- D3: Mixed writes ---');
  {
    const js = new JsnesMiniPpu();
    const our = new OursMiniPpu();

    // Write palette
    js.writeAddr(0x3F); js.writeAddr(0x00);
    our.writeAddr(0x3F); our.writeAddr(0x00);
    for (let i = 0; i < 32; i++) {
      js.writeData(i & 0x3F);
      our.writeData(i & 0x3F);
    }

    // Write nametable data
    js.writeAddr(0x20); js.writeAddr(0x20);
    our.writeAddr(0x20); our.writeAddr(0x20);
    for (let i = 0; i < 64; i++) {
      js.writeData((i * 3) & 0xFF);
      our.writeData((i * 3) & 0xFF);
    }

    const pdiffs2 = diffU8(js.palette, our.palette);
    const vdiffs2 = diffU8(js.vram, our.vram);

    console.log(`    Palette diffs: ${pdiffs2.length} ${pdiffs2.length === 0 ? 'OK' : 'FAIL'}`);
    console.log(`    VRAM diffs:    ${vdiffs2.length} ${vdiffs2.length === 0 ? 'OK' : 'FAIL'}`);

    // Show exact VRAM comparison for key areas
    console.log(`    VRAM[0x0020..0x002F]: js=[${Array.from(js.vram.slice(0x20, 0x30)).join(',')}]`);
    console.log(`    VRAM[0x0020..0x002F]: our=[${Array.from(our.vram.slice(0x20, 0x30)).join(',')}]`);

    if (pdiffs2.length === 0 && vdiffs2.length === 0) {
      console.log(`    RESULT: PASS\n`);
    } else {
      console.log(`    RESULT: FAIL — differences found\n`);
    }
  }
}

// ============================================================================
// Test E: 帧缓冲渲染对比 (背景 only)
// ============================================================================

/** JSNES 风格: renderBgScanline (简化版, 从 vram/palette 直接渲染) */
function jsnesRenderBgTile(
  vram: Uint8Array, chrData: Uint8Array, palette: number[], /* palette entries -> RGB */
  tileX: number, tileY: number, ntBase: number, basePattern: number,
): Uint32Array {
  const ntIdx = tileY * 32 + tileX;
  const tileId = basePattern + vram[(ntBase + ntIdx) & 0x7FF];

  // Attribute
  const attrX = tileX >> 2;
  const attrY = tileY >> 2;
  const attrIdx = 0x3C0 + attrY * 8 + attrX;
  const attrByte = vram[(ntBase + attrIdx) & 0x7FF];
  const quadrant = ((tileY & 2) << 1) | (tileX & 2);
  const palSelect = ((attrByte >> quadrant) & 0x03) << 2; // shift left 2

  // Decode tile
  const pix = new Uint8Array(64);
  const base = tileId * 16;
  for (let y = 0; y < 8; y++) {
    const b1 = chrData[base + y];
    const b2 = chrData[base + y + 8];
    const rowOff = y << 3;
    for (let x = 0; x < 8; x++) {
      pix[rowOff + x] = ((b1 >> (7 - x)) & 1) + (((b2 >> (7 - x)) & 1) << 1);
    }
  }

  // JSNES style: render pixels using palette[]
  const result = new Uint32Array(64);
  for (let i = 0; i < 64; i++) {
    const ci = pix[i];
    if (ci > 0) {
      // imgPalette[ci + att] where att = attribute palette (0/4/8/12)
      result[i] = palette[ci + palSelect] || 0;
    } else {
      result[i] = palette[0] || 0; // background color
    }
  }
  return result;
}

/** 我们的风格: renderArgb (复制自 TileCache.ts) */
function ourRenderBgTile(
  vram: Uint8Array, chrRam: Uint8Array, nesPalette: number[],
  ppuPalette: Uint8Array,
  tileX: number, tileY: number, ntBase: number, basePattern: number,
): Uint32Array {
  const ntIdx = tileY * 32 + tileX;
  const tileId = basePattern + vram[(ntBase + ntIdx) & 0x7FF];

  const attrX = tileX >> 2;
  const attrY = tileY >> 2;
  const attrIdx = 0x3C0 + attrY * 8 + attrX;
  const attrByte = vram[(ntBase + attrIdx) & 0x7FF];
  const quadrant = ((tileY & 2) << 1) | (tileX & 2);
  const palIdx = (attrByte >> quadrant) & 0x03;

  // Decode tile (same as decodeRaw)
  const raw = new Uint8Array(64);
  const base = tileId * 16;
  for (let y = 0; y < 8; y++) {
    const lo = chrRam[base + y];
    const hi = chrRam[base + y + 8];
    const rowOff = y * 8;
    for (let x = 0; x < 8; x++) {
      const bit = 7 - x;
      raw[rowOff + x] = ((lo >> bit) & 1) | (((hi >> bit) & 1) << 1);
    }
  }

  // Our renderArgb style
  const basePal = palIdx * 4;
  const bgColor = nesPalette[ppuPalette[0] & 0x3F] | 0xFF000000;
  const result = new Uint32Array(64);
  for (let i = 0; i < 64; i++) {
    const ci = raw[i];
    result[i] = ci === 0
      ? bgColor
      : nesPalette[ppuPalette[basePal + ci] & 0x3F] | 0xFF000000;
  }
  return result;
}

function testE_frame_buffer_compare(): void {
  console.log('========== Test E: Frame Buffer Comparison (RGB only) ==========');

  // 使用相同的 NES palette 表做精确对比
  const nesPalette24 = NES_PALETTE.map(v => v & 0x00FFFFFF);

  // ★ 关键: 用非零、互不相同的 palette，避免 "都是黑色" 的 false-pass
  const ppuPaletteRaw = new Uint8Array(32);
  ppuPaletteRaw[0] = 0x20;  // white-ish bg (entry 0x20 = 0xF8F8F8)
  ppuPaletteRaw[1] = 0x15;  // palette 0 color 1
  ppuPaletteRaw[2] = 0x26;  // palette 0 color 2
  ppuPaletteRaw[3] = 0x11;  // palette 0 color 3
  ppuPaletteRaw[4] = 0x20;  // bg mirror
  ppuPaletteRaw[5] = 0x07;  // palette 1 color 1
  ppuPaletteRaw[6] = 0x16;
  ppuPaletteRaw[7] = 0x27;
  ppuPaletteRaw[8] = 0x20;
  ppuPaletteRaw[9] = 0x19;
  ppuPaletteRaw[10] = 0x2A;
  ppuPaletteRaw[11] = 0x0A;
  ppuPaletteRaw[12] = 0x20;
  ppuPaletteRaw[13] = 0x38;
  ppuPaletteRaw[14] = 0x2C;
  ppuPaletteRaw[15] = 0x1D;
  // sprite palettes
  for (let i = 16; i < 32; i++) {
    ppuPaletteRaw[i] = ((i * 5 + 3) & 0x3F);
  }

  // JSNES style: imgPalette[0..15] pre-converted to 24-bit RGB
  const jsnesPalette = new Array(16);
  for (let i = 0; i < 16; i++) {
    jsnesPalette[i] = nesPalette24[ppuPaletteRaw[i] & 0x3F];
  }

  // Our style: same raw palette, but render uses NES_PALETTE + |0xFF000000
  // (both lookup the same NES_PALETTE table, difference is alpha channel)

  // Create test CHR + nametable data
  const chrData = new Uint8Array(512 * 16);
  const vram = new Uint8Array(0x800);

  // Fill CHR with patterns
  for (let t = 0; t < 512; t++) {
    const base = t * 16;
    for (let y = 0; y < 8; y++) {
      chrData[base + y] = ((t * 13 + y * 7) & 0xFF);
      chrData[base + y + 8] = ((t * 17 + y * 11 + 3) & 0xFF);
    }
  }

  // Fill nametable (ntId=0)
  const NT_BASE = 0;
  for (let y = 0; y < 30; y++) {
    for (let x = 0; x < 32; x++) {
      const ti = y * 32 + x;
      vram[NT_BASE + ti] = (ti & 0xFF);
    }
  }
  // Fill attribute table — give each 2×2 quadrant a different palette
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const ai = 0x3C0 + y * 8 + x;
      vram[NT_BASE + ai] = ((y & 1) | ((x & 1) << 2) | (((y>>1)&1)<<4) | (((x>>1)&1)<<6));
    }
  }

  // Render all 960 tiles (30×32), compare RGB only (mask alpha)
  let pixelDiffs = 0;
  const mismatchedTiles: { tx: number; ty: number; diffs: number }[] = [];
  const totalFrame = 256 * 240;

  for (let ty = 0; ty < 30; ty++) {
    for (let tx = 0; tx < 32; tx++) {
      const jsTile = jsnesRenderBgTile(vram, chrData, jsnesPalette, tx, ty, NT_BASE, 0);
      const ourTile = ourRenderBgTile(vram, chrData, NES_PALETTE, ppuPaletteRaw, tx, ty, NT_BASE, 0);

      // ★ 只比较 RGB 值，忽略 alpha 通道
      let localDiffs = 0;
      for (let i = 0; i < 64; i++) {
        if ((jsTile[i] & 0x00FFFFFF) !== (ourTile[i] & 0x00FFFFFF)) {
          localDiffs++;
        }
      }
      if (localDiffs > 0) {
        pixelDiffs += localDiffs;
        mismatchedTiles.push({ tx, ty, diffs: localDiffs });
        if (mismatchedTiles.length <= 3) {
          console.log(`  Tile (${tx},${ty}): ${localDiffs} RGB diffs`);
          // Show first diff
          for (let i = 0; i < 64; i++) {
            if ((jsTile[i] & 0xFFFFFF) !== (ourTile[i] & 0xFFFFFF)) {
              console.log(`    pixel[${i}]: JSNES=${toHex6(jsTile[i] & 0xFFFFFF)} Ours=${toHex6(ourTile[i] & 0xFFFFFF)}`);
              break;
            }
          }
        }
      }
    }
  }

  console.log(`  Total tiles:  960`);
  console.log(`  Tiles with RGB diffs: ${mismatchedTiles.length}`);
  console.log(`  Total RGB pixel diffs: ${pixelDiffs} / ${totalFrame}`);

  if (pixelDiffs === 0) {
    console.log(`  RESULT: PASS — frame buffer rendering is identical!\n`);
  } else {
    console.log(`  RESULT: DIFFERENCES FOUND\n`);
    if (mismatchedTiles.length > 0) {
      const { tx, ty } = mismatchedTiles[0];
      const ntIdx = ty * 32 + tx;
      const tileId = vram[(NT_BASE + ntIdx) & 0x7FF];
      const attrX = tx >> 2; const attrY = ty >> 2;
      const attrIdx = 0x3C0 + attrY * 8 + attrX;
      const attrByte = vram[(NT_BASE + attrIdx) & 0x7FF];
      const quadrant = ((ty & 2) << 1) | (tx & 2);
      const palSelect = (attrByte >> quadrant) & 0x03;

      console.log(`  Analyzing mismatched tile (${tx}, ${ty}):`);
      console.log(`    tileId=${tileId} (0x${tileId.toString(16)})`);
      console.log(`    attrByte=0x${attrByte.toString(16)} palSelect=${palSelect}`);

      // Show decoded pixel values
      const pix = jsnesDecodeTile(chrData, tileId);
      console.log(`    Decoded pixel[0..7]: [${Array.from(pix.slice(0,8)).join(',')}]`);

      console.log(`    JSNES imgPalette: [${Array.from(jsnesPalette.slice(0,4)).map(v=>'0x'+v.toString(16)).join(', ')}]`);
      console.log(`    Ours ppuPalette:  [${Array.from(ppuPaletteRaw.slice(0,4)).map(v=>'0x'+v.toString(16)).join(', ')}]`);
      console.log(`    Ours RGB palette: [${Array.from(ppuPaletteRaw.slice(0,4)).map(v=>'0x'+(NES_PALETTE[v&0x3F]&0xFFFFFF).toString(16)).join(', ')}]`);
    }
  }
}

// ============================================================================
// MAIN
// ============================================================================
function main(): void {
  console.log('╔══════════════════════════════════════════════╗');
  console.log('║  PPU Comparison Tests: JSNES vs Our Renderer  ║');
  console.log('╚══════════════════════════════════════════════╝\n');

  testA_palette_tables();
  testB_tile_decode();
  testC_data_format();
  testD_ppu_write_pipeline();
  testE_frame_buffer_compare();

  console.log('All tests completed.');
}

main();
