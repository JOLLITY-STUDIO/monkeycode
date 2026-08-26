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
import { RenderingPrimitivesService } from '../system/RenderingPrimitivesService';
const NEXT = 0x02;
/** 分支 1（$04E5 != $FF）压印序列 */
const BRANCH1_TASKS = [
    { tile: 0xf7, spriteIdx: 0x80, attr: 0x00, dx: 0xfe, dy: 0xff, mask: 0x07, count: 0x2f },
    { tile: 0xfc, spriteIdx: 0xd8, attr: 0x00, dx: 0xff, dy: 0x01, mask: 0x07, count: 0x30 },
];
/** 分支 2（$04E5 == $FF）压印序列 */
const BRANCH2_TASKS = [
    { tile: 0xf7, spriteIdx: 0x80, attr: 0x02, dx: 0xfe, dy: 0xff, mask: 0x07, count: 0x2f },
    { tile: 0xfe, spriteIdx: -1, attr: 0x02, dx: 0xfe, dy: 0xff, mask: 0x07, count: 0x08 },
    { tile: 0xf6, spriteIdx: 0xb8, attr: 0x02, dx: 0xff, dy: 0x02, mask: 0x03, count: 0x1c },
];
export class Scene16Controller extends SceneController {
    constructor(store, input) {
        super(store, input);
        this.sceneId = 16;
        this.current = null;
        this.remaining = 0;
        this.spriteIdx = 0;
        this.attrLoopIdx = 0; // 分支2 末段 $046A|=2 循环游标（> $EC 表示已结束）
        this.ready = false;
        this.prim = new RenderingPrimitivesService(store);
        this.branch = store.readByte(0x04e5) === 0xff ? 2 : 1;
        this.tasks = this.branch === 2 ? BRANCH2_TASKS : BRANCH1_TASKS;
    }
    onEnter() {
        const store = this.store;
        // $A767 复制 $A677→$03E8；分支2 追加 $A67B→$0460
        this.prim.copyScene16Blobs(this.branch);
        this.current = null;
        this.remaining = 0;
        this.spriteIdx = 0;
        this.attrLoopIdx = 0;
        this.ready = true;
    }
    onUpdate(_frame) {
        if (!this.ready)
            return undefined;
        const store = this.store;
        if (this.current === null) {
            if (this.tasks.length === 0) {
                // 压印序列结束 → 分支2 末段：$046A |= $02（Y=$D8..$EC 步长4，紧循环无等待）
                if (this.branch === 2) {
                    for (let y = 0xd8; y <= 0xec; y += 4) {
                        store.writeByte(0x046a + y, store.readByte(0x046a + y) | 0x02);
                    }
                }
                return NEXT;
            }
            const task = this.tasks[0];
            this.tasks = this.tasks.slice(1);
            this.current = task;
            this.remaining = task.count;
            if (task.spriteIdx >= 0)
                this.spriteIdx = task.spriteIdx;
        }
        // 单次 $A72C 压印
        const c = this.current;
        this.spriteIdx = this.prim.a72cStampSprite(c.tile, this.spriteIdx, c.attr, c.dx, c.dy, c.mask);
        this.remaining--;
        if (this.remaining <= 0)
            this.current = null;
        // 每次压印后等 1 帧（$A72C: LDA #$01; JSR $9FA8）
        this.ready = false;
        this.scheduleAfter(1, () => { this.ready = true; });
        return undefined;
    }
}
