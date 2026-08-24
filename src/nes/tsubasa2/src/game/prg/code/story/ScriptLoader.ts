/**
 * ScriptLoader — 剧情脚本数据装载
 *
 * V0.4 D2 落地: 从 BANK18_DATA_TABLES 装载脚本段。
 *
 * 真实脚本段布局（待 V0.4 进一步反汇编后细化）：
 *   - bank18 主存脚本数据流（每个段以 0xFF 终止）
 *   - bank03-bank10 故事脚本（按剧情切换）
 *   - bank19 故事相关 sprite/动画
 *
 * 当前实现：每段 = BANK18_DATA_TABLES 的一个 16KB 切片（按段 ID 索引），
 * 实际游戏中通过 IP 重置 + JumpSegment 跨段跳转。
 */
import type { DataStore } from '../../data/store/DataStore';
import { BANK18_DATA_TABLES } from '../../data/scene/bank18-data';

/** 脚本段（声明式数据） */
export interface ScriptSegment {
  /** 段 ID */
  readonly id: number;
  /** 指令流（opcode + 操作数） */
  readonly bytes: ReadonlyArray<number>;
}

const SEGMENT_SIZE = 0x1000; // 每段 4KB

/** 预分割段：按 SEGMENT_SIZE 切分 BANK18_DATA_TABLES */
const SEGMENT_BYTES: ReadonlyArray<ReadonlyArray<number>> = (() => {
  const out: ReadonlyArray<number>[] = [];
  for (let i = 0; i < BANK18_DATA_TABLES.length; i += SEGMENT_SIZE) {
    out.push(BANK18_DATA_TABLES.slice(i, i + SEGMENT_SIZE));
  }
  return out;
})();

export class ScriptLoader {
  constructor(readonly store: DataStore) {}

  /** 按段 ID 装载（V0.4 已实现：返回 BANK18 切分段） */
  loadSegment(scriptId: number): ScriptSegment | null {
    const id = scriptId & 0xff;
    const seg = SEGMENT_BYTES[id];
    if (!seg) return null;
    return { id, bytes: seg };
  }

  /** 全部段清单（按 BANK18 切片） */
  listSegments(): ReadonlyArray<number> {
    const ids: number[] = [];
    for (let i = 0; i < SEGMENT_BYTES.length; i++) {
      if (SEGMENT_BYTES[i].length > 0) ids.push(i);
    }
    return ids;
  }

  /** 段字节长度 */
  segmentLength(scriptId: number): number {
    return SEGMENT_BYTES[scriptId & 0xff]?.length ?? 0;
  }
}
