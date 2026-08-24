/**
 * SE-4C — 曲目条目（requestId 0x4C）
 *
 * 类型：音效（一次性）
 * 数据 bank：14（SE 区）
 * 数据起始：$A399
 * NSF 曲目 #26
 */
import type { SongTrack } from '../song-track';

export const SE_4C: SongTrack = {
  songNo: 26,
  requestId: 0x4C,
  type: 'SE',
  bank: 14,
  cpuAddr: 0xA399,
  name: '',
};
