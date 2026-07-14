/**
 * StageConfig.ts — Langrisser II 关卡配置加载系统 (纯 TS 硬编码数据版)
 *
 * ROM 数据已预提取为 TS 常量 (见 game/data/Stage{N}Data.ts)
 * 运行时零 ROM 依赖
 */
import { CLASS_STATS, L2_CLASSES } from '../data/classes';
import { PLAYABLE_CHARACTERS } from '../data/character';

// ============================================================================
// Import all stage data
// ============================================================================
import { MAP_WIDTH as S1_W, MAP_HEIGHT as S1_H, MAP_TILES as S1_TILES, TILE_MOVE_COST as S1_MC, TILE_DEF_BONUS as S1_DB, UNITS as S1_U } from '../data/Stage1Data';
import { MAP_WIDTH as S2_W, MAP_HEIGHT as S2_H, MAP_TILES as S2_TILES, TILE_MOVE_COST as S2_MC, TILE_DEF_BONUS as S2_DB, UNITS as S2_U } from '../data/Stage2Data';
import { MAP_WIDTH as S3_W, MAP_HEIGHT as S3_H, MAP_TILES as S3_TILES, TILE_MOVE_COST as S3_MC, TILE_DEF_BONUS as S3_DB, UNITS as S3_U } from '../data/Stage3Data';
import { MAP_WIDTH as S4_W, MAP_HEIGHT as S4_H, MAP_TILES as S4_TILES, TILE_MOVE_COST as S4_MC, TILE_DEF_BONUS as S4_DB, UNITS as S4_U } from '../data/Stage4Data';
import { MAP_WIDTH as S5_W, MAP_HEIGHT as S5_H, MAP_TILES as S5_TILES, TILE_MOVE_COST as S5_MC, TILE_DEF_BONUS as S5_DB, UNITS as S5_U } from '../data/Stage5Data';
import { MAP_WIDTH as S6_W, MAP_HEIGHT as S6_H, MAP_TILES as S6_TILES, TILE_MOVE_COST as S6_MC, TILE_DEF_BONUS as S6_DB, UNITS as S6_U } from '../data/Stage6Data';
import { MAP_WIDTH as S7_W, MAP_HEIGHT as S7_H, MAP_TILES as S7_TILES, TILE_MOVE_COST as S7_MC, TILE_DEF_BONUS as S7_DB, UNITS as S7_U } from '../data/Stage7Data';
import { MAP_WIDTH as S8_W, MAP_HEIGHT as S8_H, MAP_TILES as S8_TILES, TILE_MOVE_COST as S8_MC, TILE_DEF_BONUS as S8_DB, UNITS as S8_U } from '../data/Stage8Data';
import { MAP_WIDTH as S9_W, MAP_HEIGHT as S9_H, MAP_TILES as S9_TILES, TILE_MOVE_COST as S9_MC, TILE_DEF_BONUS as S9_DB, UNITS as S9_U } from '../data/Stage9Data';
import { MAP_WIDTH as S10_W, MAP_HEIGHT as S10_H, MAP_TILES as S10_TILES, TILE_MOVE_COST as S10_MC, TILE_DEF_BONUS as S10_DB, UNITS as S10_U } from '../data/Stage10Data';
import { MAP_WIDTH as S11_W, MAP_HEIGHT as S11_H, MAP_TILES as S11_TILES, TILE_MOVE_COST as S11_MC, TILE_DEF_BONUS as S11_DB, UNITS as S11_U } from '../data/Stage11Data';
import { MAP_WIDTH as S12_W, MAP_HEIGHT as S12_H, MAP_TILES as S12_TILES, TILE_MOVE_COST as S12_MC, TILE_DEF_BONUS as S12_DB, UNITS as S12_U } from '../data/Stage12Data';
import { MAP_WIDTH as S13_W, MAP_HEIGHT as S13_H, MAP_TILES as S13_TILES, TILE_MOVE_COST as S13_MC, TILE_DEF_BONUS as S13_DB, UNITS as S13_U } from '../data/Stage13Data';
import { MAP_WIDTH as S14_W, MAP_HEIGHT as S14_H, MAP_TILES as S14_TILES, TILE_MOVE_COST as S14_MC, TILE_DEF_BONUS as S14_DB, UNITS as S14_U } from '../data/Stage14Data';
import { MAP_WIDTH as S15_W, MAP_HEIGHT as S15_H, MAP_TILES as S15_TILES, TILE_MOVE_COST as S15_MC, TILE_DEF_BONUS as S15_DB, UNITS as S15_U } from '../data/Stage15Data';
import { MAP_WIDTH as S16_W, MAP_HEIGHT as S16_H, MAP_TILES as S16_TILES, TILE_MOVE_COST as S16_MC, TILE_DEF_BONUS as S16_DB, UNITS as S16_U } from '../data/Stage16Data';
import { MAP_WIDTH as S17_W, MAP_HEIGHT as S17_H, MAP_TILES as S17_TILES, TILE_MOVE_COST as S17_MC, TILE_DEF_BONUS as S17_DB, UNITS as S17_U } from '../data/Stage17Data';
import { MAP_WIDTH as S18_W, MAP_HEIGHT as S18_H, MAP_TILES as S18_TILES, TILE_MOVE_COST as S18_MC, TILE_DEF_BONUS as S18_DB, UNITS as S18_U } from '../data/Stage18Data';
import { MAP_WIDTH as S19_W, MAP_HEIGHT as S19_H, MAP_TILES as S19_TILES, TILE_MOVE_COST as S19_MC, TILE_DEF_BONUS as S19_DB, UNITS as S19_U } from '../data/Stage19Data';
import { MAP_WIDTH as S20_W, MAP_HEIGHT as S20_H, MAP_TILES as S20_TILES, TILE_MOVE_COST as S20_MC, TILE_DEF_BONUS as S20_DB, UNITS as S20_U } from '../data/Stage20Data';
import { MAP_WIDTH as S21_W, MAP_HEIGHT as S21_H, MAP_TILES as S21_TILES, TILE_MOVE_COST as S21_MC, TILE_DEF_BONUS as S21_DB, UNITS as S21_U } from '../data/Stage21Data';
import { MAP_WIDTH as S22_W, MAP_HEIGHT as S22_H, MAP_TILES as S22_TILES, TILE_MOVE_COST as S22_MC, TILE_DEF_BONUS as S22_DB, UNITS as S22_U } from '../data/Stage22Data';
import { MAP_WIDTH as S23_W, MAP_HEIGHT as S23_H, MAP_TILES as S23_TILES, TILE_MOVE_COST as S23_MC, TILE_DEF_BONUS as S23_DB, UNITS as S23_U } from '../data/Stage23Data';
import { MAP_WIDTH as S24_W, MAP_HEIGHT as S24_H, MAP_TILES as S24_TILES, TILE_MOVE_COST as S24_MC, TILE_DEF_BONUS as S24_DB, UNITS as S24_U } from '../data/Stage24Data';
import { MAP_WIDTH as S25_W, MAP_HEIGHT as S25_H, MAP_TILES as S25_TILES, TILE_MOVE_COST as S25_MC, TILE_DEF_BONUS as S25_DB, UNITS as S25_U } from '../data/Stage25Data';
import { MAP_WIDTH as S26_W, MAP_HEIGHT as S26_H, MAP_TILES as S26_TILES, TILE_MOVE_COST as S26_MC, TILE_DEF_BONUS as S26_DB, UNITS as S26_U } from '../data/Stage26Data';
import { MAP_WIDTH as S27_W, MAP_HEIGHT as S27_H, MAP_TILES as S27_TILES, TILE_MOVE_COST as S27_MC, TILE_DEF_BONUS as S27_DB, UNITS as S27_U } from '../data/Stage27Data';
import { MAP_WIDTH as S28_W, MAP_HEIGHT as S28_H, MAP_TILES as S28_TILES, TILE_MOVE_COST as S28_MC, TILE_DEF_BONUS as S28_DB, UNITS as S28_U } from '../data/Stage28Data';
import { MAP_WIDTH as S29_W, MAP_HEIGHT as S29_H, MAP_TILES as S29_TILES, TILE_MOVE_COST as S29_MC, TILE_DEF_BONUS as S29_DB, UNITS as S29_U } from '../data/Stage29Data';
import { MAP_WIDTH as S30_W, MAP_HEIGHT as S30_H, MAP_TILES as S30_TILES, TILE_MOVE_COST as S30_MC, TILE_DEF_BONUS as S30_DB, UNITS as S30_U } from '../data/Stage30Data';
import { MAP_WIDTH as S31_W, MAP_HEIGHT as S31_H, MAP_TILES as S31_TILES, TILE_MOVE_COST as S31_MC, TILE_DEF_BONUS as S31_DB, UNITS as S31_U } from '../data/Stage31Data';

