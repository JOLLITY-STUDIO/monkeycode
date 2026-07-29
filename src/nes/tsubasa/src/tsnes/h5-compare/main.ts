/**
 * H5 双引擎对比页面 — main.ts
 *
 * 左画布: CPU 模拟器 (参考, 6502 逐条解释)
 * 右画布: Bank 翻译引擎 (TypeScript 翻译, bank 逻辑驱动真实 PPU)
 *
 * 两路共享键盘输入, 逐帧对比。
 */

// ── 硬件模拟层 ──
import NES from '../game-engine/core/nes';

// ── ROM 数据 ──
import { PRG_ROM_BANKS } from '../game-engine/data/rom-data';
import { CHR_ROM_BANKS } from '../game-engine/data/chr-data';
import { buildRomBuffer } from '../tsubasa-hex2asm/rom_header';

// ── 翻译路径 ──
import { createSystemState, writeMem } from '../game-engine/banks/system-state';
import type { SystemState } from '../game-engine/banks/system-state';
import { registerAllBanks } from '../game-engine/banks/system-state';
import {
  translate_BANK31_RESET,
  tick_BANK31_mainLoop,
} from '../game-engine/banks/bank-31';
import { bank02_nmiHandler, bank02_ppuScrollUpdate } from '../game-engine/banks/bank-02';

// ── 渲染 ──
import { createRenderTarget, renderFrame, RenderTarget } from '../game-engine/render/canvas-renderer';

// ═══════════════════════════════════════════
// 按键映射
// ═══════════════════════════════════════════

let currButtons = 0;

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

// ── 右路: Bank 翻译引擎 (不使用 CPU 模拟器) ──
let sys1: SystemState;
let ppu1: any; // 真实 PPU 实例

// ═══════════════════════════════════════════
// PPU 帧推动器 — 手动推进 scanlines 渲染完整一帧
// ═══════════════════════════════════════════

function ppuStepFullFrame(ppu: any): void {
  ppu.startFrame();
  let safety = 0;
  while (!ppu.frameEnded && safety < 1000) {
    ppu.advanceDots(341);
    safety++;
  }
  ppu.frameEnded = false;
}

// ═══════════════════════════════════════════
// Bank 翻译输入 — 写入 sys.mem 供 bank-02 poll 读取
// ═══════════════════════════════════════════

/**
 * 将按键掩码写入 sys.mem 的 controller 端口区域。
 * bank-02 NMI handler 会从 $4016/$4017 读 8 次来获取按键位。
 * 由于翻译代码读的是 sys.mem 而非实际 shift register，
 * 这里直接写完整 8 位掩码作为低位的"第一 bit"用途。
 */
function applyInputToBank(sys: SystemState, mask: number): void {
  // bank-02 poll 读: sys.mem[0x4015 + x] & 1, x=2→$4017(ctrl2), x=1→$4016(ctrl1)
  // 简单方案: 直接把掩码写到 $4016, bank 代码至少读到 bit0
  sys.mem[0x4016] = mask & 0xFF;
  sys.mem[0x4017] = mask & 0xFF;
}

// ═══════════════════════════════════════════
// 初始化
// ═══════════════════════════════════════════

function logStatus(msg: string): void {
  statusEl.textContent = msg;
  console.log('[compare]', msg);
}

