import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const ROM_PATH = path.join(ROOT, '20260713/Langrisser II (Japan).md');
const OUTPUT_DIR = path.join(ROOT, 'game/data');

const rom = fs.readFileSync(ROM_PATH);

function readWord(addr) {
  return (rom[addr + 1] << 8) | rom[addr];
}

function readLong(addr) {
  return (rom[addr] << 24) | (rom[addr + 1] << 16) | (rom[addr + 2] << 8) | rom[addr + 3];
}

function read32BE(addr) {
  return (rom[addr] << 24) | (rom[addr + 1] << 16) | (rom[addr + 2] << 8) | rom[addr + 3];
}

const SCENARIO_COUNT = 31;
const BOSS_TABLE_ADDR = 0x060600;
const BOSS_ENTRY_SIZE = 8;
const CLASS_DATA_ADDR = 0x05EDDC;
const CLASS_ENTRY_SIZE = 0x1C;
const CLASS_NAME_ADDR = 0x05E958;
const SCENARIO_CONFIG_PTR = 0x18005E;

const HALF_TO_FULL = {
  '｡': '。', '｢': '「', '｣': '」', '､': '、', '･': '・',
  'ｦ': 'ヲ', 'ｧ': 'ァ', 'ｨ': 'ィ', 'ｩ': 'ゥ', 'ｪ': 'ェ', 'ｫ': 'ォ',
  'ｬ': 'ャ', 'ｭ': 'ュ', 'ｮ': 'ョ', 'ｯ': 'ッ', 'ｰ': 'ー',
  'ｱ': 'ア', 'ｲ': 'イ', 'ｳ': 'ウ', 'ｴ': 'エ', 'ｵ': 'オ',
  'ｶ': 'カ', 'ｷ': 'キ', 'ｸ': 'ク', 'ｹ': 'ケ', 'ｺ': 'コ',
  'ｻ': 'サ', 'ｼ': 'シ', 'ｽ': 'ス', 'ｾ': 'セ', 'ｿ': 'ソ',
  'ﾀ': 'タ', 'ﾁ': 'チ', 'ﾂ': 'ツ', 'ﾃ': 'テ', 'ﾄ': 'ト',
  'ﾅ': 'ナ', 'ﾆ': 'ニ', 'ﾇ': 'ヌ', 'ﾈ': 'ネ', 'ﾉ': 'ノ',
  'ﾊ': 'ハ', 'ﾋ': 'ヒ', 'ﾌ': 'フ', 'ﾍ': 'ヘ', 'ﾎ': 'ホ',
  'ﾏ': 'マ', 'ﾐ': 'ミ', 'ﾑ': 'ム', 'ﾒ': 'メ', 'ﾓ': 'モ',
  'ﾔ': 'ヤ', 'ﾕ': 'ユ', 'ﾖ': 'ヨ',
  'ﾗ': 'ラ', 'ﾘ': 'リ', 'ﾙ': 'ル', 'ﾚ': 'レ', 'ﾛ': 'ロ',
  'ﾜ': 'ワ', 'ﾝ': 'ン',
  'ｶﾞ': 'ガ', 'ｷﾞ': 'ギ', 'ｸﾞ': 'グ', 'ｹﾞ': 'ゲ', 'ｺﾞ': 'ゴ',
  'ｻﾞ': 'ザ', 'ｼﾞ': 'ジ', 'ｽﾞ': 'ズ', 'ｾﾞ': 'ゼ', 'ｿﾞ': 'ゾ',
  'ﾀﾞ': 'ダ', 'ﾁﾞ': 'ヂ', 'ﾂﾞ': 'ヅ', 'ﾃﾞ': 'デ', 'ﾄﾞ': 'ド',
  'ﾊﾞ': 'バ', 'ﾋﾞ': 'ビ', 'ﾌﾞ': 'ブ', 'ﾍﾞ': 'ベ', 'ﾎﾞ': 'ボ',
  'ﾊﾟ': 'パ', 'ﾋﾟ': 'ピ', 'ﾌﾟ': 'プ', 'ﾍﾟ': 'ペ', 'ﾎﾟ': 'ポ',
  'ｳﾞ': 'ヴ',
};

function sjisHalfToUnicode(b) {
  if (b >= 0xA1 && b <= 0xDF) return 0xFF61 + (b - 0xA1);
  return b;
}

