/**
 * SE-61 — 曲目条目（requestId 0x61）
 *
 * 类型：音效（一次性）
 * 数据 bank：12（引擎固定区）
 * 数据起始：$98BD
 * NSF 曲目 #91
 */
import type { SongTrack } from '../song-track';

export const SE_61: SongTrack = {
  songNo: 91,
  requestId: 0x61,
  type: 'SE',
  bank: 12,
  cpuAddr: 0x98BD,
  name: '',
};
