/**
 * data/index.ts — 数据层出口契约（model）
 *
 * 按业务域导出数据表，外部只能通过本文件访问 data 层。
 */
// store
export { DataStore } from './store/DataStore';

// tables
export {
  RAM_INIT_TABLE, OAM_HIDE_VALUE, GAME_RAM_CLEAR_TABLE,
} from './tables/ram-init-table';
export { PALETTE_FADE_MAX, fadePalette } from './tables/palette-fade-table';
export { PALETTE_TABLE, loadPalette } from './tables/palette-table';
export { PLAYER_TABLE, findPlayerById, findPlayersByTeam } from './tables/player-table';
export { TEAM_TABLE, findTeamById } from './tables/team-table';
export type { TeamEntry } from './tables/team-table';
export { SKILL_TABLE, findSkillByMoveId, findSkillsByPlayer } from './tables/skill-table';
export { DEFAULT_MATCH_CONFIG, getMatchConfig } from './tables/match-config-table';
export type { MatchConfigEntry } from './tables/match-config-table';
export { LEVEL_UP_TABLE, findLevelByExp } from './tables/levelup-table';

// audio
export {
  SONG_COUNT, SONG_REQUEST_IDS,
  BGM_POINTER_TABLE_ADDR, BGM_POINTER_TABLE_LEN,
  SE_POINTER_TABLE_ADDR, SE_POINTER_TABLE_LEN,
  NOTE_DURATION_TABLE_ADDR, NOTE_DURATION_TABLE_LEN,
  NOTE_FREQ_TABLE_ADDR,
  AudioRom,
} from './audio/audio-rom';

// rom (PRG 数据总线)
export {
  PRG_BANK_SIZE, PRG_BANK_COUNT, PRG_BANKS, NES_PRG_ROM,
} from './rom/index';
export { RomService } from './rom/RomService';
