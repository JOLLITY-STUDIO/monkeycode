/**
 * ScrollCounters — 渲染滚动计数器对象 (Redis KV 风格)。
 *
 * 将原 PPU 的 cntFV/cntV/cntH/cntVT/cntHT 硬件计数器封装为对象属性。
 * 这些计数器在扫描线渲染时随 tile 遍历推进, 记录"当前渲染到哪个
 * (fine/tile/nametable) 位置"。
 *
 * 对应 Redis 概念: 每个计数器是一个命名键值, 此处用语义化对象属性承载。
 */
export declare class ScrollCounters {
    /** 垂直 fine Y (0-7) */
    fineV: number;
    /** 垂直 nametable 位 (0/1) */
    ntV: number;
    /** 水平 nametable 位 (0/1) */
    ntH: number;
    /** 垂直 tile 粗 Y (0-31) */
    tileV: number;
    /** 水平 tile 粗 X (0-31) */
    tileH: number;
    get cntFV(): number;
    get cntV(): number;
    get cntH(): number;
    get cntVT(): number;
    get cntHT(): number;
    set cntFV(v: number);
    set cntV(v: number);
    set cntH(v: number);
    set cntVT(v: number);
    set cntHT(v: number);
    /** 从 reg 寄存器复制全部计数器 (cnt = reg) */
    copyFromReg(reg: {
        vFine: number;
        vNt: number;
        hNt: number;
        vTile: number;
        hTile: number;
    }): void;
    /** 从 14-bit vramAddress 提取计数器 (cntsFromAddress)。 */
    fromAddress(address: number): void;
    /** 把计数器拼成 14-bit 地址 (cntsToAddress)。 */
    toAddress(): number;
    /**
     * 推进 N 个 tile (incTileCounter)。粗 X 溢出时翻转水平 nametable,
     * 粗 Y 溢出时推进垂直位, fine Y 递增。
     */
    advanceTiles(count: number): void;
    toJSON(): object;
    fromJSON(state: any): void;
}
