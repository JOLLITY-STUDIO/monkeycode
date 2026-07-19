/**
 * 足球小将 II (Captain Tsubasa II) NES - 資料結構定義
 * 所有數值欄位對照 RAM 位址，參考 _constants.ts
 */

import type {
  OAM_BUF, DISP_EXT_SIZE, TEAM_SLOT_SIZE,
  DISP_MAX_ENTRIES, PALETTE_SIZE,
} from './_constants';

// ============================================================
// 基本類型
// ============================================================

/** NES byte (0-255) */
export type Byte = number;
/** NES word (little-endian, 0-65535) */
export type Word = number;
/** 有號 byte (-128 ~ 127) */
export type SByte = number;
/** 布林: 0=false, 非零=true */
export type NesBool = Byte;

// ============================================================
// NES 系統結構
// ============================================================

/** NES CPU 狀態 (NES 模擬器不實體操作硬體，這是概念層) */
export interface CpuState {
  A: Byte;     // 累加器
  X: Byte;     // X 索引
  Y: Byte;     // Y 索引
  SP: Byte;    // 堆疊指標
  PC: Word;    // 程式計數器
  P: Byte;     // 處理器旗標 (NVxxDIZC)
}

/** PPU 狀態快照 */
export interface PpuState {
  ppuCtrl: Byte;    // $2000 鏡像
  ppuMask: Byte;    // $2001 鏡像
  scrollX: Byte;    // $2005 X
  scrollY: Byte;    // $2005 Y
  ppuAddr: Word;    // $2006 組合位址
}

// ============================================================
// RAM 記憶體區塊
// ============================================================

/** 零頁 ($0000-$00FF) */
export interface ZeroPage {
  // 核心邏輯層 - 這些值從 ASM 推導出來
  tmp: [Byte, Byte, Byte, Byte];           // $00-$03 通用暫存
  spCtx: [Byte, Byte];                     // $05-$06 堆疊指標保存
  nmFlag: Byte;                            // $09 NMI 旗標
  irqFlag: Byte;                           // $0A IRQ 旗標
  scrollX: Byte;                           // $0D PPU X 滾動
  scrollY: Byte;                           // $0E PPU Y 滾動
  cnt: [Byte, Byte];                       // $11-$12 計數器

  joypad1: Byte;                           // $1B 控制器 1 目前
  joypad1New: Byte;                        // $1C 新按下
  joypad1Prev: Byte;                       // $1E 上一幀

  ppuCtrlMirror: Byte;                     // $20
  ppuMaskMirror: Byte;                     // $21
  ppuScrollXMirror: Byte;                  // $22
  ppuScrollYMirror: Byte;                  // $23

  frameCnt: Byte;                          // $24 幀計數
  sceneBank: Byte;                         // $25 場景 bank
  sceneState: Byte;                        // $26 場景狀態
  jumpIdx: Byte;                           // $27 跳轉索引

  gen: [Byte, Byte, Byte, Byte, Byte];     // $28-$2C

  audioFlag: Byte;                         // $30

  // 高頻區 ($32-$3F)
  z32: Byte;
  z33: Byte;
  z34: Byte;                               // $34 極高頻 (231 refs)
  ptr36: Byte;                             // $36 指標
  loopCnt: Byte;                           // $3A 核心循環
  z3b: Byte;
  z3c: Byte;
  z3d: Byte;
  z3e: Byte;
  z3f: Byte;

  // 數值運算/顯示區 ($40-$4C)
  loopCnt40: Byte;                         // $40 循環計數器
  joypadTmp: Byte;                         // $41 手柄暫存
  z42: Byte;
  z43: Byte;
  scrollXPos: Byte;                        // $44 滾動 X 位置
  scrollRel: Byte;                         // $45 滾動相關
  z46: Byte;
  z47: Byte;
  digit100: Byte;                          // $48 百位
  digit10: Byte;                           // $49 十位
  dispAttrX: Byte;                         // $4A 顯示屬性 X 計數
  dispAttrY: Byte;                         // $4B 顯示屬性 Y 計數
  sceneStatus: Byte;                       // $4C 場景狀態碼

  scriptPtrLo: Byte;                       // $4D 腳本指標低
  scriptPtrHi: Byte;                       // $4E 腳本指標高
  scriptRow: Byte;                         // $4F 腳本行
  scriptCol: Byte;                         // $50 腳本列
  scanline: Byte;                          // $51 掃描線
  screenCol: Byte;                         // $52 螢幕列
  screenRow: Byte;                         // $53 螢幕行
  lineLimit: Byte;                         // $54 行限制
  textLines: Byte;                         // $55 文本行數
  curBank: Byte;                           // $56 當前 bank

