/**
 * bank28-tables.ts — bank28 数据表 (从 ROM 提取)
 * @bank 28 — 比赛对阵/阵型/等级/OAM 配置数据
 *
 * 偏移 = 反汇编地址 - $8000 (bank28 物理偏移)。
 * $BAB2 表在 bank29 偏移 $1AB2 (运行时 $BAB2, bank28 $8B41 引用)。
 *
 * 供 MatchConfigService 消费, 禁止裸地址访问。
 */
/** 球员属性偏移表 ($818E, 11B) — $803A: Y=(A-$0B) */
export declare const TBL_818E: readonly number[];
/** 属性数据偏移 ($8199, 2×16bit) — $8086 ADC $8199,Y */
export declare const TBL_8199: readonly number[];
/** 位置查表 ($8206, 29B) — $81BB LDX $8206,Y */
export declare const TBL_8206: readonly number[];
/** 位置查表 ($824C, 15B) — $822F LDX $824C,Y */
export declare const TBL_824C: readonly number[];
/** 位置查表 ($82C0, 11B) — $829C LDX $82C0,Y */
export declare const TBL_82C0: readonly number[];
/** 队伍侧判断表 ($8528, 8B) — $850E CMP $8528,X */
export declare const TBL_8528: readonly number[];
/** 阵型类型表 ($8604, 4B) — $85BC LDY $8604,X */
export declare const TBL_8604: readonly number[];
/** 阵型表 ($86B5, 5B) — $8656 LDA $86B5,Y */
export declare const TBL_86B5: readonly number[];
/** 阵型表 ($87C3, 4B) — $8766 LDA $87C3,Y */
export declare const TBL_87C3: readonly number[];
/** 属性角色表 ($8A9D, 22B) — $8A6F LDY $8A9D,X (X=$0441/$0442) */
export declare const TBL_8A9D: readonly number[];
/** 角度表 ($8B9E, 8×16bit) — $8AC8 CMP $8B9E,X */
export declare const TBL_8B9E: readonly number[];
/** 角度表 ($8BBE, 6×16bit) — $8682/$8790 CMP $8BBE,X */
export declare const TBL_8BBE: readonly number[];
/** 阵型数据指针表 ($8E1B, 8×16bit) — $8DD7 LDX $8E1B,X */
export declare const TBL_8E1B: readonly number[];
/** 属性调整分派表 ($8C87, 32×16bit) — $8C84 JSR $C509 */
export declare const TBL_8C84: readonly number[];
/** 等级设置分派表 ($8C3E, 4×16bit) — $8C3B JSR $C509 */
export declare const TBL_8C3B: readonly number[];
/** OAM分派表 ($8DA0, 4×16bit) — $8D9D JSR $C509 */
export declare const TBL_8D9D: readonly number[];
/** 阵型数据指针表A ($9460, 10×16bit) — $81CF LDA $9460,X */
export declare const TBL_9460: readonly number[];
/** 阵型数据指针表B ($9554, 5×16bit) — $823F LDA $9554,X */
export declare const TBL_9554: readonly number[];
/** 阵型数据指针表C ($959E, 10×16bit) — $82AE LDA $959E,X */
export declare const TBL_959E: readonly number[];
/** 数值表 ($9E4E, 192B=0xC0项) — $8030/$8285 LDA $9E4E,Y/X */
export declare const TBL_9E4E: readonly number[];
/** 队伍数据指针表 (bank29 偏移$1AB2=$BAB2, 32×16bit) — $8B41 LDA $BAB2,X */
export declare const TBL_BAB2: readonly number[];
/** 阵型后续分派表 ($86AF, 4×16bit) — $86AC JSR $C509 */
export declare const TBL_86AF: readonly number[];
/** 阵型后续分派表2 ($86C0, 4×16bit) — $86BD JSR $C509 */
export declare const TBL_86C0: readonly number[];
/** 阵型后续分派表3 ($86F1, 4×16bit) — $86EE JSR $C509 */
export declare const TBL_86F1: readonly number[];
/** 阵型后续分派表4 ($8716, 4×16bit) — $8713 JSR $C509 */
export declare const TBL_8716: readonly number[];
/** 阵型分派表5 ($87BD, 3×16bit) — $87BA JSR $C509 */
export declare const TBL_87BD: readonly number[];
/** 阵型分派表6 ($87CD, 6×16bit) — $87CA JSR $C509 */
export declare const TBL_87CD: readonly number[];
/** 阵型分派表7 ($88E0, 4×16bit) — $88DD JSR $C509 */
export declare const TBL_88DD: readonly number[];
/** 阵型分派表8 ($8903, 4×16bit) — $8900 JSR $C509 */
export declare const TBL_8900: readonly number[];
/** 阵型分派表9 ($8956, 4×16bit) — $8953 JSR $C509 */
export declare const TBL_8956: readonly number[];
/**
 * ===== 补充数据区 (2026-08-22 提取, 供 MatchConfigService 完整翻译) =====
 */
