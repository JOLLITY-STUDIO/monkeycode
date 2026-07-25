/**
 * iNES 2.0 Header 常量 — 由 tools/export_rom_meta.mjs 自动生成，请不要手动修改
 *
 * 原始文件: rom.nes
 * 格式: NES 2.0
 * Mapper: 4 (MMC3)
 *
 * 这些常量描述了卡带的物理结构，替代了从 .nes 文件 header 解析的过程。
 */

/** 原始 16 字节 iNES/NES 2.0 header */
export const RAW_HEADER: readonly number[] = [0x4E, 0x45, 0x53, 0x1A, 0x10, 0x10, 0x40, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01];

/** Mapper 编号 (MMC3 = 4) */
export const MAPPER_TYPE = 4;

/** 子 Mapper 编号 (NES 2.0) */
export const SUB_MAPPER = 0;

/** Mirroring 模式: 0=Horizontal, 1=Vertical */
export const MIRRORING: number = 0;
export const MIRRORING_NAME = 'Horizontal';

/** 是否有 trainer (512 bytes at 0x7000) */
export const HAS_TRAINER = false;

/** 是否四屏 VRAM */
export const HAS_FOUR_SCREEN = false;

/** 是否有电池存档 */
export const HAS_BATTERY_RAM = false;

/** 是否为 NES 2.0 格式 */
export const IS_NES20 = true;

/** PRG-ROM 8KB bank 数量 (已拆分为 32 个 MMC3 bank) */
export const PRG_ROM_COUNT = 32;

/** PRG-ROM 总大小 (bytes) */
export const PRG_ROM_SIZE = 262144;

/** CHR-ROM 8KB bank 数量 */
export const CHR_ROM_COUNT_8K = 16;

/** CHR-ROM 4KB vrom bank 数量 */
export const CHR_VROM_COUNT = 32;

/** CHR-ROM 总大小 (bytes) */
export const CHR_ROM_SIZE = 131072;

/** 卡带 RAM 大小 (bytes) */
export const PRG_RAM_SIZE = 0;
export const PRG_NVRAM_SIZE = 0;
export const CHR_RAM_SIZE = 0;
export const CHR_NVRAM_SIZE = 0;

/** CPU/PPU 时序模式 */
export const TIMING_MODE = 0;
export const TIMING_MODE_NAME = 'NTSC';

/** 主机类型 */
export const CONSOLE_TYPE = 0;
export const CONSOLE_TYPE_NAME = 'NES/FC';

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
  const prgSize = prgBanks.reduce((s, b) => s + b.length, 0);
  const chrSize = chrBanks.length * 8192;
  const totalSize = headerSize + prgSize + chrSize;

  const buf = new Uint8Array(totalSize);

  // 写入 header
  buf.set(new Uint8Array(RAW_HEADER), 0);

  // 写入 PRG-ROM
  let offset = headerSize + (HAS_TRAINER ? 512 : 0);
  for (const bank of prgBanks) {
    buf.set(bank, offset);
    offset += bank.length;
  }

  // 写入 CHR-ROM
  for (const bank of chrBanks) {
    buf.set(bank, offset);
    offset += 8192;
  }

  return buf;
}
