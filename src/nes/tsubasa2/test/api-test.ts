/**
 * 天使之翼2 独立 API 测试页（api-test.html 入口）
 *
 * 目标：把每个 Service 当 URL 风格 API 端点独立调用 + Canvas 渲染。
 * 不启动 HeadlessRuntime（不跑游戏逻辑），只查询数据表 + 渲染到 NES 256×240 画布。
 *
 * 跑法：
 *   - 浏览器打开 test/api-test.html → 4 个 Tab（球员列表 / 单个球员 / 球队 / 等级升级）
 *   - Node: tsc 编译后 require api-test-bundle.cjs
 */
import { DataStore } from '../src/game/prg/data/store/DataStore';
import { PlayerQueryService } from '../src/game/prg/code/player/PlayerQueryService';
import {
  findPlayerById, findPlayersByTeam, findPlayerNameById, PLAYER_TABLE,
} from '../src/game/prg/data/tables/player-table';
import {
  findLevelByExp, findLevelById, LEVEL_UP_TABLE,
} from '../src/game/prg/data/tables/levelup-table';
import {
  findTeamById, findTeamNameById, findRosterById, TEAMS_FULL,
} from '../src/game/prg/data/tables/team-table';
import {
  findSkillByMoveId, findSkillsByPlayer, SKILL_TABLE,
} from '../src/game/prg/data/tables/skill-table';
import { getMatchConfig, MATCH_CONFIG_TABLE } from '../src/game/prg/data/tables/match-config-table';

// ─────────────────────────── NES 调色板（标准 NES 64 色） ───────────────────────────

const NES_PALETTE: ReadonlyArray<readonly [number, number, number]> = [
  [0x54, 0x54, 0x54], [0x00, 0x1E, 0x74], [0x08, 0x10, 0x90], [0x30, 0x00, 0x88],
  [0x44, 0x00, 0x64], [0x5C, 0x00, 0x30], [0x54, 0x04, 0x00], [0x3C, 0x18, 0x00],
  [0x20, 0x2A, 0x00], [0x08, 0x3A, 0x00], [0x00, 0x40, 0x00], [0x00, 0x3C, 0x00],
  [0x00, 0x32, 0x3C], [0x00, 0x00, 0x00], [0x00, 0x00, 0x00], [0x00, 0x00, 0x00],
  [0x98, 0x96, 0x98], [0x08, 0x4C, 0xC4], [0x30, 0x32, 0xEC], [0x5C, 0x1E, 0xE4],
  [0x88, 0x14, 0xB0], [0xA0, 0x14, 0x64], [0x98, 0x22, 0x20], [0x78, 0x3C, 0x00],
  [0x54, 0x5A, 0x00], [0x28, 0x72, 0x00], [0x08, 0x7C, 0x00], [0x00, 0x76, 0x28],
  [0x00, 0x66, 0x78], [0x00, 0x00, 0x00], [0x00, 0x00, 0x00], [0x00, 0x00, 0x00],
  [0xEC, 0xEE, 0xEC], [0x4C, 0x9A, 0xEC], [0x78, 0x7C, 0xEC], [0xB0, 0x62, 0xEC],
  [0xE4, 0x54, 0xEC], [0xEC, 0x58, 0xB4], [0xEC, 0x6A, 0x64], [0xD4, 0x88, 0x20],
  [0xA0, 0xAA, 0x00], [0x74, 0xC4, 0x00], [0x4C, 0xD0, 0x20], [0x38, 0xCC, 0x6C],
  [0x38, 0xB4, 0xCC], [0x3C, 0x3C, 0x3C], [0x00, 0x00, 0x00], [0x00, 0x00, 0x00],
  [0xEC, 0xEE, 0xEC], [0xA8, 0xCC, 0xEC], [0xBC, 0xBC, 0xEC], [0xD4, 0xB2, 0xEC],
  [0xEC, 0xAE, 0xEC], [0xEC, 0xAE, 0xD4], [0xEC, 0xB4, 0xB0], [0xE4, 0xC4, 0x90],
  [0xCC, 0xD2, 0x78], [0xB4, 0xDE, 0x78], [0xA8, 0xE2, 0x90], [0x98, 0xE2, 0xB4],
  [0xA0, 0xD6, 0xE4], [0xA0, 0xA2, 0xA0], [0x00, 0x00, 0x00], [0x00, 0x00, 0x00],
];
const C = (idx: number): string => {
  const [r, g, b] = NES_PALETTE[idx & 0x3f];
  return `rgb(${r},${g},${b})`;
};

