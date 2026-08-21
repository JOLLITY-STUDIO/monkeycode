/**
 * SID 0x4A — Bank 14
 * Channels: —
 * Bytes: 1 | Notes: 0
 * initPtr = 0x8E42（$8349 引擎真实入口，SE_MAP 索引 SE#-1）
 * RAW_START = 0x8E42（= min(reachable)，含 E8/E9 共享乐句区）
 * HEADER_OFFSET = 0x00（header 在 RAW 内的偏移 = initPtr - RAW_START）
 * ★ 引擎空轨道（首字节 0xFF → 实机即无声）
 * 自动生成（scripts/gen-bgm-sid.cjs），请勿手改
 */

/** SQ1 (ch=0/4) */
export const BGM_4A_TRACK_SQ1: readonly number[] = [

];

/** SQ2 (ch=1/5) */
export const BGM_4A_TRACK_SQ2: readonly number[] = [

];

/** TRI (ch=2/6) */
export const BGM_4A_TRACK_TRI: readonly number[] = [

];

/** NOISE (ch=3/7) */
export const BGM_4A_TRACK_NOISE: readonly number[] = [

];

/** 共享数据（RAW_START 起始完整可达区） */
export const BGM_4A_RAW: readonly number[] = [
  0xFF,
];

/** NES 基址 = RAW_START（raw[0] 对应的 NES 地址） */
export const BGM_4A_NES_BASE = 0x8E42;

/** header 在 RAW 内的偏移（initPtr - RAW_START），播放器解析 header 用 */
export const BGM_4A_HEADER_OFFSET = 0x00;

/** 元数据 */
export const BGM_4A_META = {
  id: 0x4A, bank: 14, type: 'SILENT',
  channels: [],
  bytes: 1, notes: 0,
  silent: true,
} as const;
