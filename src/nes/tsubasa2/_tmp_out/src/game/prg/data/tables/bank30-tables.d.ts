/**
 * Bank30Tables — bank30/bank31 辅助数据表
 * @bank 30 ($FBCC 数据实际在固定 bank31, $E000 窗口 offset $1BCC)
 *
 * $FBCC 调色板表: 32 组 × 12 字节。消费方: HardwareInitService.subC530 ($C530→$CC02)
 * 源地址 = $FBCC + A*12 (A = 调色板组索引), 拷贝到 $046F+X (X = 目标调色板偏移)。
 * 语义: 16 次循环, X&3==0 写 $0F (透明黑), 其余读源 (Y 回绕 256→$0F 保护),
 *       结束 $046C=0x20 (下一精灵批计数基址)。
 */
/** $FBCC 调色板表 (32 组 × 12 字节, 来自固定 bank31) */
export declare const PALETTE_TABLE_FBCC: readonly number[];
/** 按组索引取 12 字节源调色板 */
export declare function getPaletteTableFBCC(group: number): readonly number[];
/** 按组索引+字节偏移取单个源字节 (越界返回 $0F) */
export declare function getPaletteByteFBCC(group: number, idx: number): number;
