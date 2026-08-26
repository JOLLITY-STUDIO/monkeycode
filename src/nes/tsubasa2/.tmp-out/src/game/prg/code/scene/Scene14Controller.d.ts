/**
 * Scene14Controller — 场景 14 主游戏第一帧（进场）
 *
 * @bank 02 ($862A 入口，CPU $862A-$8650)
 *
 * 行为（已对照 ROM 字节级验证）：
 *   1. $8976 行构建装载（X=$BD / Y=$23 参数，经 $00E7/$00E8 入流头）→ buildSceneRows([$BD,$23])
 *   2. $9A35 调色板装载 + 满渐显（BG=04 / SPR=$0025&$0F）
 *   3. $058F &= $7F（清中断标志）
 *   4. $004C = $82（滚动/分屏参数）
 *   5. 等 1 帧（$9FA8）
 *   6. $A82F 精灵属性清位：A=$C8(endIdx) / X=$20(startIdx) / Y=$28(外迭代 0x28 次)，
 *      每次外迭代 = { 内层 $0468+X 循环清 $046A bit2/3；等 1 帧 }
 *   7. 完成 → 返回 2 (hub)
 */
import { SceneController } from './SceneController';
import type { DataStore } from '../../data/store/DataStore';
import type { InputService } from '../system/InputService';
export declare class Scene14Controller extends SceneController {
    readonly sceneId = 14;
    private readonly prim;
    private outer;
    /** 等 1 帧（$9FA8）后置 true — 驱动外迭代节奏 */
    private ready;
    constructor(store: DataStore, input: InputService);
    onEnter(): void;
    onUpdate(_frame: number): number | undefined;
}
