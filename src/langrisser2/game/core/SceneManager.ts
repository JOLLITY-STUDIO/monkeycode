/**
 * SceneManager.ts — 场景管理器 (State Machine Core)
 *
 * 对应 ROM 任务调度系统 FUN_00009498 (主 VBlank 任务调度器)
 * 参考: execution-trace.md 第三部分"游戏逻辑状态机"
 *
 * 职责:
 *   1. 维护 GamePhase 枚举 (游戏全局阶段)
 *   2. 管理场景切换 (init/destroy/switchTo)
 *   3. 验证状态跳转合法性
 *
 * 状态来源:
 *   ROM 任务链: 0xC92C → 0xC93A → 0xC9A0 → 0xCA00 → ... (execution-trace.md §6.1)
 *   RAM $FFFF8004: 当前任务函数指针 (对应 TS GameState.taskFuncPtr)
 *   RAM $FFFFA61C: 游戏阶段 (5=部署/MENU, 10=战斗)
 */

import { VDP } from '../hw/vdp/vdp.js';
import { invalidateTileCache } from '../hw/vdp/plane.js';

// ============================================================================
// Scene 接口 (所有场景必须实现)
// ============================================================================

/** 场景生命周期接口 */
export interface Scene {
  /** 场景初始化 — VRAM/tile/调色板加载 (由渲染端实现) */
  init(): void;
  /**
   * 每帧更新 — 业务逻辑
   * @param dt  帧间隔 (ms), 可选
   * @param input 输入映射器实例, 可选 (由 SceneManager 注入)
   */
  update(dt?: number, input?: import('../systems/InputSystem.js').Mapper): void;
  /** 场景退出清理 — 释放资源 */
  destroy(): void;
  /** 场景名称 (调试用) */
  readonly name: string;
  /**
   * Canvas 2D UI 叠加渲染 (可选)
   * 在 VDP 帧渲染完成、putImageData 之后调用
   * @param ctx Canvas 2D 渲染上下文
   */
  renderUI?(ctx: CanvasRenderingContext2D): void;
}

// ============================================================================
// GamePhase 枚举 — 全局游戏阶段
//
// 对应关系:
//   GamePhase.TITLE        → ROM 0xC93A 任务, RAM $FFFFA6D4=0 (标题画面标志)
//   GamePhase.NAME_INPUT   → ROM 0xCCB0 循环, RAM $FF78FA=0xFFFF (新游戏标志)
//   GamePhase.DEPLOY       → ROM 0xCA00 任务, RAM $FFFFA61C=5 (部署阶段)
//   GamePhase.BATTLE_MAP   → ROM 0xD49E 任务, RAM $FFFFA61C=10 (战斗阶段)
//   GamePhase.BATTLE_ANIM  → 战斗动画切换 (屏幕特效)
//   GamePhase.SHOP         → ROM $00FD7A 入口, RAM $FFFFA6DC (商店类型)
//   GamePhase.DIALOGUE     → ROM 0x09FFE 文本系统
//   GamePhase.INTERMISSION → ROM 0x1CFC0 战后结算
//   GamePhase.SAVE_LOAD    → SRAM 存取档界面
//   GamePhase.SCENARIO_INTRO → 剧情提要/全体地图
//   GamePhase.START_MENU   → 战斗中的 START 机能菜单
//   GamePhase.CHAR_ACTION  → 战斗中的角色行动菜单
//   GamePhase.OPENING      → 开场动画 (VDP sprite+tile 帧动画)
// ============================================================================
export const enum GamePhase {
  TITLE           = 0,   // 标题画面
  NAME_INPUT      = 1,   // 名称输入 (新游戏)
  SCENARIO_INTRO  = 2,   // 剧情提要 + 全体地图
  DEPLOY          = 3,   // MENU I (战前主菜单) + MENU II (指挥官配置)
  BATTLE_MAP      = 4,   // 战斗地图 (主界面)
  CHAR_ACTION     = 5,   // 角色行动菜单 (移动/攻击/魔法/召唤/治疗/指令)
  START_MENU      = 6,   // START 机能菜单 (SAVE/LOAD/胜利条件/设定/指令终了)
  BATTLE_ANIM     = 7,   // 战斗动画
  SHOP            = 8,   // 商店 (购入/卖出/装备)
  DIALOGUE        = 9,   // 剧情对话/过场
  INTERMISSION    = 10,  // 战后结算 (经验/道具/转职)
  SAVE_LOAD       = 11,  // 存档/读档界面
  CREDITS         = 12,  // 通关制作人员表
  OPENING         = 13,  // 开场动画 (启动 → 逐帧 VDP sprite+tile 播放)
}

// ============================================================================
// SceneManager
// ============================================================================

/** 场景管理器 — 全局单例 (每页面一个) */
export class SceneManager {
  readonly vdp: VDP;

