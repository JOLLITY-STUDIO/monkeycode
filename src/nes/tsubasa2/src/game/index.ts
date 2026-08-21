/**
 * game/rom.ts — 扁平化 ROM 定义 (小程序编译器友好)
 *
 * prg 参数 = 翻译后的 bank 类集合 (存到 rom.tsPrg, 无需原始字节)
 * 不再 import data/index 的原始 prg-bank-N.ts 字节文件
 */
import { HEADER } from './header';
import { NES_CHR_ROM } from './chr/index';

// PRG: bank 类集合 (Bank00Service/Bank02Service/Bank30Service 等)
// 从 prg/index 导入, 但跳过 data/index 的原始字节依赖
import {
  Bank00Service,
  Bank02Service,
  Bank30Service,
  DataQueryService,
  Bank12AudioService,
  OpeningSceneController,
  ResultController,
  PasswordController,
  MatchEngineService,
  Bank24HudService,
  Bank28MatchService,
  InterruptService,
  Bank11Service,
  Bank16Service,
  Bank19Service,
  Bank18Service,
  Bank20Service,
  Bank22Service,
  Bank27Service,
  Bank29RosterService,
  DispatchService,
  TaskIndex,
} from './prg/index';

/** PRG bank 类集合 (供 NES.loadTsROM 存到 rom.tsPrg) */
const PRG = {
  Bank00Service, Bank02Service, Bank30Service, DataQueryService,
  Bank12AudioService, OpeningSceneController, ResultController,
  PasswordController, MatchEngineService, Bank24HudService,
  Bank28MatchService, InterruptService, Bank11Service, Bank16Service,
  Bank19Service, Bank18Service, Bank20Service, Bank22Service,
  Bank27Service, Bank29RosterService, DispatchService, TaskIndex,
};

export { HEADER, NES_CHR_ROM, PRG };
