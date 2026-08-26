/**
 * Scene1Controller — 场景 1 数学工具（bank02 $855A-$857B 实证）
 *
 * 行为（PRG $855A）：
 *   $0060 = 0；A = $00EC；LSR/ROR $0060 ×2 → $0060:$0061 = $00EC >> 2（16bit 逻辑右移）
 *   BIT $0062；BMI 跳过取负；否则 $0060:$0061 = 0 - value（16bit 取补）
 *   返回 3 = Scene3
 */
import { SceneController } from './SceneController';
import type { DataStore } from '../../data/store/DataStore';
import type { InputService } from '../system/InputService';
export declare class Scene1Controller extends SceneController {
    readonly sceneId = 1;
    constructor(store: DataStore, input: InputService);
    onEnter(): void;
    onUpdate(_frame: number): number | undefined;
}
