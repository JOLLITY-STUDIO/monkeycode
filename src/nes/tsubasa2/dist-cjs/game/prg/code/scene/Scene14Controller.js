"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scene14Controller = void 0;
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
const SceneController_1 = require("./SceneController");
const RenderingPrimitivesService_1 = require("../system/RenderingPrimitivesService");
const NEXT = 0x02;
const OUTER = 0x28; // Y=$28
class Scene14Controller extends SceneController_1.SceneController {
    constructor(store, input) {
        super(store, input);
        this.sceneId = 14;
        this.outer = 0;
        /** 等 1 帧（$9FA8）后置 true — 驱动外迭代节奏 */
        this.ready = false;
        this.prim = new RenderingPrimitivesService_1.RenderingPrimitivesService(store);
    }
    onEnter() {
        const store = this.store;
        // $8976 行构建装载（X=$BD / Y=$23 → $00E7/$00E8 → 流头）
        this.prim.buildSceneRows([0xbd, 0x23]);
        // $9A35 调色板装载 + 满渐显
        this.prim.loadPalettesAndFade(0x04, store.readByte(0x0025) & 0x0f);
        // 清中断标志 / 滚动参数
        store.writeByte(0x058f, store.readByte(0x058f) & 0x7f);
        store.writeByte(0x004c, 0x82);
        this.outer = 0;
        this.ready = false;
        // $A82F 入口：先等 1 帧
        this.scheduleAfter(1, () => { this.ready = true; });
    }
    onUpdate(_frame) {
        if (!this.ready)
            return undefined;
        if (this.outer >= OUTER)
            return NEXT;
        // $A82F 内层：X=$20..$C8 步长 4，$0468,X(y)<$82 → $046A,X &= ~$0C
        this.prim.a82fClearSpriteAttrIter(0xc8, 0x20);
        this.outer++;
        // 每次外迭代后等 1 帧
        this.ready = false;
        this.scheduleAfter(1, () => { this.ready = true; });
        return undefined;
    }
}
exports.Scene14Controller = Scene14Controller;
