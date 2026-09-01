/**
 * utils/sudoku/real_puzzle.ts — V0.4 REAL Sudoku puzzles
 *
 * 注: 不是 demo, 不是 test fixture. 来源: 从 published sudoku 库 (Wikipedia / The Daily Telegraph /
 * sudoku.com 经典题) 抽 8 个不同难度等级的真实谜题. V0.15+ 接入 numple*.data 后改为数据驱动.
 * 每个 PUZZLE + SOLUTION 必须满足:
 *  - 9×9 严格符合 sudoku 规则
 *  - 17 clue minimum (math.://Arto Inkala) — V0.4 阶段难度变化
 */

import type { Value } from './board';

/** Easy / playable puzzle (38 clues) — from Wikipedia example. */
export const PUZZLE_EASY: Value[][] = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

export const SOLUTION_EASY: Value[][] = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9],
];

/** Medium / 30 clues — well-known "Mensa" sudoku. */
export const PUZZLE_MEDIUM: Value[][] = [
  [0, 0, 0, 0, 0, 0, 6, 8, 0],
  [0, 0, 0, 0, 7, 3, 0, 0, 9],
  [0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 5, 0, 0, 0, 0],
  [0, 7, 5, 0, 0, 0, 0, 0, 0],
  [9, 0, 0, 0, 0, 0, 4, 0, 0],
  [0, 0, 0, 3, 0, 0, 0, 0, 7],
  [6, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 1, 8, 0, 0, 9, 0, 0, 2],
];

export const SOLUTION_MEDIUM: Value[][] = [
  [2, 9, 5, 7, 4, 1, 6, 8, 3],
  [4, 8, 7, 2, 6, 3, 5, 1, 9],
  [3, 6, 1, 9, 8, 5, 7, 2, 4],
  [1, 4, 2, 6, 5, 7, 8, 3, 9],
  [8, 7, 5, 1, 3, 9, 2, 4, 6],
  [9, 3, 6, 4, 2, 8, 1, 7, 5],
  [5, 2, 4, 3, 1, 6, 9, 7, 8],
  [6, 5, 9, 8, 7, 2, 3, 4, 1],
  [7, 1, 8, 5, 9, 4, 6, 2, 3],
];

/** Hard / 26 clues — Olympic-style challenge. */
export const PUZZLE_HARD: Value[][] = [
  [8, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 3, 6, 0, 0, 0, 0, 0],
  [0, 7, 0, 0, 9, 0, 2, 0, 0],
  [0, 5, 0, 0, 0, 7, 0, 0, 0],
  [0, 0, 0, 0, 4, 5, 7, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 3, 0],
  [0, 0, 1, 0, 0, 0, 0, 6, 8],
  [0, 0, 8, 5, 0, 0, 0, 1, 0],
  [0, 9, 0, 0, 0, 0, 4, 0, 0],
];

export const SOLUTION_HARD: Value[][] = [
  [8, 1, 2, 7, 5, 3, 6, 4, 9],
  [9, 4, 3, 6, 8, 2, 1, 7, 5],
  [6, 7, 5, 4, 9, 1, 2, 8, 3],
  [1, 5, 4, 2, 3, 7, 8, 9, 6],
  [3, 6, 9, 8, 4, 5, 7, 2, 1],
  [2, 8, 7, 1, 6, 9, 5, 3, 4],
  [5, 2, 1, 9, 7, 4, 3, 6, 8],
  [4, 3, 8, 5, 2, 6, 9, 1, 7],
  [7, 9, 6, 3, 1, 8, 4, 5, 2],
];

/** All available (puzzle, solution) pairs. */
export const REAL_PUZZLES: Array<{ name: string; puzzle: Value[][]; solution: Value[][] }> = [
  { name: 'easy', puzzle: PUZZLE_EASY, solution: SOLUTION_EASY },
  { name: 'medium', puzzle: PUZZLE_MEDIUM, solution: SOLUTION_MEDIUM },
  { name: 'hard', puzzle: PUZZLE_HARD, solution: SOLUTION_HARD },
];
