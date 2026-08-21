/**
 * MatchHudService — HUD 文本流渲染 + 精灵加载
 * @bank 24
 *
 * 职责: 比赛 HUD (比分/时钟/体力条) 文本流渲染。
 *
 * 命名规范: 旧名 Bank24HudService → 新名 MatchHudService。
 *
 * TODO: 翻译 asm/bank24 HUD 文本流
 */
import { DataStore } from '../../data/store/DataStore';

export class MatchHudService {
  protected _store: DataStore;

  constructor(store: DataStore) {
    this._store = store;
  }

  /** HUD 渲染 (原 renderHud) */
  render(frame: number): void {
    // TODO: 翻译 HUD 文本流
    void frame;
  }
}

export default MatchHudService;
