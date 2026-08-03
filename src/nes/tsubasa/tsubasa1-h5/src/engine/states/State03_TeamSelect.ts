/**
 * State 03: 队伍选择
 * 对应 ROM 中 $8264 的处理
 */

import { StateBase } from './StateBase';
import { Button } from '../../core/types';

export class State03_TeamSelect extends StateBase {
  readonly id = 3;

  private selectedTeam: number = 0;
  private readonly teams = [
    'Nankatsu (南葛)',     // 南葛
    'Toho (東邦)',          // 東邦
    'Furano (富良野)',      // 富良野
    'Musashi (武蔵)',       // 武蔵
    'Otomo (大友)',         // 大友
    'Hanawa (花輪)',        // 花輪
    'Meiwa (明和)',         // 明和
  ];

  onEnter(): void {
    console.log('[State 03] Team Select');
    this.selectedTeam = 0;
  }

  onUpdate(): void {
    if (this.input.isPressed(Button.LEFT)) {
      this.selectedTeam = (this.selectedTeam - 1 + this.teams.length) % this.teams.length;
    }
    if (this.input.isPressed(Button.RIGHT)) {
      this.selectedTeam = (this.selectedTeam + 1) % this.teams.length;
    }
    if (this.input.isPressed(Button.A)) {
      this.confirmTeam();
      return;
    }
    if (this.input.isPressed(Button.B)) {
      this.sm.transitionTo(2); // 返回菜单
      return;
    }
  }

  private confirmTeam(): void {
    console.log(`[State 03] Team selected: ${this.teams[this.selectedTeam]}`);
    this.data.set('playerTeam', this.selectedTeam);
    this.sm.transitionTo(4); // → Match Main
  }
}
