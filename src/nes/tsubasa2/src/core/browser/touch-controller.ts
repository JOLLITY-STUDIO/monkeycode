// src/core/browser/touch-controller.ts
//
// 通用 NES 触屏控制器 — 把触摸屏手势映射成 NES controller buttons (与具体游戏无关).
//
// 设计原则:
//   1. 零永久 UI — 触摸时浮动出现摇杆/动作, 松手后 fade out
//   2. 多指 — 最多 5 指同时 (左摇杆 + 右动作 + Start 等)
//   3. 容错 — grace period 防止松手误清; dead zone 防止抖动; long-press 长按
//   4. 配置 — 横/竖屏, 左/右手模式, 自定义按钮
//   5. 输出 — 跟 keyboard 一致: onButtonDown(controller, button)
//
// 区域划分 (默认 portrait):
//
//   ┌──────────────────────┐
//   │ ┌──┐              ┌──┐│  Top corners: Select / Start (long-press)
//   │ │SEL            STA││
//   │ └──┘              └──┘│
//   │                      │
//   │  ←─ LEFT 60% ─→     │  Left zone: floating joystick
//   │     (joystick)      │   任意位置触摸 → 浮动摇杆
//   │     drag → 8-way    │   拖动方向决定 UP/DOWN/LEFT/RIGHT
//   │                      │
//   │        ←─ RIGHT 40% ─→│  Right zone: action buttons
//   │           (A / B)    │   单击 = A / 双击 = B / 长按 = Select
//   │                      │
//   └──────────────────────┘
//
// landscape 横屏时: 摇杆全屏底部 1/3, 动作顶部 1/3.
import Controller from "../controller";

export type ButtonId =
  | typeof Controller.BUTTON_A
  | typeof Controller.BUTTON_B
  | typeof Controller.BUTTON_SELECT
  | typeof Controller.BUTTON_START
  | typeof Controller.BUTTON_UP
  | typeof Controller.BUTTON_DOWN
  | typeof Controller.BUTTON_LEFT
  | typeof Controller.BUTTON_RIGHT;

export interface TouchControllerOptions {
  /** 监听的 DOM 元素 (通常是 canvas 容器, 也可 document.body) */
  target: HTMLElement;
  /** 触摸对应哪个 controller (默认 P1 = 1) */
  controller?: 1 | 2;
  /** 横/竖屏 */
  orientation?: "portrait" | "landscape";
  /** 左手模式 (交换左右区域) */
  handedness?: "left" | "right";
  /** 摇杆死区半径 (px), 拖动 < 此值视为中心 */
  joystickDeadZone?: number;
  /** 摇杆最大半径 (px), 超过视为方向键极值 */
  joystickMaxRadius?: number;
  /** 松手后保持方向多久清零 (ms), 防止误清 */
  directionGraceMs?: number;
  /** 长按多久触发 Start/Select (ms) */
  longPressMs?: number;
  /** 双击间隔上限 (ms) */
  doubleTapMs?: number;
  /** 视觉反馈层 (可选, 不传则禁用 visual feedback) */
  overlay?: TouchOverlay;
  /** 调试日志 */
  debug?: boolean;
}

export interface TouchControllerCallbacks {
  onButtonDown: (controller: 1 | 2, button: ButtonId) => void;
  onButtonUp: (controller: 1 | 2, button: ButtonId) => void;
}

/**
 * TouchOverlay — 浮动摇杆 + 动作按钮的视觉反馈层.
 * 由 TouchController 调 paint() 渲染, fade out 由 alpha 控制.
 */
export interface TouchOverlay {
  /** 清除所有视觉 (松手/fade 完成时) */
  clear(): void;
  /** 画浮动摇杆 + 方向指示 */
  paintJoystick(opts: {
    cx: number; cy: number;           // 摇杆基座中心
    knobX: number; knobY: number;     // 摇杆头位置
    radius: number;                   // 基座半径
    opacity: number;                  // 0-1 fade
    direction: number;                // 0-7 (0=右, 2=下, 4=左, 6=上, 1/3/5/7 对角)
  }): void;
  /** 画动作按钮反馈 (单击/双击/长按) */
  paintAction(opts: {
    x: number; y: number;
    label: string;                    // "A" / "B" / "Start" / "Select"
    radius: number;
    opacity: number;
    state: "tap" | "double-tap" | "long-press";
  }): void;
  /** 屏幕边界提示 (zone 区域) - 可选 */
  paintZones?(zones: ReadonlyArray<{ name: string; x: number; y: number; w: number; h: number }>): void;
}

