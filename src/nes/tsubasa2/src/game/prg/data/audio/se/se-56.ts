/**
 * SE-56 — 曲目条目（requestId 0x56）
 *
 * 类型：音效（一次性）
 * 数据 bank：15（SE 区）
 * 数据起始：$A7D9
 * NSF 曲目 #36
 */
import type { SongTrack } from '../song-track';

export const SE_56: SongTrack = {
  songNo: 36,
  requestId: 0x56,
  type: 'SE',
  bank: 15,
  cpuAddr: 0xA7D9,
  name: '',
};
