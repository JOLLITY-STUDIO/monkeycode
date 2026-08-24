/**
 * AudioTokens — 音频命令流类型化（声明式 token 序列）
 *
 * 原 NES 音频命令流是一段连续字节：
 *   < $80           音名（低 4 位 = 半音索引，高 4 位 = 八度右移次数）
 *   $80-$AF         时值（& $3F 查 DURATION_TABLE）
 *   $B0-$DF         速度（跳过 1 个参数字节）
 *   >= $E0          命令（& $1F 查 COMMAND_TABLE）
 *
 * H5 直接翻译为具名 token 数组：
 *   NoteToken / DurationToken / SpeedToken / CommandToken
 *
 * 注意：保留字节 token 形态（AudioTokenByte）用于原 ROM 提取阶段
 *       尚未完成 token 化的中间表示；最终 SONGS 表项统一使用具名 token。
 */

export type ChannelKindNum = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

/** 具名 token 联合类型 */
export type AudioToken =
  | NoteToken
  | DurationToken
  | SpeedToken
  | CommandToken
  | RestToken
  | NoiseToken;

/** 音名 token：semitone 0-11（C, C#, D, ..., B）+ octave 八度右移次数 */
export interface NoteToken {
  readonly kind: 'note';
  /** 半音索引 0-11 */
  readonly semitone: number;
  /** 八度右移次数 0-15（每次右移 freq 减半） */
  readonly octave: number;
}

/** 时值 token：tick 数 */
export interface DurationToken {
  readonly kind: 'duration';
  /** tick 数（来自 DURATION_TABLE） */
  readonly ticks: number;
}

/** 速度 token：tempo 调节（跳过 1 参数字节） */
export interface SpeedToken {
  readonly kind: 'speed';
  /** 速度参数 */
  readonly value: number;
}

/** 命令 token：channel-level 命令 */
export interface CommandToken {
  readonly kind: 'command';
  /** 命令索引（来自 COMMAND_TABLE） */
  readonly opcode: number;
  /** 命令参数（可选） */
  readonly arg?: number;
}

/** 休止符 token（semitone >= 0x0C 时） */
export interface RestToken {
  readonly kind: 'rest';
}

/** Noise 通道直通 token（ch 3/7：freqLo 直接作 frequency） */
export interface NoiseToken {
  readonly kind: 'noise';
  /** 频率字节（直通 APU） */
  readonly freqByte: number;
}

/** 字节 token（中间表示，未 token 化的字节流保留形态） */
export interface AudioTokenByte {
  readonly kind: 'byte';
  readonly value: number;
}