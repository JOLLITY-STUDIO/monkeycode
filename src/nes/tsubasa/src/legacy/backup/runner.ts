/**
 * ============================================================
 * 天使之翼2 — Banks Runner (内嵌 ROM, 无需外部文件)
 * 将 48 个 bank 模块连接到 Canvas 渲染循环
 * ============================================================
 *
 * ROM 数据来自 _romdata.ts (ROM_DATA), 不需拖放 .nes 文件。
 * PPU 渲染使用 CHR RAM (游戏运行时写入 pattern table)。
 */

import { renderPpuFrame } from '../../canvas/Renderer';
import {
  NesRom, PpuState, Mmc3Regs,
  VRAM_SIZE, OAM_SIZE, BUTTON,
} from '../../types';

import { GameContext } from '../_context';
import { allBanks } from './index';
import type { RomReader, BankRomSlice } from './_bank_types';
import { ROM_DATA } from './_romdata';

// ============================================================
// DOM refs
// ============================================================

const canvas = document.getElementById('game') as HTMLCanvasElement;
const statusEl = document.getElementById('status')!;

canvas.width = 256;
canvas.height = 240;

// ============================================================
// Global state
// ============================================================

let rom: NesRom;
let ctx: GameContext;
let ppu: PpuState;
let mmc3: Mmc3Regs;
/** CHR RAM buffer — game writes pattern tiles here at runtime */
let chrRam: Uint8Array;

let running = false;
let animId: number | null = null;
let frameCount = 0;

// MMC3 bank mappings
let bank8000 = 0;
let bankA000 = 1;

// ============================================================
// Build NesRom from embedded ROM_DATA
// ============================================================

const PRG_BANK_SIZE = 0x2000; // 8KB
const TOTAL_PRG_BANKS = ROM_DATA.length; // 48 banks
const CHR_RAM_SIZE = 0x2000; // 8KB CHR RAM

function buildRom(): NesRom {
  // 拼接所有 PRG bank 到连续数组
  const prg = new Uint8Array(TOTAL_PRG_BANKS * PRG_BANK_SIZE);
  for (let i = 0; i < TOTAL_PRG_BANKS; i++) {
    prg.set(ROM_DATA[i], i * PRG_BANK_SIZE);
  }

  // CHR RAM (8KB, 游戏运行时通过 PPU $2007 写入)
  chrRam = new Uint8Array(CHR_RAM_SIZE);

  return {
    header: {
      prgSize: TOTAL_PRG_BANKS / 2,   // 16KB units → 24
      chrSize: 0,                       // CHR RAM (no CHR ROM)
      mapper: 4,                        // MMC3
      mirroring: 'horizontal',
      battery: true,
      trainer: false,
    },
    prg,
    chr: chrRam,
  };
}

// ============================================================
// ROM Reader — adapts NesRom to BankRomSlice / RomReader
// ============================================================

function bankSlice(bankNum: number): BankRomSlice {
  const base = bankNum * PRG_BANK_SIZE;
  const data = new Uint8Array(PRG_BANK_SIZE);
  for (let i = 0; i < PRG_BANK_SIZE; i++) {
    data[i] = (base + i < rom.prg.length) ? rom.prg[base + i] : 0xFF;
  }
  return {
    u8(offset: number) { return data[offset] ?? 0; },
    u16le(offset: number) { return (this.u8(offset)) | (this.u8(offset + 1) << 8); },
    data,
    romBase: base,
  };
}

function createRomReader(): RomReader {
  return {
    bank(addr: number): BankRomSlice {
      const cpuAddr = addr & 0xFFFF;
      let bn: number;
      if (cpuAddr >= 0xE000) {
        bn = TOTAL_PRG_BANKS - 1;       // last PRG bank
      } else if (cpuAddr >= 0xC000) {
        bn = TOTAL_PRG_BANKS - 2;       // second-last
      } else if (cpuAddr >= 0xA000) {
        bn = bankA000;
      } else {
        bn = bank8000;
      }
      return bankSlice(bn);
    },
    u8(addr: number): number {
      return this.bank(addr).u8(addr & 0x1FFF);
    },
    u16le(addr: number): number {
      return this.bank(addr).u16le(addr & 0x1FFF);
    },
  };
}

// ============================================================
// PPU Bridge — intercepts ctx.ram writes to PPU regs,
// mirrors them to PpuState used by Canvas Renderer
// ============================================================

