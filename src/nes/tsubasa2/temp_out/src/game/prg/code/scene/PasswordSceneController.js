"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordSceneController = void 0;
/**
 * PasswordSceneController — 密码场景（场景号 2）
 *
 * @bank 02 ($A57B)
 *
 * 对应原始地址：$A57B（跳转表第 2 项）— 密码输入/校验（原 PasswordController）。
 *
 * V0.1 stub：注册契约；真实实现在 V0.3 覆盖。
 */
const SceneController_1 = require("./SceneController");
class PasswordSceneController extends SceneController_1.SceneController {
    constructor(store, input) {
        super(store, input);
        this.sceneId = 2;
    }
    onEnter() {
        // TODO V0.3: 翻译 $A57B 密码场景（字符表 / 输入缓冲 / 校验）
    }
    onUpdate(frame) {
        // TODO V0.3: 密码输入
        void frame;
        return undefined;
    }
}
exports.PasswordSceneController = PasswordSceneController;
