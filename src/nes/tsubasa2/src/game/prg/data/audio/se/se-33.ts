/**
 * SE-33 — 曲目条目（requestId 0x33）
 *
 * 类型：音效（一次性）
 * 数据 bank：13（SE 区）
 * 数据起始：$A2AA
 * NSF 曲目 #2
 */
import type { SongTrack } from '../song-track';

export const SE_33: SongTrack = {
  songNo: 2,
  requestId: 0x33,
  type: 'SE',
  bank: 13,
  cpuAddr: 0xA2AA,
  name: '',
};
