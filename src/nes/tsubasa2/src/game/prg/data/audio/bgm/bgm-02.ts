/**
 * BGM-02 — 曲目条目（requestId 0x02）
 *
 * 类型：背景乐（可循环）
 * 数据 bank：12（引擎固定区）
 * 数据起始：$8E5B
 * 游戏内部曲目，未收录 NSF 105 首列表
 */
import type { SongTrack } from '../song-track';

export const BGM_02: SongTrack = {
  songNo: 0,
  requestId: 0x02,
  type: 'BGM',
  bank: 12,
  cpuAddr: 0x8E5B,
  name: '',
};
