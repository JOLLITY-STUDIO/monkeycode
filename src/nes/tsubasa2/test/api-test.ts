/**
 * 天使之翼2 独立 API 测试页（api-test.html 入口）
 * SCALE=2: 内部 512x480 渲染，避免 CSS 缩放模糊
 */
import { DataStore } from '../src/game/prg/data/store/DataStore';
import { PlayerQueryService } from '../src/game/prg/code/player/PlayerQueryService';
import { findPlayerById, findPlayersByTeam, findPlayerNameById, PLAYER_TABLE } from '../src/game/prg/data/tables/player-table';
import { findLevelByExp, findLevelById, LEVEL_UP_TABLE } from '../src/game/prg/data/tables/levelup-table';
import { findTeamById, findTeamNameById, findRosterById, TEAMS_FULL } from '../src/game/prg/data/tables/team-table';
import { findSkillByMoveId, findSkillsByPlayer, SKILL_TABLE } from '../src/game/prg/data/tables/skill-table';
import { getMatchConfig, MATCH_CONFIG_TABLE } from '../src/game/prg/data/tables/match-config-table';

// ─────────────────────────── NES 调色板 ───────────────────────────

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

// 调色板便捷
const BG_DARK = C(0x00);
const PANEL_BG = C(0x0F);
const TEXT_BRIGHT = C(0x30);
const TEXT_DIM = C(0x2C);
const ACCENT_BLUE = C(0x21);
const ACCENT_RED = C(0x16);
const ACCENT_GREEN = C(0x1A);
const BAR_FILL = C(0x28);
const BAR_BG = C(0x0F);

// ─────────────────────────── 字体：ctx.fillText 系统等宽字体 ───────────────────────────

// 不再使用自绘 5x7 位图字体（位图数据本身不规范），改用浏览器系统等宽字体
// 通过 ctx.font 设置字体大小与字体族
const CHAR_W = 6;  // 8px 字体下每字符约 6 像素宽
const CHAR_H = 8;  // 8px 行高

// ─────────────────────────── 字体：ctx.fillText 系统等宽字体 ───────────────────────────

// SCALE=3: 内部画布 768x720 (NES 256x240 放大 3 倍)
// 字体直接用 24-32px (8*3, 16*3 等)，无需 CSS 缩放避免模糊

const SCALE = 3;

function setFont(ctx: CanvasRenderingContext2D, size: number): void {
  ctx.font = `${size}px "Consolas", "Menlo", "Courier New", monospace`;
  ctx.textBaseline = 'top';
}

function drawText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, size: number, color: string): void {
  setFont(ctx, size * SCALE);
  ctx.fillStyle = color;
  ctx.fillText(text, x * SCALE, y * SCALE);
}

function drawTextBG(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, size: number, fg: string, bg: string): void {
  setFont(ctx, size * SCALE);
  const w = ctx.measureText(text).width;
  const h = size * SCALE;
  ctx.fillStyle = bg;
  ctx.fillRect(x * SCALE - 1, y * SCALE - 1, w + 2, h + 2);
  ctx.fillStyle = fg;
  ctx.fillText(text, x * SCALE, y * SCALE);
}

function fillRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, color: string): void {
  ctx.fillStyle = color;
  ctx.fillRect(x * SCALE, y * SCALE, w * SCALE, h * SCALE);
}

function strokeRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, color: string): void {
  ctx.strokeStyle = color;
  ctx.strokeRect(x * SCALE, y * SCALE, w * SCALE, h * SCALE);
}

// ─────────────────────────── 初始化 ───────────────────────────

const store = new DataStore();
const playerSvc = new PlayerQueryService(store);

let pass = 0;
let fail = 0;
function assert(name: string, cond: boolean): void {
  if (cond) pass++; else fail++;
}

// ─────────────────────────── 视图 1: 球员列表 ───────────────────────────

