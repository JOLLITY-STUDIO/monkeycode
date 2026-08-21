/**
 * BootRouter — RESET 分发链 + $8484 密码/场景分发器
 * @bank 02 ($A000-$BFFF 窗口)
 *
 * 职责:
 *   1. $8484 分发器 (asm $8484-$8490):
 *      LDA ram_00ED; ASL; TAX; 查 PASSWORD_DISPATCH_TABLE → RTS 跳转。
 *   2. RESET 分发链 → BOOT→TITLE→MEETING→STORY→PASSWORD→MATCH→RESULT。
 *
 * 命名规范: 旧名 DispatchService → 新名 BootRouter。
 */
import { DataStore } from '../../data/store/DataStore';
import { PASSWORD_DISPATCH_TABLE } from '../../data/tables/password-table';
import type { SceneController } from '../scene/SceneController';

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
  protected _scene: SceneController | null = null;

  constructor(store: DataStore, scene?: SceneController) {
    this._store = store;
    this._scene = scene ?? null;
  }

  /** 挂接场景控制器 (由外层组合根注入) */
  attachScene(scene: SceneController): void {
    this._scene = scene;
  }

  /**
   * $8484 密码/场景分发器 (对应原始 $8484:)
   * LDA ram_00ED → ASL → TAX → 查 PASSWORD_DISPATCH_TABLE → 跳转。
   *
   * @param index 场景索引 (ram_00ED 值)
   * @returns 被分发到的目标地址 (16 位), 或 -1 越界。
   */
  dispatchByIndex(index: number): number {
    const t = index & 0xff;
    const table = PASSWORD_DISPATCH_TABLE;
    if (t >= table.length) return -1;
    return table[t];
  }

  /**
   * 密码分发主入口 (对应原始 $8484 的调用语义)。
   * 翻译版不执行 6502 的 PHA/RTS 跳转, 直接返回目标场景索引交给 SceneController。
   */
  dispatchPassword(index: number): number {
    return this.dispatchByIndex(index);
  }

  /** 每帧推进路由 */
  update(frame: number): void {
    // 依据 ram_00ED 分发当前场景
    const idx = this._store.read('ram_00ED') & 0xff;
    const target = this.dispatchByIndex(idx);
    if (target >= 0) {
      this._scene?.onDispatched(idx, target);
    }
    void frame;
  }

  /**
   * RESET 分发链 (BOOT→TITLE→MEETING→STORY→PASSWORD→MATCH→RESULT)。
   * 对应真实 RESET 后场景推进顺序。
   */
  resetChain(): void {
    this._store.write('ram_00ED', TaskIndex.BOOT);
  }

  /** 推进到下一个场景 (RESET 链顺序推进) */
  next(): void {
    const cur = this._store.read('ram_00ED') & 0xff;
    const next = Math.min(cur + 1, TaskIndex.RESULT);
    this._store.write('ram_00ED', next);
  }
}

export default BootRouter;
