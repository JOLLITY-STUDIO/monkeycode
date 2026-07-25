/**
 * 阵型 — 类型定义 + class Formation
 */

import type { PlayerId, PlayerPosition } from '../unit/player';

// ═══ 阵型类型 ═══

export interface FormationSlot {
  playerId: PlayerId;
  x: number;
  y: number;
  position: PlayerPosition;
}

export enum FormationId {
  F_4_4_2 = 0,
  F_4_3_3 = 1,
  F_3_5_2 = 2,
  F_4_2_4 = 3,
  F_5_3_2 = 4,
  F_3_4_3 = 5,
}

export const FORMATION_NAMES: Record<FormationId, string> = {
  [FormationId.F_4_4_2]: '4-4-2',
  [FormationId.F_4_3_3]: '4-3-3',
  [FormationId.F_3_5_2]: '3-5-2',
  [FormationId.F_4_2_4]: '4-2-4',
  [FormationId.F_5_3_2]: '5-3-2',
  [FormationId.F_3_4_3]: '3-4-3',
};

export const PLAYERS_PER_TEAM = 11;

// ═══ Formation 类 ═══

export class Formation {
  readonly id: FormationId;
  readonly slots: FormationSlot[];

  constructor(id: FormationId, slots: FormationSlot[] = []) {
    this.id = id;
    this.slots = slots;
  }

  get name(): string {
    return FORMATION_NAMES[this.id] ?? `Formation #${this.id}`;
  }

  /** 创建默认 4-4-2 阵型 */
  static default(): Formation {
    const yGk = 190;
    const yDf = 160;
    const yMf = 110;
    const yFw = 60;

    const slots: FormationSlot[] = [
      { playerId: 0,  x: 128, y: yGk, position: 0 as PlayerPosition },
      { playerId: 1,  x:  50, y: yDf, position: 1 as PlayerPosition },
      { playerId: 2,  x: 100, y: yDf, position: 1 as PlayerPosition },
      { playerId: 3,  x: 155, y: yDf, position: 1 as PlayerPosition },
      { playerId: 4,  x: 205, y: yDf, position: 1 as PlayerPosition },
      { playerId: 5,  x:  60, y: yMf, position: 2 as PlayerPosition },
      { playerId: 6,  x: 110, y: yMf, position: 2 as PlayerPosition },
      { playerId: 7,  x: 145, y: yMf, position: 2 as PlayerPosition },
      { playerId: 8,  x: 195, y: yMf, position: 2 as PlayerPosition },
      { playerId: 9,  x:  95, y: yFw, position: 3 as PlayerPosition },
      { playerId: 10, x: 160, y: yFw, position: 3 as PlayerPosition },
    ];

    return new Formation(FormationId.F_4_4_2, slots);
  }
}
