/**
 * 天使之翼2 (Captain Tsubasa II) - 主入口
 * ROM 数据内嵌，无需加载外部文件
 */
import { CHR, PRG, HEADER } from './romData.js';
import { createMemory } from './code/Memory.js';
import { renderPpuFrame } from './canvas/Renderer.js';
import { bootReset, nmiHandler } from './code/Boot.js';
import {
  VRAM_SIZE, OAM_SIZE,
  PPU_STATUS,
  BUTTON,
} from './types.js';

// ---- Construct ROM object (no file needed) ----
const rom = {
  header: HEADER,
  prg: PRG,
  chr: CHR,
};

// ---- DOM Elements ----
const gameCanvas = document.getElementById('game');
gameCanvas.width = 256;
gameCanvas.height = 240;

const statusEl = document.getElementById('status');

// ---- Game State ----
let mem;
let state;

let frameCounter = 0;
let animId = null;
let running = false;

// ---- Initialize ----
function init() {
  const ppu = {
    ctrl: 0, mask: 0, status: PPU_STATUS, oamAddr: 0,
    scroll: 0, addr: 0,
    v: 0, t: 0, x: 0, w: 0,
    vram: new Uint8Array(VRAM_SIZE),
    palette: new Uint8Array(32),
    oam: new Uint8Array(OAM_SIZE),
    oamDma: new Uint8Array(OAM_SIZE),
    frameBuffer: new Uint32Array(256 * 240),
  };

  const mmc3 = {
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
      flags: 0x34,
    },
  };

  statusEl.textContent = '就绪';
  console.log('[tsubasa] 内嵌 ROM 数据已加载');
  console.log(`  PRG: ${(PRG.length / 1024).toFixed(0)}KB  CHR: ${(CHR.length / 1024).toFixed(0)}KB  Mapper: ${HEADER.mapper}`);

  bootReset(state, mem);
}

// ---- Main Loop ----
function frameLoop() {
  if (!running) return;

  runFrame();
  renderPpuFrame(state.ppu, rom.chr, gameCanvas);

  frameCounter++;
  state.frame = frameCounter;

  animId = requestAnimationFrame(frameLoop);
}

function runFrame() {
  state.ppu.status |= 0x80;
  nmiHandler(state, mem);
  state.ppu.status &= 0x7F;
}

// ---- Input Handling ----
const keys = new Set();

document.addEventListener('keydown', (e) => {
  keys.add(e.code);
  updateInput();
  e.preventDefault();
});
document.addEventListener('keyup', (e) => {
  keys.delete(e.code);
  updateInput();
});

const KEY_MAP = {
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

function updateInput() {
  let input = 0;
  for (const code of keys) {
    input |= KEY_MAP[code] || 0;
  }
  state.controller1 = input;
}

// ---- Public API ----
export function start() {
  if (running) return;
  running = true;
  statusEl.textContent = '运行中';
  animId = requestAnimationFrame(frameLoop);
}

export function stop() {
  running = false;
  if (animId !== null) {
    cancelAnimationFrame(animId);
    animId = null;
  }
  statusEl.textContent = '已停止';
}

export function reset() {
  stop();
  bootReset(state, mem);
  start();
}

// ---- UI Buttons ----
document.getElementById('btnStart').addEventListener('click', start);
document.getElementById('btnStop').addEventListener('click', stop);
document.getElementById('btnReset').addEventListener('click', reset);

// ---- Boot ----
try {
  init();
  start();
} catch (e) {
  statusEl.textContent = '错误: ' + e.message;
  statusEl.style.color = '#ff4444';
  console.error('[tsubasa] init error:', e);
}
