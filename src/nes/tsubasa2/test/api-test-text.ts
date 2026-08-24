/**
 * 天使之翼2 文本 API 测试（不画 Canvas，纯文本查询）
 *
 * 跑法：
 *   - Node: node test/api-test-text-bundle.cjs
 *   - 浏览器：test/api-test-text.html → <pre> 输出
 */
import { DataStore } from '../src/game/prg/data/store/DataStore';
import { findPlayerById, findPlayersByTeam, findPlayerNameById, PLAYER_TABLE } from '../src/game/prg/data/tables/player-table';
import { findLevelByExp, findLevelById, LEVEL_UP_TABLE } from '../src/game/prg/data/tables/levelup-table';
import { findTeamById, findTeamNameById, findRosterById, TEAMS_FULL } from '../src/game/prg/data/tables/team-table';
import { findSkillByMoveId, findSkillsByPlayer, SKILL_TABLE } from '../src/game/prg/data/tables/skill-table';
import { getMatchConfig, MATCH_CONFIG_TABLE } from '../src/game/prg/data/tables/match-config-table';

// ─────────────────────────── 文本表格工具 ───────────────────────────

const W = 100;       // 总宽加大避免换行
const sep = '='.repeat(W);
const sep2 = '-'.repeat(W);

function pad(s: string | null | undefined, w: number, align: 'left' | 'right' = 'left'): string {
  const ss = s == null ? '' : String(s);
  const len = [...ss].length;
  if (len >= w) return ss.slice(0, w);
  const fill = ' '.repeat(w - len);
  return align === 'left' ? ss + fill : fill + ss;
}

function row(...cols: { s: string | number | null | undefined; w: number; a?: 'left' | 'right' }[]): string {
  return '| ' + cols.map(c => pad(String(c.s ?? ''), c.w, c.a || 'left')).join(' | ') + ' |';
}

function header(title: string): string {
  const t = ` ${title} `;
  const left = Math.floor((W - t.length) / 2);
  const right = W - t.length - left;
  return '='.repeat(left) + t + '='.repeat(right);
}

// ─────────────────────────── API 端点 ───────────────────────────

function API_PLAYERS(): string {
  const lines: string[] = [];
  lines.push(header('GET /api/players — 全部 45 明星'));
  lines.push(row(
    { s: 'ID', w: 6 },
    { s: 'NAME', w: 16 },
    { s: 'STM', w: 5, a: 'right' },
    { s: 'PAS', w: 5, a: 'right' },
    { s: 'SH', w: 5, a: 'right' },
    { s: 'DRB', w: 5, a: 'right' },
    { s: 'SP', w: 5, a: 'right' },
    { s: 'TC', w: 5, a: 'right' },
    { s: 'PO', w: 5, a: 'right' },
    { s: 'TEAM', w: 14 },
    { s: 'POS', w: 5 },
  ));
  lines.push(sep2);
  let totalCount = 0;
  for (const p of PLAYER_TABLE) {
    if (!p) continue;
    totalCount++;
    const team = findTeamNameById(p.teamId) ?? '?';
    const id = p.id ?? 0;
    const name = p.name ?? '?';
    lines.push(row(
      { s: '0x' + id.toString(16).padStart(2, '0').toUpperCase(), w: 6 },
      { s: name, w: 16 },
      { s: (p.stamina ?? 0).toString(), w: 5, a: 'right' },
      { s: (p.passing ?? 0).toString(), w: 5, a: 'right' },
      { s: (p.shoot ?? 0).toString(), w: 5, a: 'right' },
      { s: (p.dribble ?? 0).toString(), w: 5, a: 'right' },
      { s: (p.speed ?? 0).toString(), w: 5, a: 'right' },
      { s: (p.technique ?? 0).toString(), w: 5, a: 'right' },
      { s: (p.power ?? 0).toString(), w: 5, a: 'right' },
      { s: team, w: 14 },
      { s: p.position ?? '?', w: 5 },
    ));
  }
  lines.push(sep2);
  lines.push(` TOTAL: ${totalCount} players`);
  return lines.join('\n');
}

