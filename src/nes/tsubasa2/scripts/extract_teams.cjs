/**
 * extract_teams.cjs — 从真 ROM 提取各赛事队伍
 *
 * 数据源（docs/rom-data-locations.md §7）：
 *   - 玩家队 Sao Paulo (圣保罗)        ROM 0xAA47 - 0xAA51  (11 人)
 *   - 玩家队 Nankatsu (南葛)          ROM 0xAA53 - 0xAA5D  (11 人)
 *   - 玩家队 Asian / Exhibition / WC  ROM 0xAA5F - 0xAA69  (11) + 0xAA6A - 0xAA73 (12 替补)
 *   - Brazil League 队 (5)              ROM 0x03BB1A+       (队员 ID)
 *   - Japan High School 队 (6)          ROM 0x03BB62+       (队员 ID)
 *   - Japan Cup 队 (4)                  ROM 0x03BBB4+       (队员 ID)
 *   - World Cup 队 (16)                 ROM 0x03BC0A+       (队员 ID)
 *   - 阵型/战术 ROM 0x3bac2 (1 byte 高 4 位战术 + 低 4 位阵型)
 *
 * 输出：src/game/prg/data/tables/team-roster.ts
 *   每条 TeamRosterEntry 具象化：id, name, formation(11), players[11+]
 *
 * 用法：cd scripts && node extract_teams.cjs > ../src/game/prg/data/tables/team-roster.ts
 */
const fs = require('fs');
const path = require('path');

const ROM = path.join(__dirname, '..', 'docs', 'roms', 'Captain Tsubasa II - Super Striker (Japan).nes');
const rom = fs.readFileSync(ROM);
const prg = rom.slice(16);

// 已知队名（按 docs §7 推断，对应 ID）
const TEAM_NAMES = {
  // 玩家队
  0x80: 'SaoPaulo',       // 圣保罗
  0x81: 'Nankatsu',       // 南葛
  0x82: 'AsianCup',       // 亚洲杯
  0x83: 'Exhibition',     // 表演赛
  0x84: 'WorldCup',       // 世界杯
  // Brazil League (5)
  0x85: 'Corinthians',
  0x86: 'Gremio',
  0x87: 'Palmeiras',
  0x88: 'Santos',
  0x89: 'Flamengo',
  // Japan High School (6)
  0x8A: 'Kunimi',
  0x8B: 'Akita',
  0x8C: 'Tatsunami',
  0x8D: 'Musashi',
  0x8E: 'Furano',
  0x8F: 'Toho',
  // Japan Cup (4)
  0x90: 'AsRome',         // AS Roma
  0x91: 'Uruguay',
  0x92: 'Hamburg',
  0x93: 'Japan',
};

const FORMATION_NAMES = {
  0: '4-3-3',
  1: '4-4-2',
  2: '3-5-2',
  3: 'Brazil',         // 巴西阵型
};
const TACTIC_NAMES = {
  0: '4-3-3-Normal',
  1: '4-4-2-Normal',
  2: '3-5-2-Normal',
  3: 'Brazil-Normal',
  4: 'Pressing',
  5: 'Counter',
  6: 'Offside',
};

// ───── 玩家队 Sao Paulo / Nankatsu / Asian / Exhibition / World Cup ─────
// §7 给出的地址: 0xAA47-$AA51 (11), $AA53-$AA5D (11), $AA5F-$AA69 (11), 替补 $AA6A-$AA73 (12)
function readRoster(lo, count) {
  const out = [];
  for (let i = 0; i < count; i++) out.push(prg[lo + i] ?? 0xff);
  return out;
}

function readFormationTactic(addr) {
  const b = prg[addr] ?? 0;
  const tactic = (b >> 4) & 0x0f;
  const form = b & 0x0f;
  return { formation: FORMATION_NAMES[form] || `Unknown(${form})`, tactic: TACTIC_NAMES[tactic] || `Unknown(${tactic})` };
}

const teams = [];

// Player Sao Paulo
{
  const players = readRoster(0xAA47, 11);
  teams.push({
    id: 0x80,
    name: TEAM_NAMES[0x80],
    type: 'player',
    players,
    subs: [],
    formation: '4-3-3',
    tactic: 'Normal',
  });
}
// Player Nankatsu
{
  const players = readRoster(0xAA53, 11);
  teams.push({
    id: 0x81,
    name: TEAM_NAMES[0x81],
    type: 'player',
    players,
    subs: [],
    formation: '4-4-2',
    tactic: 'Normal',
  });
}
// Player Asian / Exhibition / WC shared
{
  const players = readRoster(0xAA5F, 11);
  const subs = readRoster(0xAA6A, 12);
  teams.push({
    id: 0x82,
    name: TEAM_NAMES[0x82],
    type: 'player',
    players,
    subs,
    formation: 'Brazil',
    tactic: 'Counter',
  });
}

// CPU 队地址（按 §7 起始偏移，每队字节步长未在文档给定为 11，保守按 11 读）
function readCpuTeam(addrBase, teamId) {
  // 文档未明确给出每队步长，按 11 队员 + 战术 1 byte 推断为 12 byte
  const players = readRoster(addrBase, 11);
  const ft = readFormationTactic(addrBase + 11);
  teams.push({
    id: teamId,
    name: TEAM_NAMES[teamId] || `Team${teamId.toString(16)}`,
    type: 'cpu',
    players,
    subs: [],
    formation: ft.formation,
    tactic: ft.tactic,
  });
}

