/**
 * Scene23Controller — 场景 23 数值显示（BCD + nibble→tile + NT 缓冲光标写入）
 *
 * @bank 02 (CPU $A7FA)
 *
 * 行为（已对照 ROM 字节级验证）：
 *   1. $9E7C BCD 打包：输入 $0028 值 → $00EC=(tens<<4)|ones，$00ED=hundreds
 *   2. 高位（tens）：若 $00EC & $F0 == 0 → 跳过（不写不等待）
 *      否则 $AC6D nibble→tile（tens）→ $88CA 单 tile 写 NT 缓冲
 *      （LDX $0052 / LDY $0053 → $88CA → INC $0053 → 等 6 帧）
 *   3. 低位（ones）：$AC71 nibble→tile → 同样 $88CA 写入 + INC $0053 + 等 6 帧
 *   4. 完成 → 返回 2 (hub)
 *
 * 等 6 帧用基类 scheduleAfter(6) 替代 PRG $9FA8 pushState 模式。
 */
import { SceneController } from './SceneController';
import type { DataStore } from '../../data/store/DataStore';
import type { InputService } from '../system/InputService';
export declare class Scene23Controller extends SceneController {
    readonly sceneId = 23;
    private readonly prim;
    private phase;
    private ready;
    constructor(store: DataStore, input: InputService);
    onEnter(): void;
    onUpdate(_frame: number): number | undefined;
    /** $88CA 单 tile 写 NT 缓冲 + INC $0053 光标 */
    private writeDigit;
}
