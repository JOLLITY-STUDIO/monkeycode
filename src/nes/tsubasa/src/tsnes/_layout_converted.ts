/* eslint-disable */
// ═══════════════════════════════════════════════
// 22号Bank布局流-结构化TILE数据
// 由 _convert_layout_data.js 自动生成
// ═══════════════════════════════════════════════

/** 布局流中的 Tile 条目 */
export interface LayoutTile {
  value: number;      // tile 索引
  palette: number;    // 调色板 0-3
  xDeltaIdx: number;  // X 偏移表索引
}

/** 布局流控制指令类型 */
export type LayoutItem =
  | { type: 'GROUP'; yDeltaIdx: number; entries: number; tiles: LayoutTile[] }
  | { type: 'OAM'; count: number; tiles: LayoutTile[] }
  | { type: 'EXIT' }
  | { type: 'ADVANCE_PTR'; ptr: number }
  | { type: 'ADJUST_ANIM' };

// DATA-$841C-$86A0 → 6 个指令, 28 个 TILE
export const LAYOUT_$841C: readonly LayoutItem[] = [
  { type: 'OAM', count: 4, tiles: [
      { value: 0x2D, palette: 1, xDeltaIdx: 47 }, { value: 0xD6, palette: 2, xDeltaIdx: 47 }, { value: 0x4D, palette: 2, xDeltaIdx: 47 },
      { value: 0xF4, palette: 3, xDeltaIdx: 47 }
  ] },
  { type: 'OAM', count: 7, tiles: [
      { value: 0xBF, palette: 2, xDeltaIdx: 26 }, { value: 0xBF, palette: 3, xDeltaIdx: 34 }, { value: 0xBF, palette: 0, xDeltaIdx: 43 },
      { value: 0x45, palette: 3, xDeltaIdx: 0 }, { value: 0x5A, palette: 0, xDeltaIdx: 33 }, { value: 0x71, palette: 0, xDeltaIdx: 33 },
      { value: 0x8A, palette: 0, xDeltaIdx: 33 }
  ] },
  { type: 'OAM', count: 4, tiles: [
      { value: 0x84, palette: 3, xDeltaIdx: 38 }, { value: 0x84, palette: 0, xDeltaIdx: 42 }, { value: 0x84, palette: 3, xDeltaIdx: 46 },
      { value: 0x84, palette: 2, xDeltaIdx: 50 }
  ] },
  { type: 'OAM', count: 7, tiles: [
      { value: 0xF2, palette: 0, xDeltaIdx: 33 }, { value: 0xFD, palette: 0, xDeltaIdx: 33 }, { value: 0x0C, palette: 0, xDeltaIdx: 33 },
      { value: 0x10, palette: 1, xDeltaIdx: 33 }, { value: 0x0C, palette: 1, xDeltaIdx: 0 }, { value: 0x10, palette: 0, xDeltaIdx: 10 },
      { value: 0x14, palette: 1, xDeltaIdx: 10 }
  ] },
  { type: 'OAM', count: 6, tiles: [
      { value: 0x02, palette: 0, xDeltaIdx: 2 }, { value: 0x2A, palette: 0, xDeltaIdx: 3 }, { value: 0x2B, palette: 0, xDeltaIdx: 4 },
      { value: 0x00, palette: 0, xDeltaIdx: 2 }, { value: 0x2C, palette: 0, xDeltaIdx: 3 }, { value: 0x2D, palette: 0, xDeltaIdx: 4 }
  ] },
  { type: 'EXIT' }
];

/** LAYOUT_$841C 的纯 tile 值序列 (可直接搜索) */
export const LAYOUT_$841C_TILES: readonly number[] = [
  0x2D, 0xD6, 0x4D, 0xF4, 0xBF, 0xBF, 0xBF, 0x45, 0x5A, 0x71, 0x8A, 0x84, 0x84, 0x84, 0x84, 0xF2, 
  0xFD, 0x0C, 0x10, 0x0C, 0x10, 0x14, 0x02, 0x2A, 0x2B, 0x00, 0x2C, 0x2D, 
];

