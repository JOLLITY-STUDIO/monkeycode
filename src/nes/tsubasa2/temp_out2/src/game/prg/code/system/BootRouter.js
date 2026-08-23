"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BootRouter = void 0;
/** 未翻译场景的默认 stub（不流转，留在当前场景） */
class SceneStubController {
    constructor(sceneId) {
        this.sceneId = sceneId;
    }
    onEnter() { }
    onUpdate(_frame) {
        return undefined;
    }
    onRender() { }
}
class BootRouter {
    constructor(store, scene0) {
        this.store = store;
        /** 场景控制器注册表（sceneId → controller） */
        this.scenes = new Map();
        /** 当前场景号（ram_00ED 语义：原版存当前场景） */
        this.currentSceneId = 0 /* SceneId.Scene0 */;
        /** 当前场景控制器 */
        this.current = null;
        // 场景 0 已翻译：注册真实控制器；其余场景未翻译时走默认 stub
        this.register(scene0 ?? new SceneStubController(0 /* SceneId.Scene0 */));
        for (let id = 1; id <= 23; id++) {
            this.scenes.set(id, new SceneStubController(id));
        }
    }
    /** 注册/覆盖场景控制器 */
    register(controller) {
        this.scenes.set(controller.sceneId, controller);
    }
    /** 获取场景控制器（未注册返回 stub） */
    getController(sceneId) {
        return this.scenes.get(sceneId) ?? new SceneStubController(sceneId);
    }
    /**
     * 切换场景（$CEFE/$C400/$A200 语义）：
     * $CEFE：关 IRQ → 隐藏 OAM → 清 NT
     * $C400：PPU CTRL=$08 / MASK=$1E / bank 基址=0
     * $A200：场景入口（设置 $00ED → 场景初始化）
     * @param sceneId 场景号（0-23）
     */
    changeScene(sceneId) {
        const store = this.store;
        // $CEFE 前序：关 IRQ 计数器 / 隐藏 OAM / 清 NT（ram 视图）
        store.writeByte(0x0469, 0x00); // IRQ 计数器清零
        for (let i = 0x200; i < 0x300; i++)
            store.writeByte(i, 0xf8); // OAM 全隐藏
        for (let addr = 0x2000; addr <= 0x23ff; addr++)
            store.writeByte(addr, 0); // NT+属性表
        // $C400：PPU CTRL/MASK/bank 基址
        store.writeByte(0x0020, 0x08); // PPU CTRL: NMI on / 精灵 8x8 / BG 表 0
        store.writeByte(0x0021, 0x1e); // PPU MASK: BG+SPR 可见
        store.writeByte(0x0022, 0x00); // MMC3 bank 基址 = 0（H5 无实际语义，兼容保留）
        // $A200：场景号存回 ram_00ED 并分发
        this.currentSceneId = sceneId;
        store.writeByte(0x00ed, sceneId);
        const next = this.getController(sceneId);
        this.current = next;
        next?.onEnter();
    }
    /** 每帧更新（NMI 游戏逻辑路径 $C421 语义）；处理场景返回的下一个场景号 */
    update(frame) {
        const next = this.current?.onUpdate(frame);
        if (next !== undefined) {
            this.changeScene(next);
        }
    }
    /** 每帧渲染（主渲染路径 $C775 语义，由 InterruptService 在 renderCommit 前调用） */
    render() {
        this.current?.onRender();
    }
    /** 当前场景号 */
    get sceneId() {
        return this.currentSceneId;
    }
}
exports.BootRouter = BootRouter;
