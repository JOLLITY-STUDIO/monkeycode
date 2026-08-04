/**
 * 状态基类
 *
 * 重构要点 (v0.6.0):
 *   状态是纯逻辑层，只能通过 model (GameModel) 描述"要显示什么"。
 *   绝对不直接调 renderer.writeVram() 或 oam.setSprite()。
 *   这些渲染细节由 SceneComposer (view层) 负责。
 *
 *   保留 renderer/oam 引用仅为兼容旧代码，逐步废弃。
 */

import type { IGameState } from '../StateMachine';
import type { StateMachine } from '../StateMachine';
import type { DataCache } from '../../cache/DataCache';
import type { InputManager } from '../../input/InputManager';
import type { Renderer } from '../../renderer/Renderer';
import type { OamCache } from '../../cache/OamCache';
import type { BankManager } from '../../cache/BankManager';
import type { PpuQueue } from '../../cache/PpuQueue';
import type { GameModel } from '../../model/GameModel';

export abstract class StateBase implements IGameState {
  abstract readonly id: number;

  protected sm: StateMachine;
  protected data: DataCache;
  protected input: InputManager;
  /** @deprecated 使用 model 替代直接 VRAM 写入 */
  protected renderer: Renderer;
  /** @deprecated 使用 model 替代直接 OAM 写入 */
  protected oam: OamCache;
  protected banks: BankManager;
  protected ppuQueue: PpuQueue;

  /** 游戏数据模型 — 状态通过它描述画面内容 */
  protected get model(): GameModel {
    return this.sm.getModel();
  }

  constructor(sm: StateMachine) {
    this.sm = sm;
    this.data = sm.getDataCache();
    this.input = sm.getInputManager();
    this.renderer = sm.getRenderer();
    this.oam = sm.getOamCache();
    this.banks = sm.getBankManager();
    this.ppuQueue = sm.getPpuQueue();
  }

  abstract onEnter(): void;
  abstract onUpdate(): void;

  onExit(): void {
    // 默认空实现
  }
}
