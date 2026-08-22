"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BUTTON_RIGHT = exports.BUTTON_LEFT = exports.BUTTON_DOWN = exports.BUTTON_UP = exports.BUTTON_START = exports.BUTTON_SELECT = exports.BUTTON_B = exports.BUTTON_A = void 0;
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
exports.BUTTON_A = 0;
exports.BUTTON_B = 1;
exports.BUTTON_SELECT = 2;
exports.BUTTON_START = 3;
exports.BUTTON_UP = 4;
exports.BUTTON_DOWN = 5;
exports.BUTTON_LEFT = 6;
exports.BUTTON_RIGHT = 7;
class InputMini {
    constructor(options) {
        this.onButtonChange = options.onButtonChange;
        this._mask = 0;
    }
    /** 当前按键掩码 */
    get mask() { return this._mask; }
    /** 按下按钮 (bit OR) */
    press(button) {
        this._mask |= (1 << button);
        this.onButtonChange(this._mask);
    }
    /** 释放按钮 (bit AND NOT) */
    release(button) {
        this._mask &= ~(1 << button);
        this.onButtonChange(this._mask);
    }
    /** 直接设置整个掩码 (供触摸方向区域整片设置) */
    setMask(mask) {
        this._mask = mask & 0xFF;
        this.onButtonChange(this._mask);
    }
    /** 清除所有按键 */
    clear() {
        this._mask = 0;
        this.onButtonChange(0);
    }
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
    static dPadMask(tx, ty, w, h) {
        const thirdW = w / 3;
        const thirdH = h / 3;
        let mask = 0;
        if (tx < thirdW)
            mask |= (1 << exports.BUTTON_LEFT);
        else if (tx > thirdW * 2)
            mask |= (1 << exports.BUTTON_RIGHT);
        if (ty < thirdH)
            mask |= (1 << exports.BUTTON_UP);
        else if (ty > thirdH * 2)
            mask |= (1 << exports.BUTTON_DOWN);
        return mask;
    }
}
exports.default = InputMini;
