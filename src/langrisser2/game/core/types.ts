/**
 * 核心类型定义 — 基于 Sega Genesis 硬件规格和 Langrisser II ROM 实际结构
 *
 * @see 20260713/asm/m68k/memery_map.md — Ghidra 内存映射校验
 * @see 20260713/analysis/rom-analysis-report.md — ROM 结构分析
 */

// ============================================================
// ROM 内存布局
// ============================================================

/** ROM 地址范围 */
export const ROM_RANGE = { start: 0x000000, end: 0x1FFFFF, size: 0x200000 } as const;

/** ROM 内关键区域 */
export const ROM_REGIONS = {
  /** 中断向量表 */       vectors:       { start: 0x000000, end: 0x0000FF },
  /** ROM 头部信息 */      header:        { start: 0x000100, end: 0x0001FF },
  /** 启动代码 */          boot:          { start: 0x000200, end: 0x007FFF },
  /** 核心系统 */          kernel:        { start: 0x008000, end: 0x00FFFF },
  /** 游戏逻辑主体 */       gameLogic:     { start: 0x010000, end: 0x05DFFF },
  /** 角色/对话数据 */      charData:      { start: 0x05E000, end: 0x06FFFF },
  /** 地图/场景配置 */      mapConfig:     { start: 0x070000, end: 0x08FFFF },
  /** 单位/音乐指针 */      unitMusicPtr:  { start: 0x090000, end: 0x0AFFFF },
  /** 资源指针表 */         resourcePtr:   { start: 0x0B0000, end: 0x0B7FFF },
  /** 压缩图形资源 */       compressedGfx: { start: 0x0B8000, end: 0x1DBFFF },
  /** Z80 音乐数据 */       z80Music:      { start: 0x1DC000, end: 0x1FFFFF },
} as const;

// ============================================================
// 68K 地址空间 (16MB)
// ============================================================

export const ADDRESS_SPACE = {
  ROM:     { start: 0x000000, end: 0x1FFFFF },
  IO:      { start: 0xA00000, end: 0xA1001F },
  VDP:     { start: 0xC00000, end: 0xC00011 },
  RAM:     { start: 0xFF0000, end: 0xFFFFFF },
  RAM_MIRROR: { start: 0xFFFF0000, end: 0xFFFFFFFF },
} as const;

/** 68K 工作 RAM: 64KB */
export const RAM_SIZE = 0x10000;

// ============================================================
// VDP 内存布局
// ============================================================

/** VRAM: 64KB */
export const VRAM_SIZE = 0x10000;

/** VDP VRAM 区域 (按 VDP 寄存器配置) */
export const VDP_VRAM_LAYOUT = {
  TILE_POOL:      { start: 0x0000, end: 0xBFFF, size: 0xC000 },  // 49KB tile 图案 (BG+Sprite 共享)
  PLANE_A_TABLE:  { start: 0xC000, end: 0xCFFF, size: 0x1000 },  // 4KB Plane A Nametable
  SPRITE_ATTR:    { start: 0xD800, end: 0xDBFF, size: 0x0400 },  // 1KB Sprite Attribute Table (80×8B)
  PLANE_B_TABLE:  { start: 0xE000, end: 0xEFFF, size: 0x1000 },  // 4KB Plane B Nametable
  WINDOW_TABLE:   { start: 0xF000, end: 0xFFFF, size: 0x1000 },  // 4KB Window Nametable
  HSCROLL:        { start: 0xF400, end: 0xF6B7, size: 0x02B8 },  // HScroll 表 (实际使用 184 word)
} as const;

/** CRAM: 128 字节 = 4 组调色板 × 16 色 × 2 字节/色 */
export const CRAM_SIZE = 128;

/** VSRAM: 40 word = 80 字节垂直滚动数据 */
export const VSRAM_SIZE = 40;

// ============================================================
// VDP 端口地址 (68K 地址空间)
// ============================================================

