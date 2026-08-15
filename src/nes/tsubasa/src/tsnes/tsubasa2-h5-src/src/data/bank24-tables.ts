/**
 * Bank 24 数据模型 (Data/Model 层) — HUD 文本流渲染 + 精灵加载
 *
 * 来源: rom-data/prg-bank-24.ts (自动生成, 原始字节)
 * CPU 映射: bank 0x18 切到 $8000-$9FFF
 *
 * HUD 文本流指针表 ($AD6E/$AD1C/$AD54) 与精灵配置表 ($B3BD/$B3CF)
 * 实际位于 bank 25 (CPU $A000-$BFFF 窗口), 由 `data/bank25-data.ts`
 * 提供原始字节访问。本文件仅做转发, 保持 bank24 service 单一数据入口。
 *
 * ⚠ bank24 自身数据表 ($8000 区内) 仍在提取中。
 */

import PRG_BANK_24 from '../../../rom-data/prg-bank-24';
import PRG_BANK_31 from '../../../rom-data/prg-bank-31';
import {
  readB25,
  readB25U16,
  readHud1Ptr,
  readHud2Ptr,
  readHud3Ptr,
  readSprPtr,
  readSprBits,
  B25_CPU_BASE,
  B25_SEG,
} from './bank25-data';

/** bank24 CPU 基址 */
export const B24_CPU_BASE = 0x8000;

/** 读 bank24 原始字节 (CPU 地址) */
export function readB24(cpuAddr: number): number {
  const off = cpuAddr - B24_CPU_BASE;
  return off >= 0 && off < PRG_BANK_24.length ? PRG_BANK_24[off] : 0;
}

/** 读 bank24 16bit LE (CPU 地址) */
export function readB24U16(cpuAddr: number): number {
  return readB24(cpuAddr) | (readB24(cpuAddr + 1) << 8);
}

/** bank31 CPU 基址 (固定区 $E000-$FFFF) */
export const B31_CPU_BASE = 0xe000;

/** 读 bank31 原始字节 (CPU 地址, 固定区文本数据/指针表) */
export function readB31(cpuAddr: number): number {
  const off = cpuAddr - B31_CPU_BASE;
  return off >= 0 && off < PRG_BANK_31.length ? PRG_BANK_31[off] : 0;
}

/** 读 bank31 16bit LE (CPU 地址) */
export function readB31U16(cpuAddr: number): number {
  return readB31(cpuAddr) | (readB31(cpuAddr + 1) << 8);
}

// ═══════════════════════════════════════════════════════════════
// HUD / 精灵配置表 (数据在 bank25, 见 bank25-data.ts)
// ═══════════════════════════════════════════════════════════════

/** $AD6E HUD 行1 指针表 (bank25): idx = (ram_0532&0x7F)-1 → 文本流数据块 */
export { readHud1Ptr };

/** $AD1C HUD 行2 指针表 (bank25, 4 条目): idx = (ram_0534&0x7F)-1 → 文本流数据块 */
export { readHud2Ptr };

/** $AD54 HUD 行3 指针表 (bank25, 5 条目): idx = (ram_0536&0x7F)-1 → 文本流数据块 */
export { readHud3Ptr };

/** $B3BD 精灵位段表 (bank25): A>>2 行索引取字节, A&3 取 2bit 段 */
export { readSprBits };

/** $B3CF 精灵数据指针表 (bank25): A*2 → 精灵数据块指针 */
export { readSprPtr };

// bank25 原始字节访问 (供 service 读文本流数据块等)
export { readB25, readB25U16, B25_CPU_BASE, B25_SEG };

// ═══════════════════════════════════════════════════════════════
// 比赛 HUD 场景指针表 ($9220, bank24) — 128 项 16 位指针
// ═══════════════════════════════════════════════════════════════

/** 场景指针表基址 (bank24 CPU $9220, ram_05EA 索引) */
export const B24_SCENE_PTR = 0x9220;

/**
 * 场景指针表读取 (ram_05EA 索引, 128 项)。
 * 对应 $801F-$8030:
 *   LDA ram_05EA; ASL → C=bit7 → 高字节 $92/$93 (base);
 *   TAY (低 8 位, 偶数) → (base+Y) 读 2B 指针。
 */
export function readScenePtr(ram05EA: number): number {
  const y = (ram05EA << 1) & 0xff;
  const base = (ram05EA & 0x80) !== 0 ? B24_SCENE_PTR + 0x100 : B24_SCENE_PTR;
  return readB24U16(base + y);
}

/**
 * 场景文本流字节读取。
 * 数据指针可指向 bank24 (CPU $8000-$9FFF) 或 bank25 (CPU $A000-$BFFF)。
 */
export function readSceneByte(cpuAddr: number): number {
  return cpuAddr < B24_CPU_BASE + 0x2000 ? readB24(cpuAddr) : readB25(cpuAddr);
}

/** 场景文本流 16bit LE 读取 */
export function readSceneU16(cpuAddr: number): number {
  return readSceneByte(cpuAddr) | (readSceneByte(cpuAddr + 1) << 8);
}
