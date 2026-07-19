"use strict";
/**
 * 位平面压缩解压 (ROM 资源类型 0x02)
 *
 * 对应 ROM 函数: (需定位)
 * 算法: 多 bit-plane 分开发送，每 plane 独立 RLE
 * 常见用于 2/4/6-plane tile 数据
 *
 * 每个 plane = 1 bit per pixel
 * 解压后重组为 pixel data
 *
 * 简化实现: 按 ROM 逻辑逐 plane 解压
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bitplane = void 0;
class Bitplane {
    /**
     * 解压位平面压缩数据
     *
     * @param rom — ROM 加载器
     * @param srcAddr — 压缩数据在 ROM 中的地址
     * @param dstBuffer — 目标缓冲区
     * @param dstOffset — 目标起始偏移
     * @param planeCount — 位平面数 (2, 4, 6 常见)
     * @returns 解压后字节数
     */
    static decompress(rom, srcAddr, dstBuffer, dstOffset = 0, planeCount = 4) {
        // 位平面数据头: 每个 plane 有独立的压缩数据块
        // 先读每个 plane 的 size
        const planeSizes = [];
        let src = srcAddr;
        let totalPlaneBytes = 0;
        // 读 plane sizes (每个 plane 的 end_offset 或 size)
        // ROM 的实际格式需要验证，这里提供一个基础框架
        for (let p = 0; p < planeCount; p++) {
            const size = rom.read16(src);
            src += 2;
            planeSizes.push(size);
            totalPlaneBytes += size;
        }
        // 解压每个 plane
        for (let p = 0; p < planeCount; p++) {
            const planeSize = planeSizes[p];
            const planeStart = src;
            // 位平面 RLE:
            // 每 byte: bit 7 = RLE flag
            //   flag=0: 写入 run+1 个 byte (literal)
            //   flag=1: 重复 value byte run+1 次 (RLE)
            let pos = 0;
            while (pos < planeSize && src < rom.size) {
                const cmd = rom.read8(src);
                src++;
                const isRLE = (cmd & 0x80) !== 0;
                const run = (cmd & 0x7F) + 1;
                if (isRLE) {
                    const value = rom.read8(src);
                    src++;
                    for (let i = 0; i < run && pos < planeSize; i++) {
                        // 设置 bit in destination: plane p, pixel pos*8+i
                        // 需要后续重组...
                        pos++;
                    }
                }
                else {
                    for (let i = 0; i < run && pos < planeSize; i++) {
                        if (src >= rom.size)
                            break;
                        const value = rom.read8(src);
                        src++;
                        pos++;
                    }
                }
            }
            src = planeStart + planeSize; // 跳到下一个 plane
        }
        // TODO: 重组 plane data → pixel buffer
        return dstOffset + totalPlaneBytes - 0; // placeholder
    }
}
exports.Bitplane = Bitplane;
