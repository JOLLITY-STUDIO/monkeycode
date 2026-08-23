"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SceneController = void 0;
class SceneController {
    constructor(store, input) {
        this.store = store;
        this.input = input;
    }
    /** 每帧渲染（原版场景 render 语义；写入 $05E8/$0498/OAM/调色板缓冲） */
    onRender() {
        // 默认空实现；场景无渲染需求时无需覆盖
    }
}
exports.SceneController = SceneController;
