/**
 * player-stats.ts — 球员档案具象化表（从真 ROM 提取）
 *
 * 数据源：
 *   - 能力值 (24 字节)         ROM 0x39fde + idx*24
 *   - GK 能力值 (8 字节)       ROM 0x3ae96 + idx*8
 *   - 颜色 (明星)              ROM 0x2b821 + idx*5
 *   - 头型 (PlayModList 18)    ROM 0x28901 + idx
 *
 * 重生脚本：scripts/extract_players.cjs
 * 用法：cd scripts && node extract_players.cjs > ../src/game/prg/data/tables/player-stats.ts
 */

import type { PlayerProfile } from '../../code/player/PlayerQueryService';

export interface PlayerColorEntry {
  readonly skin: number;
  readonly hair: number;
  readonly shirt: number;
  readonly shorts: number;
}

export interface PlayerGkEntry {
  readonly stamina: number;
  readonly pass: number;
  readonly catching: number;
  readonly punching: number;
  readonly vsShot: number;
  readonly vsDribble: number;
}

/** 球员档案表（明星 0x01-0x2D 共 45 项，杂鱼不在此表） */
export const PLAYER_TABLE: ReadonlyArray<PlayerProfile> = [
  { id: 0x1, name: 'Tsubasa', club: 1, position: 0, shot:12, dribble:14, pass:23, tackle:16, speed:0, stamina:21 },
  { id: 0x2, name: 'Lennart', club: 1, position: 1, shot:0, dribble:0, pass:10, tackle:0, speed:0, stamina:0 },
  { id: 0x3, name: 'Lima', club: 1, position: 0, shot:2, dribble:2, pass:7, tackle:4, speed:0, stamina:1 },
  { id: 0x4, name: 'Marini', club: 1, position: 0, shot:0, dribble:2, pass:3, tackle:4, speed:0, stamina:0 },
  { id: 0x5, name: 'Amaral', club: 1, position: 0, shot:4, dribble:2, pass:8, tackle:4, speed:0, stamina:5 },
  { id: 0x6, name: 'Dottil', club: 1, position: 0, shot:1, dribble:2, pass:6, tackle:4, speed:0, stamina:2 },
  { id: 0x7, name: 'Battista', club: 1, position: 0, shot:9, dribble:5, pass:14, tackle:7, speed:0, stamina:15 },
  { id: 0x8, name: 'Tahamata', club: 1, position: 0, shot:10, dribble:16, pass:13, tackle:18, speed:0, stamina:14 },
  { id: 0x9, name: 'Babinton', club: 1, position: 0, shot:2, dribble:7, pass:5, tackle:9, speed:0, stamina:4 },
  { id: 0xA, name: 'Gil', club: 1, position: 0, shot:0, dribble:4, pass:2, tackle:6, speed:0, stamina:0 },
  { id: 0xB, name: 'Platton', club: 1, position: 0, shot:0, dribble:2, pass:1, tackle:4, speed:0, stamina:0 },
  { id: 0xC, name: 'Urabe', club: 1, position: 0, shot:0, dribble:6, pass:8, tackle:8, speed:0, stamina:1 },
  { id: 0xD, name: 'Kishida', club: 1, position: 0, shot:8, dribble:11, pass:15, tackle:13, speed:0, stamina:11 },
  { id: 0xE, name: 'Nakayama', club: 1, position: 0, shot:0, dribble:9, pass:2, tackle:11, speed:0, stamina:0 },
  { id: 0xF, name: 'Morisaki', club: 1, position: 1, shot:0, dribble:0, pass:25, tackle:0, speed:0, stamina:0 },
  { id: 0x10, name: 'Takasugu', club: 1, position: 0, shot:7, dribble:2, pass:11, tackle:4, speed:0, stamina:3 },
  { id: 0x11, name: 'Misaki', club: 1, position: 0, shot:8, dribble:16, pass:15, tackle:18, speed:0, stamina:5 },
  { id: 0x12, name: 'Izawa', club: 1, position: 0, shot:4, dribble:8, pass:7, tackle:12, speed:0, stamina:2 },
  { id: 0x13, name: 'Taki', club: 1, position: 0, shot:2, dribble:13, pass:8, tackle:17, speed:0, stamina:1 },
  { id: 0x14, name: 'Ishizaki', club: 1, position: 0, shot:11, dribble:13, pass:17, tackle:15, speed:0, stamina:7 },
  { id: 0x15, name: 'Nitta', club: 1, position: 0, shot:1, dribble:2, pass:4, tackle:4, speed:0, stamina:2 },
  { id: 0x16, name: 'Kisugi', club: 2, position: 0, shot:6, dribble:2, pass:10, tackle:4, speed:0, stamina:7 },
  { id: 0x17, name: 'Masao', club: 2, position: 0, shot:19, dribble:27, pass:32, tackle:14, speed:0, stamina:28 },
  { id: 0x18, name: 'Kazuo', club: 2, position: 0, shot:0, dribble:0, pass:1, tackle:0, speed:0, stamina:0 },
  { id: 0x19, name: 'Sano', club: 2, position: 0, shot:0, dribble:0, pass:1, tackle:0, speed:0, stamina:0 },
  { id: 0x1A, name: 'Hyuga', club: 2, position: 0, shot:1, dribble:1, pass:4, tackle:0, speed:0, stamina:4 },
  { id: 0x1B, name: 'Souta', club: 2, position: 0, shot:1, dribble:1, pass:4, tackle:0, speed:0, stamina:4 },
  { id: 0x1C, name: 'Jitou', club: 2, position: 0, shot:9, dribble:2, pass:10, tackle:0, speed:0, stamina:9 },
  { id: 0x1D, name: 'Matsuyama', club: 2, position: 0, shot:9, dribble:2, pass:8, tackle:0, speed:0, stamina:7 },
  { id: 0x1E, name: 'Sorimachi', club: 2, position: 0, shot:4, dribble:3, pass:5, tackle:2, speed:0, stamina:5 },
  { id: 0x1F, name: 'Sawada', club: 2, position: 0, shot:4, dribble:2, pass:5, tackle:2, speed:0, stamina:5 },
  { id: 0x20, name: 'Misugi', club: 3, position: 0, shot:14, dribble:12, pass:23, tackle:14, speed:0, stamina:14 },
  { id: 0x21, name: 'Wakabayashi', club: 3, position: 1, shot:0, dribble:0, pass:50, tackle:0, speed:0, stamina:0 },
  { id: 0x22, name: 'Wakashimazu', club: 3, position: 1, shot:0, dribble:0, pass:50, tackle:0, speed:0, stamina:0 },
  { id: 0x23, name: 'Satilst', club: 3, position: 0, shot:17, dribble:14, pass:25, tackle:15, speed:0, stamina:17 },
  { id: 0x24, name: 'Riverio', club: 3, position: 0, shot:14, dribble:14, pass:25, tackle:15, speed:0, stamina:17 },
  { id: 0x25, name: 'DaSilva', club: 3, position: 0, shot:17, dribble:4, pass:6, tackle:5, speed:0, stamina:9 },
  { id: 0x26, name: 'Meon', club: 3, position: 1, shot:0, dribble:0, pass:3, tackle:0, speed:0, stamina:160 },
  { id: 0x27, name: 'Toninho', club: 3, position: 0, shot:17, dribble:12, pass:23, tackle:12, speed:0, stamina:17 },
  { id: 0x28, name: 'Nei', club: 3, position: 0, shot:17, dribble:16, pass:23, tackle:14, speed:0, stamina:17 },
  { id: 0x29, name: 'Zagalo', club: 3, position: 0, shot:17, dribble:4, pass:11, tackle:4, speed:0, stamina:9 },
  { id: 0x2A, name: 'Dircil', club: 3, position: 0, shot:17, dribble:4, pass:21, tackle:4, speed:0, stamina:9 },
  { id: 0x2B, name: 'Carlos', club: 3, position: 0, shot:19, dribble:14, pass:30, tackle:14, speed:0, stamina:19 },
  { id: 0x2C, name: 'Santamaria', club: 3, position: 0, shot:19, dribble:14, pass:30, tackle:14, speed:0, stamina:19 },
  { id: 0x2D, name: 'Jethrio', club: 3, position: 0, shot:19, dribble:14, pass:30, tackle:14, speed:0, stamina:19 },
];

