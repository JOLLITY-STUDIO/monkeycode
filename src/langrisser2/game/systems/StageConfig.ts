/**
 * StageConfig.ts — Langrisser II 关卡配置加载系统 (TypeScript版)
 *
 * 数据源: ROM 场景配置表 (0x0821BE) + 关卡单位列表 (0x18005E) + 地图表 (0x61CB0)
 *
 * 关卡加载流程 (对应 ROM FUN_0000a122):
 *   1. 选择关卡 (scenarioIndex)
 *   2. 加载地图 tile 数据 (0x61CB0 指针表 → 地图)
 *   3. 加载单位配置 (0x18005E 指针表 → 0x1E字节/单位)
 *   4. 加载场景配置 (0x0821BE 指针表 → 128B 配置)
 *   5. 初始化所有单位到 RAM 槽位 (0xFF603C, 0x60字节/单位)
 */
import { read8, read16BE, read32BE } from '../data/rom';
import { parseLevelMap } from '../data/map';
import { parseLevelUnits } from '../data/units';
import { parseScenarioUnitConfig } from '../data/scenario';
import { parseCharInit, parseCharModifier } from '../data/character';
import { getClassInfo } from '../data/classes';

// ============================================================================
// Stage data structures
// ============================================================================

export interface StageUnit {
  /** Unit index in the level */
  index: number;
  /** Class ID from ROM template */
  classId: number;
  /** Commander ID (character index, or 0xFF for generic) */
  commanderId: number;
  /** Initial X position */
  x: number;
  /** Initial Y position */
  y: number;
  /** Faction */
  faction: 'player' | 'npc' | 'enemy' | 'special';
  /** Unit name (if known) */
  name: string;
  /** Class info (from ROM) */
  className: string;
  /** Class stats: AT, DF, MP, MV, Range */
  at: number;
  df: number;
  mp: number;
  mv: number;
  range: number;
}

export interface StageData {
  /** Scenario number (1-31) */
  scenarioId: number;
  /** Map dimensions */
  mapWidth: number;
  mapHeight: number;
  /** Number of units in this stage */
  unitCount: number;
  /** Unit list by faction */
  units: StageUnit[];
  /** Player units */
  playerUnits: StageUnit[];
  /** Enemy units */
  enemyUnits: StageUnit[];
  /** NPC units */
  npcUnits: StageUnit[];
  /** Map tiles (remapped) */
  tiles: number[];
}

// ============================================================================
// Stage loading
// ============================================================================

/**
 * Load a complete stage from ROM
 *
 * @param rom ROM buffer
 * @param scenarioId Scenario number (1-31)
 */
