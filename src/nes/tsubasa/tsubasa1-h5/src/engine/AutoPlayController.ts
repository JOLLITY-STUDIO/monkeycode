/**
 * AutoPlayController - 全自动游戏控制器
 *
 * 游戏本身不存在的功能: 双方都由AI控制，无需人工操作。
 * 模拟人类玩家的输入行为，在每个游戏状态下自动做出决策。
 *
 * 工作原理:
 *   每帧调用 update()，根据当前游戏状态自动注入按键输入:
 *   - State 0/1: 等标题初始化完成后按 START
 *   - State 2:   选择 "1P GAME" 并按 A
 *   - State 3:   随机选择队伍并按 A
 *   - State 4:   比赛全自动 (双方AI)
 *   - State 5:   等待事件处理完成后自动回到比赛
 *
 * 所有决策通过 InputManager.setExternalButtons() 注入，
 * 各状态代码无需感知 AutoPlay 的存在。
 */

import { Button } from '../core/types';
import type { InputManager } from '../input/InputManager';
import type { DataCache } from '../cache/DataCache';
import type { StateMachine } from './StateMachine';
import type { MatchEngine } from './MatchEngine';

/** 自动操作决策 */
interface AutoDecision {
  /** 本帧按下的按键 (模拟按下即释放) */
  pressed: number;
  /** 本帧持续按住的按键 */
  held: number;
  /** 描述文字 (日志用) */
  desc: string;
}

export class AutoPlayController {
  private inputManager: InputManager;
  private dataCache: DataCache;

  /** 是否启用自动模式 */
  enabled: boolean = false;

  /** 帧计数器 (用于延迟决策) */
  private frameCount: number = 0;

  /** 状态内步进计数器 */
  private stateStep: number = 0;

  /** 当前状态的持续帧数 */
  private stateFrameCount: number = 0;

  /** 上一次状态 */
  private lastStateId: number = -1;

  /** 比赛自动AI */
  private matchAutoFrame: number = 0;

  /** 本次选择的队伍索引 */
  private selectedTeam: number = 0;

  /** 比赛计数 */
  private matchCount: number = 0;

  /** 累积比分 */
  private totalScore: [number, number] = [0, 0];

  /** 日志回调 */
  private onLog?: (msg: string) => void;

  /** 比赛结束时回调 (含比分) */
  private onMatchEnd?: (score: [number, number], time: number) => void;

  constructor(inputManager: InputManager, dataCache: DataCache) {
    this.inputManager = inputManager;
    this.dataCache = dataCache;
  }

  /** 设置日志回调 */
  setLogCallback(cb: (msg: string) => void): void {
    this.onLog = cb;
  }

  /** 设置比赛结束回调 */
  setMatchEndCallback(cb: (score: [number, number], time: number) => void): void {
    this.onMatchEnd = cb;
  }

  /** 重置内部状态 */
  reset(): void {
    this.frameCount = 0;
    this.stateStep = 0;
    this.stateFrameCount = 0;
    this.lastStateId = -1;
    this.matchAutoFrame = 0;
    this.selectedTeam = 0;
    this.inputManager.clearExternalButtons();
  }

  /** 完全重置 (含比赛统计) */
  fullReset(): void {
    this.reset();
    this.matchCount = 0;
    this.totalScore = [0, 0];
  }

  /** 获取比赛统计 */
  getStats(): { matchCount: number; totalScore: [number, number] } {
    return { matchCount: this.matchCount, totalScore: [...this.totalScore] };
  }

  /**
   * 每帧调用: 根据当前游戏状态自动注入输入
   * 应在 GameLoop 阶段2 (游戏逻辑) 之前调用
   */
  update(currentStateId: number): void {
    if (!this.enabled) return;

    this.frameCount++;

    // 检测状态切换
    if (currentStateId !== this.lastStateId) {
      this.onStateChanged(currentStateId);
      this.lastStateId = currentStateId;
    }
    this.stateFrameCount++;

    // 根据当前状态做决策
    const decision = this.makeDecision(currentStateId);

    // 注入输入
    if (decision.pressed !== 0) {
      this.inputManager.setExternalButtons(decision.pressed);
    } else if (decision.held !== 0) {
      this.inputManager.setExternalButtons(decision.held);
    } else {
      this.inputManager.clearExternalButtons();
    }

    // 日志 (每60帧输出一次)
    if (this.frameCount % 60 === 0 && decision.desc) {
      this.log(`[Auto] state=${currentStateId} frame=${this.stateFrameCount} → ${decision.desc}`);
    }
  }

  /** 状态切换时重置步进 */
  private onStateChanged(newState: number): void {
    this.stateStep = 0;
    this.stateFrameCount = 0;
    this.matchAutoFrame = 0;
    this.log(`[Auto] Entering State ${newState}`);

    // 进入新比赛时随机选队
    if (newState === 3) {
      this.selectedTeam = Math.floor(Math.random() * 7);
      this.log(`[Auto] 随机选择队伍: #${this.selectedTeam}`);
    }

    // 进入比赛时计数
    if (newState === 4) {
      this.matchCount++;
      this.log(`[Auto] ⚽ 第 ${this.matchCount} 场比赛开始`);
    }
  }