/** 阵容显示 tile 数据 ($834A-$8469, 0x120B) — $82CA/$830A 读 ($0061),Y 0x18B×12 写 $04A5 */
export declare const DATA_LINEUP_834A: readonly number[];
/** 阵型指针 2D 表 ($8E2B-$945F, 16B/行) — sub8DC9 经 TBL_8E1B 指针 + LDA($0048),Y 读 16bit */
export declare const DATA_FPTR_8E2B: readonly number[];
/** 阵型数据区 ($9474-$95D5, 覆盖 $9474/$9500/$955E/$95B2 等指针目标) — $819D/$8224/$828F 经 TBL_9460/9554/959E 读 */
export declare const DATA_FORM_9474: readonly number[];
/** 属性数据 ($95D6-$9E4D) — sub803A 基址 $95D6/$9662 + ($0032),Y */
export declare const DATA_ATTR_95D6: readonly number[];
/** 属性尾表 ($9FCE-$9FFF) — sub803A A==1F 基址 $9FCE + $9FF0 调色板尾 */
export declare const DATA_9FCE: readonly number[];
/** bank29 属性数据 ($AE86-$AFFF, bank内偏移$0E86) — sub803A A==0/$0B/$1E 基址 $AE86; 物理ROM=0x3AE96=GK能力值区 */
export declare const DATA_AE86: readonly number[];
export declare const BANK28_EXTRA: {
    readonly DATA_LINEUP_834A: readonly number[];
    readonly DATA_FPTR_8E2B: readonly number[];
    readonly DATA_FORM_9474: readonly number[];
    readonly DATA_ATTR_95D6: readonly number[];
    readonly DATA_9FCE: readonly number[];
    readonly DATA_AE86: readonly number[];
};
export declare const BANK28_TABLES: {
    readonly TBL_818E: readonly number[];
    readonly TBL_8199: readonly number[];
    readonly TBL_8206: readonly number[];
    readonly TBL_824C: readonly number[];
    readonly TBL_82C0: readonly number[];
    readonly TBL_8528: readonly number[];
    readonly TBL_8604: readonly number[];
    readonly TBL_86B5: readonly number[];
    readonly TBL_87C3: readonly number[];
    readonly TBL_8A9D: readonly number[];
    readonly TBL_8B9E: readonly number[];
    readonly TBL_8BBE: readonly number[];
    readonly TBL_8E1B: readonly number[];
    readonly TBL_8C84: readonly number[];
    readonly TBL_8C3B: readonly number[];
    readonly TBL_8D9D: readonly number[];
    readonly TBL_9460: readonly number[];
    readonly TBL_9554: readonly number[];
    readonly TBL_959E: readonly number[];
    readonly TBL_9E4E: readonly number[];
    readonly TBL_BAB2: readonly number[];
    readonly TBL_86AF: readonly number[];
    readonly TBL_86C0: readonly number[];
    readonly TBL_86F1: readonly number[];
    readonly TBL_8716: readonly number[];
    readonly TBL_87BD: readonly number[];
    readonly TBL_87CD: readonly number[];
    readonly TBL_88DD: readonly number[];
    readonly TBL_8900: readonly number[];
    readonly TBL_8956: readonly number[];
};
