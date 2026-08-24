/**
 * BGM-13 — 曲目条目（requestId 0x13）
 *
 * 类型：背景乐（可循环）
 * 数据 bank：12（引擎固定区）
 * 数据起始：$9462
 * NSF 曲目 #57
 */
import type { SongTrack } from '../song-track';

export const BGM_13: SongTrack = {
  songNo: 57,
  requestId: 0x13,
  type: 'BGM',
  bank: 12,
  cpuAddr: 0x9462,
  name: '',
};
