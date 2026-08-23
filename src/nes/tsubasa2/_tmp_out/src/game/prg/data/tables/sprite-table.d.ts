/**
 * sprite-table.ts — bank22 精灵生成数据表 (声明式数组)
 * @bank 22 ($8000-$9FFF)  来源: docs/roms/Captain Tsubasa II - Super Striker (Japan).nes (PRG bank 22)
 *
 * bank22 入口 $8003: 读精灵描述符 ($003C) → 查模板指针表 → 解码模板流 → 写 OAM ($0200)。
 * 数据引用 (code_main.s):
 *   DISP_81D2         位移表 X ($81D2, 40B)  — Y 位移 (LDA $81D2,X)
 *   DISP_81FA         位移表 X ($81FA, 64B)  — X 位移 (LDA $81FA,X)
 *   TEMPLATE_PTR_8280 模板指针表 ($8280, u16 LE) — 索引 = 描述符($003C)+$12 字节 ASL
 *   模板流数据: 见 SPRITE_DATA_22 全字节 (模板指针指向的流)
 */
/** 位移表 $81D2 (40B) */
export declare const DISP_81D2: readonly number[];
/** 位移表 $81FA (64B) */
export declare const DISP_81FA: readonly number[];
/** 模板指针表 $8280 (47 × u16 LE) */
export declare const TEMPLATE_PTR_8280: readonly number[];
/** bank22 全字节 (8192B) */
export declare const SPRITE_DATA_22: readonly number[];
