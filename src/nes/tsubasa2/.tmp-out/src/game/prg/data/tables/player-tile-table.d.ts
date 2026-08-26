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
/** 球员 tile 桥接条目 */
export interface PlayerTileEntry {
    readonly playerId: number;
    /** 头型模板 0..17 (PLAYER_HAIR_TABLE 索引) */
    readonly hairTemplateId: number;
    /** 身体基础 tile 索引 (BANK19_SPRITE_FRAMES 中某帧的 tile[0]) */
    readonly bodyBaseTileIdx: number;
    /** NES sprite palette 索引 0..7 (PALETTE_TABLE 中组偏移) */
    readonly paletteSetId: number;
    /** 动画起始 tile 索引 (4 帧 cycle 基址) */
    readonly animTileBase: number;
}
/**
 * 球员 ID → tile 桥接 (PT2 真数据版)
 *
 * 来源: PLAYER_HAIR_TABLE (18 头型索引) + PLAYER_COLOR_TABLE (明星色) + BANK19_SPRITE_FRAMES (40 帧)
 * 0x01-0x2D 明星 45 项: 全部用真实数据
 * 0x2E-0xFF 杂鱼 213 项: 走 PLAYER_TABLE 默认 (id mod) + 占位色
 */
export declare const PLAYER_TILE_TABLE: ReadonlyArray<PlayerTileEntry>;
/** 按球员 ID 查 tile 桥接 */
export declare function findPlayerTilesById(playerId: number): PlayerTileEntry | null;
