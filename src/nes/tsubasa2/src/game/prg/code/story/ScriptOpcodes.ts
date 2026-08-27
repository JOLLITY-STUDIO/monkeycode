/**
 * ScriptOpcodes — 剧情脚本操作码定义
 *
 * 来源：bank00/code_sub.s $90B0-$94FF 调度器 + bank03-bank10/bank18 数据表
 * 翻译原则：
 *   - opcode 数值与 asm 完全一致，禁止臆造
 *   - 高位语义区段（CMP 阈值 $6D = 109）：
 *     - [0x00, 0x6C] 直接模式：handler 在 bank00 中直接执行
 *     - [0x6D, 0xFF] 间接模式：handler 地址存在 bank18 数据表中，跳转读取
 *   - 每个 opcode 的 handler 用 `(ctx, args) => void` 形式注入 ScriptEngine
 */
import type { ScriptContext } from './ScriptEngine';
import type { CharMap } from './CharMap';

/** 处理器签名：opcode 字节 | 上下文 | 读取字节流的 lambda */
export type OpcodeHandler = (ctx: ScriptContext, read: () => number) => boolean | void;

/** 操作码枚举（值与 asm 一致） */
export enum ScriptOpcode {
  /** [0x00] NOP / 占位（asm 中 0 终止符） */
  Nop = 0x00,
  /** [0x01] 显示一个文本字符（CharMap → tile，写 NT/OAM） */
  TextChar = 0x01,
  /** [0x02] 等待帧数（1 字节参数） */
  WaitFrames = 0x02,
  /** [0x03] 等待用户输入（A/B/任意键） */
  WaitInput = 0x03,
  /** [0x04] 无条件跳转（2 字节相对偏移） */
  Jump = 0x04,
  /** [0x05] 条件分支（取标志位） */
  Branch = 0x05,
  /** [0x06] 子段调用 */
  Call = 0x06,
  /** [0x07] 子段返回 */
  Return = 0x07,
  /** [0x08] 设置调色板索引（2 字节：pal, count） */
  SetPalette = 0x08,
  /** [0x09] 装载 OAM 精灵（来自数据指针） */
  LoadSprite = 0x09,
  /** [0x0A] 播放 BGM（1 字节：songId） */
  PlayBgm = 0x0a,
  /** [0x0B] 播放 SE（1 字节：seId） */
  PlaySe = 0x0b,
  /** [0x0C] 等 N 个 VBlank（rti 计数） */
  WaitVBlank = 0x0c,
  /** [0x0D] 段结束标记 */
  EndSegment = 0x0d,
  /** [0x0E] 跳转到段号（重置 IP） */
  JumpSegment = 0x0e,
  /** [0xFF] 脚本结束（整段终止） */
  EndScript = 0xff,
}

/** 直接模式上限阈值（与 asm CMP #$6D 一致） */
export const OPCODE_DIRECT_MAX = 0x6c;

/** 间接模式起点（与 asm CMP #$6D + SEC SBC #$6D 一致） */
export const OPCODE_INDIRECT_BASE = 0x6d;

/**
 * 计算 opcode 模式（直接 / 间接）并返回归一化索引。
 */
export function classifyOpcode(opcode: number): { direct: boolean; index: number } {
  if (opcode <= OPCODE_DIRECT_MAX) return { direct: true, index: opcode };
  return { direct: false, index: opcode - OPCODE_INDIRECT_BASE };
}

/**
 * 框架接口：ScriptEngine 通过该接口消费业务能力（不直接依赖具体 Service）
 */
export interface ScriptRuntime {
  /** 读 RAM（按 4 位大写补零地址，如 'ram_0025'） */
  readRam(addr: number): number;
  /** 写 RAM */
  writeRam(addr: number, value: number): void;
  /** CharMap（字符 → tile） */
  charMap?: CharMap | null;
  /** 播放 BGM */
  playBgm?(id: number): void;
  /** 播放 SE */
  playSe?(id: number): void;
  /** 装载 OAM 精灵（按 sprite id 写入 $0200） */
  loadSprite?(id: number, x: number, y: number, attr: number): void;
  /** 设置 BG/SPR 调色板 */
  setPalette?(bgIdx: number, sprIdx: number): void;
  /** 写一个 tile 到 NT 当前位置（PRG $9AA2 NT cell writer 翻译）—— 推进内部 cursor */
  writeTextChar?(tile: number): void;
}

/** 全局运行时（注入式） */
let RUNTIME: ScriptRuntime | null = null;

/** 注册运行时（StoryController / Story 服务启动时调用一次） */
export function setScriptRuntime(rt: ScriptRuntime | null): void {
  RUNTIME = rt;
}

