/**
 * SE-65 — 曲目条目（requestId 0x65）
 *
 * 类型：音效（一次性）
 * 数据 bank：12（引擎固定区）
 * 数据起始：$99B4
 * NSF 曲目 #95
 */
import type { SongTrack } from '../song-track';

export const SE_65: SongTrack = {
  songNo: 95,
  requestId: 0x65,
  type: 'SE',
  bank: 12,
  cpuAddr: 0x99B4,
  name: '',
};
