// src/core/browser/scalers/hqx/Hq3xCases4.ts
//
// HQ3X case handler - pattern 192..255 (bit7=1 且 bit6=1, c[2] 与 c[7] 都不同).
// 1:1 port from fceux-2.6.6 hq3x.cpp (cases 192..255).

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
    // ─── group J: cases 192/193/196/197 ───
    case 192: case 193: case 196: case 197: {
      dst[pOut + 0]            = ALPHA | Interp2(c[5], c[4], c[2]);
      dst[pOut + 1]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 2]            = ALPHA | Interp2(c[5], c[2], c[6]);
      dst[pOut + dstW]         = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | Interp1(c[5], c[6]);
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[7]);
      dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[6]);
      break;
    }
    // ─── single case 194 ───
    case 194: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[1]);
      dst[pOut + 1]            = ALPHA | c[5];
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[3]);
      dst[pOut + dstW]         = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | Interp1(c[5], c[6]);
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[7]);
      dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[6]);
      break;
    }
    // ─── Diff x1 case 195 ───
    case 195: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + 1]            = ALPHA | c[5];
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[3]);
      dst[pOut + dstW]         = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | Interp1(c[5], c[6]);
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[7]);
      dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[6]);
      break;
    }
    // ─── single case 198 ───
    case 198: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[1]);
      dst[pOut + 1]            = ALPHA | c[5];
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[6]);
      dst[pOut + dstW]         = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | Interp1(c[5], c[6]);
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[7]);
      dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[6]);
      break;
    }
    // ─── single case 199 ───
    case 199: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + 1]            = ALPHA | c[5];
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[6]);
      dst[pOut + dstW]         = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | Interp1(c[5], c[6]);
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[7]);
      dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[6]);
      break;
    }
    // ─── group Z (Diff x1): cases 200/204 ───
    case 200: case 204: {
      if (Diff(c[8], c[4])) {
        dst[pOut + dstW]       = ALPHA | c[5];
        dst[pOut + 2 * dstW]   = ALPHA | Interp1(c[5], c[7]);
        dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
        dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[6]);
      } else {
        dst[pOut + dstW]       = ALPHA | Interp1(c[5], c[4]);
        dst[pOut + 2 * dstW]   = ALPHA | Interp5(c[2], c[6]);
        dst[pOut + 2 * dstW + 1] = ALPHA | Interp1(c[5], c[8]);
        dst[pOut + 2 * dstW + 2] = ALPHA | Interp2(c[5], c[6], c[8]);
      }
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[1]);
      dst[pOut + 1]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 2]            = ALPHA | Interp2(c[5], c[2], c[6]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | Interp1(c[5], c[6]);
      break;
    }
    // ─── Diff x2 case 202 ───
    case 202: {
      if (Diff(c[4], c[2])) {
        dst[pOut + 0]          = ALPHA | Interp1(c[5], c[1]);
      } else {
        dst[pOut + 0]          = ALPHA | Interp2(c[5], c[4], c[2]);
      }
      dst[pOut + 1]            = ALPHA | c[5];
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[3]);
      dst[pOut + dstW]         = ALPHA | c[5];
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | Interp1(c[5], c[6]);
      if (Diff(c[8], c[4])) {
        dst[pOut + 2 * dstW]   = ALPHA | Interp1(c[5], c[7]);
      } else {
        dst[pOut + 2 * dstW]   = ALPHA | Interp2(c[5], c[8], c[4]);
      }
      dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[6]);
      break;
    }
    // ─── Diff x1 case 203 ───
    case 203: {
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
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[6]);
      break;
    }
    // ─── group (Diff x2): cases 205/201 ───
    case 205: case 201: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 1]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 2]            = ALPHA | Interp2(c[5], c[2], c[6]);
      dst[pOut + dstW]         = ALPHA | c[5];
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | Interp1(c[5], c[6]);
      if (Diff(c[8], c[4])) {
        dst[pOut + 2 * dstW]   = ALPHA | Interp1(c[5], c[7]);
      } else {
        dst[pOut + 2 * dstW]   = ALPHA | Interp2(c[5], c[8], c[4]);
      }
      dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[6]);
      break;
    }
    // ─── Diff x3 case 206 ───
    case 206: {
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
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[6]);
      break;
    }
    // ─── Diff x1 case 207 ───
    case 207: {
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
      dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[6]);
      break;
    }
    // ─── group S (Diff x1): cases 208/209 ───
    case 208: case 209: {
      dst[pOut + 0]            = ALPHA | Interp2(c[5], c[4], c[2]);
      dst[pOut + 1]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[3]);
      dst[pOut + dstW]         = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[7]);
      if (Diff(c[6], c[8])) {
        dst[pOut + dstW + 2]   = ALPHA | c[5];
        dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
        dst[pOut + 2 * dstW + 2] = ALPHA | c[5];
      } else {
        dst[pOut + dstW + 2]   = ALPHA | Interp3(c[5], c[6]);
        dst[pOut + 2 * dstW + 1] = ALPHA | Interp3(c[5], c[8]);
        dst[pOut + 2 * dstW + 2] = ALPHA | Interp4(c[5], c[6], c[8]);
      }
      break;
    }
    // ─── Diff x1 case 210 ───
    case 210: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[1]);
      dst[pOut + 1]            = ALPHA | c[5];
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[3]);
      dst[pOut + dstW]         = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[7]);
      if (Diff(c[6], c[8])) {
        dst[pOut + dstW + 2]   = ALPHA | c[5];
        dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
        dst[pOut + 2 * dstW + 2] = ALPHA | c[5];
      } else {
        dst[pOut + dstW + 2]   = ALPHA | Interp3(c[5], c[6]);
        dst[pOut + 2 * dstW + 1] = ALPHA | Interp3(c[5], c[8]);
        dst[pOut + 2 * dstW + 2] = ALPHA | Interp4(c[5], c[6], c[8]);
      }
      break;
    }
    // ─── Diff x1 case 211 ───
    case 211: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + 1]            = ALPHA | c[5];
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[3]);
      dst[pOut + dstW]         = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[7]);
      if (Diff(c[6], c[8])) {
        dst[pOut + dstW + 2]   = ALPHA | c[5];
        dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
        dst[pOut + 2 * dstW + 2] = ALPHA | c[5];
      } else {
        dst[pOut + dstW + 2]   = ALPHA | Interp3(c[5], c[6]);
        dst[pOut + 2 * dstW + 1] = ALPHA | Interp3(c[5], c[8]);
        dst[pOut + 2 * dstW + 2] = ALPHA | Interp4(c[5], c[6], c[8]);
      }
      break;
    }
    // ─── group (Diff x1): cases 213/212 ───
    case 213: case 212: {
      if (Diff(c[6], c[8])) {
        dst[pOut + 2]          = ALPHA | Interp1(c[5], c[2]);
        dst[pOut + dstW + 2]   = ALPHA | c[5];
        dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
        dst[pOut + 2 * dstW + 2] = ALPHA | c[5];
      } else {
        dst[pOut + 2]          = ALPHA | Interp2(c[5], c[2], c[6]);
        dst[pOut + dstW + 2]   = ALPHA | Interp1(c[5], c[6]);
        dst[pOut + 2 * dstW + 1] = ALPHA | Interp1(c[5], c[8]);
        dst[pOut + 2 * dstW + 2] = ALPHA | Interp5(c[6], c[8]);
      }
      dst[pOut + 0]            = ALPHA | Interp2(c[5], c[4], c[2]);
      dst[pOut + 1]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + dstW]         = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[7]);
      break;
    }
    // ─── Diff x2 case 214 ───
    case 214: {
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
    // ─── Diff x3 case 215 ───
    case 215: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + 1]            = ALPHA | c[5];
      if (Diff(c[2], c[6])) {
        dst[pOut + 2]          = ALPHA | c[5];
      } else {
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
    // ─── Diff x1 case 216 ───
    case 216: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[1]);
      dst[pOut + 1]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[3]);
      dst[pOut + dstW]         = ALPHA | c[5];
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[7]);
      if (Diff(c[6], c[8])) {
        dst[pOut + dstW + 2]   = ALPHA | c[5];
        dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
        dst[pOut + 2 * dstW + 2] = ALPHA | c[5];
      } else {
        dst[pOut + dstW + 2]   = ALPHA | Interp3(c[5], c[6]);
        dst[pOut + 2 * dstW + 1] = ALPHA | Interp3(c[5], c[8]);
        dst[pOut + 2 * dstW + 2] = ALPHA | Interp4(c[5], c[6], c[8]);
      }
      break;
    }
    // ─── Diff x1 case 217 ───
    case 217: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 1]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[3]);
      dst[pOut + dstW]         = ALPHA | c[5];
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[7]);
      if (Diff(c[6], c[8])) {
        dst[pOut + dstW + 2]   = ALPHA | c[5];
        dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
        dst[pOut + 2 * dstW + 2] = ALPHA | c[5];
      } else {
        dst[pOut + dstW + 2]   = ALPHA | Interp3(c[5], c[6]);
        dst[pOut + 2 * dstW + 1] = ALPHA | Interp3(c[5], c[8]);
        dst[pOut + 2 * dstW + 2] = ALPHA | Interp4(c[5], c[6], c[8]);
      }
      break;
    }
    // ─── Diff x5 case 218 ───
    case 218: {
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
      if (Diff(c[8], c[4])) {
        dst[pOut + 2 * dstW]   = ALPHA | Interp1(c[5], c[7]);
      } else {
        dst[pOut + 2 * dstW]   = ALPHA | Interp2(c[5], c[8], c[4]);
      }
      if (Diff(c[6], c[8])) {
        dst[pOut + dstW + 2]   = ALPHA | c[5];
        dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
        dst[pOut + 2 * dstW + 2] = ALPHA | c[5];
      } else {
        dst[pOut + dstW + 2]   = ALPHA | Interp3(c[5], c[6]);
        dst[pOut + 2 * dstW + 1] = ALPHA | Interp3(c[5], c[8]);
        dst[pOut + 2 * dstW + 2] = ALPHA | Interp4(c[5], c[6], c[8]);
      }
      break;
    }
    // ─── Diff x3 case 219 ───
    case 219: {
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
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[7]);
      if (Diff(c[6], c[8])) {
        dst[pOut + dstW + 2]   = ALPHA | c[5];
        dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
        dst[pOut + 2 * dstW + 2] = ALPHA | c[5];
      } else {
        dst[pOut + dstW + 2]   = ALPHA | Interp3(c[5], c[6]);
        dst[pOut + 2 * dstW + 1] = ALPHA | Interp3(c[5], c[8]);
        dst[pOut + 2 * dstW + 2] = ALPHA | Interp4(c[5], c[6], c[8]);
      }
      break;
    }
    // ─── Diff x2 case 220 ───
    case 220: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[1]);
      dst[pOut + 1]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + dstW]         = ALPHA | c[5];
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      if (Diff(c[8], c[4])) {
        dst[pOut + 2 * dstW]   = ALPHA | Interp1(c[5], c[7]);
      } else {
        dst[pOut + 2 * dstW]   = ALPHA | Interp2(c[5], c[8], c[4]);
      }
      if (Diff(c[6], c[8])) {
        dst[pOut + dstW + 2]   = ALPHA | c[5];
        dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
        dst[pOut + 2 * dstW + 2] = ALPHA | c[5];
      } else {
        dst[pOut + dstW + 2]   = ALPHA | Interp3(c[5], c[6]);
        dst[pOut + 2 * dstW + 1] = ALPHA | Interp3(c[5], c[8]);
        dst[pOut + 2 * dstW + 2] = ALPHA | Interp4(c[5], c[6], c[8]);
      }
      break;
    }
    // ─── Diff x2 case 221 ───
    case 221: {
      if (Diff(c[6], c[8])) {
        dst[pOut + 2]          = ALPHA | Interp1(c[5], c[2]);
        dst[pOut + dstW + 2]   = ALPHA | c[5];
        dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
        dst[pOut + 2 * dstW + 2] = ALPHA | c[5];
      } else {
        dst[pOut + 2]          = ALPHA | Interp2(c[5], c[2], c[6]);
        dst[pOut + dstW + 2]   = ALPHA | Interp1(c[5], c[6]);
        dst[pOut + 2 * dstW + 1] = ALPHA | Interp1(c[5], c[8]);
        dst[pOut + 2 * dstW + 2] = ALPHA | Interp5(c[6], c[8]);
      }
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 1]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + dstW]         = ALPHA | c[5];
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[7]);
      break;
    }
    // ─── Diff x3 case 222 ───
    case 222: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[1]);
      if (Diff(c[2], c[6])) {
        dst[pOut + 1]          = ALPHA | c[5];
        dst[pOut + 2]          = ALPHA | c[5];
      } else {
        dst[pOut + 1]          = ALPHA | Interp3(c[5], c[2]);
        dst[pOut + 2]          = ALPHA | Interp4(c[5], c[2], c[6]);
      }
      dst[pOut + dstW]         = ALPHA | c[5];
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
    // ─── Diff x5 case 223 ───
    case 223: {
      if (Diff(c[4], c[2])) {
        dst[pOut + 0]          = ALPHA | c[5];
        dst[pOut + dstW]       = ALPHA | c[5];
      } else {
        dst[pOut + 0]          = ALPHA | Interp4(c[5], c[4], c[2]);
        dst[pOut + dstW]       = ALPHA | Interp3(c[5], c[4]);
      }
      if (Diff(c[2], c[6])) {
        dst[pOut + 1]          = ALPHA | c[5];
        dst[pOut + 2]          = ALPHA | c[5];
        dst[pOut + dstW + 2]   = ALPHA | c[5];
      } else {
        dst[pOut + 1]          = ALPHA | Interp3(c[5], c[2]);
        dst[pOut + 2]          = ALPHA | Interp2(c[5], c[2], c[6]);
        dst[pOut + dstW + 2]   = ALPHA | Interp3(c[5], c[6]);
      }
      dst[pOut + dstW + 1]     = ALPHA | c[5];
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
    // ─── group (Diff x1): cases 224/228/225 ───
    case 224: case 228: case 225: {
      dst[pOut + 0]            = ALPHA | Interp2(c[5], c[4], c[2]);
      dst[pOut + 1]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 2]            = ALPHA | Interp2(c[5], c[2], c[6]);
      dst[pOut + dstW]         = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | Interp1(c[5], c[6]);
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[6]);
      break;
    }
    // ─── single case 226 ───
    case 226: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[1]);
      dst[pOut + 1]            = ALPHA | c[5];
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[3]);
      dst[pOut + dstW]         = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | Interp1(c[5], c[6]);
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[6]);
      break;
    }
    // ─── single case 227 ───
    case 227: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + 1]            = ALPHA | c[5];
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[3]);
      dst[pOut + dstW]         = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | Interp1(c[5], c[6]);
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[6]);
      break;
    }
    // ─── single case 229 ───
    case 229: {
      dst[pOut + 0]            = ALPHA | Interp2(c[5], c[4], c[2]);
      dst[pOut + 1]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 2]            = ALPHA | Interp2(c[5], c[2], c[6]);
      dst[pOut + dstW]         = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | Interp1(c[5], c[6]);
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[6]);
      break;
    }
    // ─── single case 230 ───
    case 230: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[1]);
      dst[pOut + 1]            = ALPHA | c[5];
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[6]);
      dst[pOut + dstW]         = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | Interp1(c[5], c[6]);
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[6]);
      break;
    }
    // ─── single case 231 ───
    case 231: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + 1]            = ALPHA | c[5];
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[6]);
      dst[pOut + dstW]         = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | Interp1(c[5], c[6]);
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[6]);
      break;
    }
    // ─── group (Diff x2): cases 232/236 ───
    case 232: case 236: {
      if (Diff(c[8], c[4])) {
        dst[pOut + dstW]       = ALPHA | c[5];
        dst[pOut + 2 * dstW]   = ALPHA | c[5];
        dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
        dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[6]);
      } else {
        dst[pOut + dstW]       = ALPHA | Interp1(c[5], c[4]);
        dst[pOut + 2 * dstW]   = ALPHA | Interp5(c[2], c[6]);
        dst[pOut + 2 * dstW + 1] = ALPHA | Interp1(c[5], c[8]);
        dst[pOut + 2 * dstW + 2] = ALPHA | Interp2(c[5], c[6], c[8]);
      }
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[1]);
      dst[pOut + 1]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 2]            = ALPHA | Interp2(c[5], c[2], c[6]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | Interp1(c[5], c[6]);
      break;
    }
    // ─── group (Diff x2): cases 233/237 ───
    case 233: case 237: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 1]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 2]            = ALPHA | Interp2(c[5], c[2], c[6]);
      dst[pOut + dstW]         = ALPHA | c[5];
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | Interp1(c[5], c[6]);
      if (Diff(c[8], c[4])) {
        dst[pOut + 2 * dstW]   = ALPHA | c[5];
      } else {
        dst[pOut + 2 * dstW]   = ALPHA | Interp2(c[5], c[8], c[4]);
      }
      dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[6]);
      break;
    }
    // ─── Diff x2 case 234 ───
    case 234: {
      if (Diff(c[4], c[2])) {
        dst[pOut + 0]          = ALPHA | Interp1(c[5], c[1]);
      } else {
        dst[pOut + 0]          = ALPHA | Interp2(c[5], c[4], c[2]);
      }
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
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[6]);
      break;
    }
    // ─── Diff x3 case 235 ───
    case 235: {
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
      } else {
        dst[pOut + 2 * dstW]   = ALPHA | Interp2(c[5], c[8], c[4]);
      }
      dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[6]);
      break;
    }
    // ─── Diff x2 case 238 ───
    case 238: {
      if (Diff(c[8], c[4])) {
        dst[pOut + dstW]       = ALPHA | c[5];
        dst[pOut + 2 * dstW]   = ALPHA | c[5];
        dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
        dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[6]);
      } else {
        dst[pOut + dstW]       = ALPHA | Interp1(c[5], c[4]);
        dst[pOut + 2 * dstW]   = ALPHA | Interp5(c[2], c[6]);
        dst[pOut + 2 * dstW + 1] = ALPHA | Interp1(c[5], c[8]);
        dst[pOut + 2 * dstW + 2] = ALPHA | Interp2(c[5], c[6], c[8]);
      }
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[1]);
      dst[pOut + 1]            = ALPHA | c[5];
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[6]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | Interp1(c[5], c[6]);
      break;
    }
    // ─── Diff x3 case 239 ───
    case 239: {
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
      } else {
        dst[pOut + 2 * dstW]   = ALPHA | Interp2(c[5], c[8], c[4]);
      }
      dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
      dst[pOut + 2 * dstW + 2] = ALPHA | Interp1(c[5], c[6]);
      break;
    }
    // ─── group (Diff x2): cases 240/241 ───
    case 240: case 241: {
      if (Diff(c[6], c[8])) {
        dst[pOut + dstW + 2]   = ALPHA | c[5];
        dst[pOut + 2 * dstW]   = ALPHA | Interp1(c[5], c[4]);
        dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
        dst[pOut + 2 * dstW + 2] = ALPHA | c[5];
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
    // ─── Diff x2 case 242 ───
    case 242: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[1]);
      dst[pOut + 1]            = ALPHA | c[5];
      if (Diff(c[2], c[6])) {
        dst[pOut + 2]          = ALPHA | Interp1(c[5], c[3]);
      } else {
        dst[pOut + 2]          = ALPHA | Interp2(c[5], c[2], c[6]);
      }
      dst[pOut + dstW]         = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[4]);
      if (Diff(c[6], c[8])) {
        dst[pOut + dstW + 2]   = ALPHA | c[5];
        dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
        dst[pOut + 2 * dstW + 2] = ALPHA | c[5];
      } else {
        dst[pOut + dstW + 2]   = ALPHA | Interp3(c[5], c[6]);
        dst[pOut + 2 * dstW + 1] = ALPHA | Interp3(c[5], c[8]);
        dst[pOut + 2 * dstW + 2] = ALPHA | Interp4(c[5], c[6], c[8]);
      }
      break;
    }
    // ─── Diff x2 case 243 ───
    case 243: {
      if (Diff(c[6], c[8])) {
        dst[pOut + dstW + 2]   = ALPHA | c[5];
        dst[pOut + 2 * dstW]   = ALPHA | Interp1(c[5], c[4]);
        dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
        dst[pOut + 2 * dstW + 2] = ALPHA | c[5];
      } else {
        dst[pOut + dstW + 2]   = ALPHA | Interp1(c[5], c[6]);
        dst[pOut + 2 * dstW]   = ALPHA | Interp2(c[5], c[8], c[4]);
        dst[pOut + 2 * dstW + 1] = ALPHA | Interp1(c[5], c[8]);
        dst[pOut + 2 * dstW + 2] = ALPHA | Interp5(c[6], c[8]);
      }
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + 1]            = ALPHA | c[5];
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[3]);
      dst[pOut + dstW]         = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      break;
    }
    // ─── group (Diff x2): cases 244/245 ───
    case 244: case 245: {
      dst[pOut + 0]            = ALPHA | Interp2(c[5], c[4], c[2]);
      dst[pOut + 1]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + dstW]         = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | c[5];
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
      if (Diff(c[6], c[8])) {
        dst[pOut + 2 * dstW + 2] = ALPHA | c[5];
      } else {
        dst[pOut + 2 * dstW + 2] = ALPHA | Interp2(c[5], c[6], c[8]);
      }
      break;
    }
    // ─── Diff x3 case 246 ───
    case 246: {
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
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
      if (Diff(c[6], c[8])) {
        dst[pOut + 2 * dstW + 2] = ALPHA | c[5];
      } else {
        dst[pOut + 2 * dstW + 2] = ALPHA | Interp2(c[5], c[6], c[8]);
      }
      break;
    }
    // ─── Diff x4 case 247 ───
    case 247: {
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
      dst[pOut + 2 * dstW]     = ALPHA | Interp1(c[5], c[4]);
      dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
      if (Diff(c[6], c[8])) {
        dst[pOut + 2 * dstW + 2] = ALPHA | c[5];
      } else {
        dst[pOut + 2 * dstW + 2] = ALPHA | Interp2(c[5], c[6], c[8]);
      }
      break;
    }
    // ─── Diff x2 case 248 ───
    case 248: {
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
    // ─── Diff x3 case 249 ───
    case 249: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 1]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[3]);
      dst[pOut + dstW]         = ALPHA | c[5];
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      if (Diff(c[8], c[4])) {
        dst[pOut + 2 * dstW]   = ALPHA | c[5];
      } else {
        dst[pOut + 2 * dstW]   = ALPHA | Interp2(c[5], c[8], c[4]);
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
    // ─── Diff x3 case 250 ───
    case 250: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[1]);
      dst[pOut + 1]            = ALPHA | c[5];
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
    // ─── Diff x3 case 251 ───
    case 251: {
      if (Diff(c[4], c[2])) {
        dst[pOut + 0]          = ALPHA | c[5];
        dst[pOut + 1]          = ALPHA | c[5];
      } else {
        dst[pOut + 0]          = ALPHA | Interp4(c[5], c[4], c[2]);
        dst[pOut + 1]          = ALPHA | Interp3(c[5], c[2]);
      }
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[3]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      if (Diff(c[8], c[4])) {
        dst[pOut + dstW]       = ALPHA | c[5];
        dst[pOut + 2 * dstW]   = ALPHA | c[5];
        dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
      } else {
        dst[pOut + dstW]       = ALPHA | Interp3(c[5], c[4]);
        dst[pOut + 2 * dstW]   = ALPHA | Interp2(c[5], c[8], c[4]);
        dst[pOut + 2 * dstW + 1] = ALPHA | Interp3(c[5], c[8]);
      }
      if (Diff(c[6], c[8])) {
        dst[pOut + dstW + 2]   = ALPHA | c[5];
        dst[pOut + 2 * dstW + 2] = ALPHA | c[5];
      } else {
        dst[pOut + dstW + 2]   = ALPHA | Interp3(c[5], c[6]);
        dst[pOut + 2 * dstW + 2] = ALPHA | Interp4(c[5], c[6], c[8]);
      }
      break;
    }
    // ─── Diff x3 case 252 ───
    case 252: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[1]);
      dst[pOut + 1]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | c[5];
      if (Diff(c[8], c[4])) {
        dst[pOut + dstW]       = ALPHA | c[5];
        dst[pOut + 2 * dstW]   = ALPHA | c[5];
      } else {
        dst[pOut + dstW]       = ALPHA | Interp3(c[5], c[4]);
        dst[pOut + 2 * dstW]   = ALPHA | Interp4(c[5], c[8], c[4]);
      }
      dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
      if (Diff(c[6], c[8])) {
        dst[pOut + 2 * dstW + 2] = ALPHA | c[5];
      } else {
        dst[pOut + 2 * dstW + 2] = ALPHA | Interp2(c[5], c[6], c[8]);
      }
      break;
    }
    // ─── Diff x3 case 253 ───
    case 253: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 1]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + 2]            = ALPHA | Interp1(c[5], c[2]);
      dst[pOut + dstW]         = ALPHA | c[5];
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      dst[pOut + dstW + 2]     = ALPHA | c[5];
      if (Diff(c[8], c[4])) {
        dst[pOut + 2 * dstW]   = ALPHA | c[5];
      } else {
        dst[pOut + 2 * dstW]   = ALPHA | Interp2(c[5], c[8], c[4]);
      }
      dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
      if (Diff(c[6], c[8])) {
        dst[pOut + 2 * dstW + 2] = ALPHA | c[5];
      } else {
        dst[pOut + 2 * dstW + 2] = ALPHA | Interp2(c[5], c[6], c[8]);
      }
      break;
    }
    // ─── Diff x4 case 254 ───
    case 254: {
      dst[pOut + 0]            = ALPHA | Interp1(c[5], c[1]);
      if (Diff(c[2], c[6])) {
        dst[pOut + 1]          = ALPHA | c[5];
        dst[pOut + 2]          = ALPHA | c[5];
      } else {
        dst[pOut + 1]          = ALPHA | Interp3(c[5], c[2]);
        dst[pOut + 2]          = ALPHA | Interp3(c[5], c[2]);
      }
      dst[pOut + dstW + 1]     = ALPHA | c[5];
      if (Diff(c[8], c[4])) {
        dst[pOut + dstW]       = ALPHA | c[5];
        dst[pOut + 2 * dstW]   = ALPHA | c[5];
      } else {
        dst[pOut + dstW]       = ALPHA | Interp3(c[5], c[4]);
        dst[pOut + 2 * dstW]   = ALPHA | Interp3(c[5], c[4]);
      }
      if (Diff(c[6], c[8])) {
        dst[pOut + dstW + 2]   = ALPHA | c[5];
        dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
        dst[pOut + 2 * dstW + 2] = ALPHA | c[5];
      } else {
        dst[pOut + dstW + 2]   = ALPHA | Interp3(c[5], c[6]);
        dst[pOut + 2 * dstW + 1] = ALPHA | Interp3(c[5], c[8]);
        dst[pOut + 2 * dstW + 2] = ALPHA | Interp2(c[5], c[6], c[8]);
      }
      break;
    }
    // ─── Diff x5 case 255 ───
    case 255: {
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
      if (Diff(c[8], c[4])) {
        dst[pOut + 2 * dstW]   = ALPHA | c[5];
      } else {
        dst[pOut + 2 * dstW]   = ALPHA | Interp2(c[5], c[8], c[4]);
      }
      dst[pOut + 2 * dstW + 1] = ALPHA | c[5];
      if (Diff(c[6], c[8])) {
        dst[pOut + 2 * dstW + 2] = ALPHA | c[5];
      } else {
        dst[pOut + 2 * dstW + 2] = ALPHA | Interp2(c[5], c[6], c[8]);
      }
      break;
    }
    default: return;
  }
};
