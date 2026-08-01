// ═══════════════════════════════════════════════
// Bank 22: Sprite/OAM Engine — 数据段 (强类型)
// ═══════════════════════════════════════════════
//
// 数据分类:
//   1. 坐标 delta 表 — signed Y/X 偏移
//   2. 精灵布局指针表 — 指针表 index → LayoutItem[] 地址
//   3. 布局流控制指令 — LayoutItem[] 强类型数组
//   4. 地址查找 Map — 用于指针表跳转
//
// "data 就是可读性更高的 JSON 对象，强类型定义"
// code 文件不再读取字节解析，直接消费 LayoutItem[] 对象
// ═══════════════════════════════════════════════

// ── 布局流类型定义 ──

/** 布局流中的 Tile 条目 */
export interface LayoutTile {
  /** tile 索引 (直接写入 OAM+1) */
  value: number;
  /** 调色板 0-3 */
  palette: number;
  /** X 偏移表索引 (查 X_DELTA_TABLE) */
  xDeltaIdx: number;
}

/** 布局流控制指令 */
export type LayoutItem =
  /** 分组: yDeltaIdx=查Y偏移表, entries=子项数, tiles=该组tile */
  | { type: 'GROUP'; yDeltaIdx: number; entries: number; tiles: LayoutTile[] }
  /** OAM 批量: count=tile数, tiles=tile列表 */
  | { type: 'OAM'; count: number; tiles: LayoutTile[] }
  /** 退出当前布局流 */
  | { type: 'EXIT' }
  /** 推进指针: ptr=要跳转到的 16-bit CPU 地址 → 查 LAYOUT_BY_ADDR */
  | { type: 'ADVANCE_PTR'; ptr: number }
  /** 根据 anim frame 调整: 读取 $0546 偏移指针表索引 */
  | { type: 'ADJUST_ANIM' };

// ═══════════════════════════════════════════════
// 1. 坐标 delta 表
// ═══════════════════════════════════════════════

/** Y 偏移表 — $81D2-$81EF, 30 bytes [dasta] */
export const Y_DELTA_TABLE: readonly number[] = [
  0xE0, 0xE8, 0xF0, 0xF8, 0x00, 0x08, 0x10, 0x18, 0x20, 0x28,
  0x0E, 0xE5, 0xED, 0xE4, 0x25, 0xDF, 0xDC, 0xE7, 0xEF, 0x21,
  0x1E, 0x26, 0x30, 0x38, 0xF4, 0xFC, 0x04, 0x0C, 0xEC, 0xF6,
];

/** X 偏移表 — $81F0-$821D, 46 bytes [data] */
export const X_DELTA_TABLE: readonly number[] = [
  0xD8, 0xEA, 0x0A, 0x1B, 0xF7, 0x03, 0xFF, 0x06, 0xF2, 0x14,
  0xE0, 0xE8, 0xF0, 0xF8, 0x00, 0x08, 0x10, 0xEF, 0xF5, 0xF7,
  0xFD, 0x05, 0xFF, 0xF6, 0xFE, 0x06, 0xF4, 0xFC, 0xF3, 0xFB,
  0xE4, 0xEC, 0xF2, 0xFA, 0x02, 0xF9, 0xD8, 0xDC, 0x0A, 0x07,
  0x0F, 0x0D, 0x18, 0x04, 0x0E, 0x12,
];

/** 额外偏移值 — $821E-$8236, 25 bytes [data] */
export const EXTRA_OFFSET_TABLE: readonly number[] = [
  0x0C, 0xED, 0xEE, 0xC0, 0xC8, 0x2C, 0x34, 0x3C, 0x44, 0xD0,
  0xEB, 0x01, 0x20, 0x28, 0x30, 0x38, 0x40, 0x48, 0x50, 0x14,
  0x1C, 0x26, 0xA8, 0xB0, 0xB8,
];

/** $8237-$827F, 73 bytes — padding (全 $FF) */
export const PADDING_$8237: readonly number[] = Array(73).fill(0xFF);

// ═══════════════════════════════════════════════
// 2. 精灵布局指针表 — 解码为 16-bit CPU 地址
// ═══════════════════════════════════════════════
//
// 原始格式: little-endian 2 字节/entry → CPU 地址 ($8000-$9FFF)
// 使用方式: layoutIndex = sprite_meta[18]; addr = PTR_TABLE[layoutIndex]
//           → LAYOUT_BY_ADDR.get(addr) → LayoutItem[] 直接迭代

const _decodePtrs = (bytes: readonly number[]): readonly number[] => {
  const result: number[] = [];
  for (let i = 0; i < bytes.length; i += 2) {
    result.push(bytes[i] | (bytes[i + 1] << 8));
  }
  return result;
};

/** 指针表 1 @ $8280-$829D — 15 entries */
export const PTR_TABLE_1: readonly number[] = _decodePtrs([
  0x2C, 0x84, 0x17, 0x85, 0x02, 0x86, 0xEE, 0x86, 0xD9, 0x87,
  0x40, 0x88, 0x9F, 0x88, 0xD4, 0x88, 0x07, 0x89, 0x3A, 0x89,
  0x6B, 0x89, 0x7A, 0x89, 0x8D, 0x89, 0x9C, 0x89, 0xAF, 0x89,
]);

/** 指针表 2 @ $829E-$82B9 — 14 entries */
export const PTR_TABLE_2: readonly number[] = _decodePtrs([
  0xBC, 0x89, 0x3F, 0x8B, 0x4E, 0x8B, 0x61, 0x8B, 0x74, 0x8B,
  0x81, 0x8B, 0x0C, 0x8D, 0x1B, 0x8D, 0x30, 0x8D, 0x45, 0x8D,
  0x52, 0x8D, 0x1D, 0x8F, 0x2C, 0x8F, 0x41, 0x8F,
]);

/** 指针表 3 @ $82BA-$82E3 — 21 entries */
export const PTR_TABLE_3: readonly number[] = _decodePtrs([
  0x56, 0x8F, 0x63, 0x8F, 0xE8, 0x8F, 0xA9, 0x91, 0xC6, 0x91,
  0xDF, 0x91, 0xF8, 0x91, 0x09, 0x92, 0x9B, 0x92, 0x98, 0x93,
  0xD9, 0x93, 0x32, 0x94, 0x95, 0x94, 0xE8, 0x94, 0x05, 0x95,
  0x20, 0x95, 0x51, 0x96, 0x6E, 0x96, 0x97, 0xB8, 0x8B, 0x96,
  0xD8, 0x96,
]);

/** 指针表 4 @ $82E4-$8305 — 17 entries */
export const PTR_TABLE_4: readonly number[] = _decodePtrs([
  0xBF, 0xBD, 0xBF, 0xBD, 0xBF, 0xBD, 0xBF, 0xBD, 0xBF, 0xBD,
  0xBF, 0xBD, 0xBF, 0xBD, 0xBF, 0xBD, 0xBF, 0xBD, 0xBF, 0xBD,
  0xBF, 0xBD, 0xBF, 0xBD, 0x39, 0x97, 0xE4, 0x98, 0x01, 0x99,
  0x1E, 0x99, 0x2C, 0x9B,
]);

/** 指针表 5 @ $8306-$841B — 139 entries */
export const PTR_TABLE_5: readonly number[] = _decodePtrs([
  0x89, 0x9B, 0xBA, 0x9B, 0xEB, 0x9B, 0x1E, 0x9C, 0x51, 0x9C,
  0x8C, 0x9C, 0xBD, 0x9C, 0x0C, 0x9D, 0x39, 0x9D, 0x66, 0x9D,
  0x91, 0x9D, 0xBC, 0x9D, 0x3B, 0x9E, 0xE9, 0x9E, 0x86, 0x9F,
  0x23, 0xA0, 0x96, 0xA0, 0x29, 0xA1, 0x50, 0xA1, 0xB5, 0xA1,
  0xCC, 0xA1, 0x1F, 0xA2, 0x6A, 0xA2, 0xBF, 0xA2, 0x14, 0xA3,
  0x87, 0xA3, 0xDA, 0xA3, 0x4D, 0xA4, 0xB6, 0xA4, 0x0D, 0xA5,
  0x44, 0xA5, 0x5D, 0xA5, 0xBE, 0xA5, 0x0B, 0xA6, 0x32, 0xA6,
  0x95, 0xA6, 0xE8, 0xA6, 0x33, 0xA7, 0x84, 0xA7, 0xC3, 0xA7,
  0x08, 0xA8, 0x45, 0xA8, 0x6A, 0xA8, 0x9D, 0xA8, 0xB4, 0xA8,
  0xC1, 0xA8, 0x6F, 0xA9, 0xB2, 0xA9, 0xE1, 0xA9, 0x06, 0xAA,
  0x23, 0xAA, 0x34, 0xAA, 0x45, 0xAA, 0x52, 0xAA, 0x5F, 0xAA,
  0x6C, 0xAA, 0x79, 0xAA, 0x7E, 0xAA, 0x83, 0xAA, 0x88, 0xAA,
  0xA9, 0xAA, 0xC2, 0xAA, 0xD9, 0xAA, 0xE6, 0xAA, 0xF3, 0xAA,
  0x00, 0xAB, 0x0D, 0xAB, 0x12, 0xAB, 0x17, 0xAB, 0x1C, 0xAB,
  0x53, 0xAB, 0x3C, 0xAD, 0x65, 0xAD, 0x7C, 0xAD, 0x93, 0xAD,
  0xAE, 0xAD, 0xC9, 0xAD, 0xE2, 0xAD, 0x47, 0xAE, 0x88, 0xAE,
  0xB5, 0xAE, 0x6D, 0xAF, 0x2B, 0xB0, 0x34, 0xB0, 0x3D, 0xB0,
  0x46, 0xB0, 0xD7, 0xB0, 0xD4, 0xB1, 0xE3, 0xB1, 0xFA, 0xB1,
  0x11, 0xB2, 0x1E, 0xB2, 0xCC, 0xB2, 0xD9, 0xB2, 0xC8, 0xB3,
  0x25, 0xB4, 0x8C, 0xB6, 0xB9, 0xB6, 0xD6, 0xB6, 0xF3, 0xB6,
  0x00, 0xB7, 0x0D, 0xB7, 0x26, 0xB7, 0x45, 0xB7, 0x74, 0xB7,
  0x81, 0xB7, 0xB4, 0xB7, 0xC1, 0xB7, 0xD8, 0xB7, 0x7E, 0xB8,
  0xA4, 0xB8, 0xED, 0xB8, 0x52, 0xB9, 0xBF, 0xB9, 0x18, 0xBA,
  0x81, 0xBA, 0xE0, 0xBA, 0x21, 0xBB, 0x62, 0xBB, 0x6D, 0xBB,
  0x7C, 0xBB, 0x8F, 0xBB, 0xD8, 0xBB, 0x0B, 0xBC, 0x46, 0xBC,
  0x9B, 0xBC, 0x00, 0xBD, 0x2F, 0xBD, 0x58, 0xBD, 0x67, 0xBD,
  0x7E, 0xBD, 0xA1, 0xBD, 0xB2, 0xBD, 0xBF, 0xBD, 0xC4, 0xBD,
  0xD5, 0xBD, 0xE2, 0xBD, 0xE7, 0xBD, 0xBF, 0xBD,
]);

// ═══════════════════════════════════════════════
// 3. 布局流控制指令 — LayoutItem[] 强类型
// ═══════════════════════════════════════════════
// 由 _decode_all_layouts.js 自动解码生成
// 69 个指针表入口点，每个独立解码为 LayoutItem[]

export const LAYOUT_$842C: readonly LayoutItem[] = [
  { type: 'ADJUST_ANIM' },
];

// PTR_TABLE_1[1] → 0x8517 — 1 指令
export const LAYOUT_$8517: readonly LayoutItem[] = [
  { type: 'ADJUST_ANIM' },
];

// PTR_TABLE_1[2] → 0x8602 — 1 指令
export const LAYOUT_$8602: readonly LayoutItem[] = [
  { type: 'ADJUST_ANIM' },
];

// PTR_TABLE_1[3] → 0x86EE — 1 指令
export const LAYOUT_$86EE: readonly LayoutItem[] = [
  { type: 'ADJUST_ANIM' },
];

// PTR_TABLE_1[4] → 0x87D9 — 1 指令
export const LAYOUT_$87D9: readonly LayoutItem[] = [
  { type: 'ADJUST_ANIM' },
];

// PTR_TABLE_1[5] → 0x8840 — 1 指令
export const LAYOUT_$8840: readonly LayoutItem[] = [
  { type: 'ADJUST_ANIM' },
];

// PTR_TABLE_1[6] → 0x889F — 8 指令
export const LAYOUT_$889F: readonly LayoutItem[] = [
  { type: 'GROUP', yDeltaIdx: 14, entries: 1, tiles: [
    { value: 51, palette: 3, xDeltaIdx: 0 },
  ] },
  { type: 'GROUP', yDeltaIdx: 4, entries: 3, tiles: [
    { value: 11, palette: 2, xDeltaIdx: 8 }, { value: 14, palette: 2, xDeltaIdx: 10 },
    { value: 15, palette: 2, xDeltaIdx: 11 },
  ] },
  { type: 'GROUP', yDeltaIdx: 5, entries: 4, tiles: [
    { value: 32, palette: 1, xDeltaIdx: 2 }, { value: 33, palette: 1, xDeltaIdx: 3 },
    { value: 36, palette: 1, xDeltaIdx: 4 }, { value: 37, palette: 1, xDeltaIdx: 5 },
  ] },
  { type: 'GROUP', yDeltaIdx: 6, entries: 5, tiles: [
    { value: 34, palette: 1, xDeltaIdx: 7 }, { value: 35, palette: 1, xDeltaIdx: 9 },
    { value: 38, palette: 1, xDeltaIdx: 4 }, { value: 39, palette: 1, xDeltaIdx: 5 },
    { value: 10, palette: 3, xDeltaIdx: 5 },
  ] },
  { type: 'GROUP', yDeltaIdx: 7, entries: 3, tiles: [
    { value: 26, palette: 1, xDeltaIdx: 1 }, { value: 27, palette: 1, xDeltaIdx: 2 },
    { value: 8, palette: 1, xDeltaIdx: 5 },
  ] },
  { type: 'GROUP', yDeltaIdx: 8, entries: 2, tiles: [
    { value: 48, palette: 1, xDeltaIdx: 1 }, { value: 49, palette: 1, xDeltaIdx: 2 },
  ] },
  { type: 'GROUP', yDeltaIdx: 9, entries: 1, tiles: [
    { value: 50, palette: 3, xDeltaIdx: 1 },
  ] },
  { type: 'EXIT' },
];

