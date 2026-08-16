/**
 * Captain Tsubasa II — 剧情脚本指令集定义
 *
 * 基于 _tmp_bzk_out/bank_00.asm 反编译分析:
 *   - 脚本分派器: $84E7 (bank 00)
 *   - 脚本指针: ram_004D/004E (16 位)
 *   - 脚本启动函数: $8464 (输入 A = 脚本 ID)
 *   - 脚本 ID 映射表: $8AEC (bank 00)
 *
 * 字节码格式:
 *   $00-$D7: 文字字符 (1 字节, 显示文本)
 *   $D8-$DF: 等待帧 (1 字节, 无参数, yield 不同帧数)
 *   $E0-$E7: 文本格式控制 (1 字节, 无参数)
 *   $E8-$FF: 长指令 (参数长度因指令而异)
 *
 * 注: $8545 长指令表中的值是处理器入口地址-1 (RTS 特性)
 */

// ── 指令类型 ──
export enum InstrType {
  TEXT = 'TEXT',              // 文本字符
  TEXT_CTRL = 'TEXT_CTRL',    // 文本格式控制
  WAIT = 'WAIT',              // 等待帧
  LONG_INSTR = 'LONG_INSTR',  // 长指令
  UNKNOWN = 'UNKNOWN',
}

// ── 等待帧指令 ($D8-$DF) ──
// 从 $8AE6 表 (bank_00.asm $8AE6 起)
export const WAIT_FRAMES: Record<number, number> = {
  0xD8: 1,    // 1 帧
  0xD9: 10,   // 10 帧
  0xDA: 20,   // 20 帧
  0xDB: 40,   // 40 帧
  0xDC: 60,   // 60 帧 (1 秒)
  0xDD: 80,   // 80 帧
  0xDE: 120,  // 120 帧 (2 秒)
  0xDF: 240,  // 240 帧 (4 秒)
};

// ── 长指令定义 ($E8-$FF) ──
// 基于 $8545 表处理器代码分析
export interface LongInstrDef {
  opcode: number;
  mnemonic: string;
  paramLen: number;  // 参数字节数, -1=变长, -2=子分派器, -3=变长数据
  description: string;
  handlerAddr?: string;  // 处理器入口地址 (CPU 地址)
}

