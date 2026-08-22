"use strict";
/**
 * 通用 NES 外设 RAM 组件 — cpu.mem 周边硬件的翻译版数据载体。
 *
 * 与模拟器模式 1:1 保持 NES 内存语义（这些是 NES 内存地图的一部分，
 * 不属于任何具体游戏逻辑，其他游戏翻译版同样适用）：
 *   OamManager   $04A5 精灵影子缓冲 (3B/槽: 属性/tileLo/tileHi) + $0515 忙标志
 *   ShadowOam    $0468 影子 OAM 表 (64 槽 × 4B: Y/tile/attr/X) → $0200 硬件 OAM
 *   NameTable    $2000-$27FF 双 NT 网格 (32×30 tile 索引 + 属性)
 *   Palette      $3F00 调色板表 (BG×4 + SPR×4, 每组 4 色 RGBA)
 *
 * 渲染出口: OamManager.emitSprites() 把影子缓冲解析为 SpriteEntry[]
 * 写入 RamStore.sprites, 由 H5 帧合成器消费。
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShadowOam = exports.OamManager = exports.BLANK_PALETTE = void 0;
exports.createBlankPaletteTable = createBlankPaletteTable;
exports.createBlankNT = createBlankNT;
/** 默认/空白 PaletteEntry (全黑) */
exports.BLANK_PALETTE = {
    colors: [
        { r: 0, g: 0, b: 0, a: 255 },
        { r: 0, g: 0, b: 0, a: 255 },
        { r: 0, g: 0, b: 0, a: 255 },
        { r: 0, g: 0, b: 0, a: 255 },
    ],
};
/** 创建空白 PaletteTable */
function createBlankPaletteTable() {
    const blank = () => ({ colors: [...exports.BLANK_PALETTE.colors] });
    return {
        bgPalettes: [blank(), blank(), blank(), blank()],
        sprPalettes: [blank(), blank(), blank(), blank()],
    };
}
/** 空白 NT 网格 (rows × 32) */
function createBlankNT(rows = 30) {
    const nt = [];
    for (let y = 0; y < rows; y++) {
        const row = [];
        for (let x = 0; x < 32; x++) {
            row.push({ tile: 0, palette: 0, bank: 0, flipH: false, flipV: false, behindBg: false });
        }
        nt.push(row);
    }
    return nt;
}
// ═══════════════════════════════════════════════════════════
// OamManager — $04A5 精灵影子缓冲 (NES PPU OAM + 自用 $04A5)
// ═══════════════════════════════════════════════════════════
/** 忙标志值 (对应 NES ram_0515) */
const OAM_IDLE = 0;
const OAM_BUILDING = 0x01;
const OAM_READY = 0x80;
/** 最大精灵数 (NES OAM 硬件上限 64) */
const OAM_MAX = 64;
/**
 * OAM 精灵缓冲管理器。
 *
 * 影子缓冲槽格式 (与 NES 一致, 每组 3B):
 *   [0] $04A5+X  精灵组属性 (组/高度/优先级组)
 *   [1] $04A6+X  tile 低 8 位
 *   [2] $04A7+X  tile 高 8 位
 *   → tile 索引 = (高<<8) | 低
 *
 * 忙标志对应 NES ram_0515: 0=空闲, 1=构建中, $80=完成。
 * 渲染出口: emitSprites() 把影子缓冲解析为 SpriteEntry[] 写入 store.sprites。
 */
