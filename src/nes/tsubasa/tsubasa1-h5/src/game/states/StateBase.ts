/**
 * 游戏状态处理器基类/接口
 * 
 * 每个 GameState (0-7) 都实现这个接口，
 * 对应原始 ROM 中 Bank $00 的跳转表 ($81FD) 分发到的处理函数。
 * 
 * 原始分发逻辑:
 *   $81F7: LDA $03CA     ; 加载游戏状态编号
 *   $81FA: JSR $834D     ; 调用分发器 (ASL A + 间接 JMP)
 *   $81FD: .WORD ...     ; 8 个跳转指针
 * 
 * 在 H5 中，每个状态实现 enter() / update() / exit() 生命周期。
 */

import { CpuMemory } from '../../memory/CpuMemory';
import { PpuBus } from '../../ppu/PpuBus';
import { InputManager } from '../../input/InputManager';
import { Mmc1Mapper } from '../../mapper/Mmc1Mapper';
import { GameState } from '../GameStateTable';

/**
 * 状态上下文 - 状态处理器可以访问的所有子系统
 * 避免每个状态文件都要 import 一堆东西
 */
export interface StateContext {
  /** CPU 内存 (含 Zero Page / RAM / 寄存器) */
  mem: CpuMemory;
  /** PPU 总线 (Name Table / Pattern Table / 调色板) */
  ppuBus: PpuBus;
  /** MMC1 映射器 (Bank 切换) */
  mmc1: Mmc1Mapper;
  /** 输入管理器 */
  input: InputManager;
}

/**
 * 状态处理器接口
 * 每个 GameState 文件实现此接口
 */
export interface IStateHandler {
  /** 状态编号 (0-7) */
  readonly state: GameState;

  /** 状态名称 (调试用) */
  readonly name: string;

  /**
   * 进入状态时调用一次
   * 对应原始 ROM 中状态初始化逻辑 (如 $82A1 的 INIT_TITLE)
   */
  enter(ctx: StateContext): void;

  /**
   * 每帧调用 (在 NMI 之后、渲染之前)
   * 对应原始 ROM 中状态主循环逻辑
   * 如 $82A7 TITLE_LOOP, $87B9 MATCH_MAIN 等
   */
  update(ctx: StateContext): void;

  /**
   * 离开状态时调用一次
   * 用于清理/状态切换准备
   */
  exit(ctx: StateContext): void;
}

/**
 * 状态处理器基类 - 提供默认空实现
 * 具体状态文件继承此类，只覆写需要的方法
 */
export abstract class StateBase implements IStateHandler {
  abstract readonly state: GameState;
  abstract readonly name: string;

  enter(_ctx: StateContext): void {
    // 默认: 无操作
  }

  abstract update(ctx: StateContext): void;

  exit(_ctx: StateContext): void {
    // 默认: 无操作
  }
}
