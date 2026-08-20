/** 天使之翼2 — 公共导出 */
export {
  NES_WIDTH, NES_HEIGHT, TILE_PX,
  NT_COLS, NT_ROWS,
  CHR_BANK_SIZE, PRG_BANK_SIZE,
  BUTTON, GameState,
} from './core/types';
export type { DebugInfo } from './core/types';

// 配置
export { Mirroring, CONFIG } from './game/header';

// 数据中心
export { DataStore, RAM_KEYS } from './game/data/prg/DataStore';
export type { NameTable, NameTableEntry, SpriteEntry } from './game/data/prg/DataStore';

// 领域模型
export {
  PlayerPosition, FormationType, MatchPhase, SceneType,
  BLANK_PALETTE, createBlankPaletteTable,
} from './game/data/prg/model-types';
export type {
  Player, PlayerStats, SpecialMove,
  Team, Field, PlayerOnField,
  MatchState, DialogCommand, StoryNode,
  AnimationFrame, AnimationSequence,
  PaletteColor, PaletteEntry, PaletteTable,
} from './game/data/prg/model-types';

// 服务 (Bank 翻译) + 游戏主类 Tsubasa2
export { Bank00Service, Bank02Service, Bank11Service, Bank28MatchService, Bank30Service, DataQueryService, DispatchService, Tsubasa2 } from './game/index';

// 硬件核心 (tsnes 原结构)
export { default as PPU } from './core/ppu';
export { default as PAPU } from './core/papu';
export { default as Controller } from './core/controller';