/** 球员颜色（明星 ROM 0x2b821 + idx*5） */
export const PLAYER_COLOR_TABLE: ReadonlyArray<PlayerColorEntry & { readonly id: number }> = [
  { id: 0x1, skin: 0x0f, hair: 0x30, shirt: 0x30, shorts: 0x30 },
  { id: 0x2, skin: 0x37, hair: 0x30, shirt: 0x30, shorts: 0x30 },
  { id: 0x3, skin: 0x37, hair: 0x30, shirt: 0x30, shorts: 0x30 },
  { id: 0x4, skin: 0x0f, hair: 0x30, shirt: 0x30, shorts: 0x30 },
  { id: 0x5, skin: 0x16, hair: 0x30, shirt: 0x30, shorts: 0x30 },
  { id: 0x6, skin: 0x26, hair: 0x30, shirt: 0x30, shorts: 0x30 },
  { id: 0x7, skin: 0x10, hair: 0x30, shirt: 0x30, shorts: 0x30 },
  { id: 0x8, skin: 0x0f, hair: 0x30, shirt: 0x11, shorts: 0x30 },
  { id: 0x9, skin: 0x0f, hair: 0x30, shirt: 0x11, shorts: 0x30 },
  { id: 0xA, skin: 0x0f, hair: 0x30, shirt: 0x11, shorts: 0x30 },
  { id: 0xB, skin: 0x0f, hair: 0x30, shirt: 0x00, shorts: 0x30 },
  { id: 0xC, skin: 0x0f, hair: 0x30, shirt: 0x11, shorts: 0x30 },
  { id: 0xD, skin: 0x17, hair: 0x30, shirt: 0x11, shorts: 0x30 },
  { id: 0xE, skin: 0x0f, hair: 0x30, shirt: 0x11, shorts: 0x30 },
  { id: 0xF, skin: 0x07, hair: 0x30, shirt: 0x11, shorts: 0x30 },
  { id: 0x10, skin: 0x0f, hair: 0x30, shirt: 0x11, shorts: 0x30 },
  { id: 0x11, skin: 0x0f, hair: 0x30, shirt: 0x11, shorts: 0x30 },
  { id: 0x12, skin: 0x00, hair: 0x30, shirt: 0x11, shorts: 0x30 },
  { id: 0x13, skin: 0x0f, hair: 0x16, shirt: 0x30, shorts: 0x30 },
  { id: 0x14, skin: 0x0f, hair: 0x16, shirt: 0x30, shorts: 0x30 },
  { id: 0x15, skin: 0x07, hair: 0x16, shirt: 0x30, shorts: 0x30 },
  { id: 0x16, skin: 0x0f, hair: 0x16, shirt: 0x30, shorts: 0x30 },
  { id: 0x17, skin: 0x07, hair: 0x16, shirt: 0x30, shorts: 0x30 },
  { id: 0x18, skin: 0x00, hair: 0x16, shirt: 0x30, shorts: 0x30 },
  { id: 0x19, skin: 0x00, hair: 0x16, shirt: 0x30, shorts: 0x30 },
  { id: 0x1A, skin: 0x0f, hair: 0x16, shirt: 0x30, shorts: 0x30 },
  { id: 0x1B, skin: 0x0f, hair: 0x16, shirt: 0x30, shorts: 0x30 },
  { id: 0x1C, skin: 0x15, hair: 0x16, shirt: 0x30, shorts: 0x30 },
  { id: 0x1D, skin: 0x30, hair: 0x30, shirt: 0x11, shorts: 0x30 },
  { id: 0x1E, skin: 0x0f, hair: 0x30, shirt: 0x11, shorts: 0x30 },
  { id: 0x1F, skin: 0x00, hair: 0x14, shirt: 0x30, shorts: 0x30 },
  { id: 0x20, skin: 0x00, hair: 0x14, shirt: 0x30, shorts: 0x30 },
  { id: 0x21, skin: 0x16, hair: 0x2c, shirt: 0x16, shorts: 0x30 },
  { id: 0x22, skin: 0x11, hair: 0x30, shirt: 0x22, shorts: 0x30 },
  { id: 0x23, skin: 0x00, hair: 0x29, shirt: 0x30, shorts: 0x30 },
  { id: 0x24, skin: 0x00, hair: 0x29, shirt: 0x30, shorts: 0x30 },
  { id: 0x25, skin: 0x37, hair: 0x00, shirt: 0x30, shorts: 0x30 },
  { id: 0x26, skin: 0x25, hair: 0x00, shirt: 0x30, shorts: 0x30 },
  { id: 0x27, skin: 0x27, hair: 0x16, shirt: 0x00, shorts: 0x30 },
  { id: 0x28, skin: 0x37, hair: 0x16, shirt: 0x00, shorts: 0x30 },
  { id: 0x29, skin: 0x00, hair: 0x16, shirt: 0x00, shorts: 0x30 },
  { id: 0x2A, skin: 0x00, hair: 0x11, shirt: 0x37, shorts: 0x30 },
  { id: 0x2B, skin: 0x07, hair: 0x11, shirt: 0x37, shorts: 0x30 },
  { id: 0x2C, skin: 0x0f, hair: 0x19, shirt: 0x30, shorts: 0x30 },
  { id: 0x2D, skin: 0x0f, hair: 0x19, shirt: 0x30, shorts: 0x30 },
];

