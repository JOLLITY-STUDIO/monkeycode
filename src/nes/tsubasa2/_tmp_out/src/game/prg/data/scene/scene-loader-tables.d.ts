/**
 * scene-loader-tables — 场景数据装载器指针表 ($9085 消费)
 * @bank 09 / 10 (+ bank6 $B800 调色板动画表, $82ED 装载器消费)
 *
 * 来源: 从 ROM 提取 (PRG 偏移 = 16 + bank*0x2000), 与 asm data_tables.s 对照。
 * 每项 16 位 LE 指针 = 运行时 $A000 窗口地址; 指针不在 $A000-$BFFF 则表结束。
 *
 * 消费方:
 *   - $9085 场景数据装载器 (GameSystemService.sub9085): 段字节 < $6D → bank9 表,
 *     ≥ $6D → (byte-$6D) → bank10 表; 查表得数据流地址 → 复制 $978B 模板到 $0568 buffer。
 *   - $82ED 装载器 (GameSystemService.sub82EC): ram_004C ASL 索引 bank6 $B800 表,
 *     数据流 = BG 调色板动画 ($FE 帧分隔 / $FF 结束)。
 */
export declare const BANK9_SCENE_PTR_TABLE: readonly number[];
export declare const BANK10_SCENE_PTR_TABLE: readonly number[];
/** bank6 $B800 — BG 调色板动画流指针表 (21 项, idx = ram_004C) */
export declare const BANK6_B800_PAL_ANIM_TABLE: readonly number[];
/** bank6 $B800 — 调色板动画数据流 (idx = ram_004C, $82ED 装载器消费, $FE=帧分隔 $FF=结束) */
export declare const BANK6_B800_STREAMS: readonly (readonly number[])[];
