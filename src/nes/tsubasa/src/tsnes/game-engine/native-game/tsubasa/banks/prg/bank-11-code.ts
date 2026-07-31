/**
 * Bank 11: Background/Tile Renderer ($8000-$9FFF)
 *
 * MMC3 可切换 bank。
 * 功能: 背景/瓦片渲染 — nametable scroll 更新、tile 复制
 *
 * ═══════════════════════════════════════
 * 架构角色: Controller（背景渲染引擎）
 * ═══════════════════════════════════════
 *
 * 6502 Entry Points (JMP vectors at $8000):
 *   $8000 → JMP $800C (init/render)
 *   $8003 → JMP $8083 (scroll update)
 *   $8006 → JMP $84A1 (tile write)
 *   $8009 → JMP $814C (attr/setup)
 *
 * Phase 2b: 骨架实现 — 背景滚动与瓦片写入
 *
 * 原始 hex: tsubasa-hex2asm/prg_banks/prg_bank_11_background.ts
 */

import type { SystemState } from '../system-state';
import { writeMem, readMem } from '../system-state';
import { PRG_ROM_BANKS } from '../data/rom-data';
import { track } from '../debug-log';

// ── ROM data registration ──// ═════════════════════════════════════════════════
// $8000/$800C: 背景初始化/渲染
// ═════════════════════════════════════════════════
//
// 6502 原始: 检查 $05D4/$05D5 滚动偏移，计算 VRAM 地址，
// 从 metatile 映射表读取 tile → 写入 PPU nametable。
// 用于标题画面滚动和比赛背景平移。

/** $8000/$800C: 背景初始化/渲染 */
export function bank11_init(sys: SystemState): void {
  track('bank11_init', { scrollX: sys.mem[0x05D4], scrollY: sys.mem[0x05D5] });

  // 读取滚动偏移
  const scrollX = sys.mem[0x05D4] || 0;
  const scrollY = sys.mem[0x05D5] || 0;

  // 计算 nametable 起始地址
  // 6502: 根据 scroll 计算 (ntBase + row*32 + col)
  const ntBase = 0x2000;
  const row = (scrollY >> 3) & 0x1D; // 每行 32 tile
  const col = (scrollX >> 3) & 0x1F;
  const ppuAddr = ntBase + (row * 32 + col);

  // 等待 NMI
  writeMem(sys, 0x0515, 0x01);

  // 构建 PPU 队列: 写入一行 32 个 tile
  const qIdx = readMem(sys, 0x0628) || 0;
  writeMem(sys, 0x05E8 + qIdx, 0x20); // count = 32
  writeMem(sys, 0x05E9 + qIdx, ppuAddr & 0xFF);
  writeMem(sys, 0x05EA + qIdx, (ppuAddr >> 8) & 0xFF);

  // 从 ROM metatile 表读取 tile (bank 11 ROM data at $8700+)
  for (let i = 0; i < 0x20; i++) {
    const metaIdx = ((row + (i >> 3)) & 0x1F) * 16 + ((col + (i & 7)) & 0x0F);
    const tile = readMem(sys, 0xB700 + metaIdx) || 0;
    writeMem(sys, 0x05EB + qIdx + i, tile);
  }

  writeMem(sys, 0x05EB + qIdx + 0x20, 0x00); // terminator
  writeMem(sys, 0x0628, qIdx + 3 + 0x20);

  // 更新滚动状态
  sys.mem[0x05D8] = (scrollX >> 3) & 0x1F;
  sys.mem[0x05D9] = (scrollY >> 3) & 0x1D;

  writeMem(sys, 0x0515, 0x80);
  writeMem(sys, 0x0516, (readMem(sys, 0x0516) | 0x10)); // PPU increment = 32
}

