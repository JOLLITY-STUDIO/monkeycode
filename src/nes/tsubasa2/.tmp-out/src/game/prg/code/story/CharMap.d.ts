/**
 * CharMap — 字符集映射（ASCII/日文假名/汉字两套表）
 *
 * 行为翻译（bank19 数据 + char-rom）：
 * - charByte(charCode) → tile 索引
 * - 多套映射表：A 半角（ASCII+假名）、B 全角（汉字/全角假名）
 * - 字符不在映射中时返回 ' '（空格 tile）
 *
 * 关键数据：
 * - bank19/code_main.s 头部 ~4KB 是字符 tile 索引表（每个 byte = 一个字符对应 tile）
 * - 字幕/对话框文字按字符序列写在 BANK18_DATA_TABLES 中
 *
 * 当前：V0.4 落地。
 *   - 提供 ASCII fallback（Space 32 = tile 0, A-Z = 33-58 等）
 *   - register() 批量注入（剧情脚本 / 字幕表 启动时一次性注入）
 *   - registerTable() 支持 ReadonlyArray<[charCode, tile]>
 */
export declare class CharMap {
    /** 字符 → tile 号映射 */
    private readonly map;
    constructor();
    /**
     * 默认初始化：ASCII 32..127 映射到对应 tile 偏移。
     * 真实项目应从 BANK19 字符索引表覆盖。
     */
    private initDefault;
    /** 注册单条映射（供数据表注入） */
    register(charCode: number, tile: number): void;
    /** 批量注册（剧情脚本 / 字幕表 启动时一次性注入） */
    registerTable(entries: ReadonlyArray<readonly [number, number]>): void;
    /** 字符 → tile（未注册返回 0 空格 tile） */
    toTile(charCode: number): number;
    /** 一段文本 → tile 序列 */
    toTiles(text: ReadonlyArray<number>): number[];
    /** 注册数量 */
    get size(): number;
}
