// Pic Pic 游戏引擎核心 —— 仿 ROM 0x205113c 双层状态机
// 全局结构基址 0x020DEB70: [+0x0c]=SCENE, [+0x14]=SUBSTATE, [+0x28]=STATE
// 状态切换仿 0x2052a00: exit 回调 → 写 STATE → enter 回调
// 主循环仿 0x205113c: 先查 SUBSTATE 再按 STATE 分派

import { ROM_STATE, ROM_SUBSTATE, ModeId, SAVE_SLOT_COUNT } from './rom-states';
import { canvasSize } from './canvas-util';

export interface Vec2 { x: number; y: number }

export interface PuzzleData {
  id: string;
  name: string;
  w: number;
  h: number;
  grid: Uint8Array; // 每像素 4bit 色号（行优先）
  mode?: import('./rom-states').ModeId; // 所属模式（决定玩法分支）
}

export interface PlayerGrid {
  w: number;
  h: number;
  cells: Uint8Array; // 每像素 4bit，0=空白，1..15=颜色
}

// ROM 全局结构（镜像 0x020DEB70 字段）
export interface RomGlobal {
  state: number;      // [+0x28]
  subState: number;   // [+0x14]
  scene: number;      // [+0x0c]
  stateParam: number; // [+0x38]
  widgetSize: number; // [+0x3c]
}

// 存档槽（对应 ROM f_make/ 建档：手绘名字 + 三模式进度）
export interface SaveSlot {
  index: number;
  name: string;                    // 遗留字段（旧版文本名，不再写入；存档名 = icon 手绘）
  icon: Uint8Array | null;         // 手绘"名字"：64x64 1bit nametable（0=白 1=黑，黑白 palette）
  createdAt: number;
  unlocked: Record<ModeId, number>; // 每模式已解锁关卡数（1-based）
  cleared: Record<ModeId, number[]>; // 每模式已通关关号
  bestTime: Record<ModeId, Record<number, number>>; // 每关最短用时(秒)
}

export interface GameState {
  rom: RomGlobal;
  mode: ModeId;        // 当前模式
  slotIndex: number;   // 当前存档槽
  slots: SaveSlot[];   // 5 个存档槽
  puzzleIndex: number; // 当前选中的谜题索引（1-based 关卡号）
  playerGrid: PlayerGrid | null;
  tool: number;        // 0=画笔, 1=橡皮, 2=标记
  palette: number[];   // 16 色 RGB 合并值
  undoStack: Uint8Array[];
  redoStack: Uint8Array[];
  completed: boolean;
  timeElapsed: number;
  result: number;      // 0x2055D9C 完成检查返回值（==2 表示完成）
}

export interface SceneHandler {
  onEnter?(state: GameState, engine: PicPicEngine): void;
  onExit?(state: GameState, engine: PicPicEngine): void;
  update(dt: number, state: GameState, engine: PicPicEngine): void;
  render(ctx: CanvasRenderingContext2D, state: GameState): void;
  // 副屏（NDS 上屏）渲染：可选，缺省由引擎填充背景
  // engine.topInset > 0 时引擎已 translate，内容从状态栏下方开始
  renderTop?(ctx: CanvasRenderingContext2D, state: GameState, engine: PicPicEngine): void;
  onTouch?(x: number, y: number, state: GameState, engine: PicPicEngine): void;
  onTouchMove?(x: number, y: number, state: GameState, engine: PicPicEngine): void;
  onTouchEnd?(state: GameState, engine: PicPicEngine): void;
}

// ===== 小程序环境帧循环兼容 =====
// 小程序无全局 requestAnimationFrame / performance：
// 优先 Canvas 2D 节点 rAF → 全局 rAF → setTimeout(16ms) 回退
function now(): number {
  const g = globalThis as any;
  return typeof g.performance !== 'undefined' ? g.performance.now() : Date.now();
}

function createFrameLooper(ctx: CanvasRenderingContext2D) {
  const canvas = (ctx as any).canvas as any;
  const g = globalThis as any;
  if (canvas && typeof canvas.requestAnimationFrame === 'function') {
    return {
      raf: (cb: (t: number) => void) => canvas.requestAnimationFrame(cb),
      caf: (id: number) => canvas.cancelAnimationFrame(id),
    };
  }
  if (typeof g.requestAnimationFrame === 'function') {
    return {
      raf: (cb: (t: number) => void) => g.requestAnimationFrame(cb),
      caf: (id: number) => g.cancelAnimationFrame(id),
    };
  }
  return {
    raf: (cb: (t: number) => void) =>
      setTimeout(() => cb(Date.now()), 16) as unknown as number,
    caf: (id: number) =>
      clearTimeout(id as unknown as ReturnType<typeof setTimeout>),
  };
}

