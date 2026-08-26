/**
 * Scene11Controller — 场景 11 分支型（bank02 $85E9-$85FD 实证）
 *
 * 行为：if ($000D != 0) { $000D=0; $000E=0; } else { loadChrConfig(0x10); loadSceneData(6); }
 * 两分支均返回 2 = hub
 */
import { SceneController } from './SceneController';
import { RenderingPrimitivesService } from '../system/RenderingPrimitivesService';
import type { DataStore } from '../../data/store/DataStore';
import type { InputService } from '../system/InputService';

export class Scene11Controller extends SceneController {
  readonly sceneId = 11;
  private readonly prim: RenderingPrimitivesService;
  constructor(store: DataStore, input: InputService) {
    super(store, input);
    this.prim = new RenderingPrimitivesService(store);
  }
  onEnter(): void {
    const store = this.store;
    if (store.readByte(0x000d) !== 0) {
      store.writeByte(0x000d, 0);
      store.writeByte(0x000e, 0);
    } else {
      this.prim.loadChrConfig(0x10);
      this.prim.loadSceneData(6);
    }
  }
  onUpdate(_frame: number): number | undefined {
    return 0x02; // → hub
  }
}
