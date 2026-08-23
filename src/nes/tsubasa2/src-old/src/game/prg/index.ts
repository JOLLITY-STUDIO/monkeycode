/**
 * prg/index.ts �?翻译层出口契�? *
 * code/ = 业务逻辑 (Service, 按业务域分包)
 * data/ = 数据模型 (Table, ORM 风格)
 *
 * 命名规范 v2 (Java/Spring 风格): 弃用 bankXX 前缀, �?.codebuddy/rules/新架构命名规�?mdc
 */
// 小程序编译器�?`export *` re-export 支持有限, 改为�?import �?export (�?src/index.ts 一�?
import {
  Bank00Service, Bank02Service, NmiCallbackIndex, HardwareInitService,
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
  Bank00Service, Bank02Service, NmiCallbackIndex, HardwareInitService,
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
