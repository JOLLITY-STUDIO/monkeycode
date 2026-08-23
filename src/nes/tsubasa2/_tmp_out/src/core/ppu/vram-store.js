"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VramStore = void 0;
/**
 * VramStore — VRAM 的 Redis KV 风格存储封装。
 *
 * 将原 PPU 的硬件裸数组 (vramMem) 与地址寄存器 (vramAddress/vramTmpAddress)
 * 封装为语义化对象。内部仍用 Uint8Array 承载像素数据以保持性能，
 * 但对外只暴露语义化读写方法 (get/set) 与地址管理方法 (incrementAddr 等)，
 * 避免在渲染/IO 代码中直接操作裸索引。
 *
 * 对应 Redis 概念：
 *   - get(key)/set(key, value)  ≈  Redis GET / SET
 *   - addr 内部游标            ≈  Redis 内部指针 (由本对象管理)
 *   - addrIncrement 配置        ≈  Redis 增量步长配置
 */
class VramStore {
    constructor() {
        this.data = new Uint8Array(0x8000);
        this.vramAddr = 0;
        this.vramTmp = 0;
        this.addrInc = 0;
        this.bufferedValue = 0;
    }
    // ── Redis GET / SET ──────────────────────────────────────────────
    /** 读取 VRAM 中指定地址的字节 (Redis GET) */
    get(address) {
        return this.data[address & 0x7fff];
    }
    /** 写入 VRAM 中指定地址的字节 (Redis SET) */
    set(address, value) {
        this.data[address & 0x7fff] = value;
    }
    // ── 地址管理 (语义化操作) ─────────────────────────────────────────
    /** 当前读写地址 (vramAddress) */
    get addr() {
        return this.vramAddr;
    }
    /** 当前读写地址 */
    set addr(address) {
        this.vramAddr = address & 0x7fff;
    }
    /** 临时地址 (t 寄存器, vramTmpAddress) */
    get tmpAddr() {
        return this.vramTmp;
    }
    set tmpAddr(address) {
        this.vramTmp = address & 0x7fff;
    }
    /** 地址递增步长: 1=+32 行步进, 0=+1 */
    get addrIncrement() {
        return this.addrInc;
    }
    set addrIncrement(v) {
        this.addrInc = v & 1;
    }
    /** $2007 缓冲读取值 (read-ahead buffer) */
    get bufferedReadValue() {
        return this.bufferedValue;
    }
    set bufferedReadValue(v) {
        this.bufferedValue = v;
    }
    /**
     * 执行 $2007 读写后的地址递增。
     * 渲染进行中 (renderingEnabled && onRenderingScanline) 走"粗X/粗Y 同步递增"
     * 逻辑 (与渲染地址逻辑一致), 否则做线性 +1/+32。
     * 逻辑源自原 jsnes _incrementVramAddress。
     */
    incrementAddr(opts) {
        if (opts.renderingEnabled && opts.onRenderingScanline) {
            // 粗 X 递增 (横向 nametable 溢出时切换)
            if ((this.vramAddr & 0x001f) === 31) {
                this.vramAddr &= ~0x001f; // coarse X = 0
                this.vramAddr ^= 0x0400; // toggle horizontal nametable
            }
            else {
                this.vramAddr += 1;
            }
            // Y 递增: 先 fine Y, 溢出再粗 Y
            if ((this.vramAddr & 0x7000) !== 0x7000) {
                this.vramAddr += 0x1000; // fine Y += 1
            }
            else {
                this.vramAddr &= ~0x7000; // fine Y = 0
                let coarseY = (this.vramAddr >> 5) & 0x1f;
                if (coarseY === 29) {
                    coarseY = 0;
                    this.vramAddr ^= 0x0800; // toggle vertical nametable
                }
                else if (coarseY === 31) {
                    coarseY = 0; // wrap without nametable toggle
                }
                else {
                    coarseY += 1;
                }
                this.vramAddr = (this.vramAddr & ~0x03e0) | (coarseY << 5);
            }
        }
        else {
            // 常规线性递增 (渲染外)
            this.vramAddr += this.addrInc === 1 ? 32 : 1;
        }
        this.vramAddr &= 0x7fff;
    }
    /** 把 t 寄存器 (tmpAddr) 复制到当前地址 */
    copyTmpToAddr() {
        this.vramAddr = this.vramTmp;
    }
    /** 把当前地址复制到 t 寄存器 */
    copyAddrToTmp() {
        this.vramTmp = this.vramAddr;
    }
    /** 当前地址是否 < 0x2000 (pattern table / CHR 区) */
    isPatternTableAddr() {
        return this.vramAddr < 0x2000;
    }
    /** 当前地址是否为调色板/镜像区 (>= 0x2000) */
    isNonPatternTableAddr() {
        return this.vramAddr >= 0x2000;
    }
    /** 底层字节数组 (只读访问, 供调试工具 / 序列化使用) */
    get dataView() {
        return this.data;
    }
    // ── 序列化 ───────────────────────────────────────────────────────
    toJSON() {
        return {
            data: Array.from(this.data),
            vramAddr: this.vramAddr,
            vramTmp: this.vramTmp,
            addrInc: this.addrInc,
            bufferedValue: this.bufferedValue,
        };
    }
    fromJSON(state) {
        if (!state)
            return;
        this.data.set(state.data ?? []);
        this.vramAddr = state.vramAddr ?? 0;
        this.vramTmp = state.vramTmp ?? 0;
        this.addrInc = state.addrInc ?? 0;
        this.bufferedValue = state.bufferedValue ?? 0;
    }
}
exports.VramStore = VramStore;
