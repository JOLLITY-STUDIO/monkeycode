/**
 * _gen_opening_table.cjs — 把 opening-screens-enhanced.json 转成 H5 TS 数据表
 *
 * 每屏保留:
 *   - 时序: startFrame/endFrame/duration/fadeInFrames/stableFrames/fadeOutFrames
 *   - chr 配置
 *   - 稳定帧(mid)的完整数据: palette, oam, nt, state
 *   - fadeIn / fadeOut 每帧 palette(简化 fade 动画数据)
 */
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'output', 'opening');
const screens = JSON.parse(fs.readFileSync(path.join(OUT, 'opening-screens-enhanced.json'), 'utf8'));

const labels = [
  'tecmo_logo',      // 10-280
  'black_gap_1',     // 282-377
  'intro_comic_1',   // 378-818
  'intro_portrait_1',// 829-1039
  'intro_comic_2', // 1063-1489
  'intro_portrait_2',// 1500-1720
  'intro_comic_3', // 1744-2134
  'intro_comic_4', // 2145-2363
  'transition_1',   // 2365-2395
  'intro_comic_5', // 2396-2816
  'intro_comic_6', // 2827-3040
  'story_cup',      // 3046-3726
  'title_menu',     // 3727-4096
  'post_title',     // 4097-4332
];

function compactPal(p) { return { bg: p.bg, spr: p.spr || p.sp }; }
function compactState(s) { return { pc: s.pc, nTblAddress: s.nTblAddress, bgTable: s.bgTable, spTable: s.spTable }; }
function compactNt(nt) { return nt.map((n) => ({ tile: n.tile, attrib: n.attrib })); }
function compactOam(oam) { return oam.map((o) => [o.y, o.tile, o.attr, o.x]); }

const entries = screens.map((s, i) => {
  const fadeInPal = [];
  for (let f = s.start; f < s.firstBright; f++) {
    const p = s.keyFrames.start.pal; // 简化: 只存 start/mid/end, 不做逐帧扫描
    // 实际应逐帧读; 这里先用已有的关键帧
  }
  return {
    id: i,
    label: labels[i] || `screen_${i}`,
    startFrame: s.start,
    endFrame: s.end,
    duration: s.frames,
    fadeInFrames: s.fadeInFrames,
    stableFrames: s.stableFrames,
    fadeOutFrames: s.fadeOutFrames,
    chr: s.chr,
    // 稳定帧(mid)完整数据
    mid: {
      frame: s.midFrame,
      pal: compactPal(s.keyFrames.mid.pal),
      oam: compactOam(s.keyFrames.mid.oam),
      nt: compactNt(s.keyFrames.mid.nt),
      state: compactState(s.keyFrames.mid.state),
    },
    // 首末 palette
    startPal: compactPal(s.keyFrames.start.pal),
    endPal: compactPal(s.keyFrames.end.pal),
  };
});

const outputFile = path.join(__dirname, '..', 'src', 'game', 'prg', 'data', 'scene', 'OpeningScreenTable.ts');
const src = `/**
 * OpeningScreenTable — 片头动画每屏 Ground Truth 数据表
 *
 * 来源: scripts/_gen_opening_table.cjs (从 emu-full 4332 帧 dump 提取)
 * 用途: OpeningSequenceService 直接按此表播放 14 屏片头动画。
 *
 * 注意: 这是行为数据, 禁止导出裸地址接口。
 */
export interface OpeningScreenEntry {
  id: number;
  label: string;
  startFrame: number;
  endFrame: number;
  duration: number;
  fadeInFrames: number;
  stableFrames: number;
  fadeOutFrames: number;
  chr: number[];
  mid: OpeningFrameState;
  startPal: OpeningPalette;
  endPal: OpeningPalette;
}
export interface OpeningPalette {
  bg: number[];
  spr: number[];
}
export interface OpeningFrameState {
  frame: number;
  pal: OpeningPalette;
  oam: number[][];
  nt: { tile: number[]; attrib: number[] }[];
  state: { pc: number; nTblAddress: number; bgTable: number; spTable: number };
}

export const OPENING_SCREENS: ReadonlyArray<OpeningScreenEntry> = ${JSON.stringify(entries).replace(/"/g, "'")};

/** 按 ID 取屏 */
export function getOpeningScreen(id: number): OpeningScreenEntry | undefined {
  return OPENING_SCREENS.find((s) => s.id === id);
}
`;

fs.writeFileSync(outputFile, src);
console.log('written:', outputFile, (fs.statSync(outputFile).size / 1024).toFixed(1) + ' KB');
