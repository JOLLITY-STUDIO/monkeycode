/**
 * bank06 场景表（CPU $BF00，16 项 × 19 字节 = 304 字节）
 *
 * 数据源：bank06 偏移 0x1F00-0x1FBD（实际 10 项） + 0x1FBE 之后 0xFF 填充（哨兵 6 项）
 * [0]→scrollFlag，[1..18]→场景 18 字节（OPENING_SCENE_TABLE 复用）
 * 消费方：RenderingPrimitivesService.loadSceneData
 */
export interface OpeningSceneEntry {
    /** 场景号 0-15 */
    readonly id: number;
    /** scene.scrollFlag (ram_0079) */
    readonly scrollFlag: number;
    /** 18 字节 (ram_007C..ram_008D) */
    readonly data: ReadonlyArray<number>;
}
export declare const BANK6_SCENE_TABLE: ReadonlyArray<OpeningSceneEntry>;
