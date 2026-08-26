/**
 * Scene8Controller — 场景 8 ram_001B 清 bit6（bank02 $85BF-$85CA 实证）
 *
 * 行为（PRG $85BF）：STA $A000（MMC3 寄存器写，H5 省略）→ $001B &= ~$40 → 返回 2 = hub
 */
import { SceneController } from './SceneController';
import type { DataStore } from '../../data/store/DataStore';
import type { InputService } from '../system/InputService';
export declare class Scene8Controller extends SceneController {
    readonly sceneId = 8;
    constructor(store: DataStore, input: InputService);
    onEnter(): void;
    onUpdate(_frame: number): number | undefined;
}
