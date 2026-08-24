/**
 * SE-49 — 曲目条目（requestId 0x49）
 *
 * 类型：音效（一次性）
 * 数据 bank：14（SE 区）
 * 数据起始：$B2F3
 * NSF 曲目 #24
 */
import type { SongTrack } from '../song-track';

export const SE_49: SongTrack = {
  songNo: 24,
  requestId: 0x49,
  type: 'SE',
  bank: 14,
  cpuAddr: 0xB2F3,
  name: '',
};
