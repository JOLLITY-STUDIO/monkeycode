/**
 * @file addresses.ts — 公共固定地址常量 (entry points / bank boundaries / IRQ vectors)
 *
 * ⚠️ AUTO-GENERATED FILE. DO NOT EDIT.
 * Run `python scripts/generate_ts_functions.py` to regenerate.
 * Source: rom-data/function-table.json (V0.8.1 capstone + 8-tier 启发式).
 *
 * V0.10 — TypeScript bridge from V0.8 函数表 (升级 helper naming).
 * 每行表示 NDS ROM 中一个 unique BL/BLX callee, 命名 规则 (ADR-010):
 *   - V0.4 known name (28 个): human-readable
 *   - SOFTFLOAT region (0x0204C000..0x0204DFFF, ~50 个): sfloat_<8-hex>
 *   - callers ≥ 20 (~13 个): util_<8-hex>
 *   - callers ≥ 10 (~28 个): helper_<8-hex>
 *   - 其他: sub_<8-hex>
 *
 * 每个常量含 16 进制地址 + confidence + category 注释, 便于 TS service 代码 trace.
 */

/**
 * NDS ROM 二进制加载地址 + 大小常量
 */
export const ROM_BASE = 0x00000000;
export const ROM_SIZE = 8 * 1024 * 1024;  // 8 MiB (small NDS ROM)

/**
 * ARM9 binary (1 MiB) — V0.3 提取的 main game logic
 */
export const ARM9_LOAD = 0x02000000 as const;
export const ARM9_DST  = 0x02008000 as const;  // BIOS 默认 load + 跳转地址
export const ARM9_SIZE = 0x00100000 as const;  // 1 MiB

/**
 * ARM7 binary (256 KiB) — V0.7 推断为 stub-only
 */
export const ARM7_LOAD = 0x02380000 as const;
export const ARM7_DST  = 0x02380000 as const;
export const ARM7_SIZE = 0x00040000 as const;  // 256 KiB

/**
 * Cart Header — 16 KB at ROM start
 */
export const CART_HEADER_SIZE = 0x4000 as const;
export const CART_GAME_TITLE  = 'ESUDOKUDS';
export const CART_GAME_CODE   = 'AZIP';
export const CART_MAKER_CODE  = 'G9';

/**
 * Bank 范围 — PRG 16 KB per bank
 */
export const PRG_BANK_SIZE  = 0x00004000 as const;  // 16 KiB
export const CHR_BANK_SIZE  = 0x00002000 as const;  // 8 KiB (NDS no CHR, 仅供 reference)
export const PRG_ROM_BANKS  = 0x100000 / PRG_BANK_SIZE;  // ARM9 / 16 KB = 64 banks
export const ARM9_BANKS     = 0x100000 / PRG_BANK_SIZE;
export const ARM7_BANKS     = 0x40000 / PRG_BANK_SIZE;

/**
 * 软浮点 lib region (V0.4 ADR-005)
 */
export const SOFTFLOAT_BASE = 0x0204c000 as const;
export const SOFTFLOAT_END  = 0x0204e000 as const;

/**
 * Stack / IRQ / Bus 约定
 */
export const ARM9_STACK_TOP = 0x023ff000 as const;  // BIOS 默认 stack
export const ARM9_STACK_SIZE = 0x00020000 as const;
export const IRQ_VBLANK_BIT = 0x00000001 as const;
export const IRQ_HBLANK_BIT = 0x00000002 as const;
export const IRQ_VCOUNT_BIT = 0x00000004 as const;
export const IRQ_TIMER0_BIT = 0x00000008 as const;
export const IRQ_KEYPAD_BIT = 0x00000010 as const;
export const IRQ_IPC_SYNC_BIT = 0x00010000 as const;

/**
 * Memory-mapped IO registers (32-bit aligned)
 */
export const IO_REG_BASE       = 0x04000000 as const;
export const IO_DISPCNT        = 0x04000000 as const;
export const IO_VCOUNT         = 0x04000006 as const;
export const IO_KEYINPUT       = 0x04000130 as const;
export const IO_IPC_FIFO_SEND  = 0x04000188 as const;
export const IO_IPC_FIFO_RECV  = 0x0400018c as const;
export const IRQ_ENABLE        = 0x04000208 as const;
export const IRQ_REQUEST       = 0x04000210 as const;
export const IPC_FIFO_CR       = 0x04000184 as const;

/**
 * VRAM / OAM regions
 */
export const VRAM_BASE       = 0x06800000 as const;
export const VRAM_SIZE       = 0x00400000 as const;  // 4 MiB
export const OAM_BASE        = 0x07000000 as const;
export const OAM_SIZE        = 0x00001000 as const;  // 4 KiB
export const PALETTE_BASE    = 0x05000000 as const;
export const PALETTE_SIZE    = 0x00000800 as const;  // 2 KiB