export function renderPlayerList(ctx: CanvasRenderingContext2D): void {
  // 黑色背景（768x720 内部画布）
  ctx.fillStyle = BG_DARK;
  ctx.fillRect(0, 0, 768, 720);

  // 顶部面板（黄色）
  ctx.fillStyle = C(0x08);
  ctx.fillRect(0, 0, 768, 28 * 3);

  // 标题
  drawText(ctx, 'PLAYER LIST', 76, 10, 2, TEXT_BRIGHT);

  // 副标题
  drawText(ctx, 'ID  NAME       STM PAS SH DRB', 8, 36, 1, TEXT_DIM);

  // 分隔线
  ctx.fillStyle = TEXT_DIM;
  ctx.fillRect(8, 46, 240, 1);

  // 列表（每行 8 像素）
  for (let i = 0; i < Math.min(20, PLAYER_TABLE.length); i++) {
    const p = PLAYER_TABLE[i];
    const y = 50 + i * 9;
    const idStr = p.id.toString(16).padStart(2, '0').toUpperCase();
    drawText(ctx, idStr, 8, y, 1, ACCENT_GREEN);
    drawText(ctx, p.name.substring(0, 9).padEnd(9, ' '), 32, y, 1, TEXT_BRIGHT);
    drawText(ctx, p.stamina.toString().padStart(2, ' '), 100, y, 1, ACCENT_RED);
    drawText(ctx, p.pass.toString().padStart(2, ' '), 132, y, 1, ACCENT_BLUE);
    drawText(ctx, p.shot.toString().padStart(2, ' '), 164, y, 1, ACCENT_BLUE);
    drawText(ctx, p.dribble.toString().padStart(2, ' '), 196, y, 1, ACCENT_BLUE);
  }

  // 底部信息
  ctx.fillStyle = C(0x08);
  ctx.fillRect(0, 220, 256, 20);
  drawText(ctx, `TOTAL:${PLAYER_TABLE.length} PLAYERS`, 8, 226, 1, TEXT_BRIGHT);
  drawText(ctx, `TEAMS:${TEAMS_FULL.length}`, 168, 226, 1, TEXT_DIM);
}

// ─────────────────────────── 视图 2: 单个球员 ───────────────────────────

export function renderPlayerDetail(ctx: CanvasRenderingContext2D): void {
  ctx.fillStyle = BG_DARK;
  ctx.fillRect(0, 0, 256, 240);

  // 头部（蓝色）
  ctx.fillStyle = C(0x11);
  ctx.fillRect(0, 0, 256, 36);
  drawText(ctx, 'ID:01  TSUBASA', 8, 6, 1, TEXT_DIM);
  drawText(ctx, 'FWD', 200, 6, 1, ACCENT_GREEN);

  const p = findPlayerById(0x01);
  if (!p) return;
  // 大名字
  drawText(ctx, p.name.toUpperCase(), 16, 16, 2, TEXT_BRIGHT);

  // 6 项能力条（每行 14 像素高）
  const stats = [
    { name: 'SHOT', v: p.shot }, { name: 'DRIB', v: p.dribble },
    { name: 'PASS', v: p.pass }, { name: 'TACK', v: p.tackle },
    { name: 'BLOC', v: p.block }, { name: 'INT ', v: p.intercept },
  ];
  for (let i = 0; i < stats.length; i++) {
    const y = 48 + i * 18;
    const s = stats[i];
    drawText(ctx, s.name, 8, y, 1, TEXT_BRIGHT);
    // 进度条（最大 25）
    const max = 30;
    const fill = Math.min(15, Math.round((s.v / max) * 15));
    // 背景条
    ctx.fillStyle = BAR_BG;
    ctx.fillRect(56, y, 15 * 8, 8);
    // 填充
    ctx.fillStyle = s.v >= 20 ? ACCENT_RED : s.v >= 10 ? ACCENT_BLUE : BAR_FILL;
    ctx.fillRect(56, y, fill * 8, 8);
    // 边框
    ctx.strokeStyle = TEXT_DIM;
    ctx.strokeRect(56, y, 15 * 8, 8);
    // 数字
    drawText(ctx, s.v.toString().padStart(2, '0'), 184, y, 1, TEXT_BRIGHT);
  }

  // 体力条（大）
  const yStam = 162;
  drawText(ctx, 'STAM', 8, yStam, 1, TEXT_BRIGHT);
  const stamFill = Math.min(15, Math.round((p.stamina / 30) * 15));
  ctx.fillStyle = BAR_BG;
  ctx.fillRect(56, yStam, 15 * 8, 8);
  ctx.fillStyle = ACCENT_RED;
  ctx.fillRect(56, yStam, stamFill * 8, 8);
  ctx.strokeStyle = TEXT_DIM;
  ctx.strokeRect(56, yStam, 15 * 8, 8);
  drawText(ctx, p.stamina.toString().padStart(2, '0'), 184, yStam, 1, TEXT_BRIGHT);

  // 技能数
  const skillCount = findSkillsByPlayer(p.id).length;
  drawTextBG(ctx, `SKILLS:${skillCount}`, 8, 184, 1, ACCENT_RED, C(0x10));

  // 底部 API 标签
  drawTextBG(ctx, 'API: /api/player/0x01', 8, 220, 1, TEXT_BRIGHT, C(0x11));
}

