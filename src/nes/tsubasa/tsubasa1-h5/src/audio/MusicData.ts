/**
 * MusicData — NES 音乐数据 (v3.0 真实ROM提取版)
 *
 * 数据来源: Bank 1 音频引擎 ($9B00-$9FFF)
 *
 * ## 频率周期表 ($DFB0)
 *   12个条目 (pitch 0-11), 每个2字节 (little-endian)
 *   值为NES APU 11-bit period
 *   转换公式: f = 1789773 / (16 * (period + 1))  [Pulse通道]
 *            f = 1789773 / (32 * (period + 1))  [Triangle通道]
 *
 * ## 音符时长表 ($DFC8)
 *   64个条目 (0x00-0x3F), 每个1字节
 *   映射音符值 → 持续帧数
 *
 * ## 音乐数据格式
 *   单字节编码:
 *     Bits 0-3: pitch (0-11查频率表, 12=rest/special)
 *     Bits 4-7: octave (0-15, 右移频率period除数)
 *     Bit 7=1: 命令字节 ($E0-$FF)
 *
 * ## 音乐数据指针表 ($DFF0)
 *   指向音乐序列数据 (在 $A000 区域)
 */

// ============================================================
// 频率周期表 — 从 ROM Bank 1 $DFB0 提取 (12条 × 2字节)
// ============================================================

/** NES APU 11-bit period 值 (pitch 0-11, 低八度) */
export const FREQ_PERIOD_TABLE: number[] = [
  0x06AE,  // pitch  0: C (523Hz → NES period ~$06AE)
  0x064E,  // pitch  1: C#/Db
  0x05F3,  // pitch  2: D
  0x059E,  // pitch  3: D#/Eb
  0x054D,  // pitch  4: E
  0x0501,  // pitch  5: F
  0x04B9,  // pitch  6: F#/Gb
  0x0475,  // pitch  7: G
  0x0435,  // pitch  8: G#/Ab
  0x03F8,  // pitch  9: A
  0x03BF,  // pitch 10: A#/Bb
  0x0389,  // pitch 11: B
];

/** NES CPU 时钟 (NTSC) */
const CPU_CLOCK = 1789773;

/**
 * 将 NES period 转换为频率 (Hz)
 * @param period 11-bit NES APU period
 * @param isTriangle 是否为Triangle通道 (Triangle 的频率计算不同)
 */
export function periodToFrequency(period: number, isTriangle: boolean = false): number {
  const divisor = isTriangle ? 32 : 16;
  return CPU_CLOCK / (divisor * (period + 1));
}

/**
 * 将音符字节解码为频率 (Hz)
 *
 * 音符格式 (对应 ASM $9DC1-$9DFF):
 *   byte: oooo pppp
 *         ^^^^ ^^^^
 *         |||| ++++-- pitch (0-11): FREQ_PERIOD_TABLE 索引
 *         ++++------- octave (0-15): period 右移位数
 *
 * 处理逻辑:
 *   1. pitch = byte & 0x0F
 *   2. 如果 pitch >= 12 → 非音符 (rest/control)
 *   3. octave = (byte & 0xF0) >> 4
 *   4. period = FREQ_PERIOD_TABLE[pitch] >> octave
 *   5. frequency = CPU_CLOCK / (16 * (period + 1))
 */
export function noteToFrequency(noteByte: number, isTriangle: boolean = false): number | null {
  const pitch = noteByte & 0x0F;

  // pitch >= 12 不是有效音符
  if (pitch >= 12) return null;

  // 查频率表
  let period = FREQ_PERIOD_TABLE[pitch];

  // 根据八度移位
  const octave = (noteByte & 0xF0) >> 4;
  if (octave > 0) {
    period = period >> octave;
  }

  // 避免 period 为 0
  if (period <= 0) period = 1;

  return periodToFrequency(period, isTriangle);
}

// ============================================================
// 音符时长表 — 从 ROM Bank 1 $DFC8 提取 (64条)
// ============================================================

/** 音符时长表 (值 → 帧数) */
export const NOTE_DURATION_TABLE: number[] = [
  0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07,  // 0x00-0x07
  0x08, 0x09, 0x0A, 0x0C, 0x0E, 0x0F, 0x10, 0x12,  // 0x08-0x0F
  0x14, 0x15, 0x18, 0x1B, 0x1C, 0x1E, 0x20, 0x24,  // 0x10-0x17
  0x28, 0x2A, 0x30, 0x36, 0x38, 0x3C, 0x40, 0x48,  // 0x18-0x1F
  0x50, 0x54, 0x60, 0x6C, 0x70, 0x80, 0x90, 0xC0,  // 0x20-0x27
  // 后续条目 (0x28-0x3F) 未在 ROM $DFC8 的连续区域找到全部,
  // 使用插值补全 (这些可能是音符控制码或命令)
  0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x08, 0x0A,  // 0x28-0x2F (插值)
  0x0C, 0x0E, 0x10, 0x14, 0x18, 0x1C, 0x20, 0x28,  // 0x30-0x37 (插值)
  0x30, 0x38, 0x40, 0x48, 0x50, 0x60, 0x70, 0x80,  // 0x38-0x3F (插值)
];

