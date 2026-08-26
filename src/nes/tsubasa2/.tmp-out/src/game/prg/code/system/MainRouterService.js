export class MainRouterService {
    constructor(store) {
        this.store = store;
        /** 5 entry dispatcher table — mode 0..4 → action callback */
        this.dispatchTable = new Array(5).fill(null);
        /** 当前 status mode ($0027) */
        this.currentMode = 0;
        /** 当前 scene 控制器引用 (兼容旧 API, 占位) */
        this.currentScene = null;
    }
    /**
     * 注册 dispatcher entry（PRG $800D table init 翻译）。
     *
     * ROM 行为: dispatcherTable[mode] = handler_addr
     * H5 行为: 直接覆盖 callback 引用
     *
     * @param mode status mode (0..4)
     * @param action handler callback
     */
    registerDispatchAction(mode, action) {
        if (mode < 0 || mode > 4)
            return;
        this.dispatchTable[mode] = action;
    }
    /**
     * 设置当前 status mode 并立即 dispatch（PRG $8000 翻译）。
     *
     * ROM 行为: LDA $0027 → JMP ($800E,X)
     * H5 行为: this.currentMode = mode → 调用对应 callback
     *
     * @param mode 要 dispatch 的 status mode
     */
    dispatchByMode(mode) {
        this.currentMode = mode;
        const action = this.dispatchTable[mode];
        if (action)
            action({ mode, router: this });
    }
    /** 当前 status mode getter */
    getMode() {
        return this.currentMode;
    }
    setCurrentScene(scene) {
        this.currentScene = scene;
    }
    getCurrentScene() {
        return this.currentScene;
    }
}
