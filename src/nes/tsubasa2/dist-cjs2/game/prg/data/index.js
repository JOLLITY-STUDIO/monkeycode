"use strict";
/**
 * data/index.ts — 数据层出口契约（model）
 *
 * 按业务域导出数据表，外部只能通过本文件访问 data 层。
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SKILL_TRIGGER_TABLE = exports.SKILL_MOVE_ID_TABLE = exports.SKILL_MATCH_TABLE = exports.SKILL_POINTER_TABLE = exports.SKILL_TABLE = exports.TEAMS_FULL = exports.findRosterById = exports.findTeamNameById = exports.findTeamById = exports.TEAM_TABLE = exports.findPlayerTilesById = exports.PLAYER_TILE_TABLE = exports.NAMED_PLAYER_COLOR = exports.PLAYER_HAIR = exports.GK_STATS = exports.PLAYER_COLOR = exports.findPlayerNameById = exports.findPlayersByTeam = exports.findPlayerById = exports.PLAYER_TABLE = exports.loadPalette = exports.PALETTE_TABLE = exports.fadePalette = exports.PALETTE_FADE_MAX = exports.GAME_RAM_CLEAR_TABLE = exports.OAM_HIDE_VALUE = exports.RAM_INIT_TABLE = exports.SE_SONGS = exports.BGM_SONGS = exports.AudioRom = exports.SONG_COUNT = exports.lookupSong = exports.SONGS = exports.COMMAND_TABLE = exports.DURATION_TABLE = exports.FREQUENCY_TABLE = exports.appendNtBuffer = exports.consumeNtBuffer = exports.PlayerNameView = exports.PlayerMoveView = exports.MatchEventView = exports.MatchRoundView = exports.RenderQueueView = exports.AudioStateView = exports.FadeView = exports.PpuStateView = exports.OamView = exports.PaletteView = exports.SceneView = exports.DataStore = void 0;
exports.BANK6_SEC_01_NT_TILES_CPU_BASE = exports.BANK6_SEC_01_NT_TILES_OFFSET = exports.BANK6_SEC_01_NT_TILES = exports.BANK6_SCENE_TABLE = exports.BANK6_SPR_PALETTES = exports.BANK6_BG_PALETTES = exports.BANK6_SCRIPTS = exports.BANK29_DATA_TABLES = exports.BANK25_DATA_TABLES = exports.BANK23_DATA_TABLES = exports.BANK21_DATA_TABLES = exports.BANK18_DATA_TABLES = exports.BANK17_DATA_TABLES = exports.findActionById = exports.BANK28_DATA_TABLES = exports.BANK28_ACTION_POINTER_TABLE = exports.BANK28_ACTION_TABLE = exports.findNameByPlayerId = exports.BANK27_NAME_DATA = exports.BANK27_TEXT_DATA = exports.BANK27_NAME_ADDR_TABLE = exports.BANK27_CHAR_MAP = exports.BANK27_TEXT_TABLE = exports.BANK27_NAME_TABLE = exports.findRoundById = exports.BANK24_DATA_TABLES = exports.BANK24_ROUND_POINTER_TABLE = exports.BANK24_ROUND_TABLE = exports.findMoveById = exports.BANK22_DATA_TAIL = exports.BANK22_DATA_TABLES = exports.BANK22_DIRECTION_TABLE = exports.BANK22_MOVE_TABLE = exports.findEventById = exports.BANK20_DATA_TABLES = exports.BANK20_EVENT_POINTER_TABLE = exports.BANK20_EVENT_TABLE = exports.BANK19_SCENE_DATA = exports.BANK19_TILE_DATA = exports.BANK19_SPRITE_FRAMES = exports.findLevelById = exports.findLevelByExp = exports.LEVEL_UP_TABLE = exports.getMatchConfig = exports.MATCH_CONFIG_TABLE = exports.DEFAULT_MATCH_CONFIG = exports.findSkillsByPlayer = exports.findSkillByMoveId = exports.BANK16_CODE_DATA = exports.BANK16_DATA_TABLES = void 0;
exports.getOpeningFrame = exports.OPENING_FRAMES = exports.getOpeningScreen = exports.OPENING_SCREENS = exports.OPENING_TILE_STREAMS = exports.BANK7_TILE_STREAMS = exports.BANK7_CHR_CONFIGS = exports.BANK7_CHR_POINTERS = exports.BANK6_SEC_04_TILE_BLK_CPU_BASE = exports.BANK6_SEC_04_TILE_BLK_OFFSET = exports.BANK6_SEC_04_TILE_BLK = exports.BANK6_SEC_03_PTR_BLK_CPU_BASE = exports.BANK6_SEC_03_PTR_BLK_OFFSET = exports.BANK6_SEC_03_PTR_BLK = exports.BANK6_SEC_02_NT_TILES_CPU_BASE = exports.BANK6_SEC_02_NT_TILES_OFFSET = exports.BANK6_SEC_02_NT_TILES = void 0;
// store
var DataStore_1 = require("./store/DataStore");
Object.defineProperty(exports, "DataStore", { enumerable: true, get: function () { return DataStore_1.DataStore; } });
var RamViews_1 = require("./store/RamViews");
Object.defineProperty(exports, "SceneView", { enumerable: true, get: function () { return RamViews_1.SceneView; } });
Object.defineProperty(exports, "PaletteView", { enumerable: true, get: function () { return RamViews_1.PaletteView; } });
Object.defineProperty(exports, "OamView", { enumerable: true, get: function () { return RamViews_1.OamView; } });
Object.defineProperty(exports, "PpuStateView", { enumerable: true, get: function () { return RamViews_1.PpuStateView; } });
Object.defineProperty(exports, "FadeView", { enumerable: true, get: function () { return RamViews_1.FadeView; } });
Object.defineProperty(exports, "AudioStateView", { enumerable: true, get: function () { return RamViews_1.AudioStateView; } });
Object.defineProperty(exports, "RenderQueueView", { enumerable: true, get: function () { return RamViews_1.RenderQueueView; } });
Object.defineProperty(exports, "MatchRoundView", { enumerable: true, get: function () { return RamViews_1.MatchRoundView; } });
Object.defineProperty(exports, "MatchEventView", { enumerable: true, get: function () { return RamViews_1.MatchEventView; } });
Object.defineProperty(exports, "PlayerMoveView", { enumerable: true, get: function () { return RamViews_1.PlayerMoveView; } });
Object.defineProperty(exports, "PlayerNameView", { enumerable: true, get: function () { return RamViews_1.PlayerNameView; } });
var RenderQueues_1 = require("./store/RenderQueues");
Object.defineProperty(exports, "consumeNtBuffer", { enumerable: true, get: function () { return RenderQueues_1.consumeNtBuffer; } });
Object.defineProperty(exports, "appendNtBuffer", { enumerable: true, get: function () { return RenderQueues_1.appendNtBuffer; } });
// audio
var SongCatalog_1 = require("./audio/SongCatalog");
Object.defineProperty(exports, "FREQUENCY_TABLE", { enumerable: true, get: function () { return SongCatalog_1.FREQUENCY_TABLE; } });
Object.defineProperty(exports, "DURATION_TABLE", { enumerable: true, get: function () { return SongCatalog_1.DURATION_TABLE; } });
Object.defineProperty(exports, "COMMAND_TABLE", { enumerable: true, get: function () { return SongCatalog_1.COMMAND_TABLE; } });
Object.defineProperty(exports, "SONGS", { enumerable: true, get: function () { return SongCatalog_1.SONGS; } });
Object.defineProperty(exports, "lookupSong", { enumerable: true, get: function () { return SongCatalog_1.lookupSong; } });
Object.defineProperty(exports, "SONG_COUNT", { enumerable: true, get: function () { return SongCatalog_1.SONG_COUNT; } });
var audio_rom_1 = require("./audio/audio-rom");
Object.defineProperty(exports, "AudioRom", { enumerable: true, get: function () { return audio_rom_1.AudioRom; } });
var index_1 = require("./audio/index");
Object.defineProperty(exports, "BGM_SONGS", { enumerable: true, get: function () { return index_1.BGM_SONGS; } });
Object.defineProperty(exports, "SE_SONGS", { enumerable: true, get: function () { return index_1.SE_SONGS; } });
// tables
var ram_init_table_1 = require("./tables/ram-init-table");
Object.defineProperty(exports, "RAM_INIT_TABLE", { enumerable: true, get: function () { return ram_init_table_1.RAM_INIT_TABLE; } });
Object.defineProperty(exports, "OAM_HIDE_VALUE", { enumerable: true, get: function () { return ram_init_table_1.OAM_HIDE_VALUE; } });
Object.defineProperty(exports, "GAME_RAM_CLEAR_TABLE", { enumerable: true, get: function () { return ram_init_table_1.GAME_RAM_CLEAR_TABLE; } });
var palette_fade_table_1 = require("./tables/palette-fade-table");
Object.defineProperty(exports, "PALETTE_FADE_MAX", { enumerable: true, get: function () { return palette_fade_table_1.PALETTE_FADE_MAX; } });
Object.defineProperty(exports, "fadePalette", { enumerable: true, get: function () { return palette_fade_table_1.fadePalette; } });
var palette_table_1 = require("./tables/palette-table");
Object.defineProperty(exports, "PALETTE_TABLE", { enumerable: true, get: function () { return palette_table_1.PALETTE_TABLE; } });
Object.defineProperty(exports, "loadPalette", { enumerable: true, get: function () { return palette_table_1.loadPalette; } });
var player_table_1 = require("./tables/player-table");
Object.defineProperty(exports, "PLAYER_TABLE", { enumerable: true, get: function () { return player_table_1.PLAYER_TABLE; } });
Object.defineProperty(exports, "findPlayerById", { enumerable: true, get: function () { return player_table_1.findPlayerById; } });
Object.defineProperty(exports, "findPlayersByTeam", { enumerable: true, get: function () { return player_table_1.findPlayersByTeam; } });
Object.defineProperty(exports, "findPlayerNameById", { enumerable: true, get: function () { return player_table_1.findPlayerNameById; } });
Object.defineProperty(exports, "PLAYER_COLOR", { enumerable: true, get: function () { return player_table_1.PLAYER_COLOR; } });
Object.defineProperty(exports, "GK_STATS", { enumerable: true, get: function () { return player_table_1.GK_STATS; } });
Object.defineProperty(exports, "PLAYER_HAIR", { enumerable: true, get: function () { return player_table_1.PLAYER_HAIR; } });
Object.defineProperty(exports, "NAMED_PLAYER_COLOR", { enumerable: true, get: function () { return player_table_1.NAMED_PLAYER_COLOR; } });
var player_tile_table_1 = require("./tables/player-tile-table");
Object.defineProperty(exports, "PLAYER_TILE_TABLE", { enumerable: true, get: function () { return player_tile_table_1.PLAYER_TILE_TABLE; } });
Object.defineProperty(exports, "findPlayerTilesById", { enumerable: true, get: function () { return player_tile_table_1.findPlayerTilesById; } });
var team_table_1 = require("./tables/team-table");
Object.defineProperty(exports, "TEAM_TABLE", { enumerable: true, get: function () { return team_table_1.TEAM_TABLE; } });
Object.defineProperty(exports, "findTeamById", { enumerable: true, get: function () { return team_table_1.findTeamById; } });
Object.defineProperty(exports, "findTeamNameById", { enumerable: true, get: function () { return team_table_1.findTeamNameById; } });
Object.defineProperty(exports, "findRosterById", { enumerable: true, get: function () { return team_table_1.findRosterById; } });
Object.defineProperty(exports, "TEAMS_FULL", { enumerable: true, get: function () { return team_table_1.TEAMS_FULL; } });
var skill_table_1 = require("./tables/skill-table");
Object.defineProperty(exports, "SKILL_TABLE", { enumerable: true, get: function () { return skill_table_1.SKILL_TABLE; } });
Object.defineProperty(exports, "SKILL_POINTER_TABLE", { enumerable: true, get: function () { return skill_table_1.SKILL_POINTER_TABLE; } });
Object.defineProperty(exports, "SKILL_MATCH_TABLE", { enumerable: true, get: function () { return skill_table_1.SKILL_MATCH_TABLE; } });
Object.defineProperty(exports, "SKILL_MOVE_ID_TABLE", { enumerable: true, get: function () { return skill_table_1.SKILL_MOVE_ID_TABLE; } });
Object.defineProperty(exports, "SKILL_TRIGGER_TABLE", { enumerable: true, get: function () { return skill_table_1.SKILL_TRIGGER_TABLE; } });
Object.defineProperty(exports, "BANK16_DATA_TABLES", { enumerable: true, get: function () { return skill_table_1.BANK16_DATA_TABLES; } });
Object.defineProperty(exports, "BANK16_CODE_DATA", { enumerable: true, get: function () { return skill_table_1.BANK16_CODE_DATA; } });
Object.defineProperty(exports, "findSkillByMoveId", { enumerable: true, get: function () { return skill_table_1.findSkillByMoveId; } });
Object.defineProperty(exports, "findSkillsByPlayer", { enumerable: true, get: function () { return skill_table_1.findSkillsByPlayer; } });
var match_config_table_1 = require("./tables/match-config-table");
Object.defineProperty(exports, "DEFAULT_MATCH_CONFIG", { enumerable: true, get: function () { return match_config_table_1.DEFAULT_MATCH_CONFIG; } });
Object.defineProperty(exports, "MATCH_CONFIG_TABLE", { enumerable: true, get: function () { return match_config_table_1.MATCH_CONFIG_TABLE; } });
Object.defineProperty(exports, "getMatchConfig", { enumerable: true, get: function () { return match_config_table_1.getMatchConfig; } });
var levelup_table_1 = require("./tables/levelup-table");
Object.defineProperty(exports, "LEVEL_UP_TABLE", { enumerable: true, get: function () { return levelup_table_1.LEVEL_UP_TABLE; } });
Object.defineProperty(exports, "findLevelByExp", { enumerable: true, get: function () { return levelup_table_1.findLevelByExp; } });
Object.defineProperty(exports, "findLevelById", { enumerable: true, get: function () { return levelup_table_1.findLevelById; } });
// 场景/精灵帧/技能事件等具象化数据表
var sprite_frame_table_1 = require("./tables/sprite-frame-table");
Object.defineProperty(exports, "BANK19_SPRITE_FRAMES", { enumerable: true, get: function () { return sprite_frame_table_1.BANK19_SPRITE_FRAMES; } });
Object.defineProperty(exports, "BANK19_TILE_DATA", { enumerable: true, get: function () { return sprite_frame_table_1.BANK19_TILE_DATA; } });
Object.defineProperty(exports, "BANK19_SCENE_DATA", { enumerable: true, get: function () { return sprite_frame_table_1.BANK19_SCENE_DATA; } });
var match_event_table_1 = require("./tables/match-event-table");
Object.defineProperty(exports, "BANK20_EVENT_TABLE", { enumerable: true, get: function () { return match_event_table_1.BANK20_EVENT_TABLE; } });
Object.defineProperty(exports, "BANK20_EVENT_POINTER_TABLE", { enumerable: true, get: function () { return match_event_table_1.BANK20_EVENT_POINTER_TABLE; } });
Object.defineProperty(exports, "BANK20_DATA_TABLES", { enumerable: true, get: function () { return match_event_table_1.BANK20_DATA_TABLES; } });
Object.defineProperty(exports, "findEventById", { enumerable: true, get: function () { return match_event_table_1.findEventById; } });
var player_move_table_1 = require("./tables/player-move-table");
Object.defineProperty(exports, "BANK22_MOVE_TABLE", { enumerable: true, get: function () { return player_move_table_1.BANK22_MOVE_TABLE; } });
Object.defineProperty(exports, "BANK22_DIRECTION_TABLE", { enumerable: true, get: function () { return player_move_table_1.BANK22_DIRECTION_TABLE; } });
Object.defineProperty(exports, "BANK22_DATA_TABLES", { enumerable: true, get: function () { return player_move_table_1.BANK22_DATA_TABLES; } });
Object.defineProperty(exports, "BANK22_DATA_TAIL", { enumerable: true, get: function () { return player_move_table_1.BANK22_DATA_TAIL; } });
Object.defineProperty(exports, "findMoveById", { enumerable: true, get: function () { return player_move_table_1.findMoveById; } });
var match_round_table_1 = require("./tables/match-round-table");
Object.defineProperty(exports, "BANK24_ROUND_TABLE", { enumerable: true, get: function () { return match_round_table_1.BANK24_ROUND_TABLE; } });
Object.defineProperty(exports, "BANK24_ROUND_POINTER_TABLE", { enumerable: true, get: function () { return match_round_table_1.BANK24_ROUND_POINTER_TABLE; } });
Object.defineProperty(exports, "BANK24_DATA_TABLES", { enumerable: true, get: function () { return match_round_table_1.BANK24_DATA_TABLES; } });
Object.defineProperty(exports, "findRoundById", { enumerable: true, get: function () { return match_round_table_1.findRoundById; } });
var player_name_table_1 = require("./tables/player-name-table");
Object.defineProperty(exports, "BANK27_NAME_TABLE", { enumerable: true, get: function () { return player_name_table_1.BANK27_NAME_TABLE; } });
Object.defineProperty(exports, "BANK27_TEXT_TABLE", { enumerable: true, get: function () { return player_name_table_1.BANK27_TEXT_TABLE; } });
Object.defineProperty(exports, "BANK27_CHAR_MAP", { enumerable: true, get: function () { return player_name_table_1.BANK27_CHAR_MAP; } });
Object.defineProperty(exports, "BANK27_NAME_ADDR_TABLE", { enumerable: true, get: function () { return player_name_table_1.BANK27_NAME_ADDR_TABLE; } });
Object.defineProperty(exports, "BANK27_TEXT_DATA", { enumerable: true, get: function () { return player_name_table_1.BANK27_TEXT_DATA; } });
Object.defineProperty(exports, "BANK27_NAME_DATA", { enumerable: true, get: function () { return player_name_table_1.BANK27_NAME_DATA; } });
Object.defineProperty(exports, "findNameByPlayerId", { enumerable: true, get: function () { return player_name_table_1.findNameByPlayerId; } });
var match_action_table_1 = require("./tables/match-action-table");
Object.defineProperty(exports, "BANK28_ACTION_TABLE", { enumerable: true, get: function () { return match_action_table_1.BANK28_ACTION_TABLE; } });
Object.defineProperty(exports, "BANK28_ACTION_POINTER_TABLE", { enumerable: true, get: function () { return match_action_table_1.BANK28_ACTION_POINTER_TABLE; } });
Object.defineProperty(exports, "BANK28_DATA_TABLES", { enumerable: true, get: function () { return match_action_table_1.BANK28_DATA_TABLES; } });
Object.defineProperty(exports, "findActionById", { enumerable: true, get: function () { return match_action_table_1.findActionById; } });
// 场景背景数据（按场景 ID 命名）
// 仅导出 BANK*_DATA_TABLES（保留具名原始字节，作为后续具象化的数据源）；
// BANK*_DATA_MAPS / BANK*_DATA_TAIL / BANK*_FULL 是 asm 时代的"地址别名"，已删除。
var bank17_data_1 = require("./scene/bank17-data");
Object.defineProperty(exports, "BANK17_DATA_TABLES", { enumerable: true, get: function () { return bank17_data_1.BANK17_DATA_TABLES; } });
var bank18_data_1 = require("./scene/bank18-data");
Object.defineProperty(exports, "BANK18_DATA_TABLES", { enumerable: true, get: function () { return bank18_data_1.BANK18_DATA_TABLES; } });
var bank21_data_1 = require("./scene/bank21-data");
Object.defineProperty(exports, "BANK21_DATA_TABLES", { enumerable: true, get: function () { return bank21_data_1.BANK21_DATA_TABLES; } });
var bank23_data_1 = require("./scene/bank23-data");
Object.defineProperty(exports, "BANK23_DATA_TABLES", { enumerable: true, get: function () { return bank23_data_1.BANK23_DATA_TABLES; } });
var bank25_data_1 = require("./scene/bank25-data");
Object.defineProperty(exports, "BANK25_DATA_TABLES", { enumerable: true, get: function () { return bank25_data_1.BANK25_DATA_TABLES; } });
var bank29_data_1 = require("./scene/bank29-data");
Object.defineProperty(exports, "BANK29_DATA_TABLES", { enumerable: true, get: function () { return bank29_data_1.BANK29_DATA_TABLES; } });
// bank06 拆解（声明式分文件）
var index_2 = require("./scene/bank6/index");
Object.defineProperty(exports, "BANK6_SCRIPTS", { enumerable: true, get: function () { return index_2.BANK6_SCRIPTS; } });
Object.defineProperty(exports, "BANK6_BG_PALETTES", { enumerable: true, get: function () { return index_2.BANK6_BG_PALETTES; } });
Object.defineProperty(exports, "BANK6_SPR_PALETTES", { enumerable: true, get: function () { return index_2.BANK6_SPR_PALETTES; } });
Object.defineProperty(exports, "BANK6_SCENE_TABLE", { enumerable: true, get: function () { return index_2.BANK6_SCENE_TABLE; } });
Object.defineProperty(exports, "BANK6_SEC_01_NT_TILES", { enumerable: true, get: function () { return index_2.BANK6_SEC_01_NT_TILES; } });
Object.defineProperty(exports, "BANK6_SEC_01_NT_TILES_OFFSET", { enumerable: true, get: function () { return index_2.BANK6_SEC_01_NT_TILES_OFFSET; } });
Object.defineProperty(exports, "BANK6_SEC_01_NT_TILES_CPU_BASE", { enumerable: true, get: function () { return index_2.BANK6_SEC_01_NT_TILES_CPU_BASE; } });
Object.defineProperty(exports, "BANK6_SEC_02_NT_TILES", { enumerable: true, get: function () { return index_2.BANK6_SEC_02_NT_TILES; } });
Object.defineProperty(exports, "BANK6_SEC_02_NT_TILES_OFFSET", { enumerable: true, get: function () { return index_2.BANK6_SEC_02_NT_TILES_OFFSET; } });
Object.defineProperty(exports, "BANK6_SEC_02_NT_TILES_CPU_BASE", { enumerable: true, get: function () { return index_2.BANK6_SEC_02_NT_TILES_CPU_BASE; } });
Object.defineProperty(exports, "BANK6_SEC_03_PTR_BLK", { enumerable: true, get: function () { return index_2.BANK6_SEC_03_PTR_BLK; } });
Object.defineProperty(exports, "BANK6_SEC_03_PTR_BLK_OFFSET", { enumerable: true, get: function () { return index_2.BANK6_SEC_03_PTR_BLK_OFFSET; } });
Object.defineProperty(exports, "BANK6_SEC_03_PTR_BLK_CPU_BASE", { enumerable: true, get: function () { return index_2.BANK6_SEC_03_PTR_BLK_CPU_BASE; } });
Object.defineProperty(exports, "BANK6_SEC_04_TILE_BLK", { enumerable: true, get: function () { return index_2.BANK6_SEC_04_TILE_BLK; } });
Object.defineProperty(exports, "BANK6_SEC_04_TILE_BLK_OFFSET", { enumerable: true, get: function () { return index_2.BANK6_SEC_04_TILE_BLK_OFFSET; } });
Object.defineProperty(exports, "BANK6_SEC_04_TILE_BLK_CPU_BASE", { enumerable: true, get: function () { return index_2.BANK6_SEC_04_TILE_BLK_CPU_BASE; } });
// bank07 拆解
var index_3 = require("./scene/bank7/index");
Object.defineProperty(exports, "BANK7_CHR_POINTERS", { enumerable: true, get: function () { return index_3.BANK7_CHR_POINTERS; } });
Object.defineProperty(exports, "BANK7_CHR_CONFIGS", { enumerable: true, get: function () { return index_3.BANK7_CHR_CONFIGS; } });
Object.defineProperty(exports, "BANK7_TILE_STREAMS", { enumerable: true, get: function () { return index_3.BANK7_TILE_STREAMS; } });
Object.defineProperty(exports, "OPENING_TILE_STREAMS", { enumerable: true, get: function () { return index_3.OPENING_TILE_STREAMS; } });
// 片头序列 Ground Truth 数据表（emu-full 4332 帧 dump 提取）
var OpeningScreenTable_1 = require("./scene/OpeningScreenTable");
Object.defineProperty(exports, "OPENING_SCREENS", { enumerable: true, get: function () { return OpeningScreenTable_1.OPENING_SCREENS; } });
Object.defineProperty(exports, "getOpeningScreen", { enumerable: true, get: function () { return OpeningScreenTable_1.getOpeningScreen; } });
var OpeningFrameTable_1 = require("./scene/OpeningFrameTable");
Object.defineProperty(exports, "OPENING_FRAMES", { enumerable: true, get: function () { return OpeningFrameTable_1.OPENING_FRAMES; } });
Object.defineProperty(exports, "getOpeningFrame", { enumerable: true, get: function () { return OpeningFrameTable_1.getOpeningFrame; } });
// 多语言球员名表 (日文/中文/英文, 来自原版 ROM 修改参考文档)
