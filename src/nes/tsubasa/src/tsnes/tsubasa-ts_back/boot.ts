/**
 * ============================================================================
 * boot — RESET 向量 → 系统初始化 → 主循环 启动流程
 *
 * 流程对应 ROM 真实执行路径:
 *   $FFF0 (RESET vector) → $C503 (system init) → $8017 (main loop)
 *
 * 所有等待帧/VRAM 操作在此表现为 frameWait()、syncPPu() 等语义函数。
 * 不再逐条解码 6502 指令。
 * ============================================================================
 */

// ═══════════════ 常量 ═══════════════

/** ROM 中 RESET 向量地址 */
export const RESET_VECTOR_ADDR   = 65520;  // $FFF0
/** 系统初始化入口 (bank 30: system_lib) */
export const SYSTEM_INIT_ENTRY   = 50435;  // $C503
/** 主循环入口 (bank 00: dispatch_scene_engine) */
export const MAIN_LOOP_ENTRY     = 32791;  // $8017

/** ROM 启动保护: 写入 $00 到 WRAM 特定位置防止热重启 */
export const WARM_BOOT_MARKER    = 1792;   // $0700

/** 系统初始化完成标志 — 写入 $FF 表示初始化完成 */
export const INIT_COMPLETE_FLAG  = 255;

// ═══════════════ 启动状态枚举 ═══════════════

/** 启动阶段 */
export const BootPhase = Object.freeze({
  /** 冷启动 / 上电 */
  POWER_ON:       'power_on',
  /** CPU RESET 信号 */
  CPU_RESET:      'cpu_reset',
  /** 系统初始化 (ZP/WRAM 清零, PPU 初始化) */
  SYSTEM_INIT:    'system_init',
  /** MMC3 bank 配置 */
  MAPPER_SETUP:   'mapper_setup',
  /** 场景引擎初始化 */
  SCENE_INIT:     'scene_init',
  /** 进入主循环 */
  MAIN_LOOP:      'main_loop',
});

// ═══════════════ 启动状态对象 ═══════════════

/**
 * 创建启动状态
 * @returns {object}
 */
export function createBootState() {
  return {
    /** 当前启动阶段 */
    phase: BootPhase.POWER_ON,
    /** 系统初始化是否完成 */
    initComplete: false,
    /** 冷启动 vs 热重启 */
    isColdBoot: true,
    /** RESET 后已过帧数 */
    framesSinceReset: 0,
    /** 系统初始化中的子步骤 */
    initStep: 0,
    /** 当前 frameWait 剩余帧 */
    waitFrames: 0,
  };
}

// ═══════════════ 启动序列 ═══════════════

/**
 * RESET 向量触发 — 完整的冷启动序列
 *
 * ROM 执行流程:
 *   $C503: SEI         (关中断)
 *   $C504: CLD         (清十进制标志)
 *   $C505: LDX #$00
 *   $C507: STX $2000   (关 NMI)
 *   $C50A: STX $2001   (关渲染)
 *   $C50D: DEX
 *   $C50E: TXS         (SP = $FF)
 *   ...  等待 2 次 VBlank
 *   ...  清零 $0000-$07FF (2KB RAM)
 *   ...  清零 $6000-$7FFF (SRAM)
 *   ...  初始化 MMC3 bank 寄存器
 *   ...  清零 WRAM 特定区域
 *   ...  JMP $8017 → 场景引擎主循环
 *
 * @param {object} nes — NES 系统实例
 */
export function bootSequence(nes) {
  const boot = nes.boot;

  switch (boot.phase) {

    case BootPhase.POWER_ON: {
      // ═══ 1. 关 PPU NMI + 关渲染 ═══
      nes.writePpuCtrl(0);
      nes.writePpuMask(0);

      // 等待 2 帧 (PPU 稳定)
      boot.waitFrames = 2;
      boot.phase = BootPhase.CPU_RESET;
      break;
    }

    case BootPhase.CPU_RESET: {
      // 等待 PPU 预热帧
      if (boot.waitFrames > 0) {
        boot.waitFrames--;
        return;
      }
      boot.phase = BootPhase.SYSTEM_INIT;
      boot.initStep = 0;
      break;
    }

    case BootPhase.SYSTEM_INIT: {
      /**
       * 系统初始化 — 逐步执行，每帧推进一步
       * 对应 ROM $C50F-$C562 的初始化序列
       */
      switch (boot.initStep) {
        case 0: {
          // ═══ 清空工作区 (2KB) ═══
          for (let i = 0; i < 2048; i++) {
            nes.wram[i] = 0;
          }
          boot.initStep = 1;
          break;
        }
        case 1: {
          // ═══ 清空存档区 (8KB) ═══
          for (let i = 0; i < 8192; i++) {
            nes.sram[i] = 0;
          }
          boot.initStep = 2;
          break;
        }
        case 2: {
          // ═══ 初始化 MMC3 — 设置 bank 模式 ═══
          // $8000 = $06 (PRG bank mode select)
          nes.mapper.write8000(6);
          // $8001 = $01 (PRG mode 0: R6 $8000-$9FFF, R7 $A000-$BFFF, fixed C/D)
          nes.mapper.write8001(1);

          // 设置初始 bank 映射
          nes.mapper.write8000(6);  // select PRG R6
          nes.mapper.write8001(0);  // R6 = bank 0
          nes.mapper.write8000(7);  // select PRG R7
          nes.mapper.write8001(1);  // R7 = bank 1

          // CHR 模式
          nes.mapper.write8000(5);  // CHR mode
          nes.mapper.write8001(0);  // 模式 0

          boot.initStep = 3;
          break;
        }
        case 3: {
          // ═══ 写入热启动标记 ═══
          nes.wram[WARM_BOOT_MARKER] = boot.isColdBoot ? INIT_COMPLETE_FLAG : 0;

          // ═══ 初始化完成 — 场景引擎接管 ═══
          boot.initComplete = true;
          boot.phase = BootPhase.SCENE_INIT;
          boot.initStep = 99;
          break;
        }
        case 99: {
          // 初始化完成，等待场景引擎接管
          // 由 engine.js 的 gameLoop 继续
          break;
        }
      }
      break;
    }

    case BootPhase.SCENE_INIT: {
      /**
       * 场景引擎接管前的一帧清理
       * 对应 ROM $8017 开始的:
       *   LDX #$02, JSR $C4B9  (页切换 → bank 02)
       *   JMP $A203            (NMI 初始化)
       *   JSR $9BA0            (VRAM 初始化)
       *   LDA #$00, JSR $8464  (调色板初始化)
       */
      boot.phase = BootPhase.MAIN_LOOP;
      boot.framesSinceReset = 0;
      break;
    }

    case BootPhase.MAIN_LOOP: {
      // 由 gameLoop() 驱动，每帧 tick
      boot.framesSinceReset++;
      break;
    }
  }
}

/**
 * 热重启 — 不经过系统初始化
 * 对应 ROM 中的 JMP ($FFFC) → RESET 但不执行完整清零
 */
export function warmReset(nes) {
  const boot = nes.boot;
  boot.isColdBoot = false;
  boot.initComplete = false;
  boot.phase = BootPhase.CPU_RESET;
  boot.initStep = 0;
}
