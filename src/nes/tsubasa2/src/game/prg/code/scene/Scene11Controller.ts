/**
 * Scene11Controller — 场景 11 分支型：若 $000D≠0 清 $000D/$000E；否则装载 CHR 0x10 + 场景数据 6
 *
 * 行为：if ($000D != 0) { $000D=0; $000E=0; } else { loadChrConfig(0x10); loadSceneData(6); }
 * 返回 12
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
    return 0x0c; // → Scene12
  }
}
