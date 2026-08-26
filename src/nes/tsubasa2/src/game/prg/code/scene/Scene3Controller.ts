/**
 * Scene3Controller — 场景 3 清 NT0/NT1（bank02 $8582-$85A2 实证）
 *
 * 行为（PRG $8582）：
 *   fillNametableRows(0x00, 0x20, 0x10, 0x20, 0x00)  // NT0 $2000，16 行 × 32 列
 *   fillNametableRows(0x00, 0x24, 0x20, 0x20, 0x00)  // NT1 $2400，32 行 × 32 列
 *   返回 2 = hub
 */
import { SceneController } from './SceneController';
import { RenderingPrimitivesService } from '../system/RenderingPrimitivesService';
import type { DataStore } from '../../data/store/DataStore';
import type { InputService } from '../system/InputService';

const NEXT = 0x02;

export class Scene3Controller extends SceneController {
  readonly sceneId = 3;
  private readonly prim: RenderingPrimitivesService;
  constructor(store: DataStore, input: InputService) {
    super(store, input);
    this.prim = new RenderingPrimitivesService(store);
  }
  onEnter(): void {
    this.prim.fillNametableRows(0x00, 0x20, 0x10, 0x20, 0x00);
    this.prim.fillNametableRows(0x00, 0x24, 0x20, 0x20, 0x00);
  }
  onUpdate(_frame: number): number | undefined {
    return NEXT;
  }
}
