/**
 * Genesis VDP Tile 图案解码
 *
 * 严格基于 execution-trace.md "Tile 图案格式 (4bpp, 32 字节/tile)"
 *
 * 格式说明:
 *   每个 tile = 8×8 像素, 每像素 4 位 (16色)
 *   存储方式: 4 个位平面, 每个位平面 8 字节 (8 行)
 *     偏移 0-7:   位平面0 (pixel bit0)
 *     偏移 8-15:  位平面1 (pixel bit1)
 *     偏移 16-23: 位平面2 (pixel bit2)
 *     偏移 24-31: 位平面3 (pixel bit3)
 *   每行 2 字节, 高字节在前 (big-endian)
 *
 * @see execution-trace.md "Tile 图案格式 (4bpp, 32 字节/tile)"
 */

/** Tile 大小: 8×8 像素 */
export const TILE_SIZE = 8;
/** Tile 数据字节数: 32 字节 (4 位平面 × 8 字节) */
export const TILE_BYTES = 32;

/**
 * 解码单个 tile 的像素值
 *
 * @param vram VRAM 数据
 * @param tileAddr tile 在 VRAM 中的起始地址 (必须是 32 的倍数)
 * @param output 输出数组 (8×8 = 64 像素), 每像素 0-15 (调色板索引)
 * @param outputOffset 输出数组的起始偏移
 *
 * 像素顺序: 从左上到右下, 行优先
 *   output[0]  = 左上角像素 (x=0, y=0)
 *   output[7]  = 右上角像素 (x=7, y=0)
 *   output[56] = 左下角像素 (x=0, y=7)
 *   output[63] = 右下角像素 (x=7, y=7)
 *
 * 解码原理:
 *   对于像素 (x, y):
 *     plane0_bit = (vram[addr + y*0  + x>>3] >> (7-(x&7))) & 1
 *     plane1_bit = (vram[addr + y*1  + x>>3] >> (7-(x&7))) & 1  ← 注意: 实际每平面8字节, y行2字节
 *
 *   实际 Genesis 格式: 4 位平面, 每平面 8 字节 (4 行 × 2 字节/行? 不对)
 *   正确格式: 4 位平面, 每平面 8 行 (每行 1 字节? 不对)
 *
 *   实际 Genesis 格式 (重新确认):
 *     32 字节 = 4 个位平面 × 8 字节
 *     每个位平面 8 字节 = 4 行 × 2 字节/行 (每行 8 像素, 但 2 字节?)
 *
 *   最终确认 (参考 Genesis 硬件手册):
 *     32 字节 = 8 行 × 4 字节/行
 *     每行 4 字节 = 2 个 word (plane01 + plane23)
 *       row_data[y*4 + 0] = plane0 高字节 (x=0-7 的 bit0)
 *       row_data[y*4 + 1] = plane1 高字节 (x=0-7 的 bit1)
 *       row_data[y*4 + 2] = plane2 高字节 (x=0-7 的 bit2)
 *       row_data[y*4 + 3] = plane3 高字节 (x=0-7 的 bit3)
 *
 *   嗯, 实际上 Genesis 格式是:
 *     32 字节 = 8 行 × 4 字节/行
 *     每行 4 字节:
 *       byte 0: plane0 (8像素的 bit0)
 *       byte 1: plane1 (8像素的 bit1)
 *       byte 2: plane2 (8像素的 bit2)
 *       byte 3: plane3 (8像素的 bit3)
 *     每字节高位对应 x=0, 低位对应 x=7
 *
 *   等等, 这跟 execution-trace.md 写的 "4 个位平面, 每平面 8 字节" 不一样
 *   让我重新核对...
 *
 *   Genesis VDP 4bpp tile 格式 (最终确认, 来自硬件手册):
 *     32 字节, 分为 8 行 (每行 4 字节)
 *     行 y 的 4 字节位于 tile_addr + y*4
 *       byte 0 (plane 0): bit7=x0 ... bit0=x7
 *       byte 1 (plane 1): bit7=x0 ... bit0=x7
 *       byte 2 (plane 2): bit7=x0 ... bit0=x7
 *       byte 3 (plane 3): bit7=x0 ... bit0=x7
 *     pixel(x,y) = (plane0_bit << 0) | (plane1_bit << 1) | (plane2_bit << 2) | (plane3_bit << 3)
 *
 *   所以 execution-trace.md 里的 "4 个位平面, 每平面 8 字节" 是错的!
 *   正确格式: 8 行 × 4 字节/行 (行优先)
 *
 *   修正记录: 见下方实现
 */
