/**
 * ============================================================================
 * Input Manager — replaces Joypad1 read routine ($4016 polling)
 * 
 * Maps keyboard/gamepad/touch input to the NES-style bitmask.
 * Compatible with both web (keyboard) and Mini Program (touch) platforms.
 * ============================================================================
 */

import { Button, InputState } from './types';

export class InputManager {
  private _bindings: Map<string, Button> = new Map();

  constructor() {
    this._setDefaultBindings();
  }

  private _setDefaultBindings(): void {
    // Keyboard defaults — emulate NES controller layout
    this._bindings.set('ArrowUp',    Button.UP);
    this._bindings.set('ArrowDown',  Button.DOWN);
    this._bindings.set('ArrowLeft',  Button.LEFT);
    this._bindings.set('ArrowRight', Button.RIGHT);
    this._bindings.set('KeyZ',       Button.A);
    this._bindings.set('KeyX',       Button.B);
    this._bindings.set('Enter',      Button.START);
    this._bindings.set('ShiftRight', Button.SELECT);
    this._bindings.set('ShiftLeft',  Button.SELECT);
  }

  /** Override a key binding */
  bindKey(keyCode: string, button: Button): void {
    this._bindings.set(keyCode, button);
  }

  /** Apply keyboard event to input state */
  handleKeyDown(e: KeyboardEvent, state: InputState): void {
    const btn = this._bindings.get(e.code);
    if (btn !== undefined) {
      state.current |= btn;
    }
  }

  handleKeyUp(e: KeyboardEvent, state: InputState): void {
    const btn = this._bindings.get(e.code);
    if (btn !== undefined) {
      state.current &= ~btn;
    }
  }

  /** Apply a direct button press (for Mini Program touch / test scripts) */
  pressButton(button: Button, state: InputState): void {
    state.current |= button;
  }

  releaseButton(button: Button, state: InputState): void {
    state.current &= ~button;
  }

  /** Apply a full button state (for test scripts: replay recorded input) */
  setState(bitmask: number, state: InputState): void {
    state.current = bitmask;
  }

  /** Reset all input state */
  reset(state: InputState): void {
    state.current = 0;
    state.pressed = 0;
    state.previous = 0;
  }
}
