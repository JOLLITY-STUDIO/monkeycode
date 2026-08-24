/**
 * SE-67 — 曲目条目（requestId 0x67）
 *
 * 类型：音效（一次性）
 * 数据 bank：12（引擎固定区）
 * 数据起始：$9A1E
 * NSF 曲目 #97
 */
import type { SongTrack } from '../song-track';

export const SE_67: SongTrack = {
  songNo: 97,
  requestId: 0x67,
  type: 'SE',
  bank: 12,
  cpuAddr: 0x9A1E,
  name: '',
};