function emptySlot(index: number): SaveSlot {
  return {
    index,
    name: '',
    icon: null,
    createdAt: 0,
    unlocked: { map: 1, lap: 1, fap: 1 },
    cleared: { map: [], lap: [], fap: [] },
    bestTime: { map: {}, lap: {}, fap: {} },
  };
}

export class PicPicEngine {
  state: GameState;
  ctx: CanvasRenderingContext2D;
  topCtx: CanvasRenderingContext2D | null; // NDS 上屏（显示用，不接收触摸）
  // 上屏顶部安全偏移（系统状态栏高度 px）。仅竖屏时内容下移避开状态栏，横屏引擎自动忽略
  topInset = 0;
  // 状态变化回调（供页面 HUD 同步）
  onStateChange?: (state: GameState) => void;
  private animId: number = 0;
  private lastTime = 0;
  private raf: (cb: (t: number) => void) => number;
  private caf: (id: number) => void;
  // 场景注册表：以 STATE 为 key（对应 ROM 按 STATE 分派）
  private sceneHandlers: Map<number, SceneHandler> = new Map();

  // ===== 场景过渡淡入淡出 =====
  private fadeAlpha = 0;        // 0=无遮盖 1=完全遮盖（fadeColor）
  private fading = false;       // 过渡进行中
  private fadeDir: 1 | -1 = -1; // -1=淡出 1=淡入
  private pendingState: number | null = null; // 淡出完成后切换的目标状态
  private readonly FADE_SPEED = 2; // 每秒 alpha 变化（0.5s 完成单程，全过渡 1s）
  private fadeColor: string;    // 过渡遮盖色（原版 = 白色 fade to white）

  constructor(
    ctx: CanvasRenderingContext2D,
    options?: { fadeColor?: string; topCtx?: CanvasRenderingContext2D }
  ) {
    this.ctx = ctx;
    this.topCtx = options && options.topCtx ? options.topCtx : null;
    this.fadeColor = options && options.fadeColor ? options.fadeColor : '#ffffff';
    const looper = createFrameLooper(ctx);
    this.raf = looper.raf;
    this.caf = looper.caf;
    this.state = {
      rom: {
        state: ROM_STATE.ST_PATH_BUILD, // boot → 0x0B 场景初始化
        subState: ROM_SUBSTATE.SUB_MAIN,
        scene: 0,
        stateParam: 0,
        widgetSize: 0x340,
      },
      mode: 'map',
      slotIndex: 0,
      slots: Array.from({ length: SAVE_SLOT_COUNT }, (_, i) => emptySlot(i)),
      puzzleIndex: 1,
      playerGrid: null,
      tool: 0,
      palette: [],
      undoStack: [],
      redoStack: [],
      completed: false,
      timeElapsed: 0,
      result: 0,
    };
  }

  // ===== 状态切换（仿 0x2052a00） =====
  // 场景切换：淡出 → 切换 → 淡入（由场景主动调用）
  setState(next: number) {
    const cur = this.state.rom.state;
    if (cur === next) return;
    if (this.fading) return; // 过渡中忽略，防止打断
    this.pendingState = next;
    this.fadeDir = -1;
    this.fading = true;
  }

  // 服务状态内部流转：立即切换（无淡入淡出，对应 ROM 内部瞬时流转）
  private swapState(next: number) {
    const cur = this.state.rom.state;
    if (cur === next) return;
    const curH = this.sceneHandlers.get(cur);
    if (curH && curH.onExit) curH.onExit(this.state, this);
    this.state.rom.state = next;
    const nextH = this.sceneHandlers.get(next);
    if (nextH && nextH.onEnter) nextH.onEnter(this.state, this);
    this.onStateChange?.(this.state);
  }

  setSubState(s: number) {
    this.state.rom.subState = s;
  }

  register(state: number, handler: SceneHandler) {
    this.sceneHandlers.set(state, handler);
  }

  // 运行时替换某状态的 handler（如游玩场景按关卡重建）
  replaceHandler(state: number, handler: SceneHandler) {
    this.sceneHandlers.set(state, handler);
  }

  getHandler(state: number): SceneHandler | undefined {
    return this.sceneHandlers.get(state);
  }

  // ===== 主循环（仿 0x205113c 双层分派） =====
  start() {
    this.lastTime = now();
    // 触发初始状态（0x0B PATH_BUILD）的 enter 回调
    const h = this.sceneHandlers.get(this.state.rom.state);
    if (h && h.onEnter) h.onEnter(this.state, this);
    // 启动时从白屏淡入（对应原版亮入）
    this.fadeAlpha = 1;
    this.fading = true;
    this.fadeDir = 1;
    this.loop();
  }

  stop() {
    if (this.animId) this.caf(this.animId);
  }

  private loop = () => {
    const t = now();
    const dt = (t - this.lastTime) / 1000;
    this.lastTime = t;
    this.tick(dt);
    this.animId = this.raf(this.loop);
  };