/** GK 能力值（ROM 0x3ae96 + idx*8） */
export const GK_STATS_TABLE: ReadonlyArray<PlayerGkEntry & { readonly id: number }> = [
  { id: 0x2, stamina: 0, pass: 10, catching: 4, punching: 4, vsShot: 0, vsDribble: 0 }, // Lennart
  { id: 0xF, stamina: 0, pass: 25, catching: 44, punching: 44, vsShot: 30, vsDribble: 30 }, // Morisaki
  { id: 0x21, stamina: 0, pass: 50, catching: 94, punching: 102, vsShot: 93, vsDribble: 93 }, // Wakabayashi
  { id: 0x22, stamina: 0, pass: 50, catching: 82, punching: 108, vsShot: 101, vsDribble: 101 }, // Wakashimazu
  { id: 0x26, stamina: 160, pass: 3, catching: 144, punching: 3, vsShot: 96, vsDribble: 4 }, // Meon
];

/** 球员头型（ROM 0x28901 + idx，18 个模板） */
export const PLAYER_HAIR_TABLE: ReadonlyArray<number> = [
  0x02, 0x01, 0x03, 0x06, 0x0b, 0x05, 0x03, 0x03, 0x01, 0x07, 0x04, 0x04, 0x02, 0x02, 0x04, 0x02, 0x0c, 0x0e,
];

