/**
 * RomInits — ROM 启动初始化函数翻译
 *
 * 将 ROM $800A 之后的 68K 汇编初始化函数逐段翻译为 TypeScript。
 * 每个方法对应 ROM 中一个 FUN_xxxxxxxx 函数。
 *
 * 架构: 基于 RomProgram 运行时 (寄存器/RAM/VDP 桥接)
 *       不使用 CPU 模拟器, 而是直接用 TS 重写 ROM 逻辑
 */

import { RomProgram, CCR, RAM_VARS } from './RomProgram';
import { Ram } from '../core/Ram';
import { VdpChip } from '../vdp/VdpChip';

// ============================================================
// ROM 常量 (从 ROM 数据中提取的硬编码值)
// ============================================================

/** ROM $868E 控制器初始化数据表 (20 words = 40 bytes, 对应的 I/O 端口) */
// $868E: 0004, 0024, 0007... — 控制器端口配置
// 实际: dc.w $0004, dc.w $0024, dc.w $0007, ...
// 这些是 Genesis 控制器/扩展端口 I/O 地址
const CONTROLLER_IO_TABLE = [
  0x0004, 0x0024, 0x0007, 0x0000, 0x0000,
  0x0000, 0x0000, 0x003D, 0x0000, 0x0001,
  // ROM $8696-$86AF 区域 (部分可能被误解析为代码)
];

/** ROM 显示队列初始化指向 — $FF81C0 / $FF81C4 / $FF81C8 / $FF81CC */
const DISP_QUEUE_START = 0xFF81C0;

// ============================================================
// RomInits — 翻译后的 ROM 初始化函数集合
// ============================================================

export class RomInits extends RomProgram {

  constructor(romData: Uint8Array, ram: Ram, vdp: VdpChip) {
    super(romData, ram, vdp);
  }

  // ================================================================
  // 6. 控制器初始化 — ROM FUN_0000866c ($866C)
  //
  // 68K 原文:
  //   movem.l a6/a5/a4/d6,-(a7)
  //   lea ($868E).l, a1        ; 端口号表
  //   moveq #0, d1             ; 端口索引 = 0
  //   move.w #$12, d3          ; 循环 19 次
  // loop:
  //   move.w (a1)+, d2          ; 取端口号
  //   bsr.w $899A              ; 初始化该端口
  //   addq.w #1, d1            ; 索引++
  //   dbf d3, loop
  //   movem.l (a7)+, d6/a4/a5/a6
  //   rts
  //
  // 翻译: 对 Genesis 控制器的 $13 个 I/O 端口做初始化配置
  // ================================================================
  initController(): void {
    // ROM $868E 端口号表 (从 ROM 读取)
    // 实际端口号: ROM $868E 开始的 20 words
    const portTableBase = 0x868E;

    for (let i = 0; i <= 0x12; i++) {
      const portNum = this.rom16(portTableBase + i * 2);
      this.initSinglePort(portNum, i);
    }
  }

  /**
   * 初始化单个 I/O 端口 — ROM FUN_0000899a
   * 对应 Genesis 硬件端口的初始化时序
   */
  private initSinglePort(portNum: number, _index: number): void {
    // ROM $899A 实现: 根据端口号做不同的初始化
    // 简化处理: 大部分 I/O 端口在 TS 环境中不需要初始化
    // 只记录状态
    if (portNum === 0) return;

    // 对于真实需要的端口初始化, 在此补充
    // 当前阶段: 标记已初始化, 不做实际 I/O 操作
  }

  // ================================================================
  // 7. Z80/DMA 子系统初始化 — ROM FUN_000086b4 ($86B4)
  //
  // 68K 原文:
  //   move.w #$2700, SR          ; 关中断
  //   move.w #$100, (Z80_BUSREQ) ; 请求 Z80 总线
  //   move.w #$100, (Z80_RESET)  ; 复位 Z80
  //   lea (Z80_RAM), a1          ; 目标: Z80 RAM
  //   lea ($1EC000), a0          ; 源: ROM [$1EC000]
  //   move.w #$1FFF, d0          ; 8KB
  // copy_loop:
  //   move.b (a0)+, d7           ; 读源
  // verify:
  //   move.b d7, (a1)            ; 写目标
  //   move.b (a1), d6            ; 读回
  //   cmp.b d6, d7               ; 校验
  //   bne.s verify               ; 不匹配则重试
  //   addq.l #1, a1              ; 目标++
  //   dbf d0, copy_loop          ; 循环
  //   move.w #$0000, (Z80_RESET) ; 释放 Z80 复位
  //   (延迟循环 $BF 次)
  //   move.w #$0100, (Z80_RESET)
  //   bsr.w $8990                ; 等待 Z80 就绪
  //   rte
  //
  // 翻译: Z80 程序加载到 Z80 RAM (8KB @ $1EC000)
  //       TS 环境不需要真实 Z80, 只需记录状态
  // ================================================================
  initZ80Dma(): void {
    // Z80 初始化 — 在 TS 环境中不需要真正加载 Z80 代码
    // ROM $1EC000-$1FFFFF = Z80 音频程序
    // 只需标记 Z80 已初始化

    // 如果需要音效, 后续可以单独初始化 YM2612 模拟器
    // 当前阶段: 跳过 Z80 初始化
  }

