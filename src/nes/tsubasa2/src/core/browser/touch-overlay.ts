// src/core/browser/touch-overlay.ts
//
// CanvasTouchOverlay — 把 TouchController 的 paint 调用画到 canvas 上.
// 浮动摇杆 + 动作按钮反馈 (alpha fade in/out) + 触摸轨迹 (fade-out 折线).
//
// V0.8: 加 trail 渲染 (per-finger fading polyline).
//
// 用法:
//   const overlay = new CanvasTouchOverlay({ width, height });
//   container.appendChild(overlay.canvas);
//   new TouchController({ target: container, overlay }, { onGesture, onButtonDown/Up });

import type { TouchOverlay, GestureType } from "./touch-controller";

export interface CanvasTouchOverlayOptions {
  width: number;
  height: number;
}

export class CanvasTouchOverlay implements TouchOverlay {
  readonly canvas: HTMLCanvasElement;
  readonly ctx: CanvasRenderingContext2D;
  readonly options: Required<CanvasTouchOverlayOptions>;

  private currentJoystick?: {
    cx: number; cy: number;
    knobX: number; knobY: number;
    radius: number;
    opacity: number;
    direction: number;
  };
  private currentActions: Array<{
    x: number; y: number;
    label: string;
    radius: number;
    opacity: number;
    state: GestureType | "long-press-active";
    createdAt: number;
  }> = [];

  /** trail 数据 (per fingerId). 每帧渲染时读取并 fade */
  private trails = new Map<number, TrailEntry>();

  private rafHandle?: number;
  private _destroyed = false;

  constructor(options: CanvasTouchOverlayOptions) {
    this.options = { ...options };
    this.canvas = document.createElement("canvas");
    this.canvas.width = options.width;
    this.canvas.height = options.height;
    this.canvas.style.cssText = `
      position: absolute;
      top: 0; left: 0;
      pointer-events: none;
      touch-action: none;
      z-index: 10;
    `;
    this.ctx = this.canvas.getContext("2d")!;
    this._loop();
  }

  resize(width: number, height: number): void {
    this.canvas.width = width;
    this.canvas.height = height;
    this.options.width = width;
    this.options.height = height;
  }

  destroy(): void {
    this._destroyed = true;
    if (this.rafHandle) cancelAnimationFrame(this.rafHandle);
    this.canvas.parentNode?.removeChild(this.canvas);
  }

  // ────────────────────────────────────────────
  // TouchOverlay 接口
  // ────────────────────────────────────────────

  clear(): void {
    this.currentJoystick = undefined;
    // trails 不立即清, 让 fade out (松手后再淡 200ms)
    // 但 2s 后仍存在则视为过期
    const now = performance.now();
    for (const [id, t] of this.trails) {
      t.releasingAt = now;
    }
  }

  paintJoystick(opts: {
    cx: number; cy: number;
    knobX: number; knobY: number;
    radius: number;
    opacity: number;
    direction: number;
  }): void {
    this.currentJoystick = { ...opts, opacity: 1 };
  }

  paintAction(opts: {
    x: number; y: number;
    label: string;
    radius: number;
    opacity: number;
    state: GestureType | "long-press-active";
  }): void {
    this.currentActions.push({
      ...opts,
      opacity: 1,
      createdAt: performance.now(),
    });
    if (this.currentActions.length > 5) this.currentActions.shift();
  }

  paintTrail(opts: {
    fingerId: number;
    points: ReadonlyArray<{ x: number; y: number }>;
    opacity: number;
  }): void {
    const existing = this.trails.get(opts.fingerId);
    this.trails.set(opts.fingerId, {
      fingerId: opts.fingerId,
      points: [...opts.points],
      opacity: 1,
      createdAt: existing?.createdAt ?? performance.now(),
      releasingAt: undefined,
    });
  }

  clearTrail(fingerId: number): void {
    const t = this.trails.get(fingerId);
    if (t && !t.releasingAt) {
      t.releasingAt = performance.now();
    }
  }

  // ────────────────────────────────────────────
  // 渲染循环
  // ────────────────────────────────────────────

  private _loop = (): void => {
    if (this._destroyed) return;
    this._render();
    this.rafHandle = requestAnimationFrame(this._loop);
  };

