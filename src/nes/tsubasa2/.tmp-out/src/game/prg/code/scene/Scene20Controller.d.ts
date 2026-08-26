/**
 * Scene20Controller — 场景 20 精灵属性清位（$A82F 变体）
 *
 * @bank 02 (CPU $A7BD)
 *
 * 行为（已对照 ROM 字节级验证）：
 *   等 1 帧 → $A82F：A=$B0(endIdx) / X=$64(startIdx) / Y=$28(外迭代 0x28 次)，
 *   每次外迭代 = { 内层 $0468+X 循环清 $046A bit2/3；等 1 帧 }
 *   完成 → 返回 2 (hub)
 *
 * 等 1 帧用基类 scheduleAfter(1) 替代 PRG $9FA8 pushState 模式。
 */
import { SceneController } from './SceneController';
import type { DataStore } from '../../data/store/DataStore';
import type { InputService } from '../system/InputService';
export declare class Scene20Controller extends SceneController {
    readonly sceneId = 20;
    private readonly prim;
    private outer;
    private ready;
    constructor(store: DataStore, input: InputService);
    onEnter(): void;
    onUpdate(_frame: number): number | undefined;
}
