/**
 * 状态基类
 */

import type { IGameState } from '../StateMachine';
import type { StateMachine } from '../StateMachine';
import type { DataCache } from '../../cache/DataCache';
import type { InputManager } from '../../input/InputManager';
import type { Renderer } from '../../renderer/Renderer';
import type { OamCache } from '../../cache/OamCache';
import type { BankManager } from '../../cache/BankManager';
import type { PpuQueue } from '../../cache/PpuQueue';

export abstract class StateBase implements IGameState {
  abstract readonly id: number;

  protected sm: StateMachine;
  protected data: DataCache;
  protected input: InputManager;
  protected renderer: Renderer;
  protected oam: OamCache;
  protected banks: BankManager;
  protected ppuQueue: PpuQueue;

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
