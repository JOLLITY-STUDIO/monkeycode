/**
 * utils/sudoku/solver.ts — Sudoku backtracking solver (V0.15.1, MRV)
 *
 * Uses Minimum-Remaining-Values (MRV) heuristic + candidate bitmasks:
 *  - picks the empty cell with the fewest legal candidates first
 *  - maintains per-cell candidate masks via forward-checking on backtrack
 *  - handles expert puzzles (24- given cells) in <50ms
 *
 * Used by SudokuGameService on first hint/check completion.
 *
 * V0.15.1: naive row-major backtracking replaced by MRV solver after solvability
 * audit revealed hard puzzles could take minutes (exponential without heuristic).
 */

import { Value, SIZE } from './board';

export type Grid = Value[][];

export interface SolveResult {
  solvable: boolean;
  solution: Grid | null;
  /** Number of cells filled (1-9) in input grid */
  given_count: number;
}

const ALL = (1 << 10) - 2; // bits 1..9 set

/**
 * Solve a Sudoku grid using MRV backtracking with candidate bitmasks.
 * @param input 9x9 grid (0 = empty)
 * @returns solution grid if solvable, else null
 */
export function solveSudoku(input: Grid): Grid | null {
  if (input.length !== SIZE) return null;

  const sol: Grid = [];
  const rowMask = new Array<number>(SIZE).fill(0);
  const colMask = new Array<number>(SIZE).fill(0);
  const boxMask = new Array<number>(SIZE).fill(0);
  let emptyCount = 0;
  let given = 0;

  for (let r = 0; r < SIZE; r++) {
    if (input[r].length !== SIZE) return null;
    const row: Value[] = new Array(SIZE).fill(0);
    for (let c = 0; c < SIZE; c++) {
      const v = input[r][c];
      if (v < 0 || v > 9) return null;
      if (v !== 0) {
        row[c] = v;
        given++;
        const bit = 1 << v;
        if ((rowMask[r] & bit) !== 0) return null; // duplicate in row
        if ((colMask[c] & bit) !== 0) return null; // duplicate in col
        const b = boxIndex(r, c);
        if ((boxMask[b] & bit) !== 0) return null; // duplicate in box
        rowMask[r] |= bit;
        colMask[c] |= bit;
        boxMask[b] |= bit;
      } else {
        emptyCount++;
      }
    }
    sol.push(row);
  }

  if (emptyCount === 0) return sol; // already complete

  // Per-cell candidate masks (bits 1..9)
  const cand: number[][] = [];
  for (let r = 0; r < SIZE; r++) cand.push(new Array(SIZE).fill(0));

  const usedAt = (r: number, c: number): number =>
    rowMask[r] | colMask[c] | boxMask[boxIndex(r, c)];

  // Recompute candidates for all empty cells (after each assignment we lazily
  // invalidate instead of full recompute — see bt()).
  const recomputeAll = (): void => {
    for (let r = 0; r < SIZE; r++) {
      for (let c = 0; c < SIZE; c++) {
        if (sol[r][c] === 0) {
          cand[r][c] = ALL & ~usedAt(r, c);
        }
      }
    }
  };

  recomputeAll();

  if (bt(sol, cand, rowMask, colMask, boxMask, emptyCount)) return sol;
  return null;
}

function boxIndex(r: number, c: number): number {
  return Math.floor(r / 3) * 3 + Math.floor(c / 3);
}

function bt(
  sol: Grid,
  cand: number[][],
  rowMask: number[],
  colMask: number[],
  boxMask: number[],
  remaining: number,
): boolean {
  if (remaining === 0) return true;

  // MRV: find empty cell with fewest candidates
  let mr = -1;
  let mc = -1;
  let bestCount = 10;
  for (let r = 0; r < SIZE; r++) {
    const row = sol[r];
    const cr = cand[r];
    for (let c = 0; c < SIZE; c++) {
      if (row[c] !== 0) continue;
      const m = cr[c];
      if (m === 0) return false; // dead end: a cell with no candidates
      const count = bitCount(m);
      if (count < bestCount) {
        bestCount = count;
        mr = r;
        mc = c;
        if (count === 1) break; // cannot do better
      }
    }
    if (bestCount === 1) break;
  }
  if (mr === -1) return true; // no empties (defensive; remaining>0 implies empties exist)

  const bIdx = boxIndex(mr, mc);
  let m = cand[mr][mc];

  // Try values from fewest-count candidate mask in ascending order
  while (m !== 0) {
    const bit = m & -m; // lowest set bit
    m ^= bit;
    const v = bitToValue(bit);

    sol[mr][mc] = v;
    rowMask[mr] |= bit;
    colMask[mc] |= bit;
    boxMask[bIdx] |= bit;

    // Invalidate candidates for peers of (mr, mc)
    const removed: Array<[number, number, number]> = [];
    // row
    for (let c = 0; c < SIZE; c++) {
      if (sol[mr][c] === 0 && (cand[mr][c] & bit) !== 0) {
        cand[mr][c] &= ~bit;
        removed.push([mr, c, bit]);
      }
    }
    // col
    for (let r = 0; r < SIZE; r++) {
      if (sol[r][mc] === 0 && (cand[r][mc] & bit) !== 0) {
        cand[r][mc] &= ~bit;
        removed.push([r, mc, bit]);
      }
    }
    // box
    const br = Math.floor(mr / 3) * 3;
    const bc = Math.floor(mc / 3) * 3;
    for (let r = br; r < br + 3; r++) {
      for (let c = bc; c < bc + 3; c++) {
        if (r === mr && c === mc) continue;
        if (sol[r][c] === 0 && (cand[r][c] & bit) !== 0) {
          cand[r][c] &= ~bit;
          removed.push([r, c, bit]);
        }
      }
    }

    if (bt(sol, cand, rowMask, colMask, boxMask, remaining - 1)) return true;

    // Undo
    sol[mr][mc] = 0;
    rowMask[mr] &= ~bit;
    colMask[mc] &= ~bit;
    boxMask[bIdx] &= ~bit;
    for (const [r, c, b] of removed) cand[r][c] |= b;
  }
  return false;
}

function bitCount(x: number): number {
  let n = 0;
  while (x !== 0) {
    x &= x - 1;
    n++;
  }
  return n;
}

function bitToValue(bit: number): Value {
  // bit is 2^v for v in 1..9 (value 1 -> bit 2, value 9 -> bit 512)
  let v = 0;
  let b = bit;
  while (b > 1) {
    b >>= 1;
    v++;
  }
  return v;
}

/**
 * Memoize per-puzzle solution. Used by GameService to avoid re-solving on every check.
 */
const solutionCache = new Map<string, Grid | null>();

export function solveCached(id: string, grid: Grid): Grid | null {
  const cached = solutionCache.get(id);
  if (cached !== undefined) return cached;
  const sol = solveSudoku(grid);
  solutionCache.set(id, sol);
  return sol;
}

export function clearSolverCache(): void {
  solutionCache.clear();
}
