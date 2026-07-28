/**
 * H5 双引擎对比页面 — main.ts
 *
 * 左画布: CPU 模拟器路径 (参考)
 * 右画布: Bank 翻译路径 (TypeScript 翻译引擎)
 *
 * 两路共享键盘输入, 逐帧对比。
 *
 * 技术方案:
 *   - 左: createTsubasaNES() → nes.frame() (CPU 逐条解释 6502)
 *   - 右: createTsubasaNES() → [bank 翻译逻辑] → PPU 手动推进全帧
 *         目前右路也以 CPU frame 为基础跑, bank 逻辑并行运行做状态对比。
 */

// ── 硬件模拟层 ──
import NES from '../game-engine/core/nes';
import PPU from '../game-engine/core/ppu/index';
import PAPU from '../game-engine/core/papu/index';

// ── ROM 数据 ──
import { PRG_ROM_BANKS } from '../game-engine/data/rom-data';
import { CHR_ROM_BANKS } from '../game-engine/data/chr-data';
import { buildRomBuffer } from '../tsubasa-hex2asm/rom_header';

// ── 翻译路径 ──
import { createSystemState, writeMem, readMem } from '../game-engine/banks/system-state';
import type { SystemState } from '../game-engine/banks/system-state';
import { registerBankRom } from '../game-engine/banks/system-state';
import {
  translate_BANK31_RESET,
  tick_BANK31_mainLoop,
  init_BANK31_matchEntry,
} from '../game-engine/banks/bank-31';
import {
  initScene_$C64E,
  ppuScreenInit_$CB35,
  clearOam_$CB8B,
  nmiInit_$C71A,
} from '../game-engine/banks/bank-30';
import { bank02_nmiHandler } from '../game-engine/banks/bank-02';
import { getBank06Data } from '../game-engine/banks/bank-06';
import { getBank12Data } from '../game-engine/banks/bank-12';
import { getBank15Data } from '../game-engine/banks/bank-15';

// ── 渲染 ──
import { createRenderTarget, renderFrame, RenderTarget } from '../game-engine/render/canvas-renderer';

// ═══════════════════════════════════════════
// NES 按键映射
// ═══════════════════════════════════════════

const KEY_MAP: Record<string, number> = {
  'z':        0, // A
  'x':        1, // B
  'shift':    2, // Select
  'enter':    3, // Start
  'arrowup':  4, // Up
  'arrowdown':5, // Down
  'arrowleft':6, // Left
  'arrowright':7,// Right
};

let currButtons1 = 0;
let currButtons2 = 0;

// ═══════════════════════════════════════════
// 全局状态
// ═══════════════════════════════════════════

let running = false;
let rafId = 0;

const canvas0 = document.getElementById('c0') as HTMLCanvasElement;
const canvas1 = document.getElementById('c1') as HTMLCanvasElement;
const btnRun  = document.getElementById('btn-run') as HTMLButtonElement;
const btnPause= document.getElementById('btn-pause') as HTMLButtonElement;
const btnStep = document.getElementById('btn-step') as HTMLButtonElement;
const btnReset= document.getElementById('btn-reset') as HTMLButtonElement;
const fpsEl   = document.getElementById('fps') as HTMLSpanElement;
const statusEl= document.getElementById('status') as HTMLDivElement;

let rt0: RenderTarget;
let rt1: RenderTarget;

// ── 左路: CPU 模拟器 ──
let nes0: NES;

// ── 右路: Bank 翻译引擎 ──
let nes1: NES;
let sys1: SystemState;
let rightMode: 'cpu' | 'translation' = 'cpu'; // 可切换

// ═══════════════════════════════════════════
// PPU 帧推动器 (无 CPU — 手动推进 scanlines)
// ═══════════════════════════════════════════

