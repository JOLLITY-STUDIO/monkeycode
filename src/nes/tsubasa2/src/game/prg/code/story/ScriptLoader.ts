/**
 * ScriptLoader — 剧情脚本数据装载
 *
 * 来源：bank18（Data bank）剧情段字节流 + asm $90E4-$94FF 调度器中的 $0D 终止逻辑。
 * 段边界：连续 $0D 序列为段终止，单 $0D 仅为段内换行/继续标记。
 *
 * V0.4 落点：从 BANK18_DATA_TABLES 提取段落表（每段 [startOffset, length]），
 * 通过 listSegments() / loadSegment() 提供具名查询接口给 ScriptEngine。
 *
 * 数据规则（与 asm 行为一致）：
 *   - 段由 [length_lo, length_hi, bytes...] 形式编码（参考 $0D/$0D/$0D/$0D 终止）
 *   - 段未注册时 loadSegment 返回 null
 *   - 多段按 segmentId 0..N 顺序索引
 */
import type { DataStore } from '../../data/store/DataStore';
import { BANK18_DATA_TABLES } from '../../data/scene/bank18-data';

/** 脚本段（声明式数据，来自 asm .byte 提取） */
export interface ScriptSegment {
  /** 段 ID */
  readonly id: number;
  /** 段标签（如 "opening", "match_intro_1" 之类的语义名；可选） */
  readonly label?: string;
  /** 指令流（opcode + 操作数） */
  readonly bytes: ReadonlyArray<number>;
  /** 段内偏移起点（在原始 bank 数据流的全局偏移） */
  readonly offset: number;
}

/** 段表项（id → offset, length） */
export interface ScriptSegmentEntry {
  readonly id: number;
  readonly label?: string;
  readonly offset: number;
  readonly length: number;
}

/**
 * 默认剧情段表（从 bank18 数据流截取的代表性段落）。
 *
 * 占位策略：先用 BANK18_DATA_TABLES 的已知结构（每 16 字节粒度的控制 + 字符流），
 * 提取首段连续的字节流作为 ScriptSegment.bytes。后续 V0.4 收尾时按真实段边界
 * 从全表扫描替换。
 *
 * 注意：以下偏移与长度是基于当前 BANK18_DATA_TABLES 头部结构的占位值，
 * 待 V0.4 全量扫描覆盖（逐对 `0D 0D 0D 0D` 终止识别）。
 */
const DEFAULT_SCRIPT_SEGMENT_TABLE: ReadonlyArray<ScriptSegmentEntry> = [
  // opening 段：bank18 字节流头部 ~256 字节（控制+字符+终止）
  { id: 0, label: 'opening',           offset: 0x0000, length: 0x0100 },
  // 引言段：紧随其后
  { id: 1, label: 'opening_into',      offset: 0x0100, length: 0x0100 },
  // 比赛前剧情（多个场景通用）
  { id: 2, label: 'pre_match',         offset: 0x0200, length: 0x0100 },
  // 比赛中关键剧情（球员对话）
  { id: 3, label: 'match_dialog',      offset: 0x0300, length: 0x0100 },
  // 比赛后剧情
  { id: 4, label: 'post_match',        offset: 0x0400, length: 0x0100 },
  // 标题旁白
  { id: 5, label: 'title_caption',     offset: 0x0500, length: 0x0100 },
];

export class ScriptLoader {
  /** 段表（默认装载，可被外部注入覆盖） */
  private segmentTable: ReadonlyArray<ScriptSegmentEntry> = DEFAULT_SCRIPT_SEGMENT_TABLE;

  constructor(readonly store: DataStore) {}

  /**
   * 注入自定义段表（覆盖默认占位）。
   * 用于 V0.4 全量扫描完后，用真实段边界替换。
   */
  setSegmentTable(entries: ReadonlyArray<ScriptSegmentEntry>): void {
    this.segmentTable = entries;
  }

  /**
   * 取一段脚本（V0.2 数据表接入后实现）
   *
   * 行为：从 BANK18_DATA_TABLES 中按 offset+length 截取段字节流；
   *       id 不在段表中时返回 null。
   */
  loadSegment(scriptId: number): ScriptSegment | null {
    const entry = this.segmentTable.find((e) => e.id === scriptId);
    if (!entry) return null;
    const src = BANK18_DATA_TABLES;
    const start = entry.offset;
    const end = Math.min(src.length, start + entry.length);
    if (start >= src.length) return null;
    const bytes: number[] = [];
    for (let i = start; i < end; i++) bytes.push(src[i] & 0xff);
    return {
      id: entry.id,
      label: entry.label,
      bytes,
      offset: start,
    };
  }

  /** 全部段清单（供差分验证、调试、UI 列示） */
  listSegments(): ReadonlyArray<number> {
    return this.segmentTable.map((e) => e.id);
  }

  /** 段表只读视图（外部诊断用） */
  getSegmentTable(): ReadonlyArray<ScriptSegmentEntry> {
    return this.segmentTable;
  }

  /**
   * 从 BANK18_DATA_TABLES 全量扫描段边界（$0D 终止符）。
   * V0.4 后使用：用此方法生成新的 segmentTable 后注入。
   *
   * 规则：连续 4 字节 $0D 标记段结束（与 $93FB 区段的 asm 终止路径一致）。
   */
  scanSegmentBoundaries(
    bankData: ReadonlyArray<number> = BANK18_DATA_TABLES,
    terminator: number = 0x0d,
    terminatorRun: number = 4,
  ): ScriptSegmentEntry[] {
    const out: ScriptSegmentEntry[] = [];
    let segStart = 0;
    let runLen = 0;
    for (let i = 0; i < bankData.length; i++) {
      const b = bankData[i] & 0xff;
      if (b === terminator) {
        runLen++;
        if (runLen >= terminatorRun) {
          // 段结束（包含 4 字节终止符的尾部，下一段从下一字节起）
          const startOff = segStart;
          const length = i - segStart + 1;
          if (length > terminatorRun) {
            out.push({ id: out.length, offset: startOff, length });
          }
          segStart = i + 1;
          runLen = 0;
        }
      } else {
        runLen = 0;
      }
    }
    // 尾部残余段
    if (segStart < bankData.length - terminatorRun) {
      const len = bankData.length - segStart;
      if (len > terminatorRun) {
        out.push({ id: out.length, offset: segStart, length: len });
      }
    }
    return out;
  }
}
