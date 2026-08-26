/**
 * Scene13Controller — 场景 13 装载 CHR 0x20 + 装载场景数据 7（bank02 $861D-$8629 实证）
 *
 * 行为：loadChrConfig(0x20) + loadSceneData(7) → 返回 2 = hub
 */
import { SceneController } from './SceneController';
import type { DataStore } from '../../data/store/DataStore';
import type { InputService } from '../system/InputService';
export declare class Scene13Controller extends SceneController {
    readonly sceneId = 13;
    private readonly prim;
    constructor(store: DataStore, input: InputService);
    onEnter(): void;
    onUpdate(_frame: number): number | undefined;
}
