/**
 * 场景引擎 - 分派器
 *
 * 对应 bank 00 的 dispatch/scene engine。
 * 原始 6502 代码在 prg_bank_00_dispatch_scene_engine.ts 中。
 *
 * RESET → bank 30 (system lib init) → bank 00 (此分派器)。
 * 此文件是对 bank 00 6502 代码的语义化翻译。
 */

import type NES from '../core/nes';

/** 场景类型枚举 */
export enum SceneType {
  TITLE = 0,
  MENU = 1,
  MATCH = 2,
  CUTSCENE = 3,
  GAME_OVER = 4,
}

/** 场景上下文 */
export interface SceneContext {
  nes: NES;
  sceneId: number;
  frameCount: number;
  /** 场景私有数据 (对应原始 VRAM/RAM 中的变量) */
  data: Uint8Array;
}

/**
 * 场景分派器入口。
 * 原始 bank 31 的 CODE_RESET ($FFF0) 执行:
 *   LDA #$00  →  STA $8000  (切到 bank 00)
 *   JMP $C503  → bank 30 system library init
 * 其中的 init 最终跳转到 bank 00 的 dispatch。
 *
 * 此函数在 ROM 加载后由 boot.ts 调用，开始场景循环。
 */
export function dispatchScene(ctx: SceneContext): void {
  // 从 CPU 内存中读取当前场景 ID
  const sceneId = ctx.nes.cpu.mem[0x041] ?? 0; // 原始地址 $041 → 场景 ID
  ctx.sceneId = sceneId;

  switch (sceneId) {
    case SceneType.TITLE:
      // 标题画面
      break;
    case SceneType.MENU:
      // 菜单/密码画面
      break;
    case SceneType.MATCH:
      // 比赛场景
      break;
    case SceneType.CUTSCENE:
      // 过场动画
      break;
    case SceneType.GAME_OVER:
      // Game Over
      break;
    default:
      console.warn(`[scene] Unknown scene ID: ${sceneId}`);
  }
}

/**
 * 场景状态机：每帧调用
 */
export function tickScene(ctx: SceneContext): void {
  ctx.frameCount++;
  // 场景主循环逻辑在这里扩展
}
