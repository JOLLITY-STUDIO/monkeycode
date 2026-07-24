/**
 * ============================================================================
 * 足球小将 II — 常量定义
 *
 * 来源: src/disasm/_constants.ts (人工翻译 + ASM 上下文分析)
 *
 * NES 硬件地址空间 (所有 NES 游戏一致):
 *   0x0000-0x07FF   RAM (2KB)
 *   0x2000-0x2007   PPU 寄存器
 *   0x4000-0x4016   APU 寄存器
 *   0x6000-0x7FFF   SRAM (8KB)
 *   0x8000-0xFFFF   PRG-ROM (MMC3 可换 bank)
 *     $8000-$9FFF   可换 bank (MMC3 R6)
 *     $A000-$BFFF   可换 bank (MMC3 R7)
 *     $C000-$DFFF   bank_30 固定
 *     $E000-$FFFF   bank_31 固定 (含 NMI/IRQ/RESET 向量)
 *
 * PRG bank 分类 (每 bank 8KB):
 *   代码: bank_00 (4629 code), bank_02 (736), bank_12 (1414), bank_30 (170)
 *   数据: bank_03, 06, 07, 08, 09, 10, 15, 31
 *
 * CHR bank 15 ($0F): 开场动画 tileset, ROM 0x5E010-0x5FFFF
 * ============================================================================
 */

// ============================================================
// §1 位元旗标 / 遮罩
// ============================================================

export const BIT_0 = 1;             // $01
export const BIT_2 = 4;             // $04
export const BIT_3 = 8;             // $08
export const BIT_4 = 16;            // $10
export const BIT_5 = 32;            // $20
export const BIT_6 = 64;            // $40
export const BIT_7 = 128;           // $80

export const MASK_LO4     = 15;     // $0F  低 4 bit
export const MASK_PAL_ATTR = 48;    // $30  bit4-bit5 (调色板属性)
export const MASK_HI2     = 192;    // $C0  高 2 bit (方向/状态)
export const MASK_HI3     = 224;    // $E0  高 3 bit
export const MASK_HI4     = 240;    // $F0  高 4 bit
export const MASK_ALIGN_8 = 248;    // $F8  低 3 bit 清零 → 对齐 8px
export const MASK_ALIGN_4 = 252;    // $FC  低 2 bit 清零 → 对齐 4px
export const MASK_CLR_SIGN = 127;   // $7F  bit7 清零 → 转为正值
export const MASK_BIT_7_5_4 = 176;  // $B0  AND #$B0, 方向/旗标合并

export const TERMINATOR = 255;      // $FF  列表终止符
export const SENTINEL   = 254;      // $FE  哨兵值

// ============================================================
// §2 NES 硬件寄存器
// ============================================================

/** 内部 RAM 地址掩码 (2KB 镜像填充到 8KB) */
export const INTERNAL_RAM_MASK = 0x07ff;
export const INTERNAL_RAM_END  = 0x2000;

// PPU 寄存器
export const PPUCTRL   = 0x2000;
export const PPUMASK   = 0x2001;
export const PPUSTATUS = 0x2002;
export const OAMADDR   = 0x2003;
export const OAMDATA   = 0x2004;
export const PPUSCROLL = 0x2005;
export const PPUADDR   = 0x2006;
export const PPUDATA   = 0x2007;

// PPUCTRL 旗标
export const PPUCTRL_NMI       = BIT_7;
export const PPUCTRL_SPR_8X16  = BIT_5;
export const PPUCTRL_NT_MASK   = 3;
export const PPUCTRL_INC32     = BIT_2;

// PPUMASK 旗标
export const PPUMASK_SHOW_SPR  = BIT_4;
export const PPUMASK_SHOW_BG   = BIT_3;
export const PPUMASK_NO_CLIP   = 30;  // $1E = BIT_4|BIT_3|BIT_2|BIT_1

// APU 寄存器
export const APU_PULSE1_CTRL = 0x4000;
export const APU_SQ2_VOL     = 0x4004;
export const APU_TRI_LINEAR  = 0x4008;
export const APU_NOISE_VOL   = 0x400C;
export const APU_STATUS      = 0x4015;
export const JOYPAD1         = 0x4016;
export const JOYPAD2         = 0x4017;

