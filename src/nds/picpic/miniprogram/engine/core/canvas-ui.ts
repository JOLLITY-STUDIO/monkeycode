// Canvas 内 UI 工具 —— 取代 DOM HUD（cover-view/view 均不可靠）
// 提供：按钮/面板/文本绘制 + 矩形命中检测，全部在 canvas 内完成渲染与交互

// 圆角矩形路径：arcTo 手写实现，不依赖 roundRect（小程序环境的 roundRect
// 要求 radii 为数组且各端实现不一致，直接绕开）
function rr(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const rad = Math.max(0, Math.min(r, w / 2, h / 2));
  ctx.moveTo(x + rad, y);
  ctx.lineTo(x + w - rad, y);
  ctx.arcTo(x + w, y, x + w, y + rad, rad);
  ctx.lineTo(x + w, y + h - rad);
  ctx.arcTo(x + w, y + h, x + w - rad, y + h, rad);
  ctx.lineTo(x + rad, y + h);
  ctx.arcTo(x, y + h, x, y + h - rad, rad);
  ctx.lineTo(x, y + rad);
  ctx.arcTo(x, y, x + rad, y, rad);
  ctx.closePath();
}

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export function hitTest(px: number, py: number, r: Rect): boolean {
  return px >= r.x && px <= r.x + r.w && py >= r.y && py <= r.y + r.h;
}

export interface BtnStyle {
  bg: string;
  border: string;
  text: string;
  font?: string;
  radius?: number;
}

// 绘制按钮（带边框/圆角/文字），返回按钮矩形便于命中
export function drawButton(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  label: string,
  style: BtnStyle,
  sel = false,
): Rect {
  const r = style.radius !== undefined ? style.radius : 4;
  ctx.save();
  ctx.fillStyle = style.bg;
  ctx.strokeStyle = sel ? '#ffd23f' : style.border;
  ctx.lineWidth = sel ? 2 : 1;
  ctx.beginPath();
  rr(ctx, x, y, w, h, r);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = style.text;
  ctx.font = style.font || '12px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, x + w / 2, y + h / 2 + 1);
  ctx.restore();
  return { x, y, w, h };
}

// 绘制面板（矩形底 + 边框 + 可选标题）
export function drawPanel(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  opts: { bg?: string; border?: string; title?: string; titleColor?: string } = {},
): Rect {
  ctx.save();
  ctx.fillStyle = opts.bg || '#2b1a4d';
  ctx.strokeStyle = opts.border || '#ffd23f';
  ctx.lineWidth = 2;
  ctx.beginPath();
  rr(ctx, x, y, w, h, 6);
  ctx.fill();
  ctx.stroke();
  if (opts.title) {
    ctx.fillStyle = opts.titleColor || '#ffd23f';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(opts.title, x + w / 2, y + 18);
  }
  ctx.restore();
  return { x, y, w, h };
}

// 文本快捷绘制（自动对齐 + 字号）
export function drawText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  opts: {
    align?: 'left' | 'center' | 'right';
    color?: string;
    font?: string;
    bold?: boolean;
    baseline?: 'top' | 'middle' | 'alphabetic';
  } = {},
) {
  ctx.save();
  ctx.fillStyle = opts.color || '#fff';
  ctx.font = opts.font || (opts.bold ? 'bold 14px sans-serif' : '12px sans-serif');
  ctx.textAlign = opts.align || 'left';
  ctx.textBaseline = opts.baseline || 'alphabetic';
  ctx.fillText(text, x, y);
  ctx.restore();
}
