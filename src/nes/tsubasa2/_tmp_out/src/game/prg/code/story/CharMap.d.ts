export declare class CharMap {
    /** 双 tile 表 */
    static readonly DOUBLE: Record<number, readonly number[]>;
    /**
     * 字符解码 (原 $88CA 字符处理)
     * @returns 双 tile 图案 [tile0, tile1], 或单 tile 图案 [code]
     */
    static decode(code: number): readonly number[];
    /** 双 tile 基址常量 */
    static readonly DOUBLE_TILE_BASE = 148;
    static readonly DOUBLE_TILE_COUNT = 96;
    static readonly DOUBLE_TILE_THRESHOLD = 160;
}
export declare function decodeChar(code: number): readonly number[];
export default CharMap;
