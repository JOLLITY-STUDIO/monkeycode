// 标题场景 —— STATE 0x11（资源 title/ + f_make/）
// 真实流程: title → profile-naming（建档命名）→ mode select
import { SceneHandler, GameState, PicPicEngine } from '../core/engine';
import { ROM_STATE, ROM_SUBSTATE, SAVE_SLOT_COUNT } from '../core/rom-states';
import { canvasSize } from '../core/canvas-util';

// 命名子状态（对应 f_make/ 建档流程）
enum NamePhase {
  SlotSelect = 0, // 选择/新建存档槽（5 slots）
  Naming = 1,     // 输入玩家名
}

export class TitleScene implements SceneHandler {
  private phase: NamePhase = NamePhase.SlotSelect;
  private selSlot = 0;
  private nameInput: string[] = []; // 逐字符输入
  private slots: { x: number; y: number; w: number; h: number; idx: number }[] = [];
  private keys: { ch: string; x: number; y: number; w: number; h: number }[] = [];
  private enterBtn = { x: 0, y: 0, w: 140, h: 44 };
  private titleRects: { x: number; y: number; w: number; h: number; act: string }[] = [];
  private time = 0;

  // 罗马字母+数字键盘（对应 f_make 命名）
  private CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  update(dt: number, _state: GameState): void {
    this.time += dt;
  }

  // ===== enter: 读取槽位状态（对应 0x2051D5C 5 slots 初始化） =====
  onEnter(_state: GameState, engine: PicPicEngine): void {
    this.phase = NamePhase.SlotSelect;
    this.selSlot = 0;
    this.nameInput = [];
    engine.loadSlotsFromStorageSafe();
  }

  render(ctx: CanvasRenderingContext2D, state: GameState): void {
    const W = this.canvasW(ctx);
    const H = this.canvasH(ctx);

    ctx.fillStyle = '#2b1a4d';
    ctx.fillRect(0, 0, W, H);

    if (this.phase === NamePhase.SlotSelect) {
      this.renderTitle(ctx, state, W, H);
    } else {
      this.renderNaming(ctx, state, W, H);
    }
  }

  private renderTitle(ctx: CanvasRenderingContext2D, state: GameState, W: number, H: number) {
    ctx.fillStyle = '#ffd23f';
    ctx.textAlign = 'center';
    ctx.font = 'bold 42px sans-serif';
    ctx.fillText('Pic Pic', W / 2, H * 0.22);

    ctx.font = '16px sans-serif';
    ctx.fillStyle = '#cfc3ff';
    ctx.fillText('トクと絵になる3つのパズル', W / 2, H * 0.22 + 30);

    ctx.font = '13px sans-serif';
    ctx.fillStyle = '#9a8fc9';
    ctx.fillText('Profile Select（5 Slots）', W / 2, H * 0.22 + 55);

    // 5 个存档槽
    this.slots = [];
    const sw = Math.min(W * 0.7, 300);
    const sh = 52;
    const gap = 12;
    const startY = H * 0.32;
    for (let i = 0; i < SAVE_SLOT_COUNT; i++) {
      const x = (W - sw) / 2;
      const y = startY + i * (sh + gap);
      const slot = state.slots[i];
      ctx.fillStyle = i === this.selSlot ? '#4a2d9e' : '#3a2a6e';
      ctx.fillRect(x, y, sw, sh);
      ctx.strokeStyle = i === this.selSlot ? '#ffd23f' : '#6a5ab0';
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, sw, sh);
      ctx.textAlign = 'left';
      ctx.fillStyle = '#fff';
      ctx.font = '16px sans-serif';
      const hasData = slot && slot.name;
      ctx.fillText(hasData ? `${i + 1}. ${slot.name}` : `${i + 1}. New Profile`, x + 14, y + 24);
      ctx.font = '11px sans-serif';
      ctx.fillStyle = '#b8a9e8';
      const total = slot ? slot.cleared.map.length + slot.cleared.lap.length + slot.cleared.fap.length : 0;
      ctx.fillText(hasData ? `clear: ${total}` : 'tap to create', x + 14, y + 42);
      this.slots.push({ x, y, w: sw, h: sh, idx: i });
    }

    // 开始按钮（有档或选新档后进入）
    this.enterBtn.x = (W - this.enterBtn.w) / 2;
    this.enterBtn.y = startY + SAVE_SLOT_COUNT * (sh + gap) + 10;
    ctx.fillStyle = '#e94560';
    ctx.fillRect(this.enterBtn.x, this.enterBtn.y, this.enterBtn.w, this.enterBtn.h);
    ctx.fillStyle = '#fff';
    ctx.font = '16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('START', W / 2, this.enterBtn.y + 28);

