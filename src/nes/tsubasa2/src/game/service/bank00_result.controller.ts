/**
 * RESULT 场景控制器 (赛果画面)
 *
 * ⚠️ 骨架 (stub)。原版赛果画面由 Bank00/Bank24 绘制:
 *   显示最终比分、胜负判定、可能的中间剧情衔接。
 * 当前实现: 从 DataStore 读取比分 (ram_0621/ram_044E 等),
 *   显示赛果文本, A 键返回 TITLE。
 *
 * 后续补全: 赛果画面布局/动画/胜负分支 (对应原版赛果渲染逻辑)。
 */

import { DataStore } from '../data/DataStore';

/** 比分在 DataStore 中的键 (TODO: 对齐 Bank26 实际写入字段) */
const KEY_SCORE_HOME = 'ram_044E';
const KEY_SCORE_AWAY = 'ram_0621';

export class ResultController {
  private _store: DataStore;
  private _frame = 0;

  constructor(store: DataStore) {
    this._store = store;
  }

  /** 进入赛果场景 — 重置帧计数 */
  init(): void {
    this._frame = 0;
  }

  /** 每帧更新 — 返回 true 表示用户确认 (应返回 TITLE) */
  update(buttons: number, _frameCount: number): boolean {
    this._frame++;
    // A 键确认 → 返回标题
    if ((buttons & 0x01) !== 0) {
      return true;
    }
    return false;
  }

  /** 当前比分 (供渲染层消费) */
  getScore(): { home: number; away: number } {
    return {
      home: this._store.read(KEY_SCORE_HOME) & 0xff,
      away: this._store.read(KEY_SCORE_AWAY) & 0xff,
    };
  }

  /** 是否主队获胜 */
  isWin(): boolean {
    const s = this.getScore();
    return s.home > s.away;
  }
}
