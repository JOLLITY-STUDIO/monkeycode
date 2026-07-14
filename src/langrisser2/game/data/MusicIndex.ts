/**
 * MusicIndex.ts — 音乐数据索引
 *
 * 由脚本生成: scripts/generate-music-data.mjs
 * 来源: Langrisser II (Japan) ROM
 *
 * 运行时不需要 ROM, 所有数据硬编码为 TS 常量
 */

import { MUSIC_00_DATA_BASE64, MUSIC_00_SIZE } from './music/Music00Data.js';
import { MUSIC_01_DATA_BASE64, MUSIC_01_SIZE } from './music/Music01Data.js';
import { MUSIC_02_DATA_BASE64, MUSIC_02_SIZE } from './music/Music02Data.js';
import { MUSIC_03_DATA_BASE64, MUSIC_03_SIZE } from './music/Music03Data.js';
import { MUSIC_04_DATA_BASE64, MUSIC_04_SIZE } from './music/Music04Data.js';
import { MUSIC_05_DATA_BASE64, MUSIC_05_SIZE } from './music/Music05Data.js';
import { MUSIC_06_DATA_BASE64, MUSIC_06_SIZE } from './music/Music06Data.js';
import { MUSIC_07_DATA_BASE64, MUSIC_07_SIZE } from './music/Music07Data.js';
import { MUSIC_09_DATA_BASE64, MUSIC_09_SIZE } from './music/Music09Data.js';
import { MUSIC_10_DATA_BASE64, MUSIC_10_SIZE } from './music/Music10Data.js';
import { MUSIC_13_DATA_BASE64, MUSIC_13_SIZE } from './music/Music13Data.js';
import { MUSIC_14_DATA_BASE64, MUSIC_14_SIZE } from './music/Music14Data.js';
import { MUSIC_18_DATA_BASE64, MUSIC_18_SIZE } from './music/Music18Data.js';
import { MUSIC_20_DATA_BASE64, MUSIC_20_SIZE } from './music/Music20Data.js';
import { MUSIC_21_DATA_BASE64, MUSIC_21_SIZE } from './music/Music21Data.js';
import { MUSIC_23_DATA_BASE64, MUSIC_23_SIZE } from './music/Music23Data.js';
import { MUSIC_24_DATA_BASE64, MUSIC_24_SIZE } from './music/Music24Data.js';
import { MUSIC_25_DATA_BASE64, MUSIC_25_SIZE } from './music/Music25Data.js';
import { MUSIC_26_DATA_BASE64, MUSIC_26_SIZE } from './music/Music26Data.js';
import { MUSIC_28_DATA_BASE64, MUSIC_28_SIZE } from './music/Music28Data.js';
import { MUSIC_29_DATA_BASE64, MUSIC_29_SIZE } from './music/Music29Data.js';
import { MUSIC_31_DATA_BASE64, MUSIC_31_SIZE } from './music/Music31Data.js';
import { MUSIC_32_DATA_BASE64, MUSIC_32_SIZE } from './music/Music32Data.js';
import { MUSIC_33_DATA_BASE64, MUSIC_33_SIZE } from './music/Music33Data.js';
import { MUSIC_35_DATA_BASE64, MUSIC_35_SIZE } from './music/Music35Data.js';
import { MUSIC_36_DATA_BASE64, MUSIC_36_SIZE } from './music/Music36Data.js';
import { MUSIC_37_DATA_BASE64, MUSIC_37_SIZE } from './music/Music37Data.js';
import { MUSIC_38_DATA_BASE64, MUSIC_38_SIZE } from './music/Music38Data.js';
import { MUSIC_39_DATA_BASE64, MUSIC_39_SIZE } from './music/Music39Data.js';
import { MUSIC_40_DATA_BASE64, MUSIC_40_SIZE } from './music/Music40Data.js';
import { MUSIC_41_DATA_BASE64, MUSIC_41_SIZE } from './music/Music41Data.js';
import { MUSIC_42_DATA_BASE64, MUSIC_42_SIZE } from './music/Music42Data.js';
import { MUSIC_43_DATA_BASE64, MUSIC_43_SIZE } from './music/Music43Data.js';
import { MUSIC_44_DATA_BASE64, MUSIC_44_SIZE } from './music/Music44Data.js';
import { MUSIC_45_DATA_BASE64, MUSIC_45_SIZE } from './music/Music45Data.js';
import { MUSIC_46_DATA_BASE64, MUSIC_46_SIZE } from './music/Music46Data.js';
import { MUSIC_47_DATA_BASE64, MUSIC_47_SIZE } from './music/Music47Data.js';
import { MUSIC_48_DATA_BASE64, MUSIC_48_SIZE } from './music/Music48Data.js';
import { MUSIC_49_DATA_BASE64, MUSIC_49_SIZE } from './music/Music49Data.js';
import { MUSIC_50_DATA_BASE64, MUSIC_50_SIZE } from './music/Music50Data.js';
import { MUSIC_51_DATA_BASE64, MUSIC_51_SIZE } from './music/Music51Data.js';
import { MUSIC_52_DATA_BASE64, MUSIC_52_SIZE } from './music/Music52Data.js';
import { MUSIC_53_DATA_BASE64, MUSIC_53_SIZE } from './music/Music53Data.js';
import { MUSIC_54_DATA_BASE64, MUSIC_54_SIZE } from './music/Music54Data.js';
import { MUSIC_55_DATA_BASE64, MUSIC_55_SIZE } from './music/Music55Data.js';
import { MUSIC_56_DATA_BASE64, MUSIC_56_SIZE } from './music/Music56Data.js';
import { MUSIC_57_DATA_BASE64, MUSIC_57_SIZE } from './music/Music57Data.js';
import { MUSIC_58_DATA_BASE64, MUSIC_58_SIZE } from './music/Music58Data.js';
import { MUSIC_59_DATA_BASE64, MUSIC_59_SIZE } from './music/Music59Data.js';
import { MUSIC_60_DATA_BASE64, MUSIC_60_SIZE } from './music/Music60Data.js';
import { MUSIC_61_DATA_BASE64, MUSIC_61_SIZE } from './music/Music61Data.js';
import { MUSIC_62_DATA_BASE64, MUSIC_62_SIZE } from './music/Music62Data.js';
import { MUSIC_63_DATA_BASE64, MUSIC_63_SIZE } from './music/Music63Data.js';

