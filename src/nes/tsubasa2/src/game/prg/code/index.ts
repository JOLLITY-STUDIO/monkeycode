/**
 * code/index.ts — 业务逻辑层出口契约（service）
 *
 * 按业务域导出 Service，外部只能通过本文件访问 code 层。
 */
// system
export { GameSystemService } from './system/GameSystemService';
export { BootRouter, SceneId } from './system/BootRouter';
export { HardwareInitService } from './system/HardwareInitService';
export { InterruptService } from './system/InterruptService';
export type { PpuTarget } from './system/InterruptService';
export { InputService, Button } from './system/InputService';

// scene（按场景 ID 组织：场景表 + 控制器）
export { SceneController } from './scene/SceneController';
export { Scene0Controller } from './scene/Scene0Controller';
export { SCENE_TABLE, getSceneEntry } from './scene/SceneTable';
export type { SceneEntry } from './scene/SceneTable';
export {
  Scene1Controller, Scene2Controller, Scene3Controller, Scene4Controller,
  Scene5Controller, Scene6Controller, Scene7Controller, Scene8Controller,
  Scene9Controller, Scene10Controller, Scene11Controller, Scene12Controller,
  Scene13Controller,
} from './scene/SceneUtilitiesControllers';
export {
  Scene14Controller, Scene15Controller, Scene16Controller, Scene17Controller,
  Scene18Controller, Scene19Controller, Scene20Controller, Scene21Controller,
  Scene22Controller, Scene23Controller,
} from './scene/Scene14to23Controllers';

// story
export { ScriptEngine } from './story/ScriptEngine';
export type { ScriptContext } from './story/ScriptEngine';
export { ScriptOpcode, initScriptOpcodes } from './story/ScriptOpcodes';
export { ScriptLoader } from './story/ScriptLoader';
export type { ScriptSegment } from './story/ScriptLoader';
export { CharMap } from './story/CharMap';

// player / team
export { PlayerQueryService } from './player/PlayerQueryService';
export type { PlayerProfile } from './player/PlayerQueryService';
export { PlayerMoveService } from './player/PlayerMoveService';
export type { PlayerMoveRequest, PlayerMoveResult } from './player/PlayerMoveService';
export { PlayerNameService } from './player/PlayerNameService';
export type { PlayerName } from './player/PlayerNameService';
export { PlayerTileService } from './player/PlayerTileService';
export type { PlayerTilesResolved } from './player/PlayerTileService';
export { TeamRosterService } from './team/TeamRosterService';

// match
export { MatchEngineService } from './match/MatchEngineService';
export type { MatchState, PlayerSlot } from './match/MatchEngineService';
export { MatchTurnService } from './match/MatchTurnService';
export { MatchAuxService } from './match/MatchAuxService';
export { MatchHudService } from './match/MatchHudService';
export { MatchConfigService } from './match/MatchConfigService';
export { MatchEventService, MatchEventType } from './match/MatchEventService';
export type { MatchEventRequest, MatchEventResult } from './match/MatchEventService';
export { MatchRoundService, MatchRoundType } from './match/MatchRoundService';
export type { MatchRoundRequest, MatchRoundResult } from './match/MatchRoundService';
export { MatchActionService, MatchActionType } from './match/MatchActionService';
export type { MatchActionRequest, MatchActionResult } from './match/MatchActionService';

// skill / sprite / audio
export { SkillService } from './skill/SkillService';
export type { SkillTriggerRequest, SkillActionResult } from './skill/SkillService';
export { SpriteService } from './sprite/SpriteService';
export { SpriteAnimationService } from './sprite/SpriteAnimationService';
export { SpriteFrameService } from './sprite/SpriteFrameService';
export type { SpriteFrame } from './sprite/SpriteFrameService';
export { AudioService } from './audio/AudioService';
export type { Papu } from './audio/AudioService';
export { ApuTarget, LogApuTarget, NullApuTarget } from './audio/ApuTarget';
export { WebAudioApuTarget } from './audio/WebAudioApuTarget';
export { ApuPcmRendererImpl } from './audio/ApuPcmRenderer';
export type { ApuPcmRenderer } from './audio/ApuPcmRenderer';

// ui（V1.0+ 具象化层：消费已翻译数据，输出渲染视图）
export { LevelUpUiService } from './ui/LevelUpUiService';
export type { LevelUpInput, LevelUpView } from './ui/LevelUpUiService';
export { MatchResultUiService } from './ui/MatchResultUiService';
export type { MatchResultInput, MatchResultView } from './ui/MatchResultUiService';