// ============================================================================
// Stage data structures
// ============================================================================

export interface StageUnit {
  index: number;
  classId: number;
  commanderId: number;
  x: number;
  y: number;
  faction: 'player' | 'npc' | 'enemy' | 'special';
  name: string;
  className: string;
  at: number;
  df: number;
  mp: number;
  mv: number;
  range: number;
}

export interface StageData {
  scenarioId: number;
  mapWidth: number;
  mapHeight: number;
  units: StageUnit[];
  playerUnits: StageUnit[];
  enemyUnits: StageUnit[];
  npcUnits: StageUnit[];
  tiles: number[];
  moveCost: number[];
  defBonus: number[];
}

// ============================================================================
// Helpers
// ============================================================================

function getClassStats(classId: number): { at: number; df: number; mp: number; mv: number; r: number } | null {
  return CLASS_STATS[classId] || null;
}

function getClassName(classId: number): string {
  const entry = L2_CLASSES.find(c => c.id === classId);
  return entry?.name || `Class#${classId}`;
}

function getCharacterName(commanderId: number): string {
  const char = PLAYABLE_CHARACTERS.find(c => c.id === commanderId);
  return char?.cn || `#${commanderId}`;
}

function factionFromNum(f: number): StageUnit['faction'] {
  switch (f) {
    case 0: return 'player';
    case 1: return 'npc';
    default: return 'enemy';
  }
}

