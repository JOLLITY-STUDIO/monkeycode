/**
 * ============================================================================
 * engine — 游戏主循环
 *
 * 替代 6502 逐条执行的 while(true) 循环。
 * 每帧执行:
 *   1. 输入处理
 *   2. NMI (VRAM 更新 / 渲染)
 *   3. 场景 update() [由 SceneManager 驱动]
 *   4. PPU 帧推进 → VBlank → NMI
 *   5. 渲染输出
 * ============================================================================
 */

import { clockFrameCounter } from './papu.ts';
import { tickFrame } from './ppu.ts';

// ═══════════════ 常量 ═══════════════

/** NMI 入口地址 (bank 02 NMI renderer) */
export const NMI_ENTRY     = 32768;  // $8000 (bank 02, 映射到 $8000)

/** 正常帧: 29780 CPU 周期 (~1/60 秒 NTSC) */
export const CYCLES_PER_FRAME = 29780;

// ═══════════════ 帧循环状态 ═══════════════

/**
 * 创建引擎状态
 * @returns {object}
 */
export function createEngineState() {
  return {
    /** 当前场景 ID (ZP $26) */
    sceneId: 0,
    /** 场景内分派索引 (ZP $27) */
    dispatchIndex: 0,
    /** 帧计数器 (ZP $28) */
    frameCounter: 0,
    /** 目标帧数 (ZP $29) */
    frameTarget: 0,
    /** 游戏是否运行中 */
    running: false,
    /** 是否暂停 */
    paused: false,
    /** ROM 内累计帧 */
    romFrame: 0,
    /** 渲染队列 (Display List — $05E8 映射) */
    displayList: [],
    /** 上次 NMI 后的帧数 */
    framesSinceNmi: 0,
  };
}

// ═══════════════ 帧循环 ═══════════════

/**
 * 单帧主循环 — 每屏刷新调用一次 (~60Hz)
 *
 * @param {object} nes — NES 系统实例
 * @param {object} input — 当前手柄输入 { up, down, left, right, a, b, select, start }
 */
export function gameTick(nes, input) {
  if (!nes.engine.running || nes.engine.paused) {
    return;
  }

  const state = nes.engine;

  // ═══ 1. 处理输入 ═══
  if (input) {
    nes.handleInput(input);
  }

  // ═══ 2. NMI 阶段 — VRAM 更新 ═══
  processNmi(nes);

  // ═══ 3. 场景更新 ═══
  // 由 SceneManager 驱动 — 参见 scene/ 域
  if (nes.sceneManager) {
    nes.sceneManager.update();
  }

  // ═══ 4. PPU 帧推进 ═══
  const ppuResult = tickFrame(nes.ppu);
  if (ppuResult.nmi) {
    state.framesSinceNmi = 0;
  } else {
    state.framesSinceNmi++;
  }

  // ═══ 5.5 APU 时钟 ═══
  if (nes.apu) {
    clockFrameCounter(nes.apu, CYCLES_PER_FRAME);
  }

  // ═══ 6. 帧计数器 ═══
  state.frameCounter++;
  state.romFrame++;

  // ═══ 7. 渲染输出 ═══
  if (nes.renderer) {
    try {
      nes.renderer.renderFrame(nes.ppu, nes.mapper);
    } catch (e) {
      // 渲染失败不阻断逻辑
      console.warn('[engine] renderFrame error:', e);
    }
  }
  if (nes.onFrame) {
    nes.onFrame(nes.ppu.frameBuffer);
  }
}

/**
 * NMI 处理 — 消费显示列表
 */
function processNmi(nes) {
  const list = nes.engine.displayList;
  if (list.length === 0) return;

  // 消费 Display List ($05E8 PPU 命令缓冲)
  for (const cmd of list) {
    executeDisplayCommand(nes, cmd);
  }
  list.length = 0;
}

/**
 * 执行单条 Display List 命令
 * @param {object} nes
 * @param {object} cmd — { addr, data, count }
 */
function executeDisplayCommand(nes, cmd) {
  const { addr, data, count } = cmd;

  if (!Array.isArray(data)) {
    // 简单写入: 单个字节到 PPU VRAM 地址
    nes.ppu.writeVramAddr(cmd.addr);
    nes.ppu.writeVramData(cmd.data);
  } else if (count && count > 0) {
    // 批量写入 ($98EA rect fill 模式)
    nes.ppu.writeVramAddr(cmd.addr);
    for (let i = 0; i < count; i++) {
      const byte = data[i % data.length];
      nes.ppu.writeVramData(byte);
    }
  }
}

// ═══════════════ 手柄处理 ═══════════════

/**
 * 从物理按键映射到 NES $4016/$4017 寄存器值
 * @param {object} input
 * @returns {{ joypad1: number, joypad2: number }}
 */
export function encodeJoypad(input) {
  const j1 = packJoypad(input);
  return { joypad1: j1, joypad2: 0 };
}

function packJoypad({ a, b, select, start, up, down, left, right }) {
  let v = 0;
  if (a)      v = v | 128;
  if (b)      v = v | 64;
  if (select) v = v | 32;
  if (start)  v = v | 16;
  if (up)     v = v | 8;
  if (down)   v = v | 4;
  if (left)   v = v | 2;
  if (right)  v = v | 1;
  return v;
}

// ═══════════════ 显示列表操作 ═══════════════

/**
 * 添加矩形填充命令 (对应 ROM $98EA)
 * @param {object} engine
 * @param {number} ppuAddr — PPU VRAM 目标地址 (14-bit)
 * @param {number} tile — tile 值 (0-255)
 * @param {number} rows  — 行数
 * @param {number} cols  — 列数
 */
export function displayListRect(engine, ppuAddr, tile, rows, cols) {
  const count = rows * cols;
  engine.displayList.push({
    type: 'rect_fill',
    addr: ppuAddr & 16383,
    data: new Array(count).fill(tile & 255),
    count,
  });
}

/**
 * 添加调色板刷新命令 (对应 ROM $9A71)
 * @param {object} engine
 * @param {number[]} palette — 32 字节调色板
 */
export function displayListPalette(engine, palette) {
  engine.displayList.push({
    type: 'palette',
    addr: 16128, // $3F00
    data: palette.slice(0, 32),
    count: 32,
  });
}

/**
 * 添加 OAM (精灵) DMA
 * @param {object} engine
 * @param {number[]} oam — 256 字节 OAM 数据
 */
export function displayListOam(engine, oam) {
  engine.displayList.push({
    type: 'oam',
    addr: 0,
    data: oam.slice(0, 256),
    count: 256,
  });
}

// ═══════════════ 启动/停止 ═══════════════

/**
 * 启动主循环
 * @param {object} nes
 */
export function startLoop(nes) {
  nes.engine.running = true;
  console.log('[engine] main loop started, scene=%d', nes.engine.sceneId);
}

/**
 * 停止主循环
 */
export function stopLoop(nes) {
  nes.engine.running = false;
  console.log('[engine] main loop stopped at frame=%d', nes.engine.frameCounter);
}

/**
 * 暂停
 */
export function pause(nes) {
  nes.engine.paused = true;
}

/**
 * 恢复
 */
export function resume(nes) {
  nes.engine.paused = false;
}
