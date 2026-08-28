// src/option/TouchConfig.ts
//
// 触屏手势重映射配置 — 让玩家自定义 tap/double-tap/long-press 对应 NES 哪个按键.
//
// 与 game 解耦: 只映射 NES Controller.BUTTON_* 枚举, 不涉及具体游戏逻辑.
//
// 选项持久化: localStorage key = `tsubasa2.touchConfig` (JSON 编码)
import Controller from "../core/controller";

/** 手势可绑定的 NES 按键 (不含方向键 — 方向键由摇杆决定) */
export type TouchActionButton =
  | typeof Controller.BUTTON_A
  | typeof Controller.BUTTON_B
  | typeof Controller.BUTTON_SELECT
  | typeof Controller.BUTTON_START;

export interface TouchConfig {
  /** 右手模式 (默认 true). false = 摇杆在右, 动作在左 (左手用户) */
  rightHanded: boolean;
  /** 摇杆死区半径 (px) */
  joystickDeadZone: number;
  /** 摇杆最大半径 (px) */
  joystickMaxRadius: number;
  /** 松手后保持方向多久清零 (ms) */
  directionGraceMs: number;
  /** 长按多久触发 (ms) */
  longPressMs: number;
  /** 双击间隔上限 (ms) */
  doubleTapMs: number;

  /** 右半屏单击 → 哪个按键 (默认 A) */
  tapAction: TouchActionButton;
  /** 右半屏双击 → 哪个按键 (默认 B) */
  doubleTapAction: TouchActionButton;
  /** 右半屏长按 → 哪个按键 (默认 Select) */
  longPressAction: TouchActionButton;
  /** 顶左角短按 → 哪个按键 (默认 Select). 'none' 禁用 */
  leftCornerAction: TouchActionButton | "none";
  /** 顶右角短按 → 哪个按键 (默认 Start). 'none' 禁用 */
  rightCornerAction: TouchActionButton | "none";

  /** 触摸轨迹视觉 (滑动时画轨迹, fade out). 默认 true */
  showTrail: boolean;
  /** 轨迹长度 (点数) */
  trailLength: number;
}

export const DEFAULT_TOUCH_CONFIG: TouchConfig = {
  rightHanded: true,
  joystickDeadZone: 12,
  joystickMaxRadius: 60,
  directionGraceMs: 120,
  longPressMs: 500,
  doubleTapMs: 250,
  tapAction: Controller.BUTTON_A,
  doubleTapAction: Controller.BUTTON_B,
  longPressAction: Controller.BUTTON_SELECT,
  leftCornerAction: Controller.BUTTON_SELECT,
  rightCornerAction: Controller.BUTTON_START,
  showTrail: true,
  trailLength: 20,
};

/** 4 个 NES 按钮的可读 label */
export const TOUCH_ACTION_OPTIONS: { value: TouchActionButton | "none"; label: string }[] = [
  { value: Controller.BUTTON_A,       label: "A (射门/确认)" },
  { value: Controller.BUTTON_B,       label: "B (传球/射门)" },
  { value: Controller.BUTTON_SELECT,  label: "SELECT (菜单)" },
  { value: Controller.BUTTON_START,   label: "START (开始/暂停)" },
];

/** 合并用户 config + 默认值, 缺失字段补默认 + clamp 数值字段 */
export function normalizeTouchConfig(
  cfg: Partial<TouchConfig> | null | undefined,
): TouchConfig {
  const merged: TouchConfig = { ...DEFAULT_TOUCH_CONFIG };
  if (cfg && typeof cfg === "object") {
    for (const k of Object.keys(DEFAULT_TOUCH_CONFIG) as (keyof TouchConfig)[]) {
      const v = (cfg as any)[k];
      if (v !== undefined && v !== null) (merged as any)[k] = v;
    }
  }
  // clamp 数值
  merged.joystickDeadZone = clamp(merged.joystickDeadZone, 2, 50, 12);
  merged.joystickMaxRadius = clamp(merged.joystickMaxRadius, 20, 200, 60);
  merged.directionGraceMs = clamp(merged.directionGraceMs, 0, 500, 120);
  merged.longPressMs = clamp(merged.longPressMs, 200, 1500, 500);
  merged.doubleTapMs = clamp(merged.doubleTapMs, 100, 600, 250);
  merged.trailLength = clamp(merged.trailLength, 5, 60, 20);
  // 校验手势按钮值
  if (!isValidAction(merged.tapAction)) merged.tapAction = Controller.BUTTON_A;
  if (!isValidAction(merged.doubleTapAction)) merged.doubleTapAction = Controller.BUTTON_B;
  if (!isValidAction(merged.longPressAction)) merged.longPressAction = Controller.BUTTON_SELECT;
  if (!isValidActionOrNone(merged.leftCornerAction)) merged.leftCornerAction = Controller.BUTTON_SELECT;
  if (!isValidActionOrNone(merged.rightCornerAction)) merged.rightCornerAction = Controller.BUTTON_START;
  return merged;
}

function clamp(v: any, lo: number, hi: number, dflt: number): number {
  const n = Number(v);
  if (!isFinite(n)) return dflt;
  return Math.max(lo, Math.min(hi, n));
}

function isValidAction(v: any): boolean {
  return v === Controller.BUTTON_A || v === Controller.BUTTON_B
      || v === Controller.BUTTON_SELECT || v === Controller.BUTTON_START;
}