/** opcode → handler 注册表 */
export const OPCODE_HANDLERS: Partial<Record<ScriptOpcode, OpcodeHandler>> = {
  [ScriptOpcode.Nop]: () => { /* nop */ },

  /** [0x01] 显示一个文本字符（1 字节 char → tile → NT cell writer） */
  [ScriptOpcode.TextChar]: (ctx, read) => {
    const ch = read();
    if (!ch) return;
    // char → tile (CharMap 映射, 默认 fallback = ch)
    const tile = RUNTIME?.charMap?.toTile(ch) ?? ch;
    // 写 NT 当前位置 + 推进 cursor（PRG $9AA2 NT cell writer 翻译）
    if (RUNTIME?.writeTextChar) {
      RUNTIME.writeTextChar(tile);
    } else {
      // 无 RUNTIME 注入（链路走通 stub）：push 到 stack 作为调试可见性
      ctx.stack.push(tile);
    }
  },

  /** [0x02] 等待 N 帧（1 字节参数） */
  [ScriptOpcode.WaitFrames]: (ctx, read) => {
    const n = read() & 0xff;
    ctx.waitFrames = n;
  },

  /** [0x03] 等待用户输入（任意键） */
  [ScriptOpcode.WaitInput]: (ctx) => {
    ctx.waitingInput = true;
  },

  /** [0x04] 无条件跳转（2 字节相对偏移：小端） */
  [ScriptOpcode.Jump]: (_ctx, read) => {
    const lo = read();
    const hi = read();
    // 相对偏移 = signed 16-bit
    const off = (hi & 0x80) ? (hi << 8 | lo) - 0x10000 : (hi << 8 | lo);
    // 跳转由 ScriptEngine 处理：push 到 IP（这里只能标一个待跳转偏移，简化：用 waitFrames=-1）
    // 实际 ScriptEngine 在 step 中需支持：返回特殊值触发 IP 重写
    // 这里我们通过 stack 记录偏移，外层 step 处理
    _ctx.stack.push(off);
  },

  /** [0x05] 条件分支（1 字节条件码 + 2 字节相对偏移） */
  [ScriptOpcode.Branch]: (_ctx, read) => {
    const cond = read();
    const lo = read();
    const hi = read();
    const off = (hi & 0x80) ? (hi << 8 | lo) - 0x10000 : (hi << 8 | lo);
    const rt = RUNTIME;
    if (!rt) return;
    // 简化条件：cond 0 = 永远跳转；1 = $0009 标志；2 = $0036 etc
    // 实际需要解 cond 字节为 8 个标准 6502 条件之一
    let taken = false;
    if (cond === 0) taken = true;
    else if (cond === 1) taken = rt.readRam(0x0009) !== 0;
    if (taken) _ctx.stack.push(off);
  },

  /** [0x06] 子段调用（2 字节段内偏移） */
  [ScriptOpcode.Call]: (ctx, read) => {
    const lo = read();
    const hi = read();
    // 段内偏移（同段 jump subroutine）
    // 简化：调入新段，重新初始化上下文
    const off = (hi << 8) | lo;
    ctx.stack.push(-1); // 标记调用（实际需重新装载段）
    void off;
  },

  /** [0x07] 子段返回 */
  [ScriptOpcode.Return]: (ctx) => {
    // 弹出 call 偏移，恢复原 IP
    ctx.stack.pop();
  },

  /** [0x08] 设置调色板（1 字节 palIdx） */
  [ScriptOpcode.SetPalette]: (_ctx, read) => {
    const idx = read() & 0xff;
    RUNTIME?.setPalette?.(idx & 0x0f, (idx >> 4) & 0x0f);
  },

  /** [0x09] 装载 OAM 精灵（变长：spriteId + x + y + attr） */
  [ScriptOpcode.LoadSprite]: (_ctx, read) => {
    const id = read();
    const x = read();
    const y = read();
    const attr = read();
    RUNTIME?.loadSprite?.(id, x, y, attr);
  },

  /** [0x0A] 播放 BGM（1 字节：songId） */
  [ScriptOpcode.PlayBgm]: (_ctx, read) => {
    const id = read() & 0xff;
    RUNTIME?.playBgm?.(id);
  },

  /** [0x0B] 播放 SE（1 字节：seId） */
  [ScriptOpcode.PlaySe]: (_ctx, read) => {
    const id = read() & 0xff;
    RUNTIME?.playSe?.(id);
  },

  /** [0x0C] 等 N 个 VBlank（1 字节：N） */
  [ScriptOpcode.WaitVBlank]: (ctx, read) => {
    const n = read() & 0xff;
    ctx.waitFrames = Math.max(ctx.waitFrames, n);
  },

  /** [0x0D] 段结束标记 */
  [ScriptOpcode.EndSegment]: (ctx) => {
    ctx.finished = true;
  },

  /** [0x0E] 跳转到段号（2 字节段 ID） */
  [ScriptOpcode.JumpSegment]: (ctx, read) => {
    const lo = read();
    const hi = read();
    const newSegId = (hi << 8) | lo;
    ctx.segmentId = newSegId;
    ctx.ip = 0; // 重置 IP，等 ScriptLoader 重新装载
    ctx.stack.push(newSegId);
  },

  /** [0xFF] 脚本结束 */
  [ScriptOpcode.EndScript]: (ctx) => {
    ctx.finished = true;
  },
};

/** 注册一个 opcode handler（允许外部 Service 注入自定义实现） */
export function registerHandler(opcode: ScriptOpcode, handler: OpcodeHandler): void {
  OPCODE_HANDLERS[opcode] = handler;
}

/** 取 opcode handler */
export function getHandler(opcode: ScriptOpcode): OpcodeHandler | null {
  return OPCODE_HANDLERS[opcode] ?? null;
}

/** 初始化 opcode 表（注册所有内置 handler） */
export function initScriptOpcodes(): void {
  // OPCODE_HANDLERS 已在文件顶层注册，无需额外动作
}
