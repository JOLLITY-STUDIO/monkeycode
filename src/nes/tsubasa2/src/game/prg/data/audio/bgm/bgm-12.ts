/**
 * BGM-12 — 曲目条目（requestId 0x12）
 *
 * 类型：背景乐（可循环）
 * 数据 bank：12（引擎固定区）
 * 数据起始：$942D
 * NSF 曲目 #56
 */
import type { SongTrack } from '../song-track';

export const BGM_12: SongTrack = {
  songNo: 56,
  requestId: 0x12,
  type: 'BGM',
  bank: 12,
  cpuAddr: 0x942D,
  name: '',
};
