// ============================================================================
// constants.ts — 全局常量（精简版，游戏所需的核心定义）
// ============================================================================

// ---- NES 内存布局 ----
export const ZP_START       = 0;
export const STACK_PAGE     = 256;
export const WRAM_END       = 2048;
export const PPU_REG_START  = 8192;
export const PPU_REG_END    = 16384;
export const APU_REG_START  = 16384;
export const APU_REG_END    = 16416;
export const CART_EXP_START = 16416;
export const SRAM_START     = 24576;
export const SRAM_END       = 32768;
export const PRG_ROM_START  = 32768;
export const PRG_ROM_END    = 65535;
export const PRG_WINDOW_SIZE = 8192;

// ---- PPU 寄存器 ----
export const PPU_CTRL   = 8192;
export const PPU_MASK   = 8193;
export const PPU_STATUS = 8194;
export const PPU_OAMADDR = 8195;
export const PPU_OAMDATA = 8196;
export const PPU_SCROLL  = 8197;
export const PPU_ADDR    = 8198;
export const PPU_DATA    = 8199;
export const PPU_OAM_DMA = 16404;

// ---- APU / Joypad ----
export const JOYPAD1 = 16406;
export const JOYPAD2 = 16407;

// ---- PPUCTRL 标志 ----
export const PPUCTRL_NMI       = 128;
export const PPUCTRL_SPR_8X16  = 32;
export const PPUCTRL_BG_TABLE  = 16; // 0=$0000, 1=$1000
export const PPUCTRL_SPR_TABLE = 8;  // 0=$0000, 1=$1000
export const PPUCTRL_INC32     = 4;  // 0=+1, 1=+32
export const PPUCTRL_NT_MASK   = 3;

// ---- PPUMASK 标志 ----
export const PPUMASK_SPR    = 16;
export const PPUMASK_BG     = 8;
export const PPUMASK_NO_CLIP = 30;

// ---- 位运算常量和掩码 ----
export const BIT_0 = 1;
export const BIT_1 = 2;
export const BIT_2 = 4;
export const BIT_3 = 8;
export const BIT_4 = 16;
export const BIT_5 = 32;
export const BIT_6 = 64;
export const BIT_7 = 128;

export const MASK_LO4 = 15;
export const MASK_HI4 = 240;

// ---- Zero Page 语义化地址 ----
// 游戏核心 ZP 变量 — 来自 ROM 反汇编分析
export const ZP_FRAME_COUNTER   = 36;  // 帧计数器
export const ZP_SCENE_ID        = 38;  // 场景 ID
export const ZP_DISPATCH_INDEX  = 39;  // 场景分发索引
export const ZP_SCENE_FRAME     = 40;  // 场景帧计数
export const ZP_FRAME_TARGET    = 41;  // 帧目标
export const ZP_MATCH_HALF      = 42;  // 半场标志
export const ZP_STAGE_NUMBER    = 43;  // 关数
export const ZP_ROSTER_FLAG     = 44;  // 阵容标志

export const ZP_LOOP_COUNTER    = 58;  // 核心循环计数器
export const ZP_3B              = 59;
export const ZP_3C              = 60;
export const ZP_3D              = 61;
export const ZP_3E              = 62;
export const ZP_3F              = 63;

export const ZP_JOYPAD_TMP     = 65;  // 手柄临时值
export const ZP_SCROLL_X_POS   = 68;  // 滚动 X 位置
export const ZP_SCROLL_REL     = 69;  // 滚动相对值
export const ZP_DIGIT_100      = 72;  // 百位数
export const ZP_DIGIT_10       = 73;  // 十位数
export const ZP_BG_BRIGHTNESS  = 74;  // 背景亮度
export const ZP_SPR_BRIGHTNESS = 75;  // 精灵亮度
export const ZP_SCRIPT_STATUS  = 76;  // 脚本状态

export const ZP_SCRIPT_LO      = 77;  // 脚本指针低字节
export const ZP_SCRIPT_HI      = 78;  // 脚本指针高字节
export const ZP_CURSOR_COL     = 83;  // 光标列
export const ZP_MIN_COL        = 84;  // 最小列
export const ZP_LINE_COUNT     = 85;  // 行计数
export const ZP_DATA_BANK      = 86;  // 数据 bank
export const ZP_SCRIPT_SAVE_LO = 88;
export const ZP_SCRIPT_SAVE_HI = 89;
export const ZP_SAVED_BANK     = 90;
export const ZP_SCENE_FLAGS    = 91;

export const ZP_SPRITE_ATTR    = 98;
export const ZP_SPRITE_INDEX   = 114;
export const ZP_SPRITE_OBJ     = 115;
export const ZP_75             = 117;
export const ZP_76             = 118;

export const ZP_PPU_ADDR_LO    = 230;
export const ZP_PPU_ADDR_HI    = 231;
export const ZP_GLOBAL_PTR_LO  = 236;
export const ZP_GLOBAL_PTR_HI  = 237;

// ---- WRAM 语义化地址 ----
export const WRAM_OAM_SHADOW        = 1128;  // OAM shadow buffer
export const WRAM_FIELD_PLAYERS     = 1094;  // 场上球员数据
export const WRAM_DISPLAY_LIST     = 1512;   // 显示列表
export const WRAM_DISPLAY_LIST_WR  = 1576;   // 显示列表写指针
export const WRAM_DISPLAY_LIST_BUSY = 1577;  // 显示列表忙标志
export const WRAM_PALETTE_BUF      = 1578;   // 调色板缓冲
export const WRAM_MATCH_CALC       = 1622;   // 比赛计算区
export const WRAM_TEAM_SLOTS       = 1792;   // 队伍阵容槽
export const WARM_BOOT_MARKER      = 1792;   // 热启动标记

// ---- 屏幕常量 ----
export const SCREEN_W = 256;
export const SCREEN_H = 240;
export const TILE_SIZE = 8;

// ---- 帧时序 ----
/** NTSC NES 每帧 CPU 周期 */
export const CYCLES_PER_FRAME = 29780;

// ---- 控制流常量 ----
export const TERMINATOR = 255;
export const SENTINEL   = 254;

// ---- RESET 向量 ----
export const RESET_VECTOR_LO = 65532;
export const RESET_VECTOR_HI = 65533;
export const NMI_VECTOR_LO   = 65530;
export const NMI_VECTOR_HI   = 65531;
