/**
 * Scene10Controller — 场景 10 装载 CHR 配置 0 + 装载场景数据 5（bank02 $85DC-$85E8 实证）
 *
 * 行为：loadChrConfig(0x00) + loadSceneData(5) → 返回 2 = hub
 */
import { SceneController } from './SceneController';
import type { DataStore } from '../../data/store/DataStore';
import type { InputService } from '../system/InputService';
export declare class Scene10Controller extends SceneController {
    readonly sceneId = 10;
    private readonly prim;
    constructor(store: DataStore, input: InputService);
    onEnter(): void;
    onUpdate(_frame: number): number | undefined;
}
