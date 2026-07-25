/**
 * MatchScene — 比賽場景
 *
 * 封裝 match/stage.ts 的 MatchStage，
 * 對接到 Scene 生命週期，由 SceneManager 驅動。
 */

import { Scene, SceneState, NO_INPUT } from './base';
import type { JoypadInput } from './base';
import { Team } from '../team/team';
import { Formation } from '../team/formation';
import { MatchStage } from '../match/stage';

export class MatchScene extends Scene {
  readonly id: number;

  /** 內部比賽實例 */
  readonly match: MatchStage;

  constructor(sceneId: number, home: Team, away: Team, homeFm: Formation, awayFm: Formation) {
    super();
    this.id = sceneId;
    this.match = new MatchStage(home, away, homeFm, awayFm);
  }

  enter(): void {
    this.frameCount = 0;
    this.state = SceneState.RUNNING;
    this.match.enter();
    this.match.kickoff();
  }

  update(input: JoypadInput = NO_INPUT): boolean {
    this.frameCount++;
    this.match.update();
    if (this.match.isFinished()) {
      // TODO: 觸發賽後結算過渡
    }
    return true;
  }

  exit(): void {
    // 清理比賽資源
  }
}