  // ================================================================
  // 8. 显示队列初始化 — ROM FUN_00008a6c ($8A6C)
  //
  // 68K 原文 (摘要):
  //   move.w #$2700, SR          ; 关中断
  //   move.w #$100, (Z80_BUSREQ) ; 锁 Z80 总线
  //   bset #4, ($FFFF81A9)       ; 设置标志
  //   lea ($FFFF81C0), a0        ; 显示队列头
  //   lea ($FFFF81CC), a1        ; 显示队列尾
  //   (后续初始化显示队列结构...)
  //
  // 翻译: 清空 VDP 显示命令队列
  //       $FFFF81C0-$FFFF81FF = 显示命令缓冲区头尾指针
  // ================================================================
  initDisplayQueue(): void {
    // 显示队列区域: $FF81C0-$FF81CF
    // $FF81C0: 队列头指针
    // $FF81C4: 队列当前写指针
    // $FF81C8: 队列末尾指针
    // $FF81CC: 队列容量上限

    // 初始化队列指针 (ROM 在 Boot 级已清零, 这里做显式设置)
    this.ram.write32(DISP_QUEUE_START,     DISP_QUEUE_START); // head
    this.ram.write32(DISP_QUEUE_START + 4, DISP_QUEUE_START); // curr
    this.ram.write32(DISP_QUEUE_START + 8, DISP_QUEUE_START); // end
    this.ram.write32(DISP_QUEUE_START + 12, DISP_QUEUE_START + 0x200); // limit
  }

  // ================================================================
  // 9. 输入状态初始化 — ROM FUN_00009020 ($9020)
  //
  // 68K 原文:
  //   clr.w ($FFFF9050)          ; 输入变量区清零
  //   clr.w ($FFFF9052)
  //   clr.w ($FFFF9054)
  //   clr.w ($FFFF9056)
  //   move.w #$0000, ($FFFF905A)
  //   move.w #$0000, ($FFFF9058)
  //   lea ($FFFF905C), a0        ; 输入序列缓冲区
  //   move.w #$00EF, d0          ; 240 个条目
  //   moveq #0, d1               ; 写入值 = 0
  // loop:
  //   move.l d1, (a0)+           ; 写 4 字节
  //   move.w d0, d2
  //   andi.w #$0003, d2
  //   bne skip                   ; 每 4 次不调整
  //   subi.l #$00010001, d1      ; 调整值
  // skip:
  //   dbf d0, loop
  //   rts
  //
  // 翻译: 清空输入变量区域 $FF9050-$FF9420 (976 bytes)
  //      然后填充一个递减的模式到输入序列缓冲区
  // ================================================================
  initInputState(): void {
    // 清空输入核心变量区域
    this.ram.write16(RAM_VARS.INPUT_CURRENT, 0);
    this.ram.write16(RAM_VARS.INPUT_PREV, 0);
    this.ram.write16(RAM_VARS.INPUT_PRESSED, 0);

    // $FF9050-$FF905A 区域清零
    for (let addr = 0xFF9050; addr <= 0xFF905A; addr += 2) {
      this.ram.write16(addr, 0);
    }

    // 输入序列缓冲区 $FF905C-$FF941F (960 bytes)
    // 填充递减模式
    let pattern = 0;
    for (let i = 0; i <= 0xEF; i++) {
      this.ram.write32(0xFF905C + i * 4, pattern);
      if ((i & 3) === 0 && i !== 0) {
        pattern -= 0x00010001;
      }
    }
  }

