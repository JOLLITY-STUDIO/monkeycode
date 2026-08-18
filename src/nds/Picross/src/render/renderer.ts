/**
 * Picross 渲染器 —— 纯 Canvas 2D，兼容微信小程序与 HTML5
 * 布局: 顶部=列提示区, 左侧=行提示区, 中间=网格
 * 风格: 还原 NDS 原版 Picross DS —— 白底、黑填充块、红叉、
 *       黄色顶部标签条、5 格一组粗分隔线、黑色提示数字（满足变红）
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
  /** 是否在画布顶部绘制状态条（默认 false，由 WXML/HTML 外部 UI 负责） */
  showLabels?: boolean;
  /** 单元格最大像素（默认无限制，让网格填满画布） */
  maxCell?: number;
}

/** 原版 Picross DS 主题色 */
export const NDS_THEME = {
  bg: "#ffffff",          // 网格白底
  hintBg: "#fff6c8",      // 提示区浅黄底色
  hintBgDark: "#ffee90",  // 提示区渐变深色（5 格一组）
  grid: "#c8c8c8",        // 细网格线
  gridStrong: "#333333",  // 5 格粗线
  fill: "#111111",        // 填充黑块
  cross: "#e60000",       // 叉红色
  hint: "#111111",        // 提示数字黑
  hintDone: "#e60000",    // 满足变红
  hintFade: "#b0b0b0",    // 满足后变淡灰（原版数字会变淡）
  label: "#ffd800",       // 顶部标签条黄
  labelText: "#111111",   // 标签条黑字
} as const;

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
      fillColor: NDS_THEME.fill,
      bgColor: NDS_THEME.bg,
      hintColor: NDS_THEME.hint,
      showLabels: false,
      maxCell: Infinity,
      ...opts,
    };
  }

  /** 根据拼图尺寸与提示数量重新计算布局，提示数字与网格严格一格一格格对齐 */
  private layout(state: GameState): void {
    const { width, height } = state.puzzle;
    const cw = this.canvas.width;
    const ch = this.canvas.height;
    const maxRow = Math.max(1, ...state.rowHints.map((h) => h.nums.length));
    const maxCol = Math.max(1, ...state.colHints.map((h) => h.nums.length));

    // cell 占满整个画布：网格 + 提示区刚好填满，无额外居中留白
    const cell = Math.min(
      cw / (width + maxRow),
      ch / (height + maxCol),
      this.opts.maxCell
    );
    this.cell = Math.max(4, Math.floor(cell));
    this.hintW = maxRow * this.cell;
    this.hintH = maxCol * this.cell;
    this.gridX = this.hintW;
    this.gridY = this.hintH;
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
      this.layout(state);
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

    // 顶部标签/进度条（仅在独立画布模式下绘制）
    if (this.opts.showLabels) this.drawLabels(state);
  }

  /** 全量重绘（布局变化/首帧） */
  private drawFull(state: GameState): void {
    const { width, height } = state.puzzle;
    const ctx = this.ctx;

    // 1) 背景
    ctx.fillStyle = NDS_THEME.bg;
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // 2) 提示区背景（渐变条 + 每个数字一个 cell）
    this.drawHintBackground(state);

    // 3) 网格
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        this.drawCell(x, y, state.marks[y * width + x]);
      }
    }

    // 4) 网格线：5 格一组粗线，其余细线（原版分组）
    for (let x = 0; x <= width; x++) {
      const strong = x % 5 === 0;
      ctx.strokeStyle = strong ? NDS_THEME.gridStrong : NDS_THEME.grid;
      ctx.lineWidth = strong ? 2 : 1;
      const px = this.gridX + x * this.cell;
      ctx.beginPath();
      ctx.moveTo(px, this.gridY);
      ctx.lineTo(px, this.gridY + height * this.cell);
      ctx.stroke();
    }
    for (let y = 0; y <= height; y++) {
      const strong = y % 5 === 0;
      ctx.strokeStyle = strong ? NDS_THEME.gridStrong : NDS_THEME.grid;
      ctx.lineWidth = strong ? 2 : 1;
      const py = this.gridY + y * this.cell;
      ctx.beginPath();
      ctx.moveTo(this.gridX, py);
      ctx.lineTo(this.gridX + width * this.cell, py);
      ctx.stroke();
    }

    // 5) 行列提示数字
    for (let y = 0; y < height; y++) {
      const hint = state.rowHints[y];
      this.drawRowHint(hint.nums, y, hint.satisfied);
    }
    for (let x = 0; x < width; x++) {
      const hint = state.colHints[x];
      this.drawColHint(hint.nums, x, hint.satisfied);
    }

    // 6) 顶部/左侧标签（独立画布模式）
    if (this.opts.showLabels) this.drawLabels(state);
  }

  /** 绘制提示区背景：渐变条 + 每个数字所在 cell 的细边框 */
  private drawHintBackground(state: GameState): void {
    const ctx = this.ctx;
    const { width, height } = state.puzzle;
    const maxRow = this.hintW / this.cell;
    const maxCol = this.hintH / this.cell;

    // 列提示区（顶部）：每列一个竖向渐变条
    for (let x = 0; x < width; x++) {
      const gx = this.gridX + x * this.cell;
      const strong = x % 5 === 0;
      const grad = ctx.createLinearGradient(gx, 0, gx + this.cell, 0);
      grad.addColorStop(0, strong ? NDS_THEME.hintBgDark : NDS_THEME.hintBg);
      grad.addColorStop(1, NDS_THEME.bg);
      ctx.fillStyle = grad;
      ctx.fillRect(gx, 0, this.cell, this.hintH);
    }

    // 行提示区（左侧）：每行一个横向渐变条
    for (let y = 0; y < height; y++) {
      const gy = this.gridY + y * this.cell;
      const strong = y % 5 === 0;
      const grad = ctx.createLinearGradient(0, gy, 0, gy + this.cell);
      grad.addColorStop(0, strong ? NDS_THEME.hintBgDark : NDS_THEME.hintBg);
      grad.addColorStop(1, NDS_THEME.bg);
      ctx.fillStyle = grad;
      ctx.fillRect(0, gy, this.hintW, this.cell);
    }

    // 提示区每个数字 cell 的细边框（让"一格一格"感更明显）
    ctx.strokeStyle = NDS_THEME.grid;
    ctx.lineWidth = 1;
    // 列提示区横线
    for (let i = 0; i <= maxCol; i++) {
      const py = i * this.cell;
      ctx.beginPath();
      ctx.moveTo(this.gridX, py);
      ctx.lineTo(this.gridX + width * this.cell, py);
      ctx.stroke();
    }
    // 行提示区竖线
    for (let i = 0; i <= maxRow; i++) {
      const px = i * this.cell;
      ctx.beginPath();
      ctx.moveTo(px, this.gridY);
      ctx.lineTo(px, this.gridY + height * this.cell);
      ctx.stroke();
    }
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

  /** 重绘行提示（先重绘该行背景条 + 格子线） */
  private redrawRowHint(nums: number[], row: number, satisfied: boolean): void {
    const ctx = this.ctx;
    const gy = this.gridY + row * this.cell;
    const strong = row % 5 === 0;
    const grad = ctx.createLinearGradient(0, gy, 0, gy + this.cell);
    grad.addColorStop(0, strong ? NDS_THEME.hintBgDark : NDS_THEME.hintBg);
    grad.addColorStop(1, NDS_THEME.bg);
    ctx.fillStyle = grad;
    ctx.fillRect(0, gy, this.hintW, this.cell);
    ctx.strokeStyle = NDS_THEME.grid;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, gy);
    ctx.lineTo(this.hintW, gy);
    ctx.moveTo(0, gy + this.cell);
    ctx.lineTo(this.hintW, gy + this.cell);
    ctx.stroke();
    this.drawRowHint(nums, row, satisfied);
  }

  /** 重绘列提示（先重绘该列背景条 + 格子线） */
  private redrawColHint(nums: number[], col: number, satisfied: boolean): void {
    const ctx = this.ctx;
    const gx = this.gridX + col * this.cell;
    const strong = col % 5 === 0;
    const grad = ctx.createLinearGradient(gx, 0, gx + this.cell, 0);
    grad.addColorStop(0, strong ? NDS_THEME.hintBgDark : NDS_THEME.hintBg);
    grad.addColorStop(1, NDS_THEME.bg);
    ctx.fillStyle = grad;
    ctx.fillRect(gx, 0, this.cell, this.hintH);
    ctx.strokeStyle = NDS_THEME.grid;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(gx, 0);
    ctx.lineTo(gx, this.hintH);
    ctx.moveTo(gx + this.cell, 0);
    ctx.lineTo(gx + this.cell, this.hintH);
    ctx.stroke();
    this.drawColHint(nums, col, satisfied);
  }

  private drawRowHint(nums: number[], row: number, satisfied: boolean): void {
    const ctx = this.ctx;
    const cy = this.gridY + row * this.cell + this.cell / 2;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    // 数字字体根据位数自适应：一位数尽量大，多位数缩小
    const fontSize = Math.max(8, this.cell * (nums.some((n) => n >= 10) ? 0.5 : 0.68));
    ctx.font = `bold ${fontSize}px sans-serif`;
    ctx.fillStyle = satisfied ? NDS_THEME.hintDone : NDS_THEME.hint;
    // 满足后变淡：在原版中已满足的数字会明显变淡
    if (satisfied) ctx.globalAlpha = 0.35;
    // 从右往左一格一个：nums[0] 在最右侧，靠近网格
    for (let i = 0; i < nums.length; i++) {
      const slot = nums.length - 1 - i;
      const cx = this.hintW - slot * this.cell - this.cell / 2;
      ctx.fillText(String(nums[i]), cx, cy);
    }
    ctx.globalAlpha = 1;
  }

  private drawColHint(nums: number[], col: number, satisfied: boolean): void {
    const ctx = this.ctx;
    const cx = this.gridX + col * this.cell + this.cell / 2;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const fontSize = Math.max(8, this.cell * (nums.some((n) => n >= 10) ? 0.5 : 0.68));
    ctx.font = `bold ${fontSize}px sans-serif`;
    ctx.fillStyle = satisfied ? NDS_THEME.hintDone : NDS_THEME.hint;
    if (satisfied) ctx.globalAlpha = 0.35;
    // 从下往上一格一个：nums[0] 在最下方，靠近网格
    for (let i = 0; i < nums.length; i++) {
      const slot = nums.length - 1 - i;
      const cy = this.hintH - slot * this.cell - this.cell / 2;
      ctx.fillText(String(nums[i]), cx, cy);
    }
    ctx.globalAlpha = 1;
  }

  private drawCross(px: number, py: number): void {
    const ctx = this.ctx;
    const m = this.cell * 0.25;
    ctx.strokeStyle = NDS_THEME.cross;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(px + m, py + m);
    ctx.lineTo(px + this.cell - m, py + this.cell - m);
    ctx.moveTo(px + this.cell - m, py + m);
    ctx.lineTo(px + m, py + this.cell - m);
    ctx.stroke();
  }

  /** 顶部黄色标签条（拼图名/时间/失误）+ 底部进度条，还原原版布局 */
  private drawLabels(state: GameState): void {
    const ctx = this.ctx;
    const cw = this.canvas.width;

    // 黄色标签条
    ctx.fillStyle = NDS_THEME.label;
    ctx.fillRect(0, 0, cw, 26);
    ctx.fillStyle = NDS_THEME.labelText;
    ctx.font = "bold 13px sans-serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(state.puzzle.name || "Puzzle", 8, 13);
    ctx.textAlign = "right";
    ctx.fillText(`${state.elapsedSec}s  ✕${state.mistakes}/${state.maxMistakes}`, cw - 8, 13);

    // 进度条（黑底黄条）
    const pct = state.totalFilled > 0 ? state.filledCount / state.totalFilled : 0;
    const bw = cw * 0.5;
    const bx = cw / 2 - bw / 2;
    const by = 30;
    ctx.fillStyle = "#d0d0d0";
    ctx.fillRect(bx, by, bw, 6);
    ctx.fillStyle = NDS_THEME.label;
    ctx.fillRect(bx, by, bw * pct, 6);
    ctx.strokeStyle = "#999999";
    ctx.lineWidth = 1;
    ctx.strokeRect(bx, by, bw, 6);
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
