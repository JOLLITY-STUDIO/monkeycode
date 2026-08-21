/**
 * ScriptLoader — 脚本数据装载器
 * @bank 00 (脚本 ID 表 $8AEC → bank03-06 文本脚本)
 *
 * 职责: 脚本 id → bank 判定 (3/4/5/6) → 入口指针解析 → 指令流。
 *
 * 命名规范: 旧名 script-data-loader → 新名 ScriptLoader。
 *
 * TODO: 翻译 $8AEC 脚本 ID 映射 + 入口指针解析
 */
import type { DataStore } from '../../data/store/DataStore';

export interface ScriptData {
  bank: number;
  data: readonly number[];
}

export function getScriptData(scriptId: number): ScriptData | undefined {
  // TODO: 翻译脚本 ID → bank 映射 + 数据读取
  void scriptId;
  return undefined;
}

export function initScriptLoader(_store: DataStore): void {
  // TODO: 注册脚本加载器
}

export default getScriptData;
