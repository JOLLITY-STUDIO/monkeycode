/**
 * 音频数据统一出口
 *
 * BGM 数据 = mini-audio/bgm-data/bgm-sid (43 SID 轨道)
 * SE 数据  = mini-audio/se-data (SE0-SE15 通道)
 */

// APU 寄存器缓存 $4000-$401F
export { apuBuffer } from './audioCache';

// ── BGM / SID ──
export {
  BGM_SID_LIST, BGM_BY_BANK, BGM_BY_TYPE,
  ALL_BGM_LIST, BGM_TOTAL_COUNT,
} from './bgm/Index';
export type { BgmSidEntry } from './bgm/Index';

// ── SE 通道数据 (Bank 12 指针表 $8BDA) ──
export { SE_CHANNELS, SE_COUNT } from './se/index';
export type { SeChannelData } from './se/index';
