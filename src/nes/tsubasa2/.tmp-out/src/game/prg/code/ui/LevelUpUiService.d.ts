/**
 * LevelUpUiService — 赛后能力展示界面
 *
 * 来源：比赛胜利后展示球员升级数据（PlayerStats + LevelUp）
 * UI 元素：
 *   - 球员姓名 + 队徽
 *   - 当前等级 + 经验条
 *   - 6 项能力条 (shot/dribble/pass/tackle/speed/control)
 *   - 体力条 + 体力值
 *   - 下一级所需经验
 *
 * 数据消费：
 *   - data/tables/levelup-table.ts (findLevelByExp/findLevelById)
 *   - data/tables/player-table.ts (findPlayerById → 球员基础数据)
 *   - data/store/DataStore (运行时状态：ram_0468+ 经验)
 *
 * 渲染策略：
 *   - drawXxx() → 写入 NT 缓冲 ($05E8 队列) + 精灵缓冲 ($0468+)
 *   - 状态机：onEnter→绘制→onUpdate→onExit
 *
 * 当前：V1.0 stub 实现（基础查询 + 帧推进）。具体 tile/精灵/动效
 * 在后续 V1.0 收尾时按真实 ROM 字节提取。
 */
import type { DataStore } from '../../data/store/DataStore';
/** UI 输入 */
export interface LevelUpInput {
    /** 球员 ID（用于查 PLAYER_TABLE） */
    playerId: number;
    /** 当前累计经验（用于查 LEVEL_UP_TABLE） */
    exp: number;
    /** 6 项当前能力值 (shot/dribble/pass/tackle/speed/control) */
    stats: ReadonlyArray<number>;
    /** 当前体力值 */
    stamina: number;
}
/** UI 输出（NT 缓冲串行化结果；外部页面直接读这个写入渲染管线） */
export interface LevelUpView {
    readonly level: number;
    readonly nextLevel: number | null;
    readonly expRequired: number;
    readonly expToNext: number;
    readonly staminaRaw: number;
    readonly abilityMax: number;
    readonly stats: ReadonlyArray<number>;
    readonly header: string;
}
export declare class LevelUpUiService {
    readonly store: DataStore;
    /** UI 内部状态机：enter→draw→exit */
    private step;
    /** 帧计数（用于动画定时） */
    private frameCount;
    constructor(store: DataStore);
    /**
     * 重置 UI 状态（每场比赛后调用）。
     */
    reset(): void;
    /**
     * 输入球员升级数据 → 渲染到 NT 缓冲（具象化为 LevelUpView）。
     *
     * 行为：调用方（MatchResultUiService 等）每帧调用本方法；
     *       内部累积帧数后写 NT 缓冲 + 精灵缓冲。
     */
    render(input: LevelUpInput): LevelUpView;
    /** UI 头部（"LEVEL X" + 球员姓名）写入 NT 缓冲 */
    private drawHeader;
    /** 6 项能力进度条写入 NT 缓冲 */
    private drawStatsBars;
    /** 体力条写入精灵缓冲（OAM） */
    private drawStaminaBar;
    /**
     * UI 关闭（清理 NT/OAM 缓冲）。
     */
    exit(): void;
    /** 查询 UI 当前 step（调试用） */
    get currentStep(): number;
    get currentFrame(): number;
    /** 静态：6 项能力名常量 */
    static readonly STAT_NAMES: readonly ["SHOT", "DRIBBLE", "PASS", "TACKLE", "SPEED", "CONTROL"];
}
