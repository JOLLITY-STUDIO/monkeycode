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
import { track } from '../debug-log';
import {
  DATA_$81E1_$824C,
  DATA_$827F_$82BB,
  DATA_$82BC_$82F6,
  DATA_$8465_$8470,
  DATA_$86EE_$8721,
  DATA_$8722_$8789,
  DATA_$878A_$87B5,
  DATA_$87B6_$87E1,
  DATA_$87E2_$882B,
  DATA_$882C_$8839,
  DATA_$883A_$8871,
  DATA_$8872_$8897,
  DATA_$8898_$88C3,
  DATA_$88C4_$88D5,
  DATA_$88D6_$8955,
  DATA_$8956_$897A,
  DATA_$897B_$8A03,
  DATA_$8A04_$8A27,
  DATA_$8A28_$8A45,
  DATA_$8A46_$8A73,
  DATA_$8A74_$8AAF,
  DATA_$8AB0_$8AC0,
  DATA_$8AC1_$8AF7,
  DATA_$8AF8_$8B2A,
  DATA_$8B2B_$8B37,
  DATA_$8B38_$8B63,
  DATA_$8B64_$8E63,
  DATA_$8E64_$8EA3,
  DATA_$8EA4_$94C3,
  DATA_$94C4_$94E3,
  DATA_$94E4_$9503,
  DATA_$9504_$9523,
  DATA_$9524_$9783,
  DATA_$9784_$97E3,
  DATA_$97E4_$9A63,
  DATA_$9A64_$9AA3,
  DATA_$9AA4_$9BEF,
  DATA_$9BF0_$9C26,
  DATA_$9C27_$9C42,
  DATA_$9C43_$9C71,
  DATA_$9C72_$9C8B,
  DATA_$9C8C_$9CA6,
  DATA_$9CA7_$9CD0,
  DATA_$9CD1_$9CE2,
  DATA_$9CE3_$9D0B,
  DATA_$9D0C_$9D97,
  DATA_$9D98_$9DA5,
  DATA_$9DA6_$9DCA,
  DATA_$9DCB_$9E21,
  DATA_$9E22_$9E9D,
  DATA_$9E9E_$9EE2,
  DATA_$9EE3_$9FFF,
} from './bank-11-data';

// ── ROM data chunk lookup (each chunk mapped by bank offset range) ──
const _DATA_CHUNKS: Array<{ offset: number; data: readonly number[] }> = [
  { offset: 0x01E1, data: DATA_$81E1_$824C },
  { offset: 0x027F, data: DATA_$827F_$82BB },
  { offset: 0x02BC, data: DATA_$82BC_$82F6 },
  { offset: 0x0465, data: DATA_$8465_$8470 },
  { offset: 0x06EE, data: DATA_$86EE_$8721 },
  { offset: 0x0722, data: DATA_$8722_$8789 },
  { offset: 0x078A, data: DATA_$878A_$87B5 },
  { offset: 0x07B6, data: DATA_$87B6_$87E1 },
  { offset: 0x07E2, data: DATA_$87E2_$882B },
  { offset: 0x082C, data: DATA_$882C_$8839 },
  { offset: 0x083A, data: DATA_$883A_$8871 },
  { offset: 0x0872, data: DATA_$8872_$8897 },
  { offset: 0x0898, data: DATA_$8898_$88C3 },
  { offset: 0x08C4, data: DATA_$88C4_$88D5 },
  { offset: 0x08D6, data: DATA_$88D6_$8955 },
  { offset: 0x0956, data: DATA_$8956_$897A },
  { offset: 0x097B, data: DATA_$897B_$8A03 },
  { offset: 0x0A04, data: DATA_$8A04_$8A27 },
  { offset: 0x0A28, data: DATA_$8A28_$8A45 },
  { offset: 0x0A46, data: DATA_$8A46_$8A73 },
  { offset: 0x0A74, data: DATA_$8A74_$8AAF },
  { offset: 0x0AB0, data: DATA_$8AB0_$8AC0 },
  { offset: 0x0AC1, data: DATA_$8AC1_$8AF7 },
  { offset: 0x0AF8, data: DATA_$8AF8_$8B2A },
  { offset: 0x0B2B, data: DATA_$8B2B_$8B37 },
  { offset: 0x0B38, data: DATA_$8B38_$8B63 },
  { offset: 0x0B64, data: DATA_$8B64_$8E63 },
  { offset: 0x0E64, data: DATA_$8E64_$8EA3 },
  { offset: 0x0EA4, data: DATA_$8EA4_$94C3 },
  { offset: 0x14C4, data: DATA_$94C4_$94E3 },
  { offset: 0x14E4, data: DATA_$94E4_$9503 },
  { offset: 0x1504, data: DATA_$9504_$9523 },
  { offset: 0x1524, data: DATA_$9524_$9783 },
  { offset: 0x1784, data: DATA_$9784_$97E3 },
  { offset: 0x17E4, data: DATA_$97E4_$9A63 },
  { offset: 0x1A64, data: DATA_$9A64_$9AA3 },
  { offset: 0x1AA4, data: DATA_$9AA4_$9BEF },
  { offset: 0x1BF0, data: DATA_$9BF0_$9C26 },
  { offset: 0x1C27, data: DATA_$9C27_$9C42 },
  { offset: 0x1C43, data: DATA_$9C43_$9C71 },
  { offset: 0x1C72, data: DATA_$9C72_$9C8B },
  { offset: 0x1C8C, data: DATA_$9C8C_$9CA6 },
  { offset: 0x1CA7, data: DATA_$9CA7_$9CD0 },
  { offset: 0x1CD1, data: DATA_$9CD1_$9CE2 },
  { offset: 0x1CE3, data: DATA_$9CE3_$9D0B },
  { offset: 0x1D0C, data: DATA_$9D0C_$9D97 },
  { offset: 0x1D98, data: DATA_$9D98_$9DA5 },
  { offset: 0x1DA6, data: DATA_$9DA6_$9DCA },
  { offset: 0x1DCB, data: DATA_$9DCB_$9E21 },
  { offset: 0x1E22, data: DATA_$9E22_$9E9D },
  { offset: 0x1E9E, data: DATA_$9E9E_$9EE2 },
  { offset: 0x1EE3, data: DATA_$9EE3_$9FFF },
];

/** ROM 数据访问 — 按 bank offset 查找对应数据块 */
function rom11(offset: number): number {
  const bankOff = offset & 0x1FFF;
  for (const chunk of _DATA_CHUNKS) {
    if (bankOff >= chunk.offset && bankOff < chunk.offset + chunk.data.length) {
      return chunk.data[bankOff - chunk.offset];
    }
  }
  return 0;
}

// ═════════════════════════════════════════════════
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

  // 从 ROM metatile 表读取 tile (bank 11 ROM data at offset $1700+)
  for (let i = 0; i < 0x20; i++) {
    const metaIdx = ((row + (i >> 3)) & 0x1F) * 16 + ((col + (i & 7)) & 0x0F);
    const tile = rom11(0x1700 + metaIdx) || 0;
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
  const romOff = 0x1700 + metaIdx * 4;

  writeMem(sys, 0x05E8 + qIdx, 4); // 4 tiles = 2x2 metatile
  writeMem(sys, 0x05E9 + qIdx, ppuLo);
  writeMem(sys, 0x05EA + qIdx, ppuHi);

  for (let i = 0; i < 4; i++) {
    writeMem(sys, 0x05EB + qIdx + i, rom11(romOff + i));
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
  const attrVal = rom11(0x1800 + (ntRow >> 2));
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
