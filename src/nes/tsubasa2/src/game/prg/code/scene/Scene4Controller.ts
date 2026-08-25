/**
 * Scene4Controller — 场景 4 隐藏全部 OAM（PRG $A5A2 实证）
 *
 * 行为：JSR $9B7F — shadowOam + $0200-$02FF 填 $F8 → 返回 5
 */
import { SceneController } from './SceneController';
import { RenderingPrimitivesService } from '../system/RenderingPrimitivesService';
import type { DataStore } from '../../data/store/DataStore';
import type { InputService } from '../system/InputService';

export class Scene4Controller extends SceneController {
  readonly sceneId = 4;
  private readonly prim: RenderingPrimitivesService;
  constructor(store: DataStore, input: InputService) {
    super(store, input);
    this.prim = new RenderingPrimitivesService(store);
  }
  onEnter(): void {
    this.prim.hideOam();
  }
  onUpdate(_frame: number): number | undefined {
    return 0x05; // → Scene5
  }
}
