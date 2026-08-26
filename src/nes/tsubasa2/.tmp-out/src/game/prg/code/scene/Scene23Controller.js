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
import { RenderingPrimitivesService } from '../system/RenderingPrimitivesService';
const NEXT = 0x02;
export class Scene23Controller extends SceneController {
    constructor(store, input) {
        super(store, input);
        this.sceneId = 23;
        this.phase = 'high';
        this.ready = false;
        this.prim = new RenderingPrimitivesService(store);
    }
    onEnter() {
        const store = this.store;
        // $9E7C BCD 打包（A5 28 20 7C 9E）
        this.prim.bcdConvert(store.readByte(0x0028));
        this.phase = (store.readByte(0x00ec) & 0xf0) !== 0 ? 'high' : 'low';
        this.ready = true;
    }
    onUpdate(_frame) {
        if (!this.ready)
            return undefined;
        const store = this.store;
        if (this.phase === 'high') {
            // 高位（tens）
            const tile = this.prim.nibbleToTile(store.readByte(0x00ec), true);
            this.writeDigit(tile);
            this.phase = 'low';
            this.ready = false;
            this.scheduleAfter(6, () => { this.ready = true; });
            return undefined;
        }
        if (this.phase === 'low') {
            // 低位（ones）
            const tile = this.prim.nibbleToTile(store.readByte(0x00ec), false);
            this.writeDigit(tile);
            this.phase = 'done';
            this.ready = false;
            this.scheduleAfter(6, () => { this.ready = true; });
            return undefined;
        }
        return NEXT;
    }
    /** $88CA 单 tile 写 NT 缓冲 + INC $0053 光标 */
    writeDigit(tile) {
        const store = this.store;
        this.prim.writeSingleTileToNt(tile, store.readByte(0x0052), store.readByte(0x0053));
        store.writeByte(0x0053, (store.readByte(0x0053) + 1) & 0xff);
    }
}
