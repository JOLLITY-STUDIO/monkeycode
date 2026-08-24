/**
 * SE-42 — 曲目条目（requestId 0x42）
 *
 * 类型：音效（一次性）
 * 数据 bank：13（SE 区）
 * 数据起始：$ABD5
 * NSF 曲目 #17
 */
import type { SongTrack } from '../song-track';

export const SE_42: SongTrack = {
  songNo: 17,
  requestId: 0x42,
  type: 'SE',
  bank: 13,
  cpuAddr: 0xABD5,
  name: '',
};