function isValidActionOrNone(v: any): boolean {
  return v === "none" || isValidAction(v);
}

// ════════════════════════════════════════════════════════════════
// TouchConfigStorage — 持久化 + 订阅
// ════════════════════════════════════════════════════════════════

export const TOUCH_CONFIG_STORAGE_KEY = "tsubasa2.touchConfig";

/** 复用 VideoConfigStorage 的 StorageAdapter 接口 (不 import 是为了避免循环依赖) */
export interface TouchStorageAdapter {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key?: string): void;
}

/** 内存兜底 adapter (与 VideoConfigStorage.MemoryStorageAdapter 等价) */
export class MemoryTouchStorageAdapter implements TouchStorageAdapter {
  private store = new Map<string, string>();
  getItem(key: string): string | null { return this.store.has(key) ? this.store.get(key)! : null; }
  setItem(key: string, value: string): void { this.store.set(key, value); }
  removeItem(key?: string): void {
    if (key === undefined) this.store.clear();
    else this.store.delete(key);
  }
}

/** H5 localStorage adapter (供浏览器用) */
export class LocalTouchStorageAdapter implements TouchStorageAdapter {
  getItem(key: string): string | null {
    try {
      if (typeof localStorage === "undefined") return null;
      return localStorage.getItem(key);
    } catch { return null; }
  }
  setItem(key: string, value: string): void {
    try {
      if (typeof localStorage === "undefined") return;
      localStorage.setItem(key, value);
    } catch { /* ignore */ }
  }
  removeItem(key?: string): void {
    try {
      if (typeof localStorage === "undefined") return;
      if (key === undefined) localStorage.clear();
      else localStorage.removeItem(key);
    } catch { /* ignore */ }
  }
}

/**
 * TouchConfigStorage — 持有当前 TouchConfig + 持久化 + onChange 订阅.
 *
 * 用法:
 *   const storage = new TouchConfigStorage(new LocalTouchStorageAdapter());
 *   storage.load();
 *   storage.onChange((cfg) => touchController.applyConfig(cfg));
 *   storage.update({ tapAction: Controller.BUTTON_B });
 */
export class TouchConfigStorage {
  private adapter: TouchStorageAdapter;
  private listeners: ((cfg: TouchConfig) => void)[] = [];
  private _current: TouchConfig;
  public loaded = false;

  constructor(adapter: TouchStorageAdapter, initial?: TouchConfig) {
    this.adapter = adapter;
    this._current = initial ? normalizeTouchConfig(initial) : normalizeTouchConfig(undefined);
  }

  load(): TouchConfig {
    try {
      const raw = this.adapter.getItem(TOUCH_CONFIG_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        this._current = normalizeTouchConfig(parsed);
      }
    } catch (e) {
      console.warn("[TouchConfigStorage] load failed:", e);
    }
    this.loaded = true;
    return this._current;
  }

  get current(): TouchConfig {
    return this._current;
  }

  update(patch: Partial<TouchConfig>): TouchConfig {
    const next = normalizeTouchConfig({ ...this._current, ...patch });
    if (JSON.stringify(next) === JSON.stringify(this._current)) return this._current;
    this._current = next;
    try {
      this.adapter.setItem(TOUCH_CONFIG_STORAGE_KEY, JSON.stringify(next));
    } catch (e) {
      console.warn("[TouchConfigStorage] persist failed:", e);
    }
    this.emit();
    return this._current;
  }

  set(cfg: TouchConfig): TouchConfig {
    const next = normalizeTouchConfig(cfg);
    this._current = next;
    try {
      this.adapter.setItem(TOUCH_CONFIG_STORAGE_KEY, JSON.stringify(next));
    } catch (e) { /* ignore */ }
    this.emit();
    return this._current;
  }

  reset(): TouchConfig {
    return this.set({ /* type-erased empty → normalize → default */ } as TouchConfig);
  }

  onChange(cb: (cfg: TouchConfig) => void): () => void {
    this.listeners.push(cb);
    return () => { this.listeners = this.listeners.filter(l => l !== cb); };
  }

  private emit(): void {
    for (const cb of this.listeners) {
      try { cb(this._current); } catch (e) { console.error("[TouchConfigStorage] listener error:", e); }
    }
  }
}

// ════════════════════════════════════════════════════════════════
// 自动检测: 是否启用触屏?
// ════════════════════════════════════════════════════════════════

/**
 * 自动检测当前环境是否应该启用触屏控制器.
 *  - navigator.maxTouchPoints > 0  (触屏硬件)
 *  - !matchMedia('(pointer:fine)')  (不是精确指针, 即不是鼠标)
 * 满足两个条件 = 触屏设备 (手机/平板).
 *
 * 注意: matchMedia 在 SSR/Node 环境不存在, 需 try/catch.
 */
export function shouldEnableTouch(): boolean {
  try {
    if (typeof navigator === "undefined") return false;
    if ((navigator as any).maxTouchPoints > 0) {
      // 有触屏硬件; 检查指针精度
      if (typeof window !== "undefined" && window.matchMedia) {
        // (pointer:fine) 表示精确指针 (鼠标), 不算触屏
        return !window.matchMedia("(pointer:fine)").matches;
      }
      return true; // 没 matchMedia, 但有触点 → 假设触屏
    }
    return false;
  } catch {
    return false;
  }
}