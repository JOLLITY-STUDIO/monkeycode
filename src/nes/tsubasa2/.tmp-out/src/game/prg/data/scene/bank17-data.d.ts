/**
 * bank17 数据 — 场景背景 NT 字节流（8KB / 98.5KB 已存在）
 *
 * 来源：bank17 区域。数据从 asm .byte 提取为声明式字节流。
 *
 * v2 翻译原则：
 *   - 只保留 BANK17_DATA_TABLES 作为唯一导出（其它 *_MAPS/_TAIL/_FULL 已删除）
 *   - 禁止 PRG_BANK_17[addr] / 硬件地址索引
 *   - 业务侧应通过具名查询函数（待 V0.5 提取覆盖）访问
 *
 * 翻译产物：具象化为具名 Scene 段待 V0.5 从原 ROM 解析覆盖。
 */
/** bank17 data_tables 主段（脚本字节流；待 V0.5 提取为具名 Scene 段） */
export declare const BANK17_DATA_TABLES: ReadonlyArray<number>;
/** bank17 data_maps 段 */
/** bank17 data_tail 段 */
/** bank17 全量数据（按原始布局拼接） */
