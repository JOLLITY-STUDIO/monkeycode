/**
 * RamViews — 具象化 RAM 命名空间视图（替代 readByte(0xXXXX) 业务 API）
 *
 * 翻译原则（v2）：
 *   - 禁止 Service 把 0xXXXX 字面量当业务状态 API（应通过具名 view 访问）
 *   - 允许：DataStore.readByte/writeByte 作为底层入口（仅硬件帧缓冲/VRAM 写透/中断内部用）
 *   - 命名空间视图按业务域分包：scene / palette / oam / ppuState / audioState / renderQueue
 *
 * 用法：
 *   store.scene.currentSceneId        // 等价 store.readByte(0x00ed)
 *   store.scene.scrollY              // 等价 store.readByte(0x0044)
 *   store.palette.bg[0]              // 等价 store.readByte(0x062a)
 *   store.oam.sprite(i).y            // 等价 store.readByte(0x0468 + i*4)
 *   store.audioState.bgmRequest      // 等价 store.readByte(0x0700)
 *
 * 历史：原 Service 直接 store.read('ram_005B') / writeByte(0x0079, ...) 满天飞，
 *       这种"用 16-bit RAM 地址当字段名"是 CPU 时代的产物，H5 必须用具名视图替代。
 */
import type { DataStore } from './DataStore';
/** 场景状态视图 */
export declare class SceneView {
    private readonly s;
    constructor(s: DataStore);
    /** 当前场景号（ram_00ED） */
    get currentSceneId(): number;
    set currentSceneId(v: number);
    /** 滚动标志（ram_0079：bit7 = 文本滚动路径） */
    get scrollFlag(): number;
    set scrollFlag(v: number);
    /** 滚动 X（ram_007A） */
    get scrollX(): number;
    set scrollX(v: number);
    /** 滚动 Y（ram_0044，最终 -1 = $007A/0044 路径） */
    get scrollY(): number;
    set scrollY(v: number);
    /** 主标志（ram_001B：bit0 = 标志 A，bit7 = 渲染路径） */
    get flags(): number;
    set flags(v: number);
    /** 数据段选择（ram_0077 = ram_0025） */
    get dataSegment(): number;
    set dataSegment(v: number);
}
/** 调色板视图（BG $062A-$0639 / SPR $063A-$0649） */
export declare class PaletteView {
    private readonly s;
    constructor(s: DataStore);
    /** 16 项 BG 调色板（ram_062A 起 16 字节） */
    get bg(): Uint8Array;
    /** 16 项 SPR 调色板（ram_063A 起 16 字节） */
    get spr(): Uint8Array;
    /** 装载 BG 调色板（16 字节 → ram_062A） */
    loadBg(palette: ReadonlyArray<number>): void;
    /** 装载 SPR 调色板（16 字节 → ram_063A） */
    loadSpr(palette: ReadonlyArray<number>): void;
}
/** 精灵 OAM 视图（影子 OAM，64 精灵 × 4 字节 [y, tile, attr, x]）。
 *
 * shadow OAM 不放到 DataStore.ram，因为 $0468-$0567 段会被
 *   render queue1 ($0498) / NMI buffer ($05E8) 等冲突踩掉。
 * 独立 DataStore.shadowOam: Uint8Array(256) 后所有写都走这里，
 *   oamDma 再推到 PPU spriteMem。
 */