class OamManager {
    constructor() {
        /** 影子缓冲 (NES $04A5 区语义, 3B/槽) */
        this._shadow = [];
        /** 语义精灵 (渲染出口, 由 emitSprites 同步到 store.sprites) */
        this._entries = [];
        /** 忙标志 (对应 ram_0515) */
        this._busy = OAM_IDLE;
        /** 持有 RamStore 引用 (供 emitSprites 写回), 由 RamStore 构造时注入 */
        this._store = null;
        /** $04A5 线性 VRAM 缓冲 (256B 上限, 对应 NES 04A5-$05A4 区) */
        this._vram = new Uint8Array(256);
        /** 已写入的缓冲长度 (max offset+1) */
        this._vramLen = 0;
    }
    attach(store) {
        this._store = store;
    }
    // ── 忙标志 (替代 ram_0515) ──
    get busy() {
        return this._busy;
    }
    isBusy() {
        return this._busy !== OAM_IDLE;
    }
    beginBuild() {
        this._busy = OAM_BUILDING;
    }
    endBuild() {
        this._busy = OAM_READY;
    }
    setIdle() {
        this._busy = OAM_IDLE;
    }
    setBusy(v) {
        this._busy = v & 0xff;
    }
    // ── 影子缓冲读写 (NES $04A5 语义) ──
    writeSlot(index, attr, tileLo, tileHi) {
        if (!this._ensure(index))
            return;
        const slot = this._shadow[index];
        slot.attr = attr & 0xff;
        slot.tileLo = tileLo & 0xff;
        slot.tileHi = tileHi & 0xff;
        this._syncEntryFields(index);
    }
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
    writeBlock(offset, bytes) {
        for (let k = 0; k < bytes.length; k++)
            this.writeByte(offset + k, bytes[k]);
    }
    clearSlot(index) {
        if (index >= 0 && index < this._shadow.length) {
            this._shadow[index] = { attr: 0, tileLo: 0, tileHi: 0 };
            this._syncEntryFields(index);
        }
    }
    clearRange(offset, len) {
        for (let k = 0; k < len; k++)
            this.writeByte(offset + k, 0);
    }
    readByte(offset) {
        const i = Math.floor(offset / 3);
        const slot = this._shadow[i];
        if (!slot)
            return 0;
        const r = offset % 3;
        return r === 0 ? slot.attr : r === 1 ? slot.tileLo : slot.tileHi;
    }
    getSlot(index) {
        return this._shadow[index] ?? null;
    }
    slotCount() {
        return this._shadow.length;
    }
    // ── VRAM 线性写缓冲 (对应 bank30 $C951-$C981 消费) ──
    beginVramBuild() {
        this._vramLen = 0;
        this._busy = OAM_BUILDING;
    }
    writeVramByte(offset, v) {
        if (offset < 0 || offset >= this._vram.length)
            return;
        this._vram[offset] = v & 0xff;
        if (offset + 1 > this._vramLen)
            this._vramLen = offset + 1;
    }
    writeVramBlock(offset, bytes) {
        for (let k = 0; k < bytes.length; k++)
            this.writeVramByte(offset + k, bytes[k]);
    }
    readVramByte(offset) {
        if (offset < 0 || offset >= this._vram.length)
            return 0;
        return this._vram[offset];
    }
    endVramBuild() {
        this._busy = OAM_READY;
    }
    vramLen() {
        return this._vramLen;
    }
    /**
     * 把 VRAM 缓冲提交到 NameTable (对应 bank30 $C951 逐块写 $2006/$2007)。
     * 多块: [count][addrLo][addrHi][data×count] ... 直到 count==0。
     */
    commitVramToNT() {
        const st = this._store;
        if (!st)
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
                const x = pos % 32;
                const y = (pos / 32) | 0;
                if (x < 32 && y < 30) {
                    st.writeNT(nt, x, y, { tile, palette: 0, bank: 0, flipH: false, flipV: false, behindBg: false });
                }
            }
            i += 3 + count;
        }
        this._busy = OAM_IDLE;
    }
    clearVram() {
        this._vram.fill(0);
        this._vramLen = 0;
    }
    // ── 语义精灵设置 (坐标/翻转逻辑翻译后调用) ──
    setPos(index, x, y, active) {
        if (!this._ensure(index))
            return;
        this._entries[index].x = x & 0xff;
        this._entries[index].y = y & 0xff;
        this._entries[index].active = active;
    }
    setBank(index, bank) {
        if (!this._ensure(index))
            return;
        this._entries[index].bank = bank;
    }
    // ── 渲染出口 ──
    emitSprites() {
        const st = this._store;
        if (!st)
            return;
        st.sprites = this._entries.map((e) => ({ ...e }));
    }
    reset() {
        this._shadow.length = 0;
        this._entries.length = 0;
        this._busy = OAM_IDLE;
        if (this._store)
            this._store.sprites = [];
    }
    // ── 内部 ──
    _ensure(index) {
        if (index < 0 || index >= OAM_MAX)
            return false;
        while (this._shadow.length <= index) {
            this._shadow.push({ attr: 0, tileLo: 0, tileHi: 0 });
            this._entries.push({
                active: false, x: 0, y: 0xf8, tile: 0, palette: 0,
                priority: false, flipH: false, flipV: false, bank: 0,
            });
        }
        return true;
    }
    _syncEntryFields(index) {
        const slot = this._shadow[index];
        const e = this._entries[index];
        if (!slot || !e)
            return;
        e.tile = (slot.tileHi << 8) | slot.tileLo;
        e.palette = slot.attr & 0x03;
        e.flipH = (slot.attr & 0x20) !== 0;
        e.flipV = (slot.attr & 0x40) !== 0;
        e.priority = (slot.attr & 0x80) !== 0;
    }
}
exports.OamManager = OamManager;
// ═══════════════════════════════════════════════════════════
// ShadowOam — $0468 影子 OAM 表 (64 槽 × 4B: Y/tile/attr/X)
// ═══════════════════════════════════════════════════════════
/** 影子 OAM 基址 ($0468) */
const SHADOW_BASE = 0x0468;
/** 影子 OAM 字节数 (64 槽 × 4B) */
const SHADOW_BYTES = 256;
/** 精灵尾数据基址 ($0460, OAM 表前 8 字节辅助数据) */
const TAIL_BASE = 0x0460;
/** 精灵尾数据字节数 */
const TAIL_BYTES = 8;
/** 坐标累积变量 X ($04E4) */
const OFF_COORD_X = 0x04e4 - SHADOW_BASE;
/** 坐标累积变量 Y ($04E7) */
const OFF_COORD_Y = 0x04e7 - SHADOW_BASE;
/** 硬件 OAM 基址 ($0200, sub_88CE 拷贝目标) */
const HW_BASE = 0x0200;
/** 每精灵字节数 (Y, tile, attr, X) */
const SPR_BYTES = 4;
/** 屏幕外 Y 值 */
const Y_HIDDEN = 0xf8;
/** KV 键名构造 (ram_XXXX) */
function ramKey(addr) {
    return `ram_${addr.toString(16).toUpperCase().padStart(4, '0')}`;
}
/**
 * 影子 OAM 管理器 ($0468 影子精灵表唯一读写出口)。
 * 所有 Bank 的场景精灵写入一律走 oamShadow.*，不再直接拼 ram_0468 KV 键。
 */
