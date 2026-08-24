/**
 * BGM-28 — 曲目条目（requestId 0x28）
 *
 * 类型：背景乐（可循环）
 * 数据 bank：12（引擎固定区）
 * 数据起始：$9A55
 * NSF 曲目 #78
 */
import type { SongTrack } from '../song-track';

export const BGM_28: SongTrack = {
  songNo: 78,
  requestId: 0x28,
  type: 'BGM',
  bank: 12,
  cpuAddr: 0x9A55,
  name: '',
};
