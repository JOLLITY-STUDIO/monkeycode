/**
 * BootRouter — RESET 分发链 (场景路由)
 * @bank 00/30/31 ($C400/$C64E/$CEFE/$A200)
 *
 * 职责: 真实 RESET 分发链 → BOOT→TITLE→MEETING→STORY→PASSWORD→MATCH→RESULT。
 *
 * 命名规范: 旧名 DispatchService → 新名 BootRouter。
 *
 * TODO: 翻译真实 RESET 分发链
 */
import { DataStore } from '../../data/store/DataStore';

export enum TaskIndex {
  BOOT = 0,
  TITLE = 1,
  MEETING = 2,
  STORY = 3,
  PASSWORD = 4,
  MATCH = 5,
  RESULT = 6,
}

export class BootRouter {
  protected _store: DataStore;

  constructor(store: DataStore) {
    this._store = store;
  }

  /** 每帧推进路由 */
  update(frame: number): void {
    // TODO: 翻译 $C400 分发链
    void frame;
  }
}

export default BootRouter;