// PTR_TABLE_1[7] → 0x88D4 — 10 指令
export const LAYOUT_$88D4: readonly LayoutItem[] = [
  { type: 'GROUP', yDeltaIdx: 4, entries: 3, tiles: [
    { value: 17, palette: 2, xDeltaIdx: 2 }, { value: 68, palette: 2, xDeltaIdx: 3 },
    { value: 69, palette: 2, xDeltaIdx: 4 },
  ] },
  { type: 'GROUP', yDeltaIdx: 5, entries: 2, tiles: [
    { value: 52, palette: 1, xDeltaIdx: 13 }, { value: 53, palette: 1, xDeltaIdx: 14 },
  ] },
  { type: 'GROUP', yDeltaIdx: 6, entries: 2, tiles: [
    { value: 54, palette: 1, xDeltaIdx: 13 }, { value: 55, palette: 1, xDeltaIdx: 14 },
  ] },
  { type: 'GROUP', yDeltaIdx: 10, entries: 1, tiles: [
    { value: 10, palette: 3, xDeltaIdx: 12 },
  ] },
  { type: 'GROUP', yDeltaIdx: 5, entries: 1, tiles: [
    { value: 96, palette: 1, xDeltaIdx: 3 },
  ] },
  { type: 'GROUP', yDeltaIdx: 6, entries: 2, tiles: [
    { value: 98, palette: 1, xDeltaIdx: 3 }, { value: 99, palette: 1, xDeltaIdx: 4 },
  ] },
  { type: 'GROUP', yDeltaIdx: 7, entries: 2, tiles: [
    { value: 28, palette: 1, xDeltaIdx: 3 }, { value: 29, palette: 1, xDeltaIdx: 4 },
  ] },
  { type: 'GROUP', yDeltaIdx: 8, entries: 1, tiles: [
    { value: 72, palette: 1, xDeltaIdx: 14 },
  ] },
  { type: 'GROUP', yDeltaIdx: 9, entries: 2, tiles: [
    { value: 30, palette: 3, xDeltaIdx: 3 }, { value: 31, palette: 3, xDeltaIdx: 4 },
  ] },
  { type: 'EXIT' },
];

// PTR_TABLE_1[8] → 0x8907 — 8 指令
export const LAYOUT_$8907: readonly LayoutItem[] = [
  { type: 'GROUP', yDeltaIdx: 14, entries: 1, tiles: [
    { value: 51, palette: 3, xDeltaIdx: 20 },
  ] },
  { type: 'GROUP', yDeltaIdx: 4, entries: 3, tiles: [
    { value: 17, palette: 2, xDeltaIdx: 2 }, { value: 19, palette: 2, xDeltaIdx: 3 },
    { value: 25, palette: 2, xDeltaIdx: 4 },
  ] },
  { type: 'GROUP', yDeltaIdx: 5, entries: 3, tiles: [
    { value: 32, palette: 1, xDeltaIdx: 16 }, { value: 33, palette: 1, xDeltaIdx: 17 },
    { value: 37, palette: 1, xDeltaIdx: 4 },
  ] },
  { type: 'GROUP', yDeltaIdx: 6, entries: 5, tiles: [
    { value: 34, palette: 1, xDeltaIdx: 18 }, { value: 35, palette: 1, xDeltaIdx: 19 },
    { value: 38, palette: 1, xDeltaIdx: 3 }, { value: 39, palette: 1, xDeltaIdx: 4 },
    { value: 10, palette: 3, xDeltaIdx: 4 },
  ] },
  { type: 'GROUP', yDeltaIdx: 7, entries: 3, tiles: [
    { value: 26, palette: 1, xDeltaIdx: 21 }, { value: 27, palette: 1, xDeltaIdx: 16 },
    { value: 8, palette: 1, xDeltaIdx: 4 },
  ] },
  { type: 'GROUP', yDeltaIdx: 8, entries: 2, tiles: [
    { value: 48, palette: 1, xDeltaIdx: 21 }, { value: 49, palette: 1, xDeltaIdx: 16 },
  ] },
  { type: 'GROUP', yDeltaIdx: 9, entries: 1, tiles: [
    { value: 50, palette: 3, xDeltaIdx: 21 },
  ] },
  { type: 'EXIT' },
];

// PTR_TABLE_1[9] → 0x893A — 8 指令
export const LAYOUT_$893A: readonly LayoutItem[] = [
  { type: 'GROUP', yDeltaIdx: 4, entries: 3, tiles: [
    { value: 74, palette: 2, xDeltaIdx: 22 }, { value: 75, palette: 2, xDeltaIdx: 23 },
    { value: 78, palette: 2, xDeltaIdx: 24 },
  ] },
  { type: 'GROUP', yDeltaIdx: 5, entries: 4, tiles: [
    { value: 52, palette: 1, xDeltaIdx: 2 }, { value: 53, palette: 1, xDeltaIdx: 3 },
    { value: 96, palette: 1, xDeltaIdx: 4 }, { value: 97, palette: 1, xDeltaIdx: 5 },
  ] },
  { type: 'GROUP', yDeltaIdx: 6, entries: 4, tiles: [
    { value: 54, palette: 1, xDeltaIdx: 2 }, { value: 55, palette: 1, xDeltaIdx: 3 },
    { value: 98, palette: 1, xDeltaIdx: 4 }, { value: 99, palette: 1, xDeltaIdx: 5 },
  ] },
  { type: 'GROUP', yDeltaIdx: 10, entries: 1, tiles: [
    { value: 10, palette: 3, xDeltaIdx: 25 },
  ] },
  { type: 'GROUP', yDeltaIdx: 7, entries: 2, tiles: [
    { value: 28, palette: 1, xDeltaIdx: 4 }, { value: 29, palette: 1, xDeltaIdx: 5 },
  ] },
  { type: 'GROUP', yDeltaIdx: 8, entries: 1, tiles: [
    { value: 72, palette: 1, xDeltaIdx: 15 },
  ] },
  { type: 'GROUP', yDeltaIdx: 9, entries: 2, tiles: [
    { value: 30, palette: 3, xDeltaIdx: 4 }, { value: 31, palette: 3, xDeltaIdx: 5 },
  ] },
  { type: 'EXIT' },
];

// PTR_TABLE_1[10] → 0x896B — 17 指令
export const LAYOUT_$896B: readonly LayoutItem[] = [
  { type: 'GROUP', yDeltaIdx: 8, entries: 2, tiles: [
    { value: 92, palette: 3, xDeltaIdx: 0 }, { value: 93, palette: 3, xDeltaIdx: 1 },
  ] },
  { type: 'GROUP', yDeltaIdx: 9, entries: 2, tiles: [
    { value: 94, palette: 3, xDeltaIdx: 0 }, { value: 95, palette: 3, xDeltaIdx: 1 },
  ] },
  { type: 'ADVANCE_PTR', ptr: 34979 },
  { type: 'GROUP', yDeltaIdx: 20, entries: 2, tiles: [
    { value: 242, palette: 3, xDeltaIdx: 26 }, { value: 243, palette: 3, xDeltaIdx: 0 },
  ] },
  { type: 'GROUP', yDeltaIdx: 21, entries: 2, tiles: [
    { value: 244, palette: 3, xDeltaIdx: 26 }, { value: 245, palette: 3, xDeltaIdx: 0 },
  ] },
  { type: 'GROUP', yDeltaIdx: 9, entries: 1, tiles: [
    { value: 102, palette: 3, xDeltaIdx: 27 },
  ] },
  { type: 'ADVANCE_PTR', ptr: 35028 },
  { type: 'GROUP', yDeltaIdx: 8, entries: 2, tiles: [
    { value: 92, palette: 3, xDeltaIdx: 0 }, { value: 93, palette: 3, xDeltaIdx: 1 },
  ] },
  { type: 'GROUP', yDeltaIdx: 9, entries: 2, tiles: [
    { value: 94, palette: 3, xDeltaIdx: 0 }, { value: 95, palette: 3, xDeltaIdx: 1 },
  ] },
  { type: 'ADVANCE_PTR', ptr: 35083 },
  { type: 'GROUP', yDeltaIdx: 20, entries: 2, tiles: [
    { value: 242, palette: 3, xDeltaIdx: 20 }, { value: 243, palette: 3, xDeltaIdx: 21 },
  ] },
  { type: 'GROUP', yDeltaIdx: 21, entries: 2, tiles: [
    { value: 244, palette: 3, xDeltaIdx: 20 }, { value: 245, palette: 3, xDeltaIdx: 21 },
  ] },
  { type: 'GROUP', yDeltaIdx: 9, entries: 1, tiles: [
    { value: 102, palette: 3, xDeltaIdx: 1 },
  ] },
  { type: 'ADVANCE_PTR', ptr: 35130 },
  { type: 'GROUP', yDeltaIdx: 3, entries: 2, tiles: [
    { value: 92, palette: 3, xDeltaIdx: 3 }, { value: 93, palette: 3, xDeltaIdx: 4 },
  ] },
  { type: 'GROUP', yDeltaIdx: 4, entries: 2, tiles: [
    { value: 94, palette: 3, xDeltaIdx: 3 }, { value: 95, palette: 3, xDeltaIdx: 4 },
  ] },
  { type: 'EXIT' },
];

// PTR_TABLE_1[11] → 0x897A — 14 指令
export const LAYOUT_$897A: readonly LayoutItem[] = [
  { type: 'GROUP', yDeltaIdx: 20, entries: 2, tiles: [
    { value: 242, palette: 3, xDeltaIdx: 26 }, { value: 243, palette: 3, xDeltaIdx: 0 },
  ] },
  { type: 'GROUP', yDeltaIdx: 21, entries: 2, tiles: [
    { value: 244, palette: 3, xDeltaIdx: 26 }, { value: 245, palette: 3, xDeltaIdx: 0 },
  ] },
  { type: 'GROUP', yDeltaIdx: 9, entries: 1, tiles: [
    { value: 102, palette: 3, xDeltaIdx: 27 },
  ] },
  { type: 'ADVANCE_PTR', ptr: 35028 },
  { type: 'GROUP', yDeltaIdx: 8, entries: 2, tiles: [
    { value: 92, palette: 3, xDeltaIdx: 0 }, { value: 93, palette: 3, xDeltaIdx: 1 },
  ] },
  { type: 'GROUP', yDeltaIdx: 9, entries: 2, tiles: [
    { value: 94, palette: 3, xDeltaIdx: 0 }, { value: 95, palette: 3, xDeltaIdx: 1 },
  ] },
  { type: 'ADVANCE_PTR', ptr: 35083 },
  { type: 'GROUP', yDeltaIdx: 20, entries: 2, tiles: [
    { value: 242, palette: 3, xDeltaIdx: 20 }, { value: 243, palette: 3, xDeltaIdx: 21 },
  ] },
  { type: 'GROUP', yDeltaIdx: 21, entries: 2, tiles: [
    { value: 244, palette: 3, xDeltaIdx: 20 }, { value: 245, palette: 3, xDeltaIdx: 21 },
  ] },
  { type: 'GROUP', yDeltaIdx: 9, entries: 1, tiles: [
    { value: 102, palette: 3, xDeltaIdx: 1 },
  ] },
  { type: 'ADVANCE_PTR', ptr: 35130 },
  { type: 'GROUP', yDeltaIdx: 3, entries: 2, tiles: [
    { value: 92, palette: 3, xDeltaIdx: 3 }, { value: 93, palette: 3, xDeltaIdx: 4 },
  ] },
  { type: 'GROUP', yDeltaIdx: 4, entries: 2, tiles: [
    { value: 94, palette: 3, xDeltaIdx: 3 }, { value: 95, palette: 3, xDeltaIdx: 4 },
  ] },
  { type: 'EXIT' },
];

// PTR_TABLE_1[12] → 0x898D — 10 指令
export const LAYOUT_$898D: readonly LayoutItem[] = [
  { type: 'GROUP', yDeltaIdx: 8, entries: 2, tiles: [
    { value: 92, palette: 3, xDeltaIdx: 0 }, { value: 93, palette: 3, xDeltaIdx: 1 },
  ] },
  { type: 'GROUP', yDeltaIdx: 9, entries: 2, tiles: [
    { value: 94, palette: 3, xDeltaIdx: 0 }, { value: 95, palette: 3, xDeltaIdx: 1 },
  ] },
  { type: 'ADVANCE_PTR', ptr: 35083 },
  { type: 'GROUP', yDeltaIdx: 20, entries: 2, tiles: [
    { value: 242, palette: 3, xDeltaIdx: 20 }, { value: 243, palette: 3, xDeltaIdx: 21 },
  ] },
  { type: 'GROUP', yDeltaIdx: 21, entries: 2, tiles: [
    { value: 244, palette: 3, xDeltaIdx: 20 }, { value: 245, palette: 3, xDeltaIdx: 21 },
  ] },
  { type: 'GROUP', yDeltaIdx: 9, entries: 1, tiles: [
    { value: 102, palette: 3, xDeltaIdx: 1 },
  ] },
  { type: 'ADVANCE_PTR', ptr: 35130 },
  { type: 'GROUP', yDeltaIdx: 3, entries: 2, tiles: [
    { value: 92, palette: 3, xDeltaIdx: 3 }, { value: 93, palette: 3, xDeltaIdx: 4 },
  ] },
  { type: 'GROUP', yDeltaIdx: 4, entries: 2, tiles: [
    { value: 94, palette: 3, xDeltaIdx: 3 }, { value: 95, palette: 3, xDeltaIdx: 4 },
  ] },
  { type: 'EXIT' },
];