// ─────────────────────────── 视图 3: 球队名单 ───────────────────────────

export function renderTeamView(ctx: CanvasRenderingContext2D): void {
  ctx.fillStyle = BG_DARK;
  ctx.fillRect(0, 0, 256, 240);

  // 头部（绿色）
  ctx.fillStyle = C(0x1A);
  ctx.fillRect(0, 0, 256, 32);
  drawText(ctx, 'TEAM 0x80', 8, 6, 1, TEXT_BRIGHT);
  drawText(ctx, 'SAO PAULO', 80, 8, 2, TEXT_BRIGHT);

  const team = findTeamById(0x80);
  if (!team) return;
  const roster = findRosterById(0x80);
  // 表头
  drawText(ctx, 'ID  NAME      POS STM', 8, 42, 1, TEXT_DIM);
  ctx.fillStyle = TEXT_DIM;
  ctx.fillRect(8, 52, 240, 1);

  for (let i = 0; i < Math.min(15, roster.length); i++) {
    const pid = roster[i];
    const player = findPlayerById(pid);
    if (!player) continue;
    const y = 56 + i * 10;
    const idStr = pid.toString(16).padStart(2, '0').toUpperCase();
    drawText(ctx, idStr, 8, y, 1, ACCENT_GREEN);
    drawText(ctx, player.name.substring(0, 10).padEnd(10, ' '), 32, y, 1, TEXT_BRIGHT);
    drawText(ctx, player.position === 1 ? 'GK' : 'FW', 112, y, 1, ACCENT_BLUE);
    drawText(ctx, player.stamina.toString().padStart(2, ' '), 140, y, 1, ACCENT_RED);
  }

  // 底部
  ctx.fillStyle = C(0x1A);
  ctx.fillRect(0, 220, 256, 20);
  drawText(ctx, `ROSTER:${roster.length}`, 8, 226, 1, TEXT_BRIGHT);
  drawText(ctx, `ALL TEAMS:${TEAMS_FULL.length}`, 140, 226, 1, TEXT_BRIGHT);
}

// ─────────────────────────── 视图 4: 等级升级 ───────────────────────────