// ============================================================================
// Stage registry
// ============================================================================

interface RawUnitsArray {
  length: number;
  [idx: number]: {
    classId: number; commanderId: number; x: number; y: number;
    faction: number;
    attr0: number; attr1: number; attr2: number; attr3: number;
    attr4: number; attr5: number; extraFlags: number;
  };
}

const SCENARIO_TABLES: Record<number, {
  width: number; height: number;
  tiles: number[];
  moveCost: number[]; defBonus: number[];
  units: RawUnitsArray;
}> = {
  1:  { width: S1_W,  height: S1_H,  tiles: S1_TILES,  moveCost: S1_MC,  defBonus: S1_DB,  units: S1_U  },
  2:  { width: S2_W,  height: S2_H,  tiles: S2_TILES,  moveCost: S2_MC,  defBonus: S2_DB,  units: S2_U  },
  3:  { width: S3_W,  height: S3_H,  tiles: S3_TILES,  moveCost: S3_MC,  defBonus: S3_DB,  units: S3_U  },
  4:  { width: S4_W,  height: S4_H,  tiles: S4_TILES,  moveCost: S4_MC,  defBonus: S4_DB,  units: S4_U  },
  5:  { width: S5_W,  height: S5_H,  tiles: S5_TILES,  moveCost: S5_MC,  defBonus: S5_DB,  units: S5_U  },
  6:  { width: S6_W,  height: S6_H,  tiles: S6_TILES,  moveCost: S6_MC,  defBonus: S6_DB,  units: S6_U  },
  7:  { width: S7_W,  height: S7_H,  tiles: S7_TILES,  moveCost: S7_MC,  defBonus: S7_DB,  units: S7_U  },
  8:  { width: S8_W,  height: S8_H,  tiles: S8_TILES,  moveCost: S8_MC,  defBonus: S8_DB,  units: S8_U  },
  9:  { width: S9_W,  height: S9_H,  tiles: S9_TILES,  moveCost: S9_MC,  defBonus: S9_DB,  units: S9_U  },
  10: { width: S10_W, height: S10_H, tiles: S10_TILES, moveCost: S10_MC, defBonus: S10_DB, units: S10_U },
  11: { width: S11_W, height: S11_H, tiles: S11_TILES, moveCost: S11_MC, defBonus: S11_DB, units: S11_U },
  12: { width: S12_W, height: S12_H, tiles: S12_TILES, moveCost: S12_MC, defBonus: S12_DB, units: S12_U },
  13: { width: S13_W, height: S13_H, tiles: S13_TILES, moveCost: S13_MC, defBonus: S13_DB, units: S13_U },
  14: { width: S14_W, height: S14_H, tiles: S14_TILES, moveCost: S14_MC, defBonus: S14_DB, units: S14_U },
  15: { width: S15_W, height: S15_H, tiles: S15_TILES, moveCost: S15_MC, defBonus: S15_DB, units: S15_U },
  16: { width: S16_W, height: S16_H, tiles: S16_TILES, moveCost: S16_MC, defBonus: S16_DB, units: S16_U },
  17: { width: S17_W, height: S17_H, tiles: S17_TILES, moveCost: S17_MC, defBonus: S17_DB, units: S17_U },
  18: { width: S18_W, height: S18_H, tiles: S18_TILES, moveCost: S18_MC, defBonus: S18_DB, units: S18_U },
  19: { width: S19_W, height: S19_H, tiles: S19_TILES, moveCost: S19_MC, defBonus: S19_DB, units: S19_U },
  20: { width: S20_W, height: S20_H, tiles: S20_TILES, moveCost: S20_MC, defBonus: S20_DB, units: S20_U },
  21: { width: S21_W, height: S21_H, tiles: S21_TILES, moveCost: S21_MC, defBonus: S21_DB, units: S21_U },
  22: { width: S22_W, height: S22_H, tiles: S22_TILES, moveCost: S22_MC, defBonus: S22_DB, units: S22_U },
  23: { width: S23_W, height: S23_H, tiles: S23_TILES, moveCost: S23_MC, defBonus: S23_DB, units: S23_U },
  24: { width: S24_W, height: S24_H, tiles: S24_TILES, moveCost: S24_MC, defBonus: S24_DB, units: S24_U },
  25: { width: S25_W, height: S25_H, tiles: S25_TILES, moveCost: S25_MC, defBonus: S25_DB, units: S25_U },
  26: { width: S26_W, height: S26_H, tiles: S26_TILES, moveCost: S26_MC, defBonus: S26_DB, units: S26_U },
  27: { width: S27_W, height: S27_H, tiles: S27_TILES, moveCost: S27_MC, defBonus: S27_DB, units: S27_U },
  28: { width: S28_W, height: S28_H, tiles: S28_TILES, moveCost: S28_MC, defBonus: S28_DB, units: S28_U },
  29: { width: S29_W, height: S29_H, tiles: S29_TILES, moveCost: S29_MC, defBonus: S29_DB, units: S29_U },
  30: { width: S30_W, height: S30_H, tiles: S30_TILES, moveCost: S30_MC, defBonus: S30_DB, units: S30_U },
  31: { width: S31_W, height: S31_H, tiles: S31_TILES, moveCost: S31_MC, defBonus: S31_DB, units: S31_U },
};

