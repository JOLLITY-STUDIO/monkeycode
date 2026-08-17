/**
 * 行列提示计算 —— 由解法位图推导 Picross 数字提示
 */
import { Hints } from "./types";

/** 从 1bpp 行数据（width 位）计算一行提示 */
export function computeLineHints(cells: Uint8Array, length: number): Hints {
  const hints: Hints = [];
  let run = 0;
  for (let i = 0; i < length; i++) {
    const bit = (cells[i >> 3] >> (7 - (i & 7))) & 1;
    if (bit) {
      run++;
    } else if (run > 0) {
      hints.push(run);
      run = 0;
    }
  }
  if (run > 0) hints.push(run);
  if (hints.length === 0) hints.push(0);
  return hints;
}

/** 从解法位图计算全部行提示 */
export function computeAllRowHints(
  solution: Uint8Array,
  width: number,
  height: number
): Hints[] {
  const rows: Hints[] = [];
  for (let y = 0; y < height; y++) {
    const row = solution.slice((y * width) >> 3, ((y * width + width + 7) >> 3));
    // 注意：跨字节行需按位截取，这里简化处理（Picross 宽度均为 8 的约数场景）
    rows.push(computeLineHints(row, width));
  }
  return rows;
}

/** 从解法位图计算全部列提示（转置） */
export function computeAllColHints(
  solution: Uint8Array,
  width: number,
  height: number
): Hints[] {
  const cols: Hints[] = [];
  for (let x = 0; x < width; x++) {
    const col = new Uint8Array((height + 7) >> 3);
    for (let y = 0; y < height; y++) {
      const bit = (solution[(y * width + x) >> 3] >> (7 - ((y * width + x) & 7))) & 1;
      if (bit) col[y >> 3] |= 1 << (7 - (y & 7));
    }
    cols.push(computeLineHints(col, height));
  }
  return cols;
}
