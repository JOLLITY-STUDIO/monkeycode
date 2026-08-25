/**
 * Scene18Controller — 场景 18 等 2 帧；精灵属性翻转
 *
 * 行为：等 2 帧 → oamFlipAttrs() → 返回 2 (hub)
 *
 * 注：使用 TileBuilderService.flipAllSpritePalettes()（PRG $88FB 翻译），
 *     替代旧 RenderingPrimitivesService.oamFlipAttrs()（已删除以避免 deadcode）。
 */
import { SceneController } from './SceneController';
import { TileBuilderService } from '../system/TileBuilderService';
import type { DataStore } from '../../data/store/DataStore';
import type { InputService } from '../system/InputService';

const NEXT = 0x02;

export class Scene18Controller extends SceneController {
  readonly sceneId = 18;
  private readonly tileBuilder: TileBuilderService;
  private wait = 0;
  constructor(store: DataStore, input: InputService) {
    super(store, input);
    this.tileBuilder = new TileBuilderService(store, null);
  }
  onEnter(): void {
    this.wait = 2;
  }
  onUpdate(_frame: number): number | undefined {
    if (this.wait > 0) {
      this.wait--;
      return undefined;
    }
    this.tileBuilder.flipAllSpritePalettes();
    return NEXT;
  }
}