function createPpuBridge(_origSetU8: (addr: number, val: number) => void) {
  return function ppuWriteHandler(addr: number, val: number): void {
    const reg = addr & 0x2007;
    switch (reg) {
      case 0x2000: // PPUCTRL
        ppu.ctrl = val;
        ppu.t = (ppu.t & 0xF3FF) | ((val & 0x03) << 10);
        break;
      case 0x2001: // PPUMASK
        ppu.mask = val;
        break;
      case 0x2003: // OAMADDR
        ppu.oamAddr = val;
        break;
      case 0x2004: // OAMDATA
        ppu.oam[ppu.oamAddr] = val;
        ppu.oamAddr = (ppu.oamAddr + 1) & 0xFF;
        break;
      case 0x2005: // PPUSCROLL
        if (ppu.w === 0) {
          ppu.x = val & 0x07;
          ppu.t = (ppu.t & 0xFFE0) | ((val >> 3) & 0x1F);
          ppu.w = 1;
        } else {
          ppu.t = (ppu.t & 0x8C1F) | ((val & 0x07) << 12) | ((val & 0xF8) << 2);
          ppu.w = 0;
        }
        break;
      case 0x2006: // PPUADDR
        if (ppu.w === 0) {
          ppu.t = (ppu.t & 0x00FF) | ((val & 0x3F) << 8);
          ppu.w = 1;
        } else {
          ppu.t = (ppu.t & 0xFF00) | val;
          ppu.v = ppu.t;
          ppu.w = 0;
        }
        break;
      case 0x2007: // PPUDATA
        if ((ppu.v & 0x3F00) === 0x3F00) {
          // Palette write
          ppu.palette[(ppu.v & 0x1F) % 32] = val;
        } else if ((ppu.v & 0x2000) === 0x0000) {
          // CHR RAM pattern table write ($0000-$1FFF)
          const chrAddr = ppu.v & 0x1FFF;
          if (chrAddr < CHR_RAM_SIZE) {
            chrRam[chrAddr] = val;
          }
        } else {
          // Nametable / VRAM write ($2000-$3EFF)
          const ntAddr = ppu.v & 0x07FF;
          ppu.vram[ntAddr] = val;
        }
        ppu.v = (ppu.v + ((ppu.ctrl & 0x04) ? 32 : 1)) & 0x7FFF;
        break;
    }
  };
}

// Shadow GameContext.ram.setU8 to intercept PPU writes
function installPpuBridge() {
  const orig = ctx.ram.setU8.bind(ctx.ram);
  const bridge = createPpuBridge(orig);
  ctx.ram.setU8 = (addr: number, val: number) => {
    orig(addr, val);
    if (addr >= 0x2000 && addr <= 0x2007) {
      bridge(addr, val);
    }
    // Track MMC3 bank writes
    if (addr === 0x8000) {
      mmc3.bankSelect = val & 0x07;
      mmc3.prgBankMode = (val >> 6) & 1;
      mmc3.chrBankMode = (val >> 7) & 1;
    } else if (addr === 0x8001) {
      mmc3.bankData[mmc3.bankSelect] = val;
      if (mmc3.bankSelect === 6) bank8000 = val;
      if (mmc3.bankSelect === 7) bankA000 = val;
    }
  };
}

// ============================================================
// Initialize
// ============================================================

