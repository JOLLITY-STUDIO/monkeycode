/**
 * 天使之翼1 — 核心类型定义
 * 完全脱离NES硬件抽象，纯TypeScript类型
 */

// ==================== 游戏常量 ====================

/** 游戏状态枚举 (对应 ram_03CA 0-7) */
export enum GameState {
  OPENING     = 0,  // 开场动画 (Bank 1)
  TITLE       = 1,  // 标题画面 (Bank 5)
  MENU        = 2,  // 菜单选择 (Bank 6)
  MATCH_INIT  = 3,  // 比赛初始化 (Bank 4)
  MATCH_LOOP  = 4,  // 比赛主循环 (Bank 4)
  TRANSITION  = 5,  // 状态转换判断 (Bank 4)
  EVENT       = 6,  // 进球/半场事件 (Bank 6)
  RESULT      = 7,  // 比赛结果 (Bank 6)
}

/** 手柄按键定义 (对应 $4016/$4017 读取) */
export const BUTTON = {
  RIGHT:  0x01,
  LEFT:   0x02,
  DOWN:   0x04,
  UP:     0x08,
  START:  0x10,
  SELECT: 0x20,
  B:      0x40,
  A:      0x80,
} as const;

/** NES屏幕尺寸 */
export const SCREEN_WIDTH = 256;
export const SCREEN_HEIGHT = 240;

/** 可见区域 (通常减去过扫描) */
export const VISIBLE_WIDTH = 256;
export const VISIBLE_HEIGHT = 224;

/** Nametable 尺寸 */
export const NT_WIDTH = 32;   // tiles
export const NT_HEIGHT = 30;  // tiles
export const TILE_SIZE = 8;   // pixels

/** OAM 精灵数量 */
export const SPRITE_COUNT = 64;

/** 调色板 */
export const PALETTE_SIZE = 32;
export const BG_PALETTE_COUNT = 4;
export const SPR_PALETTE_COUNT = 4;

/** MMC1 Bank 分配 */
export const PRG_BANK_SIZE = 0x4000;  // 16KB per bank
export const CHR_BANK_SIZE = 0x1000;  // 4KB per CHR bank
export const TOTAL_PRG_BANKS = 8;
export const TOTAL_CHR_BANKS = 32;    // 16 × 2 (双4KB bank模式)

/** NES 系统调色板 (2C02 NTSC) — 64色 */
export const NES_PALETTE: number[] = [
  // 0x00-0x0F
  0xFF7C7C7C, 0xFF0000FC, 0xFF0000BC, 0xFF4428BC, 0xFF940084, 0xFFA80020, 0xFFA81000,
  0xFF881400, 0xFF503000, 0xFF007800, 0xFF006800, 0xFF005800, 0xFF004058, 0xFF000000,
  0xFF000000, 0xFF000000,
  // 0x10-0x1F
  0xFFBCBCBC, 0xFF0078F8, 0xFF0058F8, 0xFF6844FC, 0xFFD800CC, 0xFFE40058, 0xFFF83800,
  0xFFE45C10, 0xFFAC7C00, 0xFF00B800, 0xFF00A800, 0xFF00A844, 0xFF008888, 0xFF000000,
  0xFF000000, 0xFF000000,
  // 0x20-0x2F
  0xFFF8F8F8, 0xFF3CBCFC, 0xFF6888FC, 0xFF9878F8, 0xFFF878F8, 0xFFF85898, 0xFFF87858,
  0xFFFEA044, 0xFFF8B800, 0xFFB8F818, 0xFF58D854, 0xFF58F898, 0xFF00E8D8, 0xFF787878,
  0xFF000000, 0xFF000000,
  // 0x30-0x3F
  0xFFFCFCFC, 0xFFA4E4FC, 0xFFB8B8F8, 0xFFD8B8F8, 0xFFF8B8F8, 0xFFF8A4C0, 0xFFF0D0B0,
  0xFFFCE0A8, 0xFFF8D878, 0xFFD8F878, 0xFFB8F8B8, 0xFFB8F8D8, 0xFF00FCFC, 0xFFF8D8F8,
  0xFF000000, 0xFF000000,
];

// ==================== 球员相关类型 ====================

/** 球员位置 */
export enum PlayerPosition {
  GK = 0,  // 守门员
  DF = 1,  // 后卫
  MF = 2,  // 中场
  FW = 3,  // 前锋
}

/** 球员数据 */
export interface PlayerData {
  id: number;
  name: string;
  position: PlayerPosition;
  shoot: number;      // 射门
  pass: number;       // 传球
  dribble: number;    // 盘带
  tackle: number;     // 拦截
  speed: number;      // 速度
  stamina: number;    // 体力
  specialMoves: number[];  // 必杀技ID列表
  portraitTile: number;    // 头像tile索引
}

/** 球队数据 */
export interface TeamData {
  id: number;
  name: string;
  playerIds: number[];
  formation: number;   // 阵型ID
  style: number;       // 战术风格
}

// ==================== 渲染相关类型 ====================

/** Sprite属性 (OAM条目) */
export interface SpriteEntry {
  y: number;       // Y坐标 (0-255)
  tileIndex: number;  // Tile索引
  attr: number;    // 属性 (bit7=VFlip, bit6=HFlip, bit5=优先, bit1-0=调色板)
  x: number;       // X坐标 (0-255)
}

/** Tile像素数据 (8×8) */
export type TilePixels = number[][];  // [y][x] = colorIndex (0-3)

/** 调色板条目 (4色 × RGBA) */
export type Palette = [number, number, number, number];

/** PPU 更新队列条目 */
export interface PpuQueueEntry {
  count: number;     // 数据字节数
  addrHi: number;    // VRAM地址高字节
  addrLo: number;    // VRAM地址低字节
  data: number[];    // 数据字节
}

// ==================== 游戏配置 ====================

/** Tsubasa 构造函数选项 */
export interface TsubasaOptions {
  /** 是否开启AI自动挂机模式 */
  aiMode?: boolean;
  /** Canvas缩放倍数 (默认2) */
  scale?: number;
  /** 是否开启调试模式 */
  debug?: boolean;
  /** 启动时跳过的状态数 (用于快速测试) */
  skipStates?: number;
}

/** 调试信息快照 */
export interface DebugSnapshot {
  frame: number;
  gameState: GameState;
  gameStateName: string;
  subState: number;
  scoreA: number;
  scoreB: number;
  matchPhase: number;
  ppuQueueEntries: number;
  oamSprites: number;
  joy1: number;
  joy2: number;
}
