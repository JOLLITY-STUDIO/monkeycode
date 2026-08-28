// src/core/browser/scalers/VideoScaler.ts
//
// 视频缩放器接口 - 对应 fceux-2.6.6 的 SDL.SpecialFilter / BlitToHigh 高质量渲染路径
//
// 输入/输出格式约定:
//   - src/dst 都是 Uint32Array (RGBA8888 little-endian: 0xAARRGGBB, alpha 固定 0xFF)
//   - srcW/srcH 是 NES 原生分辨率 (256×240)
//   - dstW/dstH = srcW * scale, srcH * scale (scale = 1|2|3)
//   - stride = 行字节偏移 / 4 (因为是 Uint32)
//
// 注意: 与 fceux 原始实现 (RGB565 → RGB888) 不同, 我们内部用 Uint32 RGBA8888,
//   HQ3X 算法中所有 Diff/Interp 数学仍然适用, 只是把 LUT16to32 LUT 换成 RGB565→RGB888
//   直接展开 (PPU buffer 已经是 RGBA8888, 直接读 r/g/b 字节即可).

import type { VideoScalerId } from "../../../option/VideoConfig";

export interface VideoScaler {
  /** 简短 ID ("hq3x"), 用于配置 / 日志 */
  readonly id: VideoScalerId;
  /** 显示名称 ("HQ3X / HP3X (3× 高质量) ") */
  readonly label: string;
  /** 输出倍率 1|2|3 */
  readonly scale: 1 | 2 | 3;
  /** fceux 编号 (SDL.SpecialFilter), -1 表示非常规 */
  readonly fexId: number;

  /**
   * 把 src 缩放写入 dst.
   * @param src 源 buffer (长度 srcW*srcH)
   * @param dst 目标 buffer (长度 dstW*dstH, caller 预分配)
   * @param srcW/dstW/srcH/dstH 宽高
   */
  apply(
    src: Uint32Array,
    dst: Uint32Array,
    srcW: number,
    srcH: number,
    dstW: number,
    dstH: number,
  ): void;
}

/** Identity scaler - 不做缩放, 1:1 写入 (浏览器 CSS 整数倍) */
export class IdentityScaler implements VideoScaler {
  readonly id: VideoScalerId = "none";
  readonly label = "None (1×)";
  readonly scale: 1 = 1;
  readonly fexId = 0;

  apply(src: Uint32Array, dst: Uint32Array, srcW: number, _srcH: number, _dstW: number, _dstH: number): void {
    dst.set(src);
  }
}

/** 普通整数倍放大 (scale2x/scale3x): 每个像素 → 2×2 或 3×3 同色块 */
export class NearestScaleScaler implements VideoScaler {
  readonly id: VideoScalerId;
  readonly label: string;
  readonly scale: 2 | 3;
  readonly fexId: number;

  constructor(id: "scale2x" | "scale3x", label: string, scale: 2 | 3, fexId: number) {
    this.id = id;
    this.label = label;
    this.scale = scale;
    this.fexId = fexId;
  }

  apply(src: Uint32Array, dst: Uint32Array, srcW: number, srcH: number, dstW: number, dstH: number): void {
    const N = this.scale;
    // 每行 srcY 复制 N 次, 每像素复制 N 次
    for (let y = 0; y < srcH; y++) {
      const srcRow = y * srcW;
      const dstRowBase = y * N * dstW;
      for (let yy = 0; yy < N; yy++) {
        const dstRow = dstRowBase + yy * dstW;
        for (let x = 0; x < srcW; x++) {
          const px = src[srcRow + x];
          for (let xx = 0; xx < N; xx++) {
            dst[dstRow + x * N + xx] = px;
          }
        }
      }
    }
    void dstH; void dstW; void srcH;
  }
}

/** Scaler registry (singleton) - 运行时根据 VideoConfig.scaler 解析
 *
 * 每个 id 对应一个 VideoScaler, 或 null (未实现). 调用方用 getScaler() 拿到 fallback.
 * 第三方 scaler 在 src/core/browser/scalers/index.ts 中显式 registerScaler() 注册.
 */
export const SCALER_REGISTRY: Record<VideoScalerId, VideoScaler | null> = {
  none: new IdentityScaler(),
  hq2x: null,   // 占位, 后续 PR 注册 (hq2x.cpp 同样的算法 2x 版本)
  scale2x: new NearestScaleScaler("scale2x", "scale2x (2× 整数)", 2, 2),
  hq3x: null,   // 占位, 由 scalers/index.ts 在 import 时注册 Hq3xScaler
  scale3x: new NearestScaleScaler("scale3x", "scale3x (3× 整数)", 3, 5),
};

/** lazy lookup - 返回 scaler 或回退 identity (兜底) */
export function getScaler(id: VideoScalerId): VideoScaler {
  return SCALER_REGISTRY[id] || SCALER_REGISTRY.none || new IdentityScaler();
}

export function registerScaler(s: VideoScaler): void {
  SCALER_REGISTRY[s.id] = s;
}
