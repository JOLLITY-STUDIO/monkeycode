"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OamStore = void 0;
/**
 * OamStore — OAM/SPR-RAM 的 Redis KV 风格存储封装。
 *
 * 将原 PPU 的硬件裸数组 (spriteMem) 与 OAMADDR 寄存器 (sramAddress)
 * 封装为语义化对象。内部用 Uint8Array 承载 256 字节 OAM 数据。
 *
 * 对应 Redis 概念：
 *   - get(key)/set(key, value)  ≈  Redis GET / SET
 *   - addr 内部游标 (OAMADDR)   ≈  Redis 内部指针 (由本对象管理)
 */
class OamStore {
    constructor() {
        this.data = new Uint8Array(0x100);
        this.oamAddr = 0;
    }
    // ── Redis GET / SET ──────────────────────────────────────────────
    /** 读取 OAM 中指定地址的字节 (Redis GET) */
    get(address) {
        return this.data[address & 0xff];
    }
    /** 写入 OAM 中指定地址的字节 (Redis SET) */
    set(address, value) {
        this.data[address & 0xff] = value;
    }
    // ── OAMADDR 游标 (语义化操作) ────────────────────────────────────
    /** OAMADDR (sramAddress) 游标, 8-bit */
    get addr() {
        return this.oamAddr;
    }
    set addr(address) {
        this.oamAddr = address & 0xff;
    }
    /** 读取当前游标处的字节并递增游标 (wrap 于 256) */
    readAndInc() {
        const v = this.data[this.oamAddr];
        this.oamAddr = (this.oamAddr + 1) & 0xff;
        return v;
    }
    /** 写入当前游标处的字节并递增游标 (wrap 于 256) */
    writeAndInc(value) {
        this.data[this.oamAddr] = value;
        this.oamAddr = (this.oamAddr + 1) & 0xff;
    }
    /**
     * 渲染期间的 $2004 写入: 值不落盘, 仅 OAMADDR +4 且 AND $FC。
     * 匹配硬件内部求值计数器行为。
     */
    addrIncDuringRender() {
        this.oamAddr = (this.oamAddr + 4) & 0xfc;
    }
    /** 重置游标为 0 (OAMADDR reset at cycles 257-320) */
    resetAddr() {
        this.oamAddr = 0;
    }
    /** OAMADDR 是否非零 (用于 OAM corruption 检测) */
    isAddrNonZero() {
        return this.oamAddr !== 0;
    }
    /** OAMADDR 按 4 对齐后的 sprite 起始索引 (OAMADDR >> 2) */
    get spriteIndex() {
        return (this.oamAddr >> 2) & 0x3f;
    }
    /** OAMADDR 的字节内偏移 (OAMADDR & 3) */
    get byteOffset() {
        return this.oamAddr & 0x03;
    }
    /** 复制 OAM 中一段连续 8 字节到 OAM 起始处 (OAM corruption bug) */
    corruptToStart() {
        const srcBase = this.oamAddr & 0xf8;
        for (let i = 0; i < 8; i++) {
            this.data[i] = this.data[(srcBase + i) & 0xff];
        }
    }
    /** OAM 字节总数 (256) */
    get length() {
        return this.data.length;
    }
    /** 底层字节数组 (只读访问, 供调试工具 / 序列化使用) */
    get dataView() {
        return this.data;
    }
    // ── 序列化 ───────────────────────────────────────────────────────
    toJSON() {
        return {
            data: Array.from(this.data),
            oamAddr: this.oamAddr,
        };
    }
    fromJSON(state) {
        if (!state)
            return;
        this.data.set(state.data ?? []);
        this.oamAddr = state.oamAddr ?? 0;
    }
}
exports.OamStore = OamStore;
