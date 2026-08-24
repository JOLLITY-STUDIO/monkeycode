/**
 * BGM-1A — 曲目条目（requestId 0x1A）
 *
 * 类型：背景乐（可循环）
 * 数据 bank：12（引擎固定区）
 * 数据起始：$9777
 * NSF 曲目 #64
 */
import type { SongTrack } from '../song-track';

export const BGM_1A: SongTrack = {
  songNo: 64,
  requestId: 0x1A,
  type: 'BGM',
  bank: 12,
  cpuAddr: 0x9777,
  name: '',
};
