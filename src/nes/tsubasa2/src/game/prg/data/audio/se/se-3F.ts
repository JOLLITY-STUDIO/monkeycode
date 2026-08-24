/**
 * SE-3F — 曲目条目（requestId 0x3F）
 *
 * 类型：音效（一次性）
 * 数据 bank：13（SE 区）
 * 数据起始：$B729
 * NSF 曲目 #14
 */
import type { SongTrack } from '../song-track';

export const SE_3F: SongTrack = {
  songNo: 14,
  requestId: 0x3F,
  type: 'SE',
  bank: 13,
  cpuAddr: 0xB729,
  name: '',
};
