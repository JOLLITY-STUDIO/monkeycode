// 游玩场景 —— STATE 0x13（资源 map/ lap/ fap/）
// 真实流程: gaming → 完成 → 0x0E 完成检查 → 0x14 achieve
import { SceneHandler, GameState, PicPicEngine, PuzzleData } from '../core/engine';
import { ROM_STATE, ROM_SUBSTATE } from '../core/rom-states';
import { canvasSize } from '../core/canvas-util';

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
  private palY = 0;
  private palSize = 28;
  private palStartX = 0;
  private backBtn = { x: 0, y: 0, w: 60, h: 36 };
  private completeShown = false;

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

    // 背景
    ctx.fillStyle = '#222';
    ctx.fillRect(0, 0, W, H);

    // 标题栏
    ctx.fillStyle = '#444';
    ctx.fillRect(0, 0, W, 40);
    ctx.fillStyle = '#fff';
    ctx.font = '13px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${this.puzzle.name} (${this.puzzle.w}x${this.puzzle.h})`, W / 2, 25);

    // 返回按钮
    ctx.fillStyle = '#666';
    ctx.fillRect(this.backBtn.x, 4, this.backBtn.w, this.backBtn.h);
    ctx.strokeStyle = '#999';
    ctx.strokeRect(this.backBtn.x, 4, this.backBtn.w, this.backBtn.h);
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.font = '13px sans-serif';
    ctx.fillText('◀ 戻る', this.backBtn.x + this.backBtn.w / 2, 28);

    // 计时
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'right';
    const m = Math.floor(state.timeElapsed / 60);
    const s = Math.floor(state.timeElapsed % 60);
    ctx.fillText(`${m}:${s.toString().padStart(2, '0')}`, W - 10, 25);

    // 计算网格尺寸和偏移（居中）
    const maxGridW = W - 40;
    const maxGridH = H - 40 - 80; // 留底部调色板空间
    this.cellSize = Math.min(Math.floor(maxGridW / g.w), Math.floor(maxGridH / g.h), 24);
    this.offsetX = (W - g.w * this.cellSize) / 2;
    this.offsetY = 50 + (maxGridH - g.h * this.cellSize) / 2;

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

    // 调色板
    this.palY = H - 60;
    this.palSize = Math.min(28, (W - 40) / 15 - 4);
    this.palStartX = (W - 15 * (this.palSize + 4)) / 2;
    for (let i = 1; i < 16; i++) {
      const px = this.palStartX + (i - 1) * (this.palSize + 4);
      const c = state.palette[i] ?? 0;
      const r = (c >> 16) & 0xFF;
      const gVal = (c >> 8) & 0xFF;
      const b = c & 0xFF;
      ctx.fillStyle = `rgb(${r},${gVal},${b})`;
      ctx.fillRect(px, this.palY, this.palSize, this.palSize);
      if (i === this.currentColor) {
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.strokeRect(px - 2, this.palY - 2, this.palSize + 4, this.palSize + 4);
      }
    }

    // 完成提示
    if (state.completed) {
      ctx.fillStyle = 'rgba(0,0,0,0.7)';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#0f0';
      ctx.font = 'bold 24px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('完成！', W / 2, H / 2);
    }
  }

  onTouch(x: number, y: number, state: GameState, engine: PicPicEngine): void {
    // 返回按钮 → 回选关（对应按 B 退出 → 0x0D）
    if (x >= this.backBtn.x && x <= this.backBtn.x + this.backBtn.w &&
        y >= 4 && y <= 4 + this.backBtn.h) {
      engine.setSubState(ROM_SUBSTATE.SUB_MAIN);
      engine.setState(ROM_STATE.ST_STATE_SELECT);
      return;
    }
    const g = state.playerGrid;
    if (!g || state.completed) return;
    // 检查调色板点击
    if (y >= this.palY && y <= this.palY + this.palSize) {
      for (let i = 1; i < 16; i++) {
        const px = this.palStartX + (i - 1) * (this.palSize + 4);
        if (x >= px && x <= px + this.palSize) {
          this.currentColor = i;
          return;
        }
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