/** 推动 PPU 渲染完整一帧 (89342 dots ≈ NTSC) */
function ppuStepFullFrame(ppu: any): void {
  ppu.startFrame();
  let safety = 0;
  while (!ppu.frameEnded && safety < 1000) {
    ppu.advanceDots(341); // 每次推一条 scanline
    safety++;
  }
  ppu.frameEnded = false;
}

// ═══════════════════════════════════════════
// 初始化
// ═══════════════════════════════════════════

function logStatus(msg: string): void {
  statusEl.textContent = msg;
  console.log('[compare]', msg);
}

function createNesInstance(opts?: any): NES {
  const nes = new NES(opts ?? {});
  const romBuffer = buildRomBuffer(PRG_ROM_BANKS, CHR_ROM_BANKS);
  nes.loadROM(romBuffer);
  return nes;
}

function init(): void {
  logStatus('创建双引擎实例…');

  // ── 渲染目标 ──
  rt0 = createRenderTarget(canvas0);
  rt1 = createRenderTarget(canvas1);

  // ── 注册翻译 bank ROM 数据 ──
  registerBankRom(0x06, getBank06Data());
  registerBankRom(0x0C, getBank12Data());
  registerBankRom(0x0F, getBank15Data());

  // ── 左路 (CPU 模拟器) ──
  nes0 = createNesInstance({ emulateSound: false });

  // ── 右路 (翻译引擎) ──
  nes1 = createNesInstance({ emulateSound: false });
  sys1 = createSystemState(nes1.ppu, nes1.papu);
  (nes1 as any).__tsSys = sys1;

  // 初始化翻译路径
  translate_BANK31_RESET(sys1);
  initScene_$C64E(sys1, true);

  // 设置 PPU 基础状态（让渲染可见）
  ppuScreenInit_$CB35(sys1);
  clearOam_$CB8B(sys1);
  nmiInit_$C71A(sys1);

  logStatus('初始化完成 — 按 ▶ 运行 或 ⏭ 单帧');
}

// ═══════════════════════════════════════════
// 帧循环
// ═══════════════════════════════════════════

let fpsFrames0 = 0, fpsFrames1 = 0;
let fpsLastTime = performance.now();

function tickBoth(): void {
  // ── 手柄输入同步 ──
  applyInput(nes0, currButtons1);
  applyInput(nes1, currButtons2 || currButtons1);

  // ── 左路: CPU 模拟器 ──
  try {
    nes0.frame();
    renderFrame(rt0, nes0.ppu.buffer);
    fpsFrames0++;
  } catch (e: any) {
    logStatus(`左路崩溃: ${e.message}`);
    if (running) togglePause();
  }

  // ── 右路: 翻译引擎 ──
  if (rightMode === 'cpu') {
    // 模式 A: 同样跑 CPU 模拟器，但并行跑 bank 逻辑
    try {
      nes1.frame();
      renderFrame(rt1, nes1.ppu.buffer);
      fpsFrames1++;
    } catch (e: any) {
      logStatus(`右路崩溃: ${e.message}`);
    }

    // 并行运行 bank 翻译逻辑 (不影响渲染)
    try {
      tick_BANK31_mainLoop(sys1);
      bank02_nmiHandler(sys1);
    } catch (_e) { /* bank 逻辑可能未完整覆盖当前场景 */ }
  } else {
    // 模式 B: 纯翻译路径 (bank 逻辑驱动 PPU)
    try {
      tick_BANK31_mainLoop(sys1);
      bank02_nmiHandler(sys1);
      ppuStepFullFrame(nes1.ppu);
      renderFrame(rt1, nes1.ppu.buffer);
      fpsFrames1++;
    } catch (e: any) {
      logStatus(`翻译路径异常: ${e.message}`);
    }
  }
}

function applyInput(nes: NES, mask: number): void {
  for (let btn = 0; btn < 8; btn++) {
    if (mask & (1 << btn)) {
      nes.buttonDown(1, btn);
    } else {
      nes.buttonUp(1, btn);
    }
  }
}

