/**
 * Scene19Controller — 场景 19 精灵闪烁循环（扩展精灵表 $0468）
 *
 * @bank 02 (CPU $A78D)
 *
 * 行为（已对照 ROM 字节级验证）：
 *   0x40 次外迭代，每次 { 内层 X=$20..$C4 步长 4：
 *       若 $0468,X (y) 有符号 < 0（bit7=1，屏外）→ $046A,X |= $08；等 1 帧 }
 *   结束后清扩展表 $0568/$0588/$05A8/$05C8；等 1 帧；
 *   轮询 $0009 == 0（CHR 装载完成标志，非 0 则每帧再等）；
 *   返回 0x0f → Scene15（ROM: JMP $A651 落入 Scene15 循环）
 *
 * 等 1 帧用基类 scheduleAfter(1) 替代 PRG $9FA8 pushState 模式。
 */
import { SceneController } from './SceneController';
export declare class Scene19Controller extends SceneController {
    readonly sceneId = 19;
    private iter;
    private cleared;
    private wait9;
    /** "等 1 帧" 调度态 */
    private ready;
    onEnter(): void;
    onUpdate(_frame: number): number | undefined;
}
