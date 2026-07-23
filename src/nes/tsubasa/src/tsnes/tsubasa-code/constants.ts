/**
 * ============================================================================
 * NES 硬件地址空间常量
 *
 * 6502 CPU 16 位地址空间固定划分 (所有 NES 游戏一致):
 *
 *   0x0000 - 0x07FF   内部 RAM (2KB, 物理)
 *   0x0800 - 0x1FFF   内部 RAM 镜像
 *   0x2000 - 0x2007   PPU 寄存器
 *   0x2008 - 0x3FFF   PPU 寄存器镜像
 *   0x4000 - 0x4016   APU 寄存器 / 手柄 I/O
 *   0x4017 - 0x401F   APU / 手柄 镜像
 *   0x4020 - 0x5FFF   卡带扩展 (少数 mapper 用)
 *   0x6000 - 0x7FFF   卡带 SRAM / PRG-RAM (存档、工作 RAM)
 *   0x8000 - 0xFFFF   卡带 PRG-ROM (游戏代码)
 * PPU = Picture Processing Unit（图像处理单元）
APU = Audio Processing Unit（音频处理单元）— NES 实机硬件叫法
PAPU = Pseudo Audio Processing Unit — 模拟器里的叫法，前面加了个 Pseudo（"伪"）表示是软件仿真的，不是真硬件============================================================================
 */

/** 内部 RAM 地址掩码 (2KB 镜像填充到 8KB) */
export const INTERNAL_RAM_MASK = 0x07ff;

/** 内部 RAM 结束地址 (不含) */
export const INTERNAL_RAM_END = 0x2000;

/** 卡带空间起点: 此地址起属于卡带 (SRAM + PRG-ROM) */
export const CARTRIDGE_START = 0x4020;

/** PRG-ROM 起点: 所有 NES 硬件固定将 0x8000~0xFFFF 映射到 ROM 芯片 */
export const PRG_ROM_START = 0x8000;

/** PRG-ROM 结束地址 (含) */
export const PRG_ROM_END = 0xffff;

// ============================================================================
// CHR Tile 可视化常量
// ============================================================================

/**
 * CHR Tile 像素值 → ASCII 字符映射
 *   0 = '  ' (透明/背景)
 *   1 = '░░' (颜色 1)
 *   2 = '▒▒' (颜色 2)
 *   3 = '██' (颜色 3)
 *
 * 用法示例: PIXEL_CHARS[color] 获取对应双字节 ASCII 字符
 */
export const PIXEL_CHARS: readonly string[] = [
  '  ',  // 0 = 背景/透明
  '░░',  // 1
  '▒▒',  // 2
  '██',  // 3
] as const;

// ============================================================================
// CHR Tile 类型定义
// ============================================================================

/**
 * CHR Bank 中的单个 8×8 tile 定义
 * 包含 ASCII 可视化（方便肉眼识别）和原始 NES bitplane 字节数据
 */
export interface TileDef {
  /** 8×8 ASCII 可视化，每行 16 个字符（每个像素 = PIXEL_CHARS[color] 双字节） */
  readonly ascii: readonly string[];
  /** Bitplane 0: 8 字节，NES PPU 低位平面 */
  readonly bp0: readonly number[];
  /** Bitplane 1: 8 字节，NES PPU 高位平面 */
  readonly bp1: readonly number[];
}
