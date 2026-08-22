"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrollStore = void 0;
/**
 * ScrollStore — 滚动/地址寄存器的 Redis KV 风格封装。
 *
 * 将原 PPU 的 regFV/regV/regH/regVT/regHT/regFH/regS 等硬件寄存器
 * 封装为"命名 key → value"的 KV 存储, 每个寄存器用语义化字符串 key 标识。
 *
 * key 含义 (源自 NES 滚动寄存器命名):
 *   - 'v_fine'   : 垂直 fine offset (regFV, 0-7)
 *   - 'v_nt'     : 垂直 nametable 位 (regV, 0/1)
 *   - 'h_nt'     : 水平 nametable 位 (regH, 0/1)
 *   - 'v_tile'   : 垂直 tile (粗 Y, regVT, 0-31)
 *   - 'h_tile'   : 水平 tile (粗 X, regHT, 0-31)
 *   - 'h_fine'   : 水平 fine offset (regFH, 0-7)
 *   - 'bg_pt'    : 背景 pattern table 选择 (regS, 0/1)
 */
const KEYS = [
    "v_fine",
    "v_nt",
    "h_nt",
    "v_tile",
    "h_tile",
    "h_fine",
    "bg_pt",
];
class ScrollStore {
    constructor() {
        this.map = {
            v_fine: 0,
            v_nt: 0,
            h_nt: 0,
            v_tile: 0,
            h_tile: 0,
            h_fine: 0,
            bg_pt: 0,
        };
    }
    // ── Redis SET / GET (命名 key) ───────────────────────────────────
    /** 设置滚动寄存器 (Redis SET key value) */
    set(key, value) {
        this.map[key] = value;
    }
    /** 读取滚动寄存器 (Redis GET key) */
    get(key) {
        return this.map[key];
    }
    // ── 语义化便捷读 (与旧字段同名 getter, 便于渲染逻辑阅读) ─────────
    get vFine() {
        return this.map.v_fine;
    }
    get vNt() {
        return this.map.v_nt;
    }
    get hNt() {
        return this.map.h_nt;
    }
    get vTile() {
        return this.map.v_tile;
    }
    get hTile() {
        return this.map.h_tile;
    }
    get hFine() {
        return this.map.h_fine;
    }
    get bgPatternTable() {
        return this.map.bg_pt;
    }
    set vFine(v) {
        this.map.v_fine = v & 7;
    }
    set vNt(v) {
        this.map.v_nt = v & 1;
    }
    set hNt(v) {
        this.map.h_nt = v & 1;
    }
    set vTile(v) {
        this.map.v_tile = v & 31;
    }
    set hTile(v) {
        this.map.h_tile = v & 31;
    }
    set hFine(v) {
        this.map.h_fine = v & 7;
    }
    set bgPatternTable(v) {
        this.map.bg_pt = v & 1;
    }
    /**
     * 从 14-bit 地址中提取滚动寄存器 (regsFromAddress)。
     * address 为 vramTmpAddress (含 t 寄存器位布局)。
     */
    fromAddress(address) {
        let b = (address >> 8) & 0xff;
        this.map.v_fine = (b >> 4) & 7;
        this.map.v_nt = (b >> 3) & 1;
        this.map.h_nt = (b >> 2) & 1;
        this.map.v_tile = (this.map.v_tile & 7) | ((b & 3) << 3);
        b = address & 0xff;
        this.map.v_tile = (this.map.v_tile & 24) | ((b >> 5) & 7);
        this.map.h_tile = b & 31;
    }
    /**
     * 把滚动寄存器拼成 t 寄存器地址 (regsToAddress), 返回 14-bit 地址。
     */
    toAddress() {
        const b1 = ((this.map.v_fine & 7) << 4) |
            ((this.map.v_nt & 1) << 3) |
            ((this.map.h_nt & 1) << 2) |
            ((this.map.v_tile >> 3) & 3);
        const b2 = ((this.map.v_tile & 7) << 5) | (this.map.h_tile & 31);
        return ((b1 << 8) | b2) & 0x7fff;
    }
    /**
     * $2000 写入时同步 regV/regH/regS (基址位)。
     */
    applyControlReg1(value) {
        this.map.v_nt = (value >> 1) & 1;
        this.map.h_nt = value & 1;
        this.map.bg_pt = (value >> 4) & 1;
    }
    // ── 序列化 ───────────────────────────────────────────────────────
    toJSON() {
        return Object.assign({}, this.map);
    }
    fromJSON(state) {
        if (!state)
            return;
        for (const k of KEYS) {
            if (typeof state[k] === "number") {
                this.map[k] = state[k];
            }
        }
    }
}
exports.ScrollStore = ScrollStore;
