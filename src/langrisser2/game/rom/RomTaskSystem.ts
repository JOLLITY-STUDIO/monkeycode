/**
 * RomTaskSystem — ROM 任务调度系统翻译
 *
 * ROM 使用任务队列驱动游戏 (execution-trace.md §1.7, §3):
 *   VBlank → (*$FF8004)() → 执行任务函数 → 任务函数设下一个 $FF8004
 *
 * 翻译策略: 逐指令翻译 ROM 68K 汇编为 TS 方法。
 * 每个 `_step_xxxx()` 方法对应 ROM 中一个任务函数。
 * 不伪造任何画面/数据 — 所有数据来自 ROM 或逆向文档。
 */

import { RomProgram, RAM_VARS } from './RomProgram';
import { Ram } from '../core/Ram';
import { VdpChip } from '../vdp/VdpChip';

// ============================================================
// 任务阶段
// ============================================================

const enum Phase {
  /** 等待 RomInits 完成 */
  BOOTING = 0,
  /** 游戏初始化任务链 (C80C → 1C834 → 1C8A8, execution-trace.md §2) */
  GAME_INIT = 1,
  /** 初始化完成, VBLANK 主循环驱动 (ROM 默认任务: C92C, execution-trace.md §3) */
  RUNNING = 2,
}

// ============================================================
// ROM 常量 (从逆向分析中提取)
// ============================================================

/** C80C 阶段 1 末尾: 设置 DMA 参数表指针 */
const C80C_DMA_PARAM_PTR = 0x05DF40;
/** C80C 阶段 1 → 下一任务 */
const NEXT_1C834 = 0x1C834;
/** 1C834 → 下一任务 */
const NEXT_1C8A8 = 0x1C8A8;
/** 1C8A8 完成后 → 默认任务 (ROM 中由 boot 设置, execution-trace.md L143) */
const FOURCC_TASK = 0xC92C;

// ============================================================
// RomTaskSystem
// ============================================================

export class RomTaskSystem extends RomProgram {

  /** 当前阶段 */
  private phase: Phase = Phase.BOOTING;

  /** 阶段内子步骤 (对应 ROM 多帧任务链的帧索引) */
  private step: number = 0;

  /** 帧计数 */
  private frameCount: number = 0;

  constructor(romData: Uint8Array, ram: Ram, vdp: VdpChip) {
    super(romData, ram, vdp);
  }

  // ============================================================
  // 标记外部初始化完成 → 驱动状态机
  // ============================================================

  /** 由调用方在 RomInits.executeAllInits() 之后调用 */
  markInitsDone(): void {
    this.phase = Phase.GAME_INIT;
    this.step = 0;
    console.log('[RomTaskSystem] ROM 任务链启动 (C80C → 1C834 → 1C8A8)');
  }

  // ============================================================
  // 每帧更新 — 对应 ROM VBLANK 中的 (*$FF8004)() 调用
  // ============================================================

  frameUpdate(): void {
    this.frameCount++;

    switch (this.phase) {
      case Phase.BOOTING:
        return;

      case Phase.GAME_INIT:
        this._runInitChain();
        break;

      case Phase.RUNNING:
        // ROM: (*DAT_ffff8004)() — 执行当前任务函数
        this._executeCurrentTask();
        break;
    }
  }

  // ============================================================
  // GAME_INIT: ROM 初始化任务链
  //
  // ROM 中 C80C 在 boot 阶段被直接调用 (execution-trace.md §1.6 L153),
  // 其末尾通过 jmp $85EE 队列 1C834 为下一任务。
  // TS 翻译: C80C 由 RomInits.initGameMain() 完成,
  //          TaskSystem 驱动后续的 1C834 → 1C8A8。
  // ============================================================

  private _runInitChain(): void {
    // 检查当前任务指针
    const taskPtr = this.ram.read32(RAM_VARS.TASK_PTR);

    if (this.step === 0 && taskPtr === 0) {
      // C80C 已在 RomInits 中执行, 此处队列 1C834
      console.log('[RomTaskSystem] 帧1: C80C 已完成 → 队列 1C834');
      this.ram.write32(RAM_VARS.TASK_PTR, NEXT_1C834);
      this.step = 1;
      return;
    }

    if (this.step === 1) {
      // 执行 1C834
      this._transl_1C834();
      this.step = 2;
      return;
    }

    if (this.step === 2) {
      // 执行 1C8A8
      this._transl_1C8A8();
      this.step = 3;
      return;
    }

    // 初始化链完成 → 进入主循环
    console.log('[RomTaskSystem] 初始化链完成 → RUNNING (默认任务 $C92C)');
    this.ram.write32(RAM_VARS.TASK_PTR, FOURCC_TASK);
    this.phase = Phase.RUNNING;
  }

  // ================================================================
  // 翻译: ROM $1C834 — 第二帧初始化
  //
  // ROM 原文 (execution-trace.md §2 注释, RomInits.ts L316-322):
  //   jsr ($00C7F6)         ; 子初始化
  //   jsr ($00C91E)         ; 子初始化
  //   (写 VDP 命令到显示队列)
  //   (加载 ROM $82114 资源)
  //   move.l #$0001C8A8, ($FFFF8004)   ; 队列下一任务
  //   jmp ($0085EE)
  // ================================================================

  private _transl_1C834(): void {
    // TODO: 反汇编 ROM $1C834 并逐指令翻译
    // 当前: 直接队列下一任务
    console.log('[RomTaskSystem] 1C834: 第二帧初始化 → 队列 1C8A8');
    this.ram.write32(RAM_VARS.TASK_PTR, NEXT_1C8A8);
  }

  // ================================================================
  // 翻译: ROM $1C8A8 — 第三帧: 阶段跳转表分派
  //
  // ROM 原文 (execution-trace.md §2 注释):
  //   读取 $FFAE90 (阶段索引)
  //   根据跳转表分派子初始化函数
  //   阶段 0: 标题画面相关初始化
  // ================================================================

  private _transl_1C8A8(): void {
    // TODO: 反汇编 ROM $1C8A8 并逐指令翻译跳转表
    const phaseIdx = this.ram.read16(0xFFAE90);
    console.log(`[RomTaskSystem] 1C8A8: 阶段分派, phaseIdx=${phaseIdx}`);
    // 递增阶段索引 (ROM 行为)
    this.ram.write16(0xFFAE90, phaseIdx + 1);
  }

  // ================================================================
  // RUNNING: 执行当前任务函数 (对应 ROM: (*$FF8004)())
  //
  // ROM VBLANK 主循环 (execution-trace.md §3 L376-381):
  //   FUN_00009498() x5  ; 任务列表调度
  //   (*DAT_ffff8004)()  ; 调用任务函数
  // ================================================================

  private _executeCurrentTask(): void {
    const taskFunc = this.ram.read32(RAM_VARS.TASK_PTR);
    if (taskFunc === 0) return;

    // 任务分发 — 逐函数翻译
    // TODO: 递归翻译所有 ROM 任务函数 (C92C, C93A, C9A0, CA00, ...)
    if (this.frameCount % 60 === 0) {
      console.log(`[RomTaskSystem] 帧${this.frameCount}: 执行任务 $${taskFunc.toString(16).toUpperCase()}`);
    }
  }

  // ============================================================
  // 状态查询
  // ============================================================

  get currentPhase(): number { return this.phase; }
  get frames(): number { return this.frameCount; }
  get isBooted(): boolean { return this.phase >= Phase.RUNNING; }
}
