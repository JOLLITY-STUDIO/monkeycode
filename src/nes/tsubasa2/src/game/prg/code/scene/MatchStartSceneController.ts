/**
 * MatchStartSceneController — meeting 完后进入主比赛 (链路终点)
 *
 * 链路位置：...→Scene23→Meeting(300)→MatchStart(400)
 *
 * 行为：
 *   - onEnter(): 标记 sceneId + 等用户按 A 键触发 MatchEngineService 启动
 *   - onUpdate():
 *       - 等用户按 A 键 (Button.A = 0x01) 触发比赛启动 (NES 天使之翼开始比赛键)
 *       - 比赛启动后每帧推进:
 *           1. matchEngine.update(frame): 球员遍历 + 帧尾例程 + 控球方分发
 *           2. matchHud.refresh(): 比分/时间显示
 *           3. matchTurn.advanceTurn(): 回合决策 (V0.5 stub 接契约)
 *
 * V0.6 (本次): MatchStart 真启动 MatchEngineService 后比赛的 sprite 处理链路
 *   - 补 matchEngine.update() per frame
 *   - 接 MatchHudService.refresh() per frame
 *   - 接 MatchTurnService.advanceTurn() per frame
 *   - ★ 修正启动键: 之前 isPressed(0x10)=Up, 现改 Button.A=0x01 (KICKOFF A→Scene14→...→MatchStart A=开始比赛)
 *   - 后续 V0.7: 接 MatchEventService.startEvent() per frame for sprite animation chain
 */
import { SceneController } from './SceneController';
import { Button } from '../system/InputService';
import type { DataStore } from '../../data/store/DataStore';
import type { InputService } from '../system/InputService';
import type { MatchEngineService } from '../match/MatchEngineService';
import type { MatchHudService } from '../match/MatchHudService';
import type { MatchTurnService } from '../match/MatchTurnService';

/** MatchStart scene id — meeting 后的下一站 */
export const MATCH_START_SCENE_ID = 0x400;

export class MatchStartSceneController extends SceneController {
  readonly sceneId = MATCH_START_SCENE_ID;
  private matchEngine: MatchEngineService | null = null;
  private matchHud: MatchHudService | null = null;
  private matchTurn: MatchTurnService | null = null;
  /** false = 等 START; true = 比赛已启动（stay 在比赛页面） */
  private matchStarted = false;

  /** Tsubasa2 入口注入 MatchEngineService */
  attachMatchEngine(engine: MatchEngineService): void {
    this.matchEngine = engine;
  }

  /** Tsubasa2 入口注入 MatchHudService（HUD 时间/比分渲染） */
  attachMatchHud(hud: MatchHudService): void {
    this.matchHud = hud;
  }

  /** Tsubasa2 入口注入 MatchTurnService（回合决策） */
  attachMatchTurn(turn: MatchTurnService): void {
    this.matchTurn = turn;
  }

  onEnter(): void {
    this.store.writeByte(0x0001, MATCH_START_SCENE_ID & 0xff);
    this.matchStarted = false;
  }

  onUpdate(_frame: number): number | undefined {
    // ── 比赛已启动：stay 在 MatchStart 控制器，每帧推进游戏逻辑 + 渲染 ──
    if (this.matchStarted) {
      // 1. 比赛主循环（球员遍历 + 时间推进 + 控球方分发）
      this.matchEngine?.update(_frame);
      // 2. 回合推进（持球方决策 / 死球 / 越位等）
      this.matchTurn?.advanceTurn();
      // 3. HUD 刷新（比分/时间显示，触发 sprite chain 写 OAM + queue2）
      this.matchHud?.refresh();
      return undefined;
    }

    // 等用户按 A 键触发比赛启动
    //   KICKOFF A→Scene14→...→MatchStart A=开始比赛 (NES 天使之翼关键约定)
    //   注: 之前 isPressed(0x10)=Up=误, 现改 Button.A=0x01
    //   默认对手: $0628 (场景选择) -> fallback SaoPaulo (0x02) 第一节 vs Nankatsu (0x01)
    if (this.matchEngine && this.input.isPressed(1, Button.A)) {
      const home = this.store.readByte(0x0628) || 0x02;  // SaoPaulo
      const away = 0x01;  // Nankatsu 第一关固定
      this.matchEngine.startMatch(home, away);
      this.matchStarted = true;
    }
    return undefined;
  }
}
