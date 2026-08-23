/**
 * Input (小程序版) — 触摸输入控制器
 *
 * 借鉴 core/browser/keyboard.ts + gamepad.ts, 适配微信小程序触摸事件:
 *   - 无 keyboard/gamepad, 改为触摸方向键 + A/B/Start/Select 按钮
 *   - 提供软件按钮 API: press(button) / release(button)
 *   - 提供方向触摸区域 API: setDPadFromTouch(x, y, w, h)
 *
 * 按钮位序 (NES 标准, 与 Controller.BUTTON_* 一致):
 *   bit0=A, bit1=B, bit2=Select, bit3=Start,
 *   bit4=Up, bit5=Down, bit6=Left, bit7=Right
 */
export declare const BUTTON_A = 0;
export declare const BUTTON_B = 1;
export declare const BUTTON_SELECT = 2;
export declare const BUTTON_START = 3;
export declare const BUTTON_UP = 4;
export declare const BUTTON_DOWN = 5;
export declare const BUTTON_LEFT = 6;
export declare const BUTTON_RIGHT = 7;
export type ButtonId = number;
interface InputOptions {
    onButtonChange: (mask: number) => void;
}
export default class InputMini {
    onButtonChange: (mask: number) => void;
    private _mask;
    constructor(options: InputOptions);
    /** 当前按键掩码 */
    get mask(): number;
    /** 按下按钮 (bit OR) */
    press(button: ButtonId): void;
    /** 释放按钮 (bit AND NOT) */
    release(button: ButtonId): void;
    /** 直接设置整个掩码 (供触摸方向区域整片设置) */
    setMask(mask: number): void;
    /** 清除所有按键 */
    clear(): void;
    /**
     * 根据触摸坐标在方向键区域计算方向掩码。
     * 将区域分为 3×3 九宫格, 中心为空, 四角为斜向 (同时按两个方向)。
     *
     * @param tx 触摸点 X (相对区域左上)
     * @param ty 触摸点 Y (相对区域左上)
     * @param w 区域宽度
     * @param h 区域高度
     * @returns 方向掩码 (bit4=Up/bit5=Down/bit6=Left/bit7=Right)
     */
    static dPadMask(tx: number, ty: number, w: number, h: number): number;
}
export {};
