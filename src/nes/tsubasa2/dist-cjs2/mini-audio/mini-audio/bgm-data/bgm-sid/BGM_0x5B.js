"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BGM_5B_META = exports.BGM_5B_HEADER_OFFSET = exports.BGM_5B_NES_BASE = exports.BGM_5B_RAW = exports.BGM_5B_TRACK_NOISE = exports.BGM_5B_TRACK_TRI = exports.BGM_5B_TRACK_SQ2 = exports.BGM_5B_TRACK_SQ1 = void 0;
/** SQ1 (ch=0/4) */
exports.BGM_5B_TRACK_SQ1 = [];
/** SQ2 (ch=1/5) */
exports.BGM_5B_TRACK_SQ2 = [];
/** TRI (ch=2/6) */
exports.BGM_5B_TRACK_TRI = [];
/** NOISE (ch=3/7) */
exports.BGM_5B_TRACK_NOISE = [];
/** 共享数据（RAW_START 起始完整可达区） */
exports.BGM_5B_RAW = [
    0xFF,
];
/** NES 基址 = RAW_START（raw[0] 对应的 NES 地址） */
exports.BGM_5B_NES_BASE = 0x9FFE;
/** header 在 RAW 内的偏移（initPtr - RAW_START），播放器解析 header 用 */
exports.BGM_5B_HEADER_OFFSET = 0x00;
/** 元数据 */
exports.BGM_5B_META = {
    id: 0x5B, bank: 15, type: 'SILENT',
    channels: [],
    bytes: 1, notes: 0,
    silent: true,
};
