/**
 * BGM-0C — 曲目条目（requestId 0x0C）
 *
 * 类型：背景乐（可循环）
 * 数据 bank：12（引擎固定区）
 * 数据起始：$9181
 * NSF 曲目 #50
 */
import type { SongTrack } from '../song-track';

export const BGM_0C: SongTrack = {
  songNo: 50,
  requestId: 0x0C,
  type: 'BGM',
  bank: 12,
  cpuAddr: 0x9181,
  name: '',
};
