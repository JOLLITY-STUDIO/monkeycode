/**
 * 天使之翼1 — RLE (Run-Length Encoding) 解码器
 * 
 * 用于开场动画的 nametable tile 解压缩。
 * 
 * RLE格式 (来自 Bank 1 的 $C000-$DFFF 区域):
 *   [ctrl] [data] 对，重复直到遇到结束标记
 *   
 *   ctrl < 0x80:  count = ctrl (1-127), data = 下个字节
 *   ctrl >= 0x80: count = ctrl - 0x80 (1-127), data = 下个字节
 *   0x00 后跟 0x00: 流结束标记
 * 
 * 对应原始: Bank 1 的 RLE 解压缩逻辑
 */
export class RleDecoder {
  /**
   * 解码 RLE 压缩数据为 tile 数组
   * @param data 原始字节数据
   * @param startOffset 起始偏移
   * @param maxTiles 最大 tile 数 (默认960 = 一个nametable)
   * @returns tile索引数组
   */
  static decode(data: Uint8Array, startOffset: number = 0, maxTiles: number = 960): number[] {
    const tiles: number[] = [];
    let pos = startOffset;

    while (pos + 1 < data.length && tiles.length < maxTiles) {
      const ctrl = data[pos++];
      
      // 检查流结束: 双零标记
      if (ctrl === 0) {
        if (pos < data.length && data[pos] === 0) {
          break;
        }
        // 单个0作为count是无效的，跳过
        if (pos < data.length && data[pos] !== 0) {
          // count=0 可能表示特殊情况，跳过下一个字节
          pos++;
          continue;
        }
      }

      // 解码count
      const count = (ctrl & 0x80) ? (ctrl & 0x7F) : ctrl;
      
      if (count === 0) {
        // count=0 无操作
        continue;
      }

      if (pos >= data.length) break;
      const val = data[pos++];

      // 展开RLE
      for (let i = 0; i < count && tiles.length < maxTiles; i++) {
        tiles.push(val);
      }
    }

    return tiles;
  }

  /**
   * 将 tile 数组写入 nametable
   * @param tiles tile索引数组
   * @param nametable 目标nametable (Uint8Array of 960+64 bytes)
   * @param startRow 起始行 (0-29)
   * @param startCol 起始列 (0-31)
   * @param stride 每行写入的tile数
   */
  static writeToNametable(
    tiles: number[],
    nametable: Uint8Array,
    startRow: number = 0,
    startCol: number = 0,
    stride: number = 32
  ): void {
    let ti = 0;
    for (let r = startRow; r < 30 && ti < tiles.length; r++) {
      for (let c = startCol; c < startCol + stride && c < 32 && ti < tiles.length; c++) {
        const idx = r * 32 + c;
        if (idx < 960) {
          nametable[idx] = tiles[ti];
        }
        ti++;
      }
    }
  }
}
