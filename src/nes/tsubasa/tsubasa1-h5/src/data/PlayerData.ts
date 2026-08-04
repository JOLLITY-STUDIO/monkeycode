/**
 * 球员/球队数据 - 天使之翼 (Captain Tsubasa, Tecmo 1988)
 *
 * ⚠️ TODO: 数据需要从 ROM Bank 3/5 中实际提取。
 * 当前为占位结构，所有具体数值待 ROM 分析后填充。
 *
 * ROM 数据位置:
 *   - Bank 3 ($8000-$BFFF): 球员属性数据表、球队数据指针
 *   - Bank 5 ($8000-$BFFF): 更多比赛相关数据
 *
 * 数据格式: ROM 中球员数据为紧凑二进制编码（非 ASCII），
 * 需要通过 Bank 3 的解码逻辑（$C000-$C400区域的函数）来理解。
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
  /** ROM 中的内部ID */
  id: number;
  /** 名字（TODO: 从 ROM tile 编码提取） */
  name: string;
  position: PlayerPosition;
  number: number;
  /** TODO: 从 ROM 提取真实数值 */
  speed: number;
  power: number;
  technique: number;
  stamina: number;
  guts: number;
}

/** 队伍数据 */
export interface TeamData {
  id: number;
  /** 队伍名（TODO: 从 ROM 提取） */
  name: string;
  nameJp: string;
  formation: string;
  players: PlayerStats[];
  captain: number;
}

// ============================================================
// ⚠️ 以下数据为占位结构，尚未从 ROM 提取真实数据
// ============================================================

/**
 * 待确认：天使之翼1代中的队伍列表
 * 根据 ROM Bank 3 分析，实际队伍数据需要从 ROM 指针表提取
 */
export const TEAM_LIST = [
  { id: 0, name: 'NANKATSU',  nameJp: '南葛' },
  // TODO: 从 ROM 提取完整队伍列表
];

/**
 * 占位：球员数据
 * TODO: 从 ROM Bank 3 ($C000-$FFFF) 和 Bank 5 ($8000-$BFFF) 提取真实数据
 * ROM 中的数据结构需要通过 Bank 3 的解码函数（$8018, $8061等）来理解
 */
export const PLAYER_DATA: Record<number, PlayerStats[]> = {
  // TODO: 从 ROM 提取真实球员数据
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

/** 获取球员名 */
export function getPlayerName(id: number): string {
  const player = findPlayer(id);
  return player ? player.name : `P${id}`;
}