function init(): void {
  rom = buildRom();

  // PPU state for Canvas rendering
  ppu = {
    ctrl: 0, mask: 0, status: 0, oamAddr: 0,
    scroll: 0, addr: 0,
    v: 0, t: 0, x: 0, w: 0,
    vram: new Uint8Array(VRAM_SIZE),
    palette: new Uint8Array(32),
    oam: new Uint8Array(OAM_SIZE),
    oamDma: new Uint8Array(OAM_SIZE),
    frameBuffer: new Uint32Array(256 * 240),
  };

  mmc3 = {
    bankSelect: 0,
    bankData: [0, 0, 0, 0, 0, 0, 0, 0],
    prgBankMode: 0, chrBankMode: 0,
    mirroring: 0, prgRamProtect: false,
    irqLatch: 0, irqCounter: 0,
    irqReload: false, irqEnable: false,
  };

  // Initialize GameContext
  ctx = new GameContext();

  // Set initial MMC3 banks
  bank8000 = 0;
  bankA000 = 1;
  ctx.ram.setU8(0x24, bank8000);
  ctx.ram.setU8(0x25, bankA000);

  // Install PPU bridge
  installPpuBridge();

  // Boot: call bank_31 RESET ($FFF0)
  const reader = createRomReader();
  const bank31 = allBanks[31];
  if (bank31?.fns?.['$FFF0']) {
    bank31.fns['$FFF0'](ctx, reader);
  } else {
    bank31?.dispatch(ctx, reader);
  }

  statusEl.textContent = '内嵌 ROM 已初始化 (48 banks)';

  // Inject default palette so we see something
  const colors = [
    0x0F, 0x2C, 0x11, 0x30, 0x0F, 0x16, 0x27, 0x18,
    0x0F, 0x0F, 0x0F, 0x0F, 0x0F, 0x0F, 0x0F, 0x0F,
    0x0F, 0x01, 0x21, 0x31, 0x0F, 0x0F, 0x0F, 0x0F,
    0x0F, 0x0F, 0x0F, 0x0F, 0x0F, 0x0F, 0x0F, 0x0F,
  ];
  for (let i = 0; i < 32; i++) ppu.palette[i] = colors[i];

  console.log('[runner] Init complete. PRG banks:', rom.prg.length >> 13, 'CHR: RAM');
}

// ============================================================
// Frame loop — 60fps
// ============================================================

function frameLoop(): void {
  if (!running) return;
  frameCount++;

  // Simulate VBlank
  ppu.status |= 0x80;

  // Execute NMI logic:
  //   bank_00 dispatch reads $27 (jump index) → calls scene handler
  const reader = createRomReader();

  if (bank8000 === 0) {
    const bank0 = allBanks[0];
    ctx.ram.setU8(0x27, 0); // jumpIdx = 0 (main scene loop entry)
    bank0?.dispatch(ctx, reader);
  }

  // Copy OAM from CPU RAM ($0200-$02FF) to PPU OAM
  for (let i = 0; i < OAM_SIZE; i++) {
    ppu.oam[i] = ctx.ram.u8(0x0200 + i);
  }

  // Enable rendering
  ppu.mask = 0x1E; // show BG + sprites

  // Render to canvas (uses chrRam for pattern tables)
  renderPpuFrame(ppu, chrRam, canvas);

  // Clear VBlank
  ppu.status &= 0x7F;

  // Joypad input
  const prevJoy = ctx.ram.u8(0x1B) as number;
  ctx.ram.setU8(0x1E, prevJoy);
  const newJoy = updateJoypad();
  ctx.ram.setU8(0x1B, newJoy);
  ctx.ram.setU8(0x1C, (newJoy ^ prevJoy) & newJoy);

  animId = requestAnimationFrame(frameLoop);
}

// ============================================================
// Input
// ============================================================

const keys = new Set<string>();

const KEY_MAP: Record<string, number> = {
  'KeyZ': BUTTON.A, 'KeyA': BUTTON.A,
  'KeyX': BUTTON.B, 'KeyS': BUTTON.B,
  'Enter': BUTTON.START,
  'ShiftRight': BUTTON.SELECT, 'ShiftLeft': BUTTON.SELECT,
  'ArrowUp': BUTTON.UP, 'ArrowDown': BUTTON.DOWN,
  'ArrowLeft': BUTTON.LEFT, 'ArrowRight': BUTTON.RIGHT,
};

function updateJoypad(): number {
  let input = 0;
  for (const code of keys) input |= KEY_MAP[code] || 0;
  return input;
}

document.addEventListener('keydown', e => { keys.add(e.code); });
document.addEventListener('keyup', e => { keys.delete(e.code); });

// ============================================================
// Public API
// ============================================================

function start(): void {
  if (running) return;
  running = true;
  statusEl.textContent = '运行中 (banks)';
  animId = requestAnimationFrame(frameLoop);
}

function stop(): void {
  running = false;
  if (animId !== null) { cancelAnimationFrame(animId); animId = null; }
  statusEl.textContent = '已停止';
}

function reset(): void {
  stop();
  init();
  start();
}

// ============================================================
// Auto-boot
// ============================================================

init();
start();

// Button events
document.getElementById('btnStart')?.addEventListener('click', start);
document.getElementById('btnStop')?.addEventListener('click', stop);
document.getElementById('btnReset')?.addEventListener('click', reset);

console.log('[runner] Banks runner loaded. 48 banks, CHR RAM.');
