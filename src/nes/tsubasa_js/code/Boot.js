/**
 * 天使之翼2 - 游戏启动/初始化
 */
import {
  screenOff, screenOn, screenInit, clearVram,
  waitVBlank, restoreVBlank, switchMmc3Bank,
  setPpuAddr, delayFlicker, delayLong,
  readInput, waitScreenReady,
  switchBankAndInit,
} from './CoreUtils.js';
import { loadTitlePalette, loadTitleNametable, runTitleLoop } from './TitleScreen.js';

// ========================================================================
// bootReset - 对应 NES RESET handler
// ========================================================================
export function bootReset(state, mem) {
  state.cpu.flags |= 0x04;   // I=1 禁中断
  state.cpu.flags &= ~0x08;  // D=0 十进制关
  state.cpu.stack = 0xFF;

  initMmc3Default(state);

  for (let i = 0; i < 0x0800; i++) {
    mem.ram[i] = 0;
  }

  const ppu = state.ppu;
  ppu.ctrl = 0x00;
  ppu.mask = 0x00;
  ppu.status = 0x00;
  ppu.vram.fill(0);
  ppu.oam.fill(0);
  ppu.palette.fill(0x0F);

  initTitleScreen(state, mem);

  console.log('[tsubasa] Boot → Title screen initialized');
}

// ========================================================================
// initTitleScreen  标题画面初始化
// ========================================================================
function initTitleScreen(state, mem) {
  const ram = state.cpu.ram;

  ram[0x05] = 0;
  ram[0x06] = 0;
  ram[0x09] = 0;
  ram[0x0A] = 0;
  ram[0x11] = 0;
  ram[0x12] = 0;
  ram[0x0D] = 0;
  ram[0x0E] = 0;
  ram[0x4C] = 0;
  ram[0x5B] = 0;
  mem.ram[0x0700] = 0x01;

  if ((ram[0x1B] & 0x01) === 0) {
    screenInit(state, mem);
    waitVBlank(state, mem, 2);
    restoreVBlank(state);
    screenOn(state, mem);
    clearVram(state, mem);
    loadTitlePalette(state);
    delayFlicker(state, mem);
    readInput(state, mem);
  }

  loadTitleNametable(state);

  setPpuAddr(state, 0, 0);
  ram[0x90] = 0;
  ram[0x91] = 2;
  ram[0x1B] = ram[0x1B] & 0xFE;

  ram[0xED] = 0x0A;
  ram[0xE6] = ram[0xED];
  ram[0xE7] = 0x22;

  state.scene = 'title';
  console.log('[tsubasa] Title screen initialized');
}

// ========================================================================
// initMatch  比赛初始化
// ========================================================================
export function initMatch(state, mem) {
  const ram = state.cpu.ram;

  screenOff(state, mem);
  switchBankAndInit(state, mem, 1);
  waitScreenReady(state, mem);

  ram[0xE0] = 0xC0;
  switchMmc3Bank(state, 6, 2);

  ram[0x28] = 0;
  ram[0x29] = 0;
  ram[0x27] = 0;

  mem.ram[0x0700] = 0x01;
  switchMmc3Bank(state, 6, 2);
  setPpuAddr(state, 0, 0);
  switchMmc3Bank(state, 6, 1);

  let diffX = 0x55;
  if (ram[0x26] >= 0x20) {
    diffX = 0x4C;
  }
  mem.ram[0x0700] = diffX;

  mem.ram[0x0450] = 0;
  mem.ram[0x0451] = 0;
  mem.ram[0x0452] = 0;
  mem.ram[0x0453] = 0;

  switchMmc3Bank(state, 6, 1);

  state.scene = 'match';
  console.log('[tsubasa] Match initialized');
}

// ========================================================================
// initMmc3Default  MMC3 默认 bank 映射
// ========================================================================
function initMmc3Default(state) {
  const mmc3 = state.mmc3;
  mmc3.prgBankMode = 0;
  mmc3.chrBankMode = 0;
  mmc3.mirroring = 0;

  mmc3.bankData[6] = 0x00;
  mmc3.bankData[7] = 0x01;

  for (let i = 0; i < 6; i++) {
    mmc3.bankData[i] = i;
  }
}

// ========================================================================
// NMI handler - 每帧调用一次
// ========================================================================
export function nmiHandler(state, mem) {
  const ppu = state.ppu;

  for (let i = 0; i < 0x100; i++) {
    ppu.oam[i] = mem.ram[0x0200 + i];
  }

  readInput(state, mem);
  runGameLogic(state, mem);
}

// ========================================================================
// 场景分派
// ========================================================================
function runGameLogic(state, mem) {
  switch (state.scene) {
    case 'boot':
      initTitleScreen(state, mem);
      break;
    case 'title':
      runTitleLogic(state, mem);
      break;
    case 'match':
      runMatchLogic(state, mem);
      break;
  }
}

function runTitleLogic(state, mem) {
  runTitleLoop(state, mem);
  if (state.scene === 'match') {
    initMatch(state, mem);
  }
}

function runMatchLogic(_state, _mem) {
  // TODO: 翻译 $A203 比赛主循环
}
