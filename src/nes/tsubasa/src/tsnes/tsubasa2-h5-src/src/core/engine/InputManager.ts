/**
 * 输入管理器
 *
 * 负责:
 *   1. 键盘事件监听 (HTML 环境)
 *   2. 触摸事件映射 (微信小程序环境)
 *   3. 按键状态缓存 (当前/上一帧/边沿)
 *
 * 小程序环境通过 Tsubasa2.setButtons() 直接驱动。
 */

import { BUTTON } from '../core/types';

/** 输入快照 (每帧) */
export interface InputState {
  /** 当前帧按键掩码 */
  current: number;
  /** 上一帧按键掩码 */
  previous: number;
  /** 本帧刚按下的按键掩码 */
  pressed: number;
  /** 本帧刚放开的按键掩码 */
  released: number;
}

export class InputManager {
  /** 当前状态 */
  state: InputState = {
    current: 0,
    previous: 0,
    pressed: 0,
    released: 0,
  };

  /** 键盘 → NES 按键映射 */
  private _keyMap: Map<string, number> = new Map([
    ['ArrowUp',    BUTTON.UP],
    ['ArrowDown',  BUTTON.DOWN],
    ['ArrowLeft',  BUTTON.LEFT],
    ['ArrowRight', BUTTON.RIGHT],
    ['z',          BUTTON.A],
    ['Z',          BUTTON.A],
    ['x',          BUTTON.B],
    ['X',          BUTTON.B],
    ['Enter',      BUTTON.START],
    ['Shift',      BUTTON.SELECT],
    [' ',          BUTTON.START], // 空格也映射START
  ]);

  private _boundKeyDown: ((e: KeyboardEvent) => void) | null = null;
  private _boundKeyUp: ((e: KeyboardEvent) => void) | null = null;

  // ── 键盘绑定 (HTML 环境) ──

  /** 绑定键盘事件到 window */
  bindKeyboard(): void {
    this._boundKeyDown = this._onKeyDown.bind(this);
    this._boundKeyUp = this._onKeyUp.bind(this);
    window.addEventListener('keydown', this._boundKeyDown);
    window.addEventListener('keyup', this._boundKeyUp);
  }

  /** 解绑 */
  unbind(): void {
    if (this._boundKeyDown) {
      window.removeEventListener('keydown', this._boundKeyDown);
    }
    if (this._boundKeyUp) {
      window.removeEventListener('keyup', this._boundKeyUp);
    }
  }

  /** 直接从外部设置按键 (小程序触摸映射) */
  setButtons(mask: number): void {
    this.state.current = mask;
  }

  /** 按下单个按键 */
  press(btn: BUTTON): void {
    this.state.current |= btn;
  }

  /** 释放单个按键 */
  release(btn: BUTTON): void {
    this.state.current &= ~btn;
  }

  /** 每帧轮询 (计算边沿) */
  poll(): void {
    this.state.pressed =
      this.state.current & ~this.state.previous;
    this.state.released =
      this.state.previous & ~this.state.current;
    this.state.previous = this.state.current;
  }

  // ── 查询 ──

  /** 按键持续按住 */
  isHeld(btn: BUTTON): boolean {
    return (this.state.current & btn) !== 0;
  }

  /** 本帧刚按下 */
  isPressed(btn: BUTTON): boolean {
    return (this.state.pressed & btn) !== 0;
  }

  /** 本帧刚释放 */
  isReleased(btn: BUTTON): boolean {
    return (this.state.released & btn) !== 0;
  }

  // ── 内部 ──

  private _onKeyDown(e: KeyboardEvent): void {
    const btn = this._keyMap.get(e.key);
    if (btn != null) {
      e.preventDefault();
      this.state.current |= btn;
    }
  }

  private _onKeyUp(e: KeyboardEvent): void {
    const btn = this._keyMap.get(e.key);
    if (btn != null) {
      e.preventDefault();
      this.state.current &= ~btn;
    }
  }
}
