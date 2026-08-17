/**
 * Picross 渲染器 —— 纯 Canvas 2D，兼容微信小程序与 HTML5
 * 布局: 顶部=列提示区, 左侧=行提示区, 中间=网格
 */
import { CellMark, GameState, HitResult } from "../core/types";

/** 平台无关的 Canvas 2D 上下文最小接口 */
export interface CanvasLike {
  width: number;
  height: number;
  getContext(type: "2d"): CanvasRenderingContext2D;
}

export interface RendererOptions {
  /** 主色（涂色） */
  fillColor?: string;
  /** 背景色 */
  bgColor?: string;
  /** 提示数字颜色 */
  hintColor?: string;
}

export class PicrossRenderer {
  private ctx: CanvasRenderingContext2D;
  private canvas: CanvasLike;
  private opts: Required<RendererOptions>;

  // 布局
  private hintH = 0;   // 列提示区高度
  private hintW = 0;   // 行提示区宽度
  private cell = 0;    // 单元格像素
  private gridX = 0;
  private gridY = 0;

  // F2: 脏区缓存 —— 布局快照 + 上一帧 marks
  private lastW = 0;
  private lastH = 0;
  private lastCW = 0;
  private lastCH = 0;
  private lastMarks: CellMark[] | null = null;

  constructor(canvas: CanvasLike, opts: RendererOptions = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.opts = {
      fillColor: "#3b6fd4",
      bgColor: "#e8ecf2",
      hintColor: "#1a1a2e",
      ...opts,
    };
  }

  /** 根据拼图尺寸重新计算布局 */
  private layout(width: number, height: number, maxCell = 34): void {
    const cw = this.canvas.width;
    const ch = this.canvas.height;
    // 预留提示区（最多 ~8 位数字）
    this.hintH = Math.min(72, Math.floor(ch * 0.22));
    this.hintW = Math.min(72, Math.floor(cw * 0.22));
    this.cell = Math.floor(Math.min(
      (cw - this.hintW) / width,
      (ch - this.hintH) / height,
      maxCell
    ));
    this.gridX = Math.floor((cw - this.hintW - this.cell * width) / 2) + this.hintW;
    this.gridY = Math.floor((ch - this.hintH - this.cell * height) / 2) + this.hintH;
  }

  draw(state: GameState): void {
    const { width, height } = state.puzzle;
    const cw = this.canvas.width;
    const ch = this.canvas.height;

    // 布局变化 → 全量重绘
    if (
      this.lastCW !== cw || this.lastCH !== ch ||
      this.lastW !== width || this.lastH !== height
    ) {
      this.layout(width, height);
      this.drawFull(state);
      this.lastW = width;
      this.lastH = height;
      this.lastCW = cw;
      this.lastCH = ch;
      this.lastMarks = state.marks.slice();
      return;
    }

    // 脏区：仅重绘变化的格子 + 受影响行列提示
    const changed: number[] = [];
    for (let i = 0; i < state.marks.length; i++) {
      if (state.marks[i] !== this.lastMarks![i]) changed.push(i);
    }
    if (changed.length) {
      for (const i of changed) {
        const x = i % width;
        const y = (i / width) | 0;
        this.drawCell(x, y, state.marks[i]);
        this.redrawRowHint(state.rowHints[y].nums, y, state.rowHints[y].satisfied);
        this.redrawColHint(state.colHints[x].nums, x, state.colHints[x].satisfied);
      }
      this.lastMarks = state.marks.slice();
    }

    // 顶部标签/进度条（时间每帧变化）
    this.drawLabels(state);
  }