export const CARTRIDGE_START = 0x4020;
export const PRG_ROM_START   = 0x8000;
export const PRG_ROM_END     = 0xFFFF;

// MMC3 mapper (MMC3 mapper 4)
export const MMC3_BANK_SEL  = 0x8000;
export const MMC3_BANK_DATA = 0x8001;

/** MMC3 寄存器分配:
 *  R0/R1: CHR 2KB (PPU $0000-$0FFF)
 *  R2-R5: CHR 1KB (PPU $1000-$1FFF)
 *  R6:    PRG $8000-$9FFF
 *  R7:    PRG $A000-$BFFF
 */
export const MMC3_REG_CHR_2K_LO = 0;
export const MMC3_REG_CHR_2K_HI = 1;
export const MMC3_REG_CHR_1K_0  = 2;
export const MMC3_REG_CHR_1K_1  = 3;
export const MMC3_REG_CHR_1K_2  = 4;
export const MMC3_REG_CHR_1K_3  = 5;
export const MMC3_REG_PRG_LO    = 6;
export const MMC3_REG_PRG_HI    = 7;

// ============================================================
// §3 PPU 地址
// ============================================================

export const PPU_NT0      = 0x2000;
export const PPU_NT0_HI   = 0x20;
export const PPU_NT1_HI   = 0x24;
export const PPU_NT2_HI   = 0x28;
export const PPU_NT3_HI   = 0x2C;
export const PPU_ROW_OFFSET = 32;   // 每行 32 tile
export const PALETTE_SIZE = 64;     // $40

// ============================================================
// §4 精灵 / OAM
// ============================================================

export const SPRITE_HIDE_Y   = 240;   // $F0, Y >= 此值不显示
export const SPR_ATTR_FLIP_H = BIT_6;
export const SPR_ATTR_FLIP_V = BIT_7;
export const OAM_SIZE        = 256;   // 64 精灵 × 4 bytes
export const OAM_BUF         = 0x200; // $0200
export const OAM_BASE        = 0x200;

// ============================================================
// §5 零页地址 ($0000-$00FF)
// ============================================================

export const ZP_TMP_00   = 0x00;       // 通用临时
export const ZP_TMP_01   = 0x01;
export const ZP_TMP_02   = 0x02;
export const ZP_TMP_03   = 0x03;

export const ZP_NMI_FLAG  = 0x09;
export const ZP_IRQ_FLAG  = 0x0A;

export const ZP_SCROLL_X  = 0x0D;
export const ZP_SCROLL_Y  = 0x0E;
export const ZP_CNT_11    = 0x11;
export const ZP_CNT_12    = 0x12;

export const ZP_JOYPAD1     = 0x1B;   // 控制器输入
export const ZP_JOYPAD1_NEW = 0x1C;   // 新按键
export const ZP_JOYPAD1_PREV = 0x1E;  // 上一帧按键

export const ZP_PPUCTRL_MIRROR = 0x20; // PPU 控制寄存器镜像
export const ZP_PPUMASK_MIRROR = 0x21;
export const ZP_SCROLL_X_VAL   = 0x22; // PPU 滚动 X
export const ZP_SCROLL_Y_VAL   = 0x23; // PPU 滚动 Y

export const ZP_FRAME_CNT    = 0x24;  // 帧计数器
export const ZP_SCENE_BANK   = 0x25;  // 场景 bank 号
export const ZP_SCENE_STATE  = 0x26;  // 场景状态
export const ZP_JMP_IDX      = 0x27;  // 跳转表索引

export const ZP_28 = 0x28;
export const ZP_29 = 0x29;
export const ZP_2A = 0x2A;            // 场景类型 (2=比赛)
export const ZP_2B = 0x2B;
export const ZP_2C = 0x2C;

export const ZP_AUDIO_FLAG = 0x30;    // 音频旗标

export const ZP_32 = 0x32;
export const ZP_33 = 0x33;
export const ZP_34 = 0x34;            // 最高频引用
export const ZP_PTR_36 = 0x36;        // 指标暂存

