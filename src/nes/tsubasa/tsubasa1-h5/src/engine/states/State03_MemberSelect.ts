/**
 * State 03: 队员选择 (纯逻辑 — 只更新 GameModel)
 *
 * 原游戏中玩家球队固定为南葛(Nankatsu)，不存在队伍选择。
 * 此状态用于选择/查看上场队员、调整阵型。
 * 对手由剧情推进决定，非玩家选择。
 *
 * v0.6.0: 已移除所有 renderer/oam 直接调用，通过 GameModel 通信。
 */
import { StateBase } from './StateBase';
import { Button } from '../../core/types';
import { PLAYER_DATA, TEAM_LIST, getTeamPlayers } from '../../data/PlayerData';
import type { PlayerStats } from '../../data/PlayerData';

/** 玩家固定球队 ID */
const PLAYER_TEAM_ID = 0; // 南葛 Nankatsu

export class State03_MemberSelect extends StateBase {
  readonly id = 3;

  /** 南葛全队名单 */
  private players: PlayerStats[] = [];

  /** 当前光标位置 */
  private cursorIndex: number = 0;

  /** 活跃队员号码 */
  private activeNumbers: number[] = [];

  onEnter(): void {
    console.log('[State 03] Member Select - Player team: Nankatsu (fixed)');
    this.cursorIndex = 0;

    this.players = getTeamPlayers(PLAYER_TEAM_ID);
    this.activeNumbers = this.players.slice(0, 11).map(p => p.number);

    this.banks.chrBank0 = 0;
    this.banks.chrBank1 = 1;
    this.data.mmcBankReg0 = 0;
    this.data.mmcBankReg1 = 1;
    this.data.ppuCtrl = 0x90;
    this.data.ppuMask = 0x1E;
    this.data.scrollX = 0;
    this.data.scrollY = 0;

    this.syncModel();
  }

  onUpdate(): void {
    if (this.input.isPressed(Button.UP)) {
      this.cursorIndex = (this.cursorIndex - 1 + this.players.length) % this.players.length;
      this.syncModel();
    }
    if (this.input.isPressed(Button.DOWN)) {
      this.cursorIndex = (this.cursorIndex + 1) % this.players.length;
      this.syncModel();
    }
    if (this.input.isPressed(Button.A)) {
      this.togglePlayerActive();
      this.syncModel();
    }
    if (this.input.isPressed(Button.START)) {
      this.confirmSelection();
      return;
    }
    if (this.input.isPressed(Button.B)) {
      this.sm.transitionTo(2);
      return;
    }
  }

  /** 将当前状态同步到 GameModel */
  private syncModel(): void {
    const members = this.players.map(p => ({
      number: p.number,
      name: p.name,
      position: ['GK', 'DF', 'MF', 'FW'][p.position] ?? 'DF',
      speed: p.speed,
      power: p.power,
      technique: p.technique,
      stamina: p.stamina,
      isActive: this.activeNumbers.includes(p.number),
    }));
    this.model.setMemberSelect(TEAM_LIST[PLAYER_TEAM_ID].name, members, this.cursorIndex);
  }

  private togglePlayerActive(): void {
    const player = this.players[this.cursorIndex];
    const idx = this.activeNumbers.indexOf(player.number);

    if (idx >= 0) {
      if (this.activeNumbers.length > 1) {
        this.activeNumbers.splice(idx, 1);
      }
    } else {
      if (this.activeNumbers.length < 11) {
        this.activeNumbers.push(player.number);
        this.activeNumbers.sort((a, b) => a - b);
      }
    }
  }

  private confirmSelection(): void {
    if (this.activeNumbers.length < 7) {
      console.log('[State 03] Need at least 7 active players');
      return;
    }

    const teamName = TEAM_LIST[PLAYER_TEAM_ID].name;
    console.log(`[State 03] Confirmed: ${teamName} with ${this.activeNumbers.length} players`);

    this.data.set('playerTeam', PLAYER_TEAM_ID);
    this.data.set('playerTeamName', teamName);
    this.data.set('activeNumbers', this.activeNumbers);
    this.data.set('opponentTeam', 1);
    this.data.set('opponentTeamName', TEAM_LIST[1].name);
    this.data.set('opponentIndex', 0);

    this.sm.transitionTo(4);
  }
}
