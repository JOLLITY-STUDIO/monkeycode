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
export { SKILL_TABLE, SKILL_POINTER_TABLE, SKILL_MATCH_TABLE, SKILL_MOVE_ID_TABLE, SKILL_TRIGGER_TABLE, BANK16_DATA_TABLES, BANK16_CODE_DATA, findSkillByMoveId, findSkillsByPlayer } from './tables/skill-table';
export type { SkillEntry } from './tables/skill-table';
export { DEFAULT_MATCH_CONFIG, MATCH_CONFIG_TABLE, getMatchConfig } from './tables/match-config-table';
export type { MatchConfigEntry } from './tables/match-config-table';
export { LEVEL_UP_TABLE, findLevelByExp } from './tables/levelup-table';

// bank16-29 新增数据表
export {
  BANK19_SPRITE_FRAMES, BANK19_TILE_DATA, BANK19_SCENE_DATA,
} from './tables/sprite-frame-table';
export type { SpriteFrameEntry } from './tables/sprite-frame-table';
export {
  BANK20_EVENT_TABLE, BANK20_EVENT_POINTER_TABLE, BANK20_DATA_TABLES, findEventById,
} from './tables/match-event-table';
export type { MatchEventPointer, MatchEventEntry } from './tables/match-event-table';
export {
  BANK22_MOVE_TABLE, BANK22_DIRECTION_TABLE, BANK22_DATA_TABLES, BANK22_DATA_TAIL, findMoveById,
} from './tables/player-move-table';
export type { PlayerMoveEntry } from './tables/player-move-table';
export {
  BANK24_ROUND_TABLE, BANK24_ROUND_POINTER_TABLE, BANK24_DATA_TABLES, findRoundById,
} from './tables/match-round-table';
export type { MatchRoundPointer, MatchRoundEntry } from './tables/match-round-table';
export {
  BANK27_NAME_TABLE, BANK27_TEXT_TABLE, BANK27_CHAR_MAP, BANK27_NAME_ADDR_TABLE, BANK27_TEXT_DATA, BANK27_NAME_DATA, findNameByPlayerId,
} from './tables/player-name-table';
export type { PlayerNameEntry } from './tables/player-name-table';
export {
  BANK28_ACTION_TABLE, BANK28_ACTION_POINTER_TABLE, BANK28_DATA_TABLES, findActionById,
} from './tables/match-action-table';
export type { MatchActionPointer, MatchActionEntry } from './tables/match-action-table';

// bank17/18/21/23/25/29 数据 bank（NT 地图/脚本数据）
export {
  BANK17_DATA_TABLES, BANK17_DATA_MAPS, BANK17_DATA_TAIL, BANK17_FULL,
} from './scene/bank17-data';
export {
  BANK18_DATA_TABLES, BANK18_DATA_MAPS, BANK18_DATA_TAIL, BANK18_FULL,
} from './scene/bank18-data';
export {
  BANK21_DATA_TABLES, BANK21_DATA_MAPS, BANK21_DATA_TAIL, BANK21_FULL,
} from './scene/bank21-data';
export {
  BANK23_DATA_TABLES, BANK23_DATA_MAPS, BANK23_DATA_TAIL, BANK23_FULL,
} from './scene/bank23-data';
export {
  BANK25_DATA_TABLES, BANK25_DATA_MAPS, BANK25_DATA_TAIL, BANK25_FULL,
} from './scene/bank25-data';
export {
  BANK29_DATA_TABLES, BANK29_DATA_MAPS, BANK29_DATA_TAIL, BANK29_FULL,
} from './scene/bank29-data';

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
