/**
 * prg/index.ts — 翻译层出口契约
 *
 * code/ = 业务逻辑 (Service, 按业务域分包)
 * data/ = 数据模型 (Table, ORM 风格)
 *
 * 命名规范 v2 (Java/Spring 风格): 弃用 bankXX 前缀, 见 .codebuddy/rules/新架构命名规范.mdc
 */
// 小程序编译器对 `export *` re-export 支持有限, 改为先 import 再 export (与 src/index.ts 一致)
import {
  GameSystemService, BootRouter, NmiCallbackIndex, HardwareInitService,
  InterruptService, TitleSceneController,
  PasswordCallbackHandler, ResultSceneController,
  BootBackgroundRenderer,
  ScriptEngine, ScriptOpcodes, ScriptLoader, CharMap,
  PlayerQueryService, TeamRosterService,
  MatchEngineService, MatchTurnService, MatchAuxService, MatchHudService, MatchConfigService,
  SkillService, SpriteService, SpriteAnimationService, AudioService,
  NMI_CALLBACK_TABLE, PASSWORD_DISPATCH_TABLE,
  WAIT_FRAME_TABLE, initScriptOpcodes, SE_POINTER_TABLE, BGM_DATA_MAP,
  PrgBankService, PrgWindow,
} from './code/index';
import { DataStore } from './data/store/DataStore';

export {
  GameSystemService, BootRouter, NmiCallbackIndex, HardwareInitService,
  InterruptService, TitleSceneController,
  PasswordCallbackHandler, ResultSceneController,
  BootBackgroundRenderer,
  ScriptEngine, ScriptOpcodes, ScriptLoader, CharMap,
  PlayerQueryService, TeamRosterService,
  MatchEngineService, MatchTurnService, MatchAuxService, MatchHudService, MatchConfigService,
  SkillService, SpriteService, SpriteAnimationService, AudioService,
  NMI_CALLBACK_TABLE, PASSWORD_DISPATCH_TABLE,
  WAIT_FRAME_TABLE, initScriptOpcodes, SE_POINTER_TABLE, BGM_DATA_MAP,
  PrgBankService, PrgWindow,
  DataStore,
};
