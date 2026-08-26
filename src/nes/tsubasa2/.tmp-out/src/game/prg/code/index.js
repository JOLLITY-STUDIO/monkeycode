/**
 * code/index.ts — 业务逻辑层出口契约（service）
 *
 * 按业务域导出 Service，外部只能通过本文件访问 code 层。
 */
// system
export { BootRouter } from './system/BootRouter';
export { HardwareInitService } from './system/HardwareInitService';
export { InterruptService } from './system/InterruptService';
export { InputService } from './system/InputService';
// bank00 翻译服务 (BANK00_ANALYSIS.md §9.2 落地清单)
export { Bank00SchedulerService } from './system/Bank00SchedulerService';
export { PpuTransferService } from './system/PpuTransferService';
export { MainRouterService } from './system/MainRouterService';
// bank00 PRG $8000 主循环 (5-mode dispatch + scheduler tail + boot + audio req) 翻译
export { Bank00MainLoopService } from './system/Bank00MainLoopService';
export { NtStreamLoaderService } from './system/NtStreamLoaderService';
export { SceneStateMachine } from './system/SceneStateMachine';
export { TileBuilderService } from './system/TileBuilderService';
export { RenderingPrimitivesService } from './system/RenderingPrimitivesService';
// scene（按场景 ID 组织：场景表 + 控制器）
export { SceneController } from './scene/SceneController';
export { Scene0Controller } from './scene/Scene0Controller';
export { SCENE_TABLE, getSceneEntry } from './scene/SceneTable';
export { Scene1Controller } from './scene/Scene1Controller';
export { Scene2Controller } from './scene/Scene2Controller';
export { Scene3Controller } from './scene/Scene3Controller';
export { Scene4Controller } from './scene/Scene4Controller';
export { Scene5Controller } from './scene/Scene5Controller';
export { Scene6Controller } from './scene/Scene6Controller';
export { Scene7Controller } from './scene/Scene7Controller';
export { Scene8Controller } from './scene/Scene8Controller';
export { Scene9Controller } from './scene/Scene9Controller';
export { Scene10Controller } from './scene/Scene10Controller';
export { Scene11Controller } from './scene/Scene11Controller';
export { Scene12Controller } from './scene/Scene12Controller';
export { Scene13Controller } from './scene/Scene13Controller';
export { Scene14Controller } from './scene/Scene14Controller';
export { Scene15Controller } from './scene/Scene15Controller';
export { Scene16Controller } from './scene/Scene16Controller';
export { Scene17Controller } from './scene/Scene17Controller';
export { Scene18Controller } from './scene/Scene18Controller';
export { Scene19Controller } from './scene/Scene19Controller';
export { Scene20Controller } from './scene/Scene20Controller';
export { Scene21Controller } from './scene/Scene21Controller';
export { Scene22Controller } from './scene/Scene22Controller';
export { Scene23Controller } from './scene/Scene23Controller';
// 片头序列（附加场景 sceneId=100，boot 后进、播完切 Scene0）
export { OpeningSceneController, OPENING_SCENE_ID } from './scene/OpeningSceneController';
// story
export { ScriptEngine } from './story/ScriptEngine';
export { ScriptOpcode, initScriptOpcodes, setScriptRuntime } from './story/ScriptOpcodes';
export { ScriptLoader } from './story/ScriptLoader';
export { CharMap } from './story/CharMap';
// player / team
export { PlayerQueryService } from './player/PlayerQueryService';
export { PlayerMoveService } from './player/PlayerMoveService';
export { PlayerNameService } from './player/PlayerNameService';
export { PlayerTileService } from './player/PlayerTileService';
export { TeamRosterService } from './team/TeamRosterService';
// match
export { MatchEngineService } from './match/MatchEngineService';
export { MatchTurnService } from './match/MatchTurnService';
export { MatchAuxService } from './match/MatchAuxService';
export { MatchHudService } from './match/MatchHudService';
export { MatchConfigService } from './match/MatchConfigService';
export { MatchEventService, MatchEventType } from './match/MatchEventService';
export { MatchRoundService, MatchRoundType } from './match/MatchRoundService';
export { MatchActionService, MatchActionType } from './match/MatchActionService';
// skill / sprite / audio
export { SkillService } from './skill/SkillService';
export { SpriteService } from './sprite/SpriteService';
export { SpriteAnimationService } from './sprite/SpriteAnimationService';
export { SpriteFrameService } from './sprite/SpriteFrameService';
export { AudioService } from './audio/AudioService';
export { LogApuTarget, NullApuTarget } from './audio/ApuTarget';
export { WebAudioApuTarget } from './audio/WebAudioApuTarget';
export { ApuPcmRendererImpl } from './audio/ApuPcmRenderer';
// ui（V1.0+ 具象化层：消费已翻译数据，输出渲染视图）
export { LevelUpUiService } from './ui/LevelUpUiService';
export { MatchResultUiService } from './ui/MatchResultUiService';
