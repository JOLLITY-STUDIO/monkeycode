/**
 * 天使之翼2 (Captain Tsubasa II) - NES 类型定义
 */
export interface NesHeader {
  prgSize: number;      // 16KB units
  chrSize: number;      // 8KB units
  mapper: number;
  mirroring: 'horizontal' | 'vertical' | 'four-screen';
  battery: boolean;
  trainer: boolean;
}

export interface NesRom {
  header: NesHeader;
  prg: Uint8Array;      // PRG ROM (header.prgSize * 16384 bytes)
  chr: Uint8Array;      // CHR ROM (header.chrSize * 8192 bytes)
  trainer?: Uint8Array; // 512 bytes if present
}

/** MMC3 寄存器 */
export interface Mmc3Regs {
  bankSelect: number;           // $8000: bank select / command
  bankData: number[];           // $8001: bank values (8 registers)
  prgBankMode: number;          // 0 or 1
  chrBankMode: number;          // 0 or 1
  mirroring: number;
  prgRamProtect: boolean;
  irqLatch: number;
  irqCounter: number;
  irqReload: boolean;
  irqEnable: boolean;
}

/** PPU 状态 */
export interface PpuState {
  // Registers
  ctrl: number;          // $2000
  mask: number;          // $2001
  status: number;        // $2002
  oamAddr: number;       // $2003
  scroll: number;        // $2005 (write twice for X/Y)
  addr: number;          // $2006 (write twice for VRAM addr)
  
  // Internal state
  v: number;             // Current VRAM address (15 bits)
  t: number;             // Temp VRAM address (15 bits)
  x: number;             // Fine X scroll (3 bits)
  w: number;             // Write latch (0=first write, 1=second)
  
  // VRAM
  vram: Uint8Array;      // 2KB VRAM (nametables)
  palette: Uint8Array;   // 32 bytes palette RAM
  
  // OAM
  oam: Uint8Array;       // 256 bytes sprite OAM
  oamDma: Uint8Array;    // DMA buffer
  
  // Rendering output
  frameBuffer: Uint32Array; // 256x240 pixels (ARGB)
}

/** CPU RAM */
export interface NesRam {
  ram: Uint8Array;       // $0000-$07FF work RAM (2KB)
  stack: number;         // SP (stack pointer, starts at $FD)
  pc: number;            // Program counter
  a: number;             // Accumulator
  x: number;             // X index
  y: number;             // Y index
  flags: number;         // NV-BDIZC
}

/** 游戏状态 */
export interface GameState {
  frame: number;         // 当前帧号
  scene: string;         // 当前场景 (title, menu, match, cutscene, etc.)
  mode: number;          // 游戏模式
  controller1: number;   // 1P 输入状态
  controller2: number;   // 2P 输入状态
  mmc3: Mmc3Regs;
  ppu: PpuState;
  cpu: NesRam;
}

/** Controller 按键定义 */
export const BUTTON = {
  A:      0x01,
  B:      0x02,
  SELECT: 0x04,
  START:  0x08,
  UP:     0x10,
  DOWN:   0x20,
  LEFT:   0x40,
  RIGHT:  0x80,
} as const;

/** NES 颜色调色板 (NTSC) */
export const NES_PALETTE: number[] = [
  0xFF7C7C7C, 0xFF0000FC, 0xFF0000BC, 0xFF4428BC, 0xFF940084, 0xFFA80020, 0xFFA81000,
  0xFF881400, 0xFF503000, 0xFF007800, 0xFF006800, 0xFF005800, 0xFF004058, 0xFF000000,
  0xFF000000, 0xFF000000, 0xFFBCBCBC, 0xFF0078F8, 0xFF0058F8, 0xFF6844FC, 0xFFD800CC,
  0xFFE40058, 0xFFF83800, 0xFFE45C10, 0xFFAC7C00, 0xFF00B800, 0xFF00A800, 0xFF00A844,
  0xFF008888, 0xFF000000, 0xFF000000, 0xFF000000, 0xFFF8F8F8, 0xFF3CBCFC, 0xFF6888FC,
  0xFF9878F8, 0xFFF878F8, 0xFFF85898, 0xFFF87858, 0xFFFEA044, 0xFFF8B800, 0xFFB8F818,
  0xFF58D854, 0xFF58F898, 0xFF00E8D8, 0xFF787878, 0xFF000000, 0xFF000000, 0xFFFCFCFC,
  0xFFA4E4FC, 0xFFB8B8F8, 0xFFD8B8F8, 0xFFF8B8F8, 0xFFF8A4C0, 0xFFF0D0B0, 0xFFFCE0A8,
  0xFFF8D878, 0xFFD8F878, 0xFFB8F8B8, 0xFFB8F8D8, 0xFF00FCFC, 0xFFF8D8F8, 0xFF000000,
  0xFF000000,
];

/** MMC3 PRG Bank 地址映射 */
export const MMC3_PRG_BANK_SIZE = 0x2000; // 8KB
export const MMC3_CHR_BANK_SIZE = 0x0400; // 1KB

/** NES 内存映射 */
export const RAM_SIZE = 0x0800;   // 2KB work RAM
export const VRAM_SIZE = 0x0800;  // 2KB VRAM (nametables)
export const OAM_SIZE = 0x0100;   // 256 bytes sprite OAM
export const SPRITE_COUNT = 64;

/** PPU 寄存器地址 */
export const PPU_CTRL   = 0x2000;
export const PPU_MASK   = 0x2001;
export const PPU_STATUS = 0x2002;
export const PPU_OAMADDR = 0x2003;
export const PPU_OAMDATA = 0x2004;
export const PPU_SCROLL = 0x2005;
export const PPU_ADDR   = 0x2006;
export const PPU_DATA   = 0x2007;

/** MMC3 寄存器地址 */
export const MMC3_BANK_SELECT = 0x8000;
export const MMC3_BANK_DATA   = 0x8001;
export const MMC3_MIRRORING   = 0xA000;
export const MMC3_PRG_PROTECT = 0xA001;
export const MMC3_IRQ_LATCH   = 0xC000;
export const MMC3_IRQ_RELOAD  = 0xC001;
export const MMC3_IRQ_DISABLE = 0xE000;
export const MMC3_IRQ_ENABLE  = 0xE001;

/** 控制器地址 */
export const JOYPAD1 = 0x4016;
export const JOYPAD2 = 0x4017;
