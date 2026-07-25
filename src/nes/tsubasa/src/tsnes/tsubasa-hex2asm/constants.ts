/**
 * ============================================================================
 * 天使之翼 II — 常量定义 (统一入口)
 *
 * 本文件是向后兼容层，原有代码通过 import from './constants' 即可获取所有常量。
 * 新增代码推荐直接从 constants/ 子模块导入以获取更精确的依赖。
 *
 * PRG bank 分类 (每 bank 8KB):
 *   初始化映射: $8000→prg_00, $A000→prg_01, $C000→prg_30, $E000→prg_31
 * ============================================================================
 */

// ============================================================
// 从 constants/ 子模块重导出
// ============================================================

export * from './constants/index';

// ============================================================
// §1 位元旗标 / 遮罩 (硬件层面，放在顶部方便引用)
// ============================================================

export const BIT_0 = 1;             // $01
export const BIT_2 = 4;             // $04
export const BIT_3 = 8;             // $08
export const BIT_4 = 16;            // $10
export const BIT_5 = 32;            // $20
export const BIT_6 = 64;            // $40
export const BIT_7 = 128;           // $80

export const MASK_LO4       = 15;   // $0F  低 4 bit
export const MASK_PAL_ATTR  = 48;   // $30  bit4-bit5 (调色板属性)
export const MASK_HI2       = 192;  // $C0  高 2 bit (方向/状态)
export const MASK_HI3       = 224;  // $E0  高 3 bit
export const MASK_HI4       = 240;  // $F0  高 4 bit
export const MASK_ALIGN_8   = 248;  // $F8  低 3 bit 清零 → 对齐 8px
export const MASK_ALIGN_4   = 252;  // $FC  低 2 bit 清零 → 对齐 4px
export const MASK_CLR_SIGN  = 127;  // $7F  bit7 清零 → 转为正值
export const MASK_BIT_7_5_4 = 176;  // $B0  AND #$B0, 方向/旗标合并

export const TERMINATOR = 255;      // $FF  列表终止符
export const SENTINEL   = 254;      // $FE  哨兵值

// ============================================================
// §2 NES 硬件寄存器补充 (部分已含于 addresses.ts)
// ============================================================

/** 内部 RAM 地址掩码 (2KB 镜像填充到 8KB) */
export const INTERNAL_RAM_MASK = 0x07ff;
export const INTERNAL_RAM_END  = 0x2000;

// PPUCTRL 旗标 (补)
export const PPUCTRL_NMI       = BIT_7;
export const PPUCTRL_SPR_8X16  = BIT_5;
export const PPUCTRL_NT_MASK   = 3;
export const PPUCTRL_INC32     = BIT_2;

// PPUMASK 旗标 (补)
export const PPUMASK_SHOW_SPR  = BIT_4;
export const PPUMASK_SHOW_BG   = BIT_3;
export const PPUMASK_NO_CLIP   = 30;  // $1E = BIT_4|BIT_3|BIT_2|BIT_1

// APU 寄存器 (补)
export const APU_PULSE1_CTRL = 0x4000;
export const APU_SQ2_VOL     = 0x4004;
export const APU_TRI_LINEAR  = 0x4008;
export const APU_NOISE_VOL   = 0x400C;
export const APU_STATUS      = 0x4015;

export const CARTRIDGE_START = 0x4020;
export const PRG_ROM_START   = 0x8000;
export const PRG_ROM_END     = 0xFFFF;

// MMC3 寄存器分配 (补)
export const MMC3_REG_CHR_2K_LO = 0;
export const MMC3_REG_CHR_2K_HI = 1;
export const MMC3_REG_CHR_1K_0  = 2;
export const MMC3_REG_CHR_1K_1  = 3;
export const MMC3_REG_CHR_1K_2  = 4;
export const MMC3_REG_CHR_1K_3  = 5;
export const MMC3_REG_PRG_LO    = 6;
export const MMC3_REG_PRG_HI    = 7;

// ============================================================
// §3 PPU 地址 (补)
// ============================================================

