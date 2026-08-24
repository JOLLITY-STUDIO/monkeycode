/**
 * SE-6B — 曲目条目（requestId 0x6B）
 *
 * 类型：音效（一次性）
 * 数据 bank：12（引擎固定区）
 * 数据起始：$9FCA
 * NSF 曲目 #101
 */
import type { SongTrack } from '../song-track';

export const SE_6B: SongTrack = {
  songNo: 101,
  requestId: 0x6B,
  type: 'SE',
  bank: 12,
  cpuAddr: 0x9FCA,
  name: '',
};