// NES 字体（简化 5×7 ASCII 字符表）
const FONT_W = 5;
const FONT_H = 7;
const FONT: Record<string, number[]> = {
  'A': [0x7E, 0x11, 0x11, 0x11, 0x7E], 'B': [0x7F, 0x49, 0x49, 0x49, 0x36],
  'C': [0x3E, 0x41, 0x41, 0x41, 0x22], 'D': [0x7F, 0x41, 0x41, 0x22, 0x1C],
  'E': [0x7F, 0x49, 0x49, 0x49, 0x41], 'F': [0x7F, 0x09, 0x09, 0x09, 0x01],
  'G': [0x3E, 0x41, 0x49, 0x49, 0x7A], 'H': [0x7F, 0x08, 0x08, 0x08, 0x7F],
  'I': [0x00, 0x41, 0x7F, 0x41, 0x00], 'J': [0x20, 0x40, 0x40, 0x40, 0x3F],
  'K': [0x7F, 0x08, 0x14, 0x22, 0x41], 'L': [0x7F, 0x40, 0x40, 0x40, 0x40],
  'M': [0x7F, 0x02, 0x0C, 0x02, 0x7F], 'N': [0x7F, 0x04, 0x08, 0x10, 0x7F],
  'O': [0x3E, 0x41, 0x41, 0x41, 0x3E], 'P': [0x7F, 0x09, 0x09, 0x09, 0x06],
  'Q': [0x3E, 0x41, 0x51, 0x21, 0x5E], 'R': [0x7F, 0x09, 0x19, 0x29, 0x46],
  'S': [0x46, 0x49, 0x49, 0x49, 0x31], 'T': [0x01, 0x01, 0x7F, 0x01, 0x01],
  'U': [0x3F, 0x40, 0x40, 0x40, 0x3F], 'V': [0x1F, 0x20, 0x40, 0x20, 0x1F],
  'W': [0x3F, 0x40, 0x38, 0x40, 0x3F], 'X': [0x63, 0x14, 0x08, 0x14, 0x63],
  'Y': [0x07, 0x08, 0x70, 0x08, 0x07], 'Z': [0x61, 0x51, 0x49, 0x45, 0x43],
  '0': [0x3E, 0x51, 0x49, 0x45, 0x3E], '1': [0x00, 0x42, 0x7F, 0x40, 0x00],
  '2': [0x42, 0x61, 0x51, 0x49, 0x46], '3': [0x21, 0x41, 0x45, 0x4B, 0x31],
  '4': [0x18, 0x14, 0x12, 0x7F, 0x10], '5': [0x27, 0x45, 0x45, 0x45, 0x39],
  '6': [0x3C, 0x4A, 0x49, 0x49, 0x30], '7': [0x01, 0x71, 0x09, 0x05, 0x03],
  '8': [0x36, 0x49, 0x49, 0x49, 0x36], '9': [0x06, 0x49, 0x49, 0x29, 0x1E],
  ' ': [0x00, 0x00, 0x00, 0x00, 0x00], ':': [0x00, 0x36, 0x36, 0x00, 0x00],
  '.': [0x00, 0x40, 0x40, 0x00, 0x00], '-': [0x08, 0x08, 0x08, 0x08, 0x08],
  '/': [0x20, 0x10, 0x08, 0x04, 0x02], '(': [0x00, 0x1C, 0x22, 0x41, 0x00],
  ')': [0x00, 0x41, 0x22, 0x1C, 0x00], '#': [0x14, 0x7F, 0x14, 0x7F, 0x14],
};
function drawChar(ctx: CanvasRenderingContext2D, ch: string, x: number, y: number, scale: number, color: string): void {
  const bits = FONT[ch.toUpperCase()] || FONT[' '];
  ctx.fillStyle = color;
  for (let row = 0; row < FONT_H; row++) {
    const line = bits[row] || 0;
    for (let col = 0; col < FONT_W; col++) {
      if (line & (1 << (FONT_W - 1 - col))) {
        ctx.fillRect(x + col * scale, y + row * scale, scale, scale);
      }
    }
  }
}
function drawText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, scale: number, color: string): void {
  let cursor = x;
  for (const ch of text) {
    drawChar(ctx, ch, cursor, y, scale, color);
    cursor += (FONT_W + 1) * scale;
  }
}

