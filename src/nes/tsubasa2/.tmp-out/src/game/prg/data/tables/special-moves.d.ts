/**
 * special-moves.ts — 角色必杀技表（从真 ROM 提取）
 *
 * 数据源（docs/rom-data-locations.md §5）：
 *   - 明星必杀技表 (7 项 × 2 byte)   ROM 0x8F00+
 *   - 名人必杀技表 (7 项 × 2 byte)   ROM 0x9200+
 *
 * 注：每角色 7 项为 Shot/Pass/Dribble/Block/Tackle/PassCut/Other 的 RAM/ROM 地址组合
 *
 * 重生：scripts/extract_special_moves.cjs
 */
/** 必杀技项：{ ramAddr, romAddr } 双地址 */
export interface SpecialMoveSlot {
    readonly ramAddr: number;
    readonly romAddr: number;
}
/** 角色必杀技集合（7 项） */
export interface PlayerSpecialMoves {
    readonly id: number;
    readonly name: string;
    readonly shot: SpecialMoveSlot;
    readonly pass: SpecialMoveSlot;
    readonly dribble: SpecialMoveSlot;
    readonly block: SpecialMoveSlot;
    readonly tackle: SpecialMoveSlot;
    readonly passCut: SpecialMoveSlot;
    readonly other: SpecialMoveSlot;
}
export declare const SPECIAL_MOVES_TABLE: ReadonlyArray<PlayerSpecialMoves>;
/** 按 ID 查必杀技集合 */
export declare function findSpecialMovesById(id: number): PlayerSpecialMoves | null;
