/**
 * BGM-24 — 曲目条目（requestId 0x24）
 *
 * 类型：背景乐（可循环）
 * 数据 bank：12（引擎固定区）
 * 数据起始：$9557
 * NSF 曲目 #74
 */
import type { SongTrack } from '../song-track';

export const BGM_24: SongTrack = {
  songNo: 74,
  requestId: 0x24,
  type: 'BGM',
  bank: 12,
  cpuAddr: 0x9557,
  name: '',
};
