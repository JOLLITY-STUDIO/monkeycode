/**
 * SE-62 — 曲目条目（requestId 0x62）
 *
 * 类型：音效（一次性）
 * 数据 bank：12（引擎固定区）
 * 数据起始：$9944
 * NSF 曲目 #92
 */
import type { SongTrack } from '../song-track';

export const SE_62: SongTrack = {
  songNo: 92,
  requestId: 0x62,
  type: 'SE',
  bank: 12,
  cpuAddr: 0x9944,
  name: '',
};
