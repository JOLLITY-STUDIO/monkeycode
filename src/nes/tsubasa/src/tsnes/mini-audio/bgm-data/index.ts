/**
 * BGM Data Index — 游戏 BGM + SE 数据集管理
 *
 * 每个 BGM/SE 从 Bank ROM 中独立提取，脱离原始 bank 依赖
 */

// BGM SID — 全量 BGM/JINGLE/SFX 索引 (43 SID)
export { BGM_SID_LIST, BGM_BY_BANK, BGM_BY_TYPE, ALL_BGM_LIST, BGM_TOTAL_COUNT } from './bgm-sid/index';
export type { BgmSidEntry } from './bgm-sid/index';

// SE — Sound Effects from Bank 12 ($8BDA)
export {
  SE_CH2_TRACK, SE_CH3_TRACK, SE_CH4_TRACK,
  SE_CH5_TRACK, SE_CH6_TRACK, SE_CH7_TRACK,
  SE_SUBSECTIONS, SE_CHANNEL_SIZES,
} from './SEData';

// 播放器 (Bank 12 音频引擎，支持 BGM + SE)
export { Tsubasa2AudioPlayer } from './Tsubasa2AudioPlayer';

/** All available SE datasets */
export const SE_LIST = [
  { id: 'SE_CH2', channel: 2, size: 22, desc: 'SE 通道 2' },
  { id: 'SE_CH3', channel: 3, size: 58, desc: 'SE 通道 3' },
  { id: 'SE_CH4', channel: 4, size: 58, desc: 'SE 通道 4' },
  { id: 'SE_CH5', channel: 5, size: 236, desc: 'SE SQ2 通道' },
  { id: 'SE_CH6', channel: 6, size: 143, desc: 'SE TRI 通道' },
  { id: 'SE_CH7', channel: 7, size: 3920, desc: 'SE NOISE 通道' },
] as const;