// ============================================================================
// Stage loading
// ============================================================================

export function loadStage(scenarioId: number): StageData | null {
  const table = SCENARIO_TABLES[scenarioId];
  if (!table) return null;

  const units: StageUnit[] = [];
  for (let i = 0; i < table.units.length; i++) {
    const u = table.units[i];
    const stats = getClassStats(u.classId);
    units.push({
      index: i,
      classId: u.classId,
      commanderId: u.commanderId,
      x: u.x, y: u.y,
      faction: factionFromNum(u.faction),
      name: getCharacterName(u.commanderId),
      className: getClassName(u.classId),
      at: stats?.at || 0,
      df: stats?.df || 0,
      mp: stats?.mp || 0,
      mv: stats?.mv || 0,
      range: stats?.r || 0,
    });
  }

  return {
    scenarioId,
    mapWidth: table.width,
    mapHeight: table.height,
    tiles: table.tiles,
    moveCost: table.moveCost.slice(0, table.width * table.height),
    defBonus: table.defBonus.slice(0, table.width * table.height),
    units,
    playerUnits: units.filter(u => u.faction === 'player'),
    enemyUnits: units.filter(u => u.faction === 'enemy'),
    npcUnits: units.filter(u => u.faction === 'npc' || u.faction === 'special'),
  };
}

// ============================================================================
// Stage list
// ============================================================================

export interface StageInfo {
  id: number;
  name: string;
  mapWidth: number;
  mapHeight: number;
  unitCount: number;
}

export const SCENARIO_NAMES: Record<number, string> = {
  1: '序章', 2: '旅立ち', 3: 'ゾルムの魔導師',
  4: '光の大神殿', 5: 'カルザスの攻防', 6: '闇の魔女',
  7: 'レイテル河の戦い', 8: '空中の要塞', 9: '魔剣の儀式',
  10: 'ヴェルゼリアの戦い', 11: '聖剣ラングリッサー', 12: '帝国の逆襲',
  13: '闇の皇子', 14: '聖剣の行方', 15: '嘆きの騎士',
  16: '青竜騎士団', 17: '闘技場', 18: '魔王の復活',
  19: '帝国の最後', 20: '漆黒の魔道師', 21: '美しき野獣',
  22: '邪神の封印', 23: '邪神復活', 24: '光と闇',
  25: '大陸最強の敵', 26: '伝説の始まり', 27: '最終決戦',
  28: '?1 筋肉の神殿', 29: '?2 闇の力',
  30: '?3 真·邪神', 31: '?4 神々の戦い',
};

export function getAllStages(): StageInfo[] {
  return Object.entries(SCENARIO_TABLES).map(([idStr, t]) => ({
    id: Number(idStr),
    name: SCENARIO_NAMES[Number(idStr)] || `Scenario ${idStr}`,
    mapWidth: t.width,
    mapHeight: t.height,
    unitCount: t.units.length,
  }));
}
