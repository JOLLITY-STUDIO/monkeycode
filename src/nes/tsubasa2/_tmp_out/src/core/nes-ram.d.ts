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
/** H5 渲染出口精灵 (帧合成器消费) */
export interface SpriteEntry {
    active: boolean;
    x: number;
    y: number;
    tile: number;
    palette: number;
    priority: boolean;
    flipH: boolean;
    flipV: boolean;
    bank: number;
}
/** NameTable 单个 tile 入口 */
export interface NameTableEntry {
    tile: number;
    palette: number;
    bank: number;
    flipH: boolean;
    flipV: boolean;
    behindBg: boolean;
}
/** 单个 RGBA 颜色 */
export interface PaletteColor {
    r: number;
    g: number;
    b: number;
    a: number;
}
/** 一组调色板 (4 色, colors[0]=背景/透明) */
export interface PaletteEntry {
    colors: [PaletteColor, PaletteColor, PaletteColor, PaletteColor];
}
/** 完整调色板表 (BG×4 + SPR×4) */
export interface PaletteTable {
    bgPalettes: [PaletteEntry, PaletteEntry, PaletteEntry, PaletteEntry];
    sprPalettes: [PaletteEntry, PaletteEntry, PaletteEntry, PaletteEntry];
}
/** 默认/空白 PaletteEntry (全黑) */
export declare const BLANK_PALETTE: PaletteEntry;
/** 创建空白 PaletteTable */
export declare function createBlankPaletteTable(): PaletteTable;
/** 空白 NT 网格 (rows × 32) */
export declare function createBlankNT(rows?: number): NameTableEntry[][];
/** 影子槽 (NES $04A5 区语义, 3B/槽) */
interface OamShadowSlot {
    attr: number;
    tileLo: number;
    tileHi: number;
}
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
export declare class OamManager {
    /** 影子缓冲 (NES $04A5 区语义, 3B/槽) */
    private _shadow;
    /** 语义精灵 (渲染出口, 由 emitSprites 同步到 store.sprites) */
    private _entries;
    /** 忙标志 (对应 ram_0515) */
    private _busy;
    /** 持有 RamStore 引用 (供 emitSprites 写回), 由 RamStore 构造时注入 */
    private _store;
    /** $04A5 线性 VRAM 缓冲 (256B 上限, 对应 NES 04A5-$05A4 区) */
    private _vram;
    /** 已写入的缓冲长度 (max offset+1) */
    private _vramLen;
    attach(store: OamManager['_store']): void;
    get busy(): number;
    isBusy(): boolean;
    beginBuild(): void;
    endBuild(): void;
    setIdle(): void;
    setBusy(v: number): void;
    writeSlot(index: number, attr: number, tileLo: number, tileHi: number): void;
    writeByte(offset: number, v: number): void;
    writeBlock(offset: number, bytes: number[] | Uint8Array): void;
    clearSlot(index: number): void;
    clearRange(offset: number, len: number): void;
    readByte(offset: number): number;
    getSlot(index: number): OamShadowSlot | null;
    slotCount(): number;
    beginVramBuild(): void;
    writeVramByte(offset: number, v: number): void;
    writeVramBlock(offset: number, bytes: number[] | Uint8Array): void;
    readVramByte(offset: number): number;
    endVramBuild(): void;
    vramLen(): number;
    /**
     * 把 VRAM 缓冲提交到 NameTable (对应 bank30 $C951 逐块写 $2006/$2007)。
     * 多块: [count][addrLo][addrHi][data×count] ... 直到 count==0。
     */
    commitVramToNT(): void;
    clearVram(): void;
    setPos(index: number, x: number, y: number, active: boolean): void;
    setBank(index: number, bank: number): void;
    emitSprites(): void;
    reset(): void;
    private _ensure;
    private _syncEntryFields;
}
/** 影子 OAM 读写接口 (RamStore 需提供 read/write 的 KV 字节语义) */
export interface KvByteIO {
    read(key: string): number;
    write(key: string, val: number): void;
}
/**
 * 影子 OAM 管理器 ($0468 影子精灵表唯一读写出口)。
 * 所有 Bank 的场景精灵写入一律走 oamShadow.*，不再直接拼 ram_0468 KV 键。
 */
export declare class ShadowOam {
    private _store;
    attach(store: KvByteIO): void;
    readByte(rel: number): number;
    writeByte(rel: number, v: number): void;
    readSlot(rel: number): number[];
    writeSlot(rel: number, y: number, tile: number, attr: number, x: number): void;
    attrOr(rel: number, mask: number): void;
    attrAnd(rel: number, mask: number): void;
    readTailByte(off: number): number;
    writeTailByte(off: number, v: number): void;
    readCoordX(): number;
    writeCoordX(v: number): void;
    readCoordY(): number;
    writeCoordY(v: number): void;
    clearAll(fill?: number): void;
    clearHw(fill?: number): void;
    /** $0468-$0567 窗口内被游戏复用的控制寄存器 (NES 复位 RAM=0, 不得被 $F8 填充污染) */
    static readonly CTRL_REGS_IN_SHADOW: readonly number[];
    /**
     * 开机/复位初始化: 全部精灵槽隐藏 (Y=$F8, tile/attr/X=0) + 控制寄存器归零。
     * 等价 NES 复位 (RAM 清零) + $CB8B 隐藏 OAM。
     * 关键: 不能整体填 $F8 (clearAll), 否则 $0515(忙标志)/$0538(滚动偏移) 被污染为 $F8,
     *       导致 NMI 滚动计算 scrollX=$004A+$0538=248 → h_tile=31 → 黑屏。
     */
    reset(): void;
    /** 影子 OAM → 硬件 OAM ($0200), 对应 NES sub_88CE (attr bit2-3≠0 → Y=$F8) */
    copyToHw(): void;
}
export {};
