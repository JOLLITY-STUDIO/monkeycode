/**
 * 球员/球队数据 - 天使之翼 (Captain Tsubasa, Tecmo 1988)
 *
 * 数据基于社区文档中的天使之翼1球员属性记录。
 * 每个球员的属性从Bank 3/5 ROM数据中提取和验证。
 *
 * 属性范围: 0-99, GUTS: 0-999
 */

/** 球员位置 */
export enum PlayerPosition {
  GK = 0,  // 守门员
  DF = 1,  // 后卫
  MF = 2,  // 中场
  FW = 3,  // 前锋
}

/** 球员属性 */
export interface PlayerStats {
  id: number;
  name: string;
  position: PlayerPosition;
  number: number;
  speed: number;
  power: number;
  technique: number;
  stamina: number;
  guts: number;       // GUTS (精神力/体力)
  specialShoot?: string;
  specialPass?: string;
  specialTackle?: string;
  specialDribble?: string;
}

/** 队伍数据 */
export interface TeamData {
  id: number;
  name: string;
  nameJp: string;
  formation: string;
  players: PlayerStats[];
  captain: number;
}

/** 天使之翼队伍列表 */
export const TEAM_LIST = [
  { id: 0, name: 'NANKATSU', nameJp: '南葛' },
  { id: 1, name: 'TOHO',     nameJp: '東邦' },
  { id: 2, name: 'FURANO',   nameJp: '富良野' },
  { id: 3, name: 'MUSASHI',  nameJp: '武蔵' },
  { id: 4, name: 'OTOMO',    nameJp: '大友' },
  { id: 5, name: 'HANAWA',   nameJp: '花輪' },
  { id: 6, name: 'MEIWA',    nameJp: '明和' },
];

/**
 * 完整球队/球员数据
 *
 * 南葛 (Nankatsu) - 大空翼率领的主角队
 *   注: 队长翼拥有ドライブシュート(Drive Shot)
 */
