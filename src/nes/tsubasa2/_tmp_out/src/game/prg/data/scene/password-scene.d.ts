/**
 * PasswordSceneData — 密码界面场景数据
 * @bank 02 ($A000-$BFFF 窗口)
 *
 * 来源: asm/bank02/code_sub.s ($84C0 区) / code_data.s / data_tables.s
 * 职责: 密码界面 NT tile 块、精灵布局、文本脚本。
 *
 * 命名规范: 旧名 bank02 密码界面数据 → 新名 PasswordSceneData。
 */
/**
 * PASSWORD_NT_BLOCKS — 密码界面 NT 写块数据 (asm $AAxx 段)
 * 格式: [count][addrLo][addrHi][tile×count] ... 直到 count==0。
 * 与 $A82F 消费的块结构一致。
 */
export declare const PASSWORD_NT_BLOCKS: readonly [32, 0, 32, 32, 32, 143, 96, 63, 143, 32, 33, 30, 32, 65, 142, 96, 94, 142, 32, 66, 28, 32, 98, 141, 96, 125, 141, 32, 99, 26, 32, 131, 140, 96, 156, 140, 32, 132, 24, 32, 164, 139, 96, 187, 139, 32, 165, 22, 32, 197, 138, 96, 218, 138, 32, 198, 20, 32, 230, 137, 96, 249, 137, 32, 231, 18, 32, 7, 136, 224, 24, 136];
/**
 * PASSWORD_SPRITE_TABLE — 密码界面精灵布局 (asm $8A06 段)
 * 7 列 × 6 行假名网格的精灵槽定义, 每个 4 字节 (x, y, tile, attr)。
 */
export declare const PASSWORD_SPRITE_TABLE: readonly [];
export declare const PasswordSceneData: {
    readonly ntBlocks: readonly [32, 0, 32, 32, 32, 143, 96, 63, 143, 32, 33, 30, 32, 65, 142, 96, 94, 142, 32, 66, 28, 32, 98, 141, 96, 125, 141, 32, 99, 26, 32, 131, 140, 96, 156, 140, 32, 132, 24, 32, 164, 139, 96, 187, 139, 32, 165, 22, 32, 197, 138, 96, 218, 138, 32, 198, 20, 32, 230, 137, 96, 249, 137, 32, 231, 18, 32, 7, 136, 224, 24, 136];
    readonly spriteTable: readonly [];
};
export default PasswordSceneData;
