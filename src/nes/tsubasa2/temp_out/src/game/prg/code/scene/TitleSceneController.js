"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TitleSceneController = void 0;
/**
 * TitleSceneController — 标题场景（场景号 1）
 *
 * @bank 02 ($A559)
 *
 * 对应原始地址：$A559（跳转表第 1 项）— 标题画面 + 菜单（新游戏/继续/密码）。
 *
 * V0.1 stub：注册契约；真实实现在 V0.3（标题链路）覆盖。
 */
const SceneController_1 = require("./SceneController");
class TitleSceneController extends SceneController_1.SceneController {
    constructor(store, input) {
        super(store, input);
        this.sceneId = 1;
        this.audio = null;
    }
    /** 注入音频服务（标题 SE 播放） */
    attachAudio(audio) {
        this.audio = audio;
    }
    onEnter() {
        // TODO V0.3: 翻译 $A559 标题序列（LOGO/NT/调色板/菜单光标）
        // V0.6: 播放标题 BGM（编号待对照 asm 确认，暂用 0x02）
        this.audio?.playBgm(0x02);
    }
    onUpdate(frame) {
        // TODO V0.3: 标题菜单输入（Start 新游戏 / 密码 / 继续）
        void frame;
        return undefined;
    }
    onRender() {
        // TODO V0.3: 标题渲染
    }
}
exports.TitleSceneController = TitleSceneController;
