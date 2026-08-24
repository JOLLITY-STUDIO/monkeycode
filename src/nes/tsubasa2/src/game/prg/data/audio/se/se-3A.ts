/**
 * SE-3A — 曲目条目（requestId 0x3A）
 *
 * 类型：音效（一次性）
 * 数据 bank：13（SE 区）
 * 数据起始：$B1E0
 * NSF 曲目 #9
 */
import type { SongTrack } from '../song-track';

export const SE_3A: SongTrack = {
  songNo: 9,
  requestId: 0x3A,
  type: 'SE',
  bank: 13,
  cpuAddr: 0xB1E0,
  name: '',
};
