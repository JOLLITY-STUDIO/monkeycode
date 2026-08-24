/**
 * audio-rom.ts — NES ROM 原始字节 + 类型化访问器
 *
 * 翻译原则（v2）：
 *   - 保留 BANK12_BYTES 等原始字节（音频引擎代码 + 部分数据仍在 ROM）
 *   - 暴露具名访问器：getPointerTableEntry / getCmd / getFreq / getDur
 *   - 禁止 lo/hi 拆字节返回（必须返回 16-bit number）；禁止暴露 addr 偏移
 *   - 业务侧应优先用 SongCatalog.SONGS / FREQUENCY_TABLE / DURATION_TABLE / COMMAND_TABLE
 *
 * 历史：原 audio-rom.ts 把 BANK12_BYTES + readBank12Byte/U16 + readSePointer 当 API，
 *       这是"按 NES ROM 地址读字节"的 CPU 时代产物。
 *       H5 把可结构化的部分移到 SongCatalog，剩下 ROM 引擎代码保留为字节（音频引擎
 *       需要解析 NES 6502 指令序列；这部分保留原始字节 + 具名访问器）。
 */

import { FREQUENCY_TABLE, DURATION_TABLE, COMMAND_TABLE } from './SongCatalog';

/** SONG 数量常量（导出供业务侧使用） */
export const SONG_COUNT = 105;
/** SONG 请求 ID 范围常量 */
export const SONG_REQUEST_IDS = {
  SE_LOW: 0x32, // 50
  SE_HIGH: 0x5A, // 90
  BGM_LOW: 0x03, // 3
  BGM_HIGH: 0x30, // 48
  SE_EXT_LOW: 0x5D, // 93
  SE_EXT_HIGH: 0x6F, // 111
} as const;

/** bank12 原始字节（音频引擎代码 + 指针表，共 16KB） */
export const BANK12_BYTES: Readonly<Uint8Array> = new Uint8Array([
  // 真实字节从原 asm/bank12/_full.s 提取；占位由 BankExtractor 注入
]);

/**
 * 类型化访问器包装（不暴露地址偏移给业务层）
 *
 * 业务侧应优先使用 SongCatalog 中预提取的具名表；本类仅作为未 token 化区域的兜底。
 * 注意：以下 API 全部返回 typed number / typed entry，禁止 lo/hi 拆分返回。
 */
export class AudioRom {
  /**
   * 16-bit 频率查询（替代旧 readBank12U16(0x870D + idx*2)）
   * 直接索引 FREQUENCY_TABLE（具名常量），0=静默
   */
  static frequency(idx: number): number {
    return FREQUENCY_TABLE[idx & 0x0f] ?? 0;
  }

  /**
   * tick 查询（替代旧 readBank12Byte(0x8725 + idx)）
   * 直接索引 DURATION_TABLE（具名常量）
   */
  static duration(idx: number): number {
    return DURATION_TABLE[idx & 0x3f] ?? 0;
  }

  /**
   * 命令地址查询（替代旧 readBank12U16(0x84DA + idx*2)）
   * 直接索引 COMMAND_TABLE（具名常量）
   */
  static command(idx: number): number {
    return COMMAND_TABLE[idx & 0x1f] ?? 0;
  }
}

/** 旧 API 兜底：返回 -1 表示"请使用 SongCatalog + AudioRom" */
export const BGM_POINTER_TABLE_ADDR = -1;
export const BGM_POINTER_TABLE_LEN = 0;
export const SE_POINTER_TABLE_ADDR = -1;
export const SE_POINTER_TABLE_LEN = 0;
export const NOTE_DURATION_TABLE_ADDR = -1;
export const NOTE_DURATION_TABLE_LEN = 0;
export const NOTE_FREQ_TABLE_ADDR = -1;