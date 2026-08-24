/**
 * BGM-1C — 曲目条目（requestId 0x1C）
 *
 * 类型：背景乐（可循环）
 * 数据 bank：12（引擎固定区）
 * 数据起始：$9ED3
 * NSF 曲目 #66
 */
import type { SongTrack } from '../song-track';

export const BGM_1C: SongTrack = {
  songNo: 66,
  requestId: 0x1C,
  type: 'BGM',
  bank: 12,
  cpuAddr: 0x9ED3,
  name: '',
};
