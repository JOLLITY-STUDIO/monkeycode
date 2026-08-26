/**
 * InputService — 手柄输入读取
 *
 * 数据结构：
 *   ram_001C = 控制器1 当前状态   ram_001E = 控制器1 按下沿
 *   ram_001D = 控制器2 当前状态   ram_001F = 控制器2 按下沿
 *
 * 按键位（NES 读取顺序）：bit0=A bit1=B bit2=Select bit3=Start
 *                          bit4=Up bit5=Down bit6=Left bit7=Right
 */
import type { DataStore } from '../../data/store/DataStore';
/** NES 按键位定义 */
export declare const enum Button {
    A = 1,
    B = 2,
    Select = 4,
    Start = 8,
    Up = 16,
    Down = 32,
    Left = 64,
    Right = 128
}
export declare class InputService {
    readonly store: DataStore;
    /** 外部注入的控制器状态（P1/P2，与 core/controller 一致：state[] 每键 0x40=松开/0x41=按下） */
    private rawState;
    constructor(store: DataStore);
    /** 每帧由外层注入手柄状态（core Controller.state） */
    setControllerState(controllerId: 1 | 2, state: number[]): void;
    /**
     * 读取两控制器 → 更新 ram_001C/001D（当前）/ ram_001E/001F（按下沿）
     * 按下沿 = 当前 & ~上一帧
     */
    readControllers(): void;
    /** 语义化查询：控制器 n（1/2）某键是否按下 */
    isDown(controller: 1 | 2, button: Button): boolean;
    /** 语义化查询：控制器 n 某键本帧按下沿 */
    isPressed(controller: 1 | 2, button: Button): boolean;
}
