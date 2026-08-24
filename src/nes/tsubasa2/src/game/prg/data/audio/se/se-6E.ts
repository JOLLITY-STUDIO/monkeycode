/**
 * SE-6E — 曲目条目（requestId 0x6E）
 *
 * 类型：音效（一次性）
 * 数据 bank：12（引擎固定区）
 * 数据起始：$9E5D
 * NSF 曲目 #104
 */
import type { SongTrack } from '../song-track';

export const SE_6E: SongTrack = {
  songNo: 104,
  requestId: 0x6E,
  type: 'SE',
  bank: 12,
  cpuAddr: 0x9E5D,
  name: '',
};