  saveScriptLo: Byte;                      // $58
  saveScriptHi: Byte;                      // $59
  saveBank: Byte;                          // $5A
  flags5B: Byte;                           // $5B 通用旗標

  attrIdx: Byte;                           // $5C
  z5d: Byte;
  z5e: Byte;
  z5f: Byte;

  sprAttr: Byte;                           // $62 精靈方向
  scenePtrLo: Byte;                        // $63
  scenePtrHi: Byte;                        // $64

  sprPtrLo: Byte;                          // $70
  sprPtrHi: Byte;                          // $71
  sprIdx: Byte;                            // $72 精靈索引
  sprObj: Byte;                            // $73 物件編號

  z75: Byte;
  z76: Byte;
  z77: Byte;
  nmiTimer: Byte;                          // $78 NMI 計時器
  ppuMode: Byte;                           // $79 PPU 模式旗標 (bit7=ADDR)
  scrollY: Byte;                           // $7A PPU 滾動 Y / PPUADDR LO
  scrollXNt: Byte;                         // $7B PPU 滾動 X/NT flag
  objPtrLo: Byte;                          // $7C 物件指標低
  objPtrHi: Byte;                          // $7D 物件指標高

  // OAM 工作區 ($90-$99)
  oam: [Byte, Byte, Byte, Byte, Byte, Byte, Byte, Byte, Byte, Byte];

  // CHR bank 緩存 ($9E-$A1), MMC3 R2-R5
  chrBanks: [Byte, Byte, Byte, Byte];

  // 進階暫存 ($E0-$FF)
  nmiTrigger: Byte;                        // $E0
  vblankDone: Byte;                        // $E1
  e2: Byte;
  e3: Byte;
  ppuAddrLo: Byte;                         // $E6
  ppuAddrHi: Byte;                         // $E7
  rowCnt: Byte;                            // $E8
  bankTmp: Byte;                           // $E9
  genEa: Byte;                             // $EA
  genEb: Byte;                             // $EB
  globalLo: Byte;                          // $EC
  globalHi: Byte;                          // $ED
  f0: Byte; f1: Byte; f2: Byte; f3: Byte;
  f4: Byte; f5: Byte; f6: Byte; f7: Byte;
}

// ============================================================
// OAM 精靈 (硬體精靈)
// ============================================================

/** NES 硬體精靈 (OAM 一條目 = 4 bytes) */
export interface OamEntry {
  /** Y 座標 (>=240 不顯示) */
  y: Byte;
  /** tile 索引 */
  tile: Byte;
  /** 屬性 (VHxxxPPC: flip_v/flip_h/priority/palette) */
  attr: Byte;
  /** X 座標 */
  x: Byte;
}

/** 翻轉旗標 */
export enum SpriteFlip {
  NONE       = 0,
  HORIZONTAL = 64,       // BIT_6
  VERTICAL   = 128,      // BIT_7
  BOTH       = 192,      // BIT_6 | BIT_7
}

/** OAM 記憶體 (64 精靈 = 256 bytes) */
export type OamBuffer = OamEntry[];

// ============================================================
// 擴充顯示列表 (軟體 OAM)
// ============================================================

/**
 * 擴充顯示條目 ($0468-$0567, 每 4 bytes)
 * [attr] [ppu_lo] [ppu_hi] [tile]
 */
export interface DisplayEntry {
  /**
   * 屬性位元組:
   *   bit7: 垂直翻轉
   *   bit6: 水平翻轉
   *   bit5: -
   *   bit4: bank 選擇
   *   bit3-bit0: 調色板
   */
  attr: Byte;
  /** PPU 位址低 byte */
  ppuLo: Byte;
  /** PPU 位址高 byte */
  ppuHi: Byte;
  /** tile 索引 */
  tile: Byte;
}

/** 擴充顯示列表 (最多 64 筆) */
export interface DisplayList {
  entries: DisplayEntry[];
  /** $0628: 列表結束位置 */
  endPtr: Byte;
  /** $0629: 當前屬性位元組 */
  curAttr: Byte;
}

// ============================================================
// 屬性表
// ============================================================

/** PPU 屬性表暫存 ($062A-$0649, 32 bytes) */
export type AttrBuffer = Byte[];

// ============================================================
// 隊伍/玩家相關
// ============================================================

