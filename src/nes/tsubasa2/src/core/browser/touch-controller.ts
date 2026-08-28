// src/core/browser/touch-controller.ts
//
// 通用 NES 触屏控制器 — 把触摸屏手势映射成 NES controller buttons (与具体游戏无关).
//
// V0.8: 支持手势重映射 (TouchConfig), 多指手势追踪, trail 渲染钩子.
//
// 设计原则:
//   1. 零永久 UI — 触摸时浮动出现摇杆/动作, 松手后 fade out
//   2. 多指 — 最多 5 指同时 (左摇杆 + 右动作 + Start 等)
//   3. 容错 — grace period 防止松手误清; dead zone 防止抖动; long-press 长按
//   4. 配置 — 横/竖屏, 左/右手模式, 手势→按钮 重映射, trail 切换
//   5. 输出 — 跟 keyboard 一致: onButtonDown(controller, button)
//          同时发 onGesture 给 overlay 显示反馈

import Controller from "../controller";
import type { TouchConfig, TouchActionButton } from "../../option/TouchConfig";

export type ButtonId =
  | typeof Controller.BUTTON_A
  | typeof Controller.BUTTON_B
  | typeof Controller.BUTTON_SELECT
  | typeof Controller.BUTTON_START
  | typeof Controller.BUTTON_UP
  | typeof Controller.BUTTON_DOWN
  | typeof Controller.BUTTON_LEFT
  | typeof Controller.BUTTON_RIGHT;

/** 手势事件 (overlay 用来显示标签 + 视觉反馈) */
export type GestureType = "tap" | "double-tap" | "long-press" | "corner-tap";

export interface TouchControllerOptions {
  /** 监听的 DOM 元素 (通常是 canvas 容器) */
  target: HTMLElement;
  /** 触摸对应哪个 controller (默认 P1 = 1) */
  controller?: 1 | 2;
  /** 触屏配置 (手势重映射, dead zone 等). 不传则用默认 */
  config?: TouchConfig;
  /** 视觉反馈层 */
  overlay?: TouchOverlay;
  /** 调试日志 */
  debug?: boolean;
}

export interface TouchControllerCallbacks {
  onButtonDown: (controller: 1 | 2, button: ButtonId) => void;
  onButtonUp: (controller: 1 | 2, button: ButtonId) => void;
  /** 手势事件: 给 overlay 用, 显示 label/visual */
  onGesture?: (gesture: GestureType, x: number, y: number, button: ButtonId) => void;
}

// ════════════════════════════════════════════════════════════════
// TouchOverlay 接口 (扩展: trail)
// ════════════════════════════════════════════════════════════════

export interface TouchOverlay {
  clear(): void;
  paintJoystick(opts: {
    cx: number; cy: number;
    knobX: number; knobY: number;
    radius: number;
    opacity: number;
    direction: number;
  }): void;
  paintAction(opts: {
    x: number; y: number;
    label: string;
    radius: number;
    opacity: number;
    state: GestureType | "long-press-active";
  }): void;
  /** 触摸轨迹 (fade-out 折线, 给玩家瞄准感) */
  paintTrail?(opts: {
    fingerId: number;
    points: ReadonlyArray<{ x: number; y: number }>;
    opacity: number;
  }): void;
  /** 清除指定 finger 的 trail */
  clearTrail?(fingerId: number): void;
}

// ════════════════════════════════════════════════════════════════
// 主类
// ════════════════════════════════════════════════════════════════

export class TouchController {
  readonly options: Required<Omit<TouchControllerOptions, "overlay" | "target" | "controller" | "config">> & {
    target: HTMLElement;
    controller: 1 | 2;
    config: TouchConfig;
    overlay?: TouchOverlay;
  };
  private callbacks: TouchControllerCallbacks;

  private fingers = new Map<number, FingerState>();
  private currentDirection: number = -1;
  /** 长按期间保持按下的按钮 (long-press 时不会自然松手, 需 finger up 时清) */
  private longPressHeldButton: ButtonId | null = null;

