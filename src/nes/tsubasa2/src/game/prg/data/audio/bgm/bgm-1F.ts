/**
 * BGM-1F — 曲目条目（requestId 0x1F）
 *
 * 类型：背景乐（可循环）
 * 数据 bank：12（引擎固定区）
 * 数据起始：$9B9D
 * NSF 曲目 #69
 */
import type { SongTrack } from '../song-track';

export const BGM_1F: SongTrack = {
  songNo: 69,
  requestId: 0x1F,
  type: 'BGM',
  bank: 12,
  cpuAddr: 0x9B9D,
  name: '',
};
