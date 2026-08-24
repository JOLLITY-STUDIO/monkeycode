/**
 * BGM-27 — 曲目条目（requestId 0x27）
 *
 * 类型：背景乐（可循环）
 * 数据 bank：12（引擎固定区）
 * 数据起始：$9D73
 * NSF 曲目 #77
 */
import type { SongTrack } from '../song-track';

export const BGM_27: SongTrack = {
  songNo: 77,
  requestId: 0x27,
  type: 'BGM',
  bank: 12,
  cpuAddr: 0x9D73,
  name: '',
};
