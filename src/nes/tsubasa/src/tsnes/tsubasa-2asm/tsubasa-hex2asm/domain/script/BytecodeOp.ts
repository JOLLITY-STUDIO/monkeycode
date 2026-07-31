/**
 * 字节码操作码定义
 *
 * ROM 中的脚本引擎 ($82ED) 使用自定义字节码驱动对话框、过场等。
 * 每条字节码占 1-3 字节，格式：
 *   [opcode] [arg1?] [arg2?]
 *
 * 基于 ROM bank_00 脚本引擎分析。
 */

/**
 * 字节码操作码枚举
 */
export enum BytecodeOp {
  // ===== 字符输出 ($00-$D7) =====
  /** 直接输出字符（操作码即为字符码） */
  CHAR          = 0x00,  // $00-$D7: 240 个直接字符（操作码本身是字符码）

  // ===== 调色板/亮度 ($D8-$DF) =====
  /** 背景色亮度 */
  BG_BRIGHTNESS = 0xD8,
  /** 对话窗口调色 */
  WINDOW_PAL    = 0xD9,
  /** 文本调色板 */
  TEXT_PAL      = 0xDA,

  // ===== 列/行控制 ($E0-$E7) =====
  /** 设置对话框起始行列 */
  WINDOW_ORIGIN = 0xE0,
  /** 列偏移 */
  COLUMN_OFFSET = 0xE1,

  // ===== 场景控制 ($E8-$FA) =====
  /** 场景过渡/切换 */
  SCENE_TRANS   = 0xE8,
  /** 亮度渐变 */
  BRIGHT_FADE   = 0xE9,
  /** 清屏 */
  CLEAR_SCREEN  = 0xEA,
  /** 等待帧（参数: 帧数） */
  WAIT_FRAMES   = 0xEB,
  /** 文本初始化 */
  TEXT_SETUP    = 0xEC,
  /** 边框绘制 */
  BORDER_DRAW   = 0xED,
  /** 填充显示列表 */
  FILL_DISP     = 0xEE,
  /** 设置文本行数 */
  TEXT_LINES    = 0xEF,
  /** 跨 bank 调用 */
  CROSS_BANK    = 0xF8,

  // ===== 终止符 =====
  /** 场景脚本终止 */
  TERMINATOR    = 0xFF,
}

/**
 * 操作码元信息
 */
export interface BytecodeOpInfo {
  /** 操作码值 */
  op: BytecodeOp | number;
  /** 助记符 */
  mnemonic: string;
  /** 操作数长度（字节） */
  operandLen: number;
  /** 说明 */
  desc: string;
}

/** 操作码表 */
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

/**
 * 判断操作码是否为直接字符（$00-$D7）
 */
export function isDirectChar(op: number): boolean {
  return op <= 0xD7;
}

/**
 * 获取操作码信息
 */
export function getOpcodeInfo(op: number): BytecodeOpInfo | undefined {
  return BYTECODE_TABLE[op];
}
