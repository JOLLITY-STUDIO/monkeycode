/**
 * Bank 12 音频引擎 — 常量表 & 类型定义
 *
 * 从 mini-audio/bgm-data/Tsubasa2AudioPlayer.ts 移植。
 * 严格对照 Bank 12 ROM ($8002-$870C) 的数据表。
 */

// ════════════════════════════════════════════════
// 引擎常量
// ════════════════════════════════════════════════

export const CPU_FREQ = 1789772.5;
export const CYCLES_PER_FRAME = Math.floor(CPU_FREQ / 60); // ~29830
export const NUM_CHANNELS = 8;
export const OAM_MAX = 64;

// ════════════════════════════════════════════════
// 频率表 ($870D-$8724): 12 半音 × 2B NES period (little-endian)
// 索引 0=C, 1=C#, 2=D, 3=D#, 4=E, 5=F, 6=F#, 7=G, 8=G#, 9=A, 10=A#, 11=B
// ════════════════════════════════════════════════

export const FREQ_TABLE: readonly number[] = [
  0x06AE, 0x064E, 0x05F3, 0x059E, 0x054D, 0x0501,
  0x04B9, 0x0475, 0x0435, 0x03F8, 0x03BF, 0x0389,
];

// ════════════════════════════════════════════════
// 时值表 ($8725-$8764): 64 entries, 帧数
// ════════════════════════════════════════════════

export const DUR_TABLE: readonly number[] = [
  0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A, 0x0C, 0x0E, 0x0F, 0x10, 0x12,
  0x14, 0x15, 0x18, 0x1B, 0x1C, 0x1E, 0x20, 0x24, 0x28, 0x2A, 0x30, 0x36, 0x38, 0x3C, 0x40, 0x48,
  0x50, 0x54, 0x60, 0x6C, 0x70, 0x80, 0x90, 0xA0, 0xC0, 0xE0, 0x0B, 0x85, 0xA8, 0xFF, 0xF0, 0x52,
  0x89, 0x5C, 0x89, 0x6A, 0x89, 0x78, 0x89, 0x88, 0x89, 0xA0, 0x89, 0xB8, 0x89, 0xC0, 0x89, 0xC8,
];

// ════════════════════════════════════════════════
// $82E4 频率修改跳转表
// ════════════════════════════════════════════════

// type=1, 8-step sequence indexed by seqIdx
export const SEQ_MOD_TABLE_TYPE1: ReadonlyArray<[number, number]> = [
  [0, 0],   // 0: no change
  [1, 0],   // 1: freq_lo+1
  [2, 0],   // 2: freq_lo+2
  [1, 0],   // 3: freq_lo+1 (dup of 1)
  [0, 0],   // 4: no change
  [3, 0],   // 5: freq_lo+3
  [6, 0],   // 6: freq_lo+6
  [3, 0],   // 7: freq_lo+3 (dup of 5)
];

// type=2, 8-step sequence indexed by seqIdx
export const SEQ_MOD_TABLE_TYPE2: ReadonlyArray<[number, number]> = [
  [0, 0],   // 0: no change
  [-1, 0],  // 1: freq_lo-1
  [-2, 0],  // 2: freq_lo-2
  [-1, 0],  // 3: same as 1
  [0, 0],   // 4: no change
  [3, 0],   // 5: freq_lo+3
  [6, 0],   // 6: freq_lo+6
  [3, 0],   // 7: same as 5
];

// ════════════════════════════════════════════════
// Timing sub-tables ($E0 命令设置)
// 每个 table 是 [durLo, nextDurHi] 条目数组
// TODO: 从 Bank 12 ROM $8544 区域提取完整数据
// ════════════════════════════════════════════════

