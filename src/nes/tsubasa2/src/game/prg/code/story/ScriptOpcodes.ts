/**
 * ScriptOpcodes — 脚本长指令表 ($8545) + 等待帧表 ($8AE6)
 * @bank 00
 *
 * 职责: 指令码 → 处理器映射, 文本/对话控制码定义。
 *
 * 命名规范: 旧名 script-opcodes → 新名 ScriptOpcodes。
 *
 * TODO: 从 asm/bank00/code_main.s 提取 $8545/$8AE6 指令表
 */
import type { DataStore } from '../../data/store/DataStore';

export const SCRIPT_OPCODES: Record<number, string> = {
  // TODO: 从 asm 提取长指令表
};

export const WAIT_FRAME_TABLE: readonly number[] = [
  // TODO: 从 asm 提取等待帧表 $8AE6
];

export function initScriptOpcodes(_store: DataStore): void {
  // TODO: 注册指令处理器
}

export default SCRIPT_OPCODES;
