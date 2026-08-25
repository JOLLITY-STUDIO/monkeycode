/**
 * Scene10Controller — 场景 10 装载 CHR 配置 0 + 装载场景数据 5
 *
 * 行为：loadChrConfig(0x00) + loadSceneData(5) → 返回 11
 */
import { SceneController } from './SceneController';
import { RenderingPrimitivesService } from '../system/RenderingPrimitivesService';
import type { DataStore } from '../../data/store/DataStore';
import type { InputService } from '../system/InputService';

export class Scene10Controller extends SceneController {
  readonly sceneId = 10;
  private readonly prim: RenderingPrimitivesService;
  constructor(store: DataStore, input: InputService) {
    super(store, input);
    this.prim = new RenderingPrimitivesService(store);
  }
  onEnter(): void {
    this.prim.loadChrConfig(0x00);
    this.prim.loadSceneData(5);
  }
  onUpdate(_frame: number): number | undefined {
    return 0x0b; // → Scene11
  }
}