// ============================================================
// 音乐序列指针表 — 从 ROM Bank 1 $DFF0 提取
// ============================================================

/**
 * 音乐数据块指针 (指向 $A000 区域内)
 * 从 $DFF0 提取, 每个2字节 little-endian
 */
export const MUSIC_DATA_POINTERS: number[] = [
  0xE01A,  // [0] → 序列0 ($A01A)
  0xE03A,  // [1] → 序列1 ($A03A)
  0xE07C,  // [2] → 序列2 ($A07C)
  0xE0A4,  // [3] → 序列3 ($A0A4)
  // 更多指针待从 ROM 验证
];

// ============================================================
// 向后兼容: 旧版 MusicTrack/MusicSequence 类型
// ============================================================

import type { MusicTrack, MusicSequenceData } from './AudioEngine';

/** @deprecated 旧版音轨定义 (v2格式) */
export const MUSIC_TRACKS: MusicTrack[] = [
  { name: 'Opening BGM',  dataOffset: 0xA01A, desc: '开场/标题音乐 ($DFF0[0])' },
  { name: 'Menu BGM',     dataOffset: 0xA03A, desc: '菜单音乐 ($DFF0[1])' },
  { name: 'Match BGM 1',  dataOffset: 0xA07C, desc: '比赛音乐1 ($DFF0[2])' },
  { name: 'Match BGM 2',  dataOffset: 0xA0A4, desc: '比赛音乐2 ($DFF0[3])' },
];

/**
 * 从 ROM $A01A 区域提取的实际音乐序列数据
 *
 * 注意: 这些是占位数据。实际的音乐序列格式是单字节命令/音符流,
 * 需要根据 Bank 1 音频引擎的命令解析逻辑来解码。
 *
 * 当前提供的序列是测试用数据, 用于验证音频引擎框架。
 * 完整音乐数据需要从 ROM 深度提取。
 */

/** 简单音阶测试序列 (下行音阶, 每个音符8帧) */
const SCALE_DOWN: number[] = [
  0x0B, 0x0A, 0x09, 0x08, 0x07, 0x06, 0x05, 0x04,
  0x03, 0x02, 0x01, 0x00, 0xFF, // 结束
];

/** 简单上行音阶 */
const SCALE_UP: number[] = [
  0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07,
  0x08, 0x09, 0x0A, 0x0B, 0xE0, // 循环
];

/** 节奏测试 */
const RHYTHM_TEST: number[] = [
  0x05, 0x05, 0x08, 0x05, 0x05, 0x08,
  0x07, 0x08, 0x05, 0x08, 0x07, 0x08,
  0xE0, // 循环
];

/** 低音线测试 */
const BASS_LINE: number[] = [
  0x30, 0x32, 0x34, 0x35, 0x34, 0x32, 0x30, 0xE0,
];

/** @deprecated 使用 v3 格式 (FREQ_PERIOD_TABLE + NOTE_DURATION_TABLE) */
export const MUSIC_SEQUENCES: Array<{ dataOffset: number; data: MusicSequenceData }> = [
  { dataOffset: 0xA01A, data: new Uint8Array(SCALE_DOWN) },
  { dataOffset: 0xA03A, data: new Uint8Array(SCALE_UP) },
  { dataOffset: 0xA07C, data: new Uint8Array(RHYTHM_TEST) },
  { dataOffset: 0xA0A4, data: new Uint8Array(BASS_LINE) },
];

// ============================================================
// v2 格式兼容导出 (保留以避免破坏现有代码)
// ============================================================

export const MUSIC_PTR_TABLE: number[] = [
  0x00EC, 0x010C, 0x0136, 0x013A, 0x013E, 0x0142,
  0x0146, 0x0152, 0x0192, 0x0196, 0x011E, 0x014A, 0x014E,
];

export interface MusicPair { dur: number; pitch: number; }
export interface MusicSequence {
  offset: number;
  pairs: MusicPair[];
}

export function getSequenceByPtr(_index: number): MusicSequence | null { return null; }
export function getSequenceByOffset(_offset: number): MusicSequence | null { return null; }
