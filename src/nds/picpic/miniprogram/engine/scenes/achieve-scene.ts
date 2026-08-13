// 完成画面 —— STATE 0x14（资源 map_comp/ lap_comp/ fap_comp/）
// 真实流程: achieve（完成确认）→ saving(0x10) → 回选关
import { SceneHandler, GameState, PicPicEngine } from '../core/engine';
import { ROM_STATE, ROM_SUBSTATE } from '../core/rom-states';
import { getStageDetail } from '../data/stage-data';
import { canvasSize } from '../core/canvas-util';

export class AchieveScene implements SceneHandler {
  private time = 0;
  private okBtn = { x: 0, y: 0, w: 0, h: 0 };

  onEnter(_state: GameState): void {
    this.time = 0;
  }

  update(dt: number, _state: GameState): void {
    this.time += dt;
  }

  render(ctx: CanvasRenderingContext2D, state: GameState): void {
    const W = this.canvasW(ctx);
    const H = this.canvasH(ctx);

    // 深色底 + 完成标题
    ctx.fillStyle = '#0a2a12';
    ctx.fillRect(0, 0, W, H);

    // 光芒闪烁
    const pulse = 0.5 + 0.5 * Math.sin(this.time * 3);
    ctx.fillStyle = `rgba(255, 220, 60, ${0.15 + 0.25 * pulse})`;
    ctx.fillRect(0, 0, W, H);

    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffd23f';
    ctx.font = 'bold 30px sans-serif';
    ctx.fillText('CLEAR!', W / 2, H * 0.22);

    ctx.font = '14px sans-serif';
    ctx.fillStyle = '#a8e8b8';
    ctx.fillText(`${state.mode.toUpperCase()} STAGE ${state.puzzleIndex}`, W / 2, H * 0.22 + 32);

    // 关卡名 + 用时
    const entry = getStageDetail(state.mode, state.puzzleIndex);
    ctx.font = '16px sans-serif';
    ctx.fillStyle = '#fff';
    ctx.fillText(entry ? entry.name : '', W / 2, H * 0.36);

    const m = Math.floor(state.timeElapsed / 60);
    const s = Math.floor(state.timeElapsed % 60);
    ctx.fillStyle = '#cfc3ff';
    ctx.font = '18px sans-serif';
    ctx.fillText(`TIME: ${m}:${s.toString().padStart(2, '0')}`, W / 2, H * 0.44);

    // 完成图（用网格简绘：完成后的 playerGrid 即答案图）
    const g = state.playerGrid;
    if (g && g.w <= 32 && g.h <= 32) {
      const cs = Math.min(W * 0.6 / g.w, H * 0.3 / g.h, 12);
      const ox = (W - g.w * cs) / 2;
      const oy = H * 0.5;
      for (let y = 0; y < g.h; y++) {
        for (let x = 0; x < g.w; x++) {
          const c = state.palette[g.cells[y * g.w + x]] ?? 0;
          ctx.fillStyle = `rgb(${(c >> 16) & 0xFF},${(c >> 8) & 0xFF},${c & 0xFF})`;
          ctx.fillRect(ox + x * cs, oy + y * cs, cs, cs);
        }
      }
    }

    // 确定按钮 → saving
    const bw = 180, bh = 46;
    ctx.fillStyle = '#1e7a3c';
    ctx.fillRect((W - bw) / 2, H * 0.78, bw, bh);
    this.okBtn = { x: (W - bw) / 2, y: H * 0.78, w: bw, h: bh };
    ctx.fillStyle = '#fff';
    ctx.font = '16px sans-serif';
    ctx.fillText('OK → SAVE', W / 2, H * 0.78 + 29);

    ctx.font = '11px sans-serif';
    ctx.fillStyle = '#6a9a78';
    ctx.fillText('（0x14 achieve → 0x10 saving）', W / 2, H * 0.78 + 60);
  }

  onTouch(x: number, y: number, _state: GameState, engine: PicPicEngine): void {
    const b = this.okBtn;
    if (x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h) {
      engine.setSubState(ROM_SUBSTATE.SUB_MAIN);
      engine.setState(ROM_STATE.ST_SAVING); // 0x10
    }
  }

  private canvasW(ctx: CanvasRenderingContext2D): number {
    return canvasSize(ctx).w;
  }
  private canvasH(ctx: CanvasRenderingContext2D): number {
    return canvasSize(ctx).h;
  }
}
