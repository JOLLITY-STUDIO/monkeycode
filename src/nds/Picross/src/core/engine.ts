/**
 * Picross 游戏引擎 —— 纯 TS 实现，不依赖任何平台 API
 * 状态管理 / 单元格操作 / 提示校验 / 完成检测
 *
 * ARM9 反汇编真对照（_tmp_disasm_out/arm9.bin.asm，BUG-020 校准）：
 *   - 失误阈值 5: cmp r4, #5 @ 0x2001264 + bl 0x201fa14 (失败处理) → 本类 maxMistakes=5
 *   - 状态机: cmp r0, #0xe; addls pc, pc, r0, lsl #2 @ 0x2001290  (8 个 state 分支)
 *     → 本类 if (solved) / if (failed) 早返回等价于 state=N→state=N+1 转换前的 guard
 *   - 解答判定: cmp r0, #5; bl 0x201fa14 @ 0x2001344 → 本类 onSolved 回调
 *   - 错误输入检查: bl 0x2027f6c → cmp r0, #1 @ 0x20012d8 → 等价 isSolutionCell 返回比较
 *   - 状态字段: state byte 在 [r5, #7]，计数 u16 在 [r5, #0x10] (命中 0x258=600 = 5秒)
 *   - 提示校验: bl 0x2024240 取 cell 当前 mark @ 0x2001258
 *                → 等价 onStateChange → refreshHints → lineSatisfied
 *   - 完成检测: 全填且无误填 (filledCount == totalFilled && no wrong) → checkSolved
 * NOTE 0x207d898 / 0x2075310 这俩假地址在 DEVLOG 阶段 7 / BUGS BUG-018 误引，
 *   经 BUG-020 校对：grep 反汇编 0 次引用。已删。
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
  private readonly maxMistakes = 5; // Picross DS: 5 次失误（=ARM9 cmp r4, #5 @ 0x2001264 触发阈值）
  private solved = false;
  private failed = false; // G5: 失误达上限游戏结束
  private filledCount = 0;
  private totalFilled = 0;
  private timer: any = null;
  private cb: EngineCallbacks;
  // F2: 状态缓存，仅 dirty 时重建，减少对象分配
  private stateCache: GameState | null = null;
  private dirty = true;

  // U2: Undo/Redo 历史栈（每格操作前压栈当前 marks 快照）
  private undoStack: CellMark[][] = [];
  private redoStack: CellMark[][] = [];
  private readonly historyCap = 200;

  constructor(puzzle: Puzzle, cb: EngineCallbacks) {
    this.puzzle = puzzle;
    this.cb = cb;
    this.marks = new Array(puzzle.width * puzzle.height).fill("empty");
    this.rowHints = this.buildRowHints();
    this.colHints = this.buildColHints();
    this.totalFilled = this.countSolution();
    this.filledCount = 0;
    this.undoStack = [];
    this.redoStack = [];
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
      failed: this.failed,
      filledCount: this.filledCount,
      totalFilled: this.totalFilled,
    };
    this.dirty = false;
    return this.stateCache;
  }

  /**
   * 单元格操作（对应 ARM9 处理 cell tap 的入口，调 bl 0x2024240 取当前 mark）
   * 模式: cycle=按序切换, mark=直接指定
   */
  tapCell(x: number, y: number, mode: "cycle" | "mark" = "cycle", mark?: CellMark): void {
    if (this.solved || this.failed) return;
    if (x < 0 || y < 0 || x >= this.puzzle.width || y >= this.puzzle.height) return;

    const idx = y * this.puzzle.width + x;
    const cur = this.marks[idx];
    let next: CellMark;
    if (mode === "mark" && mark) {
      next = mark;
    } else {
      next = cur === "empty" ? "filled" : cur === "filled" ? "crossed" : "empty";
    }

    if (next === cur) return; // 无变化不入栈（U2 撤销无意义）

    // U2: 撤销栈压入当前快照，新动作清空 redo 栈
    this.pushHistory();

    // 失误判定：填充了空单元格
    const isFilledNow = next === "filled";
    const wasFilled = cur === "filled";
    const isCorrect = this.isSolutionCell(x, y);
    if (isFilledNow && !wasFilled) {
      this.filledCount++;
      if (!isCorrect) {
        this.mistakes++;
        if (this.mistakes >= this.maxMistakes) {
          this.failed = true;
          this.stopTimer();
        }
      }
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
    if (this.marks[idx] === "empty") return;
    this.pushHistory();
    if (this.marks[idx] === "filled") this.filledCount--;
    this.marks[idx] = "empty";
    this.refreshHints();
    this.dirty = true;
    this.emit();
  }

  // ============ U2: Undo / Redo ============

  private pushHistory(): void {
    this.undoStack.push(this.marks.slice());
    if (this.undoStack.length > this.historyCap) this.undoStack.shift();
    this.redoStack = [];
  }

  undo(): boolean {
    if (!this.undoStack.length) return false;
    this.redoStack.push(this.marks.slice());
    if (this.redoStack.length > this.historyCap) this.redoStack.shift();
    this.marks = this.undoStack.pop()!;
    this.filledCount = this.countCurrentFilled();
    // 撤销可恢复失误态（如果之前已 failed，撤销了触发失误的填充）
    if (this.failed) this.failed = false;
    // 失误数不主动回滚（Picross DS：已记录的失误不能撤销）
    // 但启动 timer
    if (this.timer == null && !this.solved) this.start();
    this.refreshHints();
    this.dirty = true;
    this.emit();
    return true;
  }

  redo(): boolean {
    if (!this.redoStack.length) return false;
    this.undoStack.push(this.marks.slice());
    if (this.undoStack.length > this.historyCap) this.undoStack.shift();
    this.marks = this.redoStack.pop()!;
    this.filledCount = this.countCurrentFilled();
    this.refreshHints();
    this.dirty = true;
    this.emit();
    return true;
  }

  canUndo(): boolean { return this.undoStack.length > 0; }
  canRedo(): boolean { return this.redoStack.length > 0; }
  undoDepth(): number { return this.undoStack.length; }
  redoDepth(): number { return this.redoStack.length; }
  resetHistory(): void { this.undoStack = []; this.redoStack = []; }

  private countCurrentFilled(): number {
    let n = 0;
    for (const m of this.marks) if (m === "filled") n++;
    return n;
  }

  // ============ U3: 中途存档 / 读档（用于退出后 resume） ============

  /** 导出当前 marks 状态（2 bit/cell） */
  serialize(): Uint8Array {
    const n = this.marks.length;
    const out = new Uint8Array(Math.ceil(n / 4));
    for (let i = 0; i < n; i++) {
      const v = this.marks[i] === "filled" ? 1 : this.marks[i] === "crossed" ? 2 : 0;
      out[i >> 2] |= (v & 0x3) << (6 - (i & 3) * 2);
    }
    return out;
  }

  /** 从存档恢复 marks */
  loadFromSerialized(buf: Uint8Array, elapsedSec: number = 0): void {
    this.elapsed = elapsedSec;
    this.marks = new Array(this.puzzle.width * this.puzzle.height);
    for (let i = 0; i < this.marks.length; i++) {
      const v = (buf[i >> 2] >> (6 - (i & 3) * 2)) & 0x3;
      this.marks[i] = v === 1 ? "filled" : v === 2 ? "crossed" : "empty";
    }
    this.filledCount = this.countCurrentFilled();
    this.mistakes = 0;
    this.solved = false;
    this.failed = false;
    this.undoStack = [];
    this.redoStack = [];
    this.refreshHints();
    this.dirty = true;
    this.emit();
  }

  /** 设置 elapsed（兼容持久化 resume） */
  setElapsed(sec: number): void { this.elapsed = sec; }
  getElapsed(): number { return this.elapsed; }

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
    // 完成条件（ARM9 @ 0x2001338-0x2001354 + 0x2001690 段 dispatch 全填 → state 9 → timer 0x258=600）：
    //   1) filledCount == totalFilled（板面全填）
    //   2) 没有任何被错填的格（filled 但非 solution）
    // 同真机：全填 + 无错 → state 4 (CLEAR) → 触发 onSolved
    if (this.filledCount !== this.totalFilled) return;
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
