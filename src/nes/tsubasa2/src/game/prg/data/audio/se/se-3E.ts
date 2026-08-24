/**
 * SE-3E — 曲目条目（requestId 0x3E）
 *
 * 类型：音效（一次性）
 * 数据 bank：13（SE 区）
 * 数据起始：$BB9E
 * NSF 曲目 #13
 */
import type { SongTrack } from '../song-track';

export const SE_3E: SongTrack = {
  songNo: 13,
  requestId: 0x3E,
  type: 'SE',
  bank: 13,
  cpuAddr: 0xBB9E,
  name: '',
};
