/**
 * BGM-1B — 曲目条目（requestId 0x1B）
 *
 * 类型：背景乐（可循环）
 * 数据 bank：12（引擎固定区）
 * 数据起始：$9B1E
 * NSF 曲目 #65
 */
import type { SongTrack } from '../song-track';

export const BGM_1B: SongTrack = {
  songNo: 65,
  requestId: 0x1B,
  type: 'BGM',
  bank: 12,
  cpuAddr: 0x9B1E,
  name: '',
};
