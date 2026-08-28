// src/core/browser/scalers/hqx/Hq3xCases3.ts
//
// HQ3X case handler - pattern 128..191 (bit7=1, c[2] 不同被打开).
// 1:1 port from fceux-2.6.6 hq3x.cpp (cases 128..191).

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
    // ─── group A (subset 128-191): 128/132/160/161/133/164/165 ───
    case 128: case 132: case 160: case 161:
    case 133: case 164: case 165: {
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
    // ─── group B (subset 128-191): case 162 ───
    case 162: {
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
    // ─── group C (subset 128-191): cases 144/145 ───
    case 144: case 145: {
      dst[pOut + 0]            = ALPHA | Interp2(c[5], c[4], c[2]);
      dst[pOut + 1]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[3]);
      dst[pOut + dstW]         = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | c[5];
      dst[pOut + 2 * dstW]     = ALPHA | Interp2(c[5], c[8], c[4]);
      dst[pOut + 2 * dstW + 1] = ALPHA | Interp1(c[5], c[8]);
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[8]);
      break;
    }
    // ─── group E (subset 128-191): cases 136/140 ───
    case 136: case 140: {
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
    // ─── group F (subset 128-191): cases 131/163 ───
    case 131: case 163: {
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
    // ─── group G (subset 128-191): cases 134/166 ───
    case 134: case 166: {
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
    // ─── group H: cases 148/149/180 ───
    case 148: case 149: case 180: {
      dst[pOut + 0]            = ALPHA | Interp2(c[5], c[4], c[2]);
      dst[pOut + 1]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + dstW]         = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | c[5];
      dst[pOut + 2 * dstW]     = ALPHA | Interp2(c[5], c[8], c[4]);
      dst[pOut + 2 * dstW + 1] = ALPHA | Interp1(c[5], c[8]);
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[8]);
      break;
    }
    // ─── group I: cases 176/177 ───
    case 176: case 177: {
      dst[pOut + 0]            = ALPHA | Interp2(c[5], c[4], c[2]);
      dst[pOut + 1]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[3]);
      dst[pOut + dstW]         = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | c[5];
      dst[pOut + 2 * dstW]     = ALPHA | Interp2(c[5], c[8], c[4]);
      dst[pOut + 2 * dstW + 1] = ALPHA | Interp1(c[5], c[8]);
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[8]);
      break;
    }
    // ─── group L (subset 128-191): cases 168/172 ───
    case 168: case 172: {
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
    // ─── group M (subset 128-191): cases 137/141 ───
    case 137: case 141: {
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
    // ─── group Q (subset): case 138 (Diff x1) ───
    case 138: {
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
    // ─── group U (subset): case 139 (Diff x1) ───
    case 139: {
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
    // ─── group W (subset 128-191): cases 146/178 (Diff x1) ───
    case 146: case 178: {
      if (Diff(c[2], c[6])) {
        dst[pOut + 1]          = ALPHA | c[5];
        dst[pOut + 2]          = ALPHA | Interp1(c[5], c[3]);
        dst[pOut + dstW + 2]   = ALPHA | c[5];
        dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[8]);
      } else {
        dst[pOut + 1]          = ALPHA | Interp1(c[5], c[2]);
        dst[pOut + 2]          = ALPHA | Interp5(c[4], c[2]);
        dst[pOut + dstW + 2]   = ALPHA | Interp1(c[5], c[6]);
        dst[pOut + 2 * dstW + 2] = ALPHA | Interp2(c[5], c[6], c[8]);
      }
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[1]);
      dst[pOut + dstW]         = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + 2 * dstW]     = ALPHA | Interp2(c[5], c[8], c[4]);
      dst[pOut + 2 * dstW + 1] = ALPHA | Interp1(c[5], c[8]);
      break;
    }
    // ─── group AB (subset): case 170 (Diff x1) ───
    case 170: {
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
    // ─── group AC (subset): case 142 (Diff x1) ───
    case 142: {
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
    // ─── single case 152 ───
    case 152: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[1]);
      dst[pOut + 1]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[3]);
      dst[pOut + dstW]         = ALPHA | c[5];
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | c[5];
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[7]);
      dst[pOut + 2 * dstW + 1] = ALPHA | Interp1(c[5], c[8]);
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[8]);
      break;
    }
    // ─── single case 153 ───
    case 153: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 1]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[3]);
      dst[pOut + dstW]         = ALPHA | c[5];
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | c[5];
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[7]);
      dst[pOut + 2 * dstW + 1] = ALPHA | Interp1(c[5], c[8]);
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[8]);
      break;
    }
    // ─── Diff x3 case 155 ───
    case 155: {
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
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[8]);
      break;
    }
    // ─── single case 156 ───
    case 156: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[1]);
      dst[pOut + 1]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + dstW]         = ALPHA | c[5];
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | c[5];
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[7]);
      dst[pOut + 2 * dstW + 1] = ALPHA | Interp1(c[5], c[8]);
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[8]);
      break;
    }
    // ─── single case 157 ───
    case 157: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 1]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + dstW]         = ALPHA | c[5];
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | c[5];
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[7]);
      dst[pOut + 2 * dstW + 1] = ALPHA | Interp1(c[5], c[8]);
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[8]);
      break;
    }
    // ─── Diff x2 case 158 ───
    case 158: {
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
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[7]);
      dst[pOut + 2 * dstW + 1] = ALPHA | Interp1(c[5], c[8]);
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[8]);
      break;
    }
    // ─── Diff x3 case 159 ───
    case 159: {
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
      } else {
        dst[pOut + 2]          = ALPHA | Interp2(c[5], c[2], c[6]);
      }
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | c[5];
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[7]);
      dst[pOut + 2 * dstW + 1] = ALPHA | Interp1(c[5], c[8]);
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[8]);
      break;
    }
    // ─── single case 167 ───
    case 167: {
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
    // ─── group (subset of 41/169/45): case 169 (Diff x1) ───
    case 169: {
      if (Diff(c[4], c[2])) {
        dst[pOut + 0]          = ALPHA | c[5];
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
    // ─── group (subset of 43/171): case 171 (Diff x1) ───
    case 171: {
      if (Diff(c[4], c[2])) {
        dst[pOut + 0]          = ALPHA | c[5];
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
    // ─── single case 173 ───
    case 173: {
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
    // ─── group (subset of 46/174): case 174 (Diff x1) ───
    case 174: {
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
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[8]);
      dst[pOut + 2 * dstW + 1] = ALPHA | Interp1(c[5], c[8]);
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp2(c[5], c[6], c[8]);
      break;
    }
    // ─── group (subset of 47/175): case 175 (Diff x1) ───
    case 175: {
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
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[8]);
      dst[pOut + 2 * dstW + 1] = ALPHA | Interp1(c[5], c[8]);
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp2(c[5], c[6], c[8]);
      break;
    }
    // ─── group (subset of 147/179): case 179 (Diff x1) ───
    case 179: {
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
      dst[pOut + 2 * dstW]     = ALPHA | Interp2(c[5], c[8], c[4]);
      dst[pOut + 2 * dstW + 1] = ALPHA | Interp1(c[5], c[8]);
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[8]);
      break;
    }
    // ─── single case 181 ───
    case 181: {
      dst[pOut + 0]            = ALPHA | Interp2(c[5], c[4], c[2]);
      dst[pOut + 1]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + dstW]         = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | c[5];
      dst[pOut + 2 * dstW]     = ALPHA | Interp2(c[5], c[8], c[4]);
      dst[pOut + 2 * dstW + 1] = ALPHA | Interp1(c[5], c[8]);
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[8]);
      break;
    }
    // ─── group (subset of 150/182): case 182 (Diff x1) ───
    case 182: {
      if (Diff(c[2], c[6])) {
        dst[pOut + 1]          = ALPHA | c[5];
        dst[pOut + 2]          = ALPHA | c[5];
        dst[pOut + dstW + 2]   = ALPHA | c[5];
        dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[8]);
      } else {
        dst[pOut + 1]          = ALPHA | Interp1(c[5], c[2]);
        dst[pOut + 2]          = ALPHA | Interp5(c[4], c[2]);
        dst[pOut + dstW + 2]   = ALPHA | Interp1(c[5], c[6]);
        dst[pOut + 2 * dstW + 2] = ALPHA | Interp2(c[5], c[6], c[8]);
      }
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[1]);
      dst[pOut + dstW]         = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + 2 * dstW]     = ALPHA | Interp2(c[5], c[8], c[4]);
      dst[pOut + 2 * dstW + 1] = ALPHA | Interp1(c[5], c[8]);
      break;
    }
    // ─── group (subset of 151/183): case 183 (Diff x1) ───
    case 183: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + 1]            = ALPHA | c[5];
      if (Diff(c[2], c[6])) {
        dst[pOut + 2]          = ALPHA | c[5];
      } else {
        dst[pOut + 2]          = ALPHA | Interp2(c[5], c[2], c[6]);
      }
      dst[pOut + dstW]         = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | c[5];
      dst[pOut + 2 * dstW]     = ALPHA | Interp2(c[5], c[8], c[4]);
      dst[pOut + 2 * dstW + 1] = ALPHA | Interp1(c[5], c[8]);
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[8]);
      break;
    }
    // ─── single case 184 ───
    case 184: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[1]);
      dst[pOut + 1]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[3]);
      dst[pOut + dstW]         = ALPHA | c[5];
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | c[5];
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[8]);
      dst[pOut + 2 * dstW + 1] = ALPHA | Interp1(c[5], c[8]);
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[8]);
      break;
    }
    // ─── single case 185 ───
    case 185: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 1]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[3]);
      dst[pOut + dstW]         = ALPHA | c[5];
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | c[5];
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[8]);
      dst[pOut + 2 * dstW + 1] = ALPHA | Interp1(c[5], c[8]);
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[8]);
      break;
    }
    // ─── Diff x2 case 186 ───
    case 186: {
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
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[8]);
      break;
    }
    // ─── Diff x2 case 187 ───
    case 187: {
      if (Diff(c[4], c[2])) {
        dst[pOut + 0]          = ALPHA | c[5];
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
      dst[pOut + dstW + 2]     = ALPHA | c[5];
      dst[pOut + 2 * dstW + 1] = ALPHA | Interp1(c[5], c[8]);
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[8]);
      break;
    }
    // ─── single case 188 ───
    case 188: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[1]);
      dst[pOut + 1]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + dstW]         = ALPHA | c[5];
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | c[5];
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[8]);
      dst[pOut + 2 * dstW + 1] = ALPHA | Interp1(c[5], c[8]);
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[8]);
      break;
    }
    // ─── single case 189 ───
    case 189: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 1]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + dstW]         = ALPHA | c[5];
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | c[5];
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[8]);
      dst[pOut + 2 * dstW + 1] = ALPHA | Interp1(c[5], c[8]);
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[8]);
      break;
    }
    // ─── Diff x2 case 190 ───
    case 190: {
      if (Diff(c[2], c[6])) {
        dst[pOut + 1]          = ALPHA | c[5];
        dst[pOut + 2]          = ALPHA | c[5];
        dst[pOut + dstW + 2]   = ALPHA | c[5];
        dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[8]);
      } else {
        dst[pOut + 1]          = ALPHA | Interp1(c[5], c[2]);
        dst[pOut + 2]          = ALPHA | Interp5(c[4], c[2]);
        dst[pOut + dstW + 2]   = ALPHA | Interp1(c[5], c[6]);
        dst[pOut + 2 * dstW + 2] = ALPHA | Interp2(c[5], c[6], c[8]);
      }
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[1]);
      dst[pOut + dstW]         = ALPHA | c[5];
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[8]);
      dst[pOut + 2 * dstW + 1] = ALPHA | Interp1(c[5], c[8]);
      break;
    }
    // ─── Diff x4 case 191 ───
    case 191: {
      if (Diff(c[4], c[2])) {
        dst[pOut + 0]          = ALPHA | c[5];
      } else {
        dst[pOut + 0]          = ALPHA | Interp2(c[5], c[4], c[2]);
      }
      dst[pOut + 1]            = ALPHA | c[5];
      if (Diff(c[2], c[6])) {
        dst[pOut + 2]          = ALPHA | c[5];
      } else {
        dst[pOut + 2]          = ALPHA | Interp2(c[5], c[2], c[6]);
      }
      dst[pOut + dstW]         = ALPHA | c[5];
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | c[5];
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[8]);
      dst[pOut + 2 * dstW + 1] = ALPHA | Interp1(c[5], c[8]);
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[8]);
      break;
    }
    default: return;
  }
};
