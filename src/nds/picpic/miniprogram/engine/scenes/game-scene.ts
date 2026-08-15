// 游玩场景 —— STATE 0x13（资源 map/ lap/ fap/）
// 真实流程: gaming → 完成 → 0x0E 完成检查 → 0x14 achieve
// UI 全在 canvas 内自绘：顶栏(谜题名/计时/返回)、调色板，触摸命中检测
import { SceneHandler, GameState, PicPicEngine, PuzzleData } from '../core/engine';
import { ROM_STATE, ROM_SUBSTATE } from '../core/rom-states';
import { canvasSize } from '../core/canvas-util';
import { drawText, hitTest, Rect } from '../core/canvas-ui';

export class GameScene implements SceneHandler {
  private puzzle: PuzzleData;
  private cellSize = 16;
  private offsetX = 20;
  private offsetY = 60;
  private isPainting = false;
  private currentColor = 1;
  private paintX = 0;
  private paintY = 0;
  private lastPaintX = -1;
  private lastPaintY = -1;
  private completeShown = false;
  // Canvas UI 命中区
  private backRect: Rect = { x: 0, y: 0, w: 0, h: 0 };
  private paletteRects: Rect[] = [];

  // enter: 装配谜题数据（对应 0x2055BC8 GAME SETUP）
  onEnter(_state: GameState, engine: PicPicEngine): void {
    const state = engine.state;
    this.completeShown = false;
    // 若玩家网格为空则重建（首次加载/再次恢复，对应 gbl+4 标记）
    const g = state.playerGrid;
    if (!g) {
      const cells = new Uint8Array(this.puzzle.w * this.puzzle.h);
      state.playerGrid = { w: this.puzzle.w, h: this.puzzle.h, cells };
    }
  }

  constructor(puzzle: PuzzleData) {
    this.puzzle = puzzle;
  }

  update(dt: number, state: GameState, engine: PicPicEngine): void {
    if (!state.completed) {
      state.timeElapsed += dt;
    }
    // 完成 → 0x0E 完成检查（result==2 → 0x14）
    if (state.completed && !this.completeShown) {
      this.completeShown = true;
      engine.setSubState(ROM_SUBSTATE.SUB_MAIN);
      engine.setState(ROM_STATE.ST_RESULT_CHECK);
    }
  }

  render(ctx: CanvasRenderingContext2D, state: GameState): void {
    const g = state.playerGrid;
    if (!g) return;
    const W = this.canvasW(ctx);
    const H = this.canvasH(ctx);

    // 背景统一（上下屏同色，视觉上不暴露双屏边界）
    ctx.fillStyle = '#1d1236';
    ctx.fillRect(0, 0, W, H);

    // ===== 顶栏：返回按钮 + 谜题名/尺寸 + 计时 =====
    ctx.fillStyle = '#1f3d56';
    ctx.fillRect(0, 0, W, 42);
    this.backRect = this.drawBackBtn(ctx, W, 42);
    const m = Math.floor(state.timeElapsed / 60);
    const s = Math.floor(state.timeElapsed % 60);
    drawText(ctx, `${this.puzzle.name} (${this.puzzle.w}x${this.puzzle.h})`, W / 2, 18, {
      align: 'center',
      color: '#fff',
      font: 'bold 13px sans-serif',
    });
    drawText(ctx, `${m}:${s.toString().padStart(2, '0')}`, W / 2, 36, {
      align: 'center',
      color: '#ffd23f',
      font: '11px sans-serif',
    });

    // ===== 调色板（底部）：15 个色块 =====
    this.paletteRects = this.drawPalette(ctx, state, W, H);

    // 计算网格尺寸和偏移（居中，避开顶部顶栏与底部调色板）
    const maxGridW = W - 40;
    const maxGridH = H - 42 - 56; // 顶部顶栏 42 / 底部调色板 56
    this.cellSize = Math.min(Math.floor(maxGridW / g.w), Math.floor(maxGridH / g.h), 24);
    this.offsetX = (W - g.w * this.cellSize) / 2;
    this.offsetY = 40 + (maxGridH - g.h * this.cellSize) / 2;

    // 网格背景
    ctx.fillStyle = '#333';
    ctx.fillRect(this.offsetX - 2, this.offsetY - 2, g.w * this.cellSize + 4, g.h * this.cellSize + 4);

    // 绘制每个格子
    for (let y = 0; y < g.h; y++) {
      for (let x = 0; x < g.w; x++) {
        const idx = y * g.w + x;
        const colorIdx = g.cells[idx];
        const cx = this.offsetX + x * this.cellSize;
        const cy = this.offsetY + y * this.cellSize;
        const c = state.palette[colorIdx] ?? 0;
        const r = (c >> 16) & 0xFF;
        const gVal = (c >> 8) & 0xFF;
        const b = c & 0xFF;
        ctx.fillStyle = colorIdx === 0 ? '#222' : `rgb(${r},${gVal},${b})`;
        ctx.fillRect(cx + 1, cy + 1, this.cellSize - 2, this.cellSize - 2);
        ctx.strokeStyle = '#555';
        ctx.lineWidth = 0.5;
        ctx.strokeRect(cx, cy, this.cellSize, this.cellSize);
      }
    }
  }

