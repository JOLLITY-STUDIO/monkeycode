"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OamView = void 0;
/** 影子 OAM 起始 KV 偏移 (ram_0468) */
const OAM_SHADOW_BASE = 0x0468;
/** 影子 OAM 字节数 (64 槽 × 4B) */
const OAM_SHADOW_BYTES = 256;
/** 每精灵字节数 (Y, tile, attr, X) */
const SPR_BYTES = 4;
/** 硬件 OAM 区 (sub_88CE 拷贝目标) */
const OAM_HW_BASE = 0x0200;
/** 屏幕外 Y 值 */
const Y_HIDDEN = 0xf8;
/** KV 键名构造 (ram_XXXX) */
function ramKey(addr) {
    return `ram_${addr.toString(16)}`;
}
class OamView {
    constructor(store) {
        /** 上一帧追加的场景精灵尾段 (用于下一帧移除, 避免累积) */
        this._prevTail = [];
        this._store = store;
    }
    /** 读影子 OAM 单字节 (ram_0468 起, 委托 ShadowOam) */
    readShadowByte(offset) {
        return this._store.oamShadow.readByte(offset);
    }
    /** 读硬件 OAM 区单字节 (ram_0200 起, sub_88CE 拷贝产物) */
    readHwByte(offset) {
        return this._store.read(ramKey(OAM_HW_BASE + offset));
    }
    /**
     * 解析影子 OAM → SpriteEntry[] 追加到 DataStore.sprites (确定性, 不累积)。
     *
     * 每帧流程:
     *   1. 移除上一帧追加的场景精灵尾段 (若仍位于数组末尾)
     *   2. 从 ram_0468 影子 OAM 解析当前帧精灵 → 追加
     * 不覆盖 OamManager ($04A5 演出/HUD 精灵) / bank22 ($0200 比赛精灵) 等
     * 其他源已写入 store.sprites 的精灵 (它们在前部, OamView 只追加尾段)。
     *
     * 对应 NES sub_88CE 语义:
     *   - 从 ram_0468 读 64 槽 × 4B (Y/tile/attr/X)
     *   - attr bit2-3 ≠ 0 → Y = $F8 (隐藏)
     */
    emit() {
        const s = this._store;
        const sprites = s.sprites;
        // 1. 移除上一帧场景精灵尾段 (校验仍位于末尾, 防止误删其他源)
        let base = sprites;
        if (this._prevTail.length > 0 && sprites.length >= this._prevTail.length) {
            const tail = sprites.slice(-this._prevTail.length);
            if (this._sameSprites(tail, this._prevTail)) {
                base = sprites.slice(0, sprites.length - this._prevTail.length);
            }
        }
        // 2. 影子 OAM → SpriteEntry (64 槽)
        const sceneSprites = [];
        for (let i = 0; i < 64; i++) {
            const off = i * SPR_BYTES;
            let y = this.readShadowByte(off);
            const tile = this.readShadowByte(off + 1);
            const attr = this.readShadowByte(off + 2);
            const x = this.readShadowByte(off + 3);
            // attr bit2-3 ≠ 0 → 屏幕外隐藏 (NES sub_88CE)
            if ((attr & 0x0c) !== 0)
                y = Y_HIDDEN;
            sceneSprites.push({
                active: y !== Y_HIDDEN,
                x,
                y,
                tile,
                palette: attr & 0x03,
                priority: (attr & 0x80) !== 0,
                flipH: (attr & 0x20) !== 0,
                flipV: (attr & 0x40) !== 0,
                bank: 0,
            });
        }
        // 3. 追加本帧场景精灵
        const active = sceneSprites.filter(sp => sp.active);
        s.sprites = [...base, ...active];
        this._prevTail = active;
    }
    /** 比较两段精灵是否一致 (用于尾段校验) */
    _sameSprites(a, b) {
        if (a.length !== b.length)
            return false;
        for (let i = 0; i < a.length; i++) {
            const x = a[i];
            const y = b[i];
            if (x.active !== y.active || x.x !== y.x || x.y !== y.y ||
                x.tile !== y.tile || x.palette !== y.palette || x.bank !== y.bank) {
                return false;
            }
        }
        return true;
    }
    /**
     * 全量导出 (先清空再发射) — 用于场景切换时保证 OAM 完全同步。
     * 对应 NES NMI: OAM DMA 前清零 → 从影子缓冲刷新。
     */
    emitFull() {
        this._store.sprites = [];
        this.emit();
    }
}
exports.OamView = OamView;