  /**
   * 核心决策逻辑: 根据游戏状态返回应该注入的按键
   */
  private makeDecision(stateId: number): AutoDecision {
    switch (stateId) {
      case 0: return this.decideState00();  // 标题初始化
      case 1: return this.decideState01();  // 标题循环
      case 2: return this.decideState02();  // 菜单选择
      case 3: return this.decideState03();  // 队伍选择
      case 4: return this.decideState04();  // 比赛主循环
      case 5: return this.decideState05();  // 比赛事件
      default: return this.emptyDecision();
    }
  }

  // ─── State 00: 标题初始化 ───
  // 等待 Bank1Dispatcher 自动完成初始化，不需要任何输入
  private decideState00(): AutoDecision {
    return { pressed: 0, held: 0, desc: '等待标题初始化...' };
  }

  // ─── State 01: 标题画面循环 ───
  // 等待一小段时间后按 START 进入菜单
  private decideState01(): AutoDecision {
    // 等待约90帧 (1.5秒) 让标题画面显示一会儿
    if (this.stateFrameCount < 90) {
      return { pressed: 0, held: 0, desc: '显示标题画面...' };
    }
    this.stateStep++;
    if (this.stateStep === 1) {
      this.log('[Auto] 按 START 进入菜单');
    }
    return { pressed: Button.START, held: 0, desc: '按 START' };
  }

  // ─── State 02: 菜单选择 ───
  // 选择 "1P GAME" 并按 A
  private decideState02(): AutoDecision {
    // 目标: 选中第0项 (1P GAME)
    // 读取当前菜单光标位置 (如果有的话)

    // 等待几帧让菜单渲染完成
    if (this.stateFrameCount < 20) {
      return { pressed: 0, held: 0, desc: '菜单渲染中...' };
    }

    this.stateStep++;
    if (this.stateStep === 1) {
      // 按 A 确认选择 (默认光标在 1P GAME)
      this.log('[Auto] 选择 1P GAME');
      return { pressed: Button.A, held: 0, desc: '按 A → 1P GAME' };
    }

    // 如果还没进入 State 03，再按一次
    if (this.stateStep >= 3 && this.stateStep % 30 === 0) {
      return { pressed: Button.A, held: 0, desc: '重试按 A' };
    }

    return this.emptyDecision();
  }

  // ─── State 03: 队伍选择 ───
  // 使用预选的随机队伍，导航并确认
  private decideState03(): AutoDecision {
    if (this.stateFrameCount < 20) {
      return { pressed: 0, held: 0, desc: '队伍选择渲染...' };
    }

    this.stateStep++;

    const teamIdx = this.selectedTeam;

    // 前几帧: 用方向键移动到目标队伍
    if (this.stateStep <= teamIdx && teamIdx <= 4) {
      return { pressed: Button.RIGHT, held: 0, desc: `选队 → (${this.stateStep}/${teamIdx})` };
    }

    if (this.stateStep <= (7 - teamIdx) && teamIdx > 4) {
      return { pressed: Button.LEFT, held: 0, desc: `选队 ← (${this.stateStep}/${7 - teamIdx})` };
    }

    // 确认选择
    if (this.stateStep >= Math.max(teamIdx, 7 - teamIdx) + 2) {
      this.log(`[Auto] 确认队伍选择 #${teamIdx}`);
      return { pressed: Button.A, held: 0, desc: '按 A 确认队伍' };
    }

    return this.emptyDecision();
  }

  // ─── State 04: 比赛主循环 ───
  // 全自动比赛: 双方AI驱动
  private decideState04(): AutoDecision {
    this.matchAutoFrame++;

    // 获取比赛引擎
    const engine = this.dataCache.get('matchEngine') as MatchEngine | undefined;
    if (!engine) {
      return this.emptyDecision();
    }

    // 检查比赛是否结束
    this.checkMatchEnd(engine);

    // 调用比赛自动AI
    this.runMatchAutoAI(engine);

    // 不需要注入额外的按键输入 (比赛AI直接操作 MatchEngine)
    return { pressed: 0, held: 0, desc: `比赛进行中... ${engine.score[0]}-${engine.score[1]}` };
  }

  // ─── State 05: 比赛事件 ───
  // 等待事件处理完成 (进球动画/终场画面)，自动回到比赛
  private decideState05(): AutoDecision {
    return { pressed: 0, held: 0, desc: '事件处理中...' };
  }