    ctx.font = '12px sans-serif';
    ctx.fillStyle = '#8a7fba';
    ctx.fillText('下キーで選択 → START', W / 2, this.enterBtn.y + 66);
  }

  private renderNaming(ctx: CanvasRenderingContext2D, state: GameState, W: number, H: number) {
    ctx.fillStyle = '#1d1236';
    ctx.fillRect(0, 0, W, H);

    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffd23f';
    ctx.font = 'bold 22px sans-serif';
    ctx.fillText('Player Name (f_make)', W / 2, 60);

    // 名字输入框
    ctx.fillStyle = '#0f0a20';
    ctx.strokeStyle = '#ffd23f';
    ctx.fillRect(W * 0.2, 84, W * 0.6, 46);
    ctx.strokeRect(W * 0.2, 84, W * 0.6, 46);
    ctx.fillStyle = '#fff';
    ctx.font = '22px sans-serif';
    const name = this.nameInput.join('');
    ctx.fillText(name || '＿＿＿', W / 2, 114);

    // 虚拟键盘
    const cols = 9;
    const keyW = W / cols;
    const keyH = Math.min(34, (H - 150) / 4);
    this.keys = [];
    const startY = 150;
    for (let i = 0; i < this.CHARS.length; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      this.keys.push({
        ch: this.CHARS[i],
        x: col * keyW,
        y: startY + row * keyH,
        w: keyW,
        h: keyH,
      });
    }

    for (const k of this.keys) {
      ctx.fillStyle = '#33236b';
      ctx.fillRect(k.x + 1, k.y + 1, k.w - 2, k.h - 2);
      ctx.strokeStyle = '#5a46a0';
      ctx.strokeRect(k.x + 1, k.y + 1, k.w - 2, k.h - 2);
      ctx.fillStyle = '#fff';
      ctx.font = '14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(k.ch, k.x + k.w / 2, k.y + k.h / 2 + 5);
    }

    // 确定/删除
    const btnH = 36;
    ctx.fillStyle = '#e94560';
    ctx.fillRect(0, H - btnH, W / 2, btnH);
    ctx.fillStyle = '#fff';
    ctx.fillText('OK', W / 4, H - btnH / 2 + 6);

    ctx.fillStyle = '#555';
    ctx.fillRect(W / 2, H - btnH, W / 2, btnH);
    ctx.fillText('DEL', W * 0.75, H - btnH / 2 + 6);
  }

  onTouch(x: number, y: number, state: GameState, engine: PicPicEngine): void {
    if (this.phase === NamePhase.SlotSelect) {
      for (const s of this.slots) {
        if (x >= s.x && x <= s.x + s.w && y >= s.y && y <= s.y + s.h) {
          this.selSlot = s.idx;
          return;
        }
      }
      const b = this.enterBtn;
      if (x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h) {
        this.onStart(engine);
      }
      return;
    }

    // 命名阶段
    for (const k of this.keys) {
      if (x >= k.x && x <= k.x + k.w && y >= k.y && y <= k.y + k.h) {
        if (this.nameInput.length < 8) this.nameInput.push(k.ch);
        return;
      }
    }
    const W = this.canvasW(engine.ctx);
    const H = this.canvasH(engine.ctx);
    const btnH = 36;
    if (y >= H - btnH) {
      if (x < W / 2) {
        this.finishNaming(state, engine);
      } else {
        this.nameInput.pop();
      }
    }
  }

  private onStart(engine: PicPicEngine) {
    const state = engine.state;
    const slot = state.slots[this.selSlot];
    if (!slot || !slot.name) {
      // 新建档案 → f_make 命名
      state.slotIndex = this.selSlot;
      this.phase = NamePhase.Naming;
    } else {
      state.slotIndex = this.selSlot;
      // 已有档 → 模式选择（0x0C 初始化 → 0x12）
      engine.setSubState(ROM_SUBSTATE.SUB_MAIN);
      engine.setState(ROM_STATE.ST_MODE_INIT);
    }
  }

  private finishNaming(state: GameState, engine: PicPicEngine) {
    const name = this.nameInput.join('') || `PLAYER${this.selSlot + 1}`;
    const slot = state.slots[this.selSlot];
    if (slot) {
      slot.name = name;
      slot.createdAt = Date.now();
    }
    engine.setSubState(ROM_SUBSTATE.SUB_MAIN);
    engine.setState(ROM_STATE.ST_MODE_INIT); // 0x0C → 0x12
  }

  private canvasW(ctx: CanvasRenderingContext2D): number {
    return canvasSize(ctx).w;
  }
  private canvasH(ctx: CanvasRenderingContext2D): number {
    return canvasSize(ctx).h;
  }
}
