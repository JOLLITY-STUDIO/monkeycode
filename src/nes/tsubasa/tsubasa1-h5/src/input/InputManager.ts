/**
 * 输入管理器 - 手柄输入处理
 * 替代 $4016/$4017 硬件读取
 *
 * 按键映射 (与 NES 手柄一致):
 *   bit 7: A
 *   bit 6: B
 *   bit 5: SELECT
 *   bit 4: START
 *   bit 3: UP
 *   bit 2: DOWN
 *   bit 1: LEFT
 *   bit 0: RIGHT
 */

import { Button, GameInput } from '../core/types';

/** 键盘→NES按键映射 */
const KEY_MAP: Record<string, Button> = {
  'KeyZ':        Button.A,
  'KeyX':        Button.B,
  'Enter':       Button.START,
  'ShiftRight':  Button.SELECT,
  'ShiftLeft':   Button.SELECT,
  'ArrowUp':     Button.UP,
  'ArrowDown':   Button.DOWN,
  'ArrowLeft':   Button.LEFT,
  'ArrowRight':  Button.RIGHT,
  'KeyW':        Button.UP,
  'KeyS':        Button.DOWN,
  'KeyA':        Button.LEFT,
  'KeyD':        Button.RIGHT,
};

export class InputManager {
  /** 当前帧按键状态 */
  private currentButtons: number = 0;

  /** 上一帧按键状态 */
  private prevButtons: number = 0;

  /** 刚刚按下的按键 (上升沿) */
  private pressedButtons: number = 0;

  /** 外部注入的按键值 (用于虚拟手柄) */
  private externalButtons: number = 0;

  /** 是否处理键盘事件 */
  private keyboardEnabled: boolean = true;

  constructor() {
    this.setupKeyboardListeners();
  }

  /** 设置键盘监听 */
  private setupKeyboardListeners(): void {
    if (typeof window === 'undefined') return;

    window.addEventListener('keydown', (e: KeyboardEvent) => {
      if (!this.keyboardEnabled) return;
      const btn = KEY_MAP[e.code];
      if (btn !== undefined) {
        e.preventDefault();
        this.currentButtons |= btn;
      }
    });

    window.addEventListener('keyup', (e: KeyboardEvent) => {
      if (!this.keyboardEnabled) return;
      const btn = KEY_MAP[e.code];
      if (btn !== undefined) {
        e.preventDefault();
        this.currentButtons &= ~btn;
      }
    });
  }

  /** 每帧开始时调用 - 锁存当前状态 */
  latch(): void {
    this.pressedButtons = (this.currentButtons | this.externalButtons) & ~this.prevButtons;
    this.prevButtons = this.currentButtons | this.externalButtons;
  }

  /** 获取快照输入 (对应读取 $4016/$4017) */
  getInput(): GameInput {
    const held = this.currentButtons | this.externalButtons;
    return {
      pressed: this.pressedButtons,
      held,
    };
  }

  /** 模拟硬件串行读取 ($4016 方式) */
  readJoypad1(): number {
    // 重新锁存，然后逐位读取
    const held = this.currentButtons | this.externalButtons;
    this.prevButtons = held;
    return held;
  }

  /** 检查指定按键是否被按下 */
  isPressed(button: Button): boolean {
    return (this.pressedButtons & button) !== 0;
  }

  /** 检查指定按键是否被按住 */
  isHeld(button: Button): boolean {
    return ((this.currentButtons | this.externalButtons) & button) !== 0;
  }

  /** 设置外部按键 (触摸屏) */
  setExternalButtons(buttons: number): void {
    this.externalButtons = buttons;
  }

  /** 设置单个外部按键 */
  pressButton(button: Button): void {
    this.externalButtons |= button;
  }

  /** 释放单个外部按键 */
  releaseButton(button: Button): void {
    this.externalButtons &= ~button;
  }

  /** 释放所有外部按键 */
  clearExternalButtons(): void {
    this.externalButtons = 0;
  }

  /** 启用/禁用键盘 */
  setKeyboardEnabled(enabled: boolean): void {
    this.keyboardEnabled = enabled;
  }
}
