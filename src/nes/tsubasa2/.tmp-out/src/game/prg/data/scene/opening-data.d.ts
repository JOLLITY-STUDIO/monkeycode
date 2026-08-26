/**
 * Opening 开场数据表（声明式，来源：场景装载/调色板/CHR 配置/渐显查找的 .byte 数据区）
 *
 * 数据布局：
 *   场景表（场景装载，19 字节/项 × 16 项）
 *   BG 调色板（16 组 × 16 字节）
 *   SPR 调色板（16 组 × 16 字节）
 *   CHR 指针表（16-bit 指针 × 32 项）
 *   渐显查找表（64 字节）
 */
/** 6 字节 CHR 配置：[0,1]=param, [2]=bgPalIdx+flag, [3]=宽, [4]=高, [5]=nametable 基址编码 */
export type ChrConfig = readonly [number, number, number, number, number, number];
/** 场景数据项：文本滚动标志 + 滚动计数器等（场景装载拷贝目标） */
export interface OpeningSceneEntry {
    /** 场景号 0-15 */
    readonly id: number;
    /** $0079 文本滚动标志/位置 */
    readonly scrollFlag: number;
    /** 18 字节 → ram_007C..ram_008D */
    readonly data: readonly number[];
}
/**
 * 场景表（19 字节/项）。
 * 场景装载：[0]→ram_0079，[1..18]→ram_007C..ram_008D。
 */
export declare const OPENING_SCENE_TABLE: readonly OpeningSceneEntry[];
/**
 * bank06 BG 调色板表（CPU $B000，16 组 × 16 字节）。
 * 原版 $9AB8：BG = $B000 + $0048*16 → ram_062A（16 字节）。
 * 索引 0x0F=透明，0x30=黑；为 NES 原始 6-bit 色值。
 */
export declare const OPENING_BG_PALETTES: readonly (readonly number[])[];
/**
 * bank06 SPR 调色板表（CPU $B300，16 组 × 16 字节）。
 * 原版 $9ADA：SPR = $B300 + $0049*16 → ram_063A（16 字节）。
 */
export declare const OPENING_SPR_PALETTES: readonly (readonly number[])[];
/**
 * bank07 CHR 指针表（CPU $A000，106 项 16-bit 指针）。
 * 原版 $8AF7：ptr = [$A000 + 集合号*2]（无掩码，configId×2 直读）；ptr 指向该集合的 6 字节 CHR 配置。
 * 开场使用集合 0x17（第 24 项）；Scene11/12/13 分别使用 0x10/0x30/0x20。
 */
export declare const OPENING_CHR_POINTER_TABLE: readonly number[];
/**
 * bank00 渐显查找表（CPU $9EA2，64 字节）。
 * 原版 $9A71/$9AA2：new = $9EA2[(pal & 0x30) + fade] | (pal & 0x0F)。
 * fade=15 满渐显 → 高半字节回原色；fade=0 → 0x0F（黑）。
 */
export declare const OPENING_FADE_TABLE: readonly number[];
/** 开场 CHR 配置（bank7，$8AF7 读取；106 项 × 6 字节，无掩码直读 configId） */
export declare const OPENING_CHR_CONFIGS: readonly (readonly number[])[];
/** 场景 3 的 tile 数据（6 列 × 8 行 = 48 字节，按行优先） */
export declare const OPENING_SCENE3_TILES: readonly number[];
/**
 * 场景 0 Tecmo logo NT 数据（模拟器逐帧 dump 提取，f11+ 稳定态精确行列）
 *
 * 真实 ROM 时序（emu f1-f30 实证）：
 *   - f9  首次出现 NT0：行12/13 前 7 tile + 行15 前 2 tile = 16 tile，fade=0 全黑
 *   - f11 NT0 完整 25 tile（本表全量），fade=1
 *   - f13 fade=3 彩色可见（画面出现）；f25 fade=15 满亮
 *
 * 每个 tile 值 = 8-bit nametable tile 索引（BG $0000 CHR bank0，tile 0x00-0x3F）。
 */
export interface LogoNtRow {
    /** NT 行号（0-29） */
    readonly row: number;
    /** 起始列（0-31） */
    readonly col: number;
    /** step0（f9 首次出现）写入的 tile 数，其余在 step1（f11 完整）补齐 */
    readonly step0Len: number;
    /** 该行完整 tile 序列 */
    readonly tiles: readonly number[];
}
export declare const OPENING_SCENE0_LOGO_ROWS: readonly LogoNtRow[];
/** 场景 3 的 17 字节 pattern 表（bank8 $A000+tile*17；[0]=attr, [1..16]=4×4 nametable tile 索引） */
export declare const OPENING_TILE_PATTERNS: readonly (readonly number[])[];
