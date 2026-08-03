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
 *   $81FD: .WORD ...      ; 9 个状态跳转指针 (小端序)
 *   详见 GameStateTable.ts
 */

import { CpuMemory } from '../memory/CpuMemory';
import { NmiHandler } from './NmiHandler';
import { InputManager } from '../input/InputManager';
import { PpuBus } from '../ppu/PpuBus';
import { GameState, GAME_STATE_TABLE, GAME_STATE_NAMES } from './GameStateTable';

/** 游戏状态处理器类型 */
export type StateHandler = (mem: CpuMemory) => void;

export class GameLoop {
  private mem: CpuMemory;
  private nmi: NmiHandler;
  private ppuBus: PpuBus;
  private input: InputManager;

  /** 状态处理器映射 (由 GameState 索引) */
  private stateHandlers: Map<GameState, StateHandler> = new Map();

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

  /** NMI 已执行标志 (模拟 VBlank 期间 NMI 先于主循环) */
  private nmiExecuted: boolean = false;

  constructor(
    mem: CpuMemory,
    nmi: NmiHandler,
    ppuBus: PpuBus,
    input: InputManager,
  ) {
    this.mem = mem;
    this.nmi = nmi;
    this.ppuBus = ppuBus;
    this.input = input;
  }

  /** 注册状态处理器 (按 GameState 枚举) */
  registerStateHandler(state: GameState, handler: StateHandler): void {
    this.stateHandlers.set(state, handler);
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

    // 绑定输入
    this.input.attach();

    // 开始循环
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

    // 固定时间步长更新
    while (this.accumulator >= this.frameInterval) {
      this.accumulator -= this.frameInterval;
      this.step();
    }

    // 渲染
    if (this.renderCallback) {
      this.renderCallback();
    }

    requestAnimationFrame((t) => this.loop(t));
  }

  /** 执行一帧游戏逻辑 */
  private step(): void {
    // 1. NMI 处理 (每帧先执行 NMI)
    this.nmi.execute();
    this.nmiExecuted = true;

    // 2. 等待 VBlank (在 NES 中，主循环通过 $8314 等待 $0300 非零)
    //    在 H5 中，NMI 已经递增了帧计数器，所以直接进入状态更新
    this.waitVBlank();

    // 3. 执行游戏状态逻辑 ($81F7)
    this.executeState();
  }

  /** 等待 VBlank ($8314) */
  private waitVBlank(): void {
    // 原始代码轮询 $0300 直到非零
    // 在 H5 中，我们确保 NMI 已经执行完毕
    if (!this.nmiExecuted) {
      // 如果 NMI 还没执行，手动执行一次
      this.nmi.execute();
      this.nmiExecuted = true;
    }
  }

  /**
   * 执行游戏状态逻辑 ($81F7)
   * 
   * 原始 6502 代码:
   *   $81F7: LDA $03ca      ; A = 游戏状态编号 (0-7)
   *   $81FA: JSR $834d      ; 调用分发器
   *   
   * 分发器 $834d:
   *   ASL A                 ; A *= 2 (每个指针2字节)
   *   TAY                   ; Y = 偏移量
   *   PLA / STA $14         ; 弹出返回地址 ($81FD)
   *   PLA / STA $15
   *   INY                   ; 先读高字节(小端序)
   *   LDA ($14),Y / PHA
   *   INY
   *   LDA ($14),Y / STA $15 ; 低字节 → $15
   *   PLA / STA $14          ; 高字节 → $14
   *   JMP ($0014)            ; 间接跳转到目标
   * 
   * 跳转表 ($81FD):
   *   [0] $82A1, [1] $82A7, [2] $8276, [3] $85CD,
   *   [4] $87B9, [5] $820D, [6] $8264, [7] $8270
   * 
   * 在 H5 中，直接用 Map<GameState, handler> 替代跳转表。
   */
  private executeState(): void {
    const rawState = this.mem.gameState;
    const state = rawState as GameState;
    const handler = this.stateHandlers.get(state);

    if (handler) {
      handler(this.mem);
    } else {
      console.warn(
        `[GameLoop] Unknown game state: ${rawState} (0x${rawState.toString(16).padStart(2, '0')}), ` +
        `valid range: 0-7`
      );
    }
  }

  /**
   * 手动触发一帧 (用于调试/单步执行)
   */
  stepFrame(): void {
    this.step();
    if (this.renderCallback) {
      this.renderCallback();
    }
  }
}
