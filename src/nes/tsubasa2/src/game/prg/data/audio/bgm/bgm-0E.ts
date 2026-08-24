/**
 * BGM-0E — 曲目条目（requestId 0x0E）
 *
 * 类型：背景乐（可循环）
 * 数据 bank：12（引擎固定区）
 * 数据起始：$911D
 * NSF 曲目 #52
 */
import type { SongTrack } from '../song-track';

export const BGM_0E: SongTrack = {
  songNo: 52,
  requestId: 0x0E,
  type: 'BGM',
  bank: 12,
  cpuAddr: 0x911D,
  name: '',
};