  private _render(): void {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const now = performance.now();

    // ─── Trails (最底层, 在摇杆/动作圈之下) ───
    if (this.trails.size > 0) {
      const toRemove: number[] = [];
      for (const [id, t] of this.trails) {
        // releasingAt 后 200ms 完全消失
        const releasedAt = t.releasingAt;
        if (releasedAt !== undefined && now - releasedAt > 200) {
          toRemove.push(id);
          continue;
        }
        // alpha = 1 → releasing 后 fade 200ms
        const alpha = releasedAt !== undefined
          ? Math.max(0, 1 - (now - releasedAt) / 200)
          : 1;
        if (alpha > 0.02) this._drawTrail(t.points, alpha);
      }
      for (const id of toRemove) this.trails.delete(id);
    }

    // ─── 摇杆 ───
    if (this.currentJoystick) {
      this.currentJoystick.opacity = Math.max(0, this.currentJoystick.opacity - 0.04);
      if (this.currentJoystick.opacity < 0.05) this.currentJoystick = undefined;
      else this._drawJoystick(this.currentJoystick);
    }

    // ─── 动作按钮 ───
    if (this.currentActions.length > 0) {
      const next: typeof this.currentActions = [];
      for (const a of this.currentActions) {
        const age = now - a.createdAt;
        const lifetime = a.state === "long-press" ? 1200
                      : a.state === "long-press-active" ? 9999   // 保持直至 clear
                      : a.state === "double-tap" ? 350
                      : 350;
        const t = age / lifetime;
        if (t < 1.5) {
          a.opacity = Math.max(0, 1 - t);
          next.push(a);
          this._drawAction(a);
        }
      }
      this.currentActions = next;
    }
  }

  private _drawTrail(points: ReadonlyArray<{ x: number; y: number }>, alpha: number): void {
    if (points.length < 2) return;
    const ctx = this.ctx;
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    // 折线 + 渐变粗细 (新点粗, 旧点细) + 渐变 alpha
    for (let i = 1; i < points.length; i++) {
      const t = i / points.length;
      const a = alpha * t;
      ctx.globalAlpha = a;
      ctx.strokeStyle = "#58a6ff";
      ctx.lineWidth = 1 + 5 * t;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(points[i - 1].x, points[i - 1].y);
      ctx.lineTo(points[i].x, points[i].y);
      ctx.stroke();
    }
    // 起点圈 + 终点圆点
    const last = points[points.length - 1];
    ctx.globalAlpha = alpha * 0.9;
    ctx.fillStyle = "#58a6ff";
    ctx.beginPath();
    ctx.arc(last.x, last.y, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  private _drawJoystick(j: NonNullable<typeof this.currentJoystick>): void {
    const ctx = this.ctx;
    const alpha = j.opacity;
    ctx.save();
    ctx.globalAlpha = alpha * 0.4;
    ctx.strokeStyle = "#58a6ff";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(j.cx, j.cy, j.radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.globalAlpha = alpha * 0.2;
    ctx.fillStyle = "#58a6ff";
    ctx.beginPath();
    ctx.arc(j.cx, j.cy, j.radius * 0.85, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.globalAlpha = alpha * 0.8;
    ctx.fillStyle = "#58a6ff";
    ctx.beginPath();
    ctx.arc(j.knobX, j.knobY, j.radius * 0.35, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    if (j.direction !== -1) {
      this._drawDirectionArrow(j.cx, j.cy, j.radius * 0.75, j.direction, alpha);
    }
  }

  private _drawDirectionArrow(cx: number, cy: number, r: number, dir: number, alpha: number): void {
    const angles = [0, 45, 90, 135, 180, 225, 270, 315];
    const angle = (angles[dir] * Math.PI) / 180;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    const ctx = this.ctx;
    ctx.save();
    ctx.globalAlpha = alpha * 0.9;
    ctx.fillStyle = "#3fb950";
    ctx.beginPath();
    ctx.arc(x, y, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  private _drawAction(a: NonNullable<typeof this.currentActions[number]>): void {
    const ctx = this.ctx;
    const color =
      a.state === "long-press" || a.state === "long-press-active" ? "#d29922" :
      a.state === "double-tap" ? "#f85149" :
      "#58a6ff";
    const alpha = a.opacity;

    ctx.save();
    ctx.globalAlpha = alpha * 0.6;
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(a.x, a.y, a.radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.globalAlpha = alpha * 0.4;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(a.x, a.y, a.radius * 0.8, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    if (a.label && a.label !== "?") {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = "#fff";
      ctx.font = "bold 22px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(a.label, a.x, a.y);
      ctx.restore();
    }
  }
}

interface TrailEntry {
  fingerId: number;
  points: { x: number; y: number }[];
  opacity: number;
  createdAt: number;
  releasingAt?: number;
}

export default CanvasTouchOverlay;