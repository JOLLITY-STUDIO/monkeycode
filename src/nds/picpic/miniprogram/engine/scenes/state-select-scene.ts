// 选关场景 —— STATE 0x0D（资源 select/ + No_window_map/lap/fap）
// 真实流程: state select → gaming（选择关卡后进入 0x13）
// UI 全在 canvas 内自绘：上屏预览区、下屏顶栏+动画滚动网格+难度滑块+三角滚动
import { SceneHandler, GameState, PicPicEngine, PuzzleData } from '../core/engine';
import { ROM_STATE, ROM_SUBSTATE, MODE_STAGE_COUNT, getLevelRange, getStageLevel, ModeId } from '../core/rom-states';
import { getStageDetail } from '../data/stage-data';
import { GameScene } from './game-scene';
import { MazeScene } from './maze-scene';
import { canvasSize } from '../core/canvas-util';
import { drawButton, drawText, drawPanel, hitTest, Rect } from '../core/canvas-ui';

const LV_NAMES = ['Lv1', 'Lv2', 'Lv3', 'Lv4', 'Lv5'];
const LV_COLORS = ['#8ecae6', '#219ebc', '#ffb703', '#fb8500', '#e63946'];

export class StateSelectScene implements SceneHandler {
  private selStage = 1;
  private gridItems: { x: number; y: number; w: number; h: number; num: number }[] = [];
  // 滚动：float 关号位置，渲染时插值位移形成平滑滚动动画
  private scrollPos = 0;     // 当前滚动位置（连续值）
  private targetScroll = 0;  // 目标位置（恒为 rowStep 整数倍）
  private readonly SCROLL_SPEED = 24; // 关/秒（一行5关 ≈ 0.2s 滚完一行）
  private rowStep = 5;
  private rowsVisible = 5;
  private colsVisible = 5;
  private gridTop = 54;

  // 命中区
  private prevRect: Rect = { x: 0, y: 0, w: 0, h: 0 };
  private nextRect: Rect = { x: 0, y: 0, w: 0, h: 0 };
  private lvRects: Rect[] = [];
  private sliderTrackRect: Rect = { x: 0, y: 0, w: 0, h: 0 };
  private sliderThumbY = 0;
  private backRect: Rect = { x: 0, y: 0, w: 0, h: 0 };
  private startRect: Rect = { x: 0, y: 0, w: 0, h: 0 };

  // 滑条按压控制：单击=移动一步，长按=持续动画滚动
  private sliderDir: 1 | -1 | 0 = 0;  // 按压方向：-1 向上 / 1 向下
  private sliderHoldTime = 0;         // 已按住时长（秒）
  private sliderHeld = false;         // 是否已触发长按
  private readonly LONG_PRESS = 0.3;  // 长按阈值（秒）

  onEnter(_state: GameState): void {
    this.selStage = 1;
    const off = Math.floor((this.selStage - 1) / this.rowStep) * this.rowStep;
    this.scrollPos = off;
    this.targetScroll = off;
    this.sliderDir = 0;
    this.sliderHoldTime = 0;
    this.sliderHeld = false;
  }

  // 滚动动画驱动 + 长按滑条持续滚动
  update(dt: number, state: GameState): void {
    // 长按滑条：持续向按压方向滚动（动画追赶）
    if (this.sliderDir !== 0) {
      this.sliderHoldTime += dt;
      if (!this.sliderHeld && this.sliderHoldTime >= this.LONG_PRESS) {
        this.sliderHeld = true;
      }
      if (this.sliderHeld) {
        const max = this.maxOffset(state.mode);
        const step = this.rowStep * 10 * dt; // 持续速度：10 行/秒
        if (this.sliderDir === -1) {
          this.targetScroll = Math.max(0, this.targetScroll - step);
        } else {
          this.targetScroll = Math.min(max, this.targetScroll + step);
        }
      }
    }
    // 滚动动画
    const diff = this.targetScroll - this.scrollPos;
    if (Math.abs(diff) < 0.01) {
      this.scrollPos = this.targetScroll;
      return;
    }
    const step = this.SCROLL_SPEED * dt;
    if (diff > 0) this.scrollPos = Math.min(this.targetScroll, this.scrollPos + step);
    else this.scrollPos = Math.max(this.targetScroll, this.scrollPos - step);
  }

