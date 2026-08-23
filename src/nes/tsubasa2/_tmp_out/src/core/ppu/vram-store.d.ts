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
export declare class VramStore {
    /** 底层 32KB VRAM 字节数组 (零初始化) */
    private readonly data;
    /** 当前 VRAM 读写地址 (vramAddress) */
    private vramAddr;
    /** 临时 VRAM 地址 (vramTmpAddress, 用于 $2000/$2005/$2006 的 t 寄存器) */
    private vramTmp;
    /** 地址递增步长配置: true=+32, false=+1 ($2000 bit 2) */
    private addrInc;
    /** $2007 缓冲读取值 (read-ahead buffer) */
    private bufferedValue;
    constructor();
    /** 读取 VRAM 中指定地址的字节 (Redis GET) */
    get(address: number): number;
    /** 写入 VRAM 中指定地址的字节 (Redis SET) */
    set(address: number, value: number): void;
    /** 当前读写地址 (vramAddress) */
    get addr(): number;
    /** 当前读写地址 */
    set addr(address: number);
    /** 临时地址 (t 寄存器, vramTmpAddress) */
    get tmpAddr(): number;
    set tmpAddr(address: number);
    /** 地址递增步长: 1=+32 行步进, 0=+1 */
    get addrIncrement(): number;
    set addrIncrement(v: number);
    /** $2007 缓冲读取值 (read-ahead buffer) */
    get bufferedReadValue(): number;
    set bufferedReadValue(v: number);
    /**
     * 执行 $2007 读写后的地址递增。
     * 渲染进行中 (renderingEnabled && onRenderingScanline) 走"粗X/粗Y 同步递增"
     * 逻辑 (与渲染地址逻辑一致), 否则做线性 +1/+32。
     * 逻辑源自原 jsnes _incrementVramAddress。
     */
    incrementAddr(opts: {
        renderingEnabled: boolean;
        onRenderingScanline: boolean;
    }): void;
    /** 把 t 寄存器 (tmpAddr) 复制到当前地址 */
    copyTmpToAddr(): void;
    /** 把当前地址复制到 t 寄存器 */
    copyAddrToTmp(): void;
    /** 当前地址是否 < 0x2000 (pattern table / CHR 区) */
    isPatternTableAddr(): boolean;
    /** 当前地址是否为调色板/镜像区 (>= 0x2000) */
    isNonPatternTableAddr(): boolean;
    /** 底层字节数组 (只读访问, 供调试工具 / 序列化使用) */
    get dataView(): Uint8Array;
    toJSON(): object;
    fromJSON(state: any): void;
}
