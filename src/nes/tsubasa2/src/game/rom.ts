/**
 * game/rom.ts — 扁平化 ROM 定义 (小程序编译器友好)
 *
 * prg 参数 = 翻译后的 bank 类集合 (存到 rom.tsPrg, 无需原始字节)。
 * 浏览器/小程序入口: BrowserMini.loadTsROM({ header, prg, chr })。
 */
import { HEADER } from './header';
import { NES_CHR_ROM } from './chr/index';

import {
  GameSystemService,
  HardwareInitService,
  PlayerQueryService,
  AudioService,
  OpeningSceneController,
  ResultSceneController,
  PasswordSceneController,
  MatchEngineService,
  MatchHudService,
  MatchConfigService,
  InterruptService,
  MatchTurnService,
  SkillService,
  StorySceneController,
  MatchAuxService,
  SpriteService,
  SpriteAnimationService,
  TeamRosterService,
  BootRouter,
  TaskIndex,
} from './prg/index';

/** PRG bank 类集合 (供 NES.loadTsROM 存到 rom.tsPrg) */
const PRG = {
  GameSystemService, HardwareInitService, PlayerQueryService,
  AudioService, OpeningSceneController, ResultSceneController,
  PasswordSceneController, MatchEngineService, MatchHudService,
  MatchConfigService, InterruptService, MatchTurnService, SkillService,
  StorySceneController, MatchAuxService, SpriteService, SpriteAnimationService,
  TeamRosterService, BootRouter, TaskIndex,
};

export { HEADER, NES_CHR_ROM, PRG };
