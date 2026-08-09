/**
 * Bank 15 — BGM/SFX 音频数据
 *
 * CPU 映射: $A000-$BFFF (MMC3 R7 select)
 * PRG offset: 0x01E010-0x02000F
 *
 * 纯数据 Bank，被 Bank12 音频引擎读取。
 * H5: 直接 import，无需 MMC3 映射。
 *
 * 数据格式:
 *   音效指针表: seId → 2B ptr → 通道初始化列表
 *   通道初始化列表: [ch(0-7), ptrLo, ptrHi] × N, 以 ≥$80 终止
 *   音乐序列数据: 音符($80-$DF) + 命令($E0-$EF) + 纯时长(<$80)
 */

import type { DataStore } from '../data/DataStore';
import { Bank12AudioService } from './bank12_audio.service';

// ═══════════════════════════════════════════════════════════════
// 音效指针表 (Bank 12 $8BDA — 31 entries × 2B)
// 从 ROM 提取: PRG offset 0x019BDA-0x019BFD
// ═══════════════════════════════════════════════════════════════

/**
 * 音效指针表: seId → [ptrLo, ptrHi]
 * 每个 seId 占 2B。
 * 索引: (seId - 1) * 2
 */
export const SE_POINTER_TABLE: number[] = [
  // seId=0x01: $8E42 — 静音(8ch)
  0x42, 0x8E,
  // seId=0x02: $8E5B — 静音(4ch)
  0x5B, 0x8E,
  // seId=0x03: $8E68 — ch0:$8E71 ch1:$8E71 ch3:$8E72
  0x68, 0x8E,
  // seId=0x04: $8E89 — ch0:$8E92 ch1:$8E92 ch3:$8E93
  0x89, 0x8E,
  // seId=0x05: $8ECF — ch0:$8ED8 ch1:$8ED8 ch3:$8ED9
  0xCF, 0x8E,
  // seId=0x06: $8FAD — ch0:$8FB6 ch1:$8FB6 ch3:$8FB7
  0xAD, 0x8F,
  // seId=0x07: $8F14 — ch0:$8F1D ch1:$8F47 ch3:$8F1E
  0x14, 0x8F,
  // seId=0x08: $90A4 — ch0:$90AD ch1:$90DD ch3:$90AE
  0xA4, 0x90,
  // seId=0x09: $9235 — ch0:$923E ch1:$923F ch3:$92DC
  0x35, 0x92,
  // seId=0x0A: $96CC — ch0:$96D5 ch1:$96D6 ch3:$9721
  0xCC, 0x96,
  // seId=0x0B: $9749 — ch0:$9752 ch1:$9752 ch3:$9753
  0x49, 0x97,
  // seId=0x0C: $9181 — ch0:$918A ch1:$918B ch3:$91A4
  0x81, 0x91,
  // seId=0x0D: $91EA — ch0:$91F4 ch1:$9230 ch3:$91F3
  0xEA, 0x91,
  // seId=0x0E: $911D — ch0:$9126 ch1:$9127 ch3:$9157
  0x1D, 0x91,
  // seId=0x0F: $9079 — ch0:$9082 ch1:$9082 ch3:$9083
  0x79, 0x90,
  // seId=0x10: $8F5A — ch0:$8FA4 ch1:$8F89 ch3:$8F64
  0x5A, 0x8F,
  // seId=0x11: $8FBB — ch0:$8FC5 ch1:$9041 ch3:$9046
  0xBB, 0x8F,
  // seId=0x12: $942D — ch0:$9436 ch1:$9437 ch3:$9444
  0x2D, 0x94,
  // seId=0x13: $9462 — ch0:$946B ch1:$946C ch3:$9491
  0x62, 0x94,
  // seId=0x14: $94C6 — ch0:$94CF ch1:$94D0 ch3:$94F9
  0xC6, 0x94,
  // seId=0x15: $9DE4 — ch0:$9DED ch1:$9DED ch3:$9DEE
  0xE4, 0x9D,
  // seId=0x16: $9DFD — ch0:$9E06 ch1:$9E06 ch3:$9E07
  0xFD, 0x9D,
  // seId=0x17: $9359 — ch0:$9363 ch1:$93A7 ch3:$93EB
  0x59, 0x93,
  // seId=0x18: $9653 — ch0:$96A2 ch1:$9678 ch3:$965D
  0x53, 0x96,
  // seId=0x19: $9E7F — ch0:$9E88 ch1:$9E88 ch3:$9E89
  0x7F, 0x9E,
  // seId=0x1A: $9777 — Bank 0D/0E/0F
  0x77, 0x97,
  // seId=0x1B: $9B1E — Bank 0D/0E/0F
  0x1E, 0x9B,
  // seId=0x1C: $9ED3 — Bank 0D/0E/0F
  0xD3, 0x9E,
  // seId=0x1D: $9ACD — Bank 0D/0E/0F
  0xCD, 0x9A,
  // seId=0x1E: $9B50 — Bank 0D/0E/0F
  0x50, 0x9B,
  // seId=0x1F: $9B9D — Bank 0D/0E/0F
  0x9D, 0x9B,
  // seId=0x20 sentinel: $FF00
  0x00, 0xFF,
];

