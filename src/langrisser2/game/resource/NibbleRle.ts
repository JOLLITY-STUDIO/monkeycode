/**
 * Nibble RLE 解压 (ROM 资源类型 0x01)
 *
 * 对应 ROM 函数: FUN_0000fff8 ($0FFF8)
 * 算法: 4bpp tile 数据专用 Nibble RLE
 *
 * 格式:
 *   每字节 = 2 nibbles
 *   高 nibble = type (0-F):
 *     0x0: 复制 run 个 nibbles 从源
 *     0x1-0x7: RLE 重复 (下一个 nibble 重复 run 次)
 *     0x8-0xF: 直接写入 run 个 nibbles (每个占 1 byte)
 *   低 nibble = run length (0-15, 实际 +1)
 *
 *   实际实现 (参照 ROM 0xFFF8):
 *   - 字节 0: counter (解压计数器)
 *   - byte loop: 读 1 byte → 分高低 nibble
 *     hi nibble:
 *       $0: 读 1 nibble → 写入 run 个像素 (每像素 1 nibble)
 *       $1-$7: 读 $8000 ？ ← 需要确认
 *     实际: 从 ROM $0xFFF8 的逻辑平移
 */

import { RomLoader } from '../core/RomLoader';

export class NibbleRle {
  /**
   * 解压 Nibble RLE 数据
   *
   * @param rom — ROM 加载器
   * @param srcAddr — 压缩数据在 ROM 中的偏移
   * @param dstBuffer — 目标缓冲区 (通常是 RAM 区域)
   * @returns 解压后字节数
   */
  static decompress(
    rom: RomLoader,
    srcAddr: number,
    dstBuffer: Uint8Array,
    dstOffset: number = 0,
  ): number {
    // ROM 中的 nibble RLE 数据格式:
    // byte 0: 初始计数器 (要解压的总像素数 or 某种计数)
    // 后续: RLE 命令字节 (hi nibble = cmd, lo nibble = count)

    let src = srcAddr;
    let dst = dstOffset;

    // 读初始 counter
    const initialCount = rom.read8(src);
    src++;

    // 注意: ROM 中 counter 含义是 pixel count / 2
    // 每解压一个单位 = 2 像素 (1 byte)
    // counter 用的是递减计数

    let counter: number;

    // ROM $0FFF8 的逻辑:
    // move.b (a0)+, d6    → counter = ROM[src++]
    // 然后 loop: 读下一个 byte → split nibbles
    // 如果 counter = 0xFF → 结束

    // 实际格式:
    // counter byte: 剩余操作数
    // 然后: [命令字节]
    //   高 nibble: 命令类型
    //   低 nibble: count (0 means 16)
    //
    // 命令:
    //   0x0: 读 1 byte → 写入 count 次 (每 byte 放 1 nibble? 还是...)
    //   0x1-0x7: 读 1 nibble → 重复 count 次
    //   0x8-0xF: 读 count bytes → 解包 nibbles

    // 简化实现 (参照 ASM 逻辑):
    // 每解压一次 = 写入 1 字节到目标 (代表 2 像素的 nibble 对)
    // d6 = counter, 递减到 0 再读新 counter byte

    counter = initialCount;

    while (true) {
      if (counter === 0xFF) break;

      // 读命令字节
      const cmdByte = rom.read8(src);
      src++;

      const hi = (cmdByte >> 4) & 0x0F;  // 命令 (4 bits)
      const lo = cmdByte & 0x0F;          // count

      const run = lo === 0 ? 16 : lo;

      if (hi === 0x00) {
        // 原始数据: 读 run bytes 直接写入
        for (let i = 0; i < run && counter > 0; i++) {
          const b = rom.read8(src);
          src++;
          if (dst < dstBuffer.length) {
            dstBuffer[dst] = b;
          }
          dst++;
          counter--;
        }
      } else if (hi >= 0x01 && hi <= 0x07) {
        // RLE: 读 1 nibble → 重复为 run 个像素 (打包成 byte)
        // 读 1 byte → 拆分成 2 个 nibbles
        const dataByte = rom.read8(src);
        src++;
        const nibLo = dataByte & 0x0F;
        const nibHi = (dataByte >> 4) & 0x0F;

        // 每个 nibble 对应 1 pixel (4bpp)
        // 输出: nibLo << 4 | nibLo  or nibHi << 4 | nibHi
        // 实际上 nibble RLE 写入的是打包的 2-pixel byte
        // hi nibble pixel → 前一个, lo nibble pixel → 后一个

        for (let i = 0; i < run && counter > 0; i++) {
          // 将 nibHi 和 nibLo 打包成一个 byte: hi=高4位, lo=低4位
          if (dst < dstBuffer.length) {
            dstBuffer[dst] = (nibHi << 4) | nibLo;
          }
          dst++;
          counter--;
        }
        // 注意: 这是跑 2 像素 1 byte 的单位

      } else {
        // hi >= 0x08: 读 run bytes → 每 byte 的 2 个 nibbles 分别写入
        for (let i = 0; i < run && counter > 0; i++) {
          const b = rom.read8(src);
          src++;

          // Byte 拆分: hi nibble → pixel 1, lo nibble → pixel 2
          // 但 counter 按 2-pixel byte 计...
          // 这里简化: 直接写 byte
          if (dst < dstBuffer.length) {
            dstBuffer[dst] = b;
          }
          dst++;
          counter--;
        }
      }

      // 当 counter 耗尽, 读下一个 counter byte
      if (counter <= 0) {
        const nextCounter = rom.read8(src);
        src++;
        if (nextCounter === 0xFF) break;
        counter = nextCounter;
      }
    }

    return dst - dstOffset;
  }
}
