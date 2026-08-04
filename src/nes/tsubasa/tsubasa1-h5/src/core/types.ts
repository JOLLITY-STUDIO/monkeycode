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

/** 
 * 调色板 - FCEUX 实机存档提取的真实 NES 颜色 (索引 0-63)
 * 来源: public/nes_palette.json (tsubasanes.pal → FCEUX save-state palette)
 */
export const NES_PALETTE: number[] = [
  // 0x00-0x0F
  0x757575, 0x24188E, 0x0000AA, 0x45009E, 0x8E0075, 0xAA0010, 0xA60000, 0x7D0800,
  0x412C00, 0x004500, 0x005100, 0x003C14, 0x183C5D, 0x000000, 0x000000, 0x000000,
  // 0x10-0x1F
  0xBEBEBE, 0x0071EF, 0x2038EF, 0x8200F3, 0xBE00BE, 0xE70059, 0xDB2800, 0xCB4D0C,
  0x8A7100, 0x009600, 0x00AA00, 0x009238, 0x00828A, 0x000000, 0x000000, 0x000000,
  // 0x20-0x2F
  0xFFFFFF, 0x3CBEFF, 0x5D96FF, 0xCF8AFF, 0xF779FF, 0xFF75B6, 0xFF7561, 0xFF9A38,
  0xF3BE3C, 0x82D310, 0x4DDF49, 0x59FB9A, 0x00EBDB, 0x797979, 0x000000, 0x000000,
  // 0x30-0x3F
  0xFFFFFF, 0xAAE7FF, 0xC7D7FF, 0xD7CBFF, 0xFFC7FF, 0xFFC7DB, 0xFFBEB2, 0xFFDBAA,
  0xFFE7A2, 0xE3FFA2, 0xAAF3BE, 0xB2FFCF, 0x9EFFF3, 0xC7C7C7, 0x000000, 0x000000,
];
