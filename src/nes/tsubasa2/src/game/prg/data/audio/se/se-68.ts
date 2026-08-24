/**
 * SE-68 — 曲目条目（requestId 0x68）
 *
 * 类型：音效（一次性）
 * 数据 bank：12（引擎固定区）
 * 数据起始：$99E7
 * NSF 曲目 #98
 */
import type { SongTrack } from '../song-track';

export const SE_68: SongTrack = {
  songNo: 98,
  requestId: 0x68,
  type: 'SE',
  bank: 12,
  cpuAddr: 0x99E7,
  name: '',
};
