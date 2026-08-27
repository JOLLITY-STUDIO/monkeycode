/**
 * SongCatalog — 具象化音频数据模型（替代 audio-rom.ts 的字节访问 API）
 *
 * 翻译原则（v2）：
 *   - 禁止 AudioRom.readBank12Byte(addr) / readSePointer(idx) / readBank12U16(addr)
 *     这类"按地址读 NES ROM 字节"的 API
 *   - 禁止 SONG_REQUEST_IDS / BGM_POINTER_TABLE_ADDR 这种"ROM 字节表头"
 *   - 音频数据是具名条目：每首 BGM/SE 是一段声明式字节流；频率/时值/命令是具名常量数组
 *   - 数据"内容格式"具象：NoteToken / DurationToken / SpeedToken / CommandToken 类型化
 *
 * 历史：原 audio-rom.ts 把 bank12 250KB 字节 + readBank12Byte/U16/readSePointer/readTrackData
 *       + BGM_POINTER_TABLE_ADDR/SE_POINTER_TABLE_ADDR 等当数据 API。Bank 切换靠 MMC3 R6/R7
 *       寄存器在运行时改窗口，H5 已无此语义。SongCatalog 直接按请求 ID 索引到具名条目。
 *
 * 入口：
 *   - lookupSong(requestId) → SongRecord | null
 *   - FREQUENCY_TABLE[idx] → 16-bit APU period (12 entries)
 *   - DURATION_TABLE[idx]  → tick count (64 entries)
 *   - COMMAND_TABLE[idx]   → command handler opcode
 */

import type { AudioToken } from './AudioTokens';
import { BGM_SONGS } from './bgm/index';
import { SE_SONGS } from './se/index';
import type { SongTrack } from './song-track';

/** 音频通道类型（原版通道号 → APU 通道） */
export type ChannelKind = 'pulse1' | 'pulse2' | 'triangle' | 'noise' | 'pulse1Dup' | 'pulse2Dup' | 'triangleDup' | 'noiseDup';

/** 单个通道的音轨（声明式字节流） */
export interface ChannelTrack {
  /** NES 通道号（4=Pulse1, 5=Pulse2, 6=Triangle, 7=Noise，H5 内部再加 4 得 ch 4-7） */
  readonly channel: ChannelKind;
  /** 通道音轨字节流（命令流：note/duration/speed/command tokens） */
  readonly track: ReadonlyArray<AudioToken>;
}

/** 单首曲目条目（具象化字节 + 元数据） */
export interface SongRecord {
  /** 请求 ID（playBgm/playSe 入参） */
  readonly requestId: number;
  /** 标题（来自 BGM 元数据，SE 留空） */
  readonly name: string;
  /** 数据 bank（12/13/14/15） */
  readonly bank: number;
  /** 起始 CPU 地址 */
  readonly cpuAddr: number;
  /** 通道音轨列表（head 终止：channelNum >= 0x80） */
  readonly channels: ReadonlyArray<ChannelTrack>;
  /** 分类标签（调试用） */
  readonly kind: 'bgm' | 'se';
  /** header 标志字节 (>=0x80 表示仅启用通道后返回) */
  readonly headerFlag?: number;
}

// ════════════════════════════════════════════════════
// 频率表（原 $870D 起 12 项 × 2 字节 LE：APU period）
// APU 频率 = NES_CPU / (16 * (period + 1))
// 半音表：低 4 位 = 半音索引（0=C, 1=C#, 2=D, ... 11=B），高 4 位 = 八度右移次数
// ════════════════════════════════════════════════════

/** 频率表（12 项 × 16-bit APU period） */
export const FREQUENCY_TABLE: ReadonlyArray<number> = [
  0x07F1, 0x0772, 0x06FA, 0x0688, 0x061D, 0x05B7, 0x0557, 0x04FC,
  0x04A6, 0x0454, 0x0407, 0x03BE,
];

/** 时值表（64 项 = tick 数） */
export const DURATION_TABLE: ReadonlyArray<number> = [
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x01, 0x01, 0x01, 0x01, 0x02, 0x02, 0x03, 0x03,
  0x04, 0x04, 0x05, 0x05, 0x06, 0x07, 0x08, 0x09,
  0x0A, 0x0B, 0x0C, 0x0E, 0x10, 0x12, 0x14, 0x16,
  0x18, 0x1B, 0x1E, 0x21, 0x24, 0x28, 0x2C, 0x30,
  0x34, 0x39, 0x3E, 0x43, 0x49, 0x4F, 0x55, 0x5C,
  0x63, 0x6A, 0x72, 0x7A, 0x83, 0x8C, 0x95, 0x9F,
  0xA9, 0xB4, 0xBF, 0xCB, 0xD7, 0xE4, 0xF2, 0xFF,
];

/**
 * 命令表（32 项 × 16-bit：命令分发地址，从真 ROM Bank6 offset 0x4DA 提取）
 * - 0x8707 = NOP / 未用命令
 * - 其他值是命令处理器的入口地址（位于 Bank13 0x8000-0x87FF 区段）
 */
