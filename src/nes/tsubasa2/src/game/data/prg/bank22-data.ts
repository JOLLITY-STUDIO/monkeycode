/**
 * Bank 22 数据访问层 (Model)
 *
 * 数据来源: `./prg-bank-22` 本地副本 (Bank #0x16 = 22, 复制自 rom-data), 无 MMC3 切换。
 * PRG offset: 0x02C010-0x02E00F, 映射地址 $8000-$9FFF。
 *
 * 本 bank = 精灵生成器 (OAM $0200 布局): 由场景脚本数据 (003C:003D) 生成
 * NES 标准 OAM 精灵 (每精灵 4B: Y, tile, attr, X), 写入 $0200 影子缓冲。
 *
 * service 仅通过 readB22/readB22U16 等接口访问, 不直接引用 rom-data。
 */

import PRG_BANK_22 from './prg-bank-22';

/** Bank 22 完整 8KB 原始字节 (本地副本, 不直接引用 rom-data) */
export const B22_DATA: readonly number[] = PRG_BANK_22;

/** 读取本 bank 内地址 addr 的原始字节 (addr: $8000-$9FFF, 越界返回 $FF) */
export function readB22(addr: number): number {
  const i = addr - 0x8000;
  if (i < 0 || i >= B22_DATA.length) return 0xff;
  return B22_DATA[i];
}

/** 读取本 bank 内 16bit 小端数值 */
export function readB22U16(addr: number): number {
  return readB22(addr) | (readB22(addr + 1) << 8);
}

/**
 * $81D2 — X 偏移表 (16 项, 水平像素偏移)
 *   由 $80CF `LDA $81D2,X` 访问, X = sprite 描述字节直接索引。
 *   值: E0 E8 F0 F8 00 08 10 18 20 28 | 0E E5 ED E4 25 DF
 */
export function readB22OffX(idx: number): number {
  return readB22(0x81d2 + ((idx & 0xff)));
}

/**
 * $81FA — Y 偏移表 (垂直像素偏移)
 *   由 $810F `LDA $81FA,X` 访问, X = (byte >> 2) & $3F。
 *   表数据延续到 $8238 附近 (按方向分组)。
 */
export function readB22OffY(idx: number): number {
  return readB22(0x81fa + (idx & 0x3f));
}

/**
 * $80B8 — JSR $C509 (→$CB99 表跳转) 分派表。
 *   表基址 = JSR 返回地址 $80B7, 项地址 = $80B8 + A*2 (A = sprite 字节 & $07)。
 *   A=0: $0000 (无效, 实际不触发)  A=1: $8161  A=2: $8164  A=3: $8175
 */
export function readB22Dispatch(a: number): number {
  return readB22U16(0x80b8 + ((a & 0xff) * 2));
}
