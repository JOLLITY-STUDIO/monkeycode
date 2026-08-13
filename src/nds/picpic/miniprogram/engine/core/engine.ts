// Pic Pic 游戏引擎核心 —— 仿 ROM 0x205113c 双层状态机
// 全局结构基址 0x020DEB70: [+0x0c]=SCENE, [+0x14]=SUBSTATE, [+0x28]=STATE
// 状态切换仿 0x2052a00: exit 回调 → 写 STATE → enter 回调
// 主循环仿 0x205113c: 先查 SUBSTATE 再按 STATE 分派

import { ROM_STATE, ROM_SUBSTATE, ModeId, SAVE_SLOT_COUNT } from './rom-states';

export interface Vec2 { x: number; y: number }

export interface PuzzleData {
  id: string;
  name: string;
  w: number;
  h: number;
  grid: Uint8Array; // 每像素 4bit 色号（行优先）
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

// 存档槽（对应 ROM 0x2051D5C 初始化的 5 slots）
export interface SaveSlot {
  index: number;
  name: string;                    // f_make/ 建档命名
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
    createdAt: 0,
    unlocked: { map: 1, lap: 1, fap: 1 },
    cleared: { map: [], lap: [], fap: [] },
    bestTime: { map: {}, lap: {}, fap: {} },
  };
}

export class PicPicEngine {
  state: GameState;
  ctx: CanvasRenderingContext2D;
  private animId: number = 0;
  private lastTime = 0;
  private raf: (cb: (t: number) => void) => number;
  private caf: (id: number) => void;
  // 场景注册表：以 STATE 为 key（对应 ROM 按 STATE 分派）
  private sceneHandlers: Map<number, SceneHandler> = new Map();

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
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
  setState(next: number) {
    const cur = this.state.rom.state;
    if (cur === next) return;
    const curH = this.sceneHandlers.get(cur);
    if (curH && curH.onExit) curH.onExit(this.state, this);
    this.state.rom.state = next;
    const nextH = this.sceneHandlers.get(next);
    if (nextH && nextH.onEnter) nextH.onEnter(this.state, this);
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
    // 服务状态：无场景渲染，立即分派（对应 ROM 内部流转）
    if (subState === ROM_SUBSTATE.SUB_MAIN) {
      if (this.processServiceState(state)) return;
    }
    const handler = this.sceneHandlers.get(state);
    if (handler) {
      handler.update(dt, this.state, this);
      handler.render(this.ctx, this.state);
    }
  }

  // 内部流转状态（对应 ROM: 0x0C→0x12, 0x0E→0x14, 0x10→0x08→0x0D）
  // 注: 0x0B PATH_BUILD 已改为场景状态（BootScene 播放开场后自行切 title）
  private processServiceState(state: number): boolean {
    switch (state) {
      case ROM_STATE.ST_MODE_INIT: // 0x0C: RNG/模式初始化 → mode select
        this.onModeInit();
        this.setState(ROM_STATE.ST_MODE_SELECT);
        return true;
      case ROM_STATE.ST_RESULT_CHECK: // 0x0E: 完成检查（0x2055D9C）
        this.state.result = this.checkCompleteResult();
        if (this.state.result === 2) {
          this.setState(ROM_STATE.ST_ACHIEVE);
        } else {
          this.setState(ROM_STATE.ST_GAMING);
        }
        return true;
      case ROM_STATE.ST_SAVING: // 0x10: 写存档槽 → 0x08
        this.writeSlot();
        this.setState(ROM_STATE.ST_SLOT_READ);
        return true;
      case ROM_STATE.ST_SLOT_READ: // 0x08: 槽位读取 → 回 state select
        this.readSlot();
        this.setState(ROM_STATE.ST_STATE_SELECT);
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
