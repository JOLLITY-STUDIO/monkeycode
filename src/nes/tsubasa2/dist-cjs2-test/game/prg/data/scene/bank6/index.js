"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BANK6_SEC_04_TILE_BLK_CPU_BASE = exports.BANK6_SEC_04_TILE_BLK_OFFSET = exports.BANK6_SEC_04_TILE_BLK = exports.BANK6_SEC_03_PTR_BLK_CPU_BASE = exports.BANK6_SEC_03_PTR_BLK_OFFSET = exports.BANK6_SEC_03_PTR_BLK = exports.BANK6_SEC_02_NT_TILES_CPU_BASE = exports.BANK6_SEC_02_NT_TILES_OFFSET = exports.BANK6_SEC_02_NT_TILES = exports.BANK6_SEC_01_NT_TILES_CPU_BASE = exports.BANK6_SEC_01_NT_TILES_OFFSET = exports.BANK6_SEC_01_NT_TILES = exports.BANK6_SCENE_TABLE = exports.BANK6_SPR_PALETTES = exports.BANK6_BG_PALETTES = exports.BANK6_SCRIPTS = void 0;
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
var index_1 = require("./scripts/index");
Object.defineProperty(exports, "BANK6_SCRIPTS", { enumerable: true, get: function () { return index_1.BANK6_SCRIPTS; } });
var bg_palette_1 = require("./bg-palette");
Object.defineProperty(exports, "BANK6_BG_PALETTES", { enumerable: true, get: function () { return bg_palette_1.BANK6_BG_PALETTES; } });
var spr_palette_1 = require("./spr-palette");
Object.defineProperty(exports, "BANK6_SPR_PALETTES", { enumerable: true, get: function () { return spr_palette_1.BANK6_SPR_PALETTES; } });
var scene_table_1 = require("./scene-table");
Object.defineProperty(exports, "BANK6_SCENE_TABLE", { enumerable: true, get: function () { return scene_table_1.BANK6_SCENE_TABLE; } });
var sec_01_nt_tiles_1 = require("./sec-01-nt-tiles");
Object.defineProperty(exports, "BANK6_SEC_01_NT_TILES", { enumerable: true, get: function () { return sec_01_nt_tiles_1.BANK6_SEC_01_NT_TILES; } });
var sec_01_nt_tiles_2 = require("./sec-01-nt-tiles");
Object.defineProperty(exports, "BANK6_SEC_01_NT_TILES_OFFSET", { enumerable: true, get: function () { return sec_01_nt_tiles_2.BANK6_SEC_01_NT_TILES_OFFSET; } });
Object.defineProperty(exports, "BANK6_SEC_01_NT_TILES_CPU_BASE", { enumerable: true, get: function () { return sec_01_nt_tiles_2.BANK6_SEC_01_NT_TILES_CPU_BASE; } });
var sec_02_nt_tiles_1 = require("./sec-02-nt-tiles");
Object.defineProperty(exports, "BANK6_SEC_02_NT_TILES", { enumerable: true, get: function () { return sec_02_nt_tiles_1.BANK6_SEC_02_NT_TILES; } });
var sec_02_nt_tiles_2 = require("./sec-02-nt-tiles");
Object.defineProperty(exports, "BANK6_SEC_02_NT_TILES_OFFSET", { enumerable: true, get: function () { return sec_02_nt_tiles_2.BANK6_SEC_02_NT_TILES_OFFSET; } });
Object.defineProperty(exports, "BANK6_SEC_02_NT_TILES_CPU_BASE", { enumerable: true, get: function () { return sec_02_nt_tiles_2.BANK6_SEC_02_NT_TILES_CPU_BASE; } });
var sec_03_ptr_blk_1 = require("./sec-03-ptr-blk");
Object.defineProperty(exports, "BANK6_SEC_03_PTR_BLK", { enumerable: true, get: function () { return sec_03_ptr_blk_1.BANK6_SEC_03_PTR_BLK; } });
var sec_03_ptr_blk_2 = require("./sec-03-ptr-blk");
Object.defineProperty(exports, "BANK6_SEC_03_PTR_BLK_OFFSET", { enumerable: true, get: function () { return sec_03_ptr_blk_2.BANK6_SEC_03_PTR_BLK_OFFSET; } });
Object.defineProperty(exports, "BANK6_SEC_03_PTR_BLK_CPU_BASE", { enumerable: true, get: function () { return sec_03_ptr_blk_2.BANK6_SEC_03_PTR_BLK_CPU_BASE; } });
var sec_04_tile_blk_1 = require("./sec-04-tile-blk");
Object.defineProperty(exports, "BANK6_SEC_04_TILE_BLK", { enumerable: true, get: function () { return sec_04_tile_blk_1.BANK6_SEC_04_TILE_BLK; } });
var sec_04_tile_blk_2 = require("./sec-04-tile-blk");
Object.defineProperty(exports, "BANK6_SEC_04_TILE_BLK_OFFSET", { enumerable: true, get: function () { return sec_04_tile_blk_2.BANK6_SEC_04_TILE_BLK_OFFSET; } });
Object.defineProperty(exports, "BANK6_SEC_04_TILE_BLK_CPU_BASE", { enumerable: true, get: function () { return sec_04_tile_blk_2.BANK6_SEC_04_TILE_BLK_CPU_BASE; } });