  // ================================================================
  // 10. 显示列表初始化 — ROM FUN_00009172 ($9172)
  //
  // 68K 原文:
  //   movem.l a6/d6,-(a7)
  //   lea ($FFFF9422), a1        ; 显示列表起始地址
  //   moveq #31, d1              ; 32 个条目
  // loop:
  //   clr.l (a1)+                ; 清零 4 字节
  //   dbf d1, loop
  //   move.w #$0001, ($FFFF95AE) ; 设置活动标志
  //   movem.l (a7)+, d6/a6
  //   rts
  //
  // 翻译: 清空 32 个显示列表槽位 ($FF9422-$FF94A1)
  //       设置 $FF95AE = 1 (显示列表活动)
  // ================================================================
  initDisplayList(): void {
    // 清空显示列表区域 $FF9422-$FF94A1 (128 bytes = 32 × 4)
    for (let addr = 0xFF9422; addr <= 0xFF94A1; addr += 4) {
      this.ram.write32(addr, 0);
    }

    // 设置显示列表活动标志
    this.ram.write16(0xFF95AE, 1);
  }

  // ================================================================
  // 11. 任务调度器初始化 — ROM FUN_0000942a ($942A)
  //
  // 68K 原文 (摘要):
  //   ; 区域1: $FF95B8-$FF95E1 — 清零 (1 条, 步长 $2A)
  //   movea.l #$FFFF95B8, a1
  //   move.w #$0000, d1        ; 注意: dbf = 1 次
  // loop1:
  //   clr.w (a1)
  //   adda.w #$002A, a1
  //   dbf d1, loop1
  //   ; 区域2: $FF95E2-$FF9B61 — 清零 (64 条, 步长 $16)
  //   movea.l #$FFFF95E2, a1
  //   move.w #$003F, d1
  // loop2: clr.w (a1); adda.w #$0016, a1; dbf d1, loop2
  //   ; 区域3: $FF9B62-$FF9CC1 — 清零 (16 条, 步长 $16)
  //   ; 区域4: $FF9CC2-$FF9CEF — 清零 (1 条, 步长 $2E)
  //   ; 区域5: $FF9CF0-$FFA61B — 清零 (16 条, 步长 $22)
  //   ; 继续更多区域...
  //   rts
  //
  // 翻译: 清零多个任务/状态数据结构
  //      这些区域在 RAM 清零后需要结构化的初始值
  // ================================================================
  initTaskScheduler(): void {
    // 这些数据结构用于任务队列、精灵管理、游戏状态
    // 在 RAM 已清零的前提下, 此处显式确认清零

    // 区域1: $FF95B8-$FF95E1 (1 entry × $2A = 42 bytes)
    for (let addr = 0xFF95B8; addr <= 0xFF95E1; addr += 0x2A) {
      this.ram.write16(addr, 0);
    }

    // 区域2: $FF95E2-$FF9B61 (64 entries × $16 = 1408 bytes)
    for (let addr = 0xFF95E2; addr <= 0xFF9B61; addr += 0x16) {
      this.ram.write16(addr, 0);
    }

    // 区域3: $FF9B62-$FF9CC1 (16 entries × $16 = 352 bytes)
    for (let addr = 0xFF9B62; addr <= 0xFF9CC1; addr += 0x16) {
      this.ram.write16(addr, 0);
    }

    // 区域4: $FF9CC2-$FF9CEF (1 entry × $2E = 46 bytes)
    for (let addr = 0xFF9CC2; addr <= 0xFF9CEF; addr += 0x2E) {
      this.ram.write16(addr, 0);
    }

    // 区域5: $FF9CF0-$FFA61B (16 entries × $22 = 544 bytes)
    for (let addr = 0xFF9CF0; addr <= 0xFFA61B; addr += 0x22) {
      this.ram.write16(addr, 0);
    }

    // 区域6+: 继续到 $FFA6xx 区域
    // ROM $9484-$9496: 更多清零区域
    for (let addr = 0xFFA620; addr <= 0xFFA6FF; addr += 0x22) {
      this.ram.write16(addr, 0);
    }
  }

  // ================================================================
  // 12. 系统底层初始化 — ROM FUN_0001ddc8 ($1DDC8)
  //
  // 作用: 设置基本系统变量, 初始化 RAM 结构
  // 该函数在 $010000-$020000 区域, Ghidra 已分析
  // TODO: 需要从 ROM 中提取确切的反汇编
  // ================================================================
  initSystem(): void {
    // TODO: 从 ROM $1DDC8 提取并翻译
    // 已知作用: 初始化系统标志位, 设置默认值
    // RAM $FF8000-$FF80FF 栈帧区域

    // 设置游戏阶段初始值为部署阶段(?) 或标题画面
    this.writeRamVar(RAM_VARS.GAME_PHASE, 0, 2);

    // 设置任务调度指针
    this.writeRamVar(RAM_VARS.TASK_PTR, 0, 4);
  }

