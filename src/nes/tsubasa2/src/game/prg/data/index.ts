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
  SONGS, lookupSong, SONG_COUNT,
} from './audio/SongCatalog';
export type { SongRecord, ChannelTrack, ChannelKind } from './audio/SongCatalog';
export type {
  AudioToken, NoteToken, DurationToken, SpeedToken, CommandToken, RestToken, NoiseToken,
} from './audio/AudioTokens';
export { AudioRom } from './audio/audio-rom';
export type { SongTrack, SongType, SongBank } from './audio/index';
export { BGM_SONGS, SE_SONGS } from './audio/index';

// tables
export {
  RAM_INIT_TABLE, OAM_HIDE_VALUE, GAME_RAM_CLEAR_TABLE,
} from './tables/ram-init-table';
export { PALETTE_FADE_MAX, fadePalette } from './tables/palette-fade-table';
export { PALETTE_TABLE, loadPalette } from './tables/palette-table';
export {
  PLAYER_TABLE, findPlayerById, findPlayersByTeam, findPlayerNameById,
  PLAYER_COLOR, GK_STATS, PLAYER_HAIR, NAMED_PLAYER_COLOR,
} from './tables/player-table';
export type { PlayerColorEntry, PlayerGkEntry } from './tables/player-table';
export {
  PLAYER_TILE_TABLE, findPlayerTilesById,
} from './tables/player-tile-table';
export type { PlayerTileEntry } from './tables/player-tile-table';
export { TEAM_TABLE, findTeamById, findTeamNameById, findRosterById, TEAMS_FULL } from './tables/team-table';
export type { TeamRosterEntry } from './tables/team-table';
export {
  SKILL_TABLE, SKILL_POINTER_TABLE, SKILL_MATCH_TABLE, SKILL_MOVE_ID_TABLE, SKILL_TRIGGER_TABLE,
  BANK16_DATA_TABLES, BANK16_CODE_DATA, findSkillByMoveId, findSkillsByPlayer,
} from './tables/skill-table';
export type { SkillEntry } from './tables/skill-table';
export {
  DEFAULT_MATCH_CONFIG, MATCH_CONFIG_TABLE, getMatchConfig,
} from './tables/match-config-table';
export type { MatchConfigEntry } from './tables/match-config-table';
export { LEVEL_UP_TABLE, findLevelByExp, findLevelById } from './tables/levelup-table';
export type { LevelUpStatEntry } from './tables/levelup-data';

// 场景/精灵帧/技能事件等具象化数据表
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
  BANK27_NAME_TABLE, BANK27_TEXT_TABLE, BANK27_CHAR_MAP, BANK27_NAME_ADDR_TABLE,
  BANK27_TEXT_DATA, BANK27_NAME_DATA, findNameByPlayerId,
} from './tables/player-name-table';
export type { PlayerNameEntry } from './tables/player-name-table';
export {
  BANK28_ACTION_TABLE, BANK28_ACTION_POINTER_TABLE, BANK28_DATA_TABLES, findActionById,
} from './tables/match-action-table';
export type { MatchActionPointer, MatchActionEntry } from './tables/match-action-table';

// 场景背景数据（按场景 ID 命名）
// 仅导出 BANK*_DATA_TABLES（保留具名原始字节，作为后续具象化的数据源）；
// BANK*_DATA_MAPS / BANK*_DATA_TAIL / BANK*_FULL 是 asm 时代的"地址别名"，已删除。
export { BANK17_DATA_TABLES } from './scene/bank17-data';
export { BANK18_DATA_TABLES } from './scene/bank18-data';
export { BANK21_DATA_TABLES } from './scene/bank21-data';
export { BANK23_DATA_TABLES } from './scene/bank23-data';
export { BANK25_DATA_TABLES } from './scene/bank25-data';
export { BANK29_DATA_TABLES } from './scene/bank29-data';

// bank06 拆解（声明式分文件）
export {
  BANK6_SCRIPTS,
  BANK6_BG_PALETTES, BANK6_SPR_PALETTES, BANK6_SCENE_TABLE,
  BANK6_SEC_01_NT_TILES, BANK6_SEC_01_NT_TILES_OFFSET, BANK6_SEC_01_NT_TILES_CPU_BASE,
  BANK6_SEC_02_NT_TILES, BANK6_SEC_02_NT_TILES_OFFSET, BANK6_SEC_02_NT_TILES_CPU_BASE,
  BANK6_SEC_03_PTR_BLK, BANK6_SEC_03_PTR_BLK_OFFSET, BANK6_SEC_03_PTR_BLK_CPU_BASE,
  BANK6_SEC_04_TILE_BLK, BANK6_SEC_04_TILE_BLK_OFFSET, BANK6_SEC_04_TILE_BLK_CPU_BASE,
} from './scene/bank6/index';
export type { OpeningSceneEntry } from './scene/bank6/index';

// bank07 拆解
export {
  BANK7_CHR_POINTERS, BANK7_CHR_CONFIGS, BANK7_TILE_STREAMS, OPENING_TILE_STREAMS,
} from './scene/bank7/index';

// 片头序列 Ground Truth 数据表（emu-full 4332 帧 dump 提取）
export {
  OPENING_SCREENS, getOpeningScreen,
} from './scene/OpeningScreenTable';
export type { OpeningScreenEntry, OpeningPalette, OpeningFrameState } from './scene/OpeningScreenTable';

// 多语言球员名表 (日文/中文/英文, 来自原版 ROM 修改参考文档)

