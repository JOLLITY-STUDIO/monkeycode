/**
 * State 04: 比赛主循环 (纯逻辑 — 只更新 MatchModel)
 *
 * 对应 ROM 中 $826A 的处理。
 * 比赛核心: 场地、球员移动、球物理、计时、事件。
 * 玩家球队固定为南葛(Nankatsu)，单人游戏，无P2。
 *
 * v0.6.0: 已移除所有 renderer/oam 直接调用，通过 GameModel 通信。
 * State 只负责: 逻辑更新 → 将比赛状态写入 model.match
 * SceneComposer 负责: 读取 model.match → 渲染场地/球员/球/HUD
 */
import { StateBase } from './StateBase';
import { Button } from '../../core/types';
import { MatchEngine, MatchPhase, MatchEvent } from '../MatchEngine';
import { getTeamPlayers, TEAM_LIST } from '../../data/PlayerData';
import type { PlayerStats } from '../../data/PlayerData';
import type { MatchPlayerInfo } from '../../model/GameModel';
import { RngGenerator } from '../../utils/RngGenerator';

const PLAYER_TEAM_ID = 0; // 南葛 Nankatsu

export class State04_MatchMain extends StateBase {
  readonly id = 4;

  private matchEngine!: MatchEngine;
  private rng!: RngGenerator;

  onEnter(): void {
    console.log('[State 04] Match Main - Initializing (Nankatsu vs opponent)...');

    this.rng = new RngGenerator();
    this.rng.seed(Date.now() & 0xFF);

    this.matchEngine = new MatchEngine(this.rng);

    const allNankatsuPlayers = getTeamPlayers(PLAYER_TEAM_ID);
    const activeNumbers: number[] = this.data.get('activeNumbers') as number[] ?? [];
    const playerTeamPlayers: PlayerStats[] = activeNumbers.length > 0
      ? allNankatsuPlayers.filter(p => activeNumbers.includes(p.number))
      : allNankatsuPlayers.slice(0, 11);

    const opponentId = (this.data.get('opponentTeam') as number) ?? 1;
    const opponentPlayers = getTeamPlayers(opponentId);

    this.matchEngine.initMatch(
      { id: PLAYER_TEAM_ID, name: TEAM_LIST[PLAYER_TEAM_ID].name, nameJp: TEAM_LIST[PLAYER_TEAM_ID].nameJp, formation: '4-4-2', players: playerTeamPlayers, captain: playerTeamPlayers.find(p => p.number === 11)?.id ?? 0 },
      { id: opponentId, name: TEAM_LIST[opponentId].name, nameJp: TEAM_LIST[opponentId].nameJp, formation: '4-4-2', players: opponentPlayers, captain: opponentPlayers.find(p => p.number === 9)?.id ?? 0 },
    );

    this.data.set('matchEngine', this.matchEngine);
    this.banks.chrBank0 = 2;
    this.banks.chrBank1 = 3;
    this.data.mmcBankReg0 = 2;
    this.data.mmcBankReg1 = 3;
    this.data.bankLock = 0;
    this.data.ppuCtrl = 0x90;
    this.data.ppuMask = 0x1E;
    this.data.scrollX = 0;
    this.data.scrollY = 0;

    // v0.6.0: 初始化比赛 model
    this.model.setMatch(TEAM_LIST[PLAYER_TEAM_ID].name, TEAM_LIST[opponentId].name);

    console.log(`[State 04] Match: ${TEAM_LIST[PLAYER_TEAM_ID].name} (${playerTeamPlayers.length}P) vs ${TEAM_LIST[opponentId].name}`);
  }

  onUpdate(): void {
    // START 暂停
    if (this.input.isPressed(Button.START)) {
      this.sm.transitionTo(2);
      return;
    }

    // 比赛引擎更新
    const event = this.matchEngine.update();
    if (event && event.type !== 'none') {
      this.handleMatchEvent(event);
    }

    // v0.6.0: 将比赛引擎状态 → 同步到 GameModel (不调渲染)
    this.syncMatchModel();
  }

  /** 将 MatchEngine 的底层状态映射到 GameModel.match */
  private syncMatchModel(): void {
    const allPlayers = this.matchEngine.getAllPlayers();
    const players: MatchPlayerInfo[] = allPlayers.map(p => ({
      id: p.playerId,
      x: p.position.x,
      y: p.position.y,
      hasBall: p.hasBall,
      isTeamLeft: this.matchEngine.team0Players.some(tp => tp.playerId === p.playerId),
      isActive: p.isActive,
    }));

    this.model.updateMatch(
      players,
      this.matchEngine.ball.x, this.matchEngine.ball.y,
      this.matchEngine.score as [number, number],
      this.matchEngine.phase,
      Math.floor(this.matchEngine.matchTime / 60),
    );
  }

  private handleMatchEvent(event: MatchEvent): void {
    console.log(`[State 04] Event: ${event.type}`, event.data);

    switch (event.type) {
      case 'goal':
        this.matchEngine.handleGoal(event.data?.scoringTeam ?? 0);
        this.model.setEvent('goal', 0, event.data?.playerId ?? 0, this.matchEngine.score as [number, number]);
        this.data.set('eventType', 'goal');
        this.data.set('eventData', event.data);
        this.sm.transitionTo(5);
        break;
      case 'halftime':
        this.matchEngine.phase = MatchPhase.SECOND_HALF;
        this.matchEngine.matchTime = this.matchEngine.halfLength;
        break;
      case 'fulltime':
        this.model.setEvent('fulltime', 0, 0, this.matchEngine.score as [number, number]);
        this.data.set('eventType', 'fulltime');
        this.data.set('finalScore', this.matchEngine.score);
        this.sm.transitionTo(5);
        break;
    }
  }
}
