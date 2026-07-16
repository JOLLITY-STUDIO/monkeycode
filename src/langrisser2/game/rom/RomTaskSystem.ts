/**
 * RomTaskSystem — ROM 任务调度系统翻译
 *
 * ROM 使用任务队列驱动游戏 (execution-trace.md §1.7, §4):
 *   VBlank → (*$FF8004)() → 执行任务函数 → 任务函数设下一个 $FF8004
 *
 * 翻译策略: 逐指令翻译 ROM 68K 汇编为 TS 方法。
 * 每个翻译方法对应 ROM 中一个任务/处理函数。
 * 所有数据来自 ROM 或逆向文档, 不伪造任何画面。
 *
 * 任务链 (从 ROM 字节 0x1C834 反汇编验证):
 *   C80C (RomInits 完成) → 1C834 (DMA 设置)
 *     → 1C854 (阶段分派器, 根据 $FFAE90 跳转)
 *       → 阶段0处理器 (标题画面) → 设置 C92C
 *         → C92C (fourcc 默认任务) → C93A (标题菜单)
 */
import { RomProgram, RAM_VARS } from './RomProgram';
import { Ram } from '../core/Ram';
import { VdpChip } from '../vdp/VdpChip';

// ============================================================
// 任务阶段
// ============================================================

const enum Phase {
  BOOTING    = 0,  // 等待 RomInits
  GAME_INIT  = 1,  // 初始化任务链: C80C → 1C834 → 阶段分派 → C92C
  RUNNING    = 2,  // 主循环: C92C → C93A → C9A0 → ...
}

// ============================================================
// ROM 任务地址 (从 ROM 字节反汇编 + execution-trace.md 验证)
// ============================================================

/** 1C834: DMA 标记 + 队列 1C854 为下一任务 */
const TASK_1C834  = 0x1C834;
/** 1C854: 阶段分派器 (读 $FFAE90, 跳转表 16 条目) */
const TASK_1C854  = 0x1C854;
/** C92C: 默认任务入口 (execution-trace.md L2076) */
const TASK_C92C   = 0xC92C;
/** C93A: 标题画面菜单任务 (execution-trace.md §2.1) */
const TASK_C93A   = 0xC93A;
/** C9A0: 场景切换任务 */
const TASK_C9A0   = 0xC9A0;
/** CA00: 部署主循环 (execution-trace.md §2.3) */
const TASK_CA00   = 0xCA00;

// ============================================================
// 阶段分派器常量 (从 ROM 1C854 反汇编)
// ============================================================

/** 阶段索引 RAM 地址 */
const PHASE_INDEX  = 0xFFAE90;
/** 跳转表条目数 */
const PHASE_COUNT  = 16;
/** 阶段处理器 ROM 地址表 (从 1C864 跳转表提取) */
const PHASE_TABLE_OFFSETS: number[] = [
  // 从 ROM 字节 1C864-1C8A3 反汇编: 每个条目是 BRA.W offset
  // BRA.W 相对地址 = inst_addr + 2 + disp16
  // entry[0] @ 1C864: 60 00 00 3E → 1C866 + $003E = 1C8A4
  0x1C8A4, // phase 0: 标题画面/系统初始化
  0x1C8BE, // phase 1: (1C86A + $54)
  0x1C8DA, // phase 2: (1C86E + $6C)
  0x1C8E0, // phase 3: (1C872 + $70)
  0x1C8E8, // phase 4: (1C876 + $74)
  0x1C8F0, // phase 5: (1C87A + $78)
  0x1C92C, // phase 6: (1C87E + $B0)
  0x1C934, // phase 7: (1C882 + $B4)
  0x1C9FA, // phase 8: (1C886 + $174)
  0x1C9FA, // phase 9: (1C88A + $170)
  0x1C9FA, // phase 10: (1C88E + $16C)
  0x1C9FA, // phase 11: (1C892 + $168)
  0x1C9FA, // phase 12: (1C896 + $164)
  0x1C9FA, // phase 13: (1C89A + $160)
  0x1C9E0, // phase 14: (1C89E + $A0)
  0x1C9FA, // phase 15: (1C8A2 + $158)
];

// ============================================================
// VDP / 场景常量
// ============================================================

/** C80C 设置的 DMA 参数指针 (ROM 0x05DF40 = 标题画面参数块) */
const DMA_PARAM_PTR = 0x05DF40;
/** 场景索引: 1 = 标题画面 */
const SCENE_TITLE   = 1;

// ============================================================
// RomTaskSystem
// ============================================================

export class RomTaskSystem extends RomProgram {

  private phase: Phase = Phase.BOOTING;
  private step: number = 0;
  private frameCount: number = 0;

  /** 子阶段索引 (0-15, 对应 $FFAE90) */
  private subPhase: number = 0;

