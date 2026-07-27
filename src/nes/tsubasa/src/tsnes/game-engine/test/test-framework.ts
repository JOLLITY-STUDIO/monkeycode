/**
 * ============================================================================
 * Headless Test Framework — for validating game logic without rendering
 * 
 * Provides:
 *   1. Frame-by-frame input scripting (record/replay)
 *   2. State assertion helpers
 *   3. Scene progression tracking
 *   4. Regression testing against known reference states
 * 
 * Compatible with both Node.js and Mini Program test environments.
 * ============================================================================
 */

import { GameState } from '../core/game-state';
import { GameLoop } from '../core/game-loop';
import { SceneManager } from '../core/scene-manager';
import { InputManager } from '../core/input-manager';
import { Button, EngineConfig } from '../core/types';

/** A single frame's input + expected state change */
export interface TestFrame {
  /** Frame number */
  frame: number;
  /** Buttons to press this frame */
  press?: Button[];
  /** Buttons to release this frame */
  release?: Button[];
  /** Expected scene ID after this frame (optional) */
  expectSceneId?: number;
  /** Expected dispatch index after this frame (optional) */
  expectDispatchIndex?: number;
  /** Description of what this frame tests */
  description?: string;
}

export interface TestResult {
  passed: boolean;
  totalFrames: number;
  errors: string[];
}

export class TestRunner {
  private _state: GameState;
  private _loop: GameLoop;
  private _sceneManager: SceneManager;
  private _inputManager: InputManager;
  private _config: EngineConfig;
  private _errors: string[] = [];

  constructor() {
    this._config = {
      canvasWidth: 512,
      canvasHeight: 480,
      fps: 60,
      debug: true,
      platform: 'web',
    };

    this._state = new GameState();
    this._inputManager = new InputManager();

    this._loop = new GameLoop(this._state, this._config);
    this._sceneManager = new SceneManager(this._state);

    this._loop.onUpdate = () => this._sceneManager.update();
  }

  /** Run a test script (sequence of frames with inputs) */
  runScript(script: TestFrame[]): TestResult {
    this._errors = [];
    this._sceneManager.boot();

    // Set scene manager to debug mode
    this._sceneManager.setDebug(true);

    let currentFrame = 0;
    const maxFrames = Math.max(...script.map(f => f.frame), 300); // At least 5 seconds

    for (let f = 0; f <= maxFrames; f++) {
      currentFrame = f;

      // Apply inputs for this frame
      const frameScript = script.find(s => s.frame === f);
      if (frameScript) {
        if (frameScript.press) {
          for (const btn of frameScript.press) {
            this._inputManager.pressButton(btn, this._state.input);
          }
        }
        if (frameScript.release) {
          for (const btn of frameScript.release) {
            this._inputManager.releaseButton(btn, this._state.input);
          }
        }
      }

      // Advance one frame
      this._advanceFrame();

      // Verify expectations
      if (frameScript) {
        if (frameScript.expectSceneId !== undefined) {
          this._assert(
            this._state.progress.sceneId === frameScript.expectSceneId,
            `Frame ${f}: Expected scene ${frameScript.expectSceneId}, got ${this._state.progress.sceneId}`
          );
        }
        if (frameScript.expectDispatchIndex !== undefined) {
          this._assert(
            this._state.dispatchIndex === frameScript.expectDispatchIndex,
            `Frame ${f}: Expected dispatch ${frameScript.expectDispatchIndex}, got ${this._state.dispatchIndex}`
          );
        }
      }

      // Stop if scene manager requested
      if (this._sceneManager.stopRequested) break;
    }

    return {
      passed: this._errors.length === 0,
      totalFrames: currentFrame,
      errors: this._errors,
    };
  }

  /** Advance exactly one frame */
  private _advanceFrame(): void {
    // Compute pressed state
    this._state.input.pressed =
      (this._state.input.current ^ this._state.input.previous) &
      this._state.input.current;
    this._state.input.previous = this._state.input.current;

    // Frame counter
    this._state.timing.frameCount++;

    // Run scene update
    this._loop.onUpdate!();
  }

  /** Run N frames automatically (no input) */
  runAutoFrames(count: number): void {
    for (let i = 0; i < count; i++) {
      this._advanceFrame();
    }
  }

  /** Press and hold a button for N frames */
  holdButton(button: Button, frames: number): void {
    for (let i = 0; i < frames; i++) {
      this._inputManager.pressButton(button, this._state.input);
      this._advanceFrame();
    }
  }

  /** Press a button for one frame (tap) */
  tapButton(button: Button): void {
    this._inputManager.pressButton(button, this._state.input);
    this._advanceFrame();
    this._inputManager.releaseButton(button, this._state.input);
  }

  /** Assert a boolean condition */
  private _assert(condition: boolean, message: string): void {
    if (!condition) {
      this._errors.push(message);
      console.error(`[TEST FAIL] ${message}`);
    }
  }

  /** Get current debug state */
  getState(): GameState {
    return this._state;
  }

  /** Get current debug info */
  dumpState(): string {
    const s = this._state;
    const info = this._sceneManager.getDebugInfo();
    return JSON.stringify(info, null, 2);
  }

  /** Get errors from last test */
  getErrors(): string[] {
    return this._errors;
  }

  /** Reset everything for a new test */
  reset(): void {
    this._state = new GameState();
    this._inputManager.reset(this._state.input);
    this._loop = new GameLoop(this._state, this._config);
    this._sceneManager = new SceneManager(this._state);
    this._loop.onUpdate = () => this._sceneManager.update();
    this._errors = [];
  }

  /** Boot the game (calls SceneManager.boot) */
  boot(): void {
    this._sceneManager.boot();
  }
}