// PTR_TABLE_1[13] → 0x899C — 7 指令
export const LAYOUT_$899C: readonly LayoutItem[] = [
  { type: 'GROUP', yDeltaIdx: 20, entries: 2, tiles: [
    { value: 242, palette: 3, xDeltaIdx: 20 }, { value: 243, palette: 3, xDeltaIdx: 21 },
  ] },
  { type: 'GROUP', yDeltaIdx: 21, entries: 2, tiles: [
    { value: 244, palette: 3, xDeltaIdx: 20 }, { value: 245, palette: 3, xDeltaIdx: 21 },
  ] },
  { type: 'GROUP', yDeltaIdx: 9, entries: 1, tiles: [
    { value: 102, palette: 3, xDeltaIdx: 1 },
  ] },
  { type: 'ADVANCE_PTR', ptr: 35130 },
  { type: 'GROUP', yDeltaIdx: 3, entries: 2, tiles: [
    { value: 92, palette: 3, xDeltaIdx: 3 }, { value: 93, palette: 3, xDeltaIdx: 4 },
  ] },
  { type: 'GROUP', yDeltaIdx: 4, entries: 2, tiles: [
    { value: 94, palette: 3, xDeltaIdx: 3 }, { value: 95, palette: 3, xDeltaIdx: 4 },
  ] },
  { type: 'EXIT' },
];

// PTR_TABLE_1[14] → 0x89AF — 3 指令
export const LAYOUT_$89AF: readonly LayoutItem[] = [
  { type: 'GROUP', yDeltaIdx: 3, entries: 2, tiles: [
    { value: 92, palette: 3, xDeltaIdx: 3 }, { value: 93, palette: 3, xDeltaIdx: 4 },
  ] },
  { type: 'GROUP', yDeltaIdx: 4, entries: 2, tiles: [
    { value: 94, palette: 3, xDeltaIdx: 3 }, { value: 95, palette: 3, xDeltaIdx: 4 },
  ] },
  { type: 'EXIT' },
];

// PTR_TABLE_2[0] → 0x89BC — 1 指令
export const LAYOUT_$89BC: readonly LayoutItem[] = [
  { type: 'ADJUST_ANIM' },
];

// PTR_TABLE_2[1] → 0x8B3F — 14 指令
export const LAYOUT_$8B3F: readonly LayoutItem[] = [
  { type: 'GROUP', yDeltaIdx: 9, entries: 2, tiles: [
    { value: 5, palette: 3, xDeltaIdx: 6 }, { value: 85, palette: 3, xDeltaIdx: 32 },
  ] },
  { type: 'GROUP', yDeltaIdx: 22, entries: 2, tiles: [
    { value: 97, palette: 3, xDeltaIdx: 6 }, { value: 87, palette: 3, xDeltaIdx: 32 },
  ] },
  { type: 'ADVANCE_PTR', ptr: 35260 },
  { type: 'GROUP', yDeltaIdx: 8, entries: 1, tiles: [
    { value: 92, palette: 3, xDeltaIdx: 6 },
  ] },
  { type: 'GROUP', yDeltaIdx: 9, entries: 2, tiles: [
    { value: 94, palette: 3, xDeltaIdx: 6 }, { value: 85, palette: 3, xDeltaIdx: 32 },
  ] },
  { type: 'GROUP', yDeltaIdx: 22, entries: 2, tiles: [
    { value: 91, palette: 3, xDeltaIdx: 6 }, { value: 87, palette: 3, xDeltaIdx: 32 },
  ] },
  { type: 'ADVANCE_PTR', ptr: 35260 },
  { type: 'GROUP', yDeltaIdx: 8, entries: 1, tiles: [
    { value: 93, palette: 3, xDeltaIdx: 6 },
  ] },
  { type: 'GROUP', yDeltaIdx: 9, entries: 2, tiles: [
    { value: 95, palette: 3, xDeltaIdx: 6 }, { value: 85, palette: 3, xDeltaIdx: 32 },
  ] },
  { type: 'GROUP', yDeltaIdx: 22, entries: 2, tiles: [
    { value: 91, palette: 3, xDeltaIdx: 6 }, { value: 87, palette: 3, xDeltaIdx: 32 },
  ] },
  { type: 'ADVANCE_PTR', ptr: 35260 },
  { type: 'GROUP', yDeltaIdx: 3, entries: 2, tiles: [
    { value: 84, palette: 3, xDeltaIdx: 3 }, { value: 85, palette: 3, xDeltaIdx: 4 },
  ] },
  { type: 'GROUP', yDeltaIdx: 4, entries: 2, tiles: [
    { value: 86, palette: 3, xDeltaIdx: 3 }, { value: 87, palette: 3, xDeltaIdx: 4 },
  ] },
  { type: 'EXIT' },
];

// PTR_TABLE_2[2] → 0x8B4E — 11 指令
export const LAYOUT_$8B4E: readonly LayoutItem[] = [
  { type: 'GROUP', yDeltaIdx: 8, entries: 1, tiles: [
    { value: 92, palette: 3, xDeltaIdx: 6 },
  ] },
  { type: 'GROUP', yDeltaIdx: 9, entries: 2, tiles: [
    { value: 94, palette: 3, xDeltaIdx: 6 }, { value: 85, palette: 3, xDeltaIdx: 32 },
  ] },
  { type: 'GROUP', yDeltaIdx: 22, entries: 2, tiles: [
    { value: 91, palette: 3, xDeltaIdx: 6 }, { value: 87, palette: 3, xDeltaIdx: 32 },
  ] },
  { type: 'ADVANCE_PTR', ptr: 35260 },
  { type: 'GROUP', yDeltaIdx: 8, entries: 1, tiles: [
    { value: 93, palette: 3, xDeltaIdx: 6 },
  ] },
  { type: 'GROUP', yDeltaIdx: 9, entries: 2, tiles: [
    { value: 95, palette: 3, xDeltaIdx: 6 }, { value: 85, palette: 3, xDeltaIdx: 32 },
  ] },
  { type: 'GROUP', yDeltaIdx: 22, entries: 2, tiles: [
    { value: 91, palette: 3, xDeltaIdx: 6 }, { value: 87, palette: 3, xDeltaIdx: 32 },
  ] },
  { type: 'ADVANCE_PTR', ptr: 35260 },
  { type: 'GROUP', yDeltaIdx: 3, entries: 2, tiles: [
    { value: 84, palette: 3, xDeltaIdx: 3 }, { value: 85, palette: 3, xDeltaIdx: 4 },
  ] },
  { type: 'GROUP', yDeltaIdx: 4, entries: 2, tiles: [
    { value: 86, palette: 3, xDeltaIdx: 3 }, { value: 87, palette: 3, xDeltaIdx: 4 },
  ] },
  { type: 'EXIT' },
];

// PTR_TABLE_2[3] → 0x8B61 — 7 指令
export const LAYOUT_$8B61: readonly LayoutItem[] = [
  { type: 'GROUP', yDeltaIdx: 8, entries: 1, tiles: [
    { value: 93, palette: 3, xDeltaIdx: 6 },
  ] },
  { type: 'GROUP', yDeltaIdx: 9, entries: 2, tiles: [
    { value: 95, palette: 3, xDeltaIdx: 6 }, { value: 85, palette: 3, xDeltaIdx: 32 },
  ] },
  { type: 'GROUP', yDeltaIdx: 22, entries: 2, tiles: [
    { value: 91, palette: 3, xDeltaIdx: 6 }, { value: 87, palette: 3, xDeltaIdx: 32 },
  ] },
  { type: 'ADVANCE_PTR', ptr: 35260 },
  { type: 'GROUP', yDeltaIdx: 3, entries: 2, tiles: [
    { value: 84, palette: 3, xDeltaIdx: 3 }, { value: 85, palette: 3, xDeltaIdx: 4 },
  ] },
  { type: 'GROUP', yDeltaIdx: 4, entries: 2, tiles: [
    { value: 86, palette: 3, xDeltaIdx: 3 }, { value: 87, palette: 3, xDeltaIdx: 4 },
  ] },
  { type: 'EXIT' },
];

// PTR_TABLE_2[4] → 0x8B74 — 3 指令
export const LAYOUT_$8B74: readonly LayoutItem[] = [
  { type: 'GROUP', yDeltaIdx: 3, entries: 2, tiles: [
    { value: 84, palette: 3, xDeltaIdx: 3 }, { value: 85, palette: 3, xDeltaIdx: 4 },
  ] },
  { type: 'GROUP', yDeltaIdx: 4, entries: 2, tiles: [
    { value: 86, palette: 3, xDeltaIdx: 3 }, { value: 87, palette: 3, xDeltaIdx: 4 },
  ] },
  { type: 'EXIT' },
];

// PTR_TABLE_2[5] → 0x8B81 — 1 指令
export const LAYOUT_$8B81: readonly LayoutItem[] = [
  { type: 'ADJUST_ANIM' },
];

// PTR_TABLE_2[6] → 0x8D0C — 14 指令
export const LAYOUT_$8D0C: readonly LayoutItem[] = [
  { type: 'GROUP', yDeltaIdx: 24, entries: 2, tiles: [
    { value: 81, palette: 3, xDeltaIdx: 2 }, { value: 84, palette: 3, xDeltaIdx: 3 },
  ] },
  { type: 'GROUP', yDeltaIdx: 25, entries: 2, tiles: [
    { value: 83, palette: 3, xDeltaIdx: 2 }, { value: 86, palette: 3, xDeltaIdx: 3 },
  ] },
  { type: 'ADVANCE_PTR', ptr: 35713 },
  { type: 'GROUP', yDeltaIdx: 24, entries: 2, tiles: [
    { value: 81, palette: 3, xDeltaIdx: 2 }, { value: 84, palette: 3, xDeltaIdx: 3 },
  ] },
  { type: 'GROUP', yDeltaIdx: 25, entries: 3, tiles: [
    { value: 83, palette: 3, xDeltaIdx: 2 }, { value: 92, palette: 3, xDeltaIdx: 3 },
    { value: 93, palette: 3, xDeltaIdx: 4 },
  ] },
  { type: 'GROUP', yDeltaIdx: 26, entries: 1, tiles: [
    { value: 94, palette: 3, xDeltaIdx: 3 },
  ] },
  { type: 'ADVANCE_PTR', ptr: 35713 },
  { type: 'GROUP', yDeltaIdx: 24, entries: 2, tiles: [
    { value: 81, palette: 3, xDeltaIdx: 2 }, { value: 84, palette: 3, xDeltaIdx: 3 },
  ] },
  { type: 'GROUP', yDeltaIdx: 25, entries: 3, tiles: [
    { value: 83, palette: 3, xDeltaIdx: 2 }, { value: 85, palette: 3, xDeltaIdx: 3 },
    { value: 87, palette: 3, xDeltaIdx: 4 },
  ] },
  { type: 'GROUP', yDeltaIdx: 26, entries: 1, tiles: [
    { value: 89, palette: 3, xDeltaIdx: 3 },
  ] },
  { type: 'ADVANCE_PTR', ptr: 35713 },
  { type: 'GROUP', yDeltaIdx: 3, entries: 2, tiles: [
    { value: 81, palette: 3, xDeltaIdx: 3 }, { value: 84, palette: 3, xDeltaIdx: 4 },
  ] },
  { type: 'GROUP', yDeltaIdx: 4, entries: 2, tiles: [
    { value: 83, palette: 3, xDeltaIdx: 3 }, { value: 86, palette: 3, xDeltaIdx: 4 },
  ] },
  { type: 'EXIT' },
];

// PTR_TABLE_2[7] → 0x8D1B — 11 指令
export const LAYOUT_$8D1B: readonly LayoutItem[] = [
  { type: 'GROUP', yDeltaIdx: 24, entries: 2, tiles: [
    { value: 81, palette: 3, xDeltaIdx: 2 }, { value: 84, palette: 3, xDeltaIdx: 3 },
  ] },
  { type: 'GROUP', yDeltaIdx: 25, entries: 3, tiles: [
    { value: 83, palette: 3, xDeltaIdx: 2 }, { value: 92, palette: 3, xDeltaIdx: 3 },
    { value: 93, palette: 3, xDeltaIdx: 4 },
  ] },
  { type: 'GROUP', yDeltaIdx: 26, entries: 1, tiles: [
    { value: 94, palette: 3, xDeltaIdx: 3 },
  ] },
  { type: 'ADVANCE_PTR', ptr: 35713 },
  { type: 'GROUP', yDeltaIdx: 24, entries: 2, tiles: [
    { value: 81, palette: 3, xDeltaIdx: 2 }, { value: 84, palette: 3, xDeltaIdx: 3 },
  ] },
  { type: 'GROUP', yDeltaIdx: 25, entries: 3, tiles: [
    { value: 83, palette: 3, xDeltaIdx: 2 }, { value: 85, palette: 3, xDeltaIdx: 3 },
    { value: 87, palette: 3, xDeltaIdx: 4 },
  ] },
  { type: 'GROUP', yDeltaIdx: 26, entries: 1, tiles: [
    { value: 89, palette: 3, xDeltaIdx: 3 },
  ] },
  { type: 'ADVANCE_PTR', ptr: 35713 },
  { type: 'GROUP', yDeltaIdx: 3, entries: 2, tiles: [
    { value: 81, palette: 3, xDeltaIdx: 3 }, { value: 84, palette: 3, xDeltaIdx: 4 },
  ] },
  { type: 'GROUP', yDeltaIdx: 4, entries: 2, tiles: [
    { value: 83, palette: 3, xDeltaIdx: 3 }, { value: 86, palette: 3, xDeltaIdx: 4 },
  ] },
  { type: 'EXIT' },
];

