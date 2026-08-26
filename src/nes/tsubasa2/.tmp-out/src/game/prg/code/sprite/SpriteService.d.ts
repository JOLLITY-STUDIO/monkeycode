/**
 * SpriteService — 精灵生成/放置
 *
 * 行为翻译（bank19/code_main.s 精灵放置例程）：
 * - putSprite(slot|frame, x, y, attr) → 写 4 字节 [y, tile, attr, x] 到 OAM
 * - hideSprite(slot) → 写入 Y=$FF 隐藏（ram_0468+i*4）
 * - putSpriteBatch() → 多精灵批量写入
 * - setSpriteFrame(slot, frameId) → 修改精灵 tile 索引（适用于动画帧切换）
 *
 * 关键 RAM：
 *   OAM 影子缓冲 $0468-$0567（每精灵 4 字节 [y, tile, attr, x]，64 个精灵）
 *   NMI 时通过 OAM DMA($C78B) 同步到 $0200-$02FF。
 *
 * OAM 字节布局：
 *   [y, tile, attr, x] = 4 字节顺序
 *     - y:     屏幕 Y 坐标（$FF 隐藏）
 *     - tile:  CHR tile 索引
 *     - attr:  属性字节（bit0-1 palette, bit5 priority, bit6 flipX, bit7 flipY）
 *     - x:     屏幕 X 坐标
 *
 * 当前：V0.5 stub 实现已落地（基础放置/隐藏/批量）。
 */
import type { DataStore } from '../../data/store/DataStore';
/**
 * PRG $21CA 翻译（boot OAM init）：在 scene0 onEnter 时调用一次。
 * 写 Tecmo logo 40 sprite 到 shadowOam $0468-$0567 (NES 标准 [y,tile,attr,x])。
 * 行为等价于 ROM 任务 $21CA 装载 OAM 缓冲；H5 直接用 BOOT_TECMO_OAM_TABLE 占位。
 */
export declare class SpriteService {
    readonly store: DataStore;
    constructor(store: DataStore);
    /**
     * 将一个精灵写入 OAM 影子缓冲指定 slot。
     *
     * @param slot    OAM slot 索引（0..63）
     * @param tile    tile 索引（从 BANK19_SPRITE_FRAMES 查得，或外部指定）
     * @param x       屏幕 X（0..255）
     * @param y       屏幕 Y（0..239，$FF 表示隐藏）
     * @param attr    属性字节（默认 0）
     */
    putSprite(slot: number, tile: number, x: number, y: number, attr?: number): void;
    /**
     * 通过精灵 ID（frameId）查 BANK19_SPRITE_FRAMES 写入。
     * 如果找不到对应 frame，则使用 spriteId 作为 tile 索引。
     */
    putSpriteByFrame(slot: number, frameId: number, x: number, y: number, attr?: number): void;
    /**
     * 隐藏精灵（Y=$FF）。写到 store.shadowOam（独立 buffer），不踩 RAM。
     */
    hideSprite(slot: number): void;
    /**
     * 隐藏所有精灵（OAM 全 $FF）。对应 asm $CB8B。
     * 直接清 store.shadowOam（独立 Uint8Array(256)），不走 RAM 写。
     */
    hideAll(): void;
    /**
     * 切换精灵 tile（不改 x/y/attr）。用于动画帧切换。
     */
    setSpriteFrame(slot: number, frameId: number): void;
    /**
     * 读取精灵当前 Y 坐标。
     */
    getSpriteY(slot: number): number;
    /**
     * 读取精灵当前 X 坐标。
     */
    getSpriteX(slot: number): number;
    /**
     * 读取精灵属性字节。
     */
    getSpriteAttr(slot: number): number;
    /**
     * 装载 Tecmo logo sprite 集合到 shadow OAM 缓冲。
     * 对应 PRG $21CA：把 BOOT_TECMO_OAM_TABLE (40 sprite) 写到 $0468-$0567。
     * 调用时机：scene0.onEnter() / HardwareInitService.reset()
     */
    bootOamInit(): void;
    /**
     * 注册 hw-reset 时跑的 boot routine fn。
     * 三个 routine 顺序：$1DD1 (palette) → $21CA (oam) → $85EB (NT3)
     */
    registerBootRoutines(paletteFn: () => void, nt3Fn: () => void): void;
    /** hw-reset 钩子 1：调用 paletteFn */
    bootPaletteFn: (() => void) | null;
    /** hw-reset 钩子 2：调用 nt3Fn */
    bootNt3Fn: (() => void) | null;
}