// DATA-$86A1-$89AE → 4 个指令, 7 个 TILE
export const LAYOUT_$86A1: readonly LayoutItem[] = [
  { type: 'GROUP', yDeltaIdx: 0, entries: 2, tiles: [
      { value: 0x72, palette: 0, xDeltaIdx: 13 }, { value: 0x73, palette: 0, xDeltaIdx: 14 }
  ] },
  { type: 'GROUP', yDeltaIdx: 1, entries: 3, tiles: [
      { value: 0x78, palette: 0, xDeltaIdx: 13 }, { value: 0x79, palette: 0, xDeltaIdx: 14 }, { value: 0x6C, palette: 0, xDeltaIdx: 15 }
  ] },
  { type: 'GROUP', yDeltaIdx: 2, entries: 2, tiles: [
      { value: 0x7A, palette: 0, xDeltaIdx: 13 }, { value: 0x7B, palette: 0, xDeltaIdx: 14 }
  ] },
  { type: 'EXIT' }
];

/** LAYOUT_$86A1 的纯 tile 值序列 (可直接搜索) */
export const LAYOUT_$86A1_TILES: readonly number[] = [
  0x72, 0x73, 0x78, 0x79, 0x6C, 0x7A, 0x7B, 
];

// DATA-$89AF-$89BB → 3 个指令, 4 个 TILE
export const LAYOUT_$89AF: readonly LayoutItem[] = [
  { type: 'GROUP', yDeltaIdx: 3, entries: 2, tiles: [
      { value: 0x5C, palette: 3, xDeltaIdx: 3 }, { value: 0x5D, palette: 3, xDeltaIdx: 4 }
  ] },
  { type: 'GROUP', yDeltaIdx: 4, entries: 2, tiles: [
      { value: 0x5E, palette: 3, xDeltaIdx: 3 }, { value: 0x5F, palette: 3, xDeltaIdx: 4 }
  ] },
  { type: 'EXIT' }
];

/** LAYOUT_$89AF 的纯 tile 值序列 (可直接搜索) */
export const LAYOUT_$89AF_TILES: readonly number[] = [
  0x5C, 0x5D, 0x5E, 0x5F, 
];

// DATA-$89BC-$8F1C → 1 个指令, 0 个 TILE
export const LAYOUT_$89BC: readonly LayoutItem[] = [
  { type: 'ADJUST_ANIM' }
];

// DATA-$8F1D-$8F2B → 3 个指令, 4 个 TILE
export const LAYOUT_$8F1D: readonly LayoutItem[] = [
  { type: 'GROUP', yDeltaIdx: 1, entries: 2, tiles: [
      { value: 0x51, palette: 3, xDeltaIdx: 20 }, { value: 0x54, palette: 3, xDeltaIdx: 21 }
  ] },
  { type: 'GROUP', yDeltaIdx: 2, entries: 2, tiles: [
      { value: 0x53, palette: 3, xDeltaIdx: 20 }, { value: 0x56, palette: 3, xDeltaIdx: 21 }
  ] },
  { type: 'ADVANCE_PTR', ptr: 0x8D52 }
];

/** LAYOUT_$8F1D 的纯 tile 值序列 (可直接搜索) */
export const LAYOUT_$8F1D_TILES: readonly number[] = [
  0x51, 0x54, 0x53, 0x56, 
];

// DATA-$8F2C-$8F40 → 4 个指令, 6 个 TILE
export const LAYOUT_$8F2C: readonly LayoutItem[] = [
  { type: 'GROUP', yDeltaIdx: 0, entries: 1, tiles: [
      { value: 0xC5, palette: 3, xDeltaIdx: 21 }
  ] },
  { type: 'GROUP', yDeltaIdx: 1, entries: 3, tiles: [
      { value: 0x51, palette: 3, xDeltaIdx: 20 }, { value: 0xD0, palette: 3, xDeltaIdx: 21 }, { value: 0xD2, palette: 3, xDeltaIdx: 16 }
  ] },
  { type: 'GROUP', yDeltaIdx: 2, entries: 2, tiles: [
      { value: 0x53, palette: 3, xDeltaIdx: 20 }, { value: 0x56, palette: 3, xDeltaIdx: 21 }
  ] },
  { type: 'ADVANCE_PTR', ptr: 0x8D52 }
];

/** LAYOUT_$8F2C 的纯 tile 值序列 (可直接搜索) */
export const LAYOUT_$8F2C_TILES: readonly number[] = [
  0xC5, 0x51, 0xD0, 0xD2, 0x53, 0x56, 
];