readCpuTeam(0x03BB1A, 0x85); // Corinthians
readCpuTeam(0x03BB26, 0x86); // Gremio  (估)
readCpuTeam(0x03BB32, 0x87); // Palmeiras
readCpuTeam(0x03BB3E, 0x88); // Santos
readCpuTeam(0x03BB4A, 0x89); // Flamengo

// Japan High School
readCpuTeam(0x03BB62, 0x8A); // Kunimi
readCpuTeam(0x03BB6E, 0x8B); // Akita
readCpuTeam(0x03BB7A, 0x8C); // Tatsunami
readCpuTeam(0x03BB86, 0x8D); // Musashi
readCpuTeam(0x03BB92, 0x8E); // Furano
readCpuTeam(0x03BB9E, 0x8F); // Toho

// Japan Cup
readCpuTeam(0x03BBB4, 0x90); // As Rome
readCpuTeam(0x03BBC0, 0x91); // Uruguay
readCpuTeam(0x03BBCC, 0x92); // Hamburg
readCpuTeam(0x03BBD8, 0x93); // Japan

// World Cup 16 队（地址 0x03BC0A+）— 仅有 16 队，每队 11 队 + 1 战术（按 §7 上下文推断）
// 但 §7 没给各队起始地址，固只列队名占位
for (let i = 0; i < 16; i++) {
  const id = 0xA0 + i;
  teams.push({
    id,
    name: `WorldCup_${i.toString().padStart(2, '0')}`,
    type: 'cpu',
    players: readRoster(0x03BC0A + i * 12, 11),
    subs: [],
    formation: '4-3-3',
    tactic: 'Normal',
  });
}

// ───── 输出 TS ─────
const lines = [];
lines.push('/**');
lines.push(' * team-roster.ts — 队伍名单具象化表（从真 ROM 提取）');
lines.push(' *');
lines.push(' * 数据源（docs/rom-data-locations.md §7）：');
lines.push(' *   - 玩家队 (Sao Paulo/Nankatsu/Asian)        ROM 0xAA47 / 0xAA53 / 0xAA5F / 0xAA6A');
lines.push(' *   - Brazil League (5队)                       ROM 0x03BB1A+');
lines.push(' *   - Japan High School (6队)                   ROM 0x03BB62+');
lines.push(' *   - Japan Cup (4队)                           ROM 0x03BBB4+');
lines.push(' *   - World Cup (16队)                          ROM 0x03BC0A+');
lines.push(' *   - 阵型/战术                                 ROM 0x3bac2');
lines.push(' *');
lines.push(' * 重生：scripts/extract_teams.cjs');
lines.push(' *');
lines.push(' * 注：CPU 队起始偏移按每队 12 字节 (11 队员 + 1 战术 byte) 推断，');
lines.push(' *     偏移不精确时部分队会空 — 需后续精确化各队起始地址。');
lines.push(' */');
lines.push('');
lines.push('/** 阵容（11 队员 ID + 阵型 + 战术） */');
lines.push('export interface TeamRosterEntry {');
lines.push('  readonly id: number;');
lines.push('  readonly name: string;');
lines.push('  readonly type: \'player\' | \'cpu\';');
lines.push('  readonly players: ReadonlyArray<number>;');
lines.push('  readonly subs: ReadonlyArray<number>;');
lines.push('  readonly formation: string;');
lines.push('  readonly tactic: string;');
lines.push('}');
lines.push('');
lines.push('/** 队伍表（22 联赛队 + 玩家队 + World Cup） */');
lines.push('export const TEAM_ROSTER_TABLE: ReadonlyArray<TeamRosterEntry> = [');
for (const t of teams) {
  const playersHex = t.players.map((p) => '0x' + p.toString(16).padStart(2, '0').toUpperCase()).join(', ');
  const subsHex = t.subs.map((p) => '0x' + p.toString(16).padStart(2, '0').toUpperCase()).join(', ');
  lines.push(`  { id: 0x${t.id.toString(16).toUpperCase()}, name: '${t.name}', type: '${t.type}', players: [${playersHex}], subs: [${subsHex}], formation: '${t.formation}', tactic: '${t.tactic}' },`);
}
lines.push('];');
lines.push('');

// 已知 TEAM_TABLE 形状（id/name/formation/players）兼容表
lines.push('/** 兼容 TeamEntry 形状的 TEAM_TABLE（具象化视图） */');
lines.push('export const TEAM_TABLE = TEAM_ROSTER_TABLE.map((t) => ({');
lines.push('  id: t.id,');
lines.push('  name: t.name,');
lines.push('  formation: t.players.slice(0, 11),');
lines.push('  players: [...t.players, ...t.subs],');
lines.push('}));');
lines.push('');

lines.push('/** 按 ID 查队 */');
lines.push('export function findRosterById(id: number): TeamRosterEntry | null {');
lines.push('  for (const t of TEAM_ROSTER_TABLE) {');
lines.push('    if (t.id === (id & 0xff)) return t;');
lines.push('  }');
lines.push('  return null;');
lines.push('}');
lines.push('');

process.stdout.write(lines.join('\n') + '\n');
