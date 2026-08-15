// 标题场景 —— STATE 0x11（资源 title/ + f_make/）
// 真实流程（欧版截图 7252 / 8134 对照）:
//   choose-profile：上方展示三模式完成进度（完成标红 OK），下方 3 个手绘存档槽
//   new profile：手绘输入名字（Pencil/Eraser + Delete/OK/Quit），非键盘输入
// 流程: title(选档) → 空槽 → f_make 手绘 → 保存回选档 → 点有档槽 → mode select
// UI 全在 canvas 内自绘：选档槽/Delete、手绘工具栏/底部按钮/删除确认，触摸命中检测
import { SceneHandler, GameState, PicPicEngine } from '../core/engine';
import { ROM_STATE, ROM_SUBSTATE, SAVE_SLOT_COUNT, MODES, MODE_STAGE_COUNT } from '../core/rom-states';
import { canvasSize } from '../core/canvas-util';
import { drawButton, drawText, drawPanel, hitTest, Rect } from '../core/canvas-ui';

// 建档子状态（f_make/ 流程）
enum FMakePhase {
  SlotSelect = 0, // 存档选择（进度 + 3 槽）
  Draw = 1,       // 手绘输入（Pencil/Eraser）
  DeleteConfirm = 2, // 删除存档确认
}

// 手绘"名字"画布：64x64 像素，1bit nametable（0=白 1=黑），黑白 palette 映射
// 手绘内容即存档名，不需要 OCR，也不存文本名
const ICON_SIZE = 64;
const DRAW_W = 256; // 签名面板宽（20:9 比例，适合手写签名）
const DRAW_H = 115; // 签名面板高

export class TitleScene implements SceneHandler {
  private phase: FMakePhase = FMakePhase.SlotSelect;
  private selSlot = 0;
  private drawIcon: Uint8Array = new Uint8Array(ICON_SIZE * ICON_SIZE);
  private drawTool: 0 | 1 = 0; // 0=Pencil 1=Eraser
  private drawing = false;

  private drawCanvas = { x: 0, y: 0, w: DRAW_W, h: DRAW_H };
  private time = 0;

  // Canvas UI 命中区
  private slotRects: Rect[] = [];
  private delBtnRect: Rect = { x: 0, y: 0, w: 0, h: 0 };
  private toolRects: Rect[] = []; // Pencil/Eraser
  private quitRect: Rect = { x: 0, y: 0, w: 0, h: 0 };
  private drawDelRect: Rect = { x: 0, y: 0, w: 0, h: 0 };
  private okRect: Rect = { x: 0, y: 0, w: 0, h: 0 };
  private confirmNoRect: Rect = { x: 0, y: 0, w: 0, h: 0 };
  private confirmYesRect: Rect = { x: 0, y: 0, w: 0, h: 0 };

  update(dt: number, _state: GameState): void {
    this.time += dt;
  }

  // ===== enter: 读取槽位状态 =====
  onEnter(_state: GameState, engine: PicPicEngine): void {
    this.phase = FMakePhase.SlotSelect;
    this.selSlot = 0;
    engine.loadSlotsFromStorageSafe();
  }

  render(ctx: CanvasRenderingContext2D, state: GameState): void {
    const W = this.canvasW(ctx);
    const H = this.canvasH(ctx);

    ctx.fillStyle = '#1d1236';
    ctx.fillRect(0, 0, W, H);

    if (this.phase === FMakePhase.Draw) {
      this.renderDraw(ctx, state, W, H);
    } else if (this.phase === FMakePhase.DeleteConfirm) {
      this.renderDeleteConfirm(ctx, state, W, H);
    } else {
      this.renderSlots(ctx, state, W, H);
    }
  }

