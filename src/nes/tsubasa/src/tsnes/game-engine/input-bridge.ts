/**
 * 双引擎输入桥接 — 从 h5game.ts 抽离
 *
 * 将统一的输入状态同步到 CPU 模拟器和 Bank 翻译引擎。
 */

import CPUController from '../src/controller';

export interface InputState {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
  a: boolean;
  b: boolean;
  start: boolean;
  select: boolean;
}

export class InputBridge {
  dpad = { up: false, down: false, left: false, right: false };
  btns = { a: false, b: false, start: false, select: false };

  /** 设置方向键 */
  setDpad(dir: 'up' | 'down' | 'left' | 'right', pressed: boolean): void {
    this.dpad[dir] = pressed;
  }

  /** 设置功能键 */
  setBtn(btn: 'a' | 'b' | 'start' | 'select', pressed: boolean): void {
    this.btns[btn] = pressed;
  }

  /** 将输入应用到 CPU 模拟器 */
  applyToCPU(nes: any): void {
    if (!nes) return;
    const d = this.dpad;
    const b = this.btns;
    const press = (key: number, on: boolean) => {
      if (on) nes.buttonDown(1, key as any);
      else nes.buttonUp(1, key as any);
    };
    press(CPUController.BUTTON_UP,    d.up);
    press(CPUController.BUTTON_DOWN,  d.down);
    press(CPUController.BUTTON_LEFT,  d.left);
    press(CPUController.BUTTON_RIGHT, d.right);
    press(CPUController.BUTTON_A,     b.a);
    press(CPUController.BUTTON_B,     b.b);
    press(CPUController.BUTTON_START,  b.start);
    press(CPUController.BUTTON_SELECT, b.select);
  }

  /** 将输入同步到 Bank 引擎的内存映射 ($4016/$1E) */
  applyToBank(sys: any): void {
    if (!sys) return;
    const d = this.dpad;
    const b = this.btns;
    let mask = 0;
    if (b.a)      mask |= 0x01;
    if (b.b)      mask |= 0x02;
    if (b.select) mask |= 0x04;
    if (b.start)  mask |= 0x08;
    if (d.up)     mask |= 0x10;
    if (d.down)   mask |= 0x20;
    if (d.left)   mask |= 0x40;
    if (d.right)  mask |= 0x80;
    sys.mem[0x4016] = mask & 0xFF;
    sys.mem[0x4017] = mask & 0xFF;
    sys.mem[0x1E]   = mask & 0xFF;
  }
}
