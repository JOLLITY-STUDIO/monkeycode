/**
 * SE-57 — 曲目条目（requestId 0x57）
 *
 * 类型：音效（一次性）
 * 数据 bank：15（SE 区）
 * 数据起始：$A1F8
 * NSF 曲目 #37
 */
import type { SongTrack } from '../song-track';

export const SE_57: SongTrack = {
  songNo: 37,
  requestId: 0x57,
  type: 'SE',
  bank: 15,
  cpuAddr: 0xA1F8,
  name: '',
};
