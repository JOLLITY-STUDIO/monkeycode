/**
 * ScriptLoader — 剧情脚本数据装载（原 bank00 脚本 loader）
 *
 * @bank 00 / 18 / 19
 *
 * V0.1 stub：数据表（data/scene/scripts-*.ts）在 V0.2 从 asm 提取后装载。
 */
import type { DataStore } from '../../data/store/DataStore';

/** 脚本段（声明式数据，来自 asm .byte 提取） */
export interface ScriptSegment {
  /** 段 ID */
  readonly id: number;
  /** 指令流（opcode + 操作数） */
  readonly bytes: ReadonlyArray<number>;
}

export class ScriptLoader {
  constructor(readonly store: DataStore) {}

  /** 取一段脚本（V0.2 数据表接入后实现） */
  loadSegment(scriptId: number): ScriptSegment | null {
    // TODO V0.2/V0.4: 从 data/scene/scripts-*.ts 读取段
    void scriptId;
    return null;
  }

  /** 全部段清单（供差分验证） */
  listSegments(): ReadonlyArray<number> {
    return [];
  }
}