function halfToFullKana(str) {
  let result = '';
  for (let i = 0; i < str.length; i++) {
    if ((str[i] === 'ﾞ' || str[i] === 'ﾟ') && i > 0) {
      const prev = str[i - 1];
      const combined = prev + str[i];
      const mapped = HALF_TO_FULL[combined];
      if (mapped) {
        result = result.slice(0, -1) + mapped;
        continue;
      }
    }
    result += HALF_TO_FULL[str[i]] || str[i];
  }
  result = result.replace(/[゛゜]/g, '');
  return result;
}

function parseClassNames() {
  const names = [];
  let current = [];
  for (let addr = CLASS_NAME_ADDR; addr < rom.length; addr++) {
    const b = rom[addr];
    if (b === 0xFF || b === 0x00) {
      if (current.length) {
        const sjisStr = current.map(sjisHalfToUnicode).map(c => String.fromCharCode(c)).join('');
        const fullStr = halfToFullKana(sjisStr);
        names.push(fullStr);
        current = [];
      }
      if (names.length > 150) break;
    } else {
      current.push(b);
    }
  }
  if (current.length) {
    const sjisStr = current.map(sjisHalfToUnicode).map(c => String.fromCharCode(c)).join('');
    const fullStr = halfToFullKana(sjisStr);
    names.push(fullStr);
  }
  return names;
}

function generateBossData() {
  const bosses = [];
  
  for (let i = 0; i < SCENARIO_COUNT; i++) {
    const addr = BOSS_TABLE_ADDR + i * BOSS_ENTRY_SIZE;
    const levelBosses = [];
    
    for (let j = 0; j < 4; j++) {
      const classId = rom[addr + j * 2];
      const level = rom[addr + j * 2 + 1];
      if (classId !== 0xFF && level !== 0xFF) {
        levelBosses.push({ classId, level });
      }
    }
    
    bosses.push({
      stage: i + 1,
      bosses: levelBosses
    });
  }
  
  const content = `/**
 * EnemyBossData.ts — Langrisser II 关卡BOSS配置数据
 *
 * 由脚本生成: scripts/extract-enemy-data-full.mjs
 * 来源: Langrisser II (Japan) ROM
 *
 * ROM数据源: 0x060600, 每关8字节(4对class_id + level), 0xFF表示空位
 */

export interface BossEntry {
  classId: number;
  level: number;
}

export interface StageBossConfig {
  stage: number;
  bosses: BossEntry[];
}

export const ENEMY_BOSS_DATA: StageBossConfig[] = ${JSON.stringify(bosses, null, 2)};
`;
  
  fs.writeFileSync(path.join(OUTPUT_DIR, 'EnemyBossData.ts'), content);
  console.log('[OK] Generated EnemyBossData.ts');
}

function generateClassData() {
  const classNames = parseClassNames();
  const classes = [];
  
  for (let i = 0; i < 128; i++) {
    const addr = CLASS_DATA_ADDR + i * CLASS_ENTRY_SIZE;
    if (addr + CLASS_ENTRY_SIZE > rom.length) break;
    
    const d = rom.slice(addr, addr + CLASS_ENTRY_SIZE);
    const dataOffset = (d[0x00] << 8) | d[0x01];
    const field_02 = (d[0x02] << 8) | d[0x03];
    const terrainModOff = (d[0x04] << 8) | d[0x05];
    
    const entry = {
      classId: i,
      name: classNames[i] || '',
      dataOffset,
      field_02,
      terrainModOff,
      moveType: d[0x06],
      field_07: d[0x07],
      flag_08: d[0x08],
      reserved_09: (d[0x09] << 8) | d[0x0A],
      cmdRange2: d[0x0B],
      cmdRange3: d[0x0C],
      mv: d[0x0D],
      range: d[0x0E],
      baseAT: d[0x0F],
      baseDF: d[0x10],
      reserved_11: (d[0x11] << 8) | d[0x12],
      mp: d[0x13],
      reserved_14: Array.from(d.slice(0x14, 0x1C)),
      dataPtr: CLASS_DATA_ADDR + dataOffset,
    };
    
    if (entry.mv > 0 || entry.baseAT > 0 || entry.baseDF > 0) {
      classes.push(entry);
    }
  }
  
  const content = `/**
 * EnemyClassData.ts — Langrisser II 职业数据
 *
 * 由脚本生成: scripts/extract-enemy-data-full.mjs
 * 来源: Langrisser II (Japan) ROM
 *
 * ROM数据源: 0x05EDDC (职业数据表, 28字节/条目) + 0x05E958 (职业名表)
 */

export interface EnemyClass {
  classId: number;
  name: string;
  dataOffset: number;
  field_02: number;
  terrainModOff: number;
  moveType: number;
  field_07: number;
  flag_08: number;
  reserved_09: number;
  cmdRange2: number;
  cmdRange3: number;
  mv: number;
  range: number;
  baseAT: number;
  baseDF: number;
  reserved_11: number;
  mp: number;
  reserved_14: number[];
  dataPtr: number;
}

export const ENEMY_CLASS_DATA: EnemyClass[] = ${JSON.stringify(classes, null, 2)};
`;
  
  fs.writeFileSync(path.join(OUTPUT_DIR, 'EnemyClassData.ts'), content);
  console.log('[OK] Generated EnemyClassData.ts');
}

