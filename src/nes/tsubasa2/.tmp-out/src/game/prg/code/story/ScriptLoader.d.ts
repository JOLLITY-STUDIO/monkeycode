/**
 * ScriptLoader — 剧情脚本数据装载
 *
 * V0.4 D2 落地: 从 BANK18_DATA_TABLES 装载脚本段。
 *
 * 真实脚本段布局（待 V0.4 进一步反汇编后细化）：
 *   - bank18 主存脚本数据流（每个段以 0xFF 终止）
 *   - bank03-bank10 故事脚本（按剧情切换）
 *   - bank19 故事相关 sprite/动画
 *
 * 当前实现：每段 = BANK18_DATA_TABLES 的一个 16KB 切片（按段 ID 索引），
 * 实际游戏中通过 IP 重置 + JumpSegment 跨段跳转。
 */
import type { DataStore } from '../../data/store/DataStore';
/** 脚本段（声明式数据） */
export interface ScriptSegment {
    /** 段 ID */
    readonly id: number;
    /** 指令流（opcode + 操作数） */
    readonly bytes: ReadonlyArray<number>;
}
export declare class ScriptLoader {
    readonly store: DataStore;
    constructor(store: DataStore);
    /** 按段 ID 装载（V0.4 已实现：返回 BANK18 切分段） */
    loadSegment(scriptId: number): ScriptSegment | null;
    /** 全部段清单（按 BANK18 切片） */
    listSegments(): ReadonlyArray<number>;
    /** 段字节长度 */
    segmentLength(scriptId: number): number;
}
