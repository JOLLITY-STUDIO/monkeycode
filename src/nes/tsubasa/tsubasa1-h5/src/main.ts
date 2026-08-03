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
import { GameLoop } from './game/GameLoop';
import { GameState, GAME_STATE_NAMES } from './game/GameStateTable';
import { ALL_STATE_HANDLERS } from './game/states/index';
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
  gameLoop = new GameLoop(mem, nmi, ppuBus, input, mmc1);
  gameLoop.setRenderCallback(render);

  // 8. 注册所有游戏状态处理器
  //    每个状态一个文件，各自包含 enter/update/exit 逻辑
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
  mem.write(PPU_REG.PPUCTRL, 0x10);

  // MMC1 复位
  mmc1.write(0x8000, 0x80);

  // MMC1 配置: 水平镜像, 16KB PRG, 4KB CHR
  const mmc1Config = 0x1E;
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
  mem.ppuStatus = 0x80;

  mem.write(PPU_REG.PPUMASK, 0x06);
  mem.data[ZP.PPU_MASK_CACHE] = 0x06;

  // 清零 $0000-$07FF
  mem.clearRange(0x0000, 0x0800);

  // 初始化关键变量
  mem.data[ZP.SCROLL_X] = 0;
  mem.data[ZP.SCROLL_Y] = 0;
  mem.data[ZP.PPU_CTRL_CACHE] = 0x10;
  mem.data[ZP.PPU_MASK_CACHE] = 0x06;

  // 初始化 PPU 写入缓冲区指针
  initPpuBuffer();

  // 初始化 OAM
  initOam();

  // 清除 Name Table
  clearNameTables();

  // 启用 NMI
  mem.data[ZP.PPU_CTRL_CACHE] |= 0x80;

  // 设置初始游戏状态
  mem.gameState = GameState.INIT_TITLE;

  console.log('[Reset] System initialized.');
  console.log('[Reset] Memory state:', {
    scrollX: mem.scrollX,
    scrollY: mem.scrollY,
    ppuCtrlCache: mem.ppuCtrlCache,
    ppuMaskCache: mem.ppuMaskCache,
    frameCounter: mem.frameCounter,
    gameState: mem.gameState,
  });
}

/** 初始化 PPU 写入缓冲区指针 ($82CC) */
function initPpuBuffer(): void {
  mem.data[ZP.PPU_PTR_LO] = 0x06;
  mem.data[ZP.PPU_PTR_HI] = 0x03;
  mem.data[RAM.PPU_QUEUE_LEN] = 0;
}

/** 初始化 OAM ($8371) */
function initOam(): void {
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

/**
 * 注册所有游戏状态处理器
 *
 * 从 game/states/index.ts 的 ALL_STATE_HANDLERS 导入，
 * 每个状态一个独立的类文件，包含 enter/update/exit 生命周期。
 */
function registerStateHandlers(): void {
  for (const handler of ALL_STATE_HANDLERS) {
    gameLoop.registerStateHandler(handler);
  }
  console.log(`[Init] 已注册 ${ALL_STATE_HANDLERS.length} 个状态处理器`);
}

/** 渲染帧 */
function render(): void {
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, 256, 240);

  // TODO: 实际渲染 PPU 输出
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
