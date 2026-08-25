/**
 * Scene13Controller — 场景 13 装载 CHR 0x20 + 装载场景数据 7
 *
 * 行为：loadChrConfig(0x20) + loadSceneData(7) → 返回 14 = 主游戏
 */
import { SceneController } from './SceneController';
import { RenderingPrimitivesService } from '../system/RenderingPrimitivesService';
import type { DataStore } from '../../data/store/DataStore';
import type { InputService } from '../system/InputService';

export class Scene13Controller extends SceneController {
  readonly sceneId = 13;
  private readonly prim: RenderingPrimitivesService;
  constructor(store: DataStore, input: InputService) {
    super(store, input);
    this.prim = new RenderingPrimitivesService(store);
  }
  onEnter(): void {
    this.prim.loadChrConfig(0x20);
    this.prim.loadSceneData(7);
  }
  onUpdate(_frame: number): number | undefined {
    return 0x0e; // → Scene14 主游戏
  }
}