export const LONG_INSTRS: LongInstrDef[] = [
  {
    opcode: 0xE8, mnemonic: 'LOAD_SCENE_DATA', paramLen: 1,
    description: '加载场景数据 (从 bank6 偏移 id*19+0x1F00 读取 20 字节)',
    handlerAddr: '$8575',
  },
  {
    opcode: 0xE9, mnemonic: 'YIELD2_CHECK', paramLen: 0,
    description: 'yield 2 帧 + 调用 $997E (检查按键/状态)',
    handlerAddr: '$8580',
  },
  {
    opcode: 0xEA, mnemonic: 'CLEAR_RESET', paramLen: 0,
    description: '清屏/重置 (调用 $99F0 + $9B7F)',
    handlerAddr: '$858D',
  },
  {
    opcode: 0xEB, mnemonic: 'YIELD_CALL', paramLen: 0,
    description: 'yield 并调用 $899A/$89A3/$88B1',
    handlerAddr: '$85C4',
  },
  {
    opcode: 0xEC, mnemonic: 'COND_SET', paramLen: 1,
    description: '条件设置 (param=$FF 特殊), 调用 $89D2',
    handlerAddr: '$85D2',
  },
  {
    opcode: 0xED, mnemonic: 'QUEUE_OBJ', paramLen: 1,
    description: '队列对象 (写入 ram_0700), param=对象 ID',
    handlerAddr: '$85EC',
  },
  {
    opcode: 0xEE, mnemonic: 'CLEAR_WINDOW', paramLen: 0,
    description: '清窗口 (调用 $98E8)',
    handlerAddr: '$8604',
  },
  {
    opcode: 0xEF, mnemonic: 'TOGGLE_FLAG', paramLen: 0,
    description: '切换标志 (修改 ram_0099)',
    handlerAddr: '$8618',
  },
  {
    opcode: 0xF0, mnemonic: 'SET_POS', paramLen: 2,
    description: '设置位置 [x][y] (ram_004F-0052)',
    handlerAddr: '$862C',
  },
  {
    opcode: 0xF1, mnemonic: 'LOAD_SPRITE', paramLen: 1,
    description: '加载精灵 [param]',
    handlerAddr: '$8640',
  },
  {
    opcode: 0xF2, mnemonic: 'SET_MODE', paramLen: 1,
    description: '设置显示模式 [param]',
    handlerAddr: '$8654',
  },
  {
    opcode: 0xF3, mnemonic: 'VAR_LEN', paramLen: -1,
    description: '变长指令: param1=$FF 时 3 字节参数, 否则 1 字节',
    handlerAddr: '$8668',
  },
  {
    opcode: 0xF4, mnemonic: 'SUB_DISPATCH', paramLen: -2,
    description: '子分派器 (param1=subId, 通过 $86C6 表跳转)',
    handlerAddr: '$8678',
  },
  {
    opcode: 0xF5, mnemonic: 'SUB_DISPATCH2', paramLen: -2,
    description: '子分派器2 (param1=subId, 通过 $86C6 表跳转)',
    handlerAddr: '$8690',
  },
  {
    opcode: 0xF6, mnemonic: 'CALL_FA8', paramLen: 1,
    description: '调用 $FA8 [param]',
    handlerAddr: '$86A8',
  },
  {
    opcode: 0xF7, mnemonic: 'TOGGLE_BANK', paramLen: 0,
    description: '切换 PRG bank',
    handlerAddr: '$86B4',
  },
  {
    opcode: 0xF8, mnemonic: 'VAR_DATA', paramLen: -3,
    description: '变长数据 (子分派器, 通过 $A484): sub=$01 前进3, sub=$10/$11 循环',
    handlerAddr: '$86C6',
  },
  {
    opcode: 0xF9, mnemonic: 'CALL_8AF7', paramLen: 1,
    description: '调用 $8AF7 [param] (剧情控制函数)',
    handlerAddr: '$86DC',
  },
  {
    opcode: 0xFA, mnemonic: 'CALL_8AF7B', paramLen: 1,
    description: '调用 $8AF7 变体 [param]',
    handlerAddr: '$86F0',
  },
  {
    opcode: 0xFB, mnemonic: 'CALL_9085', paramLen: 0,
    description: '调用 $9085 (剧情控制函数)',
    handlerAddr: '$8704',
  },
  {
    opcode: 0xFC, mnemonic: 'ADVANCE_PTR', paramLen: 0,
    description: '推进脚本指针 (跳过文本块)',
    handlerAddr: '$8836',
  },
  {
    opcode: 0xFD, mnemonic: 'YIELD_FA8', paramLen: 0,
    description: 'yield 并调用 $FA8',
    handlerAddr: '$8718',
  },
  {
    opcode: 0xFE, mnemonic: 'SET_PTR', paramLen: 2,
    description: '设置脚本指针 [low][high] (跳转到新地址)',
    handlerAddr: '$8728',
  },
  {
    opcode: 0xFF, mnemonic: 'END', paramLen: 0,
    description: '脚本结束',
    handlerAddr: '$873C',
  },
];

// ── 子分派器 ID ($F4/$F5) ──
export const SUB_DISPATCH_NAMES: Record<number, string> = {
  0x00: 'JSR_99B0',
  0x01: 'JSR_99D1',
  0x02: 'JSR_9A0D',
  0x03: 'JSR_9A1F',
  0x04: 'LOOP_FA8',   // 循环调用 $FA8
  0x05: 'LOOP2_FA8',  // 循环调用 $FA8 (变体)
  0x06: 'SUB6',
};

// ── 脚本 ID → Bank 映射 ──
export function getScriptBank(scriptId: number): number {
  if (scriptId < 0x10) return 3;
  if (scriptId < 0x20) return 4;
  if (scriptId < 0x60) return 5;
  return 6;
}

// ── 脚本 ID → Bank 内偏移 ──
export function getScriptBaseOffset(scriptId: number): number {
  if (scriptId < 0x10) return scriptId * 2;
  if (scriptId < 0x20) return (scriptId - 0x10) * 2;
  if (scriptId < 0x60) return (scriptId - 0x20) * 2;
  return (scriptId - 0x60) * 2;
}

// ── 脚本分类 (基于 bank 和 ID 范围) ──
export const SCRIPT_CATEGORIES: { range: string; bank: number; category: string }[] = [
  { range: '0x00-0x0F', bank: 3, category: '标题/KICK OFF 剧情' },
  { range: '0x10-0x1F', bank: 4, category: '中段剧情' },
  { range: '0x20-0x5F', bank: 5, category: '比赛相关' },
  { range: '0x60-0xFE', bank: 6, category: '大量剧情/对话' },
];
