/**
 * SE-54 — 曲目条目（requestId 0x54）
 *
 * 类型：音效（一次性）
 * 数据 bank：15（SE 区）
 * 数据起始：$A848
 * NSF 曲目 #34
 */
import type { SongTrack } from '../song-track';

export const SE_54: SongTrack = {
  songNo: 34,
  requestId: 0x54,
  type: 'SE',
  bank: 15,
  cpuAddr: 0xA848,
  name: '',
};
