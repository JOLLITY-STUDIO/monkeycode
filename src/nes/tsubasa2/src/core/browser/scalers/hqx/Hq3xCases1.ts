// src/core/browser/scalers/hqx/Hq3xCases1.ts
//
// HQ3X case handler - pattern 0..63 (bit6=0, 即 c[7] 不同被关闭).
// 1:1 port from fceux-2.6.6 hq3x.cpp (cases 0..63).
//
// 每个 case 块是 9 行 inline 写像素 → dst[pOut+offset] = ALPHA|Interp?(c5, c?, c?)
// c[k] 是 Int32Array 索引 k=1..9 的邻居像素 (0x00RRGGBB)

import {
  Interp1, Interp2, Interp3, Interp4, Interp5, Diff,
} from "./Hq3xHelpers";
import type { HqxCaseHandler } from "./Hq3xScaler";

const ALPHA = 0xff000000;

export const handleCase: HqxCaseHandler = (
  pattern: number,
  c: Int32Array,
  dst: Uint32Array,
  pOut: number,
  dstW: number,
): void => {
  switch (pattern) {
    // ─── group A (subset 0-63): cases 0/1/4/32/5/33/36/37 ───
    case 0: case 1: case 4: case 32: case 5:
    case 33: case 36: case 37: {
      dst[pOut + 0]            = ALPHA | Interp2(c[5], c[4], c[2]);
      dst[pOut + 1]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 2]            = ALPHA | Interp2(c[5], c[2], c[6]);
      dst[pOut + dstW]         = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | Interp1(c[5], c[6]);
      dst[pOut + 2 * dstW]     = ALPHA | Interp2(c[5], c[8], c[4]);
      dst[pOut + 2 * dstW + 1] = ALPHA | Interp1(c[5], c[8]);
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp2(c[5], c[6], c[8]);
      break;
    }
    // ─── group B (subset 0-63): cases 2/34 ───
    case 2: case 34: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[1]);
      dst[pOut + 1]            = ALPHA | c[5];
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[3]);
      dst[pOut + dstW]         = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | Interp1(c[5], c[6]);
      dst[pOut + 2 * dstW]     = ALPHA | Interp2(c[5], c[8], c[4]);
      dst[pOut + 2 * dstW + 1] = ALPHA | Interp1(c[5], c[8]);
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp2(c[5], c[6], c[8]);
      break;
    }
    // ─── group C (subset 0-63): cases 16/17 ───
    case 16: case 17: {
      dst[pOut + 0]            = ALPHA | Interp2(c[5], c[4], c[2]);
      dst[pOut + 1]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[3]);
      dst[pOut + dstW]         = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | c[5];
      dst[pOut + 2 * dstW]     = ALPHA | Interp2(c[5], c[8], c[4]);
      dst[pOut + 2 * dstW + 1] = ALPHA | Interp1(c[5], c[8]);
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[9]);
      break;
    }
    // ─── group E (subset 0-63): cases 8/12 ───
    case 8: case 12: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[1]);
      dst[pOut + 1]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 2]            = ALPHA | Interp2(c[5], c[2], c[6]);
      dst[pOut + dstW]         = ALPHA | c[5];
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | Interp1(c[5], c[6]);
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[7]);
      dst[pOut + 2 * dstW + 1] = ALPHA | Interp1(c[5], c[8]);
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp2(c[5], c[6], c[8]);
      break;
    }
    // ─── group F (subset 0-63): cases 3/35 ───
    case 3: case 35: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + 1]            = ALPHA | c[5];
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[3]);
      dst[pOut + dstW]         = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | Interp1(c[5], c[6]);
      dst[pOut + 2 * dstW]     = ALPHA | Interp2(c[5], c[8], c[4]);
      dst[pOut + 2 * dstW + 1] = ALPHA | Interp1(c[5], c[8]);
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp2(c[5], c[6], c[8]);
      break;
    }
    // ─── group G (subset 0-63): cases 6/38 ───
    case 6: case 38: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[1]);
      dst[pOut + 1]            = ALPHA | c[5];
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[6]);
      dst[pOut + dstW]         = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | Interp1(c[5], c[6]);
      dst[pOut + 2 * dstW]     = ALPHA | Interp2(c[5], c[8], c[4]);
      dst[pOut + 2 * dstW + 1] = ALPHA | Interp1(c[5], c[8]);
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp2(c[5], c[6], c[8]);
      break;
    }
    // ─── group H (subset 0-63): cases 20/21 ───
    case 20: case 21: {
      dst[pOut + 0]            = ALPHA | Interp2(c[5], c[4], c[2]);
      dst[pOut + 1]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + dstW]         = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | c[5];
      dst[pOut + 2 * dstW]     = ALPHA | Interp2(c[5], c[8], c[4]);
      dst[pOut + 2 * dstW + 1] = ALPHA | Interp1(c[5], c[8]);
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[9]);
      break;
    }
    // ─── group L (subset 0-63): cases 40/44 ───
    case 40: case 44: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[1]);
      dst[pOut + 1]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 2]            = ALPHA | Interp2(c[5], c[2], c[6]);
      dst[pOut + dstW]         = ALPHA | c[5];
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | Interp1(c[5], c[6]);
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[8]);
      dst[pOut + 2 * dstW + 1] = ALPHA | Interp1(c[5], c[8]);
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp2(c[5], c[6], c[8]);
      break;
    }
    // ─── group M (subset 0-63): cases 9/13 ───
    case 9: case 13: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 1]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 2]            = ALPHA | Interp2(c[5], c[2], c[6]);
      dst[pOut + dstW]         = ALPHA | c[5];
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | Interp1(c[5], c[6]);
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[7]);
      dst[pOut + 2 * dstW + 1] = ALPHA | Interp1(c[5], c[8]);
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp2(c[5], c[6], c[8]);
      break;
    }
    // ─── group N (subset 0-63): case 18 (Diff x1) ───
    case 18: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[1]);
      if (Diff(c[2], c[6])) {
        dst[pOut + 1]          = ALPHA | c[5];
        dst[pOut + 2]          = ALPHA | Interp1(c[5], c[3]);
        dst[pOut + dstW + 2]   = ALPHA | c[5];
      } else {
        dst[pOut + 1]          = ALPHA | Interp3(c[5], c[2]);
        dst[pOut + 2]          = ALPHA | Interp4(c[5], c[2], c[6]);
        dst[pOut + dstW + 2]   = ALPHA | Interp3(c[5], c[6]);
      }
      dst[pOut + dstW]         = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + 2 * dstW]     = ALPHA | Interp2(c[5], c[8], c[4]);
      dst[pOut + 2 * dstW + 1] = ALPHA | Interp1(c[5], c[8]);
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[9]);
      break;
    }
    // ─── group Q (subset 0-63): case 10 (Diff x1) ───
    case 10: {
      if (Diff(c[4], c[2])) {
        dst[pOut + 0]          = ALPHA | Interp1(c[5], c[1]);
        dst[pOut + 1]          = ALPHA | c[5];
        dst[pOut + dstW]       = ALPHA | c[5];
      } else {
        dst[pOut + 0]          = ALPHA | Interp4(c[5], c[4], c[2]);
        dst[pOut + 1]          = ALPHA | Interp3(c[5], c[2]);
        dst[pOut + dstW]       = ALPHA | Interp3(c[5], c[4]);
      }
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[3]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | Interp1(c[5], c[6]);
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[7]);
      dst[pOut + 2 * dstW + 1] = ALPHA | Interp1(c[5], c[8]);
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp2(c[5], c[6], c[8]);
      break;
    }
    // ─── single case 24 ───
    case 24: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[1]);
      dst[pOut + 1]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[3]);
      dst[pOut + dstW]         = ALPHA | c[5];
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | c[5];
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[7]);
      dst[pOut + 2 * dstW + 1] = ALPHA | Interp1(c[5], c[8]);
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[9]);
      break;
    }
    // ─── subset of group (7/39/135): cases 7/39 ───
    case 7: case 39: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + 1]            = ALPHA | c[5];
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[6]);
      dst[pOut + dstW]         = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | Interp1(c[5], c[6]);
      dst[pOut + 2 * dstW]     = ALPHA | Interp2(c[5], c[8], c[4]);
      dst[pOut + 2 * dstW + 1] = ALPHA | Interp1(c[5], c[8]);
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp2(c[5], c[6], c[8]);
      break;
    }
    // ─── subset of group (41/169/45): cases 41/45 ───
    case 41: case 45: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 1]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 2]            = ALPHA | Interp2(c[5], c[2], c[6]);
      dst[pOut + dstW]         = ALPHA | c[5];
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | Interp1(c[5], c[6]);
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[8]);
      dst[pOut + 2 * dstW + 1] = ALPHA | Interp1(c[5], c[8]);
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp2(c[5], c[6], c[8]);
      break;
    }
    // ─── group R (subset 0-63): case 22 (Diff x1) ───
    case 22: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[1]);
      if (Diff(c[2], c[6])) {
        dst[pOut + 1]          = ALPHA | c[5];
        dst[pOut + 2]          = ALPHA | c[5];
        dst[pOut + dstW + 2]   = ALPHA | c[5];
      } else {
        dst[pOut + 1]          = ALPHA | Interp3(c[5], c[2]);
        dst[pOut + 2]          = ALPHA | Interp4(c[5], c[2], c[6]);
        dst[pOut + dstW + 2]   = ALPHA | Interp3(c[5], c[6]);
      }
      dst[pOut + dstW]         = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + 2 * dstW]     = ALPHA | Interp2(c[5], c[8], c[4]);
      dst[pOut + 2 * dstW + 1] = ALPHA | Interp1(c[5], c[8]);
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[9]);
      break;
    }
    // ─── group U (subset 0-63): case 11 (Diff x1) ───
    case 11: {
      if (Diff(c[4], c[2])) {
        dst[pOut + 0]          = ALPHA | c[5];
        dst[pOut + 1]          = ALPHA | c[5];
        dst[pOut + dstW]       = ALPHA | c[5];
      } else {
        dst[pOut + 0]          = ALPHA | Interp4(c[5], c[4], c[2]);
        dst[pOut + 1]          = ALPHA | Interp3(c[5], c[2]);
        dst[pOut + dstW]       = ALPHA | Interp3(c[5], c[4]);
      }
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[3]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | Interp1(c[5], c[6]);
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[7]);
      dst[pOut + 2 * dstW + 1] = ALPHA | Interp1(c[5], c[8]);
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp2(c[5], c[6], c[8]);
      break;
    }
    // ─── group V (subset 0-63): case 19 (Diff x1) ───
    case 19: {
      if (Diff(c[2], c[6])) {
        dst[pOut + 0]          = ALPHA | Interp1(c[5], c[4]);
        dst[pOut + 1]          = ALPHA | c[5];
        dst[pOut + 2]          = ALPHA | Interp1(c[5], c[3]);
        dst[pOut + dstW + 2]   = ALPHA | c[5];
      } else {
        dst[pOut + 0]          = ALPHA | Interp2(c[5], c[4], c[2]);
        dst[pOut + 1]          = ALPHA | Interp1(c[5], c[2]);
        dst[pOut + 2]          = ALPHA | Interp5(c[4], c[2]);
        dst[pOut + dstW + 2]   = ALPHA | Interp1(c[5], c[6]);
      }
      dst[pOut + dstW]         = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + 2 * dstW]     = ALPHA | Interp2(c[5], c[8], c[4]);
      dst[pOut + 2 * dstW + 1] = ALPHA | Interp1(c[5], c[8]);
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[9]);
      break;
    }
    // ─── group AB (subset 0-63): case 42 (Diff x1) ───
    case 42: {
      if (Diff(c[4], c[2])) {
        dst[pOut + 0]          = ALPHA | Interp1(c[5], c[1]);
        dst[pOut + 1]          = ALPHA | c[5];
        dst[pOut + dstW]       = ALPHA | c[5];
        dst[pOut + 2 * dstW]   = ALPHA | Interp1(c[5], c[8]);
      } else {
        dst[pOut + 0]          = ALPHA | Interp5(c[4], c[2]);
        dst[pOut + 1]          = ALPHA | Interp1(c[5], c[2]);
        dst[pOut + dstW]       = ALPHA | Interp1(c[5], c[4]);
        dst[pOut + 2 * dstW]   = ALPHA | Interp2(c[5], c[8], c[4]);
      }
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[3]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | Interp1(c[5], c[6]);
      dst[pOut + 2 * dstW + 1] = ALPHA | Interp1(c[5], c[8]);
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp2(c[5], c[6], c[8]);
      break;
    }
    // ─── group AC (subset 0-63): case 14 (Diff x1) ───
    case 14: {
      if (Diff(c[4], c[2])) {
        dst[pOut + 0]          = ALPHA | Interp1(c[5], c[1]);
        dst[pOut + 1]          = ALPHA | c[5];
        dst[pOut + 2]          = ALPHA | Interp1(c[5], c[6]);
        dst[pOut + dstW]       = ALPHA | c[5];
      } else {
        dst[pOut + 0]          = ALPHA | Interp5(c[4], c[2]);
        dst[pOut + 1]          = ALPHA | Interp1(c[5], c[2]);
        dst[pOut + 2]          = ALPHA | Interp2(c[5], c[2], c[6]);
        dst[pOut + dstW]       = ALPHA | Interp1(c[5], c[4]);
      }
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | Interp1(c[5], c[6]);
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[7]);
      dst[pOut + 2 * dstW + 1] = ALPHA | Interp1(c[5], c[8]);
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp2(c[5], c[6], c[8]);
      break;
    }
    // ─── single case 28 ───
    case 28: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[1]);
      dst[pOut + 1]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + dstW]         = ALPHA | c[5];
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | c[5];
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[7]);
      dst[pOut + 2 * dstW + 1] = ALPHA | Interp1(c[5], c[8]);
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[9]);
      break;
    }
    // ─── single case 56 ───
    case 56: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[1]);
      dst[pOut + 1]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[3]);
      dst[pOut + dstW]         = ALPHA | c[5];
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | c[5];
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[8]);
      dst[pOut + 2 * dstW + 1] = ALPHA | Interp1(c[5], c[8]);
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[9]);
      break;
    }
    // ─── single case 25 ───
    case 25: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 1]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[3]);
      dst[pOut + dstW]         = ALPHA | c[5];
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | c[5];
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[7]);
      dst[pOut + 2 * dstW + 1] = ALPHA | Interp1(c[5], c[8]);
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[9]);
      break;
    }
    // ─── Diff x2 cases 26/31 ───
    case 26: case 31: {
      if (Diff(c[4], c[2])) {
        dst[pOut + 0]          = ALPHA | c[5];
        dst[pOut + dstW]       = ALPHA | c[5];
      } else {
        dst[pOut + 0]          = ALPHA | Interp4(c[5], c[4], c[2]);
        dst[pOut + dstW]       = ALPHA | Interp3(c[5], c[4]);
      }
      dst[pOut + 1]            = ALPHA | c[5];
      if (Diff(c[2], c[6])) {
        dst[pOut + 2]          = ALPHA | c[5];
        dst[pOut + dstW + 2]   = ALPHA | c[5];
      } else {
        dst[pOut + 2]          = ALPHA | Interp4(c[5], c[2], c[6]);
        dst[pOut + dstW + 2]   = ALPHA | Interp3(c[5], c[6]);
      }
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[7]);
      dst[pOut + 2 * dstW + 1] = ALPHA | Interp1(c[5], c[8]);
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[9]);
      break;
    }
    // ─── Diff x1 case 27 ───
    case 27: {
      if (Diff(c[4], c[2])) {
        dst[pOut + 0]          = ALPHA | c[5];
        dst[pOut + 1]          = ALPHA | c[5];
        dst[pOut + dstW]       = ALPHA | c[5];
      } else {
        dst[pOut + 0]          = ALPHA | Interp4(c[5], c[4], c[2]);
        dst[pOut + 1]          = ALPHA | Interp3(c[5], c[2]);
        dst[pOut + dstW]       = ALPHA | Interp3(c[5], c[4]);
      }
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[3]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | c[5];
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[7]);
      dst[pOut + 2 * dstW + 1] = ALPHA | Interp1(c[5], c[8]);
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[9]);
      break;
    }
    // ─── Diff x1 case 30 ───
    case 30: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[1]);
      if (Diff(c[2], c[6])) {
        dst[pOut + 1]          = ALPHA | c[5];
        dst[pOut + 2]          = ALPHA | c[5];
        dst[pOut + dstW + 2]   = ALPHA | c[5];
      } else {
        dst[pOut + 1]          = ALPHA | Interp3(c[5], c[2]);
        dst[pOut + 2]          = ALPHA | Interp4(c[5], c[2], c[6]);
        dst[pOut + dstW + 2]   = ALPHA | Interp3(c[5], c[6]);
      }
      dst[pOut + dstW]         = ALPHA | c[5];
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[7]);
      dst[pOut + 2 * dstW + 1] = ALPHA | Interp1(c[5], c[8]);
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[9]);
      break;
    }
    // ─── single case 29 ───
    case 29: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 1]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + dstW]         = ALPHA | c[5];
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | c[5];
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[7]);
      dst[pOut + 2 * dstW + 1] = ALPHA | Interp1(c[5], c[8]);
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[9]);
      break;
    }
    // ─── single case 57 ───
    case 57: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 1]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[3]);
      dst[pOut + dstW]         = ALPHA | c[5];
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | c[5];
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[8]);
      dst[pOut + 2 * dstW + 1] = ALPHA | Interp1(c[5], c[8]);
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[9]);
      break;
    }
    // ─── single case 60 ───
    case 60: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[1]);
      dst[pOut + 1]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + dstW]         = ALPHA | c[5];
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | c[5];
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[8]);
      dst[pOut + 2 * dstW + 1] = ALPHA | Interp1(c[5], c[8]);
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[9]);
      break;
    }
    // ─── Diff x2 case 58 (single) ───
    case 58: {
      if (Diff(c[4], c[2])) {
        dst[pOut + 0]          = ALPHA | Interp1(c[5], c[1]);
      } else {
        dst[pOut + 0]          = ALPHA | Interp2(c[5], c[4], c[2]);
      }
      dst[pOut + 1]            = ALPHA | c[5];
      if (Diff(c[2], c[6])) {
        dst[pOut + 2]          = ALPHA | Interp1(c[5], c[3]);
      } else {
        dst[pOut + 2]          = ALPHA | Interp2(c[5], c[2], c[6]);
      }
      dst[pOut + dstW]         = ALPHA | c[5];
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | c[5];
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[8]);
      dst[pOut + 2 * dstW + 1] = ALPHA | Interp1(c[5], c[8]);
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[9]);
      break;
    }
    // ─── Diff x1 cases 55/23 ───
    case 55: case 23: {
      if (Diff(c[2], c[6])) {
        dst[pOut + 0]          = ALPHA | Interp1(c[5], c[4]);
        dst[pOut + 1]          = ALPHA | c[5];
        dst[pOut + 2]          = ALPHA | c[5];
        dst[pOut + dstW + 2]   = ALPHA | c[5];
      } else {
        dst[pOut + 0]          = ALPHA | Interp2(c[5], c[4], c[2]);
        dst[pOut + 1]          = ALPHA | Interp1(c[5], c[2]);
        dst[pOut + 2]          = ALPHA | Interp5(c[4], c[2]);
        dst[pOut + dstW + 2]   = ALPHA | Interp1(c[5], c[6]);
      }
      dst[pOut + dstW]         = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + 2 * dstW]     = ALPHA | Interp2(c[5], c[8], c[4]);
      dst[pOut + 2 * dstW + 1] = ALPHA | Interp1(c[5], c[8]);
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[9]);
      break;
    }
    // ─── single case 15 (subset of group 143/15) ───
    case 15: {
      if (Diff(c[4], c[2])) {
        dst[pOut + 0]          = ALPHA | c[5];
        dst[pOut + 1]          = ALPHA | c[5];
        dst[pOut + 2]          = ALPHA | Interp1(c[5], c[6]);
        dst[pOut + dstW]       = ALPHA | c[5];
      } else {
        dst[pOut + 0]          = ALPHA | Interp5(c[4], c[2]);
        dst[pOut + 1]          = ALPHA | Interp1(c[5], c[2]);
        dst[pOut + 2]          = ALPHA | Interp2(c[5], c[2], c[6]);
        dst[pOut + dstW]       = ALPHA | Interp1(c[5], c[4]);
      }
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | Interp1(c[5], c[6]);
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[7]);
      dst[pOut + 2 * dstW + 1] = ALPHA | Interp1(c[5], c[8]);
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp2(c[5], c[6], c[8]);
      break;
    }
    // ─── Diff x1 case 62 ───
    case 62: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[1]);
      if (Diff(c[2], c[6])) {
        dst[pOut + 1]          = ALPHA | c[5];
        dst[pOut + 2]          = ALPHA | c[5];
        dst[pOut + dstW + 2]   = ALPHA | c[5];
      } else {
        dst[pOut + 1]          = ALPHA | Interp3(c[5], c[2]);
        dst[pOut + 2]          = ALPHA | Interp4(c[5], c[2], c[6]);
        dst[pOut + dstW + 2]   = ALPHA | Interp3(c[5], c[6]);
      }
      dst[pOut + dstW]         = ALPHA | c[5];
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[8]);
      dst[pOut + 2 * dstW + 1] = ALPHA | Interp1(c[5], c[8]);
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[9]);
      break;
    }
    // ─── single case 61 ───
    case 61: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 1]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + dstW]         = ALPHA | c[5];
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | c[5];
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[8]);
      dst[pOut + 2 * dstW + 1] = ALPHA | Interp1(c[5], c[8]);
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[9]);
      break;
    }
    // ─── Diff x2 case 59 (single) ───
    case 59: {
      if (Diff(c[4], c[2])) {
        dst[pOut + 0]          = ALPHA | c[5];
        dst[pOut + 1]          = ALPHA | c[5];
        dst[pOut + dstW]       = ALPHA | c[5];
      } else {
        dst[pOut + 0]          = ALPHA | Interp4(c[5], c[4], c[2]);
        dst[pOut + 1]          = ALPHA | Interp3(c[5], c[2]);
        dst[pOut + dstW]       = ALPHA | Interp3(c[5], c[4]);
      }
      if (Diff(c[2], c[6])) {
        dst[pOut + 2]          = ALPHA | Interp1(c[5], c[3]);
      } else {
        dst[pOut + 2]          = ALPHA | Interp2(c[5], c[2], c[6]);
      }
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | c[5];
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[8]);
      dst[pOut + 2 * dstW + 1] = ALPHA | Interp1(c[5], c[8]);
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[9]);
      break;
    }
    // ─── Diff x3 case 63 ───
    case 63: {
      if (Diff(c[4], c[2])) {
        dst[pOut + 0]          = ALPHA | c[5];
      } else {
        dst[pOut + 0]          = ALPHA | Interp2(c[5], c[4], c[2]);
      }
      dst[pOut + 1]            = ALPHA | c[5];
      if (Diff(c[2], c[6])) {
        dst[pOut + 2]          = ALPHA | c[5];
        dst[pOut + dstW + 2]   = ALPHA | c[5];
      } else {
        dst[pOut + 2]          = ALPHA | Interp4(c[5], c[2], c[6]);
        dst[pOut + dstW + 2]   = ALPHA | Interp3(c[5], c[6]);
      }
      dst[pOut + dstW]         = ALPHA | c[5];
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[8]);
      dst[pOut + 2 * dstW + 1] = ALPHA | Interp1(c[5], c[8]);
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[9]);
      break;
    }
    default: return;
  }
};
