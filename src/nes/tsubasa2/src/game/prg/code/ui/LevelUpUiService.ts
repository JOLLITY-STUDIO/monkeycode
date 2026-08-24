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
import { findLevelByExp, findLevelById, type LevelUpStatEntry } from '../../data/tables/levelup-table';

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

/** 6 项基础能力常量（与 asm growth 字段顺序一致） */
const STAT_NAMES = ['SHOT', 'DRIBBLE', 'PASS', 'TACKLE', 'SPEED', 'CONTROL'] as const;

export class LevelUpUiService {
  /** UI 内部状态机：enter→draw→exit */
  private step = 0;
  /** 帧计数（用于动画定时） */
  private frameCount = 0;

  constructor(readonly store: DataStore) {}

  /**
   * 重置 UI 状态（每场比赛后调用）。
   */
  reset(): void {
    this.step = 0;
    this.frameCount = 0;
  }

  /**
   * 输入球员升级数据 → 渲染到 NT 缓冲（具象化为 LevelUpView）。
   *
   * 行为：调用方（MatchResultUiService 等）每帧调用本方法；
   *       内部累积帧数后写 NT 缓冲 + 精灵缓冲。
   */
  render(input: LevelUpInput): LevelUpView {
    const lv = findLevelByExp(input.exp);
    const entry: LevelUpStatEntry | null = findLevelById(lv);
    const nextLv = lv < 30 ? findLevelById(lv + 1) : null;
    const expRequired = entry ? entry.expRequired : 0;
    const expToNext = nextLv ? Math.max(0, nextLv.expRequired - input.exp) : 0;

    // 计算视图对象
    const view: LevelUpView = {
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
    } else if (this.step === 1 && this.frameCount > 4) {
      this.drawStatsBars(view);
      this.step = 2;
    } else if (this.step === 2 && this.frameCount > 8) {
      this.drawStaminaBar(input.stamina, view.staminaRaw);
      this.step = 3;
    }
    this.frameCount++;
    return view;
  }

  /** UI 头部（"LEVEL X" + 球员姓名）写入 NT 缓冲 */
  private drawHeader(view: LevelUpView): void {
    // TODO V1.0: 写 NT 缓冲顶部 8 字符 "LEVEL n" + 经验进度 tile
    void view;
  }

  /** 6 项能力进度条写入 NT 缓冲 */
  private drawStatsBars(view: LevelUpView): void {
    void view;
    // TODO V1.0: 6 行进度条（每行 16 tile，比例 = stat[i]/abilityMax）
    // 每行：bar 类型 tile + 当前值 tile + 顶部 tile × N（按比例）
  }

  /** 体力条写入精灵缓冲（OAM） */
  private drawStaminaBar(stamina: number, staminaRaw: number): void {
    void stamina;
    void staminaRaw;
    // TODO V1.0: OAM sprite 体力条（按比例 0..16 tile，OAM slot 0..15）
  }

  /**
   * UI 关闭（清理 NT/OAM 缓冲）。
   */
  exit(): void {
    this.step = 0;
    this.frameCount = 0;
    // TODO V1.0: 清 NT 头部 + OAM 体力条 sprite
  }

  /** 查询 UI 当前 step（调试用） */
  get currentStep(): number { return this.step; }
  get currentFrame(): number { return this.frameCount; }

  /** 静态：6 项能力名常量 */
  static readonly STAT_NAMES = STAT_NAMES;
}
