/**
 * Scene21Controller — 场景 21 装载 CHR 配置
 */
import { SceneController } from './SceneController';
import { RenderingPrimitivesService } from '../system/RenderingPrimitivesService';
import type { DataStore } from '../../data/store/DataStore';
import type { InputService } from '../system/InputService';

const NEXT = 0x02;

export class Scene21Controller extends SceneController {
  readonly sceneId = 21;
  private readonly prim: RenderingPrimitivesService;
  constructor(store: DataStore, input: InputService) {
    super(store, input);
    this.prim = new RenderingPrimitivesService(store);
  }
  onEnter(): void {
    this.prim.loadChrConfig(0x00);
  }
  onUpdate(_frame: number): number | undefined {
    return NEXT;
  }
}
