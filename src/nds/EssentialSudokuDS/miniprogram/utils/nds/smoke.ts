/**
 * @file smoke.ts — V0.9 烟雾测试, 验证 TS bridge 编译 + 类型可用
 *
 * 任何 V0.9 改完 bridge 后跑:
 *   1. npx tsc --noEmit
 *   2. 在 dev tools console import './utils/nds/smoke' 验证函数可调
 */

import { ARM9, ARM7, Known, Addr } from './index';

export function smokeTest(): void {
  // 1. 验证 named 函数 (V0.4 known)
  // Known.vec2_set_inline should exist
  const test: number = Known.vec2_set_inline;
  if (test !== 0x02028434) {
    throw new Error(`vec2_set_inline mismatch: ${test}`);
  }

  // 2. 验证 ARM9 ARM7 命名
  const arm9_fn: number = ARM9.vec3_dot_product; // 0x02039f4c
  const arm7_fn: number = ARM7.ipc_fifo_recv_handler; // 0x023913b8

  // 3. 验证 address constants
  if (Addr.ARM9_DST !== 0x02008000) {
    throw new Error('ARM9_DST mismatch');
  }
  if (Addr.ARM7_DST !== 0x02380000) {
    throw new Error('ARM7_DST mismatch');
  }

  // 4. 验证 softfloat range
  if (Addr.SOFTFLOAT_BASE !== 0x0204c000 || Addr.SOFTFLOAT_END !== 0x0204e000) {
    throw new Error('SOFTFLOAT region mismatch');
  }

  // 5. 验证 IO register
  if (Addr.IO_KEYINPUT !== 0x04000130) {
    throw new Error('IO_KEYINPUT mismatch');
  }

  console.log('[V0.9 smoke] PASS:', {
    vec2_set_inline: Known.vec2_set_inline,
    vec3_dot_product: ARM9.vec3_dot_product,
    ipc_fifo_recv_handler: ARM7.ipc_fifo_recv_handler,
    ARM9_DST: Addr.ARM9_DST,
    arm9_fn,
    arm7_fn,
  });
}

// 调用入口 (供 DevTools console)
smokeTest();
