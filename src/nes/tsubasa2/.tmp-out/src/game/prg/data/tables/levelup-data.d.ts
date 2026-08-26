/**
 * levelup-data.ts — 升级阈值 + 能力显示表（从真 ROM 提取）
 *
 * 数据源（docs/rom-data-locations.md §6）：
 *   - 真实体力显示 (16-bit LE 30 项)    ROM 0x39F1E
 *   - 真实能力显示 (byte 30 项)          ROM 0x39E5E
 *
 * 注：升级 exp 阈值近似 = 上级体力 × 10；精确升级阈需进一步反汇编 Stats Modifier。
 *
 * 重生：scripts/extract_levelup.cjs
 */
export interface LevelUpStatEntry {
    /** 等级（1-30） */
    readonly level: number;
    /** 升级到该等级所需累计经验（近似） */
    readonly expRequired: number;
    /** 6 项基础成长 (shot/dribble/pass/tackle/speed/stamina) */
    readonly growth: ReadonlyArray<number>;
    /** 该等级对应真实体力显示 */
    readonly staminaRaw: number;
    /** 该等级对应能力上限显示 */
    readonly abilityMax: number;
}
/** 升级表（等级 1-30，已从真 ROM 提取） */
export declare const LEVEL_UP_TABLE: ReadonlyArray<LevelUpStatEntry>;