  private tick(dt: number) {
    const { subState, state } = this.state.rom;
    // 服务状态：无场景渲染，内部流转用 swapState 瞬时切换（对应 ROM 内部流转）
    if (subState === ROM_SUBSTATE.SUB_MAIN && this.processServiceState(state)) {
      this.updateFade(dt);
      return;
    }
    const handler = this.sceneHandlers.get(state);
    if (handler) {
      handler.update(dt, this.state, this);
      handler.render(this.ctx, this.state);
      this.renderSecondary(handler);
    }
    this.updateFade(dt);
    // 每帧通知 HUD 同步（状态/选槽变化）
    this.onStateChange?.(this.state);
  }

  // 副屏（NDS 上屏）渲染：场景可选实现 renderTop，缺省填充统一背景
  private renderSecondary(handler: SceneHandler) {
    const top = this.topCtx;
    if (!top) return;
    const { w, h } = canvasSize(top);
    // 竖屏时上屏内容整体下移避开系统状态栏；横屏（w>h）无状态栏不偏移
    const inset = w < h ? this.topInset : 0;
    top.save();
    if (inset > 0) top.translate(0, inset);
    if (handler.renderTop) {
      handler.renderTop(top, this.state, this);
    } else {
      top.fillStyle = '#1d1236';
      top.fillRect(0, -inset, w, h + inset); // 背景铺满含偏移区
    }
    top.restore();
  }

  // ===== 过渡驱动：淡出 → 切换 → 淡入 =====
  private updateFade(dt: number) {
    if (!this.fading) return;
    if (this.fadeDir === -1) {
      this.fadeAlpha += this.FADE_SPEED * dt;
      if (this.fadeAlpha >= 1) {
        this.fadeAlpha = 1;
        // 淡出完成：真正切换状态
        const next = this.pendingState;
        this.pendingState = null;
        if (next !== null && next !== this.state.rom.state) {
          const curH = this.sceneHandlers.get(this.state.rom.state);
          if (curH && curH.onExit) curH.onExit(this.state, this);
          this.state.rom.state = next;
          const nextH = this.sceneHandlers.get(next);
          if (nextH && nextH.onEnter) nextH.onEnter(this.state, this);
        }
        this.fadeDir = 1; // 开始淡入
      }
    } else {
      this.fadeAlpha -= this.FADE_SPEED * dt;
      if (this.fadeAlpha <= 0) {
        this.fadeAlpha = 0;
        this.fading = false;
      }
    }
    this.drawFadeOverlay();
  }

  private drawFadeOverlay() {
    const a = this.fadeAlpha;
    if (a <= 0) return;
    // 双屏同时覆盖（NDS 上下屏一起亮入亮出）
    this.paintFadeOverlay(this.ctx);
    if (this.topCtx) this.paintFadeOverlay(this.topCtx);
  }

  private paintFadeOverlay(ctx: CanvasRenderingContext2D) {
    const a = this.fadeAlpha;
    if (a <= 0) return;
    const { w, h } = canvasSize(ctx);
    // 默认 fade to white（Pic Pic 原版"亮入亮出"），可通过构造 options.fadeColor 改任意色
    ctx.fillStyle = this.fadeColor;
    ctx.globalAlpha = a;
    ctx.fillRect(0, 0, w, h);
    ctx.globalAlpha = 1;
  }

  // 过渡期间禁止触摸操作
  isFading(): boolean {
    return this.fading;
  }

  // 内部流转状态（对应 ROM: 0x0C→0x12, 0x0E→0x14, 0x10→0x08→0x0D）
  // 注: 0x0B PATH_BUILD 已改为场景状态（BootScene 播放开场后自行切 title）
  private processServiceState(state: number): boolean {
    switch (state) {
      case ROM_STATE.ST_MODE_INIT: // 0x0C: RNG/模式初始化 → mode select
        this.onModeInit();
        this.swapState(ROM_STATE.ST_MODE_SELECT);
        return true;
      case ROM_STATE.ST_RESULT_CHECK: // 0x0E: 完成检查（0x2055D9C）
        this.state.result = this.checkCompleteResult();
        if (this.state.result === 2) {
          this.swapState(ROM_STATE.ST_ACHIEVE);
        } else {
          this.swapState(ROM_STATE.ST_GAMING);
        }
        return true;
      case ROM_STATE.ST_SAVING: // 0x10: 写存档槽 → 0x08
        this.writeSlot();
        this.swapState(ROM_STATE.ST_SLOT_READ);
        return true;
      case ROM_STATE.ST_SLOT_READ: // 0x08: 槽位读取 → 回 state select
        this.readSlot();
        this.swapState(ROM_STATE.ST_STATE_SELECT);
        return true;
      default:
        return false;
    }
  }

