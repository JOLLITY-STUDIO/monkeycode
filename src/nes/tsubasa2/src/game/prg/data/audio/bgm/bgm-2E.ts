/**
 * BGM-2E — 曲目条目（requestId 0x2E）
 *
 * 类型：背景乐（可循环）
 * 数据 bank：12（引擎固定区）
 * 数据起始：$979D
 * NSF 曲目 #84
 */
import type { SongTrack } from '../song-track';

export const BGM_2E: SongTrack = {
  songNo: 84,
  requestId: 0x2E,
  type: 'BGM',
  bank: 12,
  cpuAddr: 0x979D,
  name: '',
};
