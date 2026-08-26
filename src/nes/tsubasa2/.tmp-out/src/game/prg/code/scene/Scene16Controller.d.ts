/**
 * Scene16Controller — 场景 16 精灵压印（$A72C 系列）
 *
 * @bank 02 (CPU $A69C-$A779)
 *
 * 行为（已对照 ROM 字节级验证 + SCENE16_A677_BLOB 逐字节反汇编）：
 *   - $A767 复制 $A677→$03E8（0xFC 字节，code-as-data，两分支均执行）
 *   - 分支依据 $04E5 == $FF → 分支 2；否则分支 1
 *   - 分支 1 压印序列：
 *       1) Y=$80 / X=$2F / attr=$00 / dy=$FF / dx=$FE / mask=$07 / tile=$F7
 *       2) Y=$D8 / X=$30 / dy=$01 / dx=$FF / mask=$07(沿用) / tile=$FC
 *   - 分支 2 压印序列：
 *       1) Y=$80 / X=$2F / attr=$02 / dy=$FF / dx=$FE / mask=$07 / tile=$F7
 *       2) X=$08 / Y 沿用 / tile=$FE
 *       3) 复制 $A67B→$0460（0xFC 字节）
 *       4) Y=$B8 / X=$1C / dy=$02 / dx=$FF / mask=$03 / tile=$F6
 *       5) Y=$D8..$EC 步长 4：$046A |= $02
 *   - $A72C 每次压印 = { y+=$ED；x+=$EC；若 (x&$EB)!=0 跳过写并保持索引；
 *                      否则 $0468+idx 写 [y,tile,attr,x]，idx+=4 } + 等 1 帧
 * 压印之间的"等 1 帧"用基类 scheduleAfter(1) 替代 PRG $9FA8 pushState 模式。
 */
import { SceneController } from './SceneController';
import type { DataStore } from '../../data/store/DataStore';
import type { InputService } from '../system/InputService';
export declare class Scene16Controller extends SceneController {
    readonly sceneId = 16;
    private readonly prim;
    private readonly branch;
    private tasks;
    private current;
    private remaining;
    private spriteIdx;
    private attrLoopIdx;
    private ready;
    constructor(store: DataStore, input: InputService);
    onEnter(): void;
    onUpdate(_frame: number): number | undefined;
}
