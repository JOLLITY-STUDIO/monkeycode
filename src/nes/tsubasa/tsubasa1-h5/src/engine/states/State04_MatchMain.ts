/**
 * State 04: 比赛主循环
 * 对应 ROM 中 $826A 的处理
 *
 * 比赛核心: 场地渲染、球员移动、球的物理、比赛计时
 */
import { StateBase } from './StateBase';
import { Button } from '../../core/types';
import { MatchEngine, MatchPhase, MatchEvent } from '../MatchEngine';
import { getTeamPlayers, TEAM_LIST } from '../../data/PlayerData';
import { RngGenerator } from '../../utils/RngGenerator';

const GRASS_TILE = 0x00;
const LINE_TILE  = 0x10;

export class State04_MatchMain extends StateBase {
  readonly id = 4;

  private matchEngine!: MatchEngine;
  private rng!: RngGenerator;
  private eventActive: boolean = false;
  private fieldRendered: boolean = false;

  onEnter(): void {
    console.log('[State 04] Match Main - Initializing...');

    // 创建随机数生成器
    this.rng = new RngGenerator();
    this.rng.seed(Date.now() & 0xFF);

    // 创建比赛引擎
    this.matchEngine = new MatchEngine(this.rng);

    // 加载球队数据
    const playerTeamId = this.data.get('playerTeam') as number ?? 0;
    const opponentId = this.data.get('opponentTeam') as number ?? 1;

    const team0Players = getTeamPlayers(playerTeamId);
    const team1Players = getTeamPlayers(opponentId);

    this.matchEngine.initMatch(
      { id: playerTeamId, name: TEAM_LIST[playerTeamId].name, nameJp: TEAM_LIST[playerTeamId].nameJp, formation: '4-4-2', players: team0Players, captain: team0Players.find(p => p.number === 10)?.id ?? 0 },
      { id: opponentId, name: TEAM_LIST[opponentId].name, nameJp: TEAM_LIST[opponentId].nameJp, formation: '4-4-2', players: team1Players, captain: team1Players.find(p => p.number === 10)?.id ?? 0 },
    );

    // 存储 MatchEngine 引用
    this.data.set('matchEngine', this.matchEngine);

    console.log(`[State 04] Match: ${TEAM_LIST[playerTeamId].name} vs ${TEAM_LIST[opponentId].name}`);

    // 设置渲染
    this.banks.chrBank0 = 2;
    this.banks.chrBank1 = 3;
    this.data.mmcBankReg0 = 2;
    this.data.mmcBankReg1 = 3;

    this.data.bankLock = 0;
    this.data.ppuCtrl = 0x90;
    this.data.ppuMask = 0x1E;
    this.data.scrollX = 0;
    this.data.scrollY = 0;

    this.loadMatchScene();
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

    // 渲染更新
    this.renderField();
    this.renderPlayers();
    this.renderBall();
    this.renderHud();
  }

  private loadMatchScene(): void {
    for (let i = 0; i < 960; i++) {
      this.renderer.writeVram(0x2000 + i, 0x00);
    }
    this.fieldRendered = true;
  }

  private renderField(): void {
    // 球场草地 + 边线
    for (let row = 0; row < 30; row++) {
      for (let col = 0; col < 32; col++) {
        let tile = GRASS_TILE;
        if (col === 0 || col === 31 || row === 0 || row === 28) {
          tile = LINE_TILE;
        }
        this.renderer.writeVram(0x2000 + row * 32 + col, tile);
      }
    }
    // 中线
    for (let row = 1; row < 28; row++) {
      this.renderer.writeVram(0x2000 + row * 32 + 16, 0x12);
    }
  }

  private renderPlayers(): void {
    this.oam.clear();
    const players = this.matchEngine.getAllPlayers();

    for (let i = 0; i < Math.min(players.length, 64); i++) {
      const p = players[i];
      if (!p.isActive) continue;

      // 将场地坐标映射到屏幕坐标
      const sx = Math.floor(p.position.x / 256 * 256);
      const sy = Math.floor(p.position.y / 200 * 240);

      const tileIndex = p.hasBall ? 0x30 : 0x20; // 不同 tile 区分持球
      const attr = this.getPlayerTeamAttr(p.playerId);

      this.oam.setSprite(i, {
        y: sy,
        tileIndex,
        attributes: attr,
        x: sx,
      });
    }
  }

  private renderBall(): void {
    const bal = this.matchEngine.ball;
    const sx = Math.floor(bal.x / 256 * 256);
    const sy = Math.floor(bal.y / 200 * 240);

    this.oam.setSprite(63, {
      y: sy,
      tileIndex: 0x38,
      attributes: 0x02,
      x: sx,
    });
  }

  private renderHud(): void {
    const scoreText = `${this.matchEngine.score[0]} - ${this.matchEngine.score[1]}`;
    const period = this.matchEngine.phase === MatchPhase.SECOND_HALF ? '2H' : '1H';
    const timeMin = Math.floor(this.matchEngine.matchTime / 60);
    const timeText = `${period} ${String(timeMin).padStart(2, '0')}'`;

    for (let i = 0; i < scoreText.length; i++) {
      this.renderer.writeVram(0x2000 + 0 * 32 + 13 + i, scoreText.charCodeAt(i));
    }
    for (let i = 0; i < timeText.length; i++) {
      this.renderer.writeVram(0x2000 + 0 * 32 + 22 + i, timeText.charCodeAt(i));
    }
  }

  private getPlayerTeamAttr(playerId: number): number {
    const isTeam0 = this.matchEngine.team0Players.some(p => p.playerId === playerId);
    return isTeam0 ? 0x01 : 0x02;
  }

  private handleMatchEvent(event: MatchEvent): void {
    console.log(`[State 04] Event: ${event.type}`, event.data);

    switch (event.type) {
      case 'goal':
        this.matchEngine.handleGoal(event.data?.scoringTeam ?? 0);
        this.data.set('eventType', 'goal');
        this.data.set('eventData', event.data);
        this.sm.transitionTo(5);
        break;
      case 'halftime':
        this.matchEngine.phase = MatchPhase.SECOND_HALF;
        this.matchEngine.matchTime = this.matchEngine.halfLength;
        break;
      case 'fulltime':
        this.data.set('finalScore', this.matchEngine.score);
        this.sm.transitionTo(5);
        break;
      default:
        break;
    }
  }
}
