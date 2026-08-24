/**
 * BGM-0B — 曲目条目（requestId 0x0B）
 *
 * 类型：背景乐（可循环）
 * 数据 bank：12（引擎固定区）
 * 数据起始：$9749
 * NSF 曲目 #49
 */
import type { SongTrack } from '../song-track';

export const BGM_0B: SongTrack = {
  songNo: 49,
  requestId: 0x0B,
  type: 'BGM',
  bank: 12,
  cpuAddr: 0x9749,
  name: '',
};