// DATA-$8F41-$8F55 → 4 个指令, 6 个 TILE
export const LAYOUT_$8F41: readonly LayoutItem[] = [
  { type: 'GROUP', yDeltaIdx: 0, entries: 1, tiles: [
      { value: 0xD1, palette: 3, xDeltaIdx: 21 }
  ] },
  { type: 'GROUP', yDeltaIdx: 1, entries: 3, tiles: [
      { value: 0x51, palette: 3, xDeltaIdx: 20 }, { value: 0xD3, palette: 3, xDeltaIdx: 21 }, { value: 0xD4, palette: 3, xDeltaIdx: 16 }
  ] },
  { type: 'GROUP', yDeltaIdx: 2, entries: 2, tiles: [
      { value: 0x53, palette: 3, xDeltaIdx: 20 }, { value: 0x56, palette: 3, xDeltaIdx: 21 }
  ] },
  { type: 'ADVANCE_PTR', ptr: 0x8D52 }
];

/** LAYOUT_$8F41 的纯 tile 值序列 (可直接搜索) */
export const LAYOUT_$8F41_TILES: readonly number[] = [
  0xD1, 0x51, 0xD3, 0xD4, 0x53, 0x56, 
];

// DATA-$8F56-$9542 → 3 个指令, 4 个 TILE
export const LAYOUT_$8F56: readonly LayoutItem[] = [
  { type: 'GROUP', yDeltaIdx: 3, entries: 2, tiles: [
      { value: 0x51, palette: 3, xDeltaIdx: 3 }, { value: 0x54, palette: 3, xDeltaIdx: 4 }
  ] },
  { type: 'GROUP', yDeltaIdx: 4, entries: 2, tiles: [
      { value: 0x53, palette: 3, xDeltaIdx: 3 }, { value: 0x56, palette: 3, xDeltaIdx: 4 }
  ] },
  { type: 'EXIT' }
];

/** LAYOUT_$8F56 的纯 tile 值序列 (可直接搜索) */
export const LAYOUT_$8F56_TILES: readonly number[] = [
  0x51, 0x54, 0x53, 0x56, 
];