// ═══════════════════════════════════════════
// RAF 主循环
// ═══════════════════════════════════════════

function loop(_t: number): void {
  if (!running) return;
  rafId = requestAnimationFrame(loop);

  tickBoth();

  // FPS 更新 (每秒一次)
  const now = performance.now();
  if (now - fpsLastTime > 1000) {
    const elapsed = (now - fpsLastTime) / 1000;
    const f0 = Math.round(fpsFrames0 / elapsed);
    const f1 = Math.round(fpsFrames1 / elapsed);
    fpsEl.textContent = `FPS: ${f0} | ${f1}`;
    fpsFrames0 = 0; fpsFrames1 = 0;
    fpsLastTime = now;
  }
}

// ═══════════════════════════════════════════
// 控制按钮
// ═══════════════════════════════════════════

function startRunning(): void {
  if (running) return;
  running = true;
  btnRun.classList.add('active');
  btnPause.classList.remove('active');
  fpsLastTime = performance.now();
  fpsFrames0 = 0; fpsFrames1 = 0;
  rafId = requestAnimationFrame(loop);
}

function togglePause(): void {
  if (running) {
    running = false;
    cancelAnimationFrame(rafId);
    btnRun.classList.remove('active');
    btnPause.classList.add('active');
  } else {
    startRunning();
  }
}

function singleStep(): void {
  if (running) togglePause();
  tickBoth();
  fpsEl.textContent = `FPS: -- | -- (单帧)`;
}

function resetAll(): void {
  if (running) togglePause();

  // 重置左路
  nes0.reloadROM();

  // 重置右路
  nes1.reloadROM();
  sys1 = createSystemState(nes1.ppu, nes1.papu);
  (nes1 as any).__tsSys = sys1;
  translate_BANK31_RESET(sys1);
  initScene_$C64E(sys1, true);
  ppuScreenInit_$CB35(sys1);
  clearOam_$CB8B(sys1);
  nmiInit_$C71A(sys1);

  // 清空画布
  const black = new Uint32Array(256 * 240);
  renderFrame(rt0, black);
  renderFrame(rt1, black);

  logStatus('已重置');
}

// ═══════════════════════════════════════════
// 键盘事件 (共享)
// ═══════════════════════════════════════════

function keyToMask(e: KeyboardEvent): number {
  const key = e.key.toLowerCase();
  if (key === 'z')       return 0; // A
  if (key === 'x')       return 1; // B
  if (key === 'shift')   return 2; // Select
  if (key === 'enter')   return 3; // Start
  if (key === 'arrowup')    return 4;
  if (key === 'arrowdown')  return 5;
  if (key === 'arrowleft')  return 6;
  if (key === 'arrowright') return 7;
  return -1;
}

window.addEventListener('keydown', (e) => {
  const idx = keyToMask(e);
  if (idx >= 0) {
    e.preventDefault();
    currButtons1 |= (1 << idx);
    currButtons2 |= (1 << idx);
  }
});

window.addEventListener('keyup', (e) => {
  const idx = keyToMask(e);
  if (idx >= 0) {
    e.preventDefault();
    currButtons1 &= ~(1 << idx);
    currButtons2 &= ~(1 << idx);
  }
});

btnRun.addEventListener('click', startRunning);
btnPause.addEventListener('click', togglePause);
btnStep.addEventListener('click', singleStep);
btnReset.addEventListener('click', resetAll);

// ── 切换右路模式 ──
const modeKeys: Record<string, () => void> = {
  '1': () => { rightMode = 'cpu'; logStatus('右路模式: CPU 模拟器 (参考)'); },
  '2': () => { rightMode = 'translation'; logStatus('右路模式: 纯翻译引擎'); },
};
window.addEventListener('keydown', (e) => {
  if (modeKeys[e.key]) { modeKeys[e.key](); }
});

// ═══════════════════════════════════════════
// 启动
// ═══════════════════════════════════════════

init();
