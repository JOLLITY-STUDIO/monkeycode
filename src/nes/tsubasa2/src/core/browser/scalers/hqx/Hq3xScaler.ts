// src/core/browser/scalers/hqx/Hq3xScaler.ts
//
// HQ3X scaler (3x 高质量升采样) - 1:1 port from fceux-2.6.6 hq3x.cpp
//
// 算法: MaxSt (C) 2003, LGPL 2.1+ (见 hq3x.cpp 头部版权)
//
// tsnes 适配:
//   - 输入: Uint32Array (RGBA8888, alpha=0xFF 在 setBuffer 阶段注入)
//   - 输出: Uint32Array (RGBA8888, alpha=0xFF, dstSize = srcSize * 9)
//   - 256 种 pattern → ~70 个独立 case 块, 全部直译自 fceux
//
// 性能: 256*240 → 768*720, 9 倍像素. V8 完全 60fps.
//
// 文件拆分 (避免单文件过大):
//   - Hq3xHelpers.ts : Interp1..5 / Diff / rgbToYuv
//   - Hq3xCases1.ts  : pattern 0..63 handlers
//   - Hq3xCases2.ts  : pattern 64..127 handlers
//   - Hq3xCases3.ts  : pattern 128..191 handlers
//   - Hq3xCases4.ts  : pattern 192..255 handlers
//   - Hq3xScaler.ts  : 主循环 + dispatcher (本文件)

import type { VideoScaler } from "../VideoScaler";
import { Interp1, Interp2, Interp3, Interp4, Interp5, Diff } from "./Hq3xHelpers";
import { handleCase as handleCase1 } from "./Hq3xCases1";
import { handleCase as handleCase2 } from "./Hq3xCases2";
import { handleCase as handleCase3 } from "./Hq3xCases3";
import { handleCase as handleCase4 } from "./Hq3xCases4";

const ALPHA = 0xff000000;

export type HqxCaseHandler = (
  pattern: number,
  c: Int32Array,
  dst: Uint32Array,
  pOut: number,
  dstW: number,
) => void;

/**
 * Hq3xScaler - 3x 高质量升采样 (HP3X).
 */
export class Hq3xScaler implements VideoScaler {
  readonly id = "hq3x" as const;
  readonly label = "hq3x / HP3X (3× 高质量)";
  readonly scale: 3 = 3;
  readonly fexId = 4;

  apply(
    src: Uint32Array,
    dst: Uint32Array,
    srcW: number,
    srcH: number,
    dstW: number,
    dstH: number,
  ): void {
    void dstH;
    const w = new Int32Array(10);
    const c = new Int32Array(10);

    for (let j = 0; j < srcH; j++) {
      const prevline = j > 0 ? -srcW : 0;
      const nextline = j < srcH - 1 ? srcW : 0;
      const rowBase = j * srcW;

      for (let i = 0; i < srcW; i++) {
        const curIdx = rowBase + i;

        // ─── 3x3 邻居采样 (与 fceux w[1..9] 一致) ───
        w[2] = src[curIdx + prevline] | 0;
        w[5] = src[curIdx] | 0;
        w[8] = src[curIdx + nextline] | 0;

        if (i > 0) {
          w[1] = src[curIdx + prevline - 1] | 0;
          w[4] = src[curIdx - 1] | 0;
          w[7] = src[curIdx + nextline - 1] | 0;
        } else {
          w[1] = w[2]; w[4] = w[5]; w[7] = w[8];
        }

        if (i < srcW - 1) {
          w[3] = src[curIdx + prevline + 1] | 0;
          w[6] = src[curIdx + 1] | 0;
          w[9] = src[curIdx + nextline + 1] | 0;
        } else {
          w[3] = w[2]; w[6] = w[5]; w[9] = w[8];
        }

        for (let k = 1; k <= 9; k++) c[k] = w[k];

        // ─── pattern 计算 (9 个邻居相对中心像素是否"显著不同") ───
        let pattern = 0;
        for (let k = 1; k <= 9; k++) {
          if (k === 5) continue;
          if (w[k] !== w[5] && Diff(w[5], w[k])) {
            pattern |= 1 << (k - 1);
          }
        }

        const pOut = (j * 3) * dstW + (i * 3);

        // ─── dispatcher (按 pattern 范围分发到 4 个 case 文件) ───
        if (pattern < 64) {
          handleCase1(pattern, c, dst, pOut, dstW);
        } else if (pattern < 128) {
          handleCase2(pattern, c, dst, pOut, dstW);
        } else if (pattern < 192) {
          handleCase3(pattern, c, dst, pOut, dstW);
        } else {
          handleCase4(pattern, c, dst, pOut, dstW);
        }
      }
    }
  }

  /** Re-export helpers for testability / debugging */
  static readonly ALPHA = ALPHA;
  static readonly Interp1 = Interp1;
  static readonly Interp2 = Interp2;
  static readonly Interp3 = Interp3;
  static readonly Interp4 = Interp4;
  static readonly Interp5 = Interp5;
  static readonly Diff = Diff;
}
