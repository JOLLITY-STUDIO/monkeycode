/**
 * ============================================================================
 * 天使之翼 II — 内存地址常量 (全命名)
 *
 * 覆盖零页 ($0000-$00FF) 和工作 RAM ($0100-$07FF) 中有意义的地址。
 * 所有地址均以描述性英文命名，替代无意义的 $XX 十六进制引用。
 * ============================================================================
 */

// ============================================================
// §1 零页 — 通用临时变量 ($0000-$000E)
// ============================================================

export const ZP_TMP_00   = 0x00;       // 通用临时 0
export const ZP_TMP_01   = 0x01;       // 通用临时 1
export const ZP_TMP_02   = 0x02;       // 通用临时 2
export const ZP_TMP_03   = 0x03;       // 通用临时 3

export const ZP_NMI_FLAG  = 0x09;      // NMI 旗标 (bit7=已发生 NMI)
export const ZP_IRQ_FLAG  = 0x0A;      // IRQ 旗标

export const ZP_SCROLL_X  = 0x0D;      // 滚动 X 暂存
export const ZP_SCROLL_Y  = 0x0E;      // 滚动 Y 暂存

// ============================================================
// §2 零页 — 输入 ($001B-$001F)
// ============================================================

export const ZP_JOYPAD1         = 0x1B;  // Joypad1 当前状态
export const ZP_JOYPAD1_NEW     = 0x1C;  // Joypad1 新按下
export const ZP_JOYPAD1_PREV    = 0x1E;  // Joypad1 上帧状态

// ============================================================
// §3 零页 — PPU 控制 ($0020-$0023)
// ============================================================

export const ZP_PPUCTRL_MIRROR  = 0x20;  // PPUCTRL 镜像 (写入 $2000 前)
export const ZP_PPUMASK_MIRROR  = 0x21;  // PPUMASK 镜像 (写入 $2001 前)
export const ZP_SCROLL_X_VAL    = 0x22;  // PPUSCROLL X 缓存
export const ZP_SCROLL_Y_VAL    = 0x23;  // PPUSCROLL Y 缓存

// ============================================================
// §4 零页 — 核心游戏状态 ($0024-$002C)
// ============================================================

export const ZP_FRAME_COUNTER    = 0x24;  // 帧计数器 (每 NMI +1)
export const ZP_SCENE_BANK       = 0x25;  // 场景数据所在 PRG bank 号
export const ZP_SCENE_ID         = 0x26;  // 场景编号 / 游戏总进度 ($00-$21)
export const ZP_DISPATCH_INDEX   = 0x27;  // 场景内状态机分派索引
export const ZP_SCENE_FRAME      = 0x28;  // 场景帧计数器
export const ZP_FRAME_TARGET     = 0x29;  // 场景目标帧数 (到达则推进)
export const ZP_MATCH_HALF       = 0x2A;  // 比赛半场: 0=上半场, 1=下半场
export const ZP_STAGE_NUMBER     = 0x2B;  // 关卡编号 (= $26 + 3)
export const ZP_ROSTER_FLAG      = 0x2C;  // 阵容类型标记

// ============================================================
// §5 零页 — 音频 ($0030)
// ============================================================

export const ZP_AUDIO_FLAG = 0x30;       // 音频控制旗标

// ============================================================
// §6 零页 — 指针 / 暂存 ($0032-$003F)
// ============================================================

export const ZP_PTR_36 = 0x36;           // 指针暂存 (2 字节)
export const ZP_LOOP_COUNTER = 0x3A;     // 核心循环计数 (最高频引用)

// ============================================================
// §7 零页 — 渲染/显示 ($0040-$005B)
// ============================================================

export const ZP_BG_BRIGHTNESS  = 0x4A;   // BG 调色板亮度 (0-15)
export const ZP_SPR_BRIGHTNESS = 0x4B;   // Sprite 调色板亮度 (0-15)
export const ZP_SCRIPT_STATUS  = 0x4C;   // 脚本引擎状态 (bit7=新指令)
export const ZP_SCRIPT_PTR_LO  = 0x4D;   // 脚本/数据指针低字节
export const ZP_SCRIPT_PTR_HI  = 0x4E;   // 脚本/数据指针高字节
export const ZP_SCRIPT_ROW     = 0x4F;   // 脚本行位置
export const ZP_SCRIPT_COL     = 0x50;   // 脚本列位置
export const ZP_SCANLINE       = 0x51;   // 当前扫描线
export const ZP_SCREEN_COL     = 0x52;   // 屏幕列
export const ZP_CURSOR_COL     = 0x53;   // 光标列位置
export const ZP_MIN_COL        = 0x54;   // 最小列限制
export const ZP_LINE_COUNT     = 0x55;   // 文本总行数
export const ZP_DATA_BANK      = 0x56;   // 当前数据 bank 号
export const ZP_SCRIPT_SAVE_LO = 0x58;   // 脚本指针保存 (低)
export const ZP_SCRIPT_SAVE_HI = 0x59;   // 脚本指针保存 (高)
export const ZP_SAVED_BANK     = 0x5A;   // 保存的 bank 号
export const ZP_SCENE_FLAGS    = 0x5B;   // 场景旗标

// ============================================================
// §8 零页 — 精灵指针 ($0062-$007D)
// ============================================================

