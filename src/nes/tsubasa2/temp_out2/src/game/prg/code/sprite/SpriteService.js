"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpriteService = void 0;
class SpriteService {
    constructor(store) {
        this.store = store;
    }
    /** 将一个元精灵写入 OAM 缓冲（$0200，V0.5 实现） */
    putSprite(spriteId, x, y) {
        // TODO V0.5
        void spriteId;
        void x;
        void y;
    }
}
exports.SpriteService = SpriteService;
