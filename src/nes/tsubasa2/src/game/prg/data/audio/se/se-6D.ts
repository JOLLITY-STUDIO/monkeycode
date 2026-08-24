/**
 * SE-6D — 曲目条目（requestId 0x6D）
 *
 * 类型：音效（一次性）
 * 数据 bank：12（引擎固定区）
 * 数据起始：$9D08
 * NSF 曲目 #103
 */
import type { SongTrack } from '../song-track';

export const SE_6D: SongTrack = {
  songNo: 103,
  requestId: 0x6D,
  type: 'SE',
  bank: 12,
  cpuAddr: 0x9D08,
  name: '',
};
