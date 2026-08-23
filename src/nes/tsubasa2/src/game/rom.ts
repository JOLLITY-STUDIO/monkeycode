/**
 * game/rom.ts �?扁平�?ROM 定义 (小程序编译器友好)
 *
 * prg 参数 = 翻译后的 bank 类集�?(存到 rom.tsPrg, 无需原始字节)�? * 浏览�?小程序入�? BrowserMini.loadTsROM({ header, prg, chr })�? */
import { HEADER } from './header';
import { NES_CHR_ROM } from './chr/index';

import {
  Bank00Service,
  HardwareInitService,
  PlayerQueryService,
  AudioService,
  ResultSceneController,
  PasswordCallbackHandler,
  MatchEngineService,
  MatchHudService,
  MatchConfigService,
  InterruptService,
  MatchTurnService,
  SkillService,
  MatchAuxService,
  SpriteService,
  SpriteAnimationService,
  TeamRosterService,
  BootRouter,
  NmiCallbackIndex,
} from './prg/index';

/** PRG bank 类集�?(�?NES.loadTsROM 存到 rom.tsPrg) */
const PRG = {
  Bank00Service, HardwareInitService, PlayerQueryService,
  AudioService, ResultSceneController,
  PasswordCallbackHandler, MatchEngineService, MatchHudService,
  MatchConfigService, InterruptService, MatchTurnService, SkillService,
  MatchAuxService, SpriteService, SpriteAnimationService,
  TeamRosterService, BootRouter, NmiCallbackIndex,
};

export { HEADER, NES_CHR_ROM, PRG };