export function loadStage(rom: Uint8Array, scenarioId: number): StageData | null {
  // 1. Load map
  const mapData = parseLevelMap(rom, scenarioId - 1);
  if (!mapData) return null;

  // 2. Load units (parseLevelUnits expects 1-based levelIndex)
  const unitList = parseLevelUnits(rom, scenarioId);

  // 3. Load scenario config
  const scenarioConfig = parseScenarioUnitConfig(rom, scenarioId);

  // 4. Assign factions from ROM data (attr_block_2 bit0)
  // ROM 逻辑: unit[0x20] byte bit0=玩家方 (FUN_0000a16a)
  const units: StageUnit[] = [];

  for (let i = 0; i < unitList.length; i++) {
    const u = unitList[i];
    const classInfo = getClassInfo(rom, u.typeIndex);

    // Faction from ROM data: attr_block_2 bit0 = player
    // ROM routing: faction_byte=1→Player, faction_byte=3→NPC, else→Enemy
    // attr_block_2 maps to RAM 0x20, bit0 is player flag
    // Additional faction detection: bit? in attr2 for NPC/特殊
    let faction: 'player' | 'npc' | 'enemy' | 'special' = 'enemy';
    if (u.isPlayer) {
      faction = 'player';
    } else if ((u.attr2 & 0x02) !== 0) {
      faction = 'npc';    // bit1 = NPC
    } else if ((u.attr2 & 0x04) !== 0) {
      faction = 'special'; // bit2 = special AI
    }

    let name = `Unit#${i}`;
    // Try to match commander to known character
    if (u.commanderId >= 1 && u.commanderId <= 10) {
      try {
        const char = parseCharInit(rom, u.commanderId);
        if (char) name = char.nameCn;
      } catch (_) {}
    }

    units.push({
      index: i,
      classId: u.typeIndex,
      commanderId: u.commanderId,
      x: u.x,
      y: u.y,
      faction,
      name,
      className: classInfo.name,
      at: classInfo.stats?.at || classInfo.entry.baseAT,
      df: classInfo.stats?.df || classInfo.entry.baseDF,
      mp: classInfo.stats?.mp || classInfo.entry.mp,
      mv: classInfo.stats?.mv || classInfo.entry.mv,
      range: classInfo.stats?.r || classInfo.entry.range,
    });
  }

  // 5. Extract remapped tiles
  const tiles = mapData.remapped.map(r => r.remapped);

  return {
    scenarioId,
    mapWidth: mapData.width,
    mapHeight: mapData.height,
    unitCount: units.length,
    units,
    playerUnits: units.filter(u => u.faction === 'player'),
    enemyUnits: units.filter(u => u.faction === 'enemy'),
    npcUnits: units.filter(u => u.faction === 'npc' || u.faction === 'special'),
    tiles,
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

/**
 * Known scenario names (from ROM + fan docs)
 * Scenario names are hardcoded as they aren't easily extracted from ROM
 */
export const SCENARIO_NAMES: Record<number, string> = {
  1:  '序章',
  2:  '旅立ち',
  3:  'ゾルムの魔導師',
  4:  '光の大神殿',
  5:  'カルザスの攻防',
  6:  '闇の魔女',
  7:  'レイテル河の戦い',
  8:  '空中の要塞',
  9:  '魔剣の儀式',
  10: 'ヴェルゼリアの戦い',
  11: '聖剣ラングリッサー',
  12: '帝国の逆襲',
  13: '闇の皇子',
  14: '聖剣の行方',
  15: '嘆きの騎士',
  16: '青竜騎士団',
  17: '闘技場',
  18: '魔王の復活',
  19: '帝国の最後',
  20: '漆黒の魔道師',
  21: '美しき野獣',
  22: '邪神の封印',
  23: '邪神復活',
  24: '光と闇',
  25: '大陸最強の敵',
  26: '伝説の始まり',
  27: '最終決戦',
  // Hidden scenarios
  81: '筋肉の神殿 (?1)',
  82: '闇の力 (?2)',
  83: '真·邪神 (?3)',
  84: '神々の戦い (?4)',
};

/**
 * Get basic info for all available stages
 */
export function getAllStages(rom: Uint8Array): StageInfo[] {
  const stages: StageInfo[] = [];

  // Levels 0-30 are normal maps
  for (let i = 0; i < 31; i++) {
    const mapData = parseLevelMap(rom, i);
    if (!mapData) continue;

    const unitList = parseLevelUnits(rom, i + 1);

    stages.push({
      id: i + 1,
      name: SCENARIO_NAMES[i + 1] || `Scenario ${i + 1}`,
      mapWidth: mapData.width,
      mapHeight: mapData.height,
      unitCount: unitList.length,
    });
  }

  return stages;
}

// ============================================================================
// Unit deployment helpers
// ============================================================================

/**
 * Get initial deployment positions for player units
 */
export function getDeployPositions(stage: StageData): Array<{ x: number; y: number; commanderId: number }> {
  return stage.playerUnits.map(u => ({
    x: u.x,
    y: u.y,
    commanderId: u.commanderId,
  }));
}

/**
 * Get all enemy positions
 */
export function getEnemyPositions(stage: StageData): Array<{ x: number; y: number; name: string }> {
  return stage.enemyUnits.map(u => ({
    x: u.x,
    y: u.y,
    name: u.name,
  }));
}