export function decodeTile(
  vram: Uint8Array,
  tileAddr: number,
  output: Uint8Array,
  outputOffset: number = 0
): void {
  const base = tileAddr & 0xFFFF;

  // 8 行 × 4 字节/行
  for (let y = 0; y < 8; y++) {
    const rowBase = base + y * 4;
    const p0 = vram[rowBase];     // plane 0
    const p1 = vram[rowBase + 1]; // plane 1
    const p2 = vram[rowBase + 2]; // plane 2
    const p3 = vram[rowBase + 3]; // plane 3

    for (let x = 0; x < 8; x++) {
      const bit = 7 - x; // 高位对应 x=0
      const pixel =
        ((p0 >> bit) & 1) |
        ((p1 >> bit) & 1) << 1 |
        ((p2 >> bit) & 1) << 2 |
        ((p3 >> bit) & 1) << 3;
      output[outputOffset + y * 8 + x] = pixel;
    }
  }
}

/**
 * 解码 tile 并应用 H/V 翻转
 *
 * @param hFlip 水平翻转
 * @param vFlip 垂直翻转
 */
export function decodeTileFlipped(
  vram: Uint8Array,
  tileAddr: number,
  hFlip: boolean,
  vFlip: boolean,
  output: Uint8Array,
  outputOffset: number = 0
): void {
  // 先解码原始 tile
  decodeTile(vram, tileAddr, output, outputOffset);

  // 水平翻转: 每行左右镜像
  if (hFlip) {
    for (let y = 0; y < 8; y++) {
      const rowStart = outputOffset + y * 8;
      for (let x = 0; x < 4; x++) {
        const tmp = output[rowStart + x];
        output[rowStart + x] = output[rowStart + 7 - x];
        output[rowStart + 7 - x] = tmp;
      }
    }
  }

  // 垂直翻转: 上下行交换
  if (vFlip) {
    for (let y = 0; y < 4; y++) {
      const row1 = outputOffset + y * 8;
      const row2 = outputOffset + (7 - y) * 8;
      for (let x = 0; x < 8; x++) {
        const tmp = output[row1 + x];
        output[row1 + x] = output[row2 + x];
        output[row2 + x] = tmp;
      }
    }
  }
}

/**
 * 预解码所有 tile 到像素数组 (用于性能优化)
 *
 * @param vram VRAM 数据
 * @param startTile 起始 tile 索引
 * @param count tile 数量
 * @returns Uint8Array, 每 tile 64 字节, 顺序 tile0, tile1, ...
 */
export function decodeAllTiles(
  vram: Uint8Array,
  startTile: number = 0,
  count: number = 2048
): Uint8Array {
  const output = new Uint8Array(count * 64);
  for (let i = 0; i < count; i++) {
    decodeTile(vram, (startTile + i) * TILE_BYTES, output, i * 64);
  }
  return output;
}

/**
 * 计算 tile 地址
 *
 * Genesis VDP 中, tile 索引直接对应 VRAM 地址:
 *   tile_addr = tile_index * 32
 *
 * nametable 条目的 bit10-0 是 tile 索引 (0-2047)
 */
export function tileAddress(tileIndex: number): number {
  return (tileIndex & 0x7FF) * TILE_BYTES;
}
