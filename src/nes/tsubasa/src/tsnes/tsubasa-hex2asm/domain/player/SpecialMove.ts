/**
 * 必杀技定义
 *
 * ROM 中每个球员有一个必杀技列表（bank 数据表），
 * 运行时加载到 WRAM 中。
 */

/** 必杀技类型 */
export enum SpecialMoveType {
  /** 射门类 */
  SHOT      = 'shot',
  /** 传球类 */
  PASS      = 'pass',
  /** 过人/盘球类 */
  DRIBBLE   = 'dribble',
  /** 拦截/防守类 */
  TACKLE    = 'tackle',
  /** 扑救类 */
  CATCH     = 'catch',
  /** 组合技 */
  COMBO     = 'combo',
}

/**
 * 必杀技实例
 */
export interface SpecialMove {
  /** ROM 内 ID */
  id: number;
  /** 必杀技名称（中文） */
  name: string;
  /** 类型 */
  type: SpecialMoveType;
  /** 消耗体力 */
  cost: number;
  /** 威力系数 (基础值 × 系数) */
  power: number;
}

/** 已知必杀技列表（后续从 ROM 解出来） */
export const KNOWN_SPECIAL_MOVES: Record<number, SpecialMove> = {
  // 翼
  1:  { id: 1,  name: '抽球射门',    type: SpecialMoveType.SHOT,    cost: 400, power: 200 },
  // 日向
  10: { id: 10, name: '虎射',        type: SpecialMoveType.SHOT,    cost: 450, power: 250 },
  // 岬
  20: { id: 20, name: '黄金搭档',    type: SpecialMoveType.COMBO,   cost: 350, power: 180 },
  // 若岛津
  31: { id: 31, name: '三角跳跃',    type: SpecialMoveType.CATCH,   cost: 300, power: 200 },
};

/**
 * 根据 ID 获取必杀技信息
 */
export function getSpecialMove(id: number): SpecialMove | undefined {
  return KNOWN_SPECIAL_MOVES[id];
}