export interface MusicEntry {
  id: number;
  size: number;
  offset: number;
  base64: string;
}

export const MUSIC_INDEX: MusicEntry[] = [
  { id: 0, size: MUSIC_00_SIZE, offset: 56831, base64: MUSIC_00_DATA_BASE64 },
  { id: 1, size: MUSIC_01_SIZE, offset: 56831, base64: MUSIC_01_DATA_BASE64 },
  { id: 2, size: MUSIC_02_SIZE, offset: 8960, base64: MUSIC_02_DATA_BASE64 },
  { id: 3, size: MUSIC_03_SIZE, offset: 56831, base64: MUSIC_03_DATA_BASE64 },
  { id: 4, size: MUSIC_04_SIZE, offset: 8960, base64: MUSIC_04_DATA_BASE64 },
  { id: 5, size: MUSIC_05_SIZE, offset: 8960, base64: MUSIC_05_DATA_BASE64 },
  { id: 6, size: MUSIC_06_SIZE, offset: 56831, base64: MUSIC_06_DATA_BASE64 },
  { id: 7, size: MUSIC_07_SIZE, offset: 8960, base64: MUSIC_07_DATA_BASE64 },
  { id: 9, size: MUSIC_09_SIZE, offset: 47871, base64: MUSIC_09_DATA_BASE64 },
  { id: 10, size: MUSIC_10_SIZE, offset: 17920, base64: MUSIC_10_DATA_BASE64 },
  { id: 13, size: MUSIC_13_SIZE, offset: 17920, base64: MUSIC_13_DATA_BASE64 },
  { id: 14, size: MUSIC_14_SIZE, offset: 47871, base64: MUSIC_14_DATA_BASE64 },
  { id: 18, size: MUSIC_18_SIZE, offset: 12800, base64: MUSIC_18_DATA_BASE64 },
  { id: 20, size: MUSIC_20_SIZE, offset: 12800, base64: MUSIC_20_DATA_BASE64 },
  { id: 21, size: MUSIC_21_SIZE, offset: 52991, base64: MUSIC_21_DATA_BASE64 },
  { id: 23, size: MUSIC_23_SIZE, offset: 52991, base64: MUSIC_23_DATA_BASE64 },
  { id: 24, size: MUSIC_24_SIZE, offset: 52991, base64: MUSIC_24_DATA_BASE64 },
  { id: 25, size: MUSIC_25_SIZE, offset: 52991, base64: MUSIC_25_DATA_BASE64 },
  { id: 26, size: MUSIC_26_SIZE, offset: 52991, base64: MUSIC_26_DATA_BASE64 },
  { id: 28, size: MUSIC_28_SIZE, offset: 52991, base64: MUSIC_28_DATA_BASE64 },
  { id: 29, size: MUSIC_29_SIZE, offset: 12800, base64: MUSIC_29_DATA_BASE64 },
  { id: 31, size: MUSIC_31_SIZE, offset: 12800, base64: MUSIC_31_DATA_BASE64 },
  { id: 32, size: MUSIC_32_SIZE, offset: 12800, base64: MUSIC_32_DATA_BASE64 },
  { id: 33, size: MUSIC_33_SIZE, offset: 12800, base64: MUSIC_33_DATA_BASE64 },
  { id: 35, size: MUSIC_35_SIZE, offset: 4096, base64: MUSIC_35_DATA_BASE64 },
  { id: 36, size: MUSIC_36_SIZE, offset: 44288, base64: MUSIC_36_DATA_BASE64 },
  { id: 37, size: MUSIC_37_SIZE, offset: 1024, base64: MUSIC_37_DATA_BASE64 },
  { id: 38, size: MUSIC_38_SIZE, offset: 4096, base64: MUSIC_38_DATA_BASE64 },
  { id: 39, size: MUSIC_39_SIZE, offset: 44544, base64: MUSIC_39_DATA_BASE64 },
  { id: 40, size: MUSIC_40_SIZE, offset: 2048, base64: MUSIC_40_DATA_BASE64 },
  { id: 41, size: MUSIC_41_SIZE, offset: 4096, base64: MUSIC_41_DATA_BASE64 },
  { id: 42, size: MUSIC_42_SIZE, offset: 44800, base64: MUSIC_42_DATA_BASE64 },
  { id: 43, size: MUSIC_43_SIZE, offset: 4096, base64: MUSIC_43_DATA_BASE64 },
  { id: 44, size: MUSIC_44_SIZE, offset: 4096, base64: MUSIC_44_DATA_BASE64 },
  { id: 45, size: MUSIC_45_SIZE, offset: 45056, base64: MUSIC_45_DATA_BASE64 },
  { id: 46, size: MUSIC_46_SIZE, offset: 6144, base64: MUSIC_46_DATA_BASE64 },
  { id: 47, size: MUSIC_47_SIZE, offset: 4096, base64: MUSIC_47_DATA_BASE64 },
  { id: 48, size: MUSIC_48_SIZE, offset: 45312, base64: MUSIC_48_DATA_BASE64 },
  { id: 49, size: MUSIC_49_SIZE, offset: 8192, base64: MUSIC_49_DATA_BASE64 },
  { id: 50, size: MUSIC_50_SIZE, offset: 4096, base64: MUSIC_50_DATA_BASE64 },
  { id: 51, size: MUSIC_51_SIZE, offset: 45056, base64: MUSIC_51_DATA_BASE64 },
  { id: 52, size: MUSIC_52_SIZE, offset: 12288, base64: MUSIC_52_DATA_BASE64 },
  { id: 53, size: MUSIC_53_SIZE, offset: 4096, base64: MUSIC_53_DATA_BASE64 },
  { id: 54, size: MUSIC_54_SIZE, offset: 44800, base64: MUSIC_54_DATA_BASE64 },
  { id: 55, size: MUSIC_55_SIZE, offset: 16384, base64: MUSIC_55_DATA_BASE64 },
  { id: 56, size: MUSIC_56_SIZE, offset: 4096, base64: MUSIC_56_DATA_BASE64 },
  { id: 57, size: MUSIC_57_SIZE, offset: 44544, base64: MUSIC_57_DATA_BASE64 },
  { id: 58, size: MUSIC_58_SIZE, offset: 18432, base64: MUSIC_58_DATA_BASE64 },
  { id: 59, size: MUSIC_59_SIZE, offset: 4096, base64: MUSIC_59_DATA_BASE64 },
  { id: 60, size: MUSIC_60_SIZE, offset: 44288, base64: MUSIC_60_DATA_BASE64 },
  { id: 61, size: MUSIC_61_SIZE, offset: 2304, base64: MUSIC_61_DATA_BASE64 },
  { id: 62, size: MUSIC_62_SIZE, offset: 6930, base64: MUSIC_62_DATA_BASE64 },
  { id: 63, size: MUSIC_63_SIZE, offset: 11556, base64: MUSIC_63_DATA_BASE64 },
];