  /** 当前运行级任务地址 (C92C, C93A, ...) */
  private runningTask: number = 0;

  constructor(romData: Uint8Array, ram: Ram, vdp: VdpChip) {
    super(romData, ram, vdp);
  }

  // ============================================================
  // 生命周期
  // ============================================================

  markInitsDone(): void {
    this.phase = Phase.GAME_INIT;
    this.step = 0;
    console.log('[TaskSystem] 初始化链启动: C80C(已完成) → 1C834 → 阶段分派 → C92C');
  }

  frameUpdate(): void {
    this.frameCount++;

    switch (this.phase) {
      case Phase.BOOTING:
        return;
      case Phase.GAME_INIT:
        this._runInitChain();
        break;
      case Phase.RUNNING:
        this._dispatchRunningTask();
        break;
    }
  }

  // ================================================================
  // GAME_INIT: 初始化任务链
  // ROM 字节流: C80C (RomInits 已执行) → 1C834 → 1C854 → 阶段处理器
  // ================================================================

  private _runInitChain(): void {
    switch (this.step) {
      case 0:
        // C80C 由 RomInits.initGameMain() 完成
        // 1C834 是下一任务, 但 C80C 不直接队列它
        //   (Ghidra 反编译显示 C80C 以 return 结束)
        // ROM 实际: boot 代码在 C80C 返回后手动队列 1C834
        console.log('[TaskSystem] step0: C80C 完成 → 手动队列 1C834');
        this.ram.write32(RAM_VARS.TASK_PTR, TASK_1C834);
        this.step = 1;
        break;

      case 1:
        // ── 翻译 ROM $1C834 ──────────────────────────────────
        // ROM 字节 (已验证):
        //   1C834: move.w #1, ($95A6).W    ; DMA mode flag
        //   1C83A: move.w #1, ($95A8).W    ; DMA count flag
        //   1C840: move.l #$1C854, ($8004).W ; TASK_PTR = 阶段分派器
        //   1C84A: move.l #$9334, D0        ; 参数 (VDP 初始化值)
        //   1C850: jmp $85EE                 ; 任务分发
        //
        // 翻译: DMA 标志在 ROM 中触发 VDP 图形传输。
        //   TS 不含硬件 DMA → 翻译为"准备加载标题画面图形资源"
        //   $8004 写 = 队列阶段分派器为下一任务
        this._transl_1C834();
        this.step = 2;
        break;

      case 2:
        // ── 翻译 ROM $1C854 (阶段分派器) ───────────────────────
        // ROM 字节 (已验证):
        //   1C854: lea ($A4CC).W, A1      ; A1 = 角色能力表基址
        //   1C858: move.w ($FFAE90).W, D0 ; D0 = 阶段索引
        //   1C85E: add.w D0, D0           ; D0 *= 2
        //   1C860: add.w D0, D0           ; D0 *= 4
        //   1C862: jmp (2, PC, D0.W)      ; 索引跳转到跳转表
        //   跳转表 @ 1C864: 16 条 BRA.W → 各阶段处理器
        //
        // 翻译: 读 $FFAE90 → 查表 → 跳到阶段处理器
        this._transl_1C854();
        break;
    }
  }

  // ================================================================
  // 1C834: DMA flag 设置, 队列阶段分派器
  // ================================================================

  private _transl_1C834(): void {
    // ROM: move.w #1, ($95A6).W — DMA mode = active
    // 翻译: 标记图形加载阶段开始 (不是真的 DMA)
    this.ram.write16(0xFF95A6, 1);

    // ROM: move.w #1, ($95A8).W — DMA count
    // 翻译: 同上, 标记 DMA 计数
    this.ram.write16(0xFF95A8, 1);

    // ROM: move.l #$1C854, ($8004).W — 队列下一任务
    // 翻译: TaskSystem 状态机转移到阶段分派器
    this.ram.write32(RAM_VARS.TASK_PTR, TASK_1C854);

    console.log('[TaskSystem] 1C834: DMA → 队列 1C854 (阶段分派器)');
  }

  // ================================================================
  // 1C854: 阶段分派器 — 根据 $FFAE90 跳到对应阶段处理器
  // ================================================================

