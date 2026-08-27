/**
 * OpeningFrameTable — 片头逐帧 Ground Truth (聚合入口)
 * 来源:emu-full f10-f4200
 * 字段含义:
 *   f: NES 帧号
 *   c: CHR scanline 计划 [{s:scanline, b:[8 bank1k]}]
 *   p: palette {bg,sp} 或 null(与上帧相同)
 *   o: OAM diff [[idx,y,tile,attr,x],...]
 *   n: NT tile 变化行 [{ni,r,d[32]}]
 *   a: 属性表变化行 [{ni,r,d[8]}]
 *   s: 渲染用 scroll 寄存器 {v,h,vt,ht,fv,fh} + 渲染计数器 {cv,ch,cvt,cht}
 * 数据按画面拆分到 ./opening/ (画面边界 = NT+ATTR 全屏重绘帧), 此处拼接导出。
 */
import type { OpeningFrameChr } from './opening/OpeningFrameTypes';
import type { OpeningFrameNtRow } from './opening/OpeningFrameTypes';
import type { OpeningFrameScroll } from './opening/OpeningFrameTypes';
import type { OpeningFrameEntry } from './opening/OpeningFrameTypes';
import { OPENING_FRAMES_SCENE_1 } from './opening/opening-tecmo-start';
import { OPENING_FRAMES_SCENE_2 } from './opening/opening-title-1';
import { OPENING_FRAMES_SCENE_3 } from './opening/opening-title-2';
import { OPENING_FRAMES_SCENE_4 } from './opening/opening-subtitle-1';
import { OPENING_FRAMES_SCENE_5 } from './opening/opening-subtitle-2';
import { OPENING_FRAMES_SCENE_6 } from './opening/opening-subtitle-3';
import { OPENING_FRAMES_SCENE_7 } from './opening/opening-subtitle-4';
import { OPENING_FRAMES_SCENE_8 } from './opening/opening-subtitle-5';
import { OPENING_FRAMES_SCENE_9 } from './opening/opening-subtitle-6';
import { OPENING_FRAMES_SCENE_10 } from './opening/opening-subtitle-7';
import { OPENING_FRAMES_SCENE_11 } from './opening/opening-ending-scroll';
import { OPENING_FRAMES_SCENE_12 } from './opening/opening-ending-end';

export type { OpeningFrameChr, OpeningFrameNtRow, OpeningFrameScroll, OpeningFrameEntry } from './opening/OpeningFrameTypes';

export const OPENING_FRAMES: ReadonlyArray<OpeningFrameEntry> = [
  ...OPENING_FRAMES_SCENE_1,
  ...OPENING_FRAMES_SCENE_2,
  ...OPENING_FRAMES_SCENE_3,
  ...OPENING_FRAMES_SCENE_4,
  ...OPENING_FRAMES_SCENE_5,
  ...OPENING_FRAMES_SCENE_6,
  ...OPENING_FRAMES_SCENE_7,
  ...OPENING_FRAMES_SCENE_8,
  ...OPENING_FRAMES_SCENE_9,
  ...OPENING_FRAMES_SCENE_10,
  ...OPENING_FRAMES_SCENE_11,
  ...OPENING_FRAMES_SCENE_12,
];

export function getOpeningFrame(nesFrame: number): OpeningFrameEntry | undefined {
  const idx = nesFrame - 10;
  return idx >= 0 && idx < OPENING_FRAMES.length ? OPENING_FRAMES[idx] : undefined;
}

