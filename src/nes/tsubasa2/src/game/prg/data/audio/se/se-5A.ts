/**
 * SE-5A — 曲目条目（requestId 0x5A）
 *
 * 类型：音效（一次性）
 * 数据 bank：15（SE 区）
 * 数据起始：$A000
 * NSF 曲目 #40
 */
import type { SongTrack } from '../song-track';

export const SE_5A: SongTrack = {
  songNo: 40,
  requestId: 0x5A,
  type: 'SE',
  bank: 15,
  cpuAddr: 0xA000,
  name: '',
};