  // ===== 上屏：预览区（问号 + 关卡信息） =====
  renderTop(ctx: CanvasRenderingContext2D, state: GameState, engine: PicPicEngine): void {
    const W = canvasSize(ctx).w;
    const H = canvasSize(ctx).h;
    const inset = engine.topInset;

    ctx.fillStyle = '#c2185b';
    ctx.fillRect(0, -inset, W, H + inset);
    ctx.save();
    ctx.strokeStyle = 'rgba(255,255,255,0.04)';
    ctx.lineWidth = 1;
    for (let i = -H; i < W + H; i += 16) {
      ctx.beginPath();
      ctx.moveTo(i, -inset);
      ctx.lineTo(i + H, H);
      ctx.stroke();
    }
    ctx.restore();

    const slot = state.slots[state.slotIndex];
    const stage = this.selStage;
    const lv = getStageLevel(state.mode, stage);
    const best = slot?.bestTime[state.mode][stage];
    const cleared = slot?.cleared[state.mode].includes(stage);

    const cardW = Math.min(W * 0.72, 220);
    const cardH = Math.min(H * 0.55, 180);
    const cx = (W - cardW) / 2;
    const cy = (H - cardH) / 2 - 10;

    ctx.fillStyle = '#fff8e7';
    ctx.fillRect(cx, cy, cardW, cardH);
    ctx.strokeStyle = 'rgba(0,0,0,0.06)';
    ctx.lineWidth = 0.5;
    const gridStep = 10;
    for (let x = cx; x <= cx + cardW; x += gridStep) {
      ctx.beginPath(); ctx.moveTo(x, cy); ctx.lineTo(x, cy + cardH); ctx.stroke();
    }
    for (let y = cy; y <= cy + cardH; y += gridStep) {
      ctx.beginPath(); ctx.moveTo(cx, y); ctx.lineTo(cx + cardW, y); ctx.stroke();
    }
    ctx.strokeStyle = '#e0c097';
    ctx.lineWidth = 2;
    ctx.strokeRect(cx, cy, cardW, cardH);

    const centerX = cx + cardW / 2;
    const centerY = cy + cardH / 2;
    if (!cleared) {
      ctx.fillStyle = '#7e57c2';
      ctx.font = `bold ${Math.floor(cardH * 0.55)}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('?', centerX, centerY);
    } else {
      this.drawMiniPreview(ctx, centerX, centerY, cardW * 0.5, cardH * 0.5, state.mode, stage);
    }

    const barH = 28;
    const barY = cy + cardH + 6;
    ctx.fillStyle = 'rgba(255,248,231,0.95)';
    ctx.fillRect(cx, barY, cardW, barH);
    ctx.strokeStyle = '#e0c097';
    ctx.lineWidth = 1;
    ctx.strokeRect(cx, barY, cardW, barH);

    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.font = 'bold 13px sans-serif';
    ctx.fillStyle = LV_COLORS[lv - 1];
    ctx.fillText(`Lv.${lv}`, cx + 10, barY + barH / 2);
    ctx.fillStyle = '#5d4037';
    ctx.font = '13px sans-serif';
    ctx.fillText(`No.${stage}`, cx + 56, barY + barH / 2);

    ctx.textAlign = 'right';
    if (!best) {
      ctx.fillStyle = '#9e9e9e';
      ctx.font = 'bold 14px sans-serif';
      ctx.fillText('???', cx + cardW - 10, barY + barH / 2);
    } else {
      ctx.fillStyle = '#2e7d32';
      ctx.font = 'bold 13px sans-serif';
      ctx.fillText(this.fmtTime(best), cx + cardW - 10, barY + barH / 2);
    }
  }

  // 已通关时的缩略预览
  private drawMiniPreview(
    ctx: CanvasRenderingContext2D,
    cx: number, cy: number,
    w: number, h: number,
    mode: ModeId, stage: number
  ) {
    const entry = getStageDetail(mode, stage);
    if (!entry) {
      ctx.fillStyle = '#a5d6a7';
      ctx.fillRect(cx - w / 2, cy - h / 2, w, h);
      return;
    }
    const gw = entry.w;
    const gh = entry.h;
    const cell = Math.min(w / gw, h / gh);
    const pw = cell * gw;
    const ph = cell * gh;
    const sx = cx - pw / 2;
    const sy = cy - ph / 2;
    const palette = entry.palette;
    for (let y = 0; y < gh; y++) {
      for (let x = 0; x < gw; x++) {
        const c = entry.grid[y * gw + x];
        if (c === 0) continue;
        const col = palette[c];
        if (!col) continue;
        ctx.fillStyle = `rgb(${col[0]},${col[1]},${col[2]})`;
        ctx.fillRect(sx + x * cell, sy + y * cell, cell + 0.5, cell + 0.5);
      }
    }
  }

  // ===== 下屏 =====
  render(ctx: CanvasRenderingContext2D, state: GameState): void {
    const { w, h } = canvasSize(ctx);
    ctx.fillStyle = '#1d1236';
    ctx.fillRect(0, 0, w, h);
    this.renderTopBar(ctx, state, w);
    this.renderGrid(ctx, state, w, h);
    this.renderLevelSlider(ctx, state, w, h);
    this.renderPager(ctx, state, w, h);
  }

  // 顶栏：中间进度，右侧 BACK + START
  private renderTopBar(ctx: CanvasRenderingContext2D, state: GameState, W: number) {
    const barH = 54;
    ctx.fillStyle = '#1f3d56';
    ctx.fillRect(0, 0, W, barH);
    const total = MODE_STAGE_COUNT[state.mode];
    const cleared = state.slots[state.slotIndex]?.cleared[state.mode].length || 0;

    // 中间进度
    drawText(ctx, `${String(cleared).padStart(3, '0')}/${total}`, W / 2, barH / 2, {
      align: 'center',
      color: '#9fc3e8',
      font: '13px sans-serif',
      baseline: 'middle',
    });

    // Back + Start 按钮（右侧并排，加大）
    const btnH = 32;
    const btnW = 64;
    const btnY = (barH - btnH) / 2;
    const gap = 8;
    const rightX = W - btnW * 2 - gap - 10;

    this.backRect = { x: rightX, y: btnY, w: btnW, h: btnH };
    drawButton(ctx, rightX, btnY, btnW, btnH, 'BACK', {
      bg: '#2a1a4e',
      border: '#5a4a8e',
      text: '#cfc3ff',
    }, false);

    const startX = rightX + btnW + gap;
    this.startRect = { x: startX, y: btnY, w: btnW, h: btnH };
    drawButton(ctx, startX, btnY, btnW, btnH, 'START', {
      bg: '#1d4e7a',
      border: '#ffd23f',
      text: '#ffd23f',
    }, true);
  }

  // 关号网格：平滑滚动（多画一行做过渡，clip 可视区）
  private renderGrid(ctx: CanvasRenderingContext2D, state: GameState, W: number, H: number) {
    const gap = 6;
    const sliderW = 42;
    const marginL = 10;
    const marginR = 10 + sliderW;
    const availW = W - marginL - marginR;
    const cell = Math.floor((availW - gap * (this.colsVisible - 1)) / this.colsVisible);
    const pagerH = 30;          // 翻页区高度（压薄）
    const pagerPad = 8;         // 网格与翻页区之间的 padding
    const step = cell + gap;
    const total = MODE_STAGE_COUNT[state.mode];

    const baseStart = Math.floor(this.scrollPos); // 0-based
    const frac = this.scrollPos - baseStart;
    const isScrolling = Math.abs(this.scrollPos - this.targetScroll) > 0.01;

    // 网格可视区（用于 clip）：底部留 padding，不贴到翻页按钮
    const clipTop = this.gridTop - 2;
    const clipBottom = H - pagerH - pagerPad + 2;
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, clipTop, W, clipBottom - clipTop);
    ctx.clip();

    this.gridItems = [];
    const rowsToDraw = this.rowsVisible + 1; // 多画一行补过渡
    for (let r = 0; r < rowsToDraw; r++) {
      for (let c = 0; c < this.colsVisible; c++) {
        const n = baseStart + r * this.colsVisible + c + 1;
        if (n < 1 || n > total) continue;
        const x = marginL + c * step;
        let y = this.gridTop + (r - frac) * step;

        const selected = n === this.selStage && !isScrolling; // 滚动过程中不显示高亮框

        // 完全移出可视区的跳过（性能）
        if (y + cell < clipTop || y > clipBottom) continue;

        const cleared = state.slots[state.slotIndex]?.cleared[state.mode].includes(n);
        const lv = getStageLevel(state.mode, n);

        if (cleared) {
          ctx.fillStyle = this.shadeColor(LV_COLORS[lv - 1], -40);
        } else {
          ctx.fillStyle = '#3a2f55'; // 未通关统一色
        }
        this.roundRect(ctx, x, y, cell, cell, 4);
        ctx.fill();

        if (selected) {
          ctx.strokeStyle = '#ffd23f';
          ctx.lineWidth = 2.5;
          this.roundRect(ctx, x - 1, y - 1, cell + 2, cell + 2, 5);
          ctx.stroke();
        } else {
          ctx.strokeStyle = '#4a4560';
          ctx.lineWidth = 1;
          this.roundRect(ctx, x, y, cell, cell, 4);
          ctx.stroke();
        }

        ctx.fillStyle = '#fff';
        ctx.font = `${cell > 36 ? 13 : 10}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(String(n), x + cell / 2, y + cell / 2);

        if (cleared) {
          ctx.fillStyle = '#66bb6a';
          ctx.font = 'bold 9px sans-serif';
          ctx.textAlign = 'right';
          ctx.fillText('✓', x + cell - 3, y + cell - 2);
        }

        // 命中区始终用 scrollPos 坐标（触摸命中不需要跳变）
        const hitY = this.gridTop + (r - frac) * step;
        this.gridItems.push({ x, y: hitY, w: cell, h: cell, num: n });
      }
    }
    ctx.restore();
  }

  // 右侧难度滑块：外框与网格底部对齐，顶部 LV，左侧 1-5，右侧轨道
  private renderLevelSlider(ctx: CanvasRenderingContext2D, state: GameState, W: number, H: number) {
    const mode = state.mode;
    const total = MODE_STAGE_COUNT[mode];
    const max = this.maxOffset(mode);

    const gap = 6;
    const sw = 42;
    const sx = W - sw - 6;
    const labelH = 18; // 顶部 LV 区
    const numW = 18;   // 左侧数字区
    const availW = W - 10 - (10 + sw);
    const cell = Math.floor((availW - gap * 4) / 5);
    const step = cell + gap;
    const sh = step * 5 - gap; // 与网格同高

    // 外框（与网格对齐：从 gridTop 开始，高度 = sh）
    ctx.fillStyle = '#150b28';
    this.roundRect(ctx, sx, this.gridTop, sw, sh, 8);
    ctx.fill();
    ctx.strokeStyle = '#3a2a5e';
    ctx.lineWidth = 1.2;
    this.roundRect(ctx, sx, this.gridTop, sw, sh, 8);
    ctx.stroke();

    // 顶部 "LV"
    const visStartLv = getStageLevel(mode, Math.floor(this.scrollPos) + 1);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = LV_COLORS[visStartLv - 1];
    ctx.font = 'bold 9px sans-serif';
    ctx.fillText('LV', sx + sw / 2, this.gridTop + labelH / 2);

    // 左侧竖排 1-5（在轨道左侧，不贴边）
    const trackTop = this.gridTop + labelH + 2;
    const trackBot = this.gridTop + sh - 2;
    const segH = (trackBot - trackTop) / 5;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    this.lvRects = [];

    for (let i = 0; i < 5; i++) {
      const lv = i + 1;
      const active = lv === visStartLv;
      const lx = sx + numW / 2 + 2; // 右偏 2px，不贴左边缘
      const ly = trackTop + i * segH + segH / 2;

      ctx.fillStyle = active ? LV_COLORS[i] : '#5a4a7e';
      ctx.font = active ? 'bold 10px sans-serif' : '9px sans-serif';
      ctx.fillText(String(lv), lx, ly);

      this.lvRects.push({
        x: sx,
        y: trackTop + i * segH,
        w: numW,
        h: segH,
      });
    }

    // 右侧滑条轨道（顶部从 label 下方开始，底部与网格对齐）
    const trackW = 10;
    const trackX = sx + sw - trackW - 4;
    const trackH = trackBot - trackTop;

    // 轨道背景
    ctx.fillStyle = '#0d0620';
    this.roundRect(ctx, trackX, trackTop, trackW, trackH, trackW / 2);
    ctx.fill();
    ctx.strokeStyle = '#2a1a4e';
    ctx.lineWidth = 1;
    this.roundRect(ctx, trackX, trackTop, trackW, trackH, trackW / 2);
    ctx.stroke();

    // 滚动进度（0~1），thumb 随滚动动画连续变化
    const progress = max > 0 ? Math.min(1, this.scrollPos / max) : 0;
    const thumbY = trackTop + trackH * progress;
    this.sliderThumbY = thumbY;
    this.sliderTrackRect = { x: sx, y: trackTop, w: sw, h: trackH };

    // 已滚动部分的渐变色填充（黄→橙→红）
    if (progress > 0) {
      const fillH = thumbY - trackTop;
      const grad = ctx.createLinearGradient(trackX, trackTop, trackX, thumbY);
      grad.addColorStop(0, '#ffb703');
      grad.addColorStop(0.5, '#fb8500');
      grad.addColorStop(1, '#e63946');
      ctx.fillStyle = grad;
      this.roundRect(ctx, trackX, trackTop, trackW, fillH, trackW / 2);
      ctx.fill();
    }

    // 白色圆点 thumb
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(trackX + trackW / 2, thumbY, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  // 底部：上下三角（动画滚动）+ 可视区间（紧凑条带，不挡列表）
  private renderPager(ctx: CanvasRenderingContext2D, state: GameState, W: number, H: number) {
    const total = MODE_STAGE_COUNT[state.mode];
    const triSize = 11;
    const pagerH = 30;
    const y = H - pagerH / 2;
    const viewSize = this.rowStep * this.rowsVisible;
    const start = Math.floor(this.scrollPos) + 1;
    const end = Math.min(start + viewSize - 1, total);
    const atBottom = this.targetScroll >= this.maxOffset(state.mode);

    const prevX = W / 2 - 52;
    this.prevRect = { x: prevX - triSize, y: y - triSize, w: triSize * 2, h: triSize * 2 };
    ctx.fillStyle = this.targetScroll > 0 ? '#ffd23f' : '#555';
    this.drawTriangle(ctx, prevX, y, triSize, 'up');

    drawText(ctx, `${start}-${end}`, W / 2, y, {
      align: 'center',
      color: '#cfc3ff',
      font: 'bold 12px sans-serif',
      baseline: 'middle',
    });

    const nextX = W / 2 + 52;
    this.nextRect = { x: nextX - triSize, y: y - triSize, w: triSize * 2, h: triSize * 2 };
    ctx.fillStyle = atBottom ? '#555' : '#ffd23f';
    this.drawTriangle(ctx, nextX, y, triSize, 'down');
  }

  // 最大滚动偏移（0-based，行对齐）
  private maxOffset(mode: ModeId): number {
    const total = MODE_STAGE_COUNT[mode];
    const viewSize = this.rowStep * this.rowsVisible;
    if (total <= viewSize) return 0;
    return Math.ceil((total - viewSize) / this.rowStep) * this.rowStep;
  }

  // ===== 交互 =====
  // 点击格子：已选中则直接进入，未选中则选中
  onStageTap(num: number, engine: PicPicEngine): void {
    if (num === this.selStage) {
      this.enterGame(engine);
    } else {
      this.selStage = num;
    }
  }

  // 直接进入游戏
  private enterGame(engine: PicPicEngine): void {
    const state = engine.state;
    state.puzzleIndex = this.selStage;
    // MAP 模式 = 迷宫走格填色（map_d 0=墙 >0=路径+颜色索引）
    if (state.mode === 'map') {
      engine.state.timeElapsed = 0;
      engine.state.completed = false;
      const ms = new MazeScene(this.selStage);
      engine.replaceHandler(ROM_STATE.ST_GAMING, ms);
      engine.setSubState(ROM_SUBSTATE.SUB_MAIN);
      engine.setState(ROM_STATE.ST_GAMING);
      return;
    }
    const entry = getStageDetail(state.mode, this.selStage);
    if (entry) {
      const puzzle: PuzzleData = { id: entry.id, name: entry.name, w: entry.w, h: entry.h, grid: entry.grid };
      engine.loadPuzzle(puzzle, entry.palette);
      const gs = new GameScene(puzzle);
      engine.replaceHandler(ROM_STATE.ST_GAMING, gs);
      engine.setSubState(ROM_SUBSTATE.SUB_MAIN);
      engine.setState(ROM_STATE.ST_GAMING);
    }
  }

  // 上三角：向上滚一行（动画），选中同步跳到上一行同列
  onPrevTap(state: GameState): void {
    if (this.targetScroll > 0) {
      this.targetScroll = Math.max(0, this.targetScroll - this.rowStep);
      this.selStage = Math.max(1, this.selStage - this.rowStep);
    }
  }

  // 下三角：向下滚一行（动画），选中同步跳到下一行同列
  onNextTap(state: GameState): void {
    const max = this.maxOffset(state.mode);
    const total = MODE_STAGE_COUNT[state.mode];
    if (this.targetScroll < max) {
      this.targetScroll = Math.min(max, this.targetScroll + this.rowStep);
      this.selStage = Math.min(total, this.selStage + this.rowStep);
    }
  }

  // 点难度：跳段 + 同步左列表动画滚动
  onLvTap(lv: number, state: GameState): void {
    const [start] = getLevelRange(state.mode, lv);
    this.targetScroll = Math.min(this.maxOffset(state.mode), Math.floor((start - 1) / this.rowStep) * this.rowStep);
    this.selStage = start;
  }

  // ===== Canvas 触摸命中 =====
  // 按下：滑条轨道记录方向（单击=一步，长按=持续滚动）
  onTouch(x: number, y: number, state: GameState, engine: PicPicEngine): void {
    // 滑条轨道优先（含 thumb 圆点，点击判定方向）
    if (hitTest(x, y, this.sliderTrackRect)) {
      this.sliderDir = y < this.sliderThumbY ? -1 : 1;
      this.sliderHoldTime = 0;
      this.sliderHeld = false;
      return;
    }
    // 难度标签：跳段（动画滚动）
    for (let i = 0; i < this.lvRects.length; i++) {
      if (hitTest(x, y, this.lvRects[i])) {
        this.onLvTap(i + 1, state);
        return;
      }
    }
    // 三角滚动
    if (hitTest(x, y, this.prevRect)) {
      this.onPrevTap(state);
      return;
    }
    if (hitTest(x, y, this.nextRect)) {
      this.onNextTap(state);
      return;
    }
    // Back / Start 按钮
    if (hitTest(x, y, this.backRect)) {
      engine.setSubState(ROM_SUBSTATE.SUB_MAIN);
      engine.setState(ROM_STATE.ST_MODE_SELECT);
      return;
    }
    if (hitTest(x, y, this.startRect)) {
      this.enterGame(engine);
      return;
    }
    // 网格
    for (const it of this.gridItems) {
      if (hitTest(x, y, it)) {
        this.onStageTap(it.num, engine);
        return;
      }
    }
  }

  // 抬起：长按松手立即停止（对齐最近行）；单击移动一步
  onTouchEnd(state: GameState): void {
    if (this.sliderDir === 0) return;
    const max = this.maxOffset(state.mode);
    if (this.sliderHeld) {
      // 长按：松手即停，直接对齐到最近的一行，不再有任何追赶动画
      const row = Math.round(this.scrollPos / this.rowStep) * this.rowStep;
      this.targetScroll = Math.min(max, Math.max(0, row));
      this.scrollPos = this.targetScroll;
    } else {
      // 单击：移动一步，选中同步跳到对应行
      const total = MODE_STAGE_COUNT[state.mode];
      if (this.sliderDir === -1 && this.targetScroll > 0) {
        this.targetScroll = Math.max(0, this.targetScroll - this.rowStep);
        this.selStage = Math.max(1, this.selStage - this.rowStep);
      } else if (this.sliderDir === 1 && this.targetScroll < max) {
        this.targetScroll = Math.min(max, this.targetScroll + this.rowStep);
        this.selStage = Math.min(total, this.selStage + this.rowStep);
      }
    }
    this.sliderDir = 0;
    this.sliderHoldTime = 0;
    this.sliderHeld = false;
  }

  // ===== 工具函数 =====
  private fmtTime(s: number): string {
    const m = Math.floor(s / 60);
    const ss = s % 60;
    return `${m}:${String(ss).padStart(2, '0')}`;
  }

  private roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
    const rr = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + rr, y);
    ctx.lineTo(x + w - rr, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + rr);
    ctx.lineTo(x + w, y + h - rr);
    ctx.quadraticCurveTo(x + w, y + h, x + w - rr, y + h);
    ctx.lineTo(x + rr, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - rr);
    ctx.lineTo(x, y + rr);
    ctx.quadraticCurveTo(x, y, x + rr, y);
    ctx.closePath();
  }

  private drawTriangle(ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number, dir: 'up' | 'down') {
    ctx.beginPath();
    if (dir === 'up') {
      ctx.moveTo(cx, cy - size / 2);
      ctx.lineTo(cx - size * 0.7, cy + size / 2);
      ctx.lineTo(cx + size * 0.7, cy + size / 2);
    } else {
      ctx.moveTo(cx, cy + size / 2);
      ctx.lineTo(cx - size * 0.7, cy - size / 2);
      ctx.lineTo(cx + size * 0.7, cy - size / 2);
    }
    ctx.closePath();
    ctx.fill();
  }

  private shadeColor(hex: string, percent: number): string {
    const num = parseInt(hex.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.max(0, Math.min(255, (num >> 16) + amt));
    const G = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amt));
    const B = Math.max(0, Math.min(255, (num & 0x0000FF) + amt));
    return `rgb(${R},${G},${B})`;
  }
}
