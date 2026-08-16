/**
 * SE Data Index — 所有音效通道数据
 * 同步自 mini-audio/se-data，自动生成于 Bank 12 SE 指针表 ($8BDA)
 */

import { SE0_SUB_SECTIONS, SE0_SUB_DATA, SE0_TRACK } from './SE0';
import { SE1_SUB_SECTIONS, SE1_SUB_DATA, SE1_TRACK } from './SE1';
import { SE2_SUB_SECTIONS, SE2_SUB_DATA, SE2_TRACK } from './SE2';
import { SE3_SUB_SECTIONS, SE3_SUB_DATA, SE3_TRACK } from './SE3';
import { SE4_SUB_SECTIONS, SE4_SUB_DATA, SE4_TRACK } from './SE4';
import { SE5_SUB_SECTIONS, SE5_SUB_DATA, SE5_TRACK } from './SE5';
import { SE6_SUB_SECTIONS, SE6_SUB_DATA, SE6_TRACK } from './SE6';
import { SE7_SUB_SECTIONS, SE7_SUB_DATA, SE7_TRACK } from './SE7';
import { SE8_SUB_SECTIONS, SE8_SUB_DATA, SE8_TRACK } from './SE8';
import { SE9_SUB_SECTIONS, SE9_SUB_DATA, SE9_TRACK } from './SE9';
import { SE10_SUB_SECTIONS, SE10_SUB_DATA, SE10_TRACK } from './SE10';
import { SE11_SUB_SECTIONS, SE11_SUB_DATA, SE11_TRACK } from './SE11';
import { SE12_SUB_SECTIONS, SE12_SUB_DATA, SE12_TRACK } from './SE12';
import { SE13_SUB_SECTIONS, SE13_SUB_DATA, SE13_TRACK } from './SE13';
import { SE14_SUB_SECTIONS, SE14_SUB_DATA, SE14_TRACK } from './SE14';
import { SE15_SUB_SECTIONS, SE15_SUB_DATA, SE15_TRACK } from './SE15';

export interface SeChannelData {
  index: number;
  headerAddr: number;
  subSections: [number, number][];
  subData: Record<number, number[]>;
  track: readonly number[];
}

export const SE_CHANNELS: SeChannelData[] = [
  {
    index: 0,
    headerAddr: 36418,
    subSections: SE0_SUB_SECTIONS,
    subData: SE0_SUB_DATA,
    track: SE0_TRACK,
  },
  {
    index: 1,
    headerAddr: 36443,
    subSections: SE1_SUB_SECTIONS,
    subData: SE1_SUB_DATA,
    track: SE1_TRACK,
  },
  {
    index: 2,
    headerAddr: 36456,
    subSections: SE2_SUB_SECTIONS,
    subData: SE2_SUB_DATA,
    track: SE2_TRACK,
  },
  {
    index: 3,
    headerAddr: 36489,
    subSections: SE3_SUB_SECTIONS,
    subData: SE3_SUB_DATA,
    track: SE3_TRACK,
  },
  {
    index: 4,
    headerAddr: 36559,
    subSections: SE4_SUB_SECTIONS,
    subData: SE4_SUB_DATA,
    track: SE4_TRACK,
  },
  {
    index: 5,
    headerAddr: 36781,
    subSections: SE5_SUB_SECTIONS,
    subData: SE5_SUB_DATA,
    track: SE5_TRACK,
  },
  {
    index: 6,
    headerAddr: 36628,
    subSections: SE6_SUB_SECTIONS,
    subData: SE6_SUB_DATA,
    track: SE6_TRACK,
  },
  {
    index: 7,
    headerAddr: 37028,
    subSections: SE7_SUB_SECTIONS,
    subData: SE7_SUB_DATA,
    track: SE7_TRACK,
  },
  {
    index: 8,
    headerAddr: 37429,
    subSections: SE8_SUB_SECTIONS,
    subData: SE8_SUB_DATA,
    track: SE8_TRACK,
  },
  {
    index: 9,
    headerAddr: 38604,
    subSections: SE9_SUB_SECTIONS,
    subData: SE9_SUB_DATA,
    track: SE9_TRACK,
  },
  {
    index: 10,
    headerAddr: 38729,
    subSections: SE10_SUB_SECTIONS,
    subData: SE10_SUB_DATA,
    track: SE10_TRACK,
  },
  {
    index: 11,
    headerAddr: 37249,
    subSections: SE11_SUB_SECTIONS,
    subData: SE11_SUB_DATA,
    track: SE11_TRACK,
  },
  {
    index: 12,
    headerAddr: 37354,
    subSections: SE12_SUB_SECTIONS,
    subData: SE12_SUB_DATA,
    track: SE12_TRACK,
  },
  {
    index: 13,
    headerAddr: 37149,
    subSections: SE13_SUB_SECTIONS,
    subData: SE13_SUB_DATA,
    track: SE13_TRACK,
  },
  {
    index: 14,
    headerAddr: 36985,
    subSections: SE14_SUB_SECTIONS,
    subData: SE14_SUB_DATA,
    track: SE14_TRACK,
  },
  {
    index: 15,
    headerAddr: 36698,
    subSections: SE15_SUB_SECTIONS,
    subData: SE15_SUB_DATA,
    track: SE15_TRACK,
  },
];

/** SE 总数 */
export const SE_COUNT = 16;
