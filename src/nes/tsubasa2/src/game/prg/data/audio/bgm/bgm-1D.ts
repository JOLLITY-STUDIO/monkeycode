/**
 * BGM-1D — 曲目条目（requestId 0x1D）
 *
 * 类型：背景乐（可循环）
 * 数据 bank：12（引擎固定区）
 * 数据起始：$9ACD
 * NSF 曲目 #67
 */
import type { SongTrack } from '../song-track';

export const BGM_1D: SongTrack = {
  songNo: 67,
  requestId: 0x1D,
  type: 'BGM',
  bank: 12,
  cpuAddr: 0x9ACD,
  name: '',
};
