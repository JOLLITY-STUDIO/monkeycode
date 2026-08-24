/**
 * SE-46 — 曲目条目（requestId 0x46）
 *
 * 类型：音效（一次性）
 * 数据 bank：14（SE 区）
 * 数据起始：$AA85
 * NSF 曲目 #21
 */
import type { SongTrack } from '../song-track';

export const SE_46: SongTrack = {
  songNo: 21,
  requestId: 0x46,
  type: 'SE',
  bank: 14,
  cpuAddr: 0xAA85,
  name: '',
};
