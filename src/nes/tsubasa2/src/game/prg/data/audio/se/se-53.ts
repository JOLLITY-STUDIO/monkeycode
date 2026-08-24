/**
 * SE-53 — 曲目条目（requestId 0x53）
 *
 * 类型：音效（一次性）
 * 数据 bank：15（SE 区）
 * 数据起始：$A5E0
 * NSF 曲目 #33
 */
import type { SongTrack } from '../song-track';

export const SE_53: SongTrack = {
  songNo: 33,
  requestId: 0x53,
  type: 'SE',
  bank: 15,
  cpuAddr: 0xA5E0,
  name: '',
};
