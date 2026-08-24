/**
 * SE-58 — 曲目条目（requestId 0x58）
 *
 * 类型：音效（一次性）
 * 数据 bank：15（SE 区）
 * 数据起始：$B7AD
 * NSF 曲目 #38
 */
import type { SongTrack } from '../song-track';

export const SE_58: SongTrack = {
  songNo: 38,
  requestId: 0x58,
  type: 'SE',
  bank: 15,
  cpuAddr: 0xB7AD,
  name: '',
};
