/**
 * 字节码引擎 — class BytecodeEngine
 *
 * 对应 ROM 中 $82ED 的字节码解释器。
 * 驱动对话框、过场动画等场景。
 */

import {
  BytecodeOp,
  isDirectChar,
  getOpcodeInfo,
} from '../../core/def/script';
import { BytecodeState } from '../../core/def/script';
import type { BytecodeEvent } from '../../core/def/script';

export { BytecodeState };
export type { BytecodeEvent };

export class BytecodeEngine {
  private _code: readonly number[] = [];
  private _pc: number = 0;
  private _state: BytecodeState = BytecodeState.IDLE;
  private _waitFrames: number = 0;
  private _line: string = '';

  get state(): BytecodeState { return this._state; }
  get isDone(): boolean { return this._state === BytecodeState.DONE || this._state === BytecodeState.ERROR; }
  get pc(): number { return this._pc; }
  get currentLine(): string { return this._line; }

  load(code: readonly number[]): void {
    this._code = code;
    this._pc = 0;
    this._state = BytecodeState.RUNNING;
    this._waitFrames = 0;
    this._line = '';
  }

  step(): BytecodeEvent {
    if (this._state === BytecodeState.DONE) {
      return { type: 'done' };
    }
    if (this._state === BytecodeState.ERROR) {
      return { type: 'error', data: 'engine in error state' };
    }
    if (this._state === BytecodeState.WAITING) {
      if (--this._waitFrames <= 0) {
        this._state = BytecodeState.RUNNING;
      }
      return { type: 'wait', arg: this._waitFrames };
    }
    return this._execute();
  }

  executeAll(): BytecodeEvent[] {
    const events: BytecodeEvent[] = [];
    while (!this.isDone) {
      events.push(this.step());
    }
    return events;
  }

  reset(): void {
    this._code = [];
    this._pc = 0;
    this._state = BytecodeState.IDLE;
    this._waitFrames = 0;
    this._line = '';
  }

  private _read(): number {
    return this._code[this._pc++] ?? BytecodeOp.TERMINATOR;
  }

  private _execute(): BytecodeEvent {
    const op = this._read();

    if (isDirectChar(op)) {
      this._line += String.fromCharCode(op);
      return { type: 'char', opcode: op, charCode: op, data: this._line };
    }

    const info = getOpcodeInfo(op);
    const mnemonic = info?.mnemonic ?? `$${op.toString(16).toUpperCase()}`;

    switch (op) {
      case BytecodeOp.TERMINATOR:
        this._state = BytecodeState.DONE;
        return { type: 'done', opcode: op };

      case BytecodeOp.CLEAR_SCREEN:
        this._line = '';
        return { type: 'clear', opcode: op };

      case BytecodeOp.SCENE_TRANS: {
        const target = this._read();
        return { type: 'trans', opcode: op, arg: target };
      }

      case BytecodeOp.BRIGHT_FADE: {
        const arg = this._read();
        return { type: 'fade', opcode: op, arg };
      }

      case BytecodeOp.WAIT_FRAMES: {
        const frames = this._read();
        this._waitFrames = frames;
        this._state = BytecodeState.WAITING;
        return { type: 'wait', opcode: op, arg: frames };
      }

      case BytecodeOp.CROSS_BANK: {
        const lo = this._read();
        const hi = this._read();
        return { type: 'error', opcode: op, data: `cross_bank $${(((hi << 8) | lo) & 0xFFFF).toString(16)} not implemented` };
      }

      case BytecodeOp.TEXT_SETUP:
      case BytecodeOp.BORDER_DRAW:
        return { type: 'char', opcode: op, data: mnemonic };

      default: {
        const arg = this._read();
        return { type: 'char', opcode: op, arg, data: `${mnemonic} ${arg}` };
      }
    }
  }
}
