/**
 * MatchAuxService — 比赛辅助（裁判/界外/角球/球门球/换人）
 *
 * 行为翻译（bank11/code_main.s 死球与裁判例程 + bank24 战术 + bank28 动作）：
 * - handleDeadBall()   检测球越界 → 角球/界外/球门球判定 → 写重启状态
 * - handleSubstitution() 换人（按 ram_0612 时机 + 战术配置）
 * - isBallOutOfBounds() 查询球坐标 ram_0430/ram_0431 是否越过边界
 * - getRestartType()   重启类型查询（角球/界外/球门球/中圈开球）
 *
 * 关键 RAM：
 *   ram_0430/ram_0431   球 X/Y 坐标（每帧更新）
 *   ram_003B            回合状态（bit 0-2 死球类型）
 *   ram_043B            控球方（0=进攻 1=防守 2=守门员 3=丢球方）
 *   ram_0612            换人/重置计数器
 *
 * 当前：V0.5 stub 实现已落地（基础死球判定 + 换人 stub）。
 */
import type { DataStore } from '../../data/store/DataStore';

export enum RestartType {
  None = 0,
  ThrowIn = 1,   // 界外球
  CornerKick = 2, // 角球
  GoalKick = 3,   // 球门球
  KickOff = 4,    // 中圈开球
}

export class MatchAuxService {
  constructor(readonly store: DataStore) {}

  /**
   * 处理死球/界外事件（V0.5 实现）
   *
   * 对应 asm $814C 死球回合入口：检测球坐标 → 越界 → 写重启类型
   * → 通知 MatchTurnService 重启回合（间接通过更新 ram_003B）。
   */
  handleDeadBall(): void {
    const ballX = this.store.readByte(0x0430);
    const ballY = this.store.readByte(0x0431);
    const restart = this.detectRestart(ballX, ballY);
    if (restart !== RestartType.None) {
      // 写回合状态（ram_003B）让 MatchTurnService 看到重启事件
      this.store.writeByte(0x003b, restart & 0xff);
    }
  }

  /**
   * 越界检测：球 X 越界 → 角球或球门球；球 Y 越界 → 界外球
   * - X ≤ 0 或 X ≥ 250 → X 越界（角球/球门球）
   * - Y ≤ 0 或 Y ≥ 230 → Y 越界（界外）
   *
   * 控球方（ram_043B）决定是角球还是球门球：
   * - 进攻方碰出底线 → 角球
   * - 防守方碰出底线 → 球门球
   */
  detectRestart(ballX: number, ballY: number): RestartType {
    // X 越界（左右底线）
    if (ballX <= 1 || ballX >= 254) {
      const possession = this.store.readByte(0x043b) & 0xff;
      // 进攻方（0）碰出 → 球门球（防守方重启）
      // 防守方/丢球方（1/3）碰出 → 角球（进攻方重启）
      return possession === 0 ? RestartType.GoalKick : RestartType.CornerKick;
    }
    // Y 越界（上下边线）
    if (ballY <= 1 || ballY >= 238) {
      return RestartType.ThrowIn;
    }
    return RestartType.None;
  }

  /**
   * 换人操作（按战术配置）。
   * 当前 stub：将换人标志置位，真实逻辑由 MatchEventService 接管。
   *
   * @param playerIdx  换上球员 idx
   * @param slot       被换下球员 slot
   */
  handleSubstitution(playerIdx: number, slot: number): void {
    // 简化：置位换人标志 ram_0612 bit7；具体交换由 MatchEngineService.swapPlayers
    this.store.writeByte(0x0612, (this.store.readByte(0x0612) | 0x80) & 0xff);
    void playerIdx;
    void slot;
  }

  /**
   * 查询球是否在界内。
   */
  isBallInBounds(): boolean {
    return this.detectRestart(
      this.store.readByte(0x0430),
      this.store.readByte(0x0431),
    ) === RestartType.None;
  }

  /**
   * 球坐标查询。
   */
  getBallXY(): { x: number; y: number } {
    return {
      x: this.store.readByte(0x0430) & 0xff,
      y: this.store.readByte(0x0431) & 0xff,
    };
  }
}
