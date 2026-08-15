// 模式选择场景 —— STATE 0x12（资源 cinario_select/）
// 真实流程: mode select → state select（选关）
// UI 全在 canvas 内自绘：3 个模式卡片 + OK 按钮，触摸命中检测
import { SceneHandler, GameState, PicPicEngine } from '../core/engine';
import { ROM_STATE, ROM_SUBSTATE, MODES, ModeId, MODE_STAGE_COUNT } from '../core/rom-states';
import { canvasSize } from '../core/canvas-util';
import { drawButton, drawText, hitTest, Rect } from '../core/canvas-ui';

export class ModeSelectScene implements SceneHandler {
  private selMode: ModeId = 'map';
  private cardRects: { rect: Rect; id: ModeId }[] = [];

  onEnter(_state: GameState): void {
    this.selMode = 'map';
  }

  update(_dt: number, _state: GameState): void {}

  render(ctx: CanvasRenderingContext2D, state: GameState): void {
    const { w: W, h: H } = canvasSize(ctx);
    ctx.fillStyle = '#1d1236';
    ctx.fillRect(0, 0, W, H);

    // 3 个模式卡片（竖排，居中）
    const slot = state.slots[state.slotIndex];
    const cardW = Math.min(W * 0.78, 320);
    const cardH = Math.min((H * 0.6) / 3 - 8, 54);
    const gap = 8;
    const startY = H * 0.2;
    this.cardRects = [];

    MODES.forEach((m, i) => {
      const x = (W - cardW) / 2;
      const y = startY + i * (cardH + gap);
      const cleared = slot ? slot.cleared[m.id].length : 0;
      const total = MODE_STAGE_COUNT[m.id];
      const rect = drawButton(
        ctx, x, y, cardW, cardH, '',
        {
          bg: this.selMode === m.id ? '#1d4e7a' : '#143a5c',
          border: this.selMode === m.id ? '#ffd23f' : '#2f6b9e',
          text: '#fff',
        },
        this.selMode === m.id,
      );
      drawText(ctx, m.name, x + 14, y + cardH / 2 - 6, {
        color: '#fff',
        font: 'bold 16px sans-serif',
        baseline: 'middle',
      });
      drawText(ctx, `${m.resDir}  STAGE:${total}`, x + 14, y + cardH / 2 + 12, {
        color: '#9fc3e8',
        font: '10px sans-serif',
        baseline: 'middle',
      });
      drawText(ctx, `CLEAR: ${cleared}  NOW: ${slot ? slot.unlocked[m.id] : 1}`, x + 14, y + cardH / 2 + 24, {
        color: '#9fc3e8',
        font: '10px sans-serif',
        baseline: 'middle',
      });
      this.cardRects.push({ rect, id: m.id });
    });

  }

  // ===== HUD 公开接口（保留供页面调用，canvas 触摸优先） =====
  getSelMode(): ModeId {
    return this.selMode;
  }

  getModeItems(state: GameState): { id: ModeId; name: string; resDir: string; total: number; cleared: number; unlocked: number }[] {
    const slot = state.slots[state.slotIndex];
    return MODES.map((m) => {
      const cleared = slot ? slot.cleared[m.id].length : 0;
      const unlocked = slot ? slot.unlocked[m.id] : 1;
      return { id: m.id, name: m.name, resDir: m.resDir, total: MODE_STAGE_COUNT[m.id], cleared, unlocked };
    });
  }

  onModeTap(mode: ModeId): void {
    this.selMode = mode;
  }

  onOkTap(engine: PicPicEngine): void {
    engine.state.mode = this.selMode;
    engine.setSubState(ROM_SUBSTATE.SUB_MAIN);
    engine.setState(ROM_STATE.ST_STATE_SELECT);
  }

  // ===== 上屏：与选存档（TitleScene）完全一致的三模式完成进度 =====
  renderTop(ctx: CanvasRenderingContext2D, state: GameState, engine: PicPicEngine): void {
    const W = canvasSize(ctx).w;
    const H = canvasSize(ctx).h;
    const inset = engine.topInset;
    const contentH = H - inset;

    ctx.fillStyle = '#1d1236';
    ctx.fillRect(0, -inset, W, H + inset);

    const topY = 4;
    const gap = 4;
    const COLS = 40;
    const ROWS = 10;
    const availH = contentH - topY - 4;
    const barH = Math.floor((availH - (MODES.length - 1) * gap) / MODES.length);
    const textH = 16;
    const gridH = barH - textH;
    const cell = Math.max(2, Math.min(Math.floor((W * 0.84 - 2) / COLS), Math.floor(gridH / ROWS)));
    const gridW = cell * COLS;
    const gridRealH = cell * ROWS;
    const barW = W * 0.84;
    const barX = (W - barW) / 2;
    const gx = barX;

    MODES.forEach((m, i) => {
      const y = topY + i * (barH + gap);
      const total = MODE_STAGE_COUNT[m.id];
      const cleared = state.slots[state.slotIndex]?.cleared[m.id].length || 0;
      const done = cleared >= total;
      const gy = y + textH + (gridH - gridRealH) / 2;

      ctx.textAlign = 'left';
      ctx.fillStyle = '#cfc3ff';
      ctx.font = '12px sans-serif';
      ctx.fillText(`${m.name}`, barX + 6, y + textH / 2 + 4);

      ctx.textAlign = 'right';
      if (done) {
        ctx.fillStyle = '#ff5252';
        ctx.font = 'bold 13px sans-serif';
        ctx.fillText('OK', barX + barW - 6, y + textH / 2 + 4);
      } else {
        ctx.fillStyle = '#9a8fc9';
        ctx.font = '11px sans-serif';
        ctx.fillText(`${String(cleared).padStart(3, '0')}/${total}`, barX + barW - 6, y + textH / 2 + 4);
      }

      ctx.fillStyle = '#1a0f35';
      ctx.fillRect(gx - 1, gy - 1, gridW + 2, gridRealH + 2);

      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const idx = r * COLS + c;
          const cx = gx + c * cell;
          const cy = gy + r * cell;
          if (idx < cleared) {
            ctx.fillStyle = done ? '#ff5252' : '#7c6abf';
          } else {
            ctx.fillStyle = '#2d1b5e';
          }
          ctx.fillRect(cx + 0.5, cy + 0.5, cell - 1, cell - 1);
        }
      }
    });
  }

  // ===== Canvas 触摸命中：点击卡片直接进入选关 =====
  onTouch(x: number, y: number, _state: GameState, engine: PicPicEngine): void {
    for (const c of this.cardRects) {
      if (hitTest(x, y, c.rect)) {
        this.selMode = c.id;
        this.onOkTap(engine);
        return;
      }
    }
  }
}
