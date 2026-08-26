/** 动画 tick 基址（4 字节位图：每精灵 4 帧 tick counter，溢出回 0） */
const ANIM_TICK_BASE = 0x046c;
export class SpriteAnimationService {
    constructor(store) {
        this.store = store;
    }
    /**
     * 推进所有精灵动画帧。
     * 简化策略：每帧 tick+1（由各 sprite 调用方控制具体翻转逻辑）。
     */
    advance() {
        // 4 精灵 animation tick 计数字节；每帧递增 1
        for (let i = 0; i < 4; i++) {
            const v = this.store.readByte(ANIM_TICK_BASE + i) & 0xff;
            this.store.writeByte(ANIM_TICK_BASE + i, (v + 1) & 0xff);
        }
    }
    /**
     * 推进单个精灵动画槽位 tick。
     *
     * @param slot      精灵 slot (0..63)
     * @param maxFrames 最大帧数（> maxFrames 时 tick 回 0）
     */
    tickAnimationSlot(slot, maxFrames) {
        if (slot < 0 || slot >= 64)
            return 0;
        // 借用 $0468+slot*4+attr 高 4 位作为 tick 缓存（避免额外 RAM）
        // 简化：直接读 attr 字节低 4 位作为 tick
        const base = slot * 4;
        const attr = this.store.readByte(base + 2) & 0xff;
        const tick = attr & 0x0f;
        const next = (tick + 1) & 0x0f;
        this.store.writeByte(base + 2, ((attr & 0xf0) | next) & 0xff);
        if (next >= (maxFrames & 0x0f)) {
            this.store.writeByte(base + 2, (attr & 0xf0) & 0xff);
            return 0;
        }
        return next;
    }
    /**
     * 属性字节翻转（用于眨眼/方向切换/淡入淡出）。
     *
     * @param slot    精灵 slot
     * @param bitMask 要翻转的属性位（bit6=flipX, bit5=priority, bit3=ink）
     */
    flipSpriteAttr(slot, bitMask) {
        if (slot < 0 || slot >= 64)
            return;
        const base = slot * 4;
        const attr = this.store.readByte(base + 2) & 0xff;
        this.store.writeByte(base + 2, (attr ^ (bitMask & 0xff)) & 0xff);
    }
    /**
     * 设置精灵属性位（用于艺术状态切换：palette/priority/flip）。
     */
    orSpriteAttr(slot, bitMask) {
        if (slot < 0 || slot >= 64)
            return;
        const base = slot * 4;
        const attr = this.store.readByte(base + 2) & 0xff;
        this.store.writeByte(base + 2, (attr | (bitMask & 0xff)) & 0xff);
    }
    /**
     * 清除精灵属性位。
     */
    andSpriteAttr(slot, bitMask) {
        if (slot < 0 || slot >= 64)
            return;
        const base = slot * 4;
        const attr = this.store.readByte(base + 2) & 0xff;
        this.store.writeByte(base + 2, (attr & bitMask) & 0xff);
    }
    /**
     * 闪烁效果：所有屏外精灵 attr |= $08，等待 1 帧。
     * 对应 asm $92A0-$92D4 例程（精灵 blink）。
     */
    blinkOffscreenSprites() {
        for (let i = 0; i < 64; i++) {
            const y = this.store.shadowOam[i * 4 + 0] & 0xff;
            if (y >= 240) {
                this.flipSpriteAttr(i, 0x08);
            }
        }
    }
}