export const MUSIC_DATA_BY_ID: Record<number, { size: number; base64: string }> = {
  0: { size: MUSIC_00_SIZE, base64: MUSIC_00_DATA_BASE64 },
  1: { size: MUSIC_01_SIZE, base64: MUSIC_01_DATA_BASE64 },
  2: { size: MUSIC_02_SIZE, base64: MUSIC_02_DATA_BASE64 },
  3: { size: MUSIC_03_SIZE, base64: MUSIC_03_DATA_BASE64 },
  4: { size: MUSIC_04_SIZE, base64: MUSIC_04_DATA_BASE64 },
  5: { size: MUSIC_05_SIZE, base64: MUSIC_05_DATA_BASE64 },
  6: { size: MUSIC_06_SIZE, base64: MUSIC_06_DATA_BASE64 },
  7: { size: MUSIC_07_SIZE, base64: MUSIC_07_DATA_BASE64 },
  9: { size: MUSIC_09_SIZE, base64: MUSIC_09_DATA_BASE64 },
  10: { size: MUSIC_10_SIZE, base64: MUSIC_10_DATA_BASE64 },
  13: { size: MUSIC_13_SIZE, base64: MUSIC_13_DATA_BASE64 },
  14: { size: MUSIC_14_SIZE, base64: MUSIC_14_DATA_BASE64 },
  18: { size: MUSIC_18_SIZE, base64: MUSIC_18_DATA_BASE64 },
  20: { size: MUSIC_20_SIZE, base64: MUSIC_20_DATA_BASE64 },
  21: { size: MUSIC_21_SIZE, base64: MUSIC_21_DATA_BASE64 },
  23: { size: MUSIC_23_SIZE, base64: MUSIC_23_DATA_BASE64 },
  24: { size: MUSIC_24_SIZE, base64: MUSIC_24_DATA_BASE64 },
  25: { size: MUSIC_25_SIZE, base64: MUSIC_25_DATA_BASE64 },
  26: { size: MUSIC_26_SIZE, base64: MUSIC_26_DATA_BASE64 },
  28: { size: MUSIC_28_SIZE, base64: MUSIC_28_DATA_BASE64 },
  29: { size: MUSIC_29_SIZE, base64: MUSIC_29_DATA_BASE64 },
  31: { size: MUSIC_31_SIZE, base64: MUSIC_31_DATA_BASE64 },
  32: { size: MUSIC_32_SIZE, base64: MUSIC_32_DATA_BASE64 },
  33: { size: MUSIC_33_SIZE, base64: MUSIC_33_DATA_BASE64 },
  35: { size: MUSIC_35_SIZE, base64: MUSIC_35_DATA_BASE64 },
  36: { size: MUSIC_36_SIZE, base64: MUSIC_36_DATA_BASE64 },
  37: { size: MUSIC_37_SIZE, base64: MUSIC_37_DATA_BASE64 },
  38: { size: MUSIC_38_SIZE, base64: MUSIC_38_DATA_BASE64 },
  39: { size: MUSIC_39_SIZE, base64: MUSIC_39_DATA_BASE64 },
  40: { size: MUSIC_40_SIZE, base64: MUSIC_40_DATA_BASE64 },
  41: { size: MUSIC_41_SIZE, base64: MUSIC_41_DATA_BASE64 },
  42: { size: MUSIC_42_SIZE, base64: MUSIC_42_DATA_BASE64 },
  43: { size: MUSIC_43_SIZE, base64: MUSIC_43_DATA_BASE64 },
  44: { size: MUSIC_44_SIZE, base64: MUSIC_44_DATA_BASE64 },
  45: { size: MUSIC_45_SIZE, base64: MUSIC_45_DATA_BASE64 },
  46: { size: MUSIC_46_SIZE, base64: MUSIC_46_DATA_BASE64 },
  47: { size: MUSIC_47_SIZE, base64: MUSIC_47_DATA_BASE64 },
  48: { size: MUSIC_48_SIZE, base64: MUSIC_48_DATA_BASE64 },
  49: { size: MUSIC_49_SIZE, base64: MUSIC_49_DATA_BASE64 },
  50: { size: MUSIC_50_SIZE, base64: MUSIC_50_DATA_BASE64 },
  51: { size: MUSIC_51_SIZE, base64: MUSIC_51_DATA_BASE64 },
  52: { size: MUSIC_52_SIZE, base64: MUSIC_52_DATA_BASE64 },
  53: { size: MUSIC_53_SIZE, base64: MUSIC_53_DATA_BASE64 },
  54: { size: MUSIC_54_SIZE, base64: MUSIC_54_DATA_BASE64 },
  55: { size: MUSIC_55_SIZE, base64: MUSIC_55_DATA_BASE64 },
  56: { size: MUSIC_56_SIZE, base64: MUSIC_56_DATA_BASE64 },
  57: { size: MUSIC_57_SIZE, base64: MUSIC_57_DATA_BASE64 },
  58: { size: MUSIC_58_SIZE, base64: MUSIC_58_DATA_BASE64 },
  59: { size: MUSIC_59_SIZE, base64: MUSIC_59_DATA_BASE64 },
  60: { size: MUSIC_60_SIZE, base64: MUSIC_60_DATA_BASE64 },
  61: { size: MUSIC_61_SIZE, base64: MUSIC_61_DATA_BASE64 },
  62: { size: MUSIC_62_SIZE, base64: MUSIC_62_DATA_BASE64 },
  63: { size: MUSIC_63_SIZE, base64: MUSIC_63_DATA_BASE64 },
};

export const MUSIC_IDS = [0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 13, 14, 18, 20, 21, 23, 24, 25, 26, 28, 29, 31, 32, 33, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63];

export function decodeBase64ToUint8Array(base64: string): Uint8Array {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}
