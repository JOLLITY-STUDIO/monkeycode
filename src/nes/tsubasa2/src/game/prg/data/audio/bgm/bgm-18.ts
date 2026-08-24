/**
 * BGM-18 — 曲目条目（requestId 0x18）
 *
 * 类型：背景乐（可循环）
 * 数据 bank：12（引擎固定区）
 * 数据起始：$9653
 * NSF 曲目 #62
 */
import type { SongTrack } from '../song-track';

export const BGM_18: SongTrack = {
  songNo: 62,
  requestId: 0x18,
  type: 'BGM',
  bank: 12,
  cpuAddr: 0x9653,
  name: '',
};
