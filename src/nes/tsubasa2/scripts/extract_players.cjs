/**
 * extract_players.cjs — 从真 ROM 提取 117 球员能力/颜色/头型
 *
 * 数据源（详见 docs/rom-data-locations.md）：
 *   - 角色 ID 列表 + 名字         项目文档 §1
 *   - 24 字节能力值               ROM 0x39fde + idx*24
 *   - GK 8 字节能力值             ROM 0x3ae96 + idx*8
 *   - 头型 (PlayModList, 18 模板) ROM 0x28901 + idx
 *   - 颜色 (明星/杂鱼)            ROM 0x2b821/0x2b6d7 + idx*5
 *
 * 输出：src/game/prg/data/tables/player-stats.ts
 *   （已具象化的 PLAYER_TABLE 字段：name/club/shot/dribble/pass/tackle/speed/stamina/shot/dribble 二级）
 *
 * 用法：cd scripts && node extract_players.cjs > ../src/game/prg/data/tables/player-stats.ts
 */
const fs = require('fs');
const path = require('path');

const ROM = path.join(__dirname, '..', 'docs', 'roms', 'Captain Tsubasa II - Super Striker (Japan).nes');
const rom = fs.readFileSync(ROM);
// NES: iNES header 16 bytes, then 16 PRG banks of 16KB, 16 CHR banks of 8KB
// 但 docs 写 0x39fde 是 PRG 偏移（iNES header 后相对偏移），所以 prg = rom.slice(16)
const prg = rom.slice(16);

function u16(addr) {
  return prg[addr] | (prg[addr + 1] << 8);
}

// 角色名（中英对照，来自 docs/rom-data-locations.md §1，0x01-0x2D 完整 + 后续模板化）
const NAMES = {
  0x01: 'Tsubasa',     0x02: 'Lennart',    0x03: 'Lima',
  0x04: 'Marini',      0x05: 'Amaral',     0x06: 'Dottil',
  0x07: 'Battista',    0x08: 'Tahamata',   0x09: 'Babinton',
  0x0A: 'Gil',         0x0B: 'Platton',    0x0C: 'Urabe',
  0x0D: 'Kishida',     0x0E: 'Nakayama',   0x0F: 'Morisaki',
  0x10: 'Takasugu',    0x11: 'Misaki',     0x12: 'Izawa',
  0x13: 'Taki',        0x14: 'Ishizaki',   0x15: 'Nitta',
  0x16: 'Kisugi',      0x17: 'Masao',      0x18: 'Kazuo',
  0x19: 'Sano',        0x1A: 'Hyuga',      0x1B: 'Souta',
  0x1C: 'Jitou',       0x1D: 'Matsuyama',  0x1E: 'Sorimachi',
  0x1F: 'Sawada',      0x20: 'Misugi',     0x21: 'Wakabayashi',
  0x22: 'Wakashimazu', 0x23: 'Satilst',    0x24: 'Riverio',
  0x25: 'DaSilva',     0x26: 'Meon',       0x27: 'Toninho',
  0x28: 'Nei',         0x29: 'Zagalo',     0x2A: 'Dircil',
  0x2B: 'Carlos',      0x2C: 'Santamaria', 0x2D: 'Jethrio',
  // 杂鱼 0x2E-0x40 重复 / 0x41-0x75 训练队 / 隐藏
};

// 仅抓 0x01-0x2D（明星 45 个有名字且能力值能区分的）
const PLAYER_ID_MAX = 0x2D;

function readStats(idx) {
  const base = 0x39fde + idx * 24;
  const stamina = prg[base + 0];
  const shot    = prg[base + 1];
  const pass    = prg[base + 2];
  const dribble = prg[base + 3];
  const tackle  = prg[base + 5];
  return { stamina, shot, pass, dribble, tackle };
}

function readGkStats(idx) {
  const base = 0x3ae96 + idx * 8;
  return {
    stamina: prg[base + 0],
    pass:    prg[base + 1],
    catch_:  prg[base + 2],
    punch:   prg[base + 3],
    vsShot:  prg[base + 4],
    vsDrib:  prg[base + 5],
  };
}

function readHair(idx) {
  // 0x28901 + idx (18 模板，明星使用)
  return prg[0x28901 + idx] ?? 0;
}

function readColor(idx, isCelebrity) {
  // 明星: 0x2b821 + idx*5, 杂鱼: 0x2b6d7 + idx*5
  const base = (isCelebrity ? 0x2b821 : 0x2b6d7) + idx * 5;
  return {
    skin:    prg[base + 0] ?? 0,
    hair:    prg[base + 1] ?? 0,
    shirt:   prg[base + 2] ?? 0,
    shorts:  prg[base + 3] ?? 0,
  };
}

