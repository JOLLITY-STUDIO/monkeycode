/**
 * BGM-05 — 曲目条目（requestId 0x05）
 *
 * 类型：背景乐（可循环）
 * 数据 bank：12（引擎固定区）
 * 数据起始：$8ECF
 * NSF 曲目 #43
 */
import type { SongTrack } from '../song-track';

export const BGM_05: SongTrack = {
  songNo: 43,
  requestId: 0x05,
  type: 'BGM',
  bank: 12,
  cpuAddr: 0x8ECF,
  name: '',
};
