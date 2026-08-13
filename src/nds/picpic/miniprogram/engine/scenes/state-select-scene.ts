// 选关场景 —— STATE 0x0D（资源 select/ + No_window_map/lap/fap）
// 真实流程: state select → gaming（选择关卡后进入 0x13）
import { SceneHandler, GameState, PicPicEngine, PuzzleData } from '../core/engine';
import { ROM_STATE, ROM_SUBSTATE, MODE_STAGE_COUNT } from '../core/rom-states';
import { getStageDetail } from '../data/stage-data';
import { GameScene } from './game-scene';
import { canvasSize } from '../core/canvas-util';

// 选关子状态（对应 0x2052a64 的 STATE>9 分派中的 select 内部状态）
enum SelectPhase {
  Grid = 0, // 关号网格
  Detail = 1, // 关卡详情（开始/返回）
}

export class StateSelectScene implements SceneHandler {
  private phase: SelectPhase = SelectPhase.Grid;
  private selStage = 1;
  private gridItems: { x: number; y: number; w: number; h: number; num: number }[] = [];
  private page = 0;
  private pageSize = 100;
  private startBtn = { x: 0, y: 0, w: 0, h: 0 };
  private backBtn = { x: 0, y: 0, w: 0, h: 0 };
  private prevBtn = { x: 0, y: 0, w: 0, h: 0 };
  private nextBtn = { x: 0, y: 0, w: 0, h: 0 };

  onEnter(state: GameState): void {
    this.phase = SelectPhase.Grid;
    this.selStage = state.slots[state.slotIndex]?.unlocked[state.mode] || 1;
    this.page = Math.floor((this.selStage - 1) / this.pageSize);
  }

  update(_dt: number, _state: GameState): void {}

  render(ctx: CanvasRenderingContext2D, state: GameState): void {
    const W = this.canvasW(ctx);
    const H = this.canvasH(ctx);

    ctx.fillStyle = '#101820';
    ctx.fillRect(0, 0, W, H);

    // 顶部模式信息栏
    ctx.fillStyle = '#1f3d56';
    ctx.fillRect(0, 0, W, 52);
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffd23f';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText(`${state.mode.toUpperCase()} MODE`, W / 2, 20);

    const slot = state.slots[state.slotIndex];
    ctx.font = '12px sans-serif';
    ctx.fillStyle = '#a8c8e8';
    ctx.textAlign = 'center';
    const total = MODE_STAGE_COUNT[state.mode];
    const cleared = slot ? slot.cleared[state.mode].length : 0;
    ctx.fillText(`No_window_${state.mode}  TOTAL:${total}  CLEAR:${cleared}`, W / 2, 42);

    if (this.phase === SelectPhase.Grid) {
      this.renderGrid(ctx, state, W, H, total, slot?.unlocked[state.mode] || 1);
    } else {
      this.renderDetail(ctx, state, W, H, total);
    }
  }

