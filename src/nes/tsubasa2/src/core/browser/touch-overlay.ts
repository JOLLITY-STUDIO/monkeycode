// src/core/browser/touch-overlay.ts
//
// CanvasTouchOverlay — 把 TouchController 的 paint 调用画到 canvas 上.
// 浮动摇杆 + 动作按钮反馈 (alpha fade in/out).
//
// 用法:
//   const overlay = new CanvasTouchOverlay(width, height);
//   // 添加 overlay.canvas 到 DOM
//   new TouchController({ target: container, overlay, ... }, cb);

import type { TouchOverlay } from "./touch-controller";

export interface CanvasTouchOverlayOptions {
  /** 屏宽 (px) — 与 target clientWidth 一致 */
  width: number;
  height: number;
  /** 半径缩放因子 (高 DPI 屏幕用, 默认 1) */
  scale?: number;
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
    state: "tap" | "double-tap" | "long-press";
    createdAt: number;
  }> = [];

  private rafHandle?: number;
  private _destroyed = false;

  constructor(options: CanvasTouchOverlayOptions) {
    this.options = {
      scale: 1,
      ...options,
    };
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

  /** 调整 canvas 尺寸 (target resize 时) */
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
    // 不立即清 actions, 让 fade 出去
  }

  paintJoystick(opts: {
    cx: number; cy: number;
    knobX: number; knobY: number;
    radius: number;
    opacity: number;
    direction: number;
  }): void {
    this.currentJoystick = { ...opts, opacity: 1 }; // 重置 opacity 到满
  }

  paintAction(opts: {
    x: number; y: number;
    label: string;
    radius: number;
    opacity: number;
    state: "tap" | "double-tap" | "long-press";
  }): void {
    this.currentActions.push({
      ...opts,
      opacity: 1,
      createdAt: performance.now(),
    });
    // 限制最多 5 个并发, 旧的去掉
    if (this.currentActions.length > 5) {
      this.currentActions.shift();
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

    // ─── 摇杆 ───
    if (this.currentJoystick) {
      // 淡出
      this.currentJoystick.opacity = Math.max(0, this.currentJoystick.opacity - 0.04);
      if (this.currentJoystick.opacity < 0.05) {
        this.currentJoystick = undefined;
      } else {
        this._drawJoystick(this.currentJoystick);
      }
    }

    // ─── 动作按钮 ───
    if (this.currentActions.length > 0) {
      const next: typeof this.currentActions = [];
      for (const a of this.currentActions) {
        const age = now - a.createdAt;
        // tap/double-tap 短: 150ms 显示, 然后 fade
        // long-press 长: 一直显示直至 release
        const lifetime = a.state === "long-press" ? 1200 : 350;
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

  private _drawJoystick(j: NonNullable<typeof this.currentJoystick>): void {
    const ctx = this.ctx;
    const alpha = j.opacity;

    // 基座圈
    ctx.save();
    ctx.globalAlpha = alpha * 0.4;
    ctx.strokeStyle = "#58a6ff";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(j.cx, j.cy, j.radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // 基座内圈 (浅)
    ctx.save();
    ctx.globalAlpha = alpha * 0.2;
    ctx.fillStyle = "#58a6ff";
    ctx.beginPath();
    ctx.arc(j.cx, j.cy, j.radius * 0.85, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 摇杆头
    ctx.save();
    ctx.globalAlpha = alpha * 0.8;
    ctx.fillStyle = "#58a6ff";
    ctx.beginPath();
    ctx.arc(j.knobX, j.knobY, j.radius * 0.35, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 方向指示箭头 (8 个小三角形)
    if (j.direction !== -1) {
      this._drawDirectionArrow(j.cx, j.cy, j.radius * 0.75, j.direction, alpha);
    }
  }

  private _drawDirectionArrow(cx: number, cy: number, r: number, dir: number, alpha: number): void {
    // dir: 0=R, 1=DR, 2=D, 3=DL, 4=L, 5=UL, 6=U, 7=UR
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
    const color = a.state === "long-press" ? "#d29922" : a.state === "double-tap" ? "#f85149" : "#58a6ff";
    const label = a.label;
    const alpha = a.opacity;

    // 圈
    ctx.save();
    ctx.globalAlpha = alpha * 0.6;
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(a.x, a.y, a.radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // 中心填充
    ctx.save();
    ctx.globalAlpha = alpha * 0.4;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(a.x, a.y, a.radius * 0.8, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // label 文字
    if (label !== "?") {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = "#fff";
      ctx.font = "bold 22px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(label, a.x, a.y);
      ctx.restore();
    }
  }
}

export default CanvasTouchOverlay;