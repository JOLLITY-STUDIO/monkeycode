/**
 * BGM-19 — 曲目条目（requestId 0x19）
 *
 * 类型：背景乐（可循环）
 * 数据 bank：12（引擎固定区）
 * 数据起始：$9E7F
 * NSF 曲目 #63
 */
import type { SongTrack } from '../song-track';

export const BGM_19: SongTrack = {
  songNo: 63,
  requestId: 0x19,
  type: 'BGM',
  bank: 12,
  cpuAddr: 0x9E7F,
  name: '',
};
