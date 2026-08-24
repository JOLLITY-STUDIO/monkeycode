/**
 * BGM-09 — 曲目条目（requestId 0x09）
 *
 * 类型：背景乐（可循环）
 * 数据 bank：12（引擎固定区）
 * 数据起始：$9235
 * NSF 曲目 #47
 */
import type { SongTrack } from '../song-track';

export const BGM_09: SongTrack = {
  songNo: 47,
  requestId: 0x09,
  type: 'BGM',
  bank: 12,
  cpuAddr: 0x9235,
  name: '',
};
