/**
 * UI.ts — Canvas 2D UI 渲染工具
 *
 * 职责: 在 VDP 渲染完的 Canvas 上叠加文字/菜单/面板等 UI 元素
 * 所有渲染都走 Canvas API, 不用 HTML DOM
 *
 * 支持两种渲染方式:
 * - tile: 使用原始像素字体tile渲染 (还原游戏原始风格)
 * - fillText: 使用系统字体渲染 (支持日文假名)
 */

import { FontRenderer, createDefaultFontConfig, createRomFontConfig, DEFAULT_PALETTE, RenderMode } from './FontRenderer.js';

export interface UIRect {
  x: number; y: number; w: number; h: number;
}

export interface TextLine {
  text: string;
  color?: string;
  fontFamily?: string;
}

let fontRenderer: FontRenderer | null = null;
let useRomFont = false;

export function getFontRenderer(): FontRenderer {
  if (!fontRenderer) {
    const config = useRomFont ? createRomFontConfig() : createDefaultFontConfig();
    fontRenderer = new FontRenderer(config, 'fillText');
  }
  return fontRenderer;
}

export function setFontRenderMode(mode: RenderMode): void {
  getFontRenderer().setMode(mode);
}

export function getFontRenderMode(): RenderMode {
  return getFontRenderer().getMode();
}

export function useRomFontConfig(enabled: boolean): void {
  useRomFont = enabled;
  fontRenderer = null;
}

/** 绘制半透明背景面板 */
export function drawPanel(
  ctx: CanvasRenderingContext2D,
  rect: UIRect,
  alpha: number = 0.85,
): void {
  ctx.fillStyle = `rgba(0,0,0,${alpha})`;
  ctx.fillRect(rect.x, rect.y, rect.w, rect.h);

  // 边框
  ctx.strokeStyle = '#555';
  ctx.lineWidth = 1;
  ctx.strokeRect(rect.x + 1, rect.y + 1, rect.w - 2, rect.h - 2);
}

/** 绘制多行文字 */
export function drawTextLines(
  ctx: CanvasRenderingContext2D,
  x: number, y: number,
  lines: TextLine[],
  opts?: {
    fontSize?: number;
    fontFamily?: string;
    lineHeight?: number;
    renderMode?: RenderMode;
  },
): number {
  const fs = opts?.fontSize ?? 11;
  const ff = opts?.fontFamily ?? '"Noto Sans JP", sans-serif';

  const renderer = getFontRenderer();
  const prevMode = renderer.getMode();
  
  if (opts?.renderMode !== undefined) {
    renderer.setMode(opts.renderMode);
  }

  renderer.renderTextLines(ctx, x, y, lines, {
    fontSize: fs,
    fontFamily: ff,
    lineHeight: opts?.lineHeight,
  });

  if (opts?.renderMode !== undefined) {
    renderer.setMode(prevMode);
  }

  return y + lines.length * (opts?.lineHeight ?? (renderer.getMode() === 'tile' ? fs : 14));
}

/** 绘制居中标题 */
export function drawTitle(
  ctx: CanvasRenderingContext2D,
  text: string,
  y: number,
  opts?: { fontSize?: number; color?: string; fontFamily?: string; renderMode?: RenderMode },
): void {
  const fs = opts?.fontSize ?? 14;
  const color = opts?.color ?? '#ff0';
  const ff = opts?.fontFamily ?? '"Noto Sans JP", sans-serif';

  const renderer = getFontRenderer();
  const prevMode = renderer.getMode();
  
  if (opts?.renderMode !== undefined) {
    renderer.setMode(opts.renderMode);
  }

  const w = renderer.measureText(text, fs).width;
  const x = Math.floor((320 - w) / 2);
  
  renderer.renderText(ctx, text, x, y, {
    fontSize: fs,
    fontFamily: ff,
    color,
  });

  if (opts?.renderMode !== undefined) {
    renderer.setMode(prevMode);
  }
}

