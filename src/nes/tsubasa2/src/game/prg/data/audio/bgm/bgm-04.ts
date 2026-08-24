/**
 * BGM-04 — 曲目条目（requestId 0x04）
 *
 * 类型：背景乐（可循环）
 * 数据 bank：12（引擎固定区）
 * 数据起始：$8E89
 * NSF 曲目 #42
 */
import type { SongTrack } from '../song-track';

export const BGM_04: SongTrack = {
  songNo: 42,
  requestId: 0x04,
  type: 'BGM',
  bank: 12,
  cpuAddr: 0x8E89,
  name: '',
};