// DATA-$9543-$95C1 → 16 个指令, 48 个 TILE
export const LAYOUT_$9543: readonly LayoutItem[] = [
  { type: 'GROUP', yDeltaIdx: 2, entries: 2, tiles: [
      { value: 0x07, palette: 0, xDeltaIdx: 51 }, { value: 0x12, palette: 0, xDeltaIdx: 52 }
  ] },
  { type: 'GROUP', yDeltaIdx: 3, entries: 3, tiles: [
      { value: 0x0C, palette: 0, xDeltaIdx: 50 }, { value: 0x0D, palette: 0, xDeltaIdx: 51 }, { value: 0x18, palette: 0, xDeltaIdx: 52 }
  ] },
  { type: 'GROUP', yDeltaIdx: 4, entries: 2, tiles: [
      { value: 0x0F, palette: 3, xDeltaIdx: 51 }, { value: 0x1A, palette: 0, xDeltaIdx: 52 }
  ] },
  { type: 'GROUP', yDeltaIdx: 2, entries: 2, tiles: [
      { value: 0x40, palette: 1, xDeltaIdx: 50 }, { value: 0x41, palette: 1, xDeltaIdx: 51 }
  ] },
  { type: 'GROUP', yDeltaIdx: 3, entries: 1, tiles: [
      { value: 0x42, palette: 1, xDeltaIdx: 50 }
  ] },
  { type: 'GROUP', yDeltaIdx: 4, entries: 2, tiles: [
      { value: 0x51, palette: 1, xDeltaIdx: 52 }, { value: 0x54, palette: 1, xDeltaIdx: 53 }
  ] },
  { type: 'GROUP', yDeltaIdx: 0, entries: 2, tiles: [
      { value: 0x66, palette: 3, xDeltaIdx: 48 }, { value: 0x67, palette: 2, xDeltaIdx: 49 }
  ] },
  { type: 'GROUP', yDeltaIdx: 1, entries: 2, tiles: [
      { value: 0x6D, palette: 3, xDeltaIdx: 49 }, { value: 0x78, palette: 3, xDeltaIdx: 50 }
  ] },
  { type: 'GROUP', yDeltaIdx: 2, entries: 1, tiles: [
      { value: 0x6F, palette: 3, xDeltaIdx: 49 }
  ] },
  { type: 'GROUP', yDeltaIdx: 4, entries: 4, tiles: [
      { value: 0x44, palette: 2, xDeltaIdx: 49 }, { value: 0x45, palette: 1, xDeltaIdx: 50 }, { value: 0x50, palette: 1, xDeltaIdx: 51 },
      { value: 0x55, palette: 3, xDeltaIdx: 54 }
  ] },
  { type: 'GROUP', yDeltaIdx: 5, entries: 8, tiles: [
      { value: 0x43, palette: 3, xDeltaIdx: 48 }, { value: 0x46, palette: 2, xDeltaIdx: 49 }, { value: 0x47, palette: 1, xDeltaIdx: 50 },
      { value: 0x50, palette: 2, xDeltaIdx: 50 }, { value: 0x52, palette: 1, xDeltaIdx: 51 }, { value: 0x53, palette: 1, xDeltaIdx: 52 },
      { value: 0x56, palette: 3, xDeltaIdx: 53 }, { value: 0x57, palette: 3, xDeltaIdx: 54 }
  ] },
  { type: 'GROUP', yDeltaIdx: 6, entries: 7, tiles: [
      { value: 0x1D, palette: 1, xDeltaIdx: 6 }, { value: 0x48, palette: 1, xDeltaIdx: 32 }, { value: 0x49, palette: 3, xDeltaIdx: 48 },
      { value: 0x4C, palette: 3, xDeltaIdx: 49 }, { value: 0x4D, palette: 2, xDeltaIdx: 50 }, { value: 0x58, palette: 2, xDeltaIdx: 51 },
      { value: 0x59, palette: 2, xDeltaIdx: 52 }
  ] },
  { type: 'GROUP', yDeltaIdx: 7, entries: 5, tiles: [
      { value: 0x61, palette: 1, xDeltaIdx: 5 }, { value: 0x1F, palette: 1, xDeltaIdx: 6 }, { value: 0x4A, palette: 1, xDeltaIdx: 32 },
      { value: 0x4F, palette: 3, xDeltaIdx: 50 }, { value: 0x5A, palette: 3, xDeltaIdx: 51 }
  ] },
  { type: 'GROUP', yDeltaIdx: 8, entries: 5, tiles: [
      { value: 0x37, palette: 3, xDeltaIdx: 3 }, { value: 0x62, palette: 3, xDeltaIdx: 4 }, { value: 0x63, palette: 1, xDeltaIdx: 5 },
      { value: 0x35, palette: 1, xDeltaIdx: 6 }, { value: 0x65, palette: 3, xDeltaIdx: 50 }
  ] },
  { type: 'GROUP', yDeltaIdx: 9, entries: 2, tiles: [
      { value: 0x3D, palette: 3, xDeltaIdx: 3 }, { value: 0x68, palette: 3, xDeltaIdx: 4 }
  ] },
  { type: 'EXIT' }
];

/** LAYOUT_$9543 的纯 tile 值序列 (可直接搜索) */
export const LAYOUT_$9543_TILES: readonly number[] = [
  0x07, 0x12, 0x0C, 0x0D, 0x18, 0x0F, 0x1A, 0x40, 0x41, 0x42, 0x51, 0x54, 0x66, 0x67, 0x6D, 0x78, 
  0x6F, 0x44, 0x45, 0x50, 0x55, 0x43, 0x46, 0x47, 0x50, 0x52, 0x53, 0x56, 0x57, 0x1D, 0x48, 0x49, 
  0x4C, 0x4D, 0x58, 0x59, 0x61, 0x1F, 0x4A, 0x4F, 0x5A, 0x37, 0x62, 0x63, 0x35, 0x65, 0x3D, 0x68, 
];

// DATA-$95C2-$95E0 → 5 个指令, 10 个 TILE
export const LAYOUT_$95C2: readonly LayoutItem[] = [
  { type: 'GROUP', yDeltaIdx: 1, entries: 1, tiles: [
      { value: 0x10, palette: 0, xDeltaIdx: 53 }
  ] },
  { type: 'GROUP', yDeltaIdx: 2, entries: 3, tiles: [
      { value: 0x11, palette: 0, xDeltaIdx: 51 }, { value: 0x14, palette: 0, xDeltaIdx: 52 }, { value: 0x15, palette: 0, xDeltaIdx: 53 }
  ] },
  { type: 'GROUP', yDeltaIdx: 3, entries: 4, tiles: [
      { value: 0x0C, palette: 0, xDeltaIdx: 50 }, { value: 0x13, palette: 0, xDeltaIdx: 51 }, { value: 0x16, palette: 0, xDeltaIdx: 52 },
      { value: 0x17, palette: 0, xDeltaIdx: 53 }
  ] },
  { type: 'GROUP', yDeltaIdx: 4, entries: 2, tiles: [
      { value: 0x19, palette: 3, xDeltaIdx: 51 }, { value: 0x1C, palette: 0, xDeltaIdx: 52 }
  ] },
  { type: 'ADVANCE_PTR', ptr: 0x9557 }
];