  // 返回按钮（顶栏左）
  private drawBackBtn(ctx: CanvasRenderingContext2D, W: number, barH: number): Rect {
    const bw = 66;
    const bh = 30;
    const x = 8;
    const y = (barH - bh) / 2;
    ctx.fillStyle = '#8e2a2a';
    ctx.strokeStyle = '#e57373';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.rect(x, y, bw, bh);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('◀ 戻る', x + bw / 2, y + bh / 2 + 1);
    return { x, y, w: bw, h: bh };
  }

  // 底部调色板：1..15 色块（当前色高亮边框）
  private drawPalette(ctx: CanvasRenderingContext2D, state: GameState, W: number, H: number): Rect[] {
    const rects: Rect[] = [];
    const n = 15;
    const margin = 8;
    const cellW = Math.floor((W - margin * 2) / n);
    const cellH = 34;
    const y = H - cellH - 8;
    for (let i = 1; i <= n; i++) {
      const c = state.palette[i] ?? 0;
      const r = (c >> 16) & 0xFF;
      const g = (c >> 8) & 0xFF;
      const b = c & 0xFF;
      const x = margin + (i - 1) * cellW;
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.fillRect(x + 1, y + 1, cellW - 2, cellH - 2);
      ctx.strokeStyle = i === this.currentColor ? '#ffd23f' : '#555';
      ctx.lineWidth = i === this.currentColor ? 2 : 1;
      ctx.strokeRect(x, y, cellW, cellH);
      rects.push({ x, y, w: cellW, h: cellH });
    }
    return rects;
  }

  // NDS 上屏：显示目标图案（玩家要照此图涂色）
  renderTop(ctx: CanvasRenderingContext2D, state: GameState, engine: PicPicEngine): void {
    const W = canvasSize(ctx).w;
    const H = canvasSize(ctx).h;
    // 引擎已 translate(0, inset)：内容从状态栏下方开始
    const inset = engine.topInset;
    const contentH = H - inset;

    // 背景统一（上下屏同色，视觉上不暴露双屏边界）
    ctx.fillStyle = '#1d1236';
    ctx.fillRect(0, -inset, W, H + inset);

    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffd23f';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText('目標', W / 2, 24);

    const pw = this.puzzle.w;
    const ph = this.puzzle.h;
    const scale = Math.min((W - 16) / pw, (contentH - 40) / ph);
    const ox = (W - pw * scale) / 2;
    const oy = 32 + (contentH - 40 - ph * scale) / 2;

    const palette = state.palette;
    for (let y = 0; y < ph; y++) {
      for (let x = 0; x < pw; x++) {
        const colorIdx = this.puzzle.grid[y * pw + x];
        const c = palette[colorIdx] ?? 0;
        const r = (c >> 16) & 0xFF;
        const g = (c >> 8) & 0xFF;
        const b = c & 0xFF;
        ctx.fillStyle = colorIdx === 0 ? '#221844' : `rgb(${r},${g},${b})`;
        ctx.fillRect(ox + x * scale, oy + y * scale, Math.ceil(scale), Math.ceil(scale));
      }
    }
  }

