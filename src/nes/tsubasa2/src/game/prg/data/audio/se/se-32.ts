/**
 * SE-32 — 曲目条目（requestId 0x32）
 *
 * 类型：音效（一次性）
 * 数据 bank：13（SE 区）
 * 数据起始：$A000
 * NSF 曲目 #1
 */
import type { SongTrack } from '../song-track';

export const SE_32: SongTrack = {
  songNo: 1,
  requestId: 0x32,
  type: 'SE',
  bank: 13,
  cpuAddr: 0xA000,
  name: '',
};