/** LAYOUT_$95C2 的纯 tile 值序列 (可直接搜索) */
export const LAYOUT_$95C2_TILES: readonly number[] = [
  0x10, 0x11, 0x14, 0x15, 0x0C, 0x13, 0x16, 0x17, 0x19, 0x1C, 
];

// DATA-$95E1-$9612 → 8 个指令, 16 个 TILE
export const LAYOUT_$95E1: readonly LayoutItem[] = [
  { type: 'GROUP', yDeltaIdx: 2, entries: 2, tiles: [
      { value: 0x20, palette: 0, xDeltaIdx: 51 }, { value: 0x21, palette: 0, xDeltaIdx: 52 }
  ] },
  { type: 'GROUP', yDeltaIdx: 3, entries: 4, tiles: [
      { value: 0x0E, palette: 0, xDeltaIdx: 50 }, { value: 0x22, palette: 0, xDeltaIdx: 51 }, { value: 0x23, palette: 0, xDeltaIdx: 52 },
      { value: 0x26, palette: 0, xDeltaIdx: 53 }
  ] },
  { type: 'GROUP', yDeltaIdx: 4, entries: 2, tiles: [
      { value: 0x0F, palette: 3, xDeltaIdx: 51 }, { value: 0x1A, palette: 0, xDeltaIdx: 52 }
  ] },
  { type: 'ADVANCE_PTR', ptr: 0x9557 },
  { type: 'GROUP', yDeltaIdx: 2, entries: 2, tiles: [
      { value: 0x20, palette: 0, xDeltaIdx: 51 }, { value: 0x21, palette: 0, xDeltaIdx: 52 }
  ] },
  { type: 'GROUP', yDeltaIdx: 3, entries: 4, tiles: [
      { value: 0x0E, palette: 0, xDeltaIdx: 50 }, { value: 0x29, palette: 0, xDeltaIdx: 51 }, { value: 0x23, palette: 0, xDeltaIdx: 52 },
      { value: 0x26, palette: 0, xDeltaIdx: 53 }
  ] },
  { type: 'GROUP', yDeltaIdx: 4, entries: 2, tiles: [
      { value: 0x2B, palette: 3, xDeltaIdx: 51 }, { value: 0x1A, palette: 0, xDeltaIdx: 52 }
  ] },
  { type: 'ADVANCE_PTR', ptr: 0x9557 }
];

/** LAYOUT_$95E1 的纯 tile 值序列 (可直接搜索) */
export const LAYOUT_$95E1_TILES: readonly number[] = [
  0x20, 0x21, 0x0E, 0x22, 0x23, 0x26, 0x0F, 0x1A, 0x20, 0x21, 0x0E, 0x29, 0x23, 0x26, 0x2B, 0x1A, 
];

// DATA-$9613-$9627 → 4 个指令, 6 个 TILE
export const LAYOUT_$9613: readonly LayoutItem[] = [
  { type: 'GROUP', yDeltaIdx: 2, entries: 1, tiles: [
      { value: 0x3A, palette: 0, xDeltaIdx: 51 }
  ] },
  { type: 'GROUP', yDeltaIdx: 3, entries: 3, tiles: [
      { value: 0x38, palette: 0, xDeltaIdx: 50 }, { value: 0x2C, palette: 0, xDeltaIdx: 51 }, { value: 0x2D, palette: 0, xDeltaIdx: 52 }
  ] },
  { type: 'GROUP', yDeltaIdx: 4, entries: 2, tiles: [
      { value: 0x2E, palette: 3, xDeltaIdx: 51 }, { value: 0x2F, palette: 0, xDeltaIdx: 52 }
  ] },
  { type: 'ADVANCE_PTR', ptr: 0x9557 }
];

/** LAYOUT_$9613 的纯 tile 值序列 (可直接搜索) */
export const LAYOUT_$9613_TILES: readonly number[] = [
  0x3A, 0x38, 0x2C, 0x2D, 0x2E, 0x2F, 
];

