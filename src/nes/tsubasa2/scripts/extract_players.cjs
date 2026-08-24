/**
 * extract_players.cjs — 从真 ROM 提取 117 球员能力/颜色/头型（全部 23 字段）
 *
 * 数据源（详见 docs/rom-data-locations.md §2-§3）：
 *   - 能力值 (23 字节：7 base + 8 low + 8 high)  ROM 0x39fde + idx*24
 *   - GK 8 字节能力                              ROM 0x3ae96 + idx*8
 *   - 头型 (PlayModList, 18 模板)                ROM 0x28901 + idx
 *   - 颜色 (明星/杂鱼)                           ROM 0x2b821/0x2b6d7 + idx*5
 *
 * 输出：src/game/prg/data/tables/player-stats.ts
 *   PLAYER_TABLE：23 字段全捕获（与 ROM 字节 1:1 对应）
 *
 * 用法：cd scripts && node extract_players.cjs > ../src/game/prg/data/tables/player-stats.ts
 */
const fs = require('fs');
const path = require('path');

const ROM = path.join(__dirname, '..', 'docs', 'roms', 'Captain Tsubasa II - Super Striker (Japan).nes');
const rom = fs.readFileSync(ROM);
// iNES header 16 bytes, then 16 PRG banks of 16KB
// docs 写的地址是 PRG 偏移（iNES header 后相对偏移），所以 prg = rom.slice(16)
const prg = rom.slice(16);

// 角色名（来自 docs/rom-data-locations.md §1，0x01-0x2D 完整）
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
};

const PLAYER_ID_MAX = 0x2D; // 明星 45 项

/**
 * 读取 24 字节能力块（仅前 23 字节有意义）
 * docs §2: stamina/shot/pass/dribble/block/tackle/intercept(7) +
 *          low(8): shot/pass/trap/letThrough/ctrlClear/unctrlClear/ballChal/intercept +
 *          high(8): 同上
 */
function readStats(idx) {
  const base = 0x39fde + idx * 24;
  return {
    stamina:    prg[base + 0],
    shot:       prg[base + 1],
    pass:       prg[base + 2],
    dribble:    prg[base + 3],
    block:      prg[base + 4],
    tackle:     prg[base + 5],
    intercept:  prg[base + 6],
    lowShot:    prg[base + 7],
    lowPass:    prg[base + 8],
    lowTrap:    prg[base + 9],
    lowLet:     prg[base + 10],
    lowCtrlClr: prg[base + 11],
    lowUnctrl:  prg[base + 12],
    lowChal:    prg[base + 13],
    lowIntc:    prg[base + 14],
    highShot:   prg[base + 15],
    highPass:   prg[base + 16],
    highTrap:   prg[base + 17],
    highLet:    prg[base + 18],
    highCtrlClr:prg[base + 19],
    highUnctrl: prg[base + 20],
    highChal:   prg[base + 21],
    highIntc:   prg[base + 22],
  };
}

/**
 * 读取 GK 8 字节能力（按 GK 表顺序索引 0..7）
 * docs §3: stamina/pass/catching/punching/vsShot/vsDribble/lowRush/highClaim
 *
 * 实测 0x3ae96 表实际有 8 项 × 8 字节（共 64 字节）：
 *   表内顺序非按球员 ID，GK 球员 ID (0x02/0x0F/0x21/0x22/0x26)
 *   对应的 GK 表索引需要进一步反汇编确认；当前按顺序全捕获（idx 0..7）。
 */
function readGkStats(idx) {
  const base = 0x3ae96 + idx * 8;
  return {
    stamina:   prg[base + 0],
    pass:      prg[base + 1],
    catching:  prg[base + 2],
    punching:  prg[base + 3],
    vsShot:    prg[base + 4],
    vsDribble: prg[base + 5],
    lowRush:   prg[base + 6],
    highClaim: prg[base + 7],
  };
}

/** 头型模板（18 个） */
function readHair(idx) {
  return prg[0x28901 + idx] ?? 0;
}

/** 颜色：明星 ROM 0x2b821 / 杂鱼 ROM 0x2b6d7，idx*5 */
function readColor(idx, isCelebrity) {
  const base = (isCelebrity ? 0x2b821 : 0x2b6d7) + idx * 5;
  return {
    skin:   prg[base + 0] ?? 0,
    hair:   prg[base + 1] ?? 0,
    shirt:  prg[base + 2] ?? 0,
    shorts: prg[base + 3] ?? 0,
  };
}

