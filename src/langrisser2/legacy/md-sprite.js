/**
 * md-sprite.js — Langrisser II 精灵图 RLE 解压缩
 * 基于 Ghidra 逆向分析 (FUN_00009aaa, FUN_00009b3c, FUN_0001074c)
 *
 * 压缩格式:
 *   byte[0]: 宽度标志 (bit7: 0=ChainedRLE, 1=Planar)
 *   byte[1-2]: 高度 (LE, 行数)
 *   byte[3-5]: 调色板数据 (仅ChainedRLE模式)
 *   之后: RLE 数据
 *
 * Chained RLE 模式 (width < 128):
 *   bit7=0 → 透明运行 (跳过 N 像素)
 *   bit7=1 → 数据运行 (复制 N 数据到输出)
 *   每 8 像素完成一行
 *
 * Planar 模式 (width >= 128, 用于宽精灵):
 *   每个字节的 4 个半字节作为 2 组 4bpp 像素索引
 *
 * VRAM DMA: UNK_00080cbc + spriteIndex * 0xC0 (每个精灵 192 字节)
 */

/**
 * Chained RLE 解压缩
 * @param {Uint8Array} src - 压缩数据
 * @param {number} width - 宽度(像素)
 * @param {number} height - 高度(行)
 * @returns {Uint8Array} 解压后的像素数据 (每像素 4bit 索引)
 */
export function decompressRLE(src, width, height) {
  const srcStart = 3; // 跳过宽度/高度/调色板
  const output = new Uint8Array(width * height);
  let srcPos = srcStart;
  let dstPos = 0;
  let rowPixel = 0;

  while (dstPos < width * height && srcPos < src.length) {
    const code = src[srcPos++];
    const len = code & 0x7F;

    if (code & 0x80) {
      // 数据运行: 从源复制 len 字节
      for (let i = 0; i < len && dstPos < output.length; i++) {
        output[dstPos++] = src[srcPos++];
        rowPixel++;
        if (rowPixel >= width) rowPixel = 0;
      }
    } else {
      // 透明运行: 填充 len 个零
      for (let i = 0; i < len && dstPos < output.length; i++) {
        output[dstPos++] = 0;
        rowPixel++;
        if (rowPixel >= width) rowPixel = 0;
      }
    }
  }

  return output;
}

/**
 * Planar 解压缩 (宽精灵模式)
 * @param {Uint8Array} src - 压缩数据
 * @param {number} width - 宽度(像素)
 * @param {number} height - 高度(行)
 * @returns {Uint8Array} 解压后的像素数据
 */
export function decompressPlanar(src, width, height) {
  const output = new Uint8Array(width * height);
  let srcPos = 0;
  let dstPos = 0;

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col += 2) {
      if (srcPos >= src.length) break;
      const b = src[srcPos++];
      const p1 = (b >> 4) & 0x0F;
      const p2 = b & 0x0F;
      if (dstPos < output.length) output[dstPos++] = p1;
      if (dstPos < output.length) output[dstPos++] = p2;
    }
  }

  return output;
}

/**
 * 通用精灵解压缩
 * 自动检测压缩模式并解压
 * @param {Uint8Array} src - 压缩数据流
 * @returns {{ pixels: Uint8Array, width: number, height: number, mode: string }}
 */
export function decompressSprite(src) {
  if (!src || src.length < 3) return null;

  const flags = src[0];
  const width = flags & 0x7F;
  const height = src[1] | (src[2] << 8);
  const isPlanar = !!(flags & 0x80);

  let pixels;
  if (isPlanar) {
    pixels = decompressPlanar(src.slice(3), width, height);
  } else {
    pixels = decompressRLE(src, width, height);
  }

  return {
    pixels,
    width,
    height,
    mode: isPlanar ? 'planar' : 'rle',
  };
}

/**
 * 4bpp 像素转 RGBA (提供调色板)
 * @param {Uint8Array} pixels - 4bpp 像素数据
 * @param {number[][]} palette - 16色调色板 [[r,g,b], ...]
 * @returns {Uint8Array} RGBA 数据
 */
export function pixelsToRGBA(pixels, palette) {
  const rgba = new Uint8Array(pixels.length * 4);
  for (let i = 0; i < pixels.length; i++) {
    const idx = pixels[i] & 0x0F;
    const color = palette[idx] || [0, 0, 0];
    rgba[i * 4] = color[0];
    rgba[i * 4 + 1] = color[1];
    rgba[i * 4 + 2] = color[2];
    rgba[i * 4 + 3] = (idx === 0) ? 0 : 255; // 索引0=透明
  }
  return rgba;
}

/**
 * CRAM 调色板解析 (MD/Genesis 格式: 9-bit BGR)
 * @param {Uint8Array} cram - CRAM 数据 (32字节 = 16色)
 * @returns {number[][]} RGB 调色板
 */
export function parseCRAM(cram) {
  const palette = [];
  for (let i = 0; i < Math.min(16, cram.length / 2); i++) {
    const word = cram[i * 2] | (cram[i * 2 + 1] << 8);
    const b = (word & 0x0E) >> 1;       // 3-bit blue
    const g = (word & 0xE0) >> 5;       // 3-bit green
    const r = (word & 0x0E00) >> 9;     // 3-bit red
    // 3-bit → 8-bit 扩展
    palette.push([
      Math.round(r * 255 / 7),
      Math.round(g * 255 / 7),
      Math.round(b * 255 / 7),
    ]);
  }
  return palette;
}

/**
 * 创建 Canvas 渲染精灵图
 * @param {Uint8Array} rgba - RGBA 像素数据
 * @param {number} width - 宽度
 * @param {number} height - 高度
 * @returns {string} Data URL
 */
export function renderToPNG(rgba, width, height) {
  // 纯 Node.js 环境无法使用 Canvas，返回原始数据信息
  return { rgba, width, height };
}