// DATA-$9628-$9650 → 7 个指令, 13 个 TILE
export const LAYOUT_$9628: readonly LayoutItem[] = [
  { type: 'GROUP', yDeltaIdx: 2, entries: 3, tiles: [
      { value: 0x5E, palette: 0, xDeltaIdx: 50 }, { value: 0x5F, palette: 0, xDeltaIdx: 51 }, { value: 0x12, palette: 0, xDeltaIdx: 52 }
  ] },
  { type: 'GROUP', yDeltaIdx: 3, entries: 3, tiles: [
      { value: 0x74, palette: 0, xDeltaIdx: 50 }, { value: 0x70, palette: 0, xDeltaIdx: 51 }, { value: 0x71, palette: 0, xDeltaIdx: 52 }
  ] },
  { type: 'GROUP', yDeltaIdx: 4, entries: 2, tiles: [
      { value: 0x72, palette: 3, xDeltaIdx: 51 }, { value: 0x73, palette: 0, xDeltaIdx: 52 }
  ] },
  { type: 'GROUP', yDeltaIdx: 2, entries: 2, tiles: [
      { value: 0x4B, palette: 1, xDeltaIdx: 50 }, { value: 0x4E, palette: 1, xDeltaIdx: 51 }
  ] },
  { type: 'GROUP', yDeltaIdx: 3, entries: 1, tiles: [
      { value: 0x60, palette: 1, xDeltaIdx: 50 }
  ] },
  { type: 'GROUP', yDeltaIdx: 4, entries: 2, tiles: [
      { value: 0x5C, palette: 1, xDeltaIdx: 52 }, { value: 0x5D, palette: 1, xDeltaIdx: 53 }
  ] },
  { type: 'ADVANCE_PTR', ptr: 0x9567 }
];

/** LAYOUT_$9628 的纯 tile 值序列 (可直接搜索) */
export const LAYOUT_$9628_TILES: readonly number[] = [
  0x5E, 0x5F, 0x12, 0x74, 0x70, 0x71, 0x72, 0x73, 0x4B, 0x4E, 0x60, 0x5C, 0x5D, 
];

// DATA-$9651-$968A → 10 个指令, 18 个 TILE
export const LAYOUT_$9651: readonly LayoutItem[] = [
  { type: 'GROUP', yDeltaIdx: 9, entries: 1, tiles: [
      { value: 0x69, palette: 3, xDeltaIdx: 5 }
  ] },
  { type: 'GROUP', yDeltaIdx: 22, entries: 2, tiles: [
      { value: 0x3F, palette: 3, xDeltaIdx: 3 }, { value: 0x6A, palette: 3, xDeltaIdx: 4 }
  ] },
  { type: 'GROUP', yDeltaIdx: 9, entries: 2, tiles: [
      { value: 0x7D, palette: 3, xDeltaIdx: 2 }, { value: 0x6C, palette: 3, xDeltaIdx: 5 }
  ] },
  { type: 'GROUP', yDeltaIdx: 22, entries: 4, tiles: [
      { value: 0xBE, palette: 3, xDeltaIdx: 2 }, { value: 0xBF, palette: 3, xDeltaIdx: 3 }, { value: 0x6B, palette: 3, xDeltaIdx: 4 },
      { value: 0x6E, palette: 3, xDeltaIdx: 5 }
  ] },
  { type: 'ADVANCE_PTR', ptr: 0x952A },
  { type: 'GROUP', yDeltaIdx: 9, entries: 1, tiles: [
      { value: 0x69, palette: 3, xDeltaIdx: 5 }
  ] },
  { type: 'GROUP', yDeltaIdx: 22, entries: 2, tiles: [
      { value: 0x3F, palette: 3, xDeltaIdx: 3 }, { value: 0x6A, palette: 3, xDeltaIdx: 4 }
  ] },
  { type: 'GROUP', yDeltaIdx: 9, entries: 2, tiles: [
      { value: 0x7C, palette: 3, xDeltaIdx: 2 }, { value: 0x79, palette: 3, xDeltaIdx: 5 }
  ] },
  { type: 'GROUP', yDeltaIdx: 22, entries: 4, tiles: [
      { value: 0x7E, palette: 3, xDeltaIdx: 2 }, { value: 0x7F, palette: 3, xDeltaIdx: 3 }, { value: 0x7A, palette: 3, xDeltaIdx: 4 },
      { value: 0x7B, palette: 3, xDeltaIdx: 5 }
  ] },
  { type: 'ADVANCE_PTR', ptr: 0x952A }
];

