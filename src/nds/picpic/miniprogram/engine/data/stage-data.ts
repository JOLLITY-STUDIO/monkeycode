// 关卡数据访问层：模式 → 已转换谜题列表（含调色板）
// map: 已转换（map_d 404 → 392 个有效）；lap/fap: 尚未转换（roms/extracted/lap_d/*, fap_d/*）
import { PUZZLES } from './puzzles/index';
import { PALETTES } from './palettes/index';
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
}

// 各模式数据源（未来 lap/fap 转换后接入）
const SOURCES: Record<ModeId, { list: PuzzleData[]; palette: Record<string, number[][]> }> = {
  map: { list: PUZZLES as unknown as PuzzleData[], palette: PALETTES as unknown as Record<string, number[][]> },
  lap: { list: [], palette: {} },
  fap: { list: [], palette: {} },
};

const cache: Partial<Record<ModeId, StageEntry[]>> = {};

function numOf(id: string): number {
  const m = id.match(/\d+/);
  return m ? parseInt(m[0], 10) : 0;
}

export function getStagesForMode(mode: ModeId): StageEntry[] {
  if (cache[mode]) return cache[mode]!;
  const src = SOURCES[mode];
  const list = [...src.list].sort((a, b) => numOf(a.id) - numOf(b.id));
  const out: StageEntry[] = [];
  for (const p of list) {
    out.push({
      stage: out.length + 1,
      id: p.id,
      name: p.name,
      w: p.w,
      h: p.h,
      grid: p.grid,
      // 调色板 key 为 P<id>（如 P4000101）
      palette: src.palette['P' + p.id] || [],
    });
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
