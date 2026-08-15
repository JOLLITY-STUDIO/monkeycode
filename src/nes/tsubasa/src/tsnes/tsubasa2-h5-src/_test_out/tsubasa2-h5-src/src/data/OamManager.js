"use strict";
/**
 * OAM 总管 (Model 层, 全局唯一精灵数据出口)
 *
 * 对应 NES PPU OAM 及本游戏自有的 $04A5 精灵影子缓冲。
 * 所有 Bank 的精灵写入一律走本类, 不再各自维护 ram_04A5 键 / ram_0515 忙标志。
 *
 * 影子缓冲槽格式 (与 NES 一致, 每组 3B):
 *   [0] $04A5+X  精灵组属性 (帧/高度/优先级组)
 *   [1] $04A6+X  tile 低 8 位
 *   [2] $04A7+X  tile 高 8 位
 *   → tile 索引 = (高<<8) | 低
 *
 * 忙标志对应 NES ram_0515: 0=空闲, 1=构建中, $80=完成。
 *
 * 渲染出口: emitSprites() 把影子缓冲解析为 SpriteEntry[]
 * 写入 DataStore.sprites, 由渲染器 (View) 消费。
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.OamManager = exports.OAM_MAX = exports.OAM_READY = exports.OAM_BUILDING = exports.OAM_IDLE = void 0;
/** 忙标志值 (对应 NES ram_0515) */
exports.OAM_IDLE = 0;
exports.OAM_BUILDING = 0x01;
exports.OAM_READY = 0x80;
/** 最大精灵数 (NES OAM 硬件上限 64) */
exports.OAM_MAX = 64;
class OamManager {
    constructor() {
        /** 影子缓冲 (NES $04A5 区语义, 3B/槽) */
        this._shadow = [];
        /** 语义化精灵 (渲染出口, 由 emitSprites 同步到 DataStore.sprites) */
        this._entries = [];
        /** 忙标志 (对应 ram_0515) */
        this._busy = exports.OAM_IDLE;
        /** 持有 DataStore 引用 (供 emitSprites 写回), 由 DataStore 构造时注入 */
        this._store = null;
    }
    attach(store) {
        this._store = store;
    }
    // ── 忙标志 (替代 ram_0515) ──
    /** 当前忙值 (0=空闲 1=构建中 $80=完成) */
    get busy() {
        return this._busy;
    }
    isBusy() {
        return this._busy !== exports.OAM_IDLE;
    }
    /** 构建开始 (对应 STA ram_0515 = 1) */
    beginBuild() {
        this._busy = exports.OAM_BUILDING;
    }
    /** 构建完成 (对应 STA ram_0515 = $80) */
    endBuild() {
        this._busy = exports.OAM_READY;
    }
    /** 置空闲 (对应 STA ram_0515 = 0) */
    setIdle() {
        this._busy = exports.OAM_IDLE;
    }
    /** 直接透传忙值 (兼容翻译代码) */
    setBusy(v) {
        this._busy = v & 0xff;
    }
    // ── 影子缓冲读写 (NES $04A5 语义) ──
    /**
     * 一次性写 3B 槽 (对应 $8218 的 STA 04A5/04A6/04A7 序列)。
     * 同时同步语义精灵的可确定字段 (tile/palette/翻转/优先级)。
     */
    writeSlot(index, attr, tileLo, tileHi) {
        this._ensure(index);
        const slot = this._shadow[index];
        slot.attr = attr & 0xff;
        slot.tileLo = tileLo & 0xff;
        slot.tileHi = tileHi & 0xff;
        this._syncEntryFields(index);
    }
    /** 单字节写 (offset 相对 $04A5) */
    writeByte(offset, v) {
        const i = Math.floor(offset / 3);
        this._ensure(i);
        const r = offset % 3;
        const slot = this._shadow[i];
        if (r === 0)
            slot.attr = v & 0xff;
        else if (r === 1)
            slot.tileLo = v & 0xff;
        else
            slot.tileHi = v & 0xff;
        this._syncEntryFields(i);
    }
    /** 连续字节区复制 (对应 bank28 OAM 初始化 24B 复制等) */
    writeBlock(offset, bytes) {
        for (let k = 0; k < bytes.length; k++) {
            this.writeByte(offset + k, bytes[k]);
        }
    }
    /** 槽清 0 */
    clearSlot(index) {
        if (index >= 0 && index < this._shadow.length) {
            this._shadow[index] = { attr: 0, tileLo: 0, tileHi: 0 };
            this._syncEntryFields(index);
        }
    }
    /** 连续区清 0 (对应 $88B9 清 (数据块[2]*2+6) 字节) */
    clearRange(offset, len) {
        for (let k = 0; k < len; k++)
            this.writeByte(offset + k, 0);
    }
    /** 读影子缓冲单字节 (offset 相对 $04A5, 越界返回 0) */
    readByte(offset) {
        const i = Math.floor(offset / 3);
        const slot = this._shadow[i];
        if (!slot)
            return 0;
        const r = offset % 3;
        return r === 0 ? slot.attr : r === 1 ? slot.tileLo : slot.tileHi;
    }
    /** 读整槽 (返回 null 表示未写) */
    getSlot(index) {
        return this._shadow[index] ?? null;
    }
    /** 当前已分配槽数 */
    slotCount() {
        return this._shadow.length;
    }
    // ── 语义精灵设置 (对应尚未翻译的坐标/翻转逻辑, 翻译后调用) ──
    /** 设置精灵屏幕坐标与激活 (y=0xF8 表示屏幕外不可见) */
    setPos(index, x, y, active) {
        this._ensure(index);
        this._entries[index].x = x & 0xff;
        this._entries[index].y = y & 0xff;
        this._entries[index].active = active;
    }
    /** 设置精灵 CHR bank (图案取自哪个 CHR Bank) */
    setBank(index, bank) {
        this._ensure(index);
        this._entries[index].bank = bank;
    }
    // ── 渲染出口 ──
    /**
     * 把影子缓冲解析为 SpriteEntry[] 写入 DataStore.sprites。
     * NOTE: tile/attr 已按影子缓冲解包; x/y/active 由各场景逻辑
     * 通过 setPos 填充, 未填充时保持默认 (y=0xF8 屏幕外)。
     */
    emitSprites() {
        if (!this._store)
            return;
        const out = this._entries.map(e => ({ ...e }));
        this._store.sprites = out;
    }
    /** 清空全部 (对应 clearOAM: 全部槽归 0, 精灵置屏幕外) */
    reset() {
        this._shadow.length = 0;
        this._entries.length = 0;
        this._busy = exports.OAM_IDLE;
        if (this._store)
            this._store.sprites = [];
    }
    // ── 内部 ──
    _ensure(index) {
        if (index < 0 || index >= exports.OAM_MAX) {
            console.warn(`[OamManager] 精灵槽越界: ${index} (上限 ${exports.OAM_MAX})`);
            return;
        }
        while (this._shadow.length <= index) {
            this._shadow.push({ attr: 0, tileLo: 0, tileHi: 0 });
            this._entries.push({
                active: false,
                x: 0,
                y: 0xf8,
                tile: 0,
                palette: 0,
                priority: false,
                flipH: false,
                flipV: false,
                bank: 0,
            });
        }
    }
    /** 由影子槽同步语义精灵的可确定字段 */
    _syncEntryFields(index) {
        const slot = this._shadow[index];
        if (!slot || !this._entries[index])
            return;
        const e = this._entries[index];
        e.tile = (slot.tileHi << 8) | slot.tileLo;
        e.palette = slot.attr & 0x03;
        e.flipH = (slot.attr & 0x20) !== 0;
        e.flipV = (slot.attr & 0x40) !== 0;
        e.priority = (slot.attr & 0x80) !== 0;
    }
}
exports.OamManager = OamManager;