function API_PLAYER_DETAIL(id: number): string {
  const p = findPlayerById(id);
  if (!p) return `Player 0x${id.toString(16).padStart(2, '0')} NOT FOUND`;
  const lines: string[] = [];
  const pid = p.id ?? 0;
  const teamName = findTeamNameById(p.teamId ?? 0) ?? '?';
  const teamIdHex = (p.teamId ?? 0).toString(16).padStart(2, '0').toUpperCase();
  lines.push(header(`GET /api/player/0x${pid.toString(16).padStart(2, '0').toUpperCase()} — ${p.name ?? '?'} 档案`));
  lines.push(sep2);
  lines.push(` ID       = 0x${pid.toString(16).padStart(2, '0').toUpperCase()}`);
  lines.push(` Name     = ${p.name ?? '?'}`);
  lines.push(` Position = ${p.position ?? '?'}    Team = ${teamName} (0x${teamIdHex})`);
  lines.push(` Number   = #${p.number ?? '?'}`);
  lines.push(sep2);
  lines.push(' 6 ABILITY BARS:');
  const max = 31;
  function bar(v: number): string {
    const n = Math.min(max, Math.max(0, v));
    return '[' + '#'.repeat(n) + '.'.repeat(max - n) + '] ' + v.toString().padStart(2, '0');
  }
  const sho = p.shoot ?? 0, pas = p.passing ?? 0, dri = p.dribble ?? 0;
  const spd = p.speed ?? 0, tec = p.technique ?? 0, pwr = p.power ?? 0, sta = p.stamina ?? 0;
  lines.push(`   SHOT    : ${bar(sho)}`);
  lines.push(`   PASS    : ${bar(pas)}`);
  lines.push(`   DRIBBLE : ${bar(dri)}`);
  lines.push(`   SPEED   : ${bar(spd)}`);
  lines.push(`   TECHNIC : ${bar(tec)}`);
  lines.push(`   POWER   : ${bar(pwr)}`);
  lines.push(`   STAMINA : ${bar(sta)}`);
  lines.push(sep2);
  const skills = findSkillsByPlayer(id);
  lines.push(` SKILLS  : ${skills.length}`);
  skills.forEach((sid, i) => {
    const sk = findSkillByMoveId(sid);
    lines.push(`   [${(i + 1).toString().padStart(2, '0')}] 0x${sid.toString(16).padStart(2, '0').toUpperCase()} ${sk?.name ?? '?'} (威力 ${sk?.power ?? '?'})`);
  });
  return lines.join('\n');
}

function API_TEAM(teamId: number): string {
  const team: any = findTeamById(teamId);
  if (!team) return `Team 0x${teamId.toString(16).padStart(2, '0')} NOT FOUND`;
  const roster = findRosterById(teamId);
  const ids = roster?.players ?? [];
  const lines: string[] = [];
  lines.push(header(`GET /api/team/0x${teamId.toString(16).padStart(2, '0').toUpperCase()}/roster — ${team.name ?? '?'}`));
  lines.push(sep2);
  lines.push(` Team      : ${team.name ?? '?'}`);
  lines.push(` Type      : ${roster?.type ?? 'cpu'}`);
  lines.push(` Formation : ${roster?.formation ?? '?'}`);
  lines.push(` Tactic    : ${roster?.tactic ?? '?'}`);
  lines.push(` Roster    : ${ids.length} players`);
  lines.push(sep2);
  lines.push(row(
    { s: '#', w: 3 },
    { s: 'ID', w: 6 },
    { s: 'NAME', w: 16 },
    { s: 'POS', w: 5 },
    { s: 'SH', w: 3, a: 'right' },
    { s: 'PA', w: 3, a: 'right' },
    { s: 'DR', w: 3, a: 'right' },
    { s: 'SP', w: 3, a: 'right' },
    { s: 'TC', w: 3, a: 'right' },
    { s: 'PO', w: 3, a: 'right' },
    { s: 'ST', w: 3, a: 'right' },
  ));
  lines.push(sep2);
  ids.forEach((pid, i) => {
    const p = findPlayerById(pid);
    if (!p) return;
    lines.push(row(
      { s: (i + 1).toString(), w: 3 },
      { s: '0x' + pid.toString(16).padStart(2, '0').toUpperCase(), w: 6 },
      { s: p.name ?? '?', w: 16 },
      { s: p.position ?? '?', w: 5 },
      { s: (p.shoot ?? 0).toString(), w: 3, a: 'right' },
      { s: (p.passing ?? 0).toString(), w: 3, a: 'right' },
      { s: (p.dribble ?? 0).toString(), w: 3, a: 'right' },
      { s: (p.speed ?? 0).toString(), w: 3, a: 'right' },
      { s: (p.technique ?? 0).toString(), w: 3, a: 'right' },
      { s: (p.power ?? 0).toString(), w: 3, a: 'right' },
      { s: (p.stamina ?? 0).toString(), w: 3, a: 'right' },
    ));
  });
  return lines.join('\n');
}

