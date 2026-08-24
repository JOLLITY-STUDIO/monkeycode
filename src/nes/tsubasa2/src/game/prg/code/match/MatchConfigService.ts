/**
 * MatchConfigService — 比赛配置
 *
 * V0.1 stub：契约签名；配置数据表（data/tables/match-config-table.ts）在 V0.2 提取。
 */
import type { DataStore } from '../../data/store/DataStore';

export class MatchConfigService {
  constructor(readonly store: DataStore) {}

  /** 半场时长（分钟，默认 45） */
  halfLength(): number {
    return 45;
  }

  /** 换人名额 */
  maxSubstitutions(): number {
    return 2;
  }
}