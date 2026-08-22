"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataStore = exports.BGM_DATA_MAP = exports.SE_POINTER_TABLE = exports.initScriptOpcodes = exports.WAIT_FRAME_TABLE = exports.PASSWORD_DISPATCH_TABLE = exports.NMI_CALLBACK_TABLE = exports.AudioService = exports.SpriteAnimationService = exports.SpriteService = exports.SkillService = exports.MatchConfigService = exports.MatchHudService = exports.MatchAuxService = exports.MatchTurnService = exports.MatchEngineService = exports.TeamRosterService = exports.PlayerQueryService = exports.CharMap = exports.ScriptLoader = exports.ScriptOpcodes = exports.ScriptEngine = exports.StorySceneController = exports.ResultSceneController = exports.PasswordCallbackHandler = exports.TitleSceneController = exports.OpeningSceneController = exports.InterruptService = exports.HardwareInitService = exports.NmiCallbackIndex = exports.BootRouter = exports.GameSystemService = void 0;
/**
 * prg/index.ts — 翻译层出口契约
 *
 * code/ = 业务逻辑 (Service, 按业务域分包)
 * data/ = 数据模型 (Table, ORM 风格)
 *
 * 命名规范 v2 (Java/Spring 风格): 弃用 bankXX 前缀, 见 .codebuddy/rules/新架构命名规范.mdc
 */
// 小程序编译器对 `export *` re-export 支持有限, 改为先 import 再 export (与 src/index.ts 一致)
const index_1 = require("./code/index");
Object.defineProperty(exports, "GameSystemService", { enumerable: true, get: function () { return index_1.GameSystemService; } });
Object.defineProperty(exports, "BootRouter", { enumerable: true, get: function () { return index_1.BootRouter; } });
Object.defineProperty(exports, "NmiCallbackIndex", { enumerable: true, get: function () { return index_1.NmiCallbackIndex; } });
Object.defineProperty(exports, "HardwareInitService", { enumerable: true, get: function () { return index_1.HardwareInitService; } });
Object.defineProperty(exports, "InterruptService", { enumerable: true, get: function () { return index_1.InterruptService; } });
Object.defineProperty(exports, "OpeningSceneController", { enumerable: true, get: function () { return index_1.OpeningSceneController; } });
Object.defineProperty(exports, "TitleSceneController", { enumerable: true, get: function () { return index_1.TitleSceneController; } });
Object.defineProperty(exports, "PasswordCallbackHandler", { enumerable: true, get: function () { return index_1.PasswordCallbackHandler; } });
Object.defineProperty(exports, "ResultSceneController", { enumerable: true, get: function () { return index_1.ResultSceneController; } });
Object.defineProperty(exports, "StorySceneController", { enumerable: true, get: function () { return index_1.StorySceneController; } });
Object.defineProperty(exports, "ScriptEngine", { enumerable: true, get: function () { return index_1.ScriptEngine; } });
Object.defineProperty(exports, "ScriptOpcodes", { enumerable: true, get: function () { return index_1.ScriptOpcodes; } });
Object.defineProperty(exports, "ScriptLoader", { enumerable: true, get: function () { return index_1.ScriptLoader; } });
Object.defineProperty(exports, "CharMap", { enumerable: true, get: function () { return index_1.CharMap; } });
Object.defineProperty(exports, "PlayerQueryService", { enumerable: true, get: function () { return index_1.PlayerQueryService; } });
Object.defineProperty(exports, "TeamRosterService", { enumerable: true, get: function () { return index_1.TeamRosterService; } });
Object.defineProperty(exports, "MatchEngineService", { enumerable: true, get: function () { return index_1.MatchEngineService; } });
Object.defineProperty(exports, "MatchTurnService", { enumerable: true, get: function () { return index_1.MatchTurnService; } });
Object.defineProperty(exports, "MatchAuxService", { enumerable: true, get: function () { return index_1.MatchAuxService; } });
Object.defineProperty(exports, "MatchHudService", { enumerable: true, get: function () { return index_1.MatchHudService; } });
Object.defineProperty(exports, "MatchConfigService", { enumerable: true, get: function () { return index_1.MatchConfigService; } });
Object.defineProperty(exports, "SkillService", { enumerable: true, get: function () { return index_1.SkillService; } });
Object.defineProperty(exports, "SpriteService", { enumerable: true, get: function () { return index_1.SpriteService; } });
Object.defineProperty(exports, "SpriteAnimationService", { enumerable: true, get: function () { return index_1.SpriteAnimationService; } });
Object.defineProperty(exports, "AudioService", { enumerable: true, get: function () { return index_1.AudioService; } });
Object.defineProperty(exports, "NMI_CALLBACK_TABLE", { enumerable: true, get: function () { return index_1.NMI_CALLBACK_TABLE; } });
Object.defineProperty(exports, "PASSWORD_DISPATCH_TABLE", { enumerable: true, get: function () { return index_1.PASSWORD_DISPATCH_TABLE; } });
Object.defineProperty(exports, "WAIT_FRAME_TABLE", { enumerable: true, get: function () { return index_1.WAIT_FRAME_TABLE; } });
Object.defineProperty(exports, "initScriptOpcodes", { enumerable: true, get: function () { return index_1.initScriptOpcodes; } });
Object.defineProperty(exports, "SE_POINTER_TABLE", { enumerable: true, get: function () { return index_1.SE_POINTER_TABLE; } });
Object.defineProperty(exports, "BGM_DATA_MAP", { enumerable: true, get: function () { return index_1.BGM_DATA_MAP; } });
const DataStore_1 = require("./data/store/DataStore");
Object.defineProperty(exports, "DataStore", { enumerable: true, get: function () { return DataStore_1.DataStore; } });
