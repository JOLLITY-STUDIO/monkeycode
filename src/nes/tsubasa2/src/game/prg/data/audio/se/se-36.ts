/**
 * SE-36 — 曲目条目（requestId 0x36）
 *
 * 类型：音效（一次性）
 * 数据 bank：13（SE 区）
 * 数据起始：$B68D
 * NSF 曲目 #5
 */
import type { SongTrack } from '../song-track';

export const SE_36: SongTrack = {
  songNo: 5,
  requestId: 0x36,
  type: 'SE',
  bank: 13,
  cpuAddr: 0xB68D,
  name: '',
};
