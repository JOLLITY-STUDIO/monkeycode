/**
 * SE-5F — 曲目条目（requestId 0x5F）
 *
 * 类型：音效（一次性）
 * 数据 bank：12（引擎固定区）
 * 数据起始：$9F46
 * NSF 曲目 #89
 */
import type { SongTrack } from '../song-track';

export const SE_5F: SongTrack = {
  songNo: 89,
  requestId: 0x5F,
  type: 'SE',
  bank: 12,
  cpuAddr: 0x9F46,
  name: '',
};
