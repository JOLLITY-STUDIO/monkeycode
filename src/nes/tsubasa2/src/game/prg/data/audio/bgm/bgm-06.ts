/**
 * BGM-06 — 曲目条目（requestId 0x06）
 *
 * 类型：背景乐（可循环）
 * 数据 bank：12（引擎固定区）
 * 数据起始：$8FAD
 * NSF 曲目 #44
 */
import type { SongTrack } from '../song-track';

export const BGM_06: SongTrack = {
  songNo: 44,
  requestId: 0x06,
  type: 'BGM',
  bank: 12,
  cpuAddr: 0x8FAD,
  name: '',
};