// PTR_TABLE_2[8] → 0x8D30 — 7 指令
export const LAYOUT_$8D30: readonly LayoutItem[] = [
  { type: 'GROUP', yDeltaIdx: 24, entries: 2, tiles: [
    { value: 81, palette: 3, xDeltaIdx: 2 }, { value: 84, palette: 3, xDeltaIdx: 3 },
  ] },
  { type: 'GROUP', yDeltaIdx: 25, entries: 3, tiles: [
    { value: 83, palette: 3, xDeltaIdx: 2 }, { value: 85, palette: 3, xDeltaIdx: 3 },
    { value: 87, palette: 3, xDeltaIdx: 4 },
  ] },
  { type: 'GROUP', yDeltaIdx: 26, entries: 1, tiles: [
    { value: 89, palette: 3, xDeltaIdx: 3 },
  ] },
  { type: 'ADVANCE_PTR', ptr: 35713 },
  { type: 'GROUP', yDeltaIdx: 3, entries: 2, tiles: [
    { value: 81, palette: 3, xDeltaIdx: 3 }, { value: 84, palette: 3, xDeltaIdx: 4 },
  ] },
  { type: 'GROUP', yDeltaIdx: 4, entries: 2, tiles: [
    { value: 83, palette: 3, xDeltaIdx: 3 }, { value: 86, palette: 3, xDeltaIdx: 4 },
  ] },
  { type: 'EXIT' },
];

// PTR_TABLE_2[9] → 0x8D45 — 3 指令
export const LAYOUT_$8D45: readonly LayoutItem[] = [
  { type: 'GROUP', yDeltaIdx: 3, entries: 2, tiles: [
    { value: 81, palette: 3, xDeltaIdx: 3 }, { value: 84, palette: 3, xDeltaIdx: 4 },
  ] },
  { type: 'GROUP', yDeltaIdx: 4, entries: 2, tiles: [
    { value: 83, palette: 3, xDeltaIdx: 3 }, { value: 86, palette: 3, xDeltaIdx: 4 },
  ] },
  { type: 'EXIT' },
];

// PTR_TABLE_2[10] → 0x8D52 — 1 指令
export const LAYOUT_$8D52: readonly LayoutItem[] = [
  { type: 'ADJUST_ANIM' },
];

// PTR_TABLE_2[11] → 0x8F1D — 14 指令
export const LAYOUT_$8F1D: readonly LayoutItem[] = [
  { type: 'GROUP', yDeltaIdx: 1, entries: 2, tiles: [
    { value: 81, palette: 3, xDeltaIdx: 20 }, { value: 84, palette: 3, xDeltaIdx: 21 },
  ] },
  { type: 'GROUP', yDeltaIdx: 2, entries: 2, tiles: [
    { value: 83, palette: 3, xDeltaIdx: 20 }, { value: 86, palette: 3, xDeltaIdx: 21 },
  ] },
  { type: 'ADVANCE_PTR', ptr: 36178 },
  { type: 'GROUP', yDeltaIdx: 0, entries: 1, tiles: [
    { value: 197, palette: 3, xDeltaIdx: 21 },
  ] },
  { type: 'GROUP', yDeltaIdx: 1, entries: 3, tiles: [
    { value: 81, palette: 3, xDeltaIdx: 20 }, { value: 208, palette: 3, xDeltaIdx: 21 },
    { value: 210, palette: 3, xDeltaIdx: 16 },
  ] },
  { type: 'GROUP', yDeltaIdx: 2, entries: 2, tiles: [
    { value: 83, palette: 3, xDeltaIdx: 20 }, { value: 86, palette: 3, xDeltaIdx: 21 },
  ] },
  { type: 'ADVANCE_PTR', ptr: 36178 },
  { type: 'GROUP', yDeltaIdx: 0, entries: 1, tiles: [
    { value: 209, palette: 3, xDeltaIdx: 21 },
  ] },
  { type: 'GROUP', yDeltaIdx: 1, entries: 3, tiles: [
    { value: 81, palette: 3, xDeltaIdx: 20 }, { value: 211, palette: 3, xDeltaIdx: 21 },
    { value: 212, palette: 3, xDeltaIdx: 16 },
  ] },
  { type: 'GROUP', yDeltaIdx: 2, entries: 2, tiles: [
    { value: 83, palette: 3, xDeltaIdx: 20 }, { value: 86, palette: 3, xDeltaIdx: 21 },
  ] },
  { type: 'ADVANCE_PTR', ptr: 36178 },
  { type: 'GROUP', yDeltaIdx: 3, entries: 2, tiles: [
    { value: 81, palette: 3, xDeltaIdx: 3 }, { value: 84, palette: 3, xDeltaIdx: 4 },
  ] },
  { type: 'GROUP', yDeltaIdx: 4, entries: 2, tiles: [
    { value: 83, palette: 3, xDeltaIdx: 3 }, { value: 86, palette: 3, xDeltaIdx: 4 },
  ] },
  { type: 'EXIT' },
];

// PTR_TABLE_2[12] → 0x8F2C — 11 指令
export const LAYOUT_$8F2C: readonly LayoutItem[] = [
  { type: 'GROUP', yDeltaIdx: 0, entries: 1, tiles: [
    { value: 197, palette: 3, xDeltaIdx: 21 },
  ] },
  { type: 'GROUP', yDeltaIdx: 1, entries: 3, tiles: [
    { value: 81, palette: 3, xDeltaIdx: 20 }, { value: 208, palette: 3, xDeltaIdx: 21 },
    { value: 210, palette: 3, xDeltaIdx: 16 },
  ] },
  { type: 'GROUP', yDeltaIdx: 2, entries: 2, tiles: [
    { value: 83, palette: 3, xDeltaIdx: 20 }, { value: 86, palette: 3, xDeltaIdx: 21 },
  ] },
  { type: 'ADVANCE_PTR', ptr: 36178 },
  { type: 'GROUP', yDeltaIdx: 0, entries: 1, tiles: [
    { value: 209, palette: 3, xDeltaIdx: 21 },
  ] },
  { type: 'GROUP', yDeltaIdx: 1, entries: 3, tiles: [
    { value: 81, palette: 3, xDeltaIdx: 20 }, { value: 211, palette: 3, xDeltaIdx: 21 },
    { value: 212, palette: 3, xDeltaIdx: 16 },
  ] },
  { type: 'GROUP', yDeltaIdx: 2, entries: 2, tiles: [
    { value: 83, palette: 3, xDeltaIdx: 20 }, { value: 86, palette: 3, xDeltaIdx: 21 },
  ] },
  { type: 'ADVANCE_PTR', ptr: 36178 },
  { type: 'GROUP', yDeltaIdx: 3, entries: 2, tiles: [
    { value: 81, palette: 3, xDeltaIdx: 3 }, { value: 84, palette: 3, xDeltaIdx: 4 },
  ] },
  { type: 'GROUP', yDeltaIdx: 4, entries: 2, tiles: [
    { value: 83, palette: 3, xDeltaIdx: 3 }, { value: 86, palette: 3, xDeltaIdx: 4 },
  ] },
  { type: 'EXIT' },
];

// PTR_TABLE_2[13] → 0x8F41 — 7 指令
export const LAYOUT_$8F41: readonly LayoutItem[] = [
  { type: 'GROUP', yDeltaIdx: 0, entries: 1, tiles: [
    { value: 209, palette: 3, xDeltaIdx: 21 },
  ] },
  { type: 'GROUP', yDeltaIdx: 1, entries: 3, tiles: [
    { value: 81, palette: 3, xDeltaIdx: 20 }, { value: 211, palette: 3, xDeltaIdx: 21 },
    { value: 212, palette: 3, xDeltaIdx: 16 },
  ] },
  { type: 'GROUP', yDeltaIdx: 2, entries: 2, tiles: [
    { value: 83, palette: 3, xDeltaIdx: 20 }, { value: 86, palette: 3, xDeltaIdx: 21 },
  ] },
  { type: 'ADVANCE_PTR', ptr: 36178 },
  { type: 'GROUP', yDeltaIdx: 3, entries: 2, tiles: [
    { value: 81, palette: 3, xDeltaIdx: 3 }, { value: 84, palette: 3, xDeltaIdx: 4 },
  ] },
  { type: 'GROUP', yDeltaIdx: 4, entries: 2, tiles: [
    { value: 83, palette: 3, xDeltaIdx: 3 }, { value: 86, palette: 3, xDeltaIdx: 4 },
  ] },
  { type: 'EXIT' },
];

// PTR_TABLE_3[0] → 0x8F56 — 3 指令
export const LAYOUT_$8F56: readonly LayoutItem[] = [
  { type: 'GROUP', yDeltaIdx: 3, entries: 2, tiles: [
    { value: 81, palette: 3, xDeltaIdx: 3 }, { value: 84, palette: 3, xDeltaIdx: 4 },
  ] },
  { type: 'GROUP', yDeltaIdx: 4, entries: 2, tiles: [
    { value: 83, palette: 3, xDeltaIdx: 3 }, { value: 86, palette: 3, xDeltaIdx: 4 },
  ] },
  { type: 'EXIT' },
];

// PTR_TABLE_3[1] → 0x8F63 — 1 指令
export const LAYOUT_$8F63: readonly LayoutItem[] = [
  { type: 'ADJUST_ANIM' },
];

// PTR_TABLE_3[2] → 0x8FE8 — 3 指令
export const LAYOUT_$8FE8: readonly LayoutItem[] = [
  { type: 'GROUP', yDeltaIdx: 22, entries: 2, tiles: [
    { value: 124, palette: 3, xDeltaIdx: 39 }, { value: 125, palette: 3, xDeltaIdx: 40 },
  ] },
  { type: 'GROUP', yDeltaIdx: 23, entries: 2, tiles: [
    { value: 126, palette: 3, xDeltaIdx: 39 }, { value: 127, palette: 3, xDeltaIdx: 40 },
  ] },
  { type: 'ADJUST_ANIM' },
];

// PTR_TABLE_3[3] → 0x91A9 — 6 指令
export const LAYOUT_$91A9: readonly LayoutItem[] = [
  { type: 'GROUP', yDeltaIdx: 1, entries: 1, tiles: [
    { value: 140, palette: 1, xDeltaIdx: 5 },
  ] },
  { type: 'GROUP', yDeltaIdx: 2, entries: 2, tiles: [
    { value: 136, palette: 1, xDeltaIdx: 4 }, { value: 137, palette: 1, xDeltaIdx: 5 },
  ] },
  { type: 'GROUP', yDeltaIdx: 3, entries: 2, tiles: [
    { value: 130, palette: 0, xDeltaIdx: 3 }, { value: 131, palette: 1, xDeltaIdx: 4 },
  ] },
  { type: 'GROUP', yDeltaIdx: 4, entries: 2, tiles: [
    { value: 132, palette: 0, xDeltaIdx: 2 }, { value: 133, palette: 0, xDeltaIdx: 3 },
  ] },
  { type: 'GROUP', yDeltaIdx: 5, entries: 2, tiles: [
    { value: 134, palette: 0, xDeltaIdx: 1 }, { value: 135, palette: 0, xDeltaIdx: 2 },
  ] },
  { type: 'EXIT' },
];

// PTR_TABLE_3[4] → 0x91C6 — 5 指令
export const LAYOUT_$91C6: readonly LayoutItem[] = [
  { type: 'GROUP', yDeltaIdx: 2, entries: 2, tiles: [
    { value: 184, palette: 3, xDeltaIdx: 3 }, { value: 185, palette: 3, xDeltaIdx: 4 },
  ] },
  { type: 'GROUP', yDeltaIdx: 3, entries: 2, tiles: [
    { value: 186, palette: 3, xDeltaIdx: 3 }, { value: 187, palette: 3, xDeltaIdx: 4 },
  ] },
  { type: 'GROUP', yDeltaIdx: 4, entries: 2, tiles: [
    { value: 188, palette: 3, xDeltaIdx: 3 }, { value: 189, palette: 3, xDeltaIdx: 4 },
  ] },
  { type: 'GROUP', yDeltaIdx: 5, entries: 2, tiles: [
    { value: 190, palette: 3, xDeltaIdx: 3 }, { value: 191, palette: 3, xDeltaIdx: 4 },
  ] },
  { type: 'EXIT' },
];

// PTR_TABLE_3[5] → 0x91DF — 5 指令
export const LAYOUT_$91DF: readonly LayoutItem[] = [
  { type: 'GROUP', yDeltaIdx: 2, entries: 2, tiles: [
    { value: 181, palette: 3, xDeltaIdx: 3 }, { value: 182, palette: 3, xDeltaIdx: 4 },
  ] },
  { type: 'GROUP', yDeltaIdx: 3, entries: 2, tiles: [
    { value: 183, palette: 3, xDeltaIdx: 3 }, { value: 226, palette: 3, xDeltaIdx: 4 },
  ] },
  { type: 'GROUP', yDeltaIdx: 4, entries: 2, tiles: [
    { value: 232, palette: 3, xDeltaIdx: 3 }, { value: 233, palette: 3, xDeltaIdx: 4 },
  ] },
  { type: 'GROUP', yDeltaIdx: 5, entries: 2, tiles: [
    { value: 234, palette: 3, xDeltaIdx: 3 }, { value: 235, palette: 3, xDeltaIdx: 4 },
  ] },
  { type: 'EXIT' },
];

