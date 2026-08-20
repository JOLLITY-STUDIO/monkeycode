"use strict";
/**
 * SID 0x31 — Bank 12
 * Channels: 0,1,2,3
 * Bytes: 13 | Notes: 0
 * NES_BASE = SE_MAP initPtr 0x8E5B（$8349 引擎真实入口）
 * RAW 从 initPtr 起，含 init list 头 [chNum lo hi]* [0xFF] + 全部可达数据（E8/E9 已追踪）
 * 自动生成（scripts/gen-bgm-sid.cjs），请勿手改
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BGM_31_META = exports.BGM_31_NES_BASE = exports.BGM_31_RAW = exports.BGM_31_TRACK_NOISE = exports.BGM_31_TRACK_TRI = exports.BGM_31_TRACK_SQ2 = exports.BGM_31_TRACK_SQ1 = void 0;
/** SQ1 (ch=0/4) */
exports.BGM_31_TRACK_SQ1 = [
    0xFF,
];
/** SQ2 (ch=1/5) */
exports.BGM_31_TRACK_SQ2 = [
    0xFF,
];
/** TRI (ch=2/6) */
exports.BGM_31_TRACK_TRI = [
    0xFF,
];
/** NOISE (ch=3/7) */
exports.BGM_31_TRACK_NOISE = [
    0xFF,
];
/** 共享数据（initPtr 起始完整可达区） */
exports.BGM_31_RAW = [
    0x00, 0x67, 0x8E, 0x01, 0x67, 0x8E, 0x02, 0x67, 0x8E, 0x03, 0x67, 0x8E,
    0xFF,
];
/** NES 基址 = SE_MAP initPtr */
exports.BGM_31_NES_BASE = 0x8E5B;
/** 元数据 */
exports.BGM_31_META = {
    id: 0x31, bank: 12, type: 'SFX',
    channels: [0, 1, 2, 3],
    bytes: 13, notes: 0,
};
