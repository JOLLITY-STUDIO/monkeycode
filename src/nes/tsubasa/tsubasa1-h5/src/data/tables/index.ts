/**
 * 数据访问层 — 统一导出
 * 
 * 使用方式:
 *   import { PlayerRepo, TeamRepo } from '../data/tables';
 *   const players = PlayerRepo.table.getByPosition(PlayerPosition.FW);
 */
export { PlayerTable, type PlayerEntry, PlayerRepository } from './PlayerTable';
export { TeamTable, type TeamEntry, TeamRepository } from './TeamTable';

import { PlayerRepository } from './PlayerTable';
import { TeamRepository } from './TeamTable';

/** 快捷单例访问 */
export const PlayerRepo = PlayerRepository.getInstance();
export const TeamRepo = TeamRepository.getInstance();
