/**
 * ScriptEngine — 剧情脚本虚拟机
 * @bank 00 (脚本分派器 $84E7, 等待帧表 $8AE6, 长指令表 $8545)
 *
 * 职责: 逐帧执行文本脚本指令流, 驱动对话/剧情场景。
 *
 * 命名规范: 旧名 ScriptVM → 新名 ScriptEngine。
 *
 * TODO: 翻译 $84E7 脚本分派器 + 指令集
 */
import { DataStore } from '../../data/store/DataStore';

export class ScriptEngine {
  protected _store: DataStore;

  constructor(store: DataStore) {
    this._store = store;
  }

  /** 装载脚本 id (原 $8464 scriptLoader) */
  loadScript(scriptId: number): void {
    // TODO: 翻译 $8464 scriptLoader
    void scriptId;
  }

  /** 每帧推进脚本 */
  update(frame: number): void {
    // TODO: 翻译 $84E7 脚本分派
    void frame;
  }
}

export default ScriptEngine;