export const PPU_NT0        = 0x2000;
export const PPU_NT0_HI     = 0x20;
export const PPU_NT1_HI     = 0x24;
export const PPU_NT2_HI     = 0x28;
export const PPU_NT3_HI     = 0x2C;
export const PPU_ROW_OFFSET = 32;     // 每行 32 tile
export const PALETTE_SIZE   = 64;     // $40

// ============================================================
// §4 精灵 / OAM (补)
// ============================================================

export const SPRITE_HIDE_Y   = 240;   // $F0, Y >= 此值不显示
export const SPR_ATTR_FLIP_H = BIT_6;
export const SPR_ATTR_FLIP_V = BIT_7;
export const OAM_SIZE        = 256;   // 64 精灵 × 4 bytes
export const OAM_BUF         = 0x200; // $0200
export const OAM_BASE        = 0x200;

// ============================================================
// §5 向后兼容别名 (旧名 → 新名)
// 这些是现有代码使用的旧名，逐步迁移到新名
// ============================================================

// 零页别名: 老代码中的 ZP_28/ZP_2A 等 → 有意义的名称
export const ZP_FRAME_CNT    = 0x24;  // → ZP_FRAME_COUNTER (别名)
export const ZP_SCENE_STATE  = 0x26;  // → ZP_SCENE_ID (别名)
export const ZP_JMP_IDX      = 0x27;  // → ZP_DISPATCH_INDEX (别名)
export const ZP_28 = 0x28;            // → ZP_SCENE_FRAME
export const ZP_29 = 0x29;            // → ZP_FRAME_TARGET
export const ZP_2A = 0x2A;            // → ZP_MATCH_HALF
export const ZP_2B = 0x2B;            // → ZP_STAGE_NUMBER
export const ZP_2C = 0x2C;            // → ZP_ROSTER_FLAG

export const ZP_32 = 0x32;
export const ZP_33 = 0x33;
export const ZP_34 = 0x34;

export const ZP_LOOP_CNT = 0x3A;      // 最核心循环计数 (→ ZP_LOOP_COUNTER)
export const ZP_3B = 0x3B;
export const ZP_3C = 0x3C;
export const ZP_3D = 0x3D;
export const ZP_3E = 0x3E;
export const ZP_3F = 0x3F;

export const ZP_CNT_40       = 0x40;
export const ZP_JOYPAD_TMP   = 0x41;
export const ZP_42 = 0x42;
export const ZP_43 = 0x43;
export const ZP_SCROLL_X_POS = 0x44;
export const ZP_SCROLL_REL   = 0x45;
export const ZP_46 = 0x46;
export const ZP_47 = 0x47;

export const ZP_DIGIT_100    = 0x48;
export const ZP_DIGIT_10     = 0x49;
export const ZP_DISP_ATTR_X  = 0x4A;  // → ZP_BG_BRIGHTNESS
export const ZP_DISP_ATTR_Y  = 0x4B;  // → ZP_SPR_BRIGHTNESS
export const ZP_SCENE_STATUS = 0x4C;  // → ZP_SCRIPT_STATUS

export const ZP_SCRIPT_LO = 0x4D;     // → ZP_SCRIPT_PTR_LO
export const ZP_SCRIPT_HI = 0x4E;     // → ZP_SCRIPT_PTR_HI
export const ZP_SCREEN_ROW = 0x53;    // → ZP_CURSOR_COL
export const ZP_LINE_LIMIT = 0x54;    // → ZP_MIN_COL
export const ZP_TEXT_LINES = 0x55;    // → ZP_LINE_COUNT
export const ZP_CUR_BANK   = 0x56;    // → ZP_DATA_BANK
export const ZP_SAVE_SCRIPT_LO = 0x58; // → ZP_SCRIPT_SAVE_LO
export const ZP_SAVE_SCRIPT_HI = 0x59; // → ZP_SCRIPT_SAVE_HI
export const ZP_SAVE_BANK = 0x5A;     // → ZP_SAVED_BANK
export const ZP_FLAGS     = 0x5B;     // → ZP_SCENE_FLAGS

export const ZP_ATTR_IDX = 0x5C;
export const ZP_5D = 0x5D;
export const ZP_5E = 0x5E;
export const ZP_5F = 0x5F;

