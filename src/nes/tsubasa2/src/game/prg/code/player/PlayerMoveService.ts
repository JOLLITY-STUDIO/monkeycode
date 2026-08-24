/**
 * PlayerMoveService — 球员移动/AI
 *
 * 行为翻译（去 CPU 化）：
 * - 计算球员移动：方向标志 → 方向运算 → 更新坐标
 * - 解析移动序列段：间接读取移动数据
 * - 处理方向标志：ram_0517 位域 → 翻转/方向判定
 * - 查询移动模式：findMoveById → pattern
 *
 * bank 切换 = import PlayerMoveService + 直接调用，无 MMC3 窗口模拟。
 */
import type { DataStore } from '../../data/store/DataStore';
import { BANK22_MOVE_TABLE, BANK22_DIRECTION_TABLE, findMoveById } from '../../data/tables/player-move-table';

/** 球员移动请求 */
export interface PlayerMoveRequest {
  readonly playerIdx: number;
  readonly targetX: number;
  readonly targetY: number;
  readonly speed: number;
  readonly direction: number;
}

/** 球员移动结果 */
export interface PlayerMoveResult {
  readonly newPosX: number;
  readonly newPosY: number;
  readonly newDirection: number;
  readonly arrived: boolean;
}

export class PlayerMoveService {
  constructor(readonly store: DataStore) {}

  /**
   * 计算球员移动：方向标志 → 方向运算 → 更新坐标。
   * ram_0517 位域控制翻转/方向。
   */
  computeMove(req: PlayerMoveRequest): PlayerMoveResult {
    const directionFlag = this.store.read('ram_0517');
    const flipX = (directionFlag & 0x40) !== 0;
    let dx = req.targetX;
    let dy = req.targetY;
    if (flipX) {
      dx = -dx;
    }
    const newX = (this.store.read('ram_003E') + dx) & 0xFF;
    const newY = (this.store.read('ram_003F') + dy) & 0xFF;
    const arrived = newX === req.targetX && newY === req.targetY;
    return {
      newPosX: newX,
      newPosY: newY,
      newDirection: req.direction,
      arrived,
    };
  }

  /** 解析移动序列段：间接读取移动数据 */
  parseMoveSegment(): number {
    const y = this.store.read('ram_0044');
    const ptr = this.store.read('ram_0042');
    const value = this.store.read(`ram_${ptr}_${y}`);
    this.store.write('ram_0044', 0);
    return value;
  }

  /** 处理方向标志：ram_0517 位域 → 翻转/方向判定 */
  processDirection(): boolean {
    const directionFlag = this.store.read('ram_0517');
    return (directionFlag & 0x40) !== 0;
  }

  /** 查询移动模式：findMoveById → pattern */
  findMovePattern(moveId: number): ReadonlyArray<number> {
    const entry = findMoveById(moveId);
    return entry ? entry.pattern : [];
  }

  /** 导出表供外部访问 */
  get table() { return BANK22_MOVE_TABLE; }
  get directionTable() { return BANK22_DIRECTION_TABLE; }
}