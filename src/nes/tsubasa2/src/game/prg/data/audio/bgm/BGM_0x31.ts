/**
 * SID 0x31 — Bank 12
 * Channels: 0,1,2,3
 * Bytes: 13 | Notes: 0
 * NES_BASE = SE_MAP initPtr 0x8E5B（$8349 引擎真实入口）
 * RAW 从 initPtr 起，含 init list 头 [chNum lo hi]* [0xFF] + 全部可达数据（E8/E9 已追踪）
 * 自动生成（scripts/gen-bgm-sid.cjs），请勿手改
 */

/** SQ1 (ch=0/4) */
export const BGM_31_TRACK_SQ1: readonly number[] = [
  0xFF,
];

/** SQ2 (ch=1/5) */
export const BGM_31_TRACK_SQ2: readonly number[] = [
  0xFF,
];

/** TRI (ch=2/6) */
export const BGM_31_TRACK_TRI: readonly number[] = [
  0xFF,
];

/** NOISE (ch=3/7) */
export const BGM_31_TRACK_NOISE: readonly number[] = [
  0xFF,
];

/** 共享数据（initPtr 起始完整可达区） */
export const BGM_31_RAW: readonly number[] = [
  0x00, 0x67, 0x8E, 0x01, 0x67, 0x8E, 0x02, 0x67, 0x8E, 0x03, 0x67, 0x8E,
  0xFF,
];

/** NES 基址 = SE_MAP initPtr */
export const BGM_31_NES_BASE = 0x8E5B;

/** 元数据 */
export const BGM_31_META = {
  id: 0x31, bank: 12, type: 'SFX',
  channels: [0,1,2,3],
  bytes: 13, notes: 0,
} as const;
