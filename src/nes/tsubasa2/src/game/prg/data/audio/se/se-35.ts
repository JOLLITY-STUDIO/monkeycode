/**
 * SE-35 — 曲目条目（requestId 0x35）
 *
 * 类型：音效（一次性）
 * 数据 bank：13（SE 区）
 * 数据起始：$A5C6
 * NSF 曲目 #4
 */
import type { SongTrack } from '../song-track';

export const SE_35: SongTrack = {
  songNo: 4,
  requestId: 0x35,
  type: 'SE',
  bank: 13,
  cpuAddr: 0xA5C6,
  name: '',
};
