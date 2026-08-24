/**
 * SE-41 — 曲目条目（requestId 0x41）
 *
 * 类型：音效（一次性）
 * 数据 bank：13（SE 区）
 * 数据起始：$AB2A
 * NSF 曲目 #16
 */
import type { SongTrack } from '../song-track';

export const SE_41: SongTrack = {
  songNo: 16,
  requestId: 0x41,
  type: 'SE',
  bank: 13,
  cpuAddr: 0xAB2A,
  name: '',
};
