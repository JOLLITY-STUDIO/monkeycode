/**
 * SE-44 — 曲目条目（requestId 0x44）
 *
 * 类型：音效（一次性）
 * 数据 bank：12（引擎固定区）
 * 数据起始：$8CC0
 * NSF 曲目 #19
 */
import type { SongTrack } from '../song-track';

export const SE_44: SongTrack = {
  songNo: 19,
  requestId: 0x44,
  type: 'SE',
  bank: 12,
  cpuAddr: 0x8CC0,
  name: '',
};
