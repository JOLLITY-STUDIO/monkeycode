"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputService = void 0;
class InputService {
    constructor(store) {
        this.store = store;
        /** 外部注入的控制器状态（P1/P2，与 core/controller 一致：state[] 每键 0x40=松开/0x41=按下） */
        this.rawState = [
            [0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40],
            [0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40, 0x40],
        ];
    }
    /** 每帧由外层注入手柄状态（core Controller.state） */
    setControllerState(controllerId, state) {
        this.rawState[controllerId - 1] = state;
    }
    /**
     * 读取两控制器 → 更新 ram_001C/001D（当前）/ ram_001E/001F（按下沿）
     * 按下沿 = 当前 & ~上一帧
     */
    readControllers() {
        const store = this.store;
        for (let x = 2; x >= 1; x--) {
            const idx = x - 1;
            const state = this.rawState[idx];
            let cur = 0;
            for (let i = 0; i < 8; i++) {
                if (state[i] === 0x41)
                    cur |= 1 << i;
            }
            const prev = store.readByte(0x001a + x); // 001C(1)/001D(2)
            // 控制器1: 当前 $001C / 沿 $001E；控制器2: 当前 $001D / 沿 $001F
            // ⚠ 旧实现 0x001c+x / 0x001e+x 整体错位 +1：
            //   x=2 时沿写到 $0020 踩掉 PPU CTRL（bit3 spPatternTable 丢失 → sprite 图案错乱）
            store.writeByte(0x001b + x, cur);
            store.writeByte(0x001d + x, cur & ~prev);
        }
    }
    /** 语义化查询：控制器 n（1/2）某键是否按下 */
    isDown(controller, button) {
        return (this.store.readByte(controller === 1 ? 0x001c : 0x001d) & button) !== 0;
    }
    /** 语义化查询：控制器 n 某键本帧按下沿 */
    isPressed(controller, button) {
        return (this.store.readByte(controller === 1 ? 0x001e : 0x001f) & button) !== 0;
    }
}
exports.InputService = InputService;
