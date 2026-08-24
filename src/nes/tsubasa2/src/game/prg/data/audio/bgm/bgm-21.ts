/**
 * BGM-21 — 曲目条目（requestId 0x21）
 *
 * 类型：背景乐（可循环）
 * 数据 bank：7（BGM 区）
 * 数据起始：$BFB4
 * NSF 曲目 #71
 */
import type { SongTrack } from '../song-track';

export const BGM_21: SongTrack = {
  songNo: 71,
  requestId: 0x21,
  type: 'BGM',
  bank: 7,
  cpuAddr: 0xBFB4,
  name: '',
};
