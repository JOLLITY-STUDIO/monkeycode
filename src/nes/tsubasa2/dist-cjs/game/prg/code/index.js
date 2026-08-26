"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerNameService = exports.PlayerMoveService = exports.PlayerQueryService = exports.CharMap = exports.ScriptLoader = exports.setScriptRuntime = exports.initScriptOpcodes = exports.ScriptOpcode = exports.ScriptEngine = exports.OPENING_SCENE_ID = exports.OpeningSceneController = exports.Scene23Controller = exports.Scene22Controller = exports.Scene21Controller = exports.Scene20Controller = exports.Scene19Controller = exports.Scene18Controller = exports.Scene17Controller = exports.Scene16Controller = exports.Scene15Controller = exports.Scene14Controller = exports.Scene13Controller = exports.Scene12Controller = exports.Scene11Controller = exports.Scene10Controller = exports.Scene9Controller = exports.Scene8Controller = exports.Scene7Controller = exports.Scene6Controller = exports.Scene5Controller = exports.Scene4Controller = exports.Scene3Controller = exports.Scene2Controller = exports.Scene1Controller = exports.getSceneEntry = exports.SCENE_TABLE = exports.Scene0Controller = exports.SceneController = exports.RenderingPrimitivesService = exports.TileBuilderService = exports.SceneStateMachine = exports.NtStreamLoaderService = exports.Bank00MainLoopService = exports.MainRouterService = exports.PpuTransferService = exports.Bank00SchedulerService = exports.InputService = exports.InterruptService = exports.HardwareInitService = exports.BootRouter = void 0;
exports.MatchResultUiService = exports.LevelUpUiService = exports.ApuPcmRendererImpl = exports.WebAudioApuTarget = exports.NullApuTarget = exports.LogApuTarget = exports.AudioService = exports.SpriteFrameService = exports.SpriteAnimationService = exports.SpriteService = exports.SkillService = exports.MatchActionType = exports.MatchActionService = exports.MatchRoundType = exports.MatchRoundService = exports.MatchEventType = exports.MatchEventService = exports.MatchConfigService = exports.MatchHudService = exports.MatchAuxService = exports.MatchTurnService = exports.MatchEngineService = exports.TeamRosterService = exports.PlayerTileService = void 0;
/**
 * code/index.ts — 业务逻辑层出口契约（service）
 *
 * 按业务域导出 Service，外部只能通过本文件访问 code 层。
 */
