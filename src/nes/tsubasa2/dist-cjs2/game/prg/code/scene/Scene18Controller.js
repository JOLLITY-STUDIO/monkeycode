"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scene18Controller = void 0;
/**
 * Scene18Controller — 场景 18 等 2 帧；精灵属性翻转
 *
 * 行为：等 2 帧 → oamFlipAttrs() → 返回 2 (hub)
 *
 * 注：使用 TileBuilderService.flipAllSpritePalettes()（PRG $88FB 翻译），
 *     替代旧 RenderingPrimitivesService.oamFlipAttrs()（已删除以避免 deadcode）。
 *     用基类 scheduleAfter(2, cb) 替代 this.wait-- 模式（PRG $9FA8 pushState 翻译）。
 */
const SceneController_1 = require("./SceneController");
const TileBuilderService_1 = require("../system/TileBuilderService");
const NEXT = 0x14; // → Scene20 (跳过 Scene19 loop, 主游戏 prep 链直进 Scene20)
class Scene18Controller extends SceneController_1.SceneController {
    constructor(store, input) {
        super(store, input);
        this.sceneId = 18;
        /** onEnter 之后下一帧开始（cb 被 scheduler 派发前 still=false） */
        this.waitDone = false;
        this.tileBuilder = new TileBuilderService_1.TileBuilderService(store, null);
    }
    onEnter() {
        this.waitDone = false;
        // PRG $9FA8 pushState 翻译：等 2 帧后调 flipAllSpritePalettes
        this.scheduleAfter(2, () => {
            this.waitDone = true;
        });
    }
    onUpdate(_frame) {
        if (!this.waitDone)
            return undefined;
        this.tileBuilder.flipAllSpritePalettes();
        return NEXT;
    }
}
exports.Scene18Controller = Scene18Controller;
