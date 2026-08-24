/**
 * SE-5D — 曲目条目（requestId 0x5D）
 *
 * 类型：音效（一次性）
 * 数据 bank：12（引擎固定区）
 * 数据起始：$9874
 * NSF 曲目 #87
 */
import type { SongTrack } from '../song-track';

export const SE_5D: SongTrack = {
  songNo: 87,
  requestId: 0x5D,
  type: 'SE',
  bank: 12,
  cpuAddr: 0x9874,
  name: '',
};