class ShadowOam {
    constructor() {
        this._store = null;
    }
    attach(store) {
        this._store = store;
    }
    readByte(rel) {
        const s = this._store;
        if (!s || rel < 0 || rel >= SHADOW_BYTES)
            return 0;
        return s.read(ramKey(SHADOW_BASE + rel));
    }
    writeByte(rel, v) {
        const s = this._store;
        if (!s || rel < 0 || rel >= SHADOW_BYTES)
            return;
        s.write(ramKey(SHADOW_BASE + rel), v);
    }
    readSlot(rel) {
        return [this.readByte(rel), this.readByte(rel + 1), this.readByte(rel + 2), this.readByte(rel + 3)];
    }
    writeSlot(rel, y, tile, attr, x) {
        this.writeByte(rel, y);
        this.writeByte(rel + 1, tile);
        this.writeByte(rel + 2, attr);
        this.writeByte(rel + 3, x);
    }
    attrOr(rel, mask) {
        // attr 字节在 rel+2 (Y/tile/attr/X)
        this.writeByte(rel + 2, this.readByte(rel + 2) | mask);
    }
    attrAnd(rel, mask) {
        this.writeByte(rel + 2, this.readByte(rel + 2) & mask);
    }
    readTailByte(off) {
        const s = this._store;
        if (!s || off < 0 || off >= TAIL_BYTES)
            return 0;
        return s.read(ramKey(TAIL_BASE + off));
    }
    writeTailByte(off, v) {
        const s = this._store;
        if (!s || off < 0 || off >= TAIL_BYTES)
            return;
        s.write(ramKey(TAIL_BASE + off), v);
    }
    readCoordX() {
        return this.readByte(OFF_COORD_X);
    }
    writeCoordX(v) {
        this.writeByte(OFF_COORD_X, v);
    }
    readCoordY() {
        return this.readByte(OFF_COORD_Y);
    }
    writeCoordY(v) {
        this.writeByte(OFF_COORD_Y, v);
    }
    clearAll(fill = Y_HIDDEN) {
        for (let i = 0; i < SHADOW_BYTES; i++)
            this.writeByte(i, fill);
    }
    clearHw(fill = Y_HIDDEN) {
        const s = this._store;
        if (!s)
            return;
        for (let i = 0; i < 0x100; i++)
            s.write(ramKey(HW_BASE + i), fill);
    }
    /**
     * 开机/复位初始化: 全部精灵槽隐藏 (Y=$F8, tile/attr/X=0) + 控制寄存器归零。
     * 等价 NES 复位 (RAM 清零) + $CB8B 隐藏 OAM。
     * 关键: 不能整体填 $F8 (clearAll), 否则 $0515(忙标志)/$0538(滚动偏移) 被污染为 $F8,
     *       导致 NMI 滚动计算 scrollX=$004A+$0538=248 → h_tile=31 → 黑屏。
     */
    reset() {
        const s = this._store;
        if (!s)
            return;
        for (let i = 0; i < SHADOW_BYTES; i += SPR_BYTES) {
            s.write(ramKey(SHADOW_BASE + i), Y_HIDDEN); // Y 屏幕外
            s.write(ramKey(SHADOW_BASE + i + 1), 0); // tile
            s.write(ramKey(SHADOW_BASE + i + 2), 0); // attr
            s.write(ramKey(SHADOW_BASE + i + 3), 0); // X
        }
        for (const a of ShadowOam.CTRL_REGS_IN_SHADOW)
            s.write(ramKey(a), 0);
    }
    /** 影子 OAM → 硬件 OAM ($0200), 对应 NES sub_88CE (attr bit2-3≠0 → Y=$F8) */
    copyToHw() {
        const s = this._store;
        if (!s)
            return;
        for (let rel = 0; rel < SHADOW_BYTES; rel += SPR_BYTES) {
            let y = this.readByte(rel);
            const tile = this.readByte(rel + 1);
            const attr = this.readByte(rel + 2);
            const x = this.readByte(rel + 3);
            if ((attr & 0x0c) !== 0)
                y = Y_HIDDEN;
            s.write(ramKey(HW_BASE + rel), y);
            s.write(ramKey(HW_BASE + rel + 1), tile);
            s.write(ramKey(HW_BASE + rel + 2), attr);
            s.write(ramKey(HW_BASE + rel + 3), x);
        }
    }
}
exports.ShadowOam = ShadowOam;
/** $0468-$0567 窗口内被游戏复用的控制寄存器 (NES 复位 RAM=0, 不得被 $F8 填充污染) */
ShadowOam.CTRL_REGS_IN_SHADOW = [
    0x0515, 0x0516, 0x0518, 0x0519, 0x0522,
    0x0532, 0x0534, 0x0536, 0x0538, 0x0539,
];
