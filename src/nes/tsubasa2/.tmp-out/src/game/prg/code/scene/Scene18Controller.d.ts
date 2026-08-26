/**
 * Scene18Controller — 场景 18 等 2 帧；精灵属性翻转
 *
 * 行为：等 2 帧 → oamFlipAttrs() → 返回 2 (hub)
 *
 * 注：使用 TileBuilderService.flipAllSpritePalettes()（PRG $88FB 翻译），
 *     替代旧 RenderingPrimitivesService.oamFlipAttrs()（已删除以避免 deadcode）。
 *     用基类 scheduleAfter(2, cb) 替代 this.wait-- 模式（PRG $9FA8 pushState 翻译）。
 */
import { SceneController } from './SceneController';
import type { DataStore } from '../../data/store/DataStore';
import type { InputService } from '../system/InputService';
export declare class Scene18Controller extends SceneController {
    readonly sceneId = 18;
    private readonly tileBuilder;
    /** onEnter 之后下一帧开始（cb 被 scheduler 派发前 still=false） */
    private waitDone;
    constructor(store: DataStore, input: InputService);
    onEnter(): void;
    onUpdate(_frame: number): number | undefined;
}
