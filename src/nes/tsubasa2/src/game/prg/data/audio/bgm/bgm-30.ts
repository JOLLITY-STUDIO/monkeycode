/**
 * BGM-30 — 曲目条目（requestId 0x30）
 *
 * 类型：背景乐（可循环）
 * 数据 bank：12（引擎固定区）
 * 数据起始：$9C13
 * NSF 曲目 #86
 */
import type { SongTrack } from '../song-track';

export const BGM_30: SongTrack = {
  songNo: 86,
  requestId: 0x30,
  type: 'BGM',
  bank: 12,
  cpuAddr: 0x9C13,
  name: '',
};
