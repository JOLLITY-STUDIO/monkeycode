/**
 * BGM-2B — 曲目条目（requestId 0x2B）
 *
 * 类型：背景乐（可循环）
 * 数据 bank：12（引擎固定区）
 * 数据起始：$9453
 * NSF 曲目 #81
 */
import type { SongTrack } from '../song-track';

export const BGM_2B: SongTrack = {
  songNo: 81,
  requestId: 0x2B,
  type: 'BGM',
  bank: 12,
  cpuAddr: 0x9453,
  name: '',
};
