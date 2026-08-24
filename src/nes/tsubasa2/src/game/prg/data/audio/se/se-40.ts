/**
 * SE-40 — 曲目条目（requestId 0x40）
 *
 * 类型：音效（一次性）
 * 数据 bank：13（SE 区）
 * 数据起始：$BDB3
 * NSF 曲目 #15
 */
import type { SongTrack } from '../song-track';

export const SE_40: SongTrack = {
  songNo: 15,
  requestId: 0x40,
  type: 'SE',
  bank: 13,
  cpuAddr: 0xBDB3,
  name: '',
};
