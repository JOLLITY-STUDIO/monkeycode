/**
 * BGM-0F — 曲目条目（requestId 0x0F）
 *
 * 类型：背景乐（可循环）
 * 数据 bank：12（引擎固定区）
 * 数据起始：$9079
 * NSF 曲目 #53
 */
import type { SongTrack } from '../song-track';

export const BGM_0F: SongTrack = {
  songNo: 53,
  requestId: 0x0F,
  type: 'BGM',
  bank: 12,
  cpuAddr: 0x9079,
  name: '',
};
