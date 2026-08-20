/**
 * Bank 22 数据访问层 (Model)
 *
 * 数据来源: `./prg-bank-22` 本地副本 (Bank #0x16 = 22, 复制自 rom-data), 无 MMC3 切换。
 * PRG offset: 0x02C010-0x02E00F, 映射地址 $8000-$9FFF。
 *
 * 本 bank = 精灵生成器 (OAM $0200 布局): 由场景脚本数据 (003C:003D) 生成
 * NES 标准 OAM 精灵 (每精灵 4B: Y, tile, attr, X), 写入 $0200 影子缓冲。
 *
 * 数据表 (X 偏移 / Y 偏移 / 分派表) 已提取为具名 TS 数组;
 * 场景脚本流与精灵数据流按指针定位, 经 readB22 访问 (来自 prg-bank-22 整 bank 副本)。
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
 * $81D2 — X 偏移查找表 (水平像素偏移)。
 * 由 $80CF `LDA $81D2,X` 访问, X = sprite 描述字节直接索引 (未掩码)。
 * 规范 16 项: E0 E8 F0 F8 00 08 10 18 20 28 0E E5 ED E4 25 DF;
 * 描述字节 > $0F 时继续读入 $81E2 起 ROM 区, 故经 readB22 读取以保持逐字节语义。
 */
export const B22_X_OFFSET_BASE = 0x81d2;

/** 读取 $81D2 X 偏移表项 (idx 为描述字节, 未掩码, 保持原执行流) */
export function readB22OffX(idx: number): number {
  return readB22(B22_X_OFFSET_BASE + (idx & 0xff));
}

/**
 * $81FA — Y 偏移表 (垂直像素偏移, 64 项)。
 * 由 $810F `LDA $81FA,X` 访问, X = (byte >> 2) & $3F。
 * 按方向分组 (bit0-5 选列, 数据延续到 $8239 附近)。
 */
export const B22_Y_OFFSET: readonly number[] = [
  0xe0, 0xe8, 0xf0, 0xf8, 0x00, 0x08, 0x10, 0xef, 0xf5, 0xf7, 0xfd, 0x05, 0xff, 0xf6, 0xfe, 0x06,
  0xf4, 0xfc, 0xf3, 0xfb, 0xe4, 0xec, 0xf2, 0xfa, 0x02, 0xf9, 0xd8, 0xdc, 0x0a, 0x07, 0x0f, 0x0d,
  0x18, 0x04, 0x0e, 0x12, 0x0c, 0xed, 0xee, 0xc0, 0xc8, 0x2c, 0x34, 0x3c, 0x44, 0xd0, 0xeb, 0x01,
  0x20, 0x28, 0x30, 0x38, 0x40, 0x48, 0x50, 0x14, 0x1c, 0x26, 0xa8, 0xb0, 0xb8, 0xff, 0xff, 0xff,
];

/** 读取 $81FA Y 偏移表项 (idx 取低 6bit, 越界返回 $FF) */
export function readB22OffY(idx: number): number {
  const i = idx & 0x3f;
  return i < B22_Y_OFFSET.length ? B22_Y_OFFSET[i] : 0xff;
}

/**
 * $80B8 — JSR $C509 (→$CB99 表跳转) 分派表 (4 项, 16bit 小端目标地址)。
 * 表基址 = JSR 返回地址 $80B7, 项地址 = $80B8 + A*2 (A = sprite 字节 & $07)。
 * A=0: $0000 (无效, 实际不触发)  A=1: $8161  A=2: $8164  A=3: $8175
 */
export const B22_DISPATCH: readonly number[] = [0x0000, 0x8161, 0x8164, 0x8175];

/** 读取分派表项 (a 取低 2bit, 越界返回 0) */
export function readB22Dispatch(a: number): number {
  const i = a & 0x03;
  return i < B22_DISPATCH.length ? B22_DISPATCH[i] : 0;
}
