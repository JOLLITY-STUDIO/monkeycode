// src/core/browser/scalers/hqx/Hq3xCases2.ts
//
// HQ3X case handler - pattern 64..127 (bit6=1, 即 c[7] 不同被打开).
// 1:1 port from fceux-2.6.6 hq3x.cpp (cases 64..127).

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
    // ─── group D: cases 64/65/68/69 ───
    case 64: case 65: case 68: case 69: {
      dst[pOut + 0]            = ALPHA | Interp2(c[5], c[4], c[2]);
      dst[pOut + 1]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 2]            = ALPHA | Interp2(c[5], c[2], c[6]);
      dst[pOut + dstW]         = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | Interp1(c[5], c[6]);
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[7]);
      dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[9]);
      break;
    }
    // ─── single case 66 ───
    case 66: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[1]);
      dst[pOut + 1]            = ALPHA | c[5];
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[3]);
      dst[pOut + dstW]         = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | Interp1(c[5], c[6]);
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[7]);
      dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[9]);
      break;
    }
    // ─── single case 67 ───
    case 67: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + 1]            = ALPHA | c[5];
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[3]);
      dst[pOut + dstW]         = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | Interp1(c[5], c[6]);
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[7]);
      dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[9]);
      break;
    }
    // ─── single case 70 ───
    case 70: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[1]);
      dst[pOut + 1]            = ALPHA | c[5];
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[6]);
      dst[pOut + dstW]         = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | Interp1(c[5], c[6]);
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[7]);
      dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[9]);
      break;
    }
    // ─── single case 71 ───
    case 71: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + 1]            = ALPHA | c[5];
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[6]);
      dst[pOut + dstW]         = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | Interp1(c[5], c[6]);
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[7]);
      dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[9]);
      break;
    }
    // ─── group P (Diff x1): cases 72/76 ───
    case 72: case 76: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[1]);
      dst[pOut + 1]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 2]            = ALPHA | Interp2(c[5], c[2], c[6]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | Interp1(c[5], c[6]);
      if (Diff(c[8], c[4])) {
        dst[pOut + dstW]       = ALPHA | c[5];
        dst[pOut + 2 * dstW]   = ALPHA | Interp1(c[5], c[7]);
        dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
      } else {
        dst[pOut + dstW]       = ALPHA | Interp3(c[5], c[4]);
        dst[pOut + 2 * dstW]   = ALPHA | Interp4(c[5], c[8], c[4]);
        dst[pOut + 2 * dstW + 1] = ALPHA | Interp3(c[5], c[8]);
      }
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[9]);
      break;
    }
    // ─── group AA (Diff x1): cases 73/77 ───
    case 73: case 77: {
      if (Diff(c[8], c[4])) {
        dst[pOut + 0]          = ALPHA | Interp1(c[5], c[2]);
        dst[pOut + dstW]       = ALPHA | c[5];
        dst[pOut + 2 * dstW]   = ALPHA | Interp1(c[5], c[7]);
        dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
      } else {
        dst[pOut + 0]          = ALPHA | Interp2(c[5], c[4], c[2]);
        dst[pOut + dstW]       = ALPHA | Interp1(c[5], c[4]);
        dst[pOut + 2 * dstW]   = ALPHA | Interp5(c[8], c[4]);
        dst[pOut + 2 * dstW + 1] = ALPHA | Interp1(c[5], c[8]);
      }
      dst[pOut + 1]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 2]            = ALPHA | Interp2(c[5], c[2], c[6]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | Interp1(c[5], c[6]);
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[9]);
      break;
    }
    // ─── group (Diff x2): cases 74/107 ───
    case 74: case 107: {
      if (Diff(c[4], c[2])) {
        dst[pOut + 0]          = ALPHA | c[5];
        dst[pOut + 1]          = ALPHA | c[5];
      } else {
        dst[pOut + 0]          = ALPHA | Interp4(c[5], c[4], c[2]);
        dst[pOut + 1]          = ALPHA | Interp3(c[5], c[2]);
      }
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[3]);
      dst[pOut + dstW]         = ALPHA | c[5];
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | Interp1(c[5], c[6]);
      if (Diff(c[8], c[4])) {
        dst[pOut + 2 * dstW]   = ALPHA | c[5];
        dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
      } else {
        dst[pOut + 2 * dstW]   = ALPHA | Interp4(c[5], c[8], c[4]);
        dst[pOut + 2 * dstW + 1] = ALPHA | Interp3(c[5], c[8]);
      }
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[9]);
      break;
    }
    // ─── single case 75 (Diff x2) ───
    case 75: {
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
      dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[9]);
      break;
    }
    // ─── single case 78 (Diff x2) ───
    case 78: {
      if (Diff(c[4], c[2])) {
        dst[pOut + 0]          = ALPHA | Interp1(c[5], c[1]);
      } else {
        dst[pOut + 0]          = ALPHA | Interp2(c[5], c[4], c[2]);
      }
      dst[pOut + 1]            = ALPHA | c[5];
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[6]);
      dst[pOut + dstW]         = ALPHA | c[5];
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | Interp1(c[5], c[6]);
      if (Diff(c[8], c[4])) {
        dst[pOut + 2 * dstW]   = ALPHA | Interp1(c[5], c[7]);
      } else {
        dst[pOut + 2 * dstW]   = ALPHA | Interp2(c[5], c[8], c[4]);
      }
      dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[9]);
      break;
    }
    // ─── single case 79 (Diff x3) ───
    case 79: {
      if (Diff(c[4], c[2])) {
        dst[pOut + 0]          = ALPHA | c[5];
        dst[pOut + 1]          = ALPHA | c[5];
        dst[pOut + dstW]       = ALPHA | c[5];
      } else {
        dst[pOut + 0]          = ALPHA | Interp4(c[5], c[4], c[2]);
        dst[pOut + 1]          = ALPHA | Interp3(c[5], c[2]);
        dst[pOut + dstW]       = ALPHA | Interp3(c[5], c[4]);
      }
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[6]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | Interp1(c[5], c[6]);
      if (Diff(c[8], c[4])) {
        dst[pOut + 2 * dstW]   = ALPHA | Interp1(c[5], c[7]);
      } else {
        dst[pOut + 2 * dstW]   = ALPHA | Interp2(c[5], c[8], c[4]);
      }
      dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[9]);
      break;
    }
    // ─── group O (Diff x1): cases 80/81 ───
    case 80: case 81: {
      dst[pOut + 0]            = ALPHA | Interp2(c[5], c[4], c[2]);
      dst[pOut + 1]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[3]);
      dst[pOut + dstW]         = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[7]);
      if (Diff(c[6], c[8])) {
        dst[pOut + dstW + 2]   = ALPHA | c[5];
        dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
        dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[9]);
      } else {
        dst[pOut + dstW + 2]   = ALPHA | Interp3(c[5], c[6]);
        dst[pOut + 2 * dstW + 1] = ALPHA | Interp3(c[5], c[8]);
        dst[pOut + 2 * dstW + 2] = ALPHA | Interp4(c[5], c[6], c[8]);
      }
      break;
    }
    // ─── single case 82 (Diff x2) ───
    case 82: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[1]);
      if (Diff(c[2], c[6])) {
        dst[pOut + 1]          = ALPHA | c[5];
        dst[pOut + 2]          = ALPHA | c[5];
      } else {
        dst[pOut + 1]          = ALPHA | Interp3(c[5], c[2]);
        dst[pOut + 2]          = ALPHA | Interp4(c[5], c[2], c[6]);
      }
      dst[pOut + dstW]         = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | c[5];
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[7]);
      if (Diff(c[6], c[8])) {
        dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
        dst[pOut + 2 * dstW + 2] = ALPHA | c[5];
      } else {
        dst[pOut + 2 * dstW + 1] = ALPHA | Interp3(c[5], c[8]);
        dst[pOut + 2 * dstW + 2] = ALPHA | Interp4(c[5], c[6], c[8]);
      }
      break;
    }
    // ─── single case 83 (Diff x2) ───
    case 83: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + 1]            = ALPHA | c[5];
      if (Diff(c[2], c[6])) {
        dst[pOut + 2]          = ALPHA | Interp1(c[5], c[3]);
      } else {
        dst[pOut + 2]          = ALPHA | Interp2(c[5], c[2], c[6]);
      }
      dst[pOut + dstW]         = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | c[5];
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[7]);
      dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
      if (Diff(c[6], c[8])) {
        dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[9]);
      } else {
        dst[pOut + 2 * dstW + 2] = ALPHA | Interp2(c[5], c[6], c[8]);
      }
      break;
    }
    // ─── group X (Diff x1): cases 84/85 ───
    case 84: case 85: {
      if (Diff(c[6], c[8])) {
        dst[pOut + 2]          = ALPHA | Interp1(c[5], c[2]);
        dst[pOut + dstW + 2]   = ALPHA | c[5];
        dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
        dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[9]);
      } else {
        dst[pOut + 2]          = ALPHA | Interp2(c[5], c[2], c[6]);
        dst[pOut + dstW + 2]   = ALPHA | Interp1(c[5], c[6]);
        dst[pOut + 2 * dstW + 1] = ALPHA | Interp1(c[5], c[8]);
        dst[pOut + 2 * dstW + 2] = ALPHA | Interp5(c[4], c[2]);
      }
      dst[pOut + 0]            = ALPHA | Interp2(c[5], c[4], c[2]);
      dst[pOut + 1]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + dstW]         = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[7]);
      break;
    }
    // ─── single case 86 (Diff x1) ───
    case 86: {
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
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[7]);
      dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[9]);
      break;
    }
    // ─── single case 87 (Diff x3) ───
    case 87: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[4]);
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
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[7]);
      dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
      if (Diff(c[6], c[8])) {
        dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[9]);
      } else {
        dst[pOut + 2 * dstW + 2] = ALPHA | Interp2(c[5], c[6], c[8]);
      }
      break;
    }
    // ─── single case 88 (Diff x2) ───
    case 88: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[1]);
      dst[pOut + 1]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[3]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      if (Diff(c[8], c[4])) {
        dst[pOut + dstW]       = ALPHA | c[5];
        dst[pOut + 2 * dstW]   = ALPHA | c[5];
      } else {
        dst[pOut + dstW]       = ALPHA | Interp3(c[5], c[4]);
        dst[pOut + 2 * dstW]   = ALPHA | Interp4(c[5], c[8], c[4]);
      }
      dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
      if (Diff(c[6], c[8])) {
        dst[pOut + dstW + 2]   = ALPHA | c[5];
        dst[pOut + 2 * dstW + 2] = ALPHA | c[5];
      } else {
        dst[pOut + dstW + 2]   = ALPHA | Interp3(c[5], c[6]);
        dst[pOut + 2 * dstW + 2] = ALPHA | Interp4(c[5], c[6], c[8]);
      }
      break;
    }
    // ─── single case 89 (Diff x2) ───
    case 89: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 1]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[3]);
      dst[pOut + dstW]         = ALPHA | c[5];
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | c[5];
      if (Diff(c[8], c[4])) {
        dst[pOut + 2 * dstW]   = ALPHA | Interp1(c[5], c[7]);
      } else {
        dst[pOut + 2 * dstW]   = ALPHA | Interp2(c[5], c[8], c[4]);
      }
      dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
      if (Diff(c[6], c[8])) {
        dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[9]);
      } else {
        dst[pOut + 2 * dstW + 2] = ALPHA | Interp2(c[5], c[6], c[8]);
      }
      break;
    }
    // ─── single case 90 (Diff x4) ───
    case 90: {
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
      if (Diff(c[8], c[4])) {
        dst[pOut + 2 * dstW]   = ALPHA | Interp1(c[5], c[7]);
      } else {
        dst[pOut + 2 * dstW]   = ALPHA | Interp2(c[5], c[8], c[4]);
      }
      dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
      if (Diff(c[6], c[8])) {
        dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[9]);
      } else {
        dst[pOut + 2 * dstW + 2] = ALPHA | Interp2(c[5], c[6], c[8]);
      }
      break;
    }
    // ─── single case 91 (Diff x4) ───
    case 91: {
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
      if (Diff(c[8], c[4])) {
        dst[pOut + 2 * dstW]   = ALPHA | Interp1(c[5], c[7]);
      } else {
        dst[pOut + 2 * dstW]   = ALPHA | Interp2(c[5], c[8], c[4]);
      }
      dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
      if (Diff(c[6], c[8])) {
        dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[9]);
      } else {
        dst[pOut + 2 * dstW + 2] = ALPHA | Interp2(c[5], c[6], c[8]);
      }
      break;
    }
    // ─── single case 92 (Diff x2) ───
    case 92: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[1]);
      dst[pOut + 1]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + dstW]         = ALPHA | c[5];
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | c[5];
      if (Diff(c[8], c[4])) {
        dst[pOut + 2 * dstW]   = ALPHA | Interp1(c[5], c[7]);
      } else {
        dst[pOut + 2 * dstW]   = ALPHA | Interp2(c[5], c[8], c[4]);
      }
      dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
      if (Diff(c[6], c[8])) {
        dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[9]);
      } else {
        dst[pOut + 2 * dstW + 2] = ALPHA | Interp2(c[5], c[6], c[8]);
      }
      break;
    }
    // ─── single case 93 (Diff x2) ───
    case 93: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 1]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + dstW]         = ALPHA | c[5];
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | c[5];
      if (Diff(c[8], c[4])) {
        dst[pOut + 2 * dstW]   = ALPHA | Interp1(c[5], c[7]);
      } else {
        dst[pOut + 2 * dstW]   = ALPHA | Interp2(c[5], c[8], c[4]);
      }
      dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
      if (Diff(c[6], c[8])) {
        dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[9]);
      } else {
        dst[pOut + 2 * dstW + 2] = ALPHA | Interp2(c[5], c[6], c[8]);
      }
      break;
    }
    // ─── single case 94 (Diff x5) ───
    case 94: {
      if (Diff(c[4], c[2])) {
        dst[pOut + 0]          = ALPHA | Interp1(c[5], c[1]);
      } else {
        dst[pOut + 0]          = ALPHA | Interp2(c[5], c[4], c[2]);
      }
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
      if (Diff(c[8], c[4])) {
        dst[pOut + 2 * dstW]   = ALPHA | Interp1(c[5], c[7]);
      } else {
        dst[pOut + 2 * dstW]   = ALPHA | Interp2(c[5], c[8], c[4]);
      }
      dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
      if (Diff(c[6], c[8])) {
        dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[9]);
      } else {
        dst[pOut + 2 * dstW + 2] = ALPHA | Interp2(c[5], c[6], c[8]);
      }
      break;
    }
    // ─── single case 95 (Diff x4) ───
    case 95: {
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
      dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[9]);
      break;
    }
    // ─── group K: cases 96/97/100/101 ───
    case 96: case 97: case 100: case 101: {
      dst[pOut + 0]            = ALPHA | Interp2(c[5], c[4], c[2]);
      dst[pOut + 1]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 2]            = ALPHA | Interp2(c[5], c[2], c[6]);
      dst[pOut + dstW]         = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | Interp1(c[5], c[6]);
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[9]);
      break;
    }
    // ─── single case 98 ───
    case 98: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[1]);
      dst[pOut + 1]            = ALPHA | c[5];
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[3]);
      dst[pOut + dstW]         = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | Interp1(c[5], c[6]);
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[9]);
      break;
    }
    // ─── single case 99 ───
    case 99: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + 1]            = ALPHA | c[5];
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[3]);
      dst[pOut + dstW]         = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | Interp1(c[5], c[6]);
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[9]);
      break;
    }
    // ─── single case 102 ───
    case 102: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[1]);
      dst[pOut + 1]            = ALPHA | c[5];
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[6]);
      dst[pOut + dstW]         = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | Interp1(c[5], c[6]);
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[9]);
      break;
    }
    // ─── single case 103 ───
    case 103: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + 1]            = ALPHA | c[5];
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[6]);
      dst[pOut + dstW]         = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | Interp1(c[5], c[6]);
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[9]);
      break;
    }
    // ─── group T (Diff x1): cases 104/108 ───
    case 104: case 108: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[1]);
      dst[pOut + 1]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 2]            = ALPHA | Interp2(c[5], c[2], c[6]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | Interp1(c[5], c[6]);
      if (Diff(c[8], c[4])) {
        dst[pOut + dstW]       = ALPHA | c[5];
        dst[pOut + 2 * dstW]   = ALPHA | c[5];
        dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
      } else {
        dst[pOut + dstW]       = ALPHA | Interp3(c[5], c[4]);
        dst[pOut + 2 * dstW]   = ALPHA | Interp4(c[5], c[8], c[4]);
        dst[pOut + 2 * dstW + 1] = ALPHA | Interp3(c[5], c[8]);
      }
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[9]);
      break;
    }
    // ─── group (Diff x2): cases 109/105 (also 105 alone) ───
    case 109: case 105: {
      if (Diff(c[8], c[4])) {
        dst[pOut + 0]          = ALPHA | Interp1(c[5], c[2]);
        dst[pOut + dstW]       = ALPHA | c[5];
        dst[pOut + 2 * dstW]   = ALPHA | c[5];
        dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
      } else {
        dst[pOut + 0]          = ALPHA | Interp2(c[5], c[4], c[2]);
        dst[pOut + dstW]       = ALPHA | Interp1(c[5], c[4]);
        dst[pOut + 2 * dstW]   = ALPHA | Interp5(c[8], c[4]);
        dst[pOut + 2 * dstW + 1] = ALPHA | Interp1(c[5], c[8]);
      }
      dst[pOut + 1]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 2]            = ALPHA | Interp2(c[5], c[2], c[6]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | Interp1(c[5], c[6]);
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[9]);
      break;
    }
    // ─── single case 106 (Diff x1) ───
    case 106: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[1]);
      dst[pOut + 1]            = ALPHA | c[5];
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[3]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | Interp1(c[5], c[6]);
      if (Diff(c[8], c[4])) {
        dst[pOut + dstW]       = ALPHA | c[5];
        dst[pOut + 2 * dstW]   = ALPHA | c[5];
        dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
      } else {
        dst[pOut + dstW]       = ALPHA | Interp3(c[5], c[4]);
        dst[pOut + 2 * dstW]   = ALPHA | Interp4(c[5], c[8], c[4]);
        dst[pOut + 2 * dstW + 1] = ALPHA | Interp3(c[5], c[8]);
      }
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[9]);
      break;
    }
    // ─── single case 110 (Diff x1) ───
    case 110: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[1]);
      dst[pOut + 1]            = ALPHA | c[5];
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[6]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | Interp1(c[5], c[6]);
      if (Diff(c[8], c[4])) {
        dst[pOut + dstW]       = ALPHA | c[5];
        dst[pOut + 2 * dstW]   = ALPHA | c[5];
        dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
      } else {
        dst[pOut + dstW]       = ALPHA | Interp3(c[5], c[4]);
        dst[pOut + 2 * dstW]   = ALPHA | Interp4(c[5], c[8], c[4]);
        dst[pOut + 2 * dstW + 1] = ALPHA | Interp3(c[5], c[8]);
      }
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[9]);
      break;
    }
    // ─── single case 111 (Diff x3) ───
    case 111: {
      if (Diff(c[4], c[2])) {
        dst[pOut + 0]          = ALPHA | c[5];
      } else {
        dst[pOut + 0]          = ALPHA | Interp2(c[5], c[4], c[2]);
      }
      dst[pOut + 1]            = ALPHA | c[5];
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[6]);
      dst[pOut + dstW]         = ALPHA | c[5];
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | Interp1(c[5], c[6]);
      if (Diff(c[8], c[4])) {
        dst[pOut + 2 * dstW]   = ALPHA | c[5];
        dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
      } else {
        dst[pOut + 2 * dstW]   = ALPHA | Interp4(c[5], c[8], c[4]);
        dst[pOut + 2 * dstW + 1] = ALPHA | Interp3(c[5], c[8]);
      }
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[9]);
      break;
    }
    // ─── group Y (Diff x1): cases 112/113 ───
    case 112: case 113: {
      if (Diff(c[6], c[8])) {
        dst[pOut + dstW + 2]   = ALPHA | c[5];
        dst[pOut + 2 * dstW]   = ALPHA | Interp1(c[5], c[4]);
        dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
        dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[9]);
      } else {
        dst[pOut + dstW + 2]   = ALPHA | Interp1(c[5], c[6]);
        dst[pOut + 2 * dstW]   = ALPHA | Interp2(c[5], c[8], c[4]);
        dst[pOut + 2 * dstW + 1] = ALPHA | Interp1(c[5], c[8]);
        dst[pOut + 2 * dstW + 2] = ALPHA | Interp5(c[6], c[8]);
      }
      dst[pOut + 0]            = ALPHA | Interp2(c[5], c[4], c[2]);
      dst[pOut + 1]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[3]);
      dst[pOut + dstW]         = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      break;
    }
    // ─── single case 114 (Diff x2) ───
    case 114: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[1]);
      dst[pOut + 1]            = ALPHA | c[5];
      if (Diff(c[2], c[6])) {
        dst[pOut + 2]          = ALPHA | Interp1(c[5], c[3]);
      } else {
        dst[pOut + 2]          = ALPHA | Interp2(c[5], c[2], c[6]);
      }
      dst[pOut + dstW]         = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | c[5];
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
      if (Diff(c[6], c[8])) {
        dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[9]);
      } else {
        dst[pOut + 2 * dstW + 2] = ALPHA | Interp2(c[5], c[6], c[8]);
      }
      break;
    }
    // ─── single case 115 (Diff x3) ───
    case 115: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + 1]            = ALPHA | c[5];
      if (Diff(c[2], c[6])) {
        dst[pOut + 2]          = ALPHA | Interp1(c[5], c[3]);
      } else {
        dst[pOut + 2]          = ALPHA | Interp2(c[5], c[2], c[6]);
      }
      dst[pOut + dstW]         = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | c[5];
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
      if (Diff(c[6], c[8])) {
        dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[9]);
      } else {
        dst[pOut + 2 * dstW + 2] = ALPHA | Interp2(c[5], c[6], c[8]);
      }
      break;
    }
    // ─── group (Diff x2): cases 117/116 ───
    case 117: case 116: {
      dst[pOut + 0]            = ALPHA | Interp2(c[5], c[4], c[2]);
      dst[pOut + 1]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + dstW]         = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | c[5];
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
      if (Diff(c[6], c[8])) {
        dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[9]);
      } else {
        dst[pOut + 2 * dstW + 2] = ALPHA | Interp2(c[5], c[6], c[8]);
      }
      break;
    }
    // ─── single case 118 (Diff x1) ───
    case 118: {
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
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[9]);
      break;
    }
    // ─── single case 119 (Diff) ───
    case 119: {
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
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[9]);
      break;
    }
    // ─── single case 120 (Diff x1) ───
    case 120: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[1]);
      dst[pOut + 1]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[3]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | c[5];
      if (Diff(c[8], c[4])) {
        dst[pOut + dstW]       = ALPHA | c[5];
        dst[pOut + 2 * dstW]   = ALPHA | c[5];
        dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
      } else {
        dst[pOut + dstW]       = ALPHA | Interp3(c[5], c[4]);
        dst[pOut + 2 * dstW]   = ALPHA | Interp4(c[5], c[8], c[4]);
        dst[pOut + 2 * dstW + 1] = ALPHA | Interp3(c[5], c[8]);
      }
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[9]);
      break;
    }
    // ─── single case 121 (Diff x3) ───
    case 121: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 1]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[3]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | c[5];
      if (Diff(c[8], c[4])) {
        dst[pOut + dstW]       = ALPHA | c[5];
        dst[pOut + 2 * dstW]   = ALPHA | c[5];
        dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
      } else {
        dst[pOut + dstW]       = ALPHA | Interp3(c[5], c[4]);
        dst[pOut + 2 * dstW]   = ALPHA | Interp4(c[5], c[8], c[4]);
        dst[pOut + 2 * dstW + 1] = ALPHA | Interp3(c[5], c[8]);
      }
      if (Diff(c[6], c[8])) {
        dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[9]);
      } else {
        dst[pOut + 2 * dstW + 2] = ALPHA | Interp2(c[5], c[6], c[8]);
      }
      break;
    }
    // ─── single case 122 (Diff x4) ───
    case 122: {
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
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | c[5];
      if (Diff(c[8], c[4])) {
        dst[pOut + dstW]       = ALPHA | c[5];
        dst[pOut + 2 * dstW]   = ALPHA | c[5];
        dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
      } else {
        dst[pOut + dstW]       = ALPHA | Interp3(c[5], c[4]);
        dst[pOut + 2 * dstW]   = ALPHA | Interp4(c[5], c[8], c[4]);
        dst[pOut + 2 * dstW + 1] = ALPHA | Interp3(c[5], c[8]);
      }
      if (Diff(c[6], c[8])) {
        dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[9]);
      } else {
        dst[pOut + 2 * dstW + 2] = ALPHA | Interp2(c[5], c[6], c[8]);
      }
      break;
    }
    // ─── single case 123 (Diff x4) ───
    case 123: {
      if (Diff(c[4], c[2])) {
        dst[pOut + 0]          = ALPHA | c[5];
        dst[pOut + 1]          = ALPHA | c[5];
      } else {
        dst[pOut + 0]          = ALPHA | Interp4(c[5], c[4], c[2]);
        dst[pOut + 1]          = ALPHA | Interp3(c[5], c[2]);
      }
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[3]);
      dst[pOut + dstW]         = ALPHA | c[5];
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | c[5];
      if (Diff(c[8], c[4])) {
        dst[pOut + 2 * dstW]   = ALPHA | c[5];
        dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
      } else {
        dst[pOut + 2 * dstW]   = ALPHA | Interp4(c[5], c[8], c[4]);
        dst[pOut + 2 * dstW + 1] = ALPHA | Interp3(c[5], c[8]);
      }
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[9]);
      break;
    }
    // ─── single case 124 (Diff x1) ───
    case 124: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[1]);
      dst[pOut + 1]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | c[5];
      if (Diff(c[8], c[4])) {
        dst[pOut + dstW]       = ALPHA | c[5];
        dst[pOut + 2 * dstW]   = ALPHA | c[5];
        dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
      } else {
        dst[pOut + dstW]       = ALPHA | Interp3(c[5], c[4]);
        dst[pOut + 2 * dstW]   = ALPHA | Interp4(c[5], c[8], c[4]);
        dst[pOut + 2 * dstW + 1] = ALPHA | Interp3(c[5], c[8]);
      }
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[9]);
      break;
    }
    // ─── single case 125 (Diff x2) ───
    case 125: {
      if (Diff(c[8], c[4])) {
        dst[pOut + 0]          = ALPHA | Interp1(c[5], c[2]);
        dst[pOut + dstW]       = ALPHA | c[5];
        dst[pOut + 2 * dstW]   = ALPHA | c[5];
        dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
      } else {
        dst[pOut + 0]          = ALPHA | Interp2(c[5], c[4], c[2]);
        dst[pOut + dstW]       = ALPHA | Interp1(c[5], c[4]);
        dst[pOut + 2 * dstW]   = ALPHA | Interp5(c[8], c[4]);
        dst[pOut + 2 * dstW + 1] = ALPHA | Interp1(c[5], c[8]);
      }
      dst[pOut + 1]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | c[5];
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[9]);
      break;
    }
    // ─── single case 126 (Diff x3) ───
    case 126: {
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
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      if (Diff(c[8], c[4])) {
        dst[pOut + dstW]       = ALPHA | c[5];
        dst[pOut + 2 * dstW]   = ALPHA | c[5];
        dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
      } else {
        dst[pOut + dstW]       = ALPHA | Interp3(c[5], c[4]);
        dst[pOut + 2 * dstW]   = ALPHA | Interp4(c[5], c[8], c[4]);
        dst[pOut + 2 * dstW + 1] = ALPHA | Interp3(c[5], c[8]);
      }
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[9]);
      break;
    }
    // ─── single case 127 (Diff x5) ───
    case 127: {
      if (Diff(c[4], c[2])) {
        dst[pOut + 0]          = ALPHA | c[5];
        dst[pOut + 1]          = ALPHA | c[5];
        dst[pOut + dstW]       = ALPHA | c[5];
      } else {
        dst[pOut + 0]          = ALPHA | Interp2(c[5], c[4], c[2]);
        dst[pOut + 1]          = ALPHA | Interp3(c[5], c[2]);
        dst[pOut + dstW]       = ALPHA | Interp3(c[5], c[4]);
      }
      if (Diff(c[2], c[6])) {
        dst[pOut + 2]          = ALPHA | c[5];
        dst[pOut + dstW + 2]   = ALPHA | c[5];
      } else {
        dst[pOut + 2]          = ALPHA | Interp4(c[5], c[2], c[6]);
        dst[pOut + dstW + 2]   = ALPHA | Interp3(c[5], c[6]);
      }
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      if (Diff(c[8], c[4])) {
        dst[pOut + 2 * dstW]   = ALPHA | c[5];
        dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
      } else {
        dst[pOut + 2 * dstW]   = ALPHA | Interp4(c[5], c[8], c[4]);
        dst[pOut + 2 * dstW + 1] = ALPHA | Interp3(c[5], c[8]);
      }
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[9]);
      break;
    }
    default: return;
  }
};
