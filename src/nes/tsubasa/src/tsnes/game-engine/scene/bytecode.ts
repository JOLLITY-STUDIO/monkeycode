/**
 * 字节码引擎
 *
 * 对应 bank 00 中的场景字节码解释器。
 * 原始 6502 通过 JMP 表 ($8003 等) 分派 scene 逻辑中的
 * 高级命令 (bytecode scripts)。
 *
 * 例如:
 *   $8000 处的 JMP 表索引 command byte → bank 00 内部 handler
 *
 * 此文件是字节码虚拟机的语义化实现。
 */

/** 字节码命令类型 */
export enum BytecodeOp {
  END = 0x00,
  WAIT = 0x01,
  DIALOG = 0x02,
  MOVE_SPRITE = 0x03,
  PLAY_MUSIC = 0x04,
  PLAY_SFX = 0x05,
  LOAD_PALETTE = 0x06,
  LOAD_TILES = 0x07,
  SET_SCROLL = 0x08,
  BRANCH = 0x09,
  SET_FLAG = 0x0A,
  CHECK_FLAG = 0x0B,
}

/** 字节码脚本上下文 */
export interface BytecodeContext {
  /** 指向当前脚本的指针 (对应 CPU PC 的脚本等效) */
  ptr: number;
  /** 脚本数据 (bytecode array) */
  data: Uint8Array;
  /** 标志寄存器 */
  flags: Uint8Array;
  /** 是否暂停 (等待帧数) */
  waitFrames: number;
}

export function createBytecodeContext(script: Uint8Array): BytecodeContext {
  return {
    ptr: 0,
    data: script,
    flags: new Uint8Array(16),
    waitFrames: 0,
  };
}

/**
 * 执行一帧的字节码
 * @returns true 表示脚本仍在运行，false 表示脚本结束
 */
export function execBytecode(ctx: BytecodeContext): boolean {
  if (ctx.waitFrames > 0) {
    ctx.waitFrames--;
    return true;
  }

  if (ctx.ptr >= ctx.data.length) return false;

  const op = ctx.data[ctx.ptr];
  ctx.ptr++;

  switch (op) {
    case BytecodeOp.END:
      return false;

    case BytecodeOp.WAIT: {
      const frames = ctx.data[ctx.ptr] ?? 1;
      ctx.ptr++;
      ctx.waitFrames = frames;
      return true;
    }

    case BytecodeOp.DIALOG:
      // 对话框命令: 下一个字节是 dialog ID
      ctx.ptr++; // skip dialog ID for now
      return true;

    case BytecodeOp.SET_FLAG: {
      const flagIdx = ctx.data[ctx.ptr] ?? 0;
      ctx.ptr++;
      const flagVal = ctx.data[ctx.ptr] ?? 0;
      ctx.ptr++;
      ctx.flags[flagIdx & 0xF] = flagVal;
      return true;
    }

    case BytecodeOp.CHECK_FLAG: {
      const flagIdx = ctx.data[ctx.ptr] ?? 0;
      ctx.ptr++;
      const expected = ctx.data[ctx.ptr] ?? 0;
      ctx.ptr++;
      if (ctx.flags[flagIdx & 0xF] === expected) {
        ctx.ptr++;
      }
      return true;
    }

    default:
      // 未知 opcode: 跳过
      console.warn(`[bytecode] Unknown opcode: 0x${op.toString(16)}`);
      return true;
  }
}
