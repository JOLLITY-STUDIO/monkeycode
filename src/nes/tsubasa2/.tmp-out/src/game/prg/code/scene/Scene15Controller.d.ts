/**
 * Scene15Controller — 场景 15 NT 缓冲逐记录零填充
 *
 * @bank 02 ($A650 入口，CPU $A651-$A69B)
 *
 * 行为（已对照 ROM 字节级验证，表 CPU $AA97，24 条 3 字节记录）：
 *   遍历 SCENE15_AA97_TABLE：
 *     ntAddr = (((($007B & 1) << 2) | (flag & $7F)) << 8 | addrLo) & $3FFF
 *     向 NT 缓冲追加 count & $3F 个 $00（$9B28 强制 count&$3F）
 *     追加后判定：flag bit7 → 返回 2 (hub)；flag bit6 → 等 2 帧再下一条；
 *     否则（bit6 清）→ 立即处理下一条
 * 等帧用基类 scheduleAfter 替代 PRG $9FA8 pushState 模式。
 */
import { SceneController } from './SceneController';
import type { DataStore } from '../../data/store/DataStore';
import type { InputService } from '../system/InputService';
export declare class Scene15Controller extends SceneController {
    readonly sceneId = 15;
    private readonly prim;
    private cursor;
    /** 等 2 帧（flag bit6）调度态 */
    private waiting;
    constructor(store: DataStore, input: InputService);
    onEnter(): void;
    onUpdate(_frame: number): number | undefined;
}