  private _current: Scene | null = null;
  private _next: Scene | null = null;
  private _nextPhase: GamePhase = GamePhase.TITLE;
  private _phase: GamePhase = GamePhase.TITLE;

  /** 场景切换历史 (调试用) */
  private history: Array<{ phase: GamePhase; name: string }> = [];

  constructor(vdp: VDP) {
    this.vdp = vdp;
  }

  // ============================================================================
  // 属性
  // ============================================================================

  get current(): Scene | null { return this._current; }
  get phase(): GamePhase { return this._phase; }

  // ============================================================================
  // 场景切换
  // ============================================================================

  /**
   * 立即切换场景
   *
   * 流程:
   *   1. 销毁当前场景 (释放 VRAM/tile 缓存)
   *   2. 清空 tile 缓存 (invalidateTileCache)
   *   3. 重置 VDP 状态
   *   4. 初始化新场景
   *   5. 更新 phase 和切换历史
   *
   * @param phase 目标 GamePhase
   * @param scene 目标场景实例
   */
  switchTo(phase: GamePhase, scene: Scene): void {
    // 销毁当前场景
    if (this._current) {
      this._current.destroy();
      invalidateTileCache();    // 清空 tile 像素缓存
    }

    this._current = scene;
    this._phase = phase;

    // 重置 VDP 寄存器/VRAM/CRAM (为下一个场景准备)
    this.vdp.reset();

    // 初始化新场景
    scene.init();

    // 记录切换历史
    this.history.push({ phase, name: scene.name });
    console.log(`[SceneManager] → ${GamePhase[phase]} (${scene.name})`);
  }

  /**
   * 排队下一次切换 (在帧末尾通过 applyScheduled 执行)
   *
   * 用途: 场景内部触发切换时, 避免在 update() 中途销毁自己
   */
  scheduleSwitch(phase: GamePhase, scene: Scene): void {
    this._next = scene;
    this._nextPhase = phase;
  }

  /**
   * 应用排队的场景切换 (由 main.ts 的 gameLoop 调用)
   * @returns 是否执行了切换
   */
  applyScheduled(): boolean {
    if (!this._next) return false;
    this.switchTo(this._nextPhase, this._next);
    this._next = null;
    return true;
  }

  // ============================================================================
  // 状态验证
  // ============================================================================

  /**
   * 验证状态跳转是否合法 (对照 execution-trace.md §6 状态切换触发事件表)
   *
   * @param from 当前阶段
   * @param to   目标阶段
   * @returns true 表示合法跳转
   */
  static canTransition(from: GamePhase, to: GamePhase): boolean {
    // 定义合法跳转表
    const validTransitions: Partial<Record<GamePhase, GamePhase[]>> = {
      [GamePhase.TITLE]:         [GamePhase.NAME_INPUT, GamePhase.SAVE_LOAD, GamePhase.DEPLOY],
      [GamePhase.NAME_INPUT]:    [GamePhase.DEPLOY],
      [GamePhase.SCENARIO_INTRO]:[GamePhase.DEPLOY],
      [GamePhase.DEPLOY]:        [GamePhase.BATTLE_MAP, GamePhase.SHOP, GamePhase.SAVE_LOAD],
      [GamePhase.BATTLE_MAP]:    [GamePhase.CHAR_ACTION, GamePhase.START_MENU, GamePhase.SHOP, GamePhase.INTERMISSION],
      [GamePhase.CHAR_ACTION]:   [GamePhase.BATTLE_MAP, GamePhase.BATTLE_ANIM],
      [GamePhase.START_MENU]:    [GamePhase.BATTLE_MAP, GamePhase.SAVE_LOAD],
      [GamePhase.BATTLE_ANIM]:   [GamePhase.BATTLE_MAP],
      [GamePhase.SHOP]:          [GamePhase.BATTLE_MAP, GamePhase.DEPLOY],
      [GamePhase.DIALOGUE]:      [GamePhase.BATTLE_MAP, GamePhase.INTERMISSION],
      [GamePhase.INTERMISSION]:  [GamePhase.DEPLOY],
      [GamePhase.SAVE_LOAD]:     [GamePhase.BATTLE_MAP, GamePhase.DEPLOY, GamePhase.TITLE],
      [GamePhase.OPENING]:       [GamePhase.TITLE],
    };

    const allowed = validTransitions[from];
    if (!allowed) return false;
    return allowed.includes(to);
  }

  // ============================================================================
  // 生命周期
  // ============================================================================

  /** 每帧更新 (由 main.ts gameLoop 调用) */
  update(dt?: number, input?: import('../systems/InputSystem.js').Mapper): void {
    // 先应用排队的切换
    this.applyScheduled();

    if (this._current) {
      this._current.update(dt, input);
    }
  }

  /** 销毁所有场景 */
  destroy(): void {
    if (this._current) {
      this._current.destroy();
      this._current = null;
    }
    this._next = null;
    this.history = [];
  }
}