function API_LEVEL_EXP(exp: number): string {
  const lv: any = findLevelByExp(exp);
  const lines: string[] = [];
  lines.push(header(`GET /api/level?exp=${exp}`));
  lines.push(sep2);
  if (!lv) {
    lines.push(` EXP ${exp} 超出范围`);
    return lines.join('\n');
  }
  lines.push(` Current Level : ${lv.level ?? '?'}`);
  lines.push(` Level Name    : ${lv.name ?? '???'}`);
  lines.push(` Exp to next   : ${lv.expToNext ?? '?'}`);
  lines.push(` Ability Max   : ${lv.abilityMax ?? '?'}`);
  lines.push(` Stamina Raw   : ${lv.staminaRaw ?? '?'}`);
  lines.push(sep2);
  lines.push(' 6 GROWTH BONUSES:');
  const caps = ['SHOT', 'PASS', 'DRIBBLE', 'SPEED', 'TECHNIC', 'POWER'];
  caps.forEach((cap, i) => {
    const v = lv[cap.toLowerCase()] ?? lv.growth?.[i] ?? 0;
    lines.push(`   ${cap.padEnd(8, ' ')} : +${v}`);
  });
  return lines.join('\n');
}

function API_MATCH_CONFIG(home: number, away: number): string {
  const cfg = getMatchConfig(home, away);
  const lines: string[] = [];
  lines.push(header(`GET /api/match/config?home=0x${home.toString(16).padStart(2, '0')}&away=0x${away.toString(16).padStart(2, '0')}`));
  lines.push(sep2);
  lines.push(` Home Team     : ${findTeamNameById(home)} (0x${home.toString(16).padStart(2, '0').toUpperCase()})`);
  lines.push(` Away Team     : ${findTeamNameById(away)} (0x${away.toString(16).padStart(2, '0').toUpperCase()})`);
  lines.push(` Half Length   : ${cfg.halfLength} min`);
  lines.push(` Total Duration: ${cfg.durationMinutes} min`);
  lines.push(` Max Substit   : ${cfg.maxSubstitutions}`);
  lines.push(` Injury Time   : ${cfg.injuryTime} min`);
  lines.push(` Extra Time    : ${cfg.extraTime ? 'YES' : 'NO'}`);
  lines.push(` Tournament    : ${cfg.tournament}`);
  lines.push(sep2);
  lines.push(' ALL MATCH CONFIGS:');
  lines.push(row(
    { s: 'H', w: 5 },
    { s: 'A', w: 5 },
    { s: 'TOURNAMENT', w: 14 },
    { s: 'HALF', w: 5, a: 'right' },
    { s: 'TOTAL', w: 6, a: 'right' },
    { s: 'SUB', w: 4, a: 'right' },
    { s: 'INJ', w: 4, a: 'right' },
    { s: 'ET', w: 3 },
  ));
  lines.push(sep2);
  for (const c of MATCH_CONFIG_TABLE) {
    if (!c) continue;
    lines.push(row(
      { s: '0x' + c.homeTeam.toString(16).padStart(2, '0').toUpperCase(), w: 5 },
      { s: '0x' + c.awayTeam.toString(16).padStart(2, '0').toUpperCase(), w: 5 },
      { s: c.tournament, w: 14 },
      { s: c.halfLength.toString(), w: 5, a: 'right' },
      { s: c.durationMinutes.toString(), w: 6, a: 'right' },
      { s: c.maxSubstitutions.toString(), w: 4, a: 'right' },
      { s: c.injuryTime.toString(), w: 4, a: 'right' },
      { s: c.extraTime ? 'Y' : '-', w: 3 },
    ));
  }
  return lines.join('\n');
}