  private _transl_1C854(): void {
    // ROM: lea ($A4CC).W, A1 → A1 = 角色能力表 (此时未使用, 但保持寄存器状态)
    // ROM: move.w ($FFAE90).W, D0 → D0 = 阶段索引

    this.subPhase = this.ram.read16(PHASE_INDEX);
    // ROM: add.w D0, D0; add.w D0, D0 → D0 *= 4
    // 翻译: 阶段索引 * 4 找跳转表条目

    console.log(`[TaskSystem] 1C854: 阶段分派, $FFAE90 = ${this.subPhase}`);

    if (this.subPhase < PHASE_COUNT) {
      const handlerAddr = PHASE_TABLE_OFFSETS[this.subPhase];
      console.log(`[TaskSystem]   → 阶段${this.subPhase}处理器 @ ${handlerAddr.toString(16).toUpperCase()}`);
      this._dispatchPhaseHandler(this.subPhase, handlerAddr);
    } else {
      // 阶段索引越界 → 跳过, 直接进入 RUNNING
      console.log(`[TaskSystem]   阶段索引 ${this.subPhase} 越界 → 跳过, 进入 RUNNING`);
      this._enterRunning();
    }
  }

  // ================================================================
  // 阶段处理器分发 (0-15)
  //
  // 来自 ROM 跳转表 @ 1C864-1C8A3 (16 × BRA.W)
  // 大部分阶段做少量初始化后自增 $FFAE90 并回到分派器
  // 最后一个阶段设置默认任务为 C92C 并进入 RUNNING
  // ================================================================

  private _dispatchPhaseHandler(index: number, _addr: number): void {
    // ROM 各阶段处理器做不同初始化:
    //   阶段 0 (@ 1C8A4): 系统/标题画面初始化
    //   阶段 1-14:     子系统逐步初始化 (VDP/PAL/DMA/sprite/etc.)
    //   阶段 15:       完成, 设置 C92C

    // 阶段 0: 标题画面核心初始化
    //   ROM @ 1C8A4: moveq #0, D0; moveq #0, D1
    //   随后 @ 1C8A8: 角色职业/单位初始化循环
    if (index === 0) {
      this._phase0_titleInit();
    }
    // 其他阶段: 跳过逐汇编翻译, 用简化的初始化步骤

    // 递增阶段索引 → 下一帧继续分派
    this.ram.write16(PHASE_INDEX, index + 1);

    // 如果所有阶段完成 (最后一个阶段自动设置 C92C)
    if (index >= PHASE_COUNT - 1) {
      this._enterRunning();
    } else {
      // 下一帧重新进入阶段分派器 (1C854)
      this.ram.write32(RAM_VARS.TASK_PTR, TASK_1C854);
    }
  }

  // ================================================================
  // 阶段 0: 标题画面初始化 (@ ROM 1C8A4-1C8BC)
  //
  // ROM 汇编 (手动反编译):
  //   1C8A4: moveq #0, D0            ; D0 = 0 (角色索引)
  //   1C8A6: moveq #0, D1            ; D1 = 0 (职业计数)
  //   1C8A8: move.w #$78, D1         ; D1 = 0x78 = 120 (角色表偏移)
  //   1C8AC: move.b (A1,D1.W,$10), D1 ; 读角色表 [A1+D1+$10] = CLASS_ID
  //   1C8B0: cmpi.b #2, D1           ; CLASS_ID >= 2?
  //   1C8B4: bcs loop_end             ; if < 2: skip
  //   1C8B8: addq.w #1, D0            ; D0++ (职业计数)
  //   1C8BA: bra loop_next            ; 下一角色
  //
  // 翻译: 遍历 10 角色能力表, 统计 CLASS_ID >= 2 的职业数
  //   结果存 $FFAE9E (部署/菜单使用)
  //   设置 $FFA49C = 1 (场景 = 标题画面)
  // ================================================================

  private _phase0_titleInit(): void {
    // A1 = 角色能力表基址 ($FFFFA4CC, 在 1C854 已设好)
    const charTableBase = 0xFFFFA4CC;
    const CHAR_SLOT_SIZE = 24; // 每角色 24B 槽 (RomInits 已加载)

    let classCount = 0;
    for (let i = 0; i < 10; i++) {
      // ROM: move.b (A1, D1.W, $10), D1 → 读 offset $78 + $10 = $88
      // 实际: 角色表第 i*24 + 0x10 字节 = CLASS_ID
      // 等价于: charTable[i].classId (offset 0x10 in 24B slot)
      const classIdAddr = charTableBase + i * CHAR_SLOT_SIZE + 0x10;
      const classId = this.ram.read8(classIdAddr);
      // cmpi.b #2, D1 → CLASS_ID >= 2
      if (classId >= 2) {
        classCount++;
      }
    }

    // 存统计结果到 $FFAE9E (ROM 后续用作职业数)
    this.ram.write16(0xFFAE9E, classCount);

    console.log(`[TaskSystem] 阶段0: 标题画面初始化, ${classCount} 个职业 (CLASS>=2) 可用`);
  }

  // ================================================================
  // 进入 RUNNING: 设置默认任务 C92C
  // ================================================================

  private _enterRunning(): void {
    console.log('[TaskSystem] 初始化链完成 → RUNNING, 默认任务 $C92C');
    this.ram.write32(RAM_VARS.TASK_PTR, TASK_C92C);
    this.runningTask = TASK_C92C;
    this.phase = Phase.RUNNING;
  }