export declare class OamView {
    private readonly s;
    constructor(s: DataStore);
    /** 64 个精灵（每精灵 4 字节 = 256 字节总） */
    get shadowOam(): Uint8Array;
    /** 实际 OAM 缓冲（$0200-$02FF，写入即生效到硬件） */
    get oam(): Uint8Array;
    /** 第 i 个精灵的 Y 坐标 */
    spriteY(i: number): number;
    setSpriteY(i: number, v: number): void;
    /** 第 i 个精灵的属性字节 */
    spriteAttr(i: number): number;
    setSpriteAttr(i: number, v: number): void;
    /** 第 i 个精灵的 X 坐标 */
    spriteX(i: number): number;
    setSpriteX(i: number, v: number): void;
    /** 第 i 个精灵的 tile 索引 */
    spriteTile(i: number): number;
    setSpriteTile(i: number, v: number): void;
}
/** PPU 状态视图（CTRL/MASK/bank 基址/滚动暂存） */
export declare class PpuStateView {
    private readonly s;
    constructor(s: DataStore);
    /** PPU CTRL（$0020：bit7 NMI, bit2-0 背景表/精灵/H8） */
    get ctrl(): number;
    set ctrl(v: number);
    /** PPU MASK（$0021：BG/SPR 可见 + 灰度 + 强化色） */
    get mask(): number;
    set mask(v: number);
    /** Bank 基址 / CHR 选择（$0022：bit0-2 cmd base, bit7 chrSel） */
    get chrSelBase(): number;
    set chrSelBase(v: number);
    /** 滚动 X 临时（$004A + $0538） */
    get scrollTempX(): number;
    /** 滚动 Y 临时（$004B） */
    get scrollTempY(): number;
}
/** 调色板渐变视图（$004A 渐显 BG / $004B 渐显 SPR） */
export declare class FadeView {
    private readonly s;
    constructor(s: DataStore);
    /** BG 渐显（$004A：$0F 最亮 → 0 最暗） */
    get bg(): number;
    set bg(v: number);
    /** SPR 渐显（$004B） */
    get spr(): number;
    set spr(v: number);
}
/** 音频状态视图（$0700 BGM 请求 / $0701-$0705 SE 请求 / $0706 通道使能 / $0707- 通道状态） */
export declare class AudioStateView {
    private readonly s;
    constructor(s: DataStore);
    /** BGM 请求（$0700） */
    get bgmRequest(): number;
    set bgmRequest(v: number);
    /** SE 请求（$0701-$0705） */
    get seRequest1(): number;
    set seRequest1(v: number);
    get seRequest2(): number;
    set seRequest2(v: number);
    get seRequest3(): number;
    set seRequest3(v: number);
    get seRequest4(): number;
    set seRequest4(v: number);
    get seRequest5(): number;
    set seRequest5(v: number);
    /** 全局静音标志（$07E9） */
    get muteAll(): number;
    set muteAll(v: number);
    /** 通道使能位（$0706：8 通道 bit） */
    get channelMask(): number;
    set channelMask(v: number);
    /** 第 ch 通道的计数（$0707+ch*4 起 4 字节） */
    channelCounter(ch: number): {
        durLo: number;
        durHi: number;
        noteDur: number;
        nextDurHi: number;
    };
    setChannelCounter(ch: number, c: {
        durLo?: number;
        durHi?: number;
        noteDur?: number;
        nextDurHi?: number;
    }): void;
}
/** 渲染队列视图（$0498 第一队列 / $0515+$04A5 第二队列 / $05E8 NT 缓冲） */
export declare class RenderQueueView {
    private readonly s;
    constructor(s: DataStore);
    /** 第一队列计数（$0498，0 = 空） */
    get queue1Count(): number;
    setQueue1Count(v: number): void;
    /** 第一队列第 i 项 (bank, ptrLo, ptrHi)（$0499+i*3 起 3 字节） */
    queue1Entry(i: number): {
        bank: number;
        addr: number;
    } | null;
    /** 第二队列挂起标志（$0515 bit7） */
    get queue2Pending(): boolean;
    setQueue2Pending(v: boolean): void;
    /** NT 渲染缓冲写入位置（$0628） */
    get ntBufferPos(): number;
    setNtBufferPos(v: number): void;
    /** NT 渲染缓冲忙标志（$0629 bit6） */
    get ntBufferBusy(): boolean;
    setNtBufferBusy(v: boolean): void;
    /** NT 渲染缓冲（$05E8-$0627，共 64 字节） */
    get ntBuffer(): Uint8Array;
}
/**
 * 比赛回合视图（$05E3-$05FF 区间业务状态）
 *
 * 业务字段（替代 'ram_05E3' / 'ram_05E4' / 'ram_05E5' / 'ram_05E9' / 'ram_05F4' 字符串键）：
 * - active：是否进行中（$05E3）
 * - sequence：段序号（$05E4）
 * - counter：段内倒计时（$05E9）
 * - typeId：类型 ID（$05E5）
 * - paramId：参数 ID（$05F4）
 * - nextEventId（$0600+，扩展位）
 */
export declare class MatchRoundView {
    private readonly s;
    constructor(s: DataStore);
    get active(): number;
    set active(v: number);
    get sequence(): number;
    set sequence(v: number);
    get typeId(): number;
    set typeId(v: number);
    get counter(): number;
    set counter(v: number);
    get paramId(): number;
    set paramId(v: number);
    /** 回合段解析游标（ram_05EF：$005F 指针下的段偏移） */
    get segmentCursor(): number;
    set segmentCursor(v: number);
}
/**
 * 比赛事件视图（$053A-$055E 区间业务状态）
 *
 * 业务字段（替代 'ram_053A' / 'ram_053B' / 'ram_053D' / 'ram_0540' / 'ram_0541' 等字符串键）：
 */
export declare class MatchEventView {
    private readonly s;
    constructor(s: DataStore);
    get typeId(): number;
    set typeId(v: number);
    get counter(): number;
    set counter(v: number);
    get phase(): number;
    set phase(v: number);
    get flag0(): number;
    set flag0(v: number);
    get flag1(): number;
    set flag1(v: number);
    get counter3(): number;
    set counter3(v: number);
    get paramLo(): number;
    set paramLo(v: number);
    get paramHi(): number;
    set paramHi(v: number);
    get targetX(): number;
    set targetX(v: number);
    get targetY(): number;
    set targetY(v: number);
}
/**
 * 球员移动视图（$003E-$0044 / $0517 区间业务状态）
 *
 * 业务字段（替代 'ram_003E' / 'ram_003F' / 'ram_0042' / 'ram_0044' / 'ram_0517' 字符串键）：
 * - flipX：方向翻转（$0517 bit6）
 * - directionFlag：方向位域（$0517）
 * - curX / curY：当前坐标（$003E/$003F）
 * - segmentPtr / segmentCursor：段指针与游标（$0042/$0044）
 */
export declare class PlayerMoveView {
    private readonly s;
    constructor(s: DataStore);
    get directionFlag(): number;
    set directionFlag(v: number);
    get flipX(): boolean;
    get curX(): number;
    set curX(v: number);
    get curY(): number;
    set curY(v: number);
    get segmentPtr(): number;
    set segmentPtr(v: number);
    get segmentCursor(): number;
    set segmentCursor(v: number);
}
/**
 * 球员名字视图（$062A / $002C 区间业务状态）
 *
 * 业务字段（替代 'ram_062A' / 'ram_002C' 字符串键）：
 * - segmentIndex：名字段索引（$062A & 0x7F）
 * - charIndex：字符字符位（$002C）
 */
export declare class PlayerNameView {
    private readonly s;
    constructor(s: DataStore);
    get segmentIndex(): number;
    set segmentIndex(v: number);
    get charIndex(): number;
    set charIndex(v: number);
}
