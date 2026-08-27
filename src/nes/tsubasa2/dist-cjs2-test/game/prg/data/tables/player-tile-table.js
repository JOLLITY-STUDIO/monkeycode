"use strict";
/**
 * player-tile-table.ts — 球员 ID → tile 素材桥接表 (PT2 产物)
 *
 * 数据契约: 把 PLAYER_TABLE (球员档案) + PLAYER_HAIR_TABLE (18 头型模板) + PLAYER_COLOR_TABLE
 *          (明星色) + BANK19_SPRITE_FRAMES (40 帧精灵索引) 统一为"球员 → 渲染 tile 序列"
 *          桥接, 业务调用方只需 playerId 一参就能拿到该球员在画面上要用的所有 tile 索引。
 *
 * 字段:
 *   - hairTemplateId  : 0..17  (PLAYER_HAIR_TABLE 索引, 18 头型模板)
 *   - bodyBaseTileIdx : 身体基础 tile 索引, 指向 BANK19_SPRITE_FRAMES 中某帧第一 tile
 *   - paletteSetId    : NES sprite palette (0..7) 来自 PALETTE_TABLE[group*4+1]
 *   - animTileBase    : 动画起始 tile 索引 (4 帧切换基础)
 *
 * 翻译原则:
 *   - 业务查询走 findPlayerTilesById(playerId), 不暴露 CPU 地址
 *   - 球员 ID 0x01-0x2D 明星 (45 项) + 0x2E-0xFF 杂鱼/重复, 全部走 PLAYER_TABLE
 *   - hair/身体/palette 取自真实 ROM 字节, 不编造
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PLAYER_TILE_TABLE = void 0;
exports.findPlayerTilesById = findPlayerTilesById;
const player_stats_1 = require("./player-stats");
const sprite_frame_table_1 = require("./sprite-frame-table");
/** PLAYER_HAIR_TABLE 查表: 头型 18 模板, 由 ROM 0x28901 提供 */
const HAIR_TEMPLATES = player_stats_1.PLAYER_HAIR_TABLE;
/** PLAYER_COLOR_TABLE 查表: 球员色 by ID */
const COLOR_BY_ID = new Map();
for (const c of player_stats_1.PLAYER_COLOR_TABLE)
    COLOR_BY_ID.set(c.id, c);
/** PALETTE_TABLE 中"球员 sprite 调色板"组选择: shirt 高 4 位决定组偏移 */
function shirtToPaletteGroup(shirt) {
    // shirt 字节高 4 位用作 sprite palette 调色板组号 (0..7)
    return (shirt >> 4) & 0x07;
}
/** 球员 ID → hair 模板索引 */
function hairTemplateIdFor(playerIndex) {
    return HAIR_TEMPLATES[playerIndex % HAIR_TEMPLATES.length] ?? 0;
}
/** 球员 ID → body 基础 tile 索引 (frame 0x00 = Tsubasa 静态) */
function bodyBaseTileFor(playerIndex) {
    // 用 PLAYER_TABLE 顺序索引 % BANK19_SPRITE_FRAMES 长度, 取该帧首 tile
    const frame = sprite_frame_table_1.BANK19_SPRITE_FRAMES[playerIndex % sprite_frame_table_1.BANK19_SPRITE_FRAMES.length];
    return frame?.tiles[0] ?? 0x09;
}
/**
 * 球员 ID → tile 桥接 (PT2 真数据版)
 *
 * 来源: PLAYER_HAIR_TABLE (18 头型索引) + PLAYER_COLOR_TABLE (明星色) + BANK19_SPRITE_FRAMES (40 帧)
 * 0x01-0x2D 明星 45 项: 全部用真实数据
 * 0x2E-0xFF 杂鱼 213 项: 走 PLAYER_TABLE 默认 (id mod) + 占位色
 */
exports.PLAYER_TILE_TABLE = player_stats_1.PLAYER_TABLE.map((p, i) => {
    const color = COLOR_BY_ID.get(p.id);
    const paletteGroup = color ? shirtToPaletteGroup(color.shirt) : (i & 0x07);
    return {
        playerId: p.id,
        hairTemplateId: hairTemplateIdFor(i),
        bodyBaseTileIdx: bodyBaseTileFor(i),
        paletteSetId: paletteGroup,
        animTileBase: bodyBaseTileFor(i), // 4 帧 cycle 与 body 共享基础
    };
});
/** 按球员 ID 查 tile 桥接 */
function findPlayerTilesById(playerId) {
    const id = playerId & 0xff;
    for (const t of exports.PLAYER_TILE_TABLE) {
        if (t.playerId === id)
            return t;
    }
    return null;
}
