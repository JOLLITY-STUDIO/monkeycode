/**
 * BGM-14 — 曲目条目（requestId 0x14）
 *
 * 类型：背景乐（可循环）
 * 数据 bank：12（引擎固定区）
 * 数据起始：$94C6
 * NSF 曲目 #58
 */
import type { SongTrack } from '../song-track';

export const BGM_14: SongTrack = {
  songNo: 58,
  requestId: 0x14,
  type: 'BGM',
  bank: 12,
  cpuAddr: 0x94C6,
  name: '',
};
