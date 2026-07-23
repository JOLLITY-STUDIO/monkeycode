/**
 * 从 rom.nes 中提取 CHR-ROM 数据 + iNES Header 并导出为 TypeScript 模块
 *
 * 使用: node tools/export_rom_meta.mjs
 * 输出: src/tsnes/tsubasa-code/chr_rom_data.ts  (CHR pattern table)
 *       src/tsnes/tsubasa-code/rom_header.ts    (iNES 头部常量)
 *
 * CHR-ROM: NES PPU 图块数据 (pattern tables)
 *   1 KB = 256 个 8×8 tile × 16 bytes (2 bitplane)
 *   8KB bank = 512 tile
 *   本 ROM: 16 个 8KB bank = 128KB = 8192 个 tile
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const romPath = resolve(ROOT, 'rom.nes');
const outChrPath = resolve(ROOT, 'src', 'tsnes', 'tsubasa-code', 'chr_rom_data.ts');
const outHeaderPath = resolve(ROOT, 'src', 'tsnes', 'tsubasa-code', 'rom_header.ts');

console.log(`Reading ${romPath}...`);
const raw = readFileSync(romPath);

// 验证 iNES 魔数
if (raw[0] !== 0x4E || raw[1] !== 0x45 || raw[2] !== 0x53 || raw[3] !== 0x1A) {
  throw new Error('Not a valid NES ROM.');
}

// ============================================================
// 解析 iNES 2.0 Header
// ============================================================

const prgCount16k = raw[4];       // 16KB PRG bank 数
const chrCount8k  = raw[5];       // 8KB CHR bank 数
const flags6      = raw[6];
const flags7      = raw[7];
const flags8      = raw[8];
const flags9      = raw[9];
const flags10     = raw[10];
const flags11     = raw[11];
const flags12     = raw[12];
const flags13     = raw[13];
const flags14     = raw[14];
const flags15     = raw[15];

const mapperLo  = (flags6 >> 4) & 0xF;
const mapperMid = flags7 & 0xF0;
const mapperHi  = (flags8 & 0x0F) << 8;
const mapper    = mapperHi | mapperMid | mapperLo;

const mirroring  = (flags6 & 1) !== 0 ? 1 : 0;
const batteryRam = (flags6 & 2) !== 0;
const trainer    = (flags6 & 4) !== 0;
const fourScreen = (flags6 & 8) !== 0;
const isNES2     = (flags7 & 0x0C) === 0x08;
const subMapper  = (flags8 >> 4) & 0x0F;
const timingMode = flags12 & 0x03;
const consoleType = flags7 & 0x03;

// 内存大小
let romCount, vromCount, prgRamSize, prgNvRamSize, chrRamSize, chrNvRamSize;

if (isNES2) {
  // NES 2.0 PRG-ROM: byte 9 D3..D0 (MSB) combined with byte 4 (LSB)
  romCount = ((flags9 & 0x0F) << 8) | prgCount16k;

  // NES 2.0 CHR-ROM: byte 9 D7..D4 (MSB) combined with byte 5 (LSB)
  const chrMsb = (flags9 >> 4) & 0x0F;
  vromCount = (chrMsb === 0x0F)
    ? Math.ceil((Math.pow(2, (chrCount8k >> 2) & 0x3F) * ((chrCount8k & 0x03) * 2 + 1)) / 4096)
    : ((chrMsb << 8) | chrCount8k) * 2;

  // PRG-RAM / NVRAM (byte 10)
  const _ram = (v) => (v === 0 ? 0 : 64 << v);
  prgRamSize   = _ram(flags10 & 0x0F);
  prgNvRamSize = _ram((flags10 >> 4) & 0x0F);

  // CHR-RAM / NVRAM (byte 11)
  chrRamSize   = _ram(flags11 & 0x0F);
  chrNvRamSize = _ram((flags11 >> 4) & 0x0F);
} else {
  romCount      = prgCount16k;
  vromCount     = chrCount8k * 2;
  prgRamSize    = 0;
  prgNvRamSize  = 0;
  chrRamSize    = 0;
  chrNvRamSize  = 0;
}

console.log(`iNES header:`);
console.log(`  NES 2.0:   ${isNES2}`);
console.log(`  Mapper:    ${mapper} (MMC3)`);
console.log(`  SubMapper: ${subMapper}`);
console.log(`  PRG-ROM:   ${prgCount16k}×16KB → ${romCount}×16KB banks`);
console.log(`  CHR-ROM:   ${chrCount8k}×8KB → ${vromCount}×4KB vrom banks`);
console.log(`  Mirroring: ${mirroring === 0 ? 'Horizontal' : 'Vertical'}`);
console.log(`  Trainer:   ${trainer}`);
console.log(`  FourScreen:${fourScreen}`);
console.log(`  Battery:   ${batteryRam}`);
console.log(`  Timing:    ${['NTSC','PAL','Multi','Dendy'][timingMode]}`);
console.log(`  Console:   ${['NES/FC','Vs.System','Playchoice10','Extended'][consoleType]}`);
console.log(`  PRG-RAM:   ${prgRamSize} bytes (volatile), ${prgNvRamSize} bytes (NV)`);
console.log(`  CHR-RAM:   ${chrRamSize} bytes (volatile), ${chrNvRamSize} bytes (NV)`);

// ============================================================
// 提取 CHR-ROM 数据 (8KB banks)
// ============================================================

const prgOffset = 16 + (trainer ? 512 : 0);
const prgSize = romCount * 16384;
const chrOffset = prgOffset + prgSize;
const chrSize8k = chrCount8k * 8192;

const CHR_BANKS = [];
for (let i = 0; i < chrCount8k; i++) {
  const start = chrOffset + i * 8192;
  const bytes = [];
  for (let j = 0; j < 8192; j++) {
    bytes.push(raw[start + j]);
  }
  CHR_BANKS.push(bytes);
}

console.log(`\nCHR-ROM: extracted ${CHR_BANKS.length} × 8KB banks (${chrSize8k} bytes)`);

// ============================================================
// 格式化工具 (和 PRG 导出一样)
// ============================================================

const BYTES_PER_LINE = 64;
function formatBankArray(bytes) {
  const lines = [];
  for (let i = 0; i < bytes.length; i += BYTES_PER_LINE) {
    lines.push(bytes.slice(i, i + BYTES_PER_LINE).map(b => '0x' + b.toString(16).padStart(2, '0').toUpperCase()).join(','));
  }
  return lines;
}

// ============================================================
// 生成 chr_rom_data.ts
// ============================================================

console.log(`\nGenerating chr_rom_data.ts...`);

const chrBankDefs = CHR_BANKS.map((bytes, i) => {
  const lines = formatBankArray(bytes);
  return `/** CHR-ROM bank ${i} (8KB) — ${bytes.length} bytes (512 tiles) */
