/**
 * SE-59 — 曲目条目（requestId 0x59）
 *
 * 类型：音效（一次性）
 * 数据 bank：15（SE 区）
 * 数据起始：$AC59
 * NSF 曲目 #39
 */
import type { SongTrack } from '../song-track';

export const SE_59: SongTrack = {
  songNo: 39,
  requestId: 0x59,
  type: 'SE',
  bank: 15,
  cpuAddr: 0xAC59,
  name: '',
};
