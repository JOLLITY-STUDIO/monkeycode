/**
 * ScriptOpcodes — 脚本长指令表 ($8545) + 等待帧表 ($8AE6)
 * @bank 00
 *
 * 指令码分类 (脚本分派器 $84E7):
 *   < 0xD8       普通字符 (单/双 tile)
 *   0xD8-0xDF    等待帧 (WAIT_FRAME_TABLE)
 *   0xE1-0xE7    行编辑 (退格/光标)
 *   0xE8-0xFF    长指令 (LONG_OPCODE_TABLE, 24 个处理器)
 *
 * 长指令 ($E8-$FF) 处理器地址 (从 $8545 提取, 对应 code_main.s):
 *   $E8 → $8574   tableLoad (读 19 字节场景表)
 *   $E9 → $857F   fadeIn (调色板渐显)
 *   $EA → $858C   fadeOut + 清屏
 *   $EB → $85C3   动画序列
 *   $EC → $85D1   文本字符序列
 *   $ED → $85EB   查找空场景槽 ($0700)
 *   $EE → $8603   清文本区
 *   $EF → $8617   精灵翻转标志
 *   $F0 → $862B   文本位置设置
 *   $F1 → $8649   文本指针 (bank06)
 *   $F2 → $8677   行长度设置
 *   $F3 → $8681   调色板设置
 *   $F4 → $86B7   子指令分发 (86C6 表)
 *   $F5 → $87B7   脚本指针设置
 *   $F6 → $87CA   等待+动画
 *   $F7 → $87D8   标志切换
 *   $F8 → $87F7   外部调用 (bank02)
 *   $F9 → $8813   $005B 位操作
 *   $FA → $881A   sceneLoad
 *   $FB → $8830   清文本 buffer + 继续
 *   $FC → $8836   等待 + 文本 VRAM 前进
 *   $FD → $8854   填充 + 等待
 *   $FE → $8861   跳转 (2 字节指针)
 *   $FF → $886F   脚本结束
 *
 * 命名规范: 旧名 script-opcodes → 新名 ScriptOpcodes。
 */
import type { DataStore } from '../../data/store/DataStore';
import { WAIT_FRAME_TABLE as RAW_WAIT_FRAME, LONG_OPCODE_TABLE } from '../../data/tables/bank00-tables';

/** 普通字符上限 */
export const CHAR_MAX = 0xd8;
/** 长指令起始 */
export const LONG_OPCODE_BASE = 0xe8;

/** 等待帧表 $8AE6 (指令码 $D8-$DF) */
export const WAIT_FRAME_TABLE: readonly number[] = RAW_WAIT_FRAME;

/** 长指令表 $8545 (指令码 $E8-$FF → 处理器地址) */
export const LONG_OPCODE_TABLE_ABS: readonly number[] = LONG_OPCODE_TABLE;

/** 脚本长指令枚举 */
export enum ScriptOp {
  OpTableLoad = 0xe8,
  OpFadeIn = 0xe9,
  OpFadeOutClear = 0xea,
  OpAnimSeq = 0xeb,
  OpTextSeq = 0xec,
  OpFindSlot = 0xed,
  OpClearText = 0xee,
  OpSpriteFlip = 0xef,
  OpTextPos = 0xf0,
  OpTextPtr = 0xf1,
  OpLineLen = 0xf2,
  OpPalette = 0xf3,
  OpSubDispatch = 0xf4,
  OpSetPtr = 0xf5,
  OpWaitAnim = 0xf6,
  OpToggle = 0xf7,
  OpExternal = 0xf8,
  OpFlagBit = 0xf9,
  OpSceneLoad = 0xfa,
  OpClearBuf = 0xfb,
  OpVramAdvance = 0xfc,
  OpFillWait = 0xfd,
  OpJump = 0xfe,
  OpEnd = 0xff,
}

/** 子指令表 $86C6 (OpSubDispatch 操作码) */
export enum SubOp {
  SubFadeInBg = 0x00,  // $86D5
  SubFadeInSpr = 0x01, // $86DD
  SubWaitA = 0x02,     // $86E5
  SubWaitB = 0x03,     // $86ED
  SubPalAnim = 0x04,   // $86F5
  SubPalAnimRev = 0x05,// $8712
  SubClearSprites = 0x06, // $8733
}

export class ScriptOpcodes {
  /** 指令码 → 处理器地址 */
  static readonly OPCODES: Record<number, string> = {
    [ScriptOp.OpTableLoad]: 'handleTableLoad',
    [ScriptOp.OpFadeIn]: 'handleFadeIn',
    [ScriptOp.OpFadeOutClear]: 'handleFadeOutClear',
    [ScriptOp.OpAnimSeq]: 'handleAnimSeq',
    [ScriptOp.OpTextSeq]: 'handleTextSeq',
    [ScriptOp.OpFindSlot]: 'handleFindSlot',
    [ScriptOp.OpClearText]: 'handleClearText',
    [ScriptOp.OpSpriteFlip]: 'handleSpriteFlip',
    [ScriptOp.OpTextPos]: 'handleTextPos',
    [ScriptOp.OpTextPtr]: 'handleTextPtr',
    [ScriptOp.OpLineLen]: 'handleLineLen',
    [ScriptOp.OpPalette]: 'handlePalette',
    [ScriptOp.OpSubDispatch]: 'handleSubDispatch',
    [ScriptOp.OpSetPtr]: 'handleSetPtr',
    [ScriptOp.OpWaitAnim]: 'handleWaitAnim',
    [ScriptOp.OpToggle]: 'handleToggle',
    [ScriptOp.OpExternal]: 'handleExternal',
    [ScriptOp.OpFlagBit]: 'handleFlagBit',
    [ScriptOp.OpSceneLoad]: 'handleSceneLoad',
    [ScriptOp.OpClearBuf]: 'handleClearBuf',
    [ScriptOp.OpVramAdvance]: 'handleVramAdvance',
    [ScriptOp.OpFillWait]: 'handleFillWait',
    [ScriptOp.OpJump]: 'handleJump',
    [ScriptOp.OpEnd]: 'handleEnd',
  };

  /** 注册指令处理器 */
  static init(_store: DataStore): void {
    // 处理器注册由 ScriptEngine 实现 (见 handler* 方法)
  }
}

export function initScriptOpcodes(_store: DataStore): void {
  ScriptOpcodes.init(_store);
}

export default ScriptOpcodes;