/** 绘制菜单列表 (带光标指示) */
export function drawMenuList(
  ctx: CanvasRenderingContext2D,
  items: TextLine[],
  cursorIdx: number,
  rect: UIRect,
  opts?: {
    fontSize?: number;
    lineHeight?: number;
    cursorChar?: string;
    cursorColor?: string;
    hiliteColor?: string;
    hiliteBg?: string;
    fontFamily?: string;
    renderMode?: RenderMode;
  },
): void {
  const fs = opts?.fontSize ?? 11;
  const lh = opts?.lineHeight ?? 14;
  const curChar = opts?.cursorChar ?? '▶';
  const curColor = opts?.cursorColor ?? '#ff0';
  const hiliteColor = opts?.hiliteColor ?? '#ff0';
  const hiliteBg = opts?.hiliteBg ?? '#333';
  const ff = opts?.fontFamily ?? '"Noto Sans JP", sans-serif';
  const pad = 4;

  const renderer = getFontRenderer();
  const prevMode = renderer.getMode();
  
  if (opts?.renderMode !== undefined) {
    renderer.setMode(opts.renderMode);
  }

  ctx.textBaseline = 'top';

  for (let i = 0; i < items.length; i++) {
    const cy = rect.y + pad + i * lh;
    const itemFont = items[i].fontFamily ?? ff;

    // 高亮行背景
    if (i === cursorIdx) {
      ctx.fillStyle = hiliteBg;
      ctx.fillRect(rect.x + 2, cy - 1, rect.w - 4, lh);
    }

    // 光标符号
    if (i === cursorIdx) {
      renderer.renderText(ctx, curChar, rect.x + pad, cy, {
        fontSize: fs,
        fontFamily: ff,
        color: curColor,
      });
    }

    // 文字
    const textX = rect.x + pad + (i === cursorIdx ? 14 : 4);
    const textColor = i === cursorIdx ? hiliteColor : (items[i].color ?? '#fff');
    
    renderer.renderText(ctx, items[i].text, textX, cy, {
      fontSize: fs,
      fontFamily: itemFont,
      color: textColor,
    });
  }

  if (opts?.renderMode !== undefined) {
    renderer.setMode(prevMode);
  }
}

/** 绘制底部状态栏 */
export function drawStatusBar(
  ctx: CanvasRenderingContext2D,
  lines: TextLine[],
  opts?: { fontSize?: number; lineHeight?: number; renderMode?: RenderMode },
): void {
  const fs = opts?.fontSize ?? 10;
  const lh = opts?.lineHeight ?? 13;
  const h = lines.length * lh + 6;
  const y = 224 - h;

  ctx.fillStyle = 'rgba(0,0,0,0.7)';
  ctx.fillRect(0, y, 320, h);

  const renderer = getFontRenderer();
  const prevMode = renderer.getMode();
  
  if (opts?.renderMode !== undefined) {
    renderer.setMode(opts.renderMode);
  }

  for (let i = 0; i < lines.length; i++) {
    renderer.renderText(ctx, lines[i].text, 4, y + 3 + i * lh, {
      fontSize: fs,
      fontFamily: '"Noto Sans JP", sans-serif',
      color: lines[i].color ?? '#888',
    });
  }

  if (opts?.renderMode !== undefined) {
    renderer.setMode(prevMode);
  }
}

/** 绘制单行日志叠加 (左上角) */
export function drawLogOverlay(
  ctx: CanvasRenderingContext2D,
  lines: string[],
  opts?: { fontSize?: number; lineHeight?: number; renderMode?: RenderMode },
): void {
  if (lines.length === 0) return;
  const fs = opts?.fontSize ?? 11;
  const lh = opts?.lineHeight ?? 14;

  const textLines: TextLine[] = lines.map(l => ({ text: l, color: '#cfc' }));

  const w = 200;
  const h = textLines.length * lh + 8;
  const x = 2;
  const y = 2;

  ctx.fillStyle = 'rgba(0,0,0,0.7)';
  ctx.fillRect(x, y, w, h);

  const renderer = getFontRenderer();
  const prevMode = renderer.getMode();
  
  if (opts?.renderMode !== undefined) {
    renderer.setMode(opts.renderMode);
  }

  for (let i = 0; i < textLines.length; i++) {
    renderer.renderText(ctx, textLines[i].text, x + 4, y + 4 + i * lh, {
      fontSize: fs,
      fontFamily: '"Noto Sans JP", sans-serif',
      color: textLines[i].color ?? '#fff',
    });
  }

  if (opts?.renderMode !== undefined) {
    renderer.setMode(prevMode);
  }
}