/** $8003/$8083: 滚动更新 — 水平/垂直 nametable 滚动 */
export function bank11_scrollUpdate(sys: SystemState): void {
  track('bank11_scrollUpdate');

  // 读取滚动差值
  const scrollX = sys.mem[0x05D4] || 0;
  const scrollY = sys.mem[0x05D5] || 0;
  const signFlag = readMem(sys, 0x05D7); // 方向标志

  // 计算实际 nametable 滚动地址
  let effectiveX = scrollX;
  if (signFlag & 0x80) {
    effectiveX = ((~scrollX + 1) & 0xFF);
  }
  effectiveX = (effectiveX >> 3) & 0x1F;

  // 更新 nametable 列
  const colAddr = 0x2000 + effectiveX;
  const ntRow = (scrollY >> 3) & 0x1D;

  // 构建垂直滚动 PPU 队列
  const qIdx = readMem(sys, 0x0628) || 0;
  for (let row = 0; row < 4; row++) {
    const ntAddr = colAddr + (ntRow + row) * 32;
    writeMem(sys, 0x05E8 + qIdx, (qIdx + row * 4) & 0xFF); // entry type
    writeMem(sys, 0x05E9 + qIdx + row * 4, ntAddr & 0xFF);
    writeMem(sys, 0x05EA + qIdx + row * 4, (ntAddr >> 8) & 0xFF);
  }

  writeMem(sys, 0x05E8 + qIdx + 4 * 4 - 1, 0);
  writeMem(sys, 0x0628, qIdx + 4 * 4);

  // 更新 $05D8 (上次滚动位置)
  sys.mem[0x05D8] = (scrollX >> 3) & 0x1F;
  writeMem(sys, 0x0515, 0x80);
}

/** $8006/$84A1: 瓦片写入 */
export function bank11_tileWrite(sys: SystemState): void {
  track('bank11_tileWrite');

  // 读取 $0525 中的 PPU 地址和 tile 数据
  const ppuLo = readMem(sys, 0x0525) || 0;
  const ppuHi = readMem(sys, 0x0526) || 0x20;

  const qIdx = readMem(sys, 0x0628) || 0;

  // 从 ROM 读 metatile 引用，展开为 4 个 PPU tile
  const metaIdx = readMem(sys, 0x05D1) || 0;
  const tileBase = 0xB700 + metaIdx * 4;

  writeMem(sys, 0x05E8 + qIdx, 4); // 4 tiles = 2x2 metatile
  writeMem(sys, 0x05E9 + qIdx, ppuLo);
  writeMem(sys, 0x05EA + qIdx, ppuHi);

  for (let i = 0; i < 4; i++) {
    writeMem(sys, 0x05EB + qIdx + i, readMem(sys, tileBase + i));
  }

  writeMem(sys, 0x05EB + qIdx + 4, 0);
  writeMem(sys, 0x0628, qIdx + 7);
  writeMem(sys, 0x0515, 0x80);
}

/** $8009/$814C: 属性设置 — nametable attribute table 更新 */
export function bank11_attrSetup(sys: SystemState): void {
  track('bank11_attrSetup');

  // 写属性表字节
  const ntRow = sys.mem[0x05D9] || 0;
  const attrAddr = 0x23C0 + ((ntRow >> 2) * 8);

  const qIdx = readMem(sys, 0x0628) || 0;
  writeMem(sys, 0x05E8 + qIdx, 1);
  writeMem(sys, 0x05E9 + qIdx, attrAddr & 0xFF);
  writeMem(sys, 0x05EA + qIdx, (attrAddr >> 8) & 0xFF);

  // 从 ROM 属性表读取
  const attrVal = readMem(sys, 0xB800 + (ntRow >> 2));
  writeMem(sys, 0x05EB + qIdx, attrVal);

  writeMem(sys, 0x05EB + qIdx + 1, 0);
  writeMem(sys, 0x0628, qIdx + 4);
  writeMem(sys, 0x0515, 0x80);
}

// ═════════════════════════════════════════════════
// Dispatch table
// ═════════════════════════════════════════════════

export const bank11_dispatch: Record<number, (sys: SystemState) => void> = {
  0x00: bank11_init,
  0x03: bank11_scrollUpdate,
  0x06: bank11_tileWrite,
  0x09: bank11_attrSetup,
};

console.log('[bank11] ✅ Phase 2b — 背景渲染引擎 (init|scroll|tile|attr)');
