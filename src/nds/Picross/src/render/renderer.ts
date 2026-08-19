/**
 * Picross 渲染器 —— 纯 Canvas 2D，兼容微信小程序与 HTML5
 * 目标：还原 NDS 原版 Picross DS 下屏（256x192 逻辑分辨率，等比放大满屏）
 * 布局：顶部列提示区 + 左侧行提示区 + 网格（原版下屏满铺，无工具条）
 * 数据依据：
 *  - 数字字体 = ROM extracted/unnamed/file_94.bin 的 4bpp tile（16x16）→ assets/digits.png
 *  - UI tile / 调色板 = ROM file_94.bin（4bpp 8x8 tile）+ file_97.bin（16 色调色板）
 *    → assets/nds_tiles.png（tools/build_nds_tile_atlas.py）
 *  - DIGIT_FONT 为图片未就绪时的声明式像素数据兜底
 */
import { CellMark, GameState, HitResult } from "../core/types";
import { DIGIT_FONT } from "./digit-font";

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
  /** 原版数字字体图集（从 ROM 提取的 16x16 tile，横向排列 0-9 :） */
  digits?: HTMLImageElement | any;
  /** ROM UI 原始 tile atlas（横向 8x8 tile，索引 0-31，见 assets/nds_tiles.png） */
  tiles?: HTMLImageElement | any;
}

/** 原版 Picross DS 主题色（从 ROM file_94.bin + file_97.bin 调色板解码，见 tools/build_nds_tile_atlas.py）
 *  file_97 16 色调色板关键颜色：
 *    0=透明  1=#a8b8d8  2=#184070  3=#3088e8  4=#70b0f0  5=#e8f0f8
 *    6=#f8a000  7=#f8f8f8  8=#b8c8f8
 */
export const NDS_THEME = {
  bg: "#f8f8f8",          // 网格白底（索引 7）
  bgDark: "#e8f0f8",      // 格子右下角阴影（索引 5）
  hintBg: "#b8c8f8",      // 提示区浅蓝（索引 8）
  hintBgDark: "#f8a000",  // 5 格分组金黄（索引 6）
  hintBgTutorial: "#b8c8f8", // 教程模式列提示区浅蓝（与正式一致）
  grid: "#a8b8d8",        // 细网格线（索引 1）
  gridStrong: "#f8a000",  // 5 格粗线（索引 6）
  fill: "#3088e8",        // 填充主蓝（索引 3）
  fillLight: "#70b0f0",   // 填充高光（索引 4）
  fillDark: "#184070",    // 填充暗部（索引 2）
  fillTutorial: "#3088e8",// 教程模式填充蓝（与正式一致）
  cross: "#e60000",       // 叉红色
  hint: "#184070",        // 提示数字深蓝（索引 2）
  hintDone: "#f8a000",    // 满足提示金黄（索引 6）
  cursor: "rgba(248, 160, 0, 0.28)", // 当前选中行/列金黄高亮
  label: "#ffd800",       // 顶部标签条黄
  labelText: "#111111",   // 标签条黑字
} as const;

/** NDS 下屏逻辑分辨率 */
export const NDS_SCREEN_W = 256;
export const NDS_SCREEN_H = 192;

export class PicrossRenderer {
  private ctx: CanvasRenderingContext2D;
  private canvas: CanvasLike;
  private opts: Required<RendererOptions>;

  // 缩放与偏移：逻辑坐标(256x192) → 画布像素
  private scale = 1;
  private offX = 0;
  private offY = 0;

  // 布局（逻辑像素）
  private hintH = 0;   // 列提示区高度
  private hintW = 0;   // 行提示区宽度
  private cell = 0;    // 单元格逻辑像素
  private gridX = 0;
  private gridY = 0;

  // 光标（当前触摸/选中的单元格）
  private cursorX = -1;
  private cursorY = -1;

  // 原版数字字体图集
  private digits: HTMLImageElement | any = null;
  private readonly digitW = 16;
  private readonly digitH = 16;

  /** ROM UI 原始 tile atlas（file_94.bin + file_97.bin，见 tools/build_nds_tile_atlas.py） */
  private tiles: HTMLImageElement | any = null;
  private readonly tileW = 8;
  private readonly tileH = 8;