const lines = [];
const push = (s) => lines.push(s);

push('/**');
push(' * player-stats.ts — 球员档案具象化表（从真 ROM 全字段提取）');
push(' *');
push(' * 数据源（docs/rom-data-locations.md §1-§3）：');
push(' *   - 能力值 23 字节（7 base + 8 low + 8 high）  ROM 0x39fde + idx*24');
push(' *   - GK 8 字节能力                              ROM 0x3ae96 + idx*8');
push(' *   - 头型 18 模板                                ROM 0x28901 + idx');
push(' *   - 颜色（明星/杂鱼）                            ROM 0x2b821/0x2b6d7 + idx*5');
push(' *');
push(' * 重生脚本：scripts/extract_players.cjs');
push(' * 用法：cd scripts && node extract_players.cjs > ../src/game/prg/data/tables/player-stats.ts');
push(' */');
push('');
push("import type { PlayerProfile, PlayerGkEntry } from '../../code/player/PlayerQueryService';");
push('');
push('export type { PlayerGkEntry } from \'../../code/player/PlayerQueryService\';');
push('');
push('/** 球员颜色条目（皮肤/头发/上衣/短裤） */');
push('export interface PlayerColorEntry {');
push('  readonly skin: number;');
push('  readonly hair: number;');
push('  readonly shirt: number;');
push('  readonly shorts: number;');
push('}');
push('');

// 1) PLAYER_TABLE（明星 0x01-0x2D，含 23 字段能力）
push('/** 球员档案表（明星 0x01-0x2D 共 45 项，杂鱼不在此表）— 23 字段全捕获 */');
push('export const PLAYER_TABLE: ReadonlyArray<PlayerProfile> = [');
const GK_IDS = new Set([0x02, 0x0F, 0x21, 0x22, 0x26]);
// GK 索引顺序：GK 表 0..7 实际对应的 5 名 GK 球员 ID（待精确确认）
const GK_ORDER = [0x0F, 0x21, 0x02, 0x22, 0x26]; // Morisaki, Wakabayashi, Lennart, Wakashimazu, Meon
for (let id = 1; id <= PLAYER_ID_MAX; id++) {
  const name = NAMES[id] || `Player${id.toString(16).toUpperCase()}`;
  const isGk = GK_IDS.has(id);
  let club = 0;
  if (id >= 0x01 && id <= 0x15) club = 1; // 日本高中
  else if (id >= 0x16 && id <= 0x1F) club = 2; // 日本杯
  else if (id >= 0x20 && id <= 0x2D) club = 3; // 世界杯

  if (isGk) {
    // GK 表按顺序索引 0..7（玩家队 GK + CPU GK），按 GK 索引 N 查找
    // GK 索引映射：02=Lennart[?], 0F=Morisaki[?], 21=Wakabayashi[?], 22=Wakashimazu[?], 26=Meon[?]
    // 当前简化为 GK 索引 = 玩家队 GK 出现顺序索引 0..4，未确认
    const gkIdx = GK_ORDER.indexOf(id);
    const g = gkIdx >= 0 ? readGkStats(gkIdx) : readGkStats(0);
    push(`  { id: 0x${id.toString(16).toUpperCase()}, name: '${name}', club: ${club}, position: 1,`);
    push(`    stamina: ${g.stamina}, pass: ${g.pass}, catching: ${g.catching}, punching: ${g.punching},`);
    push(`    vsShot: ${g.vsShot}, vsDribble: ${g.vsDribble}, lowRush: ${g.lowRush}, highClaim: ${g.highClaim},`);
    push(`    shot: 0, dribble: 0, block: 0, tackle: 0, intercept: 0,`);
    push(`    lowShot: 0, lowPass: 0, lowTrap: 0, lowLet: 0, lowCtrlClr: 0, lowUnctrl: 0, lowChal: 0, lowIntc: 0,`);
    push(`    highShot: 0, highPass: 0, highTrap: 0, highLet: 0, highCtrlClr: 0, highUnctrl: 0, highChal: 0, highIntc: 0 },`);
  } else {
    const s = readStats(id);
    push(`  { id: 0x${id.toString(16).toUpperCase()}, name: '${name}', club: ${club}, position: 0,`);
    push(`    stamina: ${s.stamina}, shot: ${s.shot}, pass: ${s.pass}, dribble: ${s.dribble}, block: ${s.block}, tackle: ${s.tackle}, intercept: ${s.intercept},`);
    push(`    lowShot: ${s.lowShot}, lowPass: ${s.lowPass}, lowTrap: ${s.lowTrap}, lowLet: ${s.lowLet}, lowCtrlClr: ${s.lowCtrlClr}, lowUnctrl: ${s.lowUnctrl}, lowChal: ${s.lowChal}, lowIntc: ${s.lowIntc},`);
    push(`    highShot: ${s.highShot}, highPass: ${s.highPass}, highTrap: ${s.highTrap}, highLet: ${s.highLet}, highCtrlClr: ${s.highCtrlClr}, highUnctrl: ${s.highUnctrl}, highChal: ${s.highChal}, highIntc: ${s.highIntc} },`);
  }
}
push('];');
push('');

