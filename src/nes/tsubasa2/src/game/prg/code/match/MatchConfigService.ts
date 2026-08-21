/**
 * MatchConfigService — 比赛对阵/阵型/等级配置
 * @bank 28
 *
 * 职责: 比赛配置表 (对阵/阵型/等级/OAM), $8528 队伍表, $8A9D 属性角色表。
 *
 * 命名规范: 旧名 Bank28MatchService → 新名 MatchConfigService。
 *
 * TODO: 翻译 asm/bank28 配置表
 */
import { DataStore } from '../../data/store/DataStore';

export class MatchConfigService {
  protected _store: DataStore;

  constructor(store: DataStore) {
    this._store = store;
  }

  /** 读取比赛配置 (原 readMatchConfig) */
  getConfig(matchIndex: number): Readonly<Record<string, number>> {
    // TODO: 结构化比赛配置表
    void matchIndex;
    return {};
  }
}

export default MatchConfigService;
