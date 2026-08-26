/**
 * Scene4Controller — 场景 4 隐藏全部 OAM（bank02 $85A3-$85A8 实证）
 *
 * 行为（PRG $85A3）：JSR $9B7F（hideOam）→ 返回 2 = hub
 */
import { SceneController } from './SceneController';
import type { DataStore } from '../../data/store/DataStore';
import type { InputService } from '../system/InputService';
export declare class Scene4Controller extends SceneController {
    readonly sceneId = 4;
    private readonly prim;
    constructor(store: DataStore, input: InputService);
    onEnter(): void;
    onUpdate(_frame: number): number | undefined;
}