function generateLevelEnemyData() {
  const allLevelEnemies = [];
  
  for (let levelIdx = 1; levelIdx <= SCENARIO_COUNT; levelIdx++) {
    const configPtr = readLong(SCENARIO_CONFIG_PTR + (levelIdx - 1) * 4);
    if (configPtr < 0x200 || configPtr > rom.length) {
      allLevelEnemies.push({ stage: levelIdx, enemies: [] });
      continue;
    }
    
    const unitListPtr = readLong(configPtr + 0x0C) & 0xFFFFFF;
    if (unitListPtr < 0x200 || unitListPtr > rom.length) {
      allLevelEnemies.push({ stage: levelIdx, enemies: [] });
      continue;
    }
    
    const STRIDE = 0x1E;
    const enemies = [];
    let off = 0;
    
    while (unitListPtr + off + STRIDE <= rom.length) {
      const addr = unitListPtr + off;
      const typeIndex = rom[addr + 0x1B];
      const commanderId = rom[addr + 0x1A];
      
      if (typeIndex === 0xFF || commanderId === 0xFF) break;
      if (typeIndex === 0 && commanderId === 0 && off > 0) break;
      
      const x = rom[addr + 0x18];
      const y = rom[addr + 0x19];
      
      const attr0 = read32BE(addr + 0x00);
      const attr1 = read32BE(addr + 0x04);
      const attr2 = read32BE(addr + 0x08);
      const attr3 = read32BE(addr + 0x0C);
      const attr4 = read32BE(addr + 0x10);
      const attr5 = read32BE(addr + 0x14);
      const extraFlags = rom[addr + 0x1C];
      
      const isPlayer = (attr2 & 1) !== 0;
      const isEnemy = !isPlayer;
      
      if (isEnemy) {
        enemies.push({
          classId: typeIndex,
          commanderId,
          x,
          y,
          attr0,
          attr1,
          attr2,
          attr3,
          attr4,
          attr5,
          extraFlags,
        });
      }
      
      off += STRIDE;
    }
    
    allLevelEnemies.push({
      stage: levelIdx,
      enemies
    });
  }
  
  const content = `/**
 * EnemyLevelData.ts — Langrisser II 各关卡敌人单位配置
 *
 * 由脚本生成: scripts/extract-enemy-data-full.mjs
 * 来源: Langrisser II (Japan) ROM
 *
 * ROM数据源: 0x18005E (场景配置指针表) → 各关卡配置结构
 */

export interface EnemyUnit {
  classId: number;
  commanderId: number;
  x: number;
  y: number;
  attr0: number;
  attr1: number;
  attr2: number;
  attr3: number;
  attr4: number;
  attr5: number;
  extraFlags: number;
}

export interface StageEnemyConfig {
  stage: number;
  enemies: EnemyUnit[];
}

export const ENEMY_LEVEL_DATA: StageEnemyConfig[] = ${JSON.stringify(allLevelEnemies, null, 2)};
`;
  
  fs.writeFileSync(path.join(OUTPUT_DIR, 'EnemyLevelData.ts'), content);
  console.log('[OK] Generated EnemyLevelData.ts');
}

console.log('=== 开始提取敌人数据 ===\n');

generateBossData();
generateClassData();
generateLevelEnemyData();

console.log('\n=== 敌人数据提取完成 ===');
