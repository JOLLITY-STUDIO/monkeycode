/** 天使之翼2 — 公共导出 */
export { Tsubasa2 } from './core/Tsubasa2';
export { GameLoop } from './core/GameLoop';
export {
  NES_WIDTH, NES_HEIGHT, TILE_PX,
  NT_COLS, NT_ROWS,
  CHR_BANK_SIZE, PRG_BANK_SIZE,
  BUTTON, GameState,
} from './core/types';
export type { Tsubasa2Config, DebugInfo, GameCallbacks } from './core/types';

// 配置
export { Mirroring, CONFIG } from './config';

// 数据中心
export { DataStore, RAM_KEYS } from './data/DataStore';
export type { NameTable, NameTableEntry, SpriteEntry } from './data/DataStore';

// 领域模型
export {
  PlayerPosition, FormationType, MatchPhase, SceneType,
  BLANK_PALETTE, createBlankPaletteTable,
} from './model/types';
export type {
  Player, PlayerStats, SpecialMove,
  Team, Field, PlayerOnField,
  MatchState, DialogCommand, StoryNode,
  AnimationFrame, AnimationSequence,
  PaletteColor, PaletteEntry, PaletteTable,
} from './model/types';

// 服务 (Bank 翻译)
export { Bank00Service, Bank02Service, Bank30Service, BootService, DataQueryService } from './game/index';

// 引擎
export { Renderer } from './core/engine/render/Renderer';
export { InputManager } from './core/engine/InputManager';
