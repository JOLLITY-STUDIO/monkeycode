"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SceneManager = void 0;
/** 场景管理器 */
class SceneManager {
    current = null;
    nextScene = null;
    /** 切换到新场景 (延迟到帧结束) */
    switchTo(scene) {
        this.nextScene = scene;
    }
    /** 立即切换 */
    switchImmediate(scene) {
        if (this.current) {
            this.current.leave();
        }
        this.current = scene;
        this.nextScene = null;
        scene.enter();
    }
    /** 每帧处理场景切换 */
    update() {
        if (this.nextScene) {
            if (this.current) {
                this.current.leave();
            }
            this.current = this.nextScene;
            this.nextScene = null;
            this.current.enter();
        }
        if (this.current) {
            this.current.update();
        }
    }
    /** 渲染当前场景 */
    render() {
        if (this.current) {
            this.current.render();
        }
    }
    get currentScene() {
        return this.current;
    }
}
exports.SceneManager = SceneManager;