  private graceTimer?: number;
  private longPressTimer?: number;
  private longPressFingerId?: number;

  private lastTapTime: number = 0;
  private lastTapX: number = 0;
  private lastTapY: number = 0;

  private _destroyed = false;

  constructor(options: TouchControllerOptions, callbacks: TouchControllerCallbacks) {
    this.options = {
      controller: options.controller ?? 1,
      config: options.config ?? this._defaultConfig(),
      overlay: options.overlay,
      debug: options.debug ?? false,
      target: options.target,
    };
    this.callbacks = callbacks;

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

  /** 热更新 TouchConfig (TouchConfigStorage.onChange → 这里) */
  applyConfig(cfg: TouchConfig): void {
    this.options.config = cfg;
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

  private _defaultConfig(): TouchConfig {
    // 懒加载, 避免循环依赖
    return {
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
  }

  // ────────────────────────────────────────────
  // 工具
  // ────────────────────────────────────────────

  private _dbg(...args: any[]): void {
    if (this.options.debug) {
      // eslint-disable-next-line no-console
      console.log("[TouchController]", ...args);
    }
  }

  private _toLocal(t: Touch): { x: number; y: number } {
    const rect = this.options.target.getBoundingClientRect();
    return { x: t.clientX - rect.left, y: t.clientY - rect.top };
  }

  private _zoneOf(x: number, y: number): "joystick" | "action" | "select-corner" | "start-corner" {
    const w = this.options.target.clientWidth;
    const h = this.options.target.clientHeight;
    if (y < h * 0.15) {
      if (x < w * 0.2) return "select-corner";
      if (x > w * 0.8) return "start-corner";
    }
    const halfX = w * 0.5;
    const isLeftHalf = x < halfX;
    const joystickOnLeft = this.options.config.rightHanded;
    return (isLeftHalf === joystickOnLeft) ? "joystick" : "action";
  }

  private _vectorToDirection(dx: number, dy: number): number {
    const len = Math.sqrt(dx * dx + dy * dy);
    if (len < this.options.config.joystickDeadZone) return -1;
    const norm = ((Math.atan2(dy, dx) * 180) / Math.PI + 360) % 360;
    return Math.round(norm / 45) % 8;
  }

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

  private _applyDirection(newDir: number): void {
    if (newDir === this.currentDirection) return;
    const oldButtons = TouchController.DIRECTION_TO_BUTTONS[this.currentDirection] || [];
    const newButtons = TouchController.DIRECTION_TO_BUTTONS[newDir] || [];
    for (const b of oldButtons) {
      if (!newButtons.includes(b)) this._emitUp(b);
    }
    for (const b of newButtons) {
      if (!oldButtons.includes(b)) this._emitDown(b);
    }
    this.currentDirection = newDir;
  }

  private _emitDown(b: ButtonId): void {
    this.callbacks.onButtonDown(this.options.controller, b);
  }

  private _emitUp(b: ButtonId): void {
    this.callbacks.onButtonUp(this.options.controller, b);
  }

  private _emitGesture(type: GestureType, x: number, y: number, button: ButtonId): void {
    if (this.callbacks.onGesture) this.callbacks.onGesture(type, x, y, button);
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
      const f: FingerState = {
        id: t.identifier,
        startX: local.x,
        startY: local.y,
        currentX: local.x,
        currentY: local.y,
        zone,
        startTime: performance.now(),
        moved: false,
        trail: this.options.config.showTrail ? [{ x: local.x, y: local.y }] : [],
      };
      this.fingers.set(t.identifier, f);

      if (zone === "joystick") {
        this._paintJoystickOverlay(local.x, local.y, local.x, local.y);
      } else if (zone === "action") {
        const cfg = this.options.config;
        if (cfg.longPressAction) {
          this._startLongPress(t.identifier, cfg.longPressAction as ButtonId);
        }
      } else if (zone === "select-corner") {
        if (this.options.config.leftCornerAction !== "none") {
          this._startLongPress(t.identifier, this.options.config.leftCornerAction as ButtonId);
        }
      } else if (zone === "start-corner") {
        if (this.options.config.rightCornerAction !== "none") {
          this._startLongPress(t.identifier, this.options.config.rightCornerAction as ButtonId);
        }
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
      const cfg = this.options.config;

      if (f.zone === "joystick") {
        const dx = local.x - f.startX;
        const dy = local.y - f.startY;
        const len = Math.sqrt(dx * dx + dy * dy);
        if (len > 4) f.moved = true;
        const maxR = cfg.joystickMaxRadius;
        const clampedLen = Math.min(len, maxR);
        const angle = Math.atan2(dy, dx);
        const knobX = f.startX + Math.cos(angle) * clampedLen;
        const knobY = f.startY + Math.sin(angle) * clampedLen;
        const dir = this._vectorToDirection(dx, dy);
        this._applyDirection(dir);
        this._paintJoystickOverlay(f.startX, f.startY, knobX, knobY, dir);
        if (f.moved && this.longPressFingerId === t.identifier) this._cancelLongPress();
      }
      if (f.zone !== "joystick" && Math.abs(local.x - f.startX) + Math.abs(local.y - f.startY) > 20) {
        f.moved = true;
        this._cancelLongPress();
      }
      // trail 更新
      if (f.trail) {
        f.trail.push({ x: local.x, y: local.y });
        const maxLen = cfg.trailLength;
        if (f.trail.length > maxLen) f.trail = f.trail.slice(f.trail.length - maxLen);
        if (this.options.overlay?.paintTrail) {
          this.options.overlay.paintTrail({
            fingerId: f.id,
            points: f.trail,
            opacity: 1,
          });
        }
      }
    }
  }

  private _onTouchEnd(e: TouchEvent): void {
    e.preventDefault();
    if (this._destroyed) return;

    const cfg = this.options.config;
    for (let i = 0; i < e.changedTouches.length; i++) {
      const t = e.changedTouches[i];
      const f = this.fingers.get(t.identifier);
      if (!f) continue;
      const local = this._toLocal(t);
      const dur = performance.now() - f.startTime;
      const moved = f.moved || Math.abs(local.x - f.startX) + Math.abs(local.y - f.startY) > 20;
      const isTap = !moved && dur < cfg.longPressMs;

      this._cancelLongPress();
      this.fingers.delete(t.identifier);

      // long-press held button (set in _startLongPress timeout)
      if (this.longPressHeldButton !== null && this.longPressHeldButton !== undefined) {
        this._emitUp(this.longPressHeldButton);
        this.longPressHeldButton = null;
      }

      if (f.zone === "joystick") {
        this._scheduleDirectionGrace();
      } else if (isTap) {
        if (f.zone === "action") {
          const now = performance.now();
          if (now - this.lastTapTime < cfg.doubleTapMs) {
            // double-tap
            this._tapButton(cfg.doubleTapAction as ButtonId, "double-tap", local.x, local.y);
            this.lastTapTime = 0;
          } else {
            // single tap
            this._tapButton(cfg.tapAction as ButtonId, "tap", local.x, local.y);
            this.lastTapTime = now;
            this.lastTapX = local.x;
            this.lastTapY = local.y;
          }
        } else if (f.zone === "start-corner") {
          if (cfg.rightCornerAction !== "none") {
            this._tapButton(cfg.rightCornerAction as ButtonId, "corner-tap", local.x, local.y);
          }
        } else if (f.zone === "select-corner") {
          if (cfg.leftCornerAction !== "none") {
            this._tapButton(cfg.leftCornerAction as ButtonId, "corner-tap", local.x, local.y);
          }
        }
      }

      // 清除 trail
      if (this.options.overlay?.clearTrail) {
        this.options.overlay.clearTrail(f.id);
      }
    }

    const hasJoystick = Array.from(this.fingers.values()).some(f => f.zone === "joystick");
    if (!hasJoystick) this._scheduleOverlayFade();
  }

  private _onTouchCancel(e: TouchEvent): void {
    this._onTouchEnd(e);
  }

  private _onContextMenu(e: Event): void {
    e.preventDefault();
  }

  // ────────────────────────────────────────────
  // 动作按钮 (单击/双击/角点单击)
  // ────────────────────────────────────────────

  private _tapButton(button: ButtonId, gesture: GestureType, x: number, y: number): void {
    this._emitDown(button);
    this._emitGesture(gesture, x, y, button);
    // 60ms 后自动 up
    setTimeout(() => this._emitUp(button), 60);
  }

  // ────────────────────────────────────────────
  // 长按
  // ────────────────────────────────────────────

  private _startLongPress(fingerId: number, button: ButtonId): void {
    this._cancelLongPress();
    this.longPressFingerId = fingerId;
    this.longPressTimer = window.setTimeout(() => {
      const f = this.fingers.get(fingerId);
      if (f) {
        this._emitDown(button);
        this.longPressHeldButton = button;
        this._emitGesture("long-press", f.currentX, f.currentY, button);
      }
      this.longPressTimer = undefined;
      this.longPressFingerId = undefined;
    }, this.options.config.longPressMs);
  }

  private _cancelLongPress(): void {
    if (this.longPressTimer) {
      clearTimeout(this.longPressTimer);
      this.longPressTimer = undefined;
      this.longPressFingerId = undefined;
    }
  }

  // ────────────────────────────────────────────
  // Grace / Fade
  // ────────────────────────────────────────────

  private _scheduleDirectionGrace(): void {
    if (this.graceTimer) clearTimeout(this.graceTimer);
    this.graceTimer = window.setTimeout(() => {
      this._applyDirection(-1);
      this.graceTimer = undefined;
    }, this.options.config.directionGraceMs);
  }

  private _scheduleOverlayFade(): void {
    if (this.options.overlay) this.options.overlay.clear();
  }

  // ────────────────────────────────────────────
  // 释放
  // ────────────────────────────────────────────

  private _releaseAll(): void {
    if (this.currentDirection !== -1) this._applyDirection(-1);
    if (this.longPressHeldButton !== null && this.longPressHeldButton !== undefined) {
      this._emitUp(this.longPressHeldButton);
      this.longPressHeldButton = null;
    }
    this.fingers.clear();
    if (this.options.overlay) this.options.overlay.clear();
  }

  // ────────────────────────────────────────────
  // Overlay
  // ────────────────────────────────────────────

  private _paintJoystickOverlay(cx: number, cy: number, knobX: number, knobY: number, dir: number = -1): void {
    if (!this.options.overlay) return;
    this.options.overlay.paintJoystick({
      cx, cy, knobX, knobY,
      radius: this.options.config.joystickMaxRadius,
      opacity: 1,
      direction: dir,
    });
  }

  // ────────────────────────────────────────────
  // 暴露给 caller (e.g. overlay 想知道当前 trail)
  // ────────────────────────────────────────────

  /** 取所有活跃手指的 trail (snapshot) */
  getTrails(): ReadonlyArray<{ fingerId: number; points: ReadonlyArray<{ x: number; y: number }> }> {
    const result: { fingerId: number; points: ReadonlyArray<{ x: number; y: number }> }[] = [];
    for (const f of this.fingers.values()) {
      if (f.trail && f.trail.length > 1) {
        result.push({ fingerId: f.id, points: f.trail });
      }
    }
    return result;
  }
}

interface FingerState {
  id: number;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  zone: "joystick" | "action" | "select-corner" | "start-corner";
  startTime: number;
  moved: boolean;
  trail?: { x: number; y: number }[];
}

export default TouchController;