export const ZP_LOOP_CNT = 0x3A;      // 最核心循环计数
export const ZP_3B = 0x3B;
export const ZP_3C = 0x3C;
export const ZP_3D = 0x3D;
export const ZP_3E = 0x3E;
export const ZP_3F = 0x3F;

export const ZP_CNT_40       = 0x40;  // 循环计数器
export const ZP_JOYPAD_TMP   = 0x41;  // 手柄暂存
export const ZP_42 = 0x42;
export const ZP_43 = 0x43;
export const ZP_SCROLL_X_POS = 0x44;  // 滚动 X 位置
export const ZP_SCROLL_REL   = 0x45;  // 滚动相关
export const ZP_46 = 0x46;
export const ZP_47 = 0x47;

export const ZP_DIGIT_100    = 0x48;  // 百位
export const ZP_DIGIT_10     = 0x49;  // 十位
export const ZP_DISP_ATTR_X  = 0x4A;  // X 计数
export const ZP_DISP_ATTR_Y  = 0x4B;  // Y 计数
export const ZP_SCENE_STATUS = 0x4C;  // 场景状态

export const ZP_SCRIPT_LO = 0x4D;     // 脚本指针低
export const ZP_SCRIPT_HI = 0x4E;     // 脚本指针高
export const ZP_SCRIPT_ROW = 0x4F;    // 脚本行
export const ZP_SCRIPT_COL = 0x50;    // 脚本列
export const ZP_SCANLINE   = 0x51;
export const ZP_SCREEN_COL = 0x52;
export const ZP_SCREEN_ROW = 0x53;
export const ZP_LINE_LIMIT  = 0x54;   // 行限制
export const ZP_TEXT_LINES  = 0x55;   // 总行数
export const ZP_CUR_BANK    = 0x56;   // 当前 bank
export const ZP_SAVE_SCRIPT_LO = 0x58;
export const ZP_SAVE_SCRIPT_HI = 0x59;
export const ZP_SAVE_BANK = 0x5A;
export const ZP_FLAGS     = 0x5B;

export const ZP_ATTR_IDX = 0x5C;
export const ZP_5D = 0x5D;
export const ZP_5E = 0x5E;
export const ZP_5F = 0x5F;

export const ZP_SPR_ATTR = 0x62;      // 精灵方向旗标
export const ZP_SPR_DIR   = 0x62;     // 别名: 方向
export const ZP_SCENE_PTR_LO = 0x63;
export const ZP_SCENE_PTR_HI = 0x64;
export const ZP_SPR_PTR_LO = 0x70;
export const ZP_SPR_PTR_HI = 0x71;
export const ZP_SPR_IDX    = 0x72;    // 精灵索引
export const ZP_SPR_OBJ    = 0x73;    // 物件编号

export const ZP_75 = 0x75;
export const ZP_76 = 0x76;
export const ZP_77 = 0x77;            // 保存 $25
export const ZP_NMI_TIMER   = 0x78;   // NMI 计时器 (bank_02 设为 4)
export const ZP_PPU_MODE    = 0x79;   // bit7=1 PPUADDR 模式
export const ZP_PPU_LO      = 0x7A;   // PPU 滚动 Y / PPUADDR LO
export const ZP_SCROLL_X_NT = 0x7B;   // PPU 滚动 X / nametable bits

export const ZP_OBJ_PTR_LO = 0x7C;
export const ZP_OBJ_PTR_HI = 0x7D;

// OAM 暂存区
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

/**
 * CHR bank 缓存 (bank_02 NMI 写入 MMC3 R2-R5)
 *
 * 存在这里的**值**是 CHR-ROM bank 编号，不是寄存器号。
 * 例如值 $3C (60) → CHR bank_15 (1KB 模式下 bank 号 = 60/4 = 15)
 *
 * MMC3 CHR 实际映射:
 *   R0: 2KB → PPU $0000-$07FF  (不在 ZP 缓存)
 *   R1: 2KB → PPU $0800-$0FFF  (不在 ZP 缓存)
 *   R2: 1KB → PPU $1000-$13FF
 *   R3: 1KB → PPU $1400-$17FF
 *   R4: 1KB → PPU $1800-$1BFF
 *   R5: 1KB → PPU $1C00-$1FFF
 */