// system
var BootRouter_1 = require("./system/BootRouter");
Object.defineProperty(exports, "BootRouter", { enumerable: true, get: function () { return BootRouter_1.BootRouter; } });
var HardwareInitService_1 = require("./system/HardwareInitService");
Object.defineProperty(exports, "HardwareInitService", { enumerable: true, get: function () { return HardwareInitService_1.HardwareInitService; } });
var InterruptService_1 = require("./system/InterruptService");
Object.defineProperty(exports, "InterruptService", { enumerable: true, get: function () { return InterruptService_1.InterruptService; } });
var InputService_1 = require("./system/InputService");
Object.defineProperty(exports, "InputService", { enumerable: true, get: function () { return InputService_1.InputService; } });
// bank00 翻译服务 (BANK00_ANALYSIS.md §9.2 落地清单)
var Bank00SchedulerService_1 = require("./system/Bank00SchedulerService");
Object.defineProperty(exports, "Bank00SchedulerService", { enumerable: true, get: function () { return Bank00SchedulerService_1.Bank00SchedulerService; } });
var PpuTransferService_1 = require("./system/PpuTransferService");
Object.defineProperty(exports, "PpuTransferService", { enumerable: true, get: function () { return PpuTransferService_1.PpuTransferService; } });
var MainRouterService_1 = require("./system/MainRouterService");
Object.defineProperty(exports, "MainRouterService", { enumerable: true, get: function () { return MainRouterService_1.MainRouterService; } });
// bank00 PRG $8000 主循环 (5-mode dispatch + scheduler tail + boot + audio req) 翻译
var Bank00MainLoopService_1 = require("./system/Bank00MainLoopService");
Object.defineProperty(exports, "Bank00MainLoopService", { enumerable: true, get: function () { return Bank00MainLoopService_1.Bank00MainLoopService; } });
var NtStreamLoaderService_1 = require("./system/NtStreamLoaderService");
Object.defineProperty(exports, "NtStreamLoaderService", { enumerable: true, get: function () { return NtStreamLoaderService_1.NtStreamLoaderService; } });
var SceneStateMachine_1 = require("./system/SceneStateMachine");
Object.defineProperty(exports, "SceneStateMachine", { enumerable: true, get: function () { return SceneStateMachine_1.SceneStateMachine; } });
var TileBuilderService_1 = require("./system/TileBuilderService");
Object.defineProperty(exports, "TileBuilderService", { enumerable: true, get: function () { return TileBuilderService_1.TileBuilderService; } });
var RenderingPrimitivesService_1 = require("./system/RenderingPrimitivesService");
Object.defineProperty(exports, "RenderingPrimitivesService", { enumerable: true, get: function () { return RenderingPrimitivesService_1.RenderingPrimitivesService; } });
// scene（按场景 ID 组织：场景表 + 控制器）
var SceneController_1 = require("./scene/SceneController");
Object.defineProperty(exports, "SceneController", { enumerable: true, get: function () { return SceneController_1.SceneController; } });
var Scene0Controller_1 = require("./scene/Scene0Controller");
Object.defineProperty(exports, "Scene0Controller", { enumerable: true, get: function () { return Scene0Controller_1.Scene0Controller; } });
var SceneTable_1 = require("./scene/SceneTable");
Object.defineProperty(exports, "SCENE_TABLE", { enumerable: true, get: function () { return SceneTable_1.SCENE_TABLE; } });
Object.defineProperty(exports, "getSceneEntry", { enumerable: true, get: function () { return SceneTable_1.getSceneEntry; } });
var Scene1Controller_1 = require("./scene/Scene1Controller");
Object.defineProperty(exports, "Scene1Controller", { enumerable: true, get: function () { return Scene1Controller_1.Scene1Controller; } });
var Scene2Controller_1 = require("./scene/Scene2Controller");
Object.defineProperty(exports, "Scene2Controller", { enumerable: true, get: function () { return Scene2Controller_1.Scene2Controller; } });
var Scene3Controller_1 = require("./scene/Scene3Controller");
Object.defineProperty(exports, "Scene3Controller", { enumerable: true, get: function () { return Scene3Controller_1.Scene3Controller; } });
var Scene4Controller_1 = require("./scene/Scene4Controller");
Object.defineProperty(exports, "Scene4Controller", { enumerable: true, get: function () { return Scene4Controller_1.Scene4Controller; } });
var Scene5Controller_1 = require("./scene/Scene5Controller");
Object.defineProperty(exports, "Scene5Controller", { enumerable: true, get: function () { return Scene5Controller_1.Scene5Controller; } });
var Scene6Controller_1 = require("./scene/Scene6Controller");
Object.defineProperty(exports, "Scene6Controller", { enumerable: true, get: function () { return Scene6Controller_1.Scene6Controller; } });
var Scene7Controller_1 = require("./scene/Scene7Controller");
Object.defineProperty(exports, "Scene7Controller", { enumerable: true, get: function () { return Scene7Controller_1.Scene7Controller; } });
var Scene8Controller_1 = require("./scene/Scene8Controller");
Object.defineProperty(exports, "Scene8Controller", { enumerable: true, get: function () { return Scene8Controller_1.Scene8Controller; } });
var Scene9Controller_1 = require("./scene/Scene9Controller");
Object.defineProperty(exports, "Scene9Controller", { enumerable: true, get: function () { return Scene9Controller_1.Scene9Controller; } });
var Scene10Controller_1 = require("./scene/Scene10Controller");
Object.defineProperty(exports, "Scene10Controller", { enumerable: true, get: function () { return Scene10Controller_1.Scene10Controller; } });
var Scene11Controller_1 = require("./scene/Scene11Controller");
Object.defineProperty(exports, "Scene11Controller", { enumerable: true, get: function () { return Scene11Controller_1.Scene11Controller; } });
var Scene12Controller_1 = require("./scene/Scene12Controller");
Object.defineProperty(exports, "Scene12Controller", { enumerable: true, get: function () { return Scene12Controller_1.Scene12Controller; } });
var Scene13Controller_1 = require("./scene/Scene13Controller");
Object.defineProperty(exports, "Scene13Controller", { enumerable: true, get: function () { return Scene13Controller_1.Scene13Controller; } });
var Scene14Controller_1 = require("./scene/Scene14Controller");
Object.defineProperty(exports, "Scene14Controller", { enumerable: true, get: function () { return Scene14Controller_1.Scene14Controller; } });
var Scene15Controller_1 = require("./scene/Scene15Controller");
Object.defineProperty(exports, "Scene15Controller", { enumerable: true, get: function () { return Scene15Controller_1.Scene15Controller; } });
var Scene16Controller_1 = require("./scene/Scene16Controller");
Object.defineProperty(exports, "Scene16Controller", { enumerable: true, get: function () { return Scene16Controller_1.Scene16Controller; } });
var Scene17Controller_1 = require("./scene/Scene17Controller");
Object.defineProperty(exports, "Scene17Controller", { enumerable: true, get: function () { return Scene17Controller_1.Scene17Controller; } });
var Scene18Controller_1 = require("./scene/Scene18Controller");
Object.defineProperty(exports, "Scene18Controller", { enumerable: true, get: function () { return Scene18Controller_1.Scene18Controller; } });
var Scene19Controller_1 = require("./scene/Scene19Controller");
Object.defineProperty(exports, "Scene19Controller", { enumerable: true, get: function () { return Scene19Controller_1.Scene19Controller; } });
var Scene20Controller_1 = require("./scene/Scene20Controller");
Object.defineProperty(exports, "Scene20Controller", { enumerable: true, get: function () { return Scene20Controller_1.Scene20Controller; } });
var Scene21Controller_1 = require("./scene/Scene21Controller");
Object.defineProperty(exports, "Scene21Controller", { enumerable: true, get: function () { return Scene21Controller_1.Scene21Controller; } });
var Scene22Controller_1 = require("./scene/Scene22Controller");
Object.defineProperty(exports, "Scene22Controller", { enumerable: true, get: function () { return Scene22Controller_1.Scene22Controller; } });
var Scene23Controller_1 = require("./scene/Scene23Controller");
Object.defineProperty(exports, "Scene23Controller", { enumerable: true, get: function () { return Scene23Controller_1.Scene23Controller; } });
// 片头序列（附加场景 sceneId=100，boot 后进、播完切 Scene0）
var OpeningSceneController_1 = require("./scene/OpeningSceneController");
Object.defineProperty(exports, "OpeningSceneController", { enumerable: true, get: function () { return OpeningSceneController_1.OpeningSceneController; } });
Object.defineProperty(exports, "OPENING_SCENE_ID", { enumerable: true, get: function () { return OpeningSceneController_1.OPENING_SCENE_ID; } });
// story
var ScriptEngine_1 = require("./story/ScriptEngine");
Object.defineProperty(exports, "ScriptEngine", { enumerable: true, get: function () { return ScriptEngine_1.ScriptEngine; } });
var ScriptOpcodes_1 = require("./story/ScriptOpcodes");
Object.defineProperty(exports, "ScriptOpcode", { enumerable: true, get: function () { return ScriptOpcodes_1.ScriptOpcode; } });
Object.defineProperty(exports, "initScriptOpcodes", { enumerable: true, get: function () { return ScriptOpcodes_1.initScriptOpcodes; } });
Object.defineProperty(exports, "setScriptRuntime", { enumerable: true, get: function () { return ScriptOpcodes_1.setScriptRuntime; } });
var ScriptLoader_1 = require("./story/ScriptLoader");
Object.defineProperty(exports, "ScriptLoader", { enumerable: true, get: function () { return ScriptLoader_1.ScriptLoader; } });
var CharMap_1 = require("./story/CharMap");
Object.defineProperty(exports, "CharMap", { enumerable: true, get: function () { return CharMap_1.CharMap; } });
// player / team
var PlayerQueryService_1 = require("./player/PlayerQueryService");
Object.defineProperty(exports, "PlayerQueryService", { enumerable: true, get: function () { return PlayerQueryService_1.PlayerQueryService; } });
var PlayerMoveService_1 = require("./player/PlayerMoveService");
Object.defineProperty(exports, "PlayerMoveService", { enumerable: true, get: function () { return PlayerMoveService_1.PlayerMoveService; } });
var PlayerNameService_1 = require("./player/PlayerNameService");
Object.defineProperty(exports, "PlayerNameService", { enumerable: true, get: function () { return PlayerNameService_1.PlayerNameService; } });
var PlayerTileService_1 = require("./player/PlayerTileService");
Object.defineProperty(exports, "PlayerTileService", { enumerable: true, get: function () { return PlayerTileService_1.PlayerTileService; } });
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
var MatchEventService_1 = require("./match/MatchEventService");
Object.defineProperty(exports, "MatchEventService", { enumerable: true, get: function () { return MatchEventService_1.MatchEventService; } });
Object.defineProperty(exports, "MatchEventType", { enumerable: true, get: function () { return MatchEventService_1.MatchEventType; } });
var MatchRoundService_1 = require("./match/MatchRoundService");
Object.defineProperty(exports, "MatchRoundService", { enumerable: true, get: function () { return MatchRoundService_1.MatchRoundService; } });
Object.defineProperty(exports, "MatchRoundType", { enumerable: true, get: function () { return MatchRoundService_1.MatchRoundType; } });
var MatchActionService_1 = require("./match/MatchActionService");
Object.defineProperty(exports, "MatchActionService", { enumerable: true, get: function () { return MatchActionService_1.MatchActionService; } });
Object.defineProperty(exports, "MatchActionType", { enumerable: true, get: function () { return MatchActionService_1.MatchActionType; } });
// skill / sprite / audio
var SkillService_1 = require("./skill/SkillService");
Object.defineProperty(exports, "SkillService", { enumerable: true, get: function () { return SkillService_1.SkillService; } });
var SpriteService_1 = require("./sprite/SpriteService");
Object.defineProperty(exports, "SpriteService", { enumerable: true, get: function () { return SpriteService_1.SpriteService; } });
var SpriteAnimationService_1 = require("./sprite/SpriteAnimationService");
Object.defineProperty(exports, "SpriteAnimationService", { enumerable: true, get: function () { return SpriteAnimationService_1.SpriteAnimationService; } });
var SpriteFrameService_1 = require("./sprite/SpriteFrameService");
Object.defineProperty(exports, "SpriteFrameService", { enumerable: true, get: function () { return SpriteFrameService_1.SpriteFrameService; } });
var AudioService_1 = require("./audio/AudioService");
Object.defineProperty(exports, "AudioService", { enumerable: true, get: function () { return AudioService_1.AudioService; } });
var ApuTarget_1 = require("./audio/ApuTarget");
Object.defineProperty(exports, "LogApuTarget", { enumerable: true, get: function () { return ApuTarget_1.LogApuTarget; } });
Object.defineProperty(exports, "NullApuTarget", { enumerable: true, get: function () { return ApuTarget_1.NullApuTarget; } });
var WebAudioApuTarget_1 = require("./audio/WebAudioApuTarget");
Object.defineProperty(exports, "WebAudioApuTarget", { enumerable: true, get: function () { return WebAudioApuTarget_1.WebAudioApuTarget; } });
var ApuPcmRenderer_1 = require("./audio/ApuPcmRenderer");
Object.defineProperty(exports, "ApuPcmRendererImpl", { enumerable: true, get: function () { return ApuPcmRenderer_1.ApuPcmRendererImpl; } });
// ui（V1.0+ 具象化层：消费已翻译数据，输出渲染视图）
var LevelUpUiService_1 = require("./ui/LevelUpUiService");
Object.defineProperty(exports, "LevelUpUiService", { enumerable: true, get: function () { return LevelUpUiService_1.LevelUpUiService; } });
var MatchResultUiService_1 = require("./ui/MatchResultUiService");
Object.defineProperty(exports, "MatchResultUiService", { enumerable: true, get: function () { return MatchResultUiService_1.MatchResultUiService; } });
