/**
 * bank06/index.ts — bank06 数据出口契约
 *
 * 数据布局（CPU 地址）：
 *   $A000-$A00B  6 项脚本 header 指针（隐式）
 *   $A00C-$A5E7  6 段脚本流（BANK6_SCRIPTS）
 *   $B000-$B0FF  BG 调色板 16 × 16（BANK6_BG_PALETTES）
 *   $B300-$B3FF  SPR 调色板 16 × 16（BANK6_SPR_PALETTES）
 *   $B800-$BE7B  次级 NT/tile/pointer 数据段（sec-01..sec-04）
 *   $BF00-$BFFF  场景表 16 × 19（BANK6_SCENE_TABLE）
 */
export { BANK6_SCRIPTS } from './scripts/index';
export { BANK6_BG_PALETTES } from './bg-palette';
export { BANK6_SPR_PALETTES } from './spr-palette';
export { BANK6_SCENE_TABLE } from './scene-table';
export type { OpeningSceneEntry } from './scene-table';
export { BANK6_SEC_01_NT_TILES } from './sec-01-nt-tiles';
export { BANK6_SEC_01_NT_TILES_OFFSET, BANK6_SEC_01_NT_TILES_CPU_BASE } from './sec-01-nt-tiles';
export { BANK6_SEC_02_NT_TILES } from './sec-02-nt-tiles';
export { BANK6_SEC_02_NT_TILES_OFFSET, BANK6_SEC_02_NT_TILES_CPU_BASE } from './sec-02-nt-tiles';
export { BANK6_SEC_03_PTR_BLK } from './sec-03-ptr-blk';
export { BANK6_SEC_03_PTR_BLK_OFFSET, BANK6_SEC_03_PTR_BLK_CPU_BASE } from './sec-03-ptr-blk';
export { BANK6_SEC_04_TILE_BLK } from './sec-04-tile-blk';
export { BANK6_SEC_04_TILE_BLK_OFFSET, BANK6_SEC_04_TILE_BLK_CPU_BASE } from './sec-04-tile-blk';
