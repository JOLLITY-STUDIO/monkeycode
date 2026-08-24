/**
 * BGM-2D — 曲目条目（requestId 0x2D）
 *
 * 类型：背景乐（可循环）
 * 数据 bank：12（引擎固定区）
 * 数据起始：$9A9A
 * NSF 曲目 #83
 */
import type { SongTrack } from '../song-track';

export const BGM_2D: SongTrack = {
  songNo: 83,
  requestId: 0x2D,
  type: 'BGM',
  bank: 12,
  cpuAddr: 0x9A9A,
  name: '',
};
