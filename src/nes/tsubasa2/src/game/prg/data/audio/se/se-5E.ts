/**
 * SE-5E — 曲目条目（requestId 0x5E）
 *
 * 类型：音效（一次性）
 * 数据 bank：12（引擎固定区）
 * 数据起始：$90F6
 * NSF 曲目 #88
 */
import type { SongTrack } from '../song-track';

export const SE_5E: SongTrack = {
  songNo: 88,
  requestId: 0x5E,
  type: 'SE',
  bank: 12,
  cpuAddr: 0x90F6,
  name: '',
};
