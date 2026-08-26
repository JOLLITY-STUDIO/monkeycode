/**
 * 技能数据表（声明式表结构）
 *
 * 从 asm 必杀技数据段提取真实字节，含：
 * - 技能匹配表（触发值/技能索引映射）
 * - 必杀技触发值表（4 字节）
 * - 球员-必杀技映射表
 * - 必杀技指针表（lo/hi 拆字节：值为原始字节布局，H5 调用时拼回 16-bit）
 * - 全量数据表字节流
 */
/** 技能表条目 */
export interface SkillEntry {
    readonly moveId: number;
    readonly name: string;
    readonly power: number;
    readonly players: ReadonlyArray<number>;
    readonly actionOffset: number;
}
/**
 * 技能匹配表（8 项 × 2 字节）
 * 每项：[matchValue, skillIndex]
 */
export declare const SKILL_MATCH_TABLE: ReadonlyArray<{
    readonly matchValue: number;
    readonly skillIndex: number;
}>;
/**
 * 必杀技触发值表（4 字节）
 * 检查 ram_043C & 0x7F 是否匹配
 */
export declare const SKILL_TRIGGER_TABLE: ReadonlyArray<number>;
/**
 * 球员-必杀技映射表（17 字节）
 * 索引 = 动作 ID，值 = 必杀技 ID
 */
export declare const SKILL_MOVE_ID_TABLE: ReadonlyArray<number>;
/**
 * 必杀技动作脚本偏移表
 * 每条 1 项：target = 动作脚本在 BANK16_DATA_TABLES 中的字节偏移（已合并 16-bit LE，禁 lo/hi 拆分）
 *
 * Service 用法：entry.target 直接索引到 BANK16_DATA_TABLES[entry.target]，
 *              无 16-bit 拼装、无硬件仿真。
 */
export declare const SKILL_POINTER_TABLE: ReadonlyArray<{
    readonly id: number;
    readonly target: number;
}>;
/** 全量数据表字节流（data_tables 原始字节） */
export declare const BANK16_DATA_TABLES: ReadonlyArray<number>;
/** bank16 code_data 段（内联数据） */
export declare const BANK16_CODE_DATA: ReadonlyArray<number>;
export declare const SKILL_TABLE: ReadonlyArray<SkillEntry>;
export declare function findSkillByMoveId(moveId: number): SkillEntry | null;
export declare function findSkillsByPlayer(playerId: number): number[];
