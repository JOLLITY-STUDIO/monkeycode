/**
 * BGM-2A — 曲目条目（requestId 0x2A）
 *
 * 类型：背景乐（可循环）
 * 数据 bank：12（引擎固定区）
 * 数据起始：$9A77
 * NSF 曲目 #80
 */
import type { SongTrack } from '../song-track';

export const BGM_2A: SongTrack = {
  songNo: 80,
  requestId: 0x2A,
  type: 'BGM',
  bank: 12,
  cpuAddr: 0x9A77,
  name: '',
};