export const COMMAND_TABLE: ReadonlyArray<number> = [
  0x8544, 0x8707, 0x8641, 0x855F, 0x8617, 0x8670, 0x8707, 0x8707,
  0x8578, 0x8585, 0x85AF, 0x85C6, 0x85EF, 0x8681, 0x8707, 0x8690,
  0x8709, 0x8707, 0x851A, 0x853B, 0x8532, 0x8707, 0x8707, 0x8707,
  0x8707, 0x8699, 0x86B8, 0x86D7, 0x8707, 0x8707, 0x86F6, 0x8655,
];

/* 真实通道字节数据源（按 requestId 索引）——
   早期版本返回空 track（pseudoChannels 占位），导致所有 BGM/SE
   实际静音。当前改为抽 BGM_0x01 + BGM_0x02 的最小可发声 token 流
   让链路真正工作（不准确占位，与真 PRG 流会有出入但能出声）。
   V0.7 须从 mini-audio/mini-audio/bgm-data/* + se-data/* 抽字节 + 翻译 token。 */
const FAKE_SONG_CHANNELS: Record<number, ReadonlyArray<ChannelTrack>> = {
  // BGM 0x01 (tecmo logo) — 4 channel 各 4 note, 允许相位错位但能出声
  0x01: [
    { channel: 'pulse1', track: [
      { kind: 'note', semitone: 0, octave: 0 },
      { kind: 'duration', ticks: 16 },
      { kind: 'note', semitone: 2, octave: 0 },
      { kind: 'duration', ticks: 16 },
      { kind: 'note', semitone: 4, octave: 0 },
      { kind: 'duration', ticks: 16 },
      { kind: 'note', semitone: 5, octave: 0 },
      { kind: 'duration', ticks: 16 },
    ]},
    { channel: 'pulse2', track: [
      { kind: 'note', semitone: 7, octave: 0 },
      { kind: 'duration', ticks: 16 },
      { kind: 'note', semitone: 5, octave: 0 },
      { kind: 'duration', ticks: 16 },
      { kind: 'rest' },
      { kind: 'duration', ticks: 32 },
    ]},
    { channel: 'triangle', track: [
      { kind: 'note', semitone: 0, octave: 1 },
      { kind: 'duration', ticks: 32 },
      { kind: 'note', semitone: 4, octave: 1 },
      { kind: 'duration', ticks: 32 },
    ]},
    { channel: 'noise', track: [
      { kind: 'noise', freqByte: 0x04 },
      { kind: 'duration', ticks: 64 },
    ]},
  ],
  // BGM 0x02 (story_cup / drift30) — 极简 placeholder
  0x02: [
    { channel: 'pulse1', track: [
      { kind: 'note', semitone: 4, octave: 1 },
      { kind: 'duration', ticks: 12 },
      { kind: 'note', semitone: 2, octave: 1 },
      { kind: 'duration', ticks: 12 },
      { kind: 'note', semitone: 0, octave: 1 },
      { kind: 'duration', ticks: 12 },
    ]},
    { channel: 'pulse2', track: [
      { kind: 'note', semitone: 5, octave: 1 },
      { kind: 'duration', ticks: 12 },
      { kind: 'rest' },
      { kind: 'duration', ticks: 24 },
    ]},
    { channel: 'triangle', track: [
      { kind: 'note', semitone: 0, octave: 2 },
      { kind: 'duration', ticks: 36 },
    ]},
    { channel: 'noise', track: [] },
  ],
};

function pseudoChannels(requestId: number): ReadonlyArray<ChannelTrack> {
  return FAKE_SONG_CHANNELS[requestId] ?? [
    { channel: 'pulse1', track: [] },
    { channel: 'pulse2', track: [] },
    { channel: 'triangle', track: [] },
    { channel: 'noise', track: [] },
  ];
}

/** 由 BGM_SONGS（48 首）+ SE_SONGS（59 首）聚合而来的声明式查找表 */
function buildSongs(): ReadonlyMap<number, SongRecord> {
  const out = new Map<number, SongRecord>();
  const put = (s: SongTrack) => {
    if (out.has(s.requestId)) return;
    out.set(s.requestId, {
      requestId: s.requestId,
      name: s.name ?? '',
      bank: s.bank as unknown as number,
      cpuAddr: s.cpuAddr,
      channels: pseudoChannels(s.requestId),
      kind: s.type === 'BGM' ? 'bgm' : 'se',
    });
  };
  for (const s of BGM_SONGS) put(s);
  for (const s of SE_SONGS) put(s);
  return out;
}

/**
 * 查表：requestId → SongRecord（具名查找）
 * 数据源：audio/bgm/* + audio/se/* 元数据；运行时由 AudioService 接到 PAPU
 */
export const SONGS: ReadonlyMap<number, SongRecord> = buildSongs();

/** BGM 数量 */
export const SONG_COUNT = BGM_SONGS.length + SE_SONGS.length;

/** 查表：requestId → SongRecord（null = 未注册） */
export function lookupSong(requestId: number): SongRecord | null {
  return SONGS.get(requestId & 0xFF) ?? null;
}