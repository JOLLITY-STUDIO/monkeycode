/**
 * 浏览器入口 - 天使之翼 H5
 *
 * 使用方式:
 *   1. 通过 <script type="module"> 引入
 *   2. 通过 new Tsubasa(ctx).start() 启动
 */

import { Tsubasa } from './core/Tsubasa';
import { Button } from './core/types';

// ============================================================
// 全局游戏实例
// ============================================================

(window as any).__tsubasa = null;

// ============================================================
// HTML元素绑定
// ============================================================

function setupHtmlControls(): void {
  const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
  if (!canvas) {
    console.error('Canvas element #game-canvas not found');
    return;
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    console.error('Cannot get 2d context');
    return;
  }

  // 创建游戏实例
  const game = new Tsubasa(ctx, {
    spriteBasePath: '/public/sprites/',
    scale: 2,
    debug: true,
  });

  (window as any).__tsubasa = game;

  // 绑定按钮事件
  const buttonMap: Record<string, Button> = {
    'btn-up': Button.UP,
    'btn-down': Button.DOWN,
    'btn-left': Button.LEFT,
    'btn-right': Button.RIGHT,
    'btn-a': Button.A,
    'btn-b': Button.B,
    'btn-start': Button.START,
    'btn-select': Button.SELECT,
  };

  for (const [id, button] of Object.entries(buttonMap)) {
    const el = document.getElementById(id);
    if (!el) continue;

    // 触摸/鼠标按下
    el.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      game.pressButton(button);
    });

    // 触摸/鼠标释放
    el.addEventListener('pointerup', (e) => {
      e.preventDefault();
      game.releaseButton(button);
    });

    el.addEventListener('pointerleave', (e) => {
      game.releaseButton(button);
    });

    el.addEventListener('pointercancel', (e) => {
      game.releaseButton(button);
    });
  }

  // 启动游戏
  game.start().then(() => {
    console.log('[Main] Game started successfully');
  }).catch((err) => {
    console.error('[Main] Failed to start game:', err);
  });

  // 暴露调试接口
  (window as any).__tsubasa_debug = () => {
    console.log(game.getDebugInfo());
  };

  // FPS 显示
  const fpsEl = document.createElement('div');
  fpsEl.style.cssText = 'position:fixed;top:5px;left:5px;color:#0f0;font:12px monospace;z-index:999';
  document.body.appendChild(fpsEl);

  let fpsUpdateTimer = 0;
  setInterval(() => {
    if (game.getState() === 'running') {
      fpsEl.textContent = `FPS: ${game.getFps()} | Frame: ${game.getFrameCount()} | State: ${game.getCurrentGameState()}`;
    }
  }, 500);
}

// ============================================================
// 启动
// ============================================================

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupHtmlControls);
  } else {
    setupHtmlControls();
  }
}
