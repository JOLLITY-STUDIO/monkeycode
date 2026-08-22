/**
 * Bank30Tables — bank30 辅助数据表 ($C000-$DFFF)
 * @bank 30
 *
 * $FBCC 调色板表: 16 组 × 16 字节。消费方: GameSystemService.subC530 ($C530→$CC02)
 * 源地址 = $FBCC + A*8 (A = 调色板组索引), 拷贝到 $046F+X (X = 目标调色板偏移)。
 * 语义: 每 4 字节的第 0 字节 (X&3==0) 固定写 $0F (透明黑), 其余读表。
 */

/** $FBCC 调色板表 (16 组 × 16 字节) */
export const PALETTE_TABLE_FBCC: readonly number[] = [
  // 组 0 (...)
  ,
  // 组 1 (...)
  ,
  // 组 2 (...)
  ,
  // 组 3 (...)
  ,
  // 组 4 (...)
  ,
  // 组 5 (...)
  ,
  // 组 6 (...)
  ,
  // 组 7 (...)
  ,
  // 组 8 (...)
  ,
  // 组 9 (...)
  ,
  // 组 10 (...)
  ,
  // 组 11 (...)
  ,
  // 组 12 (...)
  ,
  // 组 13 (...)
  ,
  // 组 14 (...)
  ,
  // 组 15 (...)
  ,
];

/** 按组索引取 16 字节调色板 */
export function getPaletteTableFBCC(group: number): readonly number[] {
  const g = group & 0x0f;
  return PALETTE_TABLE_FBCC.slice(g * 16, g * 16 + 16);
}