// PTR_TABLE_3[6] → 0x91F8 — 4 指令
export const LAYOUT_$91F8: readonly LayoutItem[] = [
  { type: 'GROUP', yDeltaIdx: 3, entries: 1, tiles: [
    { value: 180, palette: 3, xDeltaIdx: 4 },
  ] },
  { type: 'GROUP', yDeltaIdx: 4, entries: 2, tiles: [
    { value: 252, palette: 1, xDeltaIdx: 3 }, { value: 253, palette: 1, xDeltaIdx: 4 },
  ] },
  { type: 'GROUP', yDeltaIdx: 5, entries: 2, tiles: [
    { value: 254, palette: 1, xDeltaIdx: 4 }, { value: 255, palette: 1, xDeltaIdx: 5 },
  ] },
  { type: 'EXIT' },
];

// PTR_TABLE_3[7] → 0x9209 — 1 指令
export const LAYOUT_$9209: readonly LayoutItem[] = [
  { type: 'ADJUST_ANIM' },
];

// PTR_TABLE_3[8] → 0x929B — 1 指令
export const LAYOUT_$929B: readonly LayoutItem[] = [
  { type: 'ADJUST_ANIM' },
];

// PTR_TABLE_3[9] → 0x9398 — 9 指令
export const LAYOUT_$9398: readonly LayoutItem[] = [
  { type: 'GROUP', yDeltaIdx: 4, entries: 4, tiles: [
    { value: 43, palette: 1, xDeltaIdx: 58 }, { value: 46, palette: 1, xDeltaIdx: 59 },
    { value: 49, palette: 1, xDeltaIdx: 60 }, { value: 52, palette: 1, xDeltaIdx: 39 },
  ] },
  { type: 'GROUP', yDeltaIdx: 5, entries: 5, tiles: [
    { value: 47, palette: 1, xDeltaIdx: 58 }, { value: 58, palette: 1, xDeltaIdx: 59 },
    { value: 51, palette: 1, xDeltaIdx: 60 }, { value: 63, palette: 2, xDeltaIdx: 60 },
    { value: 54, palette: 2, xDeltaIdx: 39 },
  ] },
  { type: 'GROUP', yDeltaIdx: 6, entries: 4, tiles: [
    { value: 59, palette: 1, xDeltaIdx: 58 }, { value: 62, palette: 1, xDeltaIdx: 59 },
    { value: 57, palette: 2, xDeltaIdx: 60 }, { value: 60, palette: 2, xDeltaIdx: 39 },
  ] },
  { type: 'GROUP', yDeltaIdx: 0, entries: 1, tiles: [
    { value: 4, palette: 1, xDeltaIdx: 39 },
  ] },
  { type: 'GROUP', yDeltaIdx: 1, entries: 3, tiles: [
    { value: 2, palette: 1, xDeltaIdx: 59 }, { value: 3, palette: 1, xDeltaIdx: 60 },
    { value: 6, palette: 1, xDeltaIdx: 39 },
  ] },
  { type: 'GROUP', yDeltaIdx: 2, entries: 3, tiles: [
    { value: 8, palette: 1, xDeltaIdx: 59 }, { value: 9, palette: 1, xDeltaIdx: 60 },
    { value: 12, palette: 1, xDeltaIdx: 39 },
  ] },
  { type: 'GROUP', yDeltaIdx: 38, entries: 1, tiles: [
    { value: 20, palette: 1, xDeltaIdx: 58 },
  ] },
  { type: 'GROUP', yDeltaIdx: 3, entries: 3, tiles: [
    { value: 10, palette: 1, xDeltaIdx: 59 }, { value: 11, palette: 1, xDeltaIdx: 60 },
    { value: 14, palette: 1, xDeltaIdx: 39 },
  ] },
  { type: 'EXIT' },
];

// PTR_TABLE_3[10] → 0x93D9 — 14 指令
export const LAYOUT_$93D9: readonly LayoutItem[] = [
  { type: 'GROUP', yDeltaIdx: 0, entries: 3, tiles: [
    { value: 21, palette: 0, xDeltaIdx: 4 }, { value: 64, palette: 0, xDeltaIdx: 5 },
    { value: 65, palette: 0, xDeltaIdx: 6 },
  ] },
  { type: 'GROUP', yDeltaIdx: 1, entries: 3, tiles: [
    { value: 23, palette: 1, xDeltaIdx: 4 }, { value: 66, palette: 3, xDeltaIdx: 5 },
    { value: 67, palette: 3, xDeltaIdx: 6 },
  ] },
  { type: 'GROUP', yDeltaIdx: 2, entries: 3, tiles: [
    { value: 29, palette: 1, xDeltaIdx: 4 }, { value: 72, palette: 3, xDeltaIdx: 5 },
    { value: 73, palette: 1, xDeltaIdx: 6 },
  ] },
  { type: 'GROUP', yDeltaIdx: 13, entries: 1, tiles: [
    { value: 78, palette: 3, xDeltaIdx: 2 },
  ] },
  { type: 'GROUP', yDeltaIdx: 28, entries: 1, tiles: [
    { value: 100, palette: 3, xDeltaIdx: 2 },
  ] },
  { type: 'GROUP', yDeltaIdx: 0, entries: 1, tiles: [
    { value: 79, palette: 3, xDeltaIdx: 3 },
  ] },
  { type: 'GROUP', yDeltaIdx: 1, entries: 2, tiles: [
    { value: 101, palette: 1, xDeltaIdx: 3 }, { value: 104, palette: 3, xDeltaIdx: 32 },
  ] },
  { type: 'GROUP', yDeltaIdx: 2, entries: 3, tiles: [
    { value: 103, palette: 1, xDeltaIdx: 3 }, { value: 106, palette: 3, xDeltaIdx: 32 },
    { value: 105, palette: 3, xDeltaIdx: 48 },
  ] },
  { type: 'GROUP', yDeltaIdx: 3, entries: 6, tiles: [
    { value: 108, palette: 2, xDeltaIdx: 3 }, { value: 109, palette: 1, xDeltaIdx: 3 },
    { value: 120, palette: 1, xDeltaIdx: 4 }, { value: 121, palette: 1, xDeltaIdx: 5 },
    { value: 124, palette: 1, xDeltaIdx: 6 }, { value: 107, palette: 3, xDeltaIdx: 48 },
  ] },
  { type: 'GROUP', yDeltaIdx: 4, entries: 3, tiles: [
    { value: 122, palette: 1, xDeltaIdx: 22 }, { value: 123, palette: 2, xDeltaIdx: 23 },
    { value: 126, palette: 2, xDeltaIdx: 24 },
  ] },
  { type: 'GROUP', yDeltaIdx: 5, entries: 3, tiles: [
    { value: 115, palette: 1, xDeltaIdx: 2 }, { value: 112, palette: 1, xDeltaIdx: 3 },
    { value: 113, palette: 1, xDeltaIdx: 4 },
  ] },
  { type: 'GROUP', yDeltaIdx: 6, entries: 1, tiles: [
    { value: 114, palette: 1, xDeltaIdx: 3 },
  ] },
  { type: 'GROUP', yDeltaIdx: 27, entries: 1, tiles: [
    { value: 125, palette: 1, xDeltaIdx: 1 },
  ] },
  { type: 'EXIT' },
];

// PTR_TABLE_3[11] → 0x9432 — 10 指令
export const LAYOUT_$9432: readonly LayoutItem[] = [
  { type: 'GROUP', yDeltaIdx: 0, entries: 1, tiles: [
    { value: 4, palette: 1, xDeltaIdx: 40 },
  ] },
  { type: 'GROUP', yDeltaIdx: 1, entries: 6, tiles: [
    { value: 2, palette: 1, xDeltaIdx: 60 }, { value: 3, palette: 1, xDeltaIdx: 39 },
    { value: 6, palette: 1, xDeltaIdx: 40 }, { value: 7, palette: 1, xDeltaIdx: 45 },
    { value: 18, palette: 1, xDeltaIdx: 26 }, { value: 19, palette: 1, xDeltaIdx: 0 },
  ] },
  { type: 'GROUP', yDeltaIdx: 2, entries: 6, tiles: [
    { value: 8, palette: 1, xDeltaIdx: 60 }, { value: 9, palette: 1, xDeltaIdx: 39 },
    { value: 12, palette: 1, xDeltaIdx: 40 }, { value: 13, palette: 1, xDeltaIdx: 45 },
    { value: 24, palette: 1, xDeltaIdx: 26 }, { value: 25, palette: 1, xDeltaIdx: 0 },
  ] },
  { type: 'GROUP', yDeltaIdx: 38, entries: 1, tiles: [
    { value: 20, palette: 1, xDeltaIdx: 59 },
  ] },
  { type: 'GROUP', yDeltaIdx: 24, entries: 1, tiles: [
    { value: 28, palette: 1, xDeltaIdx: 1 },
  ] },
  { type: 'GROUP', yDeltaIdx: 3, entries: 6, tiles: [
    { value: 10, palette: 1, xDeltaIdx: 60 }, { value: 11, palette: 1, xDeltaIdx: 39 },
    { value: 14, palette: 1, xDeltaIdx: 40 }, { value: 15, palette: 1, xDeltaIdx: 45 },
    { value: 26, palette: 1, xDeltaIdx: 26 }, { value: 27, palette: 1, xDeltaIdx: 0 },
  ] },
  { type: 'GROUP', yDeltaIdx: 4, entries: 6, tiles: [
    { value: 5, palette: 1, xDeltaIdx: 59 }, { value: 32, palette: 1, xDeltaIdx: 60 },
    { value: 33, palette: 1, xDeltaIdx: 39 }, { value: 36, palette: 1, xDeltaIdx: 40 },
    { value: 37, palette: 1, xDeltaIdx: 45 }, { value: 48, palette: 1, xDeltaIdx: 26 },
  ] },
  { type: 'GROUP', yDeltaIdx: 5, entries: 6, tiles: [
    { value: 16, palette: 1, xDeltaIdx: 58 }, { value: 34, palette: 1, xDeltaIdx: 59 },
    { value: 35, palette: 1, xDeltaIdx: 60 }, { value: 38, palette: 2, xDeltaIdx: 39 },
    { value: 39, palette: 2, xDeltaIdx: 40 }, { value: 50, palette: 1, xDeltaIdx: 45 },
  ] },
  { type: 'GROUP', yDeltaIdx: 6, entries: 7, tiles: [
    { value: 17, palette: 1, xDeltaIdx: 58 }, { value: 40, palette: 1, xDeltaIdx: 59 },
    { value: 41, palette: 1, xDeltaIdx: 60 }, { value: 42, palette: 2, xDeltaIdx: 60 },
    { value: 44, palette: 2, xDeltaIdx: 39 }, { value: 45, palette: 2, xDeltaIdx: 40 },
    { value: 56, palette: 1, xDeltaIdx: 45 },
  ] },
  { type: 'EXIT' },
];

