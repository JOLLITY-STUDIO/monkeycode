/**
 * BGM-03 — 曲目条目（requestId 0x03）
 *
 * 类型：背景乐（可循环）
 * 数据 bank：12（引擎固定区）
 * 数据起始：$8E68
 * NSF 曲目 #41
 */
import type { SongTrack } from '../song-track';

export const BGM_03: SongTrack = {
  songNo: 41,
  requestId: 0x03,
  type: 'BGM',
  bank: 12,
  cpuAddr: 0x8E68,
  name: '',
};
