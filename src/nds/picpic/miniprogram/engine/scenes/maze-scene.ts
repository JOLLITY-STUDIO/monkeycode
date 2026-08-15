// map 模式游玩场景 —— 迷宫走格填色（STATE 0x13）
// 真实玩法：下屏黑白迷宫（0=黑墙，>0=白路径），点击相邻白格移动
//          走过的路径格在上屏按 palette 填充颜色，逐步显现目标图案
//          全部路径格走完 → 0x0E 完成检查 → 0x14 achieve
import { SceneHandler, GameState, PicPicEngine } from '../core/engine';
import { ROM_STATE, ROM_SUBSTATE } from '../core/rom-states';
import { getStageDetail } from '../data/stage-data';
import { canvasSize } from '../core/canvas-util';
import { drawText, hitTest, Rect } from '../core/canvas-ui';

const WALL_COLOR = '#1a1a2e';      // 墙：深蓝黑
const PATH_COLOR = '#f0f0f5';      // 路径：浅灰白
const VISITED_COLOR = '#43d17c';   // 已走过：绿（对应原版足迹）
const PLAYER_COLOR = '#e94560';    // 玩家：红

export class MazeScene implements SceneHandler {
  private stage: number;
  private name = '';
  private w = 0;
  private h = 0;
  private grid: Uint8Array;         // 0=墙, >0=路径(颜色索引)
  private visited: Uint8Array;     // 0=未走, 1=已走
  private palette: number[][] = []; // RGB 调色板
  private px = 0;
  private py = 0;
  private totalPath = 0;
  private visitedCount = 0;
  private completed = false;
  private completeTimer = 0;

  private cellSize = 8;
  private offsetX = 0;
  private offsetY = 0;
  private backRect: Rect = { x: 0, y: 0, w: 0, h: 0 };

  constructor(stage: number) {
    this.stage = stage;
    this.build();
  }

  private build() {
    const entry = getStageDetail('map', this.stage);
    if (!entry || entry.w < 1 || entry.h < 1) {
      this.w = 5; this.h = 5;
      this.grid = new Uint8Array([
        0, 1, 1, 1, 0,
        0, 1, 0, 1, 0,
        0, 1, 1, 1, 0,
        0, 1, 0, 0, 0,
        0, 1, 0, 0, 0,
      ]);
      this.palette = this.defaultPalette();
      this.visited = new Uint8Array(25);
      this.px = 1; this.py = 0;
      this.totalPath = 10;
      this.mark(1, 0);
      return;
    }
    this.name = entry.name;
    this.w = entry.w;
    this.h = entry.h;
    this.grid = entry.grid;
    this.palette = entry.palette && entry.palette.length ? entry.palette : this.defaultPalette();
    this.visited = new Uint8Array(this.w * this.h);
    this.totalPath = 0;
    for (let i = 0; i < this.w * this.h; i++) {
      if (this.grid[i] !== 0) this.totalPath++;
    }
    // 起点：第一个路径格（从左上到右下扫描）
    for (let y = 0; y < this.h; y++) {
      for (let x = 0; x < this.w; x++) {
        if (this.grid[y * this.w + x] !== 0) {
          this.px = x; this.py = y;
          this.mark(x, y);
          return;
        }
      }
    }
  }

  private defaultPalette(): number[][] {
    return [
      [0, 0, 0], [255, 0, 0], [0, 180, 0], [0, 90, 255],
      [255, 205, 0], [255, 120, 0], [255, 0, 255], [140, 60, 200],
      [255, 255, 255], [90, 90, 90], [180, 180, 180], [60, 60, 60],
      [246, 197, 131], [164, 222, 246], [238, 255, 41], [255, 238, 57],
    ];
  }

  private mark(x: number, y: number) {
    const idx = y * this.w + x;
    if (!this.visited[idx]) {
      this.visited[idx] = 1;
      this.visitedCount++;
      if (this.visitedCount >= this.totalPath) this.completed = true;
    }
    this.px = x; this.py = y;
  }

  onEnter(_state: GameState, _engine: PicPicEngine): void {
    this.completed = false;
    this.completeTimer = 0;
  }

  update(dt: number, state: GameState, engine: PicPicEngine): void {
    if (!this.completed) {
      state.timeElapsed += dt;
      return;
    }
    this.completeTimer += dt;
    if (this.completeTimer >= 0.8) {
      state.completed = true;
      // 上屏完成图：palette 转为 RGB 合并值
      state.palette = this.palette.map(([r, g, b]) => (r << 16) | (g << 8) | b);
      state.playerGrid = {
        w: this.w, h: this.h,
        cells: new Uint8Array(this.grid),
      };
      engine.setSubState(ROM_SUBSTATE.SUB_MAIN);
      engine.setState(ROM_STATE.ST_RESULT_CHECK);
    }
  }

