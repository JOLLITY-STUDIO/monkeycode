"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterruptService = void 0;
class InterruptService {
    constructor(_store) {
        this._store = _store;
    }
    /**
     * 获取场景对应的 Bank 配置
     * (原始数据在 Bank 31 $C787+ 区域)
     *
     * @param sceneId 场景 ID
     */
    getBankConfig(_sceneId) {
        // H5: 不需要 MMC3 bank 切换，直接通过 import 引用对应 Bank 数据
        // 此方法保留用于场景 → Bank 映射查询
        return null;
    }
    /**
     * RESET 向量入口 ($FFF0)
     * H5: 不模拟 — GameLoop 直接驱动
     */
    reset() {
        // RESET: $FFF0 → Bank30 $C64E → $C400 → Bank02 $A200
    }
    /**
     * NMI 向量入口 ($FFFA)
     * 原始: 每帧 NMI 触发 PPU 渲染 + OAM DMA + 音频帧更新
     */
    nmi() {
        // H5: 合入 Bank00 update() → 不再需要单独 NMI
    }
}
exports.InterruptService = InterruptService;
