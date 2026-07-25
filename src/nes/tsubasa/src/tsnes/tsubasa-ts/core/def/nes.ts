/**
 * ============================================================================
 * NesSystem — NES 顶层系统
 *
 * 持有: ROM 数据、没有CPU、PPU、MMC3、没有内存、启动引擎。
 *  没有 6502 指令，没有硬件。
 *
 * 启动流程:
 *   new NesSystem(rom) → bootSequence(this) → startLoop(this) → gameTick()
 * ============================================================================
 */

// ═══════════════ ROM 数据区 (十进制, 无 hex 数组) ═══════════════

/** iNES Header — 天使之翼 II 固定值 */
export const ROM_HEADER = {
  magic:         [78, 69, 83, 26] as const,  // NES\x1A
  prgRomPages:   16,                          // 16 × 16KB
  chrRomPages:   16,                          // 16 × 8KB
  flags6:        64,                          // mapper_lo=4 | mirror=0
  flags7:        8,                            // NES 2.0
  mapper:        4,                            // MMC3
  mirroring:     0,                            // 水平
  hasTrainer:    false,
  hasBatteryRam: false,
  prgRamSize:    0,
  chrRamSize:    0,
};

/** PRG-ROM 总大小: 32 × 8192 = 262144 */
export const PRG_TOTAL_SIZE = 262144;
/** CHR-ROM 总大小: 32 × 4096 = 131072 */
export const CHR_TOTAL_SIZE = 131072;

/** MMC3 bank 结构 */
export const PRG_BANK_SIZE   = 8192;
export const PRG_BANK_COUNT  = 32;
export const CHR_VROM_SIZE   = 4096;
export const CHR_VROM_COUNT  = 32;

// ═══════════════ 系统初始化 ═══════════════

/**
 * 创建完整的 NES 系统
 * @param {object[]} prgBanks — 32 个 { index: number, data: number[] }
 * @param {object[]} chrBanks — 32 个 { index: number, data: number[] }
 * @param {function} onFrame — 帧回调 (frameBuffer) => void
 */
export function createNesSystem(prgBanks, chrBanks, onFrame = null) {
  /** @type {object} */
  const system = {
    // === ROM 数据 ===
    rom: {
      header:   ROM_HEADER,
      prgBanks: prgBanks,
      chrBanks: chrBanks,
    },

    // === 工作区 (2KB) & 存档区 (8KB) ===
    wram: new Array(2048).fill(0),
    sram: new Array(8192).fill(0),

    // === 事件总线 (替代 CPU) ===
    bus: null, // 由 createBus() 注入

    // === PPU ===
    ppu: null, // 由 createPpuState() 注入

    // === MMC3 ===
    mapper: null, // 由 createMmc3State() 注入

    // === 启动状态 ===
    boot: {
      phase: 'power_on',
      initComplete: false,
      isColdBoot: true,
      framesSinceReset: 0,
      initStep: 0,
      waitFrames: 0,
    },

    // === 引擎 ===
    engine: null, // 由 createEngineState() 注入

    // === APU (音频) ===
    apu: null, // 由 createApuState() 注入

    // === Scene 管理器 (后续 Phase 注入) ===
    sceneManager: null,

    /** 帧输出回调 */
    onFrame: onFrame,

    /** Canvas 渲染器 (由 Renderer 类注入) */
    renderer: null,

    // ═══════════════ 实用方法 ═══════════════

    /** PPU 寄存器快捷写入 */
    writePpuCtrl(v) {
      if (this.ppu) {
        this.ppu.ctrl.nametable = v & 3;
        this.ppu.ctrl.increment = (v & 4) ? 32 : 1;
        this.ppu.ctrl.nmi = (v & 128) !== 0;
      }
    },
    writePpuMask(v) {
      if (this.ppu) {
        this.ppu.mask.bgShow  = (v & 8) !== 0;
        this.ppu.mask.sprShow = (v & 16) !== 0;
        this.ppu.mask.gray     = (v & 1) !== 0;
        this.ppu.mask.bgLeft8  = (v & 2) !== 0;
        this.ppu.mask.sprLeft8 = (v & 4) !== 0;
        this.ppu.mask.red      = (v & 32) !== 0;
        this.ppu.mask.green    = (v & 64) !== 0;
        this.ppu.mask.blue     = (v & 128) !== 0;
      }
    },

    /** 手柄输入处理 */
    handleInput(input) {
      let j1 = 0;
      if (input.a)      j1 = j1 | 128;
      if (input.b)      j1 = j1 | 64;
      if (input.select) j1 = j1 | 32;
      if (input.start)  j1 = j1 | 16;
      if (input.up)     j1 = j1 | 8;
      if (input.down)   j1 = j1 | 4;
      if (input.left)   j1 = j1 | 2;
      if (input.right)  j1 = j1 | 1;
      this.joypad = j1;
    },
  };

  return system;
}

/**
 * 注入外围模块
 */
export function attachPeripherals(nes, ppu, mapper, engine, bus, apu = null) {
  nes.ppu    = ppu;
  nes.mapper = mapper;
  nes.engine = engine;
  nes.bus    = bus;
  nes.apu    = apu;
}

/**
 * 读取 PRG-ROM 的一个字节 (经 MMC3 映射)
 */
export function readPrg(nes, cpuAddr) {
  const mmc3 = nes.mapper;
  if (!mmc3) return 0;

  // $8000-$FFFF → PRG-ROM
  if (cpuAddr < 32768) return 0;

  let bankIdx, offset;
  if (cpuAddr < 40960) {
    bankIdx = mmc3.regs.r6;
    offset  = cpuAddr - 32768;
  } else if (cpuAddr < 49152) {
    bankIdx = mmc3.regs.r7;
    offset  = cpuAddr - 40960;
  } else if (mmc3.prgBankMode === 0) {
    if (cpuAddr < 57344) {
      bankIdx = PRG_BANK_COUNT - 2;
      offset  = cpuAddr - 49152;
    } else {
      bankIdx = PRG_BANK_COUNT - 1;
      offset  = cpuAddr - 57344;
    }
  } else {
    if (cpuAddr < 57344) {
      bankIdx = mmc3.regs.r6;
      offset  = cpuAddr - 49152;
    } else {
      bankIdx = PRG_BANK_COUNT - 1;
      offset  = cpuAddr - 57344;
    }
  }

  const bank = nes.rom.prgBanks[bankIdx];
  if (!bank) return 0;

  mmc3.accessedBanks.add(bankIdx);
  return bank.data[offset & 8191] ?? 0;
}

/**
 * 将系统状态序列化为可打印的摘要
 */
export function printSysState(nes) {
  const b = nes.boot;
  const e = nes.engine;
  return [
    `boot phase=${b.phase} initComplete=${b.initComplete} step=${b.initStep}`,
    e ? `engine running=${e.running} sceneId=${e.sceneId} frame=${e.frameCounter}` : '',
    nes.ppu ? `ppu frame=${nes.ppu.frame} vblank=${nes.ppu.status.vblank}` : '',
  ].filter(Boolean).join(' | ');
}
