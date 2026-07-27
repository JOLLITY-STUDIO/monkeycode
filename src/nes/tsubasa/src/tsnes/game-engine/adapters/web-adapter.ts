/**
 * ============================================================================
 * Web Browser Adapter — wires GameLoop + CanvasRenderer + InputManager
 * 
 * Entry point for the standalone HTML5 game.
 * 
 * Usage:
 *   import { startWebGame } from './game-engine/adapters/web-adapter';
 *   <canvas id="game-canvas" width="512" height="480"></canvas>
 *   startWebGame(document.getElementById('game-canvas'));
 * ============================================================================
 */

import { GameState } from '../core/game-state';
import { GameLoop } from '../core/game-loop';
import { SceneManager } from '../core/scene-manager';
import { InputManager } from '../core/input-manager';
import { CanvasRenderer } from '../render/canvas-renderer';
import { EngineConfig } from '../core/types';
import { getDefaultTileStore } from '../data/chr-tiles';

export interface WebGameOptions {
  /** Canvas element */
  canvas: HTMLCanvasElement;
  /** Engine config (optional, defaults provided) */
  config?: Partial<EngineConfig>;
  /** Auto-start after creation (default: true) */
  autoStart?: boolean;
}

const DEFAULT_CONFIG: EngineConfig = {
  canvasWidth: 512,
  canvasHeight: 480,
  fps: 60,
  debug: false,
  platform: 'web',
};

export class WebGameAdapter {
  state: GameState;
  loop: GameLoop;
  sceneManager: SceneManager;
  inputManager: InputManager;
  renderer: CanvasRenderer;
  config: EngineConfig;

  constructor(options: WebGameOptions) {
    const { canvas, autoStart } = options;
    this.config = { ...DEFAULT_CONFIG, ...options.config };

    // Init tile store (must happen before renderer creation)
    getDefaultTileStore();

    // Create game state
    this.state = new GameState();

    // Create subsystems
    this.inputManager = new InputManager();
    this.loop = new GameLoop(this.state, this.config);
    this.sceneManager = new SceneManager(this.state);
    this.renderer = new CanvasRenderer(canvas, this.config);

    // Wire up callbacks
    this.loop.onUpdate = () => this.sceneManager.update();
    this.loop.onRender = () => this.renderer.render(this.state);

    // Bind keyboard input
    this._bindKeyboard();

    // Boot the game
    this.sceneManager.boot();

    // Start game loop
    if (autoStart !== false) {
      this.loop.start();
    }
  }

  /** Bind keyboard events */
  private _bindKeyboard(): void {
    const onKeyDown = (e: KeyboardEvent) => {
      this.inputManager.handleKeyDown(e, this.state.input);
    };
    const onKeyUp = (e: KeyboardEvent) => {
      this.inputManager.handleKeyUp(e, this.state.input);
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
  }

  /** Stop the game loop */
  stop(): void { this.loop.stop(); }

  /** Resume the game loop */
  start(): void { this.loop.start(); }

  /** Get current FPS */
  get fps(): number { return this.config.fps; }

  /** Toggle debug mode */
  setDebug(enabled: boolean): void {
    this.config.debug = enabled;
    this.sceneManager.setDebug(enabled);
  }
}

/** Shortcut: create and start a web game */
export function startWebGame(options: WebGameOptions): WebGameAdapter {
  return new WebGameAdapter(options);
}
