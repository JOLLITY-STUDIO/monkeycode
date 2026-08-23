"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioRom = exports.NOTE_FREQ_TABLE_ADDR = exports.NOTE_DURATION_TABLE_LEN = exports.NOTE_DURATION_TABLE_ADDR = exports.SE_POINTER_TABLE_LEN = exports.SE_POINTER_TABLE_ADDR = exports.BGM_POINTER_TABLE_LEN = exports.BGM_POINTER_TABLE_ADDR = exports.SONG_REQUEST_IDS = exports.SONG_COUNT = exports.findLevelByExp = exports.LEVEL_UP_TABLE = exports.getMatchConfig = exports.DEFAULT_MATCH_CONFIG = exports.findSkillsByPlayer = exports.findSkillByMoveId = exports.SKILL_TABLE = exports.findTeamById = exports.TEAM_TABLE = exports.findPlayersByTeam = exports.findPlayerById = exports.PLAYER_TABLE = exports.fadePalette = exports.PALETTE_FADE_MAX = exports.GAME_RAM_CLEAR_TABLE = exports.OAM_HIDE_VALUE = exports.RAM_INIT_TABLE = exports.DataStore = void 0;
/**
 * data/index.ts — 数据层出口契约（model）
 *
 * 按业务域导出数据表，外部只能通过本文件访问 data 层。
 */
// store
var DataStore_1 = require("./store/DataStore");
Object.defineProperty(exports, "DataStore", { enumerable: true, get: function () { return DataStore_1.DataStore; } });
// tables
var ram_init_table_1 = require("./tables/ram-init-table");
Object.defineProperty(exports, "RAM_INIT_TABLE", { enumerable: true, get: function () { return ram_init_table_1.RAM_INIT_TABLE; } });
Object.defineProperty(exports, "OAM_HIDE_VALUE", { enumerable: true, get: function () { return ram_init_table_1.OAM_HIDE_VALUE; } });
Object.defineProperty(exports, "GAME_RAM_CLEAR_TABLE", { enumerable: true, get: function () { return ram_init_table_1.GAME_RAM_CLEAR_TABLE; } });
var palette_fade_table_1 = require("./tables/palette-fade-table");
Object.defineProperty(exports, "PALETTE_FADE_MAX", { enumerable: true, get: function () { return palette_fade_table_1.PALETTE_FADE_MAX; } });
Object.defineProperty(exports, "fadePalette", { enumerable: true, get: function () { return palette_fade_table_1.fadePalette; } });
var player_table_1 = require("./tables/player-table");
Object.defineProperty(exports, "PLAYER_TABLE", { enumerable: true, get: function () { return player_table_1.PLAYER_TABLE; } });
Object.defineProperty(exports, "findPlayerById", { enumerable: true, get: function () { return player_table_1.findPlayerById; } });
Object.defineProperty(exports, "findPlayersByTeam", { enumerable: true, get: function () { return player_table_1.findPlayersByTeam; } });
var team_table_1 = require("./tables/team-table");
Object.defineProperty(exports, "TEAM_TABLE", { enumerable: true, get: function () { return team_table_1.TEAM_TABLE; } });
Object.defineProperty(exports, "findTeamById", { enumerable: true, get: function () { return team_table_1.findTeamById; } });
var skill_table_1 = require("./tables/skill-table");
Object.defineProperty(exports, "SKILL_TABLE", { enumerable: true, get: function () { return skill_table_1.SKILL_TABLE; } });
Object.defineProperty(exports, "findSkillByMoveId", { enumerable: true, get: function () { return skill_table_1.findSkillByMoveId; } });
Object.defineProperty(exports, "findSkillsByPlayer", { enumerable: true, get: function () { return skill_table_1.findSkillsByPlayer; } });
var match_config_table_1 = require("./tables/match-config-table");
Object.defineProperty(exports, "DEFAULT_MATCH_CONFIG", { enumerable: true, get: function () { return match_config_table_1.DEFAULT_MATCH_CONFIG; } });
Object.defineProperty(exports, "getMatchConfig", { enumerable: true, get: function () { return match_config_table_1.getMatchConfig; } });
var levelup_table_1 = require("./tables/levelup-table");
Object.defineProperty(exports, "LEVEL_UP_TABLE", { enumerable: true, get: function () { return levelup_table_1.LEVEL_UP_TABLE; } });
Object.defineProperty(exports, "findLevelByExp", { enumerable: true, get: function () { return levelup_table_1.findLevelByExp; } });
// audio
var audio_rom_1 = require("./audio/audio-rom");
Object.defineProperty(exports, "SONG_COUNT", { enumerable: true, get: function () { return audio_rom_1.SONG_COUNT; } });
Object.defineProperty(exports, "SONG_REQUEST_IDS", { enumerable: true, get: function () { return audio_rom_1.SONG_REQUEST_IDS; } });
Object.defineProperty(exports, "BGM_POINTER_TABLE_ADDR", { enumerable: true, get: function () { return audio_rom_1.BGM_POINTER_TABLE_ADDR; } });
Object.defineProperty(exports, "BGM_POINTER_TABLE_LEN", { enumerable: true, get: function () { return audio_rom_1.BGM_POINTER_TABLE_LEN; } });
Object.defineProperty(exports, "SE_POINTER_TABLE_ADDR", { enumerable: true, get: function () { return audio_rom_1.SE_POINTER_TABLE_ADDR; } });
Object.defineProperty(exports, "SE_POINTER_TABLE_LEN", { enumerable: true, get: function () { return audio_rom_1.SE_POINTER_TABLE_LEN; } });
Object.defineProperty(exports, "NOTE_DURATION_TABLE_ADDR", { enumerable: true, get: function () { return audio_rom_1.NOTE_DURATION_TABLE_ADDR; } });
Object.defineProperty(exports, "NOTE_DURATION_TABLE_LEN", { enumerable: true, get: function () { return audio_rom_1.NOTE_DURATION_TABLE_LEN; } });
Object.defineProperty(exports, "NOTE_FREQ_TABLE_ADDR", { enumerable: true, get: function () { return audio_rom_1.NOTE_FREQ_TABLE_ADDR; } });
Object.defineProperty(exports, "AudioRom", { enumerable: true, get: function () { return audio_rom_1.AudioRom; } });
