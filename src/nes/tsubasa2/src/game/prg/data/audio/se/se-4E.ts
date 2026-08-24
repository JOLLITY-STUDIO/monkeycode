/**
 * SE-4E — 曲目条目（requestId 0x4E）
 *
 * 类型：音效（一次性）
 * 数据 bank：14（SE 区）
 * 数据起始：$B81F
 * NSF 曲目 #28
 */
import type { SongTrack } from '../song-track';

export const SE_4E: SongTrack = {
  songNo: 28,
  requestId: 0x4E,
  type: 'SE',
  bank: 14,
  cpuAddr: 0xB81F,
  name: '',
};
