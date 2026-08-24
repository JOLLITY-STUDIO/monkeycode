/**
 * BGM-0D — 曲目条目（requestId 0x0D）
 *
 * 类型：背景乐（可循环）
 * 数据 bank：12（引擎固定区）
 * 数据起始：$91EA
 * NSF 曲目 #51
 */
import type { SongTrack } from '../song-track';

export const BGM_0D: SongTrack = {
  songNo: 51,
  requestId: 0x0D,
  type: 'BGM',
  bank: 12,
  cpuAddr: 0x91EA,
  name: '',
};