export const VDP_PORTS = {
  DATA:   0xC00000,  // VDP 数据端口 (16-bit)
  CTRL:   0xC00004,  // VDP 控制端口 (16-bit)
  HV:     0xC00008,  // HV 计数器 (只读, VBlank 检测)
  PSG:    0xC00011,  // PSG (可编程声音发生器, 1-bit)
  DEBUG:  0xC0001C,  // 调试寄存器
} as const;

// ============================================================
// VDP 寄存器索引 (共 24 个, $00-$17)
// ============================================================

export const VDP_REG = {
  MODE_SET_1:       0x00,  // 显示模式: HInt enable, HV counter latch
  MODE_SET_2:       0x01,  // 显示模式: Display enable, VInt enable, DMA enable, PAL/NTSC
  PLANE_A_ADDR:     0x02,  // Plane A Nametable 基地址 (×$400)
  WINDOW_ADDR:      0x03,  // Window Nametable 基地址 (×$400)
  PLANE_B_ADDR:     0x04,  // Plane B Nametable 基地址 (×$2000)
  SPRITE_ATTR_ADDR: 0x05,  // Sprite Attribute Table 基地址 (×$200)
  SPRITE_PAT_ADDR:  0x06,  // Sprite Pattern 基地址 (×$2000, 未使用保留)
  BG_COLOR:         0x07,  // 背景颜色 (palette idx 0 of CRAM 首组)
  HSCROLL_MODE:     0x0A,  // HScroll 模式 (0=整屏, 1=8px小组, 2=逐行)
  MODE_SET_3:       0x0B,  // 模式: External interrupt, VScroll mode
  MODE_SET_4:       0x0C,  // 模式: 40/32 cell 宽, Shadow/Highlight, Interlace
  HSCROLL_ADDR:     0x0D,  // HScroll 表基地址 (×$400)
  AUTOINC:          0x0F,  // VRAM 地址自增量
  PLANE_SIZE:       0x10,  // Plane A/B 尺寸 (bit0-1=A, bit4-5=B)
  WINDOW_H:         0x11,  // Window 水平位置
  WINDOW_V:         0x12,  // Window 垂直位置
  DMA_LEN_LO:       0x13,  // DMA 长度低字节
  DMA_LEN_HI:       0x14,  // DMA 长度高字节
  DMA_SRC_LO:       0x15,  // DMA 源地址低字节
  DMA_SRC_MID:      0x16,  // DMA 源地址中字节
  DMA_SRC_HI:       0x17,  // DMA 源地址高字节
} as const;

export const VDP_REG_COUNT = 24;

// ============================================================
// VDP 状态标志 (读 $C00004)
// ============================================================

export const VDP_STATUS = {
  FVAL:          0x0001,  // 帧已开始 (set at end of VBlank)
  ODD_FRAME:     0x0002,  // PAL: 奇帧, NTSC: 总是 1
  SPRITE_OVERFLOW:0x0004, // 精灵溢出 (扫描线精灵过多)
  SPRITE_COLLIDE: 0x0008, // 精灵碰撞
  ODD_FIELD:     0x0040,  // 交错模式: 奇场
  VBLANK:        0x0080,  // VBlank 期间
  HBLANK:        0x0100,  // HBlank 期间
  DMA_ACTIVE:    0x0200,  // DMA 进行中
} as const;

// ============================================================
// 显示参数
// ============================================================

/** NTSC: 320×224 活动区域, 60fps */
export const DISPLAY = {
  WIDTH:       320,
  HEIGHT:      224,
  TOTAL_LINES: 262,  // NTSC 总行数 (含 VBlank)
  VBLANK_START: 224, // VBlank 起始行
  HBLANK_WIDTH: 320, // 一行像素
  HCLOCKS:     3420, // 每行 Master Clock 数
} as const;

// ============================================================
// 精灵 (Sprite)
// ============================================================

export const SPRITE = {
  MAX_COUNT:     80,   // 最多 80 个精灵
  ENTRY_SIZE:    8,    // 每精灵 8 字节
  MAX_PER_LINE:  20,   // 每扫描线最多 20 个精灵
  MAX_PER_LINE_H40: 16,// H40 模式下每扫描线最多 16 个精灵
} as const;