  // ================================================================
  // 13. 游戏主初始化 — ROM FUN_0000c80c ($C80C)
  //
  // 翻译来源: execution-trace.md §2 "游戏主初始化" (L180-271)
  //   + Ghidra 反编译 [ghidra-decompile.c:5858-5933]
  //
  // 逐行翻译 68K 汇编, 保持 ROM 原始逻辑顺序。
  // C80C 末尾 jmp $85EE 队列 1C834 为下一任务 (由 RomTaskSystem 驱动)。
  // ================================================================

  /** ROM 0x061AC5: 场景名称模板 (FF 终止) */
  private static readonly ROM_SCENE_NAME = 0x061AC5;
  /** ROM 0x097404: 单位组配置数据 (FFFF 终止) */
  private static readonly ROM_UNIT_GROUPS = 0x097404;
  /** ROM 0x05E64A: 角色能力初始表 (10 角色 × 14B 有效) */
  private static readonly ROM_CHAR_ABILITY_TABLE = 0x05E64A;
  /** RAM 0xFFFFA4CC: 角色能力运行时表 (10 角色 × 24B) */
  private static readonly RAM_CHAR_ABILITY = 0xFFFFA4CC;
  /** 角色数 */
  private static readonly CHAR_COUNT = 10;
  /** 每角色源数据大小 */
  private static readonly CHAR_SRC_SIZE = 14;
  /** 每角色运行时槽大小 */
  private static readonly CHAR_SLOT_SIZE = 24;

  initGameMain(): void {
    // ── §2.1: 子系统初始化 ──
    // TODO: FUN_0000fb5a() — Z80 音频命令 (0xFE=静音), 暂无音频, 跳过
    // TODO: FUN_00011f88() — SRAM 读取/存档初始化, 暂无存档, 跳过

    // ── §2.2: 游戏状态变量初始化 (L194-213) ──
    this.ram.write16(0xFF78FA, 0xFFFF);  // 全局标志
    this.ram.write16(0xFFA49C, 1);       // ★ 场景索引 = 1 (标题画面)
    this.ram.write16(0xFFA49E, 0);       // 场景子索引
    this.ram.write16(0xFFA4A0, 1);       // 状态标志
    this.ram.write16(0xFFA4A2, 1);       // 状态标志
    this.ram.write16(0xFFA4A4, 0x600);   // 视口 X = $600
    this.ram.write16(0xFFA95C + 2, 0x600); // 视口 X 备份 ($FFA95E)
    this.ram.write8(0xFFA4A6, 7);        // 显示参数
    this.ram.write8(0xFFA4A7, 6);        // 显示参数
    this.ram.write8(0xFFA4A8, 4);        // 显示参数
    this.ram.write8(0xFFA4A9, 5);        // 显示参数

    // 清零 $FFA4AA - $FFA4B7 (7 个 word)
    for (let addr = 0xFFA4AA; addr <= 0xFFA4B7; addr += 2) {
      this.ram.write16(addr, 0);
    }

    this.ram.write16(0xFFA4CA, 0);       // 状态标志

    // ── §2.3: 角色能力表加载 (L218) ★ ──
    this._loadCharAbilityTable();

    // ── §2.4: 其他数据初始化 (L226-270) ──
    // 清零 $FFA5BC - $FFA5C6 (11 字节)
    for (let addr = 0xFFA5BC; addr <= 0xFFA5C6; addr++) {
      this.ram.write8(addr, 0);
    }
    this.ram.write16(0xFFA5C8, 0);

    // 从 ROM 0x061AC5 复制字符串到 RAM 0xFFFFA5CC (FF 终止)
    this._copyRomString(RomInits.ROM_SCENE_NAME, 0xFFFFA5CC);

    // 从 ROM 0x097404 复制 word 数组到 RAM 0xFFFFA5DE (FFFF 终止)
    this._copyRomWordArray(RomInits.ROM_UNIT_GROUPS, 0xFFFFA5DE);

    // SRAM 标志
    this.ram.write16(0xFFBD6E, 0x32);

    // 存档槽初始化 (20 个槽 × 0xFFFFFFFF = 空)
    for (let addr = 0xFFC7F2; addr <= 0xFFC840; addr += 4) {
      this.ram.write32(addr, 0xFFFFFFFF);
    }

    // 显示/状态标志清零
    this.ram.write8(0xFF816E, 0);
    this.ram.write16(0xFF8170, 0);
    this.ram.write16(0xFF8172, 0);
    this.ram.write16(0xFFAE92, 0);
    this.ram.write16(0xFFAE94, 0);
    this.ram.write16(0xFFA6DC, 0);

    // ── C80C 末尾: 设置 DMA 参数 + 队列下一任务 ──
    // ROM: move.l #$0005DF40, ($FFFF95A2)
    this.ram.write32(0xFF95A2, 0x0005DF40);
    // ROM: move.w #$0001, ($FFFF95A6)
    this.ram.write16(0xFF95A6, 1);
    // ROM: move.w #$000F, ($FFFF95A8)
    this.ram.write16(0xFF95A8, 0x0F);

    // 阶段索引起始值 (由 RomTaskSystem 1C854 分派器读取)
    this.ram.write16(0xFFAE90, 0);

    // Ghidra 反编译 (L5841-5901): C80C 以 return 结束, 不队列任务
    // 任务调度由 RomTaskSystem._runInitChain() step 0 手动队列 1C834
    this.ram.write32(RAM_VARS.TASK_PTR, 0);
  }

