/**
 * SID 0x5B — Bank 15
 * Channels: —
 * Bytes: 1 | Notes: 0
 * initPtr = 0x9FFE（$8349 引擎真实入口，SE_MAP 索引 SE#-1）
 * RAW_START = 0x9FFE（= min(reachable)，含 E8/E9 共享乐句区）
 * HEADER_OFFSET = 0x00（header 在 RAW 内的偏移 = initPtr - RAW_START）
 * ★ 引擎空轨道（首字节 0xFF → 实机即无声）
 * 自动生成（scripts/gen-bgm-sid.cjs），请勿手改
 */

/** SQ1 (ch=0/4) */
export const BGM_5B_TRACK_SQ1: readonly number[] = [

];

/** SQ2 (ch=1/5) */
export const BGM_5B_TRACK_SQ2: readonly number[] = [

];

/** TRI (ch=2/6) */
export const BGM_5B_TRACK_TRI: readonly number[] = [

];

/** NOISE (ch=3/7) */
export const BGM_5B_TRACK_NOISE: readonly number[] = [

];

/** 共享数据（RAW_START 起始完整可达区） */
export const BGM_5B_RAW: readonly number[] = [
  0xFF,
];

/** NES 基址 = RAW_START（raw[0] 对应的 NES 地址） */
export const BGM_5B_NES_BASE = 0x9FFE;

/** header 在 RAW 内的偏移（initPtr - RAW_START），播放器解析 header 用 */
export const BGM_5B_HEADER_OFFSET = 0x00;

/** 元数据 */
export const BGM_5B_META = {
  id: 0x5B, bank: 15, type: 'SILENT',
  channels: [],
  bytes: 1, notes: 0,
  silent: true,
} as const;
