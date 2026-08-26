/**
 * DataStore — 运行时数据中心（Redis 风格 Key-Value，替代 CPU 内存）
 *
 * 职责：
 *  - 保存 2KB 工作 RAM（$0000-$07FF）字节，键为 4 位大写补零真实地址：'ram_0601'
 *  - 提供 16-bit 读写（高低字节序与 6502 一致：低地址=低字节）
 *  - NMI 渲染缓冲 $05E8 / 缓冲队列 $0498 / OAM $0200 全部是 RAM 上的普通字节
 *  - VRAM 写透：$2000-$3FFF（NT/属性表/调色板）写透到 PPU 目标（write-through）；
 *    无目标时暂存 vram 缓冲，attach 后一次性 flush（等价原版 $2006/$2007 直写）。
 *
 * 规则：
 *  - Service 只能通过本类读写运行时状态，禁止自建内存数组
 *  - 键必须是 4 位大写补零真实地址
 */
import type { VramTarget } from './DataStoreVram';
/** 命名空间视图（具象化 RAM 用途，替代 ram_XXXX 字面量） */
import { SceneView, PaletteView, OamView, PpuStateView, FadeView, AudioStateView, RenderQueueView, MatchRoundView, MatchEventView, PlayerMoveView, PlayerNameView } from './RamViews';
export declare class DataStore {
    /** 工作 RAM $0000-$07FF（含 OAM 缓冲 $0200、NMI 缓冲 $0498/$05E8） */
    readonly ram: Uint8Array;
    /**
     * Shadow OAM 独立缓冲区（64 精灵 × 4 字节 = 256 字节）。
     * 不放到 DataStore.ram 里，因为 $0468-$0567 是其他 ROM 数据区间
     *   （render queue1 $0498 / NMI buffer $05E8 等），会冲突。
     * 单独 Uint8Array 后所有 OAM 操作走这里，再由 InterruptService.oamDma
     *   推到 PPU spriteMem。
     */
    readonly shadowOam: Uint8Array;
    /** VRAM 暂存 $2000-$3FFF（无写透目标时的挂起写；attach 后 flush） */
    private readonly vram;
    /** VRAM 脏标记（$2000-$3FFF 相对偏移位图） */
    private vramDirty;
    /** VRAM 写透目标（由运行时 attach，见 setVramTarget） */
    private vramTarget;
    /** 帧计数（NMI 帧号） */
    frame: number;
    /** 命名空间视图（具象化业务状态访问） */
    readonly scene: SceneView;
    readonly palette: PaletteView;
    readonly oam: OamView;
    readonly ppuState: PpuStateView;
    readonly fade: FadeView;
    readonly audioState: AudioStateView;
    readonly renderQueue: RenderQueueView;
    readonly matchRound: MatchRoundView;
    readonly matchEvent: MatchEventView;
    readonly playerMove: PlayerMoveView;
    readonly playerName: PlayerNameView;
    constructor();
    /** 全部清零（等价 Reset 的 RAM 清零循环） */
    reset(): void;
    /**
     * 附加 VRAM 写透目标（PPU）。
     * 此前无目标期间的挂起写（$2000-$3FFF）一次性 flush 到目标。
     */
    setVramTarget(target: VramTarget | null): void;
    /**
     * 将暂存的 VRAM 脏字节写透到目标并清脏。
     * 由渲染管线在每帧 renderCommit 调用。
     */
    flushVram(target?: VramTarget): void;
    /** 读一个字节。key 形如 'ram_0601'；也兼容 'ram_FFFF' 之外的上层传参 */
    read(key: string): number;
    /** 写一个字节（自动 & 0xFF 截断，与 STA 一致） */
    write(key: string, value: number): void;
    /** 读一个字节（直接地址，内部用） */
    readByte(addr: number): number;
    /** 写一个字节（直接地址，内部用）。$2000-$3FFF 走 VRAM 写透。 */
    writeByte(addr: number, value: number): void;
    /**
     * VRAM 写透：$2000-$3FFF（NT/属性表 $23C0-$23FF/调色板 $3F00-$3F1F）。
     * 有目标 → 立即写 PPU；无目标 → 暂存脏区，attach/flush 时补写。
     */
    vramWrite(addr: number, value: number): void;
    /** 读 16-bit 小端（低字节在前） */
    readU16(addr: number): number;
    /** 写 16-bit 小端 */
    writeU16(addr: number, value: number): void;
    /** 批量应用 RAM 初始化表 [{addr, value}] */
    loadInitTable(table: ReadonlyArray<{
        addr: number;
        value: number;
    }>): void;
    /** 'ram_XXXX' → 地址（小写/无前缀也兼容） */
    static keyToAddr(key: string): number;
    /** 地址 → 键（4 位大写补零） */
    static addrToKey(addr: number): string;
    /** OAM 缓冲 $0200-$02FF 引用（只读视图） */
    get oamBuffer(): Uint8Array;
    /**
     * NMI 渲染缓冲 $05E8-$0627 视图（共 64 字节）。
     * 容量上限为 $0628（指针），忙标志 $0629，终止标 0。
     */
    get ntRenderBuffer(): Uint8Array;
}
