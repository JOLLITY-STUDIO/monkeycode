"use strict";
/**
 * Bank 12 音频引擎 — 常量表 & 类型定义
 *
 * 从 mini-audio/bgm-data/Tsubasa2AudioPlayer.ts 移植。
 * 严格对照 Bank 12 ROM ($8002-$870C) 的数据表。
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.APU_GROUP_BASE = exports.TIMING_SUB_TABLES = exports.SEQ_MOD_TABLE_TYPE2 = exports.SEQ_MOD_TABLE_TYPE1 = exports.DUR_TABLE = exports.FREQ_TABLE = exports.OAM_MAX = exports.NUM_CHANNELS = exports.CYCLES_PER_FRAME = exports.CPU_FREQ = void 0;
exports.createChBlock = createChBlock;
exports.createWorkArea = createWorkArea;
// ════════════════════════════════════════════════
// 引擎常量
// ════════════════════════════════════════════════
exports.CPU_FREQ = 1789772.5;
exports.CYCLES_PER_FRAME = Math.floor(exports.CPU_FREQ / 60); // ~29830
exports.NUM_CHANNELS = 8;
exports.OAM_MAX = 64;
// ════════════════════════════════════════════════
// 频率表 ($870D-$8724): 12 半音 × 2B NES period (little-endian)
// 索引 0=C, 1=C#, 2=D, 3=D#, 4=E, 5=F, 6=F#, 7=G, 8=G#, 9=A, 10=A#, 11=B
// ════════════════════════════════════════════════
exports.FREQ_TABLE = [
    0x06AE, 0x064E, 0x05F3, 0x059E, 0x054D, 0x0501,
    0x04B9, 0x0475, 0x0435, 0x03F8, 0x03BF, 0x0389,
];
// ════════════════════════════════════════════════
// 时值表 ($8725-$8764): 64 entries, 帧数
// ════════════════════════════════════════════════
exports.DUR_TABLE = [
    0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A, 0x0C, 0x0E, 0x0F, 0x10, 0x12,
    0x14, 0x15, 0x18, 0x1B, 0x1C, 0x1E, 0x20, 0x24, 0x28, 0x2A, 0x30, 0x36, 0x38, 0x3C, 0x40, 0x48,
    0x50, 0x54, 0x60, 0x6C, 0x70, 0x80, 0x90, 0xA0, 0xC0, 0xE0, 0x0B, 0x85, 0xA8, 0xFF, 0xF0, 0x52,
    0x89, 0x5C, 0x89, 0x6A, 0x89, 0x78, 0x89, 0x88, 0x89, 0xA0, 0x89, 0xB8, 0x89, 0xC0, 0x89, 0xC8,
];
// ════════════════════════════════════════════════
// $82E4 频率修改跳转表
// ════════════════════════════════════════════════
// type=1, 8-step sequence indexed by seqIdx
exports.SEQ_MOD_TABLE_TYPE1 = [
    [0, 0], // 0: no change
    [1, 0], // 1: freq_lo+1
    [2, 0], // 2: freq_lo+2
    [1, 0], // 3: freq_lo+1 (dup of 1)
    [0, 0], // 4: no change
    [3, 0], // 5: freq_lo+3
    [6, 0], // 6: freq_lo+6
    [3, 0], // 7: freq_lo+3 (dup of 5)
];
// type=2, 8-step sequence indexed by seqIdx
exports.SEQ_MOD_TABLE_TYPE2 = [
    [0, 0], // 0: no change
    [-1, 0], // 1: freq_lo-1
    [-2, 0], // 2: freq_lo-2
    [-1, 0], // 3: same as 1
    [0, 0], // 4: no change
    [3, 0], // 5: freq_lo+3
    [6, 0], // 6: freq_lo+6
    [3, 0], // 7: same as 5
];
// ════════════════════════════════════════════════
// Timing sub-tables ($E0 命令设置)
// 每个 table 是 [durLo, nextDurHi] 条目数组
// TODO: 从 Bank 12 ROM $8544 区域提取完整数据
// ════════════════════════════════════════════════
exports.TIMING_SUB_TABLES = [
    // idx 0: 基本衰减 (每帧 durLo=1, nextDurHi 递减)
    [[1, 15], [1, 13], [1, 11], [1, 9], [1, 7], [1, 5], [1, 3], [1, 1]],
    // idx 1: 快速衰减
    [[1, 7], [1, 5], [1, 3], [1, 1]],
    // idx 2: 慢速衰减
    [[2, 15], [2, 13], [2, 11], [2, 9], [2, 7], [2, 5], [2, 3], [2, 1]],
    // idx 3: 鼓点衰减 (NOISE 用)
    [[1, 15], [1, 14], [1, 13], [1, 12], [1, 11], [1, 10], [1, 9], [1, 8],
        [1, 7], [1, 6], [1, 5], [1, 4], [1, 3], [1, 2], [1, 1]],
    // idx 4-7: 占位 (后续从 ROM 提取)
    [[1, 1]],
    [[1, 1]],
    [[1, 1]],
    [[1, 1]],
];
// ════════════════════════════════════════════════
// APU 组基址 ($8623 EOR #$07 mapping)
// group=0→NOISE($400C), group=1→TRI($4008), group=2→SQ2($4004), group=3→SQ1($4000)
// X = (3^group)*4
// ════════════════════════════════════════════════
exports.APU_GROUP_BASE = [0x0C, 0x08, 0x04, 0x00];
function createChBlock() {
    return {
        trackLo: 0, trackHi: 0,
        timingLo: 0, timingHi: 0,
        timingOff: 0,
        volCtrl: 0x00,
        apuVol: 0x30,
        freqLo: 0, freqHi: 0x80,
        stkPtr: 0x0F,
    };
}
function createWorkArea() {
    return {
        chMask: 0,
        durLo: new Uint8Array(exports.NUM_CHANNELS),
        durHi: new Uint8Array(exports.NUM_CHANNELS),
        nextDurHi: new Uint8Array(exports.NUM_CHANNELS),
        chType: new Uint8Array(exports.NUM_CHANNELS),
        baseFreqLo: new Uint8Array(exports.NUM_CHANNELS),
        baseFreqHi: new Uint8Array(exports.NUM_CHANNELS),
        seqIdx: new Uint8Array(exports.NUM_CHANNELS),
        volDecay: new Uint8Array(exports.NUM_CHANNELS),
        volDecayReload: new Uint8Array(exports.NUM_CHANNELS),
        last4003: new Uint8Array(4),
        muteFlags: new Uint8Array(4),
        dmcActive: 0,
        portamentoEn: new Uint8Array(exports.NUM_CHANNELS),
        portamentoVal: new Int8Array(exports.NUM_CHANNELS),
        freqDirty: new Uint8Array(exports.NUM_CHANNELS),
        noteDur: new Uint8Array(exports.NUM_CHANNELS),
        notePlayed: new Uint8Array(exports.NUM_CHANNELS),
    };
}