  // 脏区缓存
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
      digits: null,
      tiles: null,
      ...opts,
    };
    this.digits = this.opts.digits;
    this.tiles = this.opts.tiles;
  }

  /** 设置当前光标位置（-1,-1 表示无） */
  setCursor(x: number, y: number): void {
    this.cursorX = x;
    this.cursorY = y;
  }

  /** 绘制 ROM tile atlas 中的单个 8x8 tile，等比缩放 */
  private drawTile(idx: number, x: number, y: number, w: number, h: number): void {
    if (!this.tiles) return;
    const ctx = this.ctx;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(
      this.tiles,
      idx * this.tileW,
      0,
      this.tileW,
      this.tileH,
      x,
      y,
      w,
      h
    );
    ctx.imageSmoothingEnabled = true;
  }

  /** 绘制带立体倒角的矩形（NDS 风格：左上亮、右下暗） */
  private drawBeveledRect(
    x: number,
    y: number,
    w: number,
    h: number,
    main: string,
    light: string,
    dark: string,
    bevel: number
  ): void {
    const ctx = this.ctx;
    // 主体
    ctx.fillStyle = main;
    ctx.fillRect(x + bevel, y + bevel, w - bevel * 2, h - bevel * 2);
    // 左上高光
    ctx.fillStyle = light;
    ctx.fillRect(x, y, w - bevel, bevel);
    ctx.fillRect(x, y + bevel, bevel, h - bevel);
    // 右下阴影
    ctx.fillStyle = dark;
    ctx.fillRect(x + bevel, y + h - bevel, w - bevel, bevel);
    ctx.fillRect(x + w - bevel, y + bevel, bevel, h - bevel);
  }

  /** 根据拼图尺寸与提示数量计算布局（NDS 256x192 逻辑坐标系，下屏满铺） */
  private layout(state: GameState): void {
    const { width, height } = state.puzzle;
    const maxRow = Math.max(1, ...state.rowHints.map((h) => h.nums.length));
    const maxCol = Math.max(1, ...state.colHints.map((h) => h.nums.length));

    // cell: 网格填满 (256-maxRow) x (192-maxCol)，提示区宽度/高度跟随格子数
    const cell = Math.floor(
      Math.min(
        (NDS_SCREEN_W - maxRow) / width,
        (NDS_SCREEN_H - maxCol) / height,
        this.opts.maxCell
      )
    );
    this.cell = Math.max(5, cell);
    this.hintW = maxRow * this.cell;
    this.hintH = maxCol * this.cell;
    this.gridX = this.hintW;
    this.gridY = this.hintH;
  }

  /** 逻辑坐标 → 画布像素 */
  private sx(x: number): number {
    return this.offX + x * this.scale;
  }
  private sy(y: number): number {
    return this.offY + y * this.scale;
  }

  draw(state: GameState): void {
    const { width, height } = state.puzzle;
    const cw = this.canvas.width;
    const ch = this.canvas.height;

    if (
      this.lastCW !== cw || this.lastCH !== ch ||
      this.lastW !== width || this.lastH !== height
    ) {
      // 计算整数缩放并居中
      this.scale = Math.max(1, Math.floor(Math.min(cw / NDS_SCREEN_W, ch / NDS_SCREEN_H)));
      this.offX = Math.floor((cw - NDS_SCREEN_W * this.scale) / 2);
      this.offY = Math.floor((ch - NDS_SCREEN_H * this.scale) / 2);
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
        this.drawCell(x, y, state.marks[i], state);
        this.redrawRowHint(state.rowHints[y].nums, y, state.rowHints[y].satisfied, state);
        this.redrawColHint(state.colHints[x].nums, x, state.colHints[x].satisfied, state);
      }
      this.lastMarks = state.marks.slice();
    }

    // 顶部标签/进度条（独立画布模式下）
    if (this.opts.showLabels) this.drawLabels(state);
  }

  /** 全量重绘（布局变化/首帧） */
  private drawFull(state: GameState): void {
    const { width, height } = state.puzzle;
    const ctx = this.ctx;
    const W = NDS_SCREEN_W;
    const H = NDS_SCREEN_H;

    // 清空画布
    ctx.fillStyle = "#e8e8e8";
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // NDS 下屏外框：用 ROM tile 0（黑）铺底
    this.drawTile(0, this.sx(0), this.sy(0), this.sx(W), this.sy(H));

    // 整体浅蓝渐变背景（从 ROM 调色板 #b8c8f8 → #e8f0f8）
    const grad = ctx.createLinearGradient(this.sx(0), this.sy(0), this.sx(W), this.sy(H));
    grad.addColorStop(0, NDS_THEME.hintBg);
    grad.addColorStop(1, NDS_THEME.bgDark);
    ctx.fillStyle = grad;
    ctx.fillRect(this.sx(1), this.sy(1), this.sx(W - 2), this.sy(H - 2));

    // 提示区背景
    this.drawHintBackground(state);

    // 网格
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        this.drawCell(x, y, state.marks[y * width + x], state);
      }
    }

    // 网格线：5 格一组粗线，其余细线（原版分组）
    this.drawGridLines(state);

    // 当前选中行/列高亮
    this.drawCursorHighlight(state);

    // 行列提示数字
    for (let y = 0; y < height; y++) {
      const hint = state.rowHints[y];
      this.drawRowHint(hint.nums, y, hint.satisfied);
    }
    for (let x = 0; x < width; x++) {
      const hint = state.colHints[x];
      this.drawColHint(hint.nums, x, hint.satisfied);
    }

    if (this.opts.showLabels) this.drawLabels(state);
  }

  private drawGridLines(state: GameState): void {
    const ctx = this.ctx;
    const { width, height } = state.puzzle;
    for (let x = 0; x <= width; x++) {
      const strong = x % 5 === 0;
      ctx.strokeStyle = strong ? NDS_THEME.gridStrong : NDS_THEME.grid;
      ctx.lineWidth = strong ? Math.max(2, this.scale) : Math.max(1, this.scale * 0.6);
      const px = this.sx(this.gridX + x * this.cell);
      ctx.beginPath();
      ctx.moveTo(px, this.sy(this.gridY));
      ctx.lineTo(px, this.sy(this.gridY + height * this.cell));
      ctx.stroke();
    }
    for (let y = 0; y <= height; y++) {
      const strong = y % 5 === 0;
      ctx.strokeStyle = strong ? NDS_THEME.gridStrong : NDS_THEME.grid;
      ctx.lineWidth = strong ? Math.max(2, this.scale) : Math.max(1, this.scale * 0.6);
      const py = this.sy(this.gridY + y * this.cell);
      ctx.beginPath();
      ctx.moveTo(this.sx(this.gridX), py);
      ctx.lineTo(this.sx(this.gridX + width * this.cell), py);
      ctx.stroke();
    }
  }

  private drawCursorHighlight(state: GameState): void {
    const ctx = this.ctx;
    const { width, height } = state.puzzle;
    const isTutorial = state.puzzle.difficulty === 0;
    ctx.fillStyle = isTutorial ? "rgba(92, 157, 255, 0.35)" : NDS_THEME.cursor;

    if (this.cursorX >= 0 && this.cursorX < width) {
      const gx = this.sx(this.gridX + this.cursorX * this.cell);
      const gw = this.cell * this.scale;
      ctx.fillRect(gx, this.sy(this.gridY), gw, height * this.cell * this.scale);
    }
    if (this.cursorY >= 0 && this.cursorY < height) {
      const gy = this.sy(this.gridY + this.cursorY * this.cell);
      const gh = this.cell * this.scale;
      ctx.fillRect(this.sx(this.gridX), gy, width * this.cell * this.scale, gh);
    }
  }

  private drawHintBackground(state: GameState): void {
    const ctx = this.ctx;
    const { width, height } = state.puzzle;
    const bg = NDS_THEME.hintBg;
    const dark = NDS_THEME.hintBgDark;

    // 列提示区：逐格绘制 ROM tile 2（浅蓝），5 的倍数用 tile 5（金黄）
    for (let x = 0; x < width; x++) {
      const isFive = x % 5 === 0;
      const tile = isFive ? 5 : 2;
      const px = this.sx(this.gridX + x * this.cell);
      const py = this.sy(0);
      const pw = this.cell * this.scale;
      const ph = this.hintH * this.scale;
      this.drawTile(tile, px, py, pw, ph);
      // 再叠加轻微渐变，避免扁平
      const grad = ctx.createLinearGradient(px, py, px + pw, py + ph);
      grad.addColorStop(0, isFive ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.2)");
      grad.addColorStop(1, "rgba(0,0,0,0.05)");
      ctx.fillStyle = grad;
      ctx.fillRect(px, py, pw, ph);
    }

    // 行提示区
    for (let y = 0; y < height; y++) {
      const isFive = y % 5 === 0;
      const tile = isFive ? 5 : 2;
      const px = this.sx(0);
      const py = this.sy(this.gridY + y * this.cell);
      const pw = this.hintW * this.scale;
      const ph = this.cell * this.scale;
      this.drawTile(tile, px, py, pw, ph);
      const grad = ctx.createLinearGradient(px, py, px + pw, py + ph);
      grad.addColorStop(0, isFive ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.2)");
      grad.addColorStop(1, "rgba(0,0,0,0.05)");
      ctx.fillStyle = grad;
      ctx.fillRect(px, py, pw, ph);
    }

    // 提示区格子细线
    ctx.strokeStyle = NDS_THEME.grid;
    ctx.lineWidth = 1;
    const maxCol = Math.max(1, this.hintH / this.cell);
    const maxRow = Math.max(1, this.hintW / this.cell);
    for (let i = 0; i <= maxCol; i++) {
      const py = this.sy(i * this.cell);
      ctx.beginPath();
      ctx.moveTo(this.sx(this.gridX), py);
      ctx.lineTo(this.sx(this.gridX + width * this.cell), py);
      ctx.stroke();
    }
    for (let i = 0; i <= maxRow; i++) {
      const px = this.sx(i * this.cell);
      ctx.beginPath();
      ctx.moveTo(px, this.sy(this.gridY));
      ctx.lineTo(px, this.sy(this.gridY + height * this.cell));
      ctx.stroke();
    }
  }

  private drawCell(x: number, y: number, mark: CellMark, state: GameState): void {
    const px = this.sx(this.gridX + x * this.cell);
    const py = this.sy(this.gridY + y * this.cell);
    const cs = this.cell * this.scale;
    const bevel = Math.max(1, Math.floor(cs * 0.08));

    if (mark === "filled") {
      // 填充格：ROM tile 4 底色 + 立体渐变（左上高光 #70b0f0，右下暗部 #184070）
      this.drawTile(4, px, py, cs, cs);
      this.drawBeveledRect(px, py, cs, cs, NDS_THEME.fill, NDS_THEME.fillLight, NDS_THEME.fillDark, bevel);
    } else {
      // 空格：ROM tile 3 白色 + 轻微立体
      this.drawTile(3, px, py, cs, cs);
      this.drawBeveledRect(px, py, cs, cs, NDS_THEME.bg, "#ffffff", NDS_THEME.bgDark, bevel);
    }
    if (mark === "crossed") this.drawCross(px, py, cs);
  }

  private redrawRowHint(nums: number[], row: number, satisfied: boolean, state: GameState): void {
    const ctx = this.ctx;
    const gy = this.sy(this.gridY + row * this.cell);
    const isFive = row % 5 === 0;
    const tile = isFive ? 5 : 2;
    const px = this.sx(0);
    const pw = this.hintW * this.scale;
    const ph = this.cell * this.scale;
    this.drawTile(tile, px, gy, pw, ph);
    const grad = ctx.createLinearGradient(px, gy, px + pw, gy + ph);
    grad.addColorStop(0, isFive ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.2)");
    grad.addColorStop(1, "rgba(0,0,0,0.05)");
    ctx.fillStyle = grad;
    ctx.fillRect(px, gy, pw, ph);
    this.drawRowHint(nums, row, satisfied);
  }

  private redrawColHint(nums: number[], col: number, satisfied: boolean, state: GameState): void {
    const ctx = this.ctx;
    const gx = this.sx(this.gridX + col * this.cell);
    const isFive = col % 5 === 0;
    const tile = isFive ? 5 : 2;
    const py = this.sy(0);
    const pw = this.cell * this.scale;
    const ph = this.hintH * this.scale;
    this.drawTile(tile, gx, py, pw, ph);
    const grad = ctx.createLinearGradient(gx, py, gx + pw, py + ph);
    grad.addColorStop(0, isFive ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.2)");
    grad.addColorStop(1, "rgba(0,0,0,0.05)");
    ctx.fillStyle = grad;
    ctx.fillRect(gx, py, pw, ph);
    this.drawColHint(nums, col, satisfied);
  }

  private splitDigits(nums: number[]): number[] {
    const out: number[] = [];
    for (const n of nums) {
      if (n >= 10) {
        out.push(Math.floor(n / 10), n % 10);
      } else {
        out.push(n);
      }
    }
    return out;
  }

  private drawRowHint(nums: number[], row: number, satisfied: boolean): void {
    const ctx = this.ctx;
    const cy = this.sy(this.gridY + row * this.cell + this.cell / 2);
    const digits = this.splitDigits(nums);
    for (let i = 0; i < digits.length; i++) {
      const slot = digits.length - 1 - i;
      const cx = this.sx(this.hintW - slot * this.cell - this.cell / 2);
      this.drawDigit(digits[i], cx, cy, satisfied);
    }
  }

  private drawColHint(nums: number[], col: number, satisfied: boolean): void {
    const ctx = this.ctx;
    const cx = this.sx(this.gridX + col * this.cell + this.cell / 2);
    const digits = this.splitDigits(nums);
    for (let i = 0; i < digits.length; i++) {
      const slot = digits.length - 1 - i;
      const cy = this.sy(this.hintH - slot * this.cell - this.cell / 2);
      this.drawDigit(digits[i], cx, cy, satisfied);
    }
  }

  private drawDigit(d: number, cx: number, cy: number, satisfied: boolean): void {
    const ctx = this.ctx;
    const size = Math.max(8, this.cell * 0.8) * this.scale;
    const dx = cx - size / 2;
    const dy = cy - size / 2;

    // 优先用 ROM 提取的 16x16 字体图（assets/digits.png）
    if (this.digits) {
      try {
        ctx.drawImage(this.digits, d * this.digitW, 0, this.digitW, this.digitH, dx, dy, size, size);
        // 满足时叠加 ROM 调色板金黄色 #f8a000
        if (satisfied) {
          ctx.globalCompositeOperation = "source-atop";
          ctx.fillStyle = NDS_THEME.hintDone;
          ctx.fillRect(dx, dy, size, size);
          ctx.globalCompositeOperation = "source-over";
        }
        return;
      } catch (e) {
        // 图片未就绪，回落内嵌像素字体
      }
    }

    // 图片不可用：用 DIGIT_FONT 声明式像素字体兜底
    const bits = DIGIT_FONT[d] || DIGIT_FONT[0];
    const s = size / 16;
    ctx.fillStyle = satisfied ? NDS_THEME.hintDone : NDS_THEME.hint;
    for (let fy = 0; fy < 16; fy++) {
      const row = bits[fy];
      if (!row) continue;
      for (let fx = 0; fx < 16; fx++) {
        if (row & (0x8000 >> fx)) {
          ctx.fillRect(dx + fx * s, dy + fy * s, s, s);
        }
      }
    }
  }

  private drawCross(px: number, py: number, cs: number): void {
    const ctx = this.ctx;
    const m = cs * 0.12;
    ctx.strokeStyle = NDS_THEME.cross;
    ctx.lineWidth = Math.max(2, cs * 0.12);
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(px + m, py + m);
    ctx.lineTo(px + cs - m, py + cs - m);
    ctx.moveTo(px + cs - m, py + m);
    ctx.lineTo(px + m, py + cs - m);
    ctx.stroke();
    ctx.lineCap = "butt";
  }

  private drawLabels(state: GameState): void {
    const ctx = this.ctx;
    const cw = this.canvas.width;

    ctx.fillStyle = NDS_THEME.label;
    ctx.fillRect(0, 0, cw, 26 * this.scale);
    ctx.fillStyle = NDS_THEME.labelText;
    ctx.font = `bold ${13 * this.scale}px sans-serif`;
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(state.puzzle.name || "Puzzle", 8 * this.scale, 13 * this.scale);
    ctx.textAlign = "right";
    ctx.fillText(`${state.elapsedSec}s  ✕${state.mistakes}/${state.maxMistakes}`, cw - 8 * this.scale, 13 * this.scale);

    const pct = state.totalFilled > 0 ? state.filledCount / state.totalFilled : 0;
    const bw = cw * 0.5;
    const bx = cw / 2 - bw / 2;
    const by = 30 * this.scale;
    ctx.fillStyle = "#d0d0d0";
    ctx.fillRect(bx, by, bw, 6 * this.scale);
    ctx.fillStyle = NDS_THEME.label;
    ctx.fillRect(bx, by, bw * pct, 6 * this.scale);
    ctx.strokeStyle = "#999999";
    ctx.lineWidth = 1;
    ctx.strokeRect(bx, by, bw, 6 * this.scale);
  }

  /** 画布像素坐标 → 逻辑坐标 */
  private toLogic(px: number, py: number): { x: number; y: number } {
    return {
      x: (px - this.offX) / this.scale,
      y: (py - this.offY) / this.scale,
    };
  }

  hitTest(px: number, py: number, state: GameState): HitResult {
    const { width, height } = state.puzzle;
    const p = this.toLogic(px, py);
    if (p.x < this.gridX || p.y < this.gridY) return { type: "none", x: -1, y: -1 };
    const cx = Math.floor((p.x - this.gridX) / this.cell);
    const cy = Math.floor((p.y - this.gridY) / this.cell);
    if (cx < 0 || cy < 0 || cx >= width || cy >= height) {
      return { type: "none", x: -1, y: -1 };
    }
    return { type: "cell", x: cx, y: cy };
  }
}
