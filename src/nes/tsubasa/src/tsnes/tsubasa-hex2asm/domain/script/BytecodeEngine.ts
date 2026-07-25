/**
 * 字节码引擎
 *
 * 脚本引擎对应 ROM 中 $82ED 的字节码解释器。
 * 驱动对话框、过场动画等场景。
 *
 * 输入: 字节码流 (byte[] / ROM bank 数据)
 * 输出: 逐帧产生显示指令
 */

import {
  BytecodeOp,
  BYTECODE_TABLE,
  isDirectChar,
  getOpcodeInfo,
} from './BytecodeOp';

/** 字节码引擎状态 */
export enum BytecodeState {
  /** 空闲 */
  IDLE      = 'idle',
  /** 运行中 */
  RUNNING   = 'running',
  /** 等待帧 */
  WAITING   = 'waiting',
  /** 完成 */
  DONE      = 'done',
  /** 错误 */
  ERROR     = 'error',
}

/** 字节码输出事件 */
export interface BytecodeEvent {
  /** 事件类型 */
  type: 'char' | 'newline' | 'clear' | 'fade' | 'wait' | 'trans' | 'done' | 'error';
  /** 操作码 */
  opcode?: number;
  /** 字符码 */
  charCode?: number;
  /** 参数 */
  arg?: number;
  /** 数据 */
  data?: string;
}

/**
 * BytecodeEngine 字节码解释器
 *
 * 使用方法：
 * ```ts
 * const engine = new BytecodeEngine();
 * engine.load([0xE8, 0x05, 0xFF]); // 场景过渡到 5，终止
 * while (!engine.isDone) {
 *   const evt = engine.step();
 *   // 处理 evt
 * }
 * ```
 */
export class BytecodeEngine {
  /** 指令流 */
  private _code: readonly number[] = [];
  /** 当前指令指针 (PC) */
  private _pc: number = 0;
  /** 引擎状态 */
  private _state: BytecodeState = BytecodeState.IDLE;
  /** 等待剩余帧数 */
  private _waitFrames: number = 0;
  /** 当前输出行 */
  private _line: string = '';

  get state(): BytecodeState { return this._state; }
  get isDone(): boolean { return this._state === BytecodeState.DONE || this._state === BytecodeState.ERROR; }
  get pc(): number { return this._pc; }
  get currentLine(): string { return this._line; }

  /**
   * 加载字节码并自动开始
   */
  load(code: readonly number[]): void {
    this._code = code;
    this._pc = 0;
    this._state = BytecodeState.RUNNING;
    this._waitFrames = 0;
    this._line = '';
  }

  /**
   * 单步执行一条指令
   * @returns 执行事件，DONE 表示字节码已结束
   */
  step(): BytecodeEvent {
    if (this._state === BytecodeState.DONE) {
      return { type: 'done' };
    }
    if (this._state === BytecodeState.ERROR) {
      return { type: 'error', data: 'engine in error state' };
    }

    // 等待帧状态
    if (this._state === BytecodeState.WAITING) {
      if (--this._waitFrames <= 0) {
        this._state = BytecodeState.RUNNING;
      }
      return { type: 'wait', arg: this._waitFrames };
    }

    return this._execute();
  }

  /**
   * 执行整段字节码（非逐帧场景）
   * @returns 全部事件列表
   */
  executeAll(): BytecodeEvent[] {
    const events: BytecodeEvent[] = [];
    while (!this.isDone) {
      events.push(this.step());
    }
    return events;
  }

  // ============ private ============

  private _read(): number {
    return this._code[this._pc++] ?? BytecodeOp.TERMINATOR;
  }

  private _execute(): BytecodeEvent {
    const op = this._read();

    // 直接字符
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
        // 跨 bank 调用：读双字节地址，暂跳过
        const lo = this._read();
        const hi = this._read();
        return { type: 'error', opcode: op, data: `cross_bank $${((hi << 8) | lo).toString(16)} not implemented` };
      }

      // 操作码无需参数
      case BytecodeOp.TEXT_SETUP:
      case BytecodeOp.BORDER_DRAW:
        return { type: 'char', opcode: op, data: mnemonic };

      // 操作码 + 1 参数（默认读取）
      default: {
        const arg = this._read();
        return { type: 'char', opcode: op, arg, data: `${mnemonic} ${arg}` };
      }
    }
  }

  /** 重置引擎 */
  reset(): void {
    this._code = [];
    this._pc   = 0;
    this._state = BytecodeState.IDLE;
    this._waitFrames = 0;
    this._line  = '';
  }
}
