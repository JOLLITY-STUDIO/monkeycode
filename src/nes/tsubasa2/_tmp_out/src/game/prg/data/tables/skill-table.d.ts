/**
 * SkillService 数据表 — 从 asm/bank16/*.s (data_tables.s / code_main.s / code_sub.s)
 * 的 .byte 段逐段提取的声明式数组。
 * @bank 16 ($A000-$BFFF 窗口)
 *
 * 说明: bank16 存储一套字节码驱动的必杀技/特殊动作脚本系统。
 * 翻译版禁止 PRG_BANK_16[addr] 裸地址随机访问, 一律使用本模块声明式数组。
 */
/**
 * 明星必杀 ROM 地址表 $89BF — 必杀技脚本入口指针表 (16-bit LE)。
 *
 * 对应 data_tables.s 开头 `LDA $05E3/ORA #$40/STA $05E3/LDA #$FF/RTS` (约 $89B4-$89BE)
 * 之后的指针表。每个元素是某必杀技动作脚本在 bank16 内的起始地址
 * (JSR $C509 之后的间接跳转目标, 配合 getMove() 的 moveId 索引)。
 *
 * 共 121 项 (索引 0-120)。值 0xFFFF 表示无 (空必杀)。
 */
export declare const STAR_SKILL_PTR_TABLE: readonly number[];
/**
 * 必杀技 7 类槽位索引 — 角色必杀技分配表 (每人 7 项×2B)。
 * 顺序对应 ROM 中角色必杀表每人的 7 个 2 字节槽位。
 */
export declare const SKILL_SLOT_INDEX: {
    readonly SHOT: 0;
    readonly PASS: 1;
    readonly DRIBBLE: 2;
    readonly ONE_TWO: 3;
    readonly BLOCK: 4;
    readonly TACKLE: 5;
    readonly PASS_CUT: 6;
};
/**
 * 必杀技定义查询表 $89BF (别名) — 由 getMove() 使用。
 * moveId 直接索引 STAR_SKILL_PTR_TABLE。
 *
 * @returns 该必杀技脚本在 bank16 内的起始 ROM 地址 (0xFFFF 表示无/空)。
 */
export declare function getMovePtr(moveId: number): number;
/**
 * 角色必杀技分配表 (占位/待补) — 每人 7 项×2B:
 * Shot / Pass / Dribble / 1-2 / Block / Tackle / PassCut。
 *
 * TODO: 从 asm/bank16 data_tables.s $8F00+ 区逐角色提取。
 * 每个元素 [shot, pass, dribble, oneTwo, block, tackle, passCut] 均为
 * 2 字节小端必杀技 ID (指向 STAR_SKILL_PTR_TABLE)。
 */
export declare const CHARACTER_SKILL_TABLE: readonly (readonly [number, number, number, number, number, number, number])[];
/**
 * 由角色号 (charIndex) 取该角色 7 个必杀槽位 (2 字节小端 ID)。
 * 未实现时返回 null。
 */
export declare function getCharacterSkills(charIndex: number): readonly number[] | null;
