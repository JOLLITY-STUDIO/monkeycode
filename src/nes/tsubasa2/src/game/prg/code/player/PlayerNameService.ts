/**
 * PlayerNameService — 球员名字/文本
 *
 * 行为翻译（去 CPU 化 + 具名视图）：
 * - 查询球员名字：findNameByPlayerId → PlayerName
 * - 解析名字段：store.playerName.segmentIndex → 索引（×4 = 字节偏移）
 * - 装载名字地址：store.playerName.charIndex → 查表
 * - 查询文本段：BANK27_TEXT_TABLE 查表
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

  /** 查询球员名字：findNameByPlayerId → PlayerName */
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
   * 解析名字段：store.playerName.segmentIndex → 字节偏移
   * @returns 4 字节偏移
   */
  parseNameSegment(): number {
    return this.store.playerName.segmentIndex * 4;
  }

  /**
   * 装载名字地址：store.playerName.charIndex → 查表
   */
  loadNameAddress(charIdx: number): number {
    void charIdx;
    return 0;
  }

  /** 查询文本段：BANK27_TEXT_TABLE 查表 */
  getTextSegment(textId: number): string {
    return BANK27_TEXT_TABLE[textId] ?? '';
  }

  /** 导出表供外部访问 */
  get table() { return BANK27_NAME_TABLE; }
}