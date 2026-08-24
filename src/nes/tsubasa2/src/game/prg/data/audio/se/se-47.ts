/**
 * SE-47 — 曲目条目（requestId 0x47）
 *
 * 类型：音效（一次性）
 * 数据 bank：14（SE 区）
 * 数据起始：$AC2A
 * NSF 曲目 #22
 */
import type { SongTrack } from '../song-track';

export const SE_47: SongTrack = {
  songNo: 22,
  requestId: 0x47,
  type: 'SE',
  bank: 14,
  cpuAddr: 0xAC2A,
  name: '',
};
