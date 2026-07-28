/**
 * Opcode 表 — Bank 00 场景引擎 dispatch 表
 *
 * 对应原始 bank 00 中 $8000-$8XXX 区域的 JMP 表。
 * 当游戏代码执行 JSR 到 bank 00 的特定入口时，
 * 此表用于语义化分派。
 *
 * 原始 6502 在 $8000 处有这样的结构:
 *   JMP handler_00
 *   JMP handler_01
 *   JMP handler_02
 *   ...
 *
 * 每个 handler 都有特定的语义功能 (画对话框、播放音乐等)。
 */

import { execBytecode, BytecodeContext } from './bytecode';

/**
 * Scene engine opcode handler 类型
 */
export type SceneHandler = (ctx: BytecodeContext) => void;

/**
 * Bank 00 opcode handler 注册表
 */
export const OPCODE_TABLE: Record<number, SceneHandler> = {
  // 原始 $8000 → scene init/handshake
  0x00: (ctx) => { console.log('[scene] init'); },

  // 原始 $8003 → 加载调色板
  0x01: (ctx) => { console.log('[scene] load palette'); },

  // 原始 $8006 → 渲染背景
  0x02: (ctx) => { console.log('[scene] render bg'); },

  // 原始 $8009 → 渲染精灵
  0x03: (ctx) => { console.log('[scene] render sprites'); },

  // 原始 $800C → 播放音效
  0x04: (ctx) => { console.log('[scene] play sfx'); },

  // 原始 $800F → 执行脚本
  0x05: (ctx) => { execBytecode(ctx); },

  // ... 更多 opcode (随反编译进度扩展)
};

/**
 * 通过 opcode 索引调用对应的场景处理器
 */
export function dispatchOp(opcode: number, ctx: BytecodeContext): void {
  const handler = OPCODE_TABLE[opcode];
  if (!handler) {
    console.warn(`[scene] Unhandled opcode: $${opcode.toString(16).padStart(2, '0')}`);
    return;
  }
  handler(ctx);
}