// ─────────────────────────── 初始化 ───────────────────────────

const store = new DataStore();
const playerSvc = new PlayerQueryService(store);

let pass = 0;
let fail = 0;
function assert(name: string, cond: boolean): void {
  if (cond) pass++; else fail++;
}

// ─────────────────────────── 视图 1: 球员列表（PLAYER_TABLE） ───────────────────────────

export function renderPlayerList(ctx: CanvasRenderingContext2D): void {
  // 背景
  ctx.fillStyle = C(0x20);  // 浅灰
  ctx.fillRect(0, 0, 256, 240);

  // 标题
  drawText(ctx, 'PLAYER LIST', 60, 8, 1, C(0x30));
  drawText(ctx, 'ID NAME         STM SH PAS DRB', 8, 24, 1, C(0x21));
  // 列表（每行 11px，25 行）
  for (let i = 0; i < Math.min(25, PLAYER_TABLE.length); i++) {
    const p = PLAYER_TABLE[i];
    const y = 36 + i * 8;
    drawText(ctx, `${p.id.toString(16).padStart(2, '0')}`, 8, y, 1, C(0x30));
    drawText(ctx, p.name.substring(0, 9).padEnd(9, ' '), 32, y, 1, C(0x2C));
    drawText(ctx, p.stamina.toString().padStart(3, ' '), 112, y, 1, C(0x28));
    drawText(ctx, p.shot.toString().padStart(2, ' '), 144, y, 1, C(0x28));
    drawText(ctx, p.pass.toString().padStart(2, ' '), 168, y, 1, C(0x28));
    drawText(ctx, p.dribble.toString().padStart(2, ' '), 192, y, 1, C(0x28));
  }
  // 底部信息
  drawText(ctx, `TOTAL: ${PLAYER_TABLE.length}`, 8, 220, 1, C(0x30));
  drawText(ctx, `TEAMS: ${TEAMS_FULL.length}`, 152, 220, 1, C(0x30));
}

// ─────────────────────────── 视图 2: 单个球员（findPlayerById 0x01 = Tsubasa） ───────────────────────────

export function renderPlayerDetail(ctx: CanvasRenderingContext2D): void {
  ctx.fillStyle = C(0x12);  // 深蓝
  ctx.fillRect(0, 0, 256, 240);

  // 头部：球员卡
  const p = findPlayerById(0x01);
  if (!p) return;

  drawText(ctx, 'PLAYER PROFILE', 60, 8, 1, C(0x30));
  drawText(ctx, `ID:0x${p.id.toString(16).padStart(2, '0').toUpperCase()}`, 8, 24, 1, C(0x30));
  drawText(ctx, p.name.toUpperCase(), 96, 24, 2, C(0x30));
  drawText(ctx, `CLUB:${p.club}  POS:${p.position === 1 ? 'GK' : 'FW'}`, 8, 48, 1, C(0x2C));

  // 能力条（6 项）
  const stats = [
    { name: 'SHOT', v: p.shot }, { name: 'DRIB', v: p.dribble },
    { name: 'PASS', v: p.pass }, { name: 'TACK', v: p.tackle },
    { name: 'BLK', v: p.block }, { name: 'INT', v: p.intercept },
  ];
  for (let i = 0; i < stats.length; i++) {
    const y = 72 + i * 16;
    const s = stats[i];
    drawText(ctx, s.name, 8, y, 1, C(0x30));
    // 进度条 (16 tile 宽)
    const max = 30;
    const fill = Math.min(16, Math.round((s.v / max) * 16));
    for (let j = 0; j < 16; j++) {
      ctx.fillStyle = j < fill ? C(0x2A) : C(0x00);
      ctx.fillRect(48 + j * 6, y, 5, 7);
    }
    drawText(ctx, s.v.toString().padStart(2, ' '), 152, y, 1, C(0x30));
  }
  // 体力条（大）
  drawText(ctx, 'STAM', 8, 180, 1, C(0x30));
  const stamFill = Math.min(16, Math.round((p.stamina / 30) * 16));
  for (let j = 0; j < 16; j++) {
    ctx.fillStyle = j < stamFill ? C(0x16) : C(0x00);
    ctx.fillRect(48 + j * 6, 180, 5, 7);
  }
  drawText(ctx, p.stamina.toString().padStart(2, ' '), 152, 180, 1, C(0x30));
  drawText(ctx, `SKILLS:${findSkillsByPlayer(p.id).length}`, 8, 200, 1, C(0x2C));
  drawText(ctx, 'API:GET /api/player/0x01', 8, 220, 1, C(0x27));
}