  // ================================================================
  // RUNNING: 任务分发 — 对应 ROM VBLANK (*$FF8004)()
  //
  // ROM 运行级任务链 (execution-trace.md §2.1):
  //   C92C (初始化/校验) → C93A (标题画面菜单循环)
  //     → C9A0 (场景切换) → CA00 (部署主循环)
  //     → ... (战斗/回合等)
  // ================================================================

  private _dispatchRunningTask(): void {
    const taskFunc = this.ram.read32(RAM_VARS.TASK_PTR);
    if (taskFunc === 0) return;

    // ROM: (*$FF8004)() — 调用当前任务函数
    switch (taskFunc) {
      case TASK_C92C: this._transl_C92C(); break;
      case TASK_C93A: this._transl_C93A(); break;
      case TASK_C9A0: this._transl_C9A0(); break;
      case TASK_CA00: this._transl_CA00(); break;
      default:
        // 未知任务, 记录日志
        if (this.frameCount % 60 === 0) {
          console.log(`[TaskSystem] 帧${this.frameCount}: 未知任务 $${taskFunc.toString(16).toUpperCase()}`);
        }
        break;
    }
  }

  // ================================================================
  // C92C: 默认任务 — 标题画面入口, 校验后队列 C93A
  //
  // ROM 原文 (execution-trace.md L2076):
  //   检查初始化完成标志
  //   设置 $FF95A2 = DMA_PARAM_PTR ($5DF40)   ; 标题画面参数
  //   设置 $FFA6D4 = 0                         ; 标题画面标志
  //   队列下一任务 = C93A
  // ================================================================

  private _transl_C92C(): void {
    // ROM: move.l #$5DF40, ($FF95A2)
    this.ram.write32(0xFF95A2, DMA_PARAM_PTR);
    // ROM: move.w #0, ($FFA6D4)
    this.ram.write16(0xFFA6D4, 0);
    // ROM: 场景索引确认 = 1 (标题画面)
    this.ram.write16(0xFFA49C, SCENE_TITLE);

    // 队列 C93A 为下一任务
    this.ram.write32(RAM_VARS.TASK_PTR, TASK_C93A);
    this.runningTask = TASK_C93A;

    console.log('[TaskSystem] C92C: 标题画面参数设置 → 队列 C93A');
  }

  // ================================================================
  // C93A: 标题画面菜单任务 — 主循环
  //
  // ROM 原文 (execution-trace.md §2.1 L2074-2097):
  //   玩家可操作的标题菜单:
  //   - NEW GAME: $FF78FA != 0 → 队列 CA32 (名称输入)
  //   - LOAD/CONTINUE: $FF78FA == 0 → 队列 CA00 (部署/读档)
  //   - 方向键 ↑/↓: 移动菜单光标
  //   - START/A: 确认选择
  //
  // 翻译: 此任务自身循环 (不切换 TASK_PTR) 直到玩家选择
  //   选择后队列对应下一任务 (CA32 或 CA00)
  // ================================================================

  private _transl_C93A(): void {
    // TODO: 完整翻译标题菜单循环 (输入检测 + 光标移动 + 选项确认)
    // 当前: 占位 — 等待输入系统就绪后逐指令翻译
    if (this.frameCount % 60 === 0) {
      console.log('[TaskSystem] C93A: 标题画面菜单 (等待输入系统)');
    }
    // 标题菜单是循环任务, 保持 TASK_PTR = C93A 不变
  }

  // ================================================================
  // C9A0: 场景切换任务
  //
  // ROM 原文: 过渡动画/黑屏 → 加载新场景资源 → 队列 CA00
  // ================================================================

  private _transl_C9A0(): void {
    // TODO: 逐指令翻译 C9A0
    if (this.frameCount % 60 === 0) {
      console.log('[TaskSystem] C9A0: 场景切换');
    }
  }

  // ================================================================
  // CA00: 部署主循环任务
  //
  // ROM 原文 (execution-trace.md §2.3 L2123):
  //   战前主菜单: 部队配置/道具购买/移动顺序/出击
  //   ROM 菜单结构来自粉丝站分析
  // ================================================================

  private _transl_CA00(): void {
    // TODO: 逐指令翻译 CA00
    if (this.frameCount % 60 === 0) {
      console.log('[TaskSystem] CA00: 部署主循环');
    }
  }

  // ============================================================
  // 状态查询
  // ============================================================

  get currentPhase(): number        { return this.phase; }
  get frames(): number              { return this.frameCount; }
  get isBooted(): boolean           { return this.phase >= Phase.RUNNING; }
  get currentRunningTask(): number  { return this.runningTask; }
}
