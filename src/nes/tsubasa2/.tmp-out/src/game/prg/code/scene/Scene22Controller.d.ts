/**
 * Scene22Controller — 场景 22 精灵属性置位循环（扩展精灵表 $0468）
 *
 * @bank 02 (CPU $A7D6)
 *
 * 行为（已对照 ROM 字节级验证）：
 *   0x80 次外迭代，每次 { 内层 X=$20..$C4 步长 4：
 *       若 $0468,X (y) 有符号 < 0（bit7=1，屏外）→ $046A,X |= $04；等 1 帧 }
 *   完成 → 返回 2 (hub)
 *
 * 等 1 帧用基类 scheduleAfter(1) 替代 PRG $9FA8 pushState 模式。
 */
import { SceneController } from './SceneController';
export declare class Scene22Controller extends SceneController {
    readonly sceneId = 22;
    private iter;
    private ready;
    onEnter(): void;
    onUpdate(_frame: number): number | undefined;
}