  private renderGrid(
    ctx: CanvasRenderingContext2D,
    state: GameState,
    W: number, H: number, total: number, unlocked: number,
  ) {
    const top = 64;
    const cols = 8;
    const gap = 8;
    const cell = Math.floor((W - 20 - gap * (cols - 1)) / cols);
    const rows = Math.floor((H - top - 70) / (cell + gap));
    const start = this.page * this.pageSize + 1;
    const end = Math.min(start + this.pageSize, total + 1);

    this.gridItems = [];
    let idx = 0;
    for (let n = start; n < end; n++) {
      const col = idx % cols;
      const row = Math.floor(idx / cols);
      const x = 10 + col * (cell + gap);
      const y = top + row * (cell + gap);
      if (y > H - 60) break;
      const cleared = state.slots[state.slotIndex]?.cleared[state.mode].includes(n);
      const locked = n > unlocked;

      ctx.fillStyle = cleared ? '#1e7a3c' : (locked ? '#2a2a2a' : '#33475c');
      ctx.fillRect(x, y, cell, cell);
      ctx.strokeStyle = n === this.selStage ? '#ffd23f' : '#4a6274';
      ctx.lineWidth = n === this.selStage ? 2 : 1;
      ctx.strokeRect(x, y, cell, cell);

      ctx.fillStyle = locked ? '#555' : '#fff';
      ctx.font = `${cell > 40 ? 14 : 10}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText(String(n), x + cell / 2, y + cell / 2 + 4);
      this.gridItems.push({ x, y, w: cell, h: cell, num: n });
      idx++;
    }

    // 翻页
    const pageH = H - 40;
    ctx.fillStyle = '#4a6274';
    ctx.fillRect(0, pageH, 60, 40);
    ctx.fillRect(W - 60, pageH, 60, 40);
    ctx.fillStyle = '#fff';
    ctx.font = '16px sans-serif';
    ctx.fillText('◀', 30, pageH + 26);
    ctx.fillText('▶', W - 30, pageH + 26);
    this.prevBtn = { x: 0, y: pageH, w: 60, h: 40 };
    this.nextBtn = { x: W - 60, y: pageH, w: 60, h: 40 };
    ctx.fillStyle = '#ffd23f';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`PAGE ${this.page + 1} / ${Math.ceil(total / this.pageSize)}`, W / 2, pageH + 26);
  }

  private renderDetail(ctx: CanvasRenderingContext2D, state: GameState, W: number, H: number, total: number) {
    ctx.fillStyle = 'rgba(0,0,0,0.75)';
    ctx.fillRect(0, 0, W, H);

    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffd23f';
    ctx.font = 'bold 24px sans-serif';
    ctx.fillText(`STAGE ${this.selStage}`, W / 2, H * 0.3);

    const slot = state.slots[state.slotIndex];
    const best = slot?.bestTime[state.mode][this.selStage];
    ctx.font = '14px sans-serif';
    ctx.fillStyle = '#a8c8e8';
    ctx.fillText(`mode: ${state.mode}  (${Math.ceil(this.selStage / total * 100)}%)`, W / 2, H * 0.3 + 30);
    ctx.fillText(best ? `BEST: ${this.fmtTime(best)}` : 'NEW STAGE', W / 2, H * 0.3 + 54);

    // 开始/返回
    const bw = 180, bh = 46;
    ctx.fillStyle = '#e94560';
    ctx.fillRect((W - bw) / 2, H * 0.42, bw, bh);
    this.startBtn = { x: (W - bw) / 2, y: H * 0.42, w: bw, h: bh };
    ctx.fillStyle = '#fff';
    ctx.font = '16px sans-serif';
    ctx.fillText('START', W / 2, H * 0.42 + 29);

    ctx.fillStyle = '#444';
    ctx.fillRect((W - bw) / 2, H * 0.42 + bh + 12, bw, bh);
    this.backBtn = { x: (W - bw) / 2, y: H * 0.42 + bh + 12, w: bw, h: bh };
    ctx.fillStyle = '#ccc';
    ctx.fillText('BACK', W / 2, H * 0.42 + bh + 12 + 29);
  }

  onTouch(x: number, y: number, state: GameState, engine: PicPicEngine): void {
    if (this.phase === SelectPhase.Grid) {
      for (const it of this.gridItems) {
        if (x >= it.x && x <= it.x + it.w && y >= it.y && y <= it.y + it.h) {
          this.selStage = it.num;
          this.phase = SelectPhase.Detail;
          return;
        }
      }
      const total = MODE_STAGE_COUNT[state.mode];
      if (x >= this.nextBtn.x && x <= this.nextBtn.x + this.nextBtn.w &&
          y >= this.nextBtn.y && y <= this.nextBtn.y + this.nextBtn.h) {
        if ((this.page + 1) * this.pageSize < total) this.page++;
        return;
      }
      if (x >= this.prevBtn.x && x <= this.prevBtn.x + this.prevBtn.w &&
          y >= this.prevBtn.y && y <= this.prevBtn.y + this.prevBtn.h) {
        if (this.page > 0) this.page--;
        return;
      }
      return;
    }

    // Detail 阶段
    const b = this.startBtn;
    if (x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h) {
      engine.state.puzzleIndex = this.selStage;
      const entry = getStageDetail(state.mode, this.selStage);
      if (entry) {
        const puzzle: PuzzleData = { id: entry.id, name: entry.name, w: entry.w, h: entry.h, grid: entry.grid };
        engine.loadPuzzle(puzzle, entry.palette);
        // 装载游玩场景并替换 ST_GAMING handler（对应 0x2055BC8 GAME SETUP）
        const gs = new GameScene(puzzle);
        engine.replaceHandler(ROM_STATE.ST_GAMING, gs);
        engine.setSubState(ROM_SUBSTATE.SUB_MAIN);
        engine.setState(ROM_STATE.ST_GAMING); // 0x13
      }
      return;
    }
    const bk = this.backBtn;
    if (x >= bk.x && x <= bk.x + bk.w && y >= bk.y && y <= bk.y + bk.h) {
      this.phase = SelectPhase.Grid;
    }
  }

  private fmtTime(s: number): string {
    const m = Math.floor(s / 60);
    const ss = s % 60;
    return `${m}:${String(ss).padStart(2, '0')}`;
  }

  private canvasW(ctx: CanvasRenderingContext2D): number {
    return canvasSize(ctx).w;
  }
  private canvasH(ctx: CanvasRenderingContext2D): number {
    return canvasSize(ctx).h;
  }
}
