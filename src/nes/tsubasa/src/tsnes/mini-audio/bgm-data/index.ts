/**
 * BGM Data Index — 游戏 BGM 数据集管理
 * 
 * 每个 BGM 从 Bank ROM 中独立提取，脱离原始 bank 依赖
 */

// BGM00 — Opening Animation BGM
export { BGM00_RAW, BGM00_META, fillBGM00Bank } from './BGM00';
export { BGM00_HEADER, BGM00_TRACK_SQ1, BGM00_TRACK_SQ2, BGM00_TRACK_TRI, BGM00_TRACK_NOISE } from './BGM00';

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