// ════════════════════════════════════════════════════════════════
// 主类
// ════════════════════════════════════════════════════════════════

export class TouchController {
  readonly options: Required<Omit<TouchControllerOptions, "overlay" | "target" | "controller">> & {
    target: HTMLElement;
    controller: 1 | 2;
    overlay?: TouchOverlay;
  };
  private callbacks: TouchControllerCallbacks;

  // 多指追踪: 每个 Touch.identifier 一个 entry
  private fingers = new Map<number, FingerState>();
  // 当前方向 (last applied)
  private currentDirection: number = -1; // -1 = 无方向, 0-7 = NES 8-way
  // 当前 A/B/Start/Select 按下状态
  private buttonState: { A: boolean; B: boolean; Select: boolean; Start: boolean } = {
    A: false, B: false, Select: false, Start: false,
  };

  // grace period timer
  private graceTimer?: number;

  // long-press detector
  private longPressTimer?: number;
  private longPressFingerId?: number;

  // double-tap detector
  private lastTapTime: number = 0;
  private lastTapX: number = 0;
  private lastTapY: number = 0;

  private _destroyed = false;

  constructor(options: TouchControllerOptions, callbacks: TouchControllerCallbacks) {
    this.options = {
      controller: options.controller ?? 1,
      orientation: options.orientation ?? "portrait",
      handedness: options.handedness ?? "right",
      joystickDeadZone: options.joystickDeadZone ?? 12,
      joystickMaxRadius: options.joystickMaxRadius ?? 60,
      directionGraceMs: options.directionGraceMs ?? 120,
      longPressMs: options.longPressMs ?? 500,
      doubleTapMs: options.doubleTapMs ?? 250,
      overlay: options.overlay,
      debug: options.debug ?? false,
      target: options.target,
    };
    this.callbacks = callbacks;

    // 绑定事件 (用 bind 确保 removeEventListener 同一引用)
    this._onTouchStart = this._onTouchStart.bind(this);
    this._onTouchMove = this._onTouchMove.bind(this);
    this._onTouchEnd = this._onTouchEnd.bind(this);
    this._onTouchCancel = this._onTouchCancel.bind(this);
    this._onContextMenu = this._onContextMenu.bind(this);

    options.target.addEventListener("touchstart", this._onTouchStart, { passive: false });
    options.target.addEventListener("touchmove", this._onTouchMove, { passive: false });
    options.target.addEventListener("touchend", this._onTouchEnd, { passive: false });
    options.target.addEventListener("touchcancel", this._onTouchCancel, { passive: false });
    options.target.addEventListener("contextmenu", this._onContextMenu);
  }

  destroy(): void {
    if (this._destroyed) return;
    this._destroyed = true;
    this._releaseAll();
    this.options.target.removeEventListener("touchstart", this._onTouchStart);
    this.options.target.removeEventListener("touchmove", this._onTouchMove);
    this.options.target.removeEventListener("touchend", this._onTouchEnd);
    this.options.target.removeEventListener("touchcancel", this._onTouchCancel);
    this.options.target.removeEventListener("contextmenu", this._onContextMenu);
    if (this.graceTimer) clearTimeout(this.graceTimer);
    if (this.longPressTimer) clearTimeout(this.longPressTimer);
  }

  // ────────────────────────────────────────────
  // 工具方法
  // ────────────────────────────────────────────

  private _dbg(...args: any[]): void {
    if (this.options.debug) {
      // eslint-disable-next-line no-console
      console.log("[TouchController]", ...args);
    }
  }

  /** 转换触摸坐标 → canvas-local 坐标 */
  private _toLocal(t: Touch): { x: number; y: number } {
    const rect = this.options.target.getBoundingClientRect();
    return {
      x: t.clientX - rect.left,
      y: t.clientY - rect.top,
    };
  }

  /**
   * 划分 zone:
   *   joystick zone = 左 (or 右) 一半屏幕
   *   action zone   = 另一半
   *   top corners   = 长按触发 Start/Select
   */
  private _zoneOf(x: number, y: number): "joystick" | "action" | "select-corner" | "start-corner" {
    const w = this.options.target.clientWidth;
    const h = this.options.target.clientHeight;
    // 顶角区域 (10% 宽 × 15% 高) 给 Start/Select 长按
    if (y < h * 0.15) {
      if (x < w * 0.2) return "select-corner";
      if (x > w * 0.8) return "start-corner";
    }
    // 摇杆/动作区域
    const halfX = w * 0.5;
    const isLeftHalf = x < halfX;
    const joystickOnLeft = this.options.handedness === "right"; // 右手模式: 摇杆在左
    return (isLeftHalf === joystickOnLeft) ? "joystick" : "action";
  }

