/**
 * Scene17Controller — 场景 17 装载 CHR 配置
 *
 * @bank 02 (CPU $A77A)
 * 行为：loadChrConfig(0x80) → 返回 2 (hub)（ROM $A77A: LDA #$80; JSR $8AF7）
 */
import { SceneController } from './SceneController';
import type { DataStore } from '../../data/store/DataStore';
import type { InputService } from '../system/InputService';
export declare class Scene17Controller extends SceneController {
    readonly sceneId = 17;
    private readonly prim;
    constructor(store: DataStore, input: InputService);
    onEnter(): void;
    onUpdate(_frame: number): number | undefined;
}
