"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpriteService = void 0;
const sprite_frame_table_1 = require("../../data/tables/sprite-frame-table");
const opening_sprites_1 = require("../../data/tables/opening-sprites");
/**
 * PRG $21CA 翻译（boot OAM init）：在 scene0 onEnter 时调用一次。
 * 写 Tecmo logo 40 sprite 到 shadowOam $0468-$0567 (NES 标准 [y,tile,attr,x])。
 * 行为等价于 ROM 任务 $21CA 装载 OAM 缓冲；H5 直接用 BOOT_TECMO_OAM_TABLE 占位。
 */
class SpriteService {
    constructor(store) {
        this.store = store;
        /** hw-reset 钩子 1：调用 paletteFn */
        this.bootPaletteFn = null;
        /** hw-reset 钩子 2：调用 nt3Fn */
        this.bootNt3Fn = null;
    }
    /**
     * 将一个精灵写入 OAM 影子缓冲指定 slot。
     *
     * @param slot    OAM slot 索引（0..63）
     * @param tile    tile 索引（从 BANK19_SPRITE_FRAMES 查得，或外部指定）
     * @param x       屏幕 X（0..255）
     * @param y       屏幕 Y（0..239，$FF 表示隐藏）
     * @param attr    属性字节（默认 0）
     */
    putSprite(slot, tile, x, y, attr = 0) {
        if (slot < 0 || slot >= 64)
            return;
        // 写到 shadowOam（独立 256-byte buffer），不踩 RAM
        const base = slot * 4;
        const buf = this.store.shadowOam;
        buf[base + 0] = y & 0xff;
        buf[base + 1] = tile & 0xff;
        buf[base + 2] = attr & 0xff;
        buf[base + 3] = x & 0xff;
    }
    /**
     * 通过精灵 ID（frameId）查 BANK19_SPRITE_FRAMES 写入。
     * 如果找不到对应 frame，则使用 spriteId 作为 tile 索引。
     */
    putSpriteByFrame(slot, frameId, x, y, attr = 0) {
        const frame = sprite_frame_table_1.BANK19_SPRITE_FRAMES.find((f) => f.frameId === (frameId & 0xffff));
        const tile = frame && frame.tiles.length > 0
            ? frame.tiles[0]
            : (frameId & 0xff);
        this.putSprite(slot, tile, x, y, attr);
    }
    /**
     * 隐藏精灵（Y=$FF）。写到 store.shadowOam（独立 buffer），不踩 RAM。
     */
    hideSprite(slot) {
        if (slot < 0 || slot >= 64)
            return;
        this.store.shadowOam[slot * 4] = 0xff;
    }
    /**
     * 隐藏所有精灵（OAM 全 $FF）。对应 asm $CB8B。
     * 直接清 store.shadowOam（独立 Uint8Array(256)），不走 RAM 写。
     */
    hideAll() {
        for (let i = 0; i < 64; i++)
            this.hideSprite(i);
    }
    /**
     * 切换精灵 tile（不改 x/y/attr）。用于动画帧切换。
     */
    setSpriteFrame(slot, frameId) {
        if (slot < 0 || slot >= 64)
            return;
        const frame = sprite_frame_table_1.BANK19_SPRITE_FRAMES.find((f) => f.frameId === (frameId & 0xffff));
        const tile = frame && frame.tiles.length > 0
            ? frame.tiles[0]
            : (frameId & 0xff);
        this.store.shadowOam[slot * 4 + 1] = tile & 0xff;
    }
    /**
     * 读取精灵当前 Y 坐标。
     */
    getSpriteY(slot) {
        if (slot < 0 || slot >= 64)
            return 0;
        return this.store.shadowOam[slot * 4 + 0];
    }
    /**
     * 读取精灵当前 X 坐标。
     */
    getSpriteX(slot) {
        if (slot < 0 || slot >= 64)
            return 0;
        return this.store.shadowOam[slot * 4 + 3];
    }
    /**
     * 读取精灵属性字节。
     */
    getSpriteAttr(slot) {
        if (slot < 0 || slot >= 64)
            return 0;
        return this.store.shadowOam[slot * 4 + 2];
    }
    // ─────────────────────────────────────────────────────────────────────
    // Boot OAM init — PRG $21CA 翻译（WBS L1）
    // ─────────────────────────────────────────────────────────────────────
    /**
     * 装载 Tecmo logo sprite 集合到 shadow OAM 缓冲。
     * 对应 PRG $21CA：把 BOOT_TECMO_OAM_TABLE (40 sprite) 写到 $0468-$0567。
     * 调用时机：scene0.onEnter() / HardwareInitService.reset()
     */
    bootOamInit() {
        for (const e of opening_sprites_1.BOOT_TECMO_OAM_TABLE) {
            const slot = e.slot & 0x3f;
            const base = slot * 4;
            const buf = this.store.shadowOam;
            buf[base + 0] = e.y & 0xff;
            buf[base + 1] = e.tile & 0xff;
            buf[base + 2] = e.attr & 0xff;
            buf[base + 3] = e.x & 0xff;
        }
    }
    /**
     * 注册 hw-reset 时跑的 boot routine fn。
     * 三个 routine 顺序：$1DD1 (palette) → $21CA (oam) → $85EB (NT3)
     */
    registerBootRoutines(paletteFn, nt3Fn) {
        this.bootPaletteFn = paletteFn;
        this.bootNt3Fn = nt3Fn;
    }
}
exports.SpriteService = SpriteService;