  /** 摇杆起始中心 (触摸落点) */
  private _joystickFingerStart(id: number): { cx: number; cy: number } | null {
    const f = this.fingers.get(id);
    return f?.zone === "joystick" ? { cx: f.startX, cy: f.startY } : null;
  }

  /** 把 (dx, dy) 转 8-way NES 方向 (0-7). -1 = center */
  private _vectorToDirection(dx: number, dy: number): number {
    const len = Math.sqrt(dx * dx + dy * dy);
    if (len < this.options.joystickDeadZone) return -1;
    const angle = Math.atan2(dy, dx);
    // atan2: 0 = 右, π/2 = 下, ±π = 左, -π/2 = 上
    // NES 8-way: 0=Right, 1=DR, 2=Down, 3=DL, 4=Left, 5=UL, 6=Up, 7=UR
    // 量化到 8 个 45° 区间:
    // angle ∈ [-π/8, π/8] → 0 (Right)
    // angle ∈ [π/8, 3π/8] → 1 (Down-Right)
    // angle ∈ [3π/8, 5π/8] → 2 (Down)
    // ...
    const deg = (angle * 180) / Math.PI; // -180..180
    const norm = (deg + 360) % 360; // 0..360
    // NES 顺序: 0=R, 1=DR, 2=D, 3=DL, 4=L, 5=UL, 6=U, 7=UR
    // 把 360° 分 8 段, 每段 45°, 中心 0/45/90/...
    const oct = Math.round(norm / 45) % 8;
    // 修正: NES Up=6 在正上方 (norm ∈ [337.5, 360] ∪ [0, 22.5])
    // 上面计算: norm=0 → 0 (R), 但 norm=337.5 → 7 (UR). 这是对的.
    // 0=R, 1=DR, 2=D, 3=DL, 4=L, 5=UL, 6=U, 7=UR
    return oct;
  }

  /** NES 8-way → 1-4 个 button (UP/DOWN/LEFT/RIGHT) */
  private static readonly DIRECTION_TO_BUTTONS: Record<number, ButtonId[]> = {
    [-1]: [],
    [0]: [Controller.BUTTON_RIGHT],
    [1]: [Controller.BUTTON_RIGHT, Controller.BUTTON_DOWN],
    [2]: [Controller.BUTTON_DOWN],
    [3]: [Controller.BUTTON_LEFT, Controller.BUTTON_DOWN],
    [4]: [Controller.BUTTON_LEFT],
    [5]: [Controller.BUTTON_LEFT, Controller.BUTTON_UP],
    [6]: [Controller.BUTTON_UP],
    [7]: [Controller.BUTTON_RIGHT, Controller.BUTTON_UP],
  };

  /** 应用 8-way direction — 增量式 buttonDown/Up */
  private _applyDirection(newDir: number): void {
    if (newDir === this.currentDirection) return;
    const oldButtons = TouchController.DIRECTION_TO_BUTTONS[this.currentDirection] || [];
    const newButtons = TouchController.DIRECTION_TO_BUTTONS[newDir] || [];
    // release old
    for (const b of oldButtons) {
      if (!newButtons.includes(b)) {
        this._emitUp(b);
      }
    }
    // press new
    for (const b of newButtons) {
      if (!oldButtons.includes(b)) {
        this._emitDown(b);
      }
    }
    this.currentDirection = newDir;
  }

  private _emitDown(b: ButtonId): void {
    this.callbacks.onButtonDown(this.options.controller, b);
  }

  private _emitUp(b: ButtonId): void {
    this.callbacks.onButtonUp(this.options.controller, b);
  }

  // ────────────────────────────────────────────
  // 事件
  // ────────────────────────────────────────────

