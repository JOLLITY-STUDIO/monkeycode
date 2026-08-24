/**
 * SE-66 — 曲目条目（requestId 0x66）
 *
 * 类型：音效（一次性）
 * 数据 bank：12（引擎固定区）
 * 数据起始：$99FC
 * NSF 曲目 #96
 */
import type { SongTrack } from '../song-track';

export const SE_66: SongTrack = {
  songNo: 96,
  requestId: 0x66,
  type: 'SE',
  bank: 12,
  cpuAddr: 0x99FC,
  name: '',
};
