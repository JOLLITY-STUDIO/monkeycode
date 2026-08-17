/**
 * Picross 游戏引擎 —— 纯 TS 实现，不依赖任何平台 API
 * 状态管理 / 单元格操作 / 提示校验 / 完成检测
 */
import { CellMark, GameState, LineHint, Puzzle } from "./types";
import { computeLineHints } from "./hints";

export interface EngineCallbacks {
  onStateChange(state: GameState): void;
  onSolved(state: GameState): void;
}

export class PicrossEngine {
  private puzzle: Puzzle;
  private marks: CellMark[];
  private rowHints: LineHint[];
  private colHints: LineHint[];
  private elapsed = 0;
  private mistakes = 0;
  private readonly maxMistakes = 5; // Picross DS: 5 次失误
  private solved = false;
  private filledCount = 0;
  private totalFilled = 0;
  private timer: any = null;
  private cb: EngineCallbacks;
  // F2: 状态缓存，仅 dirty 时重建，减少对象分配
  private stateCache: GameState | null = null;
  private dirty = true;

  constructor(puzzle: Puzzle, cb: EngineCallbacks) {
    this.puzzle = puzzle;
    this.cb = cb;
    this.marks = new Array(puzzle.width * puzzle.height).fill("empty");
    this.rowHints = this.buildRowHints();
    this.colHints = this.buildColHints();
    this.totalFilled = this.countSolution();
    this.filledCount = 0;
  }

  start(): void {
    this.stopTimer();
    this.dirty = true;
    this.timer = setInterval(() => {
      if (!this.solved) {
        this.elapsed++;
        this.dirty = true;
        this.emit();
      }
    }, 1000);
    this.emit();
  }

  stop(): void {
    this.stopTimer();
  }

  destroy(): void {
    this.stopTimer();
  }

  private stopTimer(): void {
    if (this.timer != null) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  getState(): GameState {
    if (this.stateCache && !this.dirty) return this.stateCache;
    this.stateCache = {
      puzzle: this.puzzle,
      marks: this.marks,
      rowHints: this.rowHints,
      colHints: this.colHints,
      elapsedSec: this.elapsed,
      mistakes: this.mistakes,
      maxMistakes: this.maxMistakes,
      solved: this.solved,
      filledCount: this.filledCount,
      totalFilled: this.totalFilled,
    };
    this.dirty = false;
    return this.stateCache;
  }

  /**
   * 单元格操作（Picross DS 触摸循环：填充 → 叉 → 清除 → 填充）
   * 模式: cycle=按序切换, mark=直接指定
   */
  tapCell(x: number, y: number, mode: "cycle" | "mark" = "cycle", mark?: CellMark): void {
    if (this.solved) return;
    if (x < 0 || y < 0 || x >= this.puzzle.width || y >= this.puzzle.height) return;

    const idx = y * this.puzzle.width + x;
    const cur = this.marks[idx];
    let next: CellMark;
    if (mode === "mark" && mark) {
      next = mark;
    } else {
      next = cur === "empty" ? "filled" : cur === "filled" ? "crossed" : "empty";
    }

    // 失误判定：填充了空单元格
    const isFilledNow = next === "filled";
    const wasFilled = cur === "filled";
    const isCorrect = this.isSolutionCell(x, y);
    if (isFilledNow && !wasFilled) {
      this.filledCount++;
      if (!isCorrect) this.mistakes++;
    } else if (wasFilled && !isFilledNow) {
      this.filledCount--;
    }

    this.marks[idx] = next;
    this.refreshHints();
    this.dirty = true;
    this.checkSolved();
    this.emit();
  }

  /** 清除单个单元格 */
  clearCell(x: number, y: number): void {
    const idx = y * this.puzzle.width + x;
    if (this.marks[idx] === "filled") this.filledCount--;
    this.marks[idx] = "empty";
    this.refreshHints();
    this.dirty = true;
    this.emit();
  }

  private refreshHints(): void {
    for (let y = 0; y < this.puzzle.height; y++) {
      this.rowHints[y].satisfied = this.lineSatisfied(y, true);
    }
    for (let x = 0; x < this.puzzle.width; x++) {
      this.colHints[x].satisfied = this.lineSatisfied(x, false);
    }
  }

  private lineSatisfied(line: number, isRow: boolean): boolean {
    const len = isRow ? this.puzzle.width : this.puzzle.height;
    // 已填充格必须全部正确且数量匹配提示
    let filled = 0;
    for (let i = 0; i < len; i++) {
      const x = isRow ? i : line;
      const y = isRow ? line : i;
      if (this.marks[y * this.puzzle.width + x] === "filled") {
        if (!this.isSolutionCell(x, y)) return false;
        filled++;
      }
    }
    const expected = this.countSolutionLine(line, isRow);
    return filled === expected;
  }

  private isSolutionCell(x: number, y: number): boolean {
    const bitIdx = y * this.puzzle.width + x;
    return (this.puzzle.solution[bitIdx >> 3] >> (7 - (bitIdx & 7))) & 1 ? true : false;
  }

  private countSolutionLine(line: number, isRow: boolean): number {
    const len = isRow ? this.puzzle.width : this.puzzle.height;
    let n = 0;
    for (let i = 0; i < len; i++) {
      const x = isRow ? i : line;
      const y = isRow ? line : i;
      if (this.isSolutionCell(x, y)) n++;
    }
    return n;
  }

  private countSolution(): number {
    let n = 0;
    for (let i = 0; i < this.puzzle.width * this.puzzle.height; i++) {
      if ((this.puzzle.solution[i >> 3] >> (7 - (i & 7))) & 1) n++;
    }
    return n;
  }

  private buildRowHints(): LineHint[] {
    const res: LineHint[] = [];
    for (let y = 0; y < this.puzzle.height; y++) {
      const line = new Uint8Array((this.puzzle.width + 7) >> 3);
      for (let x = 0; x < this.puzzle.width; x++) {
        if (this.isSolutionCell(x, y)) line[x >> 3] |= 1 << (7 - (x & 7));
      }
      res.push({ nums: computeLineHints(line, this.puzzle.width), satisfied: false });
    }
    return res;
  }

  private buildColHints(): LineHint[] {
    const res: LineHint[] = [];
    for (let x = 0; x < this.puzzle.width; x++) {
      const line = new Uint8Array((this.puzzle.height + 7) >> 3);
      for (let y = 0; y < this.puzzle.height; y++) {
        if (this.isSolutionCell(x, y)) line[y >> 3] |= 1 << (7 - (y & 7));
      }
      res.push({ nums: computeLineHints(line, this.puzzle.height), satisfied: false });
    }
    return res;
  }

  private checkSolved(): void {
    if (this.solved) return;
    // 所有解法格已填充（filledCount == totalFilled）
    if (this.filledCount !== this.totalFilled) return;
    // 且不存在误填格（错误填充仍会计入 filledCount）
    const w = this.puzzle.width;
    for (let i = 0; i < this.marks.length; i++) {
      if (this.marks[i] === "filled" && !this.isSolutionCell(i % w, (i / w) | 0)) return;
    }
    this.solved = true;
    this.stopTimer();
    if (this.cb.onSolved) this.cb.onSolved(this.getState());
  }

  private emit(): void {
    if (this.cb.onStateChange) this.cb.onStateChange(this.getState());
  }
}
