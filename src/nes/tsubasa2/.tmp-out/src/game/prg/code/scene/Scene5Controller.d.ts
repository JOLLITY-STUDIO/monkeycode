/**
 * Scene5Controller — 场景 5 $0009 协程延迟（bank02 $85A9-$85B0 实证）
 *
 * 行为（PRG $85A9）：LDX #$09; JSR $9F96
 *   $9F96（bank00）：若 $0009 == $FF → LDA #$01; JSR $9FA8（等 1 帧）后 $0009 = 0
 *   返回 2 = hub
 */
import { SceneController } from './SceneController';
import type { DataStore } from '../../data/store/DataStore';
import type { InputService } from '../system/InputService';
export declare class Scene5Controller extends SceneController {
    readonly sceneId = 5;
    constructor(store: DataStore, input: InputService);
    onEnter(): void;
    onUpdate(_frame: number): number | undefined;
}