// PTR_TABLE_3[12] → 0x9495 — 20 指令
export const LAYOUT_$9495: readonly LayoutItem[] = [
  { type: 'GROUP', yDeltaIdx: 2, entries: 1, tiles: [
    { value: 110, palette: 3, xDeltaIdx: 48 },
  ] },
  { type: 'GROUP', yDeltaIdx: 3, entries: 3, tiles: [
    { value: 111, palette: 3, xDeltaIdx: 48 }, { value: 81, palette: 3, xDeltaIdx: 49 },
    { value: 84, palette: 3, xDeltaIdx: 50 },
  ] },
  { type: 'GROUP', yDeltaIdx: 4, entries: 5, tiles: [
    { value: 83, palette: 1, xDeltaIdx: 49 }, { value: 86, palette: 1, xDeltaIdx: 50 },
    { value: 87, palette: 1, xDeltaIdx: 51 }, { value: 116, palette: 1, xDeltaIdx: 52 },
    { value: 117, palette: 1, xDeltaIdx: 53 },
  ] },
  { type: 'GROUP', yDeltaIdx: 5, entries: 4, tiles: [
    { value: 89, palette: 1, xDeltaIdx: 41 }, { value: 92, palette: 1, xDeltaIdx: 42 },
    { value: 93, palette: 3, xDeltaIdx: 43 }, { value: 85, palette: 3, xDeltaIdx: 44 },
  ] },
  { type: 'GROUP', yDeltaIdx: 6, entries: 4, tiles: [
    { value: 90, palette: 2, xDeltaIdx: 49 }, { value: 91, palette: 1, xDeltaIdx: 50 },
    { value: 94, palette: 1, xDeltaIdx: 51 }, { value: 95, palette: 1, xDeltaIdx: 52 },
  ] },
  { type: 'GROUP', yDeltaIdx: 7, entries: 6, tiles: [
    { value: 22, palette: 1, xDeltaIdx: 48 }, { value: 102, palette: 2, xDeltaIdx: 49 },
    { value: 132, palette: 1, xDeltaIdx: 50 }, { value: 119, palette: 2, xDeltaIdx: 50 },
    { value: 133, palette: 1, xDeltaIdx: 51 }, { value: 127, palette: 1, xDeltaIdx: 52 },
  ] },
  { type: 'GROUP', yDeltaIdx: 8, entries: 7, tiles: [
    { value: 130, palette: 1, xDeltaIdx: 32 }, { value: 136, palette: 1, xDeltaIdx: 48 },
    { value: 137, palette: 1, xDeltaIdx: 49 }, { value: 118, palette: 2, xDeltaIdx: 49 },
    { value: 30, palette: 2, xDeltaIdx: 50 }, { value: 131, palette: 2, xDeltaIdx: 51 },
    { value: 134, palette: 2, xDeltaIdx: 52 },
  ] },
  { type: 'GROUP', yDeltaIdx: 9, entries: 2, tiles: [
    { value: 138, palette: 1, xDeltaIdx: 48 }, { value: 139, palette: 1, xDeltaIdx: 49 },
  ] },
  { type: 'ADVANCE_PTR', ptr: 37849 },
  { type: 'GROUP', yDeltaIdx: 0, entries: 3, tiles: [
    { value: 31, palette: 0, xDeltaIdx: 4 }, { value: 74, palette: 0, xDeltaIdx: 5 },
    { value: 75, palette: 0, xDeltaIdx: 6 },
  ] },
  { type: 'GROUP', yDeltaIdx: 1, entries: 4, tiles: [
    { value: 61, palette: 1, xDeltaIdx: 4 }, { value: 53, palette: 0, xDeltaIdx: 4 },
    { value: 96, palette: 0, xDeltaIdx: 5 }, { value: 97, palette: 0, xDeltaIdx: 6 },
  ] },
  { type: 'GROUP', yDeltaIdx: 2, entries: 3, tiles: [
    { value: 55, palette: 1, xDeltaIdx: 4 }, { value: 98, palette: 1, xDeltaIdx: 5 },
    { value: 99, palette: 1, xDeltaIdx: 6 },
  ] },
  { type: 'ADVANCE_PTR', ptr: 37873 },
  { type: 'GROUP', yDeltaIdx: 0, entries: 3, tiles: [
    { value: 68, palette: 0, xDeltaIdx: 4 }, { value: 69, palette: 0, xDeltaIdx: 5 },
    { value: 80, palette: 0, xDeltaIdx: 6 },
  ] },
  { type: 'GROUP', yDeltaIdx: 1, entries: 3, tiles: [
    { value: 70, palette: 1, xDeltaIdx: 4 }, { value: 71, palette: 3, xDeltaIdx: 5 },
    { value: 82, palette: 0, xDeltaIdx: 6 },
  ] },
  { type: 'GROUP', yDeltaIdx: 2, entries: 3, tiles: [
    { value: 76, palette: 1, xDeltaIdx: 4 }, { value: 77, palette: 1, xDeltaIdx: 5 },
    { value: 88, palette: 1, xDeltaIdx: 6 },
  ] },
  { type: 'ADVANCE_PTR', ptr: 37873 },
  { type: 'GROUP', yDeltaIdx: 9, entries: 1, tiles: [
    { value: 105, palette: 3, xDeltaIdx: 5 },
  ] },
  { type: 'GROUP', yDeltaIdx: 22, entries: 2, tiles: [
    { value: 63, palette: 3, xDeltaIdx: 3 }, { value: 106, palette: 3, xDeltaIdx: 4 },
  ] },
  { type: 'ADJUST_ANIM' },
];

// PTR_TABLE_3[13] → 0x94E8 — 11 指令
export const LAYOUT_$94E8: readonly LayoutItem[] = [
  { type: 'GROUP', yDeltaIdx: 0, entries: 3, tiles: [
    { value: 31, palette: 0, xDeltaIdx: 4 }, { value: 74, palette: 0, xDeltaIdx: 5 },
    { value: 75, palette: 0, xDeltaIdx: 6 },
  ] },
  { type: 'GROUP', yDeltaIdx: 1, entries: 4, tiles: [
    { value: 61, palette: 1, xDeltaIdx: 4 }, { value: 53, palette: 0, xDeltaIdx: 4 },
    { value: 96, palette: 0, xDeltaIdx: 5 }, { value: 97, palette: 0, xDeltaIdx: 6 },
  ] },
  { type: 'GROUP', yDeltaIdx: 2, entries: 3, tiles: [
    { value: 55, palette: 1, xDeltaIdx: 4 }, { value: 98, palette: 1, xDeltaIdx: 5 },
    { value: 99, palette: 1, xDeltaIdx: 6 },
  ] },
  { type: 'ADVANCE_PTR', ptr: 37873 },
  { type: 'GROUP', yDeltaIdx: 0, entries: 3, tiles: [
    { value: 68, palette: 0, xDeltaIdx: 4 }, { value: 69, palette: 0, xDeltaIdx: 5 },
    { value: 80, palette: 0, xDeltaIdx: 6 },
  ] },
  { type: 'GROUP', yDeltaIdx: 1, entries: 3, tiles: [
    { value: 70, palette: 1, xDeltaIdx: 4 }, { value: 71, palette: 3, xDeltaIdx: 5 },
    { value: 82, palette: 0, xDeltaIdx: 6 },
  ] },
  { type: 'GROUP', yDeltaIdx: 2, entries: 3, tiles: [
    { value: 76, palette: 1, xDeltaIdx: 4 }, { value: 77, palette: 1, xDeltaIdx: 5 },
    { value: 88, palette: 1, xDeltaIdx: 6 },
  ] },
  { type: 'ADVANCE_PTR', ptr: 37873 },
  { type: 'GROUP', yDeltaIdx: 9, entries: 1, tiles: [
    { value: 105, palette: 3, xDeltaIdx: 5 },
  ] },
  { type: 'GROUP', yDeltaIdx: 22, entries: 2, tiles: [
    { value: 63, palette: 3, xDeltaIdx: 3 }, { value: 106, palette: 3, xDeltaIdx: 4 },
  ] },
  { type: 'ADJUST_ANIM' },
];

// PTR_TABLE_3[14] → 0x9505 — 7 指令
export const LAYOUT_$9505: readonly LayoutItem[] = [
  { type: 'GROUP', yDeltaIdx: 0, entries: 3, tiles: [
    { value: 68, palette: 0, xDeltaIdx: 4 }, { value: 69, palette: 0, xDeltaIdx: 5 },
    { value: 80, palette: 0, xDeltaIdx: 6 },
  ] },
  { type: 'GROUP', yDeltaIdx: 1, entries: 3, tiles: [
    { value: 70, palette: 1, xDeltaIdx: 4 }, { value: 71, palette: 3, xDeltaIdx: 5 },
    { value: 82, palette: 0, xDeltaIdx: 6 },
  ] },
  { type: 'GROUP', yDeltaIdx: 2, entries: 3, tiles: [
    { value: 76, palette: 1, xDeltaIdx: 4 }, { value: 77, palette: 1, xDeltaIdx: 5 },
    { value: 88, palette: 1, xDeltaIdx: 6 },
  ] },
  { type: 'ADVANCE_PTR', ptr: 37873 },
  { type: 'GROUP', yDeltaIdx: 9, entries: 1, tiles: [
    { value: 105, palette: 3, xDeltaIdx: 5 },
  ] },
  { type: 'GROUP', yDeltaIdx: 22, entries: 2, tiles: [
    { value: 63, palette: 3, xDeltaIdx: 3 }, { value: 106, palette: 3, xDeltaIdx: 4 },
  ] },
  { type: 'ADJUST_ANIM' },
];

// PTR_TABLE_3[15] → 0x9520 — 3 指令
export const LAYOUT_$9520: readonly LayoutItem[] = [
  { type: 'GROUP', yDeltaIdx: 9, entries: 1, tiles: [
    { value: 105, palette: 3, xDeltaIdx: 5 },
  ] },
  { type: 'GROUP', yDeltaIdx: 22, entries: 2, tiles: [
    { value: 63, palette: 3, xDeltaIdx: 3 }, { value: 106, palette: 3, xDeltaIdx: 4 },
  ] },
  { type: 'ADJUST_ANIM' },
];

// PTR_TABLE_3[16] → 0x9651 — 19 指令
export const LAYOUT_$9651: readonly LayoutItem[] = [
  { type: 'GROUP', yDeltaIdx: 9, entries: 1, tiles: [
    { value: 105, palette: 3, xDeltaIdx: 5 },
  ] },
  { type: 'GROUP', yDeltaIdx: 22, entries: 2, tiles: [
    { value: 63, palette: 3, xDeltaIdx: 3 }, { value: 106, palette: 3, xDeltaIdx: 4 },
  ] },
  { type: 'GROUP', yDeltaIdx: 9, entries: 2, tiles: [
    { value: 125, palette: 3, xDeltaIdx: 2 }, { value: 108, palette: 3, xDeltaIdx: 5 },
  ] },
  { type: 'GROUP', yDeltaIdx: 22, entries: 4, tiles: [
    { value: 190, palette: 3, xDeltaIdx: 2 }, { value: 191, palette: 3, xDeltaIdx: 3 },
    { value: 107, palette: 3, xDeltaIdx: 4 }, { value: 110, palette: 3, xDeltaIdx: 5 },
  ] },
  { type: 'ADVANCE_PTR', ptr: 38186 },
  { type: 'GROUP', yDeltaIdx: 9, entries: 1, tiles: [
    { value: 105, palette: 3, xDeltaIdx: 5 },
  ] },
  { type: 'GROUP', yDeltaIdx: 22, entries: 2, tiles: [
    { value: 63, palette: 3, xDeltaIdx: 3 }, { value: 106, palette: 3, xDeltaIdx: 4 },
  ] },
  { type: 'GROUP', yDeltaIdx: 9, entries: 2, tiles: [
    { value: 124, palette: 3, xDeltaIdx: 2 }, { value: 121, palette: 3, xDeltaIdx: 5 },
  ] },
  { type: 'GROUP', yDeltaIdx: 22, entries: 4, tiles: [
    { value: 126, palette: 3, xDeltaIdx: 2 }, { value: 127, palette: 3, xDeltaIdx: 3 },
    { value: 122, palette: 3, xDeltaIdx: 4 }, { value: 123, palette: 3, xDeltaIdx: 5 },
  ] },
  { type: 'ADVANCE_PTR', ptr: 38186 },
  { type: 'GROUP', yDeltaIdx: 0, entries: 2, tiles: [
    { value: 46, palette: 3, xDeltaIdx: 22 }, { value: 47, palette: 3, xDeltaIdx: 23 },
  ] },
  { type: 'GROUP', yDeltaIdx: 1, entries: 4, tiles: [
    { value: 48, palette: 1, xDeltaIdx: 2 }, { value: 49, palette: 3, xDeltaIdx: 3 },
    { value: 70, palette: 1, xDeltaIdx: 3 }, { value: 64, palette: 1, xDeltaIdx: 4 },
  ] },
  { type: 'GROUP', yDeltaIdx: 2, entries: 5, tiles: [
    { value: 50, palette: 3, xDeltaIdx: 2 }, { value: 68, palette: 2, xDeltaIdx: 2 },
    { value: 51, palette: 1, xDeltaIdx: 3 }, { value: 2, palette: 3, xDeltaIdx: 3 },
    { value: 66, palette: 2, xDeltaIdx: 4 },
  ] },
  { type: 'GROUP', yDeltaIdx: 3, entries: 6, tiles: [
    { value: 45, palette: 0, xDeltaIdx: 1 }, { value: 56, palette: 0, xDeltaIdx: 2 },
    { value: 57, palette: 0, xDeltaIdx: 3 }, { value: 65, palette: 0, xDeltaIdx: 4 },
    { value: 2, palette: 3, xDeltaIdx: 16 }, { value: 2, palette: 3, xDeltaIdx: 17 },
  ] },
  { type: 'GROUP', yDeltaIdx: 4, entries: 3, tiles: [
    { value: 58, palette: 0, xDeltaIdx: 2 }, { value: 59, palette: 0, xDeltaIdx: 3 },
    { value: 67, palette: 0, xDeltaIdx: 4 },
  ] },
  { type: 'GROUP', yDeltaIdx: 5, entries: 3, tiles: [
    { value: 52, palette: 1, xDeltaIdx: 2 }, { value: 53, palette: 1, xDeltaIdx: 3 },
    { value: 55, palette: 1, xDeltaIdx: 4 },
  ] },
  { type: 'GROUP', yDeltaIdx: 6, entries: 2, tiles: [
    { value: 54, palette: 1, xDeltaIdx: 2 }, { value: 61, palette: 1, xDeltaIdx: 12 },
  ] },
  { type: 'GROUP', yDeltaIdx: 7, entries: 5, tiles: [
    { value: 62, palette: 3, xDeltaIdx: 1 }, { value: 63, palette: 3, xDeltaIdx: 2 },
    { value: 69, palette: 1, xDeltaIdx: 2 }, { value: 60, palette: 3, xDeltaIdx: 4 },
    { value: 69, palette: 1, xDeltaIdx: 47 },
  ] },
  { type: 'EXIT' },
];

