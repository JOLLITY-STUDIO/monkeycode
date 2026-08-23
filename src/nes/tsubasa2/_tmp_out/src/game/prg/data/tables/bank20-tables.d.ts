/**
 * Bank20Tables — bank20 比赛辅助数据表
 * @bank 20 ($8000-$9FFF / 运行时 $A000-$BFFF)
 *
 * 来源: asm/bank20/data_tables.s（从 ROM PRG bank20 提取）。
 * 消费方: MatchAuxService（计时状态机 / 计分板 / 精灵渲染）。
 *
 * 地址映射（bank20 窗口 $8000-$9FFF = 数组下标 0x0000-0x1FFF）:
 *   $8264 查表 6 字节（sub81EC 玩家数据区偏移基表）
 *   $82F6 查表 32 字节（sub82BC 计时数据映射表）
 *   $83A6 查表 8 字节（sub8381 队伍/计分板 tile 表）
 *   $885B 查表 6 字节（sub881D 精灵帧 tile 表）
 *   $88A8 精灵坐标字节表 40 字节（4 记录 × 10, sub8861 特殊精灵显示）
 *   $88D0 精灵 tile 查表 10 字节（sub8861）
 *   $88DA 精灵 X 偏移表（按比赛模式 & 0x0F 索引, sub8624）
 *   $88DF 精灵 Y 偏移表（按比赛模式 & 0x0F 索引, sub8624）
 *   $88E4 精灵组基址指针表（2 字节/项, sub80AA 精灵组设置）
 *   $88F0 球员→精灵索引表 16 字节（sub826A 球员数据查询）
 */
/** $8264 / $8265: sub81EC 玩家数据区偏移基表（6 字节, 索引 X） */
export declare const TABLE_8264: readonly number[];
/** $82F6: sub82BC 计时数据映射表（32 字节, 索引 X, $82E2 BPL 分支用） */
export declare const TABLE_82F6: readonly number[];
/** $83A6: sub8381 队伍/计分板 tile 表（8 字节） */
export declare const TABLE_83A6: readonly number[];
/** $885B: sub881D 精灵帧 tile 表（6 字节, 索引 Y） */
export declare const TABLE_885B: readonly number[];
/** $88A8: sub8861 精灵坐标字节表（4 记录 × 10 字节） */
export declare const TABLE_88A8: readonly number[];
/** $88D0: sub8861 精灵 tile 查表（10 字节, 索引 Y） */
export declare const TABLE_88D0: readonly number[];
/** $88DA: 精灵 X 偏移表（按比赛模式 & 0x0F 索引, 有效模式 0-4） */
export declare const TABLE_88DA: readonly number[];
/** $88DF: 精灵 Y 偏移表（按比赛模式 & 0x0F 索引, 有效模式 0-4） */
export declare const TABLE_88DF: readonly number[];
/** $88E4: 精灵组基址指针表（2 字节/项, 6 项, 指向 RAM 精灵组缓冲 $0547-$05B0） */
export declare const TABLE_88E4: readonly number[];
/** $88F0: 球员→精灵索引表（16 字节, 索引球员号） */
export declare const TABLE_88F0: readonly number[];
/** $8968: 计时指针表（2 字节/项, 索引计时器 id×2, sub800F 启动计时器查表） */
export declare const TABLE_TIMER_PTR_8968: readonly number[];
