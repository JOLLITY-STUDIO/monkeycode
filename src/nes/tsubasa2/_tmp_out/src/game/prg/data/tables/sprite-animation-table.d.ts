/**
 * sprite-animation-table.ts — bank27 动画数据表 (声明式数组)
 * @bank 27 ($8000-$9FFF)  来源: docs/roms/Captain Tsubasa II - Super Striker (Japan).nes (PRG bank 27)
 *
 * bank27 代码 ($8104 动画数据加载 / $81DC 动画帧推进) 消费以下表 (地址均 $A000 基址):
 *   INDEX_A1DC        索引表 ($A1DC, LDA $A1DC,Y)  — 动画类型→tile 索引
 *   PTR_A6AD          指针表 ($A6AD, u16 LE, LDA $A6AE,X/$A6AD,X)
 *   PTR_AB65          指针表 ($AB65, u16 LE, LDA $AB66,X/$AB65,X)
 *   ANIM_PTR_A292     动画定义指针表 ($A292, 14 × u16 LE) — 索引=ram_05F3*2
 *   ANIM_FRAME_PTR_A42A 帧数据指针表 ($A42A, 32 × u16 LE) — 索引=流内帧码*2
 *   动画定义流: (时长, 帧码)* 终止 $FF; 帧数据流: (精灵数, 3B/精灵)* 终止 $00
 */
/** 索引表 $A1DC (32B) */
export declare const INDEX_A1DC: readonly number[];
/** 指针表 $A6AD (64B = 32 × u16 LE) */
export declare const PTR_A6AD: readonly number[];
/** 指针表 $AB65 (64B = 32 × u16 LE) */
export declare const PTR_AB65: readonly number[];
/** 动画定义指针表 $A292 (14 × u16 LE) */
export declare const ANIM_PTR_A292: readonly number[];
/** 帧数据指针表 $A42A (32 × u16 LE) */
export declare const ANIM_FRAME_PTR_A42A: readonly number[];
/** bank27 全字节 (8192B) */
export declare const SPRITE_ANIM_DATA_27: readonly number[];
