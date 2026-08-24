/**
 * BGM-25 — 曲目条目（requestId 0x25）
 *
 * 类型：背景乐（可循环）
 * 数据 bank：12（引擎固定区）
 * 数据起始：$9CEE
 * NSF 曲目 #75
 */
import type { SongTrack } from '../song-track';

export const BGM_25: SongTrack = {
  songNo: 75,
  requestId: 0x25,
  type: 'BGM',
  bank: 12,
  cpuAddr: 0x9CEE,
  name: '',
};