function API_SKILLS(playerId: number): string {
  const ids = findSkillsByPlayer(playerId);
  const player = findPlayerById(playerId);
  const lines: string[] = [];
  lines.push(header(`GET /api/player/0x${playerId.toString(16).padStart(2, '0').toUpperCase()}/skills — ${player?.name ?? '?'} 技能`));
  lines.push(sep2);
  lines.push(` Player  : ${player?.name ?? '?'} (0x${playerId.toString(16).padStart(2, '0').toUpperCase()})`);
  lines.push(` Skill N : ${ids.length}`);
  lines.push(sep2);
  lines.push(row(
    { s: '#', w: 3 },
    { s: 'ID', w: 6 },
    { s: 'NAME', w: 22 },
    { s: 'POWER', w: 7, a: 'right' },
    { s: 'POWER BAR', w: 36 },
  ));
  lines.push(sep2);
  ids.forEach((sid, i) => {
    const sk = findSkillByMoveId(sid);
    if (!sk) return;
    const max = 30;
    const power = sk.power ?? 0;
    const fill = Math.min(max, Math.max(0, power));
    const bar = '[' + '#'.repeat(fill) + '.'.repeat(max - fill) + ']';
    lines.push(row(
      { s: (i + 1).toString(), w: 3 },
      { s: '0x' + sid.toString(16).padStart(2, '0').toUpperCase(), w: 6 },
      { s: sk.name ?? '?', w: 22 },
      { s: power.toString(), w: 7, a: 'right' },
      { s: bar, w: 36 },
    ));
  });
  lines.push(sep2);
  lines.push(` SKILL TABLE TOTAL: ${SKILL_TABLE.length}`);
  return lines.join('\n');
}

// ─────────────────────────── 跑全部断言 ───────────────────────────

function runAllAssertions(): { pass: number; fail: number; results: string[] } {
  const results: string[] = [];
  let pass = 0;
  let fail = 0;
  function assert(label: string, ok: boolean): void {
    if (ok) pass++;
    else fail++;
    results.push(` ${ok ? '[PASS]' : '[FAIL]'} ${label}`);
  }
  // 球员
  assert('Player 0x01 = Tsubasa', findPlayerNameById(0x01) === 'Tsubasa');
  assert('Player 0x02 = Ishizaki', findPlayerNameById(0x02) === 'Ishizaki');
  assert('PLAYER_TABLE ≥40 entries', PLAYER_TABLE.length >= 40);
  // 球队
  assert('Team 0x80 = Sao Paulo', findTeamNameById(0x80)?.includes('Sao Paulo') ?? false);
  assert('Sao Paulo roster ≥11', (findRosterById(0x80).length ?? 0) >= 11);
  // 等级
  const lv10 = findLevelByExp(3000);
  assert('EXP 3000 → Lv ≥ 5', (lv10?.level ?? 0) >= 5);
  assert('LEVEL_UP_TABLE ≥30 levels', LEVEL_UP_TABLE.length >= 30);
  // 技能
  assert('Tsubasa ≥1 skill', findSkillsByPlayer(0x01).length >= 1);
  // 比赛
  const cfg = getMatchConfig(0x80, 0x85);
  assert('Sao Paulo 半时 5min', cfg.halfLength === 5);
  assert('MATCH_CONFIG ≥20', MATCH_CONFIG_TABLE.length >= 20);
  return { pass, fail, results };
}

// ─────────────────────────── 主入口 ───────────────────────────

const ALL_OUTPUT = `
${API_PLAYERS()}

${API_PLAYER_DETAIL(0x01)}

${API_TEAM(0x80)}

${API_LEVEL_EXP(5000)}

${API_MATCH_CONFIG(0x80, 0x85)}

${API_SKILLS(0x01)}

${header('TEST ASSERTIONS')}
${((): string => {
  const r = runAllAssertions();
  return [
    ...r.results,
    sep2,
    ` 通过 ${r.pass} / 失败 ${r.fail}`,
  ].join('\n');
})()}
`;

// Node 环境
if (typeof process !== 'undefined' && process.stdout) {
  console.log(ALL_OUTPUT);
}

// 浏览器环境
if (typeof document !== 'undefined') {
  const summary = document.getElementById('summary');
  if (summary) {
    const r = runAllAssertions();
    summary.textContent = `通过 ${r.pass} / 失败 ${r.fail} — ${r.pass === 0 ? '全失败！' : (r.fail === 0 ? '全部通过 ✓' : '部分失败')}`;
    summary.style.color = r.fail === 0 ? '#7fdf7f' : '#df7f7f';
  }
  const pre = document.getElementById('output');
  if (pre) {
    pre.textContent = ALL_OUTPUT;
  }
}

export {
  API_PLAYERS,
  API_PLAYER_DETAIL,
  API_TEAM,
  API_LEVEL_EXP,
  API_MATCH_CONFIG,
  API_SKILLS,
  runAllAssertions,
};
