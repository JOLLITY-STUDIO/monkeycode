/**
 * MatchEngineService — 比赛主引擎
 *
 * 行为翻译（去 CPU 化）：
 * - 开始比赛：初始化双方球队、比分、时间、控球方
 * - 球员槽位装载：逐项写入 [playerId, type, state]
 * - 球员数据装载：槽位 → 帧工作区
 * - 球员交换：两个槽位内容互换
 * - 每帧比赛逻辑：球员遍历循环 → 帧尾例程 → 控球方分发（5 种状态机）
 * - 帧尾例程：HUD 更新 / 时间推进
 * - 控球方分发：5 种状态 → 防守例程 / 时间到 / 重置栈 / 暂停
 * - 防守例程：按控球方与标志位分发（跳过状态、设置标志）
 *
 * bank 切换 = import MatchEngineService + 直接调用，无 MMC3 窗口模拟。
 */
import type { DataStore } from '../../data/store/DataStore';
/** 比赛状态 */
export interface MatchState {
    readonly homeTeam: number;
    readonly awayTeam: number;
    homeScore: number;
    awayScore: number;
    timeMinutes: number;
    timeSeconds: number;
    /** 当前控球方 */
    possession: number;
    /** 当前球员索引 */
    currentPlayerIdx: number;
}
/** 球员槽位数据 */
export interface PlayerSlot {
    readonly slotIdx: number;
    readonly playerId: number;
    readonly type: number;
    readonly state: number;
}
export declare class MatchEngineService {
    readonly store: DataStore;
    constructor(store: DataStore);
    /**
     * 开始比赛：初始化双方球队、比分、时间、控球方。
     */
    startMatch(homeTeam: number, awayTeam: number): MatchState;
    /**
     * 装载球员槽位：写入球员数 + 逐项 [playerId, type, state]。
     */
    loadPlayerSlots(playerIds: number[]): void;
    /**
     * 读取球员槽位：[playerId, type, state]。
     */
    getPlayerSlot(idx: number): PlayerSlot;
    /**
     * 球员数据装载：槽位 → 帧工作区（state/type/playerId）。
     */
    loadPlayerData(idx: number): void;
    /**
     * 球员交换：两个槽位内容互换；type=1, state=0 标记为新槽。
     */
    swapPlayers(idxX: number, idxY: number): void;
    /**
     * 每帧比赛逻辑：
     * - 球员遍历循环：递增索引 → 与总数比较 → 未到尾部继续
     * - 帧尾例程：HUD 更新 / 时间推进
     * - 控球方判定 → 分发
     */
    update(frame: number): void;
    /**
     * 帧尾更新：比赛时间递减；分钟/秒计满后半场/终场判定。
     */
    private frameTailUpdate;
    /**
     * 控球方分发（5 种状态机）：
     * - 0: 继续主循环
     * - 1: 设置 ram_0612=$0A → 防守例程
     * - 2: 重置栈指针
     * - 3: 防守例程 → 重置栈
     * - 4: ram_0617=0 → 跳回主循环
     */
    private dispatchPossession;
    /**
     * 防守例程：
     * - ram_0617 bit7 置位 → 跳过
     * - 控球方=2 → 跳过
     * - ram_062D=0；ram_044E = ram_0444 & 3；ram_0617 |= 0x80
     */
    private defenseRoutine;
    /** 球员槽位递增：当前球员索引 +1 */
    advancePlayerSlot(): number;
    /** 检查球员遍历完成：当前索引 == 球员总数 */
    isPlayerTraversalComplete(): boolean;
    /** 导出配置供外部访问 */
    get config(): import("../..").MatchConfigEntry;
}
