/**
 * BGM-26 — 曲目条目（requestId 0x26）
 *
 * 类型：背景乐（可循环）
 * 数据 bank：12（引擎固定区）
 * 数据起始：$9D58
 * NSF 曲目 #76
 */
import type { SongTrack } from '../song-track';

export const BGM_26: SongTrack = {
  songNo: 76,
  requestId: 0x26,
  type: 'BGM',
  bank: 12,
  cpuAddr: 0x9D58,
  name: '',
};
