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
 * ============================================================================
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
