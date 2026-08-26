/**
 * Scene11Controller — 场景 11 分支型（bank02 $85E9-$85FD 实证）
 *
 * 行为：if ($000D != 0) { $000D=0; $000E=0; } else { loadChrConfig(0x10); loadSceneData(6); }
 * 两分支均返回 2 = hub
 */
import { SceneController } from './SceneController';
import type { DataStore } from '../../data/store/DataStore';
import type { InputService } from '../system/InputService';
export declare class Scene11Controller extends SceneController {
    readonly sceneId = 11;
    private readonly prim;
    constructor(store: DataStore, input: InputService);
    onEnter(): void;
    onUpdate(_frame: number): number | undefined;
}
