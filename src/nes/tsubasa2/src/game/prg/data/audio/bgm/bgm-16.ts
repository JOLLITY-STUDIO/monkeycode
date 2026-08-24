/**
 * BGM-16 — 曲目条目（requestId 0x16）
 *
 * 类型：背景乐（可循环）
 * 数据 bank：12（引擎固定区）
 * 数据起始：$9DFD
 * NSF 曲目 #60
 */
import type { SongTrack } from '../song-track';

export const BGM_16: SongTrack = {
  songNo: 60,
  requestId: 0x16,
  type: 'BGM',
  bank: 12,
  cpuAddr: 0x9DFD,
  name: '',
};