/** 杂鱼颜色（ROM 0x2b6d7 + idx*5） */
export const NAMED_PLAYER_COLOR_TABLE: ReadonlyArray<PlayerColorEntry & { readonly id: number }> = [
  { id: 0x1, skin: 0x0f, hair: 0x00, shirt: 0x30, shorts: 0x30 },
  { id: 0x2, skin: 0x0f, hair: 0x16, shirt: 0x00, shorts: 0x30 },
  { id: 0x3, skin: 0x0f, hair: 0x11, shirt: 0x37, shorts: 0x30 },
  { id: 0x4, skin: 0x0f, hair: 0x19, shirt: 0x30, shorts: 0x30 },
  { id: 0x5, skin: 0x0f, hair: 0x12, shirt: 0x31, shorts: 0x30 },
  { id: 0x6, skin: 0x0f, hair: 0x30, shirt: 0x24, shorts: 0x30 },
  { id: 0x7, skin: 0x0f, hair: 0x37, shirt: 0x30, shorts: 0x30 },
  { id: 0x8, skin: 0x0f, hair: 0x00, shirt: 0x0f, shorts: 0x30 },
  { id: 0x9, skin: 0x27, hair: 0x16, shirt: 0x16, shorts: 0x30 },
  { id: 0xA, skin: 0x0f, hair: 0x31, shirt: 0x30, shorts: 0x30 },
  { id: 0xB, skin: 0x27, hair: 0x30, shirt: 0x29, shorts: 0x30 },
  { id: 0xC, skin: 0x00, hair: 0x00, shirt: 0x00, shorts: 0x00 },
  { id: 0xD, skin: 0x00, hair: 0x23, shirt: 0x30, shorts: 0x30 },
  { id: 0xE, skin: 0x00, hair: 0x37, shirt: 0x16, shorts: 0x30 },
  { id: 0xF, skin: 0x0f, hair: 0x29, shirt: 0x19, shorts: 0x30 },
  { id: 0x10, skin: 0x0f, hair: 0x27, shirt: 0x16, shorts: 0x30 },
  { id: 0x11, skin: 0x0f, hair: 0x11, shirt: 0x11, shorts: 0x30 },
  { id: 0x12, skin: 0x0f, hair: 0x11, shirt: 0x16, shorts: 0x30 },
  { id: 0x13, skin: 0x0f, hair: 0x30, shirt: 0x29, shorts: 0x30 },
  { id: 0x14, skin: 0x37, hair: 0x30, shirt: 0x16, shorts: 0x30 },
  { id: 0x15, skin: 0x27, hair: 0x37, shirt: 0x37, shorts: 0x30 },
  { id: 0x16, skin: 0x0f, hair: 0x30, shirt: 0x26, shorts: 0x30 },
  { id: 0x17, skin: 0x37, hair: 0x11, shirt: 0x30, shorts: 0x30 },
  { id: 0x18, skin: 0x0f, hair: 0x29, shirt: 0x16, shorts: 0x30 },
  { id: 0x19, skin: 0x37, hair: 0x30, shirt: 0x11, shorts: 0x30 },
  { id: 0x1A, skin: 0x37, hair: 0x26, shirt: 0x30, shorts: 0x30 },
  { id: 0x1B, skin: 0x0f, hair: 0x31, shirt: 0x0f, shorts: 0x30 },
  { id: 0x1C, skin: 0x27, hair: 0x30, shirt: 0x0f, shorts: 0x30 },
  { id: 0x1D, skin: 0x31, hair: 0x28, shirt: 0x1b, shorts: 0x30 },
  { id: 0x1E, skin: 0x0f, hair: 0x22, shirt: 0x25, shorts: 0x30 },
  { id: 0x1F, skin: 0x00, hair: 0x00, shirt: 0x00, shorts: 0x00 },
  { id: 0x20, skin: 0x09, hair: 0x26, shirt: 0x33, shorts: 0x30 },
  { id: 0x21, skin: 0x25, hair: 0x31, shirt: 0x27, shorts: 0x30 },
  { id: 0x22, skin: 0x0f, hair: 0x37, shirt: 0x22, shorts: 0x30 },
  { id: 0x23, skin: 0x11, hair: 0x19, shirt: 0x29, shorts: 0x30 },
  { id: 0x24, skin: 0x05, hair: 0x19, shirt: 0x27, shorts: 0x30 },
  { id: 0x25, skin: 0x00, hair: 0x00, shirt: 0x00, shorts: 0x00 },
  { id: 0x26, skin: 0x00, hair: 0x16, shirt: 0x2c, shorts: 0x30 },
  { id: 0x27, skin: 0x01, hair: 0x16, shirt: 0x16, shorts: 0x30 },
  { id: 0x28, skin: 0x00, hair: 0x00, shirt: 0x00, shorts: 0x00 },
  { id: 0x29, skin: 0x26, hair: 0x10, shirt: 0x27, shorts: 0x30 },
  { id: 0x2A, skin: 0x0f, hair: 0x0f, shirt: 0x00, shorts: 0x30 },
  { id: 0x2B, skin: 0x00, hair: 0x00, shirt: 0x00, shorts: 0x00 },
  { id: 0x2C, skin: 0x00, hair: 0x00, shirt: 0x00, shorts: 0x00 },
  { id: 0x2D, skin: 0x27, hair: 0x2b, shirt: 0x28, shorts: 0x30 },
];

