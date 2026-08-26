/**
 * Scene12Controller — 场景 12（bank02 $8603-$861C 实证），同 11 但装载场景数据 8
 *
 * 行为：if ($000D != 0) { $000D=0; $000E=0; } else { loadChrConfig(0x30); loadSceneData(8); }
 * 两分支均返回 2 = hub
 */
import { SceneController } from './SceneController';
import type { DataStore } from '../../data/store/DataStore';
import type { InputService } from '../system/InputService';
export declare class Scene12Controller extends SceneController {
    readonly sceneId = 12;
    private readonly prim;
    constructor(store: DataStore, input: InputService);
    onEnter(): void;
    onUpdate(_frame: number): number | undefined;
}
