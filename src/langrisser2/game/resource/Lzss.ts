/**
 * LZSS 解压 (ROM 资源类型 0x03)
 *
 * ROM 函数: $009DFE, 由 $99FA 类型分发调用 (类型 0x03)
 *
 * ROM 资源格式 (经 ROM 二进制实测):
 *   资源指针指向: [type:1B] [outSize:2B big-endian] [LZSS stream...]
 *   decompressResource() 在 ptr+1 处调用此函数 (跳过 type 字节)
 *
 * LZSS 变体 (精确对应 ROM $9DFE-$9EC2):
 *   - 滑动窗口: 4096 字节 @ $FF0000, 初始全部填充空格 $20
 *   - 窗口写入位置: $0FEE (4078), 递增后 & 0x0FFF 回绕
 *   - 编码标识: 1 byte flag + 8 items (LSB first: lsr.b #1)
 *     flag bit=1 → literal byte (直接字节)
 *     flag bit=0 → back-reference: [byte0:1B] [byte1:1B]
 *       offset: 12-bit = byte0 | ((byte1 & 0xF0) << 4)
 *       length: (byte1 & 0x0F) + 2  (范围 2-17)
 *   - 终止条件: dst 达到 outSize (不以 offset=0 为终止)
 *   - offset=0 → 正常窗口匹配, 从窗口位置0开始复制
 */

import { RomLoader } from '../core/RomLoader';

export class Lzss {
  /** 滑动窗口大小 */
  static readonly WINDOW_SIZE = 0x1000; // 4096

  /** window write start position (matches ROM: move.w #$0FEE,d6) */
  static readonly WINDOW_WRITE_START = 0x0FEE; // 4078

  /**
   * 解压 LZSS 数据
   *
   * @param rom — ROM 加载器 (实现 read8/read16/size 接口)
   * @param srcAddr — 压缩流起始地址 (指向 LZSS flag 字节, 不含 size 头)
   * @param dstBuffer — 目标缓冲区
   * @param dstOffset — 目标起始偏移
   * @param expectedSize — 解压后期望的字节数 (从外部 5-byte 资源头获取, 不再从流中读取)
   * @returns 解压后字节数
   */
  static decompress(
    rom: RomLoader,
    srcAddr: number,
    dstBuffer: Uint8Array,
    dstOffset: number = 0,
    expectedSize?: number,
  ): number {
    let src = srcAddr;
    let dst = dstOffset;

    // ★ 兼容旧格式: 如果没传 expectedSize, 从流中读取 [outSize:2B big-endian]
    const outSize = expectedSize ?? rom.read16(src);
    if (expectedSize === undefined) {
      src += 2;
    }

    // ★ ROM 行为: 滑动窗口 4096B 全部用空格 $20 初始化 (move.l #$20202020,d3 → 循环256次×16B)
    const window = new Uint8Array(Lzss.WINDOW_SIZE);
    window.fill(0x20);

    // ★ ROM: d6 = $0FEE (窗口写入起始位置)
    let writePos = Lzss.WINDOW_WRITE_START;

    // LZSS 解压循环 — 以 outSize 为终止条件
    while (dst - dstOffset < outSize) {
      // 读 flag byte (LSB first: bit 0 → bit 7, ROM: lsr.b #1,d5)
      if (src >= rom.size) break;
      const flags = rom.read8(src);
      src++;

      for (let bit = 0; bit < 8; bit++) {
        if (dst - dstOffset >= outSize) break;

        if ((flags >> bit) & 1) {
          // bit=1 → literal byte (ROM $9E3E: move.b (a0)+,d0)
          if (src >= rom.size) break;
          const lit = rom.read8(src);
          src++;
          dstBuffer[dst] = lit;
          window[writePos] = lit;  // ROM $9E42: move.b d0,($0,a1,d6.w)
          dst++;
          writePos = (writePos + 1) & 0x0FFF;  // ROM $9E5A-$9E5C: addq.w #1,d6; andi.w #$0FFF,d6
        } else {
          // bit=0 → back-reference (ROM $9E6A)
          // ★ 读2B: offset(12bit) + length-2(4bit)
          if (src >= rom.size) break;
          const b0 = rom.read8(src);  // offset bits [7:0]
          src++;
          if (src >= rom.size) break;
          const b1 = rom.read8(src);  // offset bits [11:8] | length-2
          src++;

          // ★ ROM $9E74-$9E80:
          //   d2 = b1 & 0x0F → length-2 (range 0-15)
          //   addq.w #2,d2 → length = (b1 & 0x0F) + 2 (range 2-17)
          //   asl.w #4,d1; andi.w #$0F00,d1; or.w d0,d1
          //   → offset = b0 | ((b1 & 0xF0) << 4)
          const offset = b0 | ((b1 & 0xF0) << 4);
          const length = (b1 & 0x0F) + 2;

          // ★ ROM $9E82-$9EB4: 循环复制 length 个字节
          let srcWinPos = offset;
          for (let i = 0; i < length && dst - dstOffset < outSize; i++) {
            const b = window[srcWinPos];
            dstBuffer[dst] = b;
            window[writePos] = b;
            dst++;
            srcWinPos = (srcWinPos + 1) & 0x0FFF;  // ROM $9EA0-$9EA2
            writePos = (writePos + 1) & 0x0FFF;     // ROM $9EA6-$9EA8
          }
        }
      }
    }

    return dst - dstOffset;
  }
}
