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
const types_1 = require("./types");
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
        // ── $04A5 线性 VRAM 写缓冲 (对应 bank30 $C951-$C981 消费) ──
        //
        // 真实格式 (2026-08 反汇编 $C951 确认):
        //   0,0 = 缓冲结束 (count==0)
        //   [count][addrLo][addrHi][data × count]  — 一个 VRAM 写块
        //   $C951: LDA abs,X $04A5 → count; 无则结束; Y=count;
        //          $C962: lo=$04A5+1; $C967: hi=$04A5+2 → $2006 (PPU 地址);
        //          $C975: 循环 $04A5+3.. 每字节 → $2007 (PPU 写数据);
        //   addr 为 PPU VRAM 地址 ($2000-$23FF=NT0, $2400-$27FF=NT1)。
        // 比赛 HUD 文本/比分/时钟即通过此缓冲写 NT (非 OAM 精灵)。
        //
        // H5 提交: 解析序列 → DataStore.writeNT (tile 索引 = 数据字节)。
        /** $04A5 线性 VRAM 缓冲 (256B 上限, 对应 NES 04A5-$05A4 区) */
        this._vram = new Uint8Array(256);
        /** 已写入的缓冲长度 (max offset+1) */
        this._vramLen = 0;
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
        if (!this._ensure(index))
            return;
        const slot = this._shadow[index];
        slot.attr = attr & 0xff;
        slot.tileLo = tileLo & 0xff;
        slot.tileHi = tileHi & 0xff;
        this._syncEntryFields(index);
    }
    /** 单字节写 (offset 相对 $04A5) */
    writeByte(offset, v) {
        const i = Math.floor(offset / 3);
        if (!this._ensure(i))
            return;
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
    /** 开启 VRAM 缓冲构建 (置忙, 对应 STA ram_0515 = 1) */
    beginVramBuild() {
        this._vramLen = 0;
        this._busy = exports.OAM_BUILDING;
    }
    /** 单字节写入 VRAM 缓冲 (offset 相对 $04A5) */
    writeVramByte(offset, v) {
        if (offset < 0 || offset >= this._vram.length) {
            console.warn(`[OamManager] VRAM 缓冲越界: ${offset} (上限 ${this._vram.length})`);
            return;
        }
        this._vram[offset] = v & 0xff;
        if (offset + 1 > this._vramLen)
            this._vramLen = offset + 1;
    }
    /** 连续字节写入 VRAM 缓冲 */
    writeVramBlock(offset, bytes) {
        for (let k = 0; k < bytes.length; k++)
            this.writeVramByte(offset + k, bytes[k]);
    }
    /** 读 VRAM 缓冲单字节 (越界返回 0) */
    readVramByte(offset) {
        if (offset < 0 || offset >= this._vram.length)
            return 0;
        return this._vram[offset];
    }
    /** 构建完成 (对应 STA ram_0515 = $80) */
    endVramBuild() {
        this._busy = exports.OAM_READY;
    }
    /** 当前 VRAM 缓冲已写长度 */
    vramLen() {
        return this._vramLen;
    }
    /**
     * 把 VRAM 缓冲提交到 NameTable (对应 bank30 $C951 逐块写 $2006/$2007)。
     * 支持多块: [count][addrLo][addrHi][data×count] [count]... 直到 count==0 或越界。
     * PPU 地址 → NT: $2000-$23FF=nt0, $2400-$27FF=nt1; 偏移 = addr & 0x3FF;
     * x = off % 32, y = off / 32 (tile 网格)。
     */
    commitVramToNT() {
        if (!this._store)
            return;
        let i = 0;
        while (i < this._vramLen) {
            const count = this._vram[i];
            if (count === 0)
                break;
            if (i + 2 + count > this._vramLen)
                break;
            const addr = (this._vram[i + 2] << 8) | this._vram[i + 1];
            const nt = addr < 0x2400 ? 0 : 1;
            const off = addr & 0x3ff;
            for (let k = 0; k < count; k++) {
                const tile = this._vram[i + 3 + k];
                const pos = off + k;
                const x = pos % types_1.NT_COLS;
                const y = (pos / types_1.NT_COLS) | 0;
                if (x < types_1.NT_COLS && y < types_1.NT_ROWS) {
                    this._store.writeNT(nt, x, y, {
                        tile,
                        palette: 0,
                        bank: 0,
                        flipH: false,
                        flipV: false,
                        behindBg: false,
                    });
                }
            }
            i += 3 + count;
        }
        this._busy = exports.OAM_IDLE; // 消费完置空闲 (对应 $C958 STX $0515 = 0)
    }
    /** 清空 VRAM 缓冲 */
    clearVram() {
        this._vram.fill(0);
        this._vramLen = 0;
    }
    // ── 语义精灵设置 (对应尚未翻译的坐标/翻转逻辑, 翻译后调用) ──
    /** 设置精灵屏幕坐标与激活 (y=0xF8 表示屏幕外不可见) */
    setPos(index, x, y, active) {
        if (!this._ensure(index))
            return;
        this._entries[index].x = x & 0xff;
        this._entries[index].y = y & 0xff;
        this._entries[index].active = active;
    }
    /** 设置精灵 CHR bank (图案取自哪个 CHR Bank) */
    setBank(index, bank) {
        if (!this._ensure(index))
            return;
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
    /**
     * 确保索引在 [0, OAM_MAX) 范围内并按需扩展缓冲。
     * @returns true=索引有效可继续操作; false=越界已忽略
     */
    _ensure(index) {
        if (index < 0 || index >= exports.OAM_MAX) {
            console.warn(`[OamManager] 精灵槽越界: ${index} (上限 ${exports.OAM_MAX})`);
            return false;
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
        return true;
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
