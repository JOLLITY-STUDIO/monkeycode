/**
 * BGM-17 — 曲目条目（requestId 0x17）
 *
 * 类型：背景乐（可循环）
 * 数据 bank：12（引擎固定区）
 * 数据起始：$9359
 * NSF 曲目 #61
 */
import type { SongTrack } from '../song-track';

export const BGM_17: SongTrack = {
  songNo: 61,
  requestId: 0x17,
  type: 'BGM',
  bank: 12,
  cpuAddr: 0x9359,
  name: '',
};
