"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameSystemService = void 0;
class GameSystemService {
    constructor(store) {
        this.store = store;
    }
    /**
     * 场景装载入口（$8400 系列）：装载场景数据 → 初始化场景状态
     * @param sceneId 场景号（0-23）
     */
    sceneLoad(sceneId) {
        // TODO V0.2: 翻译 $8400-$87FF 场景装载流程
        void sceneId;
    }
    /**
     * 帧更新（主循环体）：由 BootRouter 每帧调度当前场景
     */
    update(frame, router) {
        // TODO V0.2: 翻译 $8000 主循环 / NMI 回调分发
        void frame;
        void router;
    }
    /**
     * 写一个渲染缓冲条目（$05E8 格式）：
     * [count|0x80, addrLo, addrHi, data×count...]，由 NMI 渲染管线消费
     */
    queueNtWrite(addr, data) {
        // TODO V0.2: 翻译 $05E8 缓冲写入（含 0 终止符）
        void addr;
        void data;
    }
    /** 等待 N 帧（原版帧同步循环，H5 下由外层帧循环驱动） */
    waitFrames(n) {
        // TODO V0.2: 翻译等待帧逻辑（WAIT_FRAME_TABLE 语义）
        void n;
    }
}
exports.GameSystemService = GameSystemService;