export const ZP_SPR_ATTR = 0x62;      // → ZP_SPRITE_ATTR
export const ZP_SPR_DIR   = 0x62;     // 别名: 方向
export const ZP_SPR_IDX   = 0x72;     // → ZP_SPRITE_INDEX
export const ZP_SPR_OBJ   = 0x73;     // → ZP_SPRITE_OBJ

export const ZP_75 = 0x75;
export const ZP_76 = 0x76;
export const ZP_77 = 0x77;            // 保存 $25

export const ZP_PPU_LO  = 0x7A;       // → ZP_SCROLL_Y_BUF
export const ZP_PPUADDR_LO = 0xE6;    // → ZP_PPU_ADDR_LO
export const ZP_PPUADDR_HI = 0xE7;    // → ZP_PPU_ADDR_HI

export const ZP_ROW_CNT  = 0xE8;      // → ZP_FILL_ROW_CNT
export const ZP_BANK_TMP = 0xE9;      // → ZP_FILL_COL_CNT
export const ZP_GEN_EA   = 0xEA;
export const ZP_GEN_EB   = 0xEB;      // → ZP_FILL_TILE_VAL
export const ZP_GLOBAL_LO = 0xEC;     // → ZP_GLOBAL_PTR_LO
export const ZP_GLOBAL_HI = 0xED;     // → ZP_GLOBAL_PTR_HI

export const ZP_E2 = 0xE2;
export const ZP_E3 = 0xE3;
export const ZP_E4 = 0xE4;            // → ZP_E4_SEEN_MAX
export const ZP_E5 = 0xE5;            // → ZP_E5_BANK_MODE

export const ZP_F0 = 0xF0;
export const ZP_F1 = 0xF1;
export const ZP_F2 = 0xF2;
export const ZP_F3 = 0xF3;
export const ZP_F4 = 0xF4;
export const ZP_F5 = 0xF5;
export const ZP_F6 = 0xF6;
export const ZP_F7 = 0xF7;

// OAM 暂存区 (保持)
export const ZP_OAM_90 = 0x90;
export const ZP_OAM_91 = 0x91;
export const ZP_OAM_92 = 0x92;
export const ZP_OAM_93 = 0x93;
export const ZP_OAM_94 = 0x94;
export const ZP_OAM_95 = 0x95;
export const ZP_OAM_96 = 0x96;
export const ZP_OAM_97 = 0x97;
export const ZP_OAM_98 = 0x98;
export const ZP_OAM_99 = 0x99;

// WRAM 别名
export const STACK_PAGE   = 0x100;
export const DISPLAY_LIST         = 0x05E8;  // → WRAM_DISPLAY_LIST
export const DISPLAY_LIST_END     = 0x0628;  // → WRAM_DISPLAY_LIST_WR
export const DISPLAY_LIST_ATTR    = 0x0629;  // → WRAM_DISPLAY_LIST_BUSY
export const ATTR_BUF             = 0x062A;  // → WRAM_PALETTE_BUF
export const DISP_EXT             = 0x0468;  // → WRAM_OAM_SHADOW
export const DISP_EXT_SIZE        = 256;
export const FIELD_PLAYER_BUF     = 0x0446;  // → WRAM_FIELD_PLAYERS
export const FIELD_CALC_BUF       = 0x0656;  // → WRAM_MATCH_CALC
export const TEAM_SLOT            = 0x0700;  // → WRAM_TEAM_SLOTS
export const TEAM_SLOT_SIZE       = 256;

// 游戏常量别名
export const TEXT_MAX_LINES    = 15;
export const DISP_MAX_ENTRIES  = 10;
export const PLAYER_COUNT      = 10;
export const PLAYER_ARRAY_BYTES = 20;
export const PLAYER_MAX_INDEX  = 22;

// ============================================================
// CHR Tile 可视化常量 (保持)
// ============================================================

export const PIXEL_CHARS: readonly string[] = [
  '  ',  // 0 = 背景/透明
  '░░',  // 1
  '▒▒',  // 2
  '██',  // 3
] as const;

export interface TileDef {
  readonly ascii: readonly string[];
  readonly bp0: readonly number[];
  readonly bp1: readonly number[];
}
