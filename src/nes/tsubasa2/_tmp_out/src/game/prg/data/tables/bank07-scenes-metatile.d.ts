/**
 * BANK07_TABLES — bank07 场景数据表 ($8000-$9FFF, 运行时 $A000-$BFFF)
 * @bank 07
 *ank07 的数据不是 NT 本身，是场景描述数据（scene descriptor），里面包含 metatile 布局。

metatile = 元图块，是 NES 游戏常见的压缩技术：把 4 个 8×8 tile 组合成一个 16×16 的"大图块"，用 1 个字节索引代表 4 个 tile。这样 32×30 的 NT（960 字节）可以用 16×15 的 metatile 表（240 字节）压缩。
 * 来源: asm/bank07/_full.s
 * 24 个场景, 每个场景独立导出 (SCENE_0x00 ~ SCENE_0x17)。
 *
 * 每个场景数据格式:
 *   [0]=ptrLo, [1]=ptrHi, [2]=ctrl(palette|dir), [3]=w, [4]=h, [5]=pos
 *   后续 NT tile + 调色板 + 精灵数据
 *   $00,$A0=分隔符, $3C,$3E=NT区块, $5C,$5E=调色板, $60,$62=精灵
 */
/**
 * SCENE_PTR_TABLE — 24 项场景入口指针表 (小端 16 位)
 */
export declare const SCENE_PTR_TABLE: readonly [41172, 41183, 41255, 41279, 41296, 41316, 41332, 41360, 41377, 41417, 41457, 41514, 41531, 41588, 41604, 41620, 41636, 41660, 41684, 41708, 41732, 41756, 41783, 41843];
/** 场景 0x00 (11 字节, 指针 $A0D4) */
export declare const SCENE_0x00: readonly number[];
/** 场景 0x01 (72 字节, 指针 $A0DF) */
export declare const SCENE_0x01: readonly number[];
/** 场景 0x02 (24 字节, 指针 $A127) */
export declare const SCENE_0x02: readonly number[];
/** 场景 0x03 (17 字节, 指针 $A13F) */
export declare const SCENE_0x03: readonly number[];
/** 场景 0x04 (20 字节, 指针 $A150) */
export declare const SCENE_0x04: readonly number[];
/** 场景 0x05 (16 字节, 指针 $A164) */
export declare const SCENE_0x05: readonly number[];
/** 场景 0x06 (28 字节, 指针 $A174) */
export declare const SCENE_0x06: readonly number[];
/** 场景 0x07 (17 字节, 指针 $A190) */
export declare const SCENE_0x07: readonly number[];
/** 场景 0x08 (40 字节, 指针 $A1A1) */
export declare const SCENE_0x08: readonly number[];
/** 场景 0x09 (40 字节, 指针 $A1C9) */
export declare const SCENE_0x09: readonly number[];
/** 场景 0x0A (57 字节, 指针 $A1F1) */
export declare const SCENE_0x0A: readonly number[];
/** 场景 0x0B (17 字节, 指针 $A22A) */
export declare const SCENE_0x0B: readonly number[];
/** 场景 0x0C (57 字节, 指针 $A23B) */
export declare const SCENE_0x0C: readonly number[];
/** 场景 0x0D (16 字节, 指针 $A274) */
export declare const SCENE_0x0D: readonly number[];
/** 场景 0x0E (16 字节, 指针 $A284) */
export declare const SCENE_0x0E: readonly number[];
/** 场景 0x0F (16 字节, 指针 $A294) */
export declare const SCENE_0x0F: readonly number[];
/** 场景 0x10 (24 字节, 指针 $A2A4) */
export declare const SCENE_0x10: readonly number[];
/** 场景 0x11 (24 字节, 指针 $A2BC) */
export declare const SCENE_0x11: readonly number[];
/** 场景 0x12 (24 字节, 指针 $A2D4) */
export declare const SCENE_0x12: readonly number[];
/** 场景 0x13 (24 字节, 指针 $A2EC) */
export declare const SCENE_0x13: readonly number[];
/** 场景 0x14 (24 字节, 指针 $A304) */
export declare const SCENE_0x14: readonly number[];
/** 场景 0x15 (27 字节, 指针 $A31C) */
export declare const SCENE_0x15: readonly number[];
/** 场景 0x16 (60 字节, 指针 $A337) */
export declare const SCENE_0x16: readonly number[];
/** 场景 0x17 (3198 字节, 指针 $A373) */
export declare const SCENE_0x17: readonly number[];
/** 场景名映射 (idx → 场景数据) */
export declare const SCENES: readonly [readonly number[], readonly number[], readonly number[], readonly number[], readonly number[], readonly number[], readonly number[], readonly number[], readonly number[], readonly number[], readonly number[], readonly number[], readonly number[], readonly number[], readonly number[], readonly number[], readonly number[], readonly number[], readonly number[], readonly number[], readonly number[], readonly number[], readonly number[], readonly number[]];
/** 按场景 ID 获取场景数据 */
export declare function getSceneData(sceneId: number): readonly number[] | null;
declare const _default: {
    SCENE_PTR_TABLE: readonly [41172, 41183, 41255, 41279, 41296, 41316, 41332, 41360, 41377, 41417, 41457, 41514, 41531, 41588, 41604, 41620, 41636, 41660, 41684, 41708, 41732, 41756, 41783, 41843];
    SCENES: readonly [readonly number[], readonly number[], readonly number[], readonly number[], readonly number[], readonly number[], readonly number[], readonly number[], readonly number[], readonly number[], readonly number[], readonly number[], readonly number[], readonly number[], readonly number[], readonly number[], readonly number[], readonly number[], readonly number[], readonly number[], readonly number[], readonly number[], readonly number[], readonly number[]];
    getSceneData: typeof getSceneData;
};
export default _default;
