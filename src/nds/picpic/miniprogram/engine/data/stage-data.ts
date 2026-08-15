// 关卡数据访问层：模式 → 已转换谜题列表（含调色板）
// map: 已转换（map_d 404 → 392 个有效）
// lap: 已转换（lap_d 400 常规 + 7 教学 = 407，见 roms/extracted/lap_d/{1_dat..5_dat,tutorial}）
// fap: 已转换（fap_d 400 常规 + 5 教学 = 405，见 roms/extracted/fap_d/*）
import { PUZZLES } from './puzzles/index';
import { LAP_PUZZLES } from './puzzles/lap_index';
import { FAP_PUZZLES } from './puzzles/fap_index';
import { PALETTES } from './palettes/index';
import { COMPLETIONS } from './completions/index';
import { PuzzleData } from '../core/engine';
import { ModeId } from '../core/rom-states';

export interface StageEntry {
  stage: number;       // 关号（1-based）
  id: string;          // 原始 ID（如 4000101）
  name: string;
  w: number;
  h: number;
  grid: Uint8Array;
  palette: number[][]; // 16 色
  completion?: { w: number; h: number; palette: number[]; pixels: Uint8Array };
}

// lap/fap 真实调色板尚未从 ROM 转换，统一使用 16 色默认调色板
// （grid 值 0..15 直接作为 palette 索引；fap 的 15=填充色）
const DEFAULT_PALETTE: number[][] = [
  [0, 0, 0],        // 0: 空
  [255, 0, 0],      // 1: 红
  [0, 180, 0],      // 2: 绿
  [0, 90, 255],     // 3: 蓝
  [255, 205, 0],    // 4: 黄
  [255, 120, 0],    // 5: 橙
  [255, 0, 255],    // 6: 品红
  [140, 60, 200],   // 7: 紫
  [255, 255, 255],  // 8: 白
  [90, 90, 90],     // 9: 灰
  [180, 180, 180],  // 10
  [60, 60, 60],     // 11
  [246, 197, 131],  // 12
  [164, 222, 246],  // 13
  [238, 255, 41],   // 14
  [255, 238, 57],   // 15: fap 填充/亮色
];

function buildDefaultPaletteMap(list: PuzzleData[]): Record<string, number[][]> {
  const out: Record<string, number[][]> = {};
  for (const p of list) out['P' + p.id] = DEFAULT_PALETTE;
  return out;
}

// 各模式数据源（lap/fap 已由 tools/convert_lap_fap.py 转换接入）
const SOURCES: Record<ModeId, { list: PuzzleData[]; palette: Record<string, number[][]> }> = {
  map: { list: PUZZLES as unknown as PuzzleData[], palette: PALETTES as unknown as Record<string, number[][]> },
  lap: { list: LAP_PUZZLES as unknown as PuzzleData[], palette: buildDefaultPaletteMap(LAP_PUZZLES as unknown as PuzzleData[]) },
  fap: { list: FAP_PUZZLES as unknown as PuzzleData[], palette: buildDefaultPaletteMap(FAP_PUZZLES as unknown as PuzzleData[]) },
};

const cache: Partial<Record<ModeId, StageEntry[]>> = {};

function numOf(id: string): number {
  const m = id.match(/\d+/);
  return m ? parseInt(m[0], 10) : Infinity; // 无数字ID（特殊关卡）排在最后
}

export function getStagesForMode(mode: ModeId): StageEntry[] {
  if (cache[mode]) return cache[mode]!;
  const src = SOURCES[mode];
  const list = [...src.list].sort((a, b) => numOf(a.id) - numOf(b.id));
  const out: StageEntry[] = [];
  for (const p of list) {
    const stage = out.length + 1;
    const entry: StageEntry = {
      stage,
      id: p.id,
      name: p.name,
      w: p.w,
      h: p.h,
      grid: p.grid,
      // 调色板 key 为 P<id>（如 P4000101）
      palette: src.palette['P' + p.id] || [],
    };
    // MAP 模式：前 400 关有完成图（completions 编号 001-400）
    if (mode === 'map' && stage <= 400) {
      const cid = String(stage).padStart(3, '0');
      entry.completion = COMPLETIONS[cid];
    }
    out.push(entry);
  }
  cache[mode] = out;
  return out;
}

// 可用关卡数（已转换数据）
export function getAvailableStageCount(mode: ModeId): number {
  return getStagesForMode(mode).length;
}

// 关卡详情（null = 数据未转换/超出范围）
export function getStageDetail(mode: ModeId, stage: number): StageEntry | null {
  const list = getStagesForMode(mode);
  return list.find(e => e.stage === stage) || null;
}