/**
 * 玩家數值記錄 (推測結構)
 * 基礎數值: G/K/C/T/P/S
 * - G: 守門 (Goalkeeping)
 * - K: 踢力 (Kick)
 * - C: 截球 (Cut)
 * - T: 盤球 (Tackle)
 * - P: 傳球 (Pass)
 * - S: 速度 (Speed)
 */
export interface PlayerStats {
  goalkeeping: Byte;
  kick: Byte;
  cut: Byte;
  tackle: Byte;
  pass: Byte;
  speed: Byte;
}

/**
 * 玩家記錄 (推測結構)
 * 儲存在 bank 資料表 (ROM)，運行時載入到 $0700 區
 */
export interface PlayerRecord {
  id: Byte;
  nameIdx: Byte;           // 名稱索引
  stats: PlayerStats;
  team: Byte;              // 所屬隊伍 ID
  number: Byte;            // 背號
  position: Byte;          // 位置 (GK/DF/MF/FW)
  stamina: Byte;           // 體力
  // ... 更多欄位待反彙編分析確認
}

/**
 * 隊伍結構 (推測)
 */
export interface TeamRecord {
  id: Byte;
  nameIdx: Byte;
  players: PlayerRecord[];  // 11 人
  // ... 更多欄位
}

// ============================================================
// 場景/腳本
// ============================================================

/** 場景資料指標結構 (ZP $63-$64) */
export interface SceneDataPtr {
  lo: Byte;
  hi: Byte;
  /** 解碼實際位址 */
  get addr(): Word { return (this.hi << 8) | this.lo; }
}

/** 腳本指令操作碼枚舉 (從 ASM CMP 模式推導) */
export enum ScriptOp {
  END          = 0,      // $00
  TEXT         = 1,      // $01
  NEWLINE      = 2,      // $02
  CLEAR        = 4,      // $04
  // $FE: 腳本行結束(不是指令結尾)
  LINE_END     = 254,    // $FE
  // $FF: 腳本終止
  TERMINATE    = 255,    // $FF
  // 更多指令待分析...
}

// ============================================================
// 控制器輸入
// ============================================================

export enum JoypadButton {
  A      = 128,   // BIT_7
  B      = 64,    // BIT_6
  SELECT = 32,    // BIT_5
  START  = 16,    // BIT_4
  UP     = 8,     // BIT_3
  DOWN   = 4,     // BIT_2
  LEFT   = 2,     // BIT_1
  RIGHT  = 1,     // BIT_0
}

export interface JoypadState {
  current: Byte;   // $1B
  newPress: Byte;  // $1C (本幀新按)
  prev: Byte;      // $1E (上一幀)
}

// ============================================================
// NES 記憶體總攬
// ============================================================

/**
 * NES 完整 RAM 視圖 (軟體模擬用，不實際讀寫硬體)
 * 所有 RAM 位址即為這裡的陣列索引
 */
export interface NesRam {
  /** 零頁 $0000-$00FF */
  zp: Byte[];
  /** 堆疊 $0100-$01FF */
  stack: Byte[];
  /** OAM $0200-$02FF */
  oam: Byte[];
  /** 一般 RAM $0300-$07FF */
  ram: Byte[];

  // ---- 輔助方法 ----

  /** 讀取 byte */
  u8(addr: number): Byte;
  /** 寫入 byte */
  setU8(addr: number, val: Byte): void;
  /** 讀取 little-endian word */
  u16(addr: number): Word;
  /** 寫入 little-endian word */
  setU16(addr: number, val: Word): void;

  /** 取得零頁視圖 */
  getZeroPage(): ZeroPage;
  /** 取得 OAM 視圖 (64 條目) */
  getOamEntries(): OamEntry[];
  /** 取得手柄輸入 */
  getJoypad(): JoypadState;
}

// ============================================================
// MMC3 Bank 配置
// ============================================================

/** MMC3 暫存器狀態 */
export interface Mmc3State {
  bankSelect: Byte;      // $8000 寫入值
  /** 各暫存器的 bank 號 */
  chr2kLo: Byte;         // R0
  chr2kHi: Byte;         // R1
  chr1k: [Byte, Byte, Byte, Byte]; // R2-R5
  prgLo: Byte;           // R6
  prgHi: Byte;           // R7 (未使用)
  prgMode: Byte;         // PRG 模式 (bit6 of $8000)
  chrMode: Byte;         // CHR 模式 (bit7 of $8000)
}