  // ================================================================
  // C80C 辅助: 角色能力表加载 — ROM FUN_00010a94
  //
  // 来源: execution-trace.md §3 (L274-287) + worklog
  //   从 ROM 0x05E64A 加载 10 角色能力表 → RAM 0xFFFFA4CC
  //   每角色: ROM 14B 有效数据 → RAM 24B 槽 (14B 数据 + 10B 补零)
  // ================================================================

  private _loadCharAbilityTable(): void {
    const srcBase = RomInits.ROM_CHAR_ABILITY_TABLE;
    const dstBase = RomInits.RAM_CHAR_ABILITY;

    for (let i = 0; i < RomInits.CHAR_COUNT; i++) {
      // 复制 ROM 14B → RAM 槽
      for (let j = 0; j < RomInits.CHAR_SRC_SIZE; j++) {
        const byte = this.rom8(srcBase + i * RomInits.CHAR_SRC_SIZE + j);
        this.ram.write8(dstBase + i * RomInits.CHAR_SLOT_SIZE + j, byte);
      }
      // 补 10B 零
      for (let j = RomInits.CHAR_SRC_SIZE; j < RomInits.CHAR_SLOT_SIZE; j++) {
        this.ram.write8(dstBase + i * RomInits.CHAR_SLOT_SIZE + j, 0);
      }
    }
  }

  // ================================================================
  // C80C 辅助: 复制 ROM 字符串 (FF 终止)
  // ================================================================

  private _copyRomString(romAddr: number, ramAddr: number): void {
    let i = 0;
    while (true) {
      const byte = this.rom8(romAddr + i);
      this.ram.write8(ramAddr + i, byte);
      if (byte === 0xFF) break;
      i++;
    }
  }

  // ================================================================
  // C80C 辅助: 复制 ROM word 数组 (FFFF 终止)
  // ================================================================

  private _copyRomWordArray(romAddr: number, ramAddr: number): void {
    let i = 0;
    while (true) {
      const word = this.rom16(romAddr + i * 2);
      this.ram.write16(ramAddr + i * 2, word);
      if (word === 0xFFFF) break;
      i++;
    }
  }

  // ================================================================
  // 批量执行所有初始化
  // ================================================================

  /**
   * 执行 ROM 初始化序列 (步骤 6-13)
   * 对应 BootRom.execute() 之后的系统初始化
   *
   * @returns true 表示初始化成功
   */
  executeAllInits(): boolean {
    console.log('[RomInits] 开始系统初始化序列...');

    // 6. 控制器初始化
    console.log('  [6/13] 控制器初始化 ($866C)...');
    this.initController();

    // 7. Z80/DMA 初始化
    console.log('  [7/13] Z80/DMA 初始化 ($86B4)...');
    this.initZ80Dma();

    // 8. 显示队列初始化
    console.log('  [8/13] 显示队列初始化 ($8A6C)...');
    this.initDisplayQueue();

    // 9. 输入状态初始化
    console.log('  [9/13] 输入状态初始化 ($9020)...');
    this.initInputState();

    // 10. 显示列表初始化
    console.log('  [10/13] 显示列表初始化 ($9172)...');
    this.initDisplayList();

    // 11. 任务调度器初始化
    console.log('  [11/13] 任务调度器初始化 ($942A)...');
    this.initTaskScheduler();

    // 12. 系统底层初始化
    console.log('  [12/13] 系统初始化 ($1DDC8)...');
    this.initSystem();

    // 13. 游戏主初始化
    console.log('  [13/13] 游戏主初始化 ($C80C)...');
    this.initGameMain();

    console.log('[RomInits] ✓ 系统初始化完成');

    return true;
  }
}