export function renderLevelUp(ctx: CanvasRenderingContext2D): void {
  ctx.fillStyle = BG_DARK;
  ctx.fillRect(0, 0, 256, 240);

  // 头部（红色）
  ctx.fillStyle = C(0x16);
  ctx.fillRect(0, 0, 256, 36);
  drawText(ctx, 'LEVEL UP', 88, 8, 2, TEXT_BRIGHT);

  const exp = 5000;
  const lv = findLevelByExp(exp);
  const entry = findLevelById(lv);
  const nextLv = lv < 30 ? findLevelById(lv + 1) : null;

  // 等级信息
  drawText(ctx, `EXP:${exp}  LV:${lv}`, 8, 44, 1, TEXT_BRIGHT);
  if (entry) {
    drawText(ctx, `REQ:${entry.expRequired}`, 120, 44, 1, TEXT_DIM);
  }

  // 6 项 growth
  if (entry) {
    const labels = ['SHOT', 'DRIB', 'PASS', 'TACK', 'SPD ', 'CTRL'];
    for (let i = 0; i < 6; i++) {
      const y = 56 + i * 14;
      const v = entry.growth[i] || 0;
      drawText(ctx, labels[i], 8, y, 1, TEXT_BRIGHT);
      const fill = Math.min(20, Math.round((v / 30) * 20));
      ctx.fillStyle = BAR_BG;
      ctx.fillRect(48, y, 20 * 5, 9);
      ctx.fillStyle = v >= 20 ? ACCENT_RED : v >= 10 ? ACCENT_BLUE : BAR_FILL;
      ctx.fillRect(48, y, fill * 5, 9);
      ctx.strokeStyle = TEXT_DIM;
      ctx.strokeRect(48, y, 20 * 5, 9);
      drawText(ctx, v.toString().padStart(2, '0'), 156, y, 1, TEXT_BRIGHT);
    }
  }

  // 下一级
  if (nextLv) {
    ctx.fillStyle = C(0x11);
    ctx.fillRect(0, 152, 256, 26);
    drawText(ctx, `NEXT LV:${nextLv.level}`, 8, 158, 1, TEXT_BRIGHT);
    drawText(ctx, `EXP NEED:${nextLv.expRequired - exp}`, 96, 158, 1, ACCENT_RED);
  } else {
    drawText(ctx, 'MAX LEVEL', 8, 160, 1, ACCENT_RED);
  }

  // 底部
  drawTextBG(ctx, 'API: /api/level?exp=5000', 8, 220, 1, TEXT_BRIGHT, C(0x11));
}

// ─────────────────────────── 视图 5: 比赛配置 ───────────────────────────

export function renderMatchConfig(ctx: CanvasRenderingContext2D): void {
  ctx.fillStyle = BG_DARK;
  ctx.fillRect(0, 0, 256, 240);
  // 头部
  ctx.fillStyle = C(0x1A);
  ctx.fillRect(0, 0, 256, 32);
  drawText(ctx, 'MATCH CONFIG', 56, 8, 2, TEXT_BRIGHT);

  // 当前配置
  const cfg = getMatchConfig(0x80, 0x85);
  drawTextBG(ctx, 'SAO PAULO  VS  CORINTH', 8, 40, 1, TEXT_BRIGHT, C(0x08));
  drawText(ctx, 'HALF', 8, 56, 1, TEXT_DIM);
  drawText(ctx, `${cfg.halfLength} MIN`, 56, 56, 1, ACCENT_RED);
  drawText(ctx, 'SUB', 8, 70, 1, TEXT_DIM);
  drawText(ctx, `${cfg.maxSubstitutions}`, 56, 70, 1, ACCENT_RED);
  drawText(ctx, 'INJTIME', 8, 84, 1, TEXT_DIM);
  drawText(ctx, `${cfg.injuryTime} MIN`, 80, 84, 1, ACCENT_RED);
  drawText(ctx, 'TOTAL', 8, 98, 1, TEXT_DIM);
  drawText(ctx, `${cfg.durationMinutes} MIN`, 64, 98, 1, ACCENT_RED);
  drawText(ctx, 'EXTRA', 8, 112, 1, TEXT_DIM);
  drawText(ctx, cfg.extraTime ? 'YES' : 'NO', 64, 112, 1, cfg.extraTime ? ACCENT_RED : TEXT_DIM);
  drawText(ctx, 'TYPE', 8, 126, 1, TEXT_DIM);
  drawText(ctx, cfg.tournament.toUpperCase(), 56, 126, 1, ACCENT_GREEN);

  // 全部配置
  drawText(ctx, 'ALL CONFIGURATIONS:', 8, 148, 1, TEXT_BRIGHT);
  ctx.fillStyle = TEXT_DIM;
  ctx.fillRect(8, 158, 240, 1);
  for (let i = 0; i < Math.min(6, MATCH_CONFIG_TABLE.length); i++) {
    const c = MATCH_CONFIG_TABLE[i];
    const y = 162 + i * 9;
    drawText(ctx, c.tournament.substring(0, 6).toUpperCase(), 8, y, 1, ACCENT_GREEN);
    drawText(ctx, `${c.halfLength}M`, 80, y, 1, TEXT_DIM);
    drawText(ctx, c.extraTime ? '+ET' : '   ', 112, y, 1, TEXT_DIM);
    drawText(ctx, `0x${c.homeTeam.toString(16).padStart(2, '0').toUpperCase()}`, 136, y, 1, ACCENT_BLUE);
    drawText(ctx, 'VS', 168, y, 1, TEXT_DIM);
    drawText(ctx, `0x${c.awayTeam.toString(16).padStart(2, '0').toUpperCase()}`, 184, y, 1, ACCENT_BLUE);
  }
  // 底部
  drawTextBG(ctx, `TOTAL: ${MATCH_CONFIG_TABLE.length} MATCHES`, 8, 220, 1, TEXT_BRIGHT, C(0x1A));
}