  render(ctx: CanvasRenderingContext2D, state: GameState): void {
    const W = canvasSize(ctx).w;
    const H = canvasSize(ctx).h;

    ctx.fillStyle = '#0f0f23';
    ctx.fillRect(0, 0, W, H);

    // 顶栏：返回按钮 + 关卡名 + 进度/计时
    ctx.fillStyle = '#1f3d56';
    ctx.fillRect(0, 0, W, 42);
    this.backRect = this.drawBackBtn(ctx, W, 42);
    const m = Math.floor(state.timeElapsed / 60);
    const s = Math.floor(state.timeElapsed % 60);
    const pct = this.totalPath ? Math.floor((this.visitedCount / this.totalPath) * 100) : 100;
    drawText(ctx, `No.${this.stage} ${this.name}`, W / 2, 16, {
      align: 'center', color: '#fff', font: 'bold 13px sans-serif',
    });
    drawText(ctx, `${pct}%  ${m}:${s.toString().padStart(2, '0')}`, W / 2, 34, {
      align: 'center', color: '#ffd23f', font: '11px sans-serif',
    });

    // 迷宫区布局（居中，避开顶栏 + 底部提示）
    const maxW = W - 16;
    const maxH = H - 42 - 26;
    this.cellSize = Math.max(1, Math.floor(Math.min(maxW / this.w, maxH / this.h)));
    this.offsetX = (W - this.w * this.cellSize) / 2;
    this.offsetY = 42 + (maxH - this.h * this.cellSize) / 2;

    // 绘制迷宫网格
    for (let y = 0; y < this.h; y++) {
      for (let x = 0; x < this.w; x++) {
        const idx = y * this.w + x;
        const v = this.grid[idx];
        const vx = this.offsetX + x * this.cellSize;
        const vy = this.offsetY + y * this.cellSize;
        if (v === 0) {
          ctx.fillStyle = WALL_COLOR;
        } else {
          ctx.fillStyle = this.visited[idx] ? VISITED_COLOR : PATH_COLOR;
        }
        ctx.fillRect(vx, vy, this.cellSize, this.cellSize);
      }
    }

    // 玩家位置（红方块，带白色描边）
    const pcx = this.offsetX + this.px * this.cellSize;
    const pcy = this.offsetY + this.py * this.cellSize;
    ctx.fillStyle = PLAYER_COLOR;
    ctx.fillRect(pcx + 1, pcy + 1, this.cellSize - 2, this.cellSize - 2);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    ctx.strokeRect(pcx + 0.5, pcy + 0.5, this.cellSize - 1, this.cellSize - 1);

    // 底部提示
    drawText(ctx, this.completed ? 'CLEAR!' : '点击相邻白格移动，填满上屏', W / 2, H - 8, {
      align: 'center', color: this.completed ? VISITED_COLOR : '#9fc3e8', font: '11px sans-serif',
    });
  }

  // 上屏：已走过的路径格填充颜色，逐步显现目标图案
  renderTop(ctx: CanvasRenderingContext2D, _state: GameState, engine: PicPicEngine): void {
    const W = canvasSize(ctx).w;
    const H = canvasSize(ctx).h;
    const inset = engine.topInset;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, -inset, W, H + inset);

    drawText(ctx, `No.${this.stage} 迷宫`, W / 2, 16, {
      align: 'center', color: '#1f3d56', font: 'bold 13px sans-serif',
    });

    const availW = W - 16;
    const availH = H - 30;
    const scale = Math.max(0.5, Math.min(availW / this.w, availH / this.h));
    const ox = (W - this.w * scale) / 2;
    const oy = 24 + (availH - this.h * scale) / 2;
    const pw = Math.max(1, scale);

    for (let y = 0; y < this.h; y++) {
      for (let x = 0; x < this.w; x++) {
        const idx = y * this.w + x;
        if (!this.visited[idx]) continue;
        const c = this.grid[idx];
        if (c === 0) continue;
        const col = this.palette[c];
        if (!col) continue;
        ctx.fillStyle = `rgb(${col[0]},${col[1]},${col[2]})`;
        ctx.fillRect(ox + x * scale, oy + y * scale, pw + 0.5, pw + 0.5);
      }
    }
  }

  onTouch(x: number, y: number, _state: GameState, engine: PicPicEngine): void {
    if (hitTest(x, y, this.backRect)) {
      engine.setSubState(ROM_SUBSTATE.SUB_MAIN);
      engine.setState(ROM_STATE.ST_STATE_SELECT);
      return;
    }
    if (this.completed) return;

    const gx = Math.floor((x - this.offsetX) / this.cellSize);
    const gy = Math.floor((y - this.offsetY) / this.cellSize);
    if (gx < 0 || gy < 0 || gx >= this.w || gy >= this.h) return;
    if (this.grid[gy * this.w + gx] === 0) return; // 不能点墙

    const dx = Math.abs(gx - this.px);
    const dy = Math.abs(gy - this.py);
    if (dx + dy === 1) { // 上下左右相邻（非斜向）
      this.mark(gx, gy);
    }
  }

  onTouchMove(_x: number, _y: number, _state: GameState, _engine: PicPicEngine): void {}

  onTouchEnd(_state: GameState, _engine: PicPicEngine): void {}

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
}
