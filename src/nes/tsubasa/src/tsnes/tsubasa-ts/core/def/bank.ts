/**
 * Bank — ROM bank 类型定义
 */

/** PRG bank (8KB 代码或数据) */
export interface Bank {
  index: number;
  data: number[];
}

/** CHR bank (4KB VROM tile 数据) */
export interface ChrBank {
  index: number;
  data: number[];
}

// ═══ PRG bank 常量 ═══

export const PRG_BANK_SIZE  = 8192;
export const PRG_BANK_COUNT = 32;
export const PRG_TOTAL_SIZE = PRG_BANK_COUNT * PRG_BANK_SIZE; // 262144

/** 32 个 PRG bank 的名称/用途描述 */
export const PRG_BANK_META = [
  { index: 0,  name: 'dispatch_scene_engine', type: 'code' },
  { index: 1,  name: 'match_jump',           type: 'code' },
  { index: 2,  name: 'nmi_renderer',         type: 'code' },
  { index: 3,  name: 'data_03',              type: 'data' },
  { index: 4,  name: 'data_04',              type: 'data' },
  { index: 5,  name: 'data_05',              type: 'data' },
  { index: 6,  name: 'palette_data',         type: 'data' },
  { index: 7,  name: 'sprite_data',          type: 'data' },
  { index: 8,  name: 'data_08',              type: 'data' },
  { index: 9,  name: 'data_09',              type: 'data' },
  { index: 10, name: 'data_10',              type: 'data' },
  { index: 11, name: 'background',           type: 'code' },
  { index: 12, name: 'audio',                type: 'code' },
  { index: 13, name: 'data_13',              type: 'data' },
  { index: 14, name: 'data_14',              type: 'data' },
  { index: 15, name: 'data_15',              type: 'data' },
  { index: 16, name: 'scene_logic',          type: 'code' },
  { index: 17, name: 'data_17',              type: 'data' },
  { index: 18, name: 'data_18',              type: 'data' },
  { index: 19, name: 'lookup_tables',        type: 'code' },
  { index: 20, name: 'team_data',            type: 'code' },
  { index: 21, name: 'data_21',              type: 'data' },
  { index: 22, name: 'sprite_engine',        type: 'code' },
  { index: 23, name: 'data_23',              type: 'data' },
  { index: 24, name: 'cutscene',             type: 'code' },
  { index: 25, name: 'data_25',              type: 'data' },
  { index: 26, name: 'match_core',           type: 'code' },
  { index: 27, name: 'player_data',          type: 'code' },
  { index: 28, name: 'attributes',           type: 'code' },
  { index: 29, name: 'data_29',              type: 'data' },
  { index: 30, name: 'system_lib',           type: 'code' },
  { index: 31, name: 'boot_vectors',         type: 'code' },
];

// ═══ CHR bank 常量 ═══

export const CHR_VROM_SIZE  = 4096;
export const CHR_VROM_COUNT = 32;
export const CHR_TOTAL_SIZE = CHR_VROM_COUNT * CHR_VROM_SIZE; // 131072

/** tile 大小 */
export const TILE_SIZE = 16;
export const TILES_PER_VROM = CHR_VROM_SIZE / TILE_SIZE; // 256
export const TOTAL_TILES = CHR_VROM_COUNT * TILES_PER_VROM; // 8192

/** CHR 8KB bank 用途描述 (16 组) */
export const CHR_BANK_META = [
  { index: 0,  name: 'common_tiles_0',   desc: '通用 tile — 文字/UI (第 1 组)' },
  { index: 1,  name: 'common_tiles_1',   desc: '通用 tile — 文字/UI (第 2 组)' },
  { index: 2,  name: 'common_tiles_2',   desc: '通用 tile — 文字/UI (第 3 组)' },
  { index: 3,  name: 'bg_scenes_0',      desc: '场景背景 tile (第 1 组)' },
  { index: 4,  name: 'bg_scenes_1',      desc: '场景背景 tile (第 2 组)' },
  { index: 5,  name: 'bg_scenes_2',      desc: '场景背景 tile (第 3 组)' },
  { index: 6,  name: 'player_sprites_0', desc: '球员/角色精灵 (第 1 组)' },
  { index: 7,  name: 'player_sprites_1', desc: '球员/角色精灵 (第 2 组)' },
  { index: 8,  name: 'player_sprites_2', desc: '球员/角色精灵 (第 3 组)' },
  { index: 9,  name: 'player_sprites_3', desc: '球员/角色精灵 (第 4 组)' },
  { index: 10, name: 'player_sprites_4', desc: '球员/角色精灵 (第 5 组)' },
  { index: 11, name: 'player_sprites_5', desc: '球员/角色精灵 (第 6 组)' },
  { index: 12, name: 'fx_anim_0',        desc: '特效/必杀技动画 (第 1 组)' },
  { index: 13, name: 'fx_anim_1',        desc: '特效/必杀技动画 (第 2 组)' },
  { index: 14, name: 'fx_anim_2',        desc: '特效/必杀技动画 (第 3 组)' },
  { index: 15, name: 'opening',          desc: '开场动画 — TECMO logo + 标题' },
];
