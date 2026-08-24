/**
 * SE-43 — 曲目条目（requestId 0x43）
 *
 * 类型：音效（一次性）
 * 数据 bank：13（SE 区）
 * 数据起始：$B8EA
 * NSF 曲目 #18
 */
import type { SongTrack } from '../song-track';

export const SE_43: SongTrack = {
  songNo: 18,
  requestId: 0x43,
  type: 'SE',
  bank: 13,
  cpuAddr: 0xB8EA,
  name: '',
};