// ─────────────────────────── 视图 3: 球队列表 + 单队名单 ───────────────────────────

export function renderTeamView(ctx: CanvasRenderingContext2D): void {
  ctx.fillStyle = C(0x14);  // 紫红
  ctx.fillRect(0, 0, 256, 240);
  drawText(ctx, 'TEAM ROSTER', 76, 8, 1, C(0x30));
  const team = findTeamById(0x80);
  if (!team) return;
  drawText(ctx, `TEAM:0x80 ${team.name.toUpperCase()}`, 8, 24, 1, C(0x30));
  const roster = findRosterById(0x80);
  for (let i = 0; i < Math.min(11, roster.length); i++) {
    const pid = roster[i];
    const player = findPlayerById(pid);
    if (!player) continue;
    const y = 40 + i * 14;
    drawText(ctx, `0x${pid.toString(16).padStart(2, '0').toUpperCase()}`, 8, y, 1, C(0x30));
    drawText(ctx, player.name.substring(0, 10).padEnd(10, ' '), 40, y, 1, C(0x2C));
    drawText(ctx, `S:${player.stamina.toString().padStart(2, ' ')}`, 144, y, 1, C(0x28));
    drawText(ctx, `P:${player.position === 1 ? 'GK' : 'FW'}`, 184, y, 1, C(0x2C));
  }
  drawText(ctx, `TOTAL:${roster.length}`, 8, 220, 1, C(0x30));
  drawText(ctx, `ALL TEAMS:${TEAMS_FULL.length}`, 144, 220, 1, C(0x30));
}

// ─────────────────────────── 视图 4: 等级升级（findLevelByExp） ───────────────────────────

export function renderLevelUp(ctx: CanvasRenderingContext2D): void {
  ctx.fillStyle = C(0x00);  // 黑
  ctx.fillRect(0, 0, 256, 240);
  drawText(ctx, 'LEVEL UP', 88, 8, 1, C(0x30));
  // 当前 exp = 5000
  const exp = 5000;
  const lv = findLevelByExp(exp);
  const entry = findLevelById(lv);
  const nextLv = lv < 30 ? findLevelById(lv + 1) : null;
  drawText(ctx, `EXP:${exp}  LV:${lv}`, 8, 28, 1, C(0x2C));
  if (entry) {
    drawText(ctx, `EXP REQ:${entry.expRequired}`, 8, 44, 1, C(0x30));
    drawText(ctx, `STAM RAW:${entry.staminaRaw}`, 8, 56, 1, C(0x30));
    drawText(ctx, `ABL MAX:${entry.abilityMax}`, 8, 68, 1, C(0x30));
  }
  // 6 项能力进度条（growth）
  if (entry) {
    const labels = ['SHOT', 'DRIB', 'PASS', 'TACK', 'SPD', 'CTRL'];
    for (let i = 0; i < 6; i++) {
      const y = 88 + i * 14;
      const v = entry.growth[i] || 0;
      drawText(ctx, labels[i], 8, y, 1, C(0x30));
      const fill = Math.min(16, Math.round((v / 30) * 16));
      for (let j = 0; j < 16; j++) {
        ctx.fillStyle = j < fill ? C(0x2A) : C(0x20);
        ctx.fillRect(48 + j * 6, y, 5, 7);
      }
      drawText(ctx, v.toString().padStart(2, ' '), 152, y, 1, C(0x30));
    }
  }
  // 下一级
  if (nextLv) {
    drawText(ctx, `NEXT LV:${nextLv.level}`, 8, 184, 1, C(0x2C));
    drawText(ctx, `EXP TO NEXT:${nextLv.expRequired - exp}`, 8, 200, 1, C(0x2C));
  } else {
    drawText(ctx, 'MAX LEVEL REACHED', 8, 184, 1, C(0x16));
  }
  drawText(ctx, 'API:GET /api/level?exp=5000', 8, 220, 1, C(0x27));
}

