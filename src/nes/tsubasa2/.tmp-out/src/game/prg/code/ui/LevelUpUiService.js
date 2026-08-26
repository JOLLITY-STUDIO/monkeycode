import { findLevelByExp, findLevelById } from '../../data/tables/levelup-table';
/** 6 项基础能力常量（与 asm growth 字段顺序一致） */
const STAT_NAMES = ['SHOT', 'DRIBBLE', 'PASS', 'TACKLE', 'SPEED', 'CONTROL'];
export class LevelUpUiService {
    constructor(store) {
        this.store = store;
        /** UI 内部状态机：enter→draw→exit */
        this.step = 0;
        /** 帧计数（用于动画定时） */
        this.frameCount = 0;
    }
    /**
     * 重置 UI 状态（每场比赛后调用）。
     */
    reset() {
        this.step = 0;
        this.frameCount = 0;
    }
    /**
     * 输入球员升级数据 → 渲染到 NT 缓冲（具象化为 LevelUpView）。
     *
     * 行为：调用方（MatchResultUiService 等）每帧调用本方法；
     *       内部累积帧数后写 NT 缓冲 + 精灵缓冲。
     */
    render(input) {
        const lv = findLevelByExp(input.exp);
        const entry = findLevelById(lv);
        const nextLv = lv < 30 ? findLevelById(lv + 1) : null;
        const expRequired = entry ? entry.expRequired : 0;
        const expToNext = nextLv ? Math.max(0, nextLv.expRequired - input.exp) : 0;
        // 计算视图对象
        const view = {
            level: lv,
            nextLevel: nextLv ? nextLv.level : null,
            expRequired,
            expToNext,
            staminaRaw: entry ? entry.staminaRaw : 0,
            abilityMax: entry ? entry.abilityMax : 0,
            stats: input.stats,
            header: `LEVEL ${lv}${nextLv ? ' → ' + nextLv.level : ' (MAX)'}`,
        };
        // 仅在特定帧推进 NT 缓冲写入（避免每帧覆盖）
        if (this.step === 0) {
            this.drawHeader(view);
            this.step = 1;
        }
        else if (this.step === 1 && this.frameCount > 4) {
            this.drawStatsBars(view);
            this.step = 2;
        }
        else if (this.step === 2 && this.frameCount > 8) {
            this.drawStaminaBar(input.stamina, view.staminaRaw);
            this.step = 3;
        }
        this.frameCount++;
        return view;
    }
    /** UI 头部（"LEVEL X" + 球员姓名）写入 NT 缓冲 */
    drawHeader(view) {
        // TODO V1.0: 写 NT 缓冲顶部 8 字符 "LEVEL n" + 经验进度 tile
        void view;
    }
    /** 6 项能力进度条写入 NT 缓冲 */
    drawStatsBars(view) {
        void view;
        // TODO V1.0: 6 行进度条（每行 16 tile，比例 = stat[i]/abilityMax）
        // 每行：bar 类型 tile + 当前值 tile + 顶部 tile × N（按比例）
    }
    /** 体力条写入精灵缓冲（OAM） */
    drawStaminaBar(stamina, staminaRaw) {
        void stamina;
        void staminaRaw;
        // TODO V1.0: OAM sprite 体力条（按比例 0..16 tile，OAM slot 0..15）
    }
    /**
     * UI 关闭（清理 NT/OAM 缓冲）。
     */
    exit() {
        this.step = 0;
        this.frameCount = 0;
        // TODO V1.0: 清 NT 头部 + OAM 体力条 sprite
    }
    /** 查询 UI 当前 step（调试用） */
    get currentStep() { return this.step; }
    get currentFrame() { return this.frameCount; }
}
/** 静态：6 项能力名常量 */
LevelUpUiService.STAT_NAMES = STAT_NAMES;
