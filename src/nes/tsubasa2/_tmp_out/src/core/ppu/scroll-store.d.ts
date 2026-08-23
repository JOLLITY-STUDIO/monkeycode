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
declare const KEYS: readonly ["v_fine", "v_nt", "h_nt", "v_tile", "h_tile", "h_fine", "bg_pt"];
type ScrollKey = (typeof KEYS)[number];
export declare class ScrollStore {
    private readonly map;
    constructor();
    /** 设置滚动寄存器 (Redis SET key value) */
    set(key: ScrollKey, value: number): void;
    /** 读取滚动寄存器 (Redis GET key) */
    get(key: ScrollKey): number;
    get vFine(): number;
    get vNt(): number;
    get hNt(): number;
    get vTile(): number;
    get hTile(): number;
    get hFine(): number;
    get bgPatternTable(): number;
    set vFine(v: number);
    set vNt(v: number);
    set hNt(v: number);
    set vTile(v: number);
    set hTile(v: number);
    set hFine(v: number);
    set bgPatternTable(v: number);
    /**
     * 从 14-bit 地址中提取滚动寄存器 (regsFromAddress)。
     * address 为 vramTmpAddress (含 t 寄存器位布局)。
     */
    fromAddress(address: number): void;
    /**
     * 把滚动寄存器拼成 t 寄存器地址 (regsToAddress), 返回 14-bit 地址。
     */
    toAddress(): number;
    /**
     * $2000 写入时同步 regV/regH/regS (基址位)。
     */
    applyControlReg1(value: number): void;
    toJSON(): object;
    fromJSON(state: any): void;
}
export {};