  private _onTouchStart(e: TouchEvent): void {
    e.preventDefault();
    if (this._destroyed) return;

    for (let i = 0; i < e.changedTouches.length; i++) {
      const t = e.changedTouches[i];
      const local = this._toLocal(t);
      const zone = this._zoneOf(local.x, local.y);
      this.fingers.set(t.identifier, {
        id: t.identifier,
        startX: local.x,
        startY: local.y,
        currentX: local.x,
        currentY: local.y,
        zone,
        startTime: performance.now(),
        moved: false,
      });

      if (zone === "joystick") {
        // 摇杆起始 — 不立即生效方向, 等 move 时再 apply
        this._paintJoystickOverlay(local.x, local.y, local.x, local.y);
      } else if (zone === "action") {
        // 动作区 — 启动长按检测
        this._startLongPress(t.identifier, "Select"); // 长按 action 区 = Select
        this._paintActionOverlay(local.x, local.y, "?", "tap");
      } else if (zone === "select-corner") {
        this._startLongPress(t.identifier, "Select");
      } else if (zone === "start-corner") {
        this._startLongPress(t.identifier, "Start");
      }
    }
  }

  private _onTouchMove(e: TouchEvent): void {
    e.preventDefault();
    if (this._destroyed) return;

    for (let i = 0; i < e.changedTouches.length; i++) {
      const t = e.changedTouches[i];
      const f = this.fingers.get(t.identifier);
      if (!f) continue;
      const local = this._toLocal(t);
      f.currentX = local.x;
      f.currentY = local.y;

      if (f.zone === "joystick") {
        const dx = local.x - f.startX;
        const dy = local.y - f.startY;
        const len = Math.sqrt(dx * dx + dy * dy);
        if (len > 4) f.moved = true;
        // 限制到 maxRadius
        const maxR = this.options.joystickMaxRadius;
        const clampedLen = Math.min(len, maxR);
        const angle = Math.atan2(dy, dx);
        const knobX = f.startX + Math.cos(angle) * clampedLen;
        const knobY = f.startY + Math.sin(angle) * clampedLen;
        const dir = this._vectorToDirection(dx, dy);
        this._applyDirection(dir);
        this._paintJoystickOverlay(f.startX, f.startY, knobX, knobY, dir);
        // 如果用户开始拖动, 取消长按 timer
        if (f.moved && this.longPressFingerId === t.identifier) {
          this._cancelLongPress();
        }
      }
      // action/corner 区: 移动则不算单击 (单击要求 released within same zone, no big move)
      if (f.zone !== "joystick" && Math.abs(local.x - f.startX) + Math.abs(local.y - f.startY) > 20) {
        f.moved = true;
        this._cancelLongPress();
      }
    }
  }

  private _onTouchEnd(e: TouchEvent): void {
    e.preventDefault();
    if (this._destroyed) return;

    for (let i = 0; i < e.changedTouches.length; i++) {
      const t = e.changedTouches[i];
      const f = this.fingers.get(t.identifier);
      if (!f) continue;
      const local = this._toLocal(t);
      const dur = performance.now() - f.startTime;
      const moved = f.moved || Math.abs(local.x - f.startX) + Math.abs(local.y - f.startY) > 20;
      const isTap = !moved && dur < this.options.longPressMs;

      this._cancelLongPress();
      this.fingers.delete(t.identifier);

      if (f.zone === "joystick") {
        // 松开摇杆 — grace period 后清零
        this._scheduleDirectionGrace();
      } else if (isTap) {
        if (f.zone === "action") {
          // 双击检测
          const now = performance.now();
          if (now - this.lastTapTime < this.options.doubleTapMs) {
            // 双击 → B
            this._emitDown(Controller.BUTTON_B);
            this.buttonState.B = true;
            this._paintActionOverlay(local.x, local.y, "B", "double-tap");
            setTimeout(() => {
              this._emitUp(Controller.BUTTON_B);
              this.buttonState.B = false;
            }, 60);
            this.lastTapTime = 0;
          } else {
            // 单击 → A
            this._emitDown(Controller.BUTTON_A);
            this.buttonState.A = true;
            this._paintActionOverlay(local.x, local.y, "A", "tap");
            setTimeout(() => {
              this._emitUp(Controller.BUTTON_A);
              this.buttonState.A = false;
            }, 60);
            this.lastTapTime = now;
            this.lastTapX = local.x;
            this.lastTapY = local.y;
          }
        } else if (f.zone === "start-corner") {
          // 短按 top-right 角落 = Start (常规触发)
          this._emitDown(Controller.BUTTON_START);
          this.buttonState.Start = true;
          setTimeout(() => {
            this._emitUp(Controller.BUTTON_START);
            this.buttonState.Start = false;
          }, 60);
        } else if (f.zone === "select-corner") {
          this._emitDown(Controller.BUTTON_SELECT);
          this.buttonState.Select = true;
          setTimeout(() => {
            this._emitUp(Controller.BUTTON_SELECT);
            this.buttonState.Select = false;
          }, 60);
        }
      }
    }

    // 没有摇杆手指了 → 清除 overlay
    const hasJoystick = Array.from(this.fingers.values()).some(f => f.zone === "joystick");
    if (!hasJoystick) {
      this._scheduleOverlayFade();
    }
  }