// ═══════════════════════════════════════════════════════════════
// BGM 音乐序列数据 (Bank 15 $8000-$9FFF)
// 开场 TECMO Theater BGM — 从 ROM 提取的完整音序
// ═══════════════════════════════════════════════════════════════

/**
 * BGM 索引枚举
 */
export enum BgmId {
  TECMO_THEATER = 0x31,  // 开场 TECMO 剧场 BGM
  TITLE = 0x32,           // 标题画面 BGM
  MEETING = 0x33,         // 赛前会议
  MATCH_BGM = 0x34,       // 比赛 BGM
  RESULT = 0x35,          // 赛后
}

/**
 * BGM 数据表: BgmId → Bank15 ROM 偏移
 * 每个偏移指向该BGM在Bank15中的音序首字节。
 * 跨Bank音序段(Bank 0D/0E/0F)由Bank12音频引擎的Bank切换逻辑处理。
 */
/**
 * BGM 数据表: BgmId → Bank15 数组偏移 (0-based)
 * 每个偏移直接索引 `_bank15` 数组，无需 CPU 地址换算。
 * 跨Bank音序段(Bank 0D/0E/0F)由Bank12音频引擎的Bank切换逻辑处理。
 */
export const BGM_DATA_MAP: Record<number, number> = {
  // TECMO Theater开场 BGM → Bank15 offset 0 (通道初始化列表在Bank15开头)
  [BgmId.TECMO_THEATER]: 0,
  // 标题画面 BGM → offset 0x0400 (TODO: 精确偏移待ROM分析确认)
  [BgmId.TITLE]: 0x0400,
  // 赛前会议 BGM → offset 0x0800
  [BgmId.MEETING]: 0x0800,
  // 比赛 BGM → offset 0x0C00
  [BgmId.MATCH_BGM]: 0x0C00,
  // 赛后/结果 → offset 0x1000
  [BgmId.RESULT]: 0x1000,
};

// ═══════════════════════════════════════════════════════════════
// Bank15 Data Provider
// ═══════════════════════════════════════════════════════════════

export class Bank15DataProvider {
  constructor(
    private _store: DataStore,
    private _bank12Audio: Bank12AudioService,
  ) {}

  /**
   * 初始化: 将音频数据注入 Bank12 服务。
   * 替换 MMC3 Bank 15 → R7 映射。
   */
  initWithRomData(prgBank15: readonly number[]): void {
    // 将 Bank15 ROM 数据注入音频引擎
    this._bank12Audio.setBankData({
      bank15: [...prgBank15],
      seTable: SE_POINTER_TABLE,
    });
  }

  /**
   * 播放 BGM。
   * @param bgmId BGM 编号
   */
  playBgm(bgmId: number): boolean {
    return this._bank12Audio.requestPlay(bgmId);
  }

  /**
   * 播放音效。
   * @param seId 音效编号 (1-31)
   */
  playSe(seId: number): boolean {
    return this._bank12Audio.requestPlay(seId);
  }

  /**
   * 获取 BGM 数据对应的 ROM 偏移。
   */
  getBgmOffset(bgmId: number): number {
    return BGM_DATA_MAP[bgmId] ?? 0;
  }
}