  // ================= 选档界面（choose-profile）=================
  // 下屏（render）：3 个手绘存档槽 + Delete 按钮（全 canvas 自绘）
  private renderSlots(ctx: CanvasRenderingContext2D, state: GameState, W: number, H: number) {
    const n = SAVE_SLOT_COUNT;
    const slotW = Math.min(W * 0.72, 320);
    const slotH = Math.min((H * 0.55) / n - 8, 48);
    const gap = 8;
    const startY = H * 0.08;
    this.slotRects = [];

    for (let i = 0; i < n; i++) {
      const x = (W - slotW) / 2;
      const y = startY + i * (slotH + gap);
      const slot = state.slots[i];
      const has = !!slot && !!slot.icon;
      const sel = i === this.selSlot;

      // 槽底
      ctx.fillStyle = has ? '#fff' : '#3a2a6e';
      ctx.strokeStyle = sel ? '#ffd23f' : '#6a5ab0';
      ctx.lineWidth = sel ? 2 : 1;
      ctx.fillRect(x, y, slotW, slotH);
      ctx.strokeRect(x, y, slotW, slotH);

      if (has && slot.icon) {
        // 手绘签名图标（白底黑字，纵向铺满槽）
        this.renderIcon(ctx, slot.icon, x + 4, y + 4, slotH - 8);
      } else {
        // 空槽：New + 提示
        drawText(ctx, `存档 ${i + 1} — New`, x + 14, y + slotH / 2 - 5, {
          color: '#fff',
          font: 'bold 14px sans-serif',
          baseline: 'middle',
        });
        drawText(ctx, '点击创建', x + 14, y + slotH / 2 + 12, {
          color: '#9a8fc9',
          font: '10px sans-serif',
          baseline: 'middle',
        });
      }
      this.slotRects.push({ x, y, w: slotW, h: slotH });
    }

    // Delete file 按钮
    const bw = 110;
    const bh = 34;
    this.delBtnRect = drawButton(
      ctx,
      (W - bw) / 2,
      startY + n * (slotH + gap) + 6,
      bw,
      bh,
      'Delete file',
      { bg: '#8e2a2a', border: '#e57373', text: '#fff', font: '12px sans-serif' },
    );
    drawText(ctx, '点选存档再点进入', W / 2, this.delBtnRect.y + bh + 14, {
      align: 'center',
      color: '#e0b8b8',
      font: '9px sans-serif',
    });
  }

  // ================= 手绘建档界面（new profile） =================
  private renderDraw(ctx: CanvasRenderingContext2D, state: GameState, W: number, H: number) {
    // 顶部标题
    drawText(ctx, 'Enter your name.', W / 2, 22, {
      align: 'center',
      color: '#ffd23f',
      font: 'bold 18px sans-serif',
    });
    drawText(ctx, `File ${this.selSlot + 1} — 手書きで名前を描いてください`, W / 2, 42, {
      align: 'center',
      color: '#cfc3ff',
      font: '11px sans-serif',
    });

    // 签名面板（居中偏上，给底部按钮留空间）
    const cw = Math.min(DRAW_W, W * 0.82);
    const ch = cw * (DRAW_H / DRAW_W);
    const cx = (W - cw) / 2;
    const cy = 60;
    ctx.fillStyle = '#fff';
    ctx.fillRect(cx, cy, cw, ch);
    ctx.strokeStyle = '#ffd23f';
    ctx.lineWidth = 2;
    ctx.strokeRect(cx, cy, cw, ch);
    this.drawCanvas = { x: cx, y: cy, w: cw, h: ch };
    this.renderIconWide(ctx, this.drawIcon, cx, cy, cw, ch);

    // 底部工具栏 + 按钮（一行：Pencil Eraser | Quit Delete OK）
    const btnY = H - 56;
    const bh = 36;
    const btnGap = 6;
    const n = 5;
    const totalGap = btnGap * (n - 1);
    const bw = Math.floor((W - 20 - totalGap) / n);
    let bx = 10;

    // Pencil（绿）/ Eraser（灰）——选中高亮
    this.toolRects = [];
    const toolA = drawButton(ctx, bx, btnY, bw, bh, 'Pencil',
      { bg: '#1e7a3c', border: '#66bb6a', text: '#fff', font: 'bold 11px sans-serif' },
      this.drawTool === 0);
    this.toolRects.push(toolA);
    bx += bw + btnGap;
    const toolB = drawButton(ctx, bx, btnY, bw, bh, 'Eraser',
      { bg: '#4a4a4a', border: '#888', text: '#fff', font: 'bold 11px sans-serif' },
      this.drawTool === 1);
    this.toolRects.push(toolB);
    bx += bw + btnGap;

    this.quitRect = drawButton(ctx, bx, btnY, bw, bh, 'Quit',
      { bg: '#555', border: '#888', text: '#fff', font: 'bold 11px sans-serif' });
    bx += bw + btnGap;
    this.drawDelRect = drawButton(ctx, bx, btnY, bw, bh, 'Delete',
      { bg: '#8e2a2a', border: '#e57373', text: '#fff', font: 'bold 11px sans-serif' });
    bx += bw + btnGap;
    this.okRect = drawButton(ctx, bx, btnY, bw, bh, 'OK',
      { bg: '#1e7a3c', border: '#66bb6a', text: '#fff', font: 'bold 11px sans-serif' });
  }

