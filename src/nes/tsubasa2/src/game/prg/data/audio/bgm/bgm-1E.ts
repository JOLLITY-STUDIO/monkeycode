/**
 * BGM-1E — 曲目条目（requestId 0x1E）
 *
 * 类型：背景乐（可循环）
 * 数据 bank：12（引擎固定区）
 * 数据起始：$9B50
 * NSF 曲目 #68
 */
import type { SongTrack } from '../song-track';

export const BGM_1E: SongTrack = {
  songNo: 68,
  requestId: 0x1E,
  type: 'BGM',
  bank: 12,
  cpuAddr: 0x9B50,
  name: '',
};