/** LAYOUT_$9651 的纯 tile 值序列 (可直接搜索) */
export const LAYOUT_$9651_TILES: readonly number[] = [
  0x69, 0x3F, 0x6A, 0x7D, 0x6C, 0xBE, 0xBF, 0x6B, 0x6E, 0x69, 0x3F, 0x6A, 0x7C, 0x79, 0x7E, 0x7F, 
  0x7A, 0x7B, 
];

// DATA-$968B-$9742 → 9 个指令, 30 个 TILE
export const LAYOUT_$968B: readonly LayoutItem[] = [
  { type: 'GROUP', yDeltaIdx: 0, entries: 2, tiles: [
      { value: 0x2E, palette: 3, xDeltaIdx: 22 }, { value: 0x2F, palette: 3, xDeltaIdx: 23 }
  ] },
  { type: 'GROUP', yDeltaIdx: 1, entries: 4, tiles: [
      { value: 0x30, palette: 1, xDeltaIdx: 2 }, { value: 0x31, palette: 3, xDeltaIdx: 3 }, { value: 0x46, palette: 1, xDeltaIdx: 3 },
      { value: 0x40, palette: 1, xDeltaIdx: 4 }
  ] },
  { type: 'GROUP', yDeltaIdx: 2, entries: 5, tiles: [
      { value: 0x32, palette: 3, xDeltaIdx: 2 }, { value: 0x44, palette: 2, xDeltaIdx: 2 }, { value: 0x33, palette: 1, xDeltaIdx: 3 },
      { value: 0x02, palette: 3, xDeltaIdx: 3 }, { value: 0x42, palette: 2, xDeltaIdx: 4 }
  ] },
  { type: 'GROUP', yDeltaIdx: 3, entries: 6, tiles: [
      { value: 0x2D, palette: 0, xDeltaIdx: 1 }, { value: 0x38, palette: 0, xDeltaIdx: 2 }, { value: 0x39, palette: 0, xDeltaIdx: 3 },
      { value: 0x41, palette: 0, xDeltaIdx: 4 }, { value: 0x02, palette: 3, xDeltaIdx: 16 }, { value: 0x02, palette: 3, xDeltaIdx: 17 }
  ] },
  { type: 'GROUP', yDeltaIdx: 4, entries: 3, tiles: [
      { value: 0x3A, palette: 0, xDeltaIdx: 2 }, { value: 0x3B, palette: 0, xDeltaIdx: 3 }, { value: 0x43, palette: 0, xDeltaIdx: 4 }
  ] },
  { type: 'GROUP', yDeltaIdx: 5, entries: 3, tiles: [
      { value: 0x34, palette: 1, xDeltaIdx: 2 }, { value: 0x35, palette: 1, xDeltaIdx: 3 }, { value: 0x37, palette: 1, xDeltaIdx: 4 }
  ] },
  { type: 'GROUP', yDeltaIdx: 6, entries: 2, tiles: [
      { value: 0x36, palette: 1, xDeltaIdx: 2 }, { value: 0x3D, palette: 1, xDeltaIdx: 12 }
  ] },
  { type: 'GROUP', yDeltaIdx: 7, entries: 5, tiles: [
      { value: 0x3E, palette: 3, xDeltaIdx: 1 }, { value: 0x3F, palette: 3, xDeltaIdx: 2 }, { value: 0x45, palette: 1, xDeltaIdx: 2 },
      { value: 0x3C, palette: 3, xDeltaIdx: 4 }, { value: 0x45, palette: 1, xDeltaIdx: 47 }
  ] },
  { type: 'EXIT' }
];

/** LAYOUT_$968B 的纯 tile 值序列 (可直接搜索) */
export const LAYOUT_$968B_TILES: readonly number[] = [
  0x2E, 0x2F, 0x30, 0x31, 0x46, 0x40, 0x32, 0x44, 0x33, 0x02, 0x42, 0x2D, 0x38, 0x39, 0x41, 0x02, 
  0x02, 0x3A, 0x3B, 0x43, 0x34, 0x35, 0x37, 0x36, 0x3D, 0x3E, 0x3F, 0x45, 0x3C, 0x45, 
];

