/**
 * MatchResultUiService — 比赛终场界面
 *
 * UI 元素（比赛结束后 1-2 秒显示）：
 *   - 终场比分 (HOME - AWAY)
 *   - 进球球员名
 *   - XP 获得 + 升级箭头
 *   - "PRESS A TO CONTINUE"
 *
 * 数据消费：
 *   - data/tables/match-config-table (赛事配置)
 *   - data/tables/team-table (队名)
 *   - data/tables/player-table (球员名 + 经验)
 *   - data/tables/levelup-table (等级查询)
 *   - data/store/DataStore ram_044E/0450 (比分), ram_0468+ (经验)
 *
 * 当前：V1.0 stub 实现（基础查询 + 视图对象）。NT/OAM 写入待 V1.0 收尾。
 */
import type { DataStore } from '../../data/store/DataStore';
export interface MatchResultInput {
    readonly homeTeam: number;
    readonly awayTeam: number;
    readonly homeScore: number;
    readonly awayScore: number;
    /** 进球球员 ID 列表（按时间顺序） */
    readonly scorers: ReadonlyArray<number>;
    /** 用户控制球员 ID（MVP） */
    readonly mvpPlayerId: number;
    /** 获得经验 */
    readonly expGained: number;
    /** MVP 累计经验（升级前） */
    readonly mvpExpBefore: number;
}
export interface MatchResultView {
    readonly homeName: string;
    readonly awayName: string;
    readonly scoreText: string;
    readonly winner: 'home' | 'away' | 'draw';
    readonly scorerNames: ReadonlyArray<string>;
    readonly mvpName: string;
    readonly mvpLevelBefore: number;
    readonly mvpLevelAfter: number;
    readonly leveledUp: boolean;
    readonly expGained: number;
    readonly expRequiredNext: number;
    readonly tournament: string;
}
export declare class MatchResultUiService {
    readonly store: DataStore;
    private step;
    private frameCount;
    constructor(store: DataStore);
    reset(): void;
    /**
     * 输入比赛结果数据 → 输出渲染视图。
     */
    render(input: MatchResultInput): MatchResultView;
    private drawScore;
    private drawScorers;
    private drawLevelUp;
    exit(): void;
    get currentStep(): number;
}
