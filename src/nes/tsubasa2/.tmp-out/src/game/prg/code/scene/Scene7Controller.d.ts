/**
 * Scene7Controller — 场景 7 标记置 $FF（bank02 $85B9-$85BE 实证）
 *
 * 行为（PRG $85B9）：$0099 = $FF（NMI 帧末标志）→ 返回 2 = hub
 */
import { SceneController } from './SceneController';
import type { DataStore } from '../../data/store/DataStore';
import type { InputService } from '../system/InputService';
export declare class Scene7Controller extends SceneController {
    readonly sceneId = 7;
    constructor(store: DataStore, input: InputService);
    onEnter(): void;
    onUpdate(_frame: number): number | undefined;
}
