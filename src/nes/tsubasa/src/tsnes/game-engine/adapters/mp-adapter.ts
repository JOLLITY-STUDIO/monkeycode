/**
 * ============================================================================
 * WeChat Mini Program Adapter — 微信小程序适配层
 * 
 * WX Mini Program differences:
 *   - Canvas uses wx.createCanvasContext() API (not HTMLCanvasElement)
 *   - Input via wx.onTouchStart/End (no keyboard)
 *   - requestAnimationFrame via setInterval or wx API
 *   - No document or window globals
 * 
 * This adapter provides a drop-in layer isolating platform differences.
 * ============================================================================
 */

import { GameState } from '../core/game-state';
import { GameLoop } from '../core/game-loop';
import { SceneManager } from '../core/scene-manager';
import { InputManager } from '../core/input-manager';
import { CanvasRenderer } from '../render/canvas-renderer';
import { Button, EngineConfig } from '../core/types';
import { getDefaultTileStore } from '../data/chr-tiles';

/**
 * WX Mini Program canvas interface — subset of the real WX API.
 * Mirrors the structure returned by wx.createSelectorQuery().
 */
export interface MpCanvas {
  /** Canvas unique ID (matching <canvas canvas-id="...">) */
  canvasId: string;
  /** Canvas width in px */
  width: number;
  /** Canvas height in px */
  height: number;
  /** WX canvas 2D context */
  getContext(contextType: '2d'): MpCanvasContext | null;
}

/** WX 2D rendering context interface */
export interface MpCanvasContext {
  width: number;
  height: number;
  imageSmoothingEnabled: boolean;
  createImageData(w: number, h: number): ImageData;
  putImageData(imageData: ImageData, x: number, y: number): void;
  drawImage(
    image: MpCanvas | HTMLCanvasElement,
    sx: number, sy: number, sw: number, sh: number,
    dx: number, dy: number, dw: number, dh: number,
  ): void;
  fillStyle: string;
  fillRect(x: number, y: number, w: number, h: number): void;
}

/**
 * Touch event — maps WX touch to NES button.
 * In Mini Program, we draw a virtual gamepad overlay.
 */
export interface MpTouchEvent {
  x: number;
  y: number;
  type: 'start' | 'move' | 'end';
}

export interface MpGameOptions {
  /** WX canvas component */
  canvas: MpCanvas;
  /** Engine config */
  config?: Partial<EngineConfig>;
}

const DEFAULT_CONFIG: EngineConfig = {
  canvasWidth: 512,
  canvasHeight: 480,
  fps: 60,
  debug: false,
  platform: 'miniprogram',
};

/**
 * WeChat Mini Program game adapter.
 * 
 * Key differences from web:
 *   - Uses setInterval instead of requestAnimationFrame
 *   - Maps touch input to virtual gamepad
 *   - Works with WX canvas API
 */
export class MpGameAdapter {
  state: GameState;
  loop: GameLoop;
  sceneManager: SceneManager;
  inputManager: InputManager;
  renderer: CanvasRenderer;
  config: EngineConfig;
  private _timerId: number | null = null;

  constructor(options: MpGameOptions) {
    this.config = { ...DEFAULT_CONFIG, ...options.config };

    // Init tile store
    getDefaultTileStore();

    this.state = new GameState();
    this.inputManager = new InputManager();
    this.loop = new GameLoop(this.state, this.config);
    this.sceneManager = new SceneManager(this.state);

    // Canvas renderer needs HTMLCanvasElement-compatible interface
    // In WX Mini Program, the Canvas behaves similarly enough
    this.renderer = new CanvasRenderer(options.canvas as unknown as HTMLCanvasElement, this.config);

    this.loop.onUpdate = () => this.sceneManager.update();
    this.loop.onRender = () => this.renderer.render(this.state);

    // Boot
    this.sceneManager.boot();
  }

  /** Start the game loop using setInterval (WX has no rAF) */
  start(): void {
    if (this._timerId !== null) return;

    const frameMs = Math.floor(1000 / this.config.fps);
    this._timerId = setInterval(() => {
      // Manually advance frame (same logic as GameLoop._tick)
      this.state.timing.frameCount++;
      this.state.input.pressed =
        (this.state.input.current ^ this.state.input.previous) &
        this.state.input.current;
      this.state.input.previous = this.state.input.current;

      if (this.loop.onUpdate) this.loop.onUpdate();
      if (this.loop.onRender) this.loop.onRender();

      this.state.timing.sceneFrame++;
    }, frameMs) as unknown as number;
  }

  /** Stop the game loop */
  stop(): void {
    if (this._timerId !== null) {
      clearInterval(this._timerId as unknown as number);
      this._timerId = null;
    }
  }

  /**
   * Handle a WX touch event — maps touch position to NES buttons.
   * 
   * Expected touch zones (configurable):
   *   ┌─────────────────────────────┐
   *   │                             │
   *   │       ▲ (UP)                
   *   │   ◄ (L)  ► (R)     [B] [A] │
   *   │       ▼ (DN)                
   *   │                    [SELECT]  │
   *   │          [START]            │
   *   └─────────────────────────────┘
   */
  handleTouch(event: MpTouchEvent): void {
    const { x, y, type } = event;
    const w = this.config.canvasWidth;
    const h = this.config.canvasHeight;

    // Relative positions
    const rx = x / w;
    const ry = y / h;

    let button: Button | null = null;

    // D-Pad zone (left third)
    if (rx < 0.33) {
      if (ry < 0.33) button = Button.UP;
      else if (ry > 0.66) button = Button.DOWN;
      else if (rx < 0.16) button = Button.LEFT;
      else button = Button.RIGHT;
    }
    // Action buttons (right third)
    else if (rx > 0.66) {
      if (ry < 0.5) button = Button.B;
      else button = Button.A;
    }
    // Center buttons
    else {
      if (ry < 0.5) button = Button.START;
      else button = Button.SELECT;
    }

    if (button !== null) {
      if (type === 'start') {
        this.inputManager.pressButton(button, this.state.input);
      } else if (type === 'end') {
        this.inputManager.releaseButton(button, this.state.input);
      }
    }
  }

  /** Set debug mode */
  setDebug(enabled: boolean): void {
    this.config.debug = enabled;
    this.sceneManager.setDebug(enabled);
  }
}

/**
 * Virtual gamepad overlay rendering.
 * Draws touch zones on screen for Mini Program users.
 */
export function renderGamepadOverlay(
  ctx: MpCanvasContext,
  config: EngineConfig,
): void {
  const w = config.canvasWidth;
  const h = config.canvasHeight;

  ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';

  // D-pad cross
  ctx.fillRect(w * 0.13, h * 0.16, w * 0.08, h * 0.33); // Vertical
  ctx.fillRect(w * 0.08, h * 0.22, w * 0.18, h * 0.08); // Horizontal

  // A/B buttons
  ctx.fillStyle = 'rgba(255, 100, 100, 0.15)';
  ctx.fillRect(w * 0.75, h * 0.15, w * 0.12, h * 0.12); // B
  ctx.fillRect(w * 0.85, h * 0.20, w * 0.12, h * 0.12); // A

  // START / SELECT
  ctx.fillStyle = 'rgba(200, 200, 200, 0.1)';
  ctx.fillRect(w * 0.40, h * 0.15, w * 0.08, h * 0.08); // START
  ctx.fillRect(w * 0.40, h * 0.30, w * 0.08, h * 0.08); // SELECT
}
