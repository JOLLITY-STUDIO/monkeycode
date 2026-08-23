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
export declare class OamStore {
    /** 底层 256 字节 OAM 数组 (零初始化) */
    private readonly data;
    /** OAMADDR 游标 (8-bit) */
    private oamAddr;
    constructor();
    /** 读取 OAM 中指定地址的字节 (Redis GET) */
    get(address: number): number;
    /** 写入 OAM 中指定地址的字节 (Redis SET) */
    set(address: number, value: number): void;
    /** OAMADDR (sramAddress) 游标, 8-bit */
    get addr(): number;
    set addr(address: number);
    /** 读取当前游标处的字节并递增游标 (wrap 于 256) */
    readAndInc(): number;
    /** 写入当前游标处的字节并递增游标 (wrap 于 256) */
    writeAndInc(value: number): void;
    /**
     * 渲染期间的 $2004 写入: 值不落盘, 仅 OAMADDR +4 且 AND $FC。
     * 匹配硬件内部求值计数器行为。
     */
    addrIncDuringRender(): void;
    /** 重置游标为 0 (OAMADDR reset at cycles 257-320) */
    resetAddr(): void;
    /** OAMADDR 是否非零 (用于 OAM corruption 检测) */
    isAddrNonZero(): boolean;
    /** OAMADDR 按 4 对齐后的 sprite 起始索引 (OAMADDR >> 2) */
    get spriteIndex(): number;
    /** OAMADDR 的字节内偏移 (OAMADDR & 3) */
    get byteOffset(): number;
    /** 复制 OAM 中一段连续 8 字节到 OAM 起始处 (OAM corruption bug) */
    corruptToStart(): void;
    /** OAM 字节总数 (256) */
    get length(): number;
    /** 底层字节数组 (只读访问, 供调试工具 / 序列化使用) */
    get dataView(): Uint8Array;
    toJSON(): object;
    fromJSON(state: any): void;
}