export const ZP_CHR_BANK_2 = 0x9E;    // MMC3 R2 缓存: PPU $1000-$13FF
export const ZP_CHR_BANK_3 = 0x9F;    // MMC3 R3 缓存: PPU $1400-$17FF
export const ZP_CHR_BANK_4 = 0xA0;    // MMC3 R4 缓存: PPU $1800-$1BFF
export const ZP_CHR_BANK_5 = 0xA1;    // MMC3 R5 缓存: PPU $1C00-$1FFF

export const ZP_NMI_TRIGGER = 0xE0;
export const ZP_VBLANK_DONE = 0xE1;
export const ZP_E2 = 0xE2;
export const ZP_E3 = 0xE3;
export const ZP_E4 = 0xE4;            // 场景状态/备份
export const ZP_E5 = 0xE5;            // bank 模式

export const ZP_PPUADDR_LO = 0xE6;    // 写入 PPUADDR 前 (也用作 CHR 配置表指针)
export const ZP_PPUADDR_HI = 0xE7;

export const ZP_ROW_CNT  = 0xE8;      // 行计数
export const ZP_BANK_TMP = 0xE9;      // bank 暂存
export const ZP_GEN_EA   = 0xEA;      // 泛用
export const ZP_GEN_EB   = 0xEB;      // 泛用
export const ZP_GLOBAL_LO = 0xEC;     // 全域指标低
export const ZP_GLOBAL_HI = 0xED;     // 全域指标高

export const ZP_F0 = 0xF0;
export const ZP_F1 = 0xF1;
export const ZP_F2 = 0xF2;
export const ZP_F3 = 0xF3;
export const ZP_F4 = 0xF4;
export const ZP_F5 = 0xF5;
export const ZP_F6 = 0xF6;
export const ZP_F7 = 0xF7;

// ============================================================
// §6 工作 RAM ($0100-$07FF)
// ============================================================

export const STACK_PAGE = 0x100;

/** 显示列表 (NMI 期间执行):
 *  每笔 4 bytes: [attr][PPU_LO][PPU_HI][tile]
 *  bank_02 写入 → bank_30 NMI handler 执行 → PPU
 */
export const DISPLAY_LIST      = 0x05E8; // $05E8
export const DISPLAY_LIST_END  = 0x0628; // 非 0 有待显示数据
export const DISPLAY_LIST_ATTR = 0x0629; // bit6=1 跳过 PPU 写入
export const ATTR_BUF = 0x062A;          // 属性表暂存 (32 bytes)

export const DISP_EXT      = 0x0468;     // 额外显示列表
export const DISP_EXT_SIZE = 256;

export const FIELD_PLAYER_BUF = 0x0446;   // 在场球员座标/状态
export const FIELD_CALC_BUF   = 0x0656;   // 中场计算暂存

export const TEAM_SLOT      = 0x0700;     // 队伍槽位 ($0700-$07FF)
export const TEAM_SLOT_SIZE = 256;

// ============================================================
// §7 游戏常量
// ============================================================

export const TEXT_MAX_LINES    = 15;     // 文本最大行数
export const DISP_MAX_ENTRIES  = 10;     // 显示清单每页最大笔数
export const PLAYER_COUNT      = 10;     // 在场球员数量
export const PLAYER_ARRAY_BYTES = 20;    // 10 人 × 2 byte
export const PLAYER_MAX_INDEX  = 22;     // 替补球员上限

/** 场景状态值 ($26 比较用) */
export const SCENE_STATE_INIT    = 0;
export const SCENE_STATE_TITLE   = 1;
export const SCENE_STATE_MODE_6  = 6;
export const SCENE_STATE_MODE_12 = 12;
export const SCENE_STATE_MODE_16 = 16;
export const SCENE_STATE_RUNNING = 32;

export const MODE_OFFSET_6  = 16;        // scene $06 用
export const MODE_OFFSET_12 = 26;        // scene $0C 用
export const MODE_OFFSET_16 = 36;        // scene $10 用

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
