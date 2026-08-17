/**
 * 核心类型定义 —— Picross DS 拼图数据与游戏状态
 * 来源于 NDS ROM 逆向分析（file_94 拼图数据库、ARM9 游戏逻辑）
 */

/** 单元格标记状态（与 NDS 原版一致：空格=未标记，涂黑=填充，叉=排除） */
export type CellMark = "empty" | "filled" | "crossed";

/** 一行/列的提示数字 */
export type Hints = number[];

/** 拼图数据（由 tools/extract_puzzles.py 从 file_94 提取生成） */
export interface Puzzle {
  /** 拼图编号 */
  id: number;
  /** 拼图名称（来自消息表 messageList_*.dat） */
  name: string;
  /** 宽度（Picross DS: 5 / 10 / 15） */
  width: number;
  /** 高度 */
  height: number;
  /** 解法位图：1bpp 行主序，1=填充 */
  solution: Uint8Array;
  /** 难度: 0=教学, 1=普通, 2=困难(Easy/Free/Normal) */
  difficulty: number;
  /** 是否已解锁 */
  unlocked: boolean;
}

/** 游戏难度枚举（对应原版菜单） */
export const enum Difficulty {
  Tutorial = 0,
  Easy = 1,
  Normal = 2,
  Free = 3,
}

/** 一行（列）的提示数据，含已满足状态 */
export interface LineHint {
  nums: Hints;
  satisfied: boolean;
}

/** 完整游戏状态快照（供渲染层读取） */
export interface GameState {
  puzzle: Puzzle;
  /** 行主序单元格状态 */
  marks: CellMark[];
  rowHints: LineHint[];
  colHints: LineHint[];
  elapsedSec: number;
  mistakes: number;
  maxMistakes: number;
  solved: boolean;
  /** 正确填充数 / 总填充数（用于进度条） */
  filledCount: number;
  totalFilled: number;
}

/** 渲染层可点击区域 */
export interface HitResult {
  type: "cell" | "none";
  x: number;
  y: number;
}
