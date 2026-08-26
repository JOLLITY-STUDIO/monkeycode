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
/** 频率表（12 项 × 16-bit APU period） */
export declare const FREQUENCY_TABLE: ReadonlyArray<number>;
/** 时值表（64 项 = tick 数） */
export declare const DURATION_TABLE: ReadonlyArray<number>;
/**
 * 命令表（32 项 × 16-bit：命令分发地址，从真 ROM Bank6 offset 0x4DA 提取）
 * - 0x8707 = NOP / 未用命令
 * - 其他值是命令处理器的入口地址（位于 Bank13 0x8000-0x87FF 区段）
 */
export declare const COMMAND_TABLE: ReadonlyArray<number>;
/**
 * 查表：requestId → SongRecord（具名查找）
 * 数据源：audio/bgm/* + audio/se/* 元数据；运行时由 AudioService 接到 PAPU
 */
export declare const SONGS: ReadonlyMap<number, SongRecord>;
/** BGM 数量 */
export declare const SONG_COUNT: number;
/** 查表：requestId → SongRecord（null = 未注册） */
export declare function lookupSong(requestId: number): SongRecord | null;