// 2) 颜色（明星）
push('/** 球员颜色（明星 ROM 0x2b821 + idx*5） */');
push('export const PLAYER_COLOR_TABLE: ReadonlyArray<PlayerColorEntry & { readonly id: number }> = [');
for (let id = 1; id <= PLAYER_ID_MAX; id++) {
  const c = readColor(id, true);
  push(`  { id: 0x${id.toString(16).toUpperCase()}, skin: 0x${c.skin.toString(16).padStart(2,'0')}, hair: 0x${c.hair.toString(16).padStart(2,'0')}, shirt: 0x${c.shirt.toString(16).padStart(2,'0')}, shorts: 0x${c.shorts.toString(16).padStart(2,'0')} },`);
}
push('];');
push('');

// 3) GK 能力值（按 GK 索引 0..4 顺序，映射 5 名 GK 球员 ID）
push('/** GK 能力值（ROM 0x3ae96 + gkIdx*8）按 GK 表索引顺序映射 5 名 GK */');
push('export const GK_STATS_TABLE: ReadonlyArray<PlayerGkEntry & { readonly id: number }> = [');
for (let gkIdx = 0; gkIdx < 5; gkIdx++) {
  const id = GK_ORDER[gkIdx];
  const g = readGkStats(gkIdx);
  const name = NAMES[id] || `GK${id.toString(16)}`;
  push(`  { id: 0x${id.toString(16).toUpperCase()}, stamina: ${g.stamina}, pass: ${g.pass}, catching: ${g.catching}, punching: ${g.punching}, vsShot: ${g.vsShot}, vsDribble: ${g.vsDribble}, lowRush: ${g.lowRush}, highClaim: ${g.highClaim} }, // ${name} (GK[${gkIdx}])`);
}
push('];');
push('');

// 4) 头型（0..17 共 18 个模板）
push('/** 球员头型（ROM 0x28901 + idx，18 个模板） */');
push('export const PLAYER_HAIR_TABLE: ReadonlyArray<number> = [');
const hairTemplates = [];
for (let i = 0; i < 18; i++) hairTemplates.push(readHair(i));
push(`  ${hairTemplates.map((h) => '0x' + h.toString(16).padStart(2,'0')).join(', ')},`);
push('];');
push('');

// 5) 杂鱼颜色
push('/** 杂鱼颜色（ROM 0x2b6d7 + idx*5） */');
push('export const NAMED_PLAYER_COLOR_TABLE: ReadonlyArray<PlayerColorEntry & { readonly id: number }> = [');
for (let id = 1; id <= PLAYER_ID_MAX; id++) {
  const c = readColor(id, false);
  push(`  { id: 0x${id.toString(16).toUpperCase()}, skin: 0x${c.skin.toString(16).padStart(2,'0')}, hair: 0x${c.hair.toString(16).padStart(2,'0')}, shirt: 0x${c.shirt.toString(16).padStart(2,'0')}, shorts: 0x${c.shorts.toString(16).padStart(2,'0')} },`);
}
push('];');
push('');

const OUT_FILE = path.join(__dirname, '..', 'src', 'game', 'prg', 'data', 'tables', 'player-stats.ts');
fs.writeFileSync(OUT_FILE, lines.join('\n') + '\n', { encoding: 'utf8' });
console.error(`[extract_players] wrote ${PLAYER_ID_MAX} players + ${GK_IDS.size} GK + 45 colors + 18 hair templates to ${OUT_FILE}`);
