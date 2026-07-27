/**
 * ============================================================================
 * Game Loop — replaces the 6502 CPU fetch-decode-execute loop + NMI interrupt
 * 
 * The original NES game ran:
 *   1. Reset → init hardware → jump to main loop
 *   2. Main loop: wait for NMI (vblank) → run game logic → render
 *   3. NMI handler: push registers → process display list → set PPU scroll → RTI
 * 
 * We replace this with a standard requestAnimationFrame game loop:
 *   preFrame() → update() → postFrame() → render()
 * ============================================================================
 */

import { GameState } from './game-state';
import { EngineConfig } from './types';

export class GameLoop {
  state: GameState;
  config: EngineConfig;
  private _running: boolean = false;
  private _rafId: number = 0;
  private _lastTime: number = 0;
  private _accumulator: number = 0;
  private _frameInterval: number;

  /** Update callback — set by scene manager */
  onUpdate: (() => void) | null = null;
  /** Render callback — set by renderer */
  onRender: (() => void) | null = null;

  constructor(state: GameState, config: EngineConfig) {
    this.state = state;
    this.config = config;
    this._frameInterval = 1000 / config.fps;
  }

  start(): void {
    if (this._running) return;
    this._running = true;
    this._lastTime = performance.now();
    this._accumulator = 0;
    this._tick(this._lastTime);
  }

  stop(): void {
    this._running = false;
    if (this._rafId) {
      this._platformCancelFrame(this._rafId);
      this._rafId = 0;
    }
  }

  private _tick = (now: number): void => {
    if (!this._running) return;

    this._rafId = this._platformRequestFrame(this._tick);

    const delta = now - this._lastTime;
    this._lastTime = now;
    this._accumulator += delta;

    while (this._accumulator >= this._frameInterval) {
      this._accumulator -= this._frameInterval;
      this._preFrame();
      this._update();
      this._postFrame();
    }

    this._render();
  };

  /** Called at the start of each frame (like NMI entry) */
  private _preFrame(): void {
    this.state.timing.frameCount++;

    // Process display list (was done in NMI handler)
    this._processDisplayList();

    // Update input state
    this.state.input.pressed =
      (this.state.input.current ^ this.state.input.previous) &
      this.state.input.current;
    this.state.input.previous = this.state.input.current;

    this.state.timing.vblankReady = true;
  }

  /** Main game logic update */
  private _update(): void {
    if (this.onUpdate) {
      this.onUpdate();
    }
  }

  /** End of frame processing (like NMI exit / RTI) */
  private _postFrame(): void {
    this.state.timing.sceneFrame++;
  }

  /** Render to canvas */
  private _render(): void {
    if (this.onRender) {
      this.onRender();
    }
  }

  /** Display list processing — replaced NMI's display list consumer */
  private _processDisplayList(): void {
    // In the original game, the NMI handler reads from $05E8 display list
    // and performs PPU operations (writes to $2006/$2007).
    // This is now a no-op in the pure H5 approach since we render
    // directly each frame from the current state.
    // The display list becomes a "render command queue" for the Canvas renderer.
  }

  // ─── Platform Abstraction ────────────────────────────────

  private _platformRequestFrame(cb: FrameRequestCallback): number {
    if (typeof requestAnimationFrame !== 'undefined') {
      return requestAnimationFrame(cb);
    }
    // Fallback for environments without rAF
    return setTimeout(cb, this._frameInterval) as unknown as number;
  }

  private _platformCancelFrame(id: number): void {
    if (typeof cancelAnimationFrame !== 'undefined') {
      cancelAnimationFrame(id);
    } else {
      clearTimeout(id);
    }
  }
}