  /** 全量重绘（布局变化/首帧） */
  private drawFull(state: GameState): void {
    const { width, height } = state.puzzle;
    const ctx = this.ctx;

    ctx.fillStyle = "#0f0f1a";
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // 提示区背景
    ctx.fillStyle = "#1c1c33";
    ctx.fillRect(0, 0, this.canvas.width, this.hintH);
    ctx.fillRect(0, 0, this.hintW, this.canvas.height);

    // 网格
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        this.drawCell(x, y, state.marks[y * width + x]);
      }
    }

    // 网格线
    ctx.strokeStyle = "#4a4a6a";
    ctx.lineWidth = 1;
    for (let x = 0; x <= width; x++) {
      const px = this.gridX + x * this.cell;
      ctx.beginPath();
      ctx.moveTo(px, this.gridY);
      ctx.lineTo(px, this.gridY + height * this.cell);
      ctx.stroke();
    }
    for (let y = 0; y <= height; y++) {
      const py = this.gridY + y * this.cell;
      ctx.beginPath();
      ctx.moveTo(this.gridX, py);
      ctx.lineTo(this.gridX + width * this.cell, py);
      ctx.stroke();
    }

    // 行列提示
    for (let y = 0; y < height; y++) {
      const hint = state.rowHints[y];
      this.drawRowHint(hint.nums, y, hint.satisfied);
    }
    for (let x = 0; x < width; x++) {
      const hint = state.colHints[x];
      this.drawColHint(hint.nums, x, hint.satisfied);
    }

    // 顶部/左侧标签
    this.drawLabels(state);
  }

  /** 绘制单个格子（背景 + 填充 + 叉） */
  private drawCell(x: number, y: number, mark: CellMark): void {
    const ctx = this.ctx;
    const px = this.gridX + x * this.cell;
    const py = this.gridY + y * this.cell;
    ctx.fillStyle = mark === "filled" ? this.opts.fillColor : this.opts.bgColor;
    ctx.fillRect(px + 1, py + 1, this.cell - 2, this.cell - 2);
    if (mark === "crossed") this.drawCross(px, py);
  }

  /** 重绘行提示（先擦除旧数字） */
  private redrawRowHint(nums: number[], row: number, satisfied: boolean): void {
    const ctx = this.ctx;
    ctx.fillStyle = "#1c1c33";
    ctx.fillRect(0, this.gridY + row * this.cell, this.hintW, this.cell);
    this.drawRowHint(nums, row, satisfied);
  }

  /** 重绘列提示（先擦除旧数字） */
  private redrawColHint(nums: number[], col: number, satisfied: boolean): void {
    const ctx = this.ctx;
    ctx.fillStyle = "#1c1c33";
    ctx.fillRect(this.gridX + col * this.cell, 0, this.cell, this.hintH);
    this.drawColHint(nums, col, satisfied);
  }

  private drawRowHint(nums: number[], row: number, satisfied: boolean): void {
    const ctx = this.ctx;
    const n = nums.length;
    const cy = this.gridY + row * this.cell + this.cell / 2;
    ctx.font = `bold ${Math.max(10, this.cell * 0.4)}px sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    for (let i = 0; i < n; i++) {
      const cx = this.hintW - (n - i) * (this.hintW / (n + 0.5)) + this.hintW * 0.08;
      ctx.fillStyle = satisfied ? "#4caf50" : "#ffffff";
      ctx.fillText(String(nums[i]), cx, cy);
    }
  }

  private drawColHint(nums: number[], col: number, satisfied: boolean): void {
    const ctx = this.ctx;
    const n = nums.length;
    const cx = this.gridX + col * this.cell + this.cell / 2;
    ctx.font = `bold ${Math.max(10, this.cell * 0.4)}px sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    for (let i = 0; i < n; i++) {
      const cy = this.hintH - (n - i) * (this.hintH / (n + 0.5)) + this.hintH * 0.08;
      ctx.fillStyle = satisfied ? "#4caf50" : "#ffffff";
      ctx.fillText(String(nums[i]), cx, cy);
    }
  }

  private drawCross(px: number, py: number): void {
    const ctx = this.ctx;
    const m = this.cell * 0.25;
    ctx.strokeStyle = "#d23b3b";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(px + m, py + m);
    ctx.lineTo(px + this.cell - m, py + this.cell - m);
    ctx.moveTo(px + this.cell - m, py + m);
    ctx.lineTo(px + m, py + this.cell - m);
    ctx.stroke();
  }

  private drawLabels(state: GameState): void {
    const ctx = this.ctx;
    ctx.font = "12px sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText(
      `${state.puzzle.name || "Puzzle"}  ${state.elapsedSec}s  ✕${state.mistakes}/${state.maxMistakes}`,
      this.canvas.width / 2,
      14
    );
    // 进度条
    const pct = state.totalFilled > 0 ? state.filledCount / state.totalFilled : 0;
    const bw = this.canvas.width * 0.5;
    ctx.fillStyle = "#33334d";
    ctx.fillRect(this.canvas.width / 2 - bw / 2, 22, bw, 6);
    ctx.fillStyle = state.solved ? "#4caf50" : "#3b6fd4";
    ctx.fillRect(this.canvas.width / 2 - bw / 2, 22, bw * pct, 6);
  }

  /** 触摸坐标 → 网格单元 */
  hitTest(x: number, y: number, state: GameState): HitResult {
    const { width, height } = state.puzzle;
    if (x < this.gridX || y < this.gridY) return { type: "none", x: -1, y: -1 };
    const cx = Math.floor((x - this.gridX) / this.cell);
    const cy = Math.floor((y - this.gridY) / this.cell);
    if (cx < 0 || cy < 0 || cx >= width || cy >= height) {
      return { type: "none", x: -1, y: -1 };
    }
    return { type: "cell", x: cx, y: cy };
  }
}
