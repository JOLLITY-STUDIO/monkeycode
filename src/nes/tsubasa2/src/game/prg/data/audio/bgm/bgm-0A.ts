/**
 * BGM-0A — 曲目条目（requestId 0x0A）
 *
 * 类型：背景乐（可循环）
 * 数据 bank：12（引擎固定区）
 * 数据起始：$96CC
 * NSF 曲目 #48
 */
import type { SongTrack } from '../song-track';

export const BGM_0A: SongTrack = {
  songNo: 48,
  requestId: 0x0A,
  type: 'BGM',
  bank: 12,
  cpuAddr: 0x96CC,
  name: '',
};