  // ===== HUD 公开接口 =====
  getPuzzle(): PuzzleData {
    return this.puzzle;
  }

  getHudInfo(state: GameState): { name: string; w: number; h: number; time: string } {
    const m = Math.floor(state.timeElapsed / 60);
    const s = Math.floor(state.timeElapsed % 60);
    return {
      name: this.puzzle.name,
      w: this.puzzle.w,
      h: this.puzzle.h,
      time: `${m}:${s.toString().padStart(2, '0')}`,
    };
  }

  getPalette(state: GameState): string[] {
    // 返回 15 个可涂色块（1..15），css 颜色
    const out: string[] = [];
    for (let i = 1; i < 16; i++) {
      const c = state.palette[i] ?? 0;
      out.push(`rgb(${(c >> 16) & 0xFF},${(c >> 8) & 0xFF},${c & 0xFF})`);
    }
    return out;
  }

  getCurrentColor(): number {
    return this.currentColor;
  }

  isCompleted(): boolean {
    return this.completeShown;
  }

  onBackTap(engine: PicPicEngine): void {
    engine.setSubState(ROM_SUBSTATE.SUB_MAIN);
    engine.setState(ROM_STATE.ST_STATE_SELECT);
  }

  onPaletteTap(i: number): void {
    this.currentColor = i;
  }

  onTouch(x: number, y: number, state: GameState, engine: PicPicEngine): void {
    const g = state.playerGrid;
    if (!g || state.completed) return;
    // 返回按钮
    if (hitTest(x, y, this.backRect)) {
      this.onBackTap(engine);
      return;
    }
    // 调色板
    for (let i = 0; i < this.paletteRects.length; i++) {
      if (hitTest(x, y, this.paletteRects[i])) {
        this.currentColor = i + 1;
        return;
      }
    }
    // 检查网格点击
    if (x >= this.offsetX && x < this.offsetX + g.w * this.cellSize &&
        y >= this.offsetY && y < this.offsetY + g.h * this.cellSize) {
      this.paintX = Math.floor((x - this.offsetX) / this.cellSize);
      this.paintY = Math.floor((y - this.offsetY) / this.cellSize);
      this.isPainting = true;
      this.lastPaintX = -1;
      this.lastPaintY = -1;
    }
  }

  onTouchMove(x: number, y: number, state: GameState): void {
    if (!this.isPainting) return;
    const g = state.playerGrid;
    if (!g) return;
    if (x >= this.offsetX && x < this.offsetX + g.w * this.cellSize &&
        y >= this.offsetY && y < this.offsetY + g.h * this.cellSize) {
      this.paintX = Math.floor((x - this.offsetX) / this.cellSize);
      this.paintY = Math.floor((y - this.offsetY) / this.cellSize);
    }
  }

  onTouchEnd(_state: GameState, _engine: PicPicEngine): void {
    this.isPainting = false;
    this.lastPaintX = -1;
    this.lastPaintY = -1;
  }

  getPaintTarget(): { x: number; y: number; color: number } | null {
    if (!this.isPainting) return null;
    const x = this.paintX;
    const y = this.paintY;
    if (x === this.lastPaintX && y === this.lastPaintY) return null;
    this.lastPaintX = x;
    this.lastPaintY = y;
    return { x, y, color: this.currentColor };
  }

  private canvasW(ctx: CanvasRenderingContext2D): number {
    return canvasSize(ctx).w;
  }
  private canvasH(ctx: CanvasRenderingContext2D): number {
    return canvasSize(ctx).h;
  }
}
