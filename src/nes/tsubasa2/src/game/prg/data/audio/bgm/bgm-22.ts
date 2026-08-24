/**
 * BGM-22 — 曲目条目（requestId 0x22）
 *
 * 类型：背景乐（可循环）
 * 数据 bank：12（引擎固定区）
 * 数据起始：$9EF7
 * NSF 曲目 #72
 */
import type { SongTrack } from '../song-track';

export const BGM_22: SongTrack = {
  songNo: 72,
  requestId: 0x22,
  type: 'BGM',
  bank: 12,
  cpuAddr: 0x9EF7,
  name: '',
};