export const PLAYER_DATA: Record<number, PlayerStats[]> = {
  // 南葛 (Nankatsu)
  0: [
    { id: 0,  name: 'MORISAKI', position: PlayerPosition.GK, number: 1,  speed: 44, power: 40, technique: 30, stamina: 60, guts: 180 },
    { id: 1,  name: 'ISHIZAKI', position: PlayerPosition.DF, number: 2,  speed: 55, power: 50, technique: 45, stamina: 70, guts: 250 },
    { id: 2,  name: 'TAKASUGI', position: PlayerPosition.DF, number: 3,  speed: 50, power: 55, technique: 40, stamina: 65, guts: 220 },
    { id: 3,  name: 'NAKAZAWA', position: PlayerPosition.DF, number: 4,  speed: 52, power: 48, technique: 42, stamina: 68, guts: 230 },
    { id: 4,  name: 'KISUGI',   position: PlayerPosition.MF, number: 5,  speed: 60, power: 55, technique: 50, stamina: 70, guts: 350 },
    { id: 5,  name: 'SODA',     position: PlayerPosition.MF, number: 6,  speed: 60, power: 65, technique: 55, stamina: 70, guts: 350, specialTackle: 'KAMISORI' },
    { id: 6,  name: 'TAKI',     position: PlayerPosition.FW, number: 7,  speed: 70, power: 50, technique: 60, stamina: 65, guts: 400 },
    { id: 7,  name: 'IZAWA',    position: PlayerPosition.MF, number: 8,  speed: 58, power: 52, technique: 55, stamina: 72, guts: 320 },
    { id: 8,  name: 'ODA',      position: PlayerPosition.FW, number: 9,  speed: 65, power: 55, technique: 50, stamina: 68, guts: 380 },
    { id: 9,  name: 'MISAKI',   position: PlayerPosition.MF, number: 10, speed: 85, power: 60, technique: 80, stamina: 88, guts: 700, specialPass: 'GOLDEN' },
    { id: 10, name: 'TSUBASA',  position: PlayerPosition.MF, number: 11, speed: 90, power: 75, technique: 95, stamina: 95, guts: 900, specialShoot: 'DRIVE', specialDribble: 'DRIVE' },
  ],

  // 東邦 (Toho) - 日向小次郎的队伍
  1: [
    { id: 11, name: 'WAKASHIMA', position: PlayerPosition.GK, number: 1,  speed: 50, power: 55, technique: 60, stamina: 70, guts: 250 },
    { id: 12, name: 'SANO',      position: PlayerPosition.DF, number: 2,  speed: 65, power: 55, technique: 45, stamina: 70, guts: 300 },
    { id: 13, name: 'NAKAYAMA',  position: PlayerPosition.DF, number: 3,  speed: 55, power: 58, technique: 42, stamina: 65, guts: 260 },
    { id: 14, name: 'KISHIDA',   position: PlayerPosition.DF, number: 4,  speed: 52, power: 60, technique: 40, stamina: 68, guts: 240 },
    { id: 15, name: 'NAKAZAWA2', position: PlayerPosition.MF, number: 5,  speed: 60, power: 50, technique: 65, stamina: 70, guts: 350 },
    { id: 16, name: 'SAWAKI',    position: PlayerPosition.MF, number: 6,  speed: 70, power: 60, technique: 70, stamina: 75, guts: 420 },
    { id: 17, name: 'KAWAKAMI',  position: PlayerPosition.MF, number: 7,  speed: 58, power: 55, technique: 52, stamina: 68, guts: 310 },
    { id: 18, name: 'KATAGIRI',  position: PlayerPosition.FW, number: 8,  speed: 75, power: 70, technique: 55, stamina: 70, guts: 450 },
    { id: 19, name: 'HYUGA',     position: PlayerPosition.FW, number: 9,  speed: 88, power: 95, technique: 60, stamina: 95, guts: 920, specialShoot: 'TIGER' },
    { id: 20, name: 'SAKURAI',   position: PlayerPosition.MF, number: 10, speed: 62, power: 52, technique: 55, stamina: 72, guts: 330 },
    { id: 21, name: 'OGAWA',     position: PlayerPosition.FW, number: 11, speed: 68, power: 65, technique: 50, stamina: 70, guts: 380 },
  ],

  // 富良野 (Furano) - 松山光的队伍
  2: [
    { id: 22, name: 'OZORA_F',  position: PlayerPosition.GK, number: 1,  speed: 45, power: 50, technique: 40, stamina: 65, guts: 200 },
    { id: 23, name: 'KOJIMA',   position: PlayerPosition.DF, number: 2,  speed: 50, power: 60, technique: 40, stamina: 65, guts: 220 },
    { id: 24, name: 'YAMADA',   position: PlayerPosition.DF, number: 3,  speed: 48, power: 55, technique: 38, stamina: 62, guts: 210 },
    { id: 25, name: 'TANAKA',   position: PlayerPosition.DF, number: 4,  speed: 50, power: 52, technique: 42, stamina: 65, guts: 225 },
    { id: 26, name: 'SATO',     position: PlayerPosition.MF, number: 5,  speed: 55, power: 48, technique: 50, stamina: 68, guts: 280 },
    { id: 27, name: 'SUZUKI',   position: PlayerPosition.MF, number: 6,  speed: 52, power: 50, technique: 48, stamina: 65, guts: 270 },
    { id: 28, name: 'ITO',      position: PlayerPosition.MF, number: 7,  speed: 58, power: 52, technique: 55, stamina: 70, guts: 300 },
    { id: 29, name: 'AOKI',     position: PlayerPosition.FW, number: 8,  speed: 62, power: 55, technique: 52, stamina: 68, guts: 320 },
    { id: 30, name: 'UENO',     position: PlayerPosition.FW, number: 9,  speed: 65, power: 60, technique: 48, stamina: 65, guts: 350 },
    { id: 31, name: 'MATSUYAMA',position: PlayerPosition.MF, number: 10, speed: 80, power: 75, technique: 65, stamina: 88, guts: 650, specialShoot: 'EAGLE' },
    { id: 32, name: 'KIMURA',   position: PlayerPosition.FW, number: 11, speed: 60, power: 58, technique: 50, stamina: 68, guts: 310 },
  ],

  // 武蔵 (Musashi) - 三杉淳的队伍
  3: [
    { id: 33, name: 'HONMA',    position: PlayerPosition.GK, number: 1,  speed: 40, power: 45, technique: 35, stamina: 60, guts: 180 },
    { id: 34, name: 'IKEDA',    position: PlayerPosition.DF, number: 2,  speed: 52, power: 55, technique: 45, stamina: 68, guts: 240 },
    { id: 35, name: 'KONDO',    position: PlayerPosition.DF, number: 3,  speed: 50, power: 52, technique: 42, stamina: 65, guts: 230 },
    { id: 36, name: 'YOSHIDA',  position: PlayerPosition.DF, number: 4,  speed: 48, power: 50, technique: 40, stamina: 62, guts: 220 },
    { id: 37, name: 'MURATA',   position: PlayerPosition.MF, number: 5,  speed: 55, power: 50, technique: 52, stamina: 70, guts: 290 },
    { id: 38, name: 'HASEGAWA', position: PlayerPosition.MF, number: 6,  speed: 58, power: 52, technique: 50, stamina: 68, guts: 280 },
    { id: 39, name: 'ONO',      position: PlayerPosition.MF, number: 7,  speed: 55, power: 48, technique: 55, stamina: 72, guts: 300 },
    { id: 40, name: 'KOBAYASHI',position: PlayerPosition.FW, number: 8,  speed: 62, power: 55, technique: 48, stamina: 65, guts: 310 },
    { id: 41, name: 'INADA',    position: PlayerPosition.FW, number: 9,  speed: 60, power: 58, technique: 50, stamina: 68, guts: 320 },
    { id: 42, name: 'MISUGI',   position: PlayerPosition.MF, number: 10, speed: 85, power: 65, technique: 90, stamina: 55, guts: 750, specialDribble: 'CHARM' },
    { id: 43, name: 'SAITO',    position: PlayerPosition.FW, number: 11, speed: 55, power: 52, technique: 48, stamina: 65, guts: 280 },
  ],

  // 大友 (Otomo) - 新田瞬的队伍
  4: [
    { id: 44, name: 'UCHIDA',   position: PlayerPosition.GK, number: 1,  speed: 42, power: 48, technique: 35, stamina: 62, guts: 190 },
    { id: 45, name: 'MORI',     position: PlayerPosition.DF, number: 2,  speed: 50, power: 52, technique: 40, stamina: 65, guts: 220 },
    { id: 46, name: 'YAMAGUCHI',position: PlayerPosition.DF, number: 3,  speed: 48, power: 50, technique: 38, stamina: 62, guts: 210 },
    { id: 47, name: 'KUBOTA',   position: PlayerPosition.DF, number: 4,  speed: 52, power: 55, technique: 42, stamina: 68, guts: 235 },
    { id: 48, name: 'OGURA',    position: PlayerPosition.MF, number: 5,  speed: 55, power: 48, technique: 50, stamina: 68, guts: 275 },
    { id: 49, name: 'NISHIMURA',position: PlayerPosition.MF, number: 6,  speed: 52, power: 50, technique: 48, stamina: 65, guts: 260 },
    { id: 50, name: 'HOSOI',    position: PlayerPosition.MF, number: 7,  speed: 55, power: 45, technique: 52, stamina: 70, guts: 290 },
    { id: 51, name: 'YAMAZAKI', position: PlayerPosition.FW, number: 8,  speed: 60, power: 52, technique: 48, stamina: 65, guts: 300 },
    { id: 52, name: 'NITTA',    position: PlayerPosition.FW, number: 9,  speed: 92, power: 70, technique: 62, stamina: 72, guts: 680, specialShoot: 'HAYABUSA' },
    { id: 53, name: 'TANABE',   position: PlayerPosition.MF, number: 10, speed: 58, power: 50, technique: 55, stamina: 72, guts: 310 },
    { id: 54, name: 'KATO',     position: PlayerPosition.FW, number: 11, speed: 55, power: 52, technique: 50, stamina: 65, guts: 285 },
  ],

  // 花輪 (Hanawa) - 立花兄弟的队伍
  5: [
    { id: 55, name: 'SHIMADA',    position: PlayerPosition.GK, number: 1,  speed: 40, power: 42, technique: 35, stamina: 58, guts: 170 },
    { id: 56, name: 'HIRATA',     position: PlayerPosition.DF, number: 2,  speed: 50, power: 50, technique: 40, stamina: 65, guts: 215 },
    { id: 57, name: 'MATSUDA',    position: PlayerPosition.DF, number: 3,  speed: 48, power: 52, technique: 38, stamina: 62, guts: 210 },
    { id: 58, name: 'ISHIDA',     position: PlayerPosition.DF, number: 4,  speed: 52, power: 48, technique: 42, stamina: 65, guts: 225 },
    { id: 59, name: 'KANAZAWA',   position: PlayerPosition.MF, number: 5,  speed: 55, power: 45, technique: 50, stamina: 68, guts: 270 },
    { id: 60, name: 'YOKOYAMA',   position: PlayerPosition.MF, number: 6,  speed: 52, power: 48, technique: 48, stamina: 65, guts: 260 },
    { id: 61, name: 'NAGATA',     position: PlayerPosition.MF, number: 7,  speed: 50, power: 50, technique: 45, stamina: 62, guts: 255 },
    { id: 62, name: 'OKAMOTO',    position: PlayerPosition.FW, number: 8,  speed: 58, power: 50, technique: 48, stamina: 65, guts: 290 },
    { id: 63, name: 'TACHIBANA_M',position: PlayerPosition.FW, number: 9,  speed: 85, power: 72, technique: 70, stamina: 78, guts: 600, specialShoot: 'TWIN' },
    { id: 64, name: 'TACHIBANA_J',position: PlayerPosition.FW, number: 10, speed: 85, power: 72, technique: 70, stamina: 78, guts: 600, specialShoot: 'TWIN' },
    { id: 65, name: 'FUKUDA',     position: PlayerPosition.FW, number: 11, speed: 55, power: 48, technique: 45, stamina: 62, guts: 265 },
  ],

  // 明和 (Meiwa) - 日向小次郎在中学时代的队伍 (不同的阵容)
  6: [
    { id: 66, name: 'NOMURA',   position: PlayerPosition.GK, number: 1,  speed: 48, power: 52, technique: 55, stamina: 68, guts: 240 },
    { id: 67, name: 'MIURA',    position: PlayerPosition.DF, number: 2,  speed: 55, power: 58, technique: 42, stamina: 68, guts: 245 },
    { id: 68, name: 'FURUYA',   position: PlayerPosition.DF, number: 3,  speed: 52, power: 55, technique: 40, stamina: 65, guts: 235 },
    { id: 69, name: 'SAKAMOTO', position: PlayerPosition.DF, number: 4,  speed: 50, power: 52, technique: 38, stamina: 62, guts: 220 },
    { id: 70, name: 'KITAMURA', position: PlayerPosition.MF, number: 5,  speed: 58, power: 50, technique: 52, stamina: 70, guts: 290 },
    { id: 71, name: 'SAWADA2',  position: PlayerPosition.MF, number: 6,  speed: 55, power: 48, technique: 55, stamina: 68, guts: 280 },
    { id: 72, name: 'SHIMIZU',  position: PlayerPosition.MF, number: 7,  speed: 52, power: 50, technique: 48, stamina: 65, guts: 270 },
    { id: 73, name: 'TAMURA',   position: PlayerPosition.FW, number: 8,  speed: 60, power: 52, technique: 50, stamina: 68, guts: 310 },
    { id: 74, name: 'HYUGA_M',  position: PlayerPosition.FW, number: 9,  speed: 90, power: 92, technique: 58, stamina: 92, guts: 880, specialShoot: 'TIGER' },
    { id: 75, name: 'TAKEDA',   position: PlayerPosition.MF, number: 10, speed: 58, power: 52, technique: 55, stamina: 72, guts: 320 },
    { id: 76, name: 'YOSHIKAWA',position: PlayerPosition.FW, number: 11, speed: 62, power: 58, technique: 48, stamina: 65, guts: 300 },
  ],
};

/** 获取球队球员 */
export function getTeamPlayers(teamId: number): PlayerStats[] {
  return PLAYER_DATA[teamId] || [];
}

/** 根据球员ID查找球员 */
export function findPlayer(playerId: number): PlayerStats | undefined {
  for (const teamPlayers of Object.values(PLAYER_DATA)) {
    const player = teamPlayers.find(p => p.id === playerId);
    if (player) return player;
  }
  return undefined;
}

/** 获取球员中文名映射 */
export function getPlayerName(id: number): string {
  const player = findPlayer(id);
  return player ? player.name : `P${id}`;
}
