/**
 * 精灵帧数据表 — 具象化契约（v3 翻译完成）
 *
 * 从 asm 精灵/场景数据段提取真实字节，含：
 * - BANK19_TILE_DATA     原始 OAM sprite 命令字节流
 * - BANK19_OAM_FRAMES    parseBank19Stream 解析后的 40 个 sprite 帧
 *   (BUG #001 v3 修复: 不再过滤控制码而是完整解析 OAM 命令流,
 *    保留 sprite 的 tile+attr+x+y 四元组, 渲染时按 OAM 实际位置摆放)
 * - BANK19_SCENE_DATA    场景背景分段
 *
 * 旧 BANK19_SPRITE_FRAMES (flat-tile) 已标 DEPRECATED,
 *   后续渲染层切到 BANK19_OAM_FRAMES 后即可删除。
 *
 * 翻译原则：
 *   - 保留 BANK19_TILE_DATA 作为原始字节数据源（避免数据丢失）
 *   - BANK19_OAM_FRAMES 通过 parseBank19Stream 派生（v3 解析真实 OAM 语法）
 *   - 暴露 findSpriteFrameById / findSpriteTileAt / findSceneBackground / findOamFrameByPlayerId
 *     等具名查询
 *   - 禁止以 lo/hi 拆字节方式索引；禁止暴露 CPU 地址字面量
 */
/** NES OAM sprite 命令流解析 — BUG #001 v3 修复 */
export interface OamSprite {
    readonly tile: number;
    readonly attr: number;
    readonly x: number;
    readonly y: number;
}
export interface OamFrame {
    readonly frameId: number;
    readonly sprites: ReadonlyArray<OamSprite>;
}
/**
 * 解析 BANK19_TILE_DATA 字节流为 OAM sprite 帧序列。
 *
 * 控制码语法 (asm bank19 code_main.s 真实格式):
 *   $E0           = 帧终止 (push 当前 frame, 重置 x/y)
 *   $E1, $YY      = 设 Y 偏移 (signed byte)
 *   $E2, $XX, $YY, $ZZ = 跳过 3-byte 子命令
 *   $E4, $XX      = 设 X 偏移 (signed byte)
 *   $E5, $XX      = slot 操作 (00=reset, 02=count, 03=next) — 跳过
 *   $E6           = 子命令标记 — 跳过 1 byte
 *   $FC           = 终止 x-row
 *   普通 byte 配对: (tile, attr) — 生成一个 OamSprite
 *
 * 验证锚点: parseBank19Stream 跑 BANK19_TILE_DATA 应得到
 *   ~40 帧, 每帧 [3..15] sprites 不等
 */
export declare function parseBank19Stream(stream: ReadonlyArray<number>): OamFrame[];
/** 按帧 ID 查精灵帧（兼容旧 flat-tile stub，未来删除） */
export declare function findSpriteFrameById(frameId: number): SpriteFrameEntry | null;
/** 按球员 ID 查 OAM 帧 (BUG #001 v3 — 真实 OAM 描述) */
export declare function findOamFrameByPlayerId(playerId: number): OamFrame | null;
/** 按字节偏移查 tile 索引（封装 BANK19_TILE_DATA 索引） */
export declare function findSpriteTileAt(offset: number): number;
/** 按场景 ID 查场景背景段（封装 BANK19_SCENE_DATA 索引） */
export declare function findSceneBackground(sceneId: number): ReadonlyArray<number>;
/** 精灵帧定义（旧 flat-tile stub 仅填 frameId/tiles；palette/flip 为可选） */
export interface SpriteFrameEntry {
    readonly frameId: number;
    readonly tiles: ReadonlyArray<number>;
    readonly palette?: number;
    readonly flipX?: boolean;
    readonly flipY?: boolean;
}
/** 精灵 tile 索引数据（data_tables 原始字节） */
export declare const BANK19_TILE_DATA: ReadonlyArray<number>;
/** 解析 BANK19_TILE_DATA → 真实 OAM sprite 帧序列（BUG #001 v3 修复） */
export declare const BANK19_OAM_FRAMES: ReadonlyArray<OamFrame>;
/** 场景背景数据段（data_tail 原始字节） */
export declare const BANK19_SCENE_DATA: ReadonlyArray<ReadonlyArray<number>>;
/**
 * ⚠️ DEPRECATED — BANK19_SPRITE_FRAMES (PT1 旧解析)
 *
 * BUG #001 v3 已修复:用 `BANK19_OAM_FRAMES` 替代。
 * 旧的 BANK19_SPRITE_FRAMES 把所有控制码 ($E0-$E6, $FC) + attr byte 都过滤掉了,
 *   只保留 tile 索引, 失去 OAM sprite 的 (x, y, attr) 信息, 渲染时变成碎片化。
 * 新版本 `parseBank19Stream()` 解析完整 OAM 语法, 输出 `OamFrame { sprites: OamSprite[] }`。
 *
 * 保留这份 stub 是为了不破坏现有调用 `findSpriteFrameById()` 的 service
 *   (PlayerTileService / SpriteService / SpriteFrameService), 等它们切到
 *   `findOamFrameByPlayerId()` / `BANK19_OAM_FRAMES[i]` 后即可删除。
 *
 * BANK19_SPRITE_FRAMES — 精灵帧具象化条目 (PT1 解析产物)
 *
 * 来源: 解析 BANK19_TILE_DATA 字节流, 按 $E0 终止符切帧, 过滤控制码 (E1-E5/FC-FF),
 *       保留 0x00-0xDF 范围作为 sprite tile 索引。
 * 帧 ID = 该帧在流中的顺序索引 (0..0x27, 共 40 帧, 589 tile 索引)。
 *
 * 验证锚点 (来自 asm bank19 code_main.s $9000-$90B7):
 *   - CMP #$E0  → 帧终止
 *   - 普通 byte (0x00-0xDF) → 写入 OAM 影子 $04A5+ slot 的 tile 字段
 *   - $E1-$E5 / $FC-$FF → 控制码 (行切换/OAM 关闭), 跳过
 * 重生脚本: scripts/_pt1_parser.cjs
 */
export declare const BANK19_SPRITE_FRAMES: ReadonlyArray<SpriteFrameEntry>;
