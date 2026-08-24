/**
 * BGM-2C — 曲目条目（requestId 0x2C）
 *
 * 类型：背景乐（可循环）
 * 数据 bank：12（引擎固定区）
 * 数据起始：$9803
 * NSF 曲目 #82
 */
import type { SongTrack } from '../song-track';

export const BGM_2C: SongTrack = {
  songNo: 82,
  requestId: 0x2C,
  type: 'BGM',
  bank: 12,
  cpuAddr: 0x9803,
  name: '',
};