// ─────────────────────────── 视图 5: 比赛配置 (getMatchConfig) ───────────────────────────

export function renderMatchConfig(ctx: CanvasRenderingContext2D): void {
  ctx.fillStyle = C(0x10);  // 深绿
  ctx.fillRect(0, 0, 256, 240);
  drawText(ctx, 'MATCH CONFIG', 70, 8, 1, C(0x30));
  // 查 Sao Paulo vs Corinthians
  const cfg = getMatchConfig(0x80, 0x85);
  drawText(ctx, 'SAO PAULO vs CORINTHIANS', 8, 28, 1, C(0x30));
  drawText(ctx, `HALF:${cfg.halfLength}MIN`, 8, 48, 1, C(0x2C));
  drawText(ctx, `MAXSUB:${cfg.maxSubstitutions}`, 8, 60, 1, C(0x2C));
  drawText(ctx, `INJTIME:${cfg.injuryTime}MIN`, 8, 72, 1, C(0x2C));
  drawText(ctx, `TOTAL:${cfg.durationMinutes}MIN`, 8, 84, 1, C(0x2C));
  drawText(ctx, `EXTRA:${cfg.extraTime ? 'YES' : 'NO'}`, 8, 96, 1, C(0x2C));
  drawText(ctx, `TYPE:${cfg.tournament.toUpperCase()}`, 8, 108, 1, C(0x2C));

  // 全部配置列表（部分）
  drawText(ctx, 'ALL CONFIGS:', 8, 132, 1, C(0x30));
  for (let i = 0; i < Math.min(7, MATCH_CONFIG_TABLE.length); i++) {
    const c = MATCH_CONFIG_TABLE[i];
    const y = 144 + i * 10;
    drawText(ctx, `${c.tournament.substring(0, 4).toUpperCase()}`, 8, y, 1, C(0x2C));
    drawText(ctx, `${c.halfLength}M`, 64, y, 1, C(0x28));
    drawText(ctx, c.extraTime ? '+ET' : '   ', 96, y, 1, C(0x2C));
    drawText(ctx, `H:0x${c.homeTeam.toString(16).padStart(2, '0').toUpperCase()}`, 128, y, 1, C(0x30));
    drawText(ctx, `A:0x${c.awayTeam.toString(16).padStart(2, '0').toUpperCase()}`, 184, y, 1, C(0x30));
  }
  drawText(ctx, `TOTAL:${MATCH_CONFIG_TABLE.length} MATCHES`, 8, 220, 1, C(0x30));
}

// ─────────────────────────── 视图 6: 技能列表 (findSkillsByPlayer) ───────────────────────────

