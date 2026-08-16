/**
 * Bank 25 数据模型 (Data/Model 层) — HUD 文本流数据 / 精灵配置表
 *
 * 来源: rom-data/prg-bank-25.ts (自动生成, 原始字节)
 * 数据已直接 import，cpuAddr (0xA000-0xBFFF) 仅作数据索引保留
 *           offset = cpuAddr - 0xA000
 *
 * Bank 25 是纯数据 bank (无代码)。Bank 24 (HUD service) 引用了本 bank 的
 * 指针表与文本流数据:
 *   - $AD6E  HUD 行1 指针表 (2B/条目, ≥12 条目, 数据区自 $ADF6 起)
 *   - $AD1C  HUD 行2 指针表 (2B/条目, 4 条目 $AD1C-$AD23, 数据区自 $AD24 起)
 *   - $AD54  HUD 行3 指针表 (2B/条目, 5 条目 $AD54-$AD5D, 数据区自 $AD5E 起)
 *   - $B3BD  精灵位段表 (入口 $8851: Y=A>>2 取 1 字节, 再按 A&3 取 2bit 段)
 *   - $B3CF  精灵数据指针表 (入口 $8851: X=A*2 取 2B 指针 → 精灵数据块)
 *
 * 当前阶段: 直接复制原始字节, 暂不结构化。待文本流/精灵数据块语义分析
 * 完成后, 再拆分为命名数据表。
 */

import PRG_BANK_25 from '../../../../rom-data/prg-bank-25';

/** bank25 CPU 基址 ($A000-$BFFF) */
export const B25_CPU_BASE = 0xa000;

/** bank25 逻辑区段 (CPU 地址) */
export const B25_SEG = {
  /** HUD 行1 指针表 */
  HUD1_PTR: 0xad6e,
  /** HUD 行2 指针表 (4 条目) */
  HUD2_PTR: 0xad1c,
  /** HUD 行3 指针表 (5 条目) */
  HUD3_PTR: 0xad54,
  /** 精灵位段表 */
  SPR_BITS: 0xb3bd,
  /** 精灵数据指针表 */
  SPR_PTR: 0xb3cf,
} as const;

/** 读 bank25 原始字节 (CPU 地址 $A000-$BFFF) */
export function readB25(cpuAddr: number): number {
  const off = cpuAddr - B25_CPU_BASE;
  return off >= 0 && off < PRG_BANK_25.length ? PRG_BANK_25[off] : 0;
}

/** 读 bank25 16bit LE (CPU 地址) */
export function readB25U16(cpuAddr: number): number {
  return readB25(cpuAddr) | (readB25(cpuAddr + 1) << 8);
}

// ═══════════════════════════════════════════════════════════════
// 便捷读取 (按汇编入口语义, 避免 service 直接拼地址)
// ═══════════════════════════════════════════════════════════════

/** HUD 行1 指针表: X = (ram_0532&0x7F)-1 (ASL 由调用方做) */
export function readHud1Ptr(idx: number): number {
  return readB25U16(B25_SEG.HUD1_PTR + idx * 2);
}

/** HUD 行2 指针表: X = (ram_0534&0x7F)-1 (ASL 由调用方做) */
export function readHud2Ptr(idx: number): number {
  return readB25U16(B25_SEG.HUD2_PTR + idx * 2);
}

/** HUD 行3 指针表: X = (ram_0536&0x7F)-1 (ASL 由调用方做) */
export function readHud3Ptr(idx: number): number {
  return readB25U16(B25_SEG.HUD3_PTR + idx * 2);
}

/** 精灵数据指针表: X = A*2 → 2B 指针 (存入 ram_0050/0051) */
export function readSprPtr(a: number): number {
  return readB25U16(B25_SEG.SPR_PTR + a * 2);
}

/**
 * 精灵位段表: Y = A>>2 取 1 字节; 再按 A&3 取 2bit 段。
 * 对应汇编 $8862-$886F: TYA; LSR; LSR; TAY; LDA $B3BD,Y; (A&3 次) LSR; LSR。
 */
export function readSprBits(a: number): number {
  let v = readB25(B25_SEG.SPR_BITS + (a >> 2));
  const seg = a & 3;
  for (let i = 0; i < seg; i++) v >>= 2;
  return v & 3;
}
