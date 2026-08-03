/**
 * 主游戏循环
 *
 * 对应 Bank $00 中的主循环 ($81EE):
 *   $81EE: JSR $8314  → 等待 VBlank
 *   $81F1: JSR $81F7  → 执行游戏状态逻辑
 *   $81F4: JMP $81EE  → 无限循环
 *
 * 在 H5 中，使用 requestAnimationFrame 驱动循环。
 * 每帧执行: NMI 处理 → 等待 VBlank → 游戏状态更新 → 渲染
 *
 * 状态分发逻辑对应:
 *   $81F7: LDA $03ca      ; 加载游戏状态编号
 *   $81FA: JSR $834d      ; 调用跳转表分发器 (ASL A + 间接 JMP)
 *   $81FD: .WORD ...      ; 8 个状态跳转指针 (小端序)
 *
 * v2: 支持 IStateHandler 接口 (enter/update/exit 生命周期)
 */

import { CpuMemory } from '../memory/CpuMemory';
import { NmiHandler } from './NmiHandler';
import { InputManager } from '../input/InputManager';
import { PpuBus } from '../ppu/PpuBus';
import { Mmc1Mapper } from '../mapper/Mmc1Mapper';
import { GameState, GAME_STATE_NAMES } from './GameStateTable';
import { IStateHandler, StateContext } from './states/StateBase';

export class GameLoop {
  private mem: CpuMemory;
  private nmi: NmiHandler;
  private ppuBus: PpuBus;
  private input: InputManager;
  private mmc1: Mmc1Mapper;

  /** 状态上下文 (传给每个状态处理器) */
  private ctx: StateContext;

  /** 状态处理器映射 (按 GameState 枚举索引) */
  private stateHandlers: Map<GameState, IStateHandler> = new Map();

  /** 上一帧的状态编号 (用于检测状态切换) */
  private prevState: number = -1;

  /** 渲染回调 */
  private renderCallback: (() => void) | null = null;

  /** 是否运行中 */
  private running: boolean = false;

  /** 上一帧时间戳 */
  private lastTime: number = 0;

  /** 帧率控制 (NES 标准 60fps → 约 16.67ms) */
  private frameInterval: number = 1000 / 60;

  /** 累计时间 */
  private accumulator: number = 0;

  /** NMI 已执行标志 */
  private nmiExecuted: boolean = false;

  constructor(
    mem: CpuMemory,
    nmi: NmiHandler,
    ppuBus: PpuBus,
    input: InputManager,
    mmc1: Mmc1Mapper,
  ) {
    this.mem = mem;
    this.nmi = nmi;
    this.ppuBus = ppuBus;
    this.input = input;
    this.mmc1 = mmc1;

    this.ctx = { mem, ppuBus, mmc1, input };
  }

  /** 注册状态处理器 */
  registerStateHandler(handler: IStateHandler): void {
    this.stateHandlers.set(handler.state, handler);
    console.log(
      `[GameLoop] 注册状态处理器: [${handler.state}] ${handler.name}`
    );
  }

  /** 设置渲染回调 */
  setRenderCallback(cb: () => void): void {
    this.renderCallback = cb;
  }

  /** 启动游戏循环 */
  start(): void {
    if (this.running) return;
    this.running = true;
    this.lastTime = performance.now();
    this.accumulator = 0;
    this.prevState = -1;

    this.input.attach();
    requestAnimationFrame((t) => this.loop(t));
  }

  /** 停止游戏循环 */
  stop(): void {
    this.running = false;
    this.input.detach();
  }

  /** 主循环 */
  private loop(currentTime: number): void {
    if (!this.running) return;

    const delta = currentTime - this.lastTime;
    this.lastTime = currentTime;
    this.accumulator += delta;

    while (this.accumulator >= this.frameInterval) {
      this.accumulator -= this.frameInterval;
      this.step();
    }

    if (this.renderCallback) {
      this.renderCallback();
    }

    requestAnimationFrame((t) => this.loop(t));
  }

  /** 执行一帧游戏逻辑 */
  private step(): void {
    // 1. NMI 处理
    this.nmi.execute();
    this.nmiExecuted = true;

    // 2. 等待 VBlank
    this.waitVBlank();

    // 3. 执行游戏状态逻辑
    this.executeState();
  }

  /** 等待 VBlank ($8314) */
  private waitVBlank(): void {
    if (!this.nmiExecuted) {
      this.nmi.execute();
      this.nmiExecuted = true;
    }
  }

  /**
   * 执行游戏状态逻辑
   *
   * 每帧检测 $03CA 是否变化:
   *   - 如果状态变了 → 调用旧状态的 exit() + 新状态的 enter()
   *   - 然后调用当前状态的 update()
   */
  private executeState(): void {
    const rawState = this.mem.gameState;
    const state = rawState as GameState;

    // 检测状态切换
    if (rawState !== this.prevState) {
      this.onStateChange(this.prevState, rawState);
      this.prevState = rawState;
    }

    // 执行当前状态的 update()
    const handler = this.stateHandlers.get(state);
    if (handler) {
      handler.update(this.ctx);
    } else {
      console.warn(
        `[GameLoop] 未注册的状态处理器: ${rawState} ` +
        `(${GAME_STATE_NAMES[state] ?? 'UNKNOWN'})`
      );
    }
  }

  /**
   * 状态切换处理
   * 调用旧状态的 exit() 和新状态的 enter()
   */
  private onStateChange(prevRaw: number, nextRaw: number): void {
    const prevState = prevRaw as GameState;
    const nextState = nextRaw as GameState;

    console.log(
      `[GameLoop] 状态切换: ${prevRaw}(${GAME_STATE_NAMES[prevState] ?? '?'}) ` +
      `→ ${nextRaw}(${GAME_STATE_NAMES[nextState] ?? '?'})`
    );

    // 退出旧状态
    if (prevRaw >= 0) {
      const prevHandler = this.stateHandlers.get(prevState);
      if (prevHandler) {
        prevHandler.exit(this.ctx);
      }
    }

    // 进入新状态
    const nextHandler = this.stateHandlers.get(nextState);
    if (nextHandler) {
      nextHandler.enter(this.ctx);
    }
  }

  /** 手动触发一帧 (调试用) */
  stepFrame(): void {
    this.step();
    if (this.renderCallback) {
      this.renderCallback();
    }
  }
}
