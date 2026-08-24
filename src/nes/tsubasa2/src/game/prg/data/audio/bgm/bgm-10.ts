/**
 * BGM-10 — 曲目条目（requestId 0x10）
 *
 * 类型：背景乐（可循环）
 * 数据 bank：12（引擎固定区）
 * 数据起始：$8F5A
 * NSF 曲目 #54
 */
import type { SongTrack } from '../song-track';

export const BGM_10: SongTrack = {
  songNo: 54,
  requestId: 0x10,
  type: 'BGM',
  bank: 12,
  cpuAddr: 0x8F5A,
  name: '',
};
