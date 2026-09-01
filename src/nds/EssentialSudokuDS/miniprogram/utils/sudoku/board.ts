/**
 * utils/sudoku/board.ts — Sudoku 数据模型 + 状态 (V0.4)
 *
 * V0.4 真实业务逻辑 — 不是 demo / fixture. 算法严格遵循标准 sudoku 1-9 校验:
 *  - Row 9: 同 row 没有重复非 0 值
 *  - Col 9: 同 col 没有重复非 0 值
 *  - Box 3x3: 同 box 没有重复非 0 值
 *  - 给定格 (given=true) 不能改
 *  - setValue 自动 isError 标 flag
 *  - isComplete 返回 81 cell 全填 + 全 !isError
 *
 * 与 ARM9 `service_register_input` 业务对应:
 *  - 玩家输入数字 (1-9) → setValue → 立即反馈 isError (红框)
 *  - 玩家选中 cell → select
 *  - 玩家按 hint → 返回下一个空/错 cell 的坐标
 *
 * V0.4 todo: undo/redo stack (V0.5); multi-puzzle session (V0.6 numple data).
 */

export type Value = number; // 0=空, 1-9=填

export interface Cell {
  row: number;
  col: number;
  given: boolean;
  value: Value;
  isError: boolean;
}

export interface Coord {
  row: number;
  col: number;
}

export const SIZE = 9;
export const BOX_SIZE = 3;

export class SudokuBoard {
  cells: Cell[][] = [];
  selected: Coord | null = null;
  puzzle: Value[][] = [];
  solution: Value[][] = [];
  private _moves = 0;

  constructor(puzzle: Value[][], solution: Value[][]) {
    if (puzzle.length !== SIZE || solution.length !== SIZE) {
      throw new Error(`SudokuBoard: puzzle/solution must be ${SIZE}x${SIZE} (got ${puzzle.length}x${solution.length})`);
    }
    for (let r = 0; r < SIZE; r++) {
      if (puzzle[r].length !== SIZE || solution[r].length !== SIZE) {
        throw new Error(`SudokuBoard: row ${r} length mismatch (puzzle=${puzzle[r].length}, solution=${solution[r].length})`);
      }
      const row: Cell[] = [];
      for (let c = 0; c < SIZE; c++) {
        const pv = puzzle[r][c] | 0;
        const sv = solution[r][c] | 0;
        if (pv < 0 || pv > 9) {
          throw new Error(`SudokuBoard: puzzle[${r}][${c}] out of range (${pv})`);
        }
        if (sv < 0 || sv > 9) {
          throw new Error(`SudokuBoard: solution[${r}][${c}] out of range (${sv})`);
        }
        const given = pv !== 0;
        row.push({
          row: r,
          col: c,
          given,
          value: given ? pv : 0,
          isError: false,
        });
      }
      this.cells.push(row);
    }
    this.puzzle = puzzle.map((r) => r.slice());
    this.solution = solution.map((r) => r.slice());
    this._validate();
  }

  select(coord: Coord | null): void {
    if (coord === null) {
      this.selected = null;
      return;
    }
    if (coord.row < 0 || coord.row >= SIZE || coord.col < 0 || coord.col >= SIZE) {
      throw new Error(`SudokuBoard.select: out-of-range coord (${coord.row},${coord.col})`);
    }
    this.selected = { row: coord.row, col: coord.col };
  }

  /** Write `value` (1-9) to selected cell, or explicit (row, col). Returns true if accepted.
   *  - given cells: 拒绝, 返回 false
   *  - value==0: 等价 clearSelectedAt(row,col)
   *  - auto recompute isError after write
   */
  setValue(row: number, col: number, value: Value): boolean {
    if (value < 0 || value > 9) return false;
    if (row < 0 || row >= SIZE || col < 0 || col >= SIZE) return false;
    const cell = this.cells[row][col];
    if (cell.given) return false;
    cell.value = value | 0;
    this._moves += 1;
    this._validate();
    return true;
  }

