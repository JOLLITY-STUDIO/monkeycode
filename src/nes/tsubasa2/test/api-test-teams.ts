/**
 * api-test-teams.ts — 交互式球队浏览器 (HTML table)
 *
 * 浏览器: test/teams.html
 * Node  : node test/api-test-teams-bundle.cjs
 */
import { TEAM_TABLE as TEAM_TABLE_EXTRACTED, TEAMS_FULL as TEAM_ROSTER_TABLE, findTeamById, findRosterById } from '../src/game/prg/data/tables/team-table';
import { findPlayerById } from '../src/game/prg/data/tables/player-table';
import { PLAYER_NAMES_JP } from '../src/game/prg/data/tables/player-names-jp';

function listAllTeamIds(): number[] {
  const ids = new Set<number>();
  for (const r of TEAM_ROSTER_TABLE) ids.add(r.id);
  for (const t of TEAM_TABLE_EXTRACTED) ids.add(t.id);
  return [...ids].sort((a, b) => a - b);
}

// Node: 文本版简洁输出
function API_ALL_TEAMS_TEXT(): string {
  const ids = listAllTeamIds();
  const lines: string[] = [];
  lines.push('ID     NAME            TYPE     FORMATION  TACTIC    N');
  lines.push('---------------------------------------------------------------');
  for (const id of ids) {
    const team: any = findTeamById(id);
    const roster: any = findRosterById(id);
    const name = (team?.name ?? roster?.name ?? '?').padEnd(14);
    const type = (roster?.type ?? 'cpu').padEnd(8);
    const formation = (roster?.formation ?? '-').padEnd(10);
    const tactic = (roster?.tactic ?? '-').padEnd(9);
    const n = (roster?.players?.length ?? 0) + 'p';
    lines.push(`0x${id.toString(16).padStart(2,'0').toUpperCase()}  ${name} ${type} ${formation} ${tactic} ${n}`);
  }
  lines.push('---------------------------------------------------------------');
  lines.push(`TOTAL: ${ids.length} teams`);
  return lines.join('\n');
}

// HTML table 版本
function buildAllTeamsTable(): string {
  const ids = listAllTeamIds();
  const rows: string[] = [];
  rows.push('<table class="teams"><thead><tr>');
  rows.push('<th>ID</th><th>Name</th><th>Type</th><th>Formation</th><th>Tactic</th><th>N</th>');
  rows.push('</tr></thead><tbody>');
  for (const id of ids) {
    const team: any = findTeamById(id);
    const roster: any = findRosterById(id);
    rows.push(`<tr data-team-id="${id}">`);
    rows.push(`<td class="id">0x${id.toString(16).padStart(2,'0').toUpperCase()}</td>`);
    rows.push(`<td>${(team?.name ?? roster?.name ?? '?')}</td>`);
    rows.push(`<td>${(roster?.type ?? 'cpu')}</td>`);
    rows.push(`<td>${(roster?.formation ?? '-')}</td>`);
    rows.push(`<td>${(roster?.tactic ?? '-')}</td>`);
    rows.push(`<td>${roster?.players?.length ?? 0}</td>`);
    rows.push(`</tr>`);
  }
  rows.push('</tbody></table>');
  return rows.join('');
}

function buildRosterTable(teamId: number): string {
  const team: any = findTeamById(teamId);
  const roster: any = findRosterById(teamId);
  if (!team && !roster) return `<div class="err">Team 0x${teamId.toString(16).padStart(2,'0').toUpperCase()} NOT FOUND</div>`;
  const teamName = (team?.name ?? roster?.name ?? '?').toUpperCase();
  const rows: string[] = [];
  rows.push(`<h2>${teamName} <span class="id">0x${teamId.toString(16).padStart(2,'0').toUpperCase()}</span></h2>`);
  rows.push(`<div class="meta">Type: ${roster?.type ?? 'cpu'} · Formation: ${roster?.formation ?? '-'} · Tactic: ${roster?.tactic ?? '-'} · ${roster?.players?.length ?? 0} players</div>`);
  rows.push('<table class="roster"><thead><tr>');
  rows.push('<th>#</th><th>ID</th><th>Name (EN)</th><th>名前 (JA)</th><th>名稱 (ZH)</th><th>POS</th><th>SHOT</th><th>PASS</th><th>DRB</th><th>BLK</th><th>TKL</th><th>ITC</th><th>STM</th>');
  rows.push('</tr></thead><tbody>');
  const players = roster?.players ?? [];
  players.forEach((pid: number, i: number) => {
    const p: any = findPlayerById(pid);
    const pos = p ? ((p.position ?? 0) === 1 ? 'GK' : 'FW') : '-';
    const np = PLAYER_NAMES_JP[pid];
    rows.push(`<tr><td>${i + 1}</td><td class="id">0x${pid.toString(16).padStart(2,'0').toUpperCase()}</td>`);
    if (p) {
      rows.push(`<td>${p.name ?? '?'}</td><td>${np?.ja ?? '?'}</td><td>${np?.zh ?? '?'}</td>`);
      rows.push(`<td class="pos-${pos.toLowerCase()}">${pos}</td>`);
      rows.push(`<td>${p.shot ?? 0}</td><td>${p.pass ?? 0}</td><td>${p.dribble ?? 0}</td>`);
      rows.push(`<td>${p.block ?? 0}</td><td>${p.tackle ?? 0}</td><td>${p.intercept ?? 0}</td><td>${p.stamina ?? 0}</td>`);
    } else {
      rows.push(`<td>???</td><td>???</td><td>???</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td>`);
    }
    rows.push('</tr>');
  });
  rows.push('</tbody></table>');
  return rows.join('');
}

if (typeof process !== 'undefined' && process.stdout) {
  console.log(API_ALL_TEAMS_TEXT());
}

if (typeof document !== 'undefined') {
  const listEl = document.getElementById('team-list');
  const detailEl = document.getElementById('team-detail');
  if (listEl) {
    listEl.innerHTML = buildAllTeamsTable();
    listEl.querySelectorAll('tr[data-team-id]').forEach((tr) => {
      const id = parseInt((tr as HTMLElement).dataset.teamId || '0', 10);
      (tr as HTMLElement).onclick = () => {
        if (detailEl) detailEl.innerHTML = buildRosterTable(id);
        listEl.querySelectorAll('tr.selected').forEach(r => r.classList.remove('selected'));
        (tr as HTMLElement).classList.add('selected');
      };
    });
  }
}

export { buildAllTeamsTable, buildRosterTable, listAllTeamIds, API_ALL_TEAMS_TEXT };
