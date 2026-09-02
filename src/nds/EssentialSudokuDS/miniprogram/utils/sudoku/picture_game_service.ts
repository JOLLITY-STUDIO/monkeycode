/**
 * utils/sudoku/picture_game_service.ts — Picture Logic / 图画谜题游戏会话 (V0.17.10)
 *
 * Operates on NumcloPuzzle from numclo_puzzles.ts.
 * 15x15 grid, 6 colors per cell (0=empty, 1..5=palette).
 * Player paints cells; completion = player grid exactly matches target grid.
 */

import {
  CellColor,
  NUMCLO_CATALOG,
  unpackNumcloGrid,
} from './numclo_puzzles';

export interface PictureCoord {
  row: number;
  col: number;
}

export interface PictureSession {
  puzzleId: string;
  file: string;
  name: string;
  indexInFile: number;
  width: 15;
  height: 15;
  startTime: number;
  moves: number;
  grid: CellColor[];   // player painted state (225 values)
  target: CellColor[]; // answer state (225 values)
}

export class PictureGameService {
  private session: PictureSession | null = null;

  /** Start a puzzle by catalog id, e.g. 'numclo0.data_000'. */
  startPuzzle(puzzleId: string): { ok: boolean; error?: string } {
    const puzzle = NUMCLO_CATALOG.find(p => p.id === puzzleId);
    if (!puzzle) {
      return { ok: false, error: 'puzzle_not_found' };
    }
    const target = unpackNumcloGrid(puzzle.packed);
    this.session = {
      puzzleId: puzzle.id,
      file: puzzle.file,
      name: puzzle.name,
      indexInFile: puzzle.indexInFile,
      width: 15,
      height: 15,
      startTime: Date.now(),
      moves: 0,
      grid: new Array(225).fill(0) as CellColor[],
      target,
    };
    return { ok: true };
  }

  /** Pick a random puzzle from a file (defaults to numclo0.data). */
  startRandomPuzzle(fileName = 'numclo0.data'): { ok: boolean; error?: string } {
    const list = NUMCLO_CATALOG.filter(p => p.file === fileName);
    if (!list.length) {
      return { ok: false, error: 'no_puzzles_in_file' };
    }
    const puzzle = list[Math.floor(Math.random() * list.length)];
    return this.startPuzzle(puzzle.id);
  }

  /** Start a puzzle by file name + index-in-file (0-based), e.g. ('numclo0.data', 4). */
  startPuzzleInFile(fileName: string, indexInFile: number): { ok: boolean; error?: string } {
    const puzzle = NUMCLO_CATALOG.find(p => p.file === fileName && p.indexInFile === indexInFile);
    if (!puzzle) {
      return { ok: false, error: 'puzzle_not_found' };
    }
    return this.startPuzzle(puzzle.id);
  }

  /** List all catalog ids for a file (used for navigation: prev/next). */
  listFilePuzzleIds(fileName: string): string[] {
    return NUMCLO_CATALOG.filter(p => p.file === fileName).map(p => p.id);
  }

  getSession(): PictureSession | null {
    return this.session;
  }

  getGrid(): CellColor[] {
    return this.session?.grid ?? [];
  }

  getTarget(): CellColor[] {
    return this.session?.target ?? [];
  }

  getPuzzleInfo(): { puzzleId: string; name: string; file: string; indexInFile: number } | null {
    if (!this.session) return null;
    return {
      puzzleId: this.session.puzzleId,
      name: this.session.name,
      file: this.session.file,
      indexInFile: this.session.indexInFile,
    };
  }

  getSessionInfo(): { moves: number; elapsedMs: number } | null {
    if (!this.session) return null;
    return {
      moves: this.session.moves,
      elapsedMs: Date.now() - this.session.startTime,
    };
  }

  /** 恢复上次会话进度: 载入已涂网格 + 步数, 并把 startTime 前移以延续计时。 */
  restoreProgress(grid: CellColor[], moves: number, elapsedMs: number): boolean {
    if (!this.session) return false;
    if (!grid || grid.length !== 225) return false;
    this.session.grid = grid.slice();
    this.session.moves = moves >= 0 ? moves : 0;
    this.session.startTime = Date.now() - Math.max(0, elapsedMs);
    return true;
  }

  /** 把整个会话清空为未涂状态 (清空画板时同步 service, 不清计时/步数历史) */
  clearGrid(): boolean {
    if (!this.session) return false;
    this.session.grid = new Array(225).fill(0) as CellColor[];
    this.session.moves = 0;
    return true;
  }

  /** Paint a cell with the chosen color (0 = erase). */
  paint(row: number, col: number, color: CellColor): boolean {
    if (!this.session) return false;
    const idx = row * 15 + col;
    if (idx < 0 || idx >= 225) return false;
    if (this.session.grid[idx] === color) return false;
    this.session.grid[idx] = color;
    if (color !== 0) {
      this.session.moves += 1;
    }
    return true;
  }

  /** Check if player grid exactly matches the target. */
  checkComplete(): { complete: boolean; wrong: number } {
    if (!this.session) {
      return { complete: false, wrong: 0 };
    }
    let wrong = 0;
    for (let i = 0; i < 225; i++) {
      if (this.session.grid[i] !== this.session.target[i]) {
        wrong += 1;
      }
    }
    return { complete: wrong === 0, wrong };
  }

  endGame(): { durationMs: number; moves: number; complete: boolean } | null {
    if (!this.session) return null;
    const out = {
      durationMs: Date.now() - this.session.startTime,
      moves: this.session.moves,
      complete: this.checkComplete().complete,
    };
    this.session = null;
    return out;
  }
}
