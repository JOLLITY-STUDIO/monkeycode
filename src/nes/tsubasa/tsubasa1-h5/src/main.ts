/**
 * 天使之翼 (Captain Tsubasa) H5 版 - 主入口
 *
 * 初始化所有子系统，启动游戏循环。
 * 对应 NES 的 RESET 流程 ($FFC0 → $809B → $81EE)
 */

import { loadRom, parseRom } from './rom/RomLoader';
import { Mmc1Mapper } from './mapper/Mmc1Mapper';
import { CpuMemory } from './memory/CpuMemory';
import { PpuBus } from './ppu/PpuBus';
import { InputManager } from './input/InputManager';
import { NmiHandler } from './game/NmiHandler';
import { GameLoop, StateHandler } from './game/GameLoop';
import { GameState, GAME_STATE_NAMES } from './game/GameStateTable';
import { ZP, RAM, PPU_REG, MEMORY_MAP } from './rom/types';

// ===== 全局实例 =====
let mem: CpuMemory;
let mmc1: Mmc1Mapper;
let ppuBus: PpuBus;
let input: InputManager;
let nmi: NmiHandler;
let gameLoop: GameLoop;
let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;

// ===== 初始化 =====
async function init(): Promise<void> {
  canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
  if (!canvas) {
    throw new Error('Canvas element #game-canvas not found');
  }
  ctx = canvas.getContext('2d')!;
  canvas.width = 256;
  canvas.height = 240;

  // 1. 加载 ROM
  const rom = await loadRom('Captain Tsubasa (Japan).nes');
  console.log('[Init] ROM loaded:', {
    prgBanks: rom.header.prgRomSize,
    chrBanks: rom.header.chrRomSize,
    mapper: rom.header.mapper,
  });

  // 2. 初始化 MMC1
  mmc1 = new Mmc1Mapper(rom.header.prgRomSize);

  // 3. 初始化 CPU 内存
  mem = new CpuMemory(rom.prgRom, mmc1);

  // 4. 初始化 PPU 总线
  ppuBus = new PpuBus(rom.chrRom, mmc1);

  // 5. 初始化输入
  input = new InputManager();

  // 6. 初始化 NMI 处理器
  nmi = new NmiHandler(mem, mmc1, ppuBus, input);

  // 7. 初始化游戏循环
  gameLoop = new GameLoop(mem, nmi, ppuBus, input);
  gameLoop.setRenderCallback(render);

  // 8. 注册游戏状态处理器 (后续逐步实现)
  registerStateHandlers();

  // 9. 执行 RESET 初始化
  reset();

  // 10. 启动游戏循环
  console.log('[Init] Starting game loop...');
  gameLoop.start();
}

/**
 * RESET 初始化
 *
 * 对应:
 *   Bank $07: $FFC0 - MMC1 初始化，跳转到 $8000
 *   Bank $00: $809B - 系统初始化，进入主循环
 */
