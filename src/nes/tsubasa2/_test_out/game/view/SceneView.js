"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SceneView = void 0;
class SceneView {
    constructor(store) {
        this._store = store;
    }
    /** 进入场景时清屏 (对应 NES NT/OAM 清零) */
    clearScreen() {
        // OAM 清零 (对应 ram_04A5 区清空)
        this._store.clearOAM();
        // NT 清零 (对应 $9F04 区清空, 遍历写空白 tile)
        const blank = { tile: 0, palette: 0, bank: 0, flipH: false, flipV: false, behindBg: false };
        for (let y = 0; y < this._store.nt0.length; y++) {
            for (let x = 0; x < 32; x++)
                this._store.writeNT(0, x, y, blank);
        }
        for (let y = 0; y < this._store.nt1.length; y++) {
            for (let x = 0; x < 32; x++)
                this._store.writeNT(1, x, y, blank);
        }
        this._store.sprites = [];
    }
}
exports.SceneView = SceneView;
