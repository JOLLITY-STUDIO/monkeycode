/**
 * BGM-20 — 曲目条目（requestId 0x20）
 *
 * 类型：背景乐（可循环）
 * 数据 bank：12（引擎固定区）
 * 数据起始：$9E98
 * NSF 曲目 #70
 */
import type { SongTrack } from '../song-track';

export const BGM_20: SongTrack = {
  songNo: 70,
  requestId: 0x20,
  type: 'BGM',
  bank: 12,
  cpuAddr: 0x9E98,
  name: '',
};
