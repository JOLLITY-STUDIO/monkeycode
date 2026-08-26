/**
 * RAM 初始化表 — Reset 序列（RAM 清零 → CTRL/MASK/bank 基址 → IRQ 计数器）
 */
export declare const RAM_INIT_TABLE: ReadonlyArray<{
    addr: number;
    value: number;
}>;
/** OAM 隐藏值（Y=$F8 隐藏） */
export declare const OAM_HIDE_VALUE = 248;
/** 游戏 RAM 再初始化（$0001-$0016 与 $0400-$04A4 系列） */
export declare const GAME_RAM_CLEAR_TABLE: ReadonlyArray<{
    addr: number;
    value: number;
}>;