export const ZP_SPRITE_ATTR    = 0x62;   // 精灵属性/方向旗标
export const ZP_SCENE_PTR_LO   = 0x63;   // 场景指针 (低)
export const ZP_SCENE_PTR_HI   = 0x64;   // 场景指针 (高)
export const ZP_SPRITE_PTR_LO  = 0x70;   // 精灵数据指针 (低)
export const ZP_SPRITE_PTR_HI  = 0x71;   // 精灵数据指针 (高)
export const ZP_SPRITE_INDEX   = 0x72;   // 精灵索引
export const ZP_SPRITE_OBJ     = 0x73;   // 精灵物件编号
export const ZP_NMI_TIMER      = 0x78;   // NMI 计时器
export const ZP_PPU_MODE       = 0x79;   // PPU 模式 (bit7=PPUADDR mode)
export const ZP_SCROLL_Y_BUF   = 0x7A;   // 滚动 Y / PPUADDR LO 缓冲
export const ZP_SCROLL_X_NT    = 0x7B;   // 滚动 X / Nametable 位
export const ZP_OBJ_PTR_LO     = 0x7C;   // 物件指针 (低)
export const ZP_OBJ_PTR_HI     = 0x7D;   // 物件指针 (高)

// ============================================================
// §9 零页 — CHR Bank 缓存 ($009E-$00A1)
// ============================================================

export const ZP_CHR_BANK_2 = 0x9E;       // MMC3 R2 缓存: PPU $1000-$13FF
export const ZP_CHR_BANK_3 = 0x9F;       // MMC3 R3 缓存: PPU $1400-$17FF
export const ZP_CHR_BANK_4 = 0xA0;       // MMC3 R4 缓存: PPU $1800-$1BFF
export const ZP_CHR_BANK_5 = 0xA1;       // MMC3 R5 缓存: PPU $1C00-$1FFF

// ============================================================
// §10 零页 — 高端暂存 ($00E0-$00ED)
// ============================================================

export const ZP_NMI_TRIGGER   = 0xE0;    // NMI 触发标志
export const ZP_VBLANK_DONE   = 0xE1;    // VBlank 完成标志
export const ZP_E4_SEEN_MAX   = 0xE4;    // 已见过的最大场景号
export const ZP_E5_BANK_MODE  = 0xE5;    // Bank 切换模式
export const ZP_PPU_ADDR_LO   = 0xE6;    // PPU 写入地址低字节缓冲
export const ZP_PPU_ADDR_HI   = 0xE7;    // PPU 写入地址高字节缓冲
export const ZP_FILL_ROW_CNT  = 0xE8;    // 矩形填充行数
export const ZP_FILL_COL_CNT  = 0xE9;    // 矩形填充列数
export const ZP_FILL_TILE_VAL = 0xEB;    // 矩形填充 tile 值
export const ZP_GLOBAL_PTR_LO = 0xEC;    // 全局指针 (低)
export const ZP_GLOBAL_PTR_HI = 0xED;    // 全局指针 (高)

// ============================================================
// §11 工作 RAM — PPU 缓冲/渲染区域
// ============================================================

/** $05E8: Display List 命令缓冲队列 (NMI 期间消费) */
export const WRAM_DISPLAY_LIST      = 0x05E8;
/** $0628: Display List 写指针 */
export const WRAM_DISPLAY_LIST_WR   = 0x0628;
/** $0629: Display List 忙标志 (bit6=1 跳过写) */
export const WRAM_DISPLAY_LIST_BUSY = 0x0629;
/** $062A: 32 字节调色板 RAM 缓冲 */
export const WRAM_PALETTE_BUF       = 0x062A;
/** $0468: 256 字节 OAM Shadow / 额外 Display List */
export const WRAM_OAM_SHADOW        = 0x0468;

// ============================================================
// §12 工作 RAM — 球员/比赛数据
// ============================================================

/** $0300: 阵容 — 11 名球员数据 ($0300-$0383, 每球员 12 字节) */
export const WRAM_ROSTER_BASE   = 0x0300;
export const WRAM_ROSTER_SIZE   = 12;     // 每球员 12 字节
export const WRAM_ROSTER_COUNT  = 11;     // 最多 11 人

/** $0408: 阵型数据 (10 位置 × 4 字节 = $0408-$042B) */
export const WRAM_FORMATION_BASE = 0x0408;

/** $0446: 场上球员坐标/状态缓冲区 */
export const WRAM_FIELD_PLAYERS = 0x0446;

/** $0656: 中场计算暂存 */
export const WRAM_MATCH_CALC    = 0x0656;

/** $0700: 队伍槽位 ($0700-$07FF, 共 256 字节) */
export const WRAM_TEAM_SLOTS    = 0x0700;

// ============================================================
// §13 NES 硬件寄存器 (方便引用)
// ============================================================

export const PPUCTRL   = 0x2000;         // PPU 控制寄存器
export const PPUMASK   = 0x2001;         // PPU 遮罩寄存器
export const PPUSTATUS = 0x2002;         // PPU 状态寄存器
export const OAMADDR   = 0x2003;         // OAM 地址
export const OAMDATA   = 0x2004;         // OAM 数据
export const PPUSCROLL = 0x2005;         // 滚动
export const PPUADDR   = 0x2006;         // PPU 地址
export const PPUDATA   = 0x2007;         // PPU 数据

export const JOYPAD1   = 0x4016;         // 手柄 1
export const JOYPAD2   = 0x4017;         // 手柄 2

export const MMC3_BANK_SEL  = 0x8000;    // MMC3 寄存器选择
export const MMC3_BANK_DATA = 0x8001;    // MMC3 寄存器数据