export const TIMING_SUB_TABLES: ReadonlyArray<ReadonlyArray<[number, number]>> = [
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

export const APU_GROUP_BASE: readonly number[] = [0x0C, 0x08, 0x04, 0x00];

// ════════════════════════════════════════════════
// Per-channel 参数块 (对应 $0727+ch*16)
// ════════════════════════════════════════════════

export interface ChBlock {
  /** +0: track_ptr_lo — 当前轨道读取位置低字节 */
  trackLo: number;
  /** +1: track_ptr_hi */
  trackHi: number;
  /** +2: timing_table_ptr_lo / next_dur_lo */
  timingLo: number;
  /** +3: timing_table_ptr_hi / next_dur_hi */
  timingHi: number;
  /** +4: timing_offset (递增+2) */
  timingOff: number;
  /** +5: vol_ctrl (bit4=sweep, bit5=rest, bits6-7=duty, bits0-3=vol) */
  volCtrl: number;
  /** +6: final volume byte written to $4000 ($81DB 计算结果) */
  apuVol: number;
  /** +7: freq_lo (NES period low) */
  freqLo: number;
  /** +8: freq_hi (NES period high, bit7 = dedup flag) */
  freqHi: number;
  /** +9: stack pointer / channel flags */
  stkPtr: number;
}

export function createChBlock(): ChBlock {
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

// ════════════════════════════════════════════════
// 全局工作区 (对应 $0706-$07FF)
// ════════════════════════════════════════════════

export interface WorkArea {
  /** $0706: 通道活跃 bitmask (8 bits) */
  chMask: number;
  /** $0707+X: 通道 dur_lo (DEC 后触发音序器) */
  durLo: Uint8Array;
  /** $0709+X: 通道 next_dur_lo (DEC 后触发 timing table 读取) */
  durHi: Uint8Array;
  /** $070A+X: 通道 next_dur_hi (静态值，来自 timing table，用于音量计算) */
  nextDurHi: Uint8Array;
  /** $07AF-$07B6: 通道类型 (0/1/2) */
  chType: Uint8Array;
  /** $07B7-$07BE: 基础频率 lo */
  baseFreqLo: Uint8Array;
  /** $07BF-$07C6: 基础频率 hi */
  baseFreqHi: Uint8Array;
  /** $07C7-$07CE: 音序索引 0-9 */
  seqIdx: Uint8Array;
  /** $07CF-$07D6: 音量衰减计数器 */
  volDecay: Uint8Array;
  /** $07D7-$07DE: 音量衰减重载值 */
  volDecayReload: Uint8Array;
  /** $07E0-$07E3: 上次写入 $4003 的值 (4 groups) */
  last4003: Uint8Array;
  /** $07E4-$07E7: 通道静音标志 (4 groups) */
  muteFlags: Uint8Array;
  /** $07E8: DMC 活动标志 */
  dmcActive: number;
  /** $07EA-$07F1: portamento enable 标志 (0=off, 0x0F=on) */
  portamentoEn: Uint8Array;
  /** $07F4-$07FB: portamento/pitch 值 */
  portamentoVal: Int8Array;
  /** Dedup cache: 标记 freq_hi 是否需要重新写入 */
  freqDirty: Uint8Array;
  /** 保存最近一次时长前缀的值，供后续音符复用 */
  noteDur: Uint8Array;
  /** 标记该通道是否已播放过至少一个音符 (baseFreq set) */
  notePlayed: Uint8Array;
}

export function createWorkArea(): WorkArea {
  return {
    chMask: 0,
    durLo: new Uint8Array(NUM_CHANNELS),
    durHi: new Uint8Array(NUM_CHANNELS),
    nextDurHi: new Uint8Array(NUM_CHANNELS),
    chType: new Uint8Array(NUM_CHANNELS),
    baseFreqLo: new Uint8Array(NUM_CHANNELS),
    baseFreqHi: new Uint8Array(NUM_CHANNELS),
    seqIdx: new Uint8Array(NUM_CHANNELS),
    volDecay: new Uint8Array(NUM_CHANNELS),
    volDecayReload: new Uint8Array(NUM_CHANNELS),
    last4003: new Uint8Array(4),
    muteFlags: new Uint8Array(4),
    dmcActive: 0,
    portamentoEn: new Uint8Array(NUM_CHANNELS),
    portamentoVal: new Int8Array(NUM_CHANNELS),
    freqDirty: new Uint8Array(NUM_CHANNELS),
    noteDur: new Uint8Array(NUM_CHANNELS),
    notePlayed: new Uint8Array(NUM_CHANNELS),
  };
}
