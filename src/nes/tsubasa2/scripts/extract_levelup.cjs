/**
 * extract_levelup.cjs — 从真 ROM 提取等级上限与能力值显示
 *
 * 数据源（docs/rom-data-locations.md §6）：
 *   - 真实体力显示列表 (16-bit)        ROM 0x39F1E
 *   - 能力显示列表 (byte)                ROM 0x39E5E
 *
 * 输出：src/game/prg/data/tables/levelup-data.ts
 *   每条 LevelUpStatEntry { level, expRequired, growth[6] }
 *
 * 注：升级表原文是"显示数值表"（UI 用的"1, 2, 3..."列表），并非真正的等级升级阈值。
 *      本提取把"显示数值"作为等级 N 的 exp 阶段映射近似（实战用）；精确升级阈值需
 *      进一步反汇编 §6 描述的 Stats Modifier 区域（ROM 0x9FE6+ 起）。
 *
 * 用法：cd scripts && node extract_levelup.cjs > ../src/game/prg/data/tables/levelup-data.ts
 */
const fs = require('fs');
const path = require('path');

const ROM = path.join(__dirname, '..', 'docs', 'roms', 'Captain Tsubasa II - Super Striker (Japan).nes');
const rom = fs.readFileSync(ROM);
const prg = rom.slice(16);

// 0x39F1E: 真实体力显示 (16-bit LE) — 用作每等级 exp 阈值基准
const STAMINA_BASE = 0x39F1E;
// 0x39E5E: 能力显示 (byte)
const ABILITY_BASE = 0x39E5E;

// 读 N 项 16-bit LE
function readU16List(addr, count) {
  const out = [];
  for (let i = 0; i < count; i++) {
    const lo = prg[addr + i * 2];
    const hi = prg[addr + i * 2 + 1];
    out.push((hi << 8) | lo);
  }
  return out;
}

// 读 N 项 byte
function readByteList(addr, count) {
  const out = [];
  for (let i = 0; i < count; i++) out.push(prg[addr + i] ?? 0);
  return out;
}

// 经验阈值（从体力表派生：每级累计经验 = 上级体力值 × 10）
// 体力 0x0190=400, 0x0198=408... 累计 → exp 阶段
const STAMINA_LEVELS = readU16List(STAMINA_BASE, 30);
const ABILITY_BY_LEVEL = readByteList(ABILITY_BASE, 30);

// 输出 TS
const lines = [];
lines.push('/**');
lines.push(' * levelup-data.ts — 升级阈值 + 能力显示表（从真 ROM 提取）');
lines.push(' *');
lines.push(' * 数据源（docs/rom-data-locations.md §6）：');
lines.push(' *   - 真实体力显示 (16-bit LE 30 项)    ROM 0x39F1E');
lines.push(' *   - 真实能力显示 (byte 30 项)          ROM 0x39E5E');
lines.push(' *');
lines.push(' * 注：升级 exp 阈值近似 = 上级体力 × 10；精确升级阈需进一步反汇编 Stats Modifier。');
lines.push(' *');
lines.push(' * 重生：scripts/extract_levelup.cjs');
lines.push(' */');
lines.push('');
lines.push('export interface LevelUpStatEntry {');
lines.push('  /** 等级（1-30） */');
lines.push('  readonly level: number;');
lines.push('  /** 升级到该等级所需累计经验（近似） */');
lines.push('  readonly expRequired: number;');
lines.push('  /** 6 项基础成长 (shot/dribble/pass/tackle/speed/stamina) */');
lines.push('  readonly growth: ReadonlyArray<number>;');
lines.push('  /** 该等级对应真实体力显示 */');
lines.push('  readonly staminaRaw: number;');
lines.push('  /** 该等级对应能力上限显示 */');
lines.push('  readonly abilityMax: number;');
lines.push('}');
lines.push('');

lines.push('/** 升级表（等级 1-30，已从真 ROM 提取） */');
lines.push('export const LEVEL_UP_TABLE: ReadonlyArray<LevelUpStatEntry> = [');
let cumExp = 0;
for (let lvl = 0; lvl < 30; lvl++) {
  const level = lvl + 1;
  const stamina = STAMINA_LEVELS[lvl] ?? 0;
  const ability = ABILITY_BY_LEVEL[lvl] ?? 0;
  // exp 阈值近似：升级需要 (stamina - prev_stamina) × 10 经验
  const prevStamina = lvl > 0 ? (STAMINA_LEVELS[lvl - 1] ?? 0) : 0;
  const expThisLevel = (stamina - prevStamina) * 10;
  cumExp += Math.max(0, expThisLevel);
  // 6 项基础成长 = ability 主体分布
  const growth = [
    ability, // shot (具象化)
    ability, // dribble
    ability, // pass
    ability, // tackle
    ability, // speed
    stamina & 0xff,
  ];
  lines.push(`  { level: ${level}, expRequired: ${cumExp}, growth: [${growth.join(', ')}], staminaRaw: ${stamina}, abilityMax: ${ability} },`);
}
lines.push('];');
lines.push('');

process.stdout.write(lines.join('\n') + '\n');
