/**
 * 标题画面数据 - 通过 jsnes 从 ROM 中模拟提取
 * 包含真实的 nametable 布局、attribute table 和调色板
 */
import { TITLE_NAMETABLE, TITLE_ATTRIBUTES, TITLE_PALETTE, TITLE_CTRL, TITLE_MASK } from '../titleScreenData.js';

/** 加载标题画面调色板 + PPU 寄存器 */
export function loadTitlePalette(state) {
  const ppu = state.ppu;
  for (let i = 0; i < 32; i++) {
    ppu.palette[i] = TITLE_PALETTE[i];
  }
  // 设置 PPU 控制寄存器匹配标题画面
  // BG pattern table = $1000, nametable 0, NMI on
  ppu.ctrl = TITLE_CTRL;
  ppu.mask = TITLE_MASK;
  console.log('[tsubasa] Title palette loaded, ctrl=0x' + TITLE_CTRL.toString(16) + ' mask=0x' + TITLE_MASK.toString(16));
}

/** 加载真实标题画面 nametable + attributes 到 VRAM */
export function loadTitleNametable(state) {
  const ppu = state.ppu;
  const nt = TITLE_NAMETABLE;
  const attr = TITLE_ATTRIBUTES;

  // 复制 nametable (960 bytes, tile indices)
  for (let i = 0; i < 0x03C0; i++) {
    ppu.vram[i] = nt[i];
  }

  // 复制 attribute table (64 bytes)
  for (let i = 0; i < 0x040; i++) {
    ppu.vram[0x03C0 + i] = attr[i];
  }

  console.log('[tsubasa] Real title screen loaded');
}

/** 保留测试网格用于调试 */
export function loadTestNametable(state) {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 32; col++) {
      state.ppu.vram[row * 32 + col] = (row * 32 + col) & 0xFF;
    }
  }
  for (let i = 256; i < 960; i++) {
    state.ppu.vram[i] = 0x00;
  }
  for (let attrY = 0; attrY < 8; attrY++) {
    for (let attrX = 0; attrX < 8; attrX++) {
      const palIdx = (attrX + attrY) & 0x03;
      const attrVal = palIdx | (palIdx << 2) | (palIdx << 4) | (palIdx << 6);
      state.ppu.vram[0x03C0 + attrY * 8 + attrX] = attrVal;
    }
  }
}

/** 运行标题画面每帧逻辑 */
export function runTitleLoop(state) {
  const ram = state.cpu.ram;
  const input = ram[0x1E];

  // 光标闪烁
  ram[0xED] ^= 0x40;

  if (input & 0x08) {
    console.log('[tsubasa] Title → Match (START pressed)');
    state.scene = 'match';
    return;
  }
}
