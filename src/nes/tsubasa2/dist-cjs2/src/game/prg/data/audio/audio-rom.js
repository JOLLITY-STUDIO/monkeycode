"use strict";
/**
 * audio-rom.ts — 音频类型化访问器（按需退化：具象化 SONGS 接管后，老 API 删除）
 *
 * 翻译原则（v2）：
 *   - 业务侧 100% 走 SongCatalog（具名 requestId → SongRecord）
 *   - 频率/时值/命令由 SongCatalog.FREQUENCY_TABLE / DURATION_TABLE / COMMAND_TABLE 直查
 *   - 禁止暴露 lo/hi 拆字节、POINTER_TABLE_ADDR 等 CPU 地址字面量
 *
 * 历史：原 audio-rom.ts 暴露 BANK12_BYTES + readBank12Byte/U16 + readSePointer 等"按 NES ROM
 *       地址读字节"的 API；H5 翻译已完成具象化（按 BGM/SE 文件夹拆分 + SongCatalog 聚合）。
 *       本类保留具名访问器以兼容老引用，老 API（返回 -1 的占位常量）已删除。
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioRom = exports.SONG_REQUEST_IDS = void 0;
exports.getApePeriod = getApePeriod;
exports.getTickDuration = getTickDuration;
exports.getCommandHandler = getCommandHandler;
const SongCatalog_1 = require("./SongCatalog");
/**
 * 16-bit APU period 查询（替代旧 readBank12U16(0x870D + idx*2)）
 *
 * semitone 是 0-11（C..B，1 八度 = 12 半音），octave 由调用方 shift 处理。
 * 原 ROM 频率表 12 项（idx 0-11），边界用 `& 0x0b`（=11）掩码。
 */
function getApePeriod(idx) {
    return SongCatalog_1.FREQUENCY_TABLE[idx & 0x0b] ?? 0;
}
/** tick 时值查询（替代旧 readBank12Byte(0x8725 + idx)） */
function getTickDuration(idx) {
    return SongCatalog_1.DURATION_TABLE[idx & 0x3f] ?? 0;
}
/** 命令句柄（替代旧 readBank12U16(0x84DA + idx*2)） */
function getCommandHandler(idx) {
    return SongCatalog_1.COMMAND_TABLE[idx & 0x1f] ?? 0;
}
/** 旧 BGM/SE request ID 范围常量 (测试残留兼容) */
exports.SONG_REQUEST_IDS = {
    BGM_LOW: 0x03,
    BGM_HIGH: 0x32,
    SE_LOW: 0x32,
    SE_HIGH: 0x6F,
    SE_EXT_HIGH: 0x6F,
};
/* 兼容旧引用：AudioRom 类（具名方法，不再返回 -1 占位） */
class AudioRom {
    static frequency(idx) { return getApePeriod(idx); }
    static duration(idx) { return getTickDuration(idx); }
    static command(idx) { return getCommandHandler(idx); }
}
exports.AudioRom = AudioRom;
