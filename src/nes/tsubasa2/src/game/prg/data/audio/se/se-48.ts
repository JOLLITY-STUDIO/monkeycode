/**
 * SE-48 — 曲目条目（requestId 0x48）
 *
 * 类型：音效（一次性）
 * 数据 bank：14（SE 区）
 * 数据起始：$B07A
 * NSF 曲目 #23
 */
import type { SongTrack } from '../song-track';

export const SE_48: SongTrack = {
  songNo: 23,
  requestId: 0x48,
  type: 'SE',
  bank: 14,
  cpuAddr: 0xB07A,
  name: '',
};
