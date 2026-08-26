/**
 * Scene9Controller — 场景 9 ram_001B 置 bit6（bank02 $85CB-$85D6 实证）
 *
 * 行为（PRG $85CB）：STA $A000（MMC3 寄存器写，H5 省略）→ $001B |= $40 → 返回 2 = hub
 */
import { SceneController } from './SceneController';
import type { DataStore } from '../../data/store/DataStore';
import type { InputService } from '../system/InputService';
export declare class Scene9Controller extends SceneController {
    readonly sceneId = 9;
    constructor(store: DataStore, input: InputService);
    onEnter(): void;
    onUpdate(_frame: number): number | undefined;
}
