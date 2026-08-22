"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpeningSceneController = void 0;
const boot_scene_1 = require("../../../../../output/boot-scene");
class OpeningSceneController {
    constructor(store) {
        this._frame = 0;
        this._paletteStep = 0;
        this._initialized = false;
        this._store = store;
    }
    /** 开场初始化 (原 initBoot): 灌 NT0 + 40 精灵 + 调色板渐显起点(全黑) */
    init() {
        this._frame = 0;
        this._paletteStep = 0;
        this._initialized = true;
        // NT0 背景 (标题字母 + 版权文字 tile)
        this._store.nt0 = (0, boot_scene_1.buildBootNT)();
        // 40 精灵 → 影子 OAM → 硬件 OAM ($0200, writeOam 消费)
        this._store.oamShadow.clearAll(0xf8);
        boot_scene_1.BOOT_OAM.forEach((s, i) => {
            this._store.oamShadow.writeSlot(i * 4, s.y, s.tile, s.attr, s.x);
        });
        this._store.oamShadow.copyToHw();
        // 调色板: step 0 = 全黑 (渐显起点)
        this._store.setPaletteTable((0, boot_scene_1.buildBootPalette)(0));
    }
    /** 每帧推进 (原 _spawnCoroutine + syncBootFrame): 调色板渐显 */
    update(frame) {
        if (!this._initialized)
            this.init();
        this._frame = frame;
        // bank0 $9A71 fade: 帧 11 起每 2 帧升一级, 9 级封顶
        const step = (0, boot_scene_1.bootFadeStep)(frame);
        if (step !== this._paletteStep) {
            this._paletteStep = step;
            this._store.setPaletteTable((0, boot_scene_1.buildBootPalette)(step));
        }
    }
    get isTitle() {
        // 开场结束进入 TITLE
        return this._frame >= boot_scene_1.BOOT_TOTAL_FRAMES;
    }
    get displayState() {
        return {
            frame: this._frame,
            paletteStep: this._paletteStep,
            showText: this._frame >= 60,
        };
    }
}
exports.OpeningSceneController = OpeningSceneController;
exports.default = OpeningSceneController;