// ─────────────────────────── 视图 6: 技能列表 ───────────────────────────

export function renderSkills(ctx: CanvasRenderingContext2D): void {
  ctx.fillStyle = BG_DARK;
  ctx.fillRect(0, 0, 256, 240);
  // 头部
  ctx.fillStyle = C(0x18);
  ctx.fillRect(0, 0, 256, 36);
  drawText(ctx, 'SKILLS', 92, 8, 2, TEXT_BRIGHT);

  const skillIds = findSkillsByPlayer(0x01);
  drawText(ctx, 'PLAYER 0x01 TSUBASA', 8, 22, 1, ACCENT_GREEN);
  drawText(ctx, `COUNT:${skillIds.length}`, 184, 22, 1, TEXT_DIM);

  // 技能列表
  drawText(ctx, 'ID  NAME        POW', 8, 44, 1, TEXT_DIM);
  ctx.fillStyle = TEXT_DIM;
  ctx.fillRect(8, 54, 240, 1);

  for (let i = 0; i < Math.min(13, skillIds.length); i++) {
    const sid = skillIds[i];
    const sk = findSkillByMoveId(sid);
    const y = 60 + i * 12;
    const idStr = sid.toString(16).padStart(2, '0').toUpperCase();
    drawText(ctx, idStr, 8, y, 1, ACCENT_RED);
    drawText(ctx, (sk?.name ?? '???').substring(0, 12).padEnd(12, ' '), 32, y, 1, TEXT_BRIGHT);
    const power = (sk?.power ?? 0) & 0xff;
    const fill = Math.min(8, Math.round((power / 30) * 8));
    ctx.fillStyle = BAR_BG;
    ctx.fillRect(120, y, 8 * 6, 8);
    ctx.fillStyle = power >= 20 ? ACCENT_RED : ACCENT_BLUE;
    ctx.fillRect(120, y, fill * 6, 8);
    drawText(ctx, power.toString().padStart(2, '0'), 180, y, 1, TEXT_BRIGHT);
  }

  // 底部
  drawTextBG(ctx, `ALL SKILLS: ${SKILL_TABLE.length}`, 8, 220, 1, TEXT_BRIGHT, C(0x18));
}

// ─────────────────────────── 跑全部断言 ───────────────────────────

function runAllAssertions(): { pass: number; fail: number } {
  assert('Tsubasa found', findPlayerById(0x01)?.name === 'Tsubasa');
  assert('Wakabayashi GK', findPlayerById(0x21)?.position === 1);
  assert('Sao Paulo 11 players', findPlayersByTeam(0x80).length === 11);
  assert('PLAYER_TABLE >= 40', PLAYER_TABLE.length >= 40);
  assert('5000 exp -> lv5', findLevelByExp(5000) === 5);
  assert('lv30 max', findLevelById(30)?.expRequired === 6940);
  assert('Sao Paulo team', findTeamById(0x80)?.name === 'SaoPaulo');
  assert('TEAMS_FULL >= 20', TEAMS_FULL.length >= 20);
  assert('Tsubasa >= 1 skill', findSkillsByPlayer(0x01).length >= 1);
  assert('SKILL_TABLE >= 10', SKILL_TABLE.length >= 10);
  const cfg = getMatchConfig(0x80, 0x85);
  assert('Sao Paulo 5min', cfg.halfLength === 5);
  assert('MATCH_CONFIG >= 20', MATCH_CONFIG_TABLE.length >= 20);
  return { pass, fail };
}

// ─────────────────────────── 入口 ───────────────────────────

const stats = runAllAssertions();

if (typeof document !== 'undefined') {
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
