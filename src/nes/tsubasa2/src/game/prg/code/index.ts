/**
 * prg/code/index.ts — 业务逻辑层 (Service) 聚合出口
 * 按业务域分包: system / scene / story / player / team / match / skill / sprite / audio
 */
export { GameSystemService } from './system/GameSystemService';
export { BootRouter, TaskIndex } from './system/BootRouter';
export { HardwareInitService } from './system/HardwareInitService';
export { InterruptService, type BankConfig } from './system/InterruptService';

export { SceneController } from './scene/SceneController';
export { OpeningSceneController, type OpeningDisplayState } from './scene/OpeningSceneController';
export { TitleSceneController } from './scene/TitleSceneController';
export { PasswordSceneController, PASSWORD_DISPATCH_TABLE } from './scene/PasswordSceneController';
export { ResultSceneController } from './scene/ResultSceneController';
export { StorySceneController, StoryChapter } from './scene/StorySceneController';

export { ScriptEngine } from './story/ScriptEngine';
export { ScriptOpcodes, WAIT_FRAME_TABLE, initScriptOpcodes } from './story/ScriptOpcodes';
export { ScriptLoader, getScriptData, type ScriptData } from './story/ScriptLoader';
export { CharMap, decodeChar } from './story/CharMap';

export { PlayerQueryService } from './player/PlayerQueryService';
export { TeamRosterService } from './team/TeamRosterService';

export { MatchEngineService } from './match/MatchEngineService';
export { MatchTurnService } from './match/MatchTurnService';
export { MatchAuxService } from './match/MatchAuxService';
export { MatchHudService } from './match/MatchHudService';
export { MatchConfigService } from './match/MatchConfigService';

export { SkillService } from './skill/SkillService';
export { SpriteService } from './sprite/SpriteService';
export { SpriteAnimationService } from './sprite/SpriteAnimationService';

export { AudioService, SE_POINTER_TABLE, BGM_DATA_MAP } from './audio/AudioService';
