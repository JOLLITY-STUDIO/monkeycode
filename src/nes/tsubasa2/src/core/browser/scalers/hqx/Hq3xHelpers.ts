// src/core/browser/scalers/hqx/Hq3xHelpers.ts
//
// HQ3X 内部 helper - 1:1 port from fceux-2.6.6 src/drivers/common/hq3x.cpp
//
// fceux 原始 (RGB565 输入):
//   - LUT16to32[i] = ((i&0xF800)<<8) + ((i&0x07E0)<<5) + ((i&0x001F)<<3)  // 565→888
//   - RGBtoYUV[i] = (Y<<16)+(u<<8)+v                                    // 565→YUV888
//   - Diff 通过比较 YUV 各通道差
//   - Interp1..5 操作 32-bit (在 RGB 三个通道并行)
//
// tsnes 移植 (RGBA8888 输入):
//   - src 已经是 0xRRGGBB (alpha=0xFF 在上层加), 直接 R/G/B byte 级运算
//   - YUV 转换用 BT.601 公式 (与 fceux 一致语义)
//   - Interp 改 per-channel 显式 R/G/B 分量计算
//
// 所有 Interp* 输出 24-bit RGB (0x00RRGGBB), caller 自己加 0xFF000000 alpha

import type { VideoScaler } from "../VideoScaler";

/** 取 R 通道 (8 bit, 输出 0..255) */
export function rOf(c: number): number { return (c >>> 16) & 0xff; }
/** 取 G 通道 */
export function gOf(c: number): number { return (c >>> 8) & 0xff; }
/** 取 B 通道 */
export function bOf(c: number): number { return c & 0xff; }

/** 重组 RGB → 0x00RRGGBB (caller 加 alpha) */
export function packRGB(r: number, g: number, b: number): number {
  return ((r & 0xff) << 16) | ((g & 0xff) << 8) | (b & 0xff);
}

// ─── Interp1..5 (fceux 移植) ──────────────────────────────────────────
//
// fceux 实现用 32-bit 通道并行 (RGB 565→888 之后用位运算), 我们简化为
// per-channel 算后重组。数学等价, 慢一点点但 tsnes 256×240 完全够用。
//
// 注意 r/g/b 计算用 (a*3 + b) >> 2 等, 因为输入 R/G/B 都在 0..255,
// 所以中间结果 a*7 ≤ 7*255 = 1785 < 2^11, 安全在 number (53-bit) 内。

export function Interp1(c1: number, c2: number): number {
  return packRGB(
    (rOf(c1) * 3 + rOf(c2)) >> 2,
    (gOf(c1) * 3 + gOf(c2)) >> 2,
    (bOf(c1) * 3 + bOf(c2)) >> 2,
  );
}

export function Interp2(c1: number, c2: number, c3: number): number {
  return packRGB(
    (rOf(c1) * 2 + rOf(c2) + rOf(c3)) >> 2,
    (gOf(c1) * 2 + gOf(c2) + gOf(c3)) >> 2,
    (bOf(c1) * 2 + bOf(c2) + bOf(c3)) >> 2,
  );
}

export function Interp3(c1: number, c2: number): number {
  return packRGB(
    (rOf(c1) * 7 + rOf(c2)) >> 3,
    (gOf(c1) * 7 + gOf(c2)) >> 3,
    (bOf(c1) * 7 + bOf(c2)) >> 3,
  );
}

export function Interp4(c1: number, c2: number, c3: number): number {
  return packRGB(
    (rOf(c1) * 2 + (rOf(c2) + rOf(c3)) * 7) >> 4,
    (gOf(c1) * 2 + (gOf(c2) + gOf(c3)) * 7) >> 4,
    (bOf(c1) * 2 + (bOf(c2) + bOf(c3)) * 7) >> 4,
  );
}

export function Interp5(c1: number, c2: number): number {
  return packRGB(
    (rOf(c1) + rOf(c2)) >> 1,
    (gOf(c1) + gOf(c2)) >> 1,
    (bOf(c1) + bOf(c2)) >> 1,
  );
}

// ─── YUV Diff (BT.601 等价 fceux) ────────────────────────────────────

export function rgbToYuv(c: number): number {
  const r = rOf(c), g = gOf(c), b = bOf(c);
  // fceux RGBtoYUV 公式 (RGB565 量化后, 近似 BT.601):
  //   Y = (r + g + b) >> 2
  //   u = 128 + ((r - b) >> 2)
  //   v = 128 + ((-r + 2*g - b) >> 3)
  // 这里对 0..255 改写为 8-bit 等价 (数值上略有差异但在 fceux 阈值附近):
  //   Y = (r + g + b) >> 2   (范围 0..191)
  //   u = 128 + ((r - b) >> 2)
  //   v = 128 + ((-r + 2*g - b) >> 3)
  const Y = (r + g + b) >> 2;
  const u = 128 + ((r - b) >> 2);
  const v = 128 + ((-r + 2 * g - b) >> 3);
  return (Y << 16) | ((u & 0xff) << 8) | (v & 0xff);
}

/**
 * 比较两像素 RGB888 - 返回 1 = 显著不同, 0 = 接近.
 *
 * fceux trY/trU/trV (RGB565 LUT 后):
 *   trY = 0x30  = 48
 *   trU = 0x07  = 7
 *   trV = 0x06  = 6
 *
 * tsnes 用同样的阈值 — 经验上 NES 输出 (RGB888) 视觉效果接近 fceux.
 */
export function Diff(c1: number, c2: number): boolean {
  const yuv1 = rgbToYuv(c1);
  const yuv2 = rgbToYuv(c2);
  const Y1 = (yuv1 >>> 16) & 0xff;
  const Y2 = (yuv2 >>> 16) & 0xff;
  const u1 = (yuv1 >>> 8) & 0xff;
  const u2 = (yuv2 >>> 8) & 0xff;
  const v1 = yuv1 & 0xff;
  const v2 = yuv2 & 0xff;
  const trY = 48, trU = 7, trV = 6;
  return (
    Math.abs(Y1 - Y2) > trY ||
    Math.abs(u1 - u2) > trU ||
    Math.abs(v1 - v2) > trV
  );
}

/** Module marker — 让 Hq3xScaler 主循环引用本文件 */
export const HQX_HELPERS_VERSION = "0.7.3-port-fceux-2.6.6";

/** export 防止 unused */
export type { VideoScaler };
