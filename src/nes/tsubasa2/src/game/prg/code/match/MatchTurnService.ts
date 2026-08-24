/**
 * MatchTurnService — 比赛回合（bank11/code_main.s）
 *
 * 行为翻译（去 CPU 化）：
 * - 回合主调度：3 路跳转表 $8003/$8006/$8009 → JMP $8083/$84A1/$814C
 *   与 bank11/code_sub.s 的回合子例程对接（每回合 nmsx 决策树：
 *   球权判定 / 进攻选择 / 铲球判定 / 越位判定 / 角球 / 界外 / 球门球）
 * - 回合终止：回合结束后清状态 → 触发下一回合或比赛终场
 * - 与 MatchRoundService（bank24 战术）、MatchEventService（bank20 事件动画）、
 *   MatchAuxService（bank20 死球）、MatchActionService（bank28 球员动作） 协作
 *
 * 关键 RAM：
 *   ram_003B 回合类型 / 控球方
 *   ram_043B 控球状态（详 MatchEngineService.dispatchPossession 注释）
 *   ram_05D4 当前回合计数 / ram_05D7 回合方向（bit7=1 主场进攻）
 *   ram_05D8 上一回合点（用于检测重复回合）
 *   ram_0515 回合标志
 *   ram_005A/$0058 间接寻址基础
 *
 * 当前：V0.5 stub（基础契约骨架）；真实实现在 E1 V0.5 后续逐段翻译。
 */
import type { DataStore } from '../../data/store/DataStore';

/** 回合类型（asm $003B bit 意义，区分进攻/防守） */
export enum MatchTurnType {
  Attack = 0,
  Defense = 1,
  DeadBall = 2,
  Corner = 3,
  GoalKick = 4,
  ThrowIn = 5,
  FreeKick = 6,
  Penalty = 7,
}

export class MatchTurnService {
  constructor(readonly store: DataStore) {}

  /**
   * 推进一个回合（传球/带球/射门/铲球，V0.5 实现）
   *
   * 对应 asm $8000-$800A 三路跳转表，主调用方（MatchEngineService）按当前
   * 控球方 / 比赛阶段分派到不同入口：
   *   - 球权方 0..3 → $8083（常规回合决策）
   *   - 球权方 = 守门员方 → $84A1（守门员回合）
   *   - 死球 → $814C（死球回合）
   *
   * 当前 stub：保留调用契约 + 说明 bank11 引用，行为由 MatchEngineService
   * update() 在每帧调用。
   */
  advanceTurn(): void {
    // TODO V0.5: 翻译回合主循环（bank11/code_main.s $8000-$800A 跳转表）
    // 关键依赖：
    //   - 球员遍历推进（MatchEngineService.update 已经做了）
    //   - 回合类型判定（control + flags）
    //   - 回合结果触发动画（MatchEventService.startEvent）
    //   - 回合结果影响比赛状态（MatchAuxService.handleDeadBall）
    void this.store;
  }

  /**
   * 当前回合类型查询（读 ram_003B bit 模式）。
   */
  getCurrentTurnType(): MatchTurnType {
    const v = this.store.readByte(0x003b) & 0xff;
    if (v < 0 || v > 7) return MatchTurnType.DeadBall;
    return v as MatchTurnType;
  }

  /**
   * 回合计数查询（ram_05D4/ram_05D8）：用于检测重复回合/死循环。
   */
  getTurnMarker(): number {
    const cur = this.store.readByte(0x05d4) & 0xff;
    const last = this.store.readByte(0x05d8) & 0xff;
    return (cur << 8) | last;
  }
}
