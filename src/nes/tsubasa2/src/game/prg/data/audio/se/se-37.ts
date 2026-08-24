/**
 * SE-37 — 曲目条目（requestId 0x37）
 *
 * 类型：音效（一次性）
 * 数据 bank：13（SE 区）
 * 数据起始：$A761
 * NSF 曲目 #6
 */
import type { SongTrack } from '../song-track';

export const SE_37: SongTrack = {
  songNo: 6,
  requestId: 0x37,
  type: 'SE',
  bank: 13,
  cpuAddr: 0xA761,
  name: '',
};