const _CHR_BANK_${i}: readonly number[] = [
${lines.map(l => `  ${l}`).join(',\n')}
];`;
});

const chrBankRefs = Array.from({ length: chrCount8k }, (_, i) => `  _CHR_BANK_${i}`).join(',\n');

// 同时生成 4KB vrom bank 数组 (rom.ts 用 4KB 单位)
const vromBankDefs = [];
for (let i = 0; i < chrCount8k; i++) {
  for (let half = 0; half < 2; half++) {
    const vIdx = i * 2 + half;
    vromBankDefs.push(`  _CHR_BANK_${i}.slice(${half * 4096}, ${(half + 1) * 4096})`);
  }
}

const chrOutput = `/**
 * CHR-ROM 数据 (Pattern Tables) — 由 tools/export_rom_meta.mjs 自动生成，请不要手动修改
 *
 * 原始文件: rom.nes
 * Mapper: ${mapper} (MMC3)
 * CHR-ROM: ${chrCount8k} 个 8KB bank → ${chrCount8k * 512} 个 tile
 *
 * 每个 tile = 16 bytes (2 bitplane × 8 scanlines)
 * 每个 8KB bank = 512 个 8×8 tile
 *
 * CHR_ROM_BANKS: Uint8Array[] 共 ${chrCount8k} 个 (8KB each)
 * CHR_VROM_BANKS: Uint8Array[] 共 ${vromCount} 个 (4KB each, 兼容 rom.ts 格式)
 */

${chrBankDefs.join('\n\n')}

// ---------- 预构建 Uint8Array[] ----------

/** 全部 CHR-ROM 8KB bank（预构建） */
export const CHR_ROM_BANKS: readonly Uint8Array[] = [
${chrBankRefs}
].map(arr => new Uint8Array(arr));

/** 全部 CHR-ROM 4KB bank（兼容 rom.ts vrom 格式，预构建） */
export const CHR_VROM_BANKS: readonly Uint8Array[] = [
${vromBankDefs.join(',\n')}
].map(slice => new Uint8Array(slice));

/** CHR-ROM 数据总大小 (bytes) */
export const CHR_ROM_SIZE = ${chrSize8k};

/** CHR-ROM 8KB bank 数量 */
export const CHR_BANK_COUNT = ${chrCount8k};

/** CHR-ROM 4KB vrom bank 数量 */
export const CHR_VROM_COUNT = ${vromCount};
`;

writeFileSync(outChrPath, chrOutput, 'utf-8');
console.log(`  → ${outChrPath}`);

// ============================================================
// 生成 rom_header.ts
// ============================================================

console.log(`\nGenerating rom_header.ts...`);

const rawHeaderHex = Array.from(raw.slice(0, 16))
  .map(b => '0x' + b.toString(16).padStart(2, '0').toUpperCase())
  .join(', ');

const mirroringName = mirroring === 0 ? "'Horizontal'" : "'Vertical'";
const timingName = ['NTSC', 'PAL', 'Multi', 'Dendy'][timingMode];
const consoleName = ['NES/FC', 'Vs.System', 'Playchoice10', 'Extended'][consoleType];

const headerOutput = `/**
 * iNES 2.0 Header 常量 — 由 tools/export_rom_meta.mjs 自动生成，请不要手动修改
 *
 * 原始文件: rom.nes
 * 格式: NES 2.0
 * Mapper: ${mapper} (MMC3)
 *
 * 这些常量描述了卡带的物理结构，替代了从 .nes 文件 header 解析的过程。
 */

