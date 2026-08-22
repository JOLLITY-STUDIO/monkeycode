"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioService = exports.BGM_DATA_MAP = exports.SE_POINTER_TABLE = void 0;
exports.SE_POINTER_TABLE = {
// TODO: 从 asm/bank12 提取 SE 指针表
};
exports.BGM_DATA_MAP = {
// TODO: 从 asm/bank13-15 提取 BGM 数据映射
};
class AudioService {
    constructor(store) {
        this._store = store;
    }
    /** 请求播放 (原 requestPlay) */
    requestPlay(id) {
        // TODO: 翻译音频请求
        void id;
        return false;
    }
    /** 停止全部 */
    stopAll() {
        // TODO: 翻译停止逻辑
    }
    /** 帧推进 */
    update() {
        // TODO: 翻译音频帧推进
    }
}
exports.AudioService = AudioService;
exports.default = AudioService;
