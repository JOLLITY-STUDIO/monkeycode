/**
 * SE-6C — 曲目条目（requestId 0x6C）
 *
 * 类型：音效（一次性）
 * 数据 bank：12（引擎固定区）
 * 数据起始：$9BF3
 * NSF 曲目 #102
 */
import type { SongTrack } from '../song-track';

export const SE_6C: SongTrack = {
  songNo: 102,
  requestId: 0x6C,
  type: 'SE',
  bank: 12,
  cpuAddr: 0x9BF3,
  name: '',
};
