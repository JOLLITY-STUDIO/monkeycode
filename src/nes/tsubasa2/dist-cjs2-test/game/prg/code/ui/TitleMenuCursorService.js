"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TitleMenuCursorService = void 0;
/** $0629 byte layout */
const CURSOR_CHANGED_FLAG = 0x40;
const CURSOR_IDX_MASK = 0x3f;
/** $0628 step byte (默认 1) */
const CURSOR_STEP_DEFAULT = 1;
/** OAM slot reserved for cursor sprite (复用 OPENING_SCREENS[12].mid.oam[63] placeholder) */
const CURSOR_OAM_SLOT = 63;
/** Cursor sprite X coord (文字 "KICK OFF" 左侧,等最终视觉调整) */
const CURSOR_X_DEFAULT = 88;
/**
 * Bank00 $9EA2 cursor palette attr index table — 8 项 (cursor 颜色索引).
 * TODO: 等 ROM $9EA2 抽出后替换为真实 byte 序列。
 */
const CURSOR_PALETTE_BASE = [
    0x00, 0x20, 0x40, 0x60,
    0x80, 0xa0, 0xc0, 0xe0,
];
class TitleMenuCursorService {
    constructor(store, input, maxIdx = 1) {
        /** mirror of $0629 */
        this.state = 0;
        /** mirror of $0628 (step) */
        this.step = CURSOR_STEP_DEFAULT;
        /** 缓存当前 cursor 应对到的 sprite Y/X — caller (Scene) 设置 */
        this.spriteY = 0xc0;
        this.spriteX = CURSOR_X_DEFAULT;
        this.store = store;
        this.input = input;
        this.maxIdx = maxIdx & CURSOR_IDX_MASK;
    }
    /** 重置 — bank00 $9B11 init phase (state 清零, step 默认) */
    reset() {
        this.state = 0;
        this.step = CURSOR_STEP_DEFAULT;
        this.hide();
    }
    /** 当前 cursor idx (剔除 bit 6) */
    getIdx() {
        return this.state & CURSOR_IDX_MASK;
    }
    /** bit 6 是否置位 */
    isChanged() {
        return (this.state & CURSOR_CHANGED_FLAG) !== 0;
    }
    /**
     * 设置当前 sprite 的 X/Y 坐标 — bank00 $9B44-$9B4B (cursor screen position)
     * 调用约定: 通常 processDelta 前由 Scene 根据当前 item idx 计算位置
     */
    setSpritePos(y, x) {
        this.spriteY = y & 0xff;
        this.spriteX = x & 0xff;
    }
    /**
     * Bank00 $9B25-$9B5C 协议精简版 (无 'pending retry'):
     *   delta = +1 → down; delta = -1 → up
     *   越界 wrap (over maxIdx → 0; under 0 → maxIdx)
     *   ORA #$40 置 changed 标志
     */
    processDelta(delta) {
        if (delta !== -1 && delta !== 1)
            return;
        const cur = this.state & CURSOR_IDX_MASK;
        let next = (cur + delta * this.step) & CURSOR_IDX_MASK;
        if (next > this.maxIdx)
            next = 0;
        if (next < 0)
            next = this.maxIdx;
        this.state = (next & CURSOR_IDX_MASK) | CURSOR_CHANGED_FLAG;
        this.paintToShadowOam();
    }
    /**
     * Bank00 $9B66-$9B6E consumer:
     *   消费 changed 标志 → 清除 bit 6
     *   返回是否本次消费是真实"有变化" → 触发右侧 panel 重绘
     */
    consumeChanged() {
        if ((this.state & CURSOR_CHANGED_FLAG) === 0)
            return false;
        this.state &= ~CURSOR_CHANGED_FLAG;
        return true;
    }
    /**
     * 每帧调用 — 检测 Up/Down 沿 + 消费 changed。
     * 返回 whether a frame write occurred。
     */
    tickPerFrame(itemYPositions) {
        let moved = false;
        if (this.input.isPressed(1, 32 /* Button.Down */)) {
            this.processDelta(1);
            moved = true;
        }
        else if (this.input.isPressed(1, 16 /* Button.Up */)) {
            this.processDelta(-1);
            moved = true;
        }
        // 不管是否 moved,都消费 changed (消费帧 1 次,与 ROM 协议一致)
        const wasChanged = this.consumeChanged();
        if (moved) {
            const idx = this.getIdx();
            const y = itemYPositions[idx];
            if (typeof y === 'number')
                this.setSpritePos(y, CURSOR_X_DEFAULT);
            // 重新画 sprite (Y 变了 → OAM 也更新)
            this.paintToShadowOam();
        }
        return moved || wasChanged;
    }
    /** Bank00 $9B5E-$9B5C reset cursor OAM table — 隐藏 cursor */
    hide() {
        this.paintToShadowOam();
    }
    // ---------- private ----------
    /**
     * 把 cursor sprite 写到 shadowOam[CURSOR_OAM_SLOT]:
     *   [Y=tile1, tile=tile2, attr=palette, X=xpos]
     * ROM: $9B48 STA $05EA,X (Y); $9B4B STA $05E9,X (X); $9B52 STA $05E8,X (palette attr)
     * H5 简化: 不拆 cursor table 三段;直接填 OAM 4-tuple。
     */
    paintToShadowOam() {
        const shadow = this.store.oam.shadowOam;
        const base = CURSOR_OAM_SLOT * 4;
        const idx = this.state & CURSOR_IDX_MASK;
        // 若 idx 越界 (用了默认值 0 但 maxIdx=1 反过来),保持原状态
        const palIdx = CURSOR_PALETTE_BASE[idx & 0x07] ?? 0;
        shadow[base + 0] = this.spriteY & 0xff; // Y
        shadow[base + 1] = (palIdx >> 1) & 0x7f; // tile (= palette idx / 2 简化,待 CHR 抽出后改 tile id)
        shadow[base + 2] = (palIdx | 0x20) & 0xff; // attr: palette 1 + base
        shadow[base + 3] = this.spriteX & 0xff; // X
    }
}
exports.TitleMenuCursorService = TitleMenuCursorService;
