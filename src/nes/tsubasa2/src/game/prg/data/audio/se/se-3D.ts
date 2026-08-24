/**
 * SE-3D — 曲目条目（requestId 0x3D）
 *
 * 类型：音效（一次性）
 * 数据 bank：13（SE 区）
 * 数据起始：$B92C
 * NSF 曲目 #12
 */
import type { SongTrack } from '../song-track';

export const SE_3D: SongTrack = {
  songNo: 12,
  requestId: 0x3D,
  type: 'SE',
  bank: 13,
  cpuAddr: 0xB92C,
  name: '',
};
