/**
 * 天使之翼2 (Captain Tsubasa II) - 主入口
 * 原生 TypeScript + Canvas 渲染，不依赖模拟器
 *
 * 架构:
 *   canvas/  - NES PPU → Canvas 渲染（pattern table, nametable, sprites）
 *   code/    - 从 6502 汇编翻译的 TypeScript 游戏逻辑
 *   data/    - ROM 数据结构定义
 *   disasm/  - CDL 标注的完整 PRG 反汇编参考文档
 */
import { RomLoader } from './code/RomLoader';
import { createMemory, NesMemory } from './code/Memory';
import { renderPpuFrame } from './canvas/Renderer';
import { bootReset, nmiHandler } from './code/Boot';
import {
  NesRom, GameState, PpuState, Mmc3Regs,
  VRAM_SIZE, OAM_SIZE,
  PPU_STATUS, JOYPAD1,
  BUTTON,
} from './types';

// ---- DOM Elements ----
const gameCanvas = document.getElementById('game') as HTMLCanvasElement;
gameCanvas.width = 256;
gameCanvas.height = 240;

const statusEl = document.getElementById('status')!;

// ---- Game State ----
let rom: NesRom;
let mem: NesMemory;
let state: GameState;

// Input state
let joy1 = 0;
let joy1Strobe = 0;
let joy1Index = 0;

// Timing
let frameCounter = 0;
let animId: number | null = null;
let running = false;

// ---- Initialize ----
async function init(romData: ArrayBuffer): Promise<void> {
  rom = RomLoader.parse(romData);

  const ppu: PpuState = {
    ctrl: 0, mask: 0, status: PPU_STATUS, oamAddr: 0,
    scroll: 0, addr: 0,
    v: 0, t: 0, x: 0, w: 0,
    vram: new Uint8Array(VRAM_SIZE),
    palette: new Uint8Array(32),
    oam: new Uint8Array(OAM_SIZE),
    oamDma: new Uint8Array(OAM_SIZE),
    frameBuffer: new Uint32Array(256 * 240),
  };

  const mmc3: Mmc3Regs = {
    bankSelect: 0,
    bankData: [0, 0, 0, 0, 0, 0, 0, 0],
    prgBankMode: 0,
    chrBankMode: 0,
    mirroring: 0,
    prgRamProtect: false,
    irqLatch: 0,
    irqCounter: 0,
    irqReload: false,
    irqEnable: false,
  };

  mem = createMemory(rom, ppu, mmc3);

  state = {
    frame: 0,
    scene: 'boot',
    mode: 0,
    controller1: 0,
    controller2: 0,
    mmc3,
    ppu,
    cpu: {
      ram: mem.ram,
      stack: 0xFF,
      pc: 0x8000,
      a: 0, x: 0, y: 0,
      flags: 0x34, // I=1 (interrupts disabled after reset)
    },
  };

  statusEl.textContent = 'ROM loaded - ready';
  console.log('[tsubasa] ROM loaded successfully');

  // 执行 RESET 初始化序列
  bootReset(state, mem);
}

// ---- Main Loop ----
function frameLoop(): void {
  if (!running) return;

  // Run one frame of game logic
  runFrame();

  // Render current PPU state to canvas
  renderPpuFrame(state.ppu, rom.chr, gameCanvas);

  frameCounter++;
  state.frame = frameCounter;

  animId = requestAnimationFrame(frameLoop);
}

/** Run one frame (1/60s) of game logic */
function runFrame(): void {
  // VBlank 开始: 触发 NMI
  state.ppu.status |= 0x80;

  // 执行 NMI handler (从 6502 翻译的每帧逻辑)
  nmiHandler(state, mem);

  // 清除 VBlank
  state.ppu.status &= 0x7F;
}

// ---- Input Handling ----
const keys = new Set<string>();

document.addEventListener('keydown', (e) => {
  keys.add(e.code);
  updateInput();
});
document.addEventListener('keyup', (e) => {
  keys.delete(e.code);
  updateInput();
});

const KEY_MAP: Record<string, number> = {
  'KeyZ': BUTTON.A,
  'KeyX': BUTTON.B,
  'KeyA': BUTTON.A,
  'KeyS': BUTTON.B,
  'Enter': BUTTON.START,
  'ShiftRight': BUTTON.SELECT,
  'ShiftLeft': BUTTON.SELECT,
  'ArrowUp': BUTTON.UP,
  'ArrowDown': BUTTON.DOWN,
  'ArrowLeft': BUTTON.LEFT,
  'ArrowRight': BUTTON.RIGHT,
};

function updateInput(): void {
  let input = 0;
  for (const code of keys) {
    input |= KEY_MAP[code] || 0;
  }
  state.controller1 = input;
  joy1 = input;
}

// ---- Public API ----
export function start(): void {
  if (running) return;
  running = true;
  statusEl.textContent = 'Running';
  animId = requestAnimationFrame(frameLoop);
}

export function stop(): void {
  running = false;
  if (animId !== null) {
    cancelAnimationFrame(animId);
    animId = null;
  }
  statusEl.textContent = 'Stopped';
}

export function reset(): void {
  stop();
  bootReset(state, mem);
  start();
}

// ---- Boot ----
const fileInput = document.getElementById('romFile') as HTMLInputElement;
fileInput.addEventListener('change', async () => {
  const file = fileInput.files?.[0];
  if (!file) return;

  const buffer = await file.arrayBuffer();
  await init(buffer);
  start();
});

// Load from URL param or default path
const urlParams = new URLSearchParams(window.location.search);
const romUrl = urlParams.get('rom');
if (romUrl) {
  fetch(romUrl)
    .then(r => r.arrayBuffer())
    .then(buf => init(buf).then(() => start()))
    .catch(err => console.error('Failed to load ROM:', err));
}
