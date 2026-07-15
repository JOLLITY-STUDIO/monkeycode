/**
 * generate-all-stage-data.mjs
 *
 * 从 ROM 一次性提取全部 27 关数据 → 硬编码 TS 常量文件
 * 运行: node scripts/generate-all-stage-data.mjs
 * 输出: game/data/Stage1Data.ts ~ Stage27Data.ts
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rom = readFileSync(join(__dirname, '..', '20260713', 'Langrisser II (Japan)_68K-gens-rom-dump.bin'));

const readU32 = (addr) => ((rom[addr] << 24) | (rom[addr + 1] << 16) | (rom[addr + 2] << 8) | rom[addr + 3]) >>> 0;
const readU16 = (addr) => ((rom[addr] << 8) | rom[addr + 1]);

const fmtUArr = (arr, perLine = 20) => {
  let s = '[\n';
  for (let i = 0; i < arr.length; i += perLine) {
    s += '    ' + arr.slice(i, i + perLine).join(', ');
    if (i + perLine < arr.length) s += ',';
    s += '\n';
  }
  s += '  ]';
  return s;
};

// ============================================================
// 31 scenarios: 1~27 主线 + 28~31 隐藏关卡(?1/?2/?3/?4)
// Map table: 31 entries; Config table: up to 40 (route variants)
// ============================================================
const TOTAL_SCENARIOS = 31;
const outDir = join(__dirname, '..', 'game', 'data');
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

for (let LEVEL = 0; LEVEL < TOTAL_SCENARIOS; LEVEL++) {
  const scenarioId = LEVEL + 1;

  // ==================== MAP TILES ====================
  const mapPtr = readU32(0x61CB0 + LEVEL * 4);
  if (mapPtr === 0 || mapPtr >= rom.length) {
    console.log(`Scenario ${scenarioId}: mapPtr=0x${mapPtr.toString(16)} → SKIP`);
    continue;
  }
  const mapW = readU16(mapPtr);
  const mapH = readU16(mapPtr + 2);
  if (mapW === 0 || mapH === 0 || mapW > 128 || mapH > 128) {
    console.log(`Scenario ${scenarioId}: bad map size ${mapW}x${mapH} → SKIP`);
    continue;
  }

  // Remap tables
  const r1p = readU32(0x61E24 + LEVEL * 8);
  const r2p = readU32(0x61E28 + LEVEL * 8);
  const remap1 = [], remap2 = [];
  for (let i = 0; i < 16; i++) { remap1[i] = rom[r1p + i]; remap2[i] = rom[r2p + i]; }

  // Remapped tiles
  const rawTiles = [];
  for (let i = 0; i < mapW * mapH; i++) rawTiles.push(rom[mapPtr + 4 + i]);
  const remappedTiles = rawTiles.map(t => {
    const lo = t & 0x0F, hi = (t >> 4) & 0x0F;
    return ((remap2[hi] ?? hi) << 4) | (remap1[lo] ?? lo);
  });

  // ==================== TILE ATTRS ====================
  const loPtr = readU32(0x061D2C + LEVEL * 8);
  const hiPtr = readU32(0x061D30 + LEVEL * 8);
  const moveCost = [], defBonus = [];
  for (let i = 0; i < mapW * mapH; i++) {
    const b = rom[loPtr + i];
    moveCost.push(b & 0x0F);
    defBonus.push((b >> 4) & 0x0F);
  }
  for (let i = 0; i < mapW * mapH; i++) {
    const b = rom[hiPtr + i];
    defBonus[i] = (defBonus[i] + ((b >> 4) & 0x0F)) & 0x0F;
  }

  // ==================== UNITS ====================
  // ROM unit deploy struct (from ASM loc_010D1E, confirmed via RAM analysis):
  //   Stride: 0x24 (36 bytes)
  //   +0x00: dword — leader/unit ID
  //   +0x04: word  — flag
  //   +0x06: byte  — X position (1-based, 0 = auto/default)
  //   +0x07: byte  — Y position (1-based, 0 = auto/default)
  //   +0x08: byte  — flag/attribute (bit0=player, bit1=NPC)
  //   +0x09: byte  — item
  //   +0x0A: word  — field
  //   +0x0C: word  — equipment
  //   +0x18: word  — HP
  //   +0x1A: byte  — classId
  //   +0x1C: byte  — extra attribute
  //   +0x1E-0x23: 6 mercenary type bytes (FF = none)
  const cfgPtr = readU32(0x18005E + LEVEL * 4) & 0xFFFFFF;
  const ulPtr = readU32(cfgPtr + 0x0C) & 0xFFFFFF;
  const unitCount = readU16(ulPtr);
  const unitData = [];
  const STRIDE = 0x24;
  const startOff = ulPtr + 2; // skip the 2-byte count
  for (let i = 0; i < unitCount; i++) {
    const a = startOff + i * STRIDE;
    if (a + STRIDE > rom.length) break;
    const classId = rom[a + 0x1A];
    const x = rom[a + 0x06], y = rom[a + 0x07];
    const attr0 = readU32(a);
    const attr1 = readU32(a + 0x04);
    const flag = rom[a + 0x08];
    const isPlayer = (flag & 1) !== 0, isNPC = (flag & 2) !== 0;
    let faction = 2; // enemy default
    if (isPlayer) faction = 0; else if (isNPC) faction = 1;
    unitData.push({
      classId,
      x, y,
      faction,
      flag,
      item: rom[a + 0x09],
      hp: readU16(a + 0x18),
      extraFlags: rom[a + 0x1C],
      // mercenary types
      mercTypes: [
        rom[a + 0x1E], rom[a + 0x1F], rom[a + 0x20],
        rom[a + 0x21], rom[a + 0x22], rom[a + 0x23],
      ],
      raw: {
        dword0: attr0,
        word2: attr1,
        wordField: readU16(a + 0x0A),
        wordEquip: readU16(a + 0x0C),
        dword3: readU32(a + 0x0C),
        dword4: readU32(a + 0x10),
        dword5: readU32(a + 0x14),
      },
    });
  }

  // ==================== SCENARIO CONFIG ====================
  const sPtr = readU32(0x0821BE + LEVEL * 4);
  const segNames = ['player', 'aiSpecial', 'npc', 'enemyDefault'];
  const segments = [];
  for (let s = 0; s < 4; s++) {
    const dwords = [];
    for (let d = 0; d < 8; d++) dwords.push(readU32(sPtr + s * 32 + d * 4));
    segments.push({ name: segNames[s], dwords });
  }

  // ==================== BOSS CONFIG ====================
  const bossAddr = 0x060600 + LEVEL * 8;
  const bosses = [];
  for (let i = 0; i < 4; i++) {
    const c = rom[bossAddr + i * 2], l = rom[bossAddr + i * 2 + 1];
    if (c === 0xFF || l === 0xFF) break;
    bosses.push({ classId: c, level: l });
  }

  // ==================== GENERATE TS FILE ====================
  const tsContent = `/**
 * Stage${scenarioId}Data.ts — Scenario ${scenarioId} 硬编码数据
 *
 * 由脚本生成: scripts/generate-all-stage-data.mjs
 * 来源: Langrisser II (Japan) ROM
 *
 * 运行时不需要 ROM, 所有数据硬编码为 TS 常量
 */

