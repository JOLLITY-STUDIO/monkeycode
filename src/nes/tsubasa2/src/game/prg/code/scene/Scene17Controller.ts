/**
 * Scene17Controller — 场景 17 装载 CHR 配置
 *
 * @bank 02 (CPU $A77A)
 * 行为：loadChrConfig(0x80) → 返回 2 (hub)（ROM $A77A: LDA #$80; JSR $8AF7）
 */
import { SceneController } from './SceneController';
import { RenderingPrimitivesService } from '../system/RenderingPrimitivesService';
import type { DataStore } from '../../data/store/DataStore';
import type { InputService } from '../system/InputService';

const NEXT = 0x02;

export class Scene17Controller extends SceneController {
  readonly sceneId = 17;
  private readonly prim: RenderingPrimitivesService;
  constructor(store: DataStore, input: InputService) {
    super(store, input);
    this.prim = new RenderingPrimitivesService(store);
  }
  onEnter(): void {
    this.prim.loadChrConfig(0x80);
  }
  onUpdate(_frame: number): number | undefined {
    return NEXT;
  }
}
