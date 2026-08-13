// 模式选择场景 —— STATE 0x12（资源 cinario_select/）
// 真实流程: mode select → state select（选关）
import { SceneHandler, GameState, PicPicEngine } from '../core/engine';
import { ROM_STATE, ROM_SUBSTATE, MODES, ModeId, MODE_STAGE_COUNT } from '../core/rom-states';
import { canvasSize } from '../core/canvas-util';

export class ModeSelectScene implements SceneHandler {
  private items: { x: number; y: number; w: number; h: number; mode: ModeId }[] = [];
  private okBtn = { x: 0, y: 0, w: 0, h: 0 };
  private selMode: ModeId = 'map';

  onEnter(_state: GameState): void {
    this.selMode = 'map';
  }

  update(_dt: number, _state: GameState): void {}

  render(ctx: CanvasRenderingContext2D, state: GameState): void {
    const W = this.canvasW(ctx);
    const H = this.canvasH(ctx);

    ctx.fillStyle = '#0e2a47';
    ctx.fillRect(0, 0, W, H);

    // 标题栏
    ctx.fillStyle = '#ffd23f';
    ctx.textAlign = 'center';
    ctx.font = 'bold 26px sans-serif';
    ctx.fillText('Select Mode', W / 2, H * 0.18);

    ctx.font = '13px sans-serif';
    ctx.fillStyle = '#9fc3e8';
    ctx.fillText('cinario_select /', W / 2, H * 0.18 + 24);

    const slot = state.slots[state.slotIndex];
    this.items = [];
    const iw = Math.min(W * 0.8, 320);
    const ih = 96;
    const gap = 16;
    const startY = H * 0.26;
    for (let i = 0; i < MODES.length; i++) {
      const m = MODES[i];
      const x = (W - iw) / 2;
      const y = startY + i * (ih + gap);
      const cleared = slot ? slot.cleared[m.id].length : 0;
      const unlocked = slot ? slot.unlocked[m.id] : 1;

      ctx.fillStyle = m.id === this.selMode ? '#1d4e7a' : '#143a5c';
      ctx.fillRect(x, y, iw, ih);
      ctx.strokeStyle = m.id === this.selMode ? '#ffd23f' : '#2f6b9e';
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, iw, ih);

      ctx.textAlign = 'left';
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 20px sans-serif';
      ctx.fillText(`${m.name}`, x + 20, y + 34);

      ctx.font = '12px sans-serif';
      ctx.fillStyle = '#9fc3e8';
      ctx.fillText(`${m.resDir}`, x + 20, y + 56);
      ctx.fillText(`STAGE: ${MODE_STAGE_COUNT[m.id]}  CLEAR: ${cleared}  NOW: ${unlocked}`, x + 20, y + 78);

      this.items.push({ x, y, w: iw, h: ih, mode: m.id });
    }

    // 开始按钮
    ctx.fillStyle = '#e94560';
    const bw = 160, bh = 40;
    const by = startY + MODES.length * (ih + gap) + 8;
    ctx.fillRect((W - bw) / 2, by, bw, bh);
    this.okBtn = { x: (W - bw) / 2, y: by, w: bw, h: bh };
    ctx.fillStyle = '#fff';
    ctx.font = '15px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('OK → Select Stage', W / 2, by + 28);
  }

  onTouch(x: number, y: number, _state: GameState, engine: PicPicEngine): void {
    // 模式项
    for (const it of this.items) {
      if (x >= it.x && x <= it.x + it.w && y >= it.y && y <= it.y + it.h) {
        this.selMode = it.mode;
        return;
      }
    }
    // 确定按钮
    const b = this.okBtn;
    if (x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h) {
      engine.state.mode = this.selMode;
      // → state select (0x0D)
      engine.setSubState(ROM_SUBSTATE.SUB_MAIN);
      engine.setState(ROM_STATE.ST_STATE_SELECT);
    }
  }

  private canvasW(ctx: CanvasRenderingContext2D): number {
    return canvasSize(ctx).w;
  }
  private canvasH(ctx: CanvasRenderingContext2D): number {
    return canvasSize(ctx).h;
  }
}
