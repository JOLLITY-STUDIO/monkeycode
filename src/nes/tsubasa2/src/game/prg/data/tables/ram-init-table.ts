/**
 * RAM 初始化表 — Reset 序列（RAM 清零 → CTRL/MASK/bank 基址 → IRQ 计数器）
 */
export const RAM_INIT_TABLE: ReadonlyArray<{ addr: number; value: number }> = [
  // 全部清零（除下方覆盖项外）
  { addr: 0x0020, value: 0x08 }, // PPU CTRL
  { addr: 0x0021, value: 0x1e }, // PPU MASK（开 BG+SPR）
  { addr: 0x0022, value: 0x00 }, // bank 基址
  { addr: 0x0469, value: 0x00 }, // IRQ 扫描线计数器
  // OAM 缓冲 $0200-$02FF 由 reset()  中 OAM_HIDE_VALUE 填 $F8
];

/** OAM 隐藏值（Y=$F8 隐藏） */
export const OAM_HIDE_VALUE = 0xf8;

/** 游戏 RAM 再初始化（$0001-$0016 与 $0400-$04A4 系列） */
export const GAME_RAM_CLEAR_TABLE: ReadonlyArray<{ addr: number; value: number }> = [
  { addr: 0x0001, value: 0x00 },
  { addr: 0x0002, value: 0x00 },
  { addr: 0x0005, value: 0x00 },
  { addr: 0x0006, value: 0x00 },
  { addr: 0x0009, value: 0x00 },
  { addr: 0x000a, value: 0x00 },
  { addr: 0x000d, value: 0x00 },
  { addr: 0x000e, value: 0x00 },
  { addr: 0x0011, value: 0x00 },
  { addr: 0x0012, value: 0x00 },
  { addr: 0x0015, value: 0x00 },
  { addr: 0x0016, value: 0x00 },
];