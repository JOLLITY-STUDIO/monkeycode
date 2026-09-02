/**
 * utils/sudoku/picture_progress.ts — 图画谜题进度 / 通关记录持久化 (PICTURE-V0.10)
 *
 * - 进度: 每局 (file + index) 保存玩家当前涂色网格, 退出后可恢复继续涂。
 * - 通关: 完整涂对一次即记录 (file + index → 成绩), 供列表页完成标记统计。
 *
 * Storage keys (与 audioService 的 esds_* 风格一致):
 *   esds_pic_progress  : { [fileKey]: { [index]: { grid, moves, elapsedMs, updatedAt } } }
 *   esds_pic_completed : { [fileKey]: { [index]: { name, durationMs, moves, completedAt } } }
 */

import { CellColor } from './numclo_puzzles';

export interface PictureProgress {
  /** 玩家当前涂色 (225 值, 0=未涂) */
  grid: CellColor[];
  /** 涂色步数 */
  moves: number;
  /** 已累计用时 (ms), 恢复时把会话 startTime 前移 */
  elapsedMs: number;
  updatedAt: number;
}

export interface PictureCompleted {
  file: string;
  index: number;
  name: string;
  durationMs: number;
  moves: number;
  completedAt: number;
}

/** file -> index -> 进度 */
type ProgressMap = Record<string, Record<number, PictureProgress>>;
/** file -> index -> 通关记录 */
type CompletedMap = Record<string, Record<number, PictureCompleted>>;

const PROGRESS_KEY = 'esds_pic_progress';
const COMPLETED_KEY = 'esds_pic_completed';

function readMap<T>(key: string): Record<string, Record<number, T>> {
  try {
    const raw = wx.getStorageSync(key);
    if (raw && typeof raw === 'object') return raw as Record<string, Record<number, T>>;
  } catch (e) {
    /* storage 异常忽略 */
  }
  return {};
}

function writeMap(key: string, map: Record<string, Record<number, unknown>>): void {
  try {
    wx.setStorageSync(key, map);
  } catch (e) {
    /* storage 满/异常忽略, 不影响游戏 */
  }
}

/** 是否完全没有涂色 (无进度可存) */
export function isGridEmpty(grid: CellColor[] | null | undefined): boolean {
  if (!grid || grid.length === 0) return true;
  return grid.every((v) => v === 0);
}

/** 读取某题进度; 无则 null */
export function loadProgress(file: string, index: number): PictureProgress | null {
  const map = readMap<PictureProgress>(PROGRESS_KEY);
  const entry = map[file] && map[file][index];
  return entry || null;
}

/** 保存/覆盖某题进度 (grid 全空时自动移除, 等价清空进度) */
export function saveProgress(file: string, index: number, p: PictureProgress): void {
  const map = readMap<PictureProgress>(PROGRESS_KEY);
  if (isGridEmpty(p.grid)) {
    if (map[file]) {
      delete map[file][index];
      if (Object.keys(map[file]).length === 0) delete map[file];
    }
  } else {
    if (!map[file]) map[file] = {};
    map[file][index] = {
      grid: p.grid.slice(),
      moves: p.moves,
      elapsedMs: p.elapsedMs,
      updatedAt: Date.now(),
    };
  }
  writeMap(PROGRESS_KEY, map);
}

/** 清除某题进度 (通关/清空画板后调用) */
export function clearProgress(file: string, index: number): void {
  const map = readMap<PictureProgress>(PROGRESS_KEY);
  if (map[file] && map[file][index]) {
    delete map[file][index];
    if (Object.keys(map[file]).length === 0) delete map[file];
    writeMap(PROGRESS_KEY, map);
  }
}

/** 读取某题通关记录; 无则 null */
export function loadCompleted(file: string, index: number): PictureCompleted | null {
  const map = readMap<PictureCompleted>(COMPLETED_KEY);
  const entry = map[file] && map[file][index];
  return entry || null;
}

/** 记录通关 (存在则覆盖 — 只保留最近一次用时/步数) */
export function recordCompleted(file: string, index: number, data: Omit<PictureCompleted, 'file' | 'index' | 'completedAt'>): void {
  const map = readMap<PictureCompleted>(COMPLETED_KEY);
  if (!map[file]) map[file] = {};
  map[file][index] = {
    file,
    index,
    name: data.name,
    durationMs: data.durationMs,
    moves: data.moves,
    completedAt: Date.now(),
  };
  writeMap(COMPLETED_KEY, map);
}

/** 某个类别已通关题数 (用于列表页完成标记) */
export function countCompletedInFile(file: string): number {
  const map = readMap<PictureCompleted>(COMPLETED_KEY);
  const entry = map[file];
  return entry ? Object.keys(entry).length : 0;
}

/** 全题库已通关题数 */
export function countAllCompleted(): number {
  const map = readMap<PictureCompleted>(COMPLETED_KEY);
  let n = 0;
  for (const file of Object.keys(map)) n += Object.keys(map[file]).length;
  return n;
}
