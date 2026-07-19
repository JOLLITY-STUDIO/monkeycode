/**
 * InputSystem.ts — 纯 Canvas 2D 绘制虚拟手柄
 *
 * 在小程序 Canvas 上绘制虚拟方向键 + 按钮
 * 不依赖图片资源，全部用 Canvas API 绘制
 */

import { VPadConfig } from '../platform/Platform.js';

/** 虚拟手柄按钮定义 */
export enum VPadButtonIdx {
  UP = 0, DOWN = 1, LEFT = 2, RIGHT = 3,
  A = 4, B = 5, C = 6, START = 7,
}

/** 当前按下的按钮 */
export function drawVirtualPad(
  ctx: CanvasRenderingContext2D,
  config: VPadConfig,
  pressedButtons: number,
): void {
  const { dpad, buttons: btnArea, displaySize } = config;

  const dw = displaySize.w;
  const dh = displaySize.h;

  // 半透明背景遮罩 (不影响游戏画面可读性)
  ctx.save();
  ctx.globalAlpha = 0.6;

  // ---- D-pad (十字键) ----
  const dcx = (dpad.x + dpad.w / 2) * dw;
  const dcy = (dpad.y + dpad.h / 2) * dh;
  const dr = Math.min(dpad.w * dw, dpad.h * dh) * 0.35;

  // 背景圆
  ctx.fillStyle = '#1a1a2e';
  ctx.beginPath();
  ctx.arc(dcx, dcy, dr + 16, 0, Math.PI * 2);
  ctx.fill();

  // 十字方向
  drawDpadArrow(ctx, dcx, dcy - dr * 0.55, dr, 'up',
    (pressedButtons & 0x01) !== 0);
  drawDpadArrow(ctx, dcx, dcy + dr * 0.55, dr, 'down',
    (pressedButtons & 0x02) !== 0);
  drawDpadArrow(ctx, dcx - dr * 0.55, dcy, dr, 'left',
    (pressedButtons & 0x04) !== 0);
  drawDpadArrow(ctx, dcx + dr * 0.55, dcy, dr, 'right',
    (pressedButtons & 0x08) !== 0);

  // ---- 右侧按钮 (A/B/C/START) ----
  const bx = (btnArea.x + btnArea.w * 0.5) * dw;
  const by = (btnArea.y + btnArea.h * 0.5) * dh;
  const bR = 22;
  const btnGap = 8;

  // 2×2 布局 (仿 Genesis 手柄右侧按钮排列, 竖屏调整为列式)
  // A (左上)    B (右上)
  // C (左下)    START (右下)
  drawActionBtn(ctx, bx - bR - btnGap, by - bR - btnGap, 'A', '#e94560',
    (pressedButtons & 0x40) !== 0);
  drawActionBtn(ctx, bx + bR + btnGap, by - bR - btnGap, 'B', '#0f3460',
    (pressedButtons & 0x10) !== 0);
  drawActionBtn(ctx, bx - bR - btnGap, by + bR + btnGap, 'C', '#16213e',
    (pressedButtons & 0x20) !== 0);
  drawActionBtn(ctx, bx + bR + btnGap, by + bR + btnGap, 'START', '#533483',
    (pressedButtons & 0x80) !== 0);

  // 标签
  ctx.font = '10px monospace';
  ctx.fillStyle = '#888';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'bottom';
  ctx.globalAlpha = 0.35;
  ctx.fillText('D-PAD', dcx, dcy - dr - 28);
  ctx.fillText('A/B/C/START', bx - bR - btnGap + 45, by - bR - btnGap - 12);

  ctx.restore();
}

/** 绘制方向键箭头 */
function drawDpadArrow(
  ctx: CanvasRenderingContext2D,
  cx: number, cy: number, r: number,
  dir: 'up' | 'down' | 'left' | 'right',
  pressed: boolean,
): void {
  ctx.fillStyle = pressed ? '#e94560' : '#333355';
  ctx.strokeStyle = pressed ? '#ff6b81' : '#555577';
  ctx.lineWidth = 1.5;

  const s = r * 0.35;
  ctx.beginPath();
  switch (dir) {
    case 'up':
      ctx.moveTo(cx, cy - s * 1.2);
      ctx.lineTo(cx - s * 0.7, cy + s * 0.6);
      ctx.lineTo(cx + s * 0.7, cy + s * 0.6);
      break;
    case 'down':
      ctx.moveTo(cx, cy + s * 1.2);
      ctx.lineTo(cx - s * 0.7, cy - s * 0.6);
      ctx.lineTo(cx + s * 0.7, cy - s * 0.6);
      break;
    case 'left':
      ctx.moveTo(cx - s * 1.2, cy);
      ctx.lineTo(cx + s * 0.6, cy - s * 0.7);
      ctx.lineTo(cx + s * 0.6, cy + s * 0.7);
      break;
    case 'right':
      ctx.moveTo(cx + s * 1.2, cy);
      ctx.lineTo(cx - s * 0.6, cy - s * 0.7);
      ctx.lineTo(cx - s * 0.6, cy + s * 0.7);
      break;
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

/** 绘制动作按钮 (圆形) */
function drawActionBtn(
  ctx: CanvasRenderingContext2D,
  cx: number, cy: number,
  label: string,
  color: string,
  pressed: boolean,
): void {
  const r = 18;

  // 外圆
  ctx.fillStyle = pressed ? '#ffffff' : '#1a1a2e';
  ctx.strokeStyle = pressed ? color : '#444';
  ctx.lineWidth = pressed ? 2.5 : 1.5;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // 内圆 (按下时填充)
  if (pressed) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(cx, cy, r - 5, 0, Math.PI * 2);
    ctx.fill();
  }

  // 标签
  ctx.font = 'bold 13px monospace';
  ctx.fillStyle = pressed ? '#0a0a0a' : '#ccc';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, cx, cy);
}
