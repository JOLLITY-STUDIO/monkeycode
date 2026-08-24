/**
 * data/index.ts — 数据层出口契约（model）
 *
 * 按业务域导出数据表，外部只能通过本文件访问 data 层。
 */
// store
export { DataStore } from './store/DataStore';
export type { VramTarget } from './store/DataStoreVram';
export {
  SceneView, PaletteView, OamView, PpuStateView, FadeView, AudioStateView, RenderQueueView,
  MatchRoundView, MatchEventView, PlayerMoveView, PlayerNameView,
} from './store/RamViews';
export { consumeNtBuffer, appendNtBuffer } from './store/RenderQueues';
export type { NtRowEntry, RleEntry } from './store/RenderQueues';

// audio
export {
  FREQUENCY_TABLE, DURATION_TABLE, COMMAND_TABLE,
  SONGS, lookupSong, SONG_COUNT, SONG_REQUEST_IDS,
} from './audio/SongCatalog';
export type { SongRecord, ChannelTrack, ChannelKind } from './audio/SongCatalog';
export type {
  AudioToken, NoteToken, DurationToken, SpeedToken, CommandToken, RestToken, NoiseToken,
} from './audio/AudioTokens';
export { AudioRom } from './audio/audio-rom';
export type { Papu } from './audio/AudioService';

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

// 场景/精灵帧/技能事件等具象化数据表（声明式表结构，无 asm 地址残留）
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

// 场景背景数据（按场景 ID 命名）
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

// bank06 拆解（声明式分文件：scripts / palettes / scene-table / 次级区段）
export {
  BANK6_SCRIPTS,
  BANK6_BG_PALETTES,
  BANK6_SPR_PALETTES,
  BANK6_SCENE_TABLE,
  BANK6_SEC_01_NT_TILES, BANK6_SEC_01_NT_TILES_OFFSET, BANK6_SEC_01_NT_TILES_CPU_BASE,
  BANK6_SEC_02_NT_TILES, BANK6_SEC_02_NT_TILES_OFFSET, BANK6_SEC_02_NT_TILES_CPU_BASE,
  BANK6_SEC_03_PTR_BLK, BANK6_SEC_03_PTR_BLK_OFFSET, BANK6_SEC_03_PTR_BLK_CPU_BASE,
  BANK6_SEC_04_TILE_BLK, BANK6_SEC_04_TILE_BLK_OFFSET, BANK6_SEC_04_TILE_BLK_CPU_BASE,
} from './scene/bank6';
export type { OpeningSceneEntry } from './scene/bank6';

// bank07 拆解（106 项 CHR configs，每个独立文件）
export {
  BANK7_CHR_POINTERS,
  BANK7_CHR_CONFIGS,
  BANK7_TILE_STREAMS,
  OPENING_TILE_STREAMS,
} from './scene/bank7';

// audio（曲目列表 + ROM 访问器）
// 注意：AudioRom 已在上面 line 25 通过 './audio/audio-rom' 导出，
//       这里不再重复 export，避免双重 export 在 WX 小程序 bundle 时报
//       "Cannot redefine property: AudioRom" 的运行时错误。
export type { SongTrack, SongType, SongBank } from './audio';
export {
  BGM_SONGS, SE_SONGS,
  SONG_COUNT, SONG_REQUEST_IDS,
  BGM_POINTER_TABLE_ADDR, BGM_POINTER_TABLE_LEN,
  SE_POINTER_TABLE_ADDR, SE_POINTER_TABLE_LEN,
  NOTE_DURATION_TABLE_ADDR, NOTE_DURATION_TABLE_LEN,
  NOTE_FREQ_TABLE_ADDR,
} from './audio';