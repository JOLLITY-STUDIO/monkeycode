"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrollCounters = void 0;
/**
 * ScrollCounters — 渲染滚动计数器对象 (Redis KV 风格)。
 *
 * 将原 PPU 的 cntFV/cntV/cntH/cntVT/cntHT 硬件计数器封装为对象属性。
 * 这些计数器在扫描线渲染时随 tile 遍历推进, 记录"当前渲染到哪个
 * (fine/tile/nametable) 位置"。
 *
 * 对应 Redis 概念: 每个计数器是一个命名键值, 此处用语义化对象属性承载。
 */
class ScrollCounters {
    constructor() {
        /** 垂直 fine Y (0-7) */
        this.fineV = 0;
        /** 垂直 nametable 位 (0/1) */
        this.ntV = 0;
        /** 水平 nametable 位 (0/1) */
        this.ntH = 0;
        /** 垂直 tile 粗 Y (0-31) */
        this.tileV = 0;
        /** 水平 tile 粗 X (0-31) */
        this.tileH = 0;
    }
    // ── 语义化 getter/setter (兼容旧字段命名风格) ────────────────────
    get cntFV() {
        return this.fineV;
    }
    get cntV() {
        return this.ntV;
    }
    get cntH() {
        return this.ntH;
    }
    get cntVT() {
        return this.tileV;
    }
    get cntHT() {
        return this.tileH;
    }
    set cntFV(v) {
        this.fineV = v & 7;
    }
    set cntV(v) {
        this.ntV = v & 1;
    }
    set cntH(v) {
        this.ntH = v & 1;
    }
    set cntVT(v) {
        this.tileV = v & 31;
    }
    set cntHT(v) {
        this.tileH = v & 31;
    }
    /** 从 reg 寄存器复制全部计数器 (cnt = reg) */
    copyFromReg(reg) {
        this.fineV = reg.vFine;
        this.ntV = reg.vNt;
        this.ntH = reg.hNt;
        this.tileV = reg.vTile;
        this.tileH = reg.hTile;
    }
    /** 从 14-bit vramAddress 提取计数器 (cntsFromAddress)。 */
    fromAddress(address) {
        let b = (address >> 8) & 0xff;
        this.fineV = (b >> 4) & 3;
        this.ntV = (b >> 3) & 1;
        this.ntH = (b >> 2) & 1;
        this.tileV = (this.tileV & 7) | ((b & 3) << 3);
        b = address & 0xff;
        this.tileV = (this.tileV & 24) | ((b >> 5) & 7);
        this.tileH = b & 31;
    }
    /** 把计数器拼成 14-bit 地址 (cntsToAddress)。 */
    toAddress() {
        const b1 = ((this.fineV & 7) << 4) |
            ((this.ntV & 1) << 3) |
            ((this.ntH & 1) << 2) |
            ((this.tileV >> 3) & 3);
        const b2 = ((this.tileV & 7) << 5) | (this.tileH & 31);
        return ((b1 << 8) | b2) & 0x7fff;
    }
    /**
     * 推进 N 个 tile (incTileCounter)。粗 X 溢出时翻转水平 nametable,
     * 粗 Y 溢出时推进垂直位, fine Y 递增。
     */
    advanceTiles(count) {
        for (let i = count; i !== 0; i--) {
            this.tileH++;
            if (this.tileH === 32) {
                this.tileH = 0;
                this.tileV++;
                if (this.tileV >= 30) {
                    this.ntH++;
                    if (this.ntH === 2) {
                        this.ntH = 0;
                        this.ntV++;
                        if (this.ntV === 2) {
                            this.ntV = 0;
                            this.fineV++;
                            this.fineV &= 0x7;
                        }
                    }
                }
            }
        }
    }
    // ── 序列化 ───────────────────────────────────────────────────────
    toJSON() {
        return {
            fineV: this.fineV,
            ntV: this.ntV,
            ntH: this.ntH,
            tileV: this.tileV,
            tileH: this.tileH,
        };
    }
    fromJSON(state) {
        if (!state)
            return;
        if (typeof state.fineV === "number")
            this.fineV = state.fineV;
        if (typeof state.ntV === "number")
            this.ntV = state.ntV;
        if (typeof state.ntH === "number")
            this.ntH = state.ntH;
        if (typeof state.tileV === "number")
            this.tileV = state.tileV;
        if (typeof state.tileH === "number")
            this.tileH = state.tileH;
    }
}
exports.ScrollCounters = ScrollCounters;
