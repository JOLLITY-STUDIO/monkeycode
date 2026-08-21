/**
 * PlayerQueryService — 球员/队伍数据查询 + 选项屏幕管理
 * @bank 01 ($A000-$BFFF)
 *
 * 职责: 9 路入口跳板 (球员数据处理/选项屏幕/PPU 图形/字符解码/数据加载/球队初始化),
 * LOOKUP_16BIT 查表, 数值显示链路 (体力/能力 → tile)。
 *
 * 命名规范: 旧名 DataQueryService/bank01_data-query → 新名 PlayerQueryService。
 *
 * TODO: 翻译 asm/bank01 9 路入口 + 数值显示链路
 */
import { DataStore } from '../../data/store/DataStore';

export class PlayerQueryService {
  protected _store: DataStore;

  constructor(store: DataStore) {
    this._store = store;
  }

  /** entry0 球员数据处理 (查能力值, 原 $A01E) */
  queryPlayer(playerId: number, field: number): number {
    // TODO: 翻译 $A01E + LOOKUP_16BIT 查表
    void playerId;
    void field;
    return 0;
  }

  /** entry1 选项屏幕初始化 (原 $A10D) */
  initOptionScreen(): void {
    // TODO: 翻译 $A10D 选项屏幕
  }
}

export default PlayerQueryService;
