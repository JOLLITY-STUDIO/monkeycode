/**
 * script-types — bank03-06 剧情脚本数据结构类型定义
 *
 * 每个脚本一条 JSON: 由 asm/bank03-06/*.s (与 _tmp_bzk_out/*.asm) 提取的
 * 脚本指令流语义 + 文本字节解码 (text 字段可读日文)。
 *
 * 指令分类 (脚本分派器 $84E7):
 *   < 0xD8       普通字符 (单/双 tile 文本)
 *   0xD8-0xDF    等待帧 (查 WAIT_FRAME_TABLE)
 *   0xE1-0xE7    行编辑
 *   0xE8-0xFF    长指令 (查 LONG_OPCODE_TABLE)
 */

/** 脚本指令类型 */
export enum ScriptInstructionType {
  /** 普通文本字符 */
  Text = 'text',
  /** 等待帧 (0xD8-0xDF) */
  Wait = 'wait',
  /** 行编辑 (0xE1-0xE7) */
  LineEdit = 'line_edit',
  /** 长指令 (0xE8-0xFF) */
  LongOp = 'long_op',
  /** 其它控制字节 */
  Control = 'control',
}

/** 单条指令 */
export interface ScriptInstruction {
  /** 指令字节 */
  opcode: number;
  /** 指令类型 (枚举字符串值: text/wait/line_edit/long_op/control) */
  type: ScriptInstructionType | string;
  /** 参数 (长指令/等待帧的操作数) */
  operand?: number;
  /** 语义描述 */
  note?: string;
  /** 该指令对应的可读文本 (type=text 时) */
  text?: string;
}

/** 单个脚本 */
export interface ScriptDataJson {
  /** 脚本 id (0x00-0xFF) */
  id: number;
  /** 十六进制 id 字符串 */
  idHex: string;
  /** 所属 bank (3-6) */
  bank: number;
  /** 脚本入口 (CPU $A000 基址内的偏移) */
  entryAddr: number;
  /** 指令流 */
  instructions: ScriptInstruction[];
  /** 解码后的可读日文 (文本区) */
  text: string;
}

/** 整个 bank 的脚本集 (index = 脚本 id) */
export type ScriptsBank = readonly ScriptDataJson[];