  // ================= 删除确认弹窗 =================
  private renderDeleteConfirm(ctx: CanvasRenderingContext2D, state: GameState, W: number, H: number) {
    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.fillRect(0, 0, W, H);

    const pw = Math.min(W * 0.78, 300);
    const ph = 150;
    const px = (W - pw) / 2;
    const py = (H - ph) / 2;
    drawPanel(ctx, px, py, pw, ph, { bg: '#2b1a4d', border: '#ffd23f' });

    drawText(ctx, 'Delete this file?', px + pw / 2, py + 48, {
      align: 'center',
      color: '#ffd23f',
      font: 'bold 16px sans-serif',
    });
    drawText(ctx, `File ${this.selSlot + 1}`, px + pw / 2, py + 74, {
      align: 'center',
      color: '#cfc3ff',
      font: '12px sans-serif',
    });

    const bw = pw * 0.4;
    const bh = 36;
    const bx = px + pw / 2 - bw / 2;
    const by = py + ph - 48;
    this.confirmNoRect = drawButton(ctx, bx - bw / 2 - 8, by, bw, bh, 'Cancel',
      { bg: '#555', border: '#888', text: '#fff', font: 'bold 12px sans-serif' });
    this.confirmYesRect = drawButton(ctx, bx + bw / 2 + 8, by, bw, bh, 'Delete',
      { bg: '#8e2a2a', border: '#e57373', text: '#fff', font: 'bold 12px sans-serif' });
  }

