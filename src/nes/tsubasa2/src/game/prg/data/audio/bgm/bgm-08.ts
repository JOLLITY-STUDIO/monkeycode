/**
 * BGM-08 — 曲目条目（requestId 0x08）
 *
 * 类型：背景乐（可循环）
 * 数据 bank：12（引擎固定区）
 * 数据起始：$90A4
 * NSF 曲目 #46
 */
import type { SongTrack } from '../song-track';

export const BGM_08: SongTrack = {
  songNo: 46,
  requestId: 0x08,
  type: 'BGM',
  bank: 12,
  cpuAddr: 0x90A4,
  name: '',
};
