/**
 * SE-34 — 曲目条目（requestId 0x34）
 *
 * 类型：音效（一次性）
 * 数据 bank：13（SE 区）
 * 数据起始：$A40B
 * NSF 曲目 #3
 */
import type { SongTrack } from '../song-track';

export const SE_34: SongTrack = {
  songNo: 3,
  requestId: 0x34,
  type: 'SE',
  bank: 13,
  cpuAddr: 0xA40B,
  name: '',
};
