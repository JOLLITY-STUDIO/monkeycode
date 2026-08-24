/**
 * BGM-01 — 曲目条目（requestId 0x01）
 *
 * 类型：背景乐（可循环）
 * 数据 bank：12（引擎固定区）
 * 数据起始：$8E42
 * 游戏内部曲目，未收录 NSF 105 首列表
 */
import type { SongTrack } from '../song-track';

export const BGM_01: SongTrack = {
  songNo: 0,
  requestId: 0x01,
  type: 'BGM',
  bank: 12,
  cpuAddr: 0x8E42,
  name: '',
};
