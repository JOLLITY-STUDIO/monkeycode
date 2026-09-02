/**
 * utils/sudoku/sudoku_progress.ts — 数独进度持久化 (V0.19+)
 *
 * 与 picture_progress.ts (图画谜题进度) 同构: 每局 (puzzleId) 保存玩家当前盘面,
 * 退出/切场景后可恢复继续; 通关时自动清除进度。
 *
 * 存的是完整盘面快照 (含 undo/redo 栈), 由 SudokuBoard.exportPersist() 产出,
 * 恢复时先按 puzzleId 重建题目, 再 importPersist() 还原 — given 不存、isError 重算。
 *
 * Storage keys (与 audioService / picture_progress 的 esds_* 风格一致):
 *   esds_sudoku_progress : { [puzzleId]: SudokuProgress }
 */

import { BoardPersistState } from './board';
import { Difficulty } from './numple_puzzles';

export interface SudokuProgress {
  /** 题目 id (numpleX.data_NNN), 与 numple 题库 RAW key 一致 */
  puzzleId: string;
  difficulty: Difficulty;
  /** 已累计用时 (ms), 恢复时把会话 startTime 前移 */
  elapsedMs: number;
  /** 完整盘面快照 (含 undo/redo 栈) */
  board: BoardPersistState;
  updatedAt: number;
}

/** puzzleId -> 进度 */
type ProgressMap = Record<string, SudokuProgress>;

const PROGRESS_KEY = 'esds_sudoku_progress';

function readMap(): ProgressMap {
  try {
    const raw = wx.getStorageSync(PROGRESS_KEY);
    if (raw && typeof raw === 'object') return raw as ProgressMap;
  } catch (e) {
    /* storage 异常忽略 */
  }
  return {};
}

function writeMap(map: ProgressMap): void {
  try {
    wx.setStorageSync(PROGRESS_KEY, map);
  } catch (e) {
    /* storage 满/异常忽略, 不影响游戏 */
  }
}

/** 读取某题进度; 无则 null */
export function loadSudokuProgress(puzzleId: string): SudokuProgress | null {
  if (!puzzleId) return null;
  const map = readMap();
  return map[puzzleId] || null;
}

/** 保存/覆盖某题进度 (board 为 null 时不写, 防脏存档) */
export function saveSudokuProgress(p: SudokuProgress): void {
  if (!p || !p.puzzleId || !p.board) return;
  const map = readMap();
  map[p.puzzleId] = {
    puzzleId: p.puzzleId,
    difficulty: p.difficulty,
    elapsedMs: Math.max(0, p.elapsedMs | 0),
    board: p.board,
    updatedAt: Date.now(),
  };
  writeMap(map);
}

/** 清除某题进度 (通关 / 放弃 / 清空盘面后调用) */
export function clearSudokuProgress(puzzleId: string): void {
  if (!puzzleId) return;
  const map = readMap();
  if (map[puzzleId]) {
    delete map[puzzleId];
    writeMap(map);
  }
}