  // ================= 上屏：Pic Pic LOGO + 三模式完成进度 =================
  renderTop(ctx: CanvasRenderingContext2D, state: GameState, engine: PicPicEngine): void {
    const W = canvasSize(ctx).w;
    const H = canvasSize(ctx).h;
    // 引擎已 translate(0, inset)：内容从状态栏下方开始；背景需向上扩绘制覆盖整屏
    const inset = engine.topInset;
    const contentH = H - inset;

    // 背景铺满整个上屏（含状态栏区域，视觉上不露缝隙）
    ctx.fillStyle = '#1d1236';
    ctx.fillRect(0, -inset, W, H + inset);

    // ---- 三模式完成进度（紧凑布局：文字在上半行，网格在下半行，无额外间隙） ----
    const topY = 4;
    const gap = 4;
    const COLS = 40;
    const ROWS = 10;
    const availH = contentH - topY - 4; // 可用高度（底部留 4px）
    const barH = Math.floor((availH - (MODES.length - 1) * gap) / MODES.length);
    const textH = 16; // 文字行固定高度
    const gridH = barH - textH; // 网格实际高度
    const cell = Math.max(2, Math.min(Math.floor((W * 0.84 - 2) / COLS), Math.floor(gridH / ROWS)));
    const gridW = cell * COLS;
    const gridRealH = cell * ROWS;
    const barW = W * 0.84;
    const barX = (W - barW) / 2;
    const gx = barX; // 网格左对齐到 barX

    MODES.forEach((m, i) => {
      const y = topY + i * (barH + gap);
      const total = MODE_STAGE_COUNT[m.id];
      const cleared = state.slots[this.selSlot]?.cleared[m.id].length || 0;
      const done = cleared >= total;
      const gy = y + textH + (gridH - gridRealH) / 2; // 网格在下半行居中

      // 上行：模式名（左）+ 完成数（右）
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

      // 下行：像素网格背景（宽度铺满 barW）
      ctx.fillStyle = '#1a0f35';
      ctx.fillRect(gx - 1, gy - 1, gridW + 2, gridRealH + 2);

      // 绘制 400 个小格子
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

  // ===== HUD 公开接口 =====

  getSlotSelectState(state: GameState): { slots: { hasData: boolean }[]; selSlot: number } {
    return {
      slots: state.slots.slice(0, SAVE_SLOT_COUNT).map((s) => ({ hasData: !!s && !!s.icon })),
      selSlot: this.selSlot,
    };
  }

  getDrawState(): { tool: 0 | 1; selSlot: number } {
    return { tool: this.drawTool, selSlot: this.selSlot };
  }

  isDrawPhase(): boolean {
    return this.phase === FMakePhase.Draw;
  }

  isDeleteConfirm(): boolean {
    return this.phase === FMakePhase.DeleteConfirm;
  }

  // 供页面 HUD 调用的选槽/删除入口
  onSlotTap(idx: number, state: GameState, engine: PicPicEngine): void {
    const slot = state.slots[idx];
    if (slot && slot.icon) {
      if (this.selSlot !== idx) {
        this.selSlot = idx;
      } else {
        state.slotIndex = idx;
        engine.setSubState(ROM_SUBSTATE.SUB_MAIN);
        engine.setState(ROM_STATE.ST_MODE_INIT);
      }
    } else {
      this.selSlot = idx;
      this.drawIcon.fill(0);
      this.drawTool = 0;
      this.phase = FMakePhase.Draw;
    }
  }

  onDeleteTap(state: GameState, engine: PicPicEngine): void {
    const slot = state.slots[this.selSlot];
    if (slot && slot.icon) {
      this.phase = FMakePhase.DeleteConfirm;
    }
  }

  // 手绘阶段：工具切换 / 清空 / 退出 / 保存
  onToolTap(tool: 0 | 1): void {
    this.drawTool = tool;
  }

  onBtnQuit(): void {
    this.phase = FMakePhase.SlotSelect;
  }

  onBtnDel(): void {
    this.drawIcon.fill(0); // 清空画布（NDS 全清）
  }

  onBtnOk(state: GameState, engine: PicPicEngine): void {
    this.finishDraw(state, engine);
  }

  // 删除确认：取消 / 确认删除
  onConfirmNo(): void {
    this.phase = FMakePhase.SlotSelect;
  }

  onConfirmYes(state: GameState, engine: PicPicEngine): void {
    const slot = state.slots[this.selSlot];
    if (slot) {
      slot.name = '';
      slot.icon = null;
      slot.createdAt = 0;
      slot.cleared = { map: [], lap: [], fap: [] };
      slot.unlocked = { map: 1, lap: 1, fap: 1 };
      slot.bestTime = { map: {}, lap: {}, fap: {} };
    }
    engine.writeSlotsToStorageSafe();
    this.phase = FMakePhase.SlotSelect;
  }

  // ===== Canvas 触摸命中 =====
  onTouch(x: number, y: number, state: GameState, engine: PicPicEngine): void {
    if (this.phase === FMakePhase.Draw) {
      // 手绘面板优先（画布绘制）
      const c = this.drawCanvas;
      if (x >= c.x && x <= c.x + c.w && y >= c.y && y <= c.y + c.h) {
        this.drawPoint(x, y);
        this.drawing = true;
        return;
      }
      // 工具栏
      if (hitTest(x, y, this.toolRects[0] || { x: 0, y: 0, w: 0, h: 0 })) { this.onToolTap(0); return; }
      if (hitTest(x, y, this.toolRects[1] || { x: 0, y: 0, w: 0, h: 0 })) { this.onToolTap(1); return; }
      // 底部按钮
      if (hitTest(x, y, this.quitRect)) { this.onBtnQuit(); return; }
      if (hitTest(x, y, this.drawDelRect)) { this.onBtnDel(); return; }
      if (hitTest(x, y, this.okRect)) { this.onBtnOk(state, engine); return; }
      return;
    }
    if (this.phase === FMakePhase.DeleteConfirm) {
      if (hitTest(x, y, this.confirmNoRect)) { this.onConfirmNo(); return; }
      if (hitTest(x, y, this.confirmYesRect)) { this.onConfirmYes(state, engine); return; }
      return;
    }
    // SlotSelect：槽位 + Delete
    for (let i = 0; i < this.slotRects.length; i++) {
      if (hitTest(x, y, this.slotRects[i])) {
        this.onSlotTap(i, state, engine);
        return;
      }
    }
    if (hitTest(x, y, this.delBtnRect)) {
      this.onDeleteTap(state, engine);
    }
  }

  onTouchMove(x: number, y: number, _state: GameState, _engine: PicPicEngine): void {
    if (this.phase !== FMakePhase.Draw) return;
    const c = this.drawCanvas;
    if (x >= c.x && x <= c.x + c.w && y >= c.y && y <= c.y + c.h) {
      this.drawPoint(x, y);
      this.drawing = true;
    }
  }

  onTouchEnd(_state: GameState, _engine: PicPicEngine): void {
    this.drawing = false;
  }

  // ================= 工具方法 =================

  // nametable → 黑白 palette 渲染：palette[0]=#fff(白底) palette[1]=#000(墨迹)
  // icon 为 64x64 1bit 像素块（0=白 1=黑），放大到目标矩形
  private renderIcon(ctx: CanvasRenderingContext2D, icon: Uint8Array, dx: number, dy: number, size: number) {
    const scale = size / ICON_SIZE;
    ctx.fillStyle = '#000';
    for (let y = 0; y < ICON_SIZE; y++) {
      for (let x = 0; x < ICON_SIZE; x++) {
        if (icon[y * ICON_SIZE + x]) {
          ctx.fillRect(dx + x * scale, dy + y * scale, Math.ceil(scale), Math.ceil(scale));
        }
      }
    }
  }

  // 宽面板渲染：64x64 像素拉伸到目标宽高（非等比，适合签名横条）
  private renderIconWide(ctx: CanvasRenderingContext2D, icon: Uint8Array, dx: number, dy: number, w: number, h: number) {
    const sx = w / ICON_SIZE;
    const sy = h / ICON_SIZE;
    ctx.fillStyle = '#000';
    for (let y = 0; y < ICON_SIZE; y++) {
      for (let x = 0; x < ICON_SIZE; x++) {
        if (icon[y * ICON_SIZE + x]) {
          ctx.fillRect(dx + x * sx, dy + y * sy, Math.ceil(sx), Math.ceil(sy));
        }
      }
    }
  }

  // 手绘点：屏幕坐标 → 图标像素坐标（适配 20:9 宽面板）
  private drawPoint(sx: number, sy: number) {
    const c = this.drawCanvas;
    const sxScale = c.w / ICON_SIZE;
    const syScale = c.h / ICON_SIZE;
    const ix = Math.floor((sx - c.x) / sxScale);
    const iy = Math.floor((sy - c.y) / syScale);
    if (ix < 0 || ix >= ICON_SIZE || iy < 0 || iy >= ICON_SIZE) return;
    const r = this.drawTool === 0 ? 2 : 3; // 笔触半径
    for (let dy = -r; dy <= r; dy++) {
      for (let dx = -r; dx <= r; dx++) {
        const px = ix + dx, py = iy + dy;
        if (px < 0 || px >= ICON_SIZE || py < 0 || py >= ICON_SIZE) continue;
        if (dx * dx + dy * dy <= r * r) {
          this.drawIcon[py * ICON_SIZE + px] = this.drawTool === 0 ? 1 : 0;
        }
      }
    }
  }

  private finishDraw(state: GameState, engine: PicPicEngine) {
    // 手绘内容即存档名：直接存 64x64 1bit nametable 像素（黑白 palette），无需 OCR
    let hasInk = false;
    for (let i = 0; i < this.drawIcon.length; i++) {
      if (this.drawIcon[i]) { hasInk = true; break; }
    }
    const slot = state.slots[this.selSlot];
    if (slot) {
      slot.icon = hasInk ? new Uint8Array(this.drawIcon) : null;
      if (hasInk && !slot.createdAt) slot.createdAt = Date.now();
    }
    engine.writeSlotsToStorageSafe();
    this.phase = FMakePhase.SlotSelect;
  }

  private canvasW(ctx: CanvasRenderingContext2D): number {
    return canvasSize(ctx).w;
  }
  private canvasH(ctx: CanvasRenderingContext2D): number {
    return canvasSize(ctx).h;
  }
}
