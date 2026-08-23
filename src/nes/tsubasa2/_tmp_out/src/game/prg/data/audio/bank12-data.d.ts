/**
 * bank12 — 音频引擎数据 (NES APU BGM/SE 引擎)
 * @bank 12 ($8000-$9FFF)
 *
 * 从 ROM 提取的完整 8192 字节 (bank12 偏移 0x10 + 12*0x2000)。
 * 含: SE 指针表 ($8BDA) + SE 数据块 ($8E42-$9EDC) + 包络表 + 音符表。
 *
 * 数据源选择 (与原版 MMC3 bank 切换等价):
 *   SE  音序: BANK12_DATA[addr - 0x8000]   (bank12 内部 $8E42+)
 *   BGM 音序: BANK13/14/15_DATA[addr - 0xA000] (R7 窗口, 由 $07FC 决定)
 */
export declare const BANK12_DATA: readonly number[];
/**
 * $8269 跳转表 (sub8257 音符分派, 8 项 × 2B LE 地址)。
 * 索引 = ($07C7,X << 1) & 0xFF → 右移 1 取项, 对应 targets:
 *   [$8297, $8297, $82B4, $82C9, $82B4, $8297, $8297, $827D]
 */
export declare const JUMP_TABLE_8269: readonly number[];
/**
 * $82E4 跳转表 (sub82D2 音符分派, 8 项 × 2B LE 地址)。
 *   [$830E, $832B, $8340, $832B, $830E, $82F4, $8309, $82F4]
 */
export declare const JUMP_TABLE_82E4: readonly number[];
/**
 * $84DA 命令分发表 (16 项 × 2B LE JMP 目标, 对应 E0-EF)。
 * 项: E0=$8544 E1=$8707 E2=$8641 E3=$855F E4=$8617 E5=$8670
 *     E6=$8707 E7=$8707 E8=$8578 E9=$8585 EA=$85AF EB=$85C6
 *     EC=$85EF ED=$8681 EE=$8707 EF=$8690
 */
export declare const DISPATCH_TABLE_84DA: readonly number[];
/**
 * $870D 频率表 (12 项 × 2B LE, 音高索引 → APU period)。
 * 索引 0-11: $06AE/$064E/$05F3/$059E/$054D/$0501/$04B9/$0475/$0435/$03F8/$03BF/$0389
 */
export declare const FREQ_TABLE_870D: readonly number[];
/**
 * $8725 时长表 (DUR, 音符索引 → 帧数, 1 字节/项, 有效 0x00-0x2F)。
 * 索引 0x30+ 是后续数据重叠, 不用。
 */
export declare const DUR_TABLE_8725: readonly number[];
/**
 * $8754 包络指针表 (每项 2B LE → 包络数据)。
 * 包络数据以 $FF 结尾的序列, 每项 [decay, value] 对。
 */
export declare const ENV_PTR_TABLE_8754: readonly number[];
/**
 * $8BDA SE 指针表 (seId → bank12 内指针, 每项 2B LE)。
 * seId 1-0x1F 有效, 哨兵 $FF00 结束。
 * 索引: sub8349 用 (id-1)*2 查表。
 */
export declare const SE_PTR_TABLE_8BDA: readonly number[];
/** bank12 完整 8192B 的默认导出 (DataStore 可用) */
export default BANK12_DATA;
