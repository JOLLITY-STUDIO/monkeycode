"use strict";
/**
 * 数据中心 (Model 层)
 *
 * 替代 NES 的 RAM/VRAM/OAM，采用 Key-Value 结构化存储：
 *   1. PPU NameTable → 32×30 tile 索引网格
 *   2. OAM → Sprite 对象数组
 *   3. RAM → 语义化 KV 表 (不再用地址映射)
 *   4. Palette → RGBA 颜色数组
 *
 * 外部通过 Service 接口读写，不直接操作底层地址。
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataStore = exports.RAM_KEYS = exports.OamManager = void 0;
const types_1 = require("../../../core/types");
const header_1 = require("../../header");
const model_types_1 = require("./model-types");
// ────────────────────────────────────────────────────────────
// OAM 精灵缓冲管理 (内联自原 src/core/OamManager.ts — 已删除,
// 能力合并到数据中心, 不再保留独立模拟器类)
//
// 对应 NES PPU OAM 及本游戏自有的 $04A5 精灵影子缓冲。
// 所有 Bank 的演出/HUD 精灵写入一律走 DataStore.oam,
// 不再各自维护 ram_04A5 键 / ram_0515 忙标志。
//
// 影子缓冲槽格式 (与 NES 一致, 每组 3B):
//   [0] $04A5+X  精灵组属性 (组/高度/优先级组)
//   [1] $04A6+X  tile 低 8 位
//   [2] $04A7+X  tile 高 8 位
//   → tile 索引 = (高<<8) | 低
//
// 忙标志对应 NES ram_0515: 0=空闲, 1=构建中, $80=完成。
// 渲染出口: emitSprites() 把影子缓冲解析为 SpriteEntry[] 写入 DataStore.sprites。
// ────────────────────────────────────────────────────────────
/** 忙标志值 (对应 NES ram_0515) */
const OAM_IDLE = 0;
const OAM_BUILDING = 0x01;
const OAM_READY = 0x80;
/** 最大精灵数 (NES OAM 硬件上限 64) */
const OAM_MAX = 64;
/** OAM 精灵缓冲管理器 (通过 DataStore.oam 访问; 导出仅供单元测试) */
class OamManager {
    constructor() {
        /** 影子缓冲 (NES $04A5 区语义, 3B/槽) */
        this._shadow = [];
        /** 语义精灵 (渲染出口, 由 emitSprites 同步到 DataStore.sprites) */
        this._entries = [];
        /** 忙标志 (对应 ram_0515) */
        this._busy = OAM_IDLE;
        /** 持有 DataStore 引用 (供 emitSprites 写回), 由 DataStore 构造时注入 */
        this._store = null;
        // ── $04A5 线性 VRAM 写缓冲 (对应 bank30 $C951-$C981 消费) ──
        //
        // 真实格式 (2026-08 反汇编 $C951 确认):
        //   0,0 = 缓冲结束 (count==0)
        //   [count][addrLo][addrHi][data × count]  — 一个 VRAM 写块
        //   $C951: LDA abs,X $04A5 → count; 否则结束; Y=count;
        //          $C962: lo=$04A5+1; $C967: hi=$04A5+2 → $2006 (PPU 地址);
        //          $C975: 循环 $04A5+3.. 每字节 → $2007 (PPU 写数据);
        //   addr 为 PPU VRAM 地址 ($2000-$23FF=NT0, $2400-$27FF=NT1)。
        //   比赛 HUD 文本/比分/时钟即通过此缓冲写 NT (非 OAM 精灵)。
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
        return this._busy !== OAM_IDLE;
    }
    /** 构建开始 (对应 STA ram_0515 = 1) */
    beginBuild() {
        this._busy = OAM_BUILDING;
    }
    /** 构建完成 (对应 STA ram_0515 = $80) */
    endBuild() {
        this._busy = OAM_READY;
    }
    /** 置空闲 (对应 STA ram_0515 = 0) */
    setIdle() {
        this._busy = OAM_IDLE;
    }
    /** 直接透传忙值 (兼容翻译代码) */
    setBusy(v) {
        this._busy = v & 0xff;
    }
    // ── 影子缓冲读写 (NES $04A5 语义) ──
    /**
     * 一次性写 3B 槽 (对应 $8218 的 STA 04A5/04A6/04A7 序列)。
     * 同时同步语义精灵的确定字段 (tile/palette/翻转/优先级)。
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
    /** 连续区清 0 (对应 $88B9 清(数据块[2]*2+6) 字节) */
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
    /** 开始 VRAM 缓冲构建 (置忙, 对应 STA ram_0515 = 1) */
    beginVramBuild() {
        this._vramLen = 0;
        this._busy = OAM_BUILDING;
    }
    /** 单字节写入 VRAM 缓冲 (offset 相对 $04A5) */
    writeVramByte(offset, v) {
        if (offset < 0 || offset >= this._vram.length) {
            console.warn(`[DataStore.oam] VRAM 缓冲越界: ${offset} (上限 ${this._vram.length})`);
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
        this._busy = OAM_READY;
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
        this._busy = OAM_IDLE; // 消费完置空闲 (对应 $C958 STX $0515 = 0)
    }
    /** 清空 VRAM 缓冲 */
    clearVram() {
        this._vram.fill(0);
        this._vramLen = 0;
    }
    // ── 语义精灵设置 (坐标/翻转逻辑翻译后调用) ──
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
        this._busy = OAM_IDLE;
        if (this._store)
            this._store.sprites = [];
    }
    // ── 内部 ──
    /**
     * 确保索引在 [0, OAM_MAX) 范围内并按需扩展缓冲。
     * @returns true=索引有效可继续操作; false=越界已忽略
     */
    _ensure(index) {
        if (index < 0 || index >= OAM_MAX) {
            console.warn(`[DataStore.oam] 精灵槽越界: ${index} (上限 ${OAM_MAX})`);
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
    /** 由影子槽同步语义精灵的确定字段 */
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
// ────────────────────────────────────────────────────────────
// 影子 OAM 数据访问 (内联自原 src/game/data/prg/ShadowOam.ts — 已删除,
// 能力合并到数据中心)
//
// 对应 NES $0468-$0567 影子精灵表 (64 槽 × 4B: Y/tile/attr/X) +
// $0200-$02FF 硬件 OAM 区 (sub_88CE 拷贝产物)。
//
// 所有 Bank 的场景精灵写入一律走 DataStore.oamShadow。
// 渲染出口: OamView 每帧调用 readByte/readSlot 解析为 SpriteEntry[]。
//
// 槽格式 (与 NES 一致, 每槽 4B):
//   [0] $0468+X  Y 坐标
//   [1] $0469+X  tile 索引
//   [2] $046A+X  属性 (attr bit2-3 ≠ 0 → 屏幕外隐藏)
//   [3] $046B+X  X 坐标
// ────────────────────────────────────────────────────────────
/** 影子 OAM 基址 ($0468) */
const SHADOW_BASE = 0x0468;
/** 影子 OAM 字节数 (64 槽 × 4B) */
const SHADOW_BYTES = 256;
/** 精灵尾数据基址 ($0460, OAM 表前 8 字节辅助数据) */
const TAIL_BASE = 0x0460;
/** 精灵尾数据字节数 */
const TAIL_BYTES = 8;
/** 坐标累积变量 X ($04E4, 相对 $0468 = $7C) — _subA72C 精灵坐标累加 */
const OFF_COORD_X = 0x04e4 - SHADOW_BASE;
/** 坐标累积变量 Y ($04E7, 相对 $0468 = $7F) — _subA72C 精灵坐标累加 */
const OFF_COORD_Y = 0x04e7 - SHADOW_BASE;
/** 硬件 OAM 基址 ($0200, sub_88CE 拷贝目标) */
const HW_BASE = 0x0200;
/** 每精灵字节数 (Y, tile, attr, X) */
const SPR_BYTES = 4;
/** 屏幕外 Y 值 */
const Y_HIDDEN = 0xf8;
/** KV 键名构造 (ram_XXXX, 4 位十六进制大写 — 与全库 service 约定一致) */
function ramKey(addr) {
    return `ram_${addr.toString(16).toUpperCase().padStart(4, '0')}`;
}
/** 影子 OAM 管理器 (内部实现, 通过 DataStore.oamShadow 访问) */
class ShadowOam {
    constructor() {
        /** 持有 DataStore 引用, 由 DataStore 构造时注入 */
        this._store = null;
    }
    attach(store) {
        this._store = store;
    }
    // ── 单字节读写 (rel 相对 $0468, 越界忽略/返回 0) ──
    /** 读影子 OAM 单字节 */
    readByte(rel) {
        const s = this._store;
        if (!s || rel < 0 || rel >= SHADOW_BYTES)
            return 0;
        return s.read(ramKey(SHADOW_BASE + rel));
    }
    /** 写影子 OAM 单字节 */
    writeByte(rel, v) {
        const s = this._store;
        if (!s || rel < 0 || rel >= SHADOW_BYTES)
            return;
        s.write(ramKey(SHADOW_BASE + rel), v);
    }
    // ── 精灵槽读写 ──
    /** 读精灵槽 (rel 为槽起始相对偏移) → [y, tile, attr, x] */
    readSlot(rel) {
        return [
            this.readByte(rel),
            this.readByte(rel + 1),
            this.readByte(rel + 2),
            this.readByte(rel + 3),
        ];
    }
    /**
     * 写精灵槽 (对应 STA $0468+X / $0469+X / $046A+X / $046B+X 序列)。
     * @param rel  槽起始相对偏移 ($0468 起, 步进 4)
     */
    writeSlot(rel, y, tile, attr, x) {
        this.writeByte(rel, y);
        this.writeByte(rel + 1, tile);
        this.writeByte(rel + 2, attr);
        this.writeByte(rel + 3, x);
    }
    /** attr |= mask (rel 指向 attr 相对偏移, 即槽起始 +2) */
    attrOr(rel, mask) {
        this.writeByte(rel, this.readByte(rel) | mask);
    }
    /** attr &= mask (rel 指向 attr 相对偏移, 即槽起始 +2) */
    attrAnd(rel, mask) {
        this.writeByte(rel, this.readByte(rel) & mask);
    }
    // ── 精灵尾数据区 ($0460-$0467, OAM 表前 8 字节辅助数据) ──
    /** 读尾数据单字节 (off 相对 $0460, 0-7) */
    readTailByte(off) {
        const s = this._store;
        if (!s || off < 0 || off >= TAIL_BYTES)
            return 0;
        return s.read(ramKey(TAIL_BASE + off));
    }
    /** 写尾数据单字节 (off 相对 $0460, 0-7) */
    writeTailByte(off, v) {
        const s = this._store;
        if (!s || off < 0 || off >= TAIL_BYTES)
            return;
        s.write(ramKey(TAIL_BASE + off), v);
    }
    // ── 坐标累积变量 ($04E4/$04E7, _subA72C 精灵坐标累加) ──
    /** 读累积 X ($04E4) */
    readCoordX() {
        return this.readByte(OFF_COORD_X);
    }
    /** 写累积 X ($04E4) */
    writeCoordX(v) {
        this.writeByte(OFF_COORD_X, v);
    }
    /** 读累积 Y ($04E7) */
    readCoordY() {
        return this.readByte(OFF_COORD_Y);
    }
    /** 写累积 Y ($04E7) */
    writeCoordY(v) {
        this.writeByte(OFF_COORD_Y, v);
    }
    // ── 区域清空 ──
    /** 清影子 OAM (256B 填 fill, 默认 $F8 屏幕外) */
    clearAll(fill = Y_HIDDEN) {
        for (let i = 0; i < SHADOW_BYTES; i++)
            this.writeByte(i, fill);
    }
    /** 清硬件 OAM 区 ($0200-$02FF 填 fill, 默认 $F8) */
    clearHw(fill = Y_HIDDEN) {
        const s = this._store;
        if (!s)
            return;
        for (let i = 0; i < 0x100; i++)
            s.write(ramKey(HW_BASE + i), fill);
    }
    // ── 影子 → 硬件 OAM (sub_88CE) ──
    /**
     * 影子 OAM → 硬件 OAM ($0200) — 对应 NES sub_88CE:
     *   attr bit2-3 ≠ 0 的精灵 Y 置 $F8 (屏幕外隐藏), 其余原样拷贝。
     */
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
// ── 内存 KV ──
/** 语义化内存键名 */
exports.RAM_KEYS = {
    // 游戏状态
    FRAME_COUNT: 'frameCount',
    // 控制器
    BTN_CUR: 'btnCurrent',
    BTN_PREV: 'btnPrevious',
    BTN_EDGE: 'btnEdge',
    // 比赛 (键名 = 真实 RAM 地址, 与 PRG 翻译层 ram_XXXX 一致)
    TIMER_L: 'ram_0060', // 比赛时钟低位
    TIMER_H: 'ram_0061', // 比赛时钟高位
    SCORE_A: 'ram_0028', // 比分主队 $0028
    SCORE_B: 'ram_0029', // 比分客队 $0029
    BALL_X: 'ram_0635', // 球坐标 X
    BALL_Y: 'ram_0637', // 球坐标 Y
    BALL_OWNER: 'ram_05FC', // 持球球员
    // 临时变量区 (Bank 之间传递参数)
    TEMP_00: 'temp00',
    TEMP_01: 'temp01',
    TEMP_02: 'temp02',
    // ... 按需添加
};
/** 数据中心 */
class DataStore {
    constructor() {
        /** 滚动偏移 (pixel 单位) */
        this.scrollX = 0;
        this.scrollY = 0;
        /** OAM 精灵列表 */
        this.sprites = [];
        /** 实时调色板表（BG×4 + SPR×4） */
        this.paletteTable = (0, model_types_1.createBlankPaletteTable)();
        // ── 语义化 RAM ──
        /**
         * OAM 总管 — 全局唯一精灵数据出口。
         * 所有 Bank 一律通过 oam.* 读写精灵, 不再各自维护 ram_04A5 键。
         */
        this.oam = new OamManager();
        /**
         * 影子 OAM — $0468 影子精灵表唯一读写出口 (64 槽 × 4B: Y/tile/attr/X)。
         * 所有 Bank 的场景精灵写入一律走 oamShadow.*, 不再直接拼 ram_0468 KV 键。
         */
        this.oamShadow = new ShadowOam();
        /** 内存 KV 表 (替代实地址) */
        this.ram = new Map();
        /** 零页暂存 (256 bytes，与 6502 兼容) */
        this.zp = new Uint8Array(256);
        this.nt0 = this._blankNT();
        this.nt1 = this._blankNT();
        this.oam.attach(this);
        this.oamShadow.attach(this);
        // 影子 OAM 初始化为 $F8 (屏幕外), 未使用槽不产生"幽灵精灵"
        // (对应 NES 上电/复位后 OAM 缓冲的已知状态, spriteClear 也同此语义)
        this.oamShadow.clearAll();
    }
    // ── NT 操作 ──
    /** 写 NT 入口 */
    writeNT(ntSelect, tileX, tileY, entry) {
        const nt = ntSelect === 0 ? this.nt0 : this.nt1;
        if (tileY < types_1.NT_ROWS && tileX < types_1.NT_COLS) {
            nt[tileY][tileX] = { ...entry };
        }
    }
    /** 读指定 NT 入口（调试用） */
    readNT(ntSelect, tileX, tileY) {
        const nt = ntSelect === 0 ? this.nt0 : this.nt1;
        if (tileY >= 0 && tileY < types_1.NT_ROWS && tileX >= 0 && tileX < types_1.NT_COLS) {
            return nt[tileY][tileX];
        }
        return null;
    }
    /** 世界坐标 → 取 tile（考虑 mirroring） */
    getWorldTile(worldTileX, worldTileY) {
        if (worldTileY < 0 || worldTileY >= types_1.NT_ROWS)
            return null;
        if (header_1.CONFIG.mirroring === header_1.Mirroring.Horizontal) {
            // NT0 左 / NT1 右 → 世界宽度 64 tile
            const wx = ((worldTileX % 64) + 64) % 64;
            if (wx < types_1.NT_COLS) {
                return this.nt0[worldTileY][wx];
            }
            else {
                return this.nt1[worldTileY][wx - types_1.NT_COLS];
            }
        }
        else {
            // Vertical: NT0 上 / NT1 下 → 世界高度 60 tile
            const wy = ((worldTileY % 60) + 60) % 60;
            if (wy < types_1.NT_ROWS) {
                return this.nt0[wy][worldTileX % types_1.NT_COLS];
            }
            else {
                return this.nt1[wy - types_1.NT_ROWS][worldTileX % types_1.NT_COLS];
            }
        }
    }
    /** viewport 可见 tile 列表（从 scroll 位置采样世界） */
    eachVisibleTile(cb) {
        const startTx = Math.floor(this.scrollX / types_1.TILE_PX);
        const startTy = Math.floor(this.scrollY / types_1.TILE_PX);
        const tilesWide = Math.ceil(types_1.NES_WIDTH / types_1.TILE_PX) + 1; // 跨 tile 边界 +1
        const tilesHigh = Math.ceil(240 / types_1.TILE_PX) + 1;
        for (let ty = 0; ty < tilesHigh; ty++) {
            for (let tx = 0; tx < tilesWide; tx++) {
                const worldTx = startTx + tx;
                const worldTy = startTy + ty;
                const entry = this.getWorldTile(worldTx, worldTy);
                if (!entry)
                    continue;
                const screenX = (tx * types_1.TILE_PX) - (this.scrollX % types_1.TILE_PX);
                const screenY = (ty * types_1.TILE_PX) - (this.scrollY % types_1.TILE_PX);
                cb(screenX, screenY, entry);
            }
        }
    }
    // ── OAM ──
    /** 写入 Sprite (64 sprite 上限) */
    writeOAM(index, entry) {
        if (index >= 0 && index < 64) {
            this.sprites[index] = { ...entry };
        }
    }
    clearOAM() {
        this.oam.reset();
    }
    // ── 语义化内存 ──
    /** 通过键名读写 (替代 $xxxx 地址) */
    read(key) {
        return this.ram.get(key) ?? 0;
    }
    write(key, value) {
        this.ram.set(key, value & 0xFF);
    }
    /** 写入 16-bit 值到相邻两个 key */
    write16(keyLo, keyHi, value) {
        this.ram.set(keyLo, value & 0xFF);
        this.ram.set(keyHi, (value >> 8) & 0xFF);
    }
    read16(keyLo, keyHi) {
        const lo = this.ram.get(keyLo) ?? 0;
        const hi = this.ram.get(keyHi) ?? 0;
        return (hi << 8) | lo;
    }
    // ── 调色板操作 ──
    /** 写入单组 BG 调色板 */
    writeBgPalette(index, entry) {
        this.paletteTable.bgPalettes[index] = { colors: [...entry.colors] };
    }
    /** 写入单组精灵调色板 */
    writeSprPalette(index, entry) {
        this.paletteTable.sprPalettes[index] = { colors: [...entry.colors] };
    }
    /** 写入 BG 调色板中单个颜色 */
    writeBgColor(palIdx, colorIdx, color) {
        this.paletteTable.bgPalettes[palIdx].colors[colorIdx] = { ...color };
    }
    /** 写入精灵调色板中单个颜色 */
    writeSprColor(palIdx, colorIdx, color) {
        this.paletteTable.sprPalettes[palIdx].colors[colorIdx] = { ...color };
    }
    /**
     * 导出扁平化 RGBA 数组供渲染器使用
     * 返回 8 组调色板，每组 4 色 [[R,G,B,A],...]
     * 索引顺序: bgPalettes[0..3], sprPalettes[0..3]
     */
    exportPaletteRGBA() {
        const result = [];
        const all = [...this.paletteTable.bgPalettes, ...this.paletteTable.sprPalettes];
        for (const entry of all) {
            for (const c of entry.colors) {
                result.push([c.r, c.g, c.b, c.a]);
            }
        }
        return result;
    }
    /** 批量替换调色板表 */
    setPaletteTable(table) {
        this.paletteTable = {
            bgPalettes: table.bgPalettes.map(e => ({ colors: [...e.colors] })),
            sprPalettes: table.sprPalettes.map(e => ({ colors: [...e.colors] })),
        };
    }
    // ── 工具 ──
    _blankNT(rows = types_1.NT_ROWS) {
        const nt = [];
        for (let y = 0; y < rows; y++) {
            const row = [];
            for (let x = 0; x < types_1.NT_COLS; x++) {
                row.push({
                    tile: 0,
                    palette: 0,
                    bank: 0,
                    flipH: false,
                    flipV: false,
                    behindBg: false,
                });
            }
            nt.push(row);
        }
        return nt;
    }
    /** 重置所有状态 */
    reset() {
        this.nt0 = this._blankNT();
        this.nt1 = this._blankNT();
        this.scrollX = 0;
        this.scrollY = 0;
        this.sprites = [];
        this.paletteTable = (0, model_types_1.createBlankPaletteTable)();
        this.ram.clear();
        this.zp.fill(0);
        // 影子 OAM 区重新填 $F8 (与构造初始化一致)
        this.oamShadow.clearAll();
    }
}
exports.DataStore = DataStore;
