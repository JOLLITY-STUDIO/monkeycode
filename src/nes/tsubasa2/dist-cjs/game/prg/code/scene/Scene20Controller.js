"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scene20Controller = void 0;
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
const SceneController_1 = require("./SceneController");
const RenderingPrimitivesService_1 = require("../system/RenderingPrimitivesService");
const NEXT = 0x02;
const OUTER = 0x28; // Y=$28
class Scene20Controller extends SceneController_1.SceneController {
    constructor(store, input) {
        super(store, input);
        this.sceneId = 20;
        this.outer = 0;
        this.ready = false;
        this.prim = new RenderingPrimitivesService_1.RenderingPrimitivesService(store);
    }
    onEnter() {
        this.outer = 0;
        this.ready = false;
        // 先等 1 帧（$9FA8）
        this.scheduleAfter(1, () => { this.ready = true; });
    }
    onUpdate(_frame) {
        if (!this.ready)
            return undefined;
        if (this.outer >= OUTER)
            return NEXT;
        // $A82F 内层：X=$64..$B0 步长 4，$0468,X(y)<$82 → $046A,X &= ~$0C
        this.prim.a82fClearSpriteAttrIter(0xb0, 0x64);
        this.outer++;
        this.ready = false;
        this.scheduleAfter(1, () => { this.ready = true; });
        return undefined;
    }
}
exports.Scene20Controller = Scene20Controller;
