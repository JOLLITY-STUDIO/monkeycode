/**
 * Scene20Controller — 场景 20 精灵属性清位（$A82F 变体）
 *
 * @bank 02 (CPU $A7BD)
 *
 * 行为（已对照 ROM 字节级验证）：
 *   等 1 帧 → $A82F：A=$B0(endIdx) / X=$64(startIdx) / Y=$28(外迭代 0x28 次)，
 *   每次外迭代 = { 内层 $0468+X 循环清 $046A bit2/3；等 1 帧 }
 *   完成 → 返回 2 (hub)
 *
 * 等 1 帧用基类 scheduleAfter(1) 替代 PRG $9FA8 pushState 模式。
 */
import { SceneController } from './SceneController';
import { RenderingPrimitivesService } from '../system/RenderingPrimitivesService';
import type { DataStore } from '../../data/store/DataStore';
import type { InputService } from '../system/InputService';

const NEXT = 0x02;
const OUTER = 0x28; // Y=$28

export class Scene20Controller extends SceneController {
  readonly sceneId = 20;
  private readonly prim: RenderingPrimitivesService;
  private outer = 0;
  private ready = false;
  constructor(store: DataStore, input: InputService) {
    super(store, input);
    this.prim = new RenderingPrimitivesService(store);
  }
  onEnter(): void {
    this.outer = 0;
    this.ready = false;
    // 先等 1 帧（$9FA8）
    this.scheduleAfter(1, () => { this.ready = true; });
  }
  onUpdate(_frame: number): number | undefined {
    if (!this.ready) return undefined;
    if (this.outer >= OUTER) return NEXT;
    // $A82F 内层：X=$64..$B0 步长 4，$0468,X(y)<$82 → $046A,X &= ~$0C
    this.prim.a82fClearSpriteAttrIter(0xb0, 0x64);
    this.outer++;
    this.ready = false;
    this.scheduleAfter(1, () => { this.ready = true; });
    return undefined;
  }
}