// 输出 header
const lines = [];
lines.push('/**');
lines.push(' * player-stats.ts — 球员档案具象化表（从真 ROM 提取）');
lines.push(' *');
lines.push(' * 数据源：');
lines.push(' *   - 能力值 (24 字节)         ROM 0x39fde + idx*24');
lines.push(' *   - GK 能力值 (8 字节)       ROM 0x3ae96 + idx*8');
lines.push(' *   - 颜色 (明星)              ROM 0x2b821 + idx*5');
lines.push(' *   - 头型 (PlayModList 18)    ROM 0x28901 + idx');
lines.push(' *');
lines.push(' * 重生脚本：scripts/extract_players.cjs');
lines.push(' * 用法：cd scripts && node extract_players.cjs > ../src/game/prg/data/tables/player-stats.ts');
lines.push(' */');
lines.push('');
lines.push('import type { PlayerProfile } from \'\'../../code/player/PlayerQueryService\'\';');
lines.push('');
lines.push('export interface PlayerColorEntry {');
lines.push('  readonly skin: number;');
lines.push('  readonly hair: number;');
lines.push('  readonly shirt: number;');
lines.push('  readonly shorts: number;');
lines.push('}');
lines.push('');
lines.push('export interface PlayerGkEntry {');
lines.push('  readonly stamina: number;');
lines.push('  readonly pass: number;');
lines.push('  readonly catching: number;');
lines.push('  readonly punching: number;');
lines.push('  readonly vsShot: number;');
lines.push('  readonly vsDribble: number;');
lines.push('}');
lines.push('');

// 1) PLAYER_TABLE（明星 0x01-0x2D）
lines.push('/** 球员档案表（明星 0x01-0x2D 共 45 项，杂鱼不在此表） */');
lines.push('export const PLAYER_TABLE: ReadonlyArray<PlayerProfile> = [');
const GK_IDS = new Set([0x02, 0x0F, 0x21, 0x22, 0x26]);
for (let id = 1; id <= PLAYER_ID_MAX; id++) {
  const name = NAMES[id] || `Player${id.toString(16).toUpperCase()}`;
  const isGk = GK_IDS.has(id);
  // club 由 §7 推断（粗略），后续 scripts/extract_teams 修正
  let club = 0;
  if (id >= 0x01 && id <= 0x15) club = 1; // 日本高中
  else if (id >= 0x16 && id <= 0x1F) club = 2; // 日本杯
  else if (id >= 0x20 && id <= 0x2D) club = 3; // 世界杯
  let stats;
  if (isGk) {
    const g = readGkStats(id);
    stats = `shot:0, dribble:0, pass:${g.pass}, tackle:0, speed:0, stamina:${g.stamina}`;
  } else {
    const s = readStats(id);
    stats = `shot:${s.shot}, dribble:${s.dribble}, pass:${s.pass}, tackle:${s.tackle}, speed:0, stamina:${s.stamina}`;
  }
  lines.push(`  { id: 0x${id.toString(16).toUpperCase()}, name: '${name}', club: ${club}, position: ${isGk ? 1 : 0}, ${stats} },`);
}
lines.push('];');
lines.push('');

// 2) 颜色表
lines.push('/** 球员颜色（明星 ROM 0x2b821 + idx*5） */');
lines.push('export const PLAYER_COLOR_TABLE: ReadonlyArray<PlayerColorEntry & { readonly id: number }> = [');
for (let id = 1; id <= PLAYER_ID_MAX; id++) {
  const c = readColor(id, true);
  lines.push(`  { id: 0x${id.toString(16).toUpperCase()}, skin: 0x${c.skin.toString(16).padStart(2,'0')}, hair: 0x${c.hair.toString(16).padStart(2,'0')}, shirt: 0x${c.shirt.toString(16).padStart(2,'0')}, shorts: 0x${c.shorts.toString(16).padStart(2,'0')} },`);
}
lines.push('];');
lines.push('');

// 3) GK 能力值
lines.push('/** GK 能力值（ROM 0x3ae96 + idx*8） */');
lines.push('export const GK_STATS_TABLE: ReadonlyArray<PlayerGkEntry & { readonly id: number }> = [');
for (const id of [0x02, 0x0F, 0x21, 0x22, 0x26]) {
  const g = readGkStats(id);
  const name = NAMES[id] || `GK${id.toString(16)}`;
  lines.push(`  { id: 0x${id.toString(16).toUpperCase()}, stamina: ${g.stamina}, pass: ${g.pass}, catching: ${g.catch_}, punching: ${g.punch}, vsShot: ${g.vsShot}, vsDribble: ${g.vsDrib} }, // ${name}`);
}
lines.push('];');
lines.push('');

// 4) 头型（仅 0..17 共 18 个模板）
lines.push('/** 球员头型（ROM 0x28901 + idx，18 个模板） */');
lines.push('export const PLAYER_HAIR_TABLE: ReadonlyArray<number> = [');
const hairTemplates = [];
for (let i = 0; i < 18; i++) hairTemplates.push(readHair(i));
lines.push(`  ${hairTemplates.map((h) => '0x' + h.toString(16).padStart(2,'0')).join(', ')},`);
lines.push('];');
lines.push('');

// 5) 杂鱼颜色（ROM 0x2b6d7）
lines.push('/** 杂鱼颜色（ROM 0x2b6d7 + idx*5） */');
lines.push('export const NAMED_PLAYER_COLOR_TABLE: ReadonlyArray<PlayerColorEntry & { readonly id: number }> = [');
for (let id = 1; id <= PLAYER_ID_MAX; id++) {
  const c = readColor(id, false);
  lines.push(`  { id: 0x${id.toString(16).toUpperCase()}, skin: 0x${c.skin.toString(16).padStart(2,'0')}, hair: 0x${c.hair.toString(16).padStart(2,'0')}, shirt: 0x${c.shirt.toString(16).padStart(2,'0')}, shorts: 0x${c.shorts.toString(16).padStart(2,'0')} },`);
}
lines.push('];');
lines.push('');

process.stdout.write(lines.join('\n') + '\n');
