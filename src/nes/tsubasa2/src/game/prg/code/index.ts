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

// scene
export { SceneController } from './scene/SceneController';
export { OpeningSceneController } from './scene/OpeningSceneController';
export { TitleSceneController } from './scene/TitleSceneController';
export { PasswordSceneController } from './scene/PasswordSceneController';
export { ResultSceneController } from './scene/ResultSceneController';
export { StorySceneController } from './scene/StorySceneController';

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
export { TeamRosterService } from './team/TeamRosterService';

// match
export { MatchEngineService } from './match/MatchEngineService';
export type { MatchState } from './match/MatchEngineService';
export { MatchTurnService } from './match/MatchTurnService';
export { MatchAuxService } from './match/MatchAuxService';
export { MatchHudService } from './match/MatchHudService';
export { MatchConfigService } from './match/MatchConfigService';

// skill / sprite / audio
export { SkillService } from './skill/SkillService';
export { SpriteService } from './sprite/SpriteService';
export { SpriteAnimationService } from './sprite/SpriteAnimationService';
export { AudioService } from './audio/AudioService';