  // ─── 比赛自动AI ───
  private runMatchAutoAI(engine: MatchEngine): void {
    // 每15帧做一次决策
    if (this.matchAutoFrame % 15 !== 0) return;

    const allPlayers = engine.getAllPlayers();
    const ballHolder = engine.getBallHolder();
    const ball = engine.ball;

    if (ballHolder === null) {
      // 球无人控制: 两队最近的球员都去追球
      // MatchEngine 现有 movePlayers() 已处理基本追球逻辑
      return;
    }

    // 确定持球方
    const holderIsTeam0 = engine.getPlayerTeam(ballHolder) === 0;
    const holderPlayer = engine.getPlayerById(ballHolder);
    if (!holderPlayer) return;

    // ── 玩家队伍 (team0) AI 决策 ──
    if (holderIsTeam0) {
      this.decidePlayerTeamAction(engine, holderPlayer, ballHolder);
    }
    // ── 对手队伍 (team1) AI 决策 ──
    else {
      this.decideOpponentTeamAction(engine, holderPlayer, ballHolder);
    }
  }

  /**
   * 玩家队伍 (team0) 持球时: 决定射门/传球/盘带
   */
  private decidePlayerTeamAction(engine: MatchEngine, holderPlayer: any, holderId: number): void {
    const ball = engine.ball;
    const fieldCenter = 128;

    // 距离对方球门的距离 (team0 向右进攻)
    const distToGoal = 252 - ball.x;

    if (distToGoal < 60) {
      // 进入射门范围: 80% 概率射门
      if (this.matchAutoFrame % 5 < 4) {
        const event = engine.shoot(holderId);
        this.log(`[Auto] ⚽ 玩家队射门! dist=${distToGoal.toFixed(0)}`);
        return;
      }
    }

    // 向前推进: 传给更靠前的队友
    const team0Players = engine.team0Players.filter(p => p.isActive && p.playerId !== holderId);
    const forwardPlayers = team0Players.filter(p => p.position.x > holderPlayer.position.x + 20);

    if (forwardPlayers.length > 0 && distToGoal > 30) {
      // 选择最靠前的队友
      forwardPlayers.sort((a, b) => b.position.x - a.position.x);
      const target = forwardPlayers[0];
      engine.pass(holderId, target.playerId);
      this.log(`[Auto] ↗ 玩家队传球 → #${target.playerId}`);
      return;
    }

    // 如果没有好的传球目标，保持盘带 (movePlayers 已处理)
  }

  /**
   * 对手队伍 (team1) 持球时: 最近玩家队员铲球
   */
  private decideOpponentTeamAction(engine: MatchEngine, holderPlayer: any, holderId: number): void {
    // 找最近的玩家队球员去铲球
    const team0Players = engine.team0Players.filter(p => p.isActive);
    if (team0Players.length === 0) return;

    let nearest: any = null;
    let minDist = Infinity;
    for (const p of team0Players) {
      const dx = p.position.x - holderPlayer.position.x;
      const dy = p.position.y - holderPlayer.position.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < minDist) {
        minDist = dist;
        nearest = p;
      }
    }

    if (nearest && minDist < 40) {
      // 距离足够近，尝试铲球
      engine.tackle(nearest.playerId, holderId);
      this.log(`[Auto] 🦶 玩家队铲球! #${nearest.playerId} → #${holderId}`);
    }
  }

  /** 检查比赛是否结束 */
  private checkMatchEnd(engine: MatchEngine): void {
    // 比赛刚开始时记录
    if (this.matchAutoFrame === 1) {
      const playerTeam = this.dataCache.get('playerTeamName') || 'Player';
      const oppTeam = this.dataCache.get('opponentTeamName') || 'CPU';
      this.log(`[Auto] ⚽ 比赛开始: ${playerTeam} vs ${oppTeam}`);
    }

    // 比赛结束时记录分数并回调
    if (this.matchAutoFrame === 2 && engine.score[0] === 0 && engine.score[1] === 0) {
      // 刚进入比赛，不算结束
      return;
    }
  }

  /**
   * 当状态从 State 4/5 离开时，记录比赛结果
   * 由外部在检测到 state 变化后调用
   */
  onMatchExited(finalScore: [number, number]): void {
    this.totalScore[0] += finalScore[0];
    this.totalScore[1] += finalScore[1];
    const result = finalScore[0] > finalScore[1] ? 'WIN' :
                   finalScore[0] < finalScore[1] ? 'LOSE' : 'DRAW';
    this.log(`[Auto] 🏆 比赛#${this.matchCount} 结束: ${finalScore[0]}-${finalScore[1]} (${result}) | 累计: ${this.totalScore[0]}-${this.totalScore[1]}`);

    if (this.onMatchEnd) {
      this.onMatchEnd(finalScore, 0);
    }
  }

  /** 空决策 */
  private emptyDecision(): AutoDecision {
    return { pressed: 0, held: 0, desc: '' };
  }

  /** 日志输出 */
  private log(msg: string): void {
    if (this.onLog) {
      this.onLog(msg);
    }
    console.log(msg);
  }
}
