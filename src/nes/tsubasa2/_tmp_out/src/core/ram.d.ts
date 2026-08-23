/**
 * 通用 NES RAM 总线 — cpu.mem 的替代品（翻译版无 CPU）。
 *
 * 与模拟器模式 1:1 保持 NES 内存地图语义：
 *   $0000-$1FFF  CPU RAM，硬件自动镜像到 2KB（mem[addr & 0x7ff]）
 *   $2000-$4017  设备区（PPU/APU/IO），由注册设备(device)拦截；
 *                未注册时降级为直接读写（保持 cpu.mem 行为）
 *   $4018-$FFFF  直接读写（SRAM/PRG 窗口等）
 *
 * 翻译版 bank 代码通过本类读写 RAM 变量（零页、$0300 球员区等），
 * 不需要 6502 指令执行。其他 NES 游戏翻译版同样适用。
 *
 * 本类两种用法（Redis 风格 + byte 总线）：
 *   1. KV（推荐，存任何类型）: get('player.01') / set('player.01', {...})
 *   2. byte 总线（与模拟器 1:1）: read('ram_005E') / write('ram_005E', 0)
 *      也支持地址数字: read(0x005E) / write(0x005E, 0)
 *      字符串解析规则：'ram_XXXX' / '$XXXX' / '0xXXXX' → 十六进制地址。
 */
import { OamManager, ShadowOam, type NameTableEntry, type PaletteColor, type PaletteEntry, type PaletteTable, type SpriteEntry } from './nes-ram';
export interface RamDevice {
    read?(addr: number): number;
    write?(addr: number, val: number): void;
}
/** 键类型：KV 字符串（'ram_005E'）或地址数字 */
export type RamKey = string | number;
export declare class RamStore {
    /** 64KB 内存数组，与 cpu.mem 完全相同布局 */
    mem: Uint8Array;
    /** Redis 风格 KV 层：任意字符串 key → 任意类型值（不占地址空间） */
    kv: Map<string, any>;
    /** 设备区拦截器：addr -> device（模拟 mmap 概念） */
    devices: Map<number, RamDevice>;
    /** 设备掩码：只匹配 addr & mask === key 的设备（用于 $2000-$3FFF 镜像等） */
    deviceMask: Map<number, {
        mask: number;
        dev: RamDevice;
    }>;
    /** OAM 精灵缓冲 ($04A5 语义, 演出/HUD 精灵唯一出口) */
    oam: OamManager;
    /** 影子 OAM ($0468 语义, 场景精灵表唯一出口) */
    oamShadow: ShadowOam;
    /** H5 渲染出口精灵列表 (帧合成器消费) */
    sprites: SpriteEntry[];
    /** 实时调色板表 (BG×4 + SPR×4) */
    paletteTable: PaletteTable;
    /** NT0 网格 (32×30 tile) */
    nt0: NameTableEntry[][];
    /** NT1 网格 (32×30 tile) */
    nt1: NameTableEntry[][];
    /** 零页暂存 (256 bytes, 与 6502 兼容) */
    zp: Uint8Array;
    /** 滚动偏移 (pixel 单位) */
    scrollX: number;
    scrollY: number;
    constructor();
    /** 存任意类型值（Redis 风格）。key 为任意字符串，不走地址解析 */
    set(key: string, value: any): void;
    /** 取任意类型值。key 为任意字符串，不走地址解析 */
    get<T = any>(key: string): T | undefined;
    has(key: string): boolean;
    delete(key: string): boolean;
    /** 注册精确地址设备（$2000+ 寄存器区） */
    registerDevice(addr: number, dev: RamDevice): void;
    /** 注册掩码设备：addr & mask === key 时命中（如 PPU $2000-$3FFF 8 个寄存器镜像） */
    registerDeviceMask(mask: number, key: number, dev: RamDevice): void;
    unregisterAllDevices(): void;
    /** 解析 KV 键 / 地址为 16bit 地址：'ram_005E'|'$005E'|'0x005E'|0x005E → 0x005E */
    resolve(key: RamKey): number;
    /** 读一个字节。$0000-$1FFF 走 2KB 镜像；$2000+ 优先设备拦截。 */
    read(addr: RamKey): number;
    /** 写一个字节。$0000-$1FFF 走 2KB 镜像；$2000+ 优先设备拦截。 */
    write(addr: RamKey, val: number): void;
    /** 读 16bit 小端 */
    read16(addr: RamKey): number;
    /** 写 16bit 小端 */
    write16(addr: RamKey, val: number): void;
    /** 连续拷贝：把一段字节写入 RAM */
    copy(dst: RamKey, src: Uint8Array | number[], length: number): void;
    /** 连续读出：RAM 一段拷贝到目标数组 */
    slice(addr: RamKey, length: number): Uint8Array;
    /** 写 NT 入口 */
    writeNT(ntSelect: 0 | 1, tileX: number, tileY: number, entry: NameTableEntry): void;
    /** 读指定 NT 入口（调试用） */
    readNT(ntSelect: 0 | 1, tileX: number, tileY: number): NameTableEntry | null;
    /** 清空全部精灵 (委托 OamManager.reset) */
    clearOAM(): void;
    /** 写入单组 BG 调色板 */
    writeBgPalette(index: number, entry: PaletteEntry): void;
    /** 写入单组精灵调色板 */
    writeSprPalette(index: number, entry: PaletteEntry): void;
    /** 写单个精灵调色板颜色 */
    writeSprColor(palIdx: 0 | 1 | 2 | 3, colorIdx: 0 | 1 | 2 | 3, color: PaletteColor): void;
    /** 写单个 BG 调色板颜色 */
    writeBgColor(palIdx: 0 | 1 | 2 | 3, colorIdx: 0 | 1 | 2 | 3, color: PaletteColor): void;
    /** 批量替换调色板表 (深拷贝 PaletteColor, 防止共享源常量对象被原地修改) */
    setPaletteTable(table: PaletteTable): void;
    /** 清空 RAM 区（$0000-$1FFF）+ KV + 重置 NES 外设（NT/精灵/调色板/影子 OAM） */
    reset(): void;
    toJSON(): any;
    fromJSON(s: any): void;
}
/** 便捷工厂：一个独立的 2KB 工作 RAM（翻译版常用） */
export declare function createRamStore(): RamStore;
