/**
 * SkillService — 技能/必杀技判定
 *
 * 行为翻译（去 CPU 化）：
 * - 加载技能动作序列：selector 查 SKILL_POINTER_TABLE → 返回 16 位动作序列地址
 * - 解析动作序列段：读取序列字节 → actionType/targetX/targetY/param
 * - 查找球员可用必杀技：findSkillsByPlayer
 * - 检查必杀技触发：SKILL_TRIGGER_TABLE 4 项匹配
 * - 查找必杀技动作 ID：SKILL_MOVE_ID_TABLE 查表
 * - 技能查询（byMoveId）：findSkillByMoveId
 *
 * bank 切换 = import SkillService + 直接调用方法，无 MMC3 窗口模拟。
 */
import type { DataStore } from '../../data/store/DataStore';
/** 技能触发请求 */
export interface SkillTriggerRequest {
    /** 当前球员索引 */
    readonly playerIdx: number;
    /** 技能选择值 */
    readonly selector: number;
    /** 技能状态标志 */
    readonly flags: number;
}
/** 技能动作执行结果 */
export interface SkillActionResult {
    readonly actionType: number;
    readonly targetX: number;
    readonly targetY: number;
    readonly param: number;
}
export declare class SkillService {
    readonly store: DataStore;
    constructor(store: DataStore);
    /**
     * 加载技能动作序列：selector 查 SKILL_POINTER_TABLE → 返回动作脚本字节偏移。
     * 已消除 lo/hi 拆分：entry.target 是单个 16-bit number。
     */
    loadSkillSequence(selector: number): number;
    /**
     * 解析动作序列段：读取序列字节 → actionType/targetX/targetY/param。
     * $F0+ 为扩展标记 → 调用对应处理例程后继续循环。
     */
    parseSkillSegment(): SkillActionResult | null;
    /** 查找球员可用的必杀技 */
    findPlayerSkills(playerId: number): number[];
    /**
     * 检查必杀技触发：SKILL_TRIGGER_TABLE 4 项匹配。
     * 检查 moveId & 0x7F 是否在触发表中。
     */
    checkSkillTrigger(moveId: number): boolean;
    /** 查找必杀技动作 ID：SKILL_MOVE_ID_TABLE 查表 */
    findSkillActionId(actionValue: number): number | null;
    /** 技能查询（byMoveId） */
    byMoveId(moveId: number): number[];
    /** 导出表供外部访问 */
    get table(): readonly import("../..").SkillEntry[];
    get pointers(): readonly {
        readonly id: number;
        readonly target: number;
    }[];
}
