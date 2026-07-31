/**
 * Bank 22: Sprite/OAM Engine ($8000-$9FFF)
 *
 * MMC3 可切换 bank。
 * 功能: 精灵/OAM 处理 — sprite 坐标变换、OAM 数据构造、PPU OAM 传输
 *
 * ═══════════════════════════════════════
 * 架构角色: Controller（精灵渲染引擎）
 * ═══════════════════════════════════════
 *
 * 6502 Entry Points (JMP vectors at $8000):
 *   $8000 → JMP $8003 (sprite/OAM convert entry)
 *
 * Phase 2b: 骨架实现 — sprite 坐标变换与 OAM 写入
 *
 * 原始 hex: tsubasa-hex2asm/prg_banks/prg_bank_22_sprite_engine.ts
 */

import type { SystemState } from '../system-state';
import { writeMem, readMem } from '../system-state';
import { PRG_ROM_BANKS } from '../data/rom-data';
import { track } from '../debug-log';

// ── ROM data registration ──// ═════════════════════════════════════════════════
// $8000/$8003: 精灵坐标变换入口
// ═════════════════════════════════════════════════
//
// 6502 原始: 读取 $0538 中的 OAM 源数据（世界坐标），
// 根据摄像机滚动偏移 ($7A, $44) 转换为屏幕坐标，
// 写入 $0200-$02FF OAM shadow，供 NMI handler 执行 sprite DMA。
//
// OAM 条目格式 (每 4 字节):
//   [0]: Y 坐标
//   [1]: Tile index
//   [2]: Attributes (palette, flip, priority)
//   [3]: X 坐标

/** $8000/$8003: 精灵/OAM 坐标变换入口 */
export function bank22_spriteConvert(sys: SystemState): void {
  track('bank22_spriteConvert');

  const scrollX = sys.mem[0x7A] || 0;
  const scrollY = sys.mem[0x44] || 0;

  // 从 $0468 读取 OAM 源数据 (40 sprites × 4 bytes)
  // 转换并写入 $0200 OAM shadow
  for (let i = 0; i < 40; i++) {
    const src = 0x0468 + i * 4;
    const dst = 0x0200 + i * 4;

    // Y 坐标: 世界 Y - 滚动 Y
    let y = (sys.mem[src] || 0xF8) - scrollY;
    if (y < 0 || y >= 240) y = 0xF8; // 屏幕外 → 隐藏

    // Tile 复制
    const tile = sys.mem[src + 1] || 0;

    // Attributes: 优先级 + 调色板 + flip
    const attr = sys.mem[src + 2] || 0;

    // X 坐标: 世界 X - 滚动 X
    let x = (sys.mem[src + 3] || 0xF8) - scrollX;
    if (x < 0 || x >= 256) x = 0xF8; // 屏幕外 → 隐藏

    // 写入 OAM shadow
    sys.mem[dst] = y;
    sys.mem[dst + 1] = tile;
    sys.mem[dst + 2] = attr;
    sys.mem[dst + 3] = x;
  }

  // 设置 sprite DMA 标志 (bank-02 NMI 会检测并执行 DMA)
  writeMem(sys, 0x0516, (readMem(sys, 0x0516) | 0x20));
}

// ═════════════════════════════════════════════════
// 辅助: 精灵显隐控制
// ═════════════════════════════════════════════════

/** 清除所有 OAM: Y=$F8 (隐藏) */
function _bank22_clearOAM(sys: SystemState): void {
  for (let i = 0; i < 0x100; i += 4) {
    sys.mem[0x0200 + i] = 0xF8;
  }
}

// ═════════════════════════════════════════════════
// Dispatch table
// ═════════════════════════════════════════════════

export const bank22_dispatch: Record<number, (sys: SystemState) => void> = {
  0x00: bank22_spriteConvert,
};

console.log('[bank22] ✅ Phase 2b — 精灵/OAM 引擎 (spriteConvert|OAM)');
