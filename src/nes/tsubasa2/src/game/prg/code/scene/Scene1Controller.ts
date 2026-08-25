/**
 * Scene1Controller — 场景 1 数学工具（PRG $A559 实证）
 *
 * 行为：$00EC>>2 取补（s16→s32 扩展）→ 返回 3 = Scene3
 * 不修改运行时状态（仅作为下一个场景调度），直接返回 Scene3
 */
import { SceneController } from './SceneController';
import { RenderingPrimitivesService } from '../system/RenderingPrimitivesService';
import type { DataStore } from '../../data/store/DataStore';
import type { InputService } from '../system/InputService';

export class Scene1Controller extends SceneController {
  readonly sceneId = 1;
  private readonly prim: RenderingPrimitivesService;
  constructor(store: DataStore, input: InputService) {
    super(store, input);
    this.prim = new RenderingPrimitivesService(store);
  }
  onEnter(): void {}
  onUpdate(_frame: number): number | undefined {
    // $A559 (bank02): LSR/ROR×2 → $0060/$0061; 按标志取 16bit 补码
    void this.prim;
    return 0x03; // → Scene3 (跳过 hub)
  }
}
