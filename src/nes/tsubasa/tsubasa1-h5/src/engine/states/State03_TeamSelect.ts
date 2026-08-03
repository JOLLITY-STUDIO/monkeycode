/**
 * State 03: 队伍选择
 * 对应 ROM 中 $8264 的处理
 *
 * 玩家选择自己的队伍，然后加载对手队伍并进入比赛。
 */
import { StateBase } from './StateBase';
import { Button } from '../../core/types';
import { TEAM_LIST, getTeamPlayers } from '../../data/PlayerData';

export class State03_TeamSelect extends StateBase {
  readonly id = 3;

  private selectedTeam: number = 0;
  private teams = TEAM_LIST;

  onEnter(): void {
    console.log('[State 03] Team Select');
    this.selectedTeam = 0;

    this.banks.chrBank0 = 0;
    this.banks.chrBank1 = 1;
    this.data.mmcBankReg0 = 0;
    this.data.mmcBankReg1 = 1;

    this.data.ppuCtrl = 0x90;
    this.data.ppuMask = 0x1E;
    this.data.scrollX = 0;
    this.data.scrollY = 0;

    this.loadTeamSelectScreen();
    this.updateDisplay();
  }

  onUpdate(): void {
    if (this.input.isPressed(Button.LEFT)) {
      this.selectedTeam = (this.selectedTeam - 1 + this.teams.length) % this.teams.length;
      this.updateDisplay();
    }
    if (this.input.isPressed(Button.RIGHT)) {
      this.selectedTeam = (this.selectedTeam + 1) % this.teams.length;
      this.updateDisplay();
    }
    if (this.input.isPressed(Button.A)) {
      this.confirmTeam();
      return;
    }
    if (this.input.isPressed(Button.B)) {
      this.sm.transitionTo(2);
      return;
    }
  }

  private loadTeamSelectScreen(): void {
    for (let i = 0; i < 960; i++) {
      this.renderer.writeVram(0x2000 + i, 0x00);
    }
    const title = 'SELECT  TEAM';
    for (let i = 0; i < title.length; i++) {
      const ch = title.charCodeAt(i);
      this.renderer.writeVram(0x2000 + 3 * 32 + 8 + i, ch === 0x20 ? 0x00 : ch);
    }
    for (let i = 0; i < 64; i++) {
      this.renderer.writeVram(0x23C0 + i, 0x00);
    }
  }

  private updateDisplay(): void {
    const team = this.teams[this.selectedTeam];
    // 清除
    for (let col = 0; col < 30; col++) {
      this.renderer.writeVram(0x2000 + 10 * 32 + col, 0x00);
      this.renderer.writeVram(0x2000 + 12 * 32 + col, 0x00);
    }
    // 队伍名称
    const nameStartCol = 12;
    for (let i = 0; i < team.name.length; i++) {
      this.renderer.writeVram(0x2000 + 10 * 32 + nameStartCol + i, team.name.charCodeAt(i));
    }

    // 显示球员数
    const players = getTeamPlayers(team.id);
    const info = `${players.length}P`;
    for (let i = 0; i < info.length; i++) {
      this.renderer.writeVram(0x2000 + 12 * 32 + nameStartCol + i, info.charCodeAt(i));
    }

    // 光标
    this.oam.clear();
    this.oam.setSprite(0, { y: 76, tileIndex: 0x10, attributes: 0x01, x: 64 });
    this.oam.setSprite(1, { y: 76, tileIndex: 0x11, attributes: 0x41, x: 192 });

    console.log(`[State 03] Team: ${team.name} (${team.nameJp})`);
  }

  private confirmTeam(): void {
    const team = this.teams[this.selectedTeam];
    console.log(`[State 03] Confirmed: ${team.name}`);

    // 存储选择
    this.data.set('playerTeam', this.selectedTeam);
    this.data.set('playerTeamName', team.name);

    // 选一个对手 (默认选 Toho)
    const opponentIdx = this.selectedTeam === 1 ? 0 : 1;
    this.data.set('opponentTeam', opponentIdx);
    this.data.set('opponentTeamName', this.teams[opponentIdx].name);

    this.sm.transitionTo(4);
  }
}
