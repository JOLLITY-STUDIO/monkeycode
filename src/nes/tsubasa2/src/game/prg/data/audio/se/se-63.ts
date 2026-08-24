/**
 * SE-63 — 曲目条目（requestId 0x63）
 *
 * 类型：音效（一次性）
 * 数据 bank：12（引擎固定区）
 * 数据起始：$998E
 * NSF 曲目 #93
 */
import type { SongTrack } from '../song-track';

export const SE_63: SongTrack = {
  songNo: 93,
  requestId: 0x63,
  type: 'SE',
  bank: 12,
  cpuAddr: 0x998E,
  name: '',
};
