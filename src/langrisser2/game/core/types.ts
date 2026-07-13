export type Faction = 'player' | 'npc' | 'enemy' | 'special';

export type UnitType = 'commander' | 'soldier';

export type GamePhase = 'title' | 'deploy' | 'battle' | 'intermission' | 'ending';

export type ActionType =
  | 'move'
  | 'attack'
  | 'magic'
  | 'item'
  | 'wait'
  | 'recruit'
  | 'promote'
  | 'equip';

export type TileType =
  | 'plain'
  | 'forest'
  | 'mountain'
  | 'river'
  | 'road'
  | 'castle'
  | 'village'
  | 'sea'
  | 'wall'
  | 'bridge'
  | 'ruins'
  | 'cave'
  | 'grass'
  | 'desert'
  | 'snow'
  | 'swamp';

export interface Stats {
  at: number;
  df: number;
  mp: number;
  hp: number;
  mv: number;
}

export interface ClassDefinition {
  classId: number;
  name: string;
  nameJp: string;
  tier: number;
  mv: number;
  baseAt: number;
  baseDf: number;
  baseMp: number;
  soldierType: number;
  soldierCount: number;
  moveType: 'foot' | 'cavalry' | 'flying' | 'magic' | 'armored';
  terrainModOffset: number;
  spriteOffset: number;
  promotions: number[];
  spells: SpellLearn[];
}

export interface SpellLearn {
  spellId: number;
  level: number;
}

export interface Spell {
  id: number;
  name: string;
  nameJp: string;
  type: 'attack' | 'heal' | 'buff' | 'debuff' | 'utility';
  mpCost: number;
  range: number;
  power: number;
  description: string;
}

export interface Item {
  id: number;
  name: string;
  nameJp: string;
  type: 'weapon' | 'armor' | 'accessory' | 'consumable' | 'key';
  atBonus: number;
  dfBonus: number;
  mpBonus: number;
  description: string;
}

export interface SoldierType {
  id: number;
  name: string;
  baseAt: number;
  baseDf: number;
  hp: number;
  mv: number;
  type: 'infantry' | 'cavalry' | 'archer' | 'mage' | 'flying' | 'special';
  spriteOffset: number;
}

export interface TerrainModifier {
  tileType: TileType;
  atBonus: number;
  dfBonus: number;
  mvCost: number;
}

export interface UnitAttributes {
  unitId: number;
  classId: number;
  name: string;
  faction: Faction;
  commanderId: number;
  isCommander: boolean;
}

export interface UnitStats {
  level: number;
  exp: number;
  hp: number;
  maxHp: number;
  mp: number;
  maxMp: number;
  at: number;
  df: number;
  mv: number;
}

export interface UnitPosition {
  x: number;
  y: number;
}

export interface UnitState {
  isDead: boolean;
  hasMoved: boolean;
  hasActed: boolean;
  isDeployed: boolean;
}

export interface SoldierUnit {
  soldierId: number;
  typeId: number;
  hp: number;
  maxHp: number;
  at: number;
  df: number;
  position: { x: number; y: number };
  isDead: boolean;
}

export interface Unit {
  id: number;
  attributes: UnitAttributes;
  stats: UnitStats;
  position: UnitPosition;
  state: UnitState;
  soldiers: SoldierUnit[];
  equipment: {
    weapon: number | null;
    armor: number | null;
    accessory: number | null;
  };
  spells: number[];
  skills: number[];
  items: number[];
}

export interface TileData {
  tileIndex: number;
  remappedIndex: number;
  type: TileType;
  moveCost: number;
  defenseBonus: number;
  attackBonus: number;
}

export interface MapData {
  scenarioId: number;
  width: number;
  height: number;
  tiles: TileData[][];
  romAddr: number;
  palettes: number[][];
}

export interface ScenarioConfig {
  scenarioId: number;
  name: string;
  mapPtr: number;
  units: ScenarioUnit[];
  winCondition: string;
  loseCondition: string;
  nextScenario: number;
}

export interface ScenarioUnit {
  index: number;
  classId: number;
  commanderId: number;
  x: number;
  y: number;
  faction: Faction;
  level: number;
  romAddr: number;
}

export interface BattleState {
  attackerUnitId: number;
  defenderUnitId: number;
  attackerDamage: number;
  defenderDamage: number;
  attackerSoldierLoss: number;
  defenderSoldierLoss: number;
  isCounter: boolean;
  terrainAtkBonus: number;
  terrainDefBonus: number;
  result: 'ongoing' | 'attacker_wins' | 'defender_wins' | 'both_dead';
}

export interface MoveRangeCell {
  x: number;
  y: number;
  cost: number;
  path: { x: number; y: number }[];
}

export interface AttackRangeCell {
  x: number;
  y: number;
  range: number;
}

export interface GameStateData {
  phase: GamePhase;
  scenarioId: number;
  turn: number;
  currentFaction: Faction;
  selectedUnitId: number | null;
  gold: number;
  units: Map<number, Unit>;
  map: MapData | null;
  scenario: ScenarioConfig | null;
}

/**
 * ROM 解析结果类型 (与 md.js parseROM 返回值一致)
 * 不要在此添加额外字段, 保持与 JS 完全一致
 */
export interface ROMData {
  systemType: string;
  title: string;
  romEnd: number;
}
