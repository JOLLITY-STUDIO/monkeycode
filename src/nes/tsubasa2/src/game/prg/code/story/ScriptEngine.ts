/**
 * ScriptEngine — 剧情脚本执行引擎
 *
 * V0.1 stub：契约签名；opcode 全集在 V0.4 覆盖。
 */
import type { DataStore } from '../../data/store/DataStore';
import type { ScriptLoader } from './ScriptLoader';

/** 脚本运行状态 */
export interface ScriptContext {
  /** 当前指令指针（脚本数据内偏移） */
  ip: number;
  /** 参数栈 */
  stack: number[];
  /** 等待帧计数（WAIT opcode） */
  waitFrames: number;
  /** 是否等待用户输入 */
  waitingInput: boolean;
  /** 结束标志 */
  finished: boolean;
}

export class ScriptEngine {
  constructor(
    readonly store: DataStore,
    readonly loader: ScriptLoader,
  ) {}

  /** 装载并启动一段脚本 */
  start(scriptId: number): ScriptContext {
    // TODO V0.4: 翻译脚本启动（装载段 → 初始化上下文）
    void scriptId;
    return { ip: 0, stack: [], waitFrames: 0, waitingInput: false, finished: false };
  }

  /** 执行一帧脚本（返回是否仍在运行） */
  step(ctx: ScriptContext, frame: number): boolean {
    // TODO V0.4: 翻译脚本 VM 主循环（fetch opcode → dispatch）
    void ctx;
    void frame;
    return false;
  }
}