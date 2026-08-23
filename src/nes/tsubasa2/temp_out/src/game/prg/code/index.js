"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApuPcmRendererImpl = exports.WebAudioApuTarget = exports.NullApuTarget = exports.LogApuTarget = exports.AudioService = exports.SpriteAnimationService = exports.SpriteService = exports.SkillService = exports.MatchConfigService = exports.MatchHudService = exports.MatchAuxService = exports.MatchTurnService = exports.MatchEngineService = exports.TeamRosterService = exports.PlayerQueryService = exports.CharMap = exports.ScriptLoader = exports.initScriptOpcodes = exports.ScriptOpcode = exports.ScriptEngine = exports.StorySceneController = exports.ResultSceneController = exports.PasswordSceneController = exports.TitleSceneController = exports.OpeningSceneController = exports.SceneController = exports.InputService = exports.InterruptService = exports.HardwareInitService = exports.BootRouter = exports.GameSystemService = void 0;
/**
 * code/index.ts — 业务逻辑层出口契约（service）
 *
 * 按业务域导出 Service，外部只能通过本文件访问 code 层。
 */
// system
var GameSystemService_1 = require("./system/GameSystemService");
Object.defineProperty(exports, "GameSystemService", { enumerable: true, get: function () { return GameSystemService_1.GameSystemService; } });
var BootRouter_1 = require("./system/BootRouter");
Object.defineProperty(exports, "BootRouter", { enumerable: true, get: function () { return BootRouter_1.BootRouter; } });
var HardwareInitService_1 = require("./system/HardwareInitService");
Object.defineProperty(exports, "HardwareInitService", { enumerable: true, get: function () { return HardwareInitService_1.HardwareInitService; } });
var InterruptService_1 = require("./system/InterruptService");
Object.defineProperty(exports, "InterruptService", { enumerable: true, get: function () { return InterruptService_1.InterruptService; } });
var InputService_1 = require("./system/InputService");
Object.defineProperty(exports, "InputService", { enumerable: true, get: function () { return InputService_1.InputService; } });
// scene
var SceneController_1 = require("./scene/SceneController");
Object.defineProperty(exports, "SceneController", { enumerable: true, get: function () { return SceneController_1.SceneController; } });
var OpeningSceneController_1 = require("./scene/OpeningSceneController");
Object.defineProperty(exports, "OpeningSceneController", { enumerable: true, get: function () { return OpeningSceneController_1.OpeningSceneController; } });
var TitleSceneController_1 = require("./scene/TitleSceneController");
Object.defineProperty(exports, "TitleSceneController", { enumerable: true, get: function () { return TitleSceneController_1.TitleSceneController; } });
var PasswordSceneController_1 = require("./scene/PasswordSceneController");
Object.defineProperty(exports, "PasswordSceneController", { enumerable: true, get: function () { return PasswordSceneController_1.PasswordSceneController; } });
var ResultSceneController_1 = require("./scene/ResultSceneController");
Object.defineProperty(exports, "ResultSceneController", { enumerable: true, get: function () { return ResultSceneController_1.ResultSceneController; } });
var StorySceneController_1 = require("./scene/StorySceneController");
Object.defineProperty(exports, "StorySceneController", { enumerable: true, get: function () { return StorySceneController_1.StorySceneController; } });
// story
var ScriptEngine_1 = require("./story/ScriptEngine");
Object.defineProperty(exports, "ScriptEngine", { enumerable: true, get: function () { return ScriptEngine_1.ScriptEngine; } });
var ScriptOpcodes_1 = require("./story/ScriptOpcodes");
Object.defineProperty(exports, "ScriptOpcode", { enumerable: true, get: function () { return ScriptOpcodes_1.ScriptOpcode; } });
Object.defineProperty(exports, "initScriptOpcodes", { enumerable: true, get: function () { return ScriptOpcodes_1.initScriptOpcodes; } });
var ScriptLoader_1 = require("./story/ScriptLoader");
Object.defineProperty(exports, "ScriptLoader", { enumerable: true, get: function () { return ScriptLoader_1.ScriptLoader; } });
var CharMap_1 = require("./story/CharMap");
Object.defineProperty(exports, "CharMap", { enumerable: true, get: function () { return CharMap_1.CharMap; } });
// player / team
var PlayerQueryService_1 = require("./player/PlayerQueryService");
Object.defineProperty(exports, "PlayerQueryService", { enumerable: true, get: function () { return PlayerQueryService_1.PlayerQueryService; } });
var TeamRosterService_1 = require("./team/TeamRosterService");
Object.defineProperty(exports, "TeamRosterService", { enumerable: true, get: function () { return TeamRosterService_1.TeamRosterService; } });
// match
var MatchEngineService_1 = require("./match/MatchEngineService");
Object.defineProperty(exports, "MatchEngineService", { enumerable: true, get: function () { return MatchEngineService_1.MatchEngineService; } });
var MatchTurnService_1 = require("./match/MatchTurnService");
Object.defineProperty(exports, "MatchTurnService", { enumerable: true, get: function () { return MatchTurnService_1.MatchTurnService; } });
var MatchAuxService_1 = require("./match/MatchAuxService");
Object.defineProperty(exports, "MatchAuxService", { enumerable: true, get: function () { return MatchAuxService_1.MatchAuxService; } });
var MatchHudService_1 = require("./match/MatchHudService");
Object.defineProperty(exports, "MatchHudService", { enumerable: true, get: function () { return MatchHudService_1.MatchHudService; } });
var MatchConfigService_1 = require("./match/MatchConfigService");
Object.defineProperty(exports, "MatchConfigService", { enumerable: true, get: function () { return MatchConfigService_1.MatchConfigService; } });
// skill / sprite / audio
var SkillService_1 = require("./skill/SkillService");
Object.defineProperty(exports, "SkillService", { enumerable: true, get: function () { return SkillService_1.SkillService; } });
var SpriteService_1 = require("./sprite/SpriteService");
Object.defineProperty(exports, "SpriteService", { enumerable: true, get: function () { return SpriteService_1.SpriteService; } });
var SpriteAnimationService_1 = require("./sprite/SpriteAnimationService");
Object.defineProperty(exports, "SpriteAnimationService", { enumerable: true, get: function () { return SpriteAnimationService_1.SpriteAnimationService; } });
var AudioService_1 = require("./audio/AudioService");
Object.defineProperty(exports, "AudioService", { enumerable: true, get: function () { return AudioService_1.AudioService; } });
var ApuTarget_1 = require("./audio/ApuTarget");
Object.defineProperty(exports, "LogApuTarget", { enumerable: true, get: function () { return ApuTarget_1.LogApuTarget; } });
Object.defineProperty(exports, "NullApuTarget", { enumerable: true, get: function () { return ApuTarget_1.NullApuTarget; } });
var WebAudioApuTarget_1 = require("./audio/WebAudioApuTarget");
Object.defineProperty(exports, "WebAudioApuTarget", { enumerable: true, get: function () { return WebAudioApuTarget_1.WebAudioApuTarget; } });
var ApuPcmRenderer_1 = require("./audio/ApuPcmRenderer");
Object.defineProperty(exports, "ApuPcmRendererImpl", { enumerable: true, get: function () { return ApuPcmRenderer_1.ApuPcmRendererImpl; } });