/** 原始 16 字节 iNES/NES 2.0 header */
export const RAW_HEADER: readonly number[] = [${rawHeaderHex}];

/** Mapper 编号 (MMC3 = 4) */
export const MAPPER_TYPE = ${mapper};

/** 子 Mapper 编号 (NES 2.0) */
export const SUB_MAPPER = ${subMapper};

/** Mirroring 模式: 0=Horizontal, 1=Vertical */
export const MIRRORING: number = ${mirroring};
export const MIRRORING_NAME = ${mirroringName};

/** 是否有 trainer (512 bytes at 0x7000) */
export const HAS_TRAINER = ${trainer};

/** 是否四屏 VRAM */
export const HAS_FOUR_SCREEN = ${fourScreen};

/** 是否有电池存档 */
export const HAS_BATTERY_RAM = ${batteryRam};

/** 是否为 NES 2.0 格式 */
export const IS_NES20 = ${isNES2};

/** PRG-ROM 16KB bank 数量 */
export const PRG_ROM_COUNT = ${romCount};

/** PRG-ROM 总大小 (bytes) */
export const PRG_ROM_SIZE = ${romCount * 16384};

/** CHR-ROM 8KB bank 数量 */
export const CHR_ROM_COUNT_8K = ${chrCount8k};

/** CHR-ROM 4KB vrom bank 数量 */
export const CHR_VROM_COUNT = ${vromCount};

/** CHR-ROM 总大小 (bytes) */
export const CHR_ROM_SIZE = ${chrSize8k};

/** 卡带 RAM 大小 (bytes) */
export const PRG_RAM_SIZE = ${prgRamSize};
export const PRG_NVRAM_SIZE = ${prgNvRamSize};
export const CHR_RAM_SIZE = ${chrRamSize};
export const CHR_NVRAM_SIZE = ${chrNvRamSize};

/** CPU/PPU 时序模式 */
export const TIMING_MODE = ${timingMode};
export const TIMING_MODE_NAME = '${timingName}';

/** 主机类型 */
export const CONSOLE_TYPE = ${consoleType};
export const CONSOLE_TYPE_NAME = '${consoleName}';

// ============================================================
// NES 内存地址空间常量 (6502 CPU 16位地址空间)
// ============================================================

/** 内部 RAM (2KB 物理, 0x0800-0x1FFF 为镜像) */
export const INTERNAL_RAM_START = 0x0000;
export const INTERNAL_RAM_SIZE = 0x0800;
export const INTERNAL_RAM_END   = 0x2000;

/** PPU 寄存器 (0x2008-0x3FFF 为镜像) */
export const PPU_REG_START = 0x2000;
export const PPU_REG_END   = 0x4000;

/** APU 寄存器 / 手柄 I/O (0x4017-0x401F 为镜像) */
export const APU_REG_START = 0x4000;
export const APU_REG_END   = 0x4020;

/** 卡带扩展区域 (少数 mapper 在此映射) */
export const CART_EXP_START = 0x4020;
export const CART_EXP_END   = 0x6000;

/** SRAM / PRG-RAM (电池存档, 工作 RAM) */
export const SRAM_START = 0x6000;
export const SRAM_END   = 0x8000;

/** PRG-ROM 窗口 (MMC3 将其分为 4 个 8KB 窗口) */
export const PRG_ROM_START  = 0x8000;
export const PRG_ROM_END    = 0xFFFF;
export const PRG_WINDOW_SIZE = 0x2000;  // 8KB per slot

/**
 * 构建完整的 ROM 文件 buffer (16-byte header + PRG + CHR)
 * 可替代 rom_data.ts 的 romUint8Array() 功能
 */
export function buildRomBuffer(
  prgBanks: readonly Uint8Array[],
  chrBanks: readonly Uint8Array[],
): Uint8Array {
  const headerSize = 16;
  const prgSize = prgBanks.length * 16384;
  const chrSize = chrBanks.length * 8192;
  const totalSize = headerSize + prgSize + chrSize;

  const buf = new Uint8Array(totalSize);

  // 写入 header
  buf.set(new Uint8Array(RAW_HEADER), 0);

  // 写入 PRG-ROM
  let offset = headerSize + (HAS_TRAINER ? 512 : 0);
  for (const bank of prgBanks) {
    buf.set(bank, offset);
    offset += 16384;
  }

  // 写入 CHR-ROM
  for (const bank of chrBanks) {
    buf.set(bank, offset);
    offset += 8192;
  }

  return buf;
}
`;

writeFileSync(outHeaderPath, headerOutput, 'utf-8');
console.log(`  → ${outHeaderPath}`);

console.log(`\n✓ 完成! 生成了 header + CHR 数据文件`);
console.log(`  chr_rom_data.ts:  CHR pattern tables (${chrCount8k} × 8KB banks)`);
console.log(`  rom_header.ts:    iNES header 常量 + buildRomBuffer()`);