  private _onTouchCancel(e: TouchEvent): void {
    this._onTouchEnd(e);
  }

  private _onContextMenu(e: Event): void {
    e.preventDefault();
  }

  // ────────────────────────────────────────────
  // 长按 / Grace period
  // ────────────────────────────────────────────

  private _startLongPress(fingerId: number, button: "Start" | "Select"): void {
    this._cancelLongPress();
    this.longPressFingerId = fingerId;
    this.longPressTimer = window.setTimeout(() => {
      const btn = button === "Start" ? Controller.BUTTON_START : Controller.BUTTON_SELECT;
      const f = this.fingers.get(fingerId);
      if (f) {
        // 长按触发 Start/Select (用触摸点画提示)
        this._paintActionOverlay(f.currentX, f.currentY, button, "long-press");
      }
      this._emitDown(btn);
      // 长按保持按下, 直至松手
      const onEnd = () => {
        this._emitUp(btn);
        this.options.target.removeEventListener("touchend", onEnd, true);
        this.options.target.removeEventListener("touchcancel", onEnd, true);
      };
      this.options.target.addEventListener("touchend", onEnd, true);
      this.options.target.addEventListener("touchcancel", onEnd, true);
      this.longPressTimer = undefined;
      this.longPressFingerId = undefined;
    }, this.options.longPressMs);
  }

  private _cancelLongPress(): void {
    if (this.longPressTimer) {
      clearTimeout(this.longPressTimer);
      this.longPressTimer = undefined;
      this.longPressFingerId = undefined;
    }
  }

  private _scheduleDirectionGrace(): void {
    if (this.graceTimer) clearTimeout(this.graceTimer);
    this.graceTimer = window.setTimeout(() => {
      this._applyDirection(-1);
      this.graceTimer = undefined;
    }, this.options.directionGraceMs);
  }

  // ────────────────────────────────────────────
  // 释放
  // ────────────────────────────────────────────

  private _releaseAll(): void {
    // 释放所有按下的按钮
    if (this.currentDirection !== -1) this._applyDirection(-1);
    if (this.buttonState.A) { this._emitUp(Controller.BUTTON_A); this.buttonState.A = false; }
    if (this.buttonState.B) { this._emitUp(Controller.BUTTON_B); this.buttonState.B = false; }
    if (this.buttonState.Select) { this._emitUp(Controller.BUTTON_SELECT); this.buttonState.Select = false; }
    if (this.buttonState.Start) { this._emitUp(Controller.BUTTON_START); this.buttonState.Start = false; }
    this.fingers.clear();
    if (this.options.overlay) this.options.overlay.clear();
  }

  // ────────────────────────────────────────────
  // Overlay paint 桥接
  // ────────────────────────────────────────────

  private _paintJoystickOverlay(cx: number, cy: number, knobX: number, knobY: number, dir: number = -1): void {
    if (!this.options.overlay) return;
    this.options.overlay.paintJoystick({
      cx, cy, knobX, knobY,
      radius: this.options.joystickMaxRadius,
      opacity: 1,
      direction: dir,
    });
  }

  private _paintActionOverlay(x: number, y: number, label: string, state: "tap" | "double-tap" | "long-press"): void {
    if (!this.options.overlay) return;
    this.options.overlay.paintAction({
      x, y, label,
      radius: 32,
      opacity: 1,
      state,
    });
  }

  private _scheduleOverlayFade(): void {
    // 简单实现: 立即清空 (后续可加 fade 动画)
    if (this.options.overlay) this.options.overlay.clear();
  }
}

// ════════════════════════════════════════════════════════════════
// 内部类型
// ════════════════════════════════════════════════════════════════

interface FingerState {
  id: number;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  zone: "joystick" | "action" | "select-corner" | "start-corner";
  startTime: number;
  moved: boolean;
}

export default TouchController;