/** 单精灵条目 (SAT 中的 8 字节布局) */
export interface SpriteEntry {
  y: number;           // Y 坐标 (bits 0-8, bit 9=0 → 在屏, 隐藏通过 $80 偏移)
  width: number;       // 宽 (tile 列数, bits 6-7 of byte 2)
  height: number;      // 高 (tile 行数, bits 4-5 of byte 2)
  link: number;        // 链表指针 (byte 3, $00-$7E, $7F=表尾, $80-$FF 无效)
  tile: number;        // 起始 tile 编号 (bits 0-10 of word 4-5)
  palette: number;     // 调色板 (bits 13-14, 0-3)
  priority: boolean;   // 优先级 (bit 15, 0=高, 1=低)
  hFlip: boolean;      // 水平翻转 (bit 12)
  vFlip: boolean;      // 垂直翻转 (bit 11)
  x: number;           // X 坐标 (bits 0-8, bit 9=0 → 在正常 X 范围)
}

// ============================================================
// Nametable Entry (Plane A/B/Window 的每个 cell)
// ============================================================

export interface NametableEntry {
  tileIndex: number;   // tile 编号 (bits 0-10)
  palette: number;     // 调色板 (bits 13-14, 0-3)
  priority: boolean;   // 优先级 (bit 15, 0=低, 1=高)
  hFlip: boolean;      // 水平翻转 (bit 11)
  vFlip: boolean;      // 垂直翻转 (bit 12)
}

// ============================================================
// 颜色类型
// ============================================================

/** Genesis 9-bit RGB (每通道 3-bit, $000-$EEE) */
export type GenesisColor = number;

/** 32-bit RGBA */
export interface RGBA {
  r: number;  // 0-255
  g: number;  // 0-255
  b: number;  // 0-255
  a: number;  // 0-255
}

// ============================================================
// 资源加载
// ============================================================

export const RESOURCES = {
  /** 资源指针表基址 */
  POINTER_TABLE_ROM: 0x0B0000,
  /** 解压缓冲区 */
  DECOMPRESS_RAM: 0xFF1000,
} as const;

/** 资源压缩类型 */
export enum CompressType {
  NIBBLE_RLE = 0x01,  // 4bpp tile Nibble RLE
  BITPLANE   = 0x02,  // 位平面压缩
  LZSS       = 0x03,  // LZSS 通用压缩
}

// ============================================================
// 中断向量
// ============================================================

export interface InterruptVectors {
  ssp: number;        // $000: 初始栈指针 (→ $FFFF00)
  reset: number;      // $004: 复位入口 (→ $00800A)
  busError: number;   // $008
  addrError: number;  // $00C
  illegalInstr: number;// $010
  divideByZero: number;// $014
  chkException: number;// $018
  trapvException: number;// $01C
  privilege: number;  // $020
  trace: number;      // $024
  line1010: number;   // $028
  line1111: number;   // $02C
  // ... other vectors ...
  hblank: number;     // $070: 行扫描中断 (→ $0084B8)
  vblank: number;     // $078: 场扫描中断 (→ $0082B4)
}

// ============================================================
// 控制器
// ============================================================

export const IO_PORTS = {
  VERSION:  0xA10001,
  DATA1:    0xA10003,  // 控制器 1 数据
  DATA2:    0xA10005,  // 控制器 2 数据
  CTRL1:    0xA10009,  // 控制器 1 控制
  CTRL2:    0xA1000B,  // 控制器 2 控制
  TMSS:     0xA14000,  // TMSS 解锁端口
  Z80_BUS:  0xA11100,  // Z80 总线请求
  Z80_RESET:0xA11200,  // Z80 复位
} as const;

/** Genesis 3 按钮控制器位掩码 */
export const JOYPAD_BITS = {
  UP:    0x0001,
  DOWN:  0x0002,
  LEFT:  0x0004,
  RIGHT: 0x0008,
  B:     0x0010,
  C:     0x0020,
  A:     0x0040,
  START: 0x0080,
} as const;

// ============================================================
// 存档 (SRAM)
// ============================================================

export const SRAM = {
  START: 0x200001,
  END:   0x203FFF,
  SIZE:  0x4000, // 16KB
} as const;
