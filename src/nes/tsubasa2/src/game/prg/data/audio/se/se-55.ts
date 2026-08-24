/**
 * SE-55 — 曲目条目（requestId 0x55）
 *
 * 类型：音效（一次性）
 * 数据 bank：15（SE 区）
 * 数据起始：$A30F
 * NSF 曲目 #35
 */
import type { SongTrack } from '../song-track';

export const SE_55: SongTrack = {
  songNo: 35,
  requestId: 0x55,
  type: 'SE',
  bank: 15,
  cpuAddr: 0xA30F,
  name: '',
};