// PTR_TABLE_3[17] → 0x966E — 14 指令
export const LAYOUT_$966E: readonly LayoutItem[] = [
  { type: 'GROUP', yDeltaIdx: 9, entries: 1, tiles: [
    { value: 105, palette: 3, xDeltaIdx: 5 },
  ] },
  { type: 'GROUP', yDeltaIdx: 22, entries: 2, tiles: [
    { value: 63, palette: 3, xDeltaIdx: 3 }, { value: 106, palette: 3, xDeltaIdx: 4 },
  ] },
  { type: 'GROUP', yDeltaIdx: 9, entries: 2, tiles: [
    { value: 124, palette: 3, xDeltaIdx: 2 }, { value: 121, palette: 3, xDeltaIdx: 5 },
  ] },
  { type: 'GROUP', yDeltaIdx: 22, entries: 4, tiles: [
    { value: 126, palette: 3, xDeltaIdx: 2 }, { value: 127, palette: 3, xDeltaIdx: 3 },
    { value: 122, palette: 3, xDeltaIdx: 4 }, { value: 123, palette: 3, xDeltaIdx: 5 },
  ] },
  { type: 'ADVANCE_PTR', ptr: 38186 },
  { type: 'GROUP', yDeltaIdx: 0, entries: 2, tiles: [
    { value: 46, palette: 3, xDeltaIdx: 22 }, { value: 47, palette: 3, xDeltaIdx: 23 },
  ] },
  { type: 'GROUP', yDeltaIdx: 1, entries: 4, tiles: [
    { value: 48, palette: 1, xDeltaIdx: 2 }, { value: 49, palette: 3, xDeltaIdx: 3 },
    { value: 70, palette: 1, xDeltaIdx: 3 }, { value: 64, palette: 1, xDeltaIdx: 4 },
  ] },
  { type: 'GROUP', yDeltaIdx: 2, entries: 5, tiles: [
    { value: 50, palette: 3, xDeltaIdx: 2 }, { value: 68, palette: 2, xDeltaIdx: 2 },
    { value: 51, palette: 1, xDeltaIdx: 3 }, { value: 2, palette: 3, xDeltaIdx: 3 },
    { value: 66, palette: 2, xDeltaIdx: 4 },
  ] },
  { type: 'GROUP', yDeltaIdx: 3, entries: 6, tiles: [
    { value: 45, palette: 0, xDeltaIdx: 1 }, { value: 56, palette: 0, xDeltaIdx: 2 },
    { value: 57, palette: 0, xDeltaIdx: 3 }, { value: 65, palette: 0, xDeltaIdx: 4 },
    { value: 2, palette: 3, xDeltaIdx: 16 }, { value: 2, palette: 3, xDeltaIdx: 17 },
  ] },
  { type: 'GROUP', yDeltaIdx: 4, entries: 3, tiles: [
    { value: 58, palette: 0, xDeltaIdx: 2 }, { value: 59, palette: 0, xDeltaIdx: 3 },
    { value: 67, palette: 0, xDeltaIdx: 4 },
  ] },
  { type: 'GROUP', yDeltaIdx: 5, entries: 3, tiles: [
    { value: 52, palette: 1, xDeltaIdx: 2 }, { value: 53, palette: 1, xDeltaIdx: 3 },
    { value: 55, palette: 1, xDeltaIdx: 4 },
  ] },
  { type: 'GROUP', yDeltaIdx: 6, entries: 2, tiles: [
    { value: 54, palette: 1, xDeltaIdx: 2 }, { value: 61, palette: 1, xDeltaIdx: 12 },
  ] },
  { type: 'GROUP', yDeltaIdx: 7, entries: 5, tiles: [
    { value: 62, palette: 3, xDeltaIdx: 1 }, { value: 63, palette: 3, xDeltaIdx: 2 },
    { value: 69, palette: 1, xDeltaIdx: 2 }, { value: 60, palette: 3, xDeltaIdx: 4 },
    { value: 69, palette: 1, xDeltaIdx: 47 },
  ] },
  { type: 'EXIT' },
];

// PTR_TABLE_3[19] → 0x968B — 9 指令
export const LAYOUT_$968B: readonly LayoutItem[] = [
  { type: 'GROUP', yDeltaIdx: 0, entries: 2, tiles: [
    { value: 46, palette: 3, xDeltaIdx: 22 }, { value: 47, palette: 3, xDeltaIdx: 23 },
  ] },
  { type: 'GROUP', yDeltaIdx: 1, entries: 4, tiles: [
    { value: 48, palette: 1, xDeltaIdx: 2 }, { value: 49, palette: 3, xDeltaIdx: 3 },
    { value: 70, palette: 1, xDeltaIdx: 3 }, { value: 64, palette: 1, xDeltaIdx: 4 },
  ] },
  { type: 'GROUP', yDeltaIdx: 2, entries: 5, tiles: [
    { value: 50, palette: 3, xDeltaIdx: 2 }, { value: 68, palette: 2, xDeltaIdx: 2 },
    { value: 51, palette: 1, xDeltaIdx: 3 }, { value: 2, palette: 3, xDeltaIdx: 3 },
    { value: 66, palette: 2, xDeltaIdx: 4 },
  ] },
  { type: 'GROUP', yDeltaIdx: 3, entries: 6, tiles: [
    { value: 45, palette: 0, xDeltaIdx: 1 }, { value: 56, palette: 0, xDeltaIdx: 2 },
    { value: 57, palette: 0, xDeltaIdx: 3 }, { value: 65, palette: 0, xDeltaIdx: 4 },
    { value: 2, palette: 3, xDeltaIdx: 16 }, { value: 2, palette: 3, xDeltaIdx: 17 },
  ] },
  { type: 'GROUP', yDeltaIdx: 4, entries: 3, tiles: [
    { value: 58, palette: 0, xDeltaIdx: 2 }, { value: 59, palette: 0, xDeltaIdx: 3 },
    { value: 67, palette: 0, xDeltaIdx: 4 },
  ] },
  { type: 'GROUP', yDeltaIdx: 5, entries: 3, tiles: [
    { value: 52, palette: 1, xDeltaIdx: 2 }, { value: 53, palette: 1, xDeltaIdx: 3 },
    { value: 55, palette: 1, xDeltaIdx: 4 },
  ] },
  { type: 'GROUP', yDeltaIdx: 6, entries: 2, tiles: [
    { value: 54, palette: 1, xDeltaIdx: 2 }, { value: 61, palette: 1, xDeltaIdx: 12 },
  ] },
  { type: 'GROUP', yDeltaIdx: 7, entries: 5, tiles: [
    { value: 62, palette: 3, xDeltaIdx: 1 }, { value: 63, palette: 3, xDeltaIdx: 2 },
    { value: 69, palette: 1, xDeltaIdx: 2 }, { value: 60, palette: 3, xDeltaIdx: 4 },
    { value: 69, palette: 1, xDeltaIdx: 47 },
  ] },
  { type: 'EXIT' },
];

// PTR_TABLE_3[20] → 0x96D8 — 9 指令
export const LAYOUT_$96D8: readonly LayoutItem[] = [
  { type: 'GROUP', yDeltaIdx: 0, entries: 2, tiles: [
    { value: 80, palette: 0, xDeltaIdx: 16 }, { value: 230, palette: 1, xDeltaIdx: 23 },
  ] },
  { type: 'GROUP', yDeltaIdx: 1, entries: 4, tiles: [
    { value: 82, palette: 0, xDeltaIdx: 23 }, { value: 250, palette: 1, xDeltaIdx: 23 },
    { value: 83, palette: 0, xDeltaIdx: 24 }, { value: 251, palette: 1, xDeltaIdx: 24 },
  ] },
  { type: 'GROUP', yDeltaIdx: 2, entries: 4, tiles: [
    { value: 88, palette: 0, xDeltaIdx: 17 }, { value: 229, palette: 1, xDeltaIdx: 17 },
    { value: 89, palette: 0, xDeltaIdx: 33 }, { value: 240, palette: 1, xDeltaIdx: 33 },
  ] },
  { type: 'GROUP', yDeltaIdx: 3, entries: 7, tiles: [
    { value: 90, palette: 0, xDeltaIdx: 17 }, { value: 231, palette: 1, xDeltaIdx: 17 },
    { value: 91, palette: 0, xDeltaIdx: 33 }, { value: 242, palette: 1, xDeltaIdx: 33 },
    { value: 247, palette: 2, xDeltaIdx: 36 }, { value: 81, palette: 0, xDeltaIdx: 36 },
    { value: 243, palette: 1, xDeltaIdx: 36 },
  ] },
  { type: 'GROUP', yDeltaIdx: 4, entries: 8, tiles: [
    { value: 86, palette: 0, xDeltaIdx: 3 }, { value: 87, palette: 0, xDeltaIdx: 4 },
    { value: 84, palette: 0, xDeltaIdx: 5 }, { value: 236, palette: 1, xDeltaIdx: 16 },
    { value: 237, palette: 1, xDeltaIdx: 17 }, { value: 248, palette: 1, xDeltaIdx: 33 },
    { value: 249, palette: 1, xDeltaIdx: 36 }, { value: 253, palette: 2, xDeltaIdx: 36 },
  ] },
  { type: 'GROUP', yDeltaIdx: 5, entries: 5, tiles: [
    { value: 246, palette: 2, xDeltaIdx: 16 }, { value: 92, palette: 0, xDeltaIdx: 3 },
    { value: 93, palette: 0, xDeltaIdx: 4 }, { value: 238, palette: 1, xDeltaIdx: 13 },
    { value: 239, palette: 1, xDeltaIdx: 14 },
  ] },
  { type: 'GROUP', yDeltaIdx: 6, entries: 5, tiles: [
    { value: 252, palette: 2, xDeltaIdx: 16 }, { value: 94, palette: 0, xDeltaIdx: 3 },
    { value: 95, palette: 0, xDeltaIdx: 4 }, { value: 232, palette: 1, xDeltaIdx: 13 },
    { value: 233, palette: 1, xDeltaIdx: 14 },
  ] },
  { type: 'GROUP', yDeltaIdx: 7, entries: 5, tiles: [
    { value: 234, palette: 1, xDeltaIdx: 16 }, { value: 254, palette: 2, xDeltaIdx: 16 },
    { value: 85, palette: 0, xDeltaIdx: 17 }, { value: 235, palette: 1, xDeltaIdx: 17 },
    { value: 255, palette: 2, xDeltaIdx: 17 },
  ] },
  { type: 'EXIT' },
];

// PTR_TABLE_4[12] → 0x9739 — 5 指令
export const LAYOUT_$9739: readonly LayoutItem[] = [
  { type: 'GROUP', yDeltaIdx: 9, entries: 1, tiles: [
    { value: 105, palette: 3, xDeltaIdx: 26 },
  ] },
  { type: 'GROUP', yDeltaIdx: 22, entries: 2, tiles: [
    { value: 63, palette: 3, xDeltaIdx: 40 }, { value: 106, palette: 3, xDeltaIdx: 45 },
  ] },
  { type: 'GROUP', yDeltaIdx: 8, entries: 2, tiles: [
    { value: 55, palette: 3, xDeltaIdx: 40 }, { value: 98, palette: 3, xDeltaIdx: 45 },
  ] },
  { type: 'GROUP', yDeltaIdx: 9, entries: 2, tiles: [
    { value: 61, palette: 3, xDeltaIdx: 40 }, { value: 104, palette: 3, xDeltaIdx: 45 },
  ] },
  { type: 'ADJUST_ANIM' },
];

// PTR_TABLE_4[13] → 0x98E4 — 11 指令
export const LAYOUT_$98E4: readonly LayoutItem[] = [
  { type: 'GROUP', yDeltaIdx: 9, entries: 1, tiles: [
    { value: 105, palette: 3, xDeltaIdx: 26 },
  ] },
  { type: 'GROUP', yDeltaIdx: 22, entries: 2, tiles: [
    { value: 63, palette: 3, xDeltaIdx: 40 }, { value: 106, palette: 3, xDeltaIdx: 45 },
  ] },
  { type: 'GROUP', yDeltaIdx: 9, entries: 2, tiles: [
    { value: 125, palette: 3, xDeltaIdx: 39 }, { value: 108, palette: 3, xDeltaIdx: 26 },
  ] },
  { type: 'GROUP', yDeltaIdx: 22, entries: 4, tiles: [
    { value: 190, palette: 3, xDeltaIdx: 39 }, { value: 191, palette: 3, xDeltaIdx: 40 },
    { value: 107, palette: 3, xDeltaIdx: 45 }, { value: 110, palette: 3, xDeltaIdx: 26 },
  ] },
  { type: 'ADVANCE_PTR', ptr: 38723 },
  { type: 'GROUP', yDeltaIdx: 9, entries: 1, tiles: [
    { value: 105, palette: 3, xDeltaIdx: 26 },
  ] },
  { type: 'GROUP', yDeltaIdx: 22, entries: 2, tiles: [
    { value: 63, palette: 3, xDeltaIdx: 40 }, { value: 106, palette: 3, xDeltaIdx: 45 },
  ] },
  { type: 'GROUP', yDeltaIdx: 9, entries: 2, tiles: [
    { value: 124, palette: 3, xDeltaIdx: 39 }, { value: 121, palette: 3, xDeltaIdx: 26 },
  ] },
  { type: 'GROUP', yDeltaIdx: 22, entries: 4, tiles: [
    { value: 126, palette: 3, xDeltaIdx: 39 }, { value: 127, palette: 3, xDeltaIdx: 40 },
    { value: 122, palette: 3, xDeltaIdx: 45 }, { value: 123, palette: 3, xDeltaIdx: 26 },
  ] },
  { type: 'ADVANCE_PTR', ptr: 38723 },
  { type: 'ADJUST_ANIM' },
];

// PTR_TABLE_4[14] → 0x9901 — 6 指令
export const LAYOUT_$9901: readonly LayoutItem[] = [
  { type: 'GROUP', yDeltaIdx: 9, entries: 1, tiles: [
    { value: 105, palette: 3, xDeltaIdx: 26 },
  ] },
  { type: 'GROUP', yDeltaIdx: 22, entries: 2, tiles: [
    { value: 63, palette: 3, xDeltaIdx: 40 }, { value: 106, palette: 3, xDeltaIdx: 45 },
  ] },
  { type: 'GROUP', yDeltaIdx: 9, entries: 2, tiles: [
    { value: 124, palette: 3, xDeltaIdx: 39 }, { value: 121, palette: 3, xDeltaIdx: 26 },
  ] },
  { type: 'GROUP', yDeltaIdx: 22, entries: 4, tiles: [
    { value: 126, palette: 3, xDeltaIdx: 39 }, { value: 127, palette: 3, xDeltaIdx: 40 },
    { value: 122, palette: 3, xDeltaIdx: 45 }, { value: 123, palette: 3, xDeltaIdx: 26 },
  ] },
  { type: 'ADVANCE_PTR', ptr: 38723 },
  { type: 'ADJUST_ANIM' },
];

