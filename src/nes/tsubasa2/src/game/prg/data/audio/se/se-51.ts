/**
 * SE-51 — 曲目条目（requestId 0x51）
 *
 * 类型：音效（一次性）
 * 数据 bank：15（SE 区）
 * 数据起始：$AAA8
 * NSF 曲目 #31
 */
import type { SongTrack } from '../song-track';

export const SE_51: SongTrack = {
  songNo: 31,
  requestId: 0x51,
  type: 'SE',
  bank: 15,
  cpuAddr: 0xAAA8,
  name: '',
};
