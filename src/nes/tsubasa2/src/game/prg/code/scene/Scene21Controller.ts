/**
 * Scene21Controller — 场景 21 装载 CHR 配置
 *
 * @bank 02 (CPU $A7CE)
 * 行为：loadChrConfig(0x81) → 返回 2 (hub)（ROM $A7CE: LDA #$81; JSR $8AF7）
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
    this.prim.loadChrConfig(0x81);
  }
  onUpdate(_frame: number): number | undefined {
    return NEXT;
  }
}