function reset(): void {
  console.log('[Reset] Initializing system...');

  // --- 阶段1: MMC1 初始化 (Bank $07: $FFC0-$FFD7) ---
  // SEI, CLD (H5 不需要)
  // LDA #$10 → STA $2000: PPUCTRL = NMI off, Pattern Table 0
  mem.write(PPU_REG.PPUCTRL, 0x10);

  // MMC1 复位: LDA #$80 → STA $8000
  mmc1.write(0x8000, 0x80);

  // MMC1 配置: LDA #$1A → 5次串行写入
  // 0x1A = 0b00011010
  //   bit1-0 = 10 = 水平镜像 (Mirroring=2? 实际 header 是 0=水平)
  //   实际 0x1A → bit1-0=10, 但 game 用的是水平镜像
  //   更准确: 0x1E = 水平镜像 + 16KB PRG + 4KB CHR
  const mmc1Config = 0x1E;  // 水平镜像, 16KB PRG, 4KB CHR
  for (let i = 0; i < 5; i++) {
    mmc1.write(0x8000, mmc1Config >> i);
  }

  console.log('[Reset] MMC1 configured:', {
    r0: mmc1.r0,
    prg16KMode: mmc1.prg16KMode,
    chr4KMode: mmc1.chr4KMode,
    mirroring: mmc1.mirroring,
  });

  // --- 阶段2: 系统初始化 (Bank $00: $809B-$80DD) ---
  // $809B: SEI, CLD
  // $809D: 等待 VBlank (两次 $2002 轮询)
  // 在 H5 中，我们直接设置 VBlank 标志
  mem.ppuStatus = 0x80; // 模拟 VBlank

  // $80A7: LDX #$FF, TXS → 初始化堆栈指针
  // (H5 中不需要)

  // $80AA: LDA #$06 → STA $2001 (PPUMASK)
  mem.write(PPU_REG.PPUMASK, 0x06);
  mem.data[ZP.PPU_MASK_CACHE] = 0x06;

  // $80AF-$80C1: 清零 $0000-$07FF
  mem.clearRange(0x0000, 0x0800);

  // $80C3-$80CF: 初始化关键变量
  mem.data[ZP.SCROLL_X] = 0;
  mem.data[ZP.SCROLL_Y] = 0;
  mem.data[ZP.PPU_CTRL_CACHE] = 0x10;  // NMI off initially
  mem.data[ZP.PPU_MASK_CACHE] = 0x06;

  // $80D1: JSR $82CC → 初始化 PPU 写入缓冲区指针
  initPpuBuffer();

  // $80D4: JSR $8371 → 初始化 OAM
  initOam();

  // $80D7: JSR $838F → 清除 Name Table 和 Attribute Table
  clearNameTables();

  // $80DA: JSR $82F5 → 启用 NMI
  mem.data[ZP.PPU_CTRL_CACHE] |= 0x80; // 设置 $19 bit7

  console.log('[Reset] System initialized.');
  console.log('[Reset] Memory state:', {
    scrollX: mem.scrollX,
    scrollY: mem.scrollY,
    ppuCtrlCache: mem.ppuCtrlCache,
    ppuMaskCache: mem.ppuMaskCache,
    frameCounter: mem.frameCounter,
  });
}

/** 初始化 PPU 写入缓冲区指针 ($82CC) */
function initPpuBuffer(): void {
  // 设置 PPU 写入队列指针 (通常指向 $0306)
  mem.data[ZP.PPU_PTR_LO] = 0x06;
  mem.data[ZP.PPU_PTR_HI] = 0x03;
  mem.data[RAM.PPU_QUEUE_LEN] = 0;
}

/** 初始化 OAM ($8371) */
function initOam(): void {
  // 将所有精灵 Y 坐标设为 $F0 (屏幕外)
  for (let i = 0; i < 256; i += 4) {
    mem.data[MEMORY_MAP.OAM_BUFFER_START + i] = 0xF0;
    mem.data[MEMORY_MAP.OAM_BUFFER_START + i + 1] = 0;
    mem.data[MEMORY_MAP.OAM_BUFFER_START + i + 2] = 0;
    mem.data[MEMORY_MAP.OAM_BUFFER_START + i + 3] = 0;
  }
}

/** 清除 Name Table ($838F) */
function clearNameTables(): void {
  ppuBus.clearAllNameTables();
}

/** 注册游戏状态处理器 */
function registerStateHandlers(): void {
  // 注册所有 8 个状态的占位处理器
  // 后续会逐步实现每个状态的具体逻辑
  for (let s = 0; s <= 7; s++) {
    const state = s as GameState;
    gameLoop.registerStateHandler(state, (m) => {
      // 临时: 占位处理器，输出状态名称
      if (m.frameCounter % 60 === 0) {
        console.log(
          `[State ${state}] ${GAME_STATE_NAMES[state]} (frame: ${m.frameCounter})`
        );
      }
    });
  }
}

/** 渲染帧 */
function render(): void {
  // 清屏
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, 256, 240);

  // TODO: 实际渲染 PPU 输出
  // 目前先显示调试信息
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '12px monospace';
  ctx.fillText(`Frame: ${mem.frameCounter}`, 8, 16);
  const stateName = GAME_STATE_NAMES[mem.gameState as GameState] ?? 'UNKNOWN';
  ctx.fillText(`State: ${mem.gameState} (${stateName})`, 8, 32);
  ctx.fillText(`Joy1: 0x${mem.joy1Current.toString(16).padStart(2, '0')}`, 8, 48);
}

// ===== 启动 =====
document.addEventListener('DOMContentLoaded', () => {
  init().catch((err) => {
    console.error('[Fatal]', err);
    document.body.innerHTML = `<div style="color:red;padding:20px;">Error: ${err.message}</div>`;
  });
});
