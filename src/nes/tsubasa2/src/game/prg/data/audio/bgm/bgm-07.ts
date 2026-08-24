/**
 * BGM-07 — 曲目条目（requestId 0x07）
 *
 * 类型：背景乐（可循环）
 * 数据 bank：12（引擎固定区）
 * 数据起始：$8F14
 * NSF 曲目 #45
 */
import type { SongTrack } from '../song-track';

export const BGM_07: SongTrack = {
  songNo: 45,
  requestId: 0x07,
  type: 'BGM',
  bank: 12,
  cpuAddr: 0x8F14,
  name: '',
};