// DATA-$9743-$9B2B → 3 个指令, 4 个 TILE
export const LAYOUT_$9743: readonly LayoutItem[] = [
  { type: 'GROUP', yDeltaIdx: 8, entries: 2, tiles: [
      { value: 0x37, palette: 3, xDeltaIdx: 40 }, { value: 0x62, palette: 3, xDeltaIdx: 45 }
  ] },
  { type: 'GROUP', yDeltaIdx: 9, entries: 2, tiles: [
      { value: 0x3D, palette: 3, xDeltaIdx: 40 }, { value: 0x68, palette: 3, xDeltaIdx: 45 }
  ] },
  { type: 'ADJUST_ANIM' }
];

/** LAYOUT_$9743 的纯 tile 值序列 (可直接搜索) */
export const LAYOUT_$9743_TILES: readonly number[] = [
  0x37, 0x62, 0x3D, 0x68, 
];

// DATA-$9B2C-$9B46 → 1 个指令, 0 个 TILE
export const LAYOUT_$9B2C: readonly LayoutItem[] = [
  { type: 'ADJUST_ANIM' }
];

// DATA-$9B47-$9B6F → 6 个指令, 14 个 TILE
export const LAYOUT_$9B47: readonly LayoutItem[] = [
  { type: 'GROUP', yDeltaIdx: 5, entries: 4, tiles: [
      { value: 0x5A, palette: 2, xDeltaIdx: 1 }, { value: 0x5B, palette: 1, xDeltaIdx: 2 }, { value: 0x02, palette: 2, xDeltaIdx: 2 },
      { value: 0x5E, palette: 1, xDeltaIdx: 3 }
  ] },
  { type: 'GROUP', yDeltaIdx: 6, entries: 5, tiles: [
      { value: 0x5F, palette: 3, xDeltaIdx: 0 }, { value: 0x70, palette: 3, xDeltaIdx: 1 }, { value: 0x71, palette: 3, xDeltaIdx: 2 },
      { value: 0x74, palette: 3, xDeltaIdx: 3 }, { value: 0x77, palette: 2, xDeltaIdx: 3 }
  ] },
  { type: 'GROUP', yDeltaIdx: 7, entries: 1, tiles: [
      { value: 0x73, palette: 3, xDeltaIdx: 2 }
  ] },
  { type: 'GROUP', yDeltaIdx: 8, entries: 1, tiles: [
      { value: 0x79, palette: 3, xDeltaIdx: 2 }
  ] },
  { type: 'ADVANCE_PTR', ptr: 0x9973 },
  { type: 'GROUP', yDeltaIdx: 7, entries: 3, tiles: [
      { value: 0xA0, palette: 3, xDeltaIdx: 1 }, { value: 0xA1, palette: 3, xDeltaIdx: 2 }, { value: 0xA4, palette: 3, xDeltaIdx: 3 }
  ] }
];

/** LAYOUT_$9B47 的纯 tile 值序列 (可直接搜索) */
export const LAYOUT_$9B47_TILES: readonly number[] = [
  0x5A, 0x5B, 0x02, 0x5E, 0x5F, 0x70, 0x71, 0x74, 0x77, 0x73, 0x79, 0xA0, 0xA1, 0xA4, 
];

// DATA-$9B70-$9FFF → 4 个指令, 9 个 TILE
export const LAYOUT_$9B70: readonly LayoutItem[] = [
  { type: 'GROUP', yDeltaIdx: 5, entries: 4, tiles: [
      { value: 0x63, palette: 2, xDeltaIdx: 1 }, { value: 0x89, palette: 1, xDeltaIdx: 2 }, { value: 0x02, palette: 2, xDeltaIdx: 2 },
      { value: 0x8C, palette: 1, xDeltaIdx: 3 }
  ] },
  { type: 'GROUP', yDeltaIdx: 6, entries: 5, tiles: [
      { value: 0x8A, palette: 3, xDeltaIdx: 1 }, { value: 0x88, palette: 2, xDeltaIdx: 1 }, { value: 0x8B, palette: 3, xDeltaIdx: 2 },
      { value: 0x8E, palette: 3, xDeltaIdx: 3 }, { value: 0x02, palette: 2, xDeltaIdx: 3 }
  ] },
  { type: 'ADVANCE_PTR', ptr: 0x9973 },
  { type: 'ADJUST_ANIM' }
];

/** LAYOUT_$9B70 的纯 tile 值序列 (可直接搜索) */
export const LAYOUT_$9B70_TILES: readonly number[] = [
  0x63, 0x89, 0x02, 0x8C, 0x8A, 0x88, 0x8B, 0x8E, 0x02, 
];

