/**
 * 天使之翼2 - 核心工具函数
 * 从 Bank $00 的 6502 汇编逐函数翻译为 JavaScript
 */

// ========================================================================
// $00:9FA8 → [9FB0,9FAD]  VBlank 等待
// ========================================================================
let vblankSavedRegs = [];

export function waitVBlank(state, mem, param) {
  state.cpu.ram[0x19] = param;
  vblankSavedRegs = [
    state.cpu.x, state.cpu.y,
    state.cpu.ram[0xED], state.cpu.ram[0xEC], state.cpu.ram[0xEB],
    state.cpu.ram[0xEA], state.cpu.ram[0xE9], state.cpu.ram[0xE8],
    state.cpu.ram[0xE7], state.cpu.ram[0xE6],
  ];
  state.ppu.status &= ~0x80;
  state.ppu.ctrl |= 0x80;
}

export function restoreVBlank(state) {
  if (vblankSavedRegs.length < 10) return;
  state.cpu.ram[0xE6] = vblankSavedRegs[9];
  state.cpu.ram[0xE7] = vblankSavedRegs[8];
  state.cpu.ram[0xE8] = vblankSavedRegs[7];
  state.cpu.ram[0xE9] = vblankSavedRegs[6];
  state.cpu.ram[0xEA] = vblankSavedRegs[5];
  state.cpu.ram[0xEB] = vblankSavedRegs[4];
  state.cpu.ram[0xEC] = vblankSavedRegs[3];
  state.cpu.ram[0xED] = vblankSavedRegs[2];
  state.cpu.y = vblankSavedRegs[1];
  state.cpu.x = vblankSavedRegs[0];
  vblankSavedRegs = [];
}

// ========================================================================
// $00:9B11  画面初始化 (关 PPU 渲染)
// ========================================================================
export function screenInit(state, mem) {
  state.cpu.ram[0x48] = 0;
  state.cpu.ram[0x49] = 0;
  state.cpu.ram[0x4A] = 0;
  state.cpu.ram[0x4B] = 0;

  for (let i = 0; i < 256; i++) {
    mem.ram[0x054A + i] = 0x0F;
  }

  initScreenContinued(state);
}

function initScreenContinued(state) {
  const ppu = state.ppu;
  ppu.ctrl = (ppu.ctrl & 0x7F) | 0x00;
  ppu.mask = 0x00;
}

// ========================================================================
// $00:9B7F  画面还原 (开 PPU 渲染，清 OAM)
// ========================================================================
export function screenOn(state, mem) {
  for (let i = 0; i < 256; i++) {
    mem.ram[0x0468 + i] = 0xF8;
  }
  for (let i = 0; i < 256; i++) {
    mem.ram[0x0200 + i] = 0xF8;
  }
  mem.ram[0x0568] = 0;
  mem.ram[0x0588] = 0;
  mem.ram[0x05A8] = 0;
  mem.ram[0x05C8] = 0;
  state.ppu.mask = 0x1E;
}

// ========================================================================
// $00:9BA0  画面关闭 (screenOff)
// ========================================================================
export function screenOff(state, mem) {
  inputInit(state);
  clearVram(state, mem);
  screenOn(state, mem);
}

function inputInit(state) {
  state.cpu.ram[0x1D] = 0;
  state.cpu.ram[0x1E] = 0;
  state.cpu.ram[0x1F] = 0;
  state.cpu.ram[0x20] = 0;
  state.cpu.ram[0x23] = 0;
  state.cpu.ram[0x24] = 0;
  state.cpu.ram[0x25] = 0;
}

// ========================================================================
// $00:98A0  写入 VRAM 数据 (清空全部 VRAM)
// ========================================================================
export function clearVram(state) {
  const ppu = state.ppu;
  const savedCtrl = ppu.ctrl;
  const savedMask = ppu.mask;

  ppu.ctrl &= 0x7F;
  ppu.mask = 0x00;

  ppu.v = 0x2000;
  ppu.w = 0;

  for (let block = 0; block < 8; block++) {
    for (let i = 0; i < 256; i++) {
      writePpuByte(ppu, ppu.v + i, 0x00);
    }
  }

  ppu.ctrl = savedCtrl;
  ppu.mask = savedMask;
}

