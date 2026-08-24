/**
 * api-test-teams.ts — 交互式球队浏览器
 *
 * 浏览器侧:
 *   test/teams.html  → 左侧列出全部 22+ 联赛 + 世界杯
 *                    → 点击队名, 右侧显示 11 人 roster + 属性
 *
 * Node 侧:
 *   node test/api-test-teams-bundle.cjs → 输出全部球队的 ID 列表
 */
import { TEAM_TABLE as TEAM_TABLE_EXTRACTED, TEAMS_FULL as TEAM_ROSTER_TABLE, findTeamById, findRosterById } from '../src/game/prg/data/tables/team-table';
import { findPlayerById } from '../src/game/prg/data/tables/player-table';
import { PLAYER_TABLE } from '../src/game/prg/data/tables/player-table';

const W = 80;
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

// 把所有球队 id 整理出来
function listAllTeamIds(): number[] {
  const ids = new Set<number>();
  for (const r of TEAM_ROSTER_TABLE) ids.add(r.id);
  for (const t of TEAM_TABLE_EXTRACTED) ids.add(t.id);
  return [...ids].sort((a, b) => a - b);
}

// 球队摘要行
function summarizeTeam(teamId: number): string {
  const team: any = findTeamById(teamId);
  const roster = findRosterById(teamId);
  if (!team && !roster) return `0x${teamId.toString(16).padStart(2,'0').toUpperCase()}  ??? (no data)`;
  const name = (team?.name ?? roster?.name ?? '?').padEnd(11);
  const type = (roster?.type ?? 'cpu').padEnd(7);
  const formation = (roster?.formation ?? '-').padEnd(7);
  const tactic = (roster?.tactic ?? '-').padEnd(8);
  const players = roster?.players?.length ?? 0;
  return `0x${teamId.toString(16).padStart(2,'0').toUpperCase()}  ${name}  ${type}  ${formation}  ${tactic}  ${players}p`;
}

function API_ALL_TEAMS(): string {
  const lines: string[] = [];
  lines.push(sep);
  lines.push('  GET /api/teams — ALL TEAMS (player + cpu)');
  lines.push(sep);
  lines.push(`  ${'ID'.padEnd(6)}  ${'NAME'.padEnd(11)}  ${'TYPE'.padEnd(7)}  ${'FORMA'.padEnd(7)}  ${'TACTIC'.padEnd(8)}  ${'N'}`);
  lines.push(sep2);
  const ids = listAllTeamIds();
  for (const id of ids) {
    lines.push('  ' + summarizeTeam(id));
  }
  lines.push(sep);
  lines.push(` TOTAL: ${ids.length} teams`);
  return lines.join('\n');
}

function API_TEAM_DETAIL(teamId: number): string {
  const team: any = findTeamById(teamId);
  const roster: any = findRosterById(teamId);
  const lines: string[] = [];
  const teamName = (team?.name ?? roster?.name ?? '?').toUpperCase();
  lines.push(sep);
  lines.push(`  GET /api/team/0x${teamId.toString(16).padStart(2,'0').toUpperCase()}/roster — ${teamName}`);
  lines.push(sep);
  lines.push(` Team       : ${team?.name ?? roster?.name ?? '?'}`);
  lines.push(` Type       : ${roster?.type ?? 'cpu'}`);
  lines.push(` Formation  : ${roster?.formation ?? '-'}`);
  lines.push(` Tactic     : ${roster?.tactic ?? '-'}`);
  lines.push(` Roster     : ${roster?.players?.length ?? 0} players`);
  if (roster?.subs?.length) {
    lines.push(` Subs       : ${roster.subs.length}`);
  }
  lines.push(sep2);
  lines.push(row(
    { s: '#', w: 3 },
    { s: 'ID', w: 6 },
    { s: 'NAME', w: 14 },
    { s: 'POS', w: 4 },
    { s: 'SHOT', w: 5, a: 'right' },
    { s: 'PASS', w: 5, a: 'right' },
    { s: 'DRB', w: 5, a: 'right' },
    { s: 'BLK', w: 5, a: 'right' },
    { s: 'TKL', w: 5, a: 'right' },
    { s: 'ITC', w: 5, a: 'right' },
    { s: 'STM', w: 5, a: 'right' },
  ));
  lines.push(sep2);
  const players = roster?.players ?? [];
  players.forEach((pid: number, i: number) => {
    const p: any = findPlayerById(pid);
    const pos = p ? ((p.position ?? 0) === 1 ? 'GK' : 'FW') : '-';
    lines.push(row(
      { s: (i + 1).toString(), w: 3 },
      { s: '0x' + pid.toString(16).padStart(2, '0').toUpperCase(), w: 6 },
      { s: p?.name ?? '???', w: 14 },
      { s: pos, w: 4 },
      { s: p ? (p.shot ?? 0).toString() : '-', w: 5, a: 'right' },
      { s: p ? (p.pass ?? 0).toString() : '-', w: 5, a: 'right' },
      { s: p ? (p.dribble ?? 0).toString() : '-', w: 5, a: 'right' },
      { s: p ? (p.block ?? 0).toString() : '-', w: 5, a: 'right' },
      { s: p ? (p.tackle ?? 0).toString() : '-', w: 5, a: 'right' },
      { s: p ? (p.intercept ?? 0).toString() : '-', w: 5, a: 'right' },
      { s: p ? (p.stamina ?? 0).toString() : '-', w: 5, a: 'right' },
    ));
  });
  return lines.join('\n');
}

// Node 输出全部球队列表
if (typeof process !== 'undefined' && process.stdout) {
  console.log(API_ALL_TEAMS());
}

// 浏览器: 渲染左侧球队列表 + 右侧 roster 详情
if (typeof document !== 'undefined') {
  const listEl = document.getElementById('team-list');
  const detailEl = document.getElementById('team-detail');
  if (listEl) {
    const ids = listAllTeamIds();
    const lines = API_ALL_TEAMS().split('\n');
    listEl.innerHTML = lines
      .map(line => `<div class="line">${line.replace(/ /g, '&nbsp;')}</div>`)
      .join('');
    // 仅 "0xNN  ..." 开头的行才是 team 行,绑定点击
    listEl.querySelectorAll('div.line').forEach((div) => {
      const text = div.textContent || '';
      const m = text.match(/^0x([0-9A-Fa-f]{2})\b/);
      if (!m) return; // 非 team 行
      const id = parseInt(m[1], 16);
      if (!ids.includes(id)) return;
      const el = div as HTMLDivElement;
      el.classList.add('clickable');
      el.dataset.teamId = id.toString();
      el.onclick = () => {
        if (detailEl) detailEl.innerHTML = API_TEAM_DETAIL(id)
          .split('\n')
          .map(l => `<div class="line">${l.replace(/ /g, '&nbsp;')}</div>`)
          .join('');
        listEl.querySelectorAll('div.line.selected').forEach(d => d.classList.remove('selected'));
        el.classList.add('selected');
      };
    });
  }
}

export { API_ALL_TEAMS, API_TEAM_DETAIL, listAllTeamIds };
