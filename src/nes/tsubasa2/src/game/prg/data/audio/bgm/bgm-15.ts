/**
 * BGM-15 — 曲目条目（requestId 0x15）
 *
 * 类型：背景乐（可循环）
 * 数据 bank：12（引擎固定区）
 * 数据起始：$9DE4
 * NSF 曲目 #59
 */
import type { SongTrack } from '../song-track';

export const BGM_15: SongTrack = {
  songNo: 59,
  requestId: 0x15,
  type: 'BGM',
  bank: 12,
  cpuAddr: 0x9DE4,
  name: '',
};