// ========================================================================
// $00:98E8 / $98EA VRAM写入（带参数）
// ========================================================================
export function writeVramBuffered(state, mem, dataPtrLow, dataPtrHigh, dataLen, dataType) {
  const ram = state.cpu.ram;
  ram[0xEB] = 0;

  if ((ram[0x4A] | ram[0x4B]) === 0) {
    writeVramDirect(state);
    return;
  }

  ram[0xE8] = dataLen;
  ram[0xE9] = dataType;
  ram[0xE6] = dataPtrLow;
  ram[0xE7] = dataPtrHigh;

  waitPpuReady(state, mem);

  const len = dataLen & 0xFF;
  for (let i = 0; i < len; i++) {
    mem.ram[0x05E8 + i] = ram[0xEB];
  }

  oamDmaUpdate(state, mem);
}

function writeVramDirect(state) {
  state.ppu.ctrl &= 0x7F;
  state.cpu.ram[0x20] = state.ppu.ctrl;
  state.ppu.mask = 0x00;
}

function waitPpuReady(state, mem) {
  if (mem.ram[0x0629] & 0x40) {
    waitVBlank(state, mem, 1);
  }
}

function oamDmaUpdate(state, mem) {
  const ppu = state.ppu;
  for (let i = 0; i < 256; i++) {
    ppu.oam[i] = mem.ram[0x0200 + i];
  }
}

// ========================================================================
// $00:C4B9  MMC3 Bank 切换
// ========================================================================
export function switchMmc3Bank(state, bankSelect, bankNum) {
  const mmc3 = state.mmc3;
  mmc3.bankSelect = bankSelect & 0x07;
  mmc3.bankData[mmc3.bankSelect] = bankNum;
}

// ========================================================================
// $00:8920  PPU nametable 地址设置
// ========================================================================
export function setPpuAddr(state, nametable, offset) {
  const ppu = state.ppu;
  const base = 0x2000 + (nametable & 0x03) * 0x0400;
  ppu.v = base + (offset & 0x03FF);
  ppu.w = 0;
}

// ========================================================================
// $00:88FB  延时闪烁
// ========================================================================
export function delayFlicker(state, mem) {
  let x = 0;
  do {
    mem.ram[0x046A + x] ^= 0x20;
    x = (x + 4) & 0xFF;
  } while (x !== 0);
}

// ========================================================================
// $00:890C  长延时
// ========================================================================
export function delayLong(state, mem, delayVal) {
  state.cpu.ram[0xED] = delayVal;
  let x = 0;
  do {
    const val = mem.ram[0x0468 + x] + delayVal;
    mem.ram[0x0468 + x] = val & 0xFF;
    x = (x + 4) & 0xFF;
  } while (x !== 0);
}

// ========================================================================
// $00:82B5  等待画面处理完成
// ========================================================================
export function waitScreenReady(state, mem) {
  do {
    waitVBlank(state, mem, 1);
  } while ((state.cpu.ram[0x4D] | state.cpu.ram[0x4E]) !== 0);
}

// ========================================================================
// $00:9A35  读取控制器输入
// ========================================================================
export function readInput(state) {
  const prevInput = state.cpu.ram[0x1D] & 0xFF;
  const currInput = state.controller1;

  state.cpu.ram[0x1D] = currInput;
  state.cpu.ram[0x1E] = (currInput ^ prevInput) & currInput;
  state.cpu.ram[0x1F] = state.controller2;

  const prevInput2 = state.cpu.ram[0x1F] ^ state.controller2;
  state.cpu.ram[0x20] = (state.controller2 ^ prevInput2) & state.controller2;
}

// ========================================================================
// 辅助: 写 PPU 寄存器
// ========================================================================
function writePpuByte(ppu, addr, value) {
  const offset = addr & 0x3FFF;
  if (offset >= 0x2000 && offset < 0x3F00) {
    ppu.vram[offset & 0x0FFF] = value;
  } else if (offset >= 0x3F00 && offset < 0x3F20) {
    const idx = offset & 0x1F;
    const mirrorIdx = idx === 0x10 ? 0x00 : idx === 0x14 ? 0x04 : idx === 0x18 ? 0x08 : idx === 0x1C ? 0x0C : idx;
    ppu.palette[mirrorIdx] = value;
  }
}

// ========================================================================
// $00:8464  Bank切换 + 画面初始化
// ========================================================================
export function switchBankAndInit(state, mem, bankId) {
  switchMmc3Bank(state, 6, bankId);
  state.cpu.ram[0x56] = bankId;
}
