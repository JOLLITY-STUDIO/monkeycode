/**
 * Web 浏览器入口
 *
 * 使用方式: <script type="module" src="/src/platform/web/main.ts"></script>
 * 或通过 Vite 自动加载。
 */
import { Tsubasa } from '../../core/Tsubasa';
import { WebPlatform } from './WebPlatform';
import { Button } from '../../core/types';

let game: Tsubasa | null = null;

function setup(): void {
  const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
  if (!canvas) {
    console.error('[Web] Canvas #game-canvas not found');
    return;
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    console.error('[Web] Cannot get 2d context');
    return;
  }

  const platform = new WebPlatform();

  game = new Tsubasa(platform, ctx as any, {
    spriteBasePath: '/sprites/',
    scale: 2,
    debug: true,
  });

  // 暴露到全局
  (window as any).__tsubasa = game;

  // 按钮绑定
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
    el.addEventListener('pointerdown', (e) => { e.preventDefault(); game!.pressButton(button); });
    el.addEventListener('pointerup', (e) => { e.preventDefault(); game!.releaseButton(button); });
    el.addEventListener('pointerleave', () => game!.releaseButton(button));
    el.addEventListener('pointercancel', () => game!.releaseButton(button));
  }

  game.start().then(() => {
    console.log('[Web] Game started');
  }).catch((err) => {
    console.error('[Web] Failed to start game:', err);
  });

  // FPS 显示
  const fpsEl = document.createElement('div');
  fpsEl.style.cssText = 'position:fixed;top:5px;left:5px;color:#0f0;font:12px monospace;z-index:999';
  document.body.appendChild(fpsEl);

  setInterval(() => {
    if (game && game.getState() === 'running') {
      fpsEl.textContent = `FPS: ${game.getFps()} | Frame: ${game.getFrameCount()} | State: ${game.getCurrentGameState()}`;
    }
  }, 500);

  (window as any).__tsubasa_debug = () => {
    console.log(game!.getDebugInfo());
  };
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }
}