export function renderSkills(ctx: CanvasRenderingContext2D): void {
  ctx.fillStyle = C(0x16);  // 浅黄
  ctx.fillRect(0, 0, 256, 240);
  drawText(ctx, 'SKILL LIST', 86, 8, 1, C(0x30));
  const skillIds = findSkillsByPlayer(0x01);
  drawText(ctx, `PLAYER:0x01 TSUBASA`, 8, 28, 1, C(0x30));
  drawText(ctx, `SKILL COUNT:${skillIds.length}`, 8, 44, 1, C(0x2C));
  for (let i = 0; i < Math.min(8, skillIds.length); i++) {
    const sid = skillIds[i];
    const sk = findSkillByMoveId(sid);
    const y = 60 + i * 18;
    drawText(ctx, `0x${sid.toString(16).padStart(2, '0').toUpperCase()}`, 8, y, 1, C(0x30));
    drawText(ctx, (sk?.name ?? '???').substring(0, 12).padEnd(12, ' '), 40, y, 1, C(0x2C));
    // 威力条
    const power = (sk?.power ?? 0) & 0xff;
    const fill = Math.min(8, Math.round((power / 30) * 8));
    for (let j = 0; j < 8; j++) {
      ctx.fillStyle = j < fill ? C(0x12) : C(0x20);
      ctx.fillRect(120 + j * 4, y, 3, 7);
    }
    drawText(ctx, power.toString().padStart(2, '0'), 160, y, 1, C(0x30));
  }
  drawText(ctx, `ALL SKILLS:${SKILL_TABLE.length}`, 8, 220, 1, C(0x30));
}

// ─────────────────────────── 跑全部断言（数据完整性） ───────────────────────────

function runAllAssertions(): { pass: number; fail: number } {
  // 球员
  assert('Tsubasa found', findPlayerById(0x01)?.name === 'Tsubasa');
  assert('Wakabayashi GK', findPlayerById(0x21)?.position === 1);
  assert('Sao Paulo 11+ players', findPlayersByTeam(0x80).length >= 11);
  assert('PLAYER_TABLE ≥40', PLAYER_TABLE.length >= 40);
  // 等级
  assert('5000 exp → lv5', findLevelByExp(5000) === 5);
  assert('lv30 max', findLevelById(30)?.expRequired === 6940);
  // 队伍
  assert('Sao Paulo team', findTeamById(0x80)?.name === 'SaoPaulo');
  assert('TEAMS_FULL ≥20', TEAMS_FULL.length >= 20);
  // 技能
  assert('Tsubasa ≥1 skill', findSkillsByPlayer(0x01).length >= 1);
  assert('SKILL_TABLE ≥10', SKILL_TABLE.length >= 10);
  // 比赛
  const cfg = getMatchConfig(0x80, 0x85);
  assert('Sao Paulo 5min', cfg.halfLength === 5);
  assert('MATCH_CONFIG ≥20', MATCH_CONFIG_TABLE.length >= 20);
  return { pass, fail };
}

// ─────────────────────────── 入口 ───────────────────────────

const stats = runAllAssertions();

if (typeof document !== 'undefined') {
  // 浏览器：渲染 4 个视图到 4 个 canvas
  const canvases: Record<string, HTMLCanvasElement | null> = {
    list: document.getElementById('canvas-list') as HTMLCanvasElement | null,
    detail: document.getElementById('canvas-detail') as HTMLCanvasElement | null,
    team: document.getElementById('canvas-team') as HTMLCanvasElement | null,
    levelup: document.getElementById('canvas-levelup') as HTMLCanvasElement | null,
    match: document.getElementById('canvas-match') as HTMLCanvasElement | null,
    skills: document.getElementById('canvas-skills') as HTMLCanvasElement | null,
  };
  if (canvases.list) renderPlayerList(canvases.list.getContext('2d')!);
  if (canvases.detail) renderPlayerDetail(canvases.detail.getContext('2d')!);
  if (canvases.team) renderTeamView(canvases.team.getContext('2d')!);
  if (canvases.levelup) renderLevelUp(canvases.levelup.getContext('2d')!);
  if (canvases.match) renderMatchConfig(canvases.match.getContext('2d')!);
  if (canvases.skills) renderSkills(canvases.skills.getContext('2d')!);
  const summary = document.getElementById('summary');
  if (summary) {
    summary.textContent = `通过 ${stats.pass} / 失败 ${stats.fail}`;
    summary.style.color = stats.fail === 0 ? '#4caf50' : '#f44336';
  }
}

if (typeof process !== 'undefined' && process.stdout) {
  process.stdout.write(`\n[Test] 通过 ${stats.pass} / 失败 ${stats.fail}\n`);
  process.exit(stats.fail === 0 ? 0 : 1);
}

export default stats;
