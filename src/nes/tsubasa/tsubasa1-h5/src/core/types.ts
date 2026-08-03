/**
 * 全局类型定义 - 天使之翼 H5
 */

/** 手柄按键位掩码 (与NES $4016/$4017 一致) */
export enum Button {
  A      = 0x80,  // bit 7
  B      = 0x40,  // bit 6
  SELECT = 0x20,  // bit 5
  START  = 0x10,  // bit 4
  UP     = 0x08,  // bit 3
  DOWN   = 0x04,  // bit 2
  LEFT   = 0x02,  // bit 1
  RIGHT  = 0x01,  // bit 0
}

/** 输入状态快照 */
export interface GameInput {
  /** 当前帧按下的按键 */
  pressed: number;
  /** 持续按住的按键 */
  held: number;
}

/** PPU 控制寄存器 ($2000) 位定义 */
export enum PpuCtrlBits {
  NAMETABLE_0      = 0x00,
  NAMETABLE_1      = 0x01,
  NAMETABLE_2      = 0x02,
  NAMETABLE_3      = 0x03,
  VRAM_INCREMENT   = 0x04,  // 0=+1, 1=+32
  SPRITE_PATTERN   = 0x08,  // 0=$0000, 1=$1000
  BACKGROUND_PTN   = 0x10,  // 0=$0000, 1=$1000
  SPRITE_SIZE      = 0x20,  // 0=8x8, 1=8x16
  NMI_ENABLE       = 0x80,  // NMI on VBlank
}

/** PPU 掩码寄存器 ($2001) 位定义 */
export enum PpuMaskBits {
  GRAYSCALE        = 0x01,
  SHOW_BG_LEFT     = 0x02,
  SHOW_SPR_LEFT    = 0x04,
  SHOW_BG          = 0x08,
  SHOW_SPR         = 0x10,
  EMPHASIZE_RED    = 0x20,
  EMPHASIZE_GREEN  = 0x40,
  EMPHASIZE_BLUE   = 0x80,
}

/** 游戏状态枚举 */
export enum GameState {
  INIT_TITLE    = 0,
  TITLE_LOOP    = 1,
  MENU_SELECT   = 2,
  TEAM_SELECT   = 3,
  MATCH_MAIN    = 4,
  MATCH_EVENT   = 5,
  TRANSITION    = 6,
  RESULT        = 7,
}

/** 精灵/精灵属性 */
export interface SpriteEntry {
  y: number;        // Y坐标 + 1 (0 = hide)
  tileIndex: number; // 图案索引
  attributes: number; // 属性 (调色板, 翻转等)
  x: number;         // X坐标
}

/** PPU 写入命令 */
export interface PpuWriteCmd {
  address: number;  // PPU地址
  length: number;   // 数据长度
  data: Uint8Array; // 数据
  isVertical: boolean; // 垂直写入模式
}

/** Bank 配置 */
export interface BankConfig {
  prgBank0: number;  // $8000-$BFFF 的PRG Bank
  prgBank1: number;  // $C000-$FFFF 的PRG Bank (通常固定为7)
  chrBank0: number;  // CHR低页
  chrBank1: number;  // CHR高页
  mirroring: 'horizontal' | 'vertical';
}

/** NES 屏幕尺寸 */
export const SCREEN_WIDTH = 256;
export const SCREEN_HEIGHT = 240;
export const TILE_SIZE = 8;

/** 调色板 - NES 标准颜色 (索引) */
export const NES_PALETTE: number[] = [
  // 0x00-0x0F
  0x7C7C7C, 0x0000FC, 0x0000BC, 0x4428BC, 0x940084, 0xA80020, 0xA81000, 0x881400,
  0x503000, 0x007800, 0x006800, 0x005800, 0x004058, 0x000000, 0x000000, 0x000000,
  // 0x10-0x1F
  0xBCBCBC, 0x0078F8, 0x0058F8, 0x6844FC, 0xD800CC, 0xE40058, 0xF83800, 0xE45C10,
  0xAC7C00, 0x00B800, 0x00A800, 0x00A844, 0x008888, 0x000000, 0x000000, 0x000000,
  // 0x20-0x2F
  0xF8F8F8, 0x3CBCFC, 0x6888FC, 0x9878F8, 0xF878F8, 0xF85898, 0xF87858, 0xFCA044,
  0xF8B800, 0xB8F818, 0x58D854, 0x58F898, 0x00E8D8, 0x787878, 0x000000, 0x000000,
  // 0x30-0x3F
  0xFCFCFC, 0xA4E4FC, 0xB8B8F8, 0xD8B8F8, 0xF8B8F8, 0xF8A4C0, 0xF0D0B0, 0xFCE0A8,
  0xF8D878, 0xD8F878, 0xB8F8B8, 0xB8F8D8, 0x00FCFC, 0xF8D8F8, 0x000000, 0x000000,
];

/** CHR Bank 文件名映射 */
export const CHR_BANK_FILES: Record<number, string> = {
  0: 'chr_bank_00.png',
  1: 'chr_bank_01.png',
  2: 'chr_bank_02.png',
  3: 'chr_bank_03.png',
  4: 'chr_bank_04.png',
  5: 'chr_bank_05.png',
  6: 'chr_bank_06.png',
  7: 'chr_bank_07.png',
  8: 'chr_bank_08.png',
  9: 'chr_bank_09.png',
  10: 'chr_bank_0A.png',
  11: 'chr_bank_0B.png',
  12: 'chr_bank_0C.png',
};
