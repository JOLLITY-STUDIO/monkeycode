/**
 * NES ROM 类型定义
 * 对应 Captain Tsubasa (Japan).nes
 * Mapper: 1 (MMC1)
 */

/** NES 文件头 (16字节) */
export interface NesHeader {
  prgRomSize: number;   // PRG-ROM 16KB Bank 数量 (8)
  chrRomSize: number;   // CHR-ROM 8KB Bank 数量 (16)
  mapper: number;       // Mapper 编号 (1 = MMC1)
  mirroring: number;    // 0=水平, 1=垂直
  hasBattery: boolean;
  hasTrainer: boolean;
  fourScreen: boolean;
}

/** 完整的 NES ROM 结构 */
export interface NesRom {
  header: NesHeader;
  prgRom: Uint8Array[];  // 每个 16KB
  chrRom: Uint8Array[];  // 每个 8KB
}

/** NES 调色板 - 64种颜色 */
export const NES_PALETTE: number[] = [
  0x7C7C7C, 0x0000FC, 0x0000BC, 0x4428BC, 0x940084, 0xA80020, 0xA81000,
  0x881400, 0x503000, 0x007800, 0x006800, 0x005800, 0x004058, 0x000000,
  0x000000, 0x000000, 0xBCBCBC, 0x0078F8, 0x0058F8, 0x6844FC, 0xD800CC,
  0xE40058, 0xF83800, 0xE45C10, 0xAC7C00, 0x00B800, 0x00A800, 0x00A844,
  0x008888, 0x000000, 0x000000, 0x000000, 0xF8F8F8, 0x3CBCFC, 0x6888FC,
  0x9878F8, 0xF878F8, 0xF85898, 0xF87858, 0xFCA044, 0xF8B800, 0xB8F818,
  0x58D854, 0x58F898, 0x00E8D8, 0x787878, 0x000000, 0x000000, 0xFCFCFC,
  0xA4E4FC, 0xB8B8F8, 0xD8B8F8, 0xF8B8F8, 0xF8A4C0, 0xF0D0B0, 0xFCE0A8,
  0xF8D878, 0xD8F878, 0xB8F8B8, 0xB8F8D8, 0x00FCFC, 0xF8D8F8, 0x000000,
  0x000000,
];

/** CPU 内存映射常量 */
export const MEMORY_MAP = {
  ZERO_PAGE_START: 0x0000,
  ZERO_PAGE_END: 0x00FF,
  STACK_START: 0x0100,
  STACK_END: 0x01FF,
  OAM_BUFFER_START: 0x0200,
  OAM_BUFFER_END: 0x02FF,
  WORK_RAM_START: 0x0300,
  WORK_RAM_END: 0x07FF,
  PPU_REG_START: 0x2000,
  PPU_REG_END: 0x2007,
  PPU_MIRROR_START: 0x2008,
  PPU_MIRROR_END: 0x3FFF,
  APU_REG_START: 0x4000,
  APU_REG_END: 0x4017,
  PRG_RAM_START: 0x6000,
  PRG_RAM_END: 0x7FFF,
  PRG_ROM_SWITCHABLE: 0x8000,  // $8000-$BFFF
  PRG_ROM_FIXED: 0xC000,       // $C000-$FFFF
} as const;

/** PPU 寄存器地址 */
export const PPU_REG = {
  PPUCTRL:   0x2000,
  PPUMASK:   0x2001,
  PPUSTATUS: 0x2002,
  OAMADDR:   0x2003,
  OAMDATA:   0x2004,
  PPUSCROLL: 0x2005,
  PPUADDR:   0x2006,
  PPUDATA:   0x2007,
} as const;

/** APU/Input 寄存器地址 */
export const APU_REG = {
  SQ1_VOL:   0x4000,
  SQ1_SWEEP: 0x4001,
  SQ1_LO:    0x4002,
  SQ1_HI:    0x4003,
  SQ2_VOL:   0x4004,
  SQ2_SWEEP: 0x4005,
  SQ2_LO:    0x4006,
  SQ2_HI:    0x4007,
  TRI_LINEAR:0x4008,
  TRI_LO:    0x400A,
  TRI_HI:    0x400B,
  NOISE_VOL: 0x400C,
  NOISE_LO:  0x400E,
  NOISE_HI:  0x400F,
  DMC_FREQ:  0x4010,
  DMC_RAW:   0x4011,
  DMC_START: 0x4012,
  DMC_LEN:   0x4013,
  OAMDMA:    0x4014,
  SND_CHN:   0x4015,
  JOY1:      0x4016,
  JOY2:      0x4017,
} as const;

/** MMC1 寄存器选择位掩码 */
export const MMC1_REG = {
  CTRL: 0x00,  // $8000-$9FFF: 控制寄存器
  CHR0: 0x20,  // $A000-$BFFF: CHR Bank 0
  CHR1: 0x40,  // $C000-$DFFF: CHR Bank 1
  PRG:  0x60,  // $E000-$FFFF: PRG Bank
} as const;

/** 游戏关键 Zero Page 变量地址 */
export const ZP = {
  PTR_LO:       0x00,
  PTR_HI:       0x01,
  TMP_0:        0x02,
  TMP_1:        0x03,
  TMP_2:        0x04,
  TMP_3:        0x05,
  TMP_4:        0x06,
  TMP_5:        0x07,
  RET_LO:       0x10,
  RET_HI:       0x11,
  PPU_PTR_LO:   0x12,
  PPU_PTR_HI:   0x13,
  JMP_PTR_LO:   0x14,
  JMP_PTR_HI:   0x15,
  SCROLL_X:     0x16,
  SCROLL_Y:     0x17,
  PPU_MASK_CACHE:0x18,
  PPU_CTRL_CACHE:0x19,
  CHR_BANK_0:   0x1A,
  CHR_BANK_1:   0x1B,
  PRG_BANK:     0x1C,
  ACC_TEMP:     0x3A,
  MMC1_LOCK:    0x93,
} as const;

/** 游戏关键 RAM 变量地址 */
export const RAM = {
  FRAME_COUNTER:    0x0300,
  JOY1_CUR:         0x0301,
  JOY1_PREV:        0x0302,
  JOY2_CUR:         0x0303,
  JOY2_PREV:        0x0304,
  PPU_QUEUE_LEN:    0x0305,
  PPU_QUEUE:        0x0306,  // 18 bytes (9 pairs)
  PALETTE_BUFFER:   0x0318,  // 32 bytes
  PPU_BULK_LEN:     0x0339,
  PPU_BULK_QUEUE:   0x033A,
  /** 游戏主状态机索引 (0-7), 由 $81F7 读取, 通过 $81FD 跳转表分发 */
  GAME_STATE:       0x03CA,
  /** 子状态/场景编号 (菜单项、比赛阶段等) */
  SCENE_STATE:      0x03CB,
  ANIM_FRAME:       0x03D6,
  RNG_SEED_LO:      0x05BA,
  RNG_SEED_HI:      0x05BB,
  TEMP_FLAG:        0x05FA,
  INDIRECT_JMP_LO:  0x05FB,
  INDIRECT_JMP_HI:  0x05FC,
} as const;

/** 手柄按键位掩码 */
export const JOYPAD_BUTTON = {
  A:      0x01,
  B:      0x02,
  SELECT: 0x04,
  START:  0x08,
  UP:     0x10,
  DOWN:   0x20,
  LEFT:   0x40,
  RIGHT:  0x80,
} as const;