  // ===== 服务状态内部逻辑 =====

  // 0x0C 模式初始化（对应 0x2053BF4 RTC 随机 + 0x205418C）
  private onModeInit() {
    this.state.rom.stateParam = 0x65;
  }

  // 0x0E 完成检查（对应 0x2055D9C: 读 widget 结构返回退出码）
  private checkCompleteResult(): number {
    return this.state.completed ? 2 : 0;
  }

  // ===== 存档（对应 ROM 0x2051BE8 写槽 + 0x2051D5C 初始化） =====
  private saveKey = 'picpic_saves_v1';

  // 公开：场景 enter 时读取槽位（对应 0x2051D5C 初始化）
  loadSlotsFromStorageSafe() {
    try {
      const saved = wx.getStorageSync(this.saveKey);
      if (saved && Array.isArray(saved) && saved.length === SAVE_SLOT_COUNT) {
        this.state.slots = saved;
      }
    } catch (e) {
      // 非小程序环境忽略
    }
  }

  // 公开：建档/删除后立即写回
  writeSlotsToStorageSafe() {
    try {
      wx.setStorageSync(this.saveKey, this.state.slots);
    } catch (e) {
      // 非小程序环境忽略
    }
  }

  private writeSlot() {
    const slots = this.state.slots;
    // 记录当前关卡通关
    const slot = slots[this.state.slotIndex];
    if (slot) {
      const n = this.state.puzzleIndex;
      if (!slot.cleared[this.state.mode].includes(n)) {
        slot.cleared[this.state.mode].push(n);
        slot.cleared[this.state.mode].sort((a, b) => a - b);
      }
      const prev = slot.bestTime[this.state.mode][n];
      if (!prev || this.state.timeElapsed < prev) {
        slot.bestTime[this.state.mode][n] = Math.round(this.state.timeElapsed);
      }
      // 解锁下一关
      const next = n + 1;
      if (next > slot.unlocked[this.state.mode]) {
        slot.unlocked[this.state.mode] = next;
      }
    }
    try {
      wx.setStorageSync(this.saveKey, this.state.slots);
    } catch (e) {
      // 非小程序环境忽略
    }
  }

  private readSlot() {
    // 槽位已就绪，回到选关（0x2051D5C 逻辑等价）
  }

  // ===== 玩家操作（与 ROM 玩法一致） =====

  loadPuzzle(puzzle: PuzzleData, palette: number[][]) {
    const cells = new Uint8Array(puzzle.w * puzzle.h);
    this.state.playerGrid = { w: puzzle.w, h: puzzle.h, cells };
    this.state.palette = palette.map(c => (c[0] << 16) | (c[1] << 8) | c[2]);
    this.state.undoStack = [];
    this.state.redoStack = [];
    this.state.completed = false;
    this.state.timeElapsed = 0;
    this.state.result = 0;
  }

  // 涂色/擦除（返回是否实际修改）
  paintCell(x: number, y: number, color: number): boolean {
    const g = this.state.playerGrid;
    if (!g) return false;
    if (x < 0 || x >= g.w || y < 0 || y >= g.h) return false;
    const idx = y * g.w + x;
    if (g.cells[idx] === color) return false;
    g.cells[idx] = color;
    return true;
  }

  beginStroke() {
    const g = this.state.playerGrid;
    if (!g) return;
    this.state.undoStack.push(new Uint8Array(g.cells));
    if (this.state.undoStack.length > 50) this.state.undoStack.shift();
    this.state.redoStack = [];
  }

  undo() {
    if (this.state.undoStack.length === 0) return;
    const prev = this.state.undoStack.pop()!;
    if (this.state.playerGrid) {
      this.state.redoStack.push(new Uint8Array(this.state.playerGrid.cells));
      this.state.playerGrid.cells.set(prev);
    }
  }

  redo() {
    if (this.state.redoStack.length === 0) return;
    const next = this.state.redoStack.pop()!;
    if (this.state.playerGrid) {
      this.state.undoStack.push(new Uint8Array(this.state.playerGrid.cells));
      this.state.playerGrid.cells.set(next);
    }
  }

  // 完成判定：比较 playerGrid 与 puzzle.grid（成功后由 0x0E 状态确认）
  checkComplete(puzzle: PuzzleData): boolean {
    const g = this.state.playerGrid;
    if (!g) return false;
    for (let i = 0; i < g.cells.length; i++) {
      if (g.cells[i] !== puzzle.grid[i]) return false;
    }
    this.state.completed = true;
    return true;
  }

  cssColor(i: number): string {
    const c = this.state.palette[i] || 0;
    const r = (c >> 16) & 0xFF;
    const g = (c >> 8) & 0xFF;
    const b = c & 0xFF;
    return `rgb(${r},${g},${b})`;
  }
}
