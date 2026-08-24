/**
 * SE-3B — 曲目条目（requestId 0x3B）
 *
 * 类型：音效（一次性）
 * 数据 bank：13（SE 区）
 * 数据起始：$B32D
 * NSF 曲目 #10
 */
import type { SongTrack } from '../song-track';

export const SE_3B: SongTrack = {
  songNo: 10,
  requestId: 0x3B,
  type: 'SE',
  bank: 13,
  cpuAddr: 0xB32D,
  name: '',
};