// PTR_TABLE_4[15] → 0x991E — 1 指令
export const LAYOUT_$991E: readonly LayoutItem[] = [
  { type: 'ADJUST_ANIM' },
];

// PTR_TABLE_4[16] → 0x9B2C — 1 指令
export const LAYOUT_$9B2C: readonly LayoutItem[] = [
  { type: 'ADJUST_ANIM' },
];

// PTR_TABLE_5[0] → 0x9B89 — 1 指令
export const LAYOUT_$9B89: readonly LayoutItem[] = [
  { type: 'ADJUST_ANIM' },
];

// PTR_TABLE_5[1] → 0x9BBA — 1 指令
export const LAYOUT_$9BBA: readonly LayoutItem[] = [
  { type: 'ADJUST_ANIM' },
];

// PTR_TABLE_5[2] → 0x9BEB — 1 指令
export const LAYOUT_$9BEB: readonly LayoutItem[] = [
  { type: 'ADJUST_ANIM' },
];

// PTR_TABLE_5[3] → 0x9C1E — 1 指令
export const LAYOUT_$9C1E: readonly LayoutItem[] = [
  { type: 'ADJUST_ANIM' },
];

// PTR_TABLE_5[4] → 0x9C51 — 1 指令
export const LAYOUT_$9C51: readonly LayoutItem[] = [
  { type: 'ADJUST_ANIM' },
];

// PTR_TABLE_5[5] → 0x9C8C — 1 指令
export const LAYOUT_$9C8C: readonly LayoutItem[] = [
  { type: 'ADJUST_ANIM' },
];

// PTR_TABLE_5[6] → 0x9CBD — 1 指令
export const LAYOUT_$9CBD: readonly LayoutItem[] = [
  { type: 'ADJUST_ANIM' },
];

// PTR_TABLE_5[7] → 0x9D0C — 1 指令
export const LAYOUT_$9D0C: readonly LayoutItem[] = [
  { type: 'ADJUST_ANIM' },
];

// PTR_TABLE_5[8] → 0x9D39 — 1 指令
export const LAYOUT_$9D39: readonly LayoutItem[] = [
  { type: 'ADJUST_ANIM' },
];

// PTR_TABLE_5[9] → 0x9D66 — 1 指令
export const LAYOUT_$9D66: readonly LayoutItem[] = [
  { type: 'ADJUST_ANIM' },
];

// PTR_TABLE_5[10] → 0x9D91 — 1 指令
export const LAYOUT_$9D91: readonly LayoutItem[] = [
  { type: 'ADJUST_ANIM' },
];

// PTR_TABLE_5[11] → 0x9DBC — 10 指令
export const LAYOUT_$9DBC: readonly LayoutItem[] = [
  { type: 'GROUP', yDeltaIdx: 0, entries: 5, tiles: [
    { value: 32, palette: 3, xDeltaIdx: 6 }, { value: 33, palette: 3, xDeltaIdx: 32 },
    { value: 15, palette: 3, xDeltaIdx: 48 }, { value: 36, palette: 2, xDeltaIdx: 48 },
    { value: 37, palette: 2, xDeltaIdx: 49 },
  ] },
  { type: 'GROUP', yDeltaIdx: 1, entries: 6, tiles: [
    { value: 32, palette: 3, xDeltaIdx: 5 }, { value: 34, palette: 3, xDeltaIdx: 6 },
    { value: 35, palette: 3, xDeltaIdx: 32 }, { value: 38, palette: 3, xDeltaIdx: 48 },
    { value: 50, palette: 3, xDeltaIdx: 49 }, { value: 39, palette: 2, xDeltaIdx: 49 },
  ] },
  { type: 'GROUP', yDeltaIdx: 2, entries: 5, tiles: [
    { value: 32, palette: 3, xDeltaIdx: 4 }, { value: 34, palette: 3, xDeltaIdx: 5 },
    { value: 35, palette: 3, xDeltaIdx: 6 }, { value: 48, palette: 3, xDeltaIdx: 32 },
    { value: 49, palette: 3, xDeltaIdx: 48 },
  ] },
  { type: 'GROUP', yDeltaIdx: 3, entries: 6, tiles: [
    { value: 40, palette: 3, xDeltaIdx: 2 }, { value: 41, palette: 3, xDeltaIdx: 3 },
    { value: 44, palette: 3, xDeltaIdx: 4 }, { value: 45, palette: 3, xDeltaIdx: 5 },
    { value: 56, palette: 3, xDeltaIdx: 6 }, { value: 57, palette: 3, xDeltaIdx: 32 },
  ] },
  { type: 'GROUP', yDeltaIdx: 4, entries: 4, tiles: [
    { value: 16, palette: 3, xDeltaIdx: 2 }, { value: 17, palette: 3, xDeltaIdx: 3 },
    { value: 20, palette: 3, xDeltaIdx: 4 }, { value: 21, palette: 3, xDeltaIdx: 5 },
  ] },
  { type: 'GROUP', yDeltaIdx: 5, entries: 5, tiles: [
    { value: 18, palette: 3, xDeltaIdx: 2 }, { value: 21, palette: 3, xDeltaIdx: 3 },
    { value: 19, palette: 3, xDeltaIdx: 32 }, { value: 22, palette: 3, xDeltaIdx: 48 },
    { value: 23, palette: 3, xDeltaIdx: 49 },
  ] },
  { type: 'GROUP', yDeltaIdx: 6, entries: 8, tiles: [
    { value: 24, palette: 3, xDeltaIdx: 2 }, { value: 25, palette: 3, xDeltaIdx: 3 },
    { value: 28, palette: 3, xDeltaIdx: 4 }, { value: 29, palette: 3, xDeltaIdx: 5 },
    { value: 26, palette: 3, xDeltaIdx: 6 }, { value: 35, palette: 3, xDeltaIdx: 32 },
    { value: 35, palette: 3, xDeltaIdx: 48 }, { value: 27, palette: 3, xDeltaIdx: 49 },
  ] },
  { type: 'GROUP', yDeltaIdx: 7, entries: 8, tiles: [
    { value: 42, palette: 3, xDeltaIdx: 2 }, { value: 43, palette: 3, xDeltaIdx: 3 },
    { value: 46, palette: 3, xDeltaIdx: 4 }, { value: 47, palette: 3, xDeltaIdx: 5 },
    { value: 58, palette: 3, xDeltaIdx: 6 }, { value: 59, palette: 3, xDeltaIdx: 32 },
    { value: 30, palette: 3, xDeltaIdx: 48 }, { value: 31, palette: 3, xDeltaIdx: 49 },
  ] },
  { type: 'GROUP', yDeltaIdx: 8, entries: 7, tiles: [
    { value: 52, palette: 3, xDeltaIdx: 2 }, { value: 53, palette: 3, xDeltaIdx: 3 },
    { value: 21, palette: 3, xDeltaIdx: 4 }, { value: 51, palette: 3, xDeltaIdx: 6 },
    { value: 54, palette: 3, xDeltaIdx: 32 }, { value: 55, palette: 3, xDeltaIdx: 48 },
    { value: 60, palette: 3, xDeltaIdx: 49 },
  ] },
  { type: 'EXIT' },
];

// PTR_TABLE_5[12] → 0x9E3B — 1 指令
export const LAYOUT_$9E3B: readonly LayoutItem[] = [
  { type: 'ADJUST_ANIM' },
];

// PTR_TABLE_5[13] → 0x9EE9 — 1 指令
export const LAYOUT_$9EE9: readonly LayoutItem[] = [
  { type: 'ADJUST_ANIM' },
];

// PTR_TABLE_5[14] → 0x9F86 — 5 指令
export const LAYOUT_$9F86: readonly LayoutItem[] = [
  { type: 'GROUP', yDeltaIdx: 4, entries: 1, tiles: [
    { value: 253, palette: 2, xDeltaIdx: 5 },
  ] },
  { type: 'GROUP', yDeltaIdx: 5, entries: 2, tiles: [
    { value: 249, palette: 2, xDeltaIdx: 4 }, { value: 252, palette: 2, xDeltaIdx: 5 },
  ] },
  { type: 'GROUP', yDeltaIdx: 6, entries: 5, tiles: [
    { value: 83, palette: 2, xDeltaIdx: 2 }, { value: 86, palette: 2, xDeltaIdx: 3 },
    { value: 251, palette: 2, xDeltaIdx: 4 }, { value: 254, palette: 2, xDeltaIdx: 5 },
    { value: 255, palette: 3, xDeltaIdx: 6 },
  ] },
  { type: 'GROUP', yDeltaIdx: 7, entries: 3, tiles: [
    { value: 88, palette: 2, xDeltaIdx: 1 }, { value: 89, palette: 2, xDeltaIdx: 2 },
    { value: 92, palette: 2, xDeltaIdx: 3 },
  ] },
  { type: 'ADJUST_ANIM' },
];

// ═══════════════════════════════════════════════
// 4. 主查找表: CPU 地址 → LayoutItem[]
// ═══════════════════════════════════════════════
// 用于指针表 → 布局流的直接跳转

const _LAYOUT_ENTRIES: readonly (readonly [number, readonly LayoutItem[]])[] = [
  [0x842C, LAYOUT_$842C],
  [0x8517, LAYOUT_$8517],
  [0x8602, LAYOUT_$8602],
  [0x86EE, LAYOUT_$86EE],
  [0x87D9, LAYOUT_$87D9],
  [0x8840, LAYOUT_$8840],
  [0x889F, LAYOUT_$889F],
  [0x88D4, LAYOUT_$88D4],
  [0x8907, LAYOUT_$8907],
  [0x893A, LAYOUT_$893A],
  [0x896B, LAYOUT_$896B],
  [0x897A, LAYOUT_$897A],
  [0x898D, LAYOUT_$898D],
  [0x899C, LAYOUT_$899C],
  [0x89AF, LAYOUT_$89AF],
  [0x89BC, LAYOUT_$89BC],
  [0x8B3F, LAYOUT_$8B3F],
  [0x8B4E, LAYOUT_$8B4E],
  [0x8B61, LAYOUT_$8B61],
  [0x8B74, LAYOUT_$8B74],
  [0x8B81, LAYOUT_$8B81],
  [0x8D0C, LAYOUT_$8D0C],
  [0x8D1B, LAYOUT_$8D1B],
  [0x8D30, LAYOUT_$8D30],
  [0x8D45, LAYOUT_$8D45],
  [0x8D52, LAYOUT_$8D52],
  [0x8F1D, LAYOUT_$8F1D],
  [0x8F2C, LAYOUT_$8F2C],
  [0x8F41, LAYOUT_$8F41],
  [0x8F56, LAYOUT_$8F56],
  [0x8F63, LAYOUT_$8F63],
  [0x8FE8, LAYOUT_$8FE8],
  [0x91A9, LAYOUT_$91A9],
  [0x91C6, LAYOUT_$91C6],
  [0x91DF, LAYOUT_$91DF],
  [0x91F8, LAYOUT_$91F8],
  [0x9209, LAYOUT_$9209],
  [0x929B, LAYOUT_$929B],
  [0x9398, LAYOUT_$9398],
  [0x93D9, LAYOUT_$93D9],
  [0x9432, LAYOUT_$9432],
  [0x9495, LAYOUT_$9495],
  [0x94E8, LAYOUT_$94E8],
  [0x9505, LAYOUT_$9505],
  [0x9520, LAYOUT_$9520],
  [0x9651, LAYOUT_$9651],
  [0x966E, LAYOUT_$966E],
  [0x968B, LAYOUT_$968B],
  [0x96D8, LAYOUT_$96D8],
  [0x9739, LAYOUT_$9739],
  [0x98E4, LAYOUT_$98E4],
  [0x9901, LAYOUT_$9901],
  [0x991E, LAYOUT_$991E],
  [0x9B2C, LAYOUT_$9B2C],
  [0x9B89, LAYOUT_$9B89],
  [0x9BBA, LAYOUT_$9BBA],
  [0x9BEB, LAYOUT_$9BEB],
  [0x9C1E, LAYOUT_$9C1E],
  [0x9C51, LAYOUT_$9C51],
  [0x9C8C, LAYOUT_$9C8C],
  [0x9CBD, LAYOUT_$9CBD],
  [0x9D0C, LAYOUT_$9D0C],
  [0x9D39, LAYOUT_$9D39],
  [0x9D66, LAYOUT_$9D66],
  [0x9D91, LAYOUT_$9D91],
  [0x9DBC, LAYOUT_$9DBC],
  [0x9E3B, LAYOUT_$9E3B],
  [0x9EE9, LAYOUT_$9EE9],
  [0x9F86, LAYOUT_$9F86],
];

export const LAYOUT_BY_ADDR: ReadonlyMap<number, readonly LayoutItem[]> = new Map(_LAYOUT_ENTRIES);

// ═══════════════════════════════════════════════
// 5. 预解码统计
// ═══════════════════════════════════════════════

/** 已解码的布局入口地址列表 */
export const DECODED_LAYOUT_ADDRS: readonly number[] = Array.from(LAYOUT_BY_ADDR.keys());

/** 指针表总条目数 */
export const POINTER_TABLE_TOTAL_ENTRIES =
  PTR_TABLE_1.length + PTR_TABLE_2.length + PTR_TABLE_3.length +
  PTR_TABLE_4.length + PTR_TABLE_5.length;

// 打印解码覆盖率
console.log(
  `[bank22-data] LayoutItem[] 解码: ${LAYOUT_BY_ADDR.size}/${POINTER_TABLE_TOTAL_ENTRIES} 入口 (` +
  `${(LAYOUT_BY_ADDR.size / POINTER_TABLE_TOTAL_ENTRIES * 100).toFixed(1)}%)`
);