  /** Clear value at given cell. Returns true if changed. */
  clearAt(row: number, col: number): boolean {
    if (row < 0 || row >= SIZE || col < 0 || col >= SIZE) return false;
    const cell = this.cells[row][col];
    if (cell.given) return false;
    if (cell.value === 0) return false;
    cell.value = 0;
    this._moves += 1;
    this._validate();
    return true;
  }

  /** Clear value at currently selected cell. */
  clearSelected(): boolean {
    if (!this.selected) return false;
    return this.clearAt(this.selected.row, this.selected.col);
  }

  /** Sudoku complete = all 81 cells filled + zero conflicts. */
  isComplete(): boolean {
    for (let r = 0; r < SIZE; r++) {
      for (let c = 0; c < SIZE; c++) {
        const cell = this.cells[r][c];
        if (cell.value === 0) return false;
        if (cell.isError) return false;
      }
    }
    return true;
  }

  /** Find next cell needing hint: row-major priority, no-given-only cells with value==0 OR isError==true.
   *  Returns null if no hint needed.
   */
  hint(): Coord | null {
    for (let r = 0; r < SIZE; r++) {
      for (let c = 0; c < SIZE; c++) {
        const cell = this.cells[r][c];
        if (cell.given) continue;
        if (cell.value === 0 || cell.isError) {
          return { row: r, col: c };
        }
      }
    }
    return null;
  }

  /** Get solution cell value (for hint). Returns 0 if out-of-range. */
  solutionAt(row: number, col: number): Value {
    if (row < 0 || row >= SIZE || col < 0 || col >= SIZE) return 0;
    return this.solution[row][col] | 0;
  }

  /** Number of user moves so far. */
  get moveCount(): number {
    return this._moves;
  }

  /** Recompute isError flags based on current cell values. */
  private _validate(): void {
    // Reset all flags first
    for (let r = 0; r < SIZE; r++) {
      for (let c = 0; c < SIZE; c++) {
        this.cells[r][c].isError = false;
      }
    }
    // Row conflicts
    for (let r = 0; r < SIZE; r++) {
      const seen = new Map<Value, number[]>();
      for (let c = 0; c < SIZE; c++) {
        const v = this.cells[r][c].value;
        if (v === 0) continue;
        const arr = seen.get(v) ?? [];
        arr.push(c);
        seen.set(v, arr);
      }
      for (const [, cols] of seen) {
        if (cols.length > 1) {
          for (const c of cols) this.cells[r][c].isError = true;
        }
      }
    }
    // Col conflicts
    for (let c = 0; c < SIZE; c++) {
      const seen = new Map<Value, number[]>();
      for (let r = 0; r < SIZE; r++) {
        const v = this.cells[r][c].value;
        if (v === 0) continue;
        const arr = seen.get(v) ?? [];
        arr.push(r);
        seen.set(v, arr);
      }
      for (const [, rows] of seen) {
        if (rows.length > 1) {
          for (const r of rows) this.cells[r][c].isError = true;
        }
      }
    }
    // Box (3x3) conflicts
    for (let br = 0; br < SIZE; br += BOX_SIZE) {
      for (let bc = 0; bc < SIZE; bc += BOX_SIZE) {
        const seen = new Map<Value, Array<{ r: number; c: number }>>();
        for (let r = br; r < br + BOX_SIZE; r++) {
          for (let c = bc; c < bc + BOX_SIZE; c++) {
            const v = this.cells[r][c].value;
            if (v === 0) continue;
            const arr = seen.get(v) ?? [];
            arr.push({ r, c });
            seen.set(v, arr);
          }
        }
        for (const [, cells] of seen) {
          if (cells.length > 1) {
            for (const { r, c } of cells) this.cells[r][c].isError = true;
          }
        }
      }
    }
  }

  toJSON(): { grid: Cell[][]; selected: Coord | null; moves: number } {
    return { grid: this.cells, selected: this.selected, moves: this._moves };
  }
}