function init(): void {
  logStatus('创建双引擎实例…');

  // ── 渲染目标 ──
  rt0 = createRenderTarget(canvas0);
  rt1 = createRenderTarget(canvas1);

  // ── 注册所有 32 个 PRG-ROM bank （MMC3 bank 切换必需） ──
  registerAllBanks(PRG_ROM_BANKS);
  console.log('[compare] 已注册全部 32 个 PRG-ROM bank');

  // ── 左路: CPU 模拟器 ──
  nes0 = new NES({ emulateSound: false });
  nes0.loadROM(buildRomBuffer(PRG_ROM_BANKS, CHR_ROM_BANKS));

  // ── 右路: 纯 Bank 翻译引擎 ──
  // 为翻译引擎单独创建 PPU 实例 (借用 NES 对象来构造 PPU/PAPU)
  const nesForPpu = new NES({ emulateSound: false });
  nesForPpu.loadROM(buildRomBuffer(PRG_ROM_BANKS, CHR_ROM_BANKS));
  ppu1 = nesForPpu.ppu;
  sys1 = createSystemState(ppu1, nesForPpu.papu);

  // Bank 启动: RESET (内含 initScene + nmiInit)
  translate_BANK31_RESET(sys1);

  logStatus('初始化完成 — 左:CPU模拟 右:Bank翻译 — 按 ▶ 运行');
}

// ═══════════════════════════════════════════
// 帧循环
// ═══════════════════════════════════════════

let fpsFrames0 = 0, fpsFrames1 = 0;
let fpsLastTime = performance.now();

function tickBoth(): void {
  // ── 左路: CPU 模拟器 ──
  syncCpuInput(nes0, currButtons);
  try {
    nes0.frame();
    renderFrame(rt0, nes0.ppu.buffer);
    fpsFrames0++;
  } catch (e: any) {
    logStatus(`左路崩溃: ${e.message}`);
    if (running) togglePause();
  }

  // ── 右路: Bank 翻译引擎 ──
  applyInputToBank(sys1, currButtons);
  try {
    // Game logic tick
    tick_BANK31_mainLoop(sys1);
    // NMI handler: PPU 数据写入 + 滚屏/CHR/手柄/帧 tick
    bank02_nmiHandler(sys1);
    bank02_ppuScrollUpdate(sys1);
    // 推动 PPU 渲染完整一帧
    ppuStepFullFrame(ppu1);
    // 渲染
    renderFrame(rt1, ppu1.buffer);
    fpsFrames1++;
  } catch (e: any) {
    // 若翻译路径异常, 显示短时讯息但继续运行
    if (!(e.message || '').includes('not implemented')) {
      console.warn('[bank]', e.message);
    }
  }
}

/** 手柄输入 → NES 控制器端口 */
function syncCpuInput(nes: NES, mask: number): void {
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
// 控制
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
  const nesForPpu = new NES({ emulateSound: false });
  nesForPpu.loadROM(buildRomBuffer(PRG_ROM_BANKS, CHR_ROM_BANKS));
  ppu1 = nesForPpu.ppu;
  sys1 = createSystemState(ppu1, nesForPpu.papu);
  translate_BANK31_RESET(sys1);

  const black = new Uint32Array(256 * 240);
  renderFrame(rt0, black);
  renderFrame(rt1, black);

  logStatus('已重置');
}

// ═══════════════════════════════════════════
// 键盘
// ═══════════════════════════════════════════

function keyToIdx(key: string): number {
  const k = key.toLowerCase();
  if (k === 'z')            return 0;  // A
  if (k === 'x')            return 1;  // B
  if (k === 'shift')        return 2;  // Select
  if (k === 'enter')        return 3;  // Start
  if (k === 'arrowup')     return 4;
  if (k === 'arrowdown')   return 5;
  if (k === 'arrowleft')   return 6;
  if (k === 'arrowright')  return 7;
  return -1;
}

window.addEventListener('keydown', (e) => {
  const idx = keyToIdx(e.key);
  if (idx >= 0) {
    e.preventDefault();
    currButtons |= (1 << idx);
  }
});

window.addEventListener('keyup', (e) => {
  const idx = keyToIdx(e.key);
  if (idx >= 0) {
    e.preventDefault();
    currButtons &= ~(1 << idx);
  }
});

btnRun.addEventListener('click', startRunning);
btnPause.addEventListener('click', togglePause);
btnStep.addEventListener('click', singleStep);
btnReset.addEventListener('click', resetAll);

// ═══════════════════════════════════════════
// 启动
// ═══════════════════════════════════════════

init();
