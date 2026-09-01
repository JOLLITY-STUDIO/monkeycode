/**
 * utils/sudoku/game_service.ts — Sudoku game session orchestration (V0.15.2)
 *
 * Wires SudokuBoard + SudokuSolver + NumpleCatalog (real NDS numple0-9.data) into
 * a single business-logic surface. Used by page/controller to start a session,
 * apply player input, check completion, request hints.
 *
 * Game loop:
 *   1. startNewGame(difficulty): pick puzzle from catalog → create SudokuBoard → start session
 *   2. selectCell(row, col): select a non-given cell
 *   3. inputValue(row, col, value): write value to non-given cell, recompute errors
 *   4. undo() / redo(): not implemented in V0.15 (placeholder)
 *   5. checkCompletion(): board.isComplete → returns win state
 *   6. hint(): if board has errors or empty cells, request solver
 *
 * V0.15.2: catalog switched to numple (real Number Place / Sudoku, 1000 puzzles
 * verified solvable+unique).
 *
 * NOTE (V0.17.3 修正): numclo*.data 不是 "wrong format" — 它是图画谜题
 * picture puzzle 玩法的题库 (15 文件 / 1525 puzzles, 见 docs/NUMCLO_FORMAT.md).
 * 项目目标是 1:1 还原完整游戏: 数独 (numple) + 图画谜题 (numclo) 双玩法都要做.
 * numclo 格式的 high-nibble 状态位仍未解开, 需继续暴力破解 (勿再标注弃用).
 *
 * V0.15.1 todo: Add timer + per-session scoring (was implemented in NDS as minute counter)
 */

import { SudokuBoard, Coord, Value } from './board';
import {
  NumplePuzzle,
  Difficulty,
  getRandomPuzzle,
  getDailyPuzzle,
  cellsToGrid,
} from './numple_puzzles';
import { solveSudoku, Grid } from './solver';

export interface GameSession {
  puzzleId: string;
  difficulty: Difficulty;
  startTime: number;
  moves: number;
  board: SudokuBoard;
  solution: Grid | null;
}

export class SudokuGameService {
  private session: GameSession | null = null;

  /** Start a new game session with a random puzzle from given difficulty.
   *  If difficulty omitted, uses daily puzzle.
   *  Returns session metadata; page should refresh board via getBoard(). */
  startNewGame(difficulty?: Difficulty): { ok: boolean; error?: string } {
    const puzzle = difficulty ? getRandomPuzzle(difficulty) : getDailyPuzzle();
    if (!puzzle) {
      return { ok: false, error: 'no_puzzle_available' };
    }
    return this.startFromPuzzle(puzzle);
  }

  /** Start a session from a specific puzzle.
   *  Note: Solution is solved lazily; checkCompletion() triggers solve if needed. */
  startFromPuzzle(puzzle: NumplePuzzle): { ok: boolean; error?: string } {
    const grid = cellsToGrid(puzzle.cells);
    let solution: Grid | null = null;
    let board: SudokuBoard;
    try {
      board = new SudokuBoard(grid, grid);  // solution is placeholder; solved lazily
    } catch (e) {
      return { ok: false, error: 'invalid_puzzle' };
    }
    // V0.15: solve immediately for first session so hint/check are instant
    solution = solveSudoku(grid);
    if (solution) {
      // Replace solution with real one
      board = new SudokuBoard(grid, solution);
    }
    this.session = {
      puzzleId: puzzle.id,
      difficulty: puzzle.difficulty,
      startTime: Date.now(),
      moves: 0,
      board,
      solution,
    };
    return { ok: true };
  }

  /** Returns current SudokuBoard. Page renders cells via board.cells[row][col]. */
  getBoard(): SudokuBoard | null {
    return this.session?.board ?? null;
  }

  /** Returns the puzzle id for this session (for stats/analytics). */
  getPuzzleId(): string | null {
    return this.session?.puzzleId ?? null;
  }

  getSessionInfo(): { difficulty: Difficulty; moves: number; elapsedMs: number } | null {
    if (!this.session) return null;
    return {
      difficulty: this.session.difficulty,
      moves: this.session.moves,
      elapsedMs: Date.now() - this.session.startTime,
    };
  }

  selectCell(coord: Coord): void {
    this.session?.board.select(coord);
  }

  /** Input a value (1-9). Returns true if accepted.
   *  - given cells: rejected
   *  - valid input: accepted, board tracks isError
   *  - auto increments moves */
  inputValue(row: number, col: number, value: Value): boolean {
    if (!this.session) return false;
    const ok = this.session.board.setValue(row, col, value);
    if (ok) {
      this.session.moves = this.session.board.moveCount;
    }
    return ok;
  }

  /** Clear a single cell (revert non-given to empty) and its candidates. */
  clearAt(row: number, col: number): boolean {
    if (!this.session) return false;
    const ok = this.session.board.clearAt(row, col);
    if (ok) this.session.moves = this.session.board.moveCount;
    return ok;
  }

  /** Toggle candidate note (pencil mark) on selected empty cell. */
  toggleCandidate(row: number, col: number, value: Value): boolean {
    if (!this.session) return false;
    const ok = this.session.board.toggleCandidate(row, col, value);
    if (ok) this.session.moves = this.session.board.moveCount;
    return ok;
  }

  /** Undo last action. */
  undo(): boolean {
    if (!this.session) return false;
    const ok = this.session.board.undo();
    if (ok) this.session.moves = this.session.board.moveCount;
    return ok;
  }

  /** Redo last undone action. */
  redo(): boolean {
    if (!this.session) return false;
    const ok = this.session.board.redo();
    if (ok) this.session.moves = this.session.board.moveCount;
    return ok;
  }

  /** Undo/redo availability for UI. */
  getUndoRedoState(): { canUndo: boolean; canRedo: boolean } {
    return {
      canUndo: this.session?.board.canUndo ?? false,
      canRedo: this.session?.board.canRedo ?? false,
    };
  }

  /** Check if the puzzle is complete. Returns { complete, valid } tuple. */
  checkCompletion(): { complete: boolean; valid: boolean; errors: number } {
    if (!this.session) {
      return { complete: false, valid: false, errors: 0 };
    }
    const board = this.session.board;
    let errors = 0;
    for (const row of board.cells) {
      for (const cell of row) {
        if (cell.isError) errors += 1;
      }
    }
    if (errors > 0) {
      return { complete: false, valid: false, errors };
    }
    if (board.isComplete()) {
      return { complete: true, valid: true, errors: 0 };
    }
    return { complete: false, valid: true, errors: 0 };
  }

  /** Hint: returns the next empty/error cell's correct value from solution.
   *  Returns null if no solution known or no hint available. */
  hint(): { row: number; col: number; value: Value } | null {
    if (!this.session?.solution) return null;
    const board = this.session.board;
    for (const row of board.cells) {
      for (const cell of row) {
        if (!cell.given && (cell.isError || cell.value === 0)) {
          return {
            row: cell.row,
            col: cell.col,
            value: this.session.solution[cell.row][cell.col],
          };
        }
      }
    }
    return null;
  }

  /** End the current session. */
  endGame(): { durationMs: number; moves: number; complete: boolean } | null {
    if (!this.session) return null;
    const out = {
      durationMs: Date.now() - this.session.startTime,
      moves: this.session.moves,
      complete: this.session.board.isComplete(),
    };
    this.session = null;
    return out;
  }
}
