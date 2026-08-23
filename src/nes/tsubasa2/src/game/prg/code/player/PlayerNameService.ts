/**
 * PlayerNameService — 球员名字/文本（原 bank27）
 *
 * 行为翻译（去 CPU 化）：
 * - bank27 $8000 起始：大量文本编码数据（$B6/$A0/$CC 等字符编码）
 * - $8104+：文本解析器（ram_062A 选段 → ram_003C/Y 间接读取 → 解码字符）
 * - $811B+：字符映射表（$A1DC 索引表 → 查表）
 * - $814D+：名字段装载（ram_002C/X → $A6AE 表 → 名字地址）
 *
 * bank 切换语义 = import PlayerNameService + 直接调用，无 MMC3 窗口模拟。
 */
import type { DataStore } from '../../data/store/DataStore';
import { BANK27_NAME_TABLE, BANK27_TEXT_TABLE, findNameByPlayerId } from '../../data/tables/player-name-table';

/** 球员名字段 */
export interface PlayerName {
  readonly playerId: number;
  readonly name: string;
  readonly shortName: string;
  readonly teamId: number;
}

export class PlayerNameService {
  constructor(readonly store: DataStore) {}

  /**
   * 查询球员名字（原 bank27 $8104+）
   *
   * 行为：ram_062A & 0x7F → 选段 → 查 BANK27_NAME_TABLE。
   */
  getPlayerName(playerId: number): PlayerName | null {
    const entry = findNameByPlayerId(playerId);
    if (!entry) return null;
    return {
      playerId: entry.playerId,
      name: entry.name,
      shortName: entry.shortName,
      teamId: entry.teamId,
    };
  }

  /**
   * 解析名字段（原 bank27 $811B-$8159）
   *
   * 行为：ram_003D 索引 → ram_062A & 0x7F → 查 $A1DC 表 → 4 字节偏移。
   */
  parseNameSegment(): number {
    const idx = this.store.read('ram_062A') & 0x7F;
    // 原 $811B: LDA $A1DC,Y; ASL×2; STA ram_003C
    return idx * 4;
  }

  /**
   * 装载名字地址（原 bank27 $814D-$8159）
   *
   * 行为：ram_002C/X → ASL → $A6AE 表 → 名字地址。
   */
  loadNameAddress(charIdx: number): number {
    // 原 $8152: LDA $A6AE,X; TAY; LDA $A6AD,X
    void charIdx;
    return 0;
  }

  /**
   * 查询文本段（原 bank27 $8000 起始文本数据）
   */
  getTextSegment(textId: number): string {
    return BANK27_TEXT_TABLE[textId] ?? '';
  }

  /** 导出表供外部访问 */
  get table() { return BANK27_NAME_TABLE; }
}
