/**
 * SE-38 — 曲目条目（requestId 0x38）
 *
 * 类型：音效（一次性）
 * 数据 bank：13（SE 区）
 * 数据起始：$AC79
 * NSF 曲目 #7
 */
import type { SongTrack } from '../song-track';

export const SE_38: SongTrack = {
  songNo: 7,
  requestId: 0x38,
  type: 'SE',
  bank: 13,
  cpuAddr: 0xAC79,
  name: '',
};
