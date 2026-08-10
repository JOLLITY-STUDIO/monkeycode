/**
 * BGM Data Index — 游戏 BGM + SE 数据集管理
 *
 * 每个 BGM/SE 从 Bank ROM 中独立提取，脱离原始 bank 依赖
 */

// BGM00 — Opening Animation BGM
export { BGM00_RAW, BGM00_META, fillBGM00Bank } from './BGM00';
export { BGM00_HEADER, BGM00_TRACK_SQ1, BGM00_TRACK_SQ2, BGM00_TRACK_TRI, BGM00_TRACK_NOISE } from './BGM00';

// SE — Sound Effects from Bank 12 ($8BDA)
export {
  SE_CH2_TRACK, SE_CH3_TRACK, SE_CH4_TRACK,
  SE_CH5_TRACK, SE_CH6_TRACK, SE_CH7_TRACK,
  SE_SUBSECTIONS, SE_CHANNEL_SIZES,
} from './SEData';

// BGM00 播放器 (Bank 12 音频引擎，支持 BGM + SE)
export { Tsubasa2AudioPlayer } from './Tsubasa2AudioPlayer';

/** All available BGM datasets */
export const BGM_LIST = [
  {
    id: 'BGM00',
    name: 'Opening Animation',
    desc: '开场动画背景音乐',
    size: 2117,
    source: 'Bank 15 ($17AD-$1FF1)',
    tracks: ['SQ1', 'SQ2', 'TRI', 'NOISE'],
  },
] as const;

/** All available SE datasets */
export const SE_LIST = [
  { id: 'SE_CH2', channel: 2, size: 22, desc: 'SE 通道 2' },
  { id: 'SE_CH3', channel: 3, size: 58, desc: 'SE 通道 3' },
  { id: 'SE_CH4', channel: 4, size: 58, desc: 'SE 通道 4' },
  { id: 'SE_CH5', channel: 5, size: 236, desc: 'SE SQ2 通道' },
  { id: 'SE_CH6', channel: 6, size: 143, desc: 'SE TRI 通道' },
  { id: 'SE_CH7', channel: 7, size: 3920, desc: 'SE NOISE 通道' },
] as const;
