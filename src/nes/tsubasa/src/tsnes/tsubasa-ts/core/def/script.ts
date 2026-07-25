/**
 * 字节码类型定义
 */

/** 字节码操作码 */
export enum BytecodeOp {
  CHAR          = 0x00,
  BG_BRIGHTNESS = 0xD8,
  WINDOW_PAL    = 0xD9,
  TEXT_PAL      = 0xDA,
  WINDOW_ORIGIN = 0xE0,
  COLUMN_OFFSET = 0xE1,
  SCENE_TRANS   = 0xE8,
  BRIGHT_FADE   = 0xE9,
  CLEAR_SCREEN  = 0xEA,
  WAIT_FRAMES   = 0xEB,
  TEXT_SETUP    = 0xEC,
  BORDER_DRAW   = 0xED,
  FILL_DISP     = 0xEE,
  TEXT_LINES    = 0xEF,
  CROSS_BANK    = 0xF8,
  TERMINATOR    = 0xFF,
}

export interface BytecodeOpInfo {
  op: BytecodeOp | number;
  mnemonic: string;
  operandLen: number;
  desc: string;
}

export const BYTECODE_TABLE: Record<number, BytecodeOpInfo> = {
  [BytecodeOp.BG_BRIGHTNESS]: { op: 0xD8, mnemonic: 'BG_BRIGHTNESS', operandLen: 1, desc: '背景色亮度' },
  [BytecodeOp.WINDOW_PAL]:    { op: 0xD9, mnemonic: 'WINDOW_PAL',    operandLen: 1, desc: '窗口调色板' },
  [BytecodeOp.TEXT_PAL]:      { op: 0xDA, mnemonic: 'TEXT_PAL',      operandLen: 1, desc: '文本调色板' },
  [BytecodeOp.WINDOW_ORIGIN]: { op: 0xE0, mnemonic: 'WINDOW_ORIGIN', operandLen: 2, desc: '窗口起始行列' },
  [BytecodeOp.COLUMN_OFFSET]: { op: 0xE1, mnemonic: 'COLUMN_OFFSET', operandLen: 1, desc: '列偏移' },
  [BytecodeOp.SCENE_TRANS]:   { op: 0xE8, mnemonic: 'SCENE_TRANS',   operandLen: 1, desc: '场景过渡' },
  [BytecodeOp.BRIGHT_FADE]:   { op: 0xE9, mnemonic: 'BRIGHT_FADE',   operandLen: 1, desc: '亮度渐变' },
  [BytecodeOp.CLEAR_SCREEN]:  { op: 0xEA, mnemonic: 'CLEAR_SCREEN',  operandLen: 0, desc: '清屏' },
  [BytecodeOp.WAIT_FRAMES]:   { op: 0xEB, mnemonic: 'WAIT_FRAMES',   operandLen: 1, desc: '等待帧' },
  [BytecodeOp.TEXT_SETUP]:    { op: 0xEC, mnemonic: 'TEXT_SETUP',    operandLen: 0, desc: '文本初始化' },
  [BytecodeOp.BORDER_DRAW]:   { op: 0xED, mnemonic: 'BORDER_DRAW',   operandLen: 0, desc: '绘制边框' },
  [BytecodeOp.FILL_DISP]:     { op: 0xEE, mnemonic: 'FILL_DISP',     operandLen: 1, desc: '填充显示' },
  [BytecodeOp.TEXT_LINES]:    { op: 0xEF, mnemonic: 'TEXT_LINES',    operandLen: 1, desc: '文本行数' },
  [BytecodeOp.CROSS_BANK]:    { op: 0xF8, mnemonic: 'CROSS_BANK',    operandLen: 2, desc: '跨bank调用' },
  [BytecodeOp.TERMINATOR]:    { op: 0xFF, mnemonic: 'TERMINATOR',    operandLen: 0, desc: '终止符' },
};

export function isDirectChar(op: number): boolean {
  return op <= 0xD7;
}

export function getOpcodeInfo(op: number): BytecodeOpInfo | undefined {
  return BYTECODE_TABLE[op];
}

// ═══ 引擎状态 ═══

export enum BytecodeState {
  IDLE    = 'idle',
  RUNNING = 'running',
  WAITING = 'waiting',
  DONE    = 'done',
  ERROR   = 'error',
}

export interface BytecodeEvent {
  type: 'char' | 'newline' | 'clear' | 'fade' | 'wait' | 'trans' | 'done' | 'error';
  opcode?: number;
  charCode?: number;
  arg?: number;
  data?: string;
}
