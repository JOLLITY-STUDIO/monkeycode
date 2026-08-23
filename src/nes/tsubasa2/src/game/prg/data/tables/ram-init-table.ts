/**
 * RAM 初始化表 — 来自 bank30 Reset 序列（$C64E-$C6BB + $CEFE + $C400）
 *
 * 对照 asm（src/asm/bank30/code_main.s）：
 *   $C667: RAM $0000-$07FF 清零（8 页 × 256）
 *   $C67A: ram_0020 = $08  (PPU CTRL: NMI on / 精灵 8x8 / BG 表 0)
 *   $C67E: ram_0021 = $06  (PPU MASK 初始)
 *   $C6A0: ram_0022 = $00  (MMC3 bank 基址 = 0)
 *   $C6A5: JSR $CB35 (清 NT0/NT1 → 渲染层)
 *   $C6A8: JSR $CB8B (OAM $0200-$02FF 全 $F8 隐藏)
 *   $C6AB: ram_0469 = $00  (IRQ 扫描线计数器)
 *   $C6B9: A=0 → JMP $CEFE
 *   $CEFE: 隐藏 OAM / 清 NT / 关 NMI → JMP $C400
 *   $C400: ram_0020=$08, ram_0021=$1E (MASK 开渲染), ram_0022=$00
 *          → 切 bank → JMP $A200 (bank2 场景入口, 场景号 A=0)
 */
export const RAM_INIT_TABLE: ReadonlyArray<{ addr: number; value: number }> = [
  // 全部清零（除下方覆盖项外）
  { addr: 0x0020, value: 0x08 }, // PPU CTRL
  { addr: 0x0021, value: 0x1e }, // PPU MASK（开 BG+SPR）
  { addr: 0x0022, value: 0x00 }, // MMC3 bank 基址
  { addr: 0x0469, value: 0x00 }, // IRQ 扫描线计数器
  // OAM 缓冲 $0200-$02FF 由 $CB8B 填 $F8（见 OAM_HIDE_VALUE）
];

/** $CB8B: OAM 隐藏值（Y=$F8 隐藏） */
export const OAM_HIDE_VALUE = 0xf8;

/** $CF1F: 游戏 RAM 再初始化（LDX #$E0; TXS 之后清理 $0001-$0016 与 $0400-$04A4） */
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