// ============================================================================
// 地图数据
// ============================================================================

/** Map dimensions */
export const MAP_WIDTH = ${mapW};
export const MAP_HEIGHT = ${mapH};

/** Remapped tile indices (w*h = ${mapW * mapH}) */
export const MAP_TILES: number[] = ${fmtUArr(remappedTiles)};

/** Tile remap table — low nibble */
export const TILE_REMAP1: number[] = [${remap1.join(', ')}];

/** Tile remap table — high nibble */
export const TILE_REMAP2: number[] = [${remap2.join(', ')}];

// ============================================================================
// Tile attributes (move cost + def bonus)
// ============================================================================

/** Per-tile movement cost */
export const TILE_MOVE_COST: number[] = ${fmtUArr(moveCost)};

/** Per-tile defense bonus */
export const TILE_DEF_BONUS: number[] = ${fmtUArr(defBonus)};

// ============================================================================
// Unit data
// ============================================================================

export interface Stage${scenarioId}Unit {
  classId: number;
  x: number;
  y: number;
  /** 0=player, 1=NPC, 2=enemy */
  faction: number;
  flag: number;
  item: number;
  hp: number;
  extraFlags: number;
  /** 6 mercenary type IDs (0xFF = none) */
  mercTypes: number[];
  raw: {
    dword0: number;
    word2: number;
    wordField: number;
    wordEquip: number;
    dword3: number;
    dword4: number;
    dword5: number;
  };
}

export const UNITS: Stage${scenarioId}Unit[] = ${JSON.stringify(unitData, null, 2)};

// ============================================================================
// Scenario config (4 segments × 8 dwords)
// ============================================================================

export interface ConfigSegment {
  name: string;
  dwords: number[];
}

export const SCENARIO_CONFIG: ConfigSegment[] = ${JSON.stringify(segments, null, 2)};

// ============================================================================
// Boss config
// ============================================================================

export interface BossEntry {
  classId: number;
  level: number;
}

export const BOSS_CONFIG: BossEntry[] = ${JSON.stringify(bosses, null, 2)};
`;

  writeFileSync(join(outDir, `Stage${scenarioId}Data.ts`), tsContent, 'utf-8');
  console.log(`Scenario ${scenarioId}: ${mapW}x${mapH}, ${unitData.length} units, ${bosses.length} bosses → Stage${scenarioId}Data.ts`